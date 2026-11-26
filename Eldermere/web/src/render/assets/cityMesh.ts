import * as THREE from 'three';
import { FACTION_DEFINITIONS } from '../../game/data/factions';
import type { City, FactionId } from '../../game/types';
import {
  CITY_PLAZA_Y,
  GARRISON_OFFSET_X,
  GARRISON_OFFSET_Z,
  getFlatMaterial,
  TILE_TOP_Y,
} from './terrainMesh';

export const CITY_KEEP_OFFSET_X = -0.32;
export const CITY_KEEP_OFFSET_Z = -0.32;

export type CityArtTier = 1 | 2 | 3 | 4;

/** Board camera elevation (must match SceneManager ELEVATION_RAD). */
const CITY_CAMERA_ELEVATION = THREE.MathUtils.degToRad(38);
const SIN_EL = Math.sin(CITY_CAMERA_ELEVATION);
const COS_EL = Math.cos(CITY_CAMERA_ELEVATION);

/** Plaza half-width in world units at tier 4 (fits cleanly inside TILE_SIZE = 2.0). */
const CITY_PLAZA_HALF = 0.89;

/** Progressive plaza footprint scale per tier so towns grow visibly into grand citadels. */
const CITY_TIER_SCALE: Record<CityArtTier, number> = {
  1: 0.86,
  2: 0.92,
  3: 0.97,
  4: 1.0,
};

/**
 * Art tier for a city: Lv1 -> 1, Lv2-3 -> 2, Lv4-5 -> 3, Lv6+ -> 4.
 * Capitals are shown one tier grander (capped at 4) so starting capitals
 * immediately feel proud and faction-iconic on Turn 1.
 */
export function getCityArtTier(city: Pick<City, 'level' | 'isCapital'>): CityArtTier {
  const base = city.level >= 6 ? 4 : city.level >= 4 ? 3 : city.level >= 2 ? 2 : 1;
  return Math.min(4, base + (city.isCapital ? 1 : 0)) as CityArtTier;
}

/**
 * Exact 3D pinnacle height (above TILE_TOP_Y) and back-diagonal offset (-x = -z = peakDiag)
 * for each faction and tier, used to anchor HTML city badges cleanly above the tallest spire.
 */
interface CityPeakAnchor {
  peakY: number;
  peakDiag: number;
}

const CITY_PEAK_ANCHORS: Record<FactionId, Record<CityArtTier, CityPeakAnchor>> = {
  humans: {
    1: { peakY: 1.16, peakDiag: 0.25 },
    2: { peakY: 1.76, peakDiag: 0.27 },
    3: { peakY: 2.12, peakDiag: 0.28 },
    4: { peakY: 2.52, peakDiag: 0.28 },
  },
  orcs: {
    1: { peakY: 1.14, peakDiag: 0.25 },
    2: { peakY: 1.54, peakDiag: 0.27 },
    3: { peakY: 2.24, peakDiag: 0.29 },
    4: { peakY: 2.52, peakDiag: 0.29 },
  },
  elves: {
    1: { peakY: 1.38, peakDiag: 0.25 },
    2: { peakY: 1.78, peakDiag: 0.27 },
    3: { peakY: 2.28, peakDiag: 0.28 },
    4: { peakY: 2.68, peakDiag: 0.28 },
  },
  dwarves: {
    1: { peakY: 1.18, peakDiag: 0.28 },
    2: { peakY: 1.58, peakDiag: 0.32 },
    3: { peakY: 1.98, peakDiag: 0.34 },
    4: { peakY: 2.44, peakDiag: 0.38 },
  },
};

/**
 * World-space height above TILE_TOP_Y at which the city's HTML badge should be anchored
 * when placed at the badge's back-diagonal offset `backOffset` along (-x, -z).
 */
export function getCityBadgeAnchorY(
  city: Pick<City, 'level' | 'isCapital' | 'styleFaction'>,
  backOffset: number,
): number {
  const tier = getCityArtTier(city);
  const anchor = CITY_PEAK_ANCHORS[city.styleFaction]?.[tier] ?? { peakY: 1.6, peakDiag: 0.28 };
  const margin = 0.28;
  const shift = ((anchor.peakDiag - backOffset) * Math.SQRT2 * SIN_EL + margin) / COS_EL;
  return Math.max(CITY_PLAZA_Y + 0.84, anchor.peakY + shift);
}

// ============================================================================
// Shared Low-Poly Geometry & Citadel Material Cache
// ============================================================================

const citadelMatCache = new Map<string, THREE.MeshStandardMaterial>();

/**
 * Cached flat-shaded material for above-plaza 3D citadel meshes.
 * Uses `transparent: true, opacity: 1, depthTest: true, depthWrite: true` so Three.js
 * draws the solid 3D citadel at `renderOrder = 36` — right AFTER `depthTest: false`
 * move/attack rings (renderOrder 31–35) and BEFORE unit sprites (renderOrder 40).
 * Hardware depth-testing preserves pixel-exact 3D occlusion & shadows while preventing
 * behind-city move rings from painting over tall spires and mountain peaks.
 */
function getCitadelMat(
  color: string,
  opts?: {
    roughness?: number;
    metalness?: number;
    emissive?: string;
    emissiveIntensity?: number;
    opacity?: number;
    depthWrite?: boolean;
  },
): THREE.MeshStandardMaterial {
  const key = JSON.stringify([color, opts ?? {}]);
  let mat = citadelMatCache.get(key);
  if (!mat) {
    const opacity = opts?.opacity ?? 1;
    mat = new THREE.MeshStandardMaterial({
      color,
      flatShading: true,
      roughness: opts?.roughness ?? 0.84,
      metalness: opts?.metalness ?? 0.0,
      emissive: opts?.emissive ? new THREE.Color(opts.emissive) : new THREE.Color(0x000000),
      emissiveIntensity: opts?.emissiveIntensity ?? 0,
      transparent: true,
      opacity,
      depthTest: true,
      depthWrite: opts?.depthWrite ?? opacity >= 0.99,
    });
    citadelMatCache.set(key, mat);
  }
  return mat;
}

const geoCache = new Map<string, THREE.BufferGeometry>();

function q(n: number): string {
  return (Math.round(n * 1000) / 1000).toString();
}

function getBoxGeo(w: number, h: number, d: number): THREE.BoxGeometry {
  const key = `b:${q(w)}:${q(h)}:${q(d)}`;
  let g = geoCache.get(key) as THREE.BoxGeometry | undefined;
  if (!g) {
    g = new THREE.BoxGeometry(w, h, d);
    geoCache.set(key, g);
  }
  return g;
}

function getCylGeo(
  rt: number,
  rb: number,
  h: number,
  segs = 6,
): THREE.CylinderGeometry {
  const key = `c:${q(rt)}:${q(rb)}:${q(h)}:${segs}`;
  let g = geoCache.get(key) as THREE.CylinderGeometry | undefined;
  if (!g) {
    g = new THREE.CylinderGeometry(rt, rb, h, segs);
    geoCache.set(key, g);
  }
  return g;
}

function getConeGeo(r: number, h: number, segs = 6): THREE.ConeGeometry {
  const key = `k:${q(r)}:${q(h)}:${segs}`;
  let g = geoCache.get(key) as THREE.ConeGeometry | undefined;
  if (!g) {
    g = new THREE.ConeGeometry(r, h, segs);
    geoCache.set(key, g);
  }
  return g;
}

function getOctGeo(r: number): THREE.OctahedronGeometry {
  const key = `o:${q(r)}`;
  let g = geoCache.get(key) as THREE.OctahedronGeometry | undefined;
  if (!g) {
    g = new THREE.OctahedronGeometry(r, 0);
    geoCache.set(key, g);
  }
  return g;
}

function getIcoGeo(r: number): THREE.IcosahedronGeometry {
  const key = `i:${q(r)}`;
  let g = geoCache.get(key) as THREE.IcosahedronGeometry | undefined;
  if (!g) {
    g = new THREE.IcosahedronGeometry(r, 0);
    geoCache.set(key, g);
  }
  return g;
}

function getTorusGeo(r: number, tube: number, rSeg = 5, tSeg = 14): THREE.TorusGeometry {
  const key = `t:${q(r)}:${q(tube)}:${rSeg}:${tSeg}`;
  let g = geoCache.get(key) as THREE.TorusGeometry | undefined;
  if (!g) {
    g = new THREE.TorusGeometry(r, tube, rSeg, tSeg);
    geoCache.set(key, g);
  }
  return g;
}

function getDomeGeo(r: number, segs = 8): THREE.SphereGeometry {
  const key = `d:${q(r)}:${segs}`;
  let g = geoCache.get(key) as THREE.SphereGeometry | undefined;
  if (!g) {
    g = new THREE.SphereGeometry(r, segs, 4, 0, Math.PI * 2, 0, Math.PI * 0.56);
    geoCache.set(key, g);
  }
  return g;
}

// ============================================================================
// Architectural Primitives & Reusable Helpers
// ============================================================================

interface CityBuildCtx {
  banners: THREE.Object3D[];
  smokePuffs: THREE.Object3D[];
  crystals: THREE.Object3D[];
  flames: THREE.Object3D[];
  seed: number;
}

function addMesh(
  parent: THREE.Object3D,
  geo: THREE.BufferGeometry,
  mat: THREE.Material,
  x: number,
  y: number,
  z: number,
  opts?: {
    rotX?: number;
    rotY?: number;
    rotZ?: number;
    scaleX?: number;
    scaleY?: number;
    scaleZ?: number;
    cast?: boolean;
    receive?: boolean;
  },
): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  if (opts?.rotX) m.rotation.x = opts.rotX;
  if (opts?.rotY) m.rotation.y = opts.rotY;
  if (opts?.rotZ) m.rotation.z = opts.rotZ;
  if (opts?.scaleX !== undefined || opts?.scaleY !== undefined || opts?.scaleZ !== undefined) {
    m.scale.set(opts.scaleX ?? 1, opts.scaleY ?? 1, opts.scaleZ ?? 1);
  }
  m.castShadow = opts?.cast ?? true;
  m.receiveShadow = opts?.receive ?? true;
  parent.add(m);
  return m;
}

/** Crisp vertical hanging facade banner (inspired by splash_loading_raw.jpg). */
function addHangingBanner(
  parent: THREE.Object3D,
  x: number,
  yTop: number,
  z: number,
  w: number,
  h: number,
  clothMat: THREE.Material,
  trimMat: THREE.Material,
  rotY = 0,
): void {
  const g = new THREE.Group();
  g.position.set(x, yTop, z);
  g.rotation.y = rotY;
  // Top rod
  addMesh(g, getBoxGeo(w + 0.03, 0.022, 0.024), trimMat, 0, 0, 0, { cast: false, receive: false });
  // Main cloth
  addMesh(g, getBoxGeo(w, h, 0.016), clothMat, 0, -h * 0.5 - 0.01, 0, { cast: false, receive: false });
  // Side / bottom gold edge trim
  addMesh(g, getBoxGeo(w + 0.012, 0.022, 0.02), trimMat, 0, -h - 0.008, 0, { cast: false, receive: false });
  parent.add(g);
}

/** Fluttering horizontal flagpole pennant animated by BoardRenderer. */
function addFlutterPennant(
  parent: THREE.Object3D,
  ctx: CityBuildCtx,
  x: number,
  y: number,
  z: number,
  poleH: number,
  clothMat: THREE.Material,
  trimMat: THREE.Material,
  phase: number,
  rotY = 0.25,
  scale = 1,
): void {
  const poleMat = getCitadelMat('#e2e8f0', { metalness: 0.5, roughness: 0.34 });
  addMesh(parent, getCylGeo(0.012 * scale, 0.016 * scale, poleH, 5), poleMat, x, y + poleH * 0.5, z, {
    cast: false,
    receive: false,
  });
  addMesh(parent, getOctGeo(0.028 * scale), trimMat, x, y + poleH + 0.02 * scale, z, {
    cast: false,
    receive: false,
  });

  const pivot = new THREE.Group();
  pivot.position.set(x, y + poleH - 0.06 * scale, z);
  pivot.rotation.y = rotY;
  pivot.userData.bannerPhase = phase;
  pivot.userData.baseRotY = rotY;

  addMesh(pivot, getBoxGeo(0.18 * scale, 0.095 * scale, 0.018), clothMat, 0.09 * scale, 0, 0, {
    cast: false,
    receive: false,
  });
  addMesh(pivot, getBoxGeo(0.16 * scale, 0.022 * scale, 0.022), trimMat, 0.08 * scale, -0.03 * scale, 0, {
    cast: false,
    receive: false,
  });

  parent.add(pivot);
  ctx.banners.push(pivot);
}

