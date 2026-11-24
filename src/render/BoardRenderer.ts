import * as THREE from 'three';
import { FACTION_DEFINITIONS } from '../game/data/factions';
import { hasUnitRemainingActions } from '../game/rules';
import {
  getTile,
  tileIndex,
  type Coord,
  type FactionId,
  type GameState,
  type PlayerId,
  type Tile,
  type UnitType,
} from '../game/types';
import { createCityMesh } from './assets/cityMesh';
import { createCloudCluster, type CloudCluster } from './assets/cloudMesh';
import {
  CITY_PLAZA_Y,
  createDioramaSkirt,
  createTileMesh,
  GARRISON_OFFSET_X,
  GARRISON_OFFSET_Z,
  getFlatMaterial,
  getUnitWorldPosition,
  MOUNTAIN_LEDGE_OFFSET_X,
  MOUNTAIN_LEDGE_OFFSET_Z,
  MOUNTAIN_LEDGE_Y,
  TILE_SIZE,
  TILE_TOP_Y,
  tileToWorld,
  type BuiltTileMesh,
  type TileNeighbors,
} from './assets/terrainMesh';
import {
  createUnitSprite,
  disposeUnitSprite,
  setUnitVisualState,
  type BuiltUnitSprite,
} from './assets/unitSprite';
import { updateAnimatedTextures } from './assets/textures';

export interface AttackTargetOverlay extends Coord {
  lethal?: boolean;
}

interface UnitAnimMeta {
  isHumanOwner: boolean;
  exhausted: boolean;
  canCapture: boolean;
  canExploreRuins: boolean;
  phase: number;
}

interface CachedTileEntry {
  fingerprint: string;
  group: THREE.Group;
  hitMesh: THREE.Mesh;
  built: BuiltTileMesh;
}

interface CachedCityEntry {
  fingerprint: string;
  mesh: THREE.Group;
}

interface CachedUnitEntry {
  built: BuiltUnitSprite;
  type: UnitType;
  faction: FactionId;
  isVeteran: boolean;
  canPromote: boolean;
  hitMesh: THREE.Mesh;
  lastVisualKey: string;
}

const MAX_FRAME_DT = 0.033;

function coordKey(x: number, y: number): string {
  return `${x},${y}`;
}

function clearGroup(group: THREE.Group): void {
  while (group.children.length > 0) {
    group.remove(group.children[0]);
  }
}

function getDisplayFactionPrimary(faction: FactionId): string {
  // Brighten Orc primary crimson so borders & rings pop sharply on dark/ash terrain
  return faction === 'orcs' ? '#ef4444' : FACTION_DEFINITIONS[faction].palette.primary;
}

export class BoardRenderer {
  public readonly boardRoot = new THREE.Group();
  public readonly fxGroup = new THREE.Group();

  private readonly skirtGroup = new THREE.Group();
  private readonly tilesGroup = new THREE.Group();
  private readonly bordersGroup = new THREE.Group();
  private readonly citiesGroup = new THREE.Group();
  private readonly unitsGroup = new THREE.Group();
  private readonly cloudsGroup = new THREE.Group();
  private readonly overlaysGroup = new THREE.Group();

  // Generous mobile tap hitbox tuned for taller 1.35-1.68 Polytopia characters
  private static readonly UNIT_HIT_GEO = new THREE.CylinderGeometry(0.50, 0.54, 1.65, 10);
  private static readonly UNIT_HIT_MAT = new THREE.MeshBasicMaterial({ visible: false });

  // Shared territory border geometries (avoid re-allocating BoxGeometry per border update)
  private static readonly BORDER_RIBBON_H = 0.055;
  private static readonly BORDER_RIBBON_THICK = 0.12;
  private static readonly BORDER_H_GEO = new THREE.BoxGeometry(
    TILE_SIZE - 0.02,
    BoardRenderer.BORDER_RIBBON_H,
    BoardRenderer.BORDER_RIBBON_THICK,
  );
  private static readonly BORDER_V_GEO = new THREE.BoxGeometry(
    BoardRenderer.BORDER_RIBBON_THICK,
    BoardRenderer.BORDER_RIBBON_H,
    TILE_SIZE - 0.02,
  );

  // Shared Polytopia move-target overlay geometries & materials (always visible over farms/props, below unit sprites at renderOrder 40)
  private static readonly MOVE_FILL_GEO = (() => {
    const g = new THREE.CircleGeometry(0.42, 24);
    g.rotateX(-Math.PI / 2);
    return g;
  })();
  private static readonly MOVE_FILL_COMPACT_GEO = (() => {
    const g = new THREE.CircleGeometry(0.35, 24);
    g.rotateX(-Math.PI / 2);
    return g;
  })();
  private static readonly MOVE_RING_GEO = (() => {
    const g = new THREE.RingGeometry(0.42, 0.54, 28);
    g.rotateX(-Math.PI / 2);
    return g;
  })();
  private static readonly MOVE_RING_COMPACT_GEO = (() => {
    const g = new THREE.RingGeometry(0.35, 0.46, 28);
    g.rotateX(-Math.PI / 2);
    return g;
  })();
  private static readonly MOVE_DOT_GEO = (() => {
    const g = new THREE.CircleGeometry(0.17, 18);
    g.rotateX(-Math.PI / 2);
    return g;
  })();
  private static readonly MOVE_FILL_MAT = new THREE.MeshBasicMaterial({
    color: '#38bdf8',
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.72,
    depthTest: false,
    depthWrite: false,
  });
  private static readonly MOVE_RING_MAT = new THREE.MeshBasicMaterial({
    color: '#e0f2fe',
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.94,
    depthTest: false,
    depthWrite: false,
  });
  private static readonly MOVE_DOT_MAT = new THREE.MeshBasicMaterial({
    color: '#e0f2fe',
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.96,
    depthTest: false,
    depthWrite: false,
  });

  // Shared attack-target overlay geometries & materials (zero allocations per click)
  private static readonly ATTACK_RING_GEO = (() => {
    const g = new THREE.RingGeometry(0.62, 0.84, 24);
    g.rotateX(-Math.PI / 2);
    return g;
  })();
  private static readonly ATTACK_RING_MAT = new THREE.MeshBasicMaterial({
    color: '#f43f5e',
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.90,
    depthTest: false,
    depthWrite: false,
  });
  private static readonly ATTACK_DIAMOND_GEO = new THREE.OctahedronGeometry(0.16, 0);
  private static readonly ATTACK_DIAMOND_MAT = new THREE.MeshBasicMaterial({ color: '#fb7185' });

