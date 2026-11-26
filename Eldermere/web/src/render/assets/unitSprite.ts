import * as THREE from 'three';
import { FACTION_DEFINITIONS } from '../../game/data/factions';
import type { FactionId, UnitType } from '../../game/types';
import { getUnitSpriteUrl } from './spriteManifest';
import type { BuiltUnitMesh, UnitMaterialEntry } from './unitMesh';

export interface UnitSpriteOptions {
  isVeteran?: boolean;
  canPromote?: boolean;
  actedThisTurn?: boolean;
  canCapture?: boolean;
  canExploreRuins?: boolean;
  isHumanOwner?: boolean;
}

export interface UnitVisualStateOptions {
  isHumanOwner: boolean;
  actedThisTurn: boolean;
  canCapture?: boolean;
  canExploreRuins?: boolean;
}

export interface BuiltUnitSprite extends BuiltUnitMesh {
  sprite: THREE.Sprite;
  spriteMat: THREE.SpriteMaterial;
  flashSprite: THREE.Sprite;
  flashSpriteMat: THREE.SpriteMaterial;
  shadowDisc: THREE.Mesh;
  baseScaleX: number;
  baseScaleY: number;
  restingSpriteColor: THREE.Color;
  restingSpriteOpacity: number;
  setHitFlash: (active: boolean, color?: string) => void;
  /** True for procedural 3D superpower units ('dragon', 'watchtower') instead of 2.5D billboards. */
  isProcedural3D?: boolean;
  proceduralRoot?: THREE.Group;
  wingLeft?: THREE.Object3D;
  wingRight?: THREE.Object3D;
  flameMesh?: THREE.Object3D;
  lastVisualOpts?: UnitVisualStateOptions;
}

// ============================================================================
// True Faction Height Scaling & Silhouette Proportions
// ============================================================================

const BASE_INFANTRY_HEIGHT = 1.56;

const FACTION_HEIGHT_MULTIPLIER: Record<FactionId, number> = {
  dwarves: 0.78, // Noticeably shorter, stout & sturdy (~1.22 tall!)
  humans: 1.0, // Classic baseline (~1.56 tall)
  elves: 1.06, // Tall, slender & graceful (~1.65 tall)
  orcs: 1.02, // Broad, hunched brute (~1.59 tall)
};

const FACTION_WIDTH_ASPECT: Record<FactionId, number> = {
  dwarves: 1.08, // Broad shoulders & heavy beard
  humans: 1.0,
  elves: 0.94, // Slender silhouette
  orcs: 1.05, // Wide hunched build
};

export interface UnitSpriteDimensions {
  width: number;
  height: number;
  shadowScale: number;
}

export function getUnitSpriteDimensions(
  type: UnitType,
  faction: FactionId = 'humans',
): UnitSpriteDimensions {
  const factionH = FACTION_HEIGHT_MULTIPLIER[faction];
  const factionAspect = FACTION_WIDTH_ASPECT[faction];

  switch (type as string) {
    case 'dragon': {
      // Hovering Fire Drake — grand wingspan & heroic stature
      return { width: 2.0, height: 1.95, shadowScale: 1.24 };
    }
    case 'watchtower': {
      // Tall fortified stone-and-gold Beacon Tower
      return { width: 1.45, height: 2.05, shadowScale: 1.12 };
    }
    case 'uruk_berserker': {
      // Towering 1.24x Orc berserker (~1.93 world units tall)
      const h = BASE_INFANTRY_HEIGHT * 1.24;
      return { width: h * 1.04, height: h, shadowScale: 1.12 };
    }
    case 'rohirrim_knight': {
      // Heroic wide mounted knight (~1.93 tall, wide aspect)
      const h = BASE_INFANTRY_HEIGHT * 1.24;
      return { width: h * 1.05, height: h, shadowScale: 1.22 };
    }
    case 'rider': {
      // Mounted cavalry (Dwarf Ram Rider remains stout & compact!)
      const mountMult = faction === 'humans' || faction === 'dwarves' ? 1.18 : 1.16;
      const h = BASE_INFANTRY_HEIGHT * factionH * mountMult;
      const aspect = faction === 'dwarves' ? 1.13 : faction === 'elves' ? 1.0 : 1.06;
      return { width: h * aspect, height: h, shadowScale: faction === 'dwarves' ? 1.12 : 1.2 };
    }
    case 'catapult': {
      // Wide chunky siege engine silhouette
      const h = faction === 'dwarves' ? 1.38 : 1.54;
      return { width: h * 1.22, height: h, shadowScale: 1.24 };
    }
    case 'ironbreaker': {
      // Heavily armored Dwarf champion — still noticeably shorter than Humans/Elves/Orcs
      const h = BASE_INFANTRY_HEIGHT * factionH * 1.04;
      return { width: h * 1.11, height: h, shadowScale: 1.05 };
    }
    case 'elven_sentinel': {
      // Tall, graceful Elven champion
      const h = BASE_INFANTRY_HEIGHT * factionH * 1.03;
      return { width: h * 0.94, height: h, shadowScale: 1.0 };
    }
    case 'defender': {
      const h = BASE_INFANTRY_HEIGHT * factionH;
      return { width: h * (factionAspect * 1.03), height: h, shadowScale: 1.03 };
    }
    case 'archer': {
      const h = BASE_INFANTRY_HEIGHT * factionH * 0.99;
      return { width: h * factionAspect, height: h, shadowScale: 0.98 };
    }
    case 'warrior':
    default: {
      const h = BASE_INFANTRY_HEIGHT * factionH;
      return { width: h * factionAspect, height: h, shadowScale: 1.0 };
    }
  }
}

