import * as THREE from 'three';
import {
  getTile,
  type FactionId,
  type GameState,
  type ImprovementType,
  type ResourceType,
  type Tile,
} from '../../game/types';
import { getTexturedMaterial, type SurfaceTextureKind } from './textures';

export const TILE_SIZE = 2.0;
export const TILE_TOP_Y = 0.22;
export const WATER_SURFACE_Y = -0.08;

// Elevated garrison dais constants (units stand prominently ON TOP of Cities & Neutral Villages)
export const GARRISON_OFFSET_X = 0.28;
export const GARRISON_OFFSET_Z = 0.28;
export const CITY_PLAZA_Y = 0.24;

// Elevated mountain lookout terrace constants (units stand unmistakably ON TOP of Mountains)
export const MOUNTAIN_LEDGE_OFFSET_X = 0.22;
export const MOUNTAIN_LEDGE_OFFSET_Z = 0.22;
export const MOUNTAIN_LEDGE_Y = 0.54;

// Forest clearing constants (units stand center-front in front of back-arc trees)
export const FOREST_UNIT_OFFSET_X = 0.12;
export const FOREST_UNIT_OFFSET_Z = 0.12;
export const FOREST_UNIT_Y_OFFSET = 0.04;

export function tileToWorld(
  x: number,
  y: number,
  mapSize: number,
  yOffset = 0,
): THREE.Vector3 {
  const half = (mapSize - 1) / 2;
  return new THREE.Vector3((x - half) * TILE_SIZE, yOffset, (y - half) * TILE_SIZE);
}

/**
 * Returns the exact world position for a unit standing on (x, y).
 * - Cities: elevated front-right garrison dais (+0.28, +0.28, y + 0.24)
 * - Neutral Villages: open front-right courtyard (+0.28, +0.28)
 * - Mountains: elevated lookout terrace (+0.22, +0.22, y + 0.54)
 * - Forests / Ancient Woods: open center-front clearing (+0.12, +0.12, y + 0.04)
 */
export function getUnitWorldPosition(
  state: GameState,
  x: number,
  y: number,
): THREE.Vector3 {
  const tile = getTile(state, x, y);
  const pos = tileToWorld(x, y, state.mapSize, TILE_TOP_Y);
  if (tile?.isCityCenter) {
    pos.x += GARRISON_OFFSET_X;
    pos.y += CITY_PLAZA_Y;
    pos.z += GARRISON_OFFSET_Z;
  } else if (tile?.hasVillage) {
    pos.x += GARRISON_OFFSET_X;
    pos.z += GARRISON_OFFSET_Z;
  } else if (tile?.terrain === 'mountain') {
    pos.x += MOUNTAIN_LEDGE_OFFSET_X;
    pos.y += MOUNTAIN_LEDGE_Y;
    pos.z += MOUNTAIN_LEDGE_OFFSET_Z;
  } else if (tile?.terrain === 'forest' || tile?.terrain === 'ancient_woods') {
    pos.x += FOREST_UNIT_OFFSET_X;
    pos.y += FOREST_UNIT_Y_OFFSET;
    pos.z += FOREST_UNIT_OFFSET_Z;
  }
  return pos;
}

// Deterministic pseudo-random helper per tile
function hash(x: number, y: number, salt: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7 + salt * 74.7) * 43758.5453123;
  return n - Math.floor(n);
}

// Shared material cache (matte Polytopia toy-block defaults: metalness 0.0, roughness 0.88)
const matCache = new Map<string, THREE.MeshStandardMaterial>();

export function getFlatMaterial(
  color: string,
  opts?: {
    roughness?: number;
    metalness?: number;
    emissive?: string;
    emissiveIntensity?: number;
    transparent?: boolean;
    opacity?: number;
  },
): THREE.MeshStandardMaterial {
  const key = JSON.stringify([color, opts ?? {}]);
  let mat = matCache.get(key);
  if (!mat) {
    mat = new THREE.MeshStandardMaterial({
      color,
      flatShading: true,
      roughness: opts?.roughness ?? 0.88,
      metalness: opts?.metalness ?? 0.0,
      emissive: opts?.emissive ? new THREE.Color(opts.emissive) : new THREE.Color(0x000000),
      emissiveIntensity: opts?.emissiveIntensity ?? 0,
      transparent: opts?.transparent ?? false,
      opacity: opts?.opacity ?? 1,
    });
    matCache.set(key, mat);
  }
  return mat;
}

// Flush seamless tile & simplified iconic prop geometries
const landTopGeo = new THREE.BoxGeometry(1.996, 0.22, 1.996);
const landUnderGeo = new THREE.BoxGeometry(1.998, 0.28, 1.998);
const waterBedGeo = new THREE.BoxGeometry(2.0, 0.26, 2.0);
const hitBoxGeo = new THREE.BoxGeometry(1.996, 0.26, 1.996);

const grassBladeGeo = new THREE.ConeGeometry(0.055, 0.16, 4);
const flowerGeo = new THREE.OctahedronGeometry(0.052, 0);

// Compact back-arc tree geometries (capped <= 0.85 height so taller units tower cleanly over treetops)
const trunkGeo = new THREE.CylinderGeometry(0.055, 0.085, 0.28, 5);
const pineTier1Geo = new THREE.ConeGeometry(0.30, 0.42, 6);
const pineTier2Geo = new THREE.ConeGeometry(0.21, 0.34, 6);
const decCanopyGeo = new THREE.IcosahedronGeometry(0.27, 0);

// Clean 3-4 mesh Polytopia mountain geometries (peak h = 1.05, elevated lookout dais h = 0.54)
const mountainPeakGeo = new THREE.ConeGeometry(0.62, 1.05, 6);
const mountainSnowGeo = new THREE.ConeGeometry(0.28, 0.44, 6);
const mountainLedgeGeo = new THREE.CylinderGeometry(0.49, 0.60, MOUNTAIN_LEDGE_Y, 7);
const mountainLedgeCapGeo = new THREE.CylinderGeometry(0.47, 0.49, 0.032, 7);

const shardGeo = new THREE.ConeGeometry(0.14, 0.42, 4);
const berryBushGeo = new THREE.IcosahedronGeometry(0.17, 0);
const crystalGeo = new THREE.OctahedronGeometry(0.16, 0);
const foamStripGeo = new THREE.BoxGeometry(1.98, 0.04, 0.14);

const hitMaterial = new THREE.MeshBasicMaterial({ visible: false });

// Lifted value-balanced Polytopia palettes with subtle +/-3% checkerboard pairs
const BIOME_PLAINS: Record<FactionId, [string, string]> = {
  humans: ['#7ed14d', '#76c847'],
  orcs: ['#7c7573', '#736c6b'],
  elves: ['#5ecc91', '#56c288'],
  dwarves: ['#7ba863', '#739f5c'],
};