  private static readonly LETHAL_OUTER_RING_GEO = (() => {
    const g = new THREE.RingGeometry(0.66, 0.88, 28);
    g.rotateX(-Math.PI / 2);
    return g;
  })();
  private static readonly LETHAL_OUTER_RING_MAT = new THREE.MeshBasicMaterial({
    color: '#ef4444',
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.94,
    depthTest: false,
    depthWrite: false,
  });
  private static readonly LETHAL_INNER_RING_GEO = (() => {
    const g = new THREE.RingGeometry(0.44, 0.58, 28);
    g.rotateX(-Math.PI / 2);
    return g;
  })();
  private static readonly LETHAL_INNER_RING_MAT = new THREE.MeshBasicMaterial({
    color: '#fbbf24',
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.95,
    depthTest: false,
    depthWrite: false,
  });
  private static readonly LETHAL_CORE_GEO = new THREE.OctahedronGeometry(0.21, 0);
  private static readonly LETHAL_CORE_MAT = new THREE.MeshBasicMaterial({ color: '#dc2626' });
  private static readonly LETHAL_GOLD_MAT = new THREE.MeshBasicMaterial({ color: '#facc15' });
  private static readonly LETHAL_HALO_GEO = (() => {
    const g = new THREE.TorusGeometry(0.32, 0.032, 6, 16);
    g.rotateX(Math.PI / 2);
    return g;
  })();
  private static readonly LETHAL_SPIKE_X_GEO = new THREE.BoxGeometry(0.22, 0.045, 0.045);
  private static readonly LETHAL_SPIKE_Z_GEO = new THREE.BoxGeometry(0.045, 0.045, 0.22);
  private static readonly LETHAL_CROWN_GEO = new THREE.OctahedronGeometry(0.085, 0);

  private mapSize = 0;
  private initialized = false;
  private lastBorderFingerprint: string | null = null;

  private tileEntries = new Map<string, CachedTileEntry>();
  private cityEntries = new Map<string, CachedCityEntry>();
  private unitEntries = new Map<string, CachedUnitEntry>();

  private tileHitMeshes: THREE.Mesh[] = [];
  private unitHitMeshes: THREE.Mesh[] = [];
  private animatedTrees: THREE.Object3D[] = [];
  private waterMeshes: THREE.Mesh[] = [];
  private windmillBlades: THREE.Object3D[] = [];
  private cityBanners: THREE.Object3D[] = [];
  private unitBanners: THREE.Object3D[] = [];
  private tileSmokePuffs: THREE.Object3D[] = [];
  private citySmokePuffs: THREE.Object3D[] = [];
  private floatingMotes: THREE.Object3D[] = [];

  private tilesByCoord = new Map<string, Tile>();
  private cityCoords = new Set<string>();
  private mountainCoords = new Set<string>();
  private unitWorldCoords = new Map<string, THREE.Vector3>();
  private unitHeightsByCoord = new Map<string, number>();

  private unitObjects = new Map<string, BuiltUnitSprite>();
  private unitBaseMeta = new Map<string, UnitAnimMeta>();
  private cityObjects = new Map<string, THREE.Group>();
  private cloudObjects = new Map<string, CloudCluster>();

  // Animation guards: prevent syncState & idle update loops from fighting active tweens
  private animatingUnitIds = new Set<string>();
  private animatingCloudKeys = new Set<string>();

  // Overlays
  private hoverBracket: THREE.Group;
  private selectedRing: THREE.Mesh;
  private moveOverlayGroup = new THREE.Group();
  private attackOverlayGroup = new THREE.Group();

  constructor(scene: THREE.Scene) {
    this.boardRoot.add(
      this.skirtGroup,
      this.tilesGroup,
      this.bordersGroup,
      this.citiesGroup,
      this.unitsGroup,
      this.cloudsGroup,
      this.overlaysGroup,
      this.fxGroup,
    );
    scene.add(this.boardRoot);

    this.hoverBracket = this.buildHoverBracket();
    this.hoverBracket.visible = false;
    this.overlaysGroup.add(this.hoverBracket);

    const selMat = new THREE.MeshBasicMaterial({
      color: '#facc15',
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
      depthTest: false,
      depthWrite: false,
    });
    this.selectedRing = new THREE.Mesh(new THREE.RingGeometry(0.64, 0.80, 24), selMat);
    this.selectedRing.rotation.x = -Math.PI / 2;
    this.selectedRing.renderOrder = 31;
    this.selectedRing.visible = false;
    this.overlaysGroup.add(this.selectedRing);

    this.overlaysGroup.add(this.moveOverlayGroup, this.attackOverlayGroup);
  }

  private buildHoverBracket(): THREE.Group {
    const g = new THREE.Group();
    const mat = new THREE.MeshBasicMaterial({
      color: '#fef9c3',
      transparent: true,
      opacity: 0.9,
    });
    const edge = 0.92;
    const len = 0.44;
    const thick = 0.07;
    const h = 0.03;

    const corners: [number, number, number, number][] = [
      [-edge, -edge, 1, 1],
      [edge, -edge, -1, 1],
      [-edge, edge, 1, -1],
      [edge, edge, -1, -1],
    ];
    for (const [cx, cz, sx, sz] of corners) {
      const barX = new THREE.Mesh(new THREE.BoxGeometry(len, h, thick), mat);
      barX.position.set(cx + (sx * len) / 2, 0, cz);
      g.add(barX);

      const barZ = new THREE.Mesh(new THREE.BoxGeometry(thick, h, len), mat);
      barZ.position.set(cx, 0, cz + (sz * len) / 2);
      g.add(barZ);
    }
    return g;
  }

  public getMapSize(): number {
    return this.mapSize;
  }

  public getTileHitMeshes(): THREE.Mesh[] {
    return this.tileHitMeshes;
  }

  public getUnitHitMeshes(): THREE.Mesh[] {
    return this.unitHitMeshes;
  }

  public getUnitObject(unitId: string): BuiltUnitSprite | undefined {
    return this.unitObjects.get(unitId);
  }

  public getCityObject(cityId: string): THREE.Group | undefined {
    return this.cityObjects.get(cityId);
  }

  public getCloudObject(x: number, y: number): CloudCluster | undefined {
    return this.cloudObjects.get(coordKey(x, y));
  }

  public markUnitAnimating(unitId: string, active: boolean): void {
    if (active) {
      this.animatingUnitIds.add(unitId);
    } else {
      this.animatingUnitIds.delete(unitId);
    }
  }

  public markCloudAnimating(x: number, y: number, active: boolean): void {
    const key = coordKey(x, y);
    if (active) {
      this.animatingCloudKeys.add(key);
    } else {
      this.animatingCloudKeys.delete(key);
    }
  }

  public removeCloudImmediate(x: number, y: number): void {
    const key = coordKey(x, y);
    this.animatingCloudKeys.delete(key);
    const cloud = this.cloudObjects.get(key);
    if (cloud) {
      this.disposeCloudFadeMaterials(cloud);
      this.cloudsGroup.remove(cloud.group);
      this.cloudObjects.delete(key);
    }
  }

