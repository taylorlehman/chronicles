import {
  HARVEST_COST,
  IMPROVEMENT_DEFINITIONS,
  PLANT_WOODS_COST,
  ROAD_COST,
  UNIT_DEFINITIONS,
  applyAction,
  canResearchTech,
  canUnitCapture,
  canUnitExploreRuins,
  canUseSuperpower,
  cloneState,
  getAvailableTileActions,
  getCityUnitCap,
  getCityUnitCount,
  getFactionTechs,
  getSuperpowerTargetCoords,
  getTechCost,
  getTile,
  getTrainableUnits,
  getUnitCost,
  getUnitRange,
  getValidAttackTargets,
  getValidMoves,
  tileIndex,
  unitHasTrait,
  type Coord,
  type Difficulty,
  type GameAction,
  type GameState,
  type Unit,
} from '../game/index';
import {
  buildSpatialContext,
  chebyshev,
  chooseCityReward,
  dangerPenalty,
  deterministicUnitFloat,
  noiseOffset,
  scoreAttack,
  scoreCapture,
  scoreExploreRuins,
  scoreMove,
  scoreRecover,
  scoreTech,
  scoreTileAction,
  scoreTrainUnit,
  type SpatialContext,
} from './evaluator';
import { DIFFICULTY_CONFIGS, resolveFactionProfile } from './profiles';
import {
  assignRoles,
  buildStrategicContext,
  computeReserveGold,
  refreshCombatContext,
  refreshDynamicContext,
  rememberWarTarget,
  unitPower,
  type StrategicContext,
} from './strategy';
import type { DifficultyConfig, FactionAIProfile, ScoredAction } from './types';

export interface StrategyReport {
  turn: number;
  warTargetId: string | null;
  attacking: boolean;
}

export interface PlanOptions {
  /** Override the difficulty preset (used by the simulation harness for experiments). */
  config?: DifficultyConfig;
  /** Observer for the turn's strategic decision (simulation metrics only). */
  onStrategy?: (report: StrategyReport) => void;
}

function tileActionCost(action: GameAction): number {
  switch (action.type) {
    case 'HARVEST_TILE':
      return HARVEST_COST;
    case 'BUILD_IMPROVEMENT':
      return IMPROVEMENT_DEFINITIONS[action.improvement].cost;
    case 'BUILD_ROAD':
      return ROAD_COST;
    case 'PLANT_ANCIENT_WOODS':
      return PLANT_WOODS_COST;
    default:
      return 0;
  }
}

function hashId(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 16777619);
  return h >>> 0;
}

/**
 * Deterministic, fast rules-based AI turn planner (ZERO LLMs, ZERO fog-of-war peeking).
 *
 * Turn structure (each step is validated by `applyAction` on a private clone, so the
 * returned list only ever contains legal actions and always ends with `END_TURN`):
 *  0. City rewards & promotions
 *  1. Techs (keeping gold for needed army production)
 *  2. Economy & city growth (paced by difficulty)
 *  3. Age III Superpower (when impactful)
 *  4. Tactics: incremental cached greedy best (unit, action) loop with deterministic work budget
 *  5. Production: active recruitment across all open cities (never stalls!), combined-arms mix
 *  6. Spend leftovers on economy
 */
