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
import { getTexturedMaterial, type SurfaceTextureKind } from './textures';

export const CITY_KEEP_OFFSET_X = -0.32;
export const CITY_KEEP_OFFSET_Z = -0.32;

function addWarmWindow(
  parent: THREE.Group,
  x: number,
  y: number,
  z: number,
  w = 0.075,
  h = 0.095,
  d = 0.03,
  color = '#fcd34d',
  emissive = '#f59e0b',
): void {
  const mat = getFlatMaterial(color, {
    emissive,
    emissiveIntensity: 0.95,
    roughness: 0.32,
  });
  const win = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  win.position.set(x, y, z);
  parent.add(win);
}

function addTorchBrazier(
  parent: THREE.Group,
  x: number,
  y: number,
  z: number,
  ironMat: THREE.Material,
  fireMat: THREE.Material,
): void {
  const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.04, 0.13, 5), ironMat);
  stand.position.set(x, y + 0.065, z);
  stand.castShadow = true;
  parent.add(stand);

  const flame = new THREE.Mesh(new THREE.OctahedronGeometry(0.048, 0), fireMat);
  flame.position.set(x, y + 0.16, z);
  parent.add(flame);
}

function addFlutterBanner(
  parent: THREE.Group,
  banners: THREE.Object3D[],
  x: number,
  y: number,
  z: number,
  poleH: number,
  color: string,
  trimColor: string,
  phase: number,
  rotY = 0,
): void {
  const poleMat = getFlatMaterial('#cbd5e1', { metalness: 0.52, roughness: 0.34 });
  const clothMat = getFlatMaterial(color, {
    emissive: color,
    emissiveIntensity: 0.16,
    roughness: 0.78,
  });
  const trimMat = getFlatMaterial(trimColor, { metalness: 0.48, roughness: 0.36 });

  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.02, poleH, 5), poleMat);
  pole.position.set(x, y + poleH * 0.5, z);
  pole.castShadow = true;
  parent.add(pole);

  const finial = new THREE.Mesh(new THREE.OctahedronGeometry(0.038, 0), trimMat);
  finial.position.set(x, y + poleH + 0.025, z);
  parent.add(finial);

  const pivot = new THREE.Group();
  pivot.position.set(x, y + poleH - 0.09, z);
  pivot.rotation.y = rotY;
  pivot.userData.bannerPhase = phase;
  pivot.userData.baseRotY = rotY;

  const cloth = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.13, 0.024), clothMat);
  cloth.position.set(0.11, 0, 0);
  cloth.castShadow = true;
  pivot.add(cloth);

  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.03, 0.028), trimMat);
  stripe.position.set(0.10, -0.04, 0);
  pivot.add(stripe);

  parent.add(pivot);
  banners.push(pivot);
}

function addCrenellations(
  parent: THREE.Group,
  cx: number,
  y: number,
  cz: number,
  w: number,
  d: number,
  mat: THREE.Material,
): void {
  const merlonGeo = new THREE.BoxGeometry(0.075, 0.06, 0.075);
  const hw = w * 0.5 - 0.04;
  const hd = d * 0.5 - 0.04;
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
    const m = new THREE.Mesh(merlonGeo, mat);
    m.position.set(cx + ox, y, cz + oz);
    parent.add(m);
  }
}

/**
 * Compact low-profile Polytopia city clusters pushed cleanly to back-left (-0.32, -0.32)
 * with an elevated front-right garrison dais (CITY_PLAZA_Y = 0.24, GARRISON_OFFSET = +0.28).
 * Max Tier-3 spire <= 1.12 above TILE_TOP_Y so a 1.38-tall unit (reaching y = 1.62)
 * towers unmistakably above every single roof and wall!
 */
export function createCityMesh(city: City): THREE.Group {
  const root = new THREE.Group();
  root.position.y = TILE_TOP_Y;

  const banners: THREE.Object3D[] = [];
  const smokePuffs: THREE.Object3D[] = [];
  root.userData.banners = banners;
  root.userData.smokePuffs = smokePuffs;

  const faction = city.styleFaction;
  const palette = FACTION_DEFINITIONS[faction].palette;
  const primaryColor = faction === 'orcs' ? '#ef4444' : palette.primary;

  // Lifted value-balanced plaza tones (Orc plaza lifted out of pitch black!)
  const plazaColor =
    faction === 'orcs'
      ? '#4f4857'
      : faction === 'elves'
        ? '#ece6d4'
        : faction === 'dwarves'
          ? '#6b7685'
          : '#e4dfd2';
  const apronColor =
    faction === 'orcs'
      ? '#62596b'
      : faction === 'elves'
        ? '#f7f3e6'
        : faction === 'dwarves'
          ? '#828e9e'
          : '#f2ede2';

  // Elevated stone plaza dais (h = CITY_PLAZA_Y = 0.24)
  const plazaTexture: SurfaceTextureKind =
    faction === 'orcs'
      ? 'wasteland'
      : faction === 'elves'
        ? 'marble_masonry'
        : 'cobble';
  const apronTexture: SurfaceTextureKind =
    faction === 'orcs'
      ? 'orc_rock'
      : faction === 'elves'
        ? 'marble_masonry'
        : faction === 'dwarves'
          ? 'granite_runic'
          : 'cobble';

  const plaza = new THREE.Mesh(
    new THREE.BoxGeometry(1.78, CITY_PLAZA_Y, 1.78),
    getTexturedMaterial(plazaTexture, {
      color: plazaColor,
      roughness: 0.88,
      bumpScale: faction === 'orcs' ? 0.035 : 0.028,
    }),
  );
  plaza.position.y = CITY_PLAZA_Y * 0.5;
  plaza.receiveShadow = true;
  plaza.castShadow = false;
  root.add(plaza);

  // Bright front-right garrison dais apron (+0.28, +0.28) — kept 100% unobstructed!
  const apron = new THREE.Mesh(
    new THREE.CylinderGeometry(0.46, 0.50, 0.018, 8),
    getTexturedMaterial(apronTexture, {
      color: apronColor,
      roughness: 0.84,
      bumpScale: 0.022,
    }),
  );
  apron.position.set(GARRISON_OFFSET_X, CITY_PLAZA_Y + 0.009, GARRISON_OFFSET_Z);
  apron.receiveShadow = true;
  root.add(apron);

  const ironMat = getTexturedMaterial('dark_iron', {
    color: '#4c5160',
    metalness: 0.45,
    roughness: 0.44,
    bumpScale: 0.024,
  });
  const fireMat = getFlatMaterial('#fbbf24', {
    emissive: '#f59e0b',
    emissiveIntensity: 1.15,
    roughness: 0.32,
  });

  // Flanking low courtyard braziers framing the garrison dais without blocking the unit
  addTorchBrazier(root, -0.06, CITY_PLAZA_Y, 0.60, ironMat, fireMat);
  addTorchBrazier(root, 0.60, CITY_PLAZA_Y, -0.06, ironMat, fireMat);

  const tier1 = new THREE.Group();
  tier1.userData.levelTier = 1;
  const tier2 = new THREE.Group();
  tier2.userData.levelTier = 2;
  const tier3 = new THREE.Group();
  tier3.userData.levelTier = 3;
  const tier4 = new THREE.Group();
  tier4.userData.levelTier = 4;

  switch (faction) {
    case 'humans':
      buildHumanCity(tier1, tier2, tier3, tier4, primaryColor, palette.secondary, palette.accent, banners);
      break;
    case 'orcs':
      buildOrcCity(tier1, tier2, tier3, tier4, primaryColor, '#453e4d', '#ff6b2b', banners);
      break;
    case 'elves':
      buildElfCity(tier1, tier2, tier3, tier4, primaryColor, palette.secondary, palette.accent, banners);
      break;
    case 'dwarves':
      buildDwarfCity(
        tier1,
        tier2,
        tier3,
        tier4,
        primaryColor,
        palette.secondary,
        palette.accent,
        banners,
        smokePuffs,
      );
      break;
  }

  root.add(tier1);
  if (city.level >= 2) root.add(tier2);
  if (city.level >= 3) root.add(tier3);
  if (city.level >= 4) root.add(tier4);

  // Capital banner placed at front-left edge (clear of front-right garrison)
  if (city.isCapital) {
    addFlutterBanner(
      root,
      banners,
      -0.68,
      CITY_PLAZA_Y,
      0.50,
      0.52,
      primaryColor,
      palette.accent,
      city.x * 0.7 + city.y * 1.1,
      0.35,
    );
  }

  // Low City Walls (h = 0.16, open front-right gatehouse)
  if (city.hasWalls) {
    addCityWalls(root, faction, palette.secondary, primaryColor, palette.accent);
  }

  // Parks (Lv 5+ reward) along back/left edge
  if (city.parks > 0) {
    const treeMat = getTexturedMaterial(faction === 'elves' ? 'mallorn_foliage' : 'foliage', {
      color: '#38b54a',
      roughness: 0.86,
      bumpScale: 0.024,
    });
    const trunkMat = getTexturedMaterial('bark', {
      color: '#75533a',
      roughness: 0.90,
      bumpScale: 0.028,
    });
    const goldMat = getFlatMaterial('#facc15', { metalness: 0.52, roughness: 0.34 });
    const parkSpots: [number, number][] = [
      [-0.68, 0.18],
      [0.20, -0.68],
      [-0.68, -0.66],
    ];
    const count = Math.min(city.parks, parkSpots.length);
    for (let i = 0; i < count; i++) {
      const [px, pz] = parkSpots[i];
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.038, 0.10, 5), trunkMat);
      trunk.position.set(px, CITY_PLAZA_Y + 0.05, pz);
      root.add(trunk);
      const parkTree = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.22, 5), treeMat);
      parkTree.position.set(px, CITY_PLAZA_Y + 0.19, pz);
      parkTree.castShadow = true;
      root.add(parkTree);
    }
    const statue = new THREE.Mesh(new THREE.OctahedronGeometry(0.085, 0), goldMat);
    statue.position.set(-0.56, CITY_PLAZA_Y + 0.18, 0.62);
    root.add(statue);
  }

  return root;
}

