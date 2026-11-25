import { ALL_FACTIONS, FACTION_DEFINITIONS } from './data';
import { generateMap } from './mapGen';
import { normalizeSeed } from './rng';
import {
  calculatePlayerIncome,
  calculatePlayerScore,
  chebyshevDist,
  computeCapitalConnections,
  getPlayerCities,
  getUnitTrainMaxHp,
} from './rules';
import {
  getTile,
  tileIndex,
  type City,
  type Coord,
  type Difficulty,
  type FactionId,
  type GameState,
  type MapSize,
  type PlayerId,
  type PlayerState,
  type ResourceType,
  type TerrainType,
  type Tile,
  type Unit,
  type UnitType,
} from './types';

export interface TutorialGameOptions {
  humanFaction: FactionId;
  difficulty: Difficulty;
  mapSize: MapSize;
  maxTurns?: number;
}

export interface TutorialScenarioCoords {
  capitalCoord: Coord;
  moveTargetCoord: Coord;
  villageCoord: Coord;
  resourceCoords: [Coord, Coord];
  enemyCoord: Coord;
  enemyUnitId: string;
  starterUnitId: string;
}

export interface TutorialGameResult {
  state: GameState;
  scenario: TutorialScenarioCoords;
}

/** Deterministic curated seed for the tutorial continent. */
const TUTORIAL_SEED = 20261124;

/** Human starting gold in tutorial so Turn 1 supports 2 harvests (4★) + a Tech (3-5★). */
const TUTORIAL_STARTING_GOLD = 10;

/** Scripted rival warrior HP so a single strike from any faction's starter unit is a 1-hit KO. */
const TUTORIAL_ENEMY_HP = 6;

interface ResourceSpec {
  terrain: TerrainType;
  resource: ResourceType;
}

const FACTION_TUTORIAL_RESOURCES: Record<FactionId, [ResourceSpec, ResourceSpec]> = {
  humans: [
    { terrain: 'plains', resource: 'berries' },
    { terrain: 'plains', resource: 'berries' },
  ],
  orcs: [
    { terrain: 'plains', resource: 'berries' },
    { terrain: 'forest', resource: 'game' },
  ],
  elves: [
    { terrain: 'ancient_woods', resource: 'berries' },
    { terrain: 'forest', resource: 'game' },
  ],
  dwarves: [
    { terrain: 'mountain', resource: 'ore' },
    { terrain: 'mountain', resource: 'ore' },
  ],
};

function clearLandTerrainForBiome(biome: FactionId): TerrainType {
  return biome === 'orcs' ? 'wasteland' : 'plains';
}

function getTileAt(tiles: Tile[], size: number, x: number, y: number): Tile | null {
  if (x < 0 || y < 0 || x >= size || y >= size) return null;
  return tiles[tileIndex(x, y, size)] ?? null;
}

function allocId(state: GameState, prefix: string): string {
  const id = `${prefix}_${state.nextEntityId}`;
  state.nextEntityId += 1;
  return id;
}

function revealRadius(
  state: GameState,
  player: PlayerState,
  cx: number,
  cy: number,
  radius: number,
): void {
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const x = cx + dx;
      const y = cy + dy;
      if (x < 0 || y < 0 || x >= state.mapSize || y >= state.mapSize) continue;
      player.revealedTiles[tileIndex(x, y, state.mapSize)] = true;
    }
  }
}

function assignCityBorders(state: GameState, city: City): void {
  const r = city.borderRadius;
  for (let dy = -r; dy <= r; dy++) {
    for (let dx = -r; dx <= r; dx++) {
      const t = getTile(state, city.x + dx, city.y + dy);
      if (!t) continue;
      if (t.cityId === null) {
        t.cityId = city.id;
      }
    }
  }
  const center = getTile(state, city.x, city.y);
  if (center) {
    center.cityId = city.id;
    center.isCityCenter = true;
    center.hasVillage = false;
  }
}

function createUnitEntity(
  state: GameState,
  ownerId: PlayerId,
  unitType: UnitType,
  x: number,
  y: number,
  homeCityId: string | null,
  options?: { ready?: boolean; hp?: number },
): Unit {
  const maxHp = getUnitTrainMaxHp(state, ownerId, unitType);
  const ready = options?.ready ?? true;
  const hp = options?.hp !== undefined ? Math.min(maxHp, Math.max(1, options.hp)) : maxHp;
  const unit: Unit = {
    id: allocId(state, 'unit'),
    type: unitType,
    ownerId,
    homeCityId,
    x,
    y,
    hp,
    maxHp,
    kills: 0,
    isVeteran: false,
    canPromote: false,
    hasMoved: !ready,
    hasAttacked: !ready,
    canEscapeMove: false,
    canPersistAttack: false,
    actedThisTurn: !ready,
    canCapture: false,
    canExploreRuins: false,
  };
  state.units[unit.id] = unit;
  const tile = getTile(state, x, y);
  if (tile) tile.unitId = unit.id;
  return unit;
}

