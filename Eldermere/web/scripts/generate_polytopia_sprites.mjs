#!/usr/bin/env node
/**
 * Unified Battle-of-Polytopia-Style Low-Poly Flat-Shaded SVG Sprite Generator
 * Generates all 24 LOTR Polytopia character sprites (4 factions × 6 units)
 * into public/sprites/<faction>_<unit>.svg (512×512, bottom-anchored at y=492).
 *
 * Shared Visual Language:
 * - True 3D orthographic isometric low-poly projection (100% unified angle & scale)
 * - ZERO black comic outlines — crisp flat-shaded facets only
 * - Global top-left key light (bright top-left, clean mid front, cool-shaded right/side)
 * - Iconic Polytopia chibi-cube proportions (big cube head ~35% height, compact torso, stubby limbs)
 * - Expressive Polytopia-style faces projected directly onto the 3D head plane on EVERY character
 * - Faction fidelity:
 *   - Humans: Noble Gondor/Rohan warriors, royal blue & gleaming silver-white + gold
 *   - Orcs: Genuinely ugly hunched brutes, olive-ash skin, upturned pig snout, crooked tusks, glowing amber eyes, White Hand Uruk-hai
 *   - Elves: Tall graceful proportions, pointed geometric ears, emerald/ivory/gold, starlight Sentinel arrow
 *   - Dwarves: Noticeably shorter & stouter (~76% height with extra top headroom), massive faceted braided beards, runic bronze & mithril
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(PROJECT_ROOT, 'public', 'sprites');

const CANVAS_SIZE = 512;
const GROUND_ANCHOR_Y = 492;
const GLOBAL_SCALE = 128; // Unified world-units -> SVG px scale across ALL 24 sprites!

// ============================================================================
// 3D Math & Flat-Shading Engine
// ============================================================================

function add3(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}
function sub3(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}
function scale3(a, s) {
  return [a[0] * s, a[1] * s, a[2] * s];
}
function dot3(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function cross3(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}
function len3(a) {
  return Math.hypot(a[0], a[1], a[2]) || 1;
}
function norm3(a) {
  const l = len3(a);
  return [a[0] / l, a[1] / l, a[2] / l];
}

function rotX(p, rad) {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
}
function rotY(p, rad) {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
}
function rotZ(p, rad) {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  return [p[0] * c - p[1] * s, p[0] * s + p[1] * c, p[2]];
}
function deg(d) {
  return (d * Math.PI) / 180;
}

// Global top-left-front sun vector: bright top/top-left, vibrant mid front, cool shaded right/side
const LIGHT_DIR = norm3([-0.56, 0.74, 0.37]);

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHex(r, g, b) {
  const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));
  return (
    '#' +
    ((1 << 24) + (clamp(r) << 16) + (clamp(g) << 8) + clamp(b))
      .toString(16)
      .slice(1)
  );
}
function mixRgb(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

const SUN_TINT = [255, 252, 236];
const SHADOW_TINT = [22, 32, 60];
const WARM_SHADOW_TINT = [48, 26, 28];

/**
 * Polytopia-style crisp flat shading:
 * - Sunlit faces lift cleanly toward warm sunlight
 * - Mid faces retain rich saturated base color
 * - Shaded faces deepen cleanly toward cool slate-indigo (or warm umber for skin)
 */
function shadeFlatColor(baseHex, worldNormal, material = 'matte', ao = 1.0) {
  if (material === 'unlit') return baseHex;
  const base = hexToRgb(baseHex);
  const ndotl = dot3(worldNormal, LIGHT_DIR);

  if (material === 'glow') {
    const lift = Math.max(0, ndotl) * 0.32;
    const c = mixRgb(base, [255, 255, 255], lift);
    return rgbToHex(c[0], c[1], c[2]);
  }

  let highlightStr = 0.25;
  let shadowStr = 0.42;
  let shadowTint = SHADOW_TINT;

  if (material === 'metal') {
    highlightStr = 0.38;
    shadowStr = 0.46;
  } else if (material === 'gold') {
    highlightStr = 0.4;
    shadowStr = 0.42;
    shadowTint = [72, 38, 12];
  } else if (material === 'skin') {
    highlightStr = 0.2;
    shadowStr = 0.34;
    shadowTint = WARM_SHADOW_TINT;
  } else if (material === 'dark_metal') {
    highlightStr = 0.3;
    shadowStr = 0.5;
  }

  let c;
  if (ndotl > 0.36) {
    const t = Math.min(1, (ndotl - 0.36) / 0.52) * highlightStr;
    c = mixRgb(base, SUN_TINT, t);
  } else if (ndotl >= -0.05) {
    const t = ((0.36 - ndotl) / 0.41) * 0.1;
    c = mixRgb(base, shadowTint, t);
  } else {
    const t = Math.min(1, (-ndotl - 0.05) / 0.85) * shadowStr + 0.12;
    c = mixRgb(base, shadowTint, Math.min(0.62, t));
  }

  if (ao < 1.0) {
    c = mixRgb(c, shadowTint, (1 - ao) * 0.5);
  }

  return rgbToHex(c[0], c[1], c[2]);
}

// ============================================================================
// Scene Builder & Transform Stack
// ============================================================================

class PolyScene {
  constructor(opts = {}) {
    this.yaw = deg(opts.yawDeg ?? -26);
    this.pitch = deg(opts.pitchDeg ?? 19);
    this.scale = opts.scale ?? GLOBAL_SCALE;
    this.polys = [];
    this.transformStack = [];
  }

  pushTransform(tf) {
    this.transformStack.push(tf);
  }

  popTransform() {
    this.transformStack.pop();
  }

  withTransform(tf, fn) {
    this.pushTransform(tf);
    fn();
    this.popTransform();
  }

  applyTransforms(pt) {
    let p = pt;
    for (let i = this.transformStack.length - 1; i >= 0; i--) {
      const tf = this.transformStack[i];
      if (tf.pivot) p = sub3(p, tf.pivot);
      if (tf.scale) {
        if (Array.isArray(tf.scale)) {
          p = [p[0] * tf.scale[0], p[1] * tf.scale[1], p[2] * tf.scale[2]];
        } else {
          p = scale3(p, tf.scale);
        }
      }
      if (tf.rotZ) p = rotZ(p, deg(tf.rotZ));
      if (tf.rotX) p = rotX(p, deg(tf.rotX));
      if (tf.rotY) p = rotY(p, deg(tf.rotY));
      if (tf.pivot) p = add3(p, tf.pivot);
      if (tf.translate) p = add3(p, tf.translate);
    }
    return p;
  }

  toCamera(p) {
    const r1 = rotY(p, this.yaw);
    return rotX(r1, this.pitch);
  }

  addMesh(verts, faces, opts = {}) {
    const color = opts.color ?? '#94a3b8';
    const material = opts.material ?? 'matte';
    const layer = opts.layer ?? 5;
    const ao = opts.ao ?? 1.0;
    const doubleSided = opts.doubleSided ?? false;
    const localTf = opts.tf ?? null;
    const groundContact = opts.groundContact ?? false;

    if (localTf) this.pushTransform(localTf);
    const wVerts = verts.map((v) => this.applyTransforms(v));
    if (localTf) this.popTransform();

    const cVerts = wVerts.map((v) => this.toCamera(v));

    for (const face of faces) {
      const idxs = Array.isArray(face) ? face : face.idx;
      const fColor = Array.isArray(face) ? color : (face.color ?? color);
      const fMat = Array.isArray(face) ? material : (face.material ?? material);
      const fAo = Array.isArray(face) ? ao : (face.ao ?? ao);

      const p0 = wVerts[idxs[0]];
      const p1 = wVerts[idxs[1]];
      const p2 = wVerts[idxs[2]];
      const worldN = norm3(cross3(sub3(p1, p0), sub3(p2, p0)));

      const cp0 = cVerts[idxs[0]];
      const cp1 = cVerts[idxs[1]];
      const cp2 = cVerts[idxs[2]];
      const camN = norm3(cross3(sub3(cp1, cp0), sub3(cp2, cp0)));

      if (!doubleSided && camN[2] <= 0.001) continue;

      const effectiveWorldN =
        doubleSided && camN[2] < 0 ? scale3(worldN, -1) : worldN;

      const fill = shadeFlatColor(fColor, effectiveWorldN, fMat, fAo);

      let avgZ = 0;
      const pts2d = [];
      for (const idx of idxs) {
        const cv = cVerts[idx];
        avgZ += cv[2];
        pts2d.push([cv[0], cv[1]]);
      }
      avgZ /= idxs.length;

      this.polys.push({
        pts2d,
        fill,
        layer,
        avgZ,
        groundContact,
        isDecal: opts.isDecal ?? false,
      });
    }
  }

  /**
   * Add a flat 3D polygon decal (e.g. eye, brow, emblem, warpaint) sitting on a 3D plane.
   * Always double-sided / winding-safe so decals NEVER get accidentally culled!
   */
  addPoly3D(pts3d, opts = {}) {
    const wVerts = pts3d.map((v) => this.applyTransforms(v));
    const cVerts = wVerts.map((v) => this.toCamera(v));

    const p0 = wVerts[0];
    const p1 = wVerts[1];
    const p2 = wVerts[2];
    let worldN = norm3(cross3(sub3(p1, p0), sub3(p2, p0)));
    const cp0 = cVerts[0];
    const cp1 = cVerts[1];
    const cp2 = cVerts[2];
    const camN = norm3(cross3(sub3(cp1, cp0), sub3(cp2, cp0)));

    if (camN[2] < 0) worldN = scale3(worldN, -1);

    const fill = opts.unlit
      ? opts.color
      : shadeFlatColor(opts.color, worldN, opts.material ?? 'matte', opts.ao ?? 1.0);

    let avgZ = 0;
    const pts2d = [];
    for (const cv of cVerts) {
      avgZ += cv[2];
      pts2d.push([cv[0], cv[1]]);
    }
    avgZ /= cVerts.length;

    this.polys.push({
      pts2d,
      fill,
      layer: opts.layer ?? 7,
      avgZ: avgZ + (opts.zBias ?? 0.02),
      groundContact: false,
      isDecal: true,
    });
  }

  // ---- Primitives ----

  box(cx, cy, cz, w, h, d, opts = {}) {
    const hw = w / 2;
    const hh = h / 2;
    const hd = d / 2;
    const verts = [
      [cx - hw, cy - hh, cz + hd], // 0
      [cx + hw, cy - hh, cz + hd], // 1
      [cx + hw, cy + hh, cz + hd], // 2
      [cx - hw, cy + hh, cz + hd], // 3
      [cx - hw, cy - hh, cz - hd], // 4
      [cx + hw, cy - hh, cz - hd], // 5
      [cx + hw, cy + hh, cz - hd], // 6
      [cx - hw, cy + hh, cz - hd], // 7
    ];
    const faces = [
      [0, 1, 2, 3], // front (+Z)
      [5, 4, 7, 6], // back (-Z)
      [3, 2, 6, 7], // top (+Y)
      [4, 5, 1, 0], // bottom (-Y)
      [4, 0, 3, 7], // left (-X)
      [1, 5, 6, 2], // right (+X)
    ];
    this.addMesh(verts, faces, opts);
  }

  taperBox(cx, y0, cz, wBot, dBot, wTop, dTop, h, opts = {}) {
    const hb = wBot / 2;
    const db = dBot / 2;
    const ht = wTop / 2;
    const dt = dTop / 2;
    const y1 = y0 + h;
    const topOffX = opts.topOffX ?? 0;
    const topOffZ = opts.topOffZ ?? 0;
    const verts = [
      [cx - hb, y0, cz + db], // 0
      [cx + hb, y0, cz + db], // 1
      [cx + ht + topOffX, y1, cz + dt + topOffZ], // 2
      [cx - ht + topOffX, y1, cz + dt + topOffZ], // 3
      [cx - hb, y0, cz - db], // 4
      [cx + hb, y0, cz - db], // 5
      [cx + ht + topOffX, y1, cz - dt + topOffZ], // 6
      [cx - ht + topOffX, y1, cz - dt + topOffZ], // 7
    ];
    const faces = [
      [0, 1, 2, 3],
      [5, 4, 7, 6],
      [3, 2, 6, 7],
      [4, 5, 1, 0],
      [4, 0, 3, 7],
      [1, 5, 6, 2],
    ];
    this.addMesh(verts, faces, opts);
  }

  /**
   * Auto-orienting Z extrusion: guarantees outward normals regardless of CW or CCW input!
   */
  extrudeZ(ptsXY, zBack, zFront, opts = {}) {
    const n = ptsXY.length;
    let area = 0;
    for (let i = 0; i < n; i++) {
      const [x0, y0] = ptsXY[i];
      const [x1, y1] = ptsXY[(i + 1) % n];
      area += x0 * y1 - x1 * y0;
    }
    const ordered = area >= 0 ? ptsXY : [...ptsXY].reverse();

    const verts = [];
    for (const [x, y] of ordered) verts.push([x, y, zFront]); // 0..n-1
    for (const [x, y] of ordered) verts.push([x, y, zBack]); // n..2n-1

    const faces = [];
    faces.push(Array.from({ length: n }, (_, i) => i));
    faces.push(Array.from({ length: n }, (_, i) => n + (n - 1 - i)));
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      faces.push([i, n + i, n + j, j]);
    }
    this.addMesh(verts, faces, opts);
  }

  /**
   * Auto-orienting X extrusion: guarantees outward normals regardless of CW or CCW input!
   */
  extrudeX(ptsZY, xLeft, xRight, opts = {}) {
    const n = ptsZY.length;
    let area = 0;
    for (let i = 0; i < n; i++) {
      const [z0, y0] = ptsZY[i];
      const [z1, y1] = ptsZY[(i + 1) % n];
      area += z0 * y1 - z1 * y0;
    }
    const ordered = area < 0 ? ptsZY : [...ptsZY].reverse();

    const verts = [];
    for (const [z, y] of ordered) verts.push([xRight, y, z]); // 0..n-1 (+X normal)
    for (const [z, y] of ordered) verts.push([xLeft, y, z]); // n..2n-1 (-X normal)

    const faces = [];
    faces.push(Array.from({ length: n }, (_, i) => i));
    faces.push(Array.from({ length: n }, (_, i) => n + (n - 1 - i)));
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      faces.push([i, n + i, n + j, j]);
    }
    this.addMesh(verts, faces, opts);
  }

  cylinder(cx, cy, cz, rBot, rTop, h, sides = 8, axis = 'y', opts = {}) {
    const hh = h / 2;
    const verts = [];
    const angleOff = opts.angleOff ?? Math.PI / sides;
    for (let i = 0; i < sides; i++) {
      const a = (i / sides) * Math.PI * 2 + angleOff;
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      if (axis === 'y') verts.push([cx + ca * rBot, cy - hh, cz + sa * rBot]);
      else if (axis === 'x') verts.push([cx - hh, cy + ca * rBot, cz + sa * rBot]);
      else verts.push([cx + ca * rBot, cy + sa * rBot, cz - hh]);
    }
    for (let i = 0; i < sides; i++) {
      const a = (i / sides) * Math.PI * 2 + angleOff;
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      if (axis === 'y') verts.push([cx + ca * rTop, cy + hh, cz + sa * rTop]);
      else if (axis === 'x') verts.push([cx + hh, cy + ca * rTop, cz + sa * rTop]);
      else verts.push([cx + ca * rTop, cy + sa * rTop, cz + hh]);
    }

    const faces = [];
    if (axis === 'z') {
      faces.push(Array.from({ length: sides }, (_, i) => sides - 1 - i));
      faces.push(Array.from({ length: sides }, (_, i) => sides + i));
      for (let i = 0; i < sides; i++) {
        const j = (i + 1) % sides;
        faces.push([i, j, sides + j, sides + i]);
      }
    } else {
      faces.push(Array.from({ length: sides }, (_, i) => i));
      faces.push(Array.from({ length: sides }, (_, i) => sides + (sides - 1 - i)));
      for (let i = 0; i < sides; i++) {
        const j = (i + 1) % sides;
        faces.push([i, sides + i, sides + j, j]);
      }
    }
    this.addMesh(verts, faces, opts);
  }

  pyramid(cx, y0, cz, rx, rz, h, opts = {}) {
    const tipX = cx + (opts.tipOffX ?? 0);
    const tipZ = cz + (opts.tipOffZ ?? 0);
    const y1 = y0 + h;
    const verts = [
      [cx - rx, y0, cz + rz],
      [cx + rx, y0, cz + rz],
      [cx + rx, y0, cz - rz],
      [cx - rx, y0, cz - rz],
      [tipX, y1, tipZ],
    ];
    const faces =
      h >= 0
        ? [
            [0, 1, 4],
            [1, 2, 4],
            [2, 3, 4],
            [3, 0, 4],
            [3, 2, 1, 0],
          ]
        : [
            [1, 0, 4],
            [2, 1, 4],
            [3, 2, 4],
            [0, 3, 4],
            [0, 1, 2, 3],
          ];
    this.addMesh(verts, faces, opts);
  }

  octahedron(cx, cy, cz, rx, ry, rz, opts = {}) {
    const verts = [
      [cx, cy + ry, cz],
      [cx, cy - ry, cz],
      [cx, cy, cz + rz],
      [cx + rx, cy, cz],
      [cx, cy, cz - rz],
      [cx - rx, cy, cz],
    ];
    const faces = [
      [0, 5, 2],
      [0, 2, 3],
      [0, 3, 4],
      [0, 4, 5],
      [1, 2, 5],
      [1, 3, 2],
      [1, 4, 3],
      [1, 5, 4],
    ];
    this.addMesh(verts, faces, opts);
  }

  toSVG(idLabel = '') {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    let groundMinY = Infinity;

    for (const poly of this.polys) {
      for (const [px, py] of poly.pts2d) {
        if (px < minX) minX = px;
        if (px > maxX) maxX = px;
        if (py < minY) minY = py;
        if (py > maxY) maxY = py;
        if (poly.groundContact && py < groundMinY) groundMinY = py;
      }
    }

    const anchorMinY = groundMinY < Infinity ? groundMinY : minY;

    const rawW = (maxX - minX) * this.scale;
    const rawH = (maxY - anchorMinY) * this.scale;
    let effScale = this.scale;
    if (rawW > 468) effScale = Math.min(effScale, 468 / (maxX - minX));
    if (rawH > 464) effScale = Math.min(effScale, 464 / (maxY - anchorMinY));

    const centerX = CANVAS_SIZE / 2 - ((minX + maxX) / 2) * effScale;
    const groundY = GROUND_ANCHOR_Y + anchorMinY * effScale;

    const sorted = [...this.polys].sort((a, b) => {
      if (a.layer !== b.layer) return a.layer - b.layer;
      return a.avgZ - b.avgZ;
    });

    const lines = [
      `<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" viewBox="0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}" data-sprite="${idLabel}">`,
    ];

    for (const poly of sorted) {
      const pts = poly.pts2d
        .map(([px, py]) => {
          const sx = (centerX + px * effScale).toFixed(1);
          const sy = (groundY - py * effScale).toFixed(1);
          return `${sx},${sy}`;
        })
        .join(' ');
      if (poly.isDecal) {
        lines.push(`  <polygon points="${pts}" fill="${poly.fill}"/>`);
      } else {
        lines.push(
          `  <polygon points="${pts}" fill="${poly.fill}" stroke="${poly.fill}" stroke-width="0.65" stroke-linejoin="round"/>`
        );
      }
    }

    lines.push('</svg>');
    return lines.join('\n') + '\n';
  }
}

