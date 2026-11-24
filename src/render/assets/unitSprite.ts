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

  switch (type) {
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

const sharedShadowMat = new THREE.MeshBasicMaterial({
  color: '#0b1220',
  transparent: true,
  opacity: 0.34,
  depthWrite: false,
});

const READY_SPRITE_COLOR = new THREE.Color('#ffffff');
const ACTED_SPRITE_COLOR = new THREE.Color('#6e788a');
const EXHAUSTED_BASE_COLOR = new THREE.Color('#5c6573');

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

  const spriteUrl = getUnitSpriteUrl(type, faction);
  const texture = getUnitSpriteTexture(spriteUrl);

  const spriteMat = new THREE.SpriteMaterial({
    map: texture,
    color: '#ffffff',
    transparent: true,
    opacity: 1.0,
    alphaTest: 0.08,
    depthTest: true,
    depthWrite: false,
  });

  const sprite = new THREE.Sprite(spriteMat);
  sprite.center.set(0.5, 0.04);
  sprite.scale.set(dims.width, dims.height, 1);
  sprite.renderOrder = 40;
  attachOrthoDepthBias(sprite, 0.88);
  bodyGroup.add(sprite);

  // Additive silhouette flash overlay (hidden when idle -> 0 extra draw calls)
  const flashSpriteMat = new THREE.SpriteMaterial({
    map: texture,
    color: '#ffffff',
    transparent: true,
    opacity: 0.78,
    alphaTest: 0.08,
    blending: THREE.AdditiveBlending,
    depthTest: true,
    depthWrite: false,
  });
  const flashSprite = new THREE.Sprite(flashSpriteMat);
  flashSprite.center.set(0.5, 0.04);
  flashSprite.scale.set(dims.width, dims.height, 1);
  flashSprite.visible = false;
  flashSprite.renderOrder = 41;
  attachOrthoDepthBias(flashSprite, 0.9);
  bodyGroup.add(flashSprite);

  // 6. Veteran golden crown floating above the character's head
  let veteranCrown: THREE.Object3D | null = null;
  if (opts?.isVeteran) {
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

    crownGroup.position.y = dims.height + 0.1;
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
    banners: [],
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
    setHitFlash: (active: boolean, color = '#ffffff') => {
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
  const baseEntry = built.bodyMaterials[0];

  if (opts.isHumanOwner && opts.actedThisTurn) {
    // Acted human figurine: unmistakable cool stone-grey dimmed sprite, no Ready Ring
    built.restingSpriteColor.copy(ACTED_SPRITE_COLOR);
    built.restingSpriteOpacity = 0.92;
    built.spriteMat.color.copy(ACTED_SPRITE_COLOR);
    built.spriteMat.opacity = 0.92;

    built.baseDiscMat.color.copy(EXHAUSTED_BASE_COLOR);
    built.baseDiscMat.emissiveIntensity = 0;
    built.baseDiscMat.opacity = 0.72;
    built.baseDiscMat.transparent = true;

    built.readyRing.visible = false;
    built.bodyGroup.scale.set(0.96, 0.95, 0.96);
    return;
  }

  // Vivid full-color sprite (Ready human or Enemy)
  built.restingSpriteColor.copy(READY_SPRITE_COLOR);
  built.restingSpriteOpacity = 1.0;
  built.spriteMat.color.copy(READY_SPRITE_COLOR);
  built.spriteMat.opacity = 1.0;

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