/** Glowing arched doorway with framed pilasters and pointed or stepped lintel. */
function addArchedPortal(
  parent: THREE.Object3D,
  x: number,
  yBottom: number,
  z: number,
  w: number,
  h: number,
  frameMat: THREE.Material,
  glowMat: THREE.Material,
  trimMat?: THREE.Material,
  rotY = 0,
  steppedLintel = false,
): void {
  const g = new THREE.Group();
  g.position.set(x, yBottom, z);
  g.rotation.y = rotY;

  const pillarW = w * 0.24;
  const innerW = w * 0.62;
  const innerH = h * 0.78;
  // Flanking pilasters
  addMesh(g, getBoxGeo(pillarW, h, 0.075), frameMat, -(innerW + pillarW) * 0.5, h * 0.5, 0, {
    cast: false,
  });
  addMesh(g, getBoxGeo(pillarW, h, 0.075), frameMat, (innerW + pillarW) * 0.5, h * 0.5, 0, {
    cast: false,
  });
  // Arch lintel (stepped monolithic keystone for Dwarves; pointed Gothic crown for others)
  addMesh(g, getBoxGeo(w + 0.04, h * 0.16, 0.088), trimMat ?? frameMat, 0, h + h * 0.04, 0, {
    cast: false,
  });
  if (steppedLintel) {
    addMesh(g, getBoxGeo(w * 0.62, h * 0.14, 0.095), trimMat ?? frameMat, 0, h + h * 0.17, 0, {
      cast: false,
    });
  } else {
    addMesh(g, getConeGeo(w * 0.42, h * 0.22, 4), trimMat ?? frameMat, 0, h + h * 0.19, 0, {
      rotY: Math.PI / 4,
      scaleZ: 0.34,
      cast: false,
    });
  }
  // Glowing recessed inner portal
  addMesh(g, getBoxGeo(innerW, innerH, 0.045), glowMat, 0, innerH * 0.5, 0.008, {
    cast: false,
    receive: false,
  });
  // Arched glow crown
  addMesh(g, getCylGeo(innerW * 0.5, innerW * 0.5, 0.045, 6), glowMat, 0, innerH, 0.008, {
    rotX: Math.PI / 2,
    scaleY: 0.75,
    cast: false,
    receive: false,
  });

  parent.add(g);
}

/** Crisp stepped staircase descending toward local +Z. */
function addStaircase(
  parent: THREE.Object3D,
  x: number,
  yBottom: number,
  zTop: number,
  width: number,
  totalHeight: number,
  totalDepth: number,
  steps: number,
  mat: THREE.Material,
  railMat?: THREE.Material,
): void {
  const stepH = totalHeight / steps;
  const stepD = totalDepth / steps;
  for (let i = 0; i < steps; i++) {
    const h = totalHeight - i * stepH;
    const z = zTop + (i + 0.5) * stepD;
    addMesh(parent, getBoxGeo(width, h, stepD + 0.01), mat, x, yBottom + h * 0.5, z);
  }
  if (railMat) {
    const railH = totalHeight * 0.46;
    const slope = Math.atan2(totalHeight, totalDepth);
    const railLen = Math.hypot(totalHeight, totalDepth);
    for (const side of [-1, 1] as const) {
      addMesh(
        parent,
        getBoxGeo(0.036, 0.055, railLen),
        railMat,
        x + side * (width * 0.5 + 0.018),
        yBottom + railH + 0.04,
        zTop + totalDepth * 0.5,
        { rotX: slope, cast: false },
      );
    }
  }
}

/** Ring of crenellation merlons around a rectangular turret or wall top. */
function addBoxCrenellations(
  parent: THREE.Object3D,
  cx: number,
  yBottom: number,
  cz: number,
  w: number,
  d: number,
  mat: THREE.Material,
  merlonSize = 0.068,
  merlonH = 0.056,
): void {
  const geo = getBoxGeo(merlonSize, merlonH, merlonSize);
  const hw = w * 0.5 - merlonSize * 0.48;
  const hd = d * 0.5 - merlonSize * 0.48;
  const y = yBottom + merlonH * 0.5;
  const pts: [number, number][] = [
    [-hw, -hd],
    [0, -hd],
    [hw, -hd],
    [-hw, hd],
    [0, hd],
    [hw, hd],
    [-hw, 0],
    [hw, 0],
  ];
  for (const [ox, oz] of pts) {
    addMesh(parent, geo, mat, cx + ox, y, cz + oz, { cast: false });
  }
}

/** Ring of crenellations around a hexagonal/octagonal tower parapet. */
function addRadialCrenellations(
  parent: THREE.Object3D,
  cx: number,
  yBottom: number,
  cz: number,
  radius: number,
  count: number,
  mat: THREE.Material,
  size = 0.058,
  h = 0.054,
): void {
  const geo = getBoxGeo(size, h, size);
  const y = yBottom + h * 0.5;
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    addMesh(parent, geo, mat, cx + Math.cos(a) * radius, y, cz + Math.sin(a) * radius, {
      rotY: -a,
      cast: false,
    });
  }
}

/** Warm lit window slit. */
function addWindow(
  parent: THREE.Object3D,
  x: number,
  y: number,
  z: number,
  w: number,
  h: number,
  d: number,
  mat: THREE.Material,
  rotY = 0,
): void {
  addMesh(parent, getBoxGeo(w, h, d), mat, x, y, z, {
    rotY,
    cast: false,
    receive: false,
  });
}

/** Animated glowing flame / beacon cluster. */
function addAnimatedFlame(
  parent: THREE.Object3D,
  ctx: CityBuildCtx,
  x: number,
  y: number,
  z: number,
  scale: number,
  outerMat: THREE.Material,
  innerMat: THREE.Material,
  phase: number,
): THREE.Group {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.userData.baseScaleY = scale;
  g.userData.phase = phase;
  g.userData.spinSpeed = 1.4;
  addMesh(g, getConeGeo(0.08 * scale, 0.22 * scale, 5), outerMat, 0, 0.11 * scale, 0, {
    cast: false,
    receive: false,
  });
  addMesh(g, getOctGeo(0.058 * scale), innerMat, 0, 0.09 * scale, 0, {
    scaleY: 1.35,
    cast: false,
    receive: false,
  });
  parent.add(g);
  ctx.flames.push(g);
  return g;
}

/** Low courtyard torch brazier framing the garrison forecourt cleanly. */
function addCourtyardBrazier(
  parent: THREE.Object3D,
  x: number,
  y: number,
  z: number,
  standMat: THREE.Material,
  fireMat: THREE.Material,
  trimMat?: THREE.Material,
): void {
  addMesh(parent, getCylGeo(0.036, 0.048, 0.11, 6), standMat, x, y + 0.055, z, { cast: false });
  if (trimMat) {
    addMesh(parent, getCylGeo(0.052, 0.04, 0.03, 6), trimMat, x, y + 0.115, z, { cast: false });
  }
  addMesh(parent, getOctGeo(0.044), fireMat, x, y + 0.155, z, {
    scaleY: 1.35,
    cast: false,
    receive: false,
  });
}

/** Rising low-poly smoke puffs (animated by BoardRenderer). */
function addChimneySmoke(
  parent: THREE.Object3D,
  ctx: CityBuildCtx,
  x: number,
  baseY: number,
  z: number,
  count: number,
  color = '#e2e8f0',
  radius = 0.065,
): void {
  const smokeMat = getCitadelMat(color, {
    roughness: 0.95,
    opacity: 0.72,
    depthWrite: false,
  });
  for (let i = 0; i < count; i++) {
    const puff = new THREE.Mesh(getIcoGeo(radius), smokeMat);
    puff.position.set(x, baseY + i * 0.14, z);
    puff.renderOrder = 37;
    puff.userData.smokeBaseX = x;
    puff.userData.smokeBaseY = baseY;
    puff.userData.smokeBaseZ = z;
    puff.userData.smokePhase = (i / count + ctx.seed * 0.17) % 1;
    parent.add(puff);
    ctx.smokePuffs.push(puff);
  }
}

/** Crisp miniature low-poly tree (cypress, pine, snow-pine, or Mallorn). */
function addMiniTree(
  parent: THREE.Object3D,
  x: number,
  y: number,
  z: number,
  kind: 'cypress' | 'white_tree' | 'mallorn' | 'snow_pine',
  scale = 1,
): void {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.scale.setScalar(scale);

  if (kind === 'mallorn') {
    const bark = getCitadelMat('#efe9db', { roughness: 0.86 });
    const emerald = getCitadelMat('#1ea86e', { roughness: 0.80 });
    const gold = getCitadelMat('#f2c94c', { roughness: 0.76 });
    addMesh(g, getCylGeo(0.026, 0.044, 0.18, 5), bark, 0, 0.09, 0);
    addMesh(g, getIcoGeo(0.135), emerald, 0, 0.23, 0, { scaleX: 1.12, scaleY: 0.76, scaleZ: 1.12 });
    addMesh(g, getIcoGeo(0.105), gold, 0.015, 0.33, -0.01, { scaleX: 1.0, scaleY: 0.74, scaleZ: 1.0 });
  } else if (kind === 'snow_pine') {
    const bark = getCitadelMat('#6b4c35', { roughness: 0.90 });
    const pine = getCitadelMat('#2f6f58', { roughness: 0.84 });
    const snow = getCitadelMat('#f1f5f9', { roughness: 0.76 });
    addMesh(g, getCylGeo(0.024, 0.036, 0.11, 5), bark, 0, 0.055, 0);
    addMesh(g, getConeGeo(0.125, 0.20, 6), pine, 0, 0.18, 0);
    addMesh(g, getConeGeo(0.088, 0.16, 6), snow, 0, 0.30, 0);
  } else if (kind === 'white_tree') {
    const bark = getCitadelMat('#e2e8f0', { roughness: 0.84 });
    const white = getCitadelMat('#ffffff', {
      emissive: '#e2e8f0',
      emissiveIntensity: 0.24,
      roughness: 0.76,
    });
    addMesh(g, getCylGeo(0.024, 0.038, 0.16, 5), bark, 0, 0.08, 0);
    addMesh(g, getIcoGeo(0.12), white, 0, 0.22, 0, { scaleX: 1.15, scaleY: 0.82, scaleZ: 1.15 });
  } else {
    // Sunlit Valoria cypress/pine
    const bark = getCitadelMat('#785233', { roughness: 0.90 });
    const leaf1 = getCitadelMat('#359b43', { roughness: 0.84 });
    const leaf2 = getCitadelMat('#52b84e', { roughness: 0.82 });
    addMesh(g, getCylGeo(0.022, 0.034, 0.10, 5), bark, 0, 0.05, 0);
    addMesh(g, getConeGeo(0.11, 0.19, 6), leaf1, 0, 0.17, 0);
    addMesh(g, getConeGeo(0.075, 0.16, 6), leaf2, 0, 0.29, 0);
  }

  parent.add(g);
}

// ============================================================================
// Stepped Themed Plaza Dais & Garrison Forecourt
// ============================================================================

interface PlazaStyle {
  side: string;
  top: string;
  apron: string;
  band: string;
  bandEmissive?: string;
  brazierStand: string;
  brazierFire: string;
  brazierFireEmissive: string;
  brazierTrim: string;
}

const PLAZA_STYLES: Record<FactionId, PlazaStyle> = {
  humans: {
    side: '#dcd5c5',
    top: '#f2ece0',
    apron: '#faf6ee',
    band: '#2563eb',
    brazierStand: '#d6cfc0',
    brazierFire: '#fde047',
    brazierFireEmissive: '#f59e0b',
    brazierTrim: '#f5c542',
  },
  orcs: {
    side: '#463e52',
    top: '#5b5169',
    apron: '#6c617d',
    band: '#ff6b2b',
    bandEmissive: '#ea580c',
    brazierStand: '#3c3547',
    brazierFire: '#ff8a3d',
    brazierFireEmissive: '#ea580c',
    brazierTrim: '#786d87',
  },
  elves: {
    side: '#e4decb',
    top: '#f6f2e6',
    apron: '#fcf9f0',
    band: '#10b981',
    brazierStand: '#e8e1ce',
    brazierFire: '#fef08a',
    brazierFireEmissive: '#facc15',
    brazierTrim: '#f5c542',
  },
  dwarves: {
    side: '#636f80',
    top: '#828fa1',
    apron: '#96a2b3',
    band: '#d97706',
    brazierStand: '#4a5568',
    brazierFire: '#fb923c',
    brazierFireEmissive: '#f97316',
    brazierTrim: '#d97706',
  },
};

