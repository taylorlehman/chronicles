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
  CHOP_FOREST_GOLD,
  HARVEST_COST,
  PLANT_WOODS_COST,
  RESOURCE_POP_GAIN,
  ROAD_COST,
  calculatePlayerIncome,
  calculatePlayerScore,
  canPassMountains,
  canResearchTech,
  canUnitCapture,
  canUnitExploreRuins,
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
  getPlayer,
  getPlayerCities,
  getPlayerUnits,
  getTechCost,
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
} from './rules';

// Core Simulation Engine
export { applyAction, cloneState, createGame } from './engine';