const BIOME_FOREST_GROUND: Record<FactionId, [string, string]> = {
  humans: ['#5eb542', '#57ac3d'],
  orcs: ['#676166', '#605a5f'],
  elves: ['#45ae78', '#3fa571'],
  dwarves: ['#5f8850', '#58804a'],
};

const BIOME_FOLIAGE: Record<FactionId, [string, string]> = {
  humans: ['#3c993a', '#57b548'],
  orcs: ['#544c59', '#645b6b'],
  elves: ['#2ea874', '#f2c94c'],
  dwarves: ['#36755c', '#458b6f'],
};

export interface TileNeighbors {
  northWater: boolean;
  southWater: boolean;
  eastWater: boolean;
  westWater: boolean;
  northRoad: boolean;
  southRoad: boolean;
  eastRoad: boolean;
  westRoad: boolean;
}

export interface BuiltTileMesh {
  group: THREE.Group;
  hitMesh: THREE.Mesh;
  animatedTrees: THREE.Object3D[];
  waterMesh: THREE.Mesh | null;
  windmillBlades: THREE.Object3D | null;
  floatingMotes: THREE.Object3D[];
  smokePuffs: THREE.Object3D[];
  resourceGroup?: THREE.Group;
}

export function createTileMesh(
  tile: Tile,
  mapSize: number,
  neighbors: TileNeighbors,
  revealed: boolean,
): BuiltTileMesh {
  const group = new THREE.Group();
  const worldPos = tileToWorld(tile.x, tile.y, mapSize, 0);
  group.position.copy(worldPos);

  const animatedTrees: THREE.Object3D[] = [];
  const floatingMotes: THREE.Object3D[] = [];
  const smokePuffs: THREE.Object3D[] = [];
  let waterMesh: THREE.Mesh | null = null;
  let windmillBlades: THREE.Object3D | null = null;

  // Invisible raycast hitbox
  const hitMesh = new THREE.Mesh(hitBoxGeo, hitMaterial);
  hitMesh.position.y = TILE_TOP_Y * 0.5;
  hitMesh.userData = { tileX: tile.x, tileY: tile.y };
  group.add(hitMesh);

  if (tile.terrain === 'water') {
    const bed = new THREE.Mesh(
      waterBedGeo,
      getTexturedMaterial('rock', { color: '#1e84b0', roughness: 0.90, bumpScale: 0.025 }),
    );
    bed.position.y = -0.35;
    bed.receiveShadow = true;
    group.add(bed);

    const wGeo = new THREE.PlaneGeometry(2.0, 2.0, 3, 3);
    wGeo.rotateX(-Math.PI / 2);
    const wMat = getTexturedMaterial('water', {
      color: '#45c8f5',
      roughness: 0.14,
      metalness: 0.08,
      bumpScale: 0.028,
      transparent: true,
      opacity: 0.92,
      flatShading: false,
    });
    waterMesh = new THREE.Mesh(wGeo, wMat);
    waterMesh.position.y = WATER_SURFACE_Y;
    waterMesh.receiveShadow = true;
    waterMesh.userData = {
      basePositions: Float32Array.from(wGeo.attributes.position.array),
      tileX: tile.x,
      tileY: tile.y,
    };
    group.add(waterMesh);

    // Crisp coastal foam strips where adjacent to land
    const foamMat = getTexturedMaterial('cloud', {
      color: '#eefbff',
      roughness: 0.45,
      bumpScale: 0.01,
      transparent: true,
      opacity: 0.86,
      flatShading: false,
    });
    if (!neighbors.northWater) {
      const f = new THREE.Mesh(foamStripGeo, foamMat);
      f.position.set(0, WATER_SURFACE_Y + 0.022, -0.93);
      group.add(f);
    }
    if (!neighbors.southWater) {
      const f = new THREE.Mesh(foamStripGeo, foamMat);
      f.position.set(0, WATER_SURFACE_Y + 0.022, 0.93);
      group.add(f);
    }
    if (!neighbors.westWater) {
      const f = new THREE.Mesh(foamStripGeo, foamMat);
      f.rotation.y = Math.PI / 2;
      f.position.set(-0.93, WATER_SURFACE_Y + 0.022, 0);
      group.add(f);
    }
    if (!neighbors.eastWater) {
      const f = new THREE.Mesh(foamStripGeo, foamMat);
      f.rotation.y = Math.PI / 2;
      f.position.set(0.93, WATER_SURFACE_Y + 0.022, 0);
      group.add(f);
    }

    return { group, hitMesh, animatedTrees, waterMesh, windmillBlades, floatingMotes, smokePuffs };
  }

  // Flush seamless tile slabs: heightJitter = 0, topSlab.castShadow = false
  const topColor = getLandTopColor(tile);
  const topSlabMat = getLandTopMaterial(tile, topColor);
  const topSlab = new THREE.Mesh(landTopGeo, topSlabMat);
  topSlab.position.y = TILE_TOP_Y * 0.5;
  topSlab.receiveShadow = true;
  topSlab.castShadow = false;
  group.add(topSlab);

  const underColor = tile.terrain === 'wasteland' ? '#433c4b' : '#6c5640';
  const underSlab = new THREE.Mesh(
    landUnderGeo,
    getTexturedMaterial(tile.terrain === 'wasteland' ? 'orc_rock' : 'rock', {
      color: underColor,
      roughness: 0.94,
      bumpScale: 0.03,
    }),
  );
  underSlab.position.y = -0.14;
  underSlab.receiveShadow = true;
  underSlab.castShadow = false;
  group.add(underSlab);

  if (!revealed) {
    return { group, hitMesh, animatedTrees, waterMesh, windmillBlades, floatingMotes, smokePuffs };
  }

  // Roads
  if (tile.hasRoad || tile.isCityCenter) {
    addRoadMesh(group, neighbors, tile.isCityCenter);
  }

  // Terrain features
  if (!tile.isCityCenter && !tile.hasVillage) {
    switch (tile.terrain) {
      case 'plains':
        if (!tile.improvement) {
          addPlainsDetails(group, tile);
        }
        break;
      case 'forest':
        if (!tile.improvement) {
          addForestTrees(group, tile, animatedTrees);
        }
        break;
      case 'ancient_woods':
        addAncientWoodsTrees(group, tile, animatedTrees, floatingMotes, !!tile.improvement);
        break;
      case 'mountain':
        addMountainPeaks(group, tile);
        break;
      case 'wasteland':
        if (!tile.improvement) {
          addWastelandDetails(group, tile, floatingMotes);
        }
        break;
    }
  }

  // Neutral village (arranged back-left so front-right apron stays open for units)
  if (tile.hasVillage && !tile.isCityCenter) {
    addNeutralVillage(group, tile, smokePuffs);
  }

  // Improvements or resources
  let resourceGroup: THREE.Group | undefined;
  if (tile.improvement && !tile.isCityCenter) {
    windmillBlades = addImprovementMesh(group, tile.improvement, tile.terrain === 'mountain');
  } else if (tile.resource && !tile.isCityCenter && !tile.hasVillage) {
    resourceGroup = addResourceProp(group, tile.resource, tile, floatingMotes);
  }

  return { group, hitMesh, animatedTrees, waterMesh, windmillBlades, floatingMotes, smokePuffs, resourceGroup };
}

