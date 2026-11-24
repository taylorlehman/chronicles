import { ALL_FACTIONS } from './data';
import { nextInt, nextRandom, shuffleArray } from './rng';
import { chebyshevDist } from './rules';
import {
  tileIndex,
  type Coord,
  type FactionId,
  type MapSize,
  type TerrainType,
  type Tile,
} from './types';

export interface GeneratedMap {
  tiles: Tile[];
  capitalCoords: Record<FactionId, Coord>;
  rngState: number;
}

interface NoiseField {
  seedA: number;
  seedB: number;
  offsetX: number;
  offsetY: number;
}

interface MacroRegionSeed {
  x: number;
  y: number;
  biome: FactionId;
  /** Lower stretch makes the macro-region broader; higher keeps it compact. */
  stretch: number;
  isPrimary: boolean;
}

function hash2D(ix: number, iy: number, seedA: number, seedB: number): number {
  let h =
    (Math.imul(ix, 374761393) +
      Math.imul(iy, 668265263) +
      Math.imul(seedA, 1442695041) +
      seedB) |
    0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h = h ^ (h >>> 16);
  return (h >>> 0) / 4294967296;
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function valueNoise2D(x: number, y: number, field: NoiseField): number {
  const sx = x + field.offsetX;
  const sy = y + field.offsetY;
  const x0 = Math.floor(sx);
  const y0 = Math.floor(sy);
  const fx = smoothstep(sx - x0);
  const fy = smoothstep(sy - y0);

  const v00 = hash2D(x0, y0, field.seedA, field.seedB);
  const v10 = hash2D(x0 + 1, y0, field.seedA, field.seedB);
  const v01 = hash2D(x0, y0 + 1, field.seedA, field.seedB);
  const v11 = hash2D(x0 + 1, y0 + 1, field.seedA, field.seedB);

  const top = v00 + (v10 - v00) * fx;
  const bot = v01 + (v11 - v01) * fx;
  return top + (bot - top) * fy;
}

function fbm2D(x: number, y: number, baseScale: number, field: NoiseField): number {
  const n1 = valueNoise2D(x * baseScale, y * baseScale, field);
  const n2 = valueNoise2D(x * baseScale * 2.05 + 17.3, y * baseScale * 2.05 - 9.1, field);
  const n3 = valueNoise2D(x * baseScale * 4.1 - 11.7, y * baseScale * 4.1 + 23.4, field);
  return n1 * 0.58 + n2 * 0.28 + n3 * 0.14;
}

function makeNoiseField(rng: number): { field: NoiseField; nextState: number } {
  const r1 = nextInt(rng, 1, 0x3fffffff);
  const r2 = nextInt(r1.nextState, 1, 0x3fffffff);
  const r3 = nextRandom(r2.nextState);
  const r4 = nextRandom(r3.nextState);
  return {
    field: {
      seedA: r1.value,
      seedB: r2.value,
      offsetX: r3.value * 97,
      offsetY: r4.value * 97,
    },
    nextState: r4.nextState,
  };
}

function euclidDist(a: Coord, b: Coord): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function getTileAt(tiles: Tile[], size: number, x: number, y: number): Tile | null {
  if (x < 0 || y < 0 || x >= size || y >= size) return null;
  return tiles[tileIndex(x, y, size)] ?? null;
}

function isWalkableForAll(tile: Tile): boolean {
  return tile.terrain !== 'water' && tile.terrain !== 'mountain';
}

function clearLandTerrainForBiome(biome: FactionId): TerrainType {
  return biome === 'orcs' ? 'wasteland' : 'plains';
}

/**
 * Generates 4 well-separated, non-quadrant-locked anchor centers for the continent's
 * 4 major ecological zones (Wide Plains, Dense Forests, Mountain Range, Volcanic Ashlands),
 * plus 5–7 organic secondary wild geographic patches so sizes & shapes vary naturally.
 */
function buildMacroRegionSeeds(
  mapSize: MapSize,
  initialRng: number,
): { seeds: MacroRegionSeed[]; nextState: number } {
  let rng = initialRng;
  const minBound = 2;
  const maxBound = mapSize - 3;
  const minCheb = mapSize === 18 ? 7 : 6;
  const minEuclid = mapSize * 0.44;
  const center = (mapSize - 1) / 2;

  const isCornerLike = (c: Coord): boolean =>
    (c.x <= 3 || c.x >= mapSize - 4) && (c.y <= 3 || c.y >= mapSize - 4);

  interface AnchorLayout {
    points: Coord[];
    score: number;
  }
  const layouts: AnchorLayout[] = [];

  for (let attempt = 0; attempt < 64; attempt++) {
    const pts: Coord[] = [];
    for (let slot = 0; slot < 4; slot++) {
      let placed = false;
      for (let tries = 0; tries < 40; tries++) {
        const rx = nextInt(rng, minBound, maxBound);
        const ry = nextInt(rx.nextState, minBound, maxBound);
        rng = ry.nextState;
        const cand: Coord = { x: rx.value, y: ry.value };
        if (
          pts.every(
            (p) => chebyshevDist(cand, p) >= minCheb && euclidDist(cand, p) >= minEuclid,
          )
        ) {
          pts.push(cand);
          placed = true;
          break;
        }
      }
      if (!placed) break;
    }
    if (pts.length < 4) continue;

    let minPair = Infinity;
    const nnDists: number[] = [];
    for (let i = 0; i < 4; i++) {
      let nn = Infinity;
      for (let j = 0; j < 4; j++) {
        if (i === j) continue;
        const d = euclidDist(pts[i], pts[j]);
        if (d < nn) nn = d;
        if (d < minPair) minPair = d;
      }
      nnDists.push(nn);
    }
    const nnSpread = Math.max(...nnDists) - Math.min(...nnDists);
    if (nnSpread > 2.8) continue;

    const cornerCount = pts.filter(isCornerLike).length;
    const interiorCount = pts.filter(
      (p) => Math.hypot(p.x - center, p.y - center) <= mapSize * 0.34,
    ).length;
    const varietyBonus =
      (cornerCount === 4 ? -3.5 : cornerCount <= 2 ? 1.8 : 0.6) +
      (interiorCount >= 1 && interiorCount <= 2 ? 1.4 : 0);

    layouts.push({ points: pts, score: minPair * 1.5 - nnSpread * 2.6 + varietyBonus });
  }

  let primaryPts: Coord[];
  if (layouts.length > 0) {
    layouts.sort((a, b) => b.score - a.score);
    const topPool = layouts.slice(0, Math.min(6, layouts.length));
    const pick = nextInt(rng, 0, topPool.length - 1);
    rng = pick.nextState;
    primaryPts = topPool[pick.value].points;
  } else {
    const angleRoll = nextRandom(rng);
    rng = angleRoll.nextState;
    const baseAngle = angleRoll.value * Math.PI * 2;
    const radius = mapSize * 0.32;
    primaryPts = [0, 1, 2, 3].map((i) => {
      const a = baseAngle + (i * Math.PI) / 2;
      return {
        x: Math.max(minBound, Math.min(maxBound, Math.round(center + Math.cos(a) * radius))),
        y: Math.max(minBound, Math.min(maxBound, Math.round(center + Math.sin(a) * radius))),
      };
    });
  }

  const shuffledBiomes = shuffleArray(ALL_FACTIONS, rng);
  rng = shuffledBiomes.nextState;

  const seeds: MacroRegionSeed[] = [];
  for (let i = 0; i < 4; i++) {
    const stretchRoll = nextRandom(rng);
    rng = stretchRoll.nextState;
    seeds.push({
      x: primaryPts[i].x,
      y: primaryPts[i].y,
      biome: shuffledBiomes.result[i],
      stretch: 0.86 + stretchRoll.value * 0.26,
      isPrimary: true,
    });
  }

  // Add 6-8 secondary wild patches (balanced across all 4 biomes) for organic continent contours
  const secondaryBiomes = shuffleArray([...ALL_FACTIONS, ...ALL_FACTIONS], rng);
  rng = secondaryBiomes.nextState;
  const secondaryCount = mapSize === 18 ? 8 : 6;

  for (let i = 0; i < secondaryCount; i++) {
    for (let tries = 0; tries < 25; tries++) {
      const wx = nextInt(rng, 1, mapSize - 2);
      const wy = nextInt(wx.nextState, 1, mapSize - 2);
      const stretchRoll = nextRandom(wy.nextState);
      rng = stretchRoll.nextState;
      const cand: Coord = { x: wx.value, y: wy.value };
      if (primaryPts.some((p) => chebyshevDist(cand, p) <= 3)) continue;
      seeds.push({
        x: cand.x,
        y: cand.y,
        biome: secondaryBiomes.result[i % secondaryBiomes.result.length],
        stretch: 1.12 + stretchRoll.value * 0.55,
        isPrimary: false,
      });
      break;
    }
  }

  return { seeds, nextState: rng };
}

/**
 * Classifies vivid, iconic macro-geography features from biome + smooth elevation/moisture:
 *  - Wide sweeping plains in Human lowlands
 *  - Dense multi-tile forests & ancient groves in Elf woodlands
 *  - Dramatic connected mountain ranges & alpine valleys in Dwarf highlands
 *  - Volcanic ash basins & jagged crags in Orc badlands
 */
function classifyDramaticTerrain(
  biome: FactionId,
  elev: number,
  moist: number,
  detail: number,
): TerrainType {
  // Dramatic elevation mountain ridges
  const mountainCut =
    biome === 'dwarves' ? 0.54 : biome === 'orcs' ? 0.67 : biome === 'humans' ? 0.77 : 0.78;
  if (elev > mountainCut) {
    return 'mountain';
  }

  // Natural low-elevation water pockets
  if (elev < 0.21 && moist > 0.55) {
    return 'water';
  }

  switch (biome) {
    case 'humans': {
      // Wide sunlit plains with occasional windbreak woods
      if (moist > 0.69 && detail > 0.35) return 'forest';
      return 'plains';
    }
    case 'orcs': {
      // Sweeping volcanic ashlands with scattered scrub & woods along moist edges
      if (moist < 0.60 || elev > 0.48) return 'wasteland';
      if (moist > 0.70 && detail > 0.38) return 'forest';
      return 'plains';
    }
    case 'elves': {
      // Dense continuous forest canopy studded with luminous Ancient Woods groves
      if (moist > 0.64 && detail > 0.44) return 'ancient_woods';
      if (moist > 0.36) return 'forest';
      return 'plains';
    }
    case 'dwarves': {
      // Alpine mountain valleys & highland pine glades
      if (moist > 0.56 && detail > 0.30) return 'forest';
      return 'plains';
    }
  }
}

/**
 * Sculpts bold, recognizable landmark geography across the entire continent BEFORE
 * capitals are placed:
 *  - Continuous mountain ranges (with natural passes)
 *  - Dense forest belts
 *  - Wide sweeping plain valleys
 *  - Asymmetric lakes/inland bays and a meandering river
 */
function sculptContinentLandmarks(
  tiles: Tile[],
  mapSize: MapSize,
  primarySeeds: MacroRegionSeed[],
  elevField: NoiseField,
  initialRng: number,
): number {
  let rng = initialRng;

  // 1. Sculpt a prominent curved Mountain Range anchored through the Dwarven highland region
  //    plus a secondary frontier spine so mountain chains feel dramatic and strategic.
  const dwarfAnchor = primarySeeds.find((s) => s.biome === 'dwarves') ?? primarySeeds[0];
  const ridgeConfigs: { start: Coord; len: number; nearAnchor: boolean }[] = [
    { start: { x: dwarfAnchor.x, y: dwarfAnchor.y }, len: mapSize === 18 ? 10 : 8, nearAnchor: true },
  ];
  const secondX = nextInt(rng, 2, mapSize - 3);
  const secondY = nextInt(secondX.nextState, 2, mapSize - 3);
  rng = secondY.nextState;
  ridgeConfigs.push({
    start: { x: secondX.value, y: secondY.value },
    len: mapSize === 18 ? 7 : 6,
    nearAnchor: false,
  });

  for (const cfg of ridgeConfigs) {
    const angleRoll = nextRandom(rng);
    rng = angleRoll.nextState;
    let angle = angleRoll.value * Math.PI * 2;
    let fx = cfg.start.x - Math.cos(angle) * (cfg.len * 0.42);
    let fy = cfg.start.y - Math.sin(angle) * (cfg.len * 0.42);
    const passStepA = Math.floor(cfg.len * 0.35);
    const passStepB = Math.floor(cfg.len * 0.72);

    for (let step = 0; step < cfg.len; step++) {
      const tx = Math.round(fx);
      const ty = Math.round(fy);
      if (
        step !== passStepA &&
        step !== passStepB &&
        tx >= 1 &&
        ty >= 1 &&
        tx < mapSize - 1 &&
        ty < mapSize - 1
      ) {
        const t = getTileAt(tiles, mapSize, tx, ty);
        if (t && t.terrain !== 'water') {
          t.terrain = 'mountain';
          if (cfg.nearAnchor) t.biome = 'dwarves';
        }
      }
      const turnRoll = nextRandom(rng);
      rng = turnRoll.nextState;
      angle += (turnRoll.value - 0.5) * 0.72;
      fx += Math.cos(angle) * 1.05;
      fy += Math.sin(angle) * 1.05;
    }
  }

  // 2. Reinforce a sprawling Dense Forest canopy around the Elven woodland heart
  const elfAnchor = primarySeeds.find((s) => s.biome === 'elves');
  if (elfAnchor) {
    for (let y = 1; y < mapSize - 1; y++) {
      for (let x = 1; x < mapSize - 1; x++) {
        const d = euclidDist({ x, y }, elfAnchor);
        if (d > 3.8) continue;
        const t = getTileAt(tiles, mapSize, x, y);
        if (!t || t.terrain === 'water' || t.terrain === 'mountain') continue;
        const r = nextRandom(rng);
        rng = r.nextState;
        if (r.value < 0.72) {
          t.biome = 'elves';
          t.terrain = r.value < 0.24 ? 'ancient_woods' : 'forest';
        }
      }
    }
  }

  // 3. Open a sweeping Wide Plains valley around the Human meadow heart
  const humanAnchor = primarySeeds.find((s) => s.biome === 'humans');
  if (humanAnchor) {
    for (let y = 1; y < mapSize - 1; y++) {
      for (let x = 1; x < mapSize - 1; x++) {
        const d = euclidDist({ x, y }, humanAnchor);
        if (d > 3.8) continue;
        const t = getTileAt(tiles, mapSize, x, y);
        if (!t || t.terrain === 'water') continue;
        const r = nextRandom(rng);
        rng = r.nextState;
        if (r.value < 0.78) {
          t.biome = 'humans';
          t.terrain = r.value < 0.14 ? 'forest' : 'plains';
        }
      }
    }
  }

  // 4. Sculpt a cohesive Volcanic Ashland basin around the Orc badlands heart
  const orcAnchor = primarySeeds.find((s) => s.biome === 'orcs');
  if (orcAnchor) {
    for (let y = 1; y < mapSize - 1; y++) {
      for (let x = 1; x < mapSize - 1; x++) {
        const d = euclidDist({ x, y }, orcAnchor);
        if (d > 3.6) continue;
        const t = getTileAt(tiles, mapSize, x, y);
        if (!t || t.terrain === 'water' || t.terrain === 'mountain') continue;
        const r = nextRandom(rng);
        rng = r.nextState;
        if (r.value < 0.74) {
          t.biome = 'orcs';
          t.terrain = r.value < 0.18 ? 'forest' : 'wasteland';
        }
      }
    }
  }

  // 5. Carve varied asymmetric lakes / inland bays in naturally low-elevation valleys
  const lakeSpecs = mapSize === 18 ? [9, 5, 4] : [8, 4];
  const lakeCenters: Coord[] = [];
  const lowCandidates: { coord: Coord; rank: number }[] = [];
  for (let y = 1; y < mapSize - 1; y++) {
    for (let x = 1; x < mapSize - 1; x++) {
      // Leave primary biome hearts dry enough for good capital spots
      if (primarySeeds.some((s) => chebyshevDist({ x, y }, s) <= 2)) continue;
      const j = nextRandom(rng);
      rng = j.nextState;
      lowCandidates.push({
        coord: { x, y },
        rank: fbm2D(x, y, 0.16, elevField) + j.value * 0.25,
      });
    }
  }
  lowCandidates.sort((a, b) => a.rank - b.rank);

  const dirs6: Coord[] = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: -1 },
  ];

  for (const desiredSize of lakeSpecs) {
    let chosenStart: Coord | null = null;
    for (const cand of lowCandidates) {
      if (lakeCenters.some((c) => chebyshevDist(cand.coord, c) < 5)) continue;
      chosenStart = cand.coord;
      break;
    }
    if (!chosenStart) break;

    const variance = nextInt(rng, -1, 2);
    rng = variance.nextState;
    const targetTiles = Math.max(3, desiredSize + variance.value);
    const basin: Coord[] = [chosenStart];
    const startTile = getTileAt(tiles, mapSize, chosenStart.x, chosenStart.y);
    if (startTile) startTile.terrain = 'water';

    const biasDirIdx = nextInt(rng, 0, dirs6.length - 1);
    rng = biasDirIdx.nextState;
    const biasDir = dirs6[biasDirIdx.value];

    let attempts = 0;
    while (basin.length < targetTiles && attempts++ < 48) {
      const pick = nextInt(rng, 0, basin.length - 1);
      rng = pick.nextState;
      const base = basin[pick.value];
      const useBias = nextRandom(rng);
      rng = useBias.nextState;
      let dir = biasDir;
      if (useBias.value > 0.38) {
        const dPick = nextInt(rng, 0, 3);
        rng = dPick.nextState;
        dir = dirs6[dPick.value];
      }
      const nx = base.x + dir.x;
      const ny = base.y + dir.y;
      if (nx < 0 || ny < 0 || nx >= mapSize || ny >= mapSize) continue;
      if (primarySeeds.some((s) => chebyshevDist({ x: nx, y: ny }, s) <= 1)) continue;
      if (basin.some((b) => b.x === nx && b.y === ny)) continue;
      const nt = getTileAt(tiles, mapSize, nx, ny);
      if (nt) {
        nt.terrain = 'water';
        basin.push({ x: nx, y: ny });
      }
    }
    lakeCenters.push(chosenStart);
  }

  // 6. Carve 1 meandering natural river (5–8 tiles)
  const riverLenRoll = nextInt(rng, 5, mapSize === 18 ? 8 : 7);
  const startPickX = nextInt(riverLenRoll.nextState, 3, mapSize - 4);
  const startPickY = nextInt(startPickX.nextState, 3, mapSize - 4);
  const headingRoll = nextRandom(startPickY.nextState);
  rng = headingRoll.nextState;

  let rx = startPickX.value;
  let ry = startPickY.value;
  let heading = headingRoll.value * Math.PI * 2;
  const riverVisited = new Set<string>();

  for (let step = 0; step < riverLenRoll.value; step++) {
    const tx = Math.round(rx);
    const ty = Math.round(ry);
    const key = `${tx},${ty}`;
    if (
      !riverVisited.has(key) &&
      tx >= 1 &&
      ty >= 1 &&
      tx < mapSize - 1 &&
      ty < mapSize - 1 &&
      !primarySeeds.some((s) => chebyshevDist({ x: tx, y: ty }, s) <= 1)
    ) {
      const rt = getTileAt(tiles, mapSize, tx, ty);
      if (rt) {
        rt.terrain = 'water';
        riverVisited.add(key);
      }
    }
    const bend = nextRandom(rng);
    rng = bend.nextState;
    heading += (bend.value - 0.5) * 1.1;
    rx += Math.cos(heading);
    ry += Math.sin(heading);
  }

  return rng;
}