function buildHumanCity(
  t1: THREE.Group,
  t2: THREE.Group,
  t3: THREE.Group,
  t4: THREE.Group,
  primary: string,
  secondary: string,
  accent: string,
  banners: THREE.Object3D[],
): void {
  const stone = getTexturedMaterial('marble_masonry', {
    color: secondary,
    roughness: 0.84,
    bumpScale: 0.03,
    flatShading: true,
  });
  const roof = getTexturedMaterial('roof_shingles', {
    color: primary,
    roughness: 0.78,
    bumpScale: 0.028,
    flatShading: true,
  });
  const gold = getFlatMaterial(accent, { metalness: 0.52, roughness: 0.34 });
  const kx = CITY_KEEP_OFFSET_X;
  const kz = CITY_KEEP_OFFSET_Z;

  // Tier 1: Compact white-stone Gondor hall (roof top ~0.72 above TILE_TOP_Y)
  const hall = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.30, 0.50), stone);
  hall.position.set(kx, CITY_PLAZA_Y + 0.15, kz);
  hall.castShadow = true;
  hall.receiveShadow = true;
  t1.add(hall);

  addCrenellations(t1, kx, CITY_PLAZA_Y + 0.32, kz, 0.58, 0.50, stone);

  const hallRoof = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.22, 4), roof);
  hallRoof.position.set(kx, CITY_PLAZA_Y + 0.41, kz);
  hallRoof.rotation.y = Math.PI / 4;
  hallRoof.castShadow = true;
  t1.add(hallRoof);

  addWarmWindow(t1, kx - 0.11, CITY_PLAZA_Y + 0.18, kz + 0.255);
  addWarmWindow(t1, kx + 0.11, CITY_PLAZA_Y + 0.18, kz + 0.255);
  addWarmWindow(t1, kx + 0.295, CITY_PLAZA_Y + 0.18, kz, 0.03, 0.09, 0.075);

  const door = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.14, 0.035),
    getTexturedMaterial('timber', { color: '#784c28', roughness: 0.88, bumpScale: 0.026 }),
  );
  door.position.set(kx, CITY_PLAZA_Y + 0.07, kz + 0.25);
  t1.add(door);

  // Miniature White Tree of Gondor at (-0.58, +0.22)
  const treeTrunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.022, 0.035, 0.14, 5),
    getTexturedMaterial('bark', { color: '#e2e8f0', roughness: 0.86, bumpScale: 0.024 }),
  );
  treeTrunk.position.set(-0.58, CITY_PLAZA_Y + 0.07, 0.22);
  t1.add(treeTrunk);
  const whiteCanopy = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.105, 0),
    getTexturedMaterial('mallorn_foliage', {
      color: '#ffffff',
      emissive: '#e2e8f0',
      emissiveIntensity: 0.22,
      roughness: 0.84,
      bumpScale: 0.02,
    }),
  );
  whiteCanopy.position.set(-0.58, CITY_PLAZA_Y + 0.19, 0.22);
  whiteCanopy.castShadow = true;
  t1.add(whiteCanopy);

  addFlutterBanner(t1, banners, kx + 0.26, CITY_PLAZA_Y + 0.30, kz + 0.22, 0.26, primary, accent, 0.5);

  // Tier 2: Compact back-left watchtower + back-right townhouse (top ~0.86)
  const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.17, 0.44, 6), stone);
  tower.position.set(-0.66, CITY_PLAZA_Y + 0.22, -0.62);
  tower.castShadow = true;
  t2.add(tower);

  const towerRoof = new THREE.Mesh(new THREE.ConeGeometry(0.19, 0.22, 6), roof);
  towerRoof.position.set(-0.66, CITY_PLAZA_Y + 0.55, -0.62);
  towerRoof.castShadow = true;
  t2.add(towerRoof);

  const house = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.22, 0.28), stone);
  house.position.set(0.32, CITY_PLAZA_Y + 0.11, -0.56);
  house.castShadow = true;
  t2.add(house);

  const houseRoof = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.18, 4), roof);
  houseRoof.position.set(0.32, CITY_PLAZA_Y + 0.31, -0.56);
  houseRoof.rotation.y = Math.PI / 4;
  t2.add(houseRoof);

  // Tier 3: Compact Minas Tirith white spire (tip <= 1.12 above TILE_TOP_Y!)
  const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.18, 0.54, 6), stone);
  spire.position.set(kx, CITY_PLAZA_Y + 0.46, kz - 0.04);
  spire.castShadow = true;
  t3.add(spire);

  const spireCap = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.22, 6), roof);
  spireCap.position.set(kx, CITY_PLAZA_Y + 0.78, kz - 0.04);
  spireCap.castShadow = true;
  t3.add(spireCap);

  const finial = new THREE.Mesh(new THREE.OctahedronGeometry(0.055, 0), gold);
  finial.position.set(kx, CITY_PLAZA_Y + 0.88, kz - 0.04);
  t3.add(finial);

  // Tier 4: Beacon watchtower in back-right corner (top ~0.88)
  const eastTower = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.48, 6), stone);
  eastTower.position.set(0.54, CITY_PLAZA_Y + 0.24, -0.52);
  eastTower.castShadow = true;
  t4.add(eastTower);

  const beacon = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.09, 0),
    getFlatMaterial('#fbbf24', { emissive: '#f59e0b', emissiveIntensity: 1.25 }),
  );
  beacon.position.set(0.54, CITY_PLAZA_Y + 0.56, -0.52);
  t4.add(beacon);
}