export function planAITurn(
  initialState: GameState,
  playerId: string,
  difficulty?: Difficulty,
  options?: PlanOptions,
): GameAction[] {
  const diffLevel: Difficulty = difficulty ?? initialState.config.difficulty;
  const diff = options?.config ?? DIFFICULTY_CONFIGS[diffLevel] ?? DIFFICULTY_CONFIGS.normal;
  let state = cloneState(initialState);
  const actions: GameAction[] = [];

  const activePlayer = state.players[state.activePlayerIndex];
  if (!activePlayer || activePlayer.id !== playerId || state.phase === 'game_over') {
    return [{ type: 'END_TURN' }];
  }

  const profile = resolveFactionProfile(activePlayer.faction, diff);
  let saltCounter = state.turn * 1009 + state.activePlayerIndex * 131;
  const turnSeed = (initialState.rngState ^ hashId(playerId) ^ Math.imul(state.turn, 0x9e3779b1)) >>> 0;
  const roll = (key: string): number => deterministicUnitFloat(turnSeed, hashId(key));

  const commit = (action: GameAction): boolean => {
    try {
      const result = applyAction(state, action);
      if (result.events.length === 0) return false;
      state = result.state;
      actions.push(action);
      return true;
    } catch {
      return false;
    }
  };

  const resolvePendingCityRewards = (): boolean => {
    let any = false;
    let guard = 0;
    while (guard++ < 16 && state.phase === 'playing') {
      let pendingCity = null;
      for (const c of Object.values(state.cities)) {
        if (c.ownerId === playerId && c.pendingLevelRewards.length > 0) {
          pendingCity = c;
          break;
        }
      }
      if (!pendingCity) break;
      const ctx = buildSpatialContext(state, playerId);
      const lvl = pendingCity.pendingLevelRewards[0];
      const reward = chooseCityReward(state, pendingCity, lvl, ctx, profile, diff);
      if (!commit({ type: 'CHOOSE_CITY_REWARD', cityId: pendingCity.id, reward })) {
        break;
      }
      any = true;
    }
    return any;
  };

  const promoteEligibleUnits = () => {
    for (const unit of Object.values(state.units)) {
      if (unit.ownerId === playerId && unit.canPromote) {
        if (diff.difficulty === 'easy' && roll(`promo:${unit.id}`) > 0.1) continue;
        commit({ type: 'PROMOTE_UNIT', unitId: unit.id });
      }
    }
  };

  const strategy = (): { ctx: SpatialContext; sctx: StrategicContext } => {
    const ctx = buildSpatialContext(state, playerId);
    const sctx = buildStrategicContext(state, ctx, profile, diff);
    assignRoles(state, ctx, sctx, diff);
    return { ctx, sctx };
  };

  // Pass 0: Resolve any pending city rewards & free veteran promotions
  resolvePendingCityRewards();
  promoteEligibleUnits();

  // Pass 1: Tech Research Pass (keeps gold for the army we still need)
  let techsBought = 0;
  const tryTechThisTurn =
    diff.techResearchChance >= 1 || roll(`techTurn:${state.turn}`) < diff.techResearchChance;
  while (tryTechThisTurn && techsBought < diff.maxTechsPerTurn && state.phase === 'playing') {
    const ctx = buildSpatialContext(state, playerId);
    const reserveGold = computeReserveGold(state, ctx, profile, diff);
    const factionTechs = getFactionTechs(ctx.player.faction);
    let bestTech: ScoredAction | null = null;
    let bestCost = 0;

    for (const tech of factionTechs) {
      if (!canResearchTech(state, playerId, tech.id)) continue;
      const cost = getTechCost(state, playerId, tech.id);
      const rawScore = scoreTech(state, tech.id, cost, ctx, profile);
      const score = rawScore + noiseOffset(state.rngState, saltCounter++, diff.noiseRange * 0.5);
      if (!bestTech || score > bestTech.score) {
        bestTech = { action: { type: 'RESEARCH_TECH', techId: tech.id }, score };
        bestCost = cost;
      }
    }

    const rich = ctx.player.gold - bestCost >= reserveGold + 15;
    const techThreshold = rich ? -Infinity : ctx.totalThreat >= 2 ? 26 : 12;
    if (!bestTech || bestTech.score < techThreshold) break;
    const affordable = ctx.player.gold - bestCost >= reserveGold || bestTech.score >= 70;
    if (!affordable) break;
    if (!commit(bestTech.action)) break;
    techsBought++;
  }

  // Pass 2: Economy & City Upgrade Pass (fast owned-tile list + lightweight reserve check)
  let econActionsUsed = 0;
  const runEconomyPass = (respectReserve: boolean) => {
    let ownedTileIndices: number[] = [];
    const rebuildOwnedTiles = () => {
      ownedTileIndices = [];
      for (let i = 0; i < state.tiles.length; i++) {
        const t = state.tiles[i];
        if (t.cityId && state.cities[t.cityId]?.ownerId === playerId) {
          ownedTileIndices.push(i);
        }
      }
    };
    rebuildOwnedTiles();

    let econIter = 0;
    const maxEconIter = diff.maxEconActionsPerTurn + 4;
    while (
      econActionsUsed < diff.maxEconActionsPerTurn &&
      econIter++ < maxEconIter &&
      state.phase === 'playing'
    ) {
      const ctx = buildSpatialContext(state, playerId);
      const reserve = respectReserve ? computeReserveGold(state, ctx, profile, diff) : 0;
      let bestEcon: ScoredAction | null = null;

      for (let k = 0; k < ownedTileIndices.length; k++) {
        const tile = state.tiles[ownedTileIndices[k]];
        const tileActions = getAvailableTileActions(state, playerId, tile.x, tile.y);
        for (let j = 0; j < tileActions.length; j++) {
          const action = tileActions[j];
          const rawScore = scoreTileAction(state, action, ctx, profile);
          if (rawScore <= 0) continue;
          if (rawScore < 55 && ctx.player.gold - tileActionCost(action) < reserve) continue;
          if (
            diff.economySkipChance > 0 &&
            rawScore < 55 &&
            deterministicUnitFloat(state.rngState, saltCounter++) < diff.economySkipChance
          ) {
            continue;
          }
          const score = rawScore + noiseOffset(state.rngState, saltCounter++, diff.noiseRange * 0.5);
          if (!bestEcon || score > bestEcon.score) {
            bestEcon = { action, score };
          }
        }
      }

      if (!bestEcon || bestEcon.score < 10) break;
      if (!commit(bestEcon.action)) break;
      if (bestEcon.action.type !== 'CHOP_FOREST') econActionsUsed++;
      if (resolvePendingCityRewards()) rebuildOwnedTiles();
    }
  };

  runEconomyPass(true);

  // Build strategy ONCE for Superpower + Tactical Pass
  let { ctx, sctx } = strategy();

  // Pass 3: Age III Superpower Activation
  if (
    state.phase === 'playing' &&
    state.turn >= diff.superpowerMinTurn &&
    canUseSuperpower(state, playerId)
  ) {
    const sp = chooseSuperpower(state, ctx, sctx);
    if (sp && commit(sp)) {
      ({ ctx, sctx } = strategy());
    }
  }

  // Pass 4: Tactical Unit Global Best-Pair Loop.
  // Reuses BFS fields across moves AND non-city-changing combats, and bounds total move/attack
  // scoring with a deterministic work budget so even huge 18x18 late-game turns stay phone-safe.
  const initialUnits = ctx.ownUnits.length;
  const maxTacticalSteps = Math.min(80, 20 + Math.ceil(initialUnits * 1.4));
  const WORK_BUDGET = 2200;
  let work = 0;
  let tacticalSteps = 0;
  rememberWarTarget(state, playerId, sctx.warTargetId, sctx.targetCity?.id ?? null);
  options?.onStrategy?.({
    warTargetId: sctx.warTargetId,
    attacking: sctx.attacking,
    turn: state.turn,
  });
  const cached = new Map<string, ScoredAction | null>();
  let dirty: Set<string> | null = null;
  let failures = 0;
  let lastActorId: string | null = null;

  const evaluateUnit = (unit: Unit, cityInDanger: boolean): ScoredAction | null => {
    let best: ScoredAction | null = null;
    if (unit.actedThisTurn && !unit.canEscapeMove && !unit.canPersistAttack) return null;

    if (canUnitCapture(state, unit.id)) {
      const rawScore = scoreCapture(state, unit, profile);
      const score = rawScore + noiseOffset(state.rngState, saltCounter++, diff.noiseRange * 0.25);
      return { action: { type: 'CAPTURE_CITY', unitId: unit.id }, score };
    }

    if (canUnitExploreRuins(state, unit.id)) {
      const rawScore = scoreExploreRuins(state, unit, ctx);
      const score = rawScore + noiseOffset(state.rngState, saltCounter++, diff.noiseRange * 0.25);
      return { action: { type: 'EXPLORE_RUINS', unitId: unit.id }, score };
    }

    // Easy: a casual commander sometimes simply overlooks a non-critical unit (never one sitting
    // on an unthreatened under-cap city center, so cities keep producing!).
    if (diff.unitNeglectChance > 0 && !cityInDanger) {
      const curTile = getTile(state, unit.x, unit.y);
      const blockingCenter =
        curTile?.isCityCenter &&
        curTile.cityId !== null &&
        sctx.cityHasRoom[curTile.cityId] === true;
      if (!blockingCenter && roll(`neglect:${unit.id}`) < diff.unitNeglectChance) {
        return null;
      }
    }

    // 4a. Candidate Attacks
    const atkTargets = getValidAttackTargets(state, unit.id);
    for (let i = 0; i < atkTargets.length; i++) {
      const targetCoord = atkTargets[i];
      const targetTile = getTile(state, targetCoord.x, targetCoord.y);
      if (!targetTile?.unitId) continue;
      const defender = state.units[targetTile.unitId];
      if (!defender || defender.ownerId === playerId) continue;
      work++;
      const rawScore = scoreAttack(state, unit, defender, ctx, profile, diff, sctx);
      const score = rawScore + noiseOffset(state.rngState, saltCounter++, diff.noiseRange);
      if (!best || score > best.score) {
        best = {
          action: { type: 'ATTACK_UNIT', attackerId: unit.id, defenderId: defender.id },
          score,
        };
      }
    }

    // 4b. Candidate Moves (incl. move-then-strike for Dash units)
    const moves = getValidMoves(state, unit.id);
    if (moves.length > 0) {
      const role = sctx.roles.get(unit.id) ?? 'hold';
      const hereDanger = dangerPenalty(
        state,
        unit,
        tileIndex(unit.x, unit.y, state.mapSize),
        ctx,
        profile,
        diff,
        sctx,
        role,
      );
      const canStrikeAfter =
        diff.dashLookaheadWeight > 0 &&
        !unit.hasMoved &&
        !unit.hasAttacked &&
        !unit.canEscapeMove &&
        unitHasTrait(state, unit, 'dash');
      const range = getUnitRange(state, unit);
      let nearbyEnemies: Unit[] = [];
      if (canStrikeAfter && ctx.enemyUnits.length > 0) {
        const reachR = UNIT_DEFINITIONS[unit.type].movement + range + 1;
        nearbyEnemies = ctx.enemyUnits.filter((e) => chebyshev(unit, e) <= reachR);
      }
      for (let i = 0; i < moves.length; i++) {
        const to = moves[i];
        work++;
        let rawScore = scoreMove(state, unit, to, ctx, profile, diff, sctx, hereDanger);
        if (nearbyEnemies.length > 0 && work <= WORK_BUDGET) {
          work += nearbyEnemies.length;
          const strike = bestStrikeFrom(state, unit, to, nearbyEnemies, range, ctx, profile, diff, sctx);
          if (strike > 10) rawScore += strike * 0.85 * diff.dashLookaheadWeight;
        }
        const score = rawScore + noiseOffset(state.rngState, saltCounter++, diff.noiseRange);
        if (!best || score > best.score) {
          best = { action: { type: 'MOVE_UNIT', unitId: unit.id, to }, score };
        }
      }
    }

    // 4c. Candidate Recover (Heal)
    if (!unit.hasMoved && !unit.hasAttacked && unit.hp < unit.maxHp) {
      const rawScore = scoreRecover(state, unit, profile, sctx, diff);
      if (rawScore > 0) {
        const score = rawScore + noiseOffset(state.rngState, saltCounter++, diff.noiseRange * 0.5);
        if (!best || score > best.score) {
          best = { action: { type: 'RECOVER_UNIT', unitId: unit.id }, score };
        }
      }
    }
    return best;
  };

  while (tacticalSteps++ < maxTacticalSteps && state.phase === 'playing') {
    const cityInDanger = Object.values(sctx.threats).some((t) => t.enemyAdjacent || t.enemyOnCenter);
    const overBudget = work > WORK_BUDGET;
    for (let i = 0; i < ctx.ownUnits.length; i++) {
      const unit = ctx.ownUnits[i];
      if (dirty !== null && !dirty.has(unit.id) && cached.has(unit.id)) continue;
      // Over budget: NEVER freeze units that haven't been evaluated yet, and keep existing
      // cached candidates for bystander units instead of wiping them to null!
      if (
        overBudget &&
        cached.has(unit.id) &&
        unit.id !== lastActorId &&
        !canUnitCapture(state, unit.id) &&
        !canUnitExploreRuins(state, unit.id)
      ) {
        continue;
      }
      cached.set(unit.id, evaluateUnit(unit, cityInDanger));
    }

    let best: ScoredAction | null = null;
    let bestUnit: string | null = null;
    for (const [id, cand] of cached) {
      if (!cand || !state.units[id]) continue;
      if (!best || cand.score > best.score) {
        best = cand;
        bestUnit = id;
      }
    }
    if (!best || !bestUnit || best.score <= 2) break;

    const action = best.action;
    const before = state;
    lastActorId = bestUnit;
    if (!commit(action)) {
      dirty = new Set([bestUnit]);
      cached.delete(bestUnit);
      if (++failures > 12) break;
      continue;
    }
    resolvePendingCityRewards();
    promoteEligibleUnits();

    const newCtx = buildSpatialContext(state, playerId);
    const mapChanged =
      action.type === 'CAPTURE_CITY' ||
      action.type === 'EXPLORE_RUINS' ||
      newCtx.ownCities.length !== ctx.ownCities.length ||
      newCtx.neutralVillages.length !== ctx.neutralVillages.length ||
      newCtx.enemyCities.length !== ctx.enemyCities.length;

    if (mapChanged) {
      ctx = newCtx;
      sctx = buildStrategicContext(state, ctx, profile, diff);
      assignRoles(state, ctx, sctx, diff);
      cached.clear();
      dirty = null;
      continue;
    }

    const combatChanged =
      action.type === 'ATTACK_UNIT' || newCtx.enemyUnits.length !== ctx.enemyUnits.length;
    ctx = newCtx;

    if (combatChanged) {
      // Reuse the 4 BFS fields while refreshing enemy reach, threats, friendPower, and roles!
      refreshCombatContext(state, ctx, sctx, diff);
      const changed: Coord[] = [];
      const actor = state.units[bestUnit] ?? before.units[bestUnit];
      if (actor) changed.push({ x: actor.x, y: actor.y });
      if (action.type === 'ATTACK_UNIT') {
        const def = before.units[action.defenderId];
        if (def) changed.push({ x: def.x, y: def.y });
      }
      dirty = new Set([bestUnit]);
      for (let i = 0; i < ctx.ownUnits.length; i++) {
        const u = ctx.ownUnits[i];
        for (let j = 0; j < changed.length; j++) {
          if (chebyshev(changed[j], u) <= 3) {
            dirty.add(u.id);
            break;
          }
        }
      }
      continue;
    }

    refreshDynamicContext(state, ctx, sctx);
    const actor = state.units[bestUnit] ?? before.units[bestUnit];
    const changed: Coord[] = [];
    if (actor) changed.push({ x: actor.x, y: actor.y });
    const prevActor = before.units[bestUnit];
    if (prevActor && (!actor || prevActor.x !== actor.x || prevActor.y !== actor.y)) {
      changed.push({ x: prevActor.x, y: prevActor.y });
    }
    dirty = new Set([bestUnit]);
    for (let i = 0; i < ctx.ownUnits.length; i++) {
      const u = ctx.ownUnits[i];
      for (let j = 0; j < changed.length; j++) {
        if (chebyshev(changed[j], u) <= 2) {
          dirty.add(u.id);
          break;
        }
      }
    }
  }

  // Pass 5: Production Pass (Train units in unoccupied cities — NEVER stalls on Squire or Captain!)
  if (state.phase === 'playing') {
    ({ ctx, sctx } = strategy());

    const stepOffCenter = (unit: Unit): boolean => {
      const moves = getValidMoves(state, unit.id);
      if (moves.length === 0) return false;
      let bestTo: Coord | null = null;
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        const to = moves[i];
        const t = getTile(state, to.x, to.y);
        if (!t || (t.isCityCenter && t.cityId)) continue;
        let sc = -dangerPenalty(state, unit, tileIndex(to.x, to.y, state.mapSize), ctx, profile, diff, sctx, 'hold');
        sc -= chebyshev(unit, to) * 0.5;
        if (sctx.targetCity) sc -= chebyshev(to, sctx.targetCity) * 0.25;
        if (t.hasVillage || t.resource === 'ruins') sc += 8;
        if (sc > bestScore) {
          bestScore = sc;
          bestTo = to;
        }
      }
      return bestTo ? commit({ type: 'MOVE_UNIT', unitId: unit.id, to: bestTo }) : false;
    };

    const frontierId = sctx.frontierCity?.id;
    const sortedCities = [...ctx.ownCities].sort(
      (a, b) =>
        (sctx.threats[b.id]?.enemyPower ?? 0) - (sctx.threats[a.id]?.enemyPower ?? 0) ||
        (b.id === frontierId ? 1 : 0) - (a.id === frontierId ? 1 : 0) ||
        b.level - a.level,
    );

    let prodCtx = ctx;
    let trainedThisTurn = 0;
    const effectiveMaxTrains =
      Number.isFinite(diff.maxTrainsPerTurn) &&
      diff.difficulty !== 'easy' &&
      ctx.ownCities.length >= 10
        ? diff.maxTrainsPerTurn + 1
        : diff.maxTrainsPerTurn;
    for (let ci = 0; ci < sortedCities.length; ci++) {
      if (state.phase !== 'playing') break;
      const city = sortedCities[ci];
      const threatened = (sctx.threats[city.id]?.enemyPower ?? 0) > 0;
      if (trainedThisTurn >= effectiveMaxTrains) break;
      let centerTile = getTile(state, city.x, city.y);
      if (!centerTile) continue;

      if (
        centerTile.unitId !== null &&
        !threatened &&
        getCityUnitCount(state, city.id) < getCityUnitCap(state, city)
      ) {
        const sitter = state.units[centerTile.unitId];
        if (sitter && sitter.ownerId === playerId && stepOffCenter(sitter)) {
          centerTile = getTile(state, city.x, city.y);
          prodCtx = buildSpatialContext(state, playerId);
          if (!centerTile) continue;
        }
      }
      if (centerTile.unitId !== null) continue;
      if (getCityUnitCount(state, city.id) >= getCityUnitCap(state, city)) continue;

      const trainable = getTrainableUnits(state, city.id);
      if (trainable.length === 0) continue;

      const gold = prodCtx.player.gold;
      const army = prodCtx.ownUnits.filter((u) => UNIT_DEFINITIONS[u.type].movement > 0).length;

      if (!threatened) {
        if (
          diff.trainSkipChance > 0 &&
          army >= sctx.desiredArmy * 0.5 &&
          roll(`train:${city.id}`) < diff.trainSkipChance
        ) {
          continue;
        }
        if (army >= sctx.desiredArmy * diff.armyCapMult) continue;
        // Only save small amounts of gold (< 8★) during the very early opening if army is already solid.
        if (army >= sctx.desiredArmy && gold < 8 && state.turn <= 6) continue;
      }

      let bestTrain: ScoredAction | null = null;
      for (let ti = 0; ti < trainable.length; ti++) {
        const unitType = trainable[ti];
        if (gold < getUnitCost(state, playerId, unitType)) continue;
        const rawScore = scoreTrainUnit(state, city, unitType, prodCtx, profile, sctx, diff);
        const score = rawScore + noiseOffset(state.rngState, saltCounter++, diff.noiseRange * 0.5);
        if (!bestTrain || score > bestTrain.score) {
          bestTrain = { action: { type: 'TRAIN_UNIT', cityId: city.id, unitType }, score };
        }
      }

      if (bestTrain) {
        if (commit(bestTrain.action)) {
          trainedThisTurn++;
          prodCtx = buildSpatialContext(state, playerId);
        }
      }
    }

    // Spend any leftover gold on remaining economy actions (within difficulty cap)
    runEconomyPass(false);
  }

  if (state.phase === 'playing') {
    actions.push({ type: 'END_TURN' });
  }

  return actions;
}