export function getUnitHeight(type: UnitType, faction: FactionId = 'humans'): number {
  return getUnitSpriteDimensions(type, faction).height;
}

// ============================================================================
// Shared Geometries, Materials & Texture Cache
// ============================================================================

const textureLoader = new THREE.TextureLoader();
const textureCache = new Map<string, THREE.Texture>();

export function getUnitSpriteTexture(url: string): THREE.Texture {
  let tex = textureCache.get(url);
  if (!tex) {
    tex = textureLoader.load(url);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = true;
    tex.anisotropy = 4;
    textureCache.set(url, tex);
  }
  return tex;
}

const shadowDiscGeo = new THREE.CircleGeometry(0.46, 20);
shadowDiscGeo.rotateX(-Math.PI / 2);

const baseDiscGeo = new THREE.CylinderGeometry(0.39, 0.43, 0.044, 18);

const readyRingGeo = new THREE.RingGeometry(0.45, 0.58, 28);
readyRingGeo.rotateX(-Math.PI / 2);

const promoteRingGeo = new THREE.RingGeometry(0.58, 0.69, 24);
promoteRingGeo.rotateX(-Math.PI / 2);

const crownGemGeo = new THREE.OctahedronGeometry(0.11, 0);
const crownHaloGeo = new THREE.TorusGeometry(0.145, 0.024, 6, 16);
crownHaloGeo.rotateX(Math.PI / 2);

/** Gilded rim hugging the base disc's top edge on veteran units. */
const veteranRimGeo = new THREE.TorusGeometry(0.405, 0.03, 4, 28);
veteranRimGeo.rotateX(Math.PI / 2);
/** The veteran sprite now carries its own head ornament, so the floating crown is a small accent. */
const VETERAN_CROWN_SCALE = 0.6;

const sharedShadowMat = new THREE.MeshBasicMaterial({
  color: '#0b1220',
  transparent: true,
  opacity: 0.34,
  depthWrite: false,
});

const READY_SPRITE_COLOR = new THREE.Color('#ffffff');
const ACTED_SPRITE_COLOR = new THREE.Color('#6e788a');
const EXHAUSTED_BASE_COLOR = new THREE.Color('#5c6573');
const EXHAUSTED_STONE_GREY = new THREE.Color('#7c8696');

// ============================================================================
// Shared Low-Poly Geometries for Procedural 3D Superpower Units
// ============================================================================

// Fire Drake ('dragon') geometries
const dragonTorsoGeo = new THREE.CylinderGeometry(0.18, 0.24, 0.68, 6);
dragonTorsoGeo.rotateX(Math.PI / 2);
const dragonBellyGeo = new THREE.BoxGeometry(0.24, 0.12, 0.56);
const dragonNeckGeo = new THREE.CylinderGeometry(0.11, 0.16, 0.42, 6);
const dragonHeadGeo = new THREE.BoxGeometry(0.24, 0.20, 0.36);
const dragonJawGeo = new THREE.BoxGeometry(0.19, 0.08, 0.28);
const dragonHornGeo = new THREE.ConeGeometry(0.048, 0.28, 4);
const dragonEyeGeo = new THREE.OctahedronGeometry(0.042, 0);
const dragonSpineGeo = new THREE.ConeGeometry(0.06, 0.18, 4);
const dragonTail1Geo = new THREE.ConeGeometry(0.15, 0.56, 5);
dragonTail1Geo.rotateX(-Math.PI / 2);
const dragonTailTipGeo = new THREE.OctahedronGeometry(0.11, 0);
const dragonWingSparGeo = new THREE.BoxGeometry(0.78, 0.06, 0.08);
const dragonWingInnerGeo = new THREE.BoxGeometry(0.56, 0.032, 0.48);
const dragonWingOuterGeo = new THREE.BoxGeometry(0.52, 0.028, 0.36);
const dragonClawGeo = new THREE.ConeGeometry(0.055, 0.20, 4);

