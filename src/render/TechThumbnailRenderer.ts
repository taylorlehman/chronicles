import * as THREE from 'three';
import { FACTION_DEFINITIONS } from '../game/data/factions';
import type {
  City,
  FactionId,
  ImprovementType,
  ResourceType,
  TerrainType,
  Tile,
  UnitType,
} from '../game/types';
import { createCityMesh } from './assets/cityMesh';
import { getUnitSpriteUrl } from './assets/spriteManifest';
import { createTileMesh, getFlatMaterial, TILE_TOP_Y, type TileNeighbors } from './assets/terrainMesh';
import { getTexturedMaterial } from './assets/textures';

const THUMB_SIZE = 96;

const UNIT_TYPES = new Set<UnitType>([
  'warrior',
  'defender',
  'archer',
  'rider',
  'catapult',
  'rohirrim_knight',
  'uruk_berserker',
  'elven_sentinel',
  'ironbreaker',
]);

const RESOURCE_TYPES = new Set<ResourceType>(['berries', 'game', 'ore', 'mithril', 'ruins']);

const IMPROVEMENT_TYPES = new Set<ImprovementType>([
  'farm',
  'windmill',
  'mine',
  'sanctuary',
  'slag_pit',
  'foundry',
  'great_forge',
]);

const DEFAULT_NEIGHBORS: TileNeighbors = {
  northWater: false,
  southWater: false,
  eastWater: false,
  westWater: false,
  northRoad: false,
  southRoad: false,
  eastRoad: false,
  westRoad: false,
};

const CROSSROAD_NEIGHBORS: TileNeighbors = {
  northWater: false,
  southWater: false,
  eastWater: false,
  westWater: false,
  northRoad: true,
  southRoad: true,
  eastRoad: true,
  westRoad: true,
};

function makePreviewTile(
  faction: FactionId,
  overrides: Partial<Tile> = {},
): Tile {
  return {
    x: 0,
    y: 0,
    terrain: 'plains',
    biome: faction,
    resource: null,
    improvement: null,
    hasRoad: false,
    hasVillage: false,
    cityId: null,
    isCityCenter: false,
    unitId: null,
    ...overrides,
  };
}

function makePreviewCity(faction: FactionId, overrides: Partial<City> = {}): City {
  return {
    id: `thumb_city_${faction}`,
    name: 'Citadel',
    ownerId: 'thumb_owner',
    styleFaction: faction,
    x: 0,
    y: 0,
    isCapital: true,
    level: 3,
    population: 2,
    hasWorkshop: false,
    hasWalls: true,
    borderRadius: 1,
    parks: 0,
    pendingLevelRewards: [],
    connectedToCapital: true,
    ...overrides,
  };
}

interface BuiltSubject {
  object: THREE.Object3D;
  ownGeometries: THREE.BufferGeometry[];
  ownMaterials: THREE.Material[];
}

function buildParkSubject(faction: FactionId): BuiltSubject {
  const ownGeometries: THREE.BufferGeometry[] = [];
  const ownMaterials: THREE.Material[] = [];

  const root = new THREE.Group();
  const baseTile = createTileMesh(
    makePreviewTile(faction, { terrain: 'plains' }),
    1,
    DEFAULT_NEIGHBORS,
    true,
  );
  root.add(baseTile.group);

  const palette = FACTION_DEFINITIONS[faction].palette;
  const stoneMat = getTexturedMaterial('marble_masonry', {
    color: '#e7e2d5',
    roughness: 0.84,
    bumpScale: 0.025,
  });
  const goldMat = getFlatMaterial(palette.accent, { metalness: 0.52, roughness: 0.34 });
  const leafMat = getTexturedMaterial('foliage', {
    color: '#2ea874',
    roughness: 0.84,
    bumpScale: 0.024,
  });

  const plazaGeo = new THREE.CylinderGeometry(0.68, 0.74, 0.08, 8);
  ownGeometries.push(plazaGeo);
  const plaza = new THREE.Mesh(plazaGeo, stoneMat);
  plaza.position.y = TILE_TOP_Y + 0.04;
  root.add(plaza);

  const plinthGeo = new THREE.BoxGeometry(0.32, 0.34, 0.32);
  ownGeometries.push(plinthGeo);
  const plinth = new THREE.Mesh(plinthGeo, stoneMat);
  plinth.position.y = TILE_TOP_Y + 0.25;
  root.add(plinth);

  const statueGeo = new THREE.OctahedronGeometry(0.24, 0);
  ownGeometries.push(statueGeo);
  const statue = new THREE.Mesh(statueGeo, goldMat);
  statue.position.y = TILE_TOP_Y + 0.62;
  statue.scale.set(0.85, 1.35, 0.85);
  root.add(statue);

  const hedgeGeo = new THREE.IcosahedronGeometry(0.18, 0);
  ownGeometries.push(hedgeGeo);
  const corners: [number, number][] = [
    [-0.48, -0.48],
    [0.48, -0.48],
    [-0.48, 0.48],
    [0.48, 0.48],
  ];
  for (const [cx, cz] of corners) {
    const h = new THREE.Mesh(hedgeGeo, leafMat);
    h.position.set(cx, TILE_TOP_Y + 0.18, cz);
    root.add(h);
  }

  return { object: root, ownGeometries, ownMaterials };
}

