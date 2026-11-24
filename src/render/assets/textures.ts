import * as THREE from 'three';

export interface TexturedMaterialOptions {
  color?: string | number;
  roughness?: number;
  metalness?: number;
  bumpScale?: number;
  emissive?: string | number;
  emissiveIntensity?: number;
  transparent?: boolean;
  opacity?: number;
  flatShading?: boolean;
  repeatX?: number;
  repeatY?: number;
}

export type SurfaceTextureKind =
  | 'grass'
  | 'forest_floor'
  | 'ancient_floor'
  | 'wasteland'
  | 'water'
  | 'rock'
  | 'orc_rock'
  | 'snow'
  | 'bark'
  | 'foliage'
  | 'mallorn_foliage'
  | 'cobble'
  | 'stone_masonry'
  | 'marble_masonry'
  | 'dark_iron'
  | 'granite_runic'
  | 'roof_shingles'
  | 'thatch'
  | 'timber'
  | 'farm_soil'
  | 'wheat'
  | 'road_cobble'
  | 'bedrock_skirt'
  | 'cloud';

interface TexturePair {
  map: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
}

interface DefaultMaterialProfile {
  roughness: number;
  metalness: number;
  bumpScale: number;
}

const TEX_SIZE = 256;

const DEFAULT_PROFILES: Record<SurfaceTextureKind, DefaultMaterialProfile> = {
  grass: { roughness: 0.88, metalness: 0.0, bumpScale: 0.028 },
  forest_floor: { roughness: 0.9, metalness: 0.0, bumpScale: 0.032 },
  ancient_floor: { roughness: 0.85, metalness: 0.02, bumpScale: 0.03 },
  wasteland: { roughness: 0.9, metalness: 0.04, bumpScale: 0.055 },
  water: { roughness: 0.24, metalness: 0.08, bumpScale: 0.032 },
  rock: { roughness: 0.86, metalness: 0.02, bumpScale: 0.054 },
  orc_rock: { roughness: 0.84, metalness: 0.06, bumpScale: 0.06 },
  snow: { roughness: 0.72, metalness: 0.02, bumpScale: 0.024 },
  bark: { roughness: 0.92, metalness: 0.0, bumpScale: 0.05 },
  foliage: { roughness: 0.84, metalness: 0.0, bumpScale: 0.032 },
  mallorn_foliage: { roughness: 0.8, metalness: 0.03, bumpScale: 0.032 },
  cobble: { roughness: 0.85, metalness: 0.02, bumpScale: 0.048 },
  stone_masonry: { roughness: 0.86, metalness: 0.02, bumpScale: 0.048 },
  marble_masonry: { roughness: 0.6, metalness: 0.05, bumpScale: 0.034 },
  dark_iron: { roughness: 0.46, metalness: 0.56, bumpScale: 0.048 },
  granite_runic: { roughness: 0.82, metalness: 0.06, bumpScale: 0.052 },
  roof_shingles: { roughness: 0.82, metalness: 0.02, bumpScale: 0.046 },
  thatch: { roughness: 0.92, metalness: 0.0, bumpScale: 0.048 },
  timber: { roughness: 0.86, metalness: 0.0, bumpScale: 0.042 },
  farm_soil: { roughness: 0.94, metalness: 0.0, bumpScale: 0.058 },
  wheat: { roughness: 0.86, metalness: 0.0, bumpScale: 0.04 },
  road_cobble: { roughness: 0.85, metalness: 0.02, bumpScale: 0.048 },
  bedrock_skirt: { roughness: 0.92, metalness: 0.0, bumpScale: 0.05 },
  cloud: { roughness: 0.95, metalness: 0.0, bumpScale: 0.018 },
};

// ============================================================================
// Deterministic Math, Seamless Periodic Noise, & Canvas Helpers
// ============================================================================

