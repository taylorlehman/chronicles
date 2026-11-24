export { planAITurn } from './planner';
export { DIFFICULTY_CONFIGS, FACTION_AI_PROFILES } from './profiles';
export {
  buildSpatialContext,
  chooseCityReward,
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
export type { DifficultyConfig, FactionAIProfile, ScoredAction } from './types';