// ============================================================================
// Faction Palettes (Synced with src/game/data/factions.ts)
// ============================================================================

const PAL = {
  humans: {
    primary: '#2563eb',
    primaryDark: '#1d4ed8',
    navy: '#1e3a8a',
    steel: '#dce6f2',
    steelMid: '#b6c6d9',
    gold: '#f5b82e',
    skin: '#f0ba93',
    cheek: '#e39678',
    hair: '#6b4226',
    leather: '#6d442a',
    wood: '#8b5a2b',
    rohanGreen: '#2f6f44',
    horseBrown: '#8b522c',
    horseMane: '#472814',
    whiteHorse: '#f3f6fa',
    plumeRed: '#dc2626',
  },
  orcs: {
    primary: '#dc2626',
    crimsonDark: '#881313',
    skin: '#6a7652',
    skinDark: '#515c3e',
    skinSnout: '#5b6745',
    urukSkin: '#68544b', // Rich dark charcoal-umber so White Hand & amber eyes POP!
    urukDark: '#4d3d36',
    iron: '#454954',
    rust: '#7c3f2c',
    tusk: '#f0de9a',
    eyeGlow: '#fbbf24',
    eyeRim: '#241212',
    leather: '#3b2b25',
    wood: '#4a352a',
    warg: '#484d56',
    wargDark: '#2c3038',
    whiteHand: '#ffffff',
    magma: '#f97316',
    magmaHot: '#fde047',
  },
  elves: {
    primary: '#10b981',
    emeraldDark: '#047857',
    ivory: '#f5f0e1',
    gold: '#facc15',
    goldDeep: '#d99e16',
    steel: '#e6eef5',
    skin: '#f6d4bc',
    cheek: '#ebb09c',
    hairGold: '#f3d882',
    hairSilver: '#e6e8f0',
    wood: '#c89b52',
    horseWhite: '#f5f8fc',
    starlight: '#38bdf8',
    starlightCore: '#e0f2fe',
    eye: '#0f4c5c',
  },
  dwarves: {
    primary: '#d97706',
    bronzeDark: '#9a4e0c',
    steel: '#8899ad',
    mithril: '#d8e3ef',
    tunic: '#9a3412',
    tunicSlate: '#475569',
    skin: '#efb594',
    noseRosy: '#e08972',
    beardCopper: '#c95c21',
    beardGold: '#e09a2b',
    beardBrown: '#6e3f23',
    leather: '#5c3822',
    wood: '#7a4b26',
    ramWool: '#dfd8cb',
    ramDark: '#6b645c',
    ramHorn: '#e5a832',
  },
};

// ============================================================================
// Shared Expressive Polytopia Face Renderer (Projected onto 3D Head Front Plane)
// ============================================================================

function drawPolytopiaFace(scene, faction, head, opts = {}) {
  const { w, h, d } = head;
  const fz = d / 2 + 0.012;
  const layerDecal = opts.layerDecal ?? 7.0;
  const layer3D = opts.layer3D ?? 7.4;

  const rect = (cx, cy, rw, rh, color, zOff = 0, unlit = true, lyr = layerDecal) => {
    const hw = rw / 2;
    const hh = rh / 2;
    const z = fz + zOff;
    scene.addPoly3D(
      [
        [cx - hw, cy - hh, z],
        [cx + hw, cy - hh, z],
        [cx + hw, cy + hh, z],
        [cx - hw, cy + hh, z],
      ],
      { color, unlit, layer: lyr, zBias: 0.02 + zOff }
    );
  };

  const poly = (pts2, color, zOff = 0, unlit = true, lyr = layerDecal) => {
    const z = fz + zOff;
    scene.addPoly3D(
      pts2.map(([x, y]) => [x, y, z]),
      { color, unlit, layer: lyr, zBias: 0.02 + zOff }
    );
  };

  const eyeY = h * 0.04;
  const eyeSep = w * 0.23;

  if (faction === 'humans') {
    const p = PAL.humans;
    rect(-eyeSep * 1.15, -h * 0.12, w * 0.14, h * 0.08, p.cheek, 0.002);
    rect(eyeSep * 1.15, -h * 0.12, w * 0.14, h * 0.08, p.cheek, 0.002);

    const ew = w * 0.135;
    const eh = h * 0.16;
    rect(-eyeSep, eyeY, ew, eh, '#182032', 0.005);
    rect(eyeSep, eyeY, ew, eh, '#182032', 0.005);
    rect(-eyeSep - ew * 0.2, eyeY + eh * 0.2, ew * 0.36, eh * 0.34, '#ffffff', 0.01);
    rect(eyeSep - ew * 0.2, eyeY + eh * 0.2, ew * 0.36, eh * 0.34, '#ffffff', 0.01);

    // Determined chestnut eyebrows
    poly(
      [
        [-eyeSep - ew * 0.65, eyeY + eh * 0.72],
        [-eyeSep + ew * 0.65, eyeY + eh * 0.56],
        [-eyeSep + ew * 0.65, eyeY + eh * 0.94],
        [-eyeSep - ew * 0.65, eyeY + eh * 1.08],
      ],
      p.hair,
      0.012
    );
    poly(
      [
        [eyeSep - ew * 0.65, eyeY + eh * 0.56],
        [eyeSep + ew * 0.65, eyeY + eh * 0.72],
        [eyeSep + ew * 0.65, eyeY + eh * 1.08],
        [eyeSep - ew * 0.65, eyeY + eh * 0.94],
      ],
      p.hair,
      0.012
    );

    // Crisp 3D low-poly nose prism
    scene.box(0, -h * 0.07, d / 2 + 0.045, w * 0.12, h * 0.14, 0.09, {
      color: '#e5a47c',
      material: 'skin',
      layer: layer3D,
    });

    if (opts.cleanShaven) {
      rect(0, -h * 0.26, w * 0.24, h * 0.055, '#8a4b38', 0.008);
    } else {
      scene.box(0, -h * 0.34, d / 2 + 0.02, w * 0.68, h * 0.26, 0.08, {
        color: p.hair,
        material: 'matte',
        layer: layer3D,
      });
      scene.box(0, -h * 0.44, d / 2 + 0.025, w * 0.44, h * 0.14, 0.09, {
        color: p.hair,
        material: 'matte',
        layer: layer3D,
      });
      rect(0, -h * 0.26, w * 0.22, h * 0.055, '#f2c3a4', 0.065, true, layer3D + 0.1);
    }
  } else if (faction === 'orcs') {
    const p = PAL.orcs;
    const isUruk = !!opts.isUruk;
    const skinTone = isUruk ? p.urukSkin : p.skin;
    const darkSkin = isUruk ? p.urukDark : p.skinDark;
    const snoutTone = isUruk ? '#56443d' : p.skinSnout;

    // 1. Angry V-FURROWED 3D BROW RIDGE (angled down in center for fierce ugly orc scowl!)
    scene.box(-w * 0.23, h * 0.24, d / 2 + 0.055, w * 0.48, h * 0.15, 0.12, {
      color: darkSkin,
      material: 'skin',
      layer: layer3D + 0.15,
      tf: { pivot: [-w * 0.23, h * 0.24, d / 2 + 0.055], rotZ: -11 },
    });
    scene.box(w * 0.23, h * 0.24, d / 2 + 0.055, w * 0.48, h * 0.15, 0.12, {
      color: darkSkin,
      material: 'skin',
      layer: layer3D + 0.15,
      tf: { pivot: [w * 0.23, h * 0.24, d / 2 + 0.055], rotZ: 11 },
    });

    // 2. Jagged battle scar + warty lump
    poly(
      [
        [eyeSep + w * 0.05, eyeY + h * 0.16],
        [eyeSep + w * 0.13, eyeY + h * 0.16],
        [eyeSep - w * 0.05, -h * 0.24],
        [eyeSep - w * 0.11, -h * 0.22],
      ],
      '#3a1816',
      0.004
    );
    scene.box(-w * 0.36, -h * 0.12, d / 2 + 0.025, w * 0.1, h * 0.09, 0.05, {
      color: darkSkin,
      material: 'skin',
      layer: layer3D,
    });

    // 3. ANGRY V-SLANTED GLOWING AMBER EYES (super bold & readable!)
    const ew = w * 0.22;
    const eh = h * 0.165;
    // Dark eye sockets
    poly(
      [
        [-eyeSep - ew * 0.62, eyeY + eh * 0.62],
        [-eyeSep + ew * 0.58, eyeY + eh * 0.1],
        [-eyeSep + ew * 0.52, eyeY - eh * 0.68],
        [-eyeSep - ew * 0.56, eyeY - eh * 0.44],
      ],
      p.eyeRim,
      0.006,
      true,
      layerDecal
    );
    poly(
      [
        [eyeSep - ew * 0.58, eyeY + eh * 0.1],
        [eyeSep + ew * 0.62, eyeY + eh * 0.62],
        [eyeSep + ew * 0.56, eyeY - eh * 0.44],
        [eyeSep - ew * 0.52, eyeY - eh * 0.68],
      ],
      p.eyeRim,
      0.006,
      true,
      layerDecal
    );
    // Glowing Amber Irises!
    poly(
      [
        [-eyeSep - ew * 0.46, eyeY + eh * 0.44],
        [-eyeSep + ew * 0.44, eyeY + eh * 0.02],
        [-eyeSep + ew * 0.38, eyeY - eh * 0.48],
        [-eyeSep - ew * 0.42, eyeY - eh * 0.26],
      ],
      p.eyeGlow,
      0.014,
      true,
      layerDecal + 0.05
    );
    poly(
      [
        [eyeSep - ew * 0.44, eyeY + eh * 0.02],
        [eyeSep + ew * 0.46, eyeY + eh * 0.44],
        [eyeSep + ew * 0.42, eyeY - eh * 0.26],
        [eyeSep - ew * 0.38, eyeY - eh * 0.48],
      ],
      p.eyeGlow,
      0.014,
      true,
      layerDecal + 0.05
    );
    // Fierce dark vertical slit pupils
    rect(-eyeSep + 0.01, eyeY - 0.01, ew * 0.22, eh * 0.62, '#1a0a08', 0.022, true, layerDecal + 0.1);
    rect(eyeSep - 0.01, eyeY - 0.01, ew * 0.22, eh * 0.62, '#1a0a08', 0.022, true, layerDecal + 0.1);

    // 4. HIDEOUS FLAT UPTURNED PIG-LIKE SNOUT (3D snout block + dark oval nostrils!)
    scene.taperBox(0, -h * 0.14, d / 2 + 0.04, w * 0.36, 0.14, w * 0.28, 0.11, h * 0.17, {
      color: snoutTone,
      material: 'skin',
      layer: layer3D + 0.05,
    });
    rect(-w * 0.072, -h * 0.055, w * 0.07, h * 0.08, '#1e1412', 0.12, true, layer3D + 0.22);
    rect(w * 0.072, -h * 0.055, w * 0.07, h * 0.08, '#1e1412', 0.12, true, layer3D + 0.22);

    // 5. Heavy jutting underbite jaw + wide snarling mouth
    scene.box(0, -h * 0.34, d / 2 + 0.045, w * 0.88, h * 0.22, 0.12, {
      color: skinTone,
      material: 'skin',
      layer: layer3D,
    });
    poly(
      [
        [-w * 0.35, -h * 0.21],
        [w * 0.35, -h * 0.24],
        [w * 0.31, -h * 0.37],
        [-w * 0.31, -h * 0.35],
      ],
      '#1e0c0d',
      0.112,
      true,
      layer3D + 0.16
    );
    rect(-w * 0.07, -h * 0.26, w * 0.075, h * 0.075, p.tusk, 0.118, true, layer3D + 0.19);
    rect(w * 0.08, -h * 0.27, w * 0.07, h * 0.07, p.tusk, 0.118, true, layer3D + 0.19);

    // 6. BIG CROOKED ASYMMETRICAL YELLOW-IVORY UNDERBITE TUSKS!
    scene.pyramid(-w * 0.25, -h * 0.35, d / 2 + 0.115, w * 0.072, 0.058, h * 0.34, {
      tipOffX: -w * 0.08,
      tipOffZ: 0.05,
      color: p.tusk,
      material: 'matte',
      layer: layer3D + 0.3,
    });
    scene.pyramid(w * 0.24, -h * 0.36, d / 2 + 0.11, w * 0.065, 0.052, h * 0.25, {
      tipOffX: w * 0.06,
      tipOffZ: 0.04,
      color: '#dfd088',
      material: 'matte',
      layer: layer3D + 0.3,
    });

    // 7. Jagged ragged pointy Orc ears sticking out cleanly on both sides!
    scene.extrudeZ(
      [
        [-w * 0.48, h * 0.06],
        [-w * 0.78, h * 0.2],
        [-w * 0.66, h * 0.04],
        [-w * 0.74, -h * 0.05],
        [-w * 0.48, -h * 0.1],
      ],
      -0.06,
      0.06,
      { color: skinTone, material: 'skin', layer: 5.9 }
    );
    scene.extrudeZ(
      [
        [w * 0.48, h * 0.06],
        [w * 0.78, h * 0.18],
        [w * 0.66, -h * 0.04],
        [w * 0.48, -h * 0.1],
      ],
      -0.06,
      0.06,
      { color: skinTone, material: 'skin', layer: 6.3 }
    );

    // 8. UNMISTAKABLE BOLD WHITE HAND OF SARUMAN warpaint across Uruk-hai Berserker's face!
    if (isUruk) {
      const whLayer = layer3D + 0.4;
      const whCol = '#f1f5f9';
      // Palm cleanly across right cheek & brow
      poly(
        [
          [w * 0.04, -h * 0.24],
          [w * 0.4, -h * 0.2],
          [w * 0.42, h * 0.04],
          [w * 0.03, h * 0.02],
        ],
        whCol,
        0.132,
        true,
        whLayer
      );
      // 4 fingers + thumb splaying cleanly across forehead & snout
      const fingers = [
        [w * 0.05, h * 0.02, -w * 0.05, h * 0.39],
        [w * 0.15, h * 0.03, w * 0.11, h * 0.45],
        [w * 0.25, h * 0.04, w * 0.28, h * 0.44],
        [w * 0.35, h * 0.03, w * 0.43, h * 0.36],
        [w * 0.04, -h * 0.08, -w * 0.22, h * 0.03],
      ];
      for (const [x0, y0, x1, y1] of fingers) {
        const dx = x1 - x0;
        const dy = y1 - y0;
        const l = Math.hypot(dx, dy) || 1;
        const nx = (-dy / l) * (w * 0.038);
        const ny = (dx / l) * (w * 0.038);
        poly(
          [
            [x0 - nx, y0 - ny],
            [x0 + nx, y0 + ny],
            [x1 + nx * 0.7, y1 + ny * 0.7],
            [x1 - nx * 0.7, y1 - ny * 0.7],
          ],
          whCol,
          0.136,
          true,
          whLayer + 0.02
        );
      }
      // Keep right dark eye socket + glowing amber eye blazing sharply THROUGH the White Hand!
      poly(
        [
          [eyeSep - ew * 0.56, eyeY + eh * 0.1],
          [eyeSep + ew * 0.58, eyeY + eh * 0.58],
          [eyeSep + ew * 0.54, eyeY - eh * 0.42],
          [eyeSep - ew * 0.5, eyeY - eh * 0.64],
        ],
        p.eyeRim,
        0.14,
        true,
        whLayer + 0.04
      );
      poly(
        [
          [eyeSep - ew * 0.42, eyeY + eh * 0.02],
          [eyeSep + ew * 0.44, eyeY + eh * 0.42],
          [eyeSep + ew * 0.4, eyeY - eh * 0.24],
          [eyeSep - ew * 0.36, eyeY - eh * 0.46],
        ],
        p.eyeGlow,
        0.144,
        true,
        whLayer + 0.06
      );
      rect(eyeSep - 0.01, eyeY - 0.01, ew * 0.22, eh * 0.58, '#1a0a08', 0.15, true, whLayer + 0.09);
    }
  } else if (faction === 'elves') {
    const p = PAL.elves;
    rect(-eyeSep * 1.18, -h * 0.13, w * 0.14, h * 0.07, p.cheek, 0.002);
    rect(eyeSep * 1.18, -h * 0.13, w * 0.14, h * 0.07, p.cheek, 0.002);

    // Bright keen graceful Elven eyes (deep emerald-teal with crisp sparkling catchlights!)
    const ew = w * 0.15;
    const eh = h * 0.165;
    poly(
      [
        [-eyeSep - ew * 0.56, eyeY + eh * 0.45],
        [-eyeSep + ew * 0.5, eyeY + eh * 0.5],
        [-eyeSep + ew * 0.46, eyeY - eh * 0.5],
        [-eyeSep - ew * 0.48, eyeY - eh * 0.45],
      ],
      p.eye,
      0.006,
      true,
      layerDecal
    );
    poly(
      [
        [eyeSep - ew * 0.5, eyeY + eh * 0.5],
        [eyeSep + ew * 0.56, eyeY + eh * 0.45],
        [eyeSep + ew * 0.48, eyeY - eh * 0.45],
        [eyeSep - ew * 0.46, eyeY - eh * 0.5],
      ],
      p.eye,
      0.006,
      true,
      layerDecal
    );
    rect(-eyeSep - ew * 0.18, eyeY + eh * 0.2, ew * 0.36, eh * 0.34, '#ffffff', 0.014, true, layerDecal + 0.06);
    rect(eyeSep - ew * 0.18, eyeY + eh * 0.2, ew * 0.36, eh * 0.34, '#ffffff', 0.014, true, layerDecal + 0.06);

    // Serene arched eyebrows
    const browColor = opts.hairColor === PAL.elves.hairSilver ? '#8d96a6' : '#b68a32';
    poly(
      [
        [-eyeSep - ew * 0.68, eyeY + eh * 0.68],
        [-eyeSep, eyeY + eh * 0.96],
        [-eyeSep + ew * 0.65, eyeY + eh * 0.72],
        [-eyeSep + ew * 0.65, eyeY + eh * 0.95],
        [-eyeSep, eyeY + eh * 1.18],
        [-eyeSep - ew * 0.68, eyeY + eh * 0.92],
      ],
      browColor,
      0.014,
      true,
      layerDecal + 0.06
    );
    poly(
      [
        [eyeSep - ew * 0.65, eyeY + eh * 0.72],
        [eyeSep, eyeY + eh * 0.96],
        [eyeSep + ew * 0.68, eyeY + eh * 0.68],
        [eyeSep + ew * 0.68, eyeY + eh * 0.92],
        [eyeSep, eyeY + eh * 1.18],
        [eyeSep - ew * 0.65, eyeY + eh * 0.95],
      ],
      browColor,
      0.014,
      true,
      layerDecal + 0.06
    );

    // Delicate sleek nose prism
    scene.box(0, -h * 0.07, d / 2 + 0.035, w * 0.095, h * 0.13, 0.07, {
      color: '#ebc2a6',
      material: 'skin',
      layer: layer3D,
    });

    // Calm serene mouth
    poly(
      [
        [-w * 0.14, -h * 0.24],
        [0, -h * 0.275],
        [w * 0.14, -h * 0.24],
        [w * 0.1, -h * 0.3],
        [0, -h * 0.32],
        [-w * 0.1, -h * 0.3],
      ],
      '#c97d6b',
      0.008,
      true,
      layerDecal + 0.04
    );

    // DISTINCT GEOMETRIC POINTED ELVEN EARS angling cleanly out from BOTH sides!
    scene.extrudeZ(
      [
        [-w * 0.48, h * 0.06],
        [-w * 0.9, h * 0.28],
        [-w * 0.56, -h * 0.12],
        [-w * 0.48, -h * 0.1],
      ],
      -0.05,
      0.05,
      { color: p.skin, material: 'skin', layer: 5.9 }
    );
    scene.extrudeZ(
      [
        [w * 0.48, h * 0.06],
        [w * 0.9, h * 0.28],
        [w * 0.56, -h * 0.12],
        [w * 0.48, -h * 0.1],
      ],
      -0.05,
      0.05,
      { color: p.skin, material: 'skin', layer: 6.3 }
    );
  } else if (faction === 'dwarves') {
    const p = PAL.dwarves;
    const beardCol = opts.beardColor ?? p.beardCopper;

    // Bright determined dwarf eyes + catchlights
    const ew = w * 0.135;
    const eh = h * 0.155;
    rect(-eyeSep, eyeY + h * 0.02, ew, eh, '#182032', 0.006);
    rect(eyeSep, eyeY + h * 0.02, ew, eh, '#182032', 0.006);
    rect(-eyeSep - ew * 0.2, eyeY + h * 0.02 + eh * 0.2, ew * 0.36, eh * 0.34, '#ffffff', 0.014, true, layerDecal + 0.06);
    rect(eyeSep - ew * 0.2, eyeY + h * 0.02 + eh * 0.2, ew * 0.36, eh * 0.34, '#ffffff', 0.014, true, layerDecal + 0.06);

    // Thick BUSHY stern dwarf eyebrows (3D extruded blocks!)
    scene.box(-eyeSep, eyeY + eh * 0.94, d / 2 + 0.04, ew * 1.9, eh * 0.62, 0.09, {
      color: beardCol,
      material: 'matte',
      layer: layer3D + 0.15,
      tf: { pivot: [-eyeSep, eyeY + eh * 0.94, d / 2 + 0.04], rotZ: -10 },
    });
    scene.box(eyeSep, eyeY + eh * 0.94, d / 2 + 0.04, ew * 1.9, eh * 0.62, 0.09, {
      color: beardCol,
      material: 'matte',
      layer: layer3D + 0.15,
      tf: { pivot: [eyeSep, eyeY + eh * 0.94, d / 2 + 0.04], rotZ: 10 },
    });

    // Rosy cheeks
    rect(-eyeSep * 1.2, -h * 0.1, w * 0.16, h * 0.1, p.noseRosy, 0.003);
    rect(eyeSep * 1.2, -h * 0.1, w * 0.16, h * 0.1, p.noseRosy, 0.003);

    // CHUNKY ROSY DWARF NOSE PRISM!
    scene.box(0, -h * 0.05, d / 2 + 0.075, w * 0.22, h * 0.2, 0.15, {
      color: p.noseRosy,
      material: 'skin',
      layer: layer3D + 0.25,
    });
  }
}