function getLandTopMaterial(tile: Tile, topColor: string): THREE.MeshStandardMaterial {
  switch (tile.terrain) {
    case 'forest':
      return getTexturedMaterial('forest_floor', {
        color: topColor,
        roughness: 0.90,
        bumpScale: 0.025,
      });
    case 'ancient_woods':
      return getTexturedMaterial('ancient_floor', {
        color: topColor,
        roughness: 0.88,
        bumpScale: 0.025,
      });
    case 'wasteland':
      return getTexturedMaterial('wasteland', {
        color: topColor,
        roughness: 0.90,
        bumpScale: 0.035,
      });
    case 'mountain':
      return getTexturedMaterial(tile.biome === 'orcs' ? 'orc_rock' : 'rock', {
        color: topColor,
        roughness: 0.90,
        bumpScale: 0.035,
      });
    case 'plains':
    default:
      return getTexturedMaterial('grass', {
        color: topColor,
        roughness: 0.88,
        bumpScale: 0.022,
      });
  }
}

function getLandTopColor(tile: Tile): string {
  const checker = (tile.x + tile.y) % 2 === 1 ? 1 : 0;
  switch (tile.terrain) {
    case 'plains':
      return BIOME_PLAINS[tile.biome][checker];
    case 'forest':
      return BIOME_FOREST_GROUND[tile.biome][checker];
    case 'ancient_woods':
      return checker === 0 ? '#3aa06e' : '#359666';
    case 'mountain':
      if (tile.biome === 'orcs') {
        return checker === 0 ? '#6c6476' : '#655d6f';
      }
      return checker === 0 ? '#8894a3' : '#808c9b';
    case 'wasteland':
      return checker === 0 ? '#5b5363' : '#544d5c';
    default:
      return BIOME_PLAINS.humans[checker];
  }
}

/**
 * Breathable Polytopia plains: 85%+ completely bare!
 * Only ~30% of empty plains tiles receive 1 tiny corner cluster (|x|,|z| > 0.58)
 * of either 2 grass blades or 1 flower. Zero pebbles or dense clutter.
 */
function addPlainsDetails(group: THREE.Group, tile: Tile): void {
  if (tile.resource || tile.hasRoad) return;
  if (hash(tile.x, tile.y, 19) < 0.70) return;

  const corners: [number, number][] = [
    [-0.66, -0.66],
    [0.66, -0.66],
    [-0.66, 0.66],
  ];
  const [cx, cz] = corners[Math.floor(hash(tile.x, tile.y, 23) * corners.length)];
  const showFlower = tile.biome !== 'orcs' && hash(tile.x, tile.y, 29) > 0.55;

  if (showFlower) {
    const flowerColors = ['#fde047', '#f472b6', '#ffffff', '#93c5fd'];
    const col = flowerColors[Math.floor(hash(tile.x, tile.y, 31) * flowerColors.length)];
    const f = new THREE.Mesh(flowerGeo, getFlatMaterial(col));
    f.position.set(cx, TILE_TOP_Y + 0.055, cz);
    group.add(f);
  } else {
    const tuftColor = tile.biome === 'orcs' ? '#635c5c' : '#4fa839';
    const tuftMat = getTexturedMaterial('grass', {
      color: tuftColor,
      roughness: 0.86,
      bumpScale: 0.016,
    });
    for (let b = 0; b < 2; b++) {
      const blade = new THREE.Mesh(grassBladeGeo, tuftMat);
      blade.position.set(cx + (b - 0.5) * 0.07, TILE_TOP_Y + 0.075, cz + (b === 0 ? 0.03 : -0.03));
      blade.rotation.set(
        (hash(tile.x, tile.y, 40 + b) - 0.5) * 0.24,
        hash(tile.x, tile.y, 50 + b) * Math.PI * 2,
        (hash(tile.x, tile.y, 60 + b) - 0.5) * 0.24,
      );
      group.add(blade);
    }
  }
}

/**
 * Clean back-arc forest: 3 bold trees tucked along back-left/back-right/front-left
 * (h <= 0.85, 2-3 meshes per tree) so units stand prominently in front (+0.12, +0.12) & ON TOP!
 */
