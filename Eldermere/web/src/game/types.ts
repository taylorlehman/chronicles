/**
 * Frozen shared data contracts for Middle-earth: Polytopia.
 * Pure TypeScript — ZERO Three.js or DOM imports.
 */

export type FactionId = 'humans' | 'orcs' | 'elves' | 'dwarves';
export type PlayerId = string;
export type Difficulty = 'easy' | 'normal';
export type MapSize = 16 | 18;
export type PlayerAge = 1 | 2 | 3;

export interface Coord {
  x: number;
  y: number;
}

export type TerrainType =
  | 'plains'
  | 'forest'
  | 'ancient_woods'
  | 'mountain'
  | 'wasteland'
  | 'water';

export type ResourceType = 'berries' | 'game' | 'ore' | 'mithril' | 'ruins';

export type ImprovementType =
  | 'farm'
  | 'windmill'
  | 'slag_pit'
  | 'foundry'
  | 'sanctuary'
  | 'mine'
  | 'great_forge';

export type UnitType =
  | 'warrior'
  | 'defender'
  | 'archer'
  | 'rider'
  | 'catapult'
  | 'rohirrim_knight'
  | 'uruk_berserker'
  | 'elven_sentinel'
  | 'ironbreaker'
  | 'dragon'
  | 'watchtower';

export type UnitTrait =
  | 'dash'
  | 'fortify'
  | 'escape'
  | 'siege'
  | 'persist'
  | 'bloodlust'
  | 'skirmish'
  | 'stalwart'
  | 'flying';

export type TechSlot = 'root' | 'a' | 'b' | 'capstone';

export type TechId =
  // Humans (16: 4 pillars × 4)
  | 'humans_gathering'
  | 'humans_farming'
  | 'humans_granaries'
  | 'humans_milling'
  | 'humans_roads'
  | 'humans_shield_wall'
  | 'humans_citadel_masonry'
  | 'humans_stewards_citadel'
  | 'humans_riding'
  | 'humans_plains_charge'
  | 'humans_chivalry'
  | 'humans_ride_of_rohirrim'
  | 'humans_hunting'
  | 'humans_archery'
  | 'humans_mountaineering'
  | 'humans_siegecraft'
  // Orcs (16: 4 pillars × 4)
  | 'orcs_pillage'
  | 'orcs_warg_riders'
  | 'orcs_spoils_mastery'
  | 'orcs_pack_tactics'
  | 'orcs_clear_cutting'
  | 'orcs_dark_forges'
  | 'orcs_siege_works'
  | 'orcs_mount_doom'
  | 'orcs_shield_wall'
  | 'orcs_uruk_breeding'
  | 'orcs_war_barracks'
  | 'orcs_black_gate'
  | 'orcs_snaga_archers'
  | 'orcs_black_arrows'
  | 'orcs_crag_climbing'
  | 'orcs_fell_volley'
  // Elves (16: 4 pillars × 4)
  | 'elves_woodland_lore'
  | 'elves_sanctuaries'
  | 'elves_tree_singing'
  | 'elves_lothlorien_sanctum'
  | 'elves_woodland_aim'
  | 'elves_sentinel_order'
  | 'elves_keen_sight'
  | 'elves_galadhrim_precision'
  | 'elves_elven_steeds'
  | 'elves_wardens'
  | 'elves_graceful_guard'
  | 'elves_wind_riders'
  | 'elves_high_paths'
  | 'elves_elven_lore'
  | 'elves_mallorn_siege'
  | 'elves_rings_preservation'
  // Dwarves (16: 4 pillars × 4)
  | 'dwarves_delving'
  | 'dwarves_mining'
  | 'dwarves_khazad_forges'
  | 'dwarves_heart_of_mountain'
  | 'dwarves_shieldbearers'
  | 'dwarves_mithril_smithing'
  | 'dwarves_runic_plate'
  | 'dwarves_mithril_phalanx'
  | 'dwarves_foraging'
  | 'dwarves_stone_walls'
  | 'dwarves_crossbows'
  | 'dwarves_deep_vaults'
  | 'dwarves_ram_riders'
  | 'dwarves_siegecraft'
  | 'dwarves_horned_charge'
  | 'dwarves_dragon_slayers';

export type CityRewardChoice =
  | 'workshop'
  | 'explorer'
  | 'city_wall'
  | 'resources'
  | 'border_growth'
  | 'pop_growth'
  | 'champion'
  | 'park';

export interface Tile {
  x: number;
  y: number;
  terrain: TerrainType;
  /** Biome tint for visual flavor (matches nearest starting faction quadrant). */
  biome: FactionId;
  resource: ResourceType | null;
  improvement: ImprovementType | null;
  hasRoad: boolean;
  /** True when an unclaimed neutral village occupies this tile. */
  hasVillage: boolean;
  /** Owning city ID if this tile is inside a city's borders. */
  cityId: string | null;
  /** True if this tile is the center of `cityId`. */
  isCityCenter: boolean;
  /** Occupying unit ID, if any (kept in sync with `GameState.units`). */
  unitId: string | null;
}