// ============================================================================
// Reusable Low-Poly Components (Beards, Helmets, Weapons, Shields, Mounts)
// ============================================================================

function drawDwarfBeard(scene, head, beardColor, claspColor = PAL.dwarves.primary, layer = 8) {
  const { w, h, d } = head;
  const fz = d / 2 + 0.05;

  // Center long braided taper + bronze clasp ring (bottom first -> upper beard -> mustache on top!)
  scene.pyramid(0, -h * 1.18, fz + 0.02, w * 0.14, 0.07, -h * 0.18, {
    color: beardColor,
    material: 'matte',
    layer,
  });
  scene.taperBox(0, -h * 1.18, fz + 0.02, w * 0.28, 0.14, w * 0.56, 0.2, h * 0.48, {
    color: beardColor,
    material: 'matte',
    layer: layer + 0.05,
  });
  scene.box(0, -h * 1.04, fz + 0.03, w * 0.36, h * 0.11, 0.2, {
    color: claspColor,
    material: 'gold',
    layer: layer + 0.12,
  });

  // Side braids (left & right) with bronze clasps!
  for (const side of [-1, 1]) {
    const bx = side * w * 0.38;
    scene.taperBox(bx, -h * 1.04, fz - 0.01, w * 0.18, 0.12, w * 0.26, 0.16, h * 0.42, {
      color: beardColor,
      material: 'matte',
      layer: layer + 0.04,
    });
    scene.box(bx, -h * 0.94, fz, w * 0.24, h * 0.09, 0.17, {
      color: claspColor,
      material: 'gold',
      layer: layer + 0.1,
    });
  }

  // Main broad faceted upper beard block (cleanly overlaps top of braids!)
  scene.taperBox(0, -h * 0.72, fz - 0.01, w * 0.92, 0.2, w * 1.06, 0.24, h * 0.48, {
    color: beardColor,
    material: 'matte',
    layer: layer + 0.2,
  });

  // Big sweeping 3D mustache wings under chunky nose
  scene.box(-w * 0.24, -h * 0.22, fz + 0.045, w * 0.44, h * 0.17, 0.12, {
    color: beardColor,
    material: 'matte',
    layer: layer + 0.32,
    tf: { pivot: [-w * 0.24, -h * 0.22, fz + 0.045], rotZ: 16 },
  });
  scene.box(w * 0.24, -h * 0.22, fz + 0.045, w * 0.44, h * 0.17, 0.12, {
    color: beardColor,
    material: 'matte',
    layer: layer + 0.32,
    tf: { pivot: [w * 0.24, -h * 0.22, fz + 0.045], rotZ: -16 },
  });
}

/**
 * Iconic Gondor / Rohan Human Helmets (strictly bottom-to-top stacking — ZERO shelf artifacts!)
 */
function drawHumanHelmet(scene, head, style = 'winged', layer = 9) {
  const p = PAL.humans;
  const { w, h, d } = head;
  const hw = w / 2;
  const hh = h / 2;
  const hd = d / 2;

  if (style === 'ranger_hood') {
    // Gold brow band at bottom -> Blue Ranger Hood stacked cleanly ON TOP!
    scene.box(0, hh + 0.02, 0.01, w * 1.15, h * 0.12, d * 1.12, {
      color: p.gold,
      material: 'gold',
      layer: layer,
    });
    scene.taperBox(0, hh + 0.08, -0.02, w * 1.16, d * 1.14, w * 0.84, d * 0.9, h * 0.36, {
      color: p.primary,
      material: 'matte',
      layer: layer + 0.1,
    });
    scene.pyramid(0, hh + h * 0.16, -hd * 0.52, w * 0.34, d * 0.36, h * 0.3, {
      tipOffZ: -0.34,
      color: p.primaryDark,
      material: 'matte',
      layer: layer - 0.1,
    });
    return;
  }

  // Side cheek guards tucked cleanly along the sides/back of the head — NEVER covering eyes!
  scene.box(-hw - 0.04, -h * 0.06, -0.14, 0.1, h * 0.62, d * 0.56, {
    color: p.steel,
    material: 'metal',
    layer: 5.9, // Far side (-X) behind head cube
  });
  scene.box(hw + 0.04, -h * 0.06, -0.14, 0.1, h * 0.62, d * 0.56, {
    color: p.steel,
    material: 'metal',
    layer: 6.4, // Near side (+X) cleanly behind face plane!
  });

  // 1. Gold brow rim (base of helmet, layer + 0.0)
  scene.box(0, hh + 0.02, 0.02, w * 1.16, h * 0.11, d * 1.14, {
    color: style === 'cap' ? p.primary : p.gold,
    material: style === 'cap' ? 'matte' : 'gold',
    layer: layer,
  });

  // 2. Silver dome band + fluted conical crown stacked cleanly ON TOP (layer + 0.1 -> + 0.2)
  const domeCol = style === 'rohirrim_plume' ? p.gold : p.steel;
  const domeMat = style === 'rohirrim_plume' ? 'gold' : 'metal';
  scene.box(0, hh + h * 0.14, 0, w * 1.12, h * 0.16, d * 1.12, {
    color: domeCol,
    material: domeMat,
    layer: layer + 0.1,
  });
  scene.taperBox(0, hh + h * 0.22, 0, w * 1.06, d * 1.06, w * 0.48, d * 0.52, h * 0.4, {
    color: domeCol,
    material: domeMat,
    layer: layer + 0.2,
  });

  if (style === 'winged') {
    // Iconic bold sculpted geometric Gondor Silver Wings (two crisp layered convex blades per side!)
    for (const side of [-1, 1]) {
      const s = side;
      // Primary tall upper wing feather
      scene.extrudeZ(
        [
          [s * hw * 0.88, hh + 0.1],
          [s * hw * 1.78, hh + h * 0.96],
          [s * hw * 1.24, hh + h * 0.66],
          [s * hw * 0.88, hh + 0.36],
        ],
        -0.06,
        0.06,
        {
          color: '#f1f5fb',
          material: 'metal',
          layer: side < 0 ? layer + 0.06 : layer + 0.34,
        }
      );
      // Secondary fanned lower wing feather
      scene.extrudeZ(
        [
          [s * hw * 0.88, hh + 0.06],
          [s * hw * 1.56, hh + h * 0.56],
          [s * hw * 1.18, hh + h * 0.34],
          [s * hw * 0.88, hh + 0.22],
        ],
        -0.05,
        0.05,
        {
          color: p.steel,
          material: 'metal',
          layer: side < 0 ? layer + 0.04 : layer + 0.32,
        }
      );
    }
    scene.pyramid(0, hh + h * 0.62, 0, w * 0.16, d * 0.16, h * 0.26, {
      color: p.gold,
      material: 'gold',
      layer: layer + 0.3,
    });
  } else if (style === 'defender_crest') {
    // Tall regal gold-and-blue Citadel Guard crest stacked cleanly ON TOP!
    scene.extrudeX(
      [
        [hd * 0.52, hh + h * 0.38],
        [hd * 0.08, hh + h * 0.98],
        [-hd * 0.74, hh + h * 0.82],
        [-hd * 0.88, hh + h * 0.26],
        [-hd * 0.35, hh + h * 0.32],
      ],
      -0.09,
      0.09,
      { color: p.gold, material: 'gold', layer: layer + 0.3 }
    );
    scene.box(0, hh + h * 0.52, 0.04, w * 0.22, h * 0.28, d * 0.58, {
      color: p.primary,
      material: 'matte',
      layer: layer + 0.34,
    });
  } else if (style === 'rohirrim_plume') {
    // Sweeping crimson horsehair plume arching proudly over golden Rohan helm!
    scene.extrudeX(
      [
        [hd * 0.28, hh + h * 0.56],
        [hd * 0.06, hh + h * 1.12],
        [-hd * 0.85, hh + h * 1.06],
        [-hd * 1.48, hh + h * 0.48],
        [-hd * 1.14, hh + h * 0.3],
        [-hd * 0.55, hh + h * 0.64],
      ],
      -0.12,
      0.12,
      { color: p.plumeRed, material: 'matte', layer: layer + 0.32 }
    );
    // Gold noseguard
    scene.box(0, h * 0.16, hd + 0.055, w * 0.11, h * 0.28, 0.06, {
      color: p.gold,
      material: 'gold',
      layer: layer + 0.34,
    });
  } else if (style === 'cap') {
    scene.pyramid(0, hh + h * 0.62, 0, w * 0.16, d * 0.16, h * 0.22, {
      color: p.gold,
      material: 'gold',
      layer: layer + 0.3,
    });
  }
}

/**
 * Brutal Jagged Mordor / Isengard Orc Helmets (strictly bottom-to-top stacking!)
 */