// Citadel Watchtower ('watchtower') geometries
const towerPlinthGeo = new THREE.BoxGeometry(0.76, 0.20, 0.76);
const towerButtressGeo = new THREE.BoxGeometry(0.16, 0.72, 0.16);
const towerShaftGeo = new THREE.BoxGeometry(0.54, 1.18, 0.54);
const towerSlitGeo = new THREE.BoxGeometry(0.08, 0.24, 0.04);
const towerCollarGeo = new THREE.BoxGeometry(0.60, 0.12, 0.60);
const towerGoldBandGeo = new THREE.BoxGeometry(0.62, 0.055, 0.62);
const towerDeckGeo = new THREE.BoxGeometry(0.74, 0.15, 0.74);
const towerMerlonGeo = new THREE.BoxGeometry(0.16, 0.16, 0.16);
const towerFinialGeo = new THREE.ConeGeometry(0.055, 0.14, 4);
const towerBannerGeo = new THREE.BoxGeometry(0.24, 0.48, 0.03);
const towerBannerTrimGeo = new THREE.BoxGeometry(0.06, 0.42, 0.036);
const towerBrazierGeo = new THREE.CylinderGeometry(0.22, 0.13, 0.16, 6);
const towerBrazierRimGeo = new THREE.TorusGeometry(0.21, 0.028, 5, 12);
towerBrazierRimGeo.rotateX(Math.PI / 2);
const towerFlameOuterGeo = new THREE.ConeGeometry(0.17, 0.42, 6);
const towerFlameInnerGeo = new THREE.OctahedronGeometry(0.12, 0);

function makeTrackedProceduralMat(
  registry: UnitMaterialEntry[],
  color: string,
  opts?: {
    roughness?: number;
    metalness?: number;
    emissive?: string;
    emissiveIntensity?: number;
  },
): THREE.MeshStandardMaterial {
  const mat = new THREE.MeshStandardMaterial({
    color,
    flatShading: true,
    roughness: opts?.roughness ?? 0.78,
    metalness: opts?.metalness ?? 0.08,
    emissive: opts?.emissive ? new THREE.Color(opts.emissive) : new THREE.Color(0x000000),
    emissiveIntensity: opts?.emissiveIntensity ?? 0,
  });
  registry.push({
    material: mat,
    originalColor: mat.color.clone(),
    originalEmissive: mat.emissive.clone(),
    originalEmissiveIntensity: mat.emissiveIntensity,
  });
  return mat;
}

function buildFireDrake3D(
  parent: THREE.Group,
  bodyMaterials: UnitMaterialEntry[],
): { root: THREE.Group; wingLeft: THREE.Group; wingRight: THREE.Group } {
  const root = new THREE.Group();
  // Hover majestically above the tile (clears mountains, forests, water!)
  root.position.y = 0.68;
  root.rotation.y = Math.PI * 0.22;
  parent.add(root);

  const crimsonScale = makeTrackedProceduralMat(bodyMaterials, '#b91c1c', {
    roughness: 0.62,
    metalness: 0.18,
  });
  const wingMembrane = makeTrackedProceduralMat(bodyMaterials, '#dc2626', {
    roughness: 0.68,
    metalness: 0.06,
    emissive: '#991b1b',
    emissiveIntensity: 0.16,
  });
  const bronzePlate = makeTrackedProceduralMat(bodyMaterials, '#d97706', {
    roughness: 0.42,
    metalness: 0.48,
    emissive: '#b45309',
    emissiveIntensity: 0.12,
  });
  const obsidianHorn = makeTrackedProceduralMat(bodyMaterials, '#292524', {
    roughness: 0.5,
    metalness: 0.35,
  });
  const emberGlow = makeTrackedProceduralMat(bodyMaterials, '#ff7a1a', {
    roughness: 0.3,
    metalness: 0.0,
    emissive: '#ff4500',
    emissiveIntensity: 0.95,
  });
  const eyeGlow = makeTrackedProceduralMat(bodyMaterials, '#fef08a', {
    roughness: 0.2,
    metalness: 0.0,
    emissive: '#f59e0b',
    emissiveIntensity: 1.25,
  });

  // Main torso tilted heroically upward
  const torso = new THREE.Mesh(dragonTorsoGeo, crimsonScale);
  torso.position.set(0, 0.18, 0);
  torso.rotation.x = -0.18;
  root.add(torso);

  // Glowing molten ember belly
  const belly = new THREE.Mesh(dragonBellyGeo, emberGlow);
  belly.position.set(0, 0.04, 0.03);
  belly.rotation.x = -0.18;
  root.add(belly);

  // Bronze dorsal ridge spikes
  for (let i = 0; i < 3; i++) {
    const spine = new THREE.Mesh(dragonSpineGeo, bronzePlate);
    spine.position.set(0, 0.37 - i * 0.03, 0.16 - i * 0.2);
    spine.rotation.x = -0.35;
    root.add(spine);
  }

  // Sweeping tucked claws beneath chest
  const clawL = new THREE.Mesh(dragonClawGeo, obsidianHorn);
  clawL.position.set(-0.15, -0.05, 0.12);
  clawL.rotation.set(Math.PI + 0.35, 0, 0.18);
  root.add(clawL);

  const clawR = new THREE.Mesh(dragonClawGeo, obsidianHorn);
  clawR.position.set(0.15, -0.05, 0.12);
  clawR.rotation.set(Math.PI + 0.35, 0, -0.18);
  root.add(clawR);

  // Arched neck & horned Fire Drake head
  const neck = new THREE.Mesh(dragonNeckGeo, crimsonScale);
  neck.position.set(0, 0.44, 0.32);
  neck.rotation.x = 0.48;
  root.add(neck);

  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.62, 0.48);
  headGroup.rotation.x = 0.08;
  root.add(headGroup);

  const skull = new THREE.Mesh(dragonHeadGeo, crimsonScale);
  headGroup.add(skull);

  const jaw = new THREE.Mesh(dragonJawGeo, bronzePlate);
  jaw.position.set(0, -0.11, 0.05);
  jaw.rotation.x = 0.14;
  headGroup.add(jaw);

  // Swept-back obsidian horns
  const hornL = new THREE.Mesh(dragonHornGeo, obsidianHorn);
  hornL.position.set(-0.11, 0.16, -0.12);
  hornL.rotation.set(-0.75, 0, 0.34);
  headGroup.add(hornL);

  const hornR = new THREE.Mesh(dragonHornGeo, obsidianHorn);
  hornR.position.set(0.11, 0.16, -0.12);
  hornR.rotation.set(-0.75, 0, -0.34);
  headGroup.add(hornR);

  // Glowing golden-ember eyes
  const eyeL = new THREE.Mesh(dragonEyeGeo, eyeGlow);
  eyeL.position.set(-0.12, 0.04, 0.1);
  headGroup.add(eyeL);

  const eyeR = new THREE.Mesh(dragonEyeGeo, eyeGlow);
  eyeR.position.set(0.12, 0.04, 0.1);
  headGroup.add(eyeR);

  // Sweeping tail + fiery diamond tail-tip
  const tail = new THREE.Mesh(dragonTail1Geo, crimsonScale);
  tail.position.set(0, 0.05, -0.52);
  tail.rotation.x = 0.28;
  root.add(tail);

  const tailTip = new THREE.Mesh(dragonTailTipGeo, emberGlow);
  tailTip.position.set(0, -0.02, -0.82);
  tailTip.scale.set(0.85, 0.6, 1.35);
  root.add(tailTip);

  // Spread Left & Right Wings (animated flap pivots)
  const buildWing = (side: -1 | 1): THREE.Group => {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.18, 0.28, 0.08);

    const spar = new THREE.Mesh(dragonWingSparGeo, bronzePlate);
    spar.position.set(side * 0.38, 0.12, 0.06);
    spar.rotation.z = side * 0.28;
    spar.rotation.y = -side * 0.16;
    pivot.add(spar);

    const inner = new THREE.Mesh(dragonWingInnerGeo, wingMembrane);
    inner.position.set(side * 0.32, 0.06, -0.14);
    inner.rotation.z = side * 0.22;
    inner.rotation.y = -side * 0.14;
    pivot.add(inner);

    const outer = new THREE.Mesh(dragonWingOuterGeo, wingMembrane);
    outer.position.set(side * 0.72, 0.18, -0.2);
    outer.rotation.z = side * 0.42;
    outer.rotation.y = -side * 0.26;
    pivot.add(outer);

    root.add(pivot);
    return pivot;
  };

  const wingLeft = buildWing(-1);
  const wingRight = buildWing(1);

  return { root, wingLeft, wingRight };
}