export interface City {
  id: string;
  name: string;
  ownerId: PlayerId;
  /** Faction whose architectural style this city uses (typically the founding/capturing faction). */
  styleFaction: FactionId;
  x: number;
  y: number;
  isCapital: boolean;
  level: number;
  /** Current population progress toward `level + 1`. */
  population: number;
  hasWorkshop: boolean;
  hasWalls: boolean;
  /** 1 = 3x3 borders, 2 = 5x5 borders. */
  borderRadius: 1 | 2;
  /** Number of Parks built at Lv 5+. */
  parks: number;
  /** Queue of city levels awaiting a player/AI reward pick. */
  pendingLevelRewards: number[];
  /** Whether connected to owner's capital (for Humans Beacon Network). */
  connectedToCapital: boolean;
}

export interface Unit {
  id: string;
  type: UnitType;
  ownerId: PlayerId;
  /** Home city ID for unit cap accounting (null if capital/champion without cap). */
  homeCityId: string | null;
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  kills: number;
  isVeteran: boolean;
  canPromote: boolean;
  hasMoved: boolean;
  hasAttacked: boolean;
  /** True after attacking for units with `escape`/`skirmish` until they use their post-attack move. */
  canEscapeMove: boolean;
  /** True after a kill for units with `persist` allowing another attack this turn. */
  canPersistAttack: boolean;
  /** True if unit has finished its turn (e.g. recovered or exhausted). */
  actedThisTurn: boolean;
  /** True at the start of the owner's turn when standing on a neutral Village or enemy City. */
  canCapture?: boolean;
  /** True at the start of the owner's turn when standing on unclaimed Ancient Ruins. */
  canExploreRuins?: boolean;
}

export interface LeaderboardEntry {
  playerId: PlayerId;
  faction: FactionId;
  name: string;
  score: number;
  citiesCount: number;
  unitsCount: number;
  techsCount: number;
  isEliminated: boolean;
  isHuman: boolean;
  rank: number;
}

export interface PlayerState {
  id: PlayerId;
  faction: FactionId;
  name: string;
  isHuman: boolean;
  gold: number;
  goldPerTurn: number;
  score: number;
  techs: TechId[];
  /** Flat boolean array of length `mapSize * mapSize` (`y * mapSize + x`). */
  revealedTiles: boolean[];
  alive: boolean;
  eliminatedOnTurn: number | null;
  superpowerUsed: boolean;
}

export interface GameConfig {
  humanFaction: FactionId;
  difficulty: Difficulty;
  mapSize: MapSize;
  maxTurns: number;
  seed: number;
}

export interface GameState {
  config: GameConfig;
  mapSize: MapSize;
  turn: number;
  activePlayerIndex: number;
  phase: 'playing' | 'game_over';
  winnerId: PlayerId | null;
  winReason: 'domination' | 'glory' | null;
  eclipseTurnsRemaining: number;
  eclipseOwnerId: PlayerId | null;
  rngState: number;
  nextEntityId: number;
  players: PlayerState[];
  /** Flat tile array of length `mapSize * mapSize` (`y * mapSize + x`). */
  tiles: Tile[];
  cities: Record<string, City>;
  units: Record<string, Unit>;
}

export interface CombatPreview {
  attackerId: string;
  defenderId: string;
  attackerDamage: number;
  retaliationDamage: number;
  defenderKilled: boolean;
  attackerKilled: boolean;
  terrainDefenseBonus: number;
  willAdvance: boolean;
}

export interface UnitDefinition {
  type: UnitType;
  name: string;
  faction: FactionId | null; // null = shared base unit
  cost: number;
  maxHp: number;
  attack: number;
  defense: number;
  movement: number;
  range: number;
  traits: UnitTrait[];
  description: string;
}

export interface TechDefinition {
  id: TechId;
  faction: FactionId;
  pillar: string;
  pillarIndex: 0 | 1 | 2 | 3;
  tier: 1 | 2 | 3;
  slot: TechSlot;
  prerequisites: TechId[];
  name: string;
  summary: string;
  iconKey: string;
  unlocksUnits: UnitType[];
  unlocksResources: ResourceType[];
  unlocksImprovements: ImprovementType[];
  unlocksRoad?: boolean;
  unlocksChopForest?: boolean;
  unlocksPlantWoods?: boolean;
  unlocksMountainPass?: boolean;
}

export interface FactionPalette {
  primary: string;
  secondary: string;
  accent: string;
  biomeGround: string;
}

export interface FactionDefinition {
  id: FactionId;
  name: string;
  realm: string;
  tagline: string;
  startingTech: TechId;
  startingUnit: UnitType;
  startingGold: number;
  uniqueUnit: UnitType;
  uniqueMechanicName: string;
  uniqueMechanicDescription: string;
  palette: FactionPalette;
  cityNames: string[];
}