  /**
   * Incrementally reveals terrain tiles (and any newly uncovered cities) underneath
   * clouds that are about to lift & fade, so lush terrain emerges through parting mist
   * instead of popping in after the cloud finishes fading.
   */
  public revealTilesUnderClouds(
    state: GameState,
    viewerPlayerId: PlayerId,
    coords: Coord[],
  ): void {
    if (coords.length === 0 || !this.initialized || this.mapSize !== state.mapSize) return;
    const viewer =
      state.players.find((p) => p.id === viewerPlayerId) ??
      state.players.find((p) => p.isHuman) ??
      state.players[0];
    const revealed = viewer?.revealedTiles ?? [];

    let tilesChanged = false;
    for (const c of coords) {
      if (c.x < 0 || c.y < 0 || c.x >= state.mapSize || c.y >= state.mapSize) continue;
      const idx = tileIndex(c.x, c.y, state.mapSize);
      const isRev = Boolean(revealed[idx]);
      if (!isRev) continue;

      const tile = state.tiles[idx];
      const key = coordKey(c.x, c.y);
      this.tilesByCoord.set(key, tile);
      if (tile.terrain === 'mountain' && !tile.isCityCenter && !tile.hasVillage) {
        this.mountainCoords.add(key);
      }

      const nNorth = getTile(state, c.x, c.y - 1);
      const nSouth = getTile(state, c.x, c.y + 1);
      const nWest = getTile(state, c.x - 1, c.y);
      const nEast = getTile(state, c.x + 1, c.y);
      const neighbors: TileNeighbors = {
        northWater: nNorth?.terrain === 'water',
        southWater: nSouth?.terrain === 'water',
        westWater: nWest?.terrain === 'water',
        eastWater: nEast?.terrain === 'water',
        northRoad: Boolean(nNorth && (nNorth.hasRoad || nNorth.isCityCenter)),
        southRoad: Boolean(nSouth && (nSouth.hasRoad || nSouth.isCityCenter)),
        westRoad: Boolean(nWest && (nWest.hasRoad || nWest.isCityCenter)),
        eastRoad: Boolean(nEast && (nEast.hasRoad || nEast.isCityCenter)),
      };
      const neighborBits =
        (neighbors.northWater ? 1 : 0) |
        (neighbors.southWater ? 2 : 0) |
        (neighbors.westWater ? 4 : 0) |
        (neighbors.eastWater ? 8 : 0) |
        (neighbors.northRoad ? 16 : 0) |
        (neighbors.southRoad ? 32 : 0) |
        (neighbors.westRoad ? 64 : 0) |
        (neighbors.eastRoad ? 128 : 0);

      const city = tile.cityId ? state.cities[tile.cityId] : undefined;
      const fingerprint = `${tile.terrain}|${tile.biome}|${tile.resource ?? ''}|${tile.improvement ?? ''}|${tile.hasRoad ? 1 : 0}|${tile.hasVillage ? 1 : 0}|${tile.isCityCenter ? 1 : 0}|${tile.cityId ?? ''}|${city?.level ?? ''}|${city?.ownerId ?? ''}|${city?.hasWalls ? 1 : 0}|${city?.parks ?? 0}|1|${neighborBits}`;

      const existing = this.tileEntries.get(key);
      if (existing && existing.fingerprint === fingerprint) continue;

      if (existing) {
        this.tilesGroup.remove(existing.group);
        if (existing.built.waterMesh) {
          existing.built.waterMesh.geometry.dispose();
        }
      }

      const built = createTileMesh(tile, state.mapSize, neighbors, true);
      this.tilesGroup.add(built.group);
      this.tileEntries.set(key, {
        fingerprint,
        group: built.group,
        hitMesh: built.hitMesh,
        built,
      });
      tilesChanged = true;
    }

    if (tilesChanged) {
      this.tileHitMeshes = [];
      this.animatedTrees = [];
      this.waterMeshes = [];
      this.windmillBlades = [];
      this.floatingMotes = [];
      this.tileSmokePuffs = [];

      for (const entry of this.tileEntries.values()) {
        const b = entry.built;
        this.tileHitMeshes.push(b.hitMesh);
        if (b.animatedTrees.length > 0) this.animatedTrees.push(...b.animatedTrees);
        if (b.waterMesh) this.waterMeshes.push(b.waterMesh);
        if (b.windmillBlades) this.windmillBlades.push(b.windmillBlades);
        if (b.floatingMotes.length > 0) this.floatingMotes.push(...b.floatingMotes);
        if (b.smokePuffs.length > 0) this.tileSmokePuffs.push(...b.smokePuffs);
      }
    }
  }

  private disposeCloudFadeMaterials(cloud: CloudCluster): void {
    const clonedMats = cloud.group.userData.clonedMats as THREE.Material[] | undefined;
    if (clonedMats) {
      for (const m of clonedMats) {
        m.dispose();
      }
      cloud.group.userData.clonedMats = undefined;
    }
  }

  private resetAllCachedMeshes(): void {
    for (const entry of this.tileEntries.values()) {
      if (entry.built.waterMesh) {
        entry.built.waterMesh.geometry.dispose();
      }
    }
    clearGroup(this.tilesGroup);
    this.tileEntries.clear();
    this.tileHitMeshes = [];
    this.animatedTrees = [];
    this.waterMeshes = [];
    this.windmillBlades = [];
    this.floatingMotes = [];
    this.tileSmokePuffs = [];

    for (const cloud of this.cloudObjects.values()) {
      this.disposeCloudFadeMaterials(cloud);
    }
    clearGroup(this.cloudsGroup);
    this.cloudObjects.clear();
    this.animatingCloudKeys.clear();

    clearGroup(this.bordersGroup);
    this.lastBorderFingerprint = null;

    clearGroup(this.citiesGroup);
    this.cityEntries.clear();
    this.cityObjects.clear();
    this.cityBanners = [];
    this.citySmokePuffs = [];

    for (const prev of this.unitEntries.values()) {
      disposeUnitSprite(prev.built);
    }
    clearGroup(this.unitsGroup);
    this.unitEntries.clear();
    this.unitObjects.clear();
    this.unitBaseMeta.clear();
    this.unitHitMeshes = [];
    this.unitBanners = [];
    this.animatingUnitIds.clear();
  }