function drawOrcHelmet(scene, head, style = 'horned', layer = 9) {
  const p = PAL.orcs;
  const { w, h, d } = head;
  const hw = w / 2;
  const hh = h / 2;

  if (style === 'uruk') {
    // Cheekplates tucked cleanly behind face plane so White Hand + eyes stay 100% open!
    scene.box(-hw - 0.04, -h * 0.02, -0.14, 0.11, h * 0.52, d * 0.54, {
      color: p.iron,
      material: 'dark_metal',
      layer: 5.9,
    });
    scene.box(hw + 0.04, -h * 0.02, -0.14, 0.11, h * 0.52, d * 0.54, {
      color: p.iron,
      material: 'dark_metal',
      layer: 6.4,
    });
    // 1. Crimson iron brow band (bottom)
    scene.box(0, hh + 0.04, 0.01, w * 1.16, h * 0.1, d * 1.14, {
      color: p.primary,
      material: 'matte',
      layer: layer,
    });
    // 2. Brutal Isengard iron dome ON TOP
    scene.box(0, hh + h * 0.16, -0.01, w * 1.14, h * 0.18, d * 1.12, {
      color: p.iron,
      material: 'dark_metal',
      layer: layer + 0.1,
    });
    scene.taperBox(0, hh + h * 0.25, -0.01, w * 1.06, d * 1.06, w * 0.68, d * 0.68, h * 0.32, {
      color: '#343740',
      material: 'dark_metal',
      layer: layer + 0.2,
    });
    // 3. Jagged Isengard iron crest fin ON TOP!
    scene.extrudeX(
      [
        [d * 0.46, hh + h * 0.42],
        [d * 0.18, hh + h * 0.94],
        [-d * 0.26, hh + h * 0.74],
        [-d * 0.64, hh + h * 0.96],
        [-d * 0.66, hh + h * 0.32],
      ],
      -0.075,
      0.075,
      { color: p.iron, material: 'dark_metal', layer: layer + 0.32 }
    );
    return;
  }

  // 1. Rusty / Crimson brow rim at base (layer + 0.0)
  const rimCol = style === 'horned' ? p.rust : p.primary;
  scene.box(0, hh + 0.02, 0.02, w * 1.18, h * 0.12, d * 1.14, {
    color: rimCol,
    material: style === 'horned' ? 'dark_metal' : 'matte',
    layer: layer,
  });
  // 2. Rusty Mordor iron dome cleanly stacked ON TOP (layer + 0.12)
  scene.taperBox(0, hh + 0.08, -0.01, w * 1.12, d * 1.1, w * 0.68, d * 0.72, h * 0.42, {
    topOffX: 0.05,
    color: p.iron,
    material: 'dark_metal',
    layer: layer + 0.12,
  });

  if (style === 'horned') {
    // Asymmetrical crooked ivory-bone horns (one big curved, one chipped!)
    scene.pyramid(-hw * 0.92, hh + h * 0.18, 0.02, 0.1, 0.1, h * 0.58, {
      tipOffX: -w * 0.38,
      tipOffZ: 0.12,
      color: p.tusk,
      material: 'matte',
      layer: layer + 0.28,
    });
    scene.pyramid(hw * 0.92, hh + h * 0.18, 0.02, 0.1, 0.1, h * 0.34, {
      tipOffX: w * 0.26,
      tipOffZ: 0.08,
      color: '#cfbf80',
      material: 'matte',
      layer: layer + 0.28,
    });
    scene.pyramid(0.05, hh + h * 0.48, 0, 0.09, 0.09, h * 0.3, {
      tipOffX: 0.1,
      color: p.iron,
      material: 'dark_metal',
      layer: layer + 0.3,
    });
  } else if (style === 'spiked_bucket') {
    for (const sx of [-0.28, 0, 0.28]) {
      scene.pyramid(sx * w, hh + h * 0.46, 0.02, 0.085, 0.085, h * 0.36, {
        tipOffX: sx * w * 0.35,
        color: '#6b7280',
        material: 'metal',
        layer: layer + 0.28,
      });
    }
  } else if (style === 'skullcap') {
    scene.pyramid(-0.08, hh + h * 0.46, -0.02, 0.09, 0.09, h * 0.32, {
      tipOffX: -0.14,
      color: p.iron,
      material: 'dark_metal',
      layer: layer + 0.28,
    });
  }
}

/**
 * Graceful Elven Hair, Mallorn-Leaf Circlets & Swept Winged Helms (strictly stacked!)
 */
function drawElfHeadgear(scene, head, style = 'winged_helm', hairColor = PAL.elves.hairGold, layer = 9) {
  const p = PAL.elves;
  const { w, h, d } = head;
  const hw = w / 2;
  const hh = h / 2;

  // Flowing back hair veil behind head & shoulders
  scene.taperBox(0, -h * 0.72, -d * 0.56, w * 1.12, 0.2, w * 1.02, 0.22, h * 1.24, {
    color: hairColor,
    material: 'matte',
    layer: 4.5,
  });
  // Sleek side-swept hair bangs framing forehead cleanly without hiding eyes
  scene.extrudeZ(
    [
      [-hw * 1.02, hh + 0.04],
      [-hw * 0.48, hh + 0.04],
      [-hw * 0.9, hh - h * 0.28],
      [-hw * 1.04, hh - h * 0.18],
    ],
    d * 0.12,
    d * 0.52,
    { color: hairColor, material: 'matte', layer: 7.3 }
  );
  scene.extrudeZ(
    [
      [hw * 0.48, hh + 0.04],
      [hw * 1.02, hh + 0.04],
      [hw * 1.04, hh - h * 0.18],
      [hw * 0.9, hh - h * 0.28],
    ],
    d * 0.12,
    d * 0.52,
    { color: hairColor, material: 'matte', layer: 7.3 }
  );

  if (style === 'circlet' || style === 'sentinel') {
    // 1. Hair crown cap (bottom of top stack)
    scene.box(0, hh + 0.06, -0.04, w * 1.04, h * 0.22, d * 1.02, {
      color: hairColor,
      material: 'matte',
      layer: layer,
    });
    // 2. Emerald hooded mantle over top for Elven Sentinel!
    if (style === 'sentinel') {
      scene.taperBox(0, hh + 0.12, -0.08, w * 1.22, d * 1.16, w * 0.88, d * 0.92, h * 0.36, {
        color: p.primary,
        material: 'matte',
        layer: layer + 0.12,
      });
    }
    // 3. Radiant Golden Mallorn-Leaf Circlet cleanly ON FRONT/TOP!
    scene.box(0, hh + 0.01, 0.03, w * 1.1, h * 0.09, d * 1.08, {
      color: p.gold,
      material: 'gold',
      layer: layer + 0.05,
    });
    scene.extrudeZ(
      [
        [0, hh + h * 0.36],
        [-w * 0.48, hh + h * 0.15],
        [-w * 0.18, hh - 0.02],
        [0, hh + h * 0.05],
        [w * 0.18, hh - 0.02],
        [w * 0.48, hh + h * 0.15],
      ],
      d * 0.48,
      d * 0.58,
      { color: p.gold, material: 'gold', layer: layer + 0.24 }
    );
    scene.octahedron(0, hh + h * 0.1, d * 0.6, 0.08, 0.11, 0.06, {
      color: style === 'sentinel' ? p.starlightCore : p.primary,
      material: 'glow',
      layer: layer + 0.3,
    });
  } else {
    // 1. Gold helmet brow band (layer + 0.0)
    scene.box(0, hh + 0.02, 0.01, w * 1.12, h * 0.1, d * 1.12, {
      color: p.gold,
      material: 'gold',
      layer: layer,
    });
    // 2. Tall graceful sculpted golden Noldor Helm dome ON TOP (layer + 0.12)
    scene.taperBox(0, hh + 0.07, 0, w * 1.08, d * 1.08, w * 0.42, d * 0.52, h * 0.56, {
      color: p.gold,
      material: 'gold',
      layer: layer + 0.12,
    });
    // 3. Crisp swept emerald/ivory crest blade ON TOP (layer + 0.26)
    scene.extrudeX(
      [
        [d * 0.42, hh + h * 0.36],
        [0, hh + h * 0.98],
        [-d * 0.72, hh + h * 0.74],
        [-d * 0.5, hh + h * 0.24],
      ],
      -0.065,
      0.065,
      { color: style === 'defender_helm' ? p.ivory : p.primary, material: 'matte', layer: layer + 0.26 }
    );
    // 4. Elegant golden wing-blades flanking helm!
    for (const side of [-1, 1]) {
      const pts =
        side < 0
          ? [
              [-hw * 0.96, hh + 0.06],
              [-hw * 1.56, hh + h * 0.78],
              [-hw * 1.12, hh + h * 0.46],
              [-hw * 0.94, hh + 0.24],
            ]
          : [
              [hw * 0.96, hh + 0.06],
              [hw * 1.56, hh + h * 0.78],
              [hw * 1.12, hh + h * 0.46],
              [hw * 0.94, hh + 0.24],
            ];
      scene.extrudeZ(pts, -0.055, 0.055, {
        color: p.gold,
        material: 'gold',
        layer: side < 0 ? layer + 0.06 : layer + 0.3,
      });
    }
  }
}

/**
 * Runic Bronze & Forged Steel / Mithril Dwarf Helmets (strictly bottom-to-top stacking!)
 */
function drawDwarfHelmet(scene, head, style = 'runic', layer = 9) {
  const p = PAL.dwarves;
  const { w, h, d } = head;
  const hw = w / 2;
  const hh = h / 2;
  const isMithril = style === 'ironbreaker';
  const bodyCol = isMithril ? p.mithril : p.steel;
  const trimCol = p.primary;

  // Cheek plates tucked cleanly behind face plane — NEVER covering eyes!
  scene.box(-hw - 0.04, -h * 0.04, -0.14, 0.11, h * 0.52, d * 0.56, {
    color: bodyCol,
    material: 'metal',
    layer: 5.9,
  });
  scene.box(hw + 0.04, -h * 0.04, -0.14, 0.11, h * 0.52, d * 0.56, {
    color: bodyCol,
    material: 'metal',
    layer: 6.4,
  });

  // 1. Runic bronze brow rim (BOTTOM of helmet stack, layer + 0.0)
  scene.box(0, hh + 0.02, 0.01, w * 1.18, h * 0.12, d * 1.16, {
    color: trimCol,
    material: 'gold',
    layer: layer,
  });

  // 2. Steel / Mithril angular dome stacked cleanly ON TOP of brow rim (layer + 0.1 -> + 0.18)
  scene.box(0, hh + h * 0.16, 0, w * 1.12, h * 0.18, d * 1.12, {
    color: bodyCol,
    material: 'metal',
    layer: layer + 0.1,
  });
  scene.taperBox(0, hh + h * 0.25, 0, w * 1.06, d * 1.06, w * 0.62, d * 0.64, h * 0.34, {
    color: bodyCol,
    material: 'metal',
    layer: layer + 0.18,
  });

  // 3. Runic bronze center crest strip & brow diamond rune ON TOP (layer + 0.25)
  scene.box(0, hh + h * 0.44, 0, w * 0.2, h * 0.34, d * 0.88, {
    color: trimCol,
    material: 'gold',
    layer: layer + 0.24,
  });
  scene.octahedron(0, hh + 0.02, d * 0.62, 0.11, 0.13, 0.06, {
    color: isMithril ? '#fbbf24' : trimCol,
    material: 'gold',
    layer: layer + 0.3,
  });

  if (style === 'ironbreaker') {
    // Gleaming tall mithril war-plume crest stacked cleanly ON TOP!
    scene.extrudeX(
      [
        [d * 0.42, hh + h * 0.56],
        [d * 0.1, hh + h * 1.06],
        [-d * 0.68, hh + h * 0.9],
        [-d * 0.86, hh + h * 0.46],
        [-d * 0.36, hh + h * 0.48],
      ],
      -0.11,
      0.11,
      { color: p.mithril, material: 'metal', layer: layer + 0.34 }
    );
  } else if (style === 'horned') {
    for (const side of [-1, 1]) {
      scene.pyramid(side * hw * 0.96, hh + h * 0.18, 0, 0.095, 0.095, h * 0.48, {
        tipOffX: side * w * 0.34,
        tipOffZ: 0.06,
        color: '#e8d8a8',
        material: 'matte',
        layer: layer + 0.28,
      });
    }
  } else if (style === 'defender') {
    scene.box(0, hh + h * 0.64, 0, w * 0.28, h * 0.22, d * 0.86, {
      color: trimCol,
      material: 'gold',
      layer: layer + 0.3,
    });
  }
}

// ============================================================================
// Reusable Weapons & Shields (Crisp Iconic Low-Poly Silhouettes)
// ============================================================================

function drawSword(scene, x, y, z, opts = {}) {
  const bladeLen = opts.len ?? 1.22;
  const bladeW = opts.width ?? 0.16;
  const bladeCol = opts.bladeCol ?? '#e8f0f8';
  const guardCol = opts.guardCol ?? '#f5b82e';
  const hiltCol = opts.hiltCol ?? '#5c3822';
  const layer = opts.layer ?? 10;

  scene.withTransform(
    { translate: [x, y, z], rotZ: opts.rotZ ?? 22, rotX: opts.rotX ?? -12, rotY: opts.rotY ?? 0 },
    () => {
      scene.box(0, -0.16, 0, 0.1, 0.34, 0.1, { color: hiltCol, material: 'matte', layer });
      scene.octahedron(0, -0.35, 0, 0.09, 0.09, 0.09, { color: guardCol, material: 'gold', layer });
      scene.box(0, 0.04, 0, bladeW * 2.7, 0.1, 0.14, { color: guardCol, material: 'gold', layer });
      scene.taperBox(0, 0.09, 0, bladeW, 0.07, bladeW * 0.72, 0.05, bladeLen * 0.76, {
        color: bladeCol,
        material: 'metal',
        layer,
      });
      scene.pyramid(0, 0.09 + bladeLen * 0.76, 0, bladeW * 0.36, 0.03, bladeLen * 0.26, {
        color: bladeCol,
        material: 'metal',
        layer,
      });
    }
  );
}

function drawOrcCleaver(scene, x, y, z, opts = {}) {
  const scale = opts.scale ?? 1.0;
  const layer = opts.layer ?? 10;
  scene.withTransform(
    { translate: [x, y, z], rotZ: opts.rotZ ?? 24, rotX: opts.rotX ?? -12, scale },
    () => {
      scene.box(0, -0.18, 0, 0.11, 0.42, 0.11, { color: PAL.orcs.leather, material: 'matte', layer });
      scene.box(0, 0.04, 0, 0.32, 0.1, 0.14, { color: PAL.orcs.iron, material: 'dark_metal', layer });
      scene.extrudeZ(
        [
          [-0.07, 0.08],
          [0.14, 0.08],
          [0.24, 0.56],
          [0.15, 0.64],
          [0.28, 0.96],
          [0.38, 1.18],
          [0.06, 1.32],
          [-0.18, 1.16],
          [-0.06, 1.02],
          [-0.09, 0.55],
        ],
        -0.045,
        0.045,
        { color: '#646b78', material: 'metal', layer }
      );
      scene.extrudeZ(
        [
          [0.12, 0.14],
          [0.22, 0.56],
          [0.27, 0.96],
          [0.36, 1.16],
          [0.24, 1.16],
          [0.17, 0.92],
          [0.14, 0.55],
          [0.08, 0.16],
        ],
        -0.05,
        0.052,
        { color: '#cbd5e1', material: 'metal', layer: layer + 0.05 }
      );
    }
  );
}

function drawDwarfAxe(scene, x, y, z, opts = {}) {
  const doubleHead = !!opts.doubleHead;
  const bladeCol = opts.bladeCol ?? PAL.dwarves.steel;
  const trimCol = opts.trimCol ?? PAL.dwarves.primary;
  const layer = opts.layer ?? 10;
  const scale = opts.scale ?? 1.0;

  scene.withTransform(
    { translate: [x, y, z], rotZ: opts.rotZ ?? 28, rotX: opts.rotX ?? -10, scale },
    () => {
      scene.box(0, 0.32, 0, 0.11, 1.28, 0.11, { color: PAL.dwarves.wood, material: 'matte', layer });
      scene.box(0, 0.78, 0, 0.16, 0.24, 0.16, { color: trimCol, material: 'gold', layer: layer + 0.05 });
      scene.octahedron(0, -0.32, 0, 0.09, 0.09, 0.09, { color: trimCol, material: 'gold', layer });
      scene.pyramid(0, 0.96, 0, 0.07, 0.07, 0.18, { color: bladeCol, material: 'metal', layer });

      scene.extrudeZ(
        [
          [-0.06, 0.66],
          [-0.44, 0.44],
          [-0.56, 0.78],
          [-0.44, 1.12],
          [-0.06, 0.9],
        ],
        -0.05,
        0.05,
        { color: bladeCol, material: 'metal', layer }
      );
      if (doubleHead) {
        scene.extrudeZ(
          [
            [0.06, 0.9],
            [0.44, 1.12],
            [0.56, 0.78],
            [0.44, 0.44],
            [0.06, 0.66],
          ],
          -0.05,
          0.05,
          { color: bladeCol, material: 'metal', layer }
        );
      } else {
        scene.box(0.16, 0.78, 0, 0.2, 0.18, 0.14, { color: trimCol, material: 'gold', layer });
      }
    }
  );
}

function drawElvenBlade(scene, x, y, z, opts = {}) {
  const layer = opts.layer ?? 10;
  scene.withTransform(
    { translate: [x, y, z], rotZ: opts.rotZ ?? 22, rotX: opts.rotX ?? -12 },
    () => {
      scene.box(0, -0.14, 0, 0.085, 0.46, 0.085, { color: PAL.elves.gold, material: 'gold', layer });
      scene.extrudeZ(
        [
          [-0.05, 0.08],
          [0.08, 0.08],
          [0.14, 0.68],
          [0.24, 1.24],
          [0.12, 1.48],
          [0.02, 1.18],
          [-0.04, 0.62],
        ],
        -0.035,
        0.035,
        { color: PAL.elves.steel, material: 'metal', layer }
      );
    }
  );
}

/**
 * Upright World-Space Bow & Drawn Arrow — stands cleanly VERTICAL to the front-left
 * without ever crossing over the archer's eyes!
 */