/** Best attack score `unit` could make after dashing to `to` (0 if none). */
function bestStrikeFrom(
  state: GameState,
  unit: Unit,
  to: Coord,
  enemies: Unit[],
  range: number,
  ctx: SpatialContext,
  profile: FactionAIProfile,
  diff: DifficultyConfig,
  sctx: StrategicContext,
): number {
  const ox = unit.x;
  const oy = unit.y;
  let best = 0;
  unit.x = to.x;
  unit.y = to.y;
  const wasMoved = unit.hasMoved;
  unit.hasMoved = true;
  try {
    const rev = ctx.player.revealedTiles;
    const size = state.mapSize;
    for (let i = 0; i < enemies.length; i++) {
      const e = enemies[i];
      if (Math.max(Math.abs(to.x - e.x), Math.abs(to.y - e.y)) > range) continue;
      if (!rev[tileIndex(e.x, e.y, size)]) continue;
      const s = scoreAttack(state, unit, e, ctx, profile, diff, sctx, true);
      if (s > best) best = s;
    }
  } finally {
    unit.x = ox;
    unit.y = oy;
    unit.hasMoved = wasMoved;
  }
  return best;
}

/** Decide whether (and where) to unleash the faction's Age III superpower this turn. */
function chooseSuperpower(
  state: GameState,
  ctx: SpatialContext,
  sctx: StrategicContext,
): GameAction | null {
  const faction = ctx.player.faction;
  const playerId = ctx.player.id;

  if (faction === 'dwarves') {
    return { type: 'USE_SUPERPOWER' };
  }

  if (faction === 'elves') {
    let engaged = 0;
    for (const u of ctx.ownUnits) {
      if (ctx.enemyUnits.some((e) => chebyshev(u, e) <= 3)) engaged++;
    }
    const nearTarget = sctx.targetCity
      ? ctx.ownUnits.filter((u) => chebyshev(u, sctx.targetCity!) <= 4).length
      : 0;
    if (engaged >= 3 || (sctx.attacking && nearTarget >= 3)) return { type: 'USE_SUPERPOWER' };
    return null;
  }

  if (faction === 'orcs') {
    let bestTarget: Coord | null = null;
    let bestScore = 0;
    for (const coord of getSuperpowerTargetCoords(state, playerId)) {
      let score = 0;
      let hits = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const t = getTile(state, coord.x + dx, coord.y + dy);
          if (!t || !ctx.player.revealedTiles[tileIndex(t.x, t.y, state.mapSize)]) continue;
          if (t.unitId) {
            const u = state.units[t.unitId];
            if (u && u.ownerId !== playerId) {
              hits++;
              score += 10 + unitPower(u) * 3;
              if (t.isCityCenter && t.cityId && state.cities[t.cityId]?.ownerId === u.ownerId) {
                if (ctx.ownUnits.some((o) => chebyshev(o, t) <= UNIT_DEFINITIONS[o.type].movement)) {
                  score += 30;
                }
              }
              if (t.isCityCenter && t.cityId && state.cities[t.cityId]?.ownerId === playerId) score += 60;
            }
          }
          if (t.cityId && state.cities[t.cityId]?.ownerId === playerId && t.improvement) score -= 6;
        }
      }
      if (hits >= 2 || score >= 45) {
        if (score > bestScore) {
          bestScore = score;
          bestTarget = coord;
        }
      }
    }
    return bestTarget ? { type: 'USE_SUPERPOWER', target: bestTarget } : null;
  }

  if (faction === 'humans') {
    const coords = getSuperpowerTargetCoords(state, playerId);
    if (coords.length === 0) return null;
    let bestTarget: Coord | null = null;
    let bestScore = -Infinity;
    for (const coord of coords) {
      let score = 0;
      for (const e of ctx.enemyUnits) {
        const d = chebyshev(coord, e);
        if (d <= 2) score += 25;
        else if (d <= 4) score += 6;
      }
      const t = getTile(state, coord.x, coord.y);
      const city = t?.cityId ? state.cities[t.cityId] : null;
      if (city) {
        const threat = sctx.threats[city.id];
        if (threat && threat.enemyPower > 0) score += 20 + (city.isCapital ? 10 : 0);
        if (chebyshev(coord, city) === 1) score += 4;
      }
      if (sctx.targetCity) score -= chebyshev(coord, sctx.targetCity) * 1.5;
      if (t?.terrain === 'mountain' || t?.terrain === 'forest') score += 3;
      if (score > bestScore) {
        bestScore = score;
        bestTarget = coord;
      }
    }
    const contested = Object.values(sctx.threats).some((t) => t.enemyPower > 0);
    if (bestTarget && (bestScore >= 20 || contested || state.turn >= 30)) {
      return { type: 'USE_SUPERPOWER', target: bestTarget };
    }
    return null;
  }

  return null;
}