  public syncState(state: GameState, viewerPlayerId: PlayerId): void {
    const viewer =
      state.players.find((p) => p.id === viewerPlayerId) ??
      state.players.find((p) => p.isHuman) ??
      state.players[0];

    const resolvedViewerId = viewer?.id ?? viewerPlayerId;
    const revealed = viewer?.revealedTiles ?? [];

    // 1. Diorama skirt & full reset ONLY when mapSize changes or first sync
    if (!this.initialized || this.mapSize !== state.mapSize || this.skirtGroup.children.length === 0) {
      this.resetAllCachedMeshes();
      this.mapSize = state.mapSize;
      this.initialized = true;
      clearGroup(this.skirtGroup);
      this.skirtGroup.add(createDioramaSkirt(state.mapSize));
    }

    // 2. Incremental Terrain Tile Diffing (only create/replace tiles whose fingerprint changed!)
    this.tilesByCoord.clear();
    this.mountainCoords.clear();
    let tilesChanged = false;

    for (let y = 0; y < state.mapSize; y++) {
      for (let x = 0; x < state.mapSize; x++) {
        const idx = tileIndex(x, y, state.mapSize);
        const tile = state.tiles[idx];
        const key = coordKey(x, y);
        const isRev = Boolean(revealed[idx]);

        this.tilesByCoord.set(key, tile);
        if (isRev && tile.terrain === 'mountain' && !tile.isCityCenter && !tile.hasVillage) {
          this.mountainCoords.add(key);
        }

        const nNorth = getTile(state, x, y - 1);
        const nSouth = getTile(state, x, y + 1);
        const nWest = getTile(state, x - 1, y);
        const nEast = getTile(state, x + 1, y);

        const neighbors: TileNeighbors = {
          northWater: nNorth?.terrain === 'water',
          southWater: nSouth?.terrain === 'water',
          westWater: nWest?.terrain === 'water',
          eastWater: nEast?.terrain === 'water',
          northRoad: Boolean(nNorth && (nNorth.hasRoad || nNorth.isCityCenter)),
          southRoad: Boolean(nSouth && (nSouth.hasRoad || nSouth.isCityCenter)),
          westRoad: Boolean(nWest && (nWest.hasRoad || nWest.isCityCenter)),
          eastRoad: Boolean(nEast && (nEast.hasRoad || nEast.isCityCenter)),
        };

        const neighborBits =
          (neighbors.northWater ? 1 : 0) |
          (neighbors.southWater ? 2 : 0) |
          (neighbors.westWater ? 4 : 0) |
          (neighbors.eastWater ? 8 : 0) |
          (neighbors.northRoad ? 16 : 0) |
          (neighbors.southRoad ? 32 : 0) |
          (neighbors.westRoad ? 64 : 0) |
          (neighbors.eastRoad ? 128 : 0);

        const city = tile.cityId ? state.cities[tile.cityId] : undefined;
        const fingerprint = `${tile.terrain}|${tile.biome}|${tile.resource ?? ''}|${tile.improvement ?? ''}|${tile.hasRoad ? 1 : 0}|${tile.hasVillage ? 1 : 0}|${tile.isCityCenter ? 1 : 0}|${tile.cityId ?? ''}|${city?.level ?? ''}|${city?.ownerId ?? ''}|${city?.hasWalls ? 1 : 0}|${city?.parks ?? 0}|${isRev ? 1 : 0}|${neighborBits}`;

        const existing = this.tileEntries.get(key);
        if (existing && existing.fingerprint === fingerprint) {
          continue;
        }

        if (existing) {
          this.tilesGroup.remove(existing.group);
          if (existing.built.waterMesh) {
            existing.built.waterMesh.geometry.dispose();
          }
        }

        const built = createTileMesh(tile, state.mapSize, neighbors, isRev);
        this.tilesGroup.add(built.group);
        this.tileEntries.set(key, {
          fingerprint,
          group: built.group,
          hitMesh: built.hitMesh,
          built,
        });
        tilesChanged = true;
      }
    }

    if (tilesChanged) {
      this.tileHitMeshes = [];
      this.animatedTrees = [];
      this.waterMeshes = [];
      this.windmillBlades = [];
      this.floatingMotes = [];
      this.tileSmokePuffs = [];

      for (const entry of this.tileEntries.values()) {
        const b = entry.built;
        this.tileHitMeshes.push(b.hitMesh);
        if (b.animatedTrees.length > 0) {
          this.animatedTrees.push(...b.animatedTrees);
        }
        if (b.waterMesh) {
          this.waterMeshes.push(b.waterMesh);
        }
        if (b.windmillBlades) {
          this.windmillBlades.push(b.windmillBlades);
        }
        if (b.floatingMotes.length > 0) {
          this.floatingMotes.push(...b.floatingMotes);
        }
        if (b.smokePuffs.length > 0) {
          this.tileSmokePuffs.push(...b.smokePuffs);
        }
      }
    }

    // 3. Incremental Fog Clouds (keep existing clusters alive; only add missing / remove revealed!)
    for (let y = 0; y < state.mapSize; y++) {
      for (let x = 0; x < state.mapSize; x++) {
        const idx = tileIndex(x, y, state.mapSize);
        const key = coordKey(x, y);
        if (!revealed[idx]) {
          if (!this.cloudObjects.has(key)) {
            const pos = tileToWorld(x, y, state.mapSize, 0);
            const cluster = createCloudCluster(x, y, pos);
            this.cloudsGroup.add(cluster.group);
            this.cloudObjects.set(key, cluster);
          }
        } else if (this.cloudObjects.has(key) && !this.animatingCloudKeys.has(key)) {
          this.removeCloudImmediate(x, y);
        }
      }
    }

    // 4. Incremental Territory Borders (only rebuild when revealed ownership fingerprint changes)
    const borderParts: string[] = [];
    for (let i = 0; i < state.tiles.length; i++) {
      if (!revealed[i]) continue;
      const cid = state.tiles[i].cityId;
      if (!cid) continue;
      const owner = state.cities[cid]?.ownerId;
      if (owner) {
        borderParts.push(`${i}:${owner}`);
      }
    }
    const borderFingerprint = borderParts.join(',');
    if (borderFingerprint !== this.lastBorderFingerprint) {
      this.lastBorderFingerprint = borderFingerprint;
      this.rebuildTerritoryBorders(state, revealed);
    }

    // 5. Incremental Cities (only rebuild cities whose visual fingerprint changed)
    this.cityCoords.clear();
    const activeCityIds = new Set<string>();
    let citiesChanged = false;

    for (const city of Object.values(state.cities)) {
      const idx = tileIndex(city.x, city.y, state.mapSize);
      if (!revealed[idx]) continue;
      activeCityIds.add(city.id);
      this.cityCoords.add(coordKey(city.x, city.y));

      const fp = `${city.x}|${city.y}|${city.styleFaction}|${city.ownerId}|${city.level}|${city.isCapital ? 1 : 0}|${city.hasWalls ? 1 : 0}|${city.parks}`;
      const existing = this.cityEntries.get(city.id);
      if (existing && existing.fingerprint === fp) {
        continue;
      }

      if (existing) {
        this.citiesGroup.remove(existing.mesh);
      }

      const mesh = createCityMesh(city);
      const pos = tileToWorld(city.x, city.y, state.mapSize, TILE_TOP_Y);
      mesh.position.set(pos.x, TILE_TOP_Y, pos.z);
      this.citiesGroup.add(mesh);
      this.cityEntries.set(city.id, { fingerprint: fp, mesh });
      this.cityObjects.set(city.id, mesh);
      citiesChanged = true;
    }

    for (const [cityId, entry] of this.cityEntries) {
      if (!activeCityIds.has(cityId)) {
        this.citiesGroup.remove(entry.mesh);
        this.cityEntries.delete(cityId);
        this.cityObjects.delete(cityId);
        citiesChanged = true;
      }
    }

    if (citiesChanged) {
      this.cityBanners = [];
      this.citySmokePuffs = [];
      for (const entry of this.cityEntries.values()) {
        const cityBanners = entry.mesh.userData.banners as THREE.Object3D[] | undefined;
        if (cityBanners && cityBanners.length > 0) {
          this.cityBanners.push(...cityBanners);
        }
        const citySmoke = entry.mesh.userData.smokePuffs as THREE.Object3D[] | undefined;
        if (citySmoke && citySmoke.length > 0) {
          this.citySmokePuffs.push(...citySmoke);
        }
      }
    }

    // 6. Incremental Units (keep existing BuiltUnitSprite objects alive by unit.id!)
    const playerFactionMap = new Map<PlayerId, FactionId>();
    for (const p of state.players) {
      playerFactionMap.set(p.id, p.faction);
    }

    const activeUnitIds = new Set<string>();
    this.unitHitMeshes = [];
    this.unitBanners = [];
    this.unitWorldCoords.clear();
    this.unitHeightsByCoord.clear();

    for (const unit of Object.values(state.units)) {
      const idx = tileIndex(unit.x, unit.y, state.mapSize);
      if (!revealed[idx]) continue;

      activeUnitIds.add(unit.id);
      const faction = playerFactionMap.get(unit.ownerId) ?? 'humans';
      const isHumanOwner = unit.ownerId === resolvedViewerId;
      const canCapture = Boolean(unit.canCapture);
      const canExploreRuins = Boolean(unit.canExploreRuins);

      // Authoritative Ready state: zero legal actions => dimmed stone-grey with no Ready Ring
      const hasRemaining = isHumanOwner
        ? !unit.actedThisTurn && hasUnitRemainingActions(state, unit.id)
        : !unit.actedThisTurn;
      const isExhausted = isHumanOwner ? !hasRemaining : unit.actedThisTurn;

      const pos = getUnitWorldPosition(state, unit.x, unit.y);
      const visualKey = `${isHumanOwner ? 1 : 0}|${isExhausted ? 1 : 0}|${canCapture ? 1 : 0}|${canExploreRuins ? 1 : 0}`;
      const isAnimating = this.animatingUnitIds.has(unit.id);

      let entry = this.unitEntries.get(unit.id);
      const canReuse =
        entry !== undefined &&
        entry.type === unit.type &&
        entry.faction === faction &&
        entry.isVeteran === unit.isVeteran &&
        entry.canPromote === unit.canPromote;

      if (canReuse && entry) {
        entry.hitMesh.userData.tileX = unit.x;
        entry.hitMesh.userData.tileY = unit.y;

        if (!isAnimating) {
          entry.built.group.position.copy(pos);
          entry.built.group.visible = true;
          entry.built.group.scale.setScalar(1);
          entry.built.sprite.scale.set(entry.built.baseScaleX, entry.built.baseScaleY, 1);
          entry.built.spriteMat.rotation = 0;
        }

        if (entry.lastVisualKey !== visualKey) {
          setUnitVisualState(entry.built, {
            isHumanOwner,
            actedThisTurn: isExhausted,
            canCapture,
            canExploreRuins,
          });
          entry.lastVisualKey = visualKey;
        }
      } else {
        if (entry) {
          this.unitsGroup.remove(entry.built.group);
          disposeUnitSprite(entry.built);
        }

        const built = createUnitSprite(unit.type, faction, {
          isVeteran: unit.isVeteran,
          canPromote: unit.canPromote,
          actedThisTurn: isExhausted,
          canCapture,
          canExploreRuins,
          isHumanOwner,
        });
        built.group.position.copy(pos);

        setUnitVisualState(built, {
          isHumanOwner,
          actedThisTurn: isExhausted,
          canCapture,
          canExploreRuins,
        });

        const unitHitMesh = new THREE.Mesh(BoardRenderer.UNIT_HIT_GEO, BoardRenderer.UNIT_HIT_MAT);
        const hitScaleY = Math.max(0.74, built.unitHeight / 1.65);
        unitHitMesh.scale.set(1, hitScaleY, 1);
        unitHitMesh.position.y = built.unitHeight * 0.52;
        unitHitMesh.userData = {
          tileX: unit.x,
          tileY: unit.y,
          unitId: unit.id,
        };
        built.group.add(unitHitMesh);

        this.unitsGroup.add(built.group);
        entry = {
          built,
          type: unit.type,
          faction,
          isVeteran: unit.isVeteran,
          canPromote: unit.canPromote,
          hitMesh: unitHitMesh,
          lastVisualKey: visualKey,
        };
        this.unitEntries.set(unit.id, entry);
        this.unitObjects.set(unit.id, built);
      }

      this.unitHitMeshes.push(entry.hitMesh);
      const prevMeta = this.unitBaseMeta.get(unit.id);
      this.unitBaseMeta.set(unit.id, {
        isHumanOwner,
        exhausted: isExhausted,
        canCapture,
        canExploreRuins,
        phase: prevMeta?.phase ?? (unit.x * 1.3 + unit.y * 2.1) % (Math.PI * 2),
      });
      if (entry.built.banners.length > 0) {
        this.unitBanners.push(...entry.built.banners);
      }

      const key = coordKey(unit.x, unit.y);
      this.unitWorldCoords.set(key, pos.clone());
      this.unitHeightsByCoord.set(key, entry.built.unitHeight);
    }

    // Remove dead or hidden units (skip any still finishing a death tween)
    for (const [unitId, entry] of this.unitEntries) {
      if (!activeUnitIds.has(unitId) && !this.animatingUnitIds.has(unitId)) {
        this.unitsGroup.remove(entry.built.group);
        disposeUnitSprite(entry.built);
        this.unitEntries.delete(unitId);
        this.unitObjects.delete(unitId);
        this.unitBaseMeta.delete(unitId);
      }
    }
  }

