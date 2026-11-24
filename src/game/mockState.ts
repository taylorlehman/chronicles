import { FACTION_DEFINITIONS } from './data/factions';
import { UNIT_DEFINITIONS } from './data/units';
import {
  tileIndex,
  type City,
  type FactionId,
  type GameState,
  type PlayerState,
  type TerrainType,
  type Tile,
  type Unit,
  type UnitType,
} from './types';

/**
 * Deterministic 16x16 mock GameState with all 4 LOTR factions, varied terrains,
 * cities of different levels, base & unique units, resources, neutral villages,
 * and realistic partial fog-of-war for parallel UI & 3D Renderer development.
 */
export function createMockGameState(humanFaction: FactionId = 'humans'): GameState {
  const mapSize = 16 as const;
  const factionOrder: FactionId[] = ['humans', 'orcs', 'elves', 'dwarves'];
  // Put humanFaction first as p0 for convenience
  const orderedFactions: FactionId[] = [
    humanFaction,
    ...factionOrder.filter((f) => f !== humanFaction),
  ];

  // Quadrant biomes: NW=humans, NE=orcs, SW=elves, SE=dwarves
  const biomeAt = (x: number, y: number): FactionId => {
    if (x < 8 && y < 8) return 'humans';
    if (x >= 8 && y < 8) return 'orcs';
    if (x < 8 && y >= 8) return 'elves';
    return 'dwarves';
  };

  const tiles: Tile[] = [];
  for (let y = 0; y < mapSize; y++) {
    for (let x = 0; x < mapSize; x++) {
      const biome = biomeAt(x, y);
      let terrain: TerrainType = 'plains';

      // Scenic central river/lake tiles (with wide land bridges)
      if (
        (x === 7 && (y === 3 || y === 4 || y === 11 || y === 12)) ||
        (x === 8 && (y === 3 || y === 12)) ||
        (y === 7 && (x === 3 || x === 12))
      ) {
        terrain = 'water';
      } else if (biome === 'orcs' && (x + y) % 2 === 0) {
        terrain = 'wasteland';
      } else if (biome === 'elves' && (x + y) % 2 === 1) {
        terrain = (x + y) % 4 === 1 ? 'ancient_woods' : 'forest';
      } else if (biome === 'dwarves' && (x + y) % 2 === 0) {
        terrain = 'mountain';
      } else if ((x * 7 + y * 13) % 5 === 0) {
        terrain = 'forest';
      } else if ((x * 3 + y * 5) % 9 === 0) {
        terrain = 'mountain';
      }

      tiles.push({
        x,
        y,
        terrain,
        biome,
        resource: null,
        improvement: null,
        hasRoad: false,
        hasVillage: false,
        cityId: null,
        isCityCenter: false,
        unitId: null,
      });
    }
  }

  const setTile = (x: number, y: number, patch: Partial<Tile>) => {
    const t = tiles[tileIndex(x, y, mapSize)];
    if (t) Object.assign(t, patch);
  };

  // Capital coordinates in the 4 quadrants (2-tile edge margin on 16x16)
  const capitalsByFaction: Record<
    FactionId,
    { x: number; y: number; level: number; walls: boolean }
  > = {
    humans: { x: 2, y: 2, level: 3, walls: true },
    orcs: { x: 13, y: 2, level: 2, walls: false },
    elves: { x: 2, y: 13, level: 2, walls: false },
    dwarves: { x: 13, y: 13, level: 3, walls: true },
  };

  const players: PlayerState[] = orderedFactions.map((faction, idx) => {
    const def = FACTION_DEFINITIONS[faction];
    const revealed = new Array<boolean>(mapSize * mapSize).fill(false);
    const cap = capitalsByFaction[faction];
    // Reveal 5x5 around capital (and larger area for human so mock view looks lively)
    const radius = idx === 0 ? 5 : 2;
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const rx = cap.x + dx;
        const ry = cap.y + dy;
        if (rx >= 0 && ry >= 0 && rx < mapSize && ry < mapSize) {
          revealed[tileIndex(rx, ry, mapSize)] = true;
        }
      }
    }
    return {
      id: `p${idx}`,
      faction,
      name: def.name,
      isHuman: idx === 0,
      gold: def.startingGold + 4,
      goldPerTurn: 4,
      score: 450 + idx * 30,
      techs: [def.startingTech],
      revealedTiles: revealed,
      alive: true,
      eliminatedOnTurn: null,
    };
  });

  const cities: Record<string, City> = {};
  const units: Record<string, Unit> = {};
  let nextEntityId = 1;

  const makeUnit = (
    ownerId: string,
    type: UnitType,
    x: number,
    y: number,
    homeCityId: string | null,
  ): Unit => {
    const def = UNIT_DEFINITIONS[type];
    const id = `u${nextEntityId++}`;
    const unit: Unit = {
      id,
      type,
      ownerId,
      homeCityId,
      x,
      y,
      hp: def.maxHp,
      maxHp: def.maxHp,
      kills: 0,
      isVeteran: false,
      canPromote: false,
      hasMoved: false,
      hasAttacked: false,
      canEscapeMove: false,
      canPersistAttack: false,
      actedThisTurn: false,
      canCapture: false,
      canExploreRuins: false,
    };
    units[id] = unit;
    setTile(x, y, { unitId: id });
    return unit;
  };

  for (const player of players) {
    const def = FACTION_DEFINITIONS[player.faction];
    const cap = capitalsByFaction[player.faction];
    const cityId = `c${nextEntityId++}`;
    const city: City = {
      id: cityId,
      name: def.cityNames[0],
      ownerId: player.id,
      styleFaction: player.faction,
      x: cap.x,
      y: cap.y,
      isCapital: true,
      level: cap.level,
      population: 1,
      hasWorkshop: cap.level >= 2,
      hasWalls: cap.walls,
      borderRadius: 1,
      parks: 0,
      pendingLevelRewards: [],
      connectedToCapital: true,
    };
    cities[cityId] = city;

    // Claim 3x3 territory and clear water at capital
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const tx = cap.x + dx;
        const ty = cap.y + dy;
        const t = tiles[tileIndex(tx, ty, mapSize)];
        if (t) {
          if (t.terrain === 'water') t.terrain = 'plains';
          t.cityId = cityId;
        }
      }
    }
    setTile(cap.x, cap.y, {
      terrain: player.faction === 'orcs' ? 'wasteland' : 'plains',
      isCityCenter: true,
      resource: null,
      hasVillage: false,
    });

    // Spawn starting unit on capital + unique unit nearby for visual showcase
    makeUnit(player.id, def.startingUnit, cap.x, cap.y, cityId);
    const ux = cap.x < 8 ? cap.x + 1 : cap.x - 1;
    const uy = cap.y;
    setTile(ux, uy, { terrain: 'plains' });
    makeUnit(player.id, def.uniqueUnit, ux, uy, cityId);
  }

  // Add sample resources, improvements, roads, neutral villages, and ancient ruins
  setTile(1, 2, { terrain: 'plains', resource: 'berries' });
  setTile(2, 1, { terrain: 'plains', improvement: 'farm', hasRoad: true });
  setTile(2, 3, { terrain: 'forest', resource: 'game' });
  setTile(3, 2, { hasRoad: true });
  setTile(14, 13, { terrain: 'mountain', improvement: 'mine' });
  setTile(13, 14, { terrain: 'mountain', resource: 'mithril' });
  setTile(12, 13, { terrain: 'mountain', resource: 'ore' });
  setTile(1, 13, { terrain: 'ancient_woods', improvement: 'sanctuary' });

  // Neutral villages & central ruins across 16x16
  const mockVillages: [number, number][] = [
    [5, 2],
    [2, 5],
    [10, 2],
    [13, 5],
    [2, 10],
    [5, 13],
    [13, 10],
    [10, 13],
    [6, 6],
    [9, 6],
    [6, 9],
    [9, 9],
    [8, 4],
    [7, 10],
  ];
  for (const [vx, vy] of mockVillages) {
    setTile(vx, vy, { terrain: 'plains', hasVillage: true, resource: null });
  }

  const mockRuins: [number, number][] = [
    [7, 7],
    [4, 7],
    [11, 7],
    [7, 1],
    [8, 14],
    [4, 11],
  ];
  for (const [rx, ry] of mockRuins) {
    setTile(rx, ry, { terrain: 'plains', resource: 'ruins', hasVillage: false });
  }

  return {
    config: {
      humanFaction,
      difficulty: 'normal',
      mapSize,
      maxTurns: 30,
      seed: 1337,
    },
    mapSize,
    turn: 1,
    activePlayerIndex: 0,
    phase: 'playing',
    winnerId: null,
    winReason: null,
    rngState: 1337,
    nextEntityId,
    players,
    tiles,
    cities,
    units,
  };
}