function buildOrcCity(
  t1: THREE.Group,
  t2: THREE.Group,
  t3: THREE.Group,
  t4: THREE.Group,
  primary: string,
  obsidianColor: string,
  fireColor: string,
  banners: THREE.Object3D[],
): void {
  // Lifted obsidian & riveted dark-iron palette so Orc citadels read crisply with glowing embers
  const obsidian = getTexturedMaterial('dark_iron', {
    color: obsidianColor,
    roughness: 0.68,
    metalness: 0.26,
    bumpScale: 0.035,
    flatShading: true,
  });
  const darkIron = getTexturedMaterial('dark_iron', {
    color: '#3f384a',
    roughness: 0.56,
    metalness: 0.38,
    bumpScale: 0.034,
    flatShading: true,
  });
  const fire = getFlatMaterial(fireColor, { emissive: '#ff6b2b', emissiveIntensity: 1.35 });
  const kx = CITY_KEEP_OFFSET_X;
  const kz = CITY_KEEP_OFFSET_Z;

  // Tier 1: Compact spiked obsidian bastion at (-0.32, -0.32), top ~0.72
  const keep = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.36, 0.38, 5), obsidian);
  keep.position.set(kx, CITY_PLAZA_Y + 0.19, kz);
  keep.castShadow = true;
  t1.add(keep);

  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 2 + 0.3;
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.20, 4), darkIron);
    spike.position.set(kx + Math.cos(a) * 0.22, CITY_PLAZA_Y + 0.44, kz + Math.sin(a) * 0.22);
    spike.castShadow = true;
    t1.add(spike);
  }

  const gateFrame = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.07), darkIron);
  gateFrame.position.set(kx + 0.10, CITY_PLAZA_Y + 0.11, kz + 0.24);
  t1.add(gateFrame);
  addWarmWindow(t1, kx + 0.10, CITY_PLAZA_Y + 0.11, kz + 0.28, 0.12, 0.13, 0.03, '#fb923c', '#ff6b2b');

  addFlutterBanner(t1, banners, kx - 0.30, CITY_PLAZA_Y, kz + 0.42, 0.42, primary, '#383242', 1.2, 0.4);

  // Tier 2: Spiked hut (front-left) + crimson war-banner (back-right)
  const hut = new THREE.Mesh(new THREE.ConeGeometry(0.23, 0.34, 5), darkIron);
  hut.position.set(-0.58, CITY_PLAZA_Y + 0.17, 0.22);
  hut.castShadow = true;
  t2.add(hut);
  addWarmWindow(t2, -0.46, CITY_PLAZA_Y + 0.12, 0.33, 0.06, 0.07, 0.03, '#fb923c', '#ff6b2b');

  addFlutterBanner(t2, banners, 0.34, CITY_PLAZA_Y, -0.56, 0.48, primary, fireColor, 2.1, -0.5);

  // Tier 3: Compact Barad-dur horned spire with glowing Eye (tip <= 1.12 above TILE_TOP_Y!)
  const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.24, 0.62, 5), obsidian);
  spire.position.set(kx, CITY_PLAZA_Y + 0.46, kz - 0.04);
  spire.castShadow = true;
  t3.add(spire);

  const hornL = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.22, 4), darkIron);
  hornL.position.set(kx - 0.11, CITY_PLAZA_Y + 0.80, kz - 0.04);
  hornL.rotation.z = 0.22;
  t3.add(hornL);

  const hornR = hornL.clone();
  hornR.position.x = kx + 0.11;
  hornR.rotation.z = -0.22;
  t3.add(hornR);

  const eye = new THREE.Mesh(new THREE.OctahedronGeometry(0.095, 0), fire);
  eye.scale.set(1.25, 0.72, 0.72);
  eye.position.set(kx, CITY_PLAZA_Y + 0.79, kz - 0.04);
  t3.add(eye);

  // Tier 4: Iron forge bastion in back-right (top ~0.84)
  const bastion = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.20, 0.48, 5), darkIron);
  bastion.position.set(0.50, CITY_PLAZA_Y + 0.24, -0.50);
  bastion.castShadow = true;
  t4.add(bastion);

  const fire2 = new THREE.Mesh(new THREE.OctahedronGeometry(0.085, 0), fire);
  fire2.position.set(0.50, CITY_PLAZA_Y + 0.54, -0.50);
  t4.add(fire2);
}

