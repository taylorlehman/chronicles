// Types & Tile Helpers
export * from './types';

// Static Game Data
export * from './data';

// RNG & Map Generation
export { nextInt, nextRandom, normalizeSeed, shuffleArray } from './rng';
export { generateMap, type GeneratedMap } from './mapGen';

// Combat Prediction
export {
  getEffectiveAttack,
  getEffectiveDefense,
  getTerrainDefenseBonus,
  predictCombat,
} from './combat';

// Rules & Queries
export {
  AGE_ROMAN,
  AGE_THRESHOLDS,
  CHOP_FOREST_GOLD,
  HARVEST_COST,
  PLANT_WOODS_COST,
  RESOURCE_POP_GAIN,
  ROAD_COST,
  SUPERPOWER_DEFINITIONS,
  calculatePlayerIncome,
  calculatePlayerScore,
  canPassMountains,
  canResearchTech,
  canUnitCapture,
  canUnitExploreRuins,
  canUseSuperpower,
  chebyshevDist,
  computeCapitalConnections,
  getActivePlayer,
  getAvailableTileActions,
  getCityTrainOptions,
  getCityUnitCap,
  getCityUnitCount,
  getImprovementPopGain,
  getLeaderboard,
  getNeighbors8,
  getNextAgeProgress,
  getPlayer,
  getPlayerAge,
  getPlayerCities,
  getPlayerUnits,
  getSuperpowerTargetCoords,
  getTechCost,
  getTechResearchBlockReason,
  getTileActionOptions,
  getTrainableUnits,
  getUnitActionOptions,
  getUnitCost,
  getUnitEffectiveTraits,
  getUnitRange,
  getUnitTrainMaxHp,
  getValidAttackTargets,
  getValidMoves,
  hasTech,
  hasUnitRemainingActions,
  isCapturableTileForPlayer,
  isCityBesieged,
  isRuinsTile,
  unitHasTrait,
  type AgeProgressInfo,
  type SuperpowerDefinition,
} from './rules';

// Core Simulation Engine
export { applyAction, cloneState, createGame } from './engine';

// Curated Tutorial Scenario
export {
  createTutorialGame,
  type TutorialGameOptions,
  type TutorialGameResult,
  type TutorialScenarioCoords,
} from './tutorialMap';
