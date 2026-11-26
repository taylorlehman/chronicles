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
import { DIFFICULTY_CONFIGS, FACTION_AI_PROFILES } from './profiles';
import { assignRoles, buildStrategicContext, unitPower, type StrategicContext } from './strategy';
import type { DifficultyConfig, FactionAIProfile, ScoredAction } from './types';

const MAX_ECONOMY_STEPS = 24;

export interface PlanOptions {
  /** Override the difficulty preset (used by the simulation harness for experiments). */
  config?: DifficultyConfig;
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
 * Deterministic, fast rules-based AI turn planner (ZERO LLMs).
 *
 * Turn structure (each step is validated by `applyAction` on a private clone, so the
 * returned list only ever contains legal actions and always ends with `END_TURN`):
 *  0. City rewards & promotions
 *  1. Strategy: goal fields, danger map, threats, war target, posture, army budget
 *  2. Techs and economy, leaving `reserveGold` for the army the AI wants
 *  3. Superpower (when it is actually worth it)
 *  4. Tactics: greedy best (unit, action) loop with captures, focus fire,
 *     move-then-strike, danger-aware movement and role-driven goals
 *  5. Production: fill free city slots, strongest unit per slot once gold is plentiful
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

  const profile = FACTION_AI_PROFILES[activePlayer.faction];
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

  const resolvePendingCityRewards = () => {
    let guard = 0;
    while (guard++ < 16 && state.phase === 'playing') {
      const ctx = buildSpatialContext(state, playerId);
      const city = ctx.ownCities.find((c) => c.pendingLevelRewards.length > 0);
      if (!city) break;
      const lvl = city.pendingLevelRewards[0];
      const reward = chooseCityReward(state, city, lvl, ctx, profile);
      if (!commit({ type: 'CHOOSE_CITY_REWARD', cityId: city.id, reward })) {
        break;
      }
    }
  };

  const promoteEligibleUnits = () => {
    for (const unit of Object.values(state.units)) {
      if (unit.ownerId === playerId && unit.canPromote) {
        commit({ type: 'PROMOTE_UNIT', unitId: unit.id });
      }
    }
  };

  const strategy = (): { ctx: SpatialContext; sctx: StrategicContext } => {
    const ctx = buildSpatialContext(state, playerId);
    const sctx = buildStrategicContext(state, ctx, profile, diff);
    assignRoles(state, ctx, sctx);
    return { ctx, sctx };
  };

  // Pass 0: Resolve any pending city rewards & free veteran promotions
  resolvePendingCityRewards();
  promoteEligibleUnits();

  // Pass 1: Tech Research Pass (keeps gold for the army we still need)
  let techsBought = 0;
  while (techsBought < diff.maxTechsPerTurn && state.phase === 'playing') {
    const { ctx, sctx } = strategy();
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

    // Higher threshold when under immediate military threat so AI keeps gold for defenders,
    // but once the treasury is overflowing every remaining tech is worth buying.
    const rich = ctx.player.gold - bestCost >= sctx.reserveGold + 15;
    const techThreshold = rich ? -Infinity : ctx.totalThreat >= 2 ? 26 : 12;
    if (!bestTech || bestTech.score < techThreshold) break;
    const affordable = ctx.player.gold - bestCost >= sctx.reserveGold || bestTech.score >= 70;
    if (!affordable) break;
    if (!commit(bestTech.action)) break;
    techsBought++;
  }