function addForestTrees(
  group: THREE.Group,
  tile: Tile,
  animatedTrees: THREE.Object3D[],
): void {
  const [c1, c2] = BIOME_FOLIAGE[tile.biome];
  const trunkMat = getTexturedMaterial('bark', {
    color: tile.biome === 'elves' ? '#e5dfd3' : tile.biome === 'orcs' ? '#544c59' : '#735139',
    roughness: 0.90,
    bumpScale: 0.03,
    flatShading: true,
  });
  const snowMat = getTexturedMaterial('snow', {
    color: '#f8fafc',
    roughness: 0.80,
    bumpScale: 0.02,
    flatShading: true,
  });
  const emberMat = getFlatMaterial('#fb923c', {
    emissive: '#ff6b2b',
    emissiveIntensity: 1.0,
    roughness: 0.4,
  });

  const spots: [number, number][] = [
    [-0.56, -0.52],
    [0.52, -0.52],
    [-0.54, 0.40],
  ];

  spots.forEach(([sx, sz], idx) => {
    const tree = new THREE.Group();
    const jitterX = (hash(tile.x, tile.y, 100 + idx) - 0.5) * 0.08;
    const jitterZ = (hash(tile.x, tile.y, 110 + idx) - 0.5) * 0.08;
    const scale = 0.86 + hash(tile.x, tile.y, 120 + idx) * 0.14; // Keeps total height <= 0.85
    tree.position.set(sx + jitterX, TILE_TOP_Y, sz + jitterZ);
    tree.scale.setScalar(scale);

    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 0.14;
    trunk.castShadow = true;
    tree.add(trunk);

    const leafMat = getTexturedMaterial('foliage', {
      color: idx % 2 === 0 ? c1 : c2,
      roughness: 0.86,
      bumpScale: 0.025,
      flatShading: true,
    });

    if (tile.biome === 'orcs') {
      // Bold crooked Mordor deadwood (3 meshes max) + glowing ember dot on idx 0
      trunk.rotation.z = (idx % 2 === 0 ? 1 : -1) * 0.12;
      const b1 = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.048, 0.36, 4), trunkMat);
      b1.position.set(0.11, 0.38, 0.03);
      b1.rotation.z = -0.66;
      b1.castShadow = true;
      tree.add(b1);

      const b2 = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.042, 0.30, 4), trunkMat);
      b2.position.set(-0.10, 0.44, -0.03);
      b2.rotation.z = 0.70;
      b2.castShadow = true;
      tree.add(b2);

      if (idx === 0) {
        const cinder = new THREE.Mesh(flowerGeo, emberMat);
        cinder.position.set(0.08, 0.05, 0.08);
        tree.add(cinder);
      }
    } else if (tile.biome === 'elves') {
      // Iconic silver-bark Mallorn (trunk + 2 bold emerald/gold canopies, top ~0.82)
      const lower = new THREE.Mesh(
        decCanopyGeo,
        getTexturedMaterial('foliage', { color: c1, roughness: 0.84, bumpScale: 0.025 }),
      );
      lower.position.y = 0.45;
      lower.scale.set(1.12, 0.72, 1.12);
      lower.castShadow = true;
      tree.add(lower);

      const upper = new THREE.Mesh(
        decCanopyGeo,
        getTexturedMaterial('mallorn_foliage', { color: c2, roughness: 0.82, bumpScale: 0.025 }),
      );
      upper.position.set(0.03, 0.64, -0.02);
      upper.scale.set(0.82, 0.66, 0.82);
      upper.castShadow = true;
      tree.add(upper);
    } else if (tile.biome === 'dwarves') {
      // Crisp snow-tipped highland pine (trunk + pine cone + snow cone, top ~0.82)
      const t1 = new THREE.Mesh(pineTier1Geo, leafMat);
      t1.position.y = 0.40;
      t1.castShadow = true;
      tree.add(t1);

      const snowCap = new THREE.Mesh(pineTier2Geo, snowMat);
      snowCap.position.y = 0.65;
      snowCap.castShadow = true;
      tree.add(snowCap);
    } else if (idx === 1) {
      // Humans: bold single-crown Polytopia oak (top ~0.78)
      const crown = new THREE.Mesh(decCanopyGeo, leafMat);
      crown.position.y = 0.49;
      crown.scale.set(1.18, 0.96, 1.18);
      crown.castShadow = true;
      tree.add(crown);
    } else {
      // Humans: crisp 2-tier Polytopia pine (top ~0.82)
      const t1 = new THREE.Mesh(pineTier1Geo, leafMat);
      t1.position.y = 0.40;
      t1.castShadow = true;
      tree.add(t1);

      const t2 = new THREE.Mesh(
        pineTier2Geo,
        getTexturedMaterial('foliage', {
          color: c2,
          roughness: 0.86,
          bumpScale: 0.025,
          flatShading: true,
        }),
      );
      t2.position.y = 0.65;
      t2.castShadow = true;
      tree.add(t2);
    }

    tree.userData = { swayPhase: hash(tile.x, tile.y, 130 + idx) * Math.PI * 2 };
    group.add(tree);
    animatedTrees.push(tree);
  });
}

/**
 * Ancient Woods: back-arc Mallorn grove (max canopy <= 0.88) so units always tower cleanly over it.
 */
function addAncientWoodsTrees(
  group: THREE.Group,
  tile: Tile,
  animatedTrees: THREE.Object3D[],
  floatingMotes: THREE.Object3D[],
  hasImprovement: boolean,
): void {
  const trunkMat = getTexturedMaterial('bark', {
    color: '#eae4d7',
    roughness: 0.88,
    bumpScale: 0.03,
  });
  const emeraldLeafMat = getTexturedMaterial('mallorn_foliage', {
    color: '#2ea874',
    roughness: 0.84,
    bumpScale: 0.025,
  });
  const goldLeafMat = getTexturedMaterial('mallorn_foliage', {
    color: '#f2c94c',
    roughness: 0.82,
    bumpScale: 0.025,
  });
  const glowMat = getFlatMaterial('#fef08a', {
    emissive: '#facc15',
    emissiveIntensity: 1.15,
  });

  const spots: [number, number][] = hasImprovement
    ? [
        [-0.60, -0.56],
        [0.58, -0.54],
      ]
    : [
        [-0.56, -0.52],
        [0.52, -0.52],
        [-0.54, 0.40],
      ];

  spots.forEach(([sx, sz], idx) => {
    const tree = new THREE.Group();
    const scale = 0.90 + hash(tile.x, tile.y, 200 + idx) * 0.14; // Keeps total height <= 0.88
    tree.position.set(sx, TILE_TOP_Y, sz);
    tree.scale.setScalar(scale);

    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.scale.set(1.08, 1.18, 1.08);
    trunk.position.y = 0.17;
    trunk.castShadow = true;
    tree.add(trunk);

    const lower = new THREE.Mesh(decCanopyGeo, emeraldLeafMat);
    lower.position.y = 0.48;
    lower.scale.set(1.22, 0.72, 1.22);
    lower.castShadow = true;
    tree.add(lower);

    const top = new THREE.Mesh(decCanopyGeo, goldLeafMat);
    top.position.set(0.03, 0.69, -0.02);
    top.scale.set(0.92, 0.66, 0.92);
    top.castShadow = true;
    tree.add(top);

    tree.userData = { swayPhase: hash(tile.x, tile.y, 210 + idx) * Math.PI * 2 };
    group.add(tree);
    animatedTrees.push(tree);
  });

  // Gentle golden pollen motes
  for (let m = 0; m < 2; m++) {
    const mote = new THREE.Mesh(flowerGeo, glowMat);
    const mx = (hash(tile.x, tile.y, 220 + m) - 0.5) * 1.0;
    const my = TILE_TOP_Y + 0.58 + hash(tile.x, tile.y, 230 + m) * 0.35;
    const mz = (hash(tile.x, tile.y, 240 + m) - 0.5) * 1.0;
    mote.position.set(mx, my, mz);
    mote.scale.setScalar(0.54);
    mote.userData = {
      moteKind: 'firefly',
      baseX: mx,
      baseY: my,
      baseZ: mz,
      phase: hash(tile.x, tile.y, 250 + m) * Math.PI * 2,
    };
    group.add(mote);
    floatingMotes.push(mote);
  }
}

/**
 * Clean 3-4 mesh Polytopia mountain:
 * 1 crisp 6-sided peak (h = 1.05 at -0.30, -0.30), 1 snow/ash cap,
 * and 1 elevated flat lookout dais at (+0.22, +0.22) reaching MOUNTAIN_LEDGE_Y = 0.54.
 * A 1.38-tall unit standing on the dais reaches y = 1.92 — unmistakably ON TOP!
 */