export type GameAction =
  | { type: 'MOVE_UNIT'; unitId: string; to: Coord }
  | { type: 'ATTACK_UNIT'; attackerId: string; defenderId: string }
  | { type: 'CAPTURE_CITY'; unitId: string }
  | { type: 'EXPLORE_RUINS'; unitId: string }
  | { type: 'RECOVER_UNIT'; unitId: string }
  | { type: 'PROMOTE_UNIT'; unitId: string }
  | { type: 'HARVEST_TILE'; coord: Coord }
  | { type: 'BUILD_IMPROVEMENT'; coord: Coord; improvement: ImprovementType }
  | { type: 'BUILD_ROAD'; coord: Coord }
  | { type: 'CHOP_FOREST'; coord: Coord }
  | { type: 'PLANT_ANCIENT_WOODS'; coord: Coord }
  | { type: 'TRAIN_UNIT'; cityId: string; unitType: UnitType }
  | { type: 'RESEARCH_TECH'; techId: TechId }
  | { type: 'CHOOSE_CITY_REWARD'; cityId: string; reward: CityRewardChoice }
  | { type: 'USE_SUPERPOWER'; target?: Coord }
  | { type: 'END_TURN' };

export type GameEvent =
  | { type: 'TURN_STARTED'; playerId: PlayerId; turn: number; goldGained: number }
  | { type: 'UNIT_MOVED'; unitId: string; from: Coord; to: Coord; ownerId: PlayerId }
  | {
      type: 'UNIT_ATTACKED';
      attackerId: string;
      defenderId: string;
      from: Coord;
      to: Coord;
      isRanged: boolean;
      damage: number;
      retaliationDamage: number;
      defenderKilled: boolean;
      attackerKilled: boolean;
      advanced: boolean;
    }
  | { type: 'UNIT_HEALED'; unitId: string; coord: Coord; amount: number; newHp: number }
  | { type: 'UNIT_PROMOTED'; unitId: string; coord: Coord; newMaxHp: number }
  | {
      type: 'UNIT_TRAINED';
      unitId: string;
      unitType: UnitType;
      cityId: string;
      coord: Coord;
      ownerId: PlayerId;
    }
  | { type: 'TILES_REVEALED'; playerId: PlayerId; coords: Coord[] }
  | {
      type: 'RESOURCE_HARVESTED';
      coord: Coord;
      resource: ResourceType;
      cityId: string;
      popGained: number;
      playerId: PlayerId;
    }
  | {
      type: 'IMPROVEMENT_BUILT';
      coord: Coord;
      improvement: ImprovementType;
      cityId: string;
      popGained: number;
      playerId: PlayerId;
    }
  | { type: 'ROAD_BUILT'; coord: Coord; playerId: PlayerId }
  | { type: 'FOREST_CHOPPED'; coord: Coord; goldGained: number; playerId: PlayerId }
  | {
      type: 'WOODS_PLANTED';
      coord: Coord;
      cityId: string;
      popGained: number;
      playerId: PlayerId;
    }
  | {
      type: 'RUINS_CLAIMED';
      coord: Coord;
      playerId: PlayerId;
      rewardKind: 'gold' | 'tech' | 'population';
      amount?: number;
      techId?: TechId;
      cityId?: string;
    }
  | {
      type: 'CITY_CAPTURED';
      cityId: string;
      coord: Coord;
      oldOwnerId: PlayerId | null;
      newOwnerId: PlayerId;
      wasVillage: boolean;
      spoilsGold?: number;
    }
  | { type: 'CITY_LEVELED'; cityId: string; coord: Coord; newLevel: number; ownerId: PlayerId }
  | {
      type: 'CITY_REWARD_APPLIED';
      cityId: string;
      coord: Coord;
      reward: CityRewardChoice;
      ownerId: PlayerId;
    }
  | { type: 'TECH_RESEARCHED'; playerId: PlayerId; techId: TechId; cost: number }
  | {
      type: 'SUPERPOWER_USED';
      playerId: PlayerId;
      faction: FactionId;
      target?: Coord;
      spawnedUnitId?: string;
      affectedCoords?: Coord[];
      destroyedUnitIds?: string[];
    }
  | { type: 'SPOILS_GAINED'; playerId: PlayerId; coord: Coord; amount: number }
  | { type: 'PLAYER_ELIMINATED'; playerId: PlayerId; eliminatedByPlayerId: PlayerId }
  | {
      type: 'GAME_OVER';
      winnerId: PlayerId;
      reason: 'domination' | 'glory';
      scores: Record<PlayerId, number>;
    };

export interface ActionOption {
  id: string;
  label: string;
  description: string;
  cost?: number;
  icon: string;
  action?: GameAction;
  enabled: boolean;
  disabledReason?: string;
  unitType?: UnitType;
  requiredTechId?: TechId;
}

export interface ActionResult {
  state: GameState;
  events: GameEvent[];
}

export function tileIndex(x: number, y: number, mapSize: number): number {
  return y * mapSize + x;
}

export function getTile(state: GameState, x: number, y: number): Tile | null {
  if (x < 0 || y < 0 || x >= state.mapSize || y >= state.mapSize) return null;
  return state.tiles[y * state.mapSize + x] ?? null;
}