/**
 * Scores how well a candidate capital tile `(x, y)` fits a specific civilization's
 * preferred natural terrain in its surrounding radius-2 and radius-3 neighborhood:
 *  - Humans: Wide open Plains (+ light woods for hunting)
 *  - Elves: Dense Forests & Ancient Woods
 *  - Dwarves: Mountain Ranges & alpine highland valleys (with passable exits)
 *  - Orcs: Volcanic Wastelands & nearby forest/plains edges for raiding & clear-cutting
 */
function scoreSiteAffinityForFaction(
  tiles: Tile[],
  mapSize: MapSize,
  x: number,
  y: number,
  faction: FactionId,
): number {
  const centerTile = getTileAt(tiles, mapSize, x, y);
  if (!centerTile || centerTile.terrain === 'water') return -1000;

  let plains = 0;
  let forest = 0;
  let ancient = 0;
  let mountain = 0;
  let wasteland = 0;
  let water = 0;
  let nativeBiome = 0;
  let ring1Walkable = 0;

  for (let dy = -2; dy <= 2; dy++) {
    for (let dx = -2; dx <= 2; dx++) {
      if (dx === 0 && dy === 0) continue;
      const t = getTileAt(tiles, mapSize, x + dx, y + dy);
      if (!t) continue;
      const dist = Math.max(Math.abs(dx), Math.abs(dy));
      const w = dist === 1 ? 1.6 : 1.0;

      if (t.biome === faction) nativeBiome += w;
      if (dist === 1 && isWalkableForAll(t)) ring1Walkable++;

      switch (t.terrain) {
        case 'plains':
          plains += w;
          break;
        case 'forest':
          forest += w;
          break;
        case 'ancient_woods':
          ancient += w;
          break;
        case 'mountain':
          mountain += w;
          break;
        case 'wasteland':
          wasteland += w;
          break;
        case 'water':
          water += w;
          break;
      }
    }
  }

  // Penalize boxed-in water peninsulas or impassable mountain traps for non-Dwarves
  const waterPenalty = water * 2.2;
  const landMobilityBonus = ring1Walkable >= 4 ? 4 : -6;

  switch (faction) {
    case 'humans':
      return (
        plains * 3.0 +
        Math.min(forest, 4) * 1.1 +
        nativeBiome * 1.4 -
        mountain * 1.4 -
        wasteland * 1.6 -
        waterPenalty +
        landMobilityBonus
      );
    case 'elves':
      return (
        ancient * 3.6 +
        forest * 2.8 +
        nativeBiome * 1.4 -
        wasteland * 2.0 -
        mountain * 1.1 -
        waterPenalty +
        landMobilityBonus
      );
    case 'dwarves': {
      // Ideal Dwarf homeland has rich adjacent mountains (sweet spot 5–11 weighted) + passable valley
      const idealMountains = Math.min(mountain, 10) * 3.2 - Math.max(0, mountain - 11) * 1.5;
      return (
        idealMountains +
        plains * 0.9 +
        forest * 0.6 +
        nativeBiome * 1.4 -
        wasteland * 1.4 -
        waterPenalty +
        (ring1Walkable >= 3 ? 3 : -4)
      );
    }
    case 'orcs':
      return (
        wasteland * 3.0 +
        Math.min(forest, 5) * 1.2 +
        Math.min(mountain, 4) * 0.7 +
        nativeBiome * 1.4 -
        ancient * 1.2 -
        waterPenalty +
        landMobilityBonus
      );
  }
}