function addMountainPeaks(group: THREE.Group, tile: Tile): void {
  const isOrc = tile.biome === 'orcs';
  const rockKind: SurfaceTextureKind = isOrc ? 'orc_rock' : 'rock';
  const rockMat = getTexturedMaterial(rockKind, {
    color: isOrc ? '#6c6476' : '#8894a3',
    roughness: 0.88,
    bumpScale: 0.04,
    flatShading: true,
  });
  const ledgeSideMat = getTexturedMaterial(rockKind, {
    color: isOrc ? '#5a5263' : '#737f8e',
    roughness: 0.90,
    bumpScale: 0.04,
    flatShading: true,
  });
  const ledgeTopMat = getTexturedMaterial(rockKind, {
    color: isOrc ? '#7d7488' : '#9aa6b5',
    roughness: 0.86,
    bumpScale: 0.032,
    flatShading: true,
  });
  const capMat = isOrc
    ? getTexturedMaterial('orc_rock', {
        color: '#968d9e',
        roughness: 0.84,
        bumpScale: 0.03,
        flatShading: true,
      })
    : getTexturedMaterial('snow', {
        color: '#f8fafc',
        roughness: 0.80,
        bumpScale: 0.02,
        flatShading: true,
      });
  const rot = hash(tile.x, tile.y, 300) * Math.PI;

  // 1. Crisp 6-sided main peak at (-0.30, -0.30), h = 1.05
  const mainPeak = new THREE.Mesh(mountainPeakGeo, rockMat);
  mainPeak.position.set(-0.30, TILE_TOP_Y + 0.525, -0.30);
  mainPeak.rotation.y = rot;
  mainPeak.castShadow = true;
  mainPeak.receiveShadow = true;
  group.add(mainPeak);

  // 2. Crisp snow cap / volcanic ash ridge
  const cap = new THREE.Mesh(mountainSnowGeo, capMat);
  cap.position.set(-0.30, TILE_TOP_Y + 0.85, -0.30);
  cap.rotation.y = rot;
  cap.castShadow = true;
  group.add(cap);

  // 3. Elevated flat lookout dais at (+0.22, +0.22), top flush at TILE_TOP_Y + 0.54
  const ledgeBase = new THREE.Mesh(mountainLedgeGeo, ledgeSideMat);
  ledgeBase.position.set(
    MOUNTAIN_LEDGE_OFFSET_X,
    TILE_TOP_Y + MOUNTAIN_LEDGE_Y * 0.5,
    MOUNTAIN_LEDGE_OFFSET_Z,
  );
  ledgeBase.rotation.y = 0.4;
  ledgeBase.castShadow = true;
  ledgeBase.receiveShadow = true;
  group.add(ledgeBase);

  const ledgeTop = new THREE.Mesh(mountainLedgeCapGeo, ledgeTopMat);
  ledgeTop.position.set(
    MOUNTAIN_LEDGE_OFFSET_X,
    TILE_TOP_Y + MOUNTAIN_LEDGE_Y - 0.014,
    MOUNTAIN_LEDGE_OFFSET_Z,
  );
  ledgeTop.rotation.y = 0.4;
  ledgeTop.receiveShadow = true;
  group.add(ledgeTop);

  // 4. Orc volcanic seam accent
  if (isOrc) {
    const lava = new THREE.Mesh(
      new THREE.BoxGeometry(0.065, 0.42, 0.065),
      getFlatMaterial('#ff6b2b', { emissive: '#ff6b2b', emissiveIntensity: 1.15 }),
    );
    lava.position.set(-0.10, TILE_TOP_Y + 0.48, -0.08);
    lava.rotation.z = -0.38;
    group.add(lava);
  }
}

function addWastelandDetails(
  group: THREE.Group,
  tile: Tile,
  floatingMotes: THREE.Object3D[],
): void {
  const basaltMat = getTexturedMaterial('orc_rock', {
    color: '#443d4d',
    roughness: 0.86,
    bumpScale: 0.04,
  });
  const emberMat = getFlatMaterial('#ff6b2b', {
    emissive: '#ff6b2b',
    emissiveIntensity: 1.2,
    roughness: 0.36,
  });

  // Glowing volcanic fissure
  const rot = hash(tile.x, tile.y, 400) * Math.PI;
  const crack1 = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.03, 0.075), emberMat);
  crack1.position.set(0, TILE_TOP_Y + 0.012, 0);
  crack1.rotation.y = rot;
  group.add(crack1);

  const crack2 = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.028, 0.055), emberMat);
  crack2.position.set(0.14, TILE_TOP_Y + 0.012, 0.12);
  crack2.rotation.y = rot + 0.9;
  group.add(crack2);

  // Basalt spires tucked toward back edges so unit stands cleanly in center
  for (let i = 0; i < 2; i++) {
    const s = new THREE.Mesh(shardGeo, basaltMat);
    const sx = (i === 0 ? -0.58 : 0.52) + (hash(tile.x, tile.y, 410 + i) - 0.5) * 0.14;
    const sz = (i === 0 ? -0.44 : -0.50) + (hash(tile.x, tile.y, 420 + i) - 0.5) * 0.14;
    s.position.set(sx, TILE_TOP_Y + 0.18, sz);
    s.rotation.set(0.18 * (i === 0 ? 1 : -1), hash(tile.x, tile.y, 430 + i) * Math.PI, 0.14);
    s.castShadow = true;
    group.add(s);
  }

  // Rising ambient ember spark
  const spark = new THREE.Mesh(flowerGeo, emberMat);
  const mx = (hash(tile.x, tile.y, 440) - 0.5) * 0.7;
  const mz = (hash(tile.x, tile.y, 441) - 0.5) * 0.7;
  spark.position.set(mx, TILE_TOP_Y + 0.35, mz);
  spark.scale.setScalar(0.52);
  spark.userData = {
    moteKind: 'ember',
    baseX: mx,
    baseY: TILE_TOP_Y + 0.16,
    baseZ: mz,
    phase: hash(tile.x, tile.y, 442),
  };
  group.add(spark);
  floatingMotes.push(spark);
}

function addRoadMesh(
  group: THREE.Group,
  neighbors: TileNeighbors,
  isCenter: boolean,
): void {
  const roadMat = getTexturedMaterial('road_cobble', {
    color: '#d8cab4',
    roughness: 0.90,
    bumpScale: 0.025,
  });
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 0.04, 8), roadMat);
  hub.position.y = TILE_TOP_Y + 0.015;
  group.add(hub);

  const armGeo = new THREE.BoxGeometry(0.32, 0.035, 1.0);
  if (neighbors.northRoad || isCenter) {
    if (neighbors.northRoad) {
      const m = new THREE.Mesh(armGeo, roadMat);
      m.position.set(0, TILE_TOP_Y + 0.015, -0.5);
      group.add(m);
    }
  }
  if (neighbors.southRoad) {
    const m = new THREE.Mesh(armGeo, roadMat);
    m.position.set(0, TILE_TOP_Y + 0.015, 0.5);
    group.add(m);
  }
  if (neighbors.westRoad) {
    const m = new THREE.Mesh(armGeo, roadMat);
    m.rotation.y = Math.PI / 2;
    m.position.set(-0.5, TILE_TOP_Y + 0.015, 0);
    group.add(m);
  }
  if (neighbors.eastRoad) {
    const m = new THREE.Mesh(armGeo, roadMat);
    m.rotation.y = Math.PI / 2;
    m.position.set(0.5, TILE_TOP_Y + 0.015, 0);
    group.add(m);
  }
}