function buildElfCity(
  t1: THREE.Group,
  t2: THREE.Group,
  t3: THREE.Group,
  t4: THREE.Group,
  primary: string,
  secondary: string,
  accent: string,
  banners: THREE.Object3D[],
): void {
  const ivory = getTexturedMaterial('marble_masonry', {
    color: secondary,
    roughness: 0.80,
    bumpScale: 0.026,
    flatShading: true,
  });
  const goldRoof = getTexturedMaterial('roof_shingles', {
    color: accent,
    metalness: 0.40,
    roughness: 0.38,
    bumpScale: 0.024,
    flatShading: true,
  });
  const emeraldRoof = getTexturedMaterial('roof_shingles', {
    color: primary,
    roughness: 0.74,
    bumpScale: 0.026,
    flatShading: true,
  });
  const mallornBark = getTexturedMaterial('bark', {
    color: secondary,
    roughness: 0.86,
    bumpScale: 0.028,
  });
  const mallornEmerald = getTexturedMaterial('mallorn_foliage', {
    color: primary,
    roughness: 0.82,
    bumpScale: 0.025,
  });
  const mallornGold = getTexturedMaterial('mallorn_foliage', {
    color: accent,
    roughness: 0.80,
    bumpScale: 0.025,
  });
  const lantern = getFlatMaterial('#fef08a', { emissive: '#facc15', emissiveIntensity: 1.05 });
  const kx = CITY_KEEP_OFFSET_X;
  const kz = CITY_KEEP_OFFSET_Z;

  // Tier 1: Compact ivory pavilion & golden roof (top ~0.78)
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.34, 0.30, 6), ivory);
  base.position.set(kx, CITY_PLAZA_Y + 0.15, kz);
  base.castShadow = true;
  t1.add(base);

  const roof = new THREE.Mesh(new THREE.ConeGeometry(0.36, 0.30, 6), goldRoof);
  roof.position.set(kx, CITY_PLAZA_Y + 0.44, kz);
  roof.castShadow = true;
  t1.add(roof);

  addWarmWindow(t1, kx + 0.06, CITY_PLAZA_Y + 0.16, kz + 0.30, 0.065, 0.12, 0.03, '#fef08a', '#facc15');
  addWarmWindow(t1, kx + 0.30, CITY_PLAZA_Y + 0.16, kz + 0.04, 0.03, 0.12, 0.065, '#fef08a', '#facc15');

  addFlutterBanner(t1, banners, kx - 0.32, CITY_PLAZA_Y, kz + 0.42, 0.44, primary, accent, 0.8, 0.3);

  // Tier 2: Compact Mallorn tree (front-left) + slender back-right spire
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 0.34, 6), mallornBark);
  trunk.position.set(-0.58, CITY_PLAZA_Y + 0.17, 0.22);
  t2.add(trunk);

  const canopy1 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.20, 0), mallornEmerald);
  canopy1.scale.set(1.1, 0.72, 1.1);
  canopy1.position.set(-0.58, CITY_PLAZA_Y + 0.38, 0.22);
  canopy1.castShadow = true;
  t2.add(canopy1);

  const canopy2 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.16, 0), mallornGold);
  canopy2.scale.set(1.0, 0.72, 1.0);
  canopy2.position.set(-0.58, CITY_PLAZA_Y + 0.52, 0.22);
  canopy2.castShadow = true;
  t2.add(canopy2);

  const sideSpire = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.50, 6), ivory);
  sideSpire.position.set(0.38, CITY_PLAZA_Y + 0.25, -0.52);
  sideSpire.castShadow = true;
  t2.add(sideSpire);

  // Tier 3: Compact Lothlorien crystal spire (tip <= 1.12 above TILE_TOP_Y!)
  const tallSpire = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.15, 0.62, 6), ivory);
  tallSpire.position.set(kx, CITY_PLAZA_Y + 0.46, kz - 0.04);
  tallSpire.castShadow = true;
  t3.add(tallSpire);

  const crownRing = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.24, 6), emeraldRoof);
  crownRing.position.set(kx, CITY_PLAZA_Y + 0.74, kz - 0.04);
  t3.add(crownRing);

  const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.08, 0), lantern);
  star.position.set(kx, CITY_PLAZA_Y + 0.88, kz - 0.04);
  t3.add(star);

  // Tier 4: Floating starlight orbs
  const orb1 = new THREE.Mesh(new THREE.OctahedronGeometry(0.075, 0), lantern);
  orb1.position.set(-0.54, CITY_PLAZA_Y + 0.42, 0.52);
  t4.add(orb1);

  const orb2 = new THREE.Mesh(new THREE.OctahedronGeometry(0.075, 0), lantern);
  orb2.position.set(0.54, CITY_PLAZA_Y + 0.42, -0.54);
  t4.add(orb2);
}

function buildDwarfCity(
  t1: THREE.Group,
  t2: THREE.Group,
  t3: THREE.Group,
  t4: THREE.Group,
  primary: string,
  secondary: string,
  accent: string,
  banners: THREE.Object3D[],
  smokePuffs: THREE.Object3D[],
): void {
  const granite = getTexturedMaterial('granite_runic', {
    color: secondary,
    roughness: 0.86,
    bumpScale: 0.036,
  });
  const darkStone = getTexturedMaterial('granite_runic', {
    color: '#5c6a7d',
    roughness: 0.88,
    bumpScale: 0.038,
  });
  const bronze = getTexturedMaterial('dark_iron', {
    color: primary,
    metalness: 0.48,
    roughness: 0.36,
    bumpScale: 0.026,
  });
  const forgeIron = getTexturedMaterial('dark_iron', {
    color: '#464d5c',
    metalness: 0.44,
    roughness: 0.48,
    bumpScale: 0.03,
  });
  const forgeGlow = getFlatMaterial(accent, { emissive: '#f97316', emissiveIntensity: 1.15 });
  const smokeMat = getTexturedMaterial('cloud', {
    color: '#e2e8f0',
    roughness: 0.95,
    bumpScale: 0.01,
    transparent: true,
    opacity: 0.68,
    flatShading: false,
  });
  const kx = CITY_KEEP_OFFSET_X;
  const kz = CITY_KEEP_OFFSET_Z;

  // Tier 1: Compact carved granite hall (top ~0.64)
  const hall = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.34, 0.58), granite);
  hall.position.set(kx, CITY_PLAZA_Y + 0.17, kz);
  hall.castShadow = true;
  t1.add(hall);

  const roofTrim = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.07, 0.64), bronze);
  roofTrim.position.set(kx, CITY_PLAZA_Y + 0.36, kz);
  t1.add(roofTrim);

  const gateFrame = new THREE.Mesh(new THREE.BoxGeometry(0.29, 0.25, 0.05), forgeIron);
  gateFrame.position.set(kx + 0.04, CITY_PLAZA_Y + 0.125, kz + 0.285);
  t1.add(gateFrame);

  const gate = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.06), forgeGlow);
  gate.position.set(kx + 0.04, CITY_PLAZA_Y + 0.11, kz + 0.29);
  t1.add(gate);
  addWarmWindow(t1, kx - 0.19, CITY_PLAZA_Y + 0.24, kz + 0.295, 0.07, 0.07, 0.03);
  addWarmWindow(t1, kx + 0.345, CITY_PLAZA_Y + 0.20, kz, 0.03, 0.09, 0.09);

  // Compact forge chimney with rising smoke puffs
  const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.52, 0.18), darkStone);
  chimney.position.set(kx + 0.24, CITY_PLAZA_Y + 0.26, kz - 0.22);
  chimney.castShadow = true;
  t1.add(chimney);

  const ember = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.12), forgeGlow);
  ember.position.set(kx + 0.24, CITY_PLAZA_Y + 0.53, kz - 0.22);
  t1.add(ember);

  for (let i = 0; i < 3; i++) {
    const puff = new THREE.Mesh(new THREE.IcosahedronGeometry(0.075, 0), smokeMat);
    const baseY = CITY_PLAZA_Y + 0.62;
    puff.position.set(kx + 0.24, baseY + i * 0.16, kz - 0.22);
    puff.userData.smokeBaseX = kx + 0.24;
    puff.userData.smokeBaseY = baseY;
    puff.userData.smokeBaseZ = kz - 0.22;
    puff.userData.smokePhase = i * 0.33;
    t1.add(puff);
    smokePuffs.push(puff);
  }

  addFlutterBanner(t1, banners, kx - 0.34, CITY_PLAZA_Y, kz + 0.42, 0.42, primary, accent, 1.5, 0.2);

  // Tier 2: Twin carved rune pillars
  const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.46, 0.20), darkStone);
  p1.position.set(-0.64, CITY_PLAZA_Y + 0.23, -0.60);
  p1.castShadow = true;
  t2.add(p1);

  const p2 = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.44, 0.20), darkStone);
  p2.position.set(0.40, CITY_PLAZA_Y + 0.22, -0.54);
  p2.castShadow = true;
  t2.add(p2);

  // Tier 3: Compact stepped Erebor citadel crown (top <= 1.06 above TILE_TOP_Y!)
  const step1 = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.28, 0.42), granite);
  step1.position.set(kx, CITY_PLAZA_Y + 0.52, kz - 0.04);
  step1.castShadow = true;
  t3.add(step1);

  const step2 = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.24, 0.28), bronze);
  step2.position.set(kx, CITY_PLAZA_Y + 0.74, kz - 0.04);
  step2.castShadow = true;
  t3.add(step2);

  // Tier 4: Bronze obelisk in front-left
  const obelisk = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.52, 0.18), bronze);
  obelisk.position.set(-0.58, CITY_PLAZA_Y + 0.26, 0.30);
  obelisk.castShadow = true;
  t4.add(obelisk);
}