/**
 * Places each civilization on the generated continent's BEST terrain for that civ
 * while guaranteeing strict spatial fairness (minimum separation & balanced neighbor spread).
 */
function placeCivsOnBestTerrain(
  tiles: Tile[],
  mapSize: MapSize,
  primarySeeds: MacroRegionSeed[],
  initialRng: number,
): { capitalCoords: Record<FactionId, Coord>; nextState: number } {
  let rng = initialRng;
  const minBound = 2;
  const maxBound = mapSize - 3;
  const minCheb = mapSize === 18 ? 7 : 6;
  const minEuclid = mapSize * 0.42;

  // Score every interior tile for every faction and collect top 16 affinity sites per faction
  const topSitesByFaction = {} as Record<FactionId, { coord: Coord; affinity: number }[]>;
  for (const faction of ALL_FACTIONS) {
    const scored: { coord: Coord; affinity: number }[] = [];
    for (let y = minBound; y <= maxBound; y++) {
      for (let x = minBound; x <= maxBound; x++) {
        const baseAffinity = scoreSiteAffinityForFaction(tiles, mapSize, x, y, faction);
        if (baseAffinity <= -500) continue;
        const jitter = nextRandom(rng);
        rng = jitter.nextState;
        scored.push({
          coord: { x, y },
          affinity: baseAffinity + jitter.value * 1.5,
        });
      }
    }
    scored.sort((a, b) => b.affinity - a.affinity);
    topSitesByFaction[faction] = scored.slice(0, 14);
  }

  // Search over top-affinity 4-tuples for the best combined affinity + fairness spacing
  let bestAssignment: Record<FactionId, Coord> | null = null;
  let bestTotalScore = -Infinity;

  const hSites = topSitesByFaction.humans;
  const oSites = topSitesByFaction.orcs;
  const eSites = topSitesByFaction.elves;
  const dSites = topSitesByFaction.dwarves;

  for (const h of hSites) {
    for (const o of oSites) {
      if (chebyshevDist(h.coord, o.coord) < minCheb || euclidDist(h.coord, o.coord) < minEuclid) {
        continue;
      }
      for (const e of eSites) {
        if (
          chebyshevDist(e.coord, h.coord) < minCheb ||
          chebyshevDist(e.coord, o.coord) < minCheb ||
          euclidDist(e.coord, h.coord) < minEuclid ||
          euclidDist(e.coord, o.coord) < minEuclid
        ) {
          continue;
        }
        for (const d of dSites) {
          if (
            chebyshevDist(d.coord, h.coord) < minCheb ||
            chebyshevDist(d.coord, o.coord) < minCheb ||
            chebyshevDist(d.coord, e.coord) < minCheb ||
            euclidDist(d.coord, h.coord) < minEuclid ||
            euclidDist(d.coord, o.coord) < minEuclid ||
            euclidDist(d.coord, e.coord) < minEuclid
          ) {
            continue;
          }

          const pts = [h.coord, o.coord, e.coord, d.coord];
          const nnDists = pts.map((p, idx) =>
            Math.min(
              ...pts.filter((_, j) => j !== idx).map((q) => euclidDist(p, q)),
            ),
          );
          const nnSpread = Math.max(...nnDists) - Math.min(...nnDists);
          if (nnSpread > 2.95) continue;

          const minPair = Math.min(...nnDists);
          const affinitySum = h.affinity + o.affinity + e.affinity + d.affinity;
          const totalScore = affinitySum + minPair * 2.0 - nnSpread * 4.0;

          if (totalScore > bestTotalScore) {
            bestTotalScore = totalScore;
            bestAssignment = {
              humans: h.coord,
              orcs: o.coord,
              elves: e.coord,
              dwarves: d.coord,
            };
          }
        }
      }
    }
  }

  if (bestAssignment) {
    return { capitalCoords: bestAssignment, nextState: rng };
  }

  // Fallback: place each faction right at its primary ecological heart (guaranteed fair spacing)
  const fallback = {} as Record<FactionId, Coord>;
  for (const seed of primarySeeds) {
    fallback[seed.biome] = { x: seed.x, y: seed.y };
  }
  return { capitalCoords: fallback, nextState: rng };
}