function buildSubjectForKey(iconKey: string, faction: FactionId): BuiltSubject {
  const key = iconKey.trim().toLowerCase();

  // 1. Resources -> actual 3D tile + resource prop
  if (RESOURCE_TYPES.has(key as ResourceType)) {
    const resource = key as ResourceType;
    const terrain: TerrainType =
      resource === 'ore' || resource === 'mithril' ? 'mountain' : 'plains';
    const tile = makePreviewTile(faction, { terrain, resource });
    const built = createTileMesh(tile, 1, DEFAULT_NEIGHBORS, true);
    return { object: built.group, ownGeometries: [], ownMaterials: [] };
  }

  // 3. Improvements -> actual 3D tile + improvement prop
  if (IMPROVEMENT_TYPES.has(key as ImprovementType)) {
    const improvement = key as ImprovementType;
    let terrain: TerrainType = 'plains';
    if (improvement === 'mine') terrain = 'mountain';
    else if (improvement === 'sanctuary') terrain = 'ancient_woods';
    else if (improvement === 'slag_pit' || improvement === 'foundry') terrain = 'wasteland';
    else if (improvement === 'great_forge') terrain = 'plains';
    const tile = makePreviewTile(faction, { terrain, improvement });
    const built = createTileMesh(tile, 1, DEFAULT_NEIGHBORS, true);
    return { object: built.group, ownGeometries: [], ownMaterials: [] };
  }

  // 4. Special terrain / infrastructure / city upgrades
  if (key === 'road' || key === 'roads') {
    const tile = makePreviewTile(faction, { terrain: 'plains', hasRoad: true });
    const built = createTileMesh(tile, 1, CROSSROAD_NEIGHBORS, true);
    return { object: built.group, ownGeometries: [], ownMaterials: [] };
  }

  if (key === 'ancient_woods' || key === 'plant_woods') {
    const tile = makePreviewTile(faction, { terrain: 'ancient_woods' });
    const built = createTileMesh(tile, 1, DEFAULT_NEIGHBORS, true);
    return { object: built.group, ownGeometries: [], ownMaterials: [] };
  }

  if (key === 'forest' || key === 'chop_forest') {
    const tile = makePreviewTile(faction, { terrain: 'forest' });
    const built = createTileMesh(tile, 1, DEFAULT_NEIGHBORS, true);
    return { object: built.group, ownGeometries: [], ownMaterials: [] };
  }

  if (key === 'mountain' || key === 'mountain_pass') {
    const tile = makePreviewTile(faction, { terrain: 'mountain' });
    const built = createTileMesh(tile, 1, DEFAULT_NEIGHBORS, true);
    return { object: built.group, ownGeometries: [], ownMaterials: [] };
  }

  if (key === 'city_wall' || key === 'walls') {
    const cityGroup = createCityMesh(
      makePreviewCity(faction, { level: 2, isCapital: false, hasWalls: true }),
    );
    return { object: cityGroup, ownGeometries: [], ownMaterials: [] };
  }

  if (key === 'park') {
    return buildParkSubject(faction);
  }

  // 5. Fallback passive key -> faction Lv 3 mini citadel
  const citadel = createCityMesh(
    makePreviewCity(faction, { level: 3, isCapital: true, hasWalls: true }),
  );
  return { object: citadel, ownGeometries: [], ownMaterials: [] };
}

/**
 * Lightweight offscreen 3D isometric thumbnail generator for the Tech Tree & UI.
 * Uses matching Polytopia 3-tone studio lighting & tight camera-space framing
 * tuned cleanly to the taller 1.35-1.68 character silhouettes.
 */
export class TechThumbnailRenderer {
  private static shared: TechThumbnailRenderer | null = null;

  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene | null = null;
  private camera: THREE.OrthographicCamera | null = null;
  private readonly cache = new Map<string, string>();
  private readonly box = new THREE.Box3();
  private readonly centerVec = new THREE.Vector3();
  private readonly cornerVec = new THREE.Vector3();