function drawUprightBow(scene, x, y, z, opts = {}) {
  const bowCol = opts.bowCol ?? '#8b5a2b';
  const arrowCol = opts.arrowCol ?? '#dce6f2';
  const fletchCol = opts.fletchCol ?? '#f8fafc';
  const glowingArrow = !!opts.glowingArrow;
  const jagged = !!opts.jagged;
  const scale = opts.scale ?? 1.0;
  const layer = opts.layer ?? 10.6;

  scene.withTransform({ translate: [x, y, z], rotY: opts.rotY ?? -18, scale }, () => {
    const bowPts = jagged
      ? [
          [0.04, -0.82],
          [0.16, -0.78],
          [0.44, -0.34],
          [0.38, 0.0],
          [0.44, 0.34],
          [0.16, 0.78],
          [0.04, 0.82],
          [-0.06, 0.74],
          [0.28, 0.3],
          [0.22, 0.0],
          [0.28, -0.3],
          [-0.06, -0.74],
        ]
      : [
          [-0.08, -0.9],
          [0.04, -0.86],
          [0.38, -0.44],
          [0.46, 0.0],
          [0.38, 0.44],
          [0.04, 0.86],
          [-0.08, 0.9],
          [-0.14, 0.82],
          [0.24, 0.4],
          [0.32, 0.0],
          [0.24, -0.4],
          [-0.14, -0.82],
        ];
    scene.extrudeX(bowPts, -0.055, 0.055, {
      color: bowCol,
      material: opts.bowMat ?? 'matte',
      layer,
    });

    // Taut bowstring pulled cleanly back to nock!
    scene.box(0, 0.4, -0.14, 0.026, 0.88, 0.026, {
      color: glowingArrow ? '#bae6fd' : '#e2e8f0',
      material: glowingArrow ? 'glow' : 'unlit',
      layer: layer - 0.1,
      tf: { pivot: [0, 0.4, -0.14], rotX: -14 },
    });
    scene.box(0, -0.4, -0.14, 0.026, 0.88, 0.026, {
      color: glowingArrow ? '#bae6fd' : '#e2e8f0',
      material: glowingArrow ? 'glow' : 'unlit',
      layer: layer - 0.1,
      tf: { pivot: [0, -0.4, -0.14], rotX: 14 },
    });

    // Nocked Arrow pointing boldly horizontally forward (+Z)!
    scene.box(0, 0.02, 0.24, 0.055, 0.055, 1.12, {
      color: glowingArrow ? '#7dd3fc' : arrowCol,
      material: glowingArrow ? 'glow' : 'matte',
      layer: layer + 0.12,
    });
    scene.pyramid(0, 0.02, 0.78, 0.085, 0.085, 0.26, {
      color: glowingArrow ? '#ffffff' : '#e2e8f0',
      material: glowingArrow ? 'glow' : 'metal',
      layer: layer + 0.18,
      tf: { pivot: [0, 0.02, 0.78], rotX: 90 },
    });
    if (glowingArrow) {
      // Blazing Starlight Diamond Glow Burst at arrowhead!
      scene.octahedron(0, 0.02, 0.9, 0.2, 0.24, 0.24, {
        color: '#38bdf8',
        material: 'glow',
        layer: layer + 0.15,
      });
      scene.octahedron(0, 0.02, 0.92, 0.11, 0.14, 0.14, {
        color: '#ffffff',
        material: 'glow',
        layer: layer + 0.2,
      });
    }
    scene.box(0, 0.07, -0.24, 0.035, 0.15, 0.24, {
      color: fletchCol,
      material: 'matte',
      layer: layer + 0.12,
    });
  });
}

function drawUprightCrossbow(scene, x, y, z, opts = {}) {
  const p = PAL.dwarves;
  const layer = opts.layer ?? 10.6;
  scene.withTransform({ translate: [x, y, z], rotY: -18 }, () => {
    scene.box(0, 0, 0.12, 0.15, 0.15, 0.92, { color: p.wood, material: 'matte', layer });
    scene.box(0, 0.02, 0.48, 1.04, 0.11, 0.13, { color: p.steel, material: 'metal', layer: layer + 0.1 });
    scene.box(-0.52, 0.02, 0.4, 0.13, 0.13, 0.18, { color: p.primary, material: 'gold', layer: layer + 0.15 });
    scene.box(0.52, 0.02, 0.4, 0.13, 0.13, 0.18, { color: p.primary, material: 'gold', layer: layer + 0.15 });
    // Heavy steel & bronze quarrel bolt pointing forward!
    scene.box(0, 0.1, 0.26, 0.065, 0.065, 0.82, { color: p.mithril, material: 'metal', layer: layer + 0.2 });
    scene.pyramid(0, 0.1, 0.68, 0.095, 0.095, 0.24, {
      color: p.primary,
      material: 'gold',
      layer: layer + 0.25,
      tf: { pivot: [0, 0.1, 0.68], rotX: 90 },
    });
  });
}

function drawShield(scene, x, y, z, style, opts = {}) {
  const layer = opts.layer ?? 11;
  const s = opts.scale ?? 1.0;

  scene.withTransform(
    { translate: [x, y, z], rotY: opts.rotY ?? 20, rotX: opts.rotX ?? -4, scale: s },
    () => {
      if (style === 'gondor_kite') {
        const p = PAL.humans;
        const outer = [
          [-0.46, 0.62],
          [0.46, 0.62],
          [0.42, -0.14],
          [0.0, -0.78],
          [-0.42, -0.14],
        ];
        const inner = outer.map(([px, py]) => [px * 0.8, py * 0.82]);
        scene.extrudeZ(outer, -0.07, 0.07, { color: p.steel, material: 'metal', layer });
        scene.extrudeZ(inner, 0.05, 0.1, { color: p.primary, material: 'matte', layer: layer + 0.1 });
        const zf = 0.114;
        scene.addPoly3D(
          [
            [-0.04, -0.42, zf],
            [0.04, -0.42, zf],
            [0.03, 0.22, zf],
            [-0.03, 0.22, zf],
          ],
          { color: p.gold, unlit: true, layer: layer + 0.2 }
        );
        for (const [bx, by] of [
          [-0.22, 0.14],
          [0.22, 0.14],
          [-0.18, 0.34],
          [0.18, 0.34],
          [0, 0.42],
        ]) {
          scene.addPoly3D(
            [
              [bx - 0.055, by, zf],
              [bx, by - 0.055, zf],
              [bx + 0.055, by, zf],
              [bx, by + 0.055, zf],
            ],
            { color: p.gold, unlit: true, layer: layer + 0.22 }
          );
        }
      } else if (style === 'orc_spiked') {
        const p = PAL.orcs;
        const pts = [
          [-0.5, 0.66],
          [0.0, 0.74],
          [0.5, 0.62],
          [0.44, -0.2],
          [0.12, -0.78],
          [-0.38, -0.66],
          [-0.52, -0.1],
        ];
        scene.extrudeZ(pts, -0.08, 0.08, { color: p.iron, material: 'dark_metal', layer });
        scene.box(0, 0.52, 0.07, 0.88, 0.12, 0.08, {
          color: p.rust,
          material: 'dark_metal',
          layer: layer + 0.08,
        });
        // BURNING CRIMSON-ORANGE EYE OF SAURON GEOMETRIC EMBLEM!
        const zf = 0.098;
        scene.addPoly3D(
          [
            [-0.36, 0.02, zf],
            [0.0, 0.3, zf],
            [0.36, 0.02, zf],
            [0.0, -0.26, zf],
          ],
          { color: p.primary, unlit: true, layer: layer + 0.15 }
        );
        scene.addPoly3D(
          [
            [-0.24, 0.02, zf + 0.01],
            [0.0, 0.2, zf + 0.01],
            [0.24, 0.02, zf + 0.01],
            [0.0, -0.16, zf + 0.01],
          ],
          { color: '#f97316', unlit: true, layer: layer + 0.18 }
        );
        scene.addPoly3D(
          [
            [-0.045, 0.16, zf + 0.02],
            [0.045, 0.16, zf + 0.02],
            [0.035, -0.12, zf + 0.02],
            [-0.035, -0.12, zf + 0.02],
          ],
          { color: '#180a0a', unlit: true, layer: layer + 0.2 }
        );
        for (const [sx, sy] of [
          [-0.36, 0.45],
          [0.36, 0.42],
          [0.0, -0.5],
        ]) {
          scene.pyramid(sx, sy, 0.08, 0.065, 0.065, 0.24, {
            color: '#9ca3af',
            material: 'metal',
            layer: layer + 0.24,
            tf: { pivot: [sx, sy, 0.08], rotX: 90 },
          });
        }
      } else if (style === 'elven_leaf') {
        const p = PAL.elves;
        const outer = [
          [0.0, 0.78],
          [0.4, 0.34],
          [0.34, -0.34],
          [0.0, -0.82],
          [-0.34, -0.34],
          [-0.4, 0.34],
        ];
        const inner = outer.map(([px, py]) => [px * 0.78, py * 0.82]);
        scene.extrudeZ(outer, -0.06, 0.06, { color: p.gold, material: 'gold', layer });
        scene.extrudeZ(inner, 0.04, 0.09, { color: p.primary, material: 'matte', layer: layer + 0.1 });
        const zf = 0.106;
        scene.addPoly3D(
          [
            [0, 0.46, zf],
            [0.18, 0.04, zf],
            [0, -0.46, zf],
            [-0.18, 0.04, zf],
          ],
          { color: p.ivory, unlit: true, layer: layer + 0.18 }
        );
        scene.addPoly3D(
          [
            [-0.03, -0.38, zf + 0.008],
            [0.03, -0.38, zf + 0.008],
            [0.03, 0.38, zf + 0.008],
            [-0.03, 0.38, zf + 0.008],
          ],
          { color: p.gold, unlit: true, layer: layer + 0.2 }
        );
      } else if (style === 'dwarf_octagonal') {
        const p = PAL.dwarves;
        const r = 0.56;
        const outer = [];
        const inner = [];
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
          outer.push([Math.cos(a) * r, Math.sin(a) * r]);
          inner.push([Math.cos(a) * r * 0.74, Math.sin(a) * r * 0.74]);
        }
        scene.extrudeZ(outer, -0.08, 0.08, { color: p.primary, material: 'gold', layer });
        scene.extrudeZ(inner, 0.05, 0.11, {
          color: opts.mithril ? p.mithril : p.steel,
          material: 'metal',
          layer: layer + 0.1,
        });
        scene.cylinder(0, 0, 0.13, 0.2, 0.14, 0.1, 6, 'z', {
          color: p.primary,
          material: 'gold',
          layer: layer + 0.2,
        });
      }
    }
  );
}

// ============================================================================
// Unified Polytopia Character Rig Builder (Infantry + Mounted Riders)
// ============================================================================