function buildPlazaBase(
  root: THREE.Group,
  faction: FactionId,
  tier: CityArtTier,
  scale: number,
): void {
  const st = PLAZA_STYLES[faction];
  const size = CITY_PLAZA_HALF * 2 * scale;

  // Main stepped stone plinth
  const baseMat = getFlatMaterial(st.side, { roughness: 0.86 });
  addMesh(root, getBoxGeo(size, CITY_PLAZA_Y, size), baseMat, 0, CITY_PLAZA_Y * 0.5, 0, {
    cast: false,
    receive: true,
  });

  // Faction metallic/emissive architectural trim belt around the plinth
  const bandMat = getFlatMaterial(st.band, {
    roughness: st.bandEmissive ? 0.35 : 0.42,
    metalness: st.bandEmissive ? 0.0 : 0.38,
    emissive: st.bandEmissive,
    emissiveIntensity: st.bandEmissive ? 1.05 : 0,
  });
  addMesh(root, getBoxGeo(size + 0.022, 0.036, size + 0.022), bandMat, 0, CITY_PLAZA_Y * 0.44, 0, {
    cast: false,
    receive: true,
  });

  // Crisp top terrace slab lip
  const topMat = getFlatMaterial(st.top, { roughness: 0.82 });
  addMesh(root, getBoxGeo(size + 0.016, 0.044, size + 0.016), topMat, 0, CITY_PLAZA_Y - 0.022, 0, {
    cast: false,
    receive: true,
  });

  // Clean inlaid front-right Garrison Forecourt at (+0.28, +0.28) — 100% open & flat!
  const apronMat = getFlatMaterial(st.apron, { roughness: 0.78 });
  addMesh(
    root,
    getCylGeo(0.42, 0.45, 0.016, 8),
    apronMat,
    GARRISON_OFFSET_X,
    CITY_PLAZA_Y + 0.008,
    GARRISON_OFFSET_Z,
    { rotY: Math.PI / 8, cast: false, receive: true },
  );

  // Subtle inlaid rim around the garrison forecourt on Tier 2+ cities
  if (tier >= 2) {
    const ringMat = getFlatMaterial(st.brazierTrim, {
      metalness: 0.42,
      roughness: 0.44,
    });
    const ring = new THREE.Mesh(getTorusGeo(0.435, 0.014, 4, 8), ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.rotation.z = Math.PI / 8;
    ring.position.set(GARRISON_OFFSET_X, CITY_PLAZA_Y + 0.014, GARRISON_OFFSET_Z);
    root.add(ring);
  }

  // Twin low courtyard lanterns/braziers framing the garrison dais (well clear of unit disc)
  const standMat = getFlatMaterial(st.brazierStand, { roughness: 0.75 });
  const trimMat = getFlatMaterial(st.brazierTrim, { metalness: 0.48, roughness: 0.36 });
  const fireMat = getFlatMaterial(st.brazierFire, {
    emissive: st.brazierFireEmissive,
    emissiveIntensity: 1.15,
    roughness: 0.3,
  });
  const bOff = 0.60 * scale;
  addCourtyardBrazier(root, -0.10, CITY_PLAZA_Y, bOff, standMat, fireMat, trimMat);
  addCourtyardBrazier(root, bOff, CITY_PLAZA_Y, -0.10, standMat, fireMat, trimMat);
}

// ============================================================================
// 1. HUMANS — Valoria & Sunmark (Tiered Alabaster Citadels, Royal Blue & Gold)
// ============================================================================

function buildHumanCitadel(g: THREE.Group, tier: CityArtTier, ctx: CityBuildCtx): void {
  const stone = getCitadelMat('#f4efe4', { roughness: 0.80 });
  const stoneMid = getCitadelMat('#e3dccb', { roughness: 0.84 });
  const stoneTrim = getCitadelMat('#cbc3b1', { roughness: 0.84 });
  const royalBlue = getCitadelMat('#2563eb', { roughness: 0.62, metalness: 0.08 });
  const deepBlue = getCitadelMat('#1d4ed8', {
    roughness: 0.60,
    emissive: '#1e40af',
    emissiveIntensity: 0.14,
  });
  const gold = getCitadelMat('#f5c542', {
    metalness: 0.56,
    roughness: 0.32,
    emissive: '#b45309',
    emissiveIntensity: 0.12,
  });
  const warmGlow = getCitadelMat('#fef08a', {
    emissive: '#f59e0b',
    emissiveIntensity: 1.15,
    roughness: 0.28,
  });
  const flameOuter = getCitadelMat('#f97316', {
    emissive: '#ea580c',
    emissiveIntensity: 1.2,
    roughness: 0.25,
  });

  // Main keep center in rotated local diorama frame (+Z faces garrison forecourt & camera)
  const kz = -0.38;

  if (tier === 1) {
    // Tier 1: Sunlit Watch-Hamlet (peakY ~1.18)
    // Stepped stone foundation
    addMesh(g, getBoxGeo(0.70, 0.10, 0.56), stoneMid, 0, 0.05, kz);
    // Main white hall
    addMesh(g, getBoxGeo(0.58, 0.34, 0.46), stone, 0, 0.27, kz);
    addBoxCrenellations(g, 0, 0.44, kz, 0.58, 0.46, stone, 0.068, 0.054);
    // Royal-blue pitched hipped roof + golden finial
    addMesh(g, getConeGeo(0.42, 0.34, 4), royalBlue, 0, 0.64, kz, { rotY: Math.PI / 4 });
    addMesh(g, getOctGeo(0.05), gold, 0, 0.83, kz);
    // Arched glowing main gate facing the garrison forecourt
    addArchedPortal(g, 0, 0.10, kz + 0.23, 0.20, 0.22, stoneMid, warmGlow, gold);
    addWindow(g, -0.18, 0.30, kz + 0.235, 0.065, 0.09, 0.025, warmGlow);
    addWindow(g, 0.18, 0.30, kz + 0.235, 0.065, 0.09, 0.025, warmGlow);
    // Small front steps
    addStaircase(g, 0, 0, kz + 0.28, 0.22, 0.10, 0.12, 3, stoneMid);
    // Charming side townhouse on right wing + White Tree of Valoria on left wing
    addMesh(g, getBoxGeo(0.28, 0.22, 0.26), stone, 0.48, 0.11, -0.22);
    addMesh(g, getConeGeo(0.22, 0.20, 4), royalBlue, 0.48, 0.32, -0.22, { rotY: Math.PI / 4 });
    addWindow(g, 0.48, 0.13, -0.085, 0.055, 0.07, 0.025, warmGlow);
    addMiniTree(g, -0.48, 0, -0.12, 'white_tree', 1.05);
    addFlutterPennant(g, ctx, 0.24, 0.44, kz + 0.18, 0.26, deepBlue, gold, ctx.seed + 0.5, 0.3, 0.9);
    return;
  }

  // Tier 2+: Raised octagonal Valoria Terrace + Grand White Staircase (splash_loading_raw.jpg vibe!)
  const terraceR = tier >= 4 ? 0.64 : tier === 3 ? 0.60 : 0.54;
  const terraceH = tier >= 3 ? 0.30 : 0.22;
  addMesh(g, getCylGeo(terraceR, terraceR + 0.05, terraceH, 8), stoneMid, 0, terraceH * 0.5, kz, {
    rotY: Math.PI / 8,
  });
  addMesh(g, getCylGeo(terraceR + 0.02, terraceR + 0.02, 0.04, 8), stone, 0, terraceH, kz, {
    rotY: Math.PI / 8,
  });
  addRadialCrenellations(g, 0, terraceH + 0.02, kz, terraceR - 0.04, 8, stone, 0.068, 0.055);

  // Grand stepped alabaster staircase descending to the garrison forecourt!
  const stairTopZ = kz + terraceR * 0.82;
  addStaircase(g, 0, 0, stairTopZ, 0.24, terraceH, 0.22, 4, stone, stoneTrim);

  // Flanking royal-blue vertical hanging banners on the terrace facade
  addHangingBanner(g, -0.26, terraceH - 0.01, kz + terraceR * 0.92, 0.09, 0.18, deepBlue, gold, -0.35);
  addHangingBanner(g, 0.26, terraceH - 0.01, kz + terraceR * 0.92, 0.09, 0.18, deepBlue, gold, 0.35);

  if (tier === 2) {
    // Tier 2: Walled Courtyard Keep (Turn 1 Capital! peakY ~1.56)
    const y1 = terraceH + 0.02;
    // Lower keep hall on terrace
    addMesh(g, getBoxGeo(0.54, 0.30, 0.42), stone, 0, y1 + 0.15, kz);
    addArchedPortal(g, 0, y1, kz + 0.215, 0.20, 0.22, stoneMid, warmGlow, gold);
    addWindow(g, -0.17, y1 + 0.18, kz + 0.215, 0.06, 0.085, 0.024, warmGlow);
    addWindow(g, 0.17, y1 + 0.18, kz + 0.215, 0.06, 0.085, 0.024, warmGlow);

    // Tall central hexagonal Royal Watchtower
    addMesh(g, getCylGeo(0.18, 0.22, 0.50, 6), stone, 0, y1 + 0.44, kz - 0.04);
    addMesh(g, getCylGeo(0.215, 0.20, 0.06, 6), gold, 0, y1 + 0.67, kz - 0.04);
    addRadialCrenellations(g, 0, y1 + 0.70, kz - 0.04, 0.18, 6, stone, 0.052, 0.048);
    // Faceted Royal Blue dome-cone crown roof + finial + fluttering pennant
    addMesh(g, getConeGeo(0.24, 0.34, 6), royalBlue, 0, y1 + 0.87, kz - 0.04);
    addMesh(g, getOctGeo(0.055), gold, 0, y1 + 1.06, kz - 0.04);
    addFlutterPennant(g, ctx, 0, y1 + 1.02, kz - 0.04, 0.24, deepBlue, gold, ctx.seed + 0.9, 0.2, 0.88);

    // Flanking bastion turret (left) + gabled townhouse (right)
    addMesh(g, getCylGeo(0.13, 0.15, 0.44, 6), stone, -0.54, 0.22, -0.18);
    addMesh(g, getConeGeo(0.17, 0.24, 6), royalBlue, -0.54, 0.56, -0.18);
    addHangingBanner(g, -0.54, 0.36, -0.03, 0.075, 0.16, deepBlue, gold, 0);

    addMesh(g, getBoxGeo(0.28, 0.26, 0.26), stone, 0.54, 0.13, -0.18);
    addMesh(g, getConeGeo(0.22, 0.22, 4), royalBlue, 0.54, 0.37, -0.18, { rotY: Math.PI / 4 });
    addWindow(g, 0.54, 0.15, -0.045, 0.055, 0.08, 0.024, warmGlow);

    addMiniTree(g, -0.56, 0, 0.14, 'white_tree', 0.95);
    addMiniTree(g, 0.56, 0, 0.12, 'cypress', 0.9);
    return;
  }

  // Tier 3 & Tier 4: Multi-tiered Grand Valoria Citadel!
  const y1 = terraceH + 0.02;
  const midR = tier === 4 ? 0.44 : 0.40;
  const midH = tier === 4 ? 0.36 : 0.30;

  // Second stepped octagonal citadel tier (crisp white stone deck + subtle gold belt trim!)
  addMesh(g, getCylGeo(midR, midR + 0.04, midH, 8), stoneMid, 0, y1 + midH * 0.5, kz - 0.02, {
    rotY: Math.PI / 8,
  });
  addMesh(g, getCylGeo(midR + 0.026, midR + 0.026, 0.032, 8), gold, 0, y1 + midH - 0.032, kz - 0.02, {
    rotY: Math.PI / 8,
    cast: false,
  });
  addMesh(g, getCylGeo(midR + 0.018, midR + 0.018, 0.036, 8), stone, 0, y1 + midH, kz - 0.02, {
    rotY: Math.PI / 8,
    cast: false,
  });
  addRadialCrenellations(g, 0, y1 + midH + 0.018, kz - 0.02, midR - 0.035, 8, stone, 0.058, 0.05);

  // Glowing ceremonial portal on the second tier + hanging royal banners
  addArchedPortal(g, 0, y1, kz + midR - 0.02, 0.22, 0.24, stoneMid, warmGlow, gold);
  addHangingBanner(g, -0.22, y1 + midH - 0.02, kz + midR * 0.85, 0.085, 0.22, deepBlue, gold, -0.45);
  addHangingBanner(g, 0.22, y1 + midH - 0.02, kz + midR * 0.85, 0.085, 0.22, deepBlue, gold, 0.45);

  // Flanking twin bastion towers (Left & Right wings)
  const wingX = tier === 4 ? 0.62 : 0.58;
  const wingH = tier === 4 ? 0.58 : 0.48;
  for (const side of [-1, 1] as const) {
    addMesh(g, getCylGeo(0.145, 0.175, wingH, 6), stone, side * wingX, wingH * 0.5, -0.18);
    addMesh(g, getCylGeo(0.165, 0.165, 0.04, 6), gold, side * wingX, wingH - 0.02, -0.18);
    addRadialCrenellations(g, side * wingX, wingH + 0.01, -0.18, 0.135, 6, stone, 0.046, 0.044);
    addMesh(g, getConeGeo(0.185, 0.28, 6), royalBlue, side * wingX, wingH + 0.17, -0.18);
    addMesh(g, getOctGeo(0.042), gold, side * wingX, wingH + 0.33, -0.18);
    addHangingBanner(g, side * wingX, wingH - 0.08, -0.02, 0.075, 0.22, deepBlue, gold, 0);
    addWindow(g, side * wingX, wingH * 0.66, -0.025, 0.05, 0.09, 0.024, warmGlow);
  }

  // Burnished Golden Domed Rotunda on the right terrace shoulder (nod to classic Valoria domes!)
  addMesh(g, getCylGeo(0.15, 0.17, 0.24, 8), stone, 0.44, y1 + 0.12, kz - 0.24);
  addMesh(g, getDomeGeo(0.155, 8), gold, 0.44, y1 + 0.23, kz - 0.24);
  addMesh(g, getConeGeo(0.03, 0.11, 4), gold, 0.44, y1 + 0.41, kz - 0.24);

  // Back-left White Tree & cypress courtyard greenery
  addMiniTree(g, -0.60, 0, 0.16, 'white_tree', 1.0);
  addMiniTree(g, 0.60, 0, 0.15, 'cypress', 0.95);

  const y2 = y1 + midH + 0.02;

  if (tier === 3) {
    // Tier 3: Twin-Towered Royal Bastion (peakY ~1.94)
    addMesh(g, getCylGeo(0.19, 0.24, 0.52, 8), stone, 0, y2 + 0.26, kz - 0.04);
    addMesh(g, getCylGeo(0.22, 0.20, 0.055, 8), gold, 0, y2 + 0.50, kz - 0.04);
    addWindow(g, 0, y2 + 0.28, kz + 0.17, 0.068, 0.13, 0.026, warmGlow);
    addWindow(g, -0.14, y2 + 0.28, kz + 0.11, 0.055, 0.11, 0.026, warmGlow, -0.7);
    addWindow(g, 0.14, y2 + 0.28, kz + 0.11, 0.055, 0.11, 0.026, warmGlow, 0.7);
    addRadialCrenellations(g, 0, y2 + 0.52, kz - 0.04, 0.195, 8, stone, 0.048, 0.045);
    addMesh(g, getConeGeo(0.25, 0.42, 8), royalBlue, 0, y2 + 0.74, kz - 0.04);
    addMesh(g, getOctGeo(0.062), gold, 0, y2 + 0.98, kz - 0.04);
    addFlutterPennant(g, ctx, 0, y2 + 0.92, kz - 0.04, 0.26, deepBlue, gold, ctx.seed + 1.3, 0.25, 0.95);
    return;
  }

  // Tier 4: GRAND WHITE CITADEL OF VALORIA (peakY ~2.38!)
  // Second golden dome balancing left shoulder
  addMesh(g, getCylGeo(0.14, 0.16, 0.24, 8), stone, -0.44, y1 + 0.12, kz - 0.24);
  addMesh(g, getDomeGeo(0.145, 8), gold, -0.44, y1 + 0.23, kz - 0.24);
  addMesh(g, getConeGeo(0.028, 0.10, 4), gold, -0.44, y1 + 0.40, kz - 0.24);

  // Upper 3rd acropolis drum (white stone top deck + gold perimeter fillet)
  addMesh(g, getCylGeo(0.25, 0.30, 0.26, 8), stoneMid, 0, y2 + 0.13, kz - 0.04);
  addMesh(g, getCylGeo(0.28, 0.27, 0.034, 8), gold, 0, y2 + 0.225, kz - 0.04, { cast: false });
  addMesh(g, getCylGeo(0.265, 0.265, 0.032, 8), stone, 0, y2 + 0.25, kz - 0.04, { cast: false });
  // Four corner buttress ribs around the soaring central White Tower
  const towerBaseY = y2 + 0.26;
  addMesh(g, getCylGeo(0.16, 0.21, 0.60, 8), stone, 0, towerBaseY + 0.30, kz - 0.04);
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 2 + Math.PI / 4;
    addMesh(
      g,
      getBoxGeo(0.065, 0.48, 0.065),
      stoneMid,
      Math.cos(a) * 0.19,
      towerBaseY + 0.22,
      kz - 0.04 + Math.sin(a) * 0.19,
      { rotY: -a },
    );
  }
  // Glowing lantern gallery windows on the White Tower
  for (const ang of [-0.65, 0, 0.65]) {
    addWindow(
      g,
      Math.sin(ang) * 0.18,
      towerBaseY + 0.36,
      kz - 0.04 + Math.cos(ang) * 0.18,
      0.052,
      0.14,
      0.028,
      warmGlow,
      ang,
    );
  }
  // Gilded crown collar + tall faceted royal-blue spire roof
  addMesh(g, getCylGeo(0.21, 0.18, 0.06, 8), gold, 0, towerBaseY + 0.60, kz - 0.04);
  addRadialCrenellations(g, 0, towerBaseY + 0.63, kz - 0.04, 0.185, 8, stone, 0.046, 0.044);
  addMesh(g, getConeGeo(0.23, 0.46, 8), royalBlue, 0, towerBaseY + 0.86, kz - 0.04);

  // Blazing Golden Beacon Crown at the pinnacle!
  addMesh(g, getTorusGeo(0.085, 0.018, 5, 10), gold, 0, towerBaseY + 1.09, kz - 0.04, {
    rotX: Math.PI / 2,
    cast: false,
  });
  addAnimatedFlame(g, ctx, 0, towerBaseY + 1.07, kz - 0.04, 0.85, flameOuter, warmGlow, ctx.seed + 0.4);
  addFlutterPennant(
    g,
    ctx,
    wingX,
    wingH + 0.31,
    -0.18,
    0.22,
    deepBlue,
    gold,
    ctx.seed + 2.1,
    0.35,
    0.85,
  );

  // Extra rear twin spirelets for rich 360-degree skyline
  for (const side of [-1, 1] as const) {
    addMesh(g, getCylGeo(0.085, 0.11, 0.44, 6), stone, side * 0.24, y2 + 0.22, kz - 0.24);
    addMesh(g, getConeGeo(0.115, 0.22, 6), royalBlue, side * 0.24, y2 + 0.55, kz - 0.24);
  }
}