function refreshPlayerStats(state: GameState): void {
  for (const player of state.players) {
    if (player.faction === 'humans') {
      const connected = computeCapitalConnections(state, player.id);
      for (const city of getPlayerCities(state, player.id)) {
        city.connectedToCapital = connected.has(city.id);
      }
    }
    player.goldPerTurn = calculatePlayerIncome(state, player.id);
    player.score = calculatePlayerScore(state, player.id);
  }
}

/**
 * Ensures every target coordinate is 8-directionally reachable from `anchor`
 * via tiles that are neither `water` nor `mountain`, without modifying protected tiles.
 */
function ensureTutorialConnectivity(
  tiles: Tile[],
  size: number,
  anchor: Coord,
  targets: Coord[],
  protectedKeys: Set<string>,
): void {
  const isWalkable = (t: Tile): boolean => t.terrain !== 'water' && t.terrain !== 'mountain';

  const flood = (): Uint8Array => {
    const visited = new Uint8Array(size * size);
    const startIdx = tileIndex(anchor.x, anchor.y, size);
    visited[startIdx] = 1;
    const queue: Coord[] = [anchor];
    let head = 0;
    while (head < queue.length) {
      const curr = queue[head++];
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = curr.x + dx;
          const ny = curr.y + dy;
          const nt = getTileAt(tiles, size, nx, ny);
          if (!nt || !isWalkable(nt)) continue;
          const nIdx = tileIndex(nx, ny, size);
          if (!visited[nIdx]) {
            visited[nIdx] = 1;
            queue.push({ x: nx, y: ny });
          }
        }
      }
    }
    return visited;
  };

  let visited = flood();
  for (const target of targets) {
    const tIdx = tileIndex(target.x, target.y, size);
    if (visited[tIdx]) continue;

    let cx = target.x;
    let cy = target.y;
    let guard = size * 4;
    while (!visited[tileIndex(cx, cy, size)] && guard-- > 0) {
      const tile = getTileAt(tiles, size, cx, cy);
      if (tile && !isWalkable(tile) && !protectedKeys.has(`${cx},${cy}`)) {
        tile.terrain = clearLandTerrainForBiome(tile.biome);
        if (tile.resource === 'ore' || tile.resource === 'mithril') {
          tile.resource = null;
        }
      }
      if (cx === anchor.x && cy === anchor.y) break;
      if (cx < anchor.x) cx++;
      else if (cx > anchor.x) cx--;
      if (cy < anchor.y) cy++;
      else if (cy > anchor.y) cy--;
    }
    visited = flood();
  }
}

/**
 * Sets up a fair 3x3 starting territory around an AI rival's capital.
 */
function prepareRivalCapitalRing(
  tiles: Tile[],
  mapSize: MapSize,
  cap: Coord,
  faction: FactionId,
): void {
  const capTile = getTileAt(tiles, mapSize, cap.x, cap.y)!;
  capTile.terrain = clearLandTerrainForBiome(faction);
  capTile.biome = faction;
  capTile.resource = null;
  capTile.improvement = null;
  capTile.hasVillage = false;

  const ring: Tile[] = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const t = getTileAt(tiles, mapSize, cap.x + dx, cap.y + dy);
      if (t) ring.push(t);
    }
  }

  for (const t of ring) {
    t.biome = faction;
    if (t.terrain === 'water' || t.terrain === 'mountain') {
      t.terrain = clearLandTerrainForBiome(faction);
    }
    t.resource = null;
    t.improvement = null;
    t.hasVillage = false;
  }

  if (faction === 'humans') {
    ring[0].terrain = 'plains';
    ring[0].resource = 'berries';
    ring[1].terrain = 'plains';
    ring[1].resource = 'berries';
    ring[2].terrain = 'forest';
    ring[2].resource = 'game';
  } else if (faction === 'orcs') {
    ring[0].terrain = 'plains';
    ring[0].resource = 'berries';
    ring[1].terrain = 'forest';
    ring[1].resource = 'game';
    ring[2].terrain = 'wasteland';
  } else if (faction === 'elves') {
    ring[0].terrain = 'ancient_woods';
    ring[0].resource = 'berries';
    ring[1].terrain = 'ancient_woods';
    ring[2].terrain = 'forest';
    ring[2].resource = 'game';
  } else if (faction === 'dwarves') {
    ring[0].terrain = 'mountain';
    ring[0].resource = 'ore';
    ring[1].terrain = 'mountain';
    ring[1].resource = 'mithril';
    ring[2].terrain = 'plains';
    ring[2].resource = 'berries';
  }
}

