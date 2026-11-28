/**
 * Realistic, frozen human-player skill proxies for headless difficulty calibration.
 *
 * All three bots are decoupled from `DIFFICULTY_CONFIGS` so tuning AI difficulties
 * (`easy` / `normal` / `hard`) never silently shifts the skill yardsticks we calibrate against:
 *
 *  - `novice`  (planNoviceTurn, src/sim/noviceBot.ts):
 *      Independent scripted first-time player. Captures nearby villages/ruins, does at most
 *      1 harvest/improvement per turn (60%), researches random techs (65%), takes simple
 *      favorable fights without focus fire / healing / promotions / superpower, occasionally
 *      forgets units (25%), and trains up to 2 basic units (cost <= 3) per turn.
 *
 *  - `average` (planAverageTurn):
 *      Solid casual player who knows the rules. Upgrades cities steadily, expands purposefully,
 *      researches useful techs (~1/turn), trains a mixed roster including faction unique units,
 *      promotes veterans, heals wounded units, uses moderate focus fire & danger awareness,
 *      and unleashes Age III superpowers — with realistic human imperfection (mild noise,
 *      occasional unit neglect, 1 tech/turn).
 *
 *  - `expert`  (planExpertTurn):
 *      Strong tactical veteran (Captain-grade human proxy). Zero tactical noise, full focus
 *      fire & dash-strike lookahead, clean danger awareness, sharp economy & tech timing,
 *      full combined-arms + champion production, decisive offensive tempo, and timely
 *      superpower execution.
 */
import { planAITurn, type DifficultyConfig } from '../ai/index';
import type { GameAction, GameState } from '../game/index';
import type { SeatReport } from './harness';
import { planNoviceTurn } from './noviceBot';

export { planNoviceTurn };

/**
 * Frozen profile for an Average human player.
 * Uses `difficulty: 'hard'` solely so `resolveFactionProfile` applies each faction's full
 * identity rather than Easy's softening — never references `DIFFICULTY_CONFIGS`.
 */
export const AVERAGE_PLAYER_CONFIG: DifficultyConfig = {
  difficulty: 'hard',
  noiseRange: 12,
  economySkipChance: 0.25,
  maxEconActionsPerTurn: 3,
  earlyHumanCapitalPressure: 1.0,
  productionThreshold: -Infinity,
  dangerAwareness: 0.5,
  focusFire: 0.5,
  aggressionDelay: 1.05,
  attackRatioMult: 1.05,
  armyTargetMult: 0.85,
  armyCapMult: Infinity,
  trainSkipChance: 0.12,
  maxTrainsPerTurn: 3,
  dashLookaheadWeight: 0.55,
  simpleCityRewards: false,
  maxTechsPerTurn: 1,
  techResearchChance: 0.72,
  eliteShareScale: 0.65,
  superpowerMinTurn: 18,
  unitNeglectChance: 0.15,
  humanTargetBias: 1.0,
  humanTargetBiasMax: 1.0,
  humanPressureRampTurns: 1,
  humanGraceTurns: 1,
  gangUpOnHuman: false,
};

/**
 * Frozen profile for an Expert human player (strong tactical Captain-grade veteran).
 * Decoupled from `DIFFICULTY_CONFIGS` so calibrating AI presets never shifts the yardstick.
 */
export const EXPERT_PLAYER_CONFIG: DifficultyConfig = {
  difficulty: 'hard',
  noiseRange: 0,
  economySkipChance: 0,
  maxEconActionsPerTurn: 24,
  earlyHumanCapitalPressure: 1.0,
  productionThreshold: -Infinity,
  dangerAwareness: 1.0,
  focusFire: 1.0,
  aggressionDelay: 1.0,
  attackRatioMult: 1.0,
  armyTargetMult: 1.0,
  armyCapMult: Infinity,
  trainSkipChance: 0,
  maxTrainsPerTurn: Infinity,
  dashLookaheadWeight: 1.0,
  simpleCityRewards: false,
  maxTechsPerTurn: 2,
  techResearchChance: 1.0,
  eliteShareScale: 1.0,
  superpowerMinTurn: 1,
  unitNeglectChance: 0,
  humanTargetBias: 1.0,
  humanTargetBiasMax: 1.0,
  humanPressureRampTurns: 1,
  humanGraceTurns: 1,
  gangUpOnHuman: false,
};

export function planAverageTurn(
  state: GameState,
  playerId: string,
  report?: (r: SeatReport) => void,
): GameAction[] {
  return planAITurn(state, playerId, 'hard', {
    config: AVERAGE_PLAYER_CONFIG,
    onStrategy: report,
  });
}

export function planExpertTurn(
  state: GameState,
  playerId: string,
  report?: (r: SeatReport) => void,
): GameAction[] {
  return planAITurn(state, playerId, 'hard', {
    config: EXPERT_PLAYER_CONFIG,
    onStrategy: report,
  });
}