// ============================================================================
// 2. ORCS — Ashfell & Ironspire (Volcanic Obsidian, Iron Spikes, Magma & Crimson)
// ============================================================================

function buildOrcCitadel(g: THREE.Group, tier: CityArtTier, ctx: CityBuildCtx): void {
  // Value-lifted volcanic obsidian & iron so facets pop sharply against ash terrain
  const obsidian = getCitadelMat('#5b5169', { roughness: 0.72, metalness: 0.16 });
  const obsidianLit = getCitadelMat('#716582', { roughness: 0.74, metalness: 0.12 });
  const darkIron = getCitadelMat('#433b4f', { roughness: 0.50, metalness: 0.42 });
  const boneSpike = getCitadelMat('#dbd2c0', { roughness: 0.70, metalness: 0.08 });
  const crimson = getCitadelMat('#ef4444', {
    roughness: 0.64,
    emissive: '#b91c1c',
    emissiveIntensity: 0.24,
  });
  const magma = getCitadelMat('#ff6b2b', {
    emissive: '#ea580c',
    emissiveIntensity: 1.4,
    roughness: 0.26,
  });
  const fireCore = getCitadelMat('#fde047', {
    emissive: '#f97316',
    emissiveIntensity: 1.5,
    roughness: 0.22,
  });

  const kz = -0.38;

  // Helper: jagged volcanic rock peak with proud glowing lava vent & pouring magma vein
  const addVolcanicPeak = (x: number, z: number, r: number, h: number, rot: number, withVent = false) => {
    addMesh(g, getConeGeo(r, h, 5), obsidian, x, h * 0.5, z, { rotY: rot });
    if (withVent) {
      // Glowing volcanic crater rim & magma spill at summit (like splash_loading_raw.jpg!)
      addMesh(g, getCylGeo(r * 0.26, r * 0.34, h * 0.16, 5), darkIron, x, h * 0.88, z, { rotY: rot });
      addMesh(g, getOctGeo(r * 0.24), magma, x, h * 0.96, z, { scaleY: 0.65, cast: false, receive: false });
    } else {
      addMesh(g, getConeGeo(r * 0.45, h * 0.32, 5), obsidianLit, x + 0.02, h * 0.82, z, { rotY: rot + 0.4 });
    }
    // Proud glowing lava stream spilling down the camera-facing slope
    addMesh(g, getBoxGeo(0.068, h * 0.76, 0.055), magma, x + r * 0.12, h * 0.38, z + r * 0.46, {
      rotX: -0.34,
      rotZ: 0.10,
      cast: false,
      receive: false,
    });
  };

  // Helper: curved outward-angled iron tusk spike
  const addHornSpike = (
    x: number,
    y: number,
    z: number,
    r: number,
    h: number,
    rotZ: number,
    rotX = 0,
    mat: THREE.Material = darkIron,
  ) => {
    addMesh(g, getConeGeo(r, h, 4), mat, x, y, z, { rotZ, rotX });
  };

  if (tier === 1) {
    // Tier 1: Spiked Ash-Camp (lifted volcanic basalt + bright magma rim + bold crimson war-banners)
    // Glowing magma fissure & crater rim around the bastion base for crisp wasteland contrast
    addMesh(g, getCylGeo(0.41, 0.43, 0.028, 5), magma, 0, 0.014, kz, {
      cast: false,
      receive: false,
    });
    // Chunky pentagonal basalt war-keep (lit volcanic stone so silhouette pops cleanly!)
    addMesh(g, getCylGeo(0.28, 0.39, 0.44, 5), obsidianLit, 0, 0.22, kz);
    addMesh(g, getCylGeo(0.31, 0.31, 0.06, 5), darkIron, 0, 0.44, kz);
    // Bright bone-tusk & iron ring of spikes
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 + 0.2;
      addHornSpike(
        Math.cos(a) * 0.27,
        0.56,
        kz + Math.sin(a) * 0.27,
        0.062,
        0.28,
        -Math.cos(a) * 0.28,
        Math.sin(a) * 0.28,
        i % 2 === 0 ? boneSpike : obsidianLit,
      );
    }
    // Blazing firepit crown + glowing ember slits
    addAnimatedFlame(g, ctx, 0, 0.46, kz, 1.0, magma, fireCore, ctx.seed + 0.2);
    addWindow(g, -0.22, 0.27, kz + 0.22, 0.062, 0.09, 0.028, fireCore, -0.65);
    addWindow(g, 0.22, 0.27, kz + 0.22, 0.062, 0.09, 0.028, fireCore, 0.65);
    // Glowing forge gate + crimson war banner draped cleanly on flank
    addArchedPortal(g, 0, 0, kz + 0.31, 0.23, 0.24, darkIron, magma, obsidianLit);
    addHangingBanner(g, -0.24, 0.40, kz + 0.24, 0.095, 0.22, crimson, boneSpike, -0.6);
    // Jagged basalt crag with glowing lava vent on left + tall bold crimson war banner on right
    addVolcanicPeak(-0.50, -0.22, 0.22, 0.50, 0.5, true);
    addFlutterPennant(g, ctx, 0.46, 0, -0.10, 0.56, crimson, boneSpike, ctx.seed + 1.1, -0.4, 1.2);
    return;
  }

  // Tier 2+: Raised volcanic basalt terrace with glowing magma cracks!
  const terraceR = tier >= 4 ? 0.64 : tier === 3 ? 0.60 : 0.54;
  const terraceH = tier >= 3 ? 0.26 : 0.20;
  addMesh(g, getCylGeo(terraceR, terraceR + 0.07, terraceH, 6), obsidian, 0, terraceH * 0.5, kz);
  // Glowing lava moat seam around terrace base
  addMesh(g, getCylGeo(terraceR + 0.08, terraceR + 0.09, 0.03, 6), magma, 0, 0.018, kz, {
    cast: false,
    receive: false,
  });

  // Flanking volcanic peaks for Tier 3 & 4 (iconic Ashfell silhouette!)
  if (tier >= 3) {
    addVolcanicPeak(-0.60, -0.32, 0.28, tier === 4 ? 0.86 : 0.68, 0.4, true);
    addVolcanicPeak(0.60, -0.32, 0.28, tier === 4 ? 0.82 : 0.64, 1.2, true);
  } else {
    // Tier 2 side structures: spiked war-hut (left) + smoking lava vent (right)
    addMesh(g, getConeGeo(0.22, 0.38, 5), darkIron, -0.54, 0.19, -0.14);
    addWindow(g, -0.46, 0.12, -0.01, 0.06, 0.075, 0.025, magma, 0.4);
    addVolcanicPeak(0.54, -0.22, 0.22, 0.52, 0.8, true);
  }

  // Front spiked Iron Gatehouse facing the garrison forecourt
  addArchedPortal(g, 0, 0, kz + terraceR * 0.88, 0.24, 0.25, darkIron, magma, obsidianLit);
  for (const side of [-1, 1] as const) {
    const gx = side * 0.22;
    const gz = kz + terraceR * 0.88;
    addMesh(g, getCylGeo(0.085, 0.105, 0.30, 5), darkIron, gx, 0.15, gz);
    addHornSpike(gx + side * 0.04, 0.36, gz, 0.038, 0.16, -side * 0.32, 0, boneSpike);
    addMesh(g, getOctGeo(0.044), magma, gx, 0.33, gz, { cast: false, receive: false });
  }

  const y1 = terraceH;

  if (tier === 2) {
    // Tier 2: Iron-Palisade Stronghold (Turn 1 Capital! peakY ~1.58)
    addMesh(g, getCylGeo(0.24, 0.34, 0.66, 6), obsidian, 0, y1 + 0.33, kz - 0.02);
    addMesh(g, getCylGeo(0.29, 0.31, 0.06, 6), darkIron, 0, y1 + 0.34, kz - 0.02);
    addMesh(g, getCylGeo(0.27, 0.26, 0.065, 6), darkIron, 0, y1 + 0.65, kz - 0.02);
    // Bold draped crimson war-banner on front face!
    addHangingBanner(g, 0, y1 + 0.60, kz + 0.32, 0.16, 0.38, crimson, boneSpike, 0);
    // Glowing forge windows
    addWindow(g, -0.18, y1 + 0.48, kz + 0.18, 0.06, 0.09, 0.026, magma, -0.55);
    addWindow(g, 0.18, y1 + 0.48, kz + 0.18, 0.06, 0.09, 0.026, magma, 0.55);
    // 4 swept iron crown spikes + blazing summit brazier
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2 + Math.PI / 4;
      addHornSpike(
        Math.cos(a) * 0.23,
        y1 + 0.80,
        kz - 0.02 + Math.sin(a) * 0.23,
        0.055,
        0.30,
        -Math.cos(a) * 0.32,
        Math.sin(a) * 0.32,
        darkIron,
      );
    }
    addAnimatedFlame(g, ctx, 0, y1 + 0.68, kz - 0.02, 0.95, magma, fireCore, ctx.seed + 0.7);
    addFlutterPennant(g, ctx, 0.52, 0, 0.12, 0.50, crimson, magma, ctx.seed + 1.4, -0.35, 1.0);
    return;
  }

  // Tier 3 & Tier 4: Towering Horned Ironspire Dread-Citadel!
  const towerH1 = tier === 4 ? 0.64 : 0.56;
  const towerH2 = tier === 4 ? 0.62 : 0.44;

  // Lower obsidian fortress drum with jagged buttress blades
  addMesh(g, getCylGeo(0.28, 0.38, towerH1, 6), obsidian, 0, y1 + towerH1 * 0.5, kz - 0.04);
  addMesh(g, getCylGeo(0.32, 0.34, 0.06, 6), darkIron, 0, y1 + towerH1 * 0.95, kz - 0.04);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    addHornSpike(
      Math.cos(a) * 0.34,
      y1 + towerH1 * 0.55,
      kz - 0.04 + Math.sin(a) * 0.34,
      0.068,
      0.40,
      -Math.cos(a) * 0.34,
      Math.sin(a) * 0.34,
      darkIron,
    );
  }
  // Bold twin crimson war-banners draped cleanly proud of the tower front
  addHangingBanner(g, -0.15, y1 + towerH1 - 0.03, kz + 0.32, 0.12, 0.44, crimson, boneSpike, -0.24);
  addHangingBanner(g, 0.15, y1 + towerH1 - 0.03, kz + 0.32, 0.12, 0.44, crimson, boneSpike, 0.24);

  // Upper tapered Ironspire tower
  const y2 = y1 + towerH1;
  addMesh(g, getCylGeo(0.18, 0.27, towerH2, 6), obsidianLit, 0, y2 + towerH2 * 0.5, kz - 0.04);
  addMesh(g, getCylGeo(0.23, 0.25, 0.055, 6), darkIron, 0, y2 + towerH2 * 0.5, kz - 0.04);
  addMesh(g, getCylGeo(0.21, 0.20, 0.06, 6), darkIron, 0, y2 + towerH2, kz - 0.04);

  // Glowing ember windows arrayed around the upper shaft
  for (const ang of [-0.6, 0, 0.6]) {
    addWindow(
      g,
      Math.sin(ang) * 0.22,
      y2 + towerH2 * 0.32,
      kz - 0.04 + Math.cos(ang) * 0.22,
      0.055,
      0.10,
      0.03,
      magma,
      ang,
    );
    addWindow(
      g,
      Math.sin(ang) * 0.19,
      y2 + towerH2 * 0.72,
      kz - 0.04 + Math.cos(ang) * 0.19,
      0.052,
      0.10,
      0.03,
      fireCore,
      ang,
    );
  }

  // Sweeping jagged shoulder tusks
  for (const side of [-1, 1] as const) {
    addHornSpike(side * 0.26, y2 + towerH2 * 0.52, kz - 0.04, 0.06, 0.32, -side * 0.62, 0, boneSpike);
  }

  const summitY = y2 + towerH2;

  // Iconic Twin Curved Ironspire Horns framing the Blazing Fire-Eye!
  for (const side of [-1, 1] as const) {
    // Lower outward horn segment
    addMesh(g, getConeGeo(0.075, 0.34, 4), darkIron, side * 0.18, summitY + 0.14, kz - 0.04, {
      rotZ: -side * 0.42,
    });
    // Upper inward-curving claw tip
    addMesh(g, getConeGeo(0.055, 0.32, 4), darkIron, side * 0.20, summitY + 0.36, kz - 0.04, {
      rotZ: side * 0.28,
    });
  }

  if (tier === 3) {
    // Tier 3: Blazing fire-brazier between the horns (peakY ~1.98)
    addAnimatedFlame(g, ctx, 0, summitY + 0.04, kz - 0.04, 1.15, magma, fireCore, ctx.seed + 0.9);
    return;
  }

  // Tier 4: IRONSPIRES DREAD-FORTRESS — Crowned by a Levitating Molten Fire-Ring & Eye (peakY ~2.44!)
  // Extra upper outer tusks
  for (const side of [-1, 1] as const) {
    addHornSpike(side * 0.24, summitY + 0.06, kz + 0.06, 0.045, 0.24, -side * 0.68, 0.25, boneSpike);
  }

  // Hovering pulsing Volcanic Fire-Eye + Ring between the great horns
  const eyeGroup = new THREE.Group();
  eyeGroup.position.set(0, summitY + 0.28, kz - 0.04);
  eyeGroup.userData.baseY = summitY + 0.28;
  eyeGroup.userData.phase = ctx.seed + 0.6;
  eyeGroup.userData.spinSpeed = 0.95;
  addMesh(eyeGroup, getTorusGeo(0.115, 0.028, 5, 10), magma, 0, 0, 0, {
    cast: false,
    receive: false,
  });
  addMesh(eyeGroup, getOctGeo(0.088), fireCore, 0, 0, 0, {
    scaleX: 1.28,
    scaleY: 0.78,
    scaleZ: 0.62,
    cast: false,
    receive: false,
  });
  g.add(eyeGroup);
  ctx.crystals.push(eyeGroup);

  // Twin flanking horned forge-bastions on left/right wings + rising ash smoke
  for (const side of [-1, 1] as const) {
    addMesh(g, getCylGeo(0.12, 0.16, 0.44, 5), darkIron, side * 0.56, 0.22, 0.06);
    addHangingBanner(g, side * 0.56, 0.36, 0.19, 0.08, 0.22, crimson, darkIron, 0);
    addHornSpike(side * 0.62, 0.50, 0.06, 0.04, 0.18, -side * 0.42, 0, boneSpike);
    addAnimatedFlame(g, ctx, side * 0.56, 0.44, 0.06, 0.65, magma, fireCore, ctx.seed + side);
  }
  addChimneySmoke(g, ctx, -0.56, 0.58, 0.06, 3, '#6b6575', 0.062);
}