/**
 * Creates a deterministic, curated tutorial match where the human player starts
 * near the center of the continent with staged resources, an adjacent neutral village,
 * and a weakened rival warrior — then continues seamlessly as a full 4-player match.
 */
export function createTutorialGame(options: TutorialGameOptions): TutorialGameResult {
  const { humanFaction, difficulty, mapSize } = options;
  const maxTurns = options.maxTurns ?? 0;
  const seed = normalizeSeed(TUTORIAL_SEED);

  // Start from the deterministic generated continent for rich natural terrain & villages
  const generated = generateMap(mapSize, seed);
  const tiles = generated.tiles;

  // Deterministic central staging coordinates
  const cx = mapSize === 18 ? 8 : 7;
  const cy = mapSize === 18 ? 8 : 7;

  const capitalCoord: Coord = { x: cx, y: cy };
  const moveTargetCoord: Coord = { x: cx + 1, y: cy };
  const villageCoord: Coord = { x: cx + 2, y: cy };
  const resourceCoords: [Coord, Coord] = [
    { x: cx - 1, y: cy },
    { x: cx, y: cy - 1 },
  ];
  // The rival Orc warrior stands right on top of the neutral Village to capture!
  const enemyCoord: Coord = { x: cx + 2, y: cy };

  // Place human first, followed by the 3 rival factions (prefer Orcs first as the tutorial opponent)
  const otherFactions = ALL_FACTIONS.filter((f) => f !== humanFaction);
  const rivalFactions: FactionId[] = otherFactions.includes('orcs')
    ? ['orcs', ...otherFactions.filter((f) => f !== 'orcs')]
    : otherFactions;
  const factionOrder: FactionId[] = [humanFaction, ...rivalFactions];

  // Place 3 rival capitals cleanly in outer flanks far from the tutorial center
  const rivalAnchors: Coord[] = [
    { x: mapSize - 3, y: 2 },
    { x: 2, y: 2 },
    { x: 2, y: mapSize - 3 },
  ];
  const capitalCoords = {} as Record<FactionId, Coord>;
  capitalCoords[humanFaction] = capitalCoord;
  for (let i = 0; i < rivalFactions.length; i++) {
    capitalCoords[rivalFactions[i]] = rivalAnchors[i];
  }

  // Clear conflicting villages/ruins near the tutorial stage and rival capitals
  for (const tile of tiles) {
    const nearTutorialStage =
      chebyshevDist(tile, capitalCoord) <= 2 ||
      chebyshevDist(tile, villageCoord) <= 2 ||
      chebyshevDist(tile, enemyCoord) <= 1;
    const nearRivalCapital = rivalAnchors.some((rc) => chebyshevDist(tile, rc) <= 2);

    if (nearTutorialStage || nearRivalCapital) {
      tile.hasVillage = false;
      if (tile.resource === 'ruins') {
        tile.resource = null;
      }
    }
  }

  // Sculpt human capital's 3x3 ring cleanly so the 2 tutorial resources are unmistakable
  const humanCapTile = getTileAt(tiles, mapSize, cx, cy)!;
  humanCapTile.terrain = clearLandTerrainForBiome(humanFaction);
  humanCapTile.biome = humanFaction;
  humanCapTile.resource = null;
  humanCapTile.improvement = null;
  humanCapTile.hasRoad = false;
  humanCapTile.hasVillage = false;

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const t = getTileAt(tiles, mapSize, cx + dx, cy + dy);
      if (!t) continue;
      t.biome = humanFaction;
      t.resource = null;
      t.improvement = null;
      t.hasRoad = false;
      t.hasVillage = false;
      if (t.terrain === 'water' || t.terrain === 'mountain') {
        t.terrain = clearLandTerrainForBiome(humanFaction);
      }
    }
  }

  // Stage the 2 faction-appropriate harvestable resource tiles inside capital borders
  const [resSpec0, resSpec1] = FACTION_TUTORIAL_RESOURCES[humanFaction];
  const resTile0 = getTileAt(tiles, mapSize, resourceCoords[0].x, resourceCoords[0].y)!;
  resTile0.terrain = resSpec0.terrain;
  resTile0.biome = humanFaction;
  resTile0.resource = resSpec0.resource;
  resTile0.hasVillage = false;

  const resTile1 = getTileAt(tiles, mapSize, resourceCoords[1].x, resourceCoords[1].y)!;
  resTile1.terrain = resSpec1.terrain;
  resTile1.biome = humanFaction;
  resTile1.resource = resSpec1.resource;
  resTile1.hasVillage = false;

  // Stage the move target tile 1 tile East of capital (clean passable plains, no village)
  const moveTargetTile = getTileAt(tiles, mapSize, moveTargetCoord.x, moveTargetCoord.y)!;
  moveTargetTile.terrain = 'plains';
  moveTargetTile.biome = humanFaction;
  moveTargetTile.resource = null;
  moveTargetTile.improvement = null;
  moveTargetTile.hasRoad = false;
  moveTargetTile.hasVillage = false;

  // Stage the neutral village 2 tiles East of capital — guarded directly by the rival warrior!
  const villageTile = getTileAt(tiles, mapSize, villageCoord.x, villageCoord.y)!;
  villageTile.terrain = 'plains';
  villageTile.biome = rivalFactions[0];
  villageTile.resource = null;
  villageTile.improvement = null;
  villageTile.hasRoad = false;
  villageTile.hasVillage = true;

  // Prepare the 3 rival capital rings
  for (let i = 0; i < rivalFactions.length; i++) {
    prepareRivalCapitalRing(tiles, mapSize, rivalAnchors[i], rivalFactions[i]);
  }

  // Guarantee land connectivity across all capitals, staged tiles, and neutral villages
  const protectedKeys = new Set<string>([
    `${resourceCoords[0].x},${resourceCoords[0].y}`,
    `${resourceCoords[1].x},${resourceCoords[1].y}`,
  ]);
  const connectivityTargets: Coord[] = [
    villageCoord,
    enemyCoord,
    ...rivalAnchors,
    ...tiles.filter((t) => t.hasVillage).map((t) => ({ x: t.x, y: t.y })),
  ];
  ensureTutorialConnectivity(tiles, mapSize, capitalCoord, connectivityTargets, protectedKeys);

  // Build players
  const players: PlayerState[] = factionOrder.map((faction) => {
    const def = FACTION_DEFINITIONS[faction];
    const isHuman = faction === humanFaction;
    return {
      id: `player_${faction}`,
      faction,
      name: def.name,
      isHuman,
      gold: isHuman ? TUTORIAL_STARTING_GOLD : def.startingGold,
      goldPerTurn: 0,
      score: 0,
      techs: [def.startingTech],
      revealedTiles: new Array<boolean>(mapSize * mapSize).fill(false),
      alive: true,
      eliminatedOnTurn: null,
    };
  });

  const state: GameState = {
    config: {
      humanFaction,
      difficulty,
      mapSize,
      maxTurns,
      seed,
    },
    mapSize,
    turn: 1,
    activePlayerIndex: 0,
    phase: 'playing',
    winnerId: null,
    winReason: null,
    rngState: generated.rngState,
    nextEntityId: 1,
    players,
    tiles,
    cities: {},
    units: {},
  };

  let starterUnitId = '';

  // Spawn capitals & starting units for all 4 players
  for (const player of state.players) {
    const def = FACTION_DEFINITIONS[player.faction];
    const cap = capitalCoords[player.faction];
    const cityId = allocId(state, 'city');
    const city: City = {
      id: cityId,
      name: def.cityNames[0],
      ownerId: player.id,
      styleFaction: player.faction,
      x: cap.x,
      y: cap.y,
      isCapital: true,
      level: 1,
      population: 0,
      hasWorkshop: false,
      hasWalls: false,
      borderRadius: 1,
      parks: 0,
      pendingLevelRewards: [],
      connectedToCapital: true,
    };
    state.cities[cityId] = city;
    assignCityBorders(state, city);

    revealRadius(state, player, cap.x, cap.y, 2);

    const starter = createUnitEntity(state, player.id, def.startingUnit, cap.x, cap.y, cityId, {
      ready: true,
    });
    if (player.isHuman) {
      starterUnitId = starter.id;
    }
  }

  // Ensure the staged neutral village tile is unclaimed (not swallowed by capital's 3x3 borders)
  villageTile.cityId = null;
  villageTile.isCityCenter = false;
  villageTile.hasVillage = true;

  // Explicitly ensure all key tutorial tiles are revealed to the human player
  const humanPlayer = state.players[0];
  for (const coord of [
    capitalCoord,
    moveTargetCoord,
    villageCoord,
    resourceCoords[0],
    resourceCoords[1],
    enemyCoord,
  ]) {
    humanPlayer.revealedTiles[tileIndex(coord.x, coord.y, mapSize)] = true;
  }

  // Spawn the weakened rival warrior directly on top of the neutral Village at enemyCoord/villageCoord
  const rivalPlayer = state.players[1];
  const enemyUnit = createUnitEntity(
    state,
    rivalPlayer.id,
    'warrior',
    enemyCoord.x,
    enemyCoord.y,
    null,
    { ready: true, hp: TUTORIAL_ENEMY_HP },
  );
  revealRadius(state, rivalPlayer, enemyCoord.x, enemyCoord.y, 1);

  refreshPlayerStats(state);

  return {
    state,
    scenario: {
      capitalCoord,
      moveTargetCoord,
      villageCoord,
      resourceCoords,
      enemyCoord,
      enemyUnitId: enemyUnit.id,
      starterUnitId,
    },
  };
}