function addResourceProp(
  group: THREE.Group,
  resource: ResourceType,
  tile: Tile,
  floatingMotes: THREE.Object3D[],
): THREE.Group | undefined {
  switch (resource) {
    case 'berries': {
      const resGroup = new THREE.Group();
      const bushMat = getTexturedMaterial('foliage', {
        color: '#2f8540',
        roughness: 0.86,
        bumpScale: 0.025,
      });
      const berryMat = getFlatMaterial('#f43f5e', { roughness: 0.45 });
      const offsets: [number, number, number][] = [
        [-0.22, 0.14, 0.10],
        [0.18, 0.15, -0.08],
        [0.0, 0.13, 0.22],
      ];
      offsets.forEach(([ox, oy, oz]) => {
        const b = new THREE.Mesh(berryBushGeo, bushMat);
        b.position.set(ox, TILE_TOP_Y + oy, oz);
        b.castShadow = true;
        resGroup.add(b);
        const dot = new THREE.Mesh(flowerGeo, berryMat);
        dot.position.set(ox + 0.08, TILE_TOP_Y + oy + 0.14, oz + 0.06);
        resGroup.add(dot);
      });
      group.add(resGroup);
      return resGroup;
    }
    case 'game': {
      const resGroup = new THREE.Group();
      const deer = new THREE.Group();
      const coatMat = getFlatMaterial(tile.biome === 'orcs' ? '#7a6154' : '#b87a44');
      const antlerMat = getFlatMaterial('#efe8d8');
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.18, 0.16), coatMat);
      body.position.y = 0.22;
      body.castShadow = true;
      deer.add(body);

      const legGeo = new THREE.BoxGeometry(0.05, 0.18, 0.05);
      const legCoords: [number, number][] = [
        [-0.1, -0.05],
        [0.1, -0.05],
        [-0.1, 0.05],
        [0.1, 0.05],
      ];
      for (const [lx, lz] of legCoords) {
        const leg = new THREE.Mesh(legGeo, coatMat);
        leg.position.set(lx, 0.09, lz);
        deer.add(leg);
      }

      const head = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.12, 0.12), coatMat);
      head.position.set(0.19, 0.34, 0);
      deer.add(head);

      const antler1 = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.14, 0.03), antlerMat);
      antler1.position.set(0.2, 0.45, 0.05);
      antler1.rotation.x = 0.35;
      deer.add(antler1);

      const antler2 = antler1.clone();
      antler2.position.z = -0.05;
      antler2.rotation.x = -0.35;
      deer.add(antler2);

      deer.position.set(0.04, TILE_TOP_Y, 0.06);
      deer.rotation.y = hash(tile.x, tile.y, 500) * Math.PI * 2;
      resGroup.add(deer);
      group.add(resGroup);
      return resGroup;
    }
    case 'ore': {
      const resGroup = new THREE.Group();
      const oreMat = getFlatMaterial('#f59e0b', {
        roughness: 0.34,
        metalness: 0.58,
        emissive: '#b45309',
        emissiveIntensity: 0.22,
      });
      const spots: [number, number, number][] = [
        [-0.48, 0.36, 0.06],
        [0.02, 0.44, -0.40],
        [-0.20, 0.58, -0.08],
      ];
      spots.forEach(([ox, oy, oz], i) => {
        const c = new THREE.Mesh(crystalGeo, oreMat);
        c.position.set(ox, TILE_TOP_Y + oy, oz);
        c.scale.set(0.85, 1.3, 0.85);
        c.rotation.set(0.3, i * 1.1, 0.25);
        c.castShadow = true;
        resGroup.add(c);
      });
      group.add(resGroup);
      return resGroup;
    }
    case 'mithril': {
      const resGroup = new THREE.Group();
      const mithrilMat = getFlatMaterial('#93c5fd', {
        roughness: 0.30,
        metalness: 0.62,
        emissive: '#60a5fa',
        emissiveIntensity: 0.55,
      });
      const spots: [number, number, number][] = [
        [-0.48, 0.38, 0.08],
        [0.02, 0.48, -0.40],
        [-0.20, 0.62, -0.06],
      ];
      spots.forEach(([ox, oy, oz], i) => {
        const c = new THREE.Mesh(crystalGeo, mithrilMat);
        c.position.set(ox, TILE_TOP_Y + oy, oz);
        c.scale.set(0.9, 1.55, 0.9);
        c.rotation.set(0.22, i * 1.3, -0.2);
        c.castShadow = true;
        resGroup.add(c);
      });
      group.add(resGroup);
      return resGroup;
    }
    case 'ruins': {
      const stoneMat = getTexturedMaterial('stone_masonry', {
        color: '#b4bfce',
        roughness: 0.88,
        bumpScale: 0.035,
      });
      const mossMat = getTexturedMaterial('stone_masonry', {
        color: '#63946a',
        roughness: 0.88,
        bumpScale: 0.035,
      });
      const runeMat = getFlatMaterial('#67e8f9', {
        emissive: '#22d3ee',
        emissiveIntensity: 1.05,
        roughness: 0.32,
      });

      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.54, 0.08, 6), stoneMat);
      base.position.y = TILE_TOP_Y + 0.04;
      base.receiveShadow = true;
      group.add(base);

      const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.54, 0.14), stoneMat);
      p1.position.set(-0.28, TILE_TOP_Y + 0.31, -0.18);
      p1.castShadow = true;
      group.add(p1);

      const p2 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.44, 0.14), stoneMat);
      p2.position.set(0.28, TILE_TOP_Y + 0.26, -0.18);
      p2.castShadow = true;
      group.add(p2);

      const lintel = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.11, 0.17), mossMat);
      lintel.position.set(-0.04, TILE_TOP_Y + 0.58, -0.18);
      lintel.rotation.z = -0.12;
      lintel.castShadow = true;
      group.add(lintel);

      const rune = new THREE.Mesh(new THREE.OctahedronGeometry(0.135, 0), runeMat);
      rune.position.set(0, TILE_TOP_Y + 0.32, 0.08);
      rune.userData = {
        moteKind: 'rune',
        baseX: 0,
        baseY: TILE_TOP_Y + 0.32,
        baseZ: 0.08,
        phase: hash(tile.x, tile.y, 555) * Math.PI * 2,
      };
      group.add(rune);
      floatingMotes.push(rune);
      break;
    }
  }
  return undefined;
}