// ============================================================================
// 3. ELVES — Sylvanvale & Starhaven (Keepers of the Starlight!)
// ============================================================================

function buildElfCitadel(g: THREE.Group, tier: CityArtTier, ctx: CityBuildCtx): void {
  const ivory = getCitadelMat('#f7f3e8', { roughness: 0.76 });
  const pearl = getCitadelMat('#e6dec8', { roughness: 0.80 });
  const goldRoof = getCitadelMat('#f5c542', {
    metalness: 0.52,
    roughness: 0.32,
    emissive: '#b45309',
    emissiveIntensity: 0.12,
  });
  const emerald = getCitadelMat('#10b981', {
    roughness: 0.68,
    emissive: '#047857',
    emissiveIntensity: 0.14,
  });
  const starGold = getCitadelMat('#fef08a', {
    emissive: '#facc15',
    emissiveIntensity: 1.25,
    roughness: 0.24,
  });
  const starCrystal = getCitadelMat('#e0f2fe', {
    emissive: '#38bdf8',
    emissiveIntensity: 1.35,
    roughness: 0.16,
    metalness: 0.2,
  });

  const kz = -0.38;

  // Helper: slender, soaring Starhaven spire with golden needle roof (splash_loading_raw.jpg!)
  const addStarSpire = (
    x: number,
    yBase: number,
    z: number,
    radius: number,
    shaftH: number,
    roofH: number,
    withWindows = true,
    withEmeraldBand = false,
  ) => {
    // Flared ivory pedestal
    addMesh(g, getCylGeo(radius * 1.12, radius * 1.26, 0.08, 6), pearl, x, yBase + 0.04, z);
    // Tapered moon-ivory shaft
    addMesh(g, getCylGeo(radius * 0.84, radius, shaftH, 6), ivory, x, yBase + 0.08 + shaftH * 0.5, z);
    // Gilded collar ring
    addMesh(
      g,
      getCylGeo(radius * 0.98, radius * 0.92, 0.042, 6),
      withEmeraldBand ? emerald : goldRoof,
      x,
      yBase + 0.08 + shaftH,
      z,
    );
    // Tall slender faceted golden spire cone
    addMesh(
      g,
      getConeGeo(radius * 1.16, roofH, 6),
      goldRoof,
      x,
      yBase + 0.10 + shaftH + roofH * 0.5,
      z,
    );
    // Fine golden needle finial
    addMesh(
      g,
      getOctGeo(radius * 0.28),
      starGold,
      x,
      yBase + 0.10 + shaftH + roofH + radius * 0.18,
      z,
      { scaleY: 1.45, cast: false, receive: false },
    );
    if (withWindows) {
      addWindow(g, x, yBase + 0.08 + shaftH * 0.56, z + radius * 0.92, radius * 0.38, shaftH * 0.34, 0.026, starGold);
    }
  };

  if (tier === 1) {
    // Tier 1: Starlit Glade Shrine (peakY ~1.24)
    addMesh(g, getCylGeo(0.42, 0.46, 0.09, 6), pearl, 0, 0.045, kz);
    // Central moon-ivory pavilion + tall golden spire roof
    addStarSpire(0, 0.09, kz, 0.24, 0.42, 0.44, true, false);
    addArchedPortal(g, 0, 0.09, kz + 0.24, 0.18, 0.24, pearl, starGold, goldRoof);
    // Framed by 2 iconic emerald-and-gold Mallorn trees!
    addMiniTree(g, -0.48, 0, -0.14, 'mallorn', 1.12);
    addMiniTree(g, 0.48, 0, -0.16, 'mallorn', 1.02);
    addFlutterPennant(g, ctx, -0.32, 0.09, kz + 0.32, 0.36, emerald, goldRoof, ctx.seed + 0.6, 0.35, 0.9);
    return;
  }

  // Tier 2+: Curved Moon-Ivory Sanctuary Terrace ringed with lush Emerald Garden
  const terraceR = tier >= 4 ? 0.64 : tier === 3 ? 0.60 : 0.54;
  const terraceH = tier >= 3 ? 0.24 : 0.18;
  addMesh(g, getCylGeo(terraceR, terraceR + 0.04, terraceH, 10), ivory, 0, terraceH * 0.5, kz);
  // Lush emerald garden deck inset on top of the terrace
  addMesh(g, getCylGeo(terraceR - 0.04, terraceR - 0.04, 0.025, 10), emerald, 0, terraceH + 0.01, kz, {
    cast: false,
  });
  // Gilded terrace rim band
  addMesh(g, getCylGeo(terraceR + 0.018, terraceR + 0.018, 0.032, 10), goldRoof, 0, terraceH - 0.015, kz, {
    cast: false,
  });

  // Graceful front entrance arch & steps facing the garrison forecourt
  addArchedPortal(g, 0, 0, kz + terraceR * 0.94, 0.22, 0.26, ivory, starGold, goldRoof);
  addHangingBanner(g, -0.20, terraceH + 0.02, kz + terraceR * 0.92, 0.075, 0.18, emerald, goldRoof, -0.3);
  addHangingBanner(g, 0.20, terraceH + 0.02, kz + terraceR * 0.92, 0.075, 0.18, emerald, goldRoof, 0.3);

  const y1 = terraceH + 0.02;

  if (tier === 2) {
    // Tier 2: Twin-Spire Forest Sanctuary (Turn 1 Capital! peakY ~1.66)
    // Tall central Starhaven spire
    addStarSpire(0, y1, kz - 0.02, 0.21, 0.58, 0.52, true, true);
    addArchedPortal(g, 0, y1, kz + 0.20, 0.17, 0.24, pearl, starGold, goldRoof);

    // Graceful secondary spire on right + slender gallery arch connecting them
    addStarSpire(0.46, 0, -0.24, 0.145, 0.54, 0.40, true, false);
    addMesh(g, getBoxGeo(0.32, 0.06, 0.07), ivory, 0.24, y1 + 0.24, kz + 0.06, { rotY: -0.25 });

    // Lush cluster of 3 emerald-and-gold Mallorn trees embracing the white stonework
    addMiniTree(g, -0.52, 0, -0.14, 'mallorn', 1.18);
    addMiniTree(g, -0.36, y1, kz - 0.22, 'mallorn', 0.92);
    addMiniTree(g, 0.54, 0, 0.08, 'mallorn', 0.96);

    addFlutterPennant(g, ctx, 0.46, 0.94, -0.24, 0.20, emerald, goldRoof, ctx.seed + 0.8, 0.25, 0.8);
    return;
  }

  // Tier 3 & Tier 4: Multi-tiered Starhaven Celestial Sanctuary!
  const midR = tier === 4 ? 0.42 : 0.38;
  const midH = tier === 4 ? 0.30 : 0.24;
  addMesh(g, getCylGeo(midR, midR + 0.03, midH, 10), ivory, 0, y1 + midH * 0.5, kz - 0.04);
  addMesh(g, getCylGeo(midR - 0.03, midR - 0.03, 0.024, 10), emerald, 0, y1 + midH + 0.01, kz - 0.04, {
    cast: false,
  });
  addMesh(g, getCylGeo(midR + 0.016, midR + 0.016, 0.03, 10), goldRoof, 0, y1 + midH - 0.01, kz - 0.04, {
    cast: false,
  });

  // Ring of lush Mallorn trees nestled among the gleaming white spires!
  addMiniTree(g, -0.58, 0, 0.12, 'mallorn', 1.08);
  addMiniTree(g, 0.58, 0, 0.12, 'mallorn', 1.05);
  addMiniTree(g, -0.34, y1, kz + 0.24, 'mallorn', 0.88);
  addMiniTree(g, 0.34, y1, kz + 0.24, 'mallorn', 0.88);
  addMiniTree(g, 0, y1, kz - 0.46, 'mallorn', 0.95);

  // Flanking twin slender golden-capped spires (West & East wings) + flying ivory bridges!
  const wingX = tier === 4 ? 0.60 : 0.56;
  const wingShaft = tier === 4 ? 0.70 : 0.60;
  for (const side of [-1, 1] as const) {
    addStarSpire(side * wingX, 0, -0.22, 0.135, wingShaft, 0.42, true, false);
    addHangingBanner(g, side * wingX, wingShaft * 0.72, -0.075, 0.068, 0.20, emerald, goldRoof, 0);
    // Graceful flying bridge arch linking satellite spire to central sanctuary
    addMesh(g, getBoxGeo(0.36, 0.055, 0.07), ivory, side * 0.36, y1 + 0.26, kz + 0.08, {
      rotY: side * -0.22,
    });
  }

  const y2 = y1 + midH + 0.02;

  if (tier === 3) {
    // Tier 3: Terraced Forest-Spire Sanctuary (peakY ~2.08)
    // Golden-domed Star Gazebo on right shoulder
    addMesh(g, getCylGeo(0.12, 0.135, 0.22, 8), ivory, 0.38, y1 + 0.11, kz - 0.24);
    addMesh(g, getDomeGeo(0.125, 8), goldRoof, 0.38, y1 + 0.21, kz - 0.24);

    // Tall central Starhaven Spire
    addStarSpire(0, y2, kz - 0.04, 0.20, 0.66, 0.56, true, true);
    addArchedPortal(g, 0, y2, kz + 0.17, 0.17, 0.25, pearl, starGold, goldRoof);

    // Hovering Starlight crystal motes flanking the spire
    for (const side of [-1, 1] as const) {
      const mote = new THREE.Group();
      mote.position.set(side * 0.36, y2 + 0.64, kz + 0.06);
      mote.userData.baseY = y2 + 0.64;
      mote.userData.phase = ctx.seed + side * 1.4;
      mote.userData.spinSpeed = 1.6;
      addMesh(mote, getOctGeo(0.062), starGold, 0, 0, 0, {
        scaleY: 1.4,
        cast: false,
        receive: false,
      });
      g.add(mote);
      ctx.crystals.push(mote);
    }
    return;
  }

  // Tier 4: GRAND STARHAVEN CELESTIAL SPIRE (peakY ~2.56!)
  // Rear twin satellite spires (creating a dazzling 5-spire celestial crown!)
  for (const side of [-1, 1] as const) {
    addStarSpire(side * 0.38, y1, kz - 0.26, 0.115, 0.58, 0.38, false, false);
  }

  // Central Soaring Celestial Tower with 4 slender fluted buttress pinnacles
  const towerH = 0.78;
  addMesh(g, getCylGeo(0.165, 0.225, towerH, 8), ivory, 0, y2 + towerH * 0.5, kz - 0.04);
  addMesh(g, getCylGeo(0.21, 0.21, 0.045, 8), goldRoof, 0, y2 + towerH * 0.54, kz - 0.04);
  addMesh(g, getCylGeo(0.195, 0.18, 0.05, 8), emerald, 0, y2 + towerH, kz - 0.04);
  addArchedPortal(g, 0, y2, kz + 0.19, 0.18, 0.28, pearl, starGold, goldRoof);

  // Four slender gilded spirelets framing the central Celestial Tower
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 2 + Math.PI / 4;
    const sx = Math.cos(a) * 0.23;
    const sz = kz - 0.04 + Math.sin(a) * 0.23;
    addMesh(g, getCylGeo(0.042, 0.056, 0.44, 6), ivory, sx, y2 + 0.22, sz);
    addMesh(g, getConeGeo(0.062, 0.22, 6), goldRoof, sx, y2 + 0.55, sz);
  }

  // Luminous Gilded Lantern Crown Spire
  const lanternY = y2 + towerH + 0.02;
  addMesh(g, getConeGeo(0.21, 0.48, 6), starGold, 0, lanternY + 0.24, kz - 0.04, {
    cast: false,
    receive: false,
  });
  // Gold lattice ribs clasping the glowing starlight lantern
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 2;
    addMesh(
      g,
      getBoxGeo(0.026, 0.46, 0.026),
      goldRoof,
      Math.cos(a) * 0.12,
      lanternY + 0.22,
      kz - 0.04 + Math.sin(a) * 0.12,
      { rotZ: Math.cos(a) * 0.34, rotX: -Math.sin(a) * 0.34, cast: false },
    );
  }

  // CROWNING CENTERPIECE: Gently Hovering & Rotating Faceted Starlight Crystal + Golden Halo!
  const crystalY = lanternY + 0.68;
  const crystalGroup = new THREE.Group();
  crystalGroup.position.set(0, crystalY, kz - 0.04);
  crystalGroup.userData.baseY = crystalY;
  crystalGroup.userData.phase = ctx.seed + 0.3;
  crystalGroup.userData.spinSpeed = 1.25;

  // Faceted celestial Starlight Diamond
  addMesh(crystalGroup, getOctGeo(0.115), starCrystal, 0, 0, 0, {
    scaleX: 0.85,
    scaleY: 1.55,
    scaleZ: 0.85,
    cast: false,
    receive: false,
  });
  // Inner warm starlight core sparkle
  addMesh(crystalGroup, getOctGeo(0.075), starGold, 0, 0, 0, {
    rotY: Math.PI / 4,
    scaleY: 1.2,
    cast: false,
    receive: false,
  });
  // Tilted Golden Starlight Halo Ring encircling the crystal!
  addMesh(crystalGroup, getTorusGeo(0.20, 0.02, 5, 14), goldRoof, 0, 0, 0, {
    rotX: Math.PI * 0.36,
    rotY: 0.4,
    cast: false,
    receive: false,
  });

  g.add(crystalGroup);
  ctx.crystals.push(crystalGroup);
}