  private rebuildTerritoryBorders(state: GameState, revealed: boolean[]): void {
    clearGroup(this.bordersGroup);

    const ownerOfTile = (x: number, y: number): PlayerId | null => {
      const t = getTile(state, x, y);
      if (!t || !t.cityId) return null;
      return state.cities[t.cityId]?.ownerId ?? null;
    };

    const playerFactionMap = new Map<PlayerId, FactionId>();
    for (const p of state.players) {
      playerFactionMap.set(p.id, p.faction);
    }

    const half = TILE_SIZE * 0.5 - 0.06;

    for (let y = 0; y < state.mapSize; y++) {
      for (let x = 0; x < state.mapSize; x++) {
        const idx = tileIndex(x, y, state.mapSize);
        if (!revealed[idx]) continue;
        const owner = ownerOfTile(x, y);
        if (!owner) continue;
        const faction = playerFactionMap.get(owner);
        if (!faction) continue;

        const borderColor = getDisplayFactionPrimary(faction);
        const mat = getFlatMaterial(borderColor, {
          roughness: 0.48,
          emissive: borderColor,
          emissiveIntensity: 0.35,
        });
        const basePos = tileToWorld(x, y, state.mapSize, TILE_TOP_Y + 0.032);

        if (ownerOfTile(x, y - 1) !== owner) {
          const m = new THREE.Mesh(BoardRenderer.BORDER_H_GEO, mat);
          m.position.set(basePos.x, basePos.y, basePos.z - half);
          this.bordersGroup.add(m);
        }
        if (ownerOfTile(x, y + 1) !== owner) {
          const m = new THREE.Mesh(BoardRenderer.BORDER_H_GEO, mat);
          m.position.set(basePos.x, basePos.y, basePos.z + half);
          this.bordersGroup.add(m);
        }
        if (ownerOfTile(x - 1, y) !== owner) {
          const m = new THREE.Mesh(BoardRenderer.BORDER_V_GEO, mat);
          m.position.set(basePos.x - half, basePos.y, basePos.z);
          this.bordersGroup.add(m);
        }
        if (ownerOfTile(x + 1, y) !== owner) {
          const m = new THREE.Mesh(BoardRenderer.BORDER_V_GEO, mat);
          m.position.set(basePos.x + half, basePos.y, basePos.z);
          this.bordersGroup.add(m);
        }
      }
    }
  }