  public static getShared(): TechThumbnailRenderer {
    if (!TechThumbnailRenderer.shared) {
      TechThumbnailRenderer.shared = new TechThumbnailRenderer();
    }
    return TechThumbnailRenderer.shared;
  }

  public static renderTechIcon(iconKey: string, faction: FactionId): string {
    return TechThumbnailRenderer.getShared().renderTechIcon(iconKey, faction);
  }

  private ensureInitialized(): boolean {
    if (this.renderer && this.scene && this.camera) return true;
    if (typeof document === 'undefined') return false;

    try {
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true,
        powerPreference: 'default',
      });
      renderer.setPixelRatio(1);
      renderer.setSize(THUMB_SIZE, THUMB_SIZE, false);
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.NeutralToneMapping;
      renderer.toneMappingExposure = 1.08;
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const scene = new THREE.Scene();

      // Polytopia 3-tone studio lighting matching SceneManager
      const hemi = new THREE.HemisphereLight('#d6ebff', '#586a85', 0.85);
      hemi.position.set(0, 12, 0);
      scene.add(hemi);

      const keyLight = new THREE.DirectionalLight('#fff6e6', 2.3);
      keyLight.position.set(11, 13, 2);
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight('#bdd6ff', 0.48);
      rimLight.position.set(-9, 7, -8);
      scene.add(rimLight);

      const camera = new THREE.OrthographicCamera(-1.2, 1.2, 1.2, -1.2, 0.1, 50);
      camera.position.set(7.5, 6.2, 7.5);
      camera.lookAt(0, 0, 0);
      camera.updateMatrixWorld(true);

      this.renderer = renderer;
      this.scene = scene;
      this.camera = camera;
      return true;
    } catch {
      return false;
    }
  }

  public renderTechIcon(iconKey: string, faction: FactionId): string {
    const normalizedKey = iconKey.trim().toLowerCase();
    // All 9 unit types use our crisp 2.5D illustrated character sprites directly
    if (UNIT_TYPES.has(normalizedKey as UnitType)) {
      return getUnitSpriteUrl(normalizedKey as UnitType, faction);
    }

    const cacheKey = `${faction}:${normalizedKey}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    if (!this.ensureInitialized() || !this.renderer || !this.scene || !this.camera) {
      return '';
    }

    const built = buildSubjectForKey(iconKey, faction);
    const pivot = new THREE.Group();
    pivot.add(built.object);
    this.scene.add(pivot);

    // Measure world bounds & center subject cleanly at origin
    pivot.updateMatrixWorld(true);
    this.box.setFromObject(pivot);
    this.box.getCenter(this.centerVec);
    built.object.position.sub(this.centerVec);
    pivot.updateMatrixWorld(true);
    this.box.setFromObject(pivot);

    // Project all 8 bounding corners into camera view space so taller units fill ~86% cleanly
    const invCam = this.camera.matrixWorldInverse;
    let maxExtent = 0.55;
    const xs = [this.box.min.x, this.box.max.x];
    const ys = [this.box.min.y, this.box.max.y];
    const zs = [this.box.min.z, this.box.max.z];
    for (const x of xs) {
      for (const y of ys) {
        for (const z of zs) {
          this.cornerVec.set(x, y, z).applyMatrix4(invCam);
          maxExtent = Math.max(maxExtent, Math.abs(this.cornerVec.x), Math.abs(this.cornerVec.y));
        }
      }
    }

    const halfSpan = maxExtent * 1.14;
    this.camera.left = -halfSpan;
    this.camera.right = halfSpan;
    this.camera.top = halfSpan;
    this.camera.bottom = -halfSpan;
    this.camera.updateProjectionMatrix();

    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
    const dataUrl = this.renderer.domElement.toDataURL('image/png');

    // Cleanly remove temporary objects and dispose locally-allocated resources
    this.scene.remove(pivot);
    for (const geo of built.ownGeometries) {
      geo.dispose();
    }
    for (const mat of built.ownMaterials) {
      mat.dispose();
    }

    this.cache.set(cacheKey, dataUrl);
    return dataUrl;
  }

  public clearCache(): void {
    this.cache.clear();
  }

  public dispose(): void {
    this.cache.clear();
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }
    this.scene = null;
    this.camera = null;
  }
}

export function renderTechIcon(iconKey: string, faction: FactionId): string {
  return TechThumbnailRenderer.renderTechIcon(iconKey, faction);
}