function addCityWalls(
  root: THREE.Group,
  faction: FactionId,
  secondary: string,
  primary: string,
  accent: string,
): void {
  const wallKind: SurfaceTextureKind =
    faction === 'orcs'
      ? 'dark_iron'
      : faction === 'dwarves'
        ? 'granite_runic'
        : 'marble_masonry';
  const trimKind: SurfaceTextureKind =
    faction === 'orcs' || faction === 'dwarves' ? 'dark_iron' : 'roof_shingles';

  const wallMat = getTexturedMaterial(wallKind, {
    color: faction === 'orcs' ? '#4f4859' : faction === 'dwarves' ? '#69778a' : secondary,
    roughness: faction === 'orcs' ? 0.62 : 0.86,
    metalness: faction === 'orcs' ? 0.32 : 0.0,
    bumpScale: faction === 'orcs' || faction === 'dwarves' ? 0.036 : 0.028,
  });
  const trimMat = getTexturedMaterial(trimKind, {
    color: primary,
    roughness: faction === 'dwarves' ? 0.42 : 0.76,
    metalness: faction === 'dwarves' ? 0.44 : 0.0,
    bumpScale: 0.026,
    flatShading: true,
  });
  const accentMat = getFlatMaterial(accent, { metalness: 0.48, roughness: 0.36 });

  // Low Polytopia-style walls (h = 0.16) sitting cleanly on the plaza rim
  const h = 0.16;
  const r = 0.84;
  const wallCenterY = CITY_PLAZA_Y + h * 0.5;
  const fullWallGeo = new THREE.BoxGeometry(1.68, h, 0.09);
  const halfWallGeo = new THREE.BoxGeometry(0.76, h, 0.09);

  const north = new THREE.Mesh(fullWallGeo, wallMat);
  north.position.set(0, wallCenterY, -r);
  north.castShadow = true;
  root.add(north);

  const west = new THREE.Mesh(fullWallGeo, wallMat);
  west.rotation.y = Math.PI / 2;
  west.position.set(-r, wallCenterY, 0);
  west.castShadow = true;
  root.add(west);

  // Front-right corner stays wide open for the garrisoned unit!
  const southLeft = new THREE.Mesh(halfWallGeo, wallMat);
  southLeft.position.set(-0.46, wallCenterY, r);
  southLeft.castShadow = true;
  root.add(southLeft);

  const eastBack = new THREE.Mesh(halfWallGeo, wallMat);
  eastBack.rotation.y = Math.PI / 2;
  eastBack.position.set(r, wallCenterY, -0.46);
  eastBack.castShadow = true;
  root.add(eastBack);

  // Low corner turrets
  const turretGeo = new THREE.BoxGeometry(0.18, 0.24, 0.18);
  const capGeo = new THREE.ConeGeometry(0.14, 0.14, 4);
  const corners: [number, number][] = [
    [-r, -r],
    [r, -r],
    [-r, r],
  ];
  for (const [cx, cz] of corners) {
    const t = new THREE.Mesh(turretGeo, wallMat);
    t.position.set(cx, CITY_PLAZA_Y + 0.12, cz);
    t.castShadow = true;
    root.add(t);

    const cap = new THREE.Mesh(capGeo, trimMat);
    cap.position.set(cx, CITY_PLAZA_Y + 0.31, cz);
    cap.rotation.y = Math.PI / 4;
    root.add(cap);
  }

  // Low gatehouse pillars flanking open front-right dais
  const gatePillars: [number, number][] = [
    [-0.08, r],
    [r, -0.08],
  ];
  for (const [gx, gz] of gatePillars) {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.22, 0.13), wallMat);
    pillar.position.set(gx, CITY_PLAZA_Y + 0.11, gz);
    pillar.castShadow = true;
    root.add(pillar);

    const finial = new THREE.Mesh(new THREE.OctahedronGeometry(0.055, 0), accentMat);
    finial.position.set(gx, CITY_PLAZA_Y + 0.26, gz);
    root.add(finial);
  }
}

// ============================================================================
// Illustrated city billboards (board view)
// ============================================================================
//
// Board cities are pre-rendered low-poly illustrations (public/assets/cities/
// <faction>_t<tier>.webp, generated from the sizzle-video art direction) drawn on a
// "bent card": the part of the image below the footprint's centre line lies flat on
// the plaza (so the footprint occludes / is occluded like real ground) and the part
// above it sits on a card hinged at the tile centre line, tilted back so it is exactly
// perpendicular to the view direction (constant depth = the tile centre's depth). The
// card always follows the camera's azimuth. Under the orthographic camera this renders
// pixel-identical to a screen-aligned billboard while keeping correct depth against
// neighbouring tiles (things on tiles behind stay behind, things in front stay in
// front), and the depth-biased garrison unit always draws in front at every rotation.
//
// Every sprite shares the same canvas contract (see city-art/process.py):
//   CITY_ART_W x CITY_ART_H px, footprint diamond left/right corners at
//   (CITY_ART_CX -/+ CITY_ART_HALF_W, CITY_ART_CY), front corner directly below.

const CITY_ART_BASE_URL = (import.meta.env?.BASE_URL ?? '/').replace(/\/?$/, '/');