function buildWatchtower3D(
  parent: THREE.Group,
  bodyMaterials: UnitMaterialEntry[],
  banners: THREE.Object3D[],
): { root: THREE.Group; flameMesh: THREE.Group } {
  const root = new THREE.Group();
  parent.add(root);

  const stoneLight = makeTrackedProceduralMat(bodyMaterials, '#e2e8f0', {
    roughness: 0.84,
    metalness: 0.04,
  });
  const stoneMid = makeTrackedProceduralMat(bodyMaterials, '#cbd5e1', {
    roughness: 0.86,
    metalness: 0.04,
  });
  const stoneDark = makeTrackedProceduralMat(bodyMaterials, '#334155', {
    roughness: 0.76,
    metalness: 0.15,
  });
  const royalBlue = makeTrackedProceduralMat(bodyMaterials, '#1d4ed8', {
    roughness: 0.62,
    metalness: 0.08,
    emissive: '#1e40af',
    emissiveIntensity: 0.14,
  });
  const royalGold = makeTrackedProceduralMat(bodyMaterials, '#f5c542', {
    roughness: 0.34,
    metalness: 0.56,
    emissive: '#ca8a04',
    emissiveIntensity: 0.22,
  });
  const flameOuterMat = makeTrackedProceduralMat(bodyMaterials, '#f97316', {
    roughness: 0.25,
    metalness: 0.0,
    emissive: '#ea580c',
    emissiveIntensity: 1.05,
  });
  const flameInnerMat = makeTrackedProceduralMat(bodyMaterials, '#fef08a', {
    roughness: 0.2,
    metalness: 0.0,
    emissive: '#facc15',
    emissiveIntensity: 1.35,
  });

  // 1. Wide stone plinth base
  const plinth = new THREE.Mesh(towerPlinthGeo, stoneMid);
  plinth.position.y = 0.10;
  root.add(plinth);

  // 2. Four corner buttress ribs
  const corners: [number, number][] = [
    [-0.27, -0.27],
    [0.27, -0.27],
    [-0.27, 0.27],
    [0.27, 0.27],
  ];
  for (const [cx, cz] of corners) {
    const buttress = new THREE.Mesh(towerButtressGeo, stoneMid);
    buttress.position.set(cx, 0.46, cz);
    root.add(buttress);
  }

  // 3. Tall square dressed-stone masonry shaft
  const shaft = new THREE.Mesh(towerShaftGeo, stoneLight);
  shaft.position.y = 0.79;
  root.add(shaft);

  // 4. Arrow-slit windows on 4 faces
  const slitPositions: [number, number, number][] = [
    [0, 0.275, 0],
    [0, -0.275, 0],
    [0.275, 0, Math.PI / 2],
    [-0.275, 0, Math.PI / 2],
  ];
  for (const [sx, sz, rotY] of slitPositions) {
    const slit = new THREE.Mesh(towerSlitGeo, stoneDark);
    slit.position.set(sx, 0.92, sz);
    slit.rotation.y = rotY;
    root.add(slit);
  }

  // 5. Royal blue & burnished gold upper collar band
  const collar = new THREE.Mesh(towerCollarGeo, royalBlue);
  collar.position.y = 1.30;
  root.add(collar);

  const goldBand = new THREE.Mesh(towerGoldBandGeo, royalGold);
  goldBand.position.y = 1.22;
  root.add(goldBand);

  // 6. Flared battlement deck + 8 crenelation merlons + 4 golden corner finials
  const deck = new THREE.Mesh(towerDeckGeo, stoneLight);
  deck.position.y = 1.44;
  root.add(deck);

  const merlonCoords: [number, number, boolean][] = [
    [-0.29, -0.29, true],
    [0.29, -0.29, true],
    [-0.29, 0.29, true],
    [0.29, 0.29, true],
    [0, -0.29, false],
    [0, 0.29, false],
    [-0.29, 0, false],
    [0.29, 0, false],
  ];
  for (const [mx, mz, isCorner] of merlonCoords) {
    const merlon = new THREE.Mesh(towerMerlonGeo, stoneLight);
    merlon.position.set(mx, 1.59, mz);
    root.add(merlon);
    if (isCorner) {
      const finial = new THREE.Mesh(towerFinialGeo, royalGold);
      finial.position.set(mx, 1.74, mz);
      root.add(finial);
    }
  }

  // 7. Fluttering royal blue & gold banners on camera-facing sides (+Z and +X)
  const addBanner = (x: number, z: number, rotY: number, phase: number) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, 1.32, z);
    pivot.rotation.y = rotY;
    pivot.userData.bannerPhase = phase;
    pivot.userData.baseRotY = rotY;

    const cloth = new THREE.Mesh(towerBannerGeo, royalBlue);
    cloth.position.y = -0.24;
    pivot.add(cloth);

    const trim = new THREE.Mesh(towerBannerTrimGeo, royalGold);
    trim.position.y = -0.23;
    pivot.add(trim);

    root.add(pivot);
    banners.push(pivot);
  };
  addBanner(0, 0.30, 0, 0.4);
  addBanner(0.30, 0, Math.PI / 2, 1.7);

  // 8. Summit beacon brazier bowl + glowing golden flame
  const brazier = new THREE.Mesh(towerBrazierGeo, stoneDark);
  brazier.position.y = 1.58;
  root.add(brazier);

  const brazierRim = new THREE.Mesh(towerBrazierRimGeo, royalGold);
  brazierRim.position.y = 1.65;
  root.add(brazierRim);

  const flameMesh = new THREE.Group();
  flameMesh.position.y = 1.66;

  const outerFlame = new THREE.Mesh(towerFlameOuterGeo, flameOuterMat);
  outerFlame.position.y = 0.21;
  flameMesh.add(outerFlame);

  const innerFlame = new THREE.Mesh(towerFlameInnerGeo, flameInnerMat);
  innerFlame.position.y = 0.16;
  innerFlame.scale.set(0.85, 1.45, 0.85);
  flameMesh.add(innerFlame);

  root.add(flameMesh);

  return { root, flameMesh };
}