// ============================================================================
// 4. DWARVES — Deepforge & Stonehelm (Mountain Holds, Snow Peaks, Bronze & Forge)
// ============================================================================

function buildDwarfCitadel(g: THREE.Group, tier: CityArtTier, ctx: CityBuildCtx): void {
  const granite = getCitadelMat('#7b8798', { roughness: 0.84 });
  const graniteDark = getCitadelMat('#596578', { roughness: 0.88 });
  const graniteLit = getCitadelMat('#99a5b6', { roughness: 0.80 });
  const snow = getCitadelMat('#f1f5f9', { roughness: 0.74 });
  const bronze = getCitadelMat('#d97706', {
    metalness: 0.56,
    roughness: 0.36,
    emissive: '#92400e',
    emissiveIntensity: 0.12,
  });
  const gold = getCitadelMat('#f5b82e', {
    metalness: 0.62,
    roughness: 0.28,
    emissive: '#b45309',
    emissiveIntensity: 0.16,
  });
  const forgeGlow = getCitadelMat('#fb923c', {
    emissive: '#f97316',
    emissiveIntensity: 1.3,
    roughness: 0.26,
  });
  const forgeCore = getCitadelMat('#fef08a', {
    emissive: '#f59e0b',
    emissiveIntensity: 1.4,
    roughness: 0.22,
  });

  const kz = -0.38;

  // Helper: faceted mountain peak with crisp snow cap (matches terrainMesh.ts & splash_loading_raw.jpg!)
  const addMountainPeak = (x: number, z: number, r: number, h: number, rot: number) => {
    addMesh(g, getConeGeo(r, h, 6), graniteDark, x, h * 0.5, z, { rotY: rot });
    addMesh(g, getConeGeo(r * 0.48, h * 0.44, 6), snow, x, h * 0.79, z, { rotY: rot });
  };

  // Helper: stout square Dwarven crenellated bastion tower with bronze band & snow dust
  const addDwarfTower = (x: number, yBase: number, z: number, w: number, h: number) => {
    addMesh(g, getBoxGeo(w, h, w), granite, x, yBase + h * 0.5, z);
    addMesh(g, getBoxGeo(w + 0.03, 0.045, w + 0.03), bronze, x, yBase + h - 0.05, z);
    addMesh(g, getBoxGeo(w + 0.015, 0.035, w + 0.015), snow, x, yBase + h + 0.01, z, { cast: false });
    addBoxCrenellations(g, x, yBase + h + 0.02, z, w + 0.02, w + 0.02, graniteLit, 0.055, 0.048);
  };

  if (tier === 1) {
    // Tier 1: Fortified Stone Gatehouse (peakY ~1.16)
    // Snow-capped crag sheltering the back of the hold
    addMountainPeak(0, kz - 0.18, 0.42, 0.90, 0.35);
    // Stout carved granite hall
    addMesh(g, getBoxGeo(0.66, 0.34, 0.46), granite, 0, 0.17, kz + 0.02);
    addMesh(g, getBoxGeo(0.72, 0.06, 0.52), bronze, 0, 0.36, kz + 0.02);
    addMesh(g, getBoxGeo(0.68, 0.04, 0.48), snow, 0, 0.41, kz + 0.02, { cast: false });
    // Glowing amber forge gate
    addArchedPortal(g, 0, 0, kz + 0.255, 0.25, 0.25, graniteDark, forgeGlow, bronze, 0, true);
    addWindow(g, -0.22, 0.21, kz + 0.255, 0.065, 0.075, 0.026, forgeCore);
    addWindow(g, 0.22, 0.21, kz + 0.255, 0.065, 0.075, 0.026, forgeCore);
    // Stone forge chimney + rising smoke puffs
    addMesh(g, getBoxGeo(0.15, 0.56, 0.15), graniteDark, 0.30, 0.28, kz - 0.12);
    addMesh(g, getBoxGeo(0.10, 0.04, 0.10), forgeGlow, 0.30, 0.57, kz - 0.12, { cast: false });
    addChimneySmoke(g, ctx, 0.30, 0.64, kz - 0.12, 3, '#e2e8f0', 0.058);
    // Snow-dusted highland pine on left
    addMiniTree(g, -0.50, 0, -0.10, 'snow_pine', 1.05);
    return;
  }

  // Tier 2+: Monumental Mountain-Carved Dwarven Fortress (direct tribute to splash_loading_raw.jpg!)
  if (tier === 2) {
    // Tier 2: Twin-Pillared Forge Hall (Turn 1 Capital! peakY ~1.54)
    // Dramatic snow-capped mountain spur rising directly behind the forge hall
    addMountainPeak(0, kz - 0.18, 0.56, 1.28, 0.4);
    addMountainPeak(-0.42, kz - 0.12, 0.34, 0.80, 1.1);
    addMountainPeak(0.42, kz - 0.12, 0.34, 0.76, 0.8);

    // Heavy granite fortress body embedded in the mountainside
    addMesh(g, getBoxGeo(0.76, 0.42, 0.48), granite, 0, 0.21, kz + 0.06);
    addMesh(g, getBoxGeo(0.80, 0.055, 0.52), bronze, 0, 0.43, kz + 0.06);

    // Iconic Twin Square Crenellated Gatehouse Towers framing the glowing Forge Portal!
    addDwarfTower(-0.32, 0, kz + 0.28, 0.24, 0.48);
    addDwarfTower(0.32, 0, kz + 0.28, 0.24, 0.48);
    addArchedPortal(g, 0, 0, kz + 0.31, 0.32, 0.32, graniteDark, forgeGlow, gold, 0, true);
    // Center bronze forge crest above gate
    addMesh(g, getBoxGeo(0.42, 0.09, 0.12), bronze, 0, 0.38, kz + 0.29);

    // Foundry chimney + rising smoke
    addMesh(g, getBoxGeo(0.16, 0.66, 0.16), graniteDark, 0.46, 0.33, kz - 0.02);
    addMesh(g, getBoxGeo(0.10, 0.04, 0.10), forgeGlow, 0.46, 0.67, kz - 0.02, { cast: false });
    addChimneySmoke(g, ctx, 0.46, 0.74, kz - 0.02, 3, '#e2e8f0', 0.062);

    // Snow-dusted pines + Dwarven bronze banner on right gate tower
    addMiniTree(g, -0.58, 0, 0.10, 'snow_pine', 1.0);
    addMiniTree(g, 0.58, 0, 0.10, 'snow_pine', 0.92);
    addFlutterPennant(g, ctx, 0.32, 0.54, kz + 0.28, 0.28, bronze, gold, ctx.seed + 1.2, -0.25, 0.9);
    return;
  }

  // Tier 3 & Tier 4: Multi-tiered Mountain Hold with Upper Blazing Foundry & Towering Snow Peaks!
  if (tier === 3) {
    // Tier 3: Stepped Deepforge Bastion (peakY ~1.94)
    // Twin dramatic snow-capped granite peaks cradling the upper foundry!
    addMountainPeak(-0.24, kz - 0.22, 0.54, 1.68, 0.3);
    addMountainPeak(0.28, kz - 0.20, 0.50, 1.50, 1.0);
    addMountainPeak(-0.56, kz - 0.06, 0.30, 0.86, 0.7);
    addMountainPeak(0.56, kz - 0.06, 0.30, 0.82, 1.5);
  } else {
    // Tier 4: KING'S HOLD OF STONEHELM (peakY ~2.40!)
    // Colossal central snow-capped mountain peak + flanking crag shoulders!
    addMountainPeak(0, kz - 0.22, 0.68, 2.14, 0.25);
    addMountainPeak(-0.46, kz - 0.14, 0.42, 1.38, 0.9);
    addMountainPeak(0.46, kz - 0.14, 0.42, 1.34, 1.6);
  }

  // Lower Grand Bastion Wall & Twin Crenellated Gatehouse Towers
  addMesh(g, getBoxGeo(0.92, 0.36, 0.42), granite, 0, 0.18, kz + 0.16);
  addMesh(g, getBoxGeo(0.96, 0.05, 0.46), bronze, 0, 0.37, kz + 0.16);
  addDwarfTower(-0.38, 0, kz + 0.34, 0.26, 0.52);
  addDwarfTower(0.38, 0, kz + 0.34, 0.26, 0.52);
  addHangingBanner(g, -0.38, 0.44, kz + 0.48, 0.085, 0.22, bronze, gold, 0);
  addHangingBanner(g, 0.38, 0.44, kz + 0.48, 0.085, 0.22, bronze, gold, 0);

  // Monumental Lower Golden-Bronze Rune Gatehouse
  addArchedPortal(g, 0, 0, kz + 0.36, 0.36, 0.34, graniteDark, forgeGlow, gold, 0, true);
  // Central bronze rune door split bar
  addMesh(g, getBoxGeo(0.032, 0.26, 0.06), bronze, 0, 0.13, kz + 0.375, { cast: false });

  // Mid-Tier Elevated Foundry Citadel carved directly into the mountain!
  const midY = 0.40;
  addMesh(g, getBoxGeo(0.68, 0.42, 0.42), graniteLit, 0, midY + 0.21, kz - 0.02);
  addMesh(g, getBoxGeo(0.72, 0.055, 0.46), gold, 0, midY + 0.43, kz - 0.02);
  addMesh(g, getBoxGeo(0.70, 0.04, 0.44), snow, 0, midY + 0.47, kz - 0.02, { cast: false });

  // Blazing Open Foundry Arch in the upper mountain keep (direct nod to frame_03_7.4s.jpg!)
  addArchedPortal(g, 0, midY + 0.02, kz + 0.20, 0.28, 0.30, graniteDark, forgeGlow, gold, 0, true);
  addAnimatedFlame(g, ctx, 0, midY + 0.06, kz + 0.23, 0.78, forgeGlow, forgeCore, ctx.seed + 0.5);

  // Flanking upper forge towers + glowing mountain windows
  addDwarfTower(-0.30, midY, kz + 0.08, 0.18, 0.42);
  addDwarfTower(0.30, midY, kz + 0.08, 0.18, 0.42);
  addWindow(g, -0.44, midY + 0.16, kz + 0.14, 0.065, 0.09, 0.03, forgeCore, -0.35);
  addWindow(g, 0.44, midY + 0.16, kz + 0.14, 0.065, 0.09, 0.03, forgeCore, 0.35);

  // Twin smoking foundry chimneys
  for (const side of [-1, 1] as const) {
    addMesh(g, getBoxGeo(0.13, 0.44, 0.13), graniteDark, side * 0.46, midY + 0.22, kz - 0.06);
    addMesh(g, getBoxGeo(0.085, 0.035, 0.085), forgeGlow, side * 0.46, midY + 0.45, kz - 0.06, {
      cast: false,
    });
  }
  addChimneySmoke(g, ctx, 0.46, midY + 0.52, kz - 0.06, 3, '#e2e8f0', 0.065);
  addChimneySmoke(g, ctx, -0.46, midY + 0.52, kz - 0.06, 2, '#cbd5e1', 0.055);

  // Highland snow pines framing the granite base
  addMiniTree(g, -0.62, 0, 0.14, 'snow_pine', 1.05);
  addMiniTree(g, 0.62, 0, 0.14, 'snow_pine', 1.0);

  if (tier === 3) {
    // Tier 3 crowning golden geometric forge-dome on upper keep
    addMesh(g, getDomeGeo(0.16, 6), bronze, 0, midY + 0.48, kz - 0.02);
    addMesh(g, getOctGeo(0.055), gold, 0, midY + 0.67, kz - 0.02);
    return;
  }

  // Tier 4 EXTRA: Monumental Carved Geometric King's Crown & Rune Crest set into the cliff face!
  const crownY = midY + 0.52;
  // Stepped carved granite throne-pediment emerging proudly from the snow peak
  addMesh(g, getBoxGeo(0.50, 0.40, 0.32), graniteLit, 0, crownY + 0.20, kz - 0.04);
  addMesh(g, getBoxGeo(0.40, 0.26, 0.20), granite, 0, crownY + 0.44, kz - 0.06);

  // Monumental Faceted Burnished-Gold Dwarf King's Crown Crest!
  const crestZ = kz + 0.12;
  addMesh(g, getBoxGeo(0.44, 0.095, 0.09), gold, 0, crownY + 0.34, crestZ);
  // Five bold geometric crown points
  const pts: [number, number][] = [
    [-0.175, 0.14],
    [-0.088, 0.19],
    [0, 0.26],
    [0.088, 0.19],
    [0.175, 0.14],
  ];
  for (const [px, ph] of pts) {
    addMesh(g, getConeGeo(0.05, ph, 4), gold, px, crownY + 0.39 + ph * 0.5, crestZ, {
      rotY: Math.PI / 4,
    });
  }
  // Glowing golden anvil-rune hearth gem at the heart of the King's Crest
  addMesh(g, getOctGeo(0.075), forgeCore, 0, crownY + 0.19, crestZ + 0.02, {
    scaleX: 0.95,
    scaleY: 1.4,
    scaleZ: 0.5,
    cast: false,
    receive: false,
  });

  // Twin Burnished-Bronze Rune Obelisks flanking the outer forecourt wings!
  for (const side of [-1, 1] as const) {
    addMesh(g, getBoxGeo(0.13, 0.48, 0.13), bronze, side * 0.58, 0.24, -0.08);
    addMesh(g, getConeGeo(0.095, 0.14, 4), gold, side * 0.58, 0.55, -0.08, { rotY: Math.PI / 4 });
    addWindow(g, side * 0.58, 0.28, -0.01, 0.042, 0.18, 0.022, forgeCore);
  }
}