function addNeutralVillage(
  group: THREE.Group,
  tile: Tile,
  smokePuffs: THREE.Object3D[],
): void {
  const wallMat = getTexturedMaterial('timber', {
    color: '#f2eadb',
    roughness: 0.88,
    bumpScale: 0.026,
  });
  const roofMat = getTexturedMaterial('thatch', {
    color: '#cc9b56',
    roughness: 0.90,
    bumpScale: 0.032,
    flatShading: true,
  });
  const timberMat = getTexturedMaterial('timber', {
    color: '#784c28',
    roughness: 0.88,
    bumpScale: 0.028,
  });
  const stoneMat = getTexturedMaterial('stone_masonry', {
    color: '#9ca8b8',
    roughness: 0.88,
    bumpScale: 0.032,
  });
  const cobbleMat = getTexturedMaterial('cobble', {
    color: '#ddd5c5',
    roughness: 0.90,
    bumpScale: 0.026,
  });
  const winMat = getFlatMaterial('#fcd34d', {
    emissive: '#f59e0b',
    emissiveIntensity: 0.9,
  });
  const fireMat = getFlatMaterial('#fb923c', {
    emissive: '#f97316',
    emissiveIntensity: 0.95,
  });
  const smokeMat = getTexturedMaterial('cloud', {
    color: '#f1f5f9',
    roughness: 0.95,
    bumpScale: 0.01,
    transparent: true,
    opacity: 0.68,
    flatShading: false,
  });

  // Low cobbled village plaza under the back-left huts & firepit (flush so front-right stays unobstructed)
  const plazaDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.64, 0.68, 0.022, 8), cobbleMat);
  plazaDisc.position.set(-0.14, TILE_TOP_Y + 0.011, -0.14);
  plazaDisc.receiveShadow = true;
  group.add(plazaDisc);

  // Arranged tightly toward back-left so front-right apron (+0.28, +0.28) stays 100% open!
  const huts: [number, number, number][] = [
    [-0.46, -0.44, 0.35],
    [0.20, -0.50, -0.45],
    [-0.50, 0.22, 0.15],
  ];

  huts.forEach(([hx, hz, rot], idx) => {
    const hut = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.22, 0.30), wallMat);
    base.position.y = 0.11;
    base.castShadow = true;
    hut.add(base);

    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.22, 4), roofMat);
    roof.position.y = 0.33;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    hut.add(roof);

    const win = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.075, 0.025), winMat);
    win.position.set(0.08, 0.12, 0.155);
    hut.add(win);

    const door = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.13, 0.025), timberMat);
    door.position.set(-0.07, 0.065, 0.155);
    hut.add(door);

    if (idx < 2) {
      const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.18, 0.07), stoneMat);
      chimney.position.set(0.10, 0.34, -0.08);
      hut.add(chimney);

      const puff = new THREE.Mesh(new THREE.IcosahedronGeometry(0.055, 0), smokeMat);
      puff.position.set(0.10, 0.48, -0.08);
      puff.userData = {
        smokeBaseX: 0.10,
        smokeBaseY: 0.46,
        smokeBaseZ: -0.08,
        smokePhase: idx * 0.5 + hash(tile.x, tile.y, 610 + idx),
      };
      hut.add(puff);
      smokePuffs.push(puff);
    }

    hut.position.set(hx, TILE_TOP_Y, hz);
    hut.rotation.y = rot + hash(tile.x, tile.y, 600) * 0.22;
    group.add(hut);
  });

  // Cozy stone firepit slightly back-center (-0.12, -0.12)
  const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.08, 7), stoneMat);
  ring.position.set(-0.12, TILE_TOP_Y + 0.04, -0.12);
  group.add(ring);

  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.15, 5), fireMat);
  flame.position.set(-0.12, TILE_TOP_Y + 0.13, -0.12);
  group.add(flame);
}