function getDisplayFactionPrimary(faction: FactionId): string {
  return faction === 'orcs' ? '#ef4444' : FACTION_DEFINITIONS[faction].palette.primary;
}

/**
 * Attaches an orthographic camera-ray depth bias right before draw.
 * Moving a billboard toward an OrthographicCamera along its view axis shifts its
 * projected screen position by 0 pixels while pulling its depth plane forward so
 * character sprites standing on cities, mountains, or forests never clip into
 * surrounding keeps, peaks, or trees across all 90-degree camera rotations.
 */
function attachOrthoDepthBias(obj: THREE.Object3D, biasUnits: number): void {
  obj.onBeforeRender = (_renderer, _scene, camera) => {
    if (!(camera as THREE.OrthographicCamera).isOrthographicCamera) return;
    const e = camera.matrixWorld.elements;
    const bx = e[8];
    const by = e[9];
    const bz = e[10];
    const len = Math.hypot(bx, by, bz) || 1;
    const scale = biasUnits / len;
    obj.matrixWorld.elements[12] += bx * scale;
    obj.matrixWorld.elements[13] += by * scale;
    obj.matrixWorld.elements[14] += bz * scale;
  };
}

// ============================================================================
// 2.5D Illustrated Unit Sprite Builder
// ============================================================================