function makeRng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash2i(ix: number, iy: number, seed: number): number {
  let h = Math.imul(ix, 374761393) + Math.imul(iy, 668265263) + Math.imul(seed, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function clampByte(v: number): number {
  return v < 0 ? 0 : v > 255 ? 255 : Math.round(v);
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/** Smooth 2D value noise that wraps seamlessly over [0, 1) with integer periods (px, py). */
function periodicNoise(u: number, v: number, px: number, py: number, seed: number): number {
  const x = u * px;
  const y = v * py;
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);

  const ix0 = mod(x0, px);
  const ix1 = mod(x0 + 1, px);
  const iy0 = mod(y0, py);
  const iy1 = mod(y0 + 1, py);

  const n00 = hash2i(ix0, iy0, seed);
  const n10 = hash2i(ix1, iy0, seed);
  const n01 = hash2i(ix0, iy1, seed);
  const n11 = hash2i(ix1, iy1, seed);

  const nx0 = n00 + (n10 - n00) * sx;
  const nx1 = n01 + (n11 - n01) * sx;
  return nx0 + (nx1 - nx0) * sy;
}

function periodicFbm(
  u: number,
  v: number,
  px: number,
  py: number,
  octaves: number,
  seed: number,
): number {
  let sum = 0;
  let amp = 0.5;
  let norm = 0;
  let freqX = px;
  let freqY = py;
  for (let i = 0; i < octaves; i++) {
    sum += amp * periodicNoise(u, v, freqX, freqY, seed + i * 97);
    norm += amp;
    amp *= 0.5;
    freqX *= 2;
    freqY *= 2;
  }
  return sum / norm;
}

interface VoronoiSample {
  d1: number;
  d2: number;
  edge: number;
  cellHash: number;
  dx: number;
  dy: number;
}

const sharedVoronoi: VoronoiSample = {
  d1: 0,
  d2: 0,
  edge: 0,
  cellHash: 0,
  dx: 0,
  dy: 0,
};

/** Tileable Worley / Voronoi cell sample over [0, 1) x [0, 1). Writes into `out`. */
function samplePeriodicVoronoi(
  u: number,
  v: number,
  cx: number,
  cy: number,
  jitter: number,
  seed: number,
  out: VoronoiSample = sharedVoronoi,
): VoronoiSample {
  const gx = u * cx;
  const gy = v * cy;
  const baseX = Math.floor(gx);
  const baseY = Math.floor(gy);

  let d1 = 1e9;
  let d2 = 1e9;
  let bestHash = 0;
  let bestDx = 0;
  let bestDy = 0;

  for (let oy = -1; oy <= 1; oy++) {
    for (let ox = -1; ox <= 1; ox++) {
      const cellX = baseX + ox;
      const cellY = baseY + oy;
      const wx = mod(cellX, cx);
      const wy = mod(cellY, cy);

      const jx = (hash2i(wx, wy, seed) - 0.5) * jitter;
      const jy = (hash2i(wx, wy, seed + 53) - 0.5) * jitter;

      const px = cellX + 0.5 + jx;
      const py = cellY + 0.5 + jy;
      const dx = gx - px;
      const dy = gy - py;
      const dist = Math.hypot(dx, dy);

      if (dist < d1) {
        d2 = d1;
        d1 = dist;
        bestHash = hash2i(wx, wy, seed + 131);
        bestDx = dx;
        bestDy = dy;
      } else if (dist < d2) {
        d2 = dist;
      }
    }
  }

  out.d1 = d1;
  out.d2 = d2;
  out.edge = d2 - d1;
  out.cellHash = bestHash;
  out.dx = bestDx;
  out.dy = bestDy;
  return out;
}

/** Draws a callback across 3x3 wrapped tile offsets for seamless 2D tiling. */
function drawWrapped(
  drawFn: (ox: number, oy: number) => void,
  size = TEX_SIZE,
): void {
  for (let oy = -size; oy <= size; oy += size) {
    for (let ox = -size; ox <= size; ox += size) {
      drawFn(ox, oy);
    }
  }
}

/** Draws a callback wrapped horizontally across [-size, 0, +size] for X-seamless bands. */
function drawWrappedX(
  drawFn: (ox: number) => void,
  size = TEX_SIZE,
): void {
  drawFn(-size);
  drawFn(0);
  drawFn(size);
}

function rgb(r: number, g: number, b: number, a = 1): string {
  const cr = clampByte(r);
  const cg = clampByte(g);
  const cb = clampByte(b);
  return a >= 1 ? `rgb(${cr},${cg},${cb})` : `rgba(${cr},${cg},${cb},${a.toFixed(3)})`;
}

function gray(v: number, a = 1): string {
  const c = clampByte(v);
  return a >= 1 ? `rgb(${c},${c},${c})` : `rgba(${c},${c},${c},${a.toFixed(3)})`;
}

function fillPixelPass(
  albedoCtx: CanvasRenderingContext2D,
  bumpCtx: CanvasRenderingContext2D,
  pixelFn: (
    u: number,
    v: number,
    x: number,
    y: number,
    outAlbedo: Uint8ClampedArray,
    outBump: Uint8ClampedArray,
    idx: number,
  ) => void,
): void {
  const aImg = albedoCtx.createImageData(TEX_SIZE, TEX_SIZE);
  const bImg = bumpCtx.createImageData(TEX_SIZE, TEX_SIZE);
  const aData = aImg.data;
  const bData = bImg.data;
  const inv = 1 / TEX_SIZE;

  for (let y = 0; y < TEX_SIZE; y++) {
    const v = y * inv;
    for (let x = 0; x < TEX_SIZE; x++) {
      const idx = (y * TEX_SIZE + x) * 4;
      pixelFn(x * inv, v, x, y, aData, bData, idx);
      aData[idx + 3] = 255;
      bData[idx + 3] = 255;
    }
  }

  albedoCtx.putImageData(aImg, 0, 0);
  bumpCtx.putImageData(bImg, 0, 0);
}

function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  const radius = Math.min(r, w * 0.5, h * 0.5);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// ============================================================================
// 24 Painterly Tabletop-Diorama Surface Texture Generators
// ============================================================================

function paintGrass(aCtx: CanvasRenderingContext2D, bCtx: CanvasRenderingContext2D): void {
  // Smooth warm painterly meadow wash + gentle tile edge-bevel shading
  fillPixelPass(aCtx, bCtx, (u, v, _x, _y, aOut, bOut, idx) => {
    const broad = periodicFbm(u, v, 3, 3, 3, 11);
    const wave = periodicNoise(u + 0.13 * Math.sin(v * Math.PI * 2), v, 5, 5, 29);

    // Subtle tabletop tile edge-bevel (bright top-left lip, soft bottom-right shadow)
    const edgeDist = Math.min(u, 1 - u, v, 1 - v);
    const edgeFactor = 1 - smoothstep(0.0, 0.085, edgeDist);
    const topLeftLight = (u + v < 1 ? 1 : -1) * edgeFactor * 5;

    const baseL = 228 + (broad - 0.5) * 24 + (wave - 0.5) * 10 + topLeftLight;
    aOut[idx] = clampByte(baseL - 3 + (broad - 0.5) * 6);
    aOut[idx + 1] = clampByte(baseL + 4);
    aOut[idx + 2] = clampByte(baseL - 7);

    const h = 132 + (broad - 0.5) * 34 + (wave - 0.5) * 16 - edgeFactor * 16;
    const bh = clampByte(h);
    bOut[idx] = bh;
    bOut[idx + 1] = bh;
    bOut[idx + 2] = bh;
  });

  const rng = makeRng(101);

  // Soft painterly gouache meadow brushstrokes
  for (let i = 0; i < 48; i++) {
    const cx = rng() * TEX_SIZE;
    const cy = rng() * TEX_SIZE;
    const rx = 14 + rng() * 24;
    const ry = 5 + rng() * 8;
    const angle = -0.35 + (rng() - 0.5) * 0.55;
    const bright = rng() > 0.45;
    const fillCol = bright ? rgb(252, 255, 236, 0.24) : rgb(206, 224, 198, 0.22);
    const bumpCol = bright ? gray(156, 0.22) : gray(116, 0.2);

    drawWrapped((ox, oy) => {
      aCtx.save();
      aCtx.translate(cx + ox, cy + oy);
      aCtx.rotate(angle);
      aCtx.fillStyle = fillCol;
      aCtx.beginPath();
      aCtx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      aCtx.fill();
      aCtx.restore();

      bCtx.save();
      bCtx.translate(cx + ox, cy + oy);
      bCtx.rotate(angle);
      bCtx.fillStyle = bumpCol;
      bCtx.beginPath();
      bCtx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      bCtx.fill();
      bCtx.restore();
    });
  }

  // Crisp subtle grass-blade tuft flecks (3-blade stylized clusters)
  for (let i = 0; i < 62; i++) {
    const tx = rng() * TEX_SIZE;
    const ty = rng() * TEX_SIZE;
    const scale = 0.75 + rng() * 0.6;
    const sunlit = rng() > 0.3;

    drawWrapped((ox, oy) => {
      const x = tx + ox;
      const y = ty + oy;

      // Soft root shadow
      aCtx.fillStyle = rgb(194, 212, 184, 0.35);
      aCtx.beginPath();
      aCtx.ellipse(x + 1, y + 1.5, 4.5 * scale, 1.8 * scale, 0, 0, Math.PI * 2);
      aCtx.fill();

      // 3 curved blades
      aCtx.strokeStyle = sunlit ? rgb(252, 255, 234, 0.72) : rgb(214, 232, 204, 0.65);
      aCtx.lineWidth = 1.6 * scale;
      aCtx.lineCap = 'round';

      bCtx.strokeStyle = gray(192, 0.65);
      bCtx.lineWidth = 1.8 * scale;
      bCtx.lineCap = 'round';

      const leans = [-4.2, -0.4, 3.8];
      const heights = [6.2, 8.0, 5.8];
      for (let k = 0; k < 3; k++) {
        const lx = leans[k] * scale;
        const lh = heights[k] * scale;

        aCtx.beginPath();
        aCtx.moveTo(x, y);
        aCtx.quadraticCurveTo(x + lx * 0.35, y - lh * 0.6, x + lx, y - lh);
        aCtx.stroke();

        bCtx.beginPath();
        bCtx.moveTo(x, y);
        bCtx.quadraticCurveTo(x + lx * 0.35, y - lh * 0.6, x + lx, y - lh);
        bCtx.stroke();
      }
    });
  }
}

function paintForestFloor(
  aCtx: CanvasRenderingContext2D,
  bCtx: CanvasRenderingContext2D,
  ancient: boolean,
): void {
  const seed = ancient ? 317 : 211;
  fillPixelPass(aCtx, bCtx, (u, v, _x, _y, aOut, bOut, idx) => {
    const moss = periodicFbm(u, v, 4, 4, 3, seed);
    const dapple = smoothstep(0.42, 0.78, periodicNoise(u, v, 3, 3, seed + 41));
    const micro = periodicNoise(u, v, 8, 8, seed + 83);

    const lum = (ancient ? 222 : 214) + (moss - 0.5) * 26 + dapple * 22 + (micro - 0.5) * 8;
    if (ancient) {
      // Luminous emerald-gold dappled moss
      aOut[idx] = clampByte(lum + dapple * 10 - 2);
      aOut[idx + 1] = clampByte(lum + 6);
      aOut[idx + 2] = clampByte(lum - 14 - dapple * 8);
    } else {
      // Woodland moss + soft warm dappled light
      aOut[idx] = clampByte(lum + dapple * 6 - 3);
      aOut[idx + 1] = clampByte(lum + 4);
      aOut[idx + 2] = clampByte(lum - 10);
    }

    const h = clampByte(126 + (moss - 0.5) * 44 + (micro - 0.5) * 18);
    bOut[idx] = h;
    bOut[idx + 1] = h;
    bOut[idx + 2] = h;
  });

  const rng = makeRng(seed + 500);

  // Soft pillowy moss patches
  for (let i = 0; i < 42; i++) {
    const cx = rng() * TEX_SIZE;
    const cy = rng() * TEX_SIZE;
    const r = 8 + rng() * 14;
    const warm = rng() > 0.45;
    const col = ancient
      ? warm
        ? rgb(246, 250, 212, 0.34)
        : rgb(202, 232, 206, 0.3)
      : warm
        ? rgb(236, 246, 214, 0.3)
        : rgb(196, 216, 188, 0.28);

    drawWrapped((ox, oy) => {
      const grad = aCtx.createRadialGradient(
        cx + ox - r * 0.25,
        cy + oy - r * 0.25,
        r * 0.1,
        cx + ox,
        cy + oy,
        r,
      );
      grad.addColorStop(0, col);
      grad.addColorStop(1, 'rgba(220,235,210,0)');
      aCtx.fillStyle = grad;
      aCtx.beginPath();
      aCtx.arc(cx + ox, cy + oy, r, 0, Math.PI * 2);
      aCtx.fill();

      const bGrad = bCtx.createRadialGradient(cx + ox, cy + oy, 0, cx + ox, cy + oy, r);
      bGrad.addColorStop(0, gray(185, 0.35));
      bGrad.addColorStop(1, gray(128, 0));
      bCtx.fillStyle = bGrad;
      bCtx.beginPath();
      bCtx.arc(cx + ox, cy + oy, r, 0, Math.PI * 2);
      bCtx.fill();
    });
  }

  // Scattered fallen leaf flecks (or golden Mallorn leaf silhouettes for ancient_floor)
  const leafCount = ancient ? 58 : 48;
  for (let i = 0; i < leafCount; i++) {
    const lx = rng() * TEX_SIZE;
    const ly = rng() * TEX_SIZE;
    const angle = rng() * Math.PI * 2;
    const len = ancient ? 5.2 + rng() * 4.5 : 3.5 + rng() * 3.4;
    const wid = ancient ? len * 0.44 : len * 0.56;

    const leafColor = ancient
      ? rng() > 0.25
        ? rgb(255, 240, 168, 0.88)
        : rgb(255, 224, 128, 0.85)
      : rng() > 0.5
        ? rgb(246, 228, 194, 0.72)
        : rgb(222, 232, 198, 0.68);

    drawWrapped((ox, oy) => {
      const x = lx + ox;
      const y = ly + oy;

      // Shadow
      aCtx.save();
      aCtx.translate(x + 1.1, y + 1.3);
      aCtx.rotate(angle);
      aCtx.fillStyle = rgb(168, 186, 162, 0.35);
      aCtx.beginPath();
      aCtx.moveTo(-len, 0);
      aCtx.quadraticCurveTo(0, -wid, len, 0);
      aCtx.quadraticCurveTo(0, wid, -len, 0);
      aCtx.fill();
      aCtx.restore();

      // Leaf body
      aCtx.save();
      aCtx.translate(x, y);
      aCtx.rotate(angle);
      aCtx.fillStyle = leafColor;
      aCtx.beginPath();
      aCtx.moveTo(-len, 0);
      aCtx.quadraticCurveTo(0, -wid, len, 0);
      aCtx.quadraticCurveTo(0, wid, -len, 0);
      aCtx.fill();

      if (ancient) {
        aCtx.strokeStyle = rgb(255, 252, 226, 0.7);
        aCtx.lineWidth = 0.8;
        aCtx.beginPath();
        aCtx.moveTo(-len * 0.75, 0);
        aCtx.lineTo(len * 0.75, 0);
        aCtx.stroke();
      }
      aCtx.restore();

      // Bump emboss
      bCtx.save();
      bCtx.translate(x, y);
      bCtx.rotate(angle);
      bCtx.fillStyle = gray(205, 0.6);
      bCtx.beginPath();
      bCtx.moveTo(-len, 0);
      bCtx.quadraticCurveTo(0, -wid, len, 0);
      bCtx.quadraticCurveTo(0, wid, -len, 0);
      bCtx.fill();
      bCtx.restore();
    });
  }

  // Subtle golden dew/pollen motes on ancient_floor
  if (ancient) {
    for (let i = 0; i < 24; i++) {
      const mx = rng() * TEX_SIZE;
      const my = rng() * TEX_SIZE;
      const mr = 1.2 + rng() * 1.4;
      drawWrapped((ox, oy) => {
        aCtx.fillStyle = rgb(255, 250, 212, 0.75);
        aCtx.beginPath();
        aCtx.arc(mx + ox, my + oy, mr, 0, Math.PI * 2);
        aCtx.fill();
      });
    }
  }
}

function paintWasteland(aCtx: CanvasRenderingContext2D, bCtx: CanvasRenderingContext2D): void {
  // Cracked polygonal basalt plates + warm ash dusting + faint glowing orange ember specks in deep crevices
  const fineSample: VoronoiSample = { d1: 0, d2: 0, edge: 0, cellHash: 0, dx: 0, dy: 0 };
  fillPixelPass(aCtx, bCtx, (u, v, _x, _y, aOut, bOut, idx) => {
    // Organic warp for natural basalt fractures
    const wx = (periodicNoise(u, v, 4, 4, 401) - 0.5) * 0.035;
    const wy = (periodicNoise(u, v, 4, 4, 419) - 0.5) * 0.035;
    const wu = mod(u + wx, 1);
    const wv = mod(v + wy, 1);

    const cell = samplePeriodicVoronoi(wu, wv, 6, 6, 0.82, 433);
    const fine = samplePeriodicVoronoi(wu, wv, 12, 12, 0.75, 461, fineSample);
    const ash = periodicFbm(u, v, 5, 5, 3, 479);

    const crackMask = 1 - smoothstep(0.015, 0.072, cell.edge);
    const fineCrack = (1 - smoothstep(0.008, 0.038, fine.edge)) * 0.36;
    const bevelRim = smoothstep(0.05, 0.095, cell.edge) * (1 - smoothstep(0.095, 0.16, cell.edge));

    // High-key basalt plates (220..246) with crisp dark fissures (130..152)
    const plateTone = 228 + (cell.cellHash - 0.5) * 20 + (ash - 0.5) * 16;
    // Slight directional tilt across each plate face
    const facetTilt = cell.dx * -9 + cell.dy * -9;
    let r = plateTone + facetTilt + bevelRim * 14 - crackMask * 86 - fineCrack * 34;
    let g = plateTone - 2 + facetTilt + bevelRim * 12 - crackMask * 88 - fineCrack * 36;
    let b = plateTone - 5 + facetTilt + bevelRim * 10 - crackMask * 84 - fineCrack * 34;

    // Warm ash dusting in shallow depressions
    const ashDust = smoothstep(0.58, 0.84, ash) * (1 - crackMask);
    r += ashDust * 14;
    g += ashDust * 11;
    b += ashDust * 7;

    // Subtle glowing orange ember specks tucked deep inside main basalt crevices
    const emberNoise = periodicNoise(u, v, 16, 16, 499);
    const emberGlow =
      (1 - smoothstep(0.0, 0.038, cell.edge)) * smoothstep(0.75, 0.91, emberNoise);
    if (emberGlow > 0.01) {
      r = lerp(r, 255, emberGlow * 0.94);
      g = lerp(g, 146, emberGlow * 0.86);
      b = lerp(b, 48, emberGlow * 0.88);
    }

    aOut[idx] = clampByte(r);
    aOut[idx + 1] = clampByte(g);
    aOut[idx + 2] = clampByte(b);

    const bumpVal =
      168 +
      (cell.cellHash - 0.5) * 22 +
      facetTilt * 0.9 +
      bevelRim * 28 -
      crackMask * 125 -
      fineCrack * 46;
    const bh = clampByte(bumpVal);
    bOut[idx] = bh;
    bOut[idx + 1] = bh;
    bOut[idx + 2] = bh;
  });
}

function paintWater(aCtx: CanvasRenderingContext2D, bCtx: CanvasRenderingContext2D): void {
  // Seamless flowing turquoise-bright caustic light web + soft curved wave highlights
  const c2Sample: VoronoiSample = { d1: 0, d2: 0, edge: 0, cellHash: 0, dx: 0, dy: 0 };
  fillPixelPass(aCtx, bCtx, (u, v, _x, _y, aOut, bOut, idx) => {
    // Gentle domain warp for liquid flow
    const warpU = mod(u + Math.sin(v * Math.PI * 2 * 2) * 0.025 + (periodicNoise(u, v, 3, 3, 503) - 0.5) * 0.04, 1);
    const warpV = mod(v + Math.cos(u * Math.PI * 2 * 2) * 0.025 + (periodicNoise(u, v, 3, 3, 521) - 0.5) * 0.04, 1);

    const c1 = samplePeriodicVoronoi(warpU, warpV, 5, 5, 0.85, 541);
    const c2 = samplePeriodicVoronoi(mod(warpU + 0.37, 1), mod(warpV + 0.21, 1), 7, 7, 0.82, 563, c2Sample);

    // Bright caustic web ribbons along Voronoi cell edges
    const web1 = 1 - smoothstep(0.0, 0.145, c1.edge);
    const web2 = (1 - smoothstep(0.0, 0.12, c2.edge)) * 0.65;
    const caustic = clamp01(Math.max(web1, web2) + web1 * web2 * 0.4);

    // Broad rolling sunlit water swell
    const swell =
      0.5 +
      0.32 * Math.sin((u * 2 + v * 1) * Math.PI * 2 + periodicNoise(u, v, 2, 2, 577) * 2.2) +
      0.18 * Math.cos((u * 1 - v * 2) * Math.PI * 2);

    // High-key bright aqua-white base (214..255) so faction/biome water tint stays crystal luminous
    const baseR = 206 + swell * 16 + caustic * 46;
    const baseG = 228 + swell * 14 + caustic * 27;
    const baseB = 236 + swell * 12 + caustic * 19;

    aOut[idx] = clampByte(baseR);
    aOut[idx + 1] = clampByte(baseG);
    aOut[idx + 2] = clampByte(baseB);

    const h = clampByte(118 + swell * 48 + caustic * 56);
    bOut[idx] = h;
    bOut[idx + 1] = h;
    bOut[idx + 2] = h;
  });

  // Soft curved painterly wave-crest highlights
  const rng = makeRng(587);
  for (let i = 0; i < 26; i++) {
    const cx = rng() * TEX_SIZE;
    const cy = rng() * TEX_SIZE;
    const len = 18 + rng() * 24;
    const amp = 3 + rng() * 4.5;
    const lw = 1.6 + rng() * 1.4;

    drawWrapped((ox, oy) => {
      const x = cx + ox;
      const y = cy + oy;

      aCtx.strokeStyle = rgb(248, 255, 255, 0.45);
      aCtx.lineWidth = lw;
      aCtx.lineCap = 'round';
      aCtx.beginPath();
      aCtx.moveTo(x - len * 0.5, y);
      aCtx.bezierCurveTo(
        x - len * 0.18,
        y - amp,
        x + len * 0.18,
        y + amp,
        x + len * 0.5,
        y - amp * 0.25,
      );
      aCtx.stroke();

      bCtx.strokeStyle = gray(212, 0.35);
      bCtx.lineWidth = lw + 1;
      bCtx.lineCap = 'round';
      bCtx.beginPath();
      bCtx.moveTo(x - len * 0.5, y);
      bCtx.bezierCurveTo(
        x - len * 0.18,
        y - amp,
        x + len * 0.18,
        y + amp,
        x + len * 0.5,
        y - amp * 0.25,
      );
      bCtx.stroke();
    });
  }
}

function paintRock(
  aCtx: CanvasRenderingContext2D,
  bCtx: CanvasRenderingContext2D,
  orc: boolean,
): void {
  const seed = orc ? 673 : 613;
  // Layered diagonal geological rock strata, chiseled stone facets, hairline mineral veins
  fillPixelPass(aCtx, bCtx, (u, v, _x, _y, aOut, bOut, idx) => {
    const warp = periodicFbm(u, v, 3, 3, 3, seed) - 0.5;
    // Exact integer multiples of u and v guarantee 100% seamless diagonal strata
    const strataCoord = orc
      ? (u * 3 + v * 2) * 2 + warp * 1.35
      : (u * 2 + v * 1) * 3 + warp * 1.15;

    const frac = strataCoord - Math.floor(strataCoord);
    // Sharp sawtooth slate ledges for orc_rock; chiseled terraced strata for rock
    const ledge = orc
      ? Math.pow(1 - Math.abs(frac * 2 - 1), 0.72)
      : smoothstep(0.0, 0.16, frac) * (1 - smoothstep(0.84, 1.0, frac) * 0.55);

    const shelfShadow = 1 - smoothstep(0.0, orc ? 0.12 : 0.1, frac);
    const shelfLit = smoothstep(0.08, 0.22, frac) * (1 - smoothstep(0.22, 0.42, frac));

    const facets = samplePeriodicVoronoi(u, v, orc ? 7 : 5, orc ? 7 : 5, 0.78, seed + 29);
    const facetShade = (facets.cellHash - 0.5) * (orc ? 28 : 22) + (facets.dx - facets.dy) * 14;
    const fracture = 1 - smoothstep(0.008, orc ? 0.042 : 0.032, facets.edge);

    // Hairline mineral veins (bright pale quartz on rock; sharp volcanic seam on orc_rock)
    const veinWave = Math.abs(
      Math.sin((u * 1 - v * 2) * Math.PI * 2 + periodicFbm(u, v, 4, 4, 3, seed + 71) * 5.2),
    );
    const vein = 1 - smoothstep(0.0, 0.035, veinWave);

    const base = orc ? 216 : 224;
    const lum =
      base +
      (ledge - 0.5) * (orc ? 34 : 26) +
      shelfLit * 16 -
      shelfShadow * (orc ? 46 : 34) +
      facetShade -
      fracture * (orc ? 54 : 38) +
      vein * (orc ? -24 : 22);

    if (orc) {
      // Cool sharp volcanic slate tint
      aOut[idx] = clampByte(lum - 2);
      aOut[idx + 1] = clampByte(lum - 3);
      aOut[idx + 2] = clampByte(lum + 3);
    } else {
      // Warm neutral mountain stone
      aOut[idx] = clampByte(lum + 2);
      aOut[idx + 1] = clampByte(lum + 1);
      aOut[idx + 2] = clampByte(lum - 2);
    }

    const h = clampByte(
      138 +
        (ledge - 0.5) * (orc ? 74 : 56) +
        facetShade * 1.1 -
        shelfShadow * 54 -
        fracture * 64,
    );
    bOut[idx] = h;
    bOut[idx + 1] = h;
    bOut[idx + 2] = h;
  });

  // Painterly chiseled highlight strokes along strata crests
  const rng = makeRng(seed + 200);
  const strokeCount = orc ? 28 : 22;
  for (let i = 0; i < strokeCount; i++) {
    const x = rng() * TEX_SIZE;
    const y = rng() * TEX_SIZE;
    const len = 14 + rng() * 24;
    const angle = (orc ? -Math.atan2(3, 2) : -Math.atan2(2, 1)) + (rng() - 0.5) * 0.16;

    drawWrapped((ox, oy) => {
      aCtx.save();
      aCtx.translate(x + ox, y + oy);
      aCtx.rotate(angle);
      aCtx.strokeStyle = orc ? rgb(246, 248, 255, 0.28) : rgb(254, 252, 246, 0.34);
      aCtx.lineWidth = orc ? 1.4 : 2.0;
      aCtx.lineCap = 'round';
      aCtx.beginPath();
      aCtx.moveTo(-len * 0.5, 0);
      aCtx.lineTo(len * 0.5, 0);
      aCtx.stroke();
      aCtx.restore();
    });
  }
}

function paintSnow(aCtx: CanvasRenderingContext2D, bCtx: CanvasRenderingContext2D): void {
  // Crisp wind-swept snow drifts with cool pale-blue shadow ripples and subtle sparkle flecks
  fillPixelPass(aCtx, bCtx, (u, v, _x, _y, aOut, bOut, idx) => {
    const warp = (periodicFbm(u, v, 3, 3, 2, 709) - 0.5) * 0.45;
    const phase = (u * 2 + v * 1) * Math.PI * 2 + warp * Math.PI * 2;
    // Asymmetric wind-carved drift wave (broad sunlit slope, crisp cool shadow dip)
    const drift = 0.5 + 0.5 * Math.sin(phase + 0.35 * Math.sin(phase));
    const secondary = 0.5 + 0.5 * Math.sin((u * 3 - v * 1) * Math.PI * 2 + warp * 3);
    const combined = drift * 0.72 + secondary * 0.28;

    // Bright pure snow tops -> whisper-cool ice-blue shadow troughs
    const shade = 1 - combined;
    aOut[idx] = clampByte(254 - shade * 36);
    aOut[idx + 1] = clampByte(255 - shade * 23);
    aOut[idx + 2] = clampByte(255 - shade * 8);

    const h = clampByte(102 + combined * 116);
    bOut[idx] = h;
    bOut[idx + 1] = h;
    bOut[idx + 2] = h;
  });

  // Soft wind-swept snow crest strokes + subtle crystalline sparkle flecks
  const rng = makeRng(733);
  for (let i = 0; i < 18; i++) {
    const cx = rng() * TEX_SIZE;
    const cy = rng() * TEX_SIZE;
    const len = 26 + rng() * 34;
    const rot = -0.42 + (rng() - 0.5) * 0.14;
    drawWrapped((ox, oy) => {
      aCtx.save();
      aCtx.translate(cx + ox, cy + oy);
      aCtx.rotate(rot);
      aCtx.strokeStyle = rgb(255, 255, 255, 0.55);
      aCtx.lineWidth = 3.2;
      aCtx.lineCap = 'round';
      aCtx.beginPath();
      aCtx.moveTo(-len * 0.5, 0);
      aCtx.quadraticCurveTo(0, -4, len * 0.5, 0);
      aCtx.stroke();
      aCtx.restore();
    });
  }

  for (let i = 0; i < 42; i++) {
    const sx = rng() * TEX_SIZE;
    const sy = rng() * TEX_SIZE;
    const sr = 1.4 + rng() * 1.4;
    drawWrapped((ox, oy) => {
      const x = sx + ox;
      const y = sy + oy;
      aCtx.strokeStyle = rgb(255, 255, 255, 0.92);
      aCtx.lineWidth = 1.1;
      aCtx.beginPath();
      aCtx.moveTo(x - sr, y);
      aCtx.lineTo(x + sr, y);
      aCtx.moveTo(x, y - sr);
      aCtx.lineTo(x, y + sr);
      aCtx.stroke();
    });
  }
}

function paintBark(aCtx: CanvasRenderingContext2D, bCtx: CanvasRenderingContext2D): void {
  // Vertical fluted tree-bark grain strips with warm knot accents
  const knots = [
    { u: 0.28, v: 0.34, rx: 0.085, ry: 0.12 },
    { u: 0.74, v: 0.72, rx: 0.075, ry: 0.105 },
  ];

  fillPixelPass(aCtx, bCtx, (u, v, _x, _y, aOut, bOut, idx) => {
    // Divert vertical grain around bark knots
    let knotPush = 0;
    let knotRing = 0;
    for (let k = 0; k < knots.length; k++) {
      const kn = knots[k];
      let du = u - kn.u;
      let dv = v - kn.v;
      if (du > 0.5) du -= 1;
      if (du < -0.5) du += 1;
      if (dv > 0.5) dv -= 1;
      if (dv < -0.5) dv += 1;
      const dist = Math.hypot(du / kn.rx, dv / kn.ry);
      if (dist < 1.65) {
        const pull = (1 - smoothstep(0.0, 1.65, dist)) * (du >= 0 ? 1 : -1);
        knotPush += pull * 0.045;
        if (dist < 1.0) {
          knotRing = Math.max(knotRing, 0.5 + 0.5 * Math.cos(dist * Math.PI * 4));
        }
      }
    }

    const meander = (periodicNoise(u, v, 3, 4, 809) - 0.5) * 0.045 + knotPush;
    const flutePhase = (u + meander) * 11 * Math.PI * 2;
    const flute = 0.5 + 0.5 * Math.sin(flutePhase);
    const fineGrain = periodicNoise(mod(u + meander, 1), v, 22, 6, 823);
    const crossCheck = periodicNoise(u, v, 8, 18, 839);

    const fissure = 1 - smoothstep(0.08, 0.32, flute);
    const litEdge = smoothstep(0.52, 0.88, Math.cos(flutePhase)) * (1 - fissure);
    const crossCrack = smoothstep(0.84, 0.96, crossCheck) * (1 - fissure) * 0.35;

    const base =
      222 +
      (flute - 0.5) * 34 +
      (fineGrain - 0.5) * 16 +
      litEdge * 16 -
      fissure * 58 -
      crossCrack * 32 -
      knotRing * 20;

    aOut[idx] = clampByte(base + 5);
    aOut[idx + 1] = clampByte(base);
    aOut[idx + 2] = clampByte(base - 8);

    const h = clampByte(
      142 + (flute - 0.5) * 90 + (fineGrain - 0.5) * 20 - fissure * 72 + knotRing * 32,
    );
    bOut[idx] = h;
    bOut[idx + 1] = h;
    bOut[idx + 2] = h;
  });
}

function paintFoliage(
  aCtx: CanvasRenderingContext2D,
  bCtx: CanvasRenderingContext2D,
  mallorn: boolean,
): void {
  const seed = mallorn ? 947 : 907;

  // Deep canopy base wash (still high-key so tree colors stay vibrant!)
  aCtx.fillStyle = mallorn ? rgb(206, 208, 176) : rgb(186, 204, 182);
  aCtx.fillRect(0, 0, TEX_SIZE, TEX_SIZE);
  bCtx.fillStyle = gray(84);
  bCtx.fillRect(0, 0, TEX_SIZE, TEX_SIZE);

  const rng = makeRng(seed);

  // Build 3 depth layers of painterly leaf-cluster tufts catching top-left sun
  const layers = [
    { count: 44, rMin: 12, rMax: 20, lumBase: 204, bumpBase: 126 },
    { count: 52, rMin: 10, rMax: 17, lumBase: 226, bumpBase: 168 },
    { count: 56, rMin: 7, rMax: 13, lumBase: 244, bumpBase: 212 },
  ];

  for (let li = 0; li < layers.length; li++) {
    const layer = layers[li];
    for (let i = 0; i < layer.count; i++) {
      const cx = rng() * TEX_SIZE;
      const cy = rng() * TEX_SIZE;
      const r = layer.rMin + rng() * (layer.rMax - layer.rMin);
      const lobes = 3 + Math.floor(rng() * 3);
      const baseAngle = rng() * Math.PI * 2;
      const jitterLum = (rng() - 0.5) * 14;
      const isGoldenPetal = mallorn && li >= 1 && rng() > 0.42;

      const bodyR = isGoldenPetal
        ? 255
        : clampByte(layer.lumBase + jitterLum + (mallorn ? 6 : -3));
      const bodyG = isGoldenPetal
        ? clampByte(242 + (rng() - 0.5) * 14)
        : clampByte(layer.lumBase + jitterLum + 4);
      const bodyB = isGoldenPetal
        ? clampByte(178 + (rng() - 0.5) * 28)
        : clampByte(layer.lumBase + jitterLum - (mallorn ? 18 : 8));

      const shadowCol = mallorn ? rgb(178, 182, 146, 0.45) : rgb(156, 178, 154, 0.45);
      const hiCol = isGoldenPetal
        ? rgb(255, 253, 224, 0.72)
        : rgb(252, 255, 240, 0.62);
      const bumpCol = gray(layer.bumpBase + (rng() - 0.5) * 14);

      drawWrapped((ox, oy) => {
        const x = cx + ox;
        const y = cy + oy;

        // Soft bottom-right drop shadow under cluster
        aCtx.fillStyle = shadowCol;
        aCtx.beginPath();
        aCtx.arc(x + 2.2, y + 2.6, r * 0.92, 0, Math.PI * 2);
        aCtx.fill();

        // Scalloped leaf rosette lobes
        aCtx.fillStyle = rgb(bodyR, bodyG, bodyB);
        bCtx.fillStyle = bumpCol;
        for (let k = 0; k < lobes; k++) {
          const ang = baseAngle + (k / lobes) * Math.PI * 2;
          const dist = r * 0.42;
          const lr = r * (mallorn ? 0.56 : 0.62);
          const lx = x + Math.cos(ang) * dist;
          const ly = y + Math.sin(ang) * dist;

          aCtx.save();
          aCtx.translate(lx, ly);
          aCtx.rotate(ang);
          aCtx.beginPath();
          aCtx.ellipse(0, 0, lr * (mallorn ? 1.2 : 1.0), lr * (mallorn ? 0.72 : 0.92), 0, 0, Math.PI * 2);
          aCtx.fill();
          aCtx.restore();

          bCtx.save();
          bCtx.translate(lx, ly);
          bCtx.rotate(ang);
          bCtx.beginPath();
          bCtx.ellipse(0, 0, lr * 1.05, lr * 0.85, 0, 0, Math.PI * 2);
          bCtx.fill();
          bCtx.restore();
        }

        // Top-left sunlit highlight crescent
        aCtx.fillStyle = hiCol;
        aCtx.beginPath();
        aCtx.ellipse(x - r * 0.25, y - r * 0.28, r * 0.44, r * 0.26, -0.5, 0, Math.PI * 2);
        aCtx.fill();

        bCtx.fillStyle = gray(Math.min(248, layer.bumpBase + 28), 0.55);
        bCtx.beginPath();
        bCtx.arc(x - r * 0.12, y - r * 0.12, r * 0.42, 0, Math.PI * 2);
        bCtx.fill();
      });
    }
  }
}

function paintCobble(aCtx: CanvasRenderingContext2D, bCtx: CanvasRenderingContext2D): void {
  // Hand-laid rounded courtyard cobblestones with clean warm mortar joints
  aCtx.fillStyle = rgb(178, 173, 165);
  aCtx.fillRect(0, 0, TEX_SIZE, TEX_SIZE);
  bCtx.fillStyle = gray(52);
  bCtx.fillRect(0, 0, TEX_SIZE, TEX_SIZE);

  const rng = makeRng(1021);
  const rows = 8;
  const rowH = TEX_SIZE / rows;
  const gap = 3.2;

  for (let row = 0; row < rows; row++) {
    const cols = row % 2 === 0 ? 7 : 8;
    const weights: number[] = [];
    let totalW = 0;
    for (let c = 0; c < cols; c++) {
      const w = 0.82 + rng() * 0.36;
      weights.push(w);
      totalW += w;
    }

    let cursorX = row % 2 === 0 ? 0 : (TEX_SIZE / cols) * 0.48;
    for (let c = 0; c < cols; c++) {
      const w = (weights[c] / totalW) * TEX_SIZE;
      const sx = cursorX + gap * 0.5;
      const sy = row * rowH + gap * 0.5 + (rng() - 0.5) * 1.4;
      const sw = w - gap;
      const sh = rowH - gap;
      const rad = Math.min(sw, sh) * 0.34;
      const tone = 222 + (rng() - 0.5) * 28;
      const warmShift = (rng() - 0.5) * 10;

      drawWrapped((ox, oy) => {
        const x = sx + ox;
        const y = sy + oy;

        // Subtle recessed mortar shadow
        roundedRectPath(aCtx, x + 0.8, y + 1.2, sw, sh, rad);
        aCtx.fillStyle = rgb(156, 151, 144, 0.55);
        aCtx.fill();

        // Rounded cobblestone face with soft pillowed gradient
        const grad = aCtx.createLinearGradient(x, y, x + sw, y + sh);
        grad.addColorStop(0, rgb(tone + 18 + warmShift, tone + 16 + warmShift * 0.6, tone + 12));
        grad.addColorStop(0.55, rgb(tone + warmShift, tone - 1 + warmShift * 0.5, tone - 4));
        grad.addColorStop(1, rgb(tone - 20 + warmShift * 0.5, tone - 21, tone - 22));

        roundedRectPath(aCtx, x, y, sw, sh, rad);
        aCtx.fillStyle = grad;
        aCtx.fill();

        // Crisp sunlit upper-left bevel highlight
        aCtx.strokeStyle = rgb(255, 252, 245, 0.45);
        aCtx.lineWidth = 1.2;
        roundedRectPath(aCtx, x + 1.2, y + 1.2, sw - 2.4, sh - 2.4, Math.max(2, rad - 1));
        aCtx.stroke();

        // Pillowed bump dome
        const bGrad = bCtx.createRadialGradient(
          x + sw * 0.44,
          y + sh * 0.42,
          Math.min(sw, sh) * 0.08,
          x + sw * 0.5,
          y + sh * 0.5,
          Math.max(sw, sh) * 0.68,
        );
        bGrad.addColorStop(0, gray(232));
        bGrad.addColorStop(0.7, gray(196));
        bGrad.addColorStop(1, gray(122));
        roundedRectPath(bCtx, x, y, sw, sh, rad);
        bCtx.fillStyle = bGrad;
        bCtx.fill();
      });

      cursorX += w;
    }
  }
}

function paintRoadCobble(aCtx: CanvasRenderingContext2D, bCtx: CanvasRenderingContext2D): void {
  // Worn flagstones in the center + subtle neat bordered curb edge along left/right margins
  aCtx.fillStyle = rgb(184, 176, 164);
  aCtx.fillRect(0, 0, TEX_SIZE, TEX_SIZE);
  bCtx.fillStyle = gray(58);
  bCtx.fillRect(0, 0, TEX_SIZE, TEX_SIZE);

  const rng = makeRng(1097);
  const curbW = 24;
  const innerX = curbW + 3;
  const innerW = TEX_SIZE - innerX * 2;

  // Center worn flagstones (larger, flatter, lightly sunlit along travel path)
  const rows = 6;
  const rowH = TEX_SIZE / rows;
  const gap = 3.6;

  for (let r = 0; r < rows; r++) {
    const cols = r % 2 === 0 ? 4 : 5;
    const weights: number[] = [];
    let totalW = 0;
    for (let c = 0; c < cols; c++) {
      const w = 0.78 + rng() * 0.44;
      weights.push(w);
      totalW += w;
    }

    let cx = innerX;
    for (let c = 0; c < cols; c++) {
      const w = (weights[c] / totalW) * innerW;
      const sx = cx + gap * 0.5;
      const sy = r * rowH + gap * 0.5;
      const sw = w - gap;
      const sh = rowH - gap;
      const centerProximity = 1 - Math.abs((sx + sw * 0.5) / TEX_SIZE - 0.5) * 2;
      const tone = 224 + centerProximity * 14 + (rng() - 0.5) * 20;
      const bumpCol = gray(194 + (rng() - 0.5) * 22);

      // Wrap vertically in Y
      for (let oy = -TEX_SIZE; oy <= TEX_SIZE; oy += TEX_SIZE) {
        const y = sy + oy;
        const grad = aCtx.createLinearGradient(sx, y, sx + sw, y + sh);
        grad.addColorStop(0, rgb(tone + 12, tone + 10, tone + 5));
        grad.addColorStop(1, rgb(tone - 14, tone - 15, tone - 18));

        roundedRectPath(aCtx, sx, y, sw, sh, 6.5);
        aCtx.fillStyle = grad;
        aCtx.fill();

        aCtx.strokeStyle = rgb(252, 248, 238, 0.36);
        aCtx.lineWidth = 1.2;
        roundedRectPath(aCtx, sx + 1.4, y + 1.4, sw - 2.8, sh - 2.8, 5);
        aCtx.stroke();

        roundedRectPath(bCtx, sx, y, sw, sh, 6.5);
        bCtx.fillStyle = bumpCol;
        bCtx.fill();
      }
      cx += w;
    }
  }

  // Neat bordered curb stones along left and right edges (seamless vertically)
  const curbRows = 8;
  const curbH = TEX_SIZE / curbRows;
  for (let r = 0; r < curbRows; r++) {
    const sy = r * curbH + 1.8;
    const sh = curbH - 3.6;
    const toneL = 228 + (rng() - 0.5) * 16;
    const toneR = 228 + (rng() - 0.5) * 16;

    const curbs: [number, number][] = [
      [2, toneL],
      [TEX_SIZE - curbW - 2, toneR],
    ];
    for (let k = 0; k < curbs.length; k++) {
      const [kx, tone] = curbs[k];
      roundedRectPath(aCtx, kx, sy, curbW - 2, sh, 4);
      const grad = aCtx.createLinearGradient(kx, sy, kx + curbW, sy + sh);
      grad.addColorStop(0, rgb(tone + 14, tone + 13, tone + 10));
      grad.addColorStop(1, rgb(tone - 18, tone - 19, tone - 20));
      aCtx.fillStyle = grad;
      aCtx.fill();

      roundedRectPath(bCtx, kx, sy, curbW - 2, sh, 4);
      bCtx.fillStyle = gray(222);
      bCtx.fill();
    }
  }
}

function paintMasonry(
  aCtx: CanvasRenderingContext2D,
  bCtx: CanvasRenderingContext2D,
  variant: 'stone_masonry' | 'marble_masonry' | 'granite_runic',
): void {
  const isMarble = variant === 'marble_masonry';
  const isRunic = variant === 'granite_runic';
  const seed = isMarble ? 1217 : isRunic ? 1277 : 1151;
  const rng = makeRng(seed);

  // Mortar background
  aCtx.fillStyle = isMarble
    ? rgb(196, 198, 202)
    : isRunic
      ? rgb(156, 158, 164)
      : rgb(172, 168, 162);
  aCtx.fillRect(0, 0, TEX_SIZE, TEX_SIZE);
  bCtx.fillStyle = gray(isMarble ? 74 : isRunic ? 40 : 52);
  bCtx.fillRect(0, 0, TEX_SIZE, TEX_SIZE);

  const rows = isRunic ? 6 : 8;
  const rowH = TEX_SIZE / rows;
  const mortar = isMarble ? 2.0 : isRunic ? 3.8 : 2.8;
  const runeRow = 2; // Dedicated geometric Dwarven rune trim band on granite_runic

  for (let r = 0; r < rows; r++) {
    const sy = r * rowH;

    if (isRunic && r === runeRow) {
      // Heavy continuous granite trim band with carved Dwarven angular geometric runes
      const bh = rowH - mortar;
      const by = sy + mortar * 0.5;

      const trimGrad = aCtx.createLinearGradient(0, by, 0, by + bh);
      trimGrad.addColorStop(0, rgb(244, 242, 236));
      trimGrad.addColorStop(0.16, rgb(224, 224, 226));
      trimGrad.addColorStop(0.84, rgb(212, 214, 218));
      trimGrad.addColorStop(1, rgb(186, 188, 194));
      aCtx.fillStyle = trimGrad;
      aCtx.fillRect(0, by, TEX_SIZE, bh);

      bCtx.fillStyle = gray(212);
      bCtx.fillRect(0, by, TEX_SIZE, bh);

      // Top & bottom trim molding grooves
      aCtx.fillStyle = rgb(164, 166, 174);
      aCtx.fillRect(0, by + 4.5, TEX_SIZE, 2.2);
      aCtx.fillRect(0, by + bh - 6.7, TEX_SIZE, 2.2);
      aCtx.fillStyle = rgb(252, 250, 246, 0.7);
      aCtx.fillRect(0, by + 6.7, TEX_SIZE, 1.4);
      aCtx.fillRect(0, by + bh - 4.5, TEX_SIZE, 1.4);

      bCtx.fillStyle = gray(72);
      bCtx.fillRect(0, by + 4.5, TEX_SIZE, 2.4);
      bCtx.fillRect(0, by + bh - 6.9, TEX_SIZE, 2.4);

      // Repeating seamless geometric Khuzdul chevron-diamond fret band (8 repeats across 256px)
      const motifCount = 8;
      const step = TEX_SIZE / motifCount;
      const midY = by + bh * 0.5;
      const amp = bh * 0.24;

      const drawMotif = (
        ctx: CanvasRenderingContext2D,
        offsetX: number,
        offsetY: number,
        color: string,
        lw: number,
      ): void => {
        ctx.strokeStyle = color;
        ctx.lineWidth = lw;
        ctx.lineCap = 'square';
        ctx.lineJoin = 'miter';
        for (let m = 0; m < motifCount; m++) {
          const x0 = m * step + offsetX;
          const xm = x0 + step * 0.5;
          const x1 = x0 + step;
          // Angular diamond + vertical rune bar
          ctx.beginPath();
          ctx.moveTo(x0 + 4, midY + offsetY);
          ctx.lineTo(xm, midY - amp + offsetY);
          ctx.lineTo(x1 - 4, midY + offsetY);
          ctx.lineTo(xm, midY + amp + offsetY);
          ctx.closePath();
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(xm, midY - amp * 0.55 + offsetY);
          ctx.lineTo(xm, midY + amp * 0.55 + offsetY);
          ctx.moveTo(x0, midY + offsetY);
          ctx.lineTo(x0 + 4, midY + offsetY);
          ctx.moveTo(x1 - 4, midY + offsetY);
          ctx.lineTo(x1, midY + offsetY);
          ctx.stroke();
        }
      };

      // Highlight bevel then carved rune groove
      drawMotif(aCtx, 0.9, 1.1, rgb(252, 250, 244, 0.8), 2.2);
      drawMotif(aCtx, 0, 0, rgb(146, 150, 160), 2.2);
      drawMotif(bCtx, 0, 0, gray(56), 2.8);
      continue;
    }

    const cols = isRunic ? 4 : isMarble ? 4 : 5;
    const weights: number[] = [];
    let totalW = 0;
    for (let c = 0; c < cols; c++) {
      const w = isMarble ? 0.92 + rng() * 0.16 : 0.8 + rng() * 0.4;
      weights.push(w);
      totalW += w;
    }

    let cursorX = r % 2 === 0 ? 0 : (TEX_SIZE / cols) * 0.5;
    for (let c = 0; c < cols; c++) {
      const bw = (weights[c] / totalW) * TEX_SIZE;
      const x0 = cursorX + mortar * 0.5;
      const y0 = sy + mortar * 0.5;
      const w = bw - mortar;
      const h = rowH - mortar;

      const baseTone = isMarble
        ? 242 + (rng() - 0.5) * 12
        : isRunic
          ? 218 + (rng() - 0.5) * 20
          : 224 + (rng() - 0.5) * 24;
      const warm = isMarble ? 2 : isRunic ? -1 : (rng() - 0.5) * 8;
      const bevel = isRunic ? 3.5 : isMarble ? 1.8 : 2.4;

      drawWrappedX((ox) => {
        const bx = x0 + ox;
        const grad = aCtx.createLinearGradient(bx, y0, bx, y0 + h);
        grad.addColorStop(0, rgb(baseTone + 10 + warm, baseTone + 10 + warm * 0.6, baseTone + 8));
        grad.addColorStop(0.5, rgb(baseTone + warm, baseTone + warm * 0.5, baseTone - 2));
        grad.addColorStop(1, rgb(baseTone - 14 + warm * 0.4, baseTone - 15, baseTone - 16));

        roundedRectPath(aCtx, bx, y0, w, h, isRunic ? 2.5 : 1.5);
        aCtx.fillStyle = grad;
        aCtx.fill();

        // Crisp top-left sunlit chamfer & bottom-right shadow bevel
        aCtx.fillStyle = rgb(255, 255, 252, isMarble ? 0.65 : 0.48);
        aCtx.fillRect(bx + 1, y0 + 1, w - 2, bevel);
        aCtx.fillRect(bx + 1, y0 + 1, bevel, h - 2);

        aCtx.fillStyle = rgb(164, 166, 174, isRunic ? 0.48 : 0.32);
        aCtx.fillRect(bx + 1, y0 + h - bevel, w - 2, bevel);
        aCtx.fillRect(bx + w - bevel, y0 + 1, bevel, h - 2);

        // Subtle stone character per variant
        if (isMarble) {
          // Delicate pale marble veining
          aCtx.strokeStyle = rgb(212, 218, 228, 0.34);
          aCtx.lineWidth = 1.1;
          aCtx.beginPath();
          aCtx.moveTo(bx + w * 0.12, y0 + h * 0.78);
          aCtx.bezierCurveTo(
            bx + w * 0.38,
            y0 + h * 0.52,
            bx + w * 0.62,
            y0 + h * 0.35,
            bx + w * 0.88,
            y0 + h * 0.2,
          );
          aCtx.stroke();
        } else {
          // Subtle painterly chisel flecks
          for (let f = 0; f < 4; f++) {
            const fx = bx + 4 + hash2i(r * 17 + c, f, seed + 9) * Math.max(2, w - 8);
            const fy = y0 + 4 + hash2i(r * 17 + c, f, seed + 23) * Math.max(2, h - 8);
            aCtx.fillStyle =
              f % 2 === 0 ? rgb(250, 248, 242, 0.25) : rgb(176, 176, 178, 0.22);
            aCtx.fillRect(fx, fy, 4 + (f % 3) * 2, 1.8);
          }
        }

        // Bump block with beveled chamfer
        bCtx.fillStyle = gray(148);
        bCtx.fillRect(bx, y0, w, h);
        bCtx.fillStyle = gray(isMarble ? 214 : 206 + (hash2i(r, c, seed) - 0.5) * 24);
        bCtx.fillRect(bx + bevel, y0 + bevel, Math.max(1, w - bevel * 2), Math.max(1, h - bevel * 2));
      });

      cursorX += bw;
    }
  }
}

function paintDarkIron(aCtx: CanvasRenderingContext2D, bCtx: CanvasRenderingContext2D): void {
  // Hammered forged-iron plates with corner rivets and brushed metallic grain (high-key neutral-cool for dark tinting)
  fillPixelPass(aCtx, bCtx, (u, v, _x, _y, aOut, bOut, idx) => {
    const brushH = periodicNoise(u, v, 3, 42, 1301);
    const dimple = samplePeriodicVoronoi(u, v, 14, 14, 0.75, 1319);
    const hammerCup = smoothstep(0.0, 0.55, dimple.d1);

    const lum = 212 + (brushH - 0.5) * 20 + (hammerCup - 0.5) * 20;
    aOut[idx] = clampByte(lum - 2);
    aOut[idx + 1] = clampByte(lum);
    aOut[idx + 2] = clampByte(lum + 5);

    const h = clampByte(152 + (hammerCup - 0.5) * 44 + (brushH - 0.5) * 14);
    bOut[idx] = h;
    bOut[idx + 1] = h;
    bOut[idx + 2] = h;
  });

  // Staggered forged armor plate seams & corner dome rivets
  const rows = 4;
  const cols = 2;
  const rowH = TEX_SIZE / rows;
  const colW = TEX_SIZE / cols;

  for (let r = 0; r < rows; r++) {
    const offset = r % 2 === 0 ? 0 : colW * 0.5;
    const py = r * rowH;

    // Horizontal plate seam
    aCtx.fillStyle = rgb(134, 138, 148);
    aCtx.fillRect(0, py, TEX_SIZE, 2.8);
    aCtx.fillStyle = rgb(248, 250, 255, 0.65);
    aCtx.fillRect(0, py + 2.8, TEX_SIZE, 1.6);

    bCtx.fillStyle = gray(42);
    bCtx.fillRect(0, py, TEX_SIZE, 3.0);

    for (let c = 0; c < cols; c++) {
      const px = mod(c * colW + offset, TEX_SIZE);

      // Vertical plate seam
      aCtx.fillStyle = rgb(134, 138, 148);
      aCtx.fillRect(px, py, 2.8, rowH);
      aCtx.fillStyle = rgb(248, 250, 255, 0.55);
      aCtx.fillRect(px + 2.8, py, 1.4, rowH);

      bCtx.fillStyle = gray(42);
      bCtx.fillRect(px, py, 3.0, rowH);

      // Corner forged rivets (4 per plate, cleanly wrapped)
      const inset = 9.5;
      const rivetOffsets: [number, number][] = [
        [inset, inset],
        [colW - inset, inset],
        [inset, rowH - inset],
        [colW - inset, rowH - inset],
      ];

      for (let k = 0; k < rivetOffsets.length; k++) {
        const rx = px + rivetOffsets[k][0];
        const ry = py + rivetOffsets[k][1];

        drawWrappedX((ox) => {
          const cx = rx + ox;
          // Rivet shadow ring
          aCtx.fillStyle = rgb(124, 128, 138, 0.8);
          aCtx.beginPath();
          aCtx.arc(cx + 0.9, ry + 1.1, 3.8, 0, Math.PI * 2);
          aCtx.fill();

          // Rivet dome
          const rGrad = aCtx.createRadialGradient(cx - 1.2, ry - 1.2, 0.5, cx, ry, 3.6);
          rGrad.addColorStop(0, rgb(255, 255, 255));
          rGrad.addColorStop(0.55, rgb(216, 220, 230));
          rGrad.addColorStop(1, rgb(156, 160, 172));
          aCtx.fillStyle = rGrad;
          aCtx.beginPath();
          aCtx.arc(cx, ry, 3.5, 0, Math.PI * 2);
          aCtx.fill();

          // Raised rivet dome in bumpMap
          const bGrad = bCtx.createRadialGradient(cx, ry, 0.4, cx, ry, 3.8);
          bGrad.addColorStop(0, gray(248));
          bGrad.addColorStop(0.75, gray(204));
          bGrad.addColorStop(1, gray(118));
          bCtx.fillStyle = bGrad;
          bCtx.beginPath();
          bCtx.arc(cx, ry, 3.8, 0, Math.PI * 2);
          bCtx.fill();
        });
      }
    }
  }
}

function paintRoofShingles(aCtx: CanvasRenderingContext2D, bCtx: CanvasRenderingContext2D): void {
  // Scalloped overlapping roof tiles with crisp shadow lip under each course
  aCtx.fillStyle = rgb(196, 192, 188);
  aCtx.fillRect(0, 0, TEX_SIZE, TEX_SIZE);
  bCtx.fillStyle = gray(64);
  bCtx.fillRect(0, 0, TEX_SIZE, TEX_SIZE);

  const rng = makeRng(1409);
  const rows = 8;
  const cols = 8;
  const rowH = TEX_SIZE / rows;
  const colW = TEX_SIZE / cols;

  // Draw from top course to bottom course so lower courses overlap?
  // Roof shingles overlap DOWNWARD (upper course rests ON TOP of lower course),
  // so draw bottom-to-top, wrapping seamlessly!
  for (let r = rows; r >= -1; r--) {
    const offset = mod(r, 2) === 0 ? 0 : colW * 0.5;
    const baseY = r * rowH;

    for (let c = -1; c <= cols; c++) {
      const cx = c * colW + offset;
      const cellRow = mod(r, rows);
      const cellCol = mod(c, cols);
      const hVal = hash2i(cellCol, cellRow, 1423);
      const tone = 222 + (hVal - 0.5) * 28;
      const warm = (hash2i(cellCol, cellRow, 1439) - 0.5) * 10;

      const tileTop = baseY - rowH * 0.2;
      const tileH = rowH * 1.18;
      const scallopR = colW * 0.5;
      const lipY = tileTop + tileH - scallopR * 0.55;

      const traceShingle = (ctx: CanvasRenderingContext2D, yShift: number): void => {
        ctx.beginPath();
        ctx.moveTo(cx + 0.8, tileTop + yShift);
        ctx.lineTo(cx + colW - 0.8, tileTop + yShift);
        ctx.lineTo(cx + colW - 0.8, lipY + yShift);
        ctx.quadraticCurveTo(
          cx + colW * 0.5,
          tileTop + tileH + scallopR * 0.35 + yShift,
          cx + 0.8,
          lipY + yShift,
        );
        ctx.closePath();
      };

      // Crisp shadow lip cast underneath each scalloped shingle
      traceShingle(aCtx, 3.2);
      aCtx.fillStyle = rgb(146, 142, 140, 0.62);
      aCtx.fill();

      // Main shingle surface with gentle slope shading
      const grad = aCtx.createLinearGradient(cx, tileTop, cx, tileTop + tileH);
      grad.addColorStop(0, rgb(tone - 14 + warm * 0.5, tone - 15, tone - 16));
      grad.addColorStop(0.55, rgb(tone + warm, tone + warm * 0.4, tone - 2));
      grad.addColorStop(1, rgb(tone + 18 + warm, tone + 16 + warm * 0.5, tone + 12));
      traceShingle(aCtx, 0);
      aCtx.fillStyle = grad;
      aCtx.fill();

      // Crisp sunlit rim highlight along scallop bottom lip
      aCtx.strokeStyle = rgb(255, 252, 245, 0.55);
      aCtx.lineWidth = 1.3;
      aCtx.beginPath();
      aCtx.moveTo(cx + 2, lipY);
      aCtx.quadraticCurveTo(cx + colW * 0.5, tileTop + tileH + scallopR * 0.28, cx + colW - 2, lipY);
      aCtx.stroke();

      // Vertical shingle separation seam
      aCtx.strokeStyle = rgb(162, 158, 154, 0.45);
      aCtx.lineWidth = 1.0;
      aCtx.beginPath();
      aCtx.moveTo(cx + 0.8, tileTop);
      aCtx.lineTo(cx + 0.8, lipY);
      aCtx.stroke();

      // Sawtooth sloped bump height (rises toward overhanging lip, drops cleanly underneath)
      traceShingle(bCtx, 2.2);
      bCtx.fillStyle = gray(52);
      bCtx.fill();

      const bGrad = bCtx.createLinearGradient(cx, tileTop, cx, tileTop + tileH);
      bGrad.addColorStop(0, gray(112));
      bGrad.addColorStop(0.85, gray(226));
      bGrad.addColorStop(1, gray(242));
      traceShingle(bCtx, 0);
      bCtx.fillStyle = bGrad;
      bCtx.fill();
    }
  }
  // Consume rng deterministically for subtle weathering flecks
  for (let i = 0; i < 24; i++) {
    const wx = rng() * TEX_SIZE;
    const wy = rng() * TEX_SIZE;
    aCtx.fillStyle = rgb(252, 250, 244, 0.2);
    aCtx.fillRect(wx, wy, 4, 2);
  }
}

function paintThatch(aCtx: CanvasRenderingContext2D, bCtx: CanvasRenderingContext2D): void {
  // Layered golden-straw thatched roof bundles for Neutral Villages
  aCtx.fillStyle = rgb(224, 212, 184);
  aCtx.fillRect(0, 0, TEX_SIZE, TEX_SIZE);
  bCtx.fillStyle = gray(110);
  bCtx.fillRect(0, 0, TEX_SIZE, TEX_SIZE);

  const rng = makeRng(1511);
  const tiers = 4;
  const tierH = TEX_SIZE / tiers;

  // Draw bottom-to-top so upper thatch tiers overhang lower tiers
  for (let t = tiers; t >= -1; t--) {
    const topY = t * tierH - 10;
    const botY = (t + 1) * tierH;

    // Soft warm overhang shadow under each thatch tier
    const shGrad = aCtx.createLinearGradient(0, botY - 4, 0, botY + 12);
    shGrad.addColorStop(0, rgb(166, 148, 118, 0.65));
    shGrad.addColorStop(1, rgb(166, 148, 118, 0));
    aCtx.fillStyle = shGrad;
    aCtx.fillRect(0, botY - 4, TEX_SIZE, 16);

    const bShGrad = bCtx.createLinearGradient(0, botY - 2, 0, botY + 10);
    bShGrad.addColorStop(0, gray(48, 0.85));
    bShGrad.addColorStop(1, gray(120, 0));
    bCtx.fillStyle = bShGrad;
    bCtx.fillRect(0, botY - 2, TEX_SIZE, 12);

    // Dense painterly bundled straw stalks across the tier
    const stalkCount = 130;
    for (let s = 0; s < stalkCount; s++) {
      const sx = (s / stalkCount) * TEX_SIZE + (rng() - 0.5) * 3.5;
      const sway = (rng() - 0.5) * 7;
      const overhang = (rng() - 0.3) * 9;
      const bright = rng();
      const col =
        bright > 0.65
          ? rgb(255, 248, 216, 0.92)
          : bright > 0.25
            ? rgb(238, 224, 188, 0.88)
            : rgb(206, 188, 152, 0.85);
      const bVal = bright > 0.65 ? 228 : bright > 0.25 ? 182 : 128;
      const stalkWidth = 1.6 + rng() * 1.4;

      drawWrappedX((ox) => {
        const x0 = sx + ox;
        aCtx.strokeStyle = col;
        aCtx.lineWidth = stalkWidth;
        aCtx.lineCap = 'round';
        aCtx.beginPath();
        aCtx.moveTo(x0, topY);
        aCtx.quadraticCurveTo(x0 + sway * 0.5, (topY + botY) * 0.5, x0 + sway, botY + overhang);
        aCtx.stroke();

        bCtx.strokeStyle = gray(bVal, 0.85);
        bCtx.lineWidth = 2.0;
        bCtx.lineCap = 'round';
        bCtx.beginPath();
        bCtx.moveTo(x0, topY);
        bCtx.lineTo(x0 + sway, botY + overhang);
        bCtx.stroke();
      });
    }

    // Subtle horizontal woven binding twine across the upper third of each tier
    const bandY = topY + tierH * 0.42;
    aCtx.strokeStyle = rgb(188, 168, 134, 0.5);
    aCtx.lineWidth = 2.2;
    aCtx.beginPath();
    aCtx.moveTo(0, bandY);
    aCtx.lineTo(TEX_SIZE, bandY);
    aCtx.stroke();

    bCtx.strokeStyle = gray(158, 0.6);
    bCtx.lineWidth = 2.6;
    bCtx.beginPath();
    bCtx.moveTo(0, bandY);
    bCtx.lineTo(TEX_SIZE, bandY);
    bCtx.stroke();
  }
}

function paintTimber(aCtx: CanvasRenderingContext2D, bCtx: CanvasRenderingContext2D): void {
  // Warm horizontal timber planks with wood grain & nail studs
  const planks = 6;
  const plankH = TEX_SIZE / planks;

  fillPixelPass(aCtx, bCtx, (u, v, _x, _y, aOut, bOut, idx) => {
    const plankIdx = Math.floor(v * planks);
    const localV = v * planks - plankIdx;
    const plankSeed = 1601 + plankIdx * 37;
    const plankShift = (hash2i(plankIdx, 0, 1609) - 0.5) * 18;

    // Flowing seamless wood grain along X
    const wave =
      Math.sin((u * 2 + hash2i(plankIdx, 1, 1613)) * Math.PI * 2) * 0.35 +
      (periodicNoise(u, localV, 3, 2, plankSeed) - 0.5) * 1.4;
    const rings = Math.sin((localV * 5.2 + wave) * Math.PI * 2);
    const fineFiber = periodicNoise(u, v, 4, 28, plankSeed + 17);

    // Horizontal plank groove & upper sunlit bevel
    const groove =
      (1 - smoothstep(0.0, 0.065, localV)) + smoothstep(0.935, 1.0, localV);
    const topBevel = smoothstep(0.055, 0.11, localV) * (1 - smoothstep(0.11, 0.2, localV));

    const lum =
      226 +
      plankShift +
      rings * 11 +
      (fineFiber - 0.5) * 12 +
      topBevel * 14 -
      clamp01(groove) * 66;

    aOut[idx] = clampByte(lum + 6);
    aOut[idx + 1] = clampByte(lum + 1);
    aOut[idx + 2] = clampByte(lum - 9);

    const h = clampByte(
      174 + rings * 16 + (fineFiber - 0.5) * 14 + topBevel * 18 - clamp01(groove) * 118,
    );
    bOut[idx] = h;
    bOut[idx + 1] = h;
    bOut[idx + 2] = h;
  });

  // Staggered vertical plank end-joints & forged nail studs
  for (let p = 0; p < planks; p++) {
    const py = p * plankH;
    const jointX = mod((p * 0.37 + 0.18) * TEX_SIZE, TEX_SIZE);

    aCtx.fillStyle = rgb(146, 134, 120);
    aCtx.fillRect(jointX - 1.2, py + 1.5, 2.4, plankH - 3);
    aCtx.fillStyle = rgb(248, 242, 230, 0.55);
    aCtx.fillRect(jointX + 1.2, py + 1.5, 1.2, plankH - 3);

    bCtx.fillStyle = gray(48);
    bCtx.fillRect(jointX - 1.4, py + 1, 2.8, plankH - 2);

    // Pair of nail studs on each side of the plank joint
    const nailXs = [jointX - 8, jointX + 8];
    const nailYs = [py + plankH * 0.3, py + plankH * 0.72];
    for (let nx = 0; nx < nailXs.length; nx++) {
      for (let ny = 0; ny < nailYs.length; ny++) {
        drawWrappedX((ox) => {
          const cx = nailXs[nx] + ox;
          const cy = nailYs[ny];
          aCtx.fillStyle = rgb(128, 122, 118);
          aCtx.beginPath();
          aCtx.arc(cx, cy, 2.6, 0, Math.PI * 2);
          aCtx.fill();
          aCtx.fillStyle = rgb(238, 236, 234, 0.7);
          aCtx.beginPath();
          aCtx.arc(cx - 0.7, cy - 0.7, 1.0, 0, Math.PI * 2);
          aCtx.fill();

          bCtx.fillStyle = gray(228);
          bCtx.beginPath();
          bCtx.arc(cx, cy, 2.6, 0, Math.PI * 2);
          bCtx.fill();
        });
      }
    }
  }
}

function paintFarmSoil(aCtx: CanvasRenderingContext2D, bCtx: CanvasRenderingContext2D): void {
  // Deep plowed parallel furrow rows with organic tilled-earth clods
  const rows = 8;

  fillPixelPass(aCtx, bCtx, (u, v, _x, _y, aOut, bOut, idx) => {
    const wobble = (periodicNoise(u, v, 4, 4, 1709) - 0.5) * 0.18;
    const phase = (v * rows + wobble) * Math.PI * 2;
    const ridge = 0.5 + 0.5 * Math.sin(phase);
    // Asymmetric directional sun across plowed ridges
    const sunSlope = Math.cos(phase) * 0.5;
    const clodNoise = periodicFbm(u, v, 10, 10, 2, 1723);

    const lum = 204 + ridge * 38 + sunSlope * 18 + (clodNoise - 0.5) * 18;
    aOut[idx] = clampByte(lum + 6);
    aOut[idx + 1] = clampByte(lum);
    aOut[idx + 2] = clampByte(lum - 9);

    const h = clampByte(56 + ridge * 168 + (clodNoise - 0.5) * 28);
    bOut[idx] = h;
    bOut[idx + 1] = h;
    bOut[idx + 2] = h;
  });

  // Distinct organic soil clods resting along furrow crests
  const rng = makeRng(1741);
  for (let i = 0; i < 65; i++) {
    const cx = rng() * TEX_SIZE;
    const row = Math.floor(rng() * rows);
    const cy = (row + 0.25 + (rng() - 0.5) * 0.35) * (TEX_SIZE / rows);
    const rx = 2.6 + rng() * 3.4;
    const ry = 1.8 + rng() * 2.4;
    const bright = rng() > 0.4;
    const clodRot = rng() * Math.PI;

    drawWrapped((ox, oy) => {
      aCtx.fillStyle = bright ? rgb(246, 236, 220, 0.55) : rgb(176, 162, 146, 0.45);
      aCtx.beginPath();
      aCtx.ellipse(cx + ox, cy + oy, rx, ry, clodRot, 0, Math.PI * 2);
      aCtx.fill();

      bCtx.fillStyle = gray(bright ? 224 : 156, 0.55);
      bCtx.beginPath();
      bCtx.ellipse(cx + ox, cy + oy, rx, ry, clodRot, 0, Math.PI * 2);
      bCtx.fill();
    });
  }
}

function paintWheat(aCtx: CanvasRenderingContext2D, bCtx: CanvasRenderingContext2D): void {
  // Lush swaying golden wheat-stalk stripes
  const stripes = 8;

  fillPixelPass(aCtx, bCtx, (u, v, _x, _y, aOut, bOut, idx) => {
    const sway = Math.sin(u * Math.PI * 2 * 2) * 0.22;
    const band = 0.5 + 0.5 * Math.sin((v * stripes + sway) * Math.PI * 2);
    const ripple = periodicNoise(u, v, 6, 8, 1801);

    const lum = 212 + band * 30 + (ripple - 0.5) * 14;
    aOut[idx] = clampByte(lum + 10);
    aOut[idx + 1] = clampByte(lum + 4);
    aOut[idx + 2] = clampByte(lum - 24);

    const h = clampByte(92 + band * 110 + (ripple - 0.5) * 26);
    bOut[idx] = h;
    bOut[idx + 1] = h;
    bOut[idx + 2] = h;
  });

  // Sweeping painterly golden wheat stalks & plump sunlit grain ears
  const rng = makeRng(1831);
  for (let i = 0; i < 150; i++) {
    const x = rng() * TEX_SIZE;
    const y = rng() * TEX_SIZE;
    const len = 10 + rng() * 10;
    const swayAngle = -0.58 + Math.sin((x / TEX_SIZE) * Math.PI * 4) * 0.16 + (rng() - 0.5) * 0.18;
    const sunlit = rng() > 0.35;

    drawWrapped((ox, oy) => {
      const sx = x + ox;
      const sy = y + oy;
      const ex = sx + Math.cos(swayAngle) * len;
      const ey = sy + Math.sin(swayAngle) * len;

      // Stalk stroke
      aCtx.strokeStyle = sunlit ? rgb(252, 242, 198, 0.78) : rgb(216, 198, 148, 0.7);
      aCtx.lineWidth = 1.5;
      aCtx.lineCap = 'round';
      aCtx.beginPath();
      aCtx.moveTo(sx, sy);
      aCtx.quadraticCurveTo((sx + ex) * 0.5, (sy + ey) * 0.5 - 2.2, ex, ey);
      aCtx.stroke();

      // Plump wheat ear head at tip
      aCtx.save();
      aCtx.translate(ex, ey);
      aCtx.rotate(swayAngle);
      aCtx.fillStyle = sunlit ? rgb(255, 250, 214, 0.92) : rgb(236, 218, 166, 0.85);
      aCtx.beginPath();
      aCtx.ellipse(0, 0, 3.8, 1.7, 0, 0, Math.PI * 2);
      aCtx.fill();
      aCtx.restore();

      bCtx.strokeStyle = gray(sunlit ? 228 : 172, 0.7);
      bCtx.lineWidth = 2.0;
      bCtx.beginPath();
      bCtx.moveTo(sx, sy);
      bCtx.lineTo(ex, ey);
      bCtx.stroke();
    });
  }
}

function paintBedrockSkirt(aCtx: CanvasRenderingContext2D, bCtx: CanvasRenderingContext2D): void {
  // Vertical cutaway diorama cross-section (seamless in X; top-to-bottom strata in Y):
  // Top (y=0..46): lush grassy/earthy overhang rim -> Middle (y=46..148): warm clay/soil -> Bottom (y=148..256): layered bedrock stone
  fillPixelPass(aCtx, bCtx, (u, v, _x, _y, aOut, bOut, idx) => {
    // Seamless horizontal organic boundary curves
    const turfLip =
      0.165 +
      0.022 * Math.sin(u * Math.PI * 2 * 3) +
      0.012 * Math.cos(u * Math.PI * 2 * 7 + 1.1) +
      (periodicNoise(u, 0.15, 10, 2, 1901) - 0.5) * 0.022;

    const stoneTop =
      0.56 +
      0.026 * Math.sin(u * Math.PI * 2 * 2 + 0.6) +
      (periodicNoise(u, 0.55, 6, 2, 1913) - 0.5) * 0.04;

    const grain = periodicFbm(u, v, 6, 6, 3, 1931);

    let r: number;
    let g: number;
    let b: number;
    let h: number;

    if (v < turfLip) {
      // Rich grassy/earthy diorama rim cap at top (authored for #ffffff material color)
      const rimBright = 1 - smoothstep(0.0, 0.055, v);
      const underLip = smoothstep(turfLip - 0.04, turfLip, v);
      const vShift = (grain - 0.5) * 26 + rimBright * 26 - underLip * 38;
      r = 114 + vShift * 0.85;
      g = 176 + vShift;
      b = 76 + vShift * 0.6;
      h = 228 - underLip * 36 + (grain - 0.5) * 20;
    } else if (v < stoneTop) {
      // Warm terracotta clay / subsoil stratum with subtle horizontal sedimentary streaks
      const lipShadow = 1 - smoothstep(turfLip, turfLip + 0.06, v);
      const tSoil = (v - turfLip) / Math.max(0.01, stoneTop - turfLip);
      const strata = Math.sin(v * 34 + (grain - 0.5) * 2.4) * 10;
      const vShift = -tSoil * 28 + strata + (grain - 0.5) * 20 - lipShadow * 54;
      r = 176 + vShift;
      g = 126 + vShift * 0.82;
      b = 84 + vShift * 0.62;
      h = 152 + strata * 1.4 + (grain - 0.5) * 28 - lipShadow * 82;
    } else {
      // Layered dark slate stone bedrock at bottom
      const transitionShadow = 1 - smoothstep(stoneTop, stoneTop + 0.04, v);
      const tRock = (v - stoneTop) / Math.max(0.01, 1 - stoneTop);
      const rockLayers = v * 10 + (periodicNoise(u, v, 5, 4, 1949) - 0.5) * 0.6;
      const lFrac = rockLayers - Math.floor(rockLayers);
      const cleft = 1 - smoothstep(0.0, 0.14, lFrac);
      const ledgeHi = smoothstep(0.12, 0.25, lFrac) * (1 - smoothstep(0.25, 0.45, lFrac));

      const vShift =
        -tRock * 28 + (grain - 0.5) * 22 + ledgeHi * 24 - cleft * 34 - transitionShadow * 28;
      r = 92 + vShift * 0.9;
      g = 100 + vShift * 0.95;
      b = 116 + vShift;
      h = 148 + ledgeHi * 36 - cleft * 68 - transitionShadow * 48 + (grain - 0.5) * 24;
    }

    aOut[idx] = clampByte(r);
    aOut[idx + 1] = clampByte(g);
    aOut[idx + 2] = clampByte(b);

    const bh = clampByte(h);
    bOut[idx] = bh;
    bOut[idx + 1] = bh;
    bOut[idx + 2] = bh;
  });

  // Embedded rounded clay pebbles & vertical stone bedrock cracks (wrapped in X)
  const rng = makeRng(1973);
  for (let i = 0; i < 24; i++) {
    const px = rng() * TEX_SIZE;
    const py = 58 + rng() * 78;
    const rx = 3 + rng() * 4.5;
    const ry = 2 + rng() * 2.8;
    const rot = (rng() - 0.5) * 0.4;
    drawWrappedX((ox) => {
      aCtx.fillStyle = rgb(146, 134, 122, 0.8);
      aCtx.beginPath();
      aCtx.ellipse(px + ox, py, rx, ry, rot, 0, Math.PI * 2);
      aCtx.fill();

      aCtx.fillStyle = rgb(192, 180, 166, 0.55);
      aCtx.beginPath();
      aCtx.ellipse(px + ox - rx * 0.2, py - ry * 0.25, rx * 0.55, ry * 0.45, rot, 0, Math.PI * 2);
      aCtx.fill();

      bCtx.fillStyle = gray(205, 0.75);
      bCtx.beginPath();
      bCtx.ellipse(px + ox, py, rx, ry, rot, 0, Math.PI * 2);
      bCtx.fill();
    });
  }

  // Chiseled bedrock vertical block joints in lower stone band
  for (let i = 0; i < 12; i++) {
    const jx = (i / 12) * TEX_SIZE + (rng() - 0.5) * 14;
    const jy0 = 152 + rng() * 58;
    const jLen = 22 + rng() * 28;
    const tilt = (rng() - 0.5) * 6;
    drawWrappedX((ox) => {
      aCtx.strokeStyle = rgb(44, 50, 64, 0.72);
      aCtx.lineWidth = 2.0;
      aCtx.beginPath();
      aCtx.moveTo(jx + ox, jy0);
      aCtx.lineTo(jx + ox + tilt, Math.min(TEX_SIZE, jy0 + jLen));
      aCtx.stroke();

      aCtx.strokeStyle = rgb(134, 144, 162, 0.4);
      aCtx.lineWidth = 1.2;
      aCtx.beginPath();
      aCtx.moveTo(jx + ox + 1.8, jy0);
      aCtx.lineTo(jx + ox + tilt + 1.8, Math.min(TEX_SIZE, jy0 + jLen));
      aCtx.stroke();

      bCtx.strokeStyle = gray(54, 0.78);
      bCtx.lineWidth = 2.6;
      bCtx.beginPath();
      bCtx.moveTo(jx + ox, jy0);
      bCtx.lineTo(jx + ox + tilt, Math.min(TEX_SIZE, jy0 + jLen));
      bCtx.stroke();
    });
  }
}

function paintCloud(aCtx: CanvasRenderingContext2D, bCtx: CanvasRenderingContext2D): void {
  // Soft painterly puffy shading with airy bright tops and whisper-soft cool undersides
  fillPixelPass(aCtx, bCtx, (u, v, _x, _y, aOut, bOut, idx) => {
    const billow = periodicFbm(u, v, 3, 3, 3, 2003);
    const soft = periodicNoise(u, v, 5, 5, 2017);
    const puff = billow * 0.72 + soft * 0.28;

    const shade = 1 - smoothstep(0.28, 0.82, puff);
    aOut[idx] = clampByte(255 - shade * 24);
    aOut[idx + 1] = clampByte(255 - shade * 16);
    aOut[idx + 2] = clampByte(255 - shade * 6);

    const h = clampByte(112 + puff * 84);
    bOut[idx] = h;
    bOut[idx + 1] = h;
    bOut[idx + 2] = h;
  });

  // Airbrushed cotton-puff top highlights & whisper-soft cool under-lobes
  const rng = makeRng(2039);
  for (let i = 0; i < 24; i++) {
    const cx = rng() * TEX_SIZE;
    const cy = rng() * TEX_SIZE;
    const r = 20 + rng() * 26;

    drawWrapped((ox, oy) => {
      const x = cx + ox;
      const y = cy + oy;

      // Soft cool underside bloom
      const under = aCtx.createRadialGradient(x + r * 0.14, y + r * 0.2, r * 0.1, x, y, r);
      under.addColorStop(0, rgb(224, 234, 249, 0.28));
      under.addColorStop(1, rgb(224, 234, 249, 0));
      aCtx.fillStyle = under;
      aCtx.beginPath();
      aCtx.arc(x, y, r, 0, Math.PI * 2);
      aCtx.fill();

      // Airy bright top crest
      const top = aCtx.createRadialGradient(
        x - r * 0.16,
        y - r * 0.2,
        r * 0.05,
        x - r * 0.08,
        y - r * 0.1,
        r * 0.82,
      );
      top.addColorStop(0, rgb(255, 255, 255, 0.58));
      top.addColorStop(1, rgb(255, 255, 255, 0));
      aCtx.fillStyle = top;
      aCtx.beginPath();
      aCtx.arc(x - r * 0.08, y - r * 0.1, r * 0.82, 0, Math.PI * 2);
      aCtx.fill();

      const bPuff = bCtx.createRadialGradient(x, y, 0, x, y, r * 0.85);
      bPuff.addColorStop(0, gray(192, 0.3));
      bPuff.addColorStop(1, gray(128, 0));
      bCtx.fillStyle = bPuff;
      bCtx.beginPath();
      bCtx.arc(x, y, r * 0.85, 0, Math.PI * 2);
      bCtx.fill();
    });
  }
}

// ============================================================================
// Texture Creation, Headless Fallback, Caching, and Animation
// ============================================================================

const baseTextureCache = new Map<SurfaceTextureKind, TexturePair>();
const repeatTextureCache = new Map<string, TexturePair>();
const materialCache = new Map<string, THREE.MeshStandardMaterial>();
const animatedWaterPairs: TexturePair[] = [];

function createHeadlessFallbackCanvas(): HTMLCanvasElement {
  return { width: TEX_SIZE, height: TEX_SIZE } as unknown as HTMLCanvasElement;
}

function configureTexture(tex: THREE.CanvasTexture, isAlbedo: boolean): THREE.CanvasTexture {
  tex.colorSpace = isAlbedo ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

function paintKind(
  kind: SurfaceTextureKind,
  aCtx: CanvasRenderingContext2D,
  bCtx: CanvasRenderingContext2D,
): void {
  switch (kind) {
    case 'grass':
      paintGrass(aCtx, bCtx);
      break;
    case 'forest_floor':
      paintForestFloor(aCtx, bCtx, false);
      break;
    case 'ancient_floor':
      paintForestFloor(aCtx, bCtx, true);
      break;
    case 'wasteland':
      paintWasteland(aCtx, bCtx);
      break;
    case 'water':
      paintWater(aCtx, bCtx);
      break;
    case 'rock':
      paintRock(aCtx, bCtx, false);
      break;
    case 'orc_rock':
      paintRock(aCtx, bCtx, true);
      break;
    case 'snow':
      paintSnow(aCtx, bCtx);
      break;
    case 'bark':
      paintBark(aCtx, bCtx);
      break;
    case 'foliage':
      paintFoliage(aCtx, bCtx, false);
      break;
    case 'mallorn_foliage':
      paintFoliage(aCtx, bCtx, true);
      break;
    case 'cobble':
      paintCobble(aCtx, bCtx);
      break;
    case 'road_cobble':
      paintRoadCobble(aCtx, bCtx);
      break;
    case 'stone_masonry':
      paintMasonry(aCtx, bCtx, 'stone_masonry');
      break;
    case 'marble_masonry':
      paintMasonry(aCtx, bCtx, 'marble_masonry');
      break;
    case 'granite_runic':
      paintMasonry(aCtx, bCtx, 'granite_runic');
      break;
    case 'dark_iron':
      paintDarkIron(aCtx, bCtx);
      break;
    case 'roof_shingles':
      paintRoofShingles(aCtx, bCtx);
      break;
    case 'thatch':
      paintThatch(aCtx, bCtx);
      break;
    case 'timber':
      paintTimber(aCtx, bCtx);
      break;
    case 'farm_soil':
      paintFarmSoil(aCtx, bCtx);
      break;
    case 'wheat':
      paintWheat(aCtx, bCtx);
      break;
    case 'bedrock_skirt':
      paintBedrockSkirt(aCtx, bCtx);
      break;
    case 'cloud':
      paintCloud(aCtx, bCtx);
      break;
  }
}

export function getSurfaceTextures(kind: SurfaceTextureKind): {
  map: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
} {
  const existing = baseTextureCache.get(kind);
  if (existing) {
    return existing;
  }

  let albedoCanvas: HTMLCanvasElement;
  let bumpCanvas: HTMLCanvasElement;

  if (typeof document !== 'undefined' && typeof document.createElement === 'function') {
    albedoCanvas = document.createElement('canvas');
    albedoCanvas.width = TEX_SIZE;
    albedoCanvas.height = TEX_SIZE;

    bumpCanvas = document.createElement('canvas');
    bumpCanvas.width = TEX_SIZE;
    bumpCanvas.height = TEX_SIZE;

    const aCtx = albedoCanvas.getContext('2d');
    const bCtx = bumpCanvas.getContext('2d');
    if (aCtx && bCtx) {
      paintKind(kind, aCtx, bCtx);
    }
  } else {
    // Graceful headless fallback (e.g., Node/Vitest without DOM)
    albedoCanvas = createHeadlessFallbackCanvas();
    bumpCanvas = createHeadlessFallbackCanvas();
  }

  const pair: TexturePair = {
    map: configureTexture(new THREE.CanvasTexture(albedoCanvas), true),
    bumpMap: configureTexture(new THREE.CanvasTexture(bumpCanvas), false),
  };

  baseTextureCache.set(kind, pair);
  if (kind === 'water') {
    animatedWaterPairs.push(pair);
  }
  return pair;
}

function getRepeatedTextures(
  kind: SurfaceTextureKind,
  repeatX: number,
  repeatY: number,
): TexturePair {
  const base = getSurfaceTextures(kind);
  if (repeatX === 1 && repeatY === 1) {
    return base;
  }

  const key = `${kind}|${repeatX}|${repeatY}`;
  const cached = repeatTextureCache.get(key);
  if (cached) {
    return cached;
  }

  const map = base.map.clone();
  map.repeat.set(repeatX, repeatY);
  map.needsUpdate = true;

  const bumpMap = base.bumpMap.clone();
  bumpMap.repeat.set(repeatX, repeatY);
  bumpMap.needsUpdate = true;

  const pair: TexturePair = { map, bumpMap };
  repeatTextureCache.set(key, pair);
  if (kind === 'water') {
    animatedWaterPairs.push(pair);
  }
  return pair;
}

function normalizeColorKey(color: string | number | undefined, fallback: string): string {
  if (color === undefined) return fallback;
  if (typeof color === 'number') {
    return `#${(color >>> 0).toString(16).padStart(6, '0')}`;
  }
  return color.toLowerCase();
}

export function getTexturedMaterial(
  kind: SurfaceTextureKind,
  opts?: TexturedMaterialOptions,
): THREE.MeshStandardMaterial {
  const defaults = DEFAULT_PROFILES[kind];
  const colorKey = normalizeColorKey(opts?.color, '#ffffff');
  const roughness = opts?.roughness ?? defaults.roughness;
  const metalness = opts?.metalness ?? defaults.metalness;
  const bumpScale = opts?.bumpScale ?? defaults.bumpScale;
  const emissiveKey = normalizeColorKey(opts?.emissive, '#000000');
  const emissiveIntensity = opts?.emissiveIntensity ?? 0;
  const transparent = opts?.transparent ?? false;
  const opacity = opts?.opacity ?? 1;
  const flatShading = opts?.flatShading ?? false;
  const repeatX = opts?.repeatX ?? 1;
  const repeatY = opts?.repeatY ?? 1;

  const cacheKey = [
    kind,
    colorKey,
    roughness,
    metalness,
    bumpScale,
    emissiveKey,
    emissiveIntensity,
    transparent ? 1 : 0,
    opacity,
    flatShading ? 1 : 0,
    repeatX,
    repeatY,
  ].join('|');

  const existing = materialCache.get(cacheKey);
  if (existing) {
    return existing;
  }

  const { map, bumpMap } = getRepeatedTextures(kind, repeatX, repeatY);

  const mat = new THREE.MeshStandardMaterial({
    color: opts?.color !== undefined ? new THREE.Color(opts.color) : new THREE.Color(0xffffff),
    map,
    bumpMap,
    bumpScale,
    roughness,
    metalness,
    emissive: opts?.emissive !== undefined ? new THREE.Color(opts.emissive) : new THREE.Color(0x000000),
    emissiveIntensity,
    transparent,
    opacity,
    flatShading,
  });

  materialCache.set(cacheKey, mat);
  return mat;
}

export function updateAnimatedTextures(dt: number): void {
  if (!Number.isFinite(dt) || dt <= 0 || animatedWaterPairs.length === 0) {
    return;
  }

  // Smooth diagonal sunlit caustic drift; subtle counter-drift on bumpMap makes ripples shimmer
  const mapDx = dt * 0.036;
  const mapDy = dt * 0.022;
  const bumpDx = -dt * 0.02;
  const bumpDy = dt * 0.028;

  for (let i = 0; i < animatedWaterPairs.length; i++) {
    const pair = animatedWaterPairs[i];
    pair.map.offset.x = (pair.map.offset.x + mapDx) % 1;
    pair.map.offset.y = (pair.map.offset.y + mapDy) % 1;
    pair.bumpMap.offset.x = mod(pair.bumpMap.offset.x + bumpDx, 1);
    pair.bumpMap.offset.y = (pair.bumpMap.offset.y + bumpDy) % 1;
  }
}