/**
 * Ensures every target coordinate (capitals, villages, ruins) is 8-directionally
 * reachable from `anchor` via tiles that are neither `water` nor `mountain`.
 */
function ensureLandConnectivity(
  tiles: Tile[],
  size: number,
  anchor: Coord,
  targets: Coord[],
): void {
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
          if (!nt || !isWalkableForAll(nt)) continue;
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
      if (tile && !isWalkableForAll(tile)) {
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

export function generateMap(mapSize: MapSize, initialRngState: number): GeneratedMap {
  let rng = initialRngState;

  // 1. Seed smooth 2D noise fields for domain warping, elevation, and moisture
  const warpXRes = makeNoiseField(rng);
  const warpYRes = makeNoiseField(warpXRes.nextState);
  const elevRes = makeNoiseField(warpYRes.nextState);
  const moistRes = makeNoiseField(elevRes.nextState);
  rng = moistRes.nextState;

  const warpXField = warpXRes.field;
  const warpYField = warpYRes.field;
  const elevField = elevRes.field;
  const moistField = moistRes.field;

  // 2. Build organic macro-region seeds FIRST (wide plains, dense forests, mountain range, volcanic ashlands)
  const regionRes = buildMacroRegionSeeds(mapSize, rng);
  const biomeSeeds = regionRes.seeds;
  const primarySeeds = biomeSeeds.filter((s) => s.isPrimary);
  rng = regionRes.nextState;

  // 3. Generate the entire continent's terrain FIRST via warped biome regions + elevation/moisture
  const tiles: Tile[] = [];
  const warpStrength = 2.7;

  for (let y = 0; y < mapSize; y++) {
    for (let x = 0; x < mapSize; x++) {
      const wx = (fbm2D(x, y, 0.14, warpXField) - 0.5) * 2 * warpStrength;
      const wy = (fbm2D(x, y, 0.14, warpYField) - 0.5) * 2 * warpStrength;
      const px = x + wx;
      const py = y + wy;

      let chosenBiome: FactionId = 'humans';
      let bestWeightedDist = Infinity;
      for (const seed of biomeSeeds) {
        const d = Math.hypot(px - seed.x, py - seed.y) * seed.stretch;
        if (d < bestWeightedDist) {
          bestWeightedDist = d;
          chosenBiome = seed.biome;
        }
      }

      const elev = fbm2D(x, y, 0.17, elevField);
      const moist = fbm2D(x, y, 0.15, moistField);
      const detailRoll = nextRandom(rng);
      rng = detailRoll.nextState;

      const terrain = classifyDramaticTerrain(chosenBiome, elev, moist, detailRoll.value);

      tiles.push({
        x,
        y,
        terrain,
        biome: chosenBiome,
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

  // 4. Sculpt dramatic landmark features (mountain ranges, dense forest canopy, wide plains, lakes & river)
  rng = sculptContinentLandmarks(tiles, mapSize, primarySeeds, elevField, rng);

  // 5. Place each civilization on the terrain BEST suited for them while keeping spacing strictly fair
  const placementRes = placeCivsOnBestTerrain(tiles, mapSize, primarySeeds, rng);
  const capitalCoords = placementRes.capitalCoords;
  rng = placementRes.nextState;

  // 6. Ensure capital tiles are clear passable terrain in their native biome
  for (const faction of ALL_FACTIONS) {
    const cap = capitalCoords[faction];
    const capTile = getTileAt(tiles, mapSize, cap.x, cap.y)!;
    capTile.terrain = clearLandTerrainForBiome(faction);
    capTile.biome = faction;
    capTile.resource = null;
    capTile.hasVillage = false;
  }

  // 7. Guarantee fair starting 3x3 borders around each capital (balanced resources + open exits)
  for (const faction of ALL_FACTIONS) {
    const cap = capitalCoords[faction];
    const ring: Tile[] = [];
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const t = getTileAt(tiles, mapSize, cap.x + dx, cap.y + dy);
        if (t) ring.push(t);
      }
    }

    const shuffledRing = shuffleArray(ring, rng);
    rng = shuffledRing.nextState;
    const slots = shuffledRing.result;

    // Clear water & excessive mountains out of immediate 3x3 so every faction has open exit lanes
    for (const t of slots) {
      t.biome = faction;
      if (t.terrain === 'water' || t.terrain === 'mountain') {
        t.terrain = clearLandTerrainForBiome(faction);
      }
      t.resource = null;
    }

    if (faction === 'humans') {
      slots[0].terrain = 'plains';
      slots[0].resource = 'berries';
      slots[1].terrain = 'plains';
      slots[1].resource = 'berries';
      slots[2].terrain = 'plains';
      slots[3].terrain = 'plains';
      slots[4].terrain = 'forest';
      slots[4].resource = 'game';
    } else if (faction === 'orcs') {
      slots[0].terrain = 'plains';
      slots[0].resource = 'berries';
      slots[1].terrain = 'forest';
      slots[1].resource = 'game';
      slots[2].terrain = 'wasteland';
      slots[3].terrain = 'wasteland';
      slots[4].terrain = 'forest';
    } else if (faction === 'elves') {
      slots[0].terrain = 'ancient_woods';
      slots[0].resource = 'berries';
      slots[1].terrain = 'ancient_woods';
      slots[2].terrain = 'ancient_woods';
      slots[3].terrain = 'forest';
      slots[3].resource = 'game';
      slots[4].terrain = 'plains';
    } else if (faction === 'dwarves') {
      slots[0].terrain = 'mountain';
      slots[0].resource = 'ore';
      slots[1].terrain = 'mountain';
      slots[1].resource = 'mithril';
      slots[2].terrain = 'plains';
      slots[2].resource = 'berries';
      slots[3].terrain = 'forest';
      slots[3].resource = 'game';
      slots[4].terrain = 'plains';
    }
  }

  // 8. Place fair neutral villages:
  //    16x16 -> 12–16 villages (target 14: 2 fair starter villages per faction + 6 contested frontier)
  //    18x18 -> 16–20 villages (target 18: 2 fair starter villages per faction + 10 contested frontier)
  const targetVillageCount = mapSize === 18 ? 18 : 14;
  const minVillageCount = mapSize === 18 ? 16 : 12;
  const placedCenters: Coord[] = ALL_FACTIONS.map((f) => capitalCoords[f]);
  const villageCoords: Coord[] = [];

  const canPlaceVillage = (x: number, y: number, minCenterDist: number): boolean => {
    if (x < 1 || y < 1 || x >= mapSize - 1 || y >= mapSize - 1) return false;
    for (const f of ALL_FACTIONS) {
      if (chebyshevDist({ x, y }, capitalCoords[f]) < 3) return false;
    }
    for (const c of placedCenters) {
      if (chebyshevDist({ x, y }, c) < minCenterDist) return false;
    }
    return true;
  };

  const commitVillage = (coord: Coord): void => {
    const tile = getTileAt(tiles, mapSize, coord.x, coord.y)!;
    tile.terrain = clearLandTerrainForBiome(tile.biome);
    tile.hasVillage = true;
    tile.resource = null;
    placedCenters.push(coord);
    villageCoords.push(coord);
  };

  // Phase 1: Round-robin 2 nearby expansion villages per faction (strictly closer to own capital)
  const factionOrder = shuffleArray(ALL_FACTIONS, rng);
  rng = factionOrder.nextState;

  for (let round = 0; round < 2; round++) {
    for (const faction of factionOrder.result) {
      const cap = capitalCoords[faction];
      const searchRings: [number, number, number][] = [
        [3, 4, 3],
        [3, 5, 3],
        [3, 6, 3],
        [3, 6, 2],
      ];
      let placed = false;

      for (const [minD, maxD, minSep] of searchRings) {
        if (placed) break;
        const candidates: Coord[] = [];
        for (let y = 1; y < mapSize - 1; y++) {
          for (let x = 1; x < mapSize - 1; x++) {
            const d = chebyshevDist({ x, y }, cap);
            if (d < minD || d > maxD) continue;
            if (!canPlaceVillage(x, y, minSep)) continue;

            const myDistSq = (x - cap.x) ** 2 + (y - cap.y) ** 2;
            let closestToOwn = true;
            for (const other of ALL_FACTIONS) {
              if (other === faction) continue;
              const oCap = capitalCoords[other];
              if ((x - oCap.x) ** 2 + (y - oCap.y) ** 2 <= myDistSq) {
                closestToOwn = false;
                break;
              }
            }
            if (!closestToOwn) continue;
            candidates.push({ x, y });
          }
        }

        if (candidates.length > 0) {
          const dryCandidates = candidates.filter((c) => {
            const t = getTileAt(tiles, mapSize, c.x, c.y);
            return t !== null && t.terrain !== 'water';
          });
          const pool = dryCandidates.length > 0 ? dryCandidates : candidates;
          const pick = nextInt(rng, 0, pool.length - 1);
          rng = pick.nextState;
          commitVillage(pool[pick.value]);
          placed = true;
        }
      }
    }
  }

  // Phase 2: Contested frontier & neutral villages
  const frontierCandidates: Coord[] = [];
  const rimCandidates: Coord[] = [];
  for (let y = 1; y < mapSize - 1; y++) {
    for (let x = 1; x < mapSize - 1; x++) {
      if (x >= 2 && y >= 2 && x <= mapSize - 3 && y <= mapSize - 3) {
        frontierCandidates.push({ x, y });
      } else {
        rimCandidates.push({ x, y });
      }
    }
  }

  const shuffledFrontier = shuffleArray(frontierCandidates, rng);
  rng = shuffledFrontier.nextState;
  const shuffledRim = shuffleArray(rimCandidates, rng);
  rng = shuffledRim.nextState;

  const tryFillVillages = (pool: Coord[], minDist: number, allowWater: boolean, limit: number) => {
    for (const cand of pool) {
      if (villageCoords.length >= limit) break;
      if (!canPlaceVillage(cand.x, cand.y, minDist)) continue;
      const t = getTileAt(tiles, mapSize, cand.x, cand.y);
      if (!t) continue;
      if (!allowWater && t.terrain === 'water') continue;
      commitVillage(cand);
    }
  };

  tryFillVillages(shuffledFrontier.result, 3, false, targetVillageCount);
  tryFillVillages(shuffledRim.result, 3, false, targetVillageCount);
  tryFillVillages(shuffledFrontier.result, 3, true, targetVillageCount);
  tryFillVillages(shuffledRim.result, 3, true, targetVillageCount);
  if (villageCoords.length < minVillageCount) {
    tryFillVillages(shuffledFrontier.result, 2, true, minVillageCount);
    tryFillVillages(shuffledRim.result, 2, true, minVillageCount);
  }

  // Ensure every village has usable dry land in its 3x3 ring
  for (const vc of villageCoords) {
    let walkableNeighbors = 0;
    const waterNeighbors: Tile[] = [];
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nt = getTileAt(tiles, mapSize, vc.x + dx, vc.y + dy);
        if (!nt) continue;
        if (isWalkableForAll(nt)) walkableNeighbors++;
        else if (nt.terrain === 'water') waterNeighbors.push(nt);
      }
    }
    while (walkableNeighbors < 4 && waterNeighbors.length > 0) {
      const reclaimed = waterNeighbors.pop()!;
      reclaimed.terrain = clearLandTerrainForBiome(reclaimed.biome);
      walkableNeighbors++;
    }
  }

  // 9. Place fair Ancient Ruins (6 on 16x16, 8 on 18x18)
  const ruinsCount = mapSize === 18 ? 8 : 6;
  const ruinsCoords: Coord[] = [];

  const isEligibleRuinsTile = (t: Tile, minSpacing: number): boolean => {
    if (t.hasVillage || t.resource === 'ruins') return false;
    if (!isWalkableForAll(t)) return false;
    for (const f of ALL_FACTIONS) {
      if (chebyshevDist(t, capitalCoords[f]) <= 2) return false;
    }
    if (ruinsCoords.some((rc) => chebyshevDist(t, rc) < minSpacing)) return false;
    return true;
  };

  for (const faction of factionOrder.result) {
    if (ruinsCoords.length >= ruinsCount) break;
    const cap = capitalCoords[faction];
    const nearby = tiles.filter(
      (t) =>
        isEligibleRuinsTile(t, 3) &&
        chebyshevDist(t, cap) >= 3 &&
        chebyshevDist(t, cap) <= 6,
    );
    if (nearby.length > 0) {
      const pick = nextInt(rng, 0, nearby.length - 1);
      rng = pick.nextState;
      const chosen = nearby[pick.value];
      chosen.resource = 'ruins';
      ruinsCoords.push({ x: chosen.x, y: chosen.y });
    }
  }

  const remainingRuinsPool = shuffleArray(
    tiles.filter((t) => isEligibleRuinsTile(t, 2)),
    rng,
  );
  rng = remainingRuinsPool.nextState;

  for (const minSpacing of [3, 2]) {
    for (const t of remainingRuinsPool.result) {
      if (ruinsCoords.length >= ruinsCount) break;
      if (!isEligibleRuinsTile(t, minSpacing)) continue;
      t.resource = 'ruins';
      ruinsCoords.push({ x: t.x, y: t.y });
    }
  }

  // 10. Scatter natural resources on remaining non-capital, non-village tiles
  for (const t of tiles) {
    if (t.hasVillage || t.resource !== null) continue;
    let inCapitalRing = false;
    for (const f of ALL_FACTIONS) {
      if (chebyshevDist(t, capitalCoords[f]) <= 1) {
        inCapitalRing = true;
        break;
      }
    }
    if (inCapitalRing) continue;

    const r = nextRandom(rng);
    rng = r.nextState;

    if (t.terrain === 'plains' && r.value < 0.22) {
      t.resource = 'berries';
    } else if ((t.terrain === 'forest' || t.terrain === 'ancient_woods') && r.value < 0.30) {
      t.resource = r.value < 0.10 ? 'berries' : 'game';
    } else if (t.terrain === 'mountain' && r.value < 0.48) {
      t.resource = r.value < 0.15 ? 'mithril' : 'ore';
    }
  }

  // 11. Guarantee every neutral village has at least 1 harvestable resource in its 3x3 ring
  for (const vc of villageCoords) {
    const ring: Tile[] = [];
    let hasRes = false;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nt = getTileAt(tiles, mapSize, vc.x + dx, vc.y + dy);
        if (!nt || nt.hasVillage) continue;
        if (nt.resource !== null && nt.resource !== 'ruins') {
          hasRes = true;
          break;
        }
        if (nt.resource === null && nt.terrain !== 'water') {
          ring.push(nt);
        }
      }
      if (hasRes) break;
    }
    if (!hasRes && ring.length > 0) {
      const pick = nextInt(rng, 0, ring.length - 1);
      rng = pick.nextState;
      const target = ring[pick.value];
      if (target.terrain === 'mountain') {
        target.resource = 'ore';
      } else if (target.terrain === 'forest' || target.terrain === 'ancient_woods') {
        target.resource = 'game';
      } else {
        target.terrain = 'plains';
        target.resource = 'berries';
      }
    }
  }

  // 12. Guarantee 8-directional land connectivity across all capitals, villages, and ruins
  const anchor = capitalCoords[ALL_FACTIONS[0]];
  const allImportant: Coord[] = [
    ...ALL_FACTIONS.map((f) => capitalCoords[f]),
    ...villageCoords,
    ...ruinsCoords,
  ];
  ensureLandConnectivity(tiles, mapSize, anchor, allImportant);

  return { tiles, capitalCoords, rngState: rng };
}