  public setHoverTile(coord: Coord | null): void {
    if (!coord) {
      this.hoverBracket.visible = false;
      return;
    }
    const pos = tileToWorld(coord.x, coord.y, this.mapSize, TILE_TOP_Y + 0.04);
    this.hoverBracket.position.copy(pos);
    this.hoverBracket.visible = true;
  }

  private getMoveOverlayY(tile?: Tile): number {
    if (!tile) return TILE_TOP_Y + 0.05;
    if (tile.terrain === 'mountain' && !tile.isCityCenter && !tile.hasVillage) {
      return TILE_TOP_Y + MOUNTAIN_LEDGE_Y + 0.04;
    }
    if (tile.isCityCenter || tile.hasVillage) {
      return TILE_TOP_Y + CITY_PLAZA_Y + 0.04;
    }
    if (tile.improvement !== null || tile.resource !== null) {
      return TILE_TOP_Y + 0.36;
    }
    return TILE_TOP_Y + 0.05;
  }

  public setSelectedTile(coord: Coord | null): void {
    if (!coord) {
      this.selectedRing.visible = false;
      return;
    }
    const key = coordKey(coord.x, coord.y);
    const unitPos = this.unitWorldCoords.get(key);
    if (unitPos) {
      this.selectedRing.position.set(unitPos.x, unitPos.y + 0.03, unitPos.z);
      this.selectedRing.visible = true;
      return;
    }
    if (this.mountainCoords.has(key)) {
      const pos = tileToWorld(coord.x, coord.y, this.mapSize, TILE_TOP_Y + MOUNTAIN_LEDGE_Y + 0.03);
      this.selectedRing.position.set(
        pos.x + MOUNTAIN_LEDGE_OFFSET_X,
        pos.y,
        pos.z + MOUNTAIN_LEDGE_OFFSET_Z,
      );
      this.selectedRing.visible = true;
      return;
    }
    const tile = this.tilesByCoord.get(key);
    if (this.cityCoords.has(key) || tile?.hasVillage) {
      const pos = tileToWorld(coord.x, coord.y, this.mapSize, TILE_TOP_Y + CITY_PLAZA_Y + 0.03);
      this.selectedRing.position.set(
        pos.x + GARRISON_OFFSET_X,
        pos.y,
        pos.z + GARRISON_OFFSET_Z,
      );
      this.selectedRing.visible = true;
      return;
    }
    const pos = tileToWorld(coord.x, coord.y, this.mapSize, this.getMoveOverlayY(tile));
    this.selectedRing.position.copy(pos);
    this.selectedRing.visible = true;
  }

  public setMoveTargets(coords: Coord[]): void {
    clearGroup(this.moveOverlayGroup);
    if (coords.length === 0) return;

    for (const c of coords) {
      const key = coordKey(c.x, c.y);
      const tile = this.tilesByCoord.get(key);
      const isMountain =
        this.mountainCoords.has(key) ||
        Boolean(tile && tile.terrain === 'mountain' && !tile.isCityCenter && !tile.hasVillage);
      const isCityOrVillage =
        this.cityCoords.has(key) || Boolean(tile && (tile.isCityCenter || tile.hasVillage));

      const overlayY = this.getMoveOverlayY(tile);
      const pos = tileToWorld(c.x, c.y, this.mapSize, overlayY);
      if (isMountain) {
        pos.x += MOUNTAIN_LEDGE_OFFSET_X;
        pos.z += MOUNTAIN_LEDGE_OFFSET_Z;
      } else if (isCityOrVillage) {
        pos.x += GARRISON_OFFSET_X;
        pos.z += GARRISON_OFFSET_Z;
      }

      const compact = isMountain || isCityOrVillage;

      // Glowing translucent sky-blue circle fill
      const fill = new THREE.Mesh(
        compact ? BoardRenderer.MOVE_FILL_COMPACT_GEO : BoardRenderer.MOVE_FILL_GEO,
        BoardRenderer.MOVE_FILL_MAT,
      );
      fill.position.copy(pos);
      fill.renderOrder = 32;
      this.moveOverlayGroup.add(fill);

      // Crisp bright Polytopia outer ring
      const ring = new THREE.Mesh(
        compact ? BoardRenderer.MOVE_RING_COMPACT_GEO : BoardRenderer.MOVE_RING_GEO,
        BoardRenderer.MOVE_RING_MAT,
      );
      ring.position.set(pos.x, pos.y + 0.005, pos.z);
      ring.renderOrder = 32;
      this.moveOverlayGroup.add(ring);

      // Crisp pulsing center move dot
      const dot = new THREE.Mesh(BoardRenderer.MOVE_DOT_GEO, BoardRenderer.MOVE_DOT_MAT);
      dot.position.set(pos.x, pos.y + 0.01, pos.z);
      dot.renderOrder = 33;
      dot.userData = { isMoveDot: true, phase: (c.x * 0.7 + c.y * 1.1) % (Math.PI * 2) };
      this.moveOverlayGroup.add(dot);
    }
  }