// ============================================================================
// Faction-Themed 3D City Walls (with Wide Open Front-Right Garrison Gatehouse)
// ============================================================================

interface WallStyle {
  wall: string;
  trim: string;
  cap: string;
  capKind: 'cone' | 'spike' | 'flat' | 'spire';
  glow?: string;
}

const WALL_STYLES: Record<FactionId, WallStyle> = {
  humans: { wall: '#f2ece0', trim: '#f5c542', cap: '#2563eb', capKind: 'cone' },
  orcs: { wall: '#463d52', trim: '#2c2636', cap: '#cfc6b4', capKind: 'spike', glow: '#ff6b2b' },
  elves: { wall: '#f6f2e6', trim: '#f5c542', cap: '#f5c542', capKind: 'spire', glow: '#fef08a' },
  dwarves: { wall: '#7b8798', trim: '#d97706', cap: '#f1f5f9', capKind: 'flat', glow: '#fb923c' },
};

function addCityWalls(
  parent: THREE.Group,
  faction: FactionId,
  primary: string,
  scale: number,
): void {
  const st = WALL_STYLES[faction];
  const wallMat = getFlatMaterial(st.wall, { roughness: 0.82 });
  const trimMat = getFlatMaterial(st.trim, { roughness: 0.44, metalness: 0.42 });
  const capMat = getFlatMaterial(st.cap, {
    roughness: st.capKind === 'spire' ? 0.34 : 0.62,
    metalness: st.capKind === 'spire' ? 0.48 : 0.12,
  });
  const bannerMat = getFlatMaterial(primary, {
    emissive: primary,
    emissiveIntensity: 0.16,
    roughness: 0.74,
  });
  const glowMat = st.glow
    ? getFlatMaterial(st.glow, { emissive: st.glow, emissiveIntensity: 1.15, roughness: 0.3 })
    : null;

  const r = 0.89 * scale;
  const h = 0.24;
  const t = 0.095;
  const y0 = CITY_PLAZA_Y;
  // Wide open front-right gate (+r, +r) so even Veteran mounted Knights & Ironbreakers
  // stand cleanly inside the open gatehouse with zero pillar/rim clipping!
  const gate = 0.72 * scale;

  const addSegment = (x1: number, z1: number, x2: number, z2: number) => {
    const len = Math.hypot(x2 - x1, z2 - z1);
    if (len < 0.08) return;
    const seg = new THREE.Group();
    seg.position.set((x1 + x2) / 2, y0, (z1 + z2) / 2);
    seg.rotation.y = -Math.atan2(z2 - z1, x2 - x1);

    addMesh(seg, getBoxGeo(len, h, t), wallMat, 0, h * 0.5, 0);
    addMesh(seg, getBoxGeo(len, 0.042, t + 0.014), bannerMat, 0, h * 0.64, 0, { cast: false });

    const n = Math.max(2, Math.round(len / 0.18));
    const merlonGeo = getBoxGeo(0.068, 0.056, t + 0.01);
    for (let i = 0; i < n; i++) {
      const mx = -len * 0.5 + (len / n) * (i + 0.5);
      addMesh(seg, merlonGeo, wallMat, mx, h + 0.028, 0, { cast: false });
    }

    if (glowMat && faction === 'orcs') {
      addMesh(seg, getBoxGeo(len * 0.85, 0.022, t + 0.016), glowMat, 0, h * 0.24, 0, {
        cast: false,
        receive: false,
      });
    }
    parent.add(seg);
  };

  const addCornerTurret = (x: number, z: number, tScale = 1, showBanner = false) => {
    const th = 0.32 * tScale;
    const tw = 0.175 * tScale;
    addMesh(parent, getBoxGeo(tw, th, tw), wallMat, x, y0 + th * 0.5, z);
    addMesh(parent, getBoxGeo(tw + 0.028, 0.036, tw + 0.028), trimMat, x, y0 + th, z, { cast: false });

    if (st.capKind === 'cone') {
      addMesh(parent, getConeGeo(tw * 0.76, 0.18 * tScale, 4), capMat, x, y0 + th + 0.10 * tScale, z, {
        rotY: Math.PI / 4,
      });
    } else if (st.capKind === 'spire') {
      addMesh(parent, getConeGeo(tw * 0.66, 0.24 * tScale, 6), capMat, x, y0 + th + 0.13 * tScale, z);
      if (glowMat) {
        addMesh(parent, getOctGeo(0.034 * tScale), glowMat, x, y0 + th + 0.26 * tScale, z, {
          cast: false,
          receive: false,
        });
      }
    } else if (st.capKind === 'spike') {
      for (const [dx, dz] of [
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ] as const) {
        addMesh(
          parent,
          getConeGeo(0.028 * tScale, 0.13 * tScale, 4),
          capMat,
          x + dx * tw * 0.36,
          y0 + th + 0.075 * tScale,
          z + dz * tw * 0.36,
          { cast: false },
        );
      }
      if (glowMat) {
        addMesh(parent, getOctGeo(0.04 * tScale), glowMat, x, y0 + th + 0.05, z, {
          cast: false,
          receive: false,
        });
      }
    } else {
      addMesh(parent, getBoxGeo(tw + 0.02, 0.044, tw + 0.02), capMat, x, y0 + th + 0.04, z, {
        cast: false,
      });
      if (glowMat) {
        addMesh(parent, getOctGeo(0.036 * tScale), glowMat, x, y0 + th + 0.09, z, {
          cast: false,
          receive: false,
        });
      }
    }

    if (showBanner) {
      addMesh(parent, getBoxGeo(0.014, 0.12 * tScale, 0.08 * tScale), bannerMat, x + tw * 0.5 + 0.008, y0 + th * 0.58, z, {
        cast: false,
        receive: false,
      });
      addMesh(parent, getBoxGeo(0.08 * tScale, 0.12 * tScale, 0.014), bannerMat, x, y0 + th * 0.58, z + tw * 0.5 + 0.008, {
        cast: false,
        receive: false,
      });
    }
  };

  // Back walls
  addSegment(-r, -r, r, -r);
  addSegment(-r, -r, -r, r);
  // Front-facing walls with wide open garrison gatehouse at (+r, +r)
  addSegment(-r, r, r - gate, r);
  addSegment(r, -r, r, r - gate);

  addCornerTurret(-r, -r, 0.94, false);
  addCornerTurret(r, -r, 1.0, true);
  addCornerTurret(-r, r, 1.0, true);
  addCornerTurret(r - gate, r, 0.76, false);
  addCornerTurret(r, r - gate, 0.76, false);
}