const CITY_ART_W = 512;
const CITY_ART_H = 768;
const CITY_ART_HALF_W = 236;
const CITY_ART_RATIO = 0.6157;
const CITY_ART_CX = CITY_ART_W / 2;
const CITY_ART_CY = CITY_ART_H - CITY_ART_HALF_W * CITY_ART_RATIO - 3;

/** Board camera elevation (must match SceneManager ELEVATION_RAD). */
const CITY_CAMERA_ELEVATION = THREE.MathUtils.degToRad(38);
const SIN_EL = Math.sin(CITY_CAMERA_ELEVATION);
const COS_EL = Math.cos(CITY_CAMERA_ELEVATION);

/** Plaza (footprint) half-size in world units at tier scale 1.0 — same as the legacy dais. */
const CITY_PLAZA_HALF = 0.89;

export type CityArtTier = 1 | 2 | 3 | 4;

/** Footprint scale per art tier: towns sit on a smaller plaza and grow with the city. */
const CITY_TIER_SCALE: Record<CityArtTier, number> = { 1: 0.86, 2: 0.93, 3: 1.0, 4: 1.06 };

/** Top of the painted silhouette in canvas px (measured by process.py) for badge placement. */
const CITY_ART_TOP_PX: Record<FactionId, Record<CityArtTier, number>> = {
  humans: { 1: 173, 2: 185, 3: 190, 4: 175 },
  orcs: { 1: 248, 2: 206, 3: 189, 4: 187 },
  elves: { 1: 258, 2: 212, 3: 190, 4: 67 },
  dwarves: { 1: 273, 2: 182, 3: 219, 4: 204 },
};

/**
 * Art tier for a city: Lv1 -> 1, Lv2-3 -> 2, Lv4-5 -> 3, Lv6+ -> 4.
 * Capitals are shown one tier grander (capped at 4).
 */
export function getCityArtTier(city: Pick<City, 'level' | 'isCapital'>): CityArtTier {
  const base = city.level >= 6 ? 4 : city.level >= 4 ? 3 : city.level >= 2 ? 2 : 1;
  return Math.min(4, base + (city.isCapital ? 1 : 0)) as CityArtTier;
}

export function getCityArtUrl(faction: FactionId, tier: CityArtTier): string {
  return `${CITY_ART_BASE_URL}assets/cities/${faction}_t${tier}.webp`;
}

/**
 * World-space height above TILE_TOP_Y at which the city's HTML badge should be anchored
 * (badge bottom edge) when placed at the badge's back-diagonal offset `backOffset`
 * (world units along -x/-z, i.e. away from the default camera).
 */
export function getCityBadgeAnchorY(
  city: Pick<City, 'level' | 'isCapital' | 'styleFaction'>,
  backOffset: number,
): number {
  const tier = getCityArtTier(city);
  const s = CITY_TIER_SCALE[tier];
  const pxToWorld = ((CITY_PLAZA_HALF * Math.SQRT2) / CITY_ART_HALF_W) * s;
  const topPx = CITY_ART_TOP_PX[city.styleFaction]?.[tier] ?? 120;
  // Screen-space height (world units) of the silhouette top above the plaza centre;
  // tuck the badge slightly into the very tip of the tallest spire.
  const screenTop = (CITY_ART_CY - topPx) * pxToWorld - 0.12;
  const backLift = backOffset * Math.SQRT2 * SIN_EL;
  return CITY_PLAZA_Y + Math.max(0.6, (screenTop - backLift) / COS_EL);
}

const cityArtLoader = new THREE.TextureLoader();
const cityArtTextures = new Map<string, THREE.Texture>();
const cityArtMaterials = new Map<string, THREE.MeshBasicMaterial>();
const cityCardGeometries = new Map<CityArtTier, THREE.BufferGeometry>();

function getCityArtMaterial(faction: FactionId, tier: CityArtTier): THREE.MeshBasicMaterial {
  const url = getCityArtUrl(faction, tier);
  let mat = cityArtMaterials.get(url);
  if (mat) return mat;
  let tex = cityArtTextures.get(url);
  if (!tex) {
    tex = cityArtLoader.load(url);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = true;
    tex.anisotropy = 4;
    cityArtTextures.set(url, tex);
  }
  mat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    alphaTest: 0.32,
    depthWrite: true,
    side: THREE.DoubleSide,
  });
  cityArtMaterials.set(url, mat);
  return mat;
}

/**
 * Bent-card geometry in the card's local frame (+Z toward the camera, +X screen-right,
 * y = 0 at the plaza top): a ground quad for image rows below the footprint centre and a
 * view-perpendicular quad (leaning back by the camera elevation) for the rows above it.
 */
function getCityCardGeometry(tier: CityArtTier): THREE.BufferGeometry {
  const cached = cityCardGeometries.get(tier);
  if (cached) return cached;
  const s = CITY_TIER_SCALE[tier];
  const k = ((CITY_PLAZA_HALF * Math.SQRT2) / CITY_ART_HALF_W) * s; // world (screen) units per px
  const xl = -CITY_ART_CX * k;
  const xr = (CITY_ART_W - CITY_ART_CX) * k;
  const groundDepth = ((CITY_ART_H - CITY_ART_CY) * k) / SIN_EL;
  const screenUp = CITY_ART_CY * k; // screen-space height of the upper card
  const topY = screenUp * COS_EL;
  const topZ = -screenUp * SIN_EL;
  const vMid = 1 - CITY_ART_CY / CITY_ART_H;
  const lift = 0.004;

  // prettier-ignore
  const positions = new Float32Array([
    // upper card (rows 0..CY), perpendicular to the view direction
    xl, lift, 0,   xr, lift, 0,   xr, lift + topY, topZ,   xl, lift + topY, topZ,
    // ground quad (rows CY..H)
    xl, lift, groundDepth,   xr, lift, groundDepth,   xr, lift, 0,   xl, lift, 0,
  ]);
  // prettier-ignore
  const uvs = new Float32Array([
    0, vMid,   1, vMid,   1, 1,   0, 1,
    0, 0,      1, 0,      1, vMid, 0, vMid,
  ]);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geo.setIndex([0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7]);
  geo.computeBoundingSphere();
  cityCardGeometries.set(tier, geo);
  return geo;
}

interface CityPlazaStyle {
  side: string;
  band: string;
  bandEmissive?: string;
  lip: string;
}

const CITY_PLAZA_STYLES: Record<FactionId, CityPlazaStyle> = {
  humans: { side: '#e8e1cf', band: '#e3b23c', lip: '#f4eedf' },
  orcs: { side: '#3d3741', band: '#f97316', bandEmissive: '#ea580c', lip: '#4a434f' },
  elves: { side: '#ece5d2', band: '#e9c23a', lip: '#3fa86a' },
  dwarves: { side: '#76808f', band: '#c27a2c', lip: '#d9dee6' },
};