function buildPolytopiaBody(scene, faction, config = {}) {
  const isMounted = !!config.isMounted;
  const isUruk = !!config.isUruk;
  const baseY = config.baseY ?? 0;
  const bodyScale = config.bodyScale ?? 1.0;

  // Faction proportion table (ALL share the iconic Polytopia chibi-cube ~35% head rule!)
  const spec = {
    humans: {
      legH: 0.62,
      torsoH: 1.02,
      torsoWBot: 0.92,
      torsoWTop: 0.78,
      torsoD: 0.68,
      headW: 0.94,
      headH: 0.94,
      headD: 0.9,
      hunchZ: 0.0,
      headPitch: 0,
      shoulderW: 1.08,
      armLen: 0.72,
      armW: 0.26,
    },
    orcs: isUruk
      ? {
          legH: 0.72,
          torsoH: 1.2,
          torsoWBot: 1.12,
          torsoWTop: 1.26,
          torsoD: 0.84,
          headW: 1.04,
          headH: 0.98,
          headD: 0.94,
          hunchZ: 0.12,
          headPitch: 8,
          shoulderW: 1.56,
          armLen: 0.92,
          armW: 0.34,
        }
      : {
          legH: 0.56,
          torsoH: 0.96,
          torsoWBot: 0.98,
          torsoWTop: 1.06,
          torsoD: 0.76,
          headW: 0.98,
          headH: 0.92,
          headD: 0.9,
          hunchZ: 0.15,
          headPitch: 10,
          shoulderW: 1.3,
          armLen: 0.8,
          armW: 0.3,
        },
    elves: {
      legH: 0.74,
      torsoH: 1.12,
      torsoWBot: 0.86,
      torsoWTop: 0.7,
      torsoD: 0.62,
      headW: 0.88,
      headH: 0.94,
      headD: 0.84,
      hunchZ: 0.0,
      headPitch: 0,
      shoulderW: 0.96,
      armLen: 0.76,
      armW: 0.23,
    },
    dwarves: {
      legH: 0.38,
      torsoH: 0.78,
      torsoWBot: 1.1,
      torsoWTop: 1.04,
      torsoD: 0.76,
      headW: 0.92,
      headH: 0.84,
      headD: 0.86,
      hunchZ: 0.0,
      headPitch: 0,
      shoulderW: 1.3,
      armLen: 0.58,
      armW: 0.29,
    },
  }[faction];

  const tunicColor = config.tunicColor;
  const trimColor = config.trimColor;
  const bootColor = config.bootColor;
  const skinColor = config.skinColor;
  const armorColor = config.armorColor ?? null;
  const cloakColor = config.cloakColor ?? null;

  const rootTf = {
    translate: [config.offsetX ?? 0, baseY, config.offsetZ ?? 0],
    rotY: config.rotY ?? 0,
    scale: bodyScale,
  };

  scene.withTransform(rootTf, () => {
    const legH = spec.legH;
    const torsoY0 = isMounted ? 0.14 : legH - 0.04;
    const torsoY1 = torsoY0 + spec.torsoH;
    const headCenterY = torsoY1 + spec.headH * 0.48 - (faction === 'orcs' ? 0.05 : 0.0);
    const headCenterZ = spec.hunchZ;

    // 1. Optional Flowing Back Cloak
    if (cloakColor) {
      scene.taperBox(
        0,
        isMounted ? torsoY0 - 0.24 : 0.16,
        -spec.torsoD * 0.52,
        spec.torsoWBot * 1.18,
        0.16,
        spec.torsoWTop * 0.92,
        0.14,
        torsoY1 - (isMounted ? torsoY0 - 0.18 : 0.16),
        {
          topOffZ: 0.1,
          color: cloakColor,
          material: 'matte',
          layer: isMounted ? 3.2 : 1.5,
        }
      );
    }

    // 2. Stubby Polytopia Boots / Legs
    if (!isMounted) {
      const legX = spec.torsoWBot * 0.26;
      const bootW = faction === 'dwarves' ? 0.34 : faction === 'elves' ? 0.25 : 0.29;
      const bootD = bootW * 1.18;
      scene.box(-legX, legH * 0.5, 0.04, bootW, legH, bootD, {
        color: bootColor,
        material: config.bootMat ?? 'matte',
        layer: 2.2,
        groundContact: true,
      });
      scene.box(legX, legH * 0.5, -0.02, bootW, legH, bootD, {
        color: bootColor,
        material: config.bootMat ?? 'matte',
        layer: 2.1,
        groundContact: true,
      });
      scene.box(-legX, 0.11, bootD * 0.55, bootW * 0.94, 0.22, 0.16, {
        color: bootColor,
        material: config.bootMat ?? 'matte',
        layer: 2.3,
        groundContact: true,
      });
      scene.box(legX, 0.11, bootD * 0.48, bootW * 0.94, 0.22, 0.16, {
        color: bootColor,
        material: config.bootMat ?? 'matte',
        layer: 2.2,
        groundContact: true,
      });
    } else {
      const riderLegX = config.mountHalfW ?? 0.54;
      scene.box(-riderLegX, -0.1, 0.06, 0.24, 0.56, 0.28, {
        color: bootColor,
        material: config.bootMat ?? 'matte',
        layer: 4.5,
      });
      scene.box(riderLegX, -0.1, 0.06, 0.24, 0.56, 0.28, {
        color: bootColor,
        material: config.bootMat ?? 'matte',
        layer: 10.4,
      });
    }

    // 3. Cleanly Stacked 3-Piece Torso (Skirt -> Belt -> Upper Chest — ZERO belt-shelf bug!)
    const skirtH = spec.torsoH * 0.28;
    const beltH = 0.14;
    const beltY0 = torsoY0 + skirtH;
    const upperY0 = beltY0 + beltH;
    const upperH = torsoY1 - upperY0;
    const midW = spec.torsoWBot * 0.72 + spec.torsoWTop * 0.28;

    // 3a. Lower tunic skirt (layer 5.0)
    scene.taperBox(0, torsoY0, 0, spec.torsoWBot, spec.torsoD, midW, spec.torsoD * 0.98, skirtH, {
      color: tunicColor,
      material: config.tunicMat ?? 'matte',
      layer: 5.0,
    });
    // 3b. Waist belt + gold/iron buckle (layer 5.1)
    scene.box(0, beltY0 + beltH * 0.5, spec.hunchZ * 0.2, midW * 1.03, beltH, spec.torsoD * 1.02, {
      color: config.beltColor ?? '#4a2e1b',
      material: 'matte',
      layer: 5.1,
    });
    scene.box(0, beltY0 + beltH * 0.5, spec.torsoD * 0.54 + spec.hunchZ * 0.2, 0.2, 0.17, 0.08, {
      color: trimColor,
      material: 'gold',
      layer: 5.35,
    });
    // 3c. Upper torso / armor chestplate stacked cleanly ON TOP of belt (layer 5.2)!
    const upperCol = armorColor ?? tunicColor;
    const upperMat = armorColor ? (config.armorMat ?? 'metal') : (config.tunicMat ?? 'matte');
    scene.taperBox(
      0,
      upperY0,
      spec.hunchZ * 0.25,
      midW,
      spec.torsoD * 0.98,
      spec.torsoWTop,
      spec.torsoD * 0.92,
      upperH,
      {
        topOffZ: spec.hunchZ * 0.45,
        color: upperCol,
        material: upperMat,
        layer: 5.2,
      }
    );

    if (config.chestEmblem === 'white_tree') {
      const ez = spec.torsoD * 0.51 + spec.hunchZ * 0.32;
      const ey = upperY0 + upperH * 0.46;
      scene.addPoly3D(
        [
          [-0.04, ey - 0.18, ez],
          [0.04, ey - 0.18, ez],
          [0.03, ey + 0.18, ez],
          [-0.03, ey + 0.18, ez],
        ],
        { color: PAL.humans.gold, unlit: true, layer: 5.5 }
      );
      scene.addPoly3D(
        [
          [-0.18, ey + 0.06, ez],
          [0, ey + 0.22, ez],
          [0.18, ey + 0.06, ez],
          [0, ey - 0.04, ez],
        ],
        { color: PAL.humans.gold, unlit: true, layer: 5.5 }
      );
    } else if (config.chestEmblem === 'orc_straps') {
      const sy = upperY0 + upperH * 0.45;
      const sz = spec.torsoD * 0.44 + spec.hunchZ * 0.4;
      scene.box(0, sy, sz, 0.88, 0.13, 0.14, {
        color: PAL.orcs.leather,
        material: 'matte',
        layer: 5.45,
        tf: { pivot: [0, sy, sz], rotZ: 32 },
      });
    } else if (config.chestEmblem === 'elven_v') {
      const ez = spec.torsoD * 0.5 + 0.01;
      const ey = torsoY1 - 0.05;
      scene.addPoly3D(
        [
          [-0.28, ey, ez],
          [0, ey - 0.42, ez],
          [0.28, ey, ez],
          [0.18, ey, ez],
          [0, ey - 0.28, ez],
          [-0.18, ey, ez],
        ],
        { color: PAL.elves.gold, unlit: true, layer: 5.5 }
      );
    }

    // 4. Optional Back Quiver (for Archers & Sentinel!)
    if (config.hasQuiver) {
      scene.withTransform(
        { translate: [spec.torsoWTop * 0.42, torsoY1 - 0.06, -spec.torsoD * 0.54], rotZ: -26 },
        () => {
          scene.box(0, 0, 0, 0.22, 0.68, 0.22, { color: '#6b4226', material: 'matte', layer: 3.4 });
          for (const ax of [-0.06, 0, 0.06]) {
            scene.box(ax, 0.44, 0, 0.045, 0.24, 0.045, {
              color: config.quiverFletch ?? '#f8fafc',
              material: 'matte',
              layer: 3.5,
            });
          }
        }
      );
    }

    // 5. Pauldrons + Arms!
    const shY = torsoY1 - 0.14;
    const shZ = spec.hunchZ * 0.55;
    const leftArmX = -spec.shoulderW * 0.54; // Screen-LEFT (character's right weapon arm)
    const rightArmX = spec.shoulderW * 0.54; // Screen-RIGHT (character's left offhand/shield arm)

    if (config.pauldronColor) {
      const pLScale = faction === 'orcs' ? 1.24 : 1.0;
      scene.box(leftArmX, shY + 0.06, shZ, 0.36 * pLScale, 0.3 * pLScale, 0.4 * pLScale, {
        color: config.pauldronColor,
        material: config.pauldronMat ?? 'metal',
        layer: 5.7,
      });
      if (faction === 'orcs') {
        scene.pyramid(leftArmX - 0.14, shY + 0.22, shZ, 0.07, 0.07, 0.28, {
          tipOffX: -0.14,
          color: '#9ca3af',
          material: 'metal',
          layer: 5.8,
        });
      }
      if (faction !== 'orcs' || isUruk) {
        scene.box(rightArmX, shY + 0.06, shZ, 0.36, 0.3, 0.4, {
          color: config.pauldronColor,
          material: config.pauldronMat ?? 'metal',
          layer: 9.8,
        });
      }
    }

    // Character's RIGHT arm (screen-left, -X): Weapon Arm!
    const wArmRotX = config.weaponArmRotX ?? -32;
    const wArmRotZ = config.weaponArmRotZ ?? 24;
    scene.withTransform({ translate: [leftArmX, shY, shZ], rotX: wArmRotX, rotZ: wArmRotZ }, () => {
      scene.box(0, -spec.armLen * 0.38, 0, spec.armW, spec.armLen * 0.78, spec.armW, {
        color: config.sleeveColor ?? tunicColor,
        material: 'matte',
        layer: 5.65,
      });
      scene.box(0, -spec.armLen * 0.84, 0.03, spec.armW * 0.94, spec.armW * 0.92, spec.armW * 0.94, {
        color: config.gloveColor ?? skinColor,
        material: config.gloveColor ? 'matte' : 'skin',
        layer: 9.9,
      });
      if (config.drawWeaponInHand) {
        config.drawWeaponInHand(0, -spec.armLen * 0.86, 0.05);
      }
    });

    // Character's LEFT arm (screen-right, +X): Shield / Bow / Off-hand Arm!
    const oArmRotX = config.offArmRotX ?? -42;
    const oArmRotZ = config.offArmRotZ ?? -12;
    scene.withTransform({ translate: [rightArmX, shY, shZ], rotX: oArmRotX, rotZ: oArmRotZ }, () => {
      scene.box(0, -spec.armLen * 0.38, 0, spec.armW, spec.armLen * 0.78, spec.armW, {
        color: config.sleeveColor ?? tunicColor,
        material: 'matte',
        layer: 9.9,
      });
      scene.box(0, -spec.armLen * 0.84, 0.03, spec.armW * 0.94, spec.armW * 0.92, spec.armW * 0.94, {
        color: config.gloveColor ?? skinColor,
        material: config.gloveColor ? 'matte' : 'skin',
        layer: 10.1,
      });
      if (config.drawOffhandInHand) {
        config.drawOffhandInHand(0, -spec.armLen * 0.86, 0.08);
      }
    });

    // Optional World-Upright Ranged Weapon / Lance (drawn cleanly in body space, never tilted over face!)
    if (config.drawBodyProp) {
      config.drawBodyProp({ torsoY0, torsoY1, shY, leftArmX, rightArmX, spec });
    }

    // 6. BIG ICONIC POLYTOPIA CUBE HEAD + FACE + HELMET + BEARD!
    const head = { w: spec.headW, h: spec.headH, d: spec.headD };
    scene.withTransform(
      {
        translate: [0, headCenterY, headCenterZ],
        rotX: spec.headPitch,
        rotY: config.headYaw ?? 0,
      },
      () => {
        scene.box(0, 0, 0, head.w, head.h, head.d, {
          color: skinColor,
          material: 'skin',
          layer: 6,
        });

        drawPolytopiaFace(scene, faction, head, {
          isUruk,
          cleanShaven: config.cleanShaven,
          hairColor: config.hairColor,
          beardColor: config.beardColor,
        });

        if (faction === 'dwarves') {
          drawDwarfBeard(scene, head, config.beardColor ?? PAL.dwarves.beardCopper, PAL.dwarves.primary, 8.2);
        }

        if (config.drawHeadgear) {
          config.drawHeadgear(head);
        }
      }
    );
  });
}

// ============================================================================
// Chunky Low-Poly Polytopia Mounts (Horses, Warg Wolf, Mountain War-Ram!)
// ============================================================================

function drawPolytopiaMount(scene, kind) {
  if (kind === 'horse_brown' || kind === 'horse_white' || kind === 'horse_rohirrim' || kind === 'horse_elf') {
    const isWhite = kind !== 'horse_brown';
    const isRohirrim = kind === 'horse_rohirrim';
    const isElf = kind === 'horse_elf';
    const bodyCol = isElf ? PAL.elves.horseWhite : isWhite ? PAL.humans.whiteHorse : PAL.humans.horseBrown;
    const maneCol = isRohirrim
      ? PAL.humans.gold
      : isElf
        ? PAL.elves.hairGold
        : isWhite
          ? '#d6dce6'
          : PAL.humans.horseMane;
    const saddleCol = isElf ? PAL.elves.primary : PAL.humans.primary;
    const trimCol = isElf ? PAL.elves.gold : PAL.humans.gold;

    const legH = isElf ? 0.92 : isRohirrim ? 0.9 : 0.82;
    const bodyW = isElf ? 0.72 : isRohirrim ? 0.88 : 0.82;
    const bodyH = isElf ? 0.66 : isRohirrim ? 0.76 : 0.7;
    const bodyL = isElf ? 1.72 : isRohirrim ? 1.88 : 1.72;
    const bodyY = legH + bodyH * 0.44;

    const lx = bodyW * 0.34;
    const lz = bodyL * 0.36;
    const legs = [
      [-lx, lz, -12, 1.4],
      [-lx, -lz, 12, 1.2],
      [lx, lz, 10, 4.2],
      [lx, -lz, -10, 4.1],
    ];
    for (const [x, z, rx, lyr] of legs) {
      scene.withTransform({ translate: [x, legH, z], rotX: rx }, () => {
        scene.box(0, -legH * 0.48, 0, 0.21, legH * 0.96, 0.22, {
          color: bodyCol,
          material: 'matte',
          layer: lyr,
          groundContact: true,
        });
        scene.box(0, -legH + 0.09, 0.01, 0.23, 0.18, 0.24, {
          color: '#2d2624',
          material: 'matte',
          layer: lyr + 0.05,
          groundContact: true,
        });
      });
    }

    scene.box(0, bodyY, 0, bodyW, bodyH, bodyL, {
      color: bodyCol,
      material: 'matte',
      layer: 2.6,
    });

    if (isRohirrim) {
      // Lower gold trim -> Royal blue caparison cleanly stacked ON TOP (no overlap shelf!)
      scene.box(0, bodyY - 0.34, 0.02, bodyW * 1.12, 0.14, bodyL * 1.05, {
        color: trimCol,
        material: 'gold',
        layer: 2.75,
      });
      scene.box(0, bodyY + 0.02, 0.02, bodyW * 1.08, bodyH * 0.86, bodyL * 1.02, {
        color: saddleCol,
        material: 'matte',
        layer: 2.82,
      });
    } else {
      scene.box(0, bodyY - 0.22, -0.06, bodyW * 1.1, 0.1, bodyL * 0.54, {
        color: trimCol,
        material: 'gold',
        layer: 2.75,
      });
      scene.box(0, bodyY + 0.08, -0.06, bodyW * 1.08, bodyH * 0.64, bodyL * 0.52, {
        color: saddleCol,
        material: 'matte',
        layer: 2.82,
      });
    }

    const neckY = bodyY + bodyH * 0.3;
    const neckZ = bodyL * 0.46;
    scene.withTransform({ translate: [0, neckY, neckZ], rotX: 28 }, () => {
      scene.taperBox(0, -0.1, 0, bodyW * 0.62, 0.48, bodyW * 0.46, 0.38, isElf ? 0.94 : 0.84, {
        color: bodyCol,
        material: 'matte',
        layer: 3.0,
      });
      scene.box(0, 0.34, -0.24, 0.14, 0.78, 0.22, {
        color: maneCol,
        material: 'matte',
        layer: 3.05,
      });
    });

    const headY = neckY + (isElf ? 0.76 : 0.68);
    const headZ = neckZ + 0.48;
    scene.withTransform({ translate: [0, headY, headZ], rotX: 16 }, () => {
      scene.box(0, 0, 0, 0.42, 0.42, 0.58, { color: bodyCol, material: 'matte', layer: 3.4 });
      scene.taperBox(0, -0.18, 0.36, 0.34, 0.38, 0.28, 0.32, 0.34, {
        color: bodyCol,
        material: 'matte',
        layer: 3.45,
      });
      if (isRohirrim) {
        scene.box(0, 0.1, 0.18, 0.45, 0.28, 0.42, {
          color: trimCol,
          material: 'gold',
          layer: 3.55,
        });
      }
      for (const sx of [-0.13, 0.13]) {
        scene.pyramid(sx, 0.2, -0.12, 0.065, 0.065, 0.24, {
          color: bodyCol,
          material: 'matte',
          layer: 3.5,
        });
      }
      // Near-side (+X) horse eye only (far-side -X is occluded by head cube & golden chamfron!)
      scene.addPoly3D(
        [
          [0.23, 0.02, 0.04],
          [0.23, 0.02, 0.16],
          [0.23, 0.14, 0.16],
          [0.23, 0.14, 0.04],
        ],
        { color: '#182032', unlit: true, layer: 3.62 }
      );
      scene.addPoly3D(
        [
          [0.235, 0.09, 0.06],
          [0.235, 0.09, 0.1],
          [0.235, 0.13, 0.1],
          [0.235, 0.13, 0.06],
        ],
        { color: '#ffffff', unlit: true, layer: 3.65 }
      );
    });

    scene.withTransform({ translate: [0, bodyY + 0.1, -bodyL * 0.54], rotX: -26 }, () => {
      scene.taperBox(0, -0.72, 0, 0.22, 0.22, 0.14, 0.14, 0.78, {
        color: maneCol,
        material: 'matte',
        layer: 1.3,
      });
    });

    return { saddleY: bodyY + bodyH * 0.48, mountHalfW: bodyW * 0.56 };
  }

  if (kind === 'warg') {
    const p = PAL.orcs;
    const legH = 0.74;
    const bodyW = 0.92;
    const bodyH = 0.72;
    const bodyL = 1.76;
    const bodyY = legH + bodyH * 0.4;

    const lx = bodyW * 0.36;
    const lz = bodyL * 0.36;
    const legs = [
      [-lx, lz, -14, 1.4],
      [-lx, -lz, 14, 1.2],
      [lx, lz, 12, 4.2],
      [lx, -lz, -12, 4.1],
    ];
    for (const [x, z, rx, lyr] of legs) {
      scene.withTransform({ translate: [x, legH, z], rotX: rx }, () => {
        scene.box(0, -legH * 0.46, 0, 0.25, legH * 0.92, 0.27, {
          color: p.warg,
          material: 'matte',
          layer: lyr,
          groundContact: true,
        });
        scene.box(0, -legH + 0.09, 0.06, 0.28, 0.18, 0.32, {
          color: p.wargDark,
          material: 'matte',
          layer: lyr + 0.05,
          groundContact: true,
        });
      });
    }

    scene.taperBox(0, bodyY - bodyH * 0.5, 0, bodyW * 0.88, bodyL, bodyW * 1.06, bodyL * 0.96, bodyH, {
      color: p.warg,
      material: 'matte',
      layer: 2.6,
    });
    for (const sz of [0.5, 0.28, -0.46]) {
      scene.pyramid(0, bodyY + bodyH * 0.44, sz, 0.16, 0.18, 0.34, {
        tipOffZ: -0.14,
        color: p.wargDark,
        material: 'matte',
        layer: 2.75,
      });
    }
    scene.box(0, bodyY + 0.08, -0.08, bodyW * 1.08, 0.56, 0.78, {
      color: p.primary,
      material: 'matte',
      layer: 2.8,
    });

    scene.withTransform({ translate: [0, bodyY + 0.36, bodyL * 0.68], rotX: 12 }, () => {
      scene.box(0, 0.04, 0, 0.66, 0.56, 0.62, { color: p.warg, material: 'matte', layer: 3.4 });
      scene.box(0, 0.02, 0.46, 0.42, 0.26, 0.42, { color: p.wargDark, material: 'matte', layer: 3.45 });
      scene.box(0, -0.22, 0.42, 0.36, 0.14, 0.38, {
        color: p.wargDark,
        material: 'matte',
        layer: 3.44,
        tf: { pivot: [0, -0.15, 0.22], rotX: 18 },
      });
      for (const fx of [-0.14, 0.14]) {
        scene.pyramid(fx, -0.08, 0.58, 0.045, 0.045, -0.16, {
          color: '#f8fafc',
          material: 'matte',
          layer: 3.55,
        });
      }
      for (const sx of [-0.22, 0.22]) {
        scene.pyramid(sx, 0.3, -0.06, 0.1, 0.1, 0.32, {
          tipOffX: sx * 0.4,
          color: p.wargDark,
          material: 'matte',
          layer: 3.5,
        });
      }
      scene.box(0.34, 0.14, 0.16, 0.04, 0.12, 0.16, {
        color: p.eyeGlow,
        material: 'glow',
        layer: 3.6,
      });
      scene.box(-0.34, 0.14, 0.16, 0.04, 0.12, 0.16, {
        color: p.eyeGlow,
        material: 'glow',
        layer: 3.6,
      });
    });

    scene.withTransform({ translate: [0, bodyY + 0.08, -bodyL * 0.54], rotX: -38 }, () => {
      scene.pyramid(0, 0, 0, 0.18, 0.18, -0.78, { color: p.wargDark, material: 'matte', layer: 1.3 });
    });

    return { saddleY: bodyY + bodyH * 0.44, mountHalfW: bodyW * 0.58 };
  }

  // MOUNTAIN WAR-RAM (for Dwarf Rider — stout, armored, huge curled golden-bronze horns!)
  const p = PAL.dwarves;
  const legH = 0.54;
  const bodyW = 0.88;
  const bodyH = 0.64;
  const bodyL = 1.46;
  const bodyY = legH + bodyH * 0.42;

  const lx = bodyW * 0.35;
  const lz = bodyL * 0.35;
  const legs = [
    [-lx, lz, -10, 1.4],
    [-lx, -lz, 10, 1.2],
    [lx, lz, 10, 4.2],
    [lx, -lz, -10, 4.1],
  ];
  for (const [x, z, rx, lyr] of legs) {
    scene.withTransform({ translate: [x, legH, z], rotX: rx }, () => {
      scene.box(0, -legH * 0.46, 0, 0.22, legH * 0.92, 0.24, {
        color: p.ramDark,
        material: 'matte',
        layer: lyr,
        groundContact: true,
      });
      scene.box(0, -legH + 0.08, 0.02, 0.24, 0.16, 0.26, {
        color: '#2b2522',
        material: 'matte',
        layer: lyr + 0.05,
        groundContact: true,
      });
    });
  }

  scene.box(0, bodyY, 0, bodyW, bodyH, bodyL, {
    color: p.ramWool,
    material: 'matte',
    layer: 2.6,
  });
  scene.box(0, bodyY - 0.18, -0.04, bodyW * 1.1, 0.1, bodyL * 0.56, {
    color: p.primary,
    material: 'gold',
    layer: 2.75,
  });
  scene.box(0, bodyY + 0.08, -0.04, bodyW * 1.08, bodyH * 0.68, bodyL * 0.54, {
    color: p.tunic,
    material: 'matte',
    layer: 2.82,
  });

  // Armored Ram Head + BIG CURLED GOLDEN-BRONZE RAM HORNS!
  scene.withTransform({ translate: [0, bodyY + 0.24, bodyL * 0.62], rotX: 14 }, () => {
    scene.box(0, 0, 0, 0.52, 0.48, 0.56, { color: p.ramDark, material: 'matte', layer: 3.4 });
    scene.box(0, 0.12, 0.14, 0.46, 0.26, 0.42, { color: p.primary, material: 'gold', layer: 3.5 });
    for (const side of [-1, 1]) {
      const hornPts = [
        [0.02, 0.24],
        [-0.32, 0.46],
        [-0.56, 0.18],
        [-0.46, -0.24],
        [-0.1, -0.38],
        [0.18, -0.2],
        [0.08, -0.04],
        [-0.14, -0.16],
        [-0.3, -0.04],
        [-0.32, 0.18],
        [-0.12, 0.26],
      ];
      scene.extrudeX(hornPts, side < 0 ? -0.46 : 0.26, side < 0 ? -0.26 : 0.46, {
        color: p.ramHorn,
        material: 'gold',
        layer: side > 0 ? 3.7 : 3.2,
      });
    }
    scene.box(0.27, 0.04, 0.14, 0.03, 0.1, 0.1, { color: '#182032', material: 'unlit', layer: 3.6 });
    scene.box(-0.27, 0.04, 0.14, 0.03, 0.1, 0.1, { color: '#182032', material: 'unlit', layer: 3.6 });
  });

  scene.box(0, bodyY + 0.08, -bodyL * 0.54, 0.22, 0.22, 0.2, {
    color: p.ramWool,
    material: 'matte',
    layer: 1.3,
  });

  return { saddleY: bodyY + bodyH * 0.46, mountHalfW: bodyW * 0.58 };
}