export function createUnitSprite(
  type: UnitType,
  faction: FactionId,
  opts?: UnitSpriteOptions,
): BuiltUnitSprite {
  const group = new THREE.Group();
  const primaryHex = getDisplayFactionPrimary(faction);
  const dims = getUnitSpriteDimensions(type, faction);
  const bodyMaterials: UnitMaterialEntry[] = [];

  // 1. Soft dark ground contact shadow disc
  const shadowDisc = new THREE.Mesh(shadowDiscGeo, sharedShadowMat);
  shadowDisc.position.y = 0.014;
  shadowDisc.scale.setScalar(dims.shadowScale);
  shadowDisc.renderOrder = 2;
  group.add(shadowDisc);

  // 2. Thin faction color base disc
  const baseDiscMat = new THREE.MeshStandardMaterial({
    color: primaryHex,
    flatShading: true,
    roughness: 0.68,
    metalness: 0.08,
    emissive: new THREE.Color(primaryHex),
    emissiveIntensity: 0.16,
  });
  bodyMaterials.push({
    material: baseDiscMat,
    originalColor: baseDiscMat.color.clone(),
    originalEmissive: baseDiscMat.emissive.clone(),
    originalEmissiveIntensity: baseDiscMat.emissiveIntensity,
  });

  const baseDisc = new THREE.Mesh(baseDiscGeo, baseDiscMat);
  baseDisc.position.y = 0.026;
  baseDisc.scale.set(dims.shadowScale * 0.94, 1, dims.shadowScale * 0.94);
  baseDisc.receiveShadow = true;
  baseDisc.renderOrder = 3;
  group.add(baseDisc);

  // 3. Pulsing Ready Ring (pure white normally, royal gold when canCapture || canExploreRuins)
  const readyRingMat = new THREE.MeshBasicMaterial({
    color: '#ffffff',
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.94,
    depthWrite: false,
  });
  const readyRing = new THREE.Mesh(readyRingGeo, readyRingMat);
  readyRing.position.y = 0.038;
  readyRing.visible = false;
  readyRing.renderOrder = 4;
  group.add(readyRing);

  // 4. Promotion aura ring (when unit.canPromote)
  let promoteRing: THREE.Object3D | null = null;
  if (opts?.canPromote) {
    const ringMat = new THREE.MeshBasicMaterial({
      color: '#fde047',
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    promoteRing = new THREE.Mesh(promoteRingGeo, ringMat);
    promoteRing.position.y = 0.042;
    promoteRing.renderOrder = 5;
    group.add(promoteRing);
  }

  // 5. Animated character body container
  const bodyGroup = new THREE.Group();
  bodyGroup.position.y = 0.055;
  group.add(bodyGroup);

  const banners: THREE.Object3D[] = [];
  const isProcedural3D = (type as string) === 'dragon' || (type as string) === 'watchtower';

  let spriteMat: THREE.SpriteMaterial;
  let flashSpriteMat: THREE.SpriteMaterial;
  let sprite: THREE.Sprite;
  let flashSprite: THREE.Sprite;
  let proceduralRoot: THREE.Group | undefined;
  let wingLeft: THREE.Object3D | undefined;
  let wingRight: THREE.Object3D | undefined;
  let flameMesh: THREE.Object3D | undefined;

  if (isProcedural3D) {
    // Invisible placeholder sprites keep BuiltUnitSprite API 100% compatible with zero texture loads
    spriteMat = new THREE.SpriteMaterial({ transparent: true, opacity: 0, depthWrite: false });
    flashSpriteMat = new THREE.SpriteMaterial({ transparent: true, opacity: 0, depthWrite: false });
    sprite = new THREE.Sprite(spriteMat);
    sprite.visible = false;
    flashSprite = new THREE.Sprite(flashSpriteMat);
    flashSprite.visible = false;

    if ((type as string) === 'dragon') {
      const drake = buildFireDrake3D(bodyGroup, bodyMaterials);
      proceduralRoot = drake.root;
      wingLeft = drake.wingLeft;
      wingRight = drake.wingRight;
    } else {
      const tower = buildWatchtower3D(bodyGroup, bodyMaterials, banners);
      proceduralRoot = tower.root;
      flameMesh = tower.flameMesh;
    }
  } else {
    // Veterans swap to their gilded / caped / crested sprite variant (falls back to base art).
    const spriteUrl = getUnitSpriteUrl(type, faction, Boolean(opts?.isVeteran));
    const texture = getUnitSpriteTexture(spriteUrl);

    spriteMat = new THREE.SpriteMaterial({
      map: texture,
      color: '#ffffff',
      transparent: true,
      opacity: 1.0,
      alphaTest: 0.08,
      depthTest: true,
      depthWrite: false,
    });

    sprite = new THREE.Sprite(spriteMat);
    sprite.center.set(0.5, 0.04);
    sprite.scale.set(dims.width, dims.height, 1);
    sprite.renderOrder = 40;
    attachOrthoDepthBias(sprite, 0.88);
    bodyGroup.add(sprite);

    // Additive silhouette flash overlay (hidden when idle -> 0 extra draw calls)
    flashSpriteMat = new THREE.SpriteMaterial({
      map: texture,
      color: '#ffffff',
      transparent: true,
      opacity: 0.78,
      alphaTest: 0.08,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
    });
    flashSprite = new THREE.Sprite(flashSpriteMat);
    flashSprite.center.set(0.5, 0.04);
    flashSprite.scale.set(dims.width, dims.height, 1);
    flashSprite.visible = false;
    flashSprite.renderOrder = 41;
    attachOrthoDepthBias(flashSprite, 0.9);
    bodyGroup.add(flashSprite);
  }

  // 6. Veteran golden crown floating above the character's head (reduced: the veteran sprite has
  //    its own plume / skull / leaf-crown / gold helm) + gilded rim on the base disc.
  let veteranCrown: THREE.Object3D | null = null;
  if (opts?.isVeteran) {
    const rimMat = new THREE.MeshStandardMaterial({
      color: '#f5c542',
      flatShading: true,
      metalness: 0.55,
      roughness: 0.32,
      emissive: new THREE.Color('#eab308'),
      emissiveIntensity: 0.45,
    });
    bodyMaterials.push({
      material: rimMat,
      originalColor: rimMat.color.clone(),
      originalEmissive: rimMat.emissive.clone(),
      originalEmissiveIntensity: rimMat.emissiveIntensity,
    });
    const veteranRim = new THREE.Mesh(veteranRimGeo, rimMat);
    veteranRim.position.y = 0.05;
    veteranRim.scale.set(dims.shadowScale * 0.94, 1, dims.shadowScale * 0.94);
    veteranRim.renderOrder = 3;
    group.add(veteranRim);

    const crownGroup = new THREE.Group();
    const crownMat = new THREE.MeshStandardMaterial({
      color: '#facc15',
      flatShading: true,
      metalness: 0.58,
      roughness: 0.28,
      emissive: new THREE.Color('#eab308'),
      emissiveIntensity: 0.62,
    });
    bodyMaterials.push({
      material: crownMat,
      originalColor: crownMat.color.clone(),
      originalEmissive: crownMat.emissive.clone(),
      originalEmissiveIntensity: crownMat.emissiveIntensity,
    });

    const gem = new THREE.Mesh(crownGemGeo, crownMat);
    gem.renderOrder = 42;
    attachOrthoDepthBias(gem, 0.9);
    crownGroup.add(gem);

    const halo = new THREE.Mesh(crownHaloGeo, crownMat);
    halo.position.y = -0.04;
    halo.renderOrder = 42;
    attachOrthoDepthBias(halo, 0.9);
    crownGroup.add(halo);

    crownGroup.scale.setScalar(VETERAN_CROWN_SCALE);
    crownGroup.position.y = dims.height + 0.06;
    bodyGroup.add(crownGroup);
    veteranCrown = crownGroup;
  }

  const restingSpriteColor = READY_SPRITE_COLOR.clone();
  let restingSpriteOpacity = 1.0;

  const built: BuiltUnitSprite = {
    group,
    bodyGroup,
    baseDisc,
    baseDiscMat,
    readyRing,
    readyRingMat,
    veteranCrown,
    promoteRing,
    flashMaterials: [baseDiscMat],
    bodyMaterials,
    banners,
    unitHeight: dims.height,
    sprite,
    spriteMat,
    flashSprite,
    flashSpriteMat,
    shadowDisc,
    baseScaleX: dims.width,
    baseScaleY: dims.height,
    restingSpriteColor,
    restingSpriteOpacity,
    isProcedural3D,
    proceduralRoot,
    wingLeft,
    wingRight,
    flameMesh,
    setHitFlash: (active: boolean, color = '#ffffff') => {
      if (isProcedural3D) {
        if (active) {
          const isWhite = color.toLowerCase() === '#ffffff' || color.toLowerCase() === 'white';
          const flashCol = isWhite ? '#ffffff' : color;
          for (const entry of bodyMaterials) {
            entry.material.emissive.set(flashCol);
            entry.material.emissiveIntensity = isWhite ? 0.95 : 0.82;
          }
        } else if (built.lastVisualOpts) {
          setUnitVisualState(built, built.lastVisualOpts);
        }
        return;
      }

      if (active) {
        if (color.toLowerCase() === '#ffffff' || color.toLowerCase() === 'white') {
          spriteMat.color.setRGB(2.2, 2.2, 2.2);
          flashSpriteMat.color.set('#ffffff');
          flashSpriteMat.opacity = 0.82;
        } else {
          spriteMat.color.setRGB(2.4, 0.65, 0.65);
          flashSpriteMat.color.set(color);
          flashSpriteMat.opacity = 0.72;
        }
        spriteMat.opacity = 1.0;
        flashSprite.scale.copy(sprite.scale);
        flashSprite.visible = true;
      } else {
        spriteMat.color.copy(built.restingSpriteColor);
        spriteMat.opacity = built.restingSpriteOpacity;
        flashSprite.visible = false;
      }
    },
  };

  setUnitVisualState(built, {
    isHumanOwner: Boolean(opts?.isHumanOwner),
    actedThisTurn: Boolean(opts?.actedThisTurn),
    canCapture: Boolean(opts?.canCapture),
    canExploreRuins: Boolean(opts?.canExploreRuins),
  });

  return built;
}

/**
 * Applies Polytopia's unmistakable Ready vs Acted vs Enemy visual state to a 2.5D unit sprite.
 */
export function setUnitVisualState(
  built: BuiltUnitSprite,
  opts: UnitVisualStateOptions,
): void {
  built.lastVisualOpts = { ...opts };
  const baseEntry = built.bodyMaterials[0];

  if (opts.isHumanOwner && opts.actedThisTurn) {
    // Acted human figurine: unmistakable cool stone-grey dimmed look, no Ready Ring
    if (built.isProcedural3D) {
      for (const entry of built.bodyMaterials) {
        entry.material.color
          .copy(entry.originalColor)
          .lerp(EXHAUSTED_STONE_GREY, 0.62)
          .multiplyScalar(0.64);
        entry.material.emissive.copy(entry.originalEmissive);
        entry.material.emissiveIntensity = entry.originalEmissiveIntensity > 0.5 ? 0.2 : 0;
      }
    } else {
      built.restingSpriteColor.copy(ACTED_SPRITE_COLOR);
      built.restingSpriteOpacity = 0.92;
      built.spriteMat.color.copy(ACTED_SPRITE_COLOR);
      built.spriteMat.opacity = 0.92;
    }

    built.baseDiscMat.color.copy(EXHAUSTED_BASE_COLOR);
    built.baseDiscMat.emissiveIntensity = 0;
    built.baseDiscMat.opacity = 0.72;
    built.baseDiscMat.transparent = true;

    built.readyRing.visible = false;
    built.bodyGroup.scale.set(0.96, 0.95, 0.96);
    return;
  }

  // Vivid full-color unit (Ready human or Enemy)
  if (built.isProcedural3D) {
    for (const entry of built.bodyMaterials) {
      entry.material.color.copy(entry.originalColor);
      if (opts.isHumanOwner && !opts.actedThisTurn) {
        if (entry.originalEmissiveIntensity > 0) {
          entry.material.emissive.copy(entry.originalEmissive);
          entry.material.emissiveIntensity = Math.max(entry.originalEmissiveIntensity, 0.12);
        } else {
          entry.material.emissive.copy(entry.originalColor);
          entry.material.emissiveIntensity = 0.08;
        }
      } else {
        entry.material.emissive.copy(entry.originalEmissive);
        entry.material.emissiveIntensity = entry.originalEmissiveIntensity;
      }
    }
  } else {
    built.restingSpriteColor.copy(READY_SPRITE_COLOR);
    built.restingSpriteOpacity = 1.0;
    built.spriteMat.color.copy(READY_SPRITE_COLOR);
    built.spriteMat.opacity = 1.0;
  }

  if (baseEntry) {
    built.baseDiscMat.color.copy(baseEntry.originalColor);
    built.baseDiscMat.emissive.copy(baseEntry.originalEmissive);
    built.baseDiscMat.emissiveIntensity = opts.isHumanOwner ? 0.24 : 0.14;
  }
  built.baseDiscMat.opacity = 1.0;
  built.baseDiscMat.transparent = false;
  built.bodyGroup.scale.set(1, 1, 1);

  if (opts.isHumanOwner && !opts.actedThisTurn) {
    built.readyRing.visible = true;
    const isSpecialAction = Boolean(opts.canCapture || opts.canExploreRuins);
    built.readyRingMat.color.set(isSpecialAction ? '#facc15' : '#ffffff');
  } else {
    built.readyRing.visible = false;
  }
}

export function setUnitExhausted(built: BuiltUnitSprite, exhausted: boolean): void {
  setUnitVisualState(built, {
    isHumanOwner: true,
    actedThisTurn: exhausted,
    canCapture: false,
    canExploreRuins: false,
  });
}

/**
 * Disposes per-instance materials created for a unit sprite without freeing shared geometries or cached textures.
 */
export function disposeUnitSprite(built: BuiltUnitSprite): void {
  built.spriteMat.dispose();
  built.flashSpriteMat.dispose();
  built.readyRingMat.dispose();
  for (const entry of built.bodyMaterials) {
    entry.material.dispose();
  }
  if (built.promoteRing && built.promoteRing instanceof THREE.Mesh) {
    const mat = built.promoteRing.material;
    if (Array.isArray(mat)) {
      mat.forEach((m) => m.dispose());
    } else {
      mat.dispose();
    }
  }
}