function addCityPlaza(root: THREE.Group, faction: FactionId, scale: number): void {
  const st = CITY_PLAZA_STYLES[faction];
  const size = CITY_PLAZA_HALF * 2 * scale;
  const sideMat = getFlatMaterial(st.side, { roughness: 0.86 });
  const plaza = new THREE.Mesh(new THREE.BoxGeometry(size, CITY_PLAZA_Y, size), sideMat);
  plaza.position.y = CITY_PLAZA_Y * 0.5;
  plaza.receiveShadow = true;
  root.add(plaza);

  // Thin lip just under the painted footprint so the edge reads cleanly at every zoom.
  const lip = new THREE.Mesh(
    new THREE.BoxGeometry(size + 0.012, 0.045, size + 0.012),
    getFlatMaterial(st.lip, { roughness: 0.8 }),
  );
  lip.position.y = CITY_PLAZA_Y - 0.0235;
  root.add(lip);

  const band = new THREE.Mesh(
    new THREE.BoxGeometry(size + 0.02, 0.035, size + 0.02),
    getFlatMaterial(st.band, {
      metalness: st.bandEmissive ? 0 : 0.45,
      roughness: 0.4,
      emissive: st.bandEmissive,
      emissiveIntensity: st.bandEmissive ? 0.9 : 0,
    }),
  );
  band.position.y = CITY_PLAZA_Y * 0.42;
  root.add(band);
}

interface BoardWallStyle {
  wall: string;
  trim: string;
  cap: string;
  capKind: 'cone' | 'spike' | 'flat';
  glow?: string;
}

const BOARD_WALL_STYLES: Record<FactionId, BoardWallStyle> = {
  humans: { wall: '#f1ebdd', trim: '#e3b23c', cap: '#2f5fd8', capKind: 'cone' },
  orcs: { wall: '#4a4350', trim: '#2b2630', cap: '#b9b2a6', capKind: 'spike', glow: '#f97316' },
  elves: { wall: '#f3eddc', trim: '#e9c23a', cap: '#e9c23a', capKind: 'cone' },
  dwarves: { wall: '#8b94a3', trim: '#c27a2c', cap: '#eef2f7', capKind: 'flat' },
};

/**
 * Bold low rampart on the plaza rim (in footprint space, pre-scale): runs along the two
 * camera-facing edges and the back, leaving a gate gap at the front corner where the
 * garrison stands. Corner towers + gate towers make walls readable at a glance.
 */
function addBoardWalls(parent: THREE.Group, faction: FactionId, primary: string): void {
  const st = BOARD_WALL_STYLES[faction];
  const wallMat = getFlatMaterial(st.wall, { roughness: 0.82 });
  const trimMat = getFlatMaterial(st.trim, { roughness: 0.5, metalness: faction === 'orcs' ? 0.3 : 0.4 });
  const capMat = getFlatMaterial(st.cap, { roughness: 0.6, metalness: st.capKind === 'cone' ? 0.15 : 0.1 });
  const bannerMat = getFlatMaterial(primary, { emissive: primary, emissiveIntensity: 0.15, roughness: 0.75 });
  const glowMat = st.glow
    ? getFlatMaterial(st.glow, { emissive: st.glow, emissiveIntensity: 1.1, roughness: 0.4 })
    : null;

  // Built walls sit just outside the painted footprint and stand taller than the
  // walls painted into tier 3–4 art, with a faction-coloured band, so "has walls" reads.
  const r = 0.93;
  const h = 0.27;
  const t = 0.11;
  const y0 = CITY_PLAZA_Y;
  const gate = 0.3; // gap half-width measured from the front corner along each edge

  const addWall = (x1: number, z1: number, x2: number, z2: number) => {
    const len = Math.hypot(x2 - x1, z2 - z1);
    const seg = new THREE.Group();
    seg.position.set((x1 + x2) / 2, y0, (z1 + z2) / 2);
    seg.rotation.y = -Math.atan2(z2 - z1, x2 - x1);
    const body = new THREE.Mesh(new THREE.BoxGeometry(len, h, t), wallMat);
    body.position.y = h / 2;
    body.castShadow = true;
    seg.add(body);
    const band = new THREE.Mesh(new THREE.BoxGeometry(len, 0.05, t + 0.014), bannerMat);
    band.position.y = h * 0.62;
    seg.add(band);
    const n = Math.max(2, Math.round(len / 0.16));
    for (let i = 0; i < n; i++) {
      const mx = -len / 2 + (len / n) * (i + 0.5);
      const merlon = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.07, t + 0.01), wallMat);
      merlon.position.set(mx, h + 0.035, 0);
      seg.add(merlon);
    }
    if (glowMat) {
      const seam = new THREE.Mesh(new THREE.BoxGeometry(len * 0.8, 0.022, t + 0.016), glowMat);
      seam.position.y = h * 0.22;
      seg.add(seam);
    }
    parent.add(seg);
  };

  const addTower = (x: number, z: number, scale = 1, banner = false) => {
    const th = 0.34 * scale;
    const tw = 0.19 * scale;
    const body = new THREE.Mesh(new THREE.BoxGeometry(tw, th, tw), wallMat);
    body.position.set(x, y0 + th / 2, z);
    body.castShadow = true;
    parent.add(body);
    const ring = new THREE.Mesh(new THREE.BoxGeometry(tw + 0.03, 0.04, tw + 0.03), trimMat);
    ring.position.set(x, y0 + th, z);
    parent.add(ring);
    if (st.capKind === 'cone') {
      const cap = new THREE.Mesh(new THREE.ConeGeometry(tw * 0.78, 0.2 * scale, 4), capMat);
      cap.position.set(x, y0 + th + 0.12 * scale, z);
      cap.rotation.y = Math.PI / 4;
      parent.add(cap);
    } else if (st.capKind === 'spike') {
      for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]] as const) {
        const spike = new THREE.Mesh(new THREE.ConeGeometry(0.03 * scale, 0.14 * scale, 4), capMat);
        spike.position.set(x + dx * tw * 0.36, y0 + th + 0.08 * scale, z + dz * tw * 0.36);
        parent.add(spike);
      }
      if (glowMat) {
        const ember = new THREE.Mesh(new THREE.OctahedronGeometry(0.045 * scale, 0), glowMat);
        ember.position.set(x, y0 + th + 0.06, z);
        parent.add(ember);
      }
    } else {
      // dwarven snow-capped flat top with merlons
      const top = new THREE.Mesh(new THREE.BoxGeometry(tw + 0.02, 0.05, tw + 0.02), capMat);
      top.position.set(x, y0 + th + 0.045, z);
      parent.add(top);
    }
    if (banner) {
      const flag = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.13 * scale, 0.09 * scale), bannerMat);
      flag.position.set(x + tw / 2 + 0.008, y0 + th * 0.58, z);
      parent.add(flag);
      const flag2 = new THREE.Mesh(new THREE.BoxGeometry(0.09 * scale, 0.13 * scale, 0.012), bannerMat);
      flag2.position.set(x, y0 + th * 0.58, z + tw / 2 + 0.008);
      parent.add(flag2);
    }
  };

  // Back edges (mostly hidden behind the art, but they frame the silhouette)
  addWall(-r, -r, r, -r);
  addWall(-r, -r, -r, r);
  // Camera-facing edges, open at the front (+r, +r) gate
  addWall(-r, r, r - gate, r);
  addWall(r, -r, r, r - gate);

  addTower(-r, -r, 0.95);
  addTower(r, -r, 1, true);
  addTower(-r, r, 1, true);
  addTower(r - gate, r, 0.82);
  addTower(r, r - gate, 0.82);
}