  // Pass 2: Economy & City Upgrade Pass
  const runEconomyPass = (respectReserve: boolean) => {
    let econSteps = 0;
    while (econSteps++ < MAX_ECONOMY_STEPS && state.phase === 'playing') {
      const ctx = buildSpatialContext(state, playerId);
      const reserve = respectReserve ? buildStrategicContext(state, ctx, profile, diff).reserveGold : 0;
      let bestEcon: ScoredAction | null = null;

      for (const tile of state.tiles) {
        if (!tile.cityId) continue;
        const city = state.cities[tile.cityId];
        if (!city || city.ownerId !== playerId) continue;
        const tileActions = getAvailableTileActions(state, playerId, tile.x, tile.y);
        for (const action of tileActions) {
          const rawScore = scoreTileAction(state, action, ctx, profile);
          if (rawScore <= 0) continue;
          // Level-up harvests (score >= 55) are worth dipping into the army reserve for.
          if (rawScore < 55 && ctx.player.gold - tileActionCost(action) < reserve) continue;
          // Easy difficulty economy throttle on non-level-up harvests
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
      resolvePendingCityRewards();
    }
  };

  runEconomyPass(true);

  // Pass 3: Age III Superpower Activation
  if (state.phase === 'playing' && canUseSuperpower(state, playerId)) {
    const { ctx, sctx } = strategy();
    const sp = chooseSuperpower(state, ctx, sctx);
    if (sp) commit(sp);
  }

  // Pass 4: Tactical Unit Global Best-Pair Loop
  const initialUnits = Object.values(state.units).filter((u) => u.ownerId === playerId).length;
  const maxTacticalSteps = 40 + initialUnits * 3;
  let tacticalSteps = 0;
  while (tacticalSteps++ < maxTacticalSteps && state.phase === 'playing') {
    promoteEligibleUnits();
    const { ctx, sctx } = strategy();
    let best: ScoredAction | null = null;

    const cityInDanger = Object.values(sctx.threats).some((t) => t.enemyAdjacent || t.enemyOnCenter);

    for (const unit of ctx.ownUnits) {
      if (unit.actedThisTurn && !unit.canEscapeMove && !unit.canPersistAttack) continue;

      // 4.0 Explicit City/Village Capture (highest tactical priority!)
      if (canUnitCapture(state, unit.id)) {
        const rawScore = scoreCapture(state, unit, profile, diff);
        const score = rawScore + noiseOffset(state.rngState, saltCounter++, diff.noiseRange * 0.25);
        if (!best || score > best.score) {
          best = { action: { type: 'CAPTURE_CITY', unitId: unit.id }, score };
        }
        continue;
      }

      // 4.0b Explicit Ancient Ruins Exploration (high tactical priority!)
      if (canUnitExploreRuins(state, unit.id)) {
        const rawScore = scoreExploreRuins(state, unit, ctx);
        const score = rawScore + noiseOffset(state.rngState, saltCounter++, diff.noiseRange * 0.25);
        if (!best || score > best.score) {
          best = { action: { type: 'EXPLORE_RUINS', unitId: unit.id }, score };
        }
        continue;
      }

      // Easy: a casual commander sometimes simply forgets a unit for the turn.
      if (
        diff.unitNeglectChance > 0 &&
        !cityInDanger &&
        roll(`neglect:${unit.id}`) < diff.unitNeglectChance
      ) {
        continue;
      }

      // 4a. Candidate Attacks
      const targets = getValidAttackTargets(state, unit.id);
      for (const targetCoord of targets) {
        const targetTile = getTile(state, targetCoord.x, targetCoord.y);
        if (!targetTile?.unitId) continue;
        const defender = state.units[targetTile.unitId];
        if (!defender || defender.ownerId === playerId) continue;
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
          !unit.hasMoved &&
          !unit.hasAttacked &&
          !unit.canEscapeMove &&
          unitHasTrait(state, unit, 'dash');
        const range = getUnitRange(state, unit);
        const nearbyEnemies = canStrikeAfter
          ? ctx.enemyUnits.filter(
              (e) => chebyshev(unit, e) <= UNIT_DEFINITIONS[unit.type].movement + range + 1,
            )
          : [];
        for (const to of moves) {
          let rawScore = scoreMove(state, unit, to, ctx, profile, diff, sctx, hereDanger);
          if (nearbyEnemies.length > 0) {
            const strike = bestStrikeFrom(state, unit, to, nearbyEnemies, range, ctx, profile, diff, sctx);
            if (strike > 10) rawScore += strike * 0.85;
          }
          const score = rawScore + noiseOffset(state.rngState, saltCounter++, diff.noiseRange);
          if (!best || score > best.score) {
            best = { action: { type: 'MOVE_UNIT', unitId: unit.id, to }, score };
          }
        }
      }

      // 4c. Candidate Recover (Heal)
      if (!unit.hasMoved && !unit.hasAttacked && unit.hp < unit.maxHp) {
        const rawScore = scoreRecover(state, unit, profile);
        if (rawScore > 0) {
          const score = rawScore + noiseOffset(state.rngState, saltCounter++, diff.noiseRange * 0.5);
          if (!best || score > best.score) {
            best = { action: { type: 'RECOVER_UNIT', unitId: unit.id }, score };
          }
        }
      }
    }

    if (!best || best.score <= 2) break;
    if (!commit(best.action)) break;
    resolvePendingCityRewards();
  }

  // Pass 5: Production Pass (Train units in unoccupied cities)
  if (state.phase === 'playing') {
    const { ctx, sctx } = strategy();
    const frontierId = sctx.frontierCity?.id;
    const sortedCities = [...ctx.ownCities].sort(
      (a, b) =>
        (sctx.threats[b.id]?.enemyPower ?? 0) - (sctx.threats[a.id]?.enemyPower ?? 0) ||
        (b.id === frontierId ? 1 : 0) - (a.id === frontierId ? 1 : 0) ||
        b.level - a.level,
    );

    for (const city of sortedCities) {
      if (state.phase !== 'playing') break;
      const centerTile = getTile(state, city.x, city.y);
      if (!centerTile || centerTile.unitId !== null) continue;
      if (getCityUnitCount(state, city.id) >= getCityUnitCap(state, city)) continue;

      const trainable = getTrainableUnits(state, city.id);
      if (trainable.length === 0) continue;

      const freshCtx = buildSpatialContext(state, playerId);
      const army = freshCtx.ownUnits.filter((u) => UNIT_DEFINITIONS[u.type].movement > 0).length;
      const threatened = (sctx.threats[city.id]?.enemyPower ?? 0) > 0;
      const gold = freshCtx.player.gold;

      if (!threatened) {
        // Easy: leave some slots idle (but never let the army collapse).
        if (
          diff.trainSkipChance > 0 &&
          army >= sctx.desiredArmy * 0.5 &&
          roll(`train:${city.id}`) < diff.trainSkipChance
        ) {
          continue;
        }
        // Army is where we want it and gold is tight: keep the gold for techs / growth.
        if (army >= sctx.desiredArmy && gold < 10 && state.turn > 3) continue;
        // Easy: a casual commander stops recruiting once the army "looks big enough".
        if (army >= sctx.desiredArmy * diff.armyCapMult) continue;
      }

      let bestTrain: ScoredAction | null = null;
      for (const unitType of trainable) {
        if (gold < getUnitCost(state, playerId, unitType)) continue;
        const rawScore = scoreTrainUnit(state, city, unitType, freshCtx, profile, sctx);
        const score = rawScore + noiseOffset(state.rngState, saltCounter++, diff.noiseRange * 0.5);
        if (!bestTrain || score > bestTrain.score) {
          bestTrain = { action: { type: 'TRAIN_UNIT', cityId: city.id, unitType }, score };
        }
      }

      const threshold = threatened || army < sctx.desiredArmy ? -Infinity : diff.productionThreshold;
      if (bestTrain && bestTrain.score >= threshold) {
        commit(bestTrain.action);
      }
    }

    // Spend any leftover gold (e.g. from Orc Spoils of War or ruins) on remaining economy actions
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
  // Temporarily place the unit (private clone) so combat prediction uses the new tile.
  unit.x = to.x;
  unit.y = to.y;
  const wasMoved = unit.hasMoved;
  unit.hasMoved = true;
  try {
    for (const e of enemies) {
      if (chebyshev(to, e) > range) continue;
      if (!ctx.player.revealedTiles[tileIndex(e.x, e.y, state.mapSize)]) continue;
      const s = scoreAttack(state, unit, e, ctx, profile, diff, sctx);
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
    // A free 20 HP flying Fire Drake is always worth having right away.
    return { type: 'USE_SUPERPOWER' };
  }

  if (faction === 'elves') {
    // Eclipse (+1 MOV / +1 ATK for 3 turns): trigger when the army is in contact.
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
    // Volcano: 3x3 that destroys every enemy unit inside. Best on stacked enemies or a
    // city garrison we can walk into next.
    let bestTarget: Coord | null = null;
    let bestScore = 0;
    for (const coord of getSuperpowerTargetCoords(state, playerId)) {
      let score = 0;
      let hits = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const t = getTile(state, coord.x + dx, coord.y + dy);
          if (!t) continue;
          if (t.unitId) {
            const u = state.units[t.unitId];
            if (u && u.ownerId !== playerId) {
              hits++;
              score += 10 + unitPower(u) * 3;
              if (t.isCityCenter && t.cityId && state.cities[t.cityId]?.ownerId === u.ownerId) {
                // Garrison wiped: can one of ours step in?
                if (ctx.ownUnits.some((o) => chebyshev(o, t) <= UNIT_DEFINITIONS[o.type].movement)) score += 30;
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
    // Watchtower: a 25 HP range-2 fortification. Put it where enemies are, or on the frontier.
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
