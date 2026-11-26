import {
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
  getValidAttackTargets,
  getValidMoves,
  type Difficulty,
  type GameAction,
  type GameState,
} from '../../src/game/index';
import {
  buildSpatialContext,
  chooseCityReward,
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
} from './evaluator';
import { DIFFICULTY_CONFIGS, FACTION_AI_PROFILES } from './profiles';
import type { ScoredAction } from './types';

const MAX_TACTICAL_STEPS = 64;
const MAX_ECONOMY_STEPS = 24;
const MAX_TECH_PER_TURN = 2;

/**
 * Deterministic, fast (<50ms) rules-based AI turn planner (ZERO LLMs).
 * Simulates candidate actions on a cloned state via `applyAction` and returns
 * the ordered list of legal `GameAction`s ending with `END_TURN`.
 */
export function planAITurn(
  initialState: GameState,
  playerId: string,
  difficulty?: Difficulty,
): GameAction[] {
  const diffLevel: Difficulty = difficulty ?? initialState.config.difficulty;
  const diff = DIFFICULTY_CONFIGS[diffLevel];
  let state = cloneState(initialState);
  const actions: GameAction[] = [];

  const activePlayer = state.players[state.activePlayerIndex];
  if (!activePlayer || activePlayer.id !== playerId || state.phase === 'game_over') {
    return [{ type: 'END_TURN' }];
  }

  const profile = FACTION_AI_PROFILES[activePlayer.faction];
  let saltCounter = state.turn * 1009 + state.activePlayerIndex * 131;

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

  // Pass 0: Resolve any pending city rewards & free veteran promotions
  resolvePendingCityRewards();
  promoteEligibleUnits();

  // Pass 1: Tech Research Pass
  let techsBought = 0;
  while (techsBought < MAX_TECH_PER_TURN && state.phase === 'playing') {
    const ctx = buildSpatialContext(state, playerId);
    const factionTechs = getFactionTechs(ctx.player.faction);
    let bestTech: ScoredAction | null = null;

    for (const tech of factionTechs) {
      if (!canResearchTech(state, playerId, tech.id)) continue;
      const cost = getTechCost(state, playerId, tech.id);
      const rawScore = scoreTech(state, tech.id, cost, ctx, profile);
      const score = rawScore + noiseOffset(state.rngState, saltCounter++, diff.noiseRange * 0.5);
      if (!bestTech || score > bestTech.score) {
        bestTech = { action: { type: 'RESEARCH_TECH', techId: tech.id }, score };
      }
    }

    // Higher threshold when under immediate military threat so AI keeps gold for defenders
    const techThreshold = ctx.totalThreat >= 2 ? 26 : 12;
    if (!bestTech || bestTech.score < techThreshold) break;
    if (!commit(bestTech.action)) break;
    techsBought++;
  }

  // Pass 2: Economy & City Upgrade Pass
  const runEconomyPass = () => {
    let econSteps = 0;
    while (econSteps++ < MAX_ECONOMY_STEPS && state.phase === 'playing') {
      const ctx = buildSpatialContext(state, playerId);
      let bestEcon: ScoredAction | null = null;

      for (const tile of state.tiles) {
        if (!tile.cityId) continue;
        const city = state.cities[tile.cityId];
        if (!city || city.ownerId !== playerId) continue;
        const tileActions = getAvailableTileActions(state, playerId, tile.x, tile.y);
        for (const action of tileActions) {
          const rawScore = scoreTileAction(state, action, ctx, profile);
          if (rawScore <= 0) continue;
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

  runEconomyPass();

  // Pass 2.5: Age III Superpower Activation
  if (state.phase === 'playing' && canUseSuperpower(state, playerId)) {
    const ctx = buildSpatialContext(state, playerId);
    const faction = ctx.player.faction;
    if (faction === 'dwarves') {
      commit({ type: 'USE_SUPERPOWER' });
    } else if (faction === 'elves') {
      if (ctx.ownUnits.length >= 2 && (ctx.enemyUnits.length > 0 || ctx.enemyCities.length > 0)) {
        commit({ type: 'USE_SUPERPOWER' });
      }
    } else if (faction === 'orcs') {
      const targets = getSuperpowerTargetCoords(state, playerId);
      let bestTarget: { x: number; y: number } | null = null;
      let bestScore = 0;
      for (const coord of targets) {
        let enemiesHit = 0;
        let ownTilePenalty = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const t = getTile(state, coord.x + dx, coord.y + dy);
            if (!t) continue;
            if (t.unitId) {
              const u = state.units[t.unitId];
              if (u && u.ownerId !== playerId) enemiesHit++;
            }
            if (t.cityId && state.cities[t.cityId]?.ownerId === playerId && t.improvement) {
              ownTilePenalty += 1;
            }
          }
        }
        const score = enemiesHit * 10 - ownTilePenalty * 2;
        if (enemiesHit >= 1 && score > bestScore) {
          bestScore = score;
          bestTarget = coord;
        }
      }
      if (bestTarget) {
        commit({ type: 'USE_SUPERPOWER', target: bestTarget });
      }
    } else if (faction === 'humans') {
      const targets = getSuperpowerTargetCoords(state, playerId);
      if (targets.length > 0 && (ctx.enemyUnits.length > 0 || ctx.enemyCities.length > 0)) {
        let bestTarget = targets[0];
        let bestScore = -Infinity;
        for (const coord of targets) {
          let score = 0;
          for (const enemy of ctx.enemyUnits) {
            const d = Math.max(Math.abs(coord.x - enemy.x), Math.abs(coord.y - enemy.y));
            if (d <= 2) score += 25;
            else if (d <= 4) score += 8;
          }
          if (ctx.ownCapital) {
            const capDist = Math.max(
              Math.abs(coord.x - ctx.ownCapital.x),
              Math.abs(coord.y - ctx.ownCapital.y),
            );
            if (capDist <= 2) score += 4;
          }
          if (score > bestScore) {
            bestScore = score;
            bestTarget = coord;
          }
        }
        commit({ type: 'USE_SUPERPOWER', target: bestTarget });
      }
    }
  }

  // Pass 3: Tactical Unit Global Best-Pair Loop
  let tacticalSteps = 0;
  while (tacticalSteps++ < MAX_TACTICAL_STEPS && state.phase === 'playing') {
    promoteEligibleUnits();
    const ctx = buildSpatialContext(state, playerId);
    let best: ScoredAction | null = null;

    for (const unit of ctx.ownUnits) {
      if (unit.actedThisTurn && !unit.canEscapeMove && !unit.canPersistAttack) continue;

      // 3.0 Explicit City/Village Capture (highest tactical priority!)
      if (canUnitCapture(state, unit.id)) {
        const rawScore = scoreCapture(state, unit, profile);
        const score = rawScore + noiseOffset(state.rngState, saltCounter++, diff.noiseRange * 0.25);
        if (!best || score > best.score) {
          best = {
            action: { type: 'CAPTURE_CITY', unitId: unit.id },
            score,
          };
        }
        continue;
      }

      // 3.0b Explicit Ancient Ruins Exploration (high tactical priority!)
      if (canUnitExploreRuins(state, unit.id)) {
        const rawScore = scoreExploreRuins(state, unit, ctx);
        const score = rawScore + noiseOffset(state.rngState, saltCounter++, diff.noiseRange * 0.25);
        if (!best || score > best.score) {
          best = {
            action: { type: 'EXPLORE_RUINS', unitId: unit.id },
            score,
          };
        }
        continue;
      }

      // 3a. Candidate Attacks
      const targets = getValidAttackTargets(state, unit.id);
      for (const targetCoord of targets) {
        const targetTile = getTile(state, targetCoord.x, targetCoord.y);
        if (!targetTile?.unitId) continue;
        const defender = state.units[targetTile.unitId];
        if (!defender || defender.ownerId === playerId) continue;
        const rawScore = scoreAttack(state, unit, defender, ctx, profile, diff);
        const score = rawScore + noiseOffset(state.rngState, saltCounter++, diff.noiseRange);
        if (!best || score > best.score) {
          best = {
            action: { type: 'ATTACK_UNIT', attackerId: unit.id, defenderId: defender.id },
            score,
          };
        }
      }

      // 3b. Candidate Moves
      const moves = getValidMoves(state, unit.id);
      for (const to of moves) {
        const rawScore = scoreMove(state, unit, to, ctx, profile, diff);
        const score = rawScore + noiseOffset(state.rngState, saltCounter++, diff.noiseRange);
        if (!best || score > best.score) {
          best = {
            action: { type: 'MOVE_UNIT', unitId: unit.id, to },
            score,
          };
        }
      }

      // 3c. Candidate Recover (Heal)
      if (!unit.hasMoved && !unit.hasAttacked && unit.hp < unit.maxHp) {
        const rawScore = scoreRecover(state, unit, profile);
        if (rawScore > 0) {
          const score = rawScore + noiseOffset(state.rngState, saltCounter++, diff.noiseRange * 0.5);
          if (!best || score > best.score) {
            best = {
              action: { type: 'RECOVER_UNIT', unitId: unit.id },
              score,
            };
          }
        }
      }
    }

    if (!best || best.score <= 2) break;
    if (!commit(best.action)) break;
    resolvePendingCityRewards();
  }

  // Pass 4: Production Pass (Train units in unoccupied cities)
  if (state.phase === 'playing') {
    const ctx = buildSpatialContext(state, playerId);
    // Prioritize threatened cities first, then higher-level cities
    const sortedCities = [...ctx.ownCities].sort(
      (a, b) => (ctx.cityThreats[b.id] ?? 0) - (ctx.cityThreats[a.id] ?? 0) || b.level - a.level,
    );

    for (const city of sortedCities) {
      if (state.phase !== 'playing') break;
      const centerTile = getTile(state, city.x, city.y);
      if (!centerTile || centerTile.unitId !== null) continue;
      if (getCityUnitCount(state, city.id) >= getCityUnitCap(state, city)) continue;

      const trainable = getTrainableUnits(state, city.id);
      if (trainable.length === 0) continue;

      const freshCtx = buildSpatialContext(state, playerId);
      let bestTrain: ScoredAction | null = null;
      for (const unitType of trainable) {
        if (freshCtx.player.gold < getUnitCost(state, playerId, unitType)) continue;
        const rawScore = scoreTrainUnit(state, city, unitType, freshCtx, profile);
        const score = rawScore + noiseOffset(state.rngState, saltCounter++, diff.noiseRange * 0.5);
        if (!bestTrain || score > bestTrain.score) {
          bestTrain = { action: { type: 'TRAIN_UNIT', cityId: city.id, unitType }, score };
        }
      }

      const threshold = (freshCtx.cityThreats[city.id] ?? 0) > 0 ? 0 : diff.productionThreshold;
      if (bestTrain && bestTrain.score >= threshold) {
        commit(bestTrain.action);
      }
    }

    // Spend any leftover gold (e.g. from Orc Spoils of War or ruins) on remaining economy actions
    runEconomyPass();
  }

  if (state.phase === 'playing') {
    actions.push({ type: 'END_TURN' });
  }

  return actions;
}