// ============================================================================
// Chunky Polytopia Siege Catapults (+ Faction Crew Operator with Face!)
// ============================================================================

function drawPolytopiaCatapult(scene, faction) {
  const cfg = {
    humans: {
      wood: PAL.humans.wood,
      metal: PAL.humans.steel,
      trim: PAL.humans.gold,
      banner: PAL.humans.primary,
      payload: '#cbd5e1',
      payloadMat: 'matte',
      scale: 0.94,
      crewCfg: {
        tunicColor: PAL.humans.primary,
        trimColor: PAL.humans.gold,
        bootColor: PAL.humans.navy,
        skinColor: PAL.humans.skin,
        drawHeadgear: (head) => drawHumanHelmet(scene, head, 'cap', 9),
      },
    },
    orcs: {
      wood: PAL.orcs.wood,
      metal: PAL.orcs.iron,
      trim: PAL.orcs.rust,
      banner: PAL.orcs.primary,
      payload: PAL.orcs.magma,
      payloadMat: 'glow',
      scale: 0.94,
      crewCfg: {
        tunicColor: PAL.orcs.primary,
        trimColor: PAL.orcs.iron,
        bootColor: PAL.orcs.leather,
        skinColor: PAL.orcs.skin,
        drawHeadgear: (head) => drawOrcHelmet(scene, head, 'skullcap', 9),
      },
    },
    elves: {
      wood: PAL.elves.ivory,
      metal: PAL.elves.gold,
      trim: PAL.elves.gold,
      banner: PAL.elves.primary,
      payload: PAL.elves.starlight,
      payloadMat: 'glow',
      scale: 0.94,
      crewCfg: {
        tunicColor: PAL.elves.primary,
        trimColor: PAL.elves.gold,
        bootColor: PAL.elves.emeraldDark,
        skinColor: PAL.elves.skin,
        hairColor: PAL.elves.hairGold,
        drawHeadgear: (head) => drawElfHeadgear(scene, head, 'circlet', PAL.elves.hairGold, 9),
      },
    },
    dwarves: {
      wood: PAL.dwarves.wood,
      metal: PAL.dwarves.steel,
      trim: PAL.dwarves.primary,
      banner: PAL.dwarves.primary,
      payload: '#64748b',
      payloadMat: 'metal',
      scale: 0.84,
      crewCfg: {
        tunicColor: PAL.dwarves.tunic,
        trimColor: PAL.dwarves.primary,
        bootColor: PAL.dwarves.leather,
        skinColor: PAL.dwarves.skin,
        beardColor: PAL.dwarves.beardGold,
        drawHeadgear: (head) => drawDwarfHelmet(scene, head, 'runic', 9),
      },
    },
  }[faction];

  scene.withTransform({ translate: [-0.28, 0, 0.16], scale: cfg.scale }, () => {
    const wheelR = 0.42;
    const frameY = wheelR + 0.08;
    const frameW = 1.24;
    const frameL = 1.88;

    const wx = frameW * 0.56;
    const wz = frameL * 0.34;
    const wheels = [
      [-wx, wz, 1.5],
      [-wx, -wz, 1.4],
      [wx, wz, 5.2],
      [wx, -wz, 5.0],
    ];
    for (const [x, z, lyr] of wheels) {
      scene.cylinder(x, wheelR, z, wheelR, wheelR, 0.16, 8, 'x', {
        color: cfg.wood,
        material: 'matte',
        layer: lyr,
        groundContact: true,
      });
      scene.cylinder(x + (x > 0 ? 0.03 : -0.03), wheelR, z, wheelR * 0.42, wheelR * 0.42, 0.16, 6, 'x', {
        color: cfg.metal,
        material: 'metal',
        layer: lyr + 0.08,
      });
    }

    scene.box(-frameW * 0.42, frameY, 0, 0.2, 0.24, frameL, { color: cfg.wood, material: 'matte', layer: 2.2 });
    scene.box(frameW * 0.42, frameY, 0, 0.2, 0.24, frameL, { color: cfg.wood, material: 'matte', layer: 3.8 });
    scene.box(0, frameY, 0, frameW * 0.9, 0.2, frameL * 0.84, { color: cfg.wood, material: 'matte', layer: 2.5 });

    for (const sx of [-frameW * 0.42, frameW * 0.42]) {
      const lyr = sx < 0 ? 2.4 : 4.2;
      scene.box(sx, frameY + 0.62, 0.24, 0.18, 1.24, 0.22, { color: cfg.wood, material: 'matte', layer: lyr });
      scene.box(sx, frameY + 0.5, -0.18, 0.16, 1.15, 0.18, {
        color: cfg.wood,
        material: 'matte',
        layer: lyr,
        tf: { pivot: [sx, frameY + 0.5, -0.18], rotX: 34 },
      });
    }
    scene.box(0, frameY + 1.16, 0.24, frameW * 1.12, 0.2, 0.24, {
      color: cfg.trim,
      material: 'gold',
      layer: 3.4,
    });
    scene.box(0, frameY + 0.72, 0.4, 0.64, 0.68, 0.06, {
      color: cfg.banner,
      material: 'matte',
      layer: 3.5,
    });
    scene.box(0, frameY, frameL * 0.48, frameW * 1.04, 0.26, 0.12, {
      color: cfg.metal,
      material: 'metal',
      layer: 3.6,
    });

    scene.withTransform({ translate: [0, frameY + 0.34, 0.12], rotX: -48 }, () => {
      scene.box(0, 0.92, 0, 0.18, 1.92, 0.18, { color: cfg.wood, material: 'matte', layer: 3.0 });
      scene.taperBox(0, 1.72, 0.06, 0.36, 0.36, 0.58, 0.58, 0.26, {
        color: cfg.metal,
        material: 'metal',
        layer: 3.1,
      });
      scene.octahedron(0, 2.08, 0.08, 0.36, 0.34, 0.36, {
        color: cfg.payload,
        material: cfg.payloadMat,
        layer: 3.2,
      });
      if (faction === 'orcs') {
        scene.octahedron(0.08, 2.16, 0.24, 0.18, 0.18, 0.18, {
          color: PAL.orcs.magmaHot,
          material: 'glow',
          layer: 3.25,
        });
      } else if (faction === 'elves') {
        scene.octahedron(0, 2.12, 0.14, 0.2, 0.2, 0.2, {
          color: PAL.elves.starlightCore,
          material: 'glow',
          layer: 3.25,
        });
      }
    });
  });

  buildPolytopiaBody(scene, faction, {
    ...cfg.crewCfg,
    offsetX: 0.96,
    offsetZ: -0.18,
    bodyScale: 0.68,
    weaponArmRotX: -48,
    weaponArmRotZ: 18,
    offArmRotX: -20,
  });
}

// ============================================================================
// ALL 24 UNIT BUILDERS (4 Factions × 6 Units)
// ============================================================================