function addImprovementMesh(
  group: THREE.Group,
  improvement: ImprovementType,
  isMountain: boolean,
): THREE.Object3D | null {
  switch (improvement) {
    case 'farm': {
      const soilMat = getTexturedMaterial('farm_soil', {
        color: '#8f6840',
        roughness: 0.92,
        bumpScale: 0.032,
      });
      const wheatMat = getTexturedMaterial('wheat', {
        color: '#facc15',
        roughness: 0.84,
        bumpScale: 0.03,
      });
      const plot = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.04, 1.42), soilMat);
      plot.position.y = TILE_TOP_Y + 0.02;
      plot.receiveShadow = true;
      group.add(plot);
      for (let row = -2; row <= 2; row++) {
        const crop = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.15, 0.14), wheatMat);
        crop.position.set(0, TILE_TOP_Y + 0.105, row * 0.25);
        crop.castShadow = true;
        group.add(crop);
      }
      return null;
    }
    case 'windmill': {
      const stoneMat = getTexturedMaterial('stone_masonry', {
        color: '#ece7dc',
        roughness: 0.88,
        bumpScale: 0.032,
        flatShading: true,
      });
      const roofMat = getTexturedMaterial('roof_shingles', {
        color: '#2563eb',
        roughness: 0.80,
        bumpScale: 0.028,
        flatShading: true,
      });
      const woodMat = getTexturedMaterial('timber', {
        color: '#9a683c',
        roughness: 0.88,
        bumpScale: 0.028,
      });
      const sailMat = getTexturedMaterial('timber', {
        color: '#fefce8',
        roughness: 0.84,
        bumpScale: 0.018,
      });

      const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.30, 0.68, 7), stoneMat);
      tower.position.set(-0.24, TILE_TOP_Y + 0.34, -0.24);
      tower.castShadow = true;
      group.add(tower);

      const cap = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.22, 7), roofMat);
      cap.position.set(-0.24, TILE_TOP_Y + 0.79, -0.24);
      cap.castShadow = true;
      group.add(cap);

      const blades = new THREE.Group();
      blades.position.set(-0.24, TILE_TOP_Y + 0.58, 0.02);
      for (let i = 0; i < 4; i++) {
        const arm = new THREE.Group();
        arm.rotation.z = (i * Math.PI) / 2;
        const spar = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.38, 0.03), woodMat);
        spar.position.y = 0.19;
        arm.add(spar);
        const sail = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.28, 0.02), sailMat);
        sail.position.set(0.075, 0.21, 0);
        arm.add(sail);
        blades.add(arm);
      }
      group.add(blades);
      return blades;
    }
    case 'mine': {
      const woodMat = getTexturedMaterial('timber', {
        color: '#8c5a32',
        roughness: 0.88,
        bumpScale: 0.03,
      });
      const darkMat = getTexturedMaterial('rock', {
        color: '#2b2730',
        roughness: 0.92,
        bumpScale: 0.035,
      });
      const goldMat = getFlatMaterial('#f59e0b', {
        emissive: '#f59e0b',
        emissiveIntensity: 0.65,
      });
      // Tucked on front-left slope on mountains so the front-right lookout dais stays unobstructed
      const xOff = isMountain ? -0.44 : 0.0;
      const zOff = isMountain ? 0.28 : 0.0;

      const arch = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.38, 0.20), woodMat);
      arch.position.set(xOff, TILE_TOP_Y + 0.19, zOff);
      arch.castShadow = true;
      group.add(arch);

      const hole = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.22), darkMat);
      hole.position.set(xOff, TILE_TOP_Y + 0.14, zOff + 0.02);
      group.add(hole);

      const lantern = new THREE.Mesh(new THREE.OctahedronGeometry(0.068, 0), goldMat);
      lantern.position.set(xOff + 0.24, TILE_TOP_Y + 0.34, zOff + 0.11);
      group.add(lantern);
      return null;
    }
    case 'sanctuary': {
      const ivoryMat = getTexturedMaterial('marble_masonry', {
        color: '#f7f2e4',
        roughness: 0.82,
        bumpScale: 0.026,
        flatShading: true,
      });
      const goldMat = getTexturedMaterial('roof_shingles', {
        color: '#facc15',
        metalness: 0.42,
        roughness: 0.38,
        bumpScale: 0.024,
        flatShading: true,
      });
      const mallornLeafMat = getTexturedMaterial('mallorn_foliage', {
        color: '#34b87c',
        roughness: 0.84,
        bumpScale: 0.025,
      });
      const gemMat = getFlatMaterial('#34d399', {
        emissive: '#10b981',
        emissiveIntensity: 0.9,
      });

      const dais = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.48, 0.08, 6), ivoryMat);
      dais.position.y = TILE_TOP_Y + 0.04;
      dais.receiveShadow = true;
      group.add(dais);

      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2 + Math.PI / 4;
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.44, 5), ivoryMat);
        col.position.set(Math.cos(a) * 0.28, TILE_TOP_Y + 0.30, Math.sin(a) * 0.28);
        col.castShadow = true;
        group.add(col);
      }

      // Flanking Mallorn hedge accents framing the sanctuary shrine
      for (const [hx, hz] of [
        [-0.36, -0.34],
        [0.36, -0.34],
      ] as [number, number][]) {
        const hedge = new THREE.Mesh(berryBushGeo, mallornLeafMat);
        hedge.position.set(hx, TILE_TOP_Y + 0.13, hz);
        hedge.scale.set(0.85, 0.72, 0.85);
        hedge.castShadow = true;
        group.add(hedge);
      }

      const dome = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.30, 6), goldMat);
      dome.position.y = TILE_TOP_Y + 0.65;
      dome.castShadow = true;
      group.add(dome);

      const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.12, 0), gemMat);
      gem.position.y = TILE_TOP_Y + 0.30;
      group.add(gem);
      return null;
    }
    case 'slag_pit': {
      const ironMat = getTexturedMaterial('dark_iron', {
        color: '#534b5e',
        metalness: 0.30,
        roughness: 0.68,
        bumpScale: 0.035,
      });
      const lavaMat = getFlatMaterial('#ff6b2b', {
        emissive: '#f97316',
        emissiveIntensity: 1.2,
      });
      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.60, 0.18, 6), ironMat);
      rim.position.y = TILE_TOP_Y + 0.09;
      rim.castShadow = true;
      group.add(rim);

      const pool = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.20, 6), lavaMat);
      pool.position.y = TILE_TOP_Y + 0.10;
      group.add(pool);
      return null;
    }
    case 'foundry': {
      const ironMat = getTexturedMaterial('dark_iron', {
        color: '#534b5e',
        metalness: 0.32,
        roughness: 0.66,
        bumpScale: 0.035,
      });
      const fireMat = getFlatMaterial('#ff6b2b', {
        emissive: '#f97316',
        emissiveIntensity: 1.15,
      });
      const hall = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.36, 0.64), ironMat);
      hall.position.set(-0.18, TILE_TOP_Y + 0.18, -0.18);
      hall.castShadow = true;
      group.add(hall);

      const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.70, 6), ironMat);
      stack.position.set(0.06, TILE_TOP_Y + 0.44, -0.32);
      stack.castShadow = true;
      group.add(stack);

      const glow = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.18, 0.08), fireMat);
      glow.position.set(-0.24, TILE_TOP_Y + 0.14, 0.15);
      group.add(glow);
      return null;
    }
    case 'great_forge': {
      const graniteMat = getTexturedMaterial('granite_runic', {
        color: '#7e8c9e',
        roughness: 0.88,
        bumpScale: 0.036,
      });
      const bronzeMat = getTexturedMaterial('dark_iron', {
        color: '#e08a1e',
        metalness: 0.48,
        roughness: 0.38,
        bumpScale: 0.026,
      });
      const magmaMat = getFlatMaterial('#ff6b2b', {
        emissive: '#f97316',
        emissiveIntensity: 1.2,
      });

      const base = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.38, 0.78), graniteMat);
      base.position.set(-0.16, TILE_TOP_Y + 0.19, -0.16);
      base.castShadow = true;
      group.add(base);

      const roof = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.12, 0.68), bronzeMat);
      roof.position.set(-0.16, TILE_TOP_Y + 0.44, -0.16);
      group.add(roof);

      const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.62, 0.26), graniteMat);
      chimney.position.set(-0.16, TILE_TOP_Y + 0.62, -0.32);
      chimney.castShadow = true;
      group.add(chimney);

      const hearth = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.20, 0.08), magmaMat);
      hearth.position.set(-0.16, TILE_TOP_Y + 0.15, 0.24);
      group.add(hearth);
      return null;
    }
  }
}

export function createDioramaSkirt(mapSize: number): THREE.Group {
  const group = new THREE.Group();
  const fullSize = mapSize * TILE_SIZE + 0.12;
  const skirtHeight = 1.04;

  // Seamless vertical cutaway strata texture wrapping all 4 outer cliff sides
  const sideMat = getTexturedMaterial('bedrock_skirt', {
    color: '#ffffff',
    roughness: 0.92,
    bumpScale: 0.04,
    repeatX: mapSize * 0.5,
    repeatY: 1,
  });
  const topLipMat = getTexturedMaterial('rock', {
    color: '#6b5845',
    roughness: 0.94,
    bumpScale: 0.03,
    repeatX: mapSize * 0.5,
    repeatY: mapSize * 0.5,
  });
  const bottomMat = getFlatMaterial('#242f40', { roughness: 0.96 });

  // BoxGeometry material slots: [+x, -x, +y (top), -y (bottom), +z, -z]
  // Side faces all carry clean [0..1] horizontal & bottom-to-top vertical UVs!
  // Positioned so top sits at y = -0.23 (below waterBed top -0.22, overlapping land underSlab -0.28).
  const skirt = new THREE.Mesh(
    new THREE.BoxGeometry(fullSize, skirtHeight, fullSize),
    [sideMat, sideMat, topLipMat, bottomMat, sideMat, sideMat],
  );
  skirt.position.y = -0.23 - skirtHeight * 0.5;
  skirt.receiveShadow = true;
  group.add(skirt);

  return group;
}