  public setAttackTargets(targets: AttackTargetOverlay[]): void {
    clearGroup(this.attackOverlayGroup);
    if (targets.length === 0) return;

    for (const c of targets) {
      const key = coordKey(c.x, c.y);
      const tile = this.tilesByCoord.get(key);
      const unitPos = this.unitWorldCoords.get(key);
      const isMountain = this.mountainCoords.has(key);

      let baseX: number;
      let baseY: number;
      let baseZ: number;
      if (unitPos) {
        baseX = unitPos.x;
        baseY = unitPos.y;
        baseZ = unitPos.z;
      } else if (isMountain) {
        const p = tileToWorld(c.x, c.y, this.mapSize, TILE_TOP_Y + MOUNTAIN_LEDGE_Y);
        baseX = p.x + MOUNTAIN_LEDGE_OFFSET_X;
        baseY = p.y;
        baseZ = p.z + MOUNTAIN_LEDGE_OFFSET_Z;
      } else {
        const p = tileToWorld(c.x, c.y, this.mapSize, this.getMoveOverlayY(tile));
        baseX = p.x;
        baseY = p.y;
        baseZ = p.z;
      }

      if (c.lethal) {
        const ringScale = isMountain ? 0.76 : 1.0;

        const outerRing = new THREE.Mesh(
          BoardRenderer.LETHAL_OUTER_RING_GEO,
          BoardRenderer.LETHAL_OUTER_RING_MAT,
        );
        outerRing.position.set(baseX, baseY + 0.05, baseZ);
        outerRing.renderOrder = 34;
        outerRing.userData = { isLethalRing: true, ringPhase: 0, baseScale: ringScale };
        this.attackOverlayGroup.add(outerRing);

        const innerRing = new THREE.Mesh(
          BoardRenderer.LETHAL_INNER_RING_GEO,
          BoardRenderer.LETHAL_INNER_RING_MAT,
        );
        innerRing.position.set(baseX, baseY + 0.06, baseZ);
        innerRing.renderOrder = 34;
        innerRing.userData = { isLethalRing: true, ringPhase: Math.PI, baseScale: ringScale };
        this.attackOverlayGroup.add(innerRing);

        const marker = new THREE.Group();
        const core = new THREE.Mesh(BoardRenderer.LETHAL_CORE_GEO, BoardRenderer.LETHAL_CORE_MAT);
        marker.add(core);

        const halo = new THREE.Mesh(BoardRenderer.LETHAL_HALO_GEO, BoardRenderer.LETHAL_GOLD_MAT);
        marker.add(halo);

        const spikeE = new THREE.Mesh(
          BoardRenderer.LETHAL_SPIKE_X_GEO,
          BoardRenderer.LETHAL_GOLD_MAT,
        );
        spikeE.position.x = 0.28;
        marker.add(spikeE);
        const spikeW = new THREE.Mesh(
          BoardRenderer.LETHAL_SPIKE_X_GEO,
          BoardRenderer.LETHAL_GOLD_MAT,
        );
        spikeW.position.x = -0.28;
        marker.add(spikeW);
        const spikeS = new THREE.Mesh(
          BoardRenderer.LETHAL_SPIKE_Z_GEO,
          BoardRenderer.LETHAL_GOLD_MAT,
        );
        spikeS.position.z = 0.28;
        marker.add(spikeS);
        const spikeN = new THREE.Mesh(
          BoardRenderer.LETHAL_SPIKE_Z_GEO,
          BoardRenderer.LETHAL_GOLD_MAT,
        );
        spikeN.position.z = -0.28;
        marker.add(spikeN);

        const crown = new THREE.Mesh(BoardRenderer.LETHAL_CROWN_GEO, BoardRenderer.LETHAL_GOLD_MAT);
        crown.position.y = 0.28;
        marker.add(crown);

        for (const part of marker.children) {
          part.renderOrder = 34;
        }

        const unitH = this.unitHeightsByCoord.get(key) ?? 1.56;
        const markerY = baseY + unitH + 0.36;
        marker.position.set(baseX, markerY, baseZ);
        marker.renderOrder = 34;
        marker.userData = {
          isTargetDiamond: true,
          isLethalMarker: true,
          baseY: markerY,
        };
        this.attackOverlayGroup.add(marker);
      } else {
        const ring = new THREE.Mesh(BoardRenderer.ATTACK_RING_GEO, BoardRenderer.ATTACK_RING_MAT);
        ring.position.set(baseX, baseY + 0.045, baseZ);
        ring.renderOrder = 34;
        if (isMountain) {
          ring.scale.setScalar(0.76);
        }
        this.attackOverlayGroup.add(ring);

        const unitH = this.unitHeightsByCoord.get(key) ?? 1.56;
        const diamondY = baseY + unitH + 0.28;
        const diamond = new THREE.Mesh(
          BoardRenderer.ATTACK_DIAMOND_GEO,
          BoardRenderer.ATTACK_DIAMOND_MAT,
        );
        diamond.position.set(baseX, diamondY, baseZ);
        diamond.renderOrder = 34;
        diamond.userData = {
          isTargetDiamond: true,
          baseY: diamondY,
        };
        this.attackOverlayGroup.add(diamond);
      }
    }
  }

  public clearHighlights(): void {
    this.setSelectedTile(null);
    this.setMoveTargets([]);
    this.setAttackTargets([]);
  }