const SPRITE_BUILDERS = {
  // ------------------------ HUMANS (Gondor & Rohan) ------------------------
  humans_warrior() {
    const p = PAL.humans;
    const s = new PolyScene({ yawDeg: -26, pitchDeg: 19 });
    buildPolytopiaBody(s, 'humans', {
      tunicColor: p.primary,
      trimColor: p.gold,
      bootColor: p.navy,
      skinColor: p.skin,
      pauldronColor: p.steel,
      pauldronMat: 'metal',
      cloakColor: p.primaryDark,
      chestEmblem: 'white_tree',
      weaponArmRotX: -34,
      weaponArmRotZ: 28,
      offArmRotX: -24,
      drawWeaponInHand: (x, y, z) =>
        drawSword(s, x - 0.06, y + 0.06, z + 0.06, {
          bladeCol: '#e8f0f8',
          guardCol: p.gold,
          rotZ: 24,
          rotX: -10,
        }),
      drawHeadgear: (head) => drawHumanHelmet(s, head, 'winged', 9),
    });
    return s;
  },

  humans_defender() {
    const p = PAL.humans;
    const s = new PolyScene({ yawDeg: -24, pitchDeg: 19 });
    buildPolytopiaBody(s, 'humans', {
      tunicColor: p.primary,
      trimColor: p.gold,
      bootColor: p.steelMid,
      bootMat: 'metal',
      skinColor: p.skin,
      armorColor: p.steel,
      pauldronColor: p.steel,
      cloakColor: p.navy,
      weaponArmRotX: -30,
      weaponArmRotZ: 24,
      offArmRotX: -52,
      offArmRotZ: -8,
      drawWeaponInHand: (x, y, z) =>
        drawSword(s, x - 0.06, y + 0.08, z + 0.04, {
          len: 1.0,
          bladeCol: p.steel,
          guardCol: p.gold,
          rotZ: 22,
          rotX: -8,
        }),
      drawOffhandInHand: (x, y, z) =>
        drawShield(s, x + 0.1, y + 0.16, z + 0.24, 'gondor_kite', { scale: 1.18, rotY: 20 }),
      drawHeadgear: (head) => drawHumanHelmet(s, head, 'defender_crest', 9),
    });
    return s;
  },

  humans_archer() {
    const p = PAL.humans;
    const s = new PolyScene({ yawDeg: -28, pitchDeg: 19 });
    buildPolytopiaBody(s, 'humans', {
      tunicColor: p.primary,
      trimColor: p.gold,
      bootColor: p.leather,
      skinColor: p.skin,
      cloakColor: p.navy,
      hasQuiver: true,
      quiverFletch: '#f8fafc',
      cleanShaven: true,
      weaponArmRotX: -70,
      weaponArmRotZ: 14,
      offArmRotX: -54,
      offArmRotZ: -16,
      drawBodyProp: ({ shY, leftArmX }) =>
        drawUprightBow(s, leftArmX - 0.22, shY - 0.1, 0.72, {
          bowCol: p.wood,
          arrowCol: '#dce6f2',
          fletchCol: '#f8fafc',
          scale: 1.05,
        }),
      drawHeadgear: (head) => drawHumanHelmet(s, head, 'ranger_hood', 9),
    });
    return s;
  },

  humans_rider() {
    const p = PAL.humans;
    const s = new PolyScene({ yawDeg: -35, pitchDeg: 19 });
    const { saddleY, mountHalfW } = drawPolytopiaMount(s, 'horse_brown');
    buildPolytopiaBody(s, 'humans', {
      isMounted: true,
      baseY: saddleY - 0.12,
      offsetZ: -0.08,
      bodyScale: 0.78,
      mountHalfW,
      headYaw: 14,
      tunicColor: p.primary,
      trimColor: p.gold,
      bootColor: p.leather,
      skinColor: p.skin,
      pauldronColor: p.steel,
      cloakColor: p.primaryDark,
      weaponArmRotX: -46,
      weaponArmRotZ: 28,
      offArmRotX: -52,
      drawWeaponInHand: (x, y, z) =>
        drawSword(s, x - 0.06, y + 0.08, z + 0.04, {
          len: 1.24,
          bladeCol: '#e8f0f8',
          guardCol: p.gold,
          rotZ: 24,
          rotX: -12,
        }),
      drawHeadgear: (head) => drawHumanHelmet(s, head, 'cap', 9),
    });
    return s;
  },

  humans_catapult() {
    const s = new PolyScene({ yawDeg: -32, pitchDeg: 20 });
    drawPolytopiaCatapult(s, 'humans');
    return s;
  },

  humans_rohirrim_knight() {
    const p = PAL.humans;
    const s = new PolyScene({ yawDeg: -35, pitchDeg: 19 });
    const { saddleY, mountHalfW } = drawPolytopiaMount(s, 'horse_rohirrim');
    buildPolytopiaBody(s, 'humans', {
      isMounted: true,
      baseY: saddleY - 0.1,
      offsetZ: -0.06,
      bodyScale: 0.82,
      mountHalfW,
      headYaw: 14,
      tunicColor: p.rohanGreen,
      trimColor: p.gold,
      bootColor: p.steel,
      bootMat: 'metal',
      skinColor: p.skin,
      armorColor: p.steel,
      pauldronColor: p.gold,
      pauldronMat: 'gold',
      cloakColor: p.primary,
      weaponArmRotX: -60,
      weaponArmRotZ: 22,
      offArmRotX: -48,
      drawBodyProp: ({ shY, leftArmX }) => {
        // Bold heroic diagonal Jousting Lance + fluttering crimson pennon cleanly on rider's right!
        s.withTransform({ translate: [leftArmX - 0.26, shY - 0.12, 0.56], rotX: 62, rotZ: 14 }, () => {
          s.cylinder(0, 0.56, 0, 0.12, 0.03, 2.45, 6, 'y', {
            color: p.gold,
            material: 'gold',
            layer: 10.6,
          });
          s.cylinder(0, 0.24, 0, 0.125, 0.1, 0.36, 6, 'y', {
            color: p.primary,
            material: 'matte',
            layer: 10.65,
          });
          s.cylinder(0, 0.92, 0, 0.09, 0.068, 0.36, 6, 'y', {
            color: p.primary,
            material: 'matte',
            layer: 10.65,
          });
          s.cylinder(0, -0.26, 0, 0.2, 0.11, 0.28, 6, 'y', {
            color: p.steel,
            material: 'metal',
            layer: 10.68,
          });
          // Crisp triangular fluttering crimson pennon hanging cleanly beneath the charging lance!
          s.extrudeX(
            [
              [-0.04, 1.38],
              [-0.04, 0.96],
              [0.54, 1.18],
            ],
            -0.035,
            0.035,
            { color: p.plumeRed, material: 'matte', layer: 10.58 }
          );
        });
      },
      drawOffhandInHand: (x, y, z) =>
        drawShield(s, x + 0.08, y + 0.14, z + 0.18, 'gondor_kite', { scale: 0.86, rotY: 24 }),
      drawHeadgear: (head) => drawHumanHelmet(s, head, 'rohirrim_plume', 9),
    });
    return s;
  },

  // ------------------------ ORCS (Mordor & Isengard) ------------------------
  orcs_warrior() {
    const p = PAL.orcs;
    const s = new PolyScene({ yawDeg: -26, pitchDeg: 19 });
    buildPolytopiaBody(s, 'orcs', {
      tunicColor: p.primary,
      trimColor: p.iron,
      bootColor: p.leather,
      skinColor: p.skin,
      pauldronColor: p.iron,
      pauldronMat: 'dark_metal',
      sleeveColor: p.skin,
      beltColor: p.leather,
      chestEmblem: 'orc_straps',
      weaponArmRotX: -36,
      weaponArmRotZ: 28,
      offArmRotX: -24,
      drawWeaponInHand: (x, y, z) => drawOrcCleaver(s, x - 0.08, y + 0.04, z + 0.08, { rotZ: 24 }),
      drawHeadgear: (head) => drawOrcHelmet(s, head, 'horned', 9),
    });
    return s;
  },

  orcs_defender() {
    const p = PAL.orcs;
    const s = new PolyScene({ yawDeg: -24, pitchDeg: 19 });
    buildPolytopiaBody(s, 'orcs', {
      tunicColor: p.crimsonDark,
      trimColor: p.rust,
      bootColor: p.iron,
      bootMat: 'dark_metal',
      skinColor: p.skin,
      armorColor: p.iron,
      armorMat: 'dark_metal',
      pauldronColor: p.iron,
      pauldronMat: 'dark_metal',
      sleeveColor: p.skinDark,
      weaponArmRotX: -32,
      weaponArmRotZ: 26,
      offArmRotX: -54,
      offArmRotZ: -8,
      drawWeaponInHand: (x, y, z) => drawOrcCleaver(s, x - 0.08, y + 0.08, z + 0.04, { scale: 0.86, rotZ: 24 }),
      drawOffhandInHand: (x, y, z) =>
        drawShield(s, x + 0.12, y + 0.14, z + 0.24, 'orc_spiked', { scale: 1.18, rotY: 20 }),
      drawHeadgear: (head) => drawOrcHelmet(s, head, 'spiked_bucket', 9),
    });
    return s;
  },

  orcs_archer() {
    const p = PAL.orcs;
    const s = new PolyScene({ yawDeg: -28, pitchDeg: 19 });
    buildPolytopiaBody(s, 'orcs', {
      tunicColor: p.primary,
      trimColor: p.iron,
      bootColor: p.leather,
      skinColor: p.skin,
      sleeveColor: p.skin,
      cloakColor: p.crimsonDark,
      hasQuiver: true,
      quiverFletch: p.primary,
      chestEmblem: 'orc_straps',
      weaponArmRotX: -70,
      weaponArmRotZ: 14,
      offArmRotX: -54,
      offArmRotZ: -16,
      drawBodyProp: ({ shY, leftArmX }) =>
        drawUprightBow(s, leftArmX - 0.24, shY - 0.12, 0.76, {
          bowCol: '#3d2a22',
          arrowCol: '#646b78',
          fletchCol: p.primary,
          jagged: true,
          scale: 1.05,
        }),
      drawHeadgear: (head) => drawOrcHelmet(s, head, 'skullcap', 9),
    });
    return s;
  },

  orcs_rider() {
    const p = PAL.orcs;
    const s = new PolyScene({ yawDeg: -35, pitchDeg: 19 });
    const { saddleY, mountHalfW } = drawPolytopiaMount(s, 'warg');
    buildPolytopiaBody(s, 'orcs', {
      isMounted: true,
      baseY: saddleY - 0.12,
      offsetZ: -0.06,
      bodyScale: 0.78,
      mountHalfW,
      headYaw: 14,
      tunicColor: p.primary,
      trimColor: p.iron,
      bootColor: p.leather,
      skinColor: p.skin,
      sleeveColor: p.skin,
      pauldronColor: p.iron,
      pauldronMat: 'dark_metal',
      weaponArmRotX: -44,
      weaponArmRotZ: 28,
      offArmRotX: -52,
      drawWeaponInHand: (x, y, z) =>
        drawOrcCleaver(s, x - 0.08, y + 0.06, z + 0.06, { rotZ: 26, scale: 1.05 }),
      drawHeadgear: (head) => drawOrcHelmet(s, head, 'horned', 9),
    });
    return s;
  },

  orcs_catapult() {
    const s = new PolyScene({ yawDeg: -32, pitchDeg: 20 });
    drawPolytopiaCatapult(s, 'orcs');
    return s;
  },

  orcs_uruk_berserker() {
    const p = PAL.orcs;
    const s = new PolyScene({ yawDeg: -26, pitchDeg: 19 });
    buildPolytopiaBody(s, 'orcs', {
      isUruk: true,
      tunicColor: '#2d292d',
      trimColor: p.primary,
      bootColor: p.iron,
      bootMat: 'dark_metal',
      skinColor: p.urukSkin,
      sleeveColor: p.urukSkin,
      pauldronColor: p.iron,
      pauldronMat: 'dark_metal',
      beltColor: p.primary,
      chestEmblem: 'orc_straps',
      weaponArmRotX: -42,
      weaponArmRotZ: 30,
      offArmRotX: -30,
      offArmRotZ: -20,
      drawWeaponInHand: (x, y, z) =>
        drawOrcCleaver(s, x - 0.1, y + 0.08, z + 0.1, { scale: 1.32, rotZ: 24, rotX: -10 }),
      drawHeadgear: (head) => drawOrcHelmet(s, head, 'uruk', 9),
    });
    return s;
  },

  // ------------------------ ELVES (Lothlórien & Rivendell) ------------------------
  elves_warrior() {
    const p = PAL.elves;
    const s = new PolyScene({ yawDeg: -26, pitchDeg: 19 });
    buildPolytopiaBody(s, 'elves', {
      tunicColor: p.primary,
      trimColor: p.gold,
      bootColor: p.emeraldDark,
      skinColor: p.skin,
      pauldronColor: p.gold,
      pauldronMat: 'gold',
      cloakColor: p.ivory,
      chestEmblem: 'elven_v',
      hairColor: p.hairGold,
      weaponArmRotX: -34,
      weaponArmRotZ: 28,
      offArmRotX: -24,
      drawWeaponInHand: (x, y, z) => drawElvenBlade(s, x - 0.06, y + 0.08, z + 0.06, { rotZ: 24 }),
      drawHeadgear: (head) => drawElfHeadgear(s, head, 'winged_helm', p.hairGold, 9),
    });
    return s;
  },

  elves_defender() {
    const p = PAL.elves;
    const s = new PolyScene({ yawDeg: -24, pitchDeg: 19 });
    buildPolytopiaBody(s, 'elves', {
      tunicColor: p.ivory,
      trimColor: p.gold,
      bootColor: p.goldDeep,
      bootMat: 'gold',
      skinColor: p.skin,
      armorColor: p.gold,
      armorMat: 'gold',
      pauldronColor: p.gold,
      pauldronMat: 'gold',
      cloakColor: p.primary,
      hairColor: p.hairSilver,
      weaponArmRotX: -32,
      weaponArmRotZ: 24,
      offArmRotX: -52,
      offArmRotZ: -8,
      drawWeaponInHand: (x, y, z) => {
        s.withTransform({ translate: [x - 0.08, y + 0.1, z + 0.04], rotZ: 14 }, () => {
          s.cylinder(0, 0.45, 0, 0.05, 0.05, 2.05, 6, 'y', { color: p.wood, material: 'matte', layer: 10 });
          s.pyramid(0, 1.48, 0, 0.1, 0.05, 0.42, { color: p.steel, material: 'metal', layer: 10.1 });
        });
      },
      drawOffhandInHand: (x, y, z) =>
        drawShield(s, x + 0.1, y + 0.18, z + 0.24, 'elven_leaf', { scale: 1.2, rotY: 20 }),
      drawHeadgear: (head) => drawElfHeadgear(s, head, 'defender_helm', p.hairSilver, 9),
    });
    return s;
  },

  elves_archer() {
    const p = PAL.elves;
    const s = new PolyScene({ yawDeg: -28, pitchDeg: 19 });
    buildPolytopiaBody(s, 'elves', {
      tunicColor: p.primary,
      trimColor: p.gold,
      bootColor: p.emeraldDark,
      skinColor: p.skin,
      cloakColor: p.ivory,
      chestEmblem: 'elven_v',
      hasQuiver: true,
      quiverFletch: p.gold,
      hairColor: p.hairGold,
      weaponArmRotX: -70,
      weaponArmRotZ: 14,
      offArmRotX: -54,
      offArmRotZ: -16,
      drawBodyProp: ({ shY, leftArmX }) =>
        drawUprightBow(s, leftArmX - 0.22, shY - 0.1, 0.72, {
          bowCol: p.wood,
          arrowCol: p.steel,
          fletchCol: p.gold,
          scale: 1.1,
        }),
      drawHeadgear: (head) => drawElfHeadgear(s, head, 'circlet', p.hairGold, 9),
    });
    return s;
  },

  elves_rider() {
    const p = PAL.elves;
    const s = new PolyScene({ yawDeg: -35, pitchDeg: 19 });
    const { saddleY, mountHalfW } = drawPolytopiaMount(s, 'horse_elf');
    buildPolytopiaBody(s, 'elves', {
      isMounted: true,
      baseY: saddleY - 0.12,
      offsetZ: -0.08,
      bodyScale: 0.78,
      mountHalfW,
      headYaw: 14,
      tunicColor: p.primary,
      trimColor: p.gold,
      bootColor: p.emeraldDark,
      skinColor: p.skin,
      pauldronColor: p.gold,
      pauldronMat: 'gold',
      cloakColor: p.ivory,
      hairColor: p.hairSilver,
      weaponArmRotX: -46,
      weaponArmRotZ: 28,
      offArmRotX: -52,
      drawWeaponInHand: (x, y, z) => drawElvenBlade(s, x - 0.06, y + 0.08, z + 0.04, { rotZ: 24 }),
      drawHeadgear: (head) => drawElfHeadgear(s, head, 'circlet', p.hairSilver, 9),
    });
    return s;
  },

  elves_catapult() {
    const s = new PolyScene({ yawDeg: -32, pitchDeg: 20 });
    drawPolytopiaCatapult(s, 'elves');
    return s;
  },

  elves_elven_sentinel() {
    const p = PAL.elves;
    const s = new PolyScene({ yawDeg: -28, pitchDeg: 19 });
    buildPolytopiaBody(s, 'elves', {
      tunicColor: p.ivory,
      trimColor: p.gold,
      bootColor: p.emeraldDark,
      skinColor: p.skin,
      pauldronColor: p.gold,
      pauldronMat: 'gold',
      cloakColor: p.primary,
      chestEmblem: 'elven_v',
      hasQuiver: true,
      quiverFletch: p.starlight,
      hairColor: p.hairSilver,
      weaponArmRotX: -70,
      weaponArmRotZ: 14,
      offArmRotX: -54,
      offArmRotZ: -16,
      drawBodyProp: ({ shY, leftArmX }) =>
        drawUprightBow(s, leftArmX - 0.24, shY - 0.08, 0.76, {
          bowCol: p.gold,
          bowMat: 'gold',
          fletchCol: p.starlightCore,
          glowingArrow: true,
          scale: 1.18,
        }),
      drawHeadgear: (head) => drawElfHeadgear(s, head, 'sentinel', p.hairSilver, 9),
    });
    return s;
  },

  // ------------------------ DWARVES (Erebor & Khazad-dûm — SHORT & STOUT!) ------------------------
  dwarves_warrior() {
    const p = PAL.dwarves;
    const s = new PolyScene({ yawDeg: -26, pitchDeg: 19 });
    buildPolytopiaBody(s, 'dwarves', {
      tunicColor: p.tunic,
      trimColor: p.primary,
      bootColor: p.leather,
      skinColor: p.skin,
      armorColor: p.steel,
      pauldronColor: p.steel,
      beardColor: p.beardCopper,
      weaponArmRotX: -32,
      weaponArmRotZ: 30,
      offArmRotX: -24,
      drawWeaponInHand: (x, y, z) =>
        drawDwarfAxe(s, x - 0.1, y + 0.06, z + 0.06, { bladeCol: p.steel, trimCol: p.primary, rotZ: 28 }),
      drawHeadgear: (head) => drawDwarfHelmet(s, head, 'horned', 9),
    });
    return s;
  },

  dwarves_defender() {
    const p = PAL.dwarves;
    const s = new PolyScene({ yawDeg: -24, pitchDeg: 19 });
    buildPolytopiaBody(s, 'dwarves', {
      tunicColor: p.tunicSlate,
      trimColor: p.primary,
      bootColor: p.steel,
      bootMat: 'metal',
      skinColor: p.skin,
      armorColor: p.steel,
      pauldronColor: p.primary,
      pauldronMat: 'gold',
      beardColor: p.beardBrown,
      weaponArmRotX: -30,
      weaponArmRotZ: 28,
      offArmRotX: -52,
      offArmRotZ: -8,
      drawWeaponInHand: (x, y, z) =>
        drawDwarfAxe(s, x - 0.1, y + 0.08, z + 0.04, { scale: 0.86, bladeCol: p.steel, trimCol: p.primary, rotZ: 28 }),
      drawOffhandInHand: (x, y, z) =>
        drawShield(s, x + 0.12, y + 0.12, z + 0.24, 'dwarf_octagonal', { scale: 1.15, rotY: 20 }),
      drawHeadgear: (head) => drawDwarfHelmet(s, head, 'defender', 9),
    });
    return s;
  },

  dwarves_archer() {
    const p = PAL.dwarves;
    const s = new PolyScene({ yawDeg: -28, pitchDeg: 19 });
    buildPolytopiaBody(s, 'dwarves', {
      tunicColor: p.tunic,
      trimColor: p.primary,
      bootColor: p.leather,
      skinColor: p.skin,
      pauldronColor: p.steel,
      beardColor: p.beardGold,
      hasQuiver: true,
      quiverFletch: p.primary,
      weaponArmRotX: -66,
      weaponArmRotZ: 14,
      offArmRotX: -54,
      offArmRotZ: -16,
      drawBodyProp: ({ shY, leftArmX }) =>
        drawUprightCrossbow(s, leftArmX - 0.18, shY - 0.16, 0.72),
      drawHeadgear: (head) => drawDwarfHelmet(s, head, 'runic', 9),
    });
    return s;
  },

  dwarves_rider() {
    const p = PAL.dwarves;
    const s = new PolyScene({ yawDeg: -35, pitchDeg: 19 });
    const { saddleY, mountHalfW } = drawPolytopiaMount(s, 'ram');
    buildPolytopiaBody(s, 'dwarves', {
      isMounted: true,
      baseY: saddleY - 0.1,
      offsetZ: -0.06,
      bodyScale: 0.78,
      mountHalfW,
      headYaw: 14,
      tunicColor: p.tunic,
      trimColor: p.primary,
      bootColor: p.leather,
      skinColor: p.skin,
      armorColor: p.steel,
      pauldronColor: p.primary,
      pauldronMat: 'gold',
      beardColor: p.beardCopper,
      weaponArmRotX: -44,
      weaponArmRotZ: 30,
      offArmRotX: -52,
      drawWeaponInHand: (x, y, z) =>
        drawDwarfAxe(s, x - 0.1, y + 0.06, z + 0.06, {
          scale: 0.96,
          bladeCol: p.mithril,
          trimCol: p.primary,
          rotZ: 28,
        }),
      drawHeadgear: (head) => drawDwarfHelmet(s, head, 'horned', 9),
    });
    return s;
  },

  dwarves_catapult() {
    const s = new PolyScene({ yawDeg: -32, pitchDeg: 20 });
    drawPolytopiaCatapult(s, 'dwarves');
    return s;
  },

  dwarves_ironbreaker() {
    const p = PAL.dwarves;
    const s = new PolyScene({ yawDeg: -25, pitchDeg: 19 });
    buildPolytopiaBody(s, 'dwarves', {
      tunicColor: p.tunicSlate,
      trimColor: p.primary,
      bootColor: p.mithril,
      bootMat: 'metal',
      skinColor: p.skin,
      armorColor: p.mithril,
      armorMat: 'metal',
      pauldronColor: p.mithril,
      pauldronMat: 'metal',
      beardColor: p.beardGold,
      weaponArmRotX: -32,
      weaponArmRotZ: 34,
      offArmRotX: -52,
      offArmRotZ: -8,
      drawWeaponInHand: (x, y, z) =>
        drawDwarfAxe(s, x - 0.14, y + 0.06, z + 0.06, {
          doubleHead: true,
          scale: 1.04,
          bladeCol: p.mithril,
          trimCol: p.primary,
          rotZ: 30,
        }),
      drawOffhandInHand: (x, y, z) =>
        drawShield(s, x + 0.14, y + 0.12, z + 0.24, 'dwarf_octagonal', {
          scale: 1.12,
          rotY: 20,
          mithril: true,
        }),
      drawHeadgear: (head) => drawDwarfHelmet(s, head, 'ironbreaker', 9),
    });
    return s;
  },
};

// ============================================================================
// Main Execution
// ============================================================================

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const keys = Object.keys(SPRITE_BUILDERS);
  console.log(`Generating ${keys.length} unified Polytopia-style SVG sprites in ${OUT_DIR}...`);

  for (const key of keys) {
    const scene = SPRITE_BUILDERS[key]();
    const svg = scene.toSVG(key);
    const outPath = path.join(OUT_DIR, `${key}.svg`);
    fs.writeFileSync(outPath, svg, 'utf8');
    console.log(`  ✓ ${key}.svg (${scene.polys.length} flat-shaded facets, ${svg.length} bytes)`);
  }

  console.log('Done! All 24 Polytopia sprites generated.');
}

main();