function addRoyalStandard(
  root: THREE.Group,
  banners: THREE.Object3D[],
  x: number,
  z: number,
  primary: string,
  phase: number,
): void {
  const gold = getFlatMaterial('#facc15', {
    metalness: 0.55,
    roughness: 0.3,
    emissive: '#f59e0b',
    emissiveIntensity: 0.25,
  });
  const std = new THREE.Group();
  std.position.set(x, 0, z);
  std.scale.setScalar(1.3);
  root.add(std);
  const poleH = 0.95;
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.03, poleH, 6), gold);
  pole.position.set(0, CITY_PLAZA_Y / 1.3 + poleH * 0.5, 0);
  std.add(pole);

  // Little golden crown topping the pole
  const crown = new THREE.Group();
  crown.position.set(0, CITY_PLAZA_Y / 1.3 + poleH + 0.05, 0);
  const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.07, 0.07, 8), gold);
  crown.add(ring);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.028, 0.085, 4), gold);
    spike.position.set(Math.cos(a) * 0.072, 0.075, Math.sin(a) * 0.072);
    crown.add(spike);
  }
  const gem = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.035, 0),
    getFlatMaterial('#ef4444', { emissive: '#dc2626', emissiveIntensity: 0.6 }),
  );
  gem.position.y = 0.02;
  crown.add(gem);
  std.add(crown);

  const pivot = new THREE.Group();
  pivot.position.set(0, CITY_PLAZA_Y / 1.3 + poleH - 0.16, 0);
  pivot.userData.bannerPhase = phase;
  pivot.userData.baseRotY = 0.6;
  pivot.rotation.y = 0.6;
  const cloth = new THREE.Mesh(
    new THREE.BoxGeometry(0.34, 0.24, 0.02),
    getFlatMaterial(primary, { emissive: primary, emissiveIntensity: 0.18, roughness: 0.75 }),
  );
  cloth.position.set(0.17, -0.02, 0);
  pivot.add(cloth);
  const trim = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.035, 0.026), gold);
  trim.position.set(0.17, -0.125, 0);
  pivot.add(trim);
  const emblem = new THREE.Mesh(new THREE.OctahedronGeometry(0.05, 0), gold);
  emblem.position.set(0.17, -0.02, 0.018);
  emblem.scale.set(1, 1, 0.4);
  pivot.add(emblem);
  std.add(pivot);
  banners.push(pivot);
}

/**
 * Board-view city: themed plaza slab + illustrated camera-facing city art (+ optional
 * 3D walls, parks and a royal standard for capitals). Captured cities follow
 * `city.styleFaction`, which the engine switches to the conqueror's faction on capture.
 */
export function createCityBoardObject(city: City): THREE.Group {
  const root = new THREE.Group();
  root.position.y = TILE_TOP_Y;
  const banners: THREE.Object3D[] = [];
  root.userData.banners = banners;
  root.userData.smokePuffs = [];

  const faction = city.styleFaction;
  const palette = FACTION_DEFINITIONS[faction].palette;
  const primaryColor = faction === 'orcs' ? '#ef4444' : palette.primary;
  const tier = getCityArtTier(city);
  const s = CITY_TIER_SCALE[tier];
  root.userData.cityArtTier = tier;

  const footprint = new THREE.Group();
  footprint.scale.set(s, 1, s);
  root.add(footprint);
  addCityPlaza(root, faction, s);

  // Camera-facing illustrated city on a bent card
  const pivot = new THREE.Group();
  pivot.position.y = CITY_PLAZA_Y;
  // Two draws of the same bent-card geometry:
  // - the upright card (indices 0..5) draws AFTER the board's always-on-top overlays
  //   (move/attack rings use depthTest:false, renderOrder 31–35) so rings on the tile
  //   behind a city no longer paint over its towers, but still BEFORE units (40);
  // - the ground quad (indices 6..11) draws normally so rings on the city tile stay visible.
  const cardGeo = getCityCardGeometry(tier);
  const cardMat = getCityArtMaterial(faction, tier);
  const upright = new THREE.Mesh(cardGeo.clone(), cardMat);
  upright.geometry.setDrawRange(0, 6);
  upright.renderOrder = 36;
  const groundQuad = new THREE.Mesh(cardGeo.clone(), cardMat);
  groundQuad.geometry.setDrawRange(6, 6);
  for (const m of [upright, groundQuad]) {
    m.castShadow = false;
    m.receiveShadow = false;
    m.frustumCulled = false;
  }
  const standardPivot = new THREE.Group();
  const faceCamera = (_r: THREE.WebGLRenderer, _s: THREE.Scene, camera: THREE.Camera): void => {
    const e = camera.matrixWorld.elements;
    const yaw = Math.atan2(e[8], e[10]);
    if (pivot.rotation.y !== yaw) {
      pivot.rotation.y = yaw;
      pivot.updateMatrixWorld(true);
      standardPivot.rotation.y = yaw;
      standardPivot.updateMatrixWorld(true);
    }
  };
  upright.onBeforeRender = faceCamera;
  groundQuad.onBeforeRender = faceCamera;
  pivot.add(groundQuad, upright);
  root.add(pivot);

  if (city.hasWalls) {
    addBoardWalls(footprint, faction, primaryColor);
  }

  if (city.parks > 0) {
    const treeMat = getFlatMaterial(faction === 'elves' ? '#34c77b' : '#3fae4f', { roughness: 0.82 });
    const trunkMat = getFlatMaterial('#7a5638', { roughness: 0.9 });
    const spots: [number, number][] = [
      [-0.72, 0.34],
      [0.34, -0.72],
      [-0.5, 0.62],
    ];
    const count = Math.min(city.parks, spots.length);
    for (let i = 0; i < count; i++) {
      const [px, pz] = spots[i];
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.036, 0.1, 5), trunkMat);
      trunk.position.set(px, CITY_PLAZA_Y + 0.05, pz);
      footprint.add(trunk);
      const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(0.12, 0), treeMat);
      crown.position.set(px, CITY_PLAZA_Y + 0.2, pz);
      crown.castShadow = true;
      footprint.add(crown);
    }
  }

  if (city.isCapital) {
    // The standard turns with the camera (like the card) and stands at the city's left edge,
    // just in front of the card plane, so it never cuts across the garrisoned unit up front.
    standardPivot.position.y = 0;
    root.add(standardPivot);
    addRoyalStandard(standardPivot, banners, -0.82 * s, 0.06, primaryColor, city.x * 0.7 + city.y * 1.1);
  }

  return root;
}