  public update(rawDt: number, elapsed: number): void {
    const dt = Math.min(Math.max(rawDt, 0), MAX_FRAME_DT);

    // 1. Binary Polytopia Ready vs Acted idle animation & pulsing Ready Ring
    for (const [id, built] of this.unitObjects) {
      const meta = this.unitBaseMeta.get(id);
      const phase = meta?.phase ?? 0;

      if (!this.animatingUnitIds.has(id)) {
        if (meta?.isHumanOwner) {
          if (meta.exhausted) {
            // Acted units stay completely still like stone figurines (amp = 0)
            built.bodyGroup.position.y = 0.055;
          } else {
            // Ready human units: lively vertical bounce (amp = 0.045) + pulsing Ready Ring
            built.bodyGroup.position.y = 0.055 + Math.sin(elapsed * 3.4 + phase) * 0.045;
            if (built.readyRing.visible) {
              const isSpecial = meta.canCapture || meta.canExploreRuins;
              const pulseSpeed = isSpecial ? 4.4 : 3.6;
              const p = 0.5 + 0.5 * Math.sin(elapsed * pulseSpeed + phase);
              const s = 1.0 + p * (isSpecial ? 0.1 : 0.07);
              built.readyRing.scale.set(s, s, 1);
              built.readyRingMat.opacity = (isSpecial ? 0.78 : 0.72) + p * 0.22;
            }
          }
        } else {
          // Enemy units: gentle subtle bob (amp = 0.016)
          built.bodyGroup.position.y = 0.055 + Math.sin(elapsed * 2.4 + phase) * 0.016;
        }
      }

      if (built.veteranCrown) {
        built.veteranCrown.rotation.y += dt * 1.8;
      }
      if (built.promoteRing) {
        const s = 1 + Math.sin(elapsed * 4.5) * 0.08;
        built.promoteRing.scale.set(s, s, 1);
      }
    }

    // 2. Rolling sine-wave wind sway on trees
    for (const tree of this.animatedTrees) {
      const phase = (tree.userData.swayPhase as number) ?? 0;
      tree.rotation.z = Math.sin(elapsed * 1.4 + phase) * 0.036;
      tree.rotation.x = Math.cos(elapsed * 1.1 + phase) * 0.022;
    }

    // 3. Windmill blades spin
    for (const blades of this.windmillBlades) {
      blades.rotation.z -= dt * 1.4;
    }

    // 4. Stylized animated water ripples & flowing caustic textures (skip hidden cloud-covered tiles)
    updateAnimatedTextures(dt);
    for (const water of this.waterMeshes) {
      const tx = (water.userData.tileX as number) ?? 0;
      const ty = (water.userData.tileY as number) ?? 0;
      if (this.cloudObjects.has(coordKey(tx, ty))) continue;

      const posAttr = water.geometry.attributes.position as THREE.BufferAttribute;
      const base = water.userData.basePositions as Float32Array;
      for (let i = 0; i < posAttr.count; i++) {
        const bx = base[i * 3];
        const bz = base[i * 3 + 2];
        const wave = Math.sin(elapsed * 2.1 + (bx + tx * 2) * 1.2 + (bz + ty * 2) * 0.9) * 0.032;
        posAttr.setY(i, base[i * 3 + 1] + wave);
      }
      posAttr.needsUpdate = true;
      water.geometry.computeVertexNormals();
    }

    // 5. Fog cloud gentle float (skip clouds actively fading/lifting out)
    for (const [key, cloud] of this.cloudObjects) {
      if (this.animatingCloudKeys.has(key)) continue;
      cloud.group.position.y = cloud.baseY + Math.sin(elapsed * 0.9 + cloud.phase) * 0.08;
      cloud.group.position.x = cloud.baseX + Math.cos(elapsed * 0.45 + cloud.phase) * 0.05;
    }

    // 6. Pulsing selection, move-dot & attack highlights
    if (this.selectedRing.visible) {
      const s = 1 + Math.sin(elapsed * 4.2) * 0.06;
      this.selectedRing.scale.set(s, s, 1);
    }
    for (const child of this.moveOverlayGroup.children) {
      if (child.userData.isMoveDot) {
        const phase = (child.userData.phase as number) ?? 0;
        const s = 1 + Math.sin(elapsed * 4.8 + phase) * 0.1;
        child.scale.setScalar(s);
      }
    }
    for (const child of this.attackOverlayGroup.children) {
      if (child.userData.isLethalRing) {
        const phase = (child.userData.ringPhase as number) ?? 0;
        const baseScale = (child.userData.baseScale as number) ?? 1;
        const s = baseScale * (1 + Math.sin(elapsed * 6.0 + phase) * 0.11);
        child.scale.setScalar(s);
      } else if (child.userData.isTargetDiamond) {
        const baseY = (child.userData.baseY as number) ?? TILE_TOP_Y + 1.78;
        if (child.userData.isLethalMarker) {
          child.rotation.y += dt * 3.4;
          child.position.y = baseY + Math.sin(elapsed * 5.6) * 0.11;
          const pulse = 1 + Math.sin(elapsed * 6.5) * 0.13;
          child.scale.setScalar(pulse);
        } else {
          child.rotation.y += dt * 2.4;
          child.position.y = baseY + Math.sin(elapsed * 4.5) * 0.08;
        }
      }
    }

    // 7. Gentle banner flutter on cities & mounted lances
    for (const banner of this.cityBanners) {
      const phase = (banner.userData.bannerPhase as number) ?? 0;
      const baseRotY = (banner.userData.baseRotY as number) ?? 0;
      banner.rotation.y = baseRotY + Math.sin(elapsed * 3.1 + phase) * 0.16;
    }
    for (const banner of this.unitBanners) {
      const phase = (banner.userData.bannerPhase as number) ?? 0;
      const baseRotY = (banner.userData.baseRotY as number) ?? 0;
      banner.rotation.y = baseRotY + Math.sin(elapsed * 3.1 + phase) * 0.16;
    }

    // 8. Rising chimney smoke puffs
    const updateSmoke = (puffs: THREE.Object3D[]) => {
      for (const puff of puffs) {
        const bx = (puff.userData.smokeBaseX as number) ?? 0;
        const by = (puff.userData.smokeBaseY as number) ?? 0;
        const bz = (puff.userData.smokeBaseZ as number) ?? 0;
        const phase = (puff.userData.smokePhase as number) ?? 0;
        const t = (elapsed * 0.34 + phase) % 1;
        puff.position.set(
          bx + Math.sin(t * Math.PI * 2 + phase) * 0.045,
          by + t * 0.44,
          bz + Math.cos(t * Math.PI * 2 + phase) * 0.035,
        );
        const s = Math.sin(t * Math.PI) * 1.0 + 0.18;
        puff.scale.setScalar(s);
      }
    };
    updateSmoke(this.tileSmokePuffs);
    updateSmoke(this.citySmokePuffs);

    // 9. Ambient floating motes
    for (const mote of this.floatingMotes) {
      const kind = mote.userData.moteKind as string | undefined;
      const bx = (mote.userData.baseX as number) ?? 0;
      const by = (mote.userData.baseY as number) ?? 0;
      const bz = (mote.userData.baseZ as number) ?? 0;
      const phase = (mote.userData.phase as number) ?? 0;

      if (kind === 'firefly') {
        mote.position.set(
          bx + Math.sin(elapsed * 1.1 + phase) * 0.14,
          by + Math.sin(elapsed * 1.9 + phase * 1.3) * 0.12,
          bz + Math.cos(elapsed * 0.95 + phase) * 0.14,
        );
        mote.rotation.y += dt * 1.4;
      } else if (kind === 'ember') {
        const t = (elapsed * 0.42 + phase) % 1;
        mote.position.set(
          bx + Math.sin(t * Math.PI * 2 + phase * 6) * 0.08,
          by + t * 0.85,
          bz + Math.cos(t * Math.PI * 2 + phase * 6) * 0.08,
        );
        mote.scale.setScalar(0.25 + Math.sin(t * Math.PI) * 0.45);
      } else if (kind === 'rune') {
        mote.position.y = by + Math.sin(elapsed * 2.4 + phase) * 0.07;
        mote.rotation.y += dt * 1.5;
      }
    }
  }
}