// ============================================================================
// Capital Royal Standard (Star-Crown Finial + Fluttering Banner)
// ============================================================================

function addRoyalStandard(
  parent: THREE.Group,
  ctx: CityBuildCtx,
  x: number,
  z: number,
  primary: string,
  phase: number,
): void {
  const gold = getCitadelMat('#facc15', {
    metalness: 0.56,
    roughness: 0.30,
    emissive: '#f59e0b',
    emissiveIntensity: 0.24,
  });
  const clothMat = getCitadelMat(primary, {
    emissive: primary,
    emissiveIntensity: 0.18,
    roughness: 0.74,
  });
  const rubyMat = getCitadelMat('#ef4444', {
    emissive: '#dc2626',
    emissiveIntensity: 0.65,
    roughness: 0.26,
  });

  const std = new THREE.Group();
  std.position.set(x, CITY_PLAZA_Y, z);
  parent.add(std);

  const poleH = 0.88;
  addMesh(std, getCylGeo(0.02, 0.028, poleH, 6), gold, 0, poleH * 0.5, 0, { cast: false });

  // Miniature Star-Crown finial topping the pole
  const crown = new THREE.Group();
  crown.position.y = poleH + 0.04;
  addMesh(crown, getCylGeo(0.072, 0.058, 0.056, 6), gold, 0, 0, 0, { cast: false });
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    addMesh(crown, getConeGeo(0.022, 0.072, 4), gold, Math.cos(a) * 0.06, 0.06, Math.sin(a) * 0.06, {
      cast: false,
    });
  }
  addMesh(crown, getOctGeo(0.032), rubyMat, 0, 0.02, 0, { cast: false, receive: false });
  std.add(crown);

  // Fluttering royal banner cloth
  const pivot = new THREE.Group();
  pivot.position.set(0, poleH - 0.14, 0);
  pivot.userData.bannerPhase = phase;
  pivot.userData.baseRotY = 0.45;
  pivot.rotation.y = 0.45;

  addMesh(pivot, getBoxGeo(0.32, 0.21, 0.02), clothMat, 0.16, -0.02, 0, { cast: false });
  addMesh(pivot, getBoxGeo(0.32, 0.032, 0.025), gold, 0.16, -0.11, 0, { cast: false });
  addMesh(pivot, getOctGeo(0.044), gold, 0.16, -0.02, 0.016, { scaleZ: 0.4, cast: false });

  std.add(pivot);
  ctx.banners.push(pivot);

  std.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) obj.renderOrder = 36;
  });
}

// ============================================================================
// City Parks (Lv 5+ Reward)
// ============================================================================

function addCityParks(root: THREE.Group, faction: FactionId, parks: number, scale: number): void {
  const parksGroup = new THREE.Group();
  root.add(parksGroup);
  const kind =
    faction === 'elves'
      ? 'mallorn'
      : faction === 'dwarves'
        ? 'snow_pine'
        : faction === 'humans'
          ? 'cypress'
          : 'cypress';

  const spots: [number, number][] = [
    [-0.72 * scale, 0.28 * scale],
    [0.28 * scale, -0.72 * scale],
    [-0.56 * scale, 0.62 * scale],
  ];
  const count = Math.min(parks, spots.length);

  if (faction === 'orcs') {
    // Orc trophy cairns & ember obelisks
    const basalt = getCitadelMat('#5b5169', { roughness: 0.78 });
    const ember = getCitadelMat('#ff6b2b', { emissive: '#ea580c', emissiveIntensity: 1.15 });
    for (let i = 0; i < count; i++) {
      const [px, pz] = spots[i];
      addMesh(parksGroup, getConeGeo(0.085, 0.24, 4), basalt, px, CITY_PLAZA_Y + 0.12, pz);
      addMesh(parksGroup, getOctGeo(0.042), ember, px, CITY_PLAZA_Y + 0.26, pz, {
        cast: false,
        receive: false,
      });
    }
  } else {
    for (let i = 0; i < count; i++) {
      const [px, pz] = spots[i];
      addMiniTree(parksGroup, px, CITY_PLAZA_Y, pz, kind, 0.96);
    }
  }

  parksGroup.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) obj.renderOrder = 36;
  });
}

// ============================================================================
// Unified Public City Builders (Board View & Tech Thumbnails)
// ============================================================================

/**
 * Builds a grand, cohesive, flat-shaded 3D low-poly architectural city matching
 * Eldermere's tabletop diorama lighting, shadows, and four-realm identity.
 *
 * The citadel architecture sits in a 45°-rotated local diorama frame so every
 * grand gate, staircase, twin-tower facade, and mountain hold faces the
 * front-right garrison forecourt (+0.28, +0.28) and default isometric camera,
 * while remaining fully 3D from every 90° camera orbit angle.
 */
export function createCityMesh(city: City): THREE.Group {
  const root = new THREE.Group();
  root.position.y = TILE_TOP_Y;

  const ctx: CityBuildCtx = {
    banners: [],
    smokePuffs: [],
    crystals: [],
    flames: [],
    seed: city.x * 0.73 + city.y * 1.19,
  };
  root.userData.banners = ctx.banners;
  root.userData.smokePuffs = ctx.smokePuffs;
  root.userData.crystals = ctx.crystals;
  root.userData.flames = ctx.flames;

  const faction = city.styleFaction;
  const palette = FACTION_DEFINITIONS[faction].palette;
  const primaryColor = faction === 'orcs' ? '#ef4444' : palette.primary;
  const tier = getCityArtTier(city);
  const scale = CITY_TIER_SCALE[tier];
  root.userData.cityArtTier = tier;

  // 1. Stepped themed plaza plinth + open front-right garrison forecourt
  buildPlazaBase(root, faction, tier, scale);

  // 2. Sculpted 3D citadel oriented toward the front-right garrison forecourt (+45°)
  const citadel = new THREE.Group();
  citadel.position.set(0, CITY_PLAZA_Y, 0);
  citadel.rotation.y = Math.PI / 4;
  root.add(citadel);

  switch (faction) {
    case 'humans':
      buildHumanCitadel(citadel, tier, ctx);
      break;
    case 'orcs':
      buildOrcCitadel(citadel, tier, ctx);
      break;
    case 'elves':
      buildElfCitadel(citadel, tier, ctx);
      break;
    case 'dwarves':
      buildDwarfCitadel(citadel, tier, ctx);
      break;
  }

  // Draw the above-plaza citadel architecture at renderOrder 36 (after move/attack rings at
  // renderOrder 31-35 which use depthTest:false, but before unit sprites at renderOrder 40).
  // Smoke puffs keep renderOrder 37 so they alpha-blend cleanly over the solid citadel.
  citadel.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh && obj.renderOrder === 0) {
      obj.renderOrder = 36;
    }
  });

  // 3. Faction-themed 3D perimeter walls (open front-right gatehouse for garrison)
  if (city.hasWalls) {
    addCityWalls(root, faction, primaryColor, scale);
  }

  // 4. City Parks (Lv 5+ reward)
  if (city.parks > 0) {
    addCityParks(root, faction, city.parks, scale);
  }

  // 5. Capital Royal Standard on the front-left terrace edge (clear of garrison & keep)
  if (city.isCapital) {
    addRoyalStandard(root, ctx, -0.70 * scale, 0.58 * scale, primaryColor, ctx.seed);
  }

  return root;
}

/**
 * Board-view city builder — uses the unified sculpted 3D low-poly city architecture.
 */
export function createCityBoardObject(city: City): THREE.Group {
  return createCityMesh(city);
}
