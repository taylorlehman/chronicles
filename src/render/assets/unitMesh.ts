import * as THREE from 'three';
import { FACTION_DEFINITIONS } from '../../game/data/factions';
import type { FactionId, Unit, UnitType } from '../../game/types';

export interface UnitMaterialEntry {
  material: THREE.MeshStandardMaterial;
  originalColor: THREE.Color;
  originalEmissive: THREE.Color;
  originalEmissiveIntensity: number;
}

export interface BuiltUnitMesh {
  group: THREE.Group;
  bodyGroup: THREE.Group;
  baseDisc: THREE.Mesh;
  baseDiscMat: THREE.MeshStandardMaterial;
  readyRing: THREE.Mesh;
  readyRingMat: THREE.MeshBasicMaterial;
  veteranCrown: THREE.Object3D | null;
  promoteRing: THREE.Object3D | null;
  flashMaterials: THREE.MeshStandardMaterial[];
  bodyMaterials: UnitMaterialEntry[];
  banners: THREE.Object3D[];
  unitHeight: number;
}

export interface UnitVisualStateOptions {
  isHumanOwner: boolean;
  actedThisTurn: boolean;
  canCapture?: boolean;
}

const EXHAUSTED_STONE_GREY = new THREE.Color('#7c8696');
const EXHAUSTED_BASE_COLOR = new THREE.Color('#5c6573');

const SKIN_BY_FACTION: Record<FactionId, string> = {
  humans: '#f4cda8',
  orcs: '#6e7c5a',
  elves: '#fae0c8',
  dwarves: '#ecc09e',
};

const BEARD_OR_HAIR_BY_FACTION: Record<FactionId, string> = {
  humans: '#6b4423',
  orcs: '#2d2834',
  elves: '#f2d06b',
  dwarves: '#c25b12',
};

const MOUNT_COLOR_BY_FACTION: Record<FactionId, string> = {
  humans: '#f4efe6',
  orcs: '#4a4352',
  elves: '#faf7f0',
  dwarves: '#9e8f7d',
};

// Shared bold Polytopia toy geometries
const bootGeo = new THREE.BoxGeometry(0.115, 0.125, 0.165);
const tunicGeo = new THREE.CylinderGeometry(0.20, 0.29, 0.62, 6);
const shoulderGeo = new THREE.BoxGeometry(0.46, 0.125, 0.24);
const headGeo = new THREE.IcosahedronGeometry(0.22, 1);
const readyRingGeo = new THREE.RingGeometry(0.47, 0.59, 24);
readyRingGeo.rotateX(-Math.PI / 2);

interface UnitPaletteMaterials {
  primary: THREE.MeshStandardMaterial;
  secondary: THREE.MeshStandardMaterial;
  accent: THREE.MeshStandardMaterial;
  skin: THREE.MeshStandardMaterial;
  steel: THREE.MeshStandardMaterial;
  darkIron: THREE.MeshStandardMaterial;
  wood: THREE.MeshStandardMaterial;
  hair: THREE.MeshStandardMaterial;
  mount: THREE.MeshStandardMaterial;
  white: THREE.MeshStandardMaterial;
  ember: THREE.MeshStandardMaterial;
}

export function getUnitHeight(type: UnitType): number {
  switch (type) {
    case 'rohirrim_knight':
      return 1.68;
    case 'rider':
      return 1.60;
    case 'elven_sentinel':
      return 1.52;
    case 'uruk_berserker':
      return 1.50;
    case 'ironbreaker':
      return 1.48;
    case 'catapult':
      return 1.18;
    case 'defender':
      return 1.40;
    case 'archer':
      return 1.36;
    case 'warrior':
    default:
      return 1.38;
  }
}

function makeTrackedMat(
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
    roughness: opts?.roughness ?? 0.88,
    metalness: opts?.metalness ?? 0.0,
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

/**
 * Builds an iconic, tall (1.34-1.68), low-primitive Polytopia character silhouette.
 * Zero micro-noise (no eyes, buckles, necks, or finger joints) so every unit reads
 * instantly on both desktop and mobile screens.
 */
export function createUnitMesh(unit: Unit, faction: FactionId): BuiltUnitMesh {
  const group = new THREE.Group();
  const palette = FACTION_DEFINITIONS[faction].palette;
  const primaryHex = faction === 'orcs' ? '#ef4444' : palette.primary;
  const secondaryHex = faction === 'orcs' ? '#4f4859' : palette.secondary;
  const accentHex = faction === 'orcs' ? '#ff6b2b' : palette.accent;

  const banners: THREE.Object3D[] = [];
  const bodyMaterials: UnitMaterialEntry[] = [];

  // Crisp toy pedestal base disc
  const baseDiscMat = makeTrackedMat(bodyMaterials, primaryHex, {
    roughness: 0.72,
    metalness: 0.0,
    emissive: primaryHex,
    emissiveIntensity: 0.14,
  });
  const baseDisc = new THREE.Mesh(
    new THREE.CylinderGeometry(0.40, 0.45, 0.06, 14),
    baseDiscMat,
  );
  baseDisc.position.y = 0.03;
  baseDisc.receiveShadow = true;
  baseDisc.castShadow = true;
  group.add(baseDisc);

  // Pulsing Ready Ring (pure white normally, royal gold when unit.canCapture is true)
  const readyRingMat = new THREE.MeshBasicMaterial({
    color: '#ffffff',
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
  });
  const readyRing = new THREE.Mesh(readyRingGeo, readyRingMat);
  readyRing.position.y = 0.035;
  readyRing.visible = false;
  group.add(readyRing);

  const bodyGroup = new THREE.Group();
  bodyGroup.position.y = 0.065;
  group.add(bodyGroup);

  const skinHex = unit.type === 'uruk_berserker' ? '#5c6650' : SKIN_BY_FACTION[faction];
  const hairHex =
    unit.type === 'ironbreaker'
      ? '#f59e0b'
      : unit.type === 'elven_sentinel'
        ? '#f7e59c'
        : BEARD_OR_HAIR_BY_FACTION[faction];

  const mats: UnitPaletteMaterials = {
    primary: makeTrackedMat(bodyMaterials, primaryHex, { roughness: 0.86, metalness: 0.0 }),
    secondary: makeTrackedMat(bodyMaterials, secondaryHex, { roughness: 0.86, metalness: 0.0 }),
    accent: makeTrackedMat(bodyMaterials, accentHex, { roughness: 0.34, metalness: 0.52 }),
    skin: makeTrackedMat(bodyMaterials, skinHex, { roughness: 0.88, metalness: 0.0 }),
    steel: makeTrackedMat(bodyMaterials, '#dbe4f0', { roughness: 0.32, metalness: 0.58 }),
    darkIron: makeTrackedMat(bodyMaterials, '#3f3a4a', { roughness: 0.40, metalness: 0.48 }),
    wood: makeTrackedMat(bodyMaterials, '#9c6639', { roughness: 0.88, metalness: 0.0 }),
    hair: makeTrackedMat(bodyMaterials, hairHex, { roughness: 0.86, metalness: 0.0 }),
    mount: makeTrackedMat(bodyMaterials, MOUNT_COLOR_BY_FACTION[faction], {
      roughness: 0.88,
      metalness: 0.0,
    }),
    white: makeTrackedMat(bodyMaterials, '#f8fafc', { roughness: 0.82, metalness: 0.0 }),
    ember: makeTrackedMat(bodyMaterials, '#ff6b2b', {
      roughness: 0.36,
      metalness: 0.0,
      emissive: '#ff6b2b',
      emissiveIntensity: 0.95,
    }),
  };

  buildIconicUnit(unit.type, faction, bodyGroup, mats, banners);

  const unitHeight = getUnitHeight(unit.type);

  let veteranCrown: THREE.Object3D | null = null;
  if (unit.isVeteran) {
    const crownMat = makeTrackedMat(bodyMaterials, '#facc15', {
      metalness: 0.55,
      roughness: 0.30,
      emissive: '#eab308',
      emissiveIntensity: 0.55,
    });
    veteranCrown = new THREE.Mesh(new THREE.OctahedronGeometry(0.11, 0), crownMat);
    veteranCrown.position.y = unitHeight + 0.14;
    bodyGroup.add(veteranCrown);
  }

  let promoteRing: THREE.Object3D | null = null;
  if (unit.canPromote) {
    const ringMat = new THREE.MeshBasicMaterial({
      color: '#fde047',
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
    });
    promoteRing = new THREE.Mesh(new THREE.RingGeometry(0.61, 0.70, 20), ringMat);
    promoteRing.rotation.x = -Math.PI / 2;
    promoteRing.position.y = 0.04;
    group.add(promoteRing);
  }

  const built: BuiltUnitMesh = {
    group,
    bodyGroup,
    baseDisc,
    baseDiscMat,
    readyRing,
    readyRingMat,
    veteranCrown,
    promoteRing,
    flashMaterials: [mats.primary, mats.secondary, mats.accent, mats.skin],
    bodyMaterials,
    banners,
    unitHeight,
  };

  setUnitVisualState(built, {
    isHumanOwner: false,
    actedThisTurn: unit.actedThisTurn,
    canCapture: Boolean(unit.canCapture),
  });
  return built;
}

/**
 * Applies the binary Polytopia Ready-to-Act vs Acted (full-body stone-grey) vs Enemy state.
 */
export function setUnitVisualState(
  built: BuiltUnitMesh,
  opts: UnitVisualStateOptions,
): void {
  if (opts.isHumanOwner && opts.actedThisTurn) {
    // Full-body cool stone-grey desaturation (lerp 0.65 toward #7c8696, multiply RGB by 0.62)
    for (const entry of built.bodyMaterials) {
      entry.material.color
        .copy(entry.originalColor)
        .lerp(EXHAUSTED_STONE_GREY, 0.65)
        .multiplyScalar(0.62);
      entry.material.emissiveIntensity = 0;
    }
    built.baseDiscMat.color.copy(EXHAUSTED_BASE_COLOR);
    built.baseDiscMat.emissiveIntensity = 0;
    built.baseDiscMat.opacity = 0.72;
    built.baseDiscMat.transparent = true;
    built.readyRing.visible = false;
    built.bodyGroup.scale.set(0.97, 0.96, 0.97);
    return;
  }

  // Restore full vivid original colors
  for (const entry of built.bodyMaterials) {
    entry.material.color.copy(entry.originalColor);
    if (opts.isHumanOwner && !opts.actedThisTurn) {
      // Subtle ready-to-act emissive lift so active units pop sharply off the board
      if (entry.originalEmissiveIntensity > 0) {
        entry.material.emissive.copy(entry.originalEmissive);
        entry.material.emissiveIntensity = Math.max(entry.originalEmissiveIntensity, 0.08);
      } else {
        entry.material.emissive.copy(entry.originalColor);
        entry.material.emissiveIntensity = 0.08;
      }
    } else {
      // Enemy / thumbnail: pure vivid albedo without extra ready lift
      entry.material.emissive.copy(entry.originalEmissive);
      entry.material.emissiveIntensity = entry.originalEmissiveIntensity;
    }
  }

  built.baseDiscMat.opacity = 1.0;
  built.baseDiscMat.transparent = false;
  built.bodyGroup.scale.set(1, 1, 1);

  if (opts.isHumanOwner && !opts.actedThisTurn) {
    built.readyRing.visible = true;
    built.readyRingMat.color.set(opts.canCapture ? '#facc15' : '#ffffff');
  } else {
    built.readyRing.visible = false;
  }
}

/**
 * Legacy helper kept exported for backwards compatibility.
 */
export function setUnitExhausted(built: BuiltUnitMesh, exhausted: boolean): void {
  setUnitVisualState(built, {
    isHumanOwner: true,
    actedThisTurn: exhausted,
    canCapture: false,
  });
}

// ============================================================================
// Iconic Polytopia Toy-Block Character Builders (6–10 bold meshes each!)
// ============================================================================

interface PawnOpts {
  faction: FactionId;
  unitType: UnitType;
  scaleX?: number;
  scaleY?: number;
  mounted?: boolean;
  tunicMat?: THREE.MeshStandardMaterial;
  shoulderMat?: THREE.MeshStandardMaterial;
  useHood?: boolean;
  goldCrest?: boolean;
  whiteHand?: boolean;
}

function buildPolytopiaPawn(
  parent: THREE.Group,
  mats: UnitPaletteMaterials,
  opts: PawnOpts,
): THREE.Group {
  const pawn = new THREE.Group();
  const sx = opts.scaleX ?? (opts.faction === 'dwarves' ? 1.1 : opts.faction === 'elves' ? 0.94 : 1.0);
  const sy = opts.scaleY ?? 1.0;
  pawn.scale.set(sx, sy, sx);
  parent.add(pawn);

  // 1-2. Stubby toy boots (omitted when seated on a mount)
  if (!opts.mounted) {
    const bootMat = opts.faction === 'dwarves' ? mats.darkIron : mats.secondary;
    const bootL = new THREE.Mesh(bootGeo, bootMat);
    bootL.position.set(-0.11, 0.062, 0.02);
    bootL.castShadow = true;
    pawn.add(bootL);

    const bootR = new THREE.Mesh(bootGeo, bootMat);
    bootR.position.set(0.11, 0.062, 0.02);
    bootR.castShadow = true;
    pawn.add(bootR);
  }

  // 3. Chunky tapered cloak/tunic body
  const tunic = new THREE.Mesh(tunicGeo, opts.tunicMat ?? mats.primary);
  tunic.position.y = opts.mounted ? 0.34 : 0.42;
  tunic.castShadow = true;
  tunic.receiveShadow = true;
  pawn.add(tunic);

  // 4. Broad shoulder mantle / pauldron bar
  const shoulders = new THREE.Mesh(shoulderGeo, opts.shoulderMat ?? mats.secondary);
  shoulders.position.y = opts.mounted ? 0.59 : 0.67;
  shoulders.castShadow = true;
  pawn.add(shoulders);

  // Optional Uruk White Hand chest slab (1 bold iconic mesh)
  if (opts.whiteHand) {
    const handSlab = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.24, 0.06), mats.white);
    handSlab.position.set(0, 0.45, 0.24);
    pawn.add(handSlab);
  }

  // 5. Oversized blank Polytopia head
  const headY = opts.mounted ? 0.83 : 0.91;
  const head = new THREE.Mesh(headGeo, mats.skin);
  head.position.y = headY;
  head.castShadow = true;
  pawn.add(head);

  // 6-7. Oversized iconic faction headgear (0.26–0.34 tall — #1 faction silhouette tell!)
  addFactionHeadgear(pawn, mats, opts.faction, headY, {
    useHood: opts.useHood,
    goldCrest: opts.goldCrest,
    isUnique:
      opts.unitType === 'rohirrim_knight' ||
      opts.unitType === 'uruk_berserker' ||
      opts.unitType === 'elven_sentinel' ||
      opts.unitType === 'ironbreaker',
  });

  return pawn;
}

function addFactionHeadgear(
  pawn: THREE.Group,
  mats: UnitPaletteMaterials,
  faction: FactionId,
  headY: number,
  opts: { useHood?: boolean; goldCrest?: boolean; isUnique?: boolean },
): void {
  switch (faction) {
    case 'humans': {
      // Tall Gondor cone helm + bold white wings (or royal gold crest for Rohirrim!)
      const helmMat = opts.goldCrest ? mats.accent : mats.steel;
      const helm = new THREE.Mesh(new THREE.ConeGeometry(0.23, 0.36, 6), helmMat);
      helm.position.y = headY + 0.25;
      helm.castShadow = true;
      pawn.add(helm);

      if (opts.goldCrest) {
        // Sweeping Rohirrim horsehair crest
        const plume = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.22, 0.34), mats.white);
        plume.position.set(0, headY + 0.34, -0.06);
        plume.rotation.x = -0.25;
        plume.castShadow = true;
        pawn.add(plume);
      } else {
        // Bold flared white swan-wings
        const wingMat = mats.white;
        const wingL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.24, 0.14), wingMat);
        wingL.position.set(-0.21, headY + 0.24, -0.02);
        wingL.rotation.z = 0.42;
        wingL.castShadow = true;
        pawn.add(wingL);

        const wingR = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.24, 0.14), wingMat);
        wingR.position.set(0.21, headY + 0.24, -0.02);
        wingR.rotation.z = -0.42;
        wingR.castShadow = true;
        pawn.add(wingR);
      }
      break;
    }

    case 'orcs': {
      // Chunky dark-iron horned/spiked helm dome
      const dome = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.24, 0.22, 6),
        mats.darkIron,
      );
      dome.position.y = headY + 0.17;
      dome.castShadow = true;
      pawn.add(dome);

      const hornGeo = new THREE.ConeGeometry(0.055, opts.isUnique ? 0.32 : 0.26, 4);
      const hornL = new THREE.Mesh(hornGeo, opts.isUnique ? mats.white : mats.steel);
      hornL.position.set(-0.18, headY + 0.29, 0.02);
      hornL.rotation.z = 0.48;
      hornL.castShadow = true;
      pawn.add(hornL);

      const hornR = new THREE.Mesh(hornGeo, opts.isUnique ? mats.white : mats.steel);
      hornR.position.set(0.18, headY + 0.29, 0.02);
      hornR.rotation.z = -0.48;
      hornR.castShadow = true;
      pawn.add(hornR);
      break;
    }

    case 'elves': {
      if (opts.useHood) {
        // Pointed emerald ranger hood + golden hair wedge
        const hood = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.34, 6), mats.primary);
        hood.position.set(0, headY + 0.22, -0.04);
        hood.rotation.x = -0.24;
        hood.castShadow = true;
        pawn.add(hood);
      } else {
        // Sweeping golden leaf-crown / crest
        const crown = new THREE.Mesh(
          new THREE.ConeGeometry(0.22, opts.isUnique ? 0.34 : 0.28, 6),
          mats.accent,
        );
        crown.position.y = headY + 0.23;
        crown.castShadow = true;
        pawn.add(crown);
      }

      // Single clean golden hair wedge in back
      const hair = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.32, 0.12), mats.hair);
      hair.position.set(0, headY - 0.06, -0.17);
      hair.rotation.x = 0.18;
      pawn.add(hair);
      break;
    }

    case 'dwarves': {
      // Angular bronze-crested helm + ONE HUGE triangular beard!
      const helm = new THREE.Mesh(
        new THREE.BoxGeometry(0.36, 0.18, 0.34),
        opts.isUnique ? mats.steel : mats.darkIron,
      );
      helm.position.y = headY + 0.16;
      helm.castShadow = true;
      pawn.add(helm);

      const crest = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.16, 0.38), mats.accent);
      crest.position.y = headY + 0.29;
      crest.castShadow = true;
      pawn.add(crest);

      // Iconic oversized triangular Dwarf beard!
      const beard = new THREE.Mesh(new THREE.ConeGeometry(0.20, 0.38, 5), mats.hair);
      beard.position.set(0, headY - 0.22, 0.17);
      beard.rotation.x = Math.PI;
      beard.castShadow = true;
      pawn.add(beard);
      break;
    }
  }
}

function buildToyMount(
  parent: THREE.Group,
  mats: UnitPaletteMaterials,
  faction: FactionId,
  isRohirrim: boolean,
): void {
  // 1. Chunky body block
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.32, 0.84), mats.mount);
  body.position.set(0, 0.42, 0);
  body.castShadow = true;
  body.receiveShadow = true;
  parent.add(body);

  // 2. Neck prism
  const neck = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.30, 0.22), mats.mount);
  neck.position.set(0, 0.62, 0.34);
  neck.rotation.x = 0.35;
  neck.castShadow = true;
  parent.add(neck);

  // 3. Blocky head
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.20, 0.34), mats.mount);
  head.position.set(0, 0.76, 0.49);
  head.rotation.x = 0.18;
  head.castShadow = true;
  parent.add(head);

  // Faction mount accent (1 bold mesh)
  if (faction === 'dwarves') {
    // Battle-ram sweeping curved horns
    const hornL = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.26, 4), mats.accent);
    hornL.position.set(-0.14, 0.82, 0.44);
    hornL.rotation.set(-0.4, 0, 0.75);
    parent.add(hornL);

    const hornR = hornL.clone();
    hornR.position.x = 0.14;
    hornR.rotation.z = -0.75;
    parent.add(hornR);
  } else if (faction === 'orcs') {
    // Warg jagged mane ridge
    const ridge = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.14, 0.50), mats.darkIron);
    ridge.position.set(0, 0.62, 0.08);
    parent.add(ridge);
  } else if (isRohirrim) {
    // Golden barding caparison
    const barding = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.18, 0.56), mats.accent);
    barding.position.set(0, 0.42, 0.04);
    parent.add(barding);
  }

  // 4-7. Four stubby peg legs
  const legGeo = new THREE.BoxGeometry(0.10, 0.30, 0.11);
  const legCoords: [number, number][] = [
    [-0.14, 0.28],
    [0.14, 0.28],
    [-0.14, -0.28],
    [0.14, -0.28],
  ];
  for (const [lx, lz] of legCoords) {
    const leg = new THREE.Mesh(legGeo, mats.mount);
    leg.position.set(lx, 0.15, lz);
    leg.castShadow = true;
    parent.add(leg);
  }
}

function addBannerLance(
  parent: THREE.Group,
  mats: UnitPaletteMaterials,
  banners: THREE.Object3D[],
  x: number,
  y: number,
  z: number,
  height: number,
  useGoldFlag: boolean,
): void {
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.042, height, 5), mats.wood);
  shaft.position.set(x, y + height * 0.5, z);
  shaft.castShadow = true;
  parent.add(shaft);

  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.22, 4), mats.steel);
  tip.position.set(x, y + height + 0.10, z);
  parent.add(tip);

  const flagPivot = new THREE.Group();
  flagPivot.position.set(x, y + height - 0.16, z);
  flagPivot.userData.bannerPhase = 0.7;
  flagPivot.userData.baseRotY = 0;

  const flag = new THREE.Mesh(
    new THREE.BoxGeometry(0.03, 0.20, 0.36),
    useGoldFlag ? mats.accent : mats.primary,
  );
  flag.position.set(0, 0, -0.18);
  flag.castShadow = true;
  flagPivot.add(flag);

  parent.add(flagPivot);
  banners.push(flagPivot);
}

function buildIconicUnit(
  type: UnitType,
  faction: FactionId,
  parent: THREE.Group,
  mats: UnitPaletteMaterials,
  banners: THREE.Object3D[],
): void {
  switch (type) {
    case 'warrior': {
      buildPolytopiaPawn(parent, mats, { faction, unitType: type });

      // Oversized gleaming blade held heroically on right
      const sword = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.72, 0.15), mats.steel);
      sword.position.set(0.32, 0.76, 0.18);
      sword.rotation.set(0.32, 0, -0.18);
      sword.castShadow = true;
      parent.add(sword);

      const hilt = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.06, 0.08), mats.accent);
      hilt.position.set(0.28, 0.46, 0.10);
      hilt.rotation.set(0.32, 0, -0.18);
      parent.add(hilt);

      // Bold round/kite shield on left
      const shield = new THREE.Mesh(
        new THREE.BoxGeometry(0.10, 0.44, 0.36),
        faction === 'orcs' ? mats.darkIron : mats.secondary,
      );
      shield.position.set(-0.30, 0.56, 0.14);
      shield.rotation.y = 0.35;
      shield.castShadow = true;
      parent.add(shield);
      break;
    }

    case 'defender': {
      buildPolytopiaPawn(parent, mats, {
        faction,
        unitType: type,
        scaleX: faction === 'dwarves' ? 1.16 : 1.06,
        shoulderMat: mats.steel,
      });

      // Massive unmistakable tower shield slab front-left
      const shield = new THREE.Mesh(
        new THREE.BoxGeometry(0.44, 0.76, 0.10),
        faction === 'orcs' ? mats.darkIron : mats.primary,
      );
      shield.position.set(-0.18, 0.52, 0.30);
      shield.rotation.y = -0.25;
      shield.castShadow = true;
      parent.add(shield);

      const boss = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.62, 0.12), mats.accent);
      boss.position.set(-0.18, 0.52, 0.31);
      boss.rotation.y = -0.25;
      parent.add(boss);

      // Tall heavy halberd / spear on right
      const spear = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.038, 1.24, 5), mats.wood);
      spear.position.set(0.30, 0.68, 0.08);
      spear.castShadow = true;
      parent.add(spear);

      const spearTip = new THREE.Mesh(new THREE.ConeGeometry(0.085, 0.26, 4), mats.steel);
      spearTip.position.set(0.30, 1.38, 0.08);
      spearTip.castShadow = true;
      parent.add(spearTip);
      break;
    }

    case 'archer': {
      buildPolytopiaPawn(parent, mats, {
        faction,
        unitType: type,
        useHood: faction === 'elves',
      });

      // Thick oversized curved bow arc (no fussy string or quiver micro-arrows!)
      const bowMat = faction === 'elves' ? mats.accent : mats.wood;
      const bow = new THREE.Mesh(
        new THREE.TorusGeometry(0.34, 0.048, 5, 10, Math.PI * 1.15),
        bowMat,
      );
      bow.position.set(0.24, 0.66, 0.24);
      bow.rotation.set(0, -Math.PI * 0.42, -Math.PI * 0.58);
      bow.castShadow = true;
      parent.add(bow);

      // Single thick drawn arrow shaft
      const arrow = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.58, 5), mats.white);
      arrow.rotation.x = Math.PI / 2;
      arrow.position.set(0.24, 0.66, 0.36);
      arrow.castShadow = true;
      parent.add(arrow);
      break;
    }

    case 'uruk_berserker': {
      // Towering Uruk Berserker (1.50 tall) with white-hand chest & massive cleaver blade!
      buildPolytopiaPawn(parent, mats, {
        faction: 'orcs',
        unitType: type,
        scaleX: 1.14,
        scaleY: 1.12,
        tunicMat: mats.darkIron,
        shoulderMat: mats.primary,
        whiteHand: true,
      });

      const cleaver = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.94, 0.24), mats.steel);
      cleaver.position.set(0.38, 0.86, 0.16);
      cleaver.rotation.set(0.24, 0, -0.22);
      cleaver.castShadow = true;
      parent.add(cleaver);

      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.24, 4), mats.ember);
      spike.position.set(0.45, 1.24, 0.28);
      spike.rotation.x = 1.2;
      parent.add(spike);
      break;
    }

    case 'ironbreaker': {
      // Broad gleaming Mithril Dwarf Champion (1.48 tall) with double-axe & tower shield!
      buildPolytopiaPawn(parent, mats, {
        faction: 'dwarves',
        unitType: type,
        scaleX: 1.18,
        scaleY: 1.08,
        tunicMat: mats.steel,
        shoulderMat: mats.accent,
      });

      const shield = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.74, 0.11), mats.steel);
      shield.position.set(-0.20, 0.54, 0.32);
      shield.rotation.y = -0.24;
      shield.castShadow = true;
      parent.add(shield);

      const trim = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.60, 0.13), mats.accent);
      trim.position.set(-0.20, 0.54, 0.33);
      trim.rotation.y = -0.24;
      parent.add(trim);

      // Oversized double-bitted battle-axe
      const axeHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.18, 5), mats.wood);
      axeHandle.position.set(0.36, 0.66, 0.14);
      axeHandle.rotation.z = -0.14;
      axeHandle.castShadow = true;
      parent.add(axeHandle);

      const axeHead = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.26, 0.10), mats.accent);
      axeHead.position.set(0.42, 1.12, 0.14);
      axeHead.rotation.z = -0.14;
      axeHead.castShadow = true;
      parent.add(axeHead);
      break;
    }

    case 'elven_sentinel': {
      // Sleek tall Lothlorien Champion (1.52 tall) with golden crown, star-bow & glaive!
      buildPolytopiaPawn(parent, mats, {
        faction: 'elves',
        unitType: type,
        scaleX: 0.96,
        scaleY: 1.10,
        tunicMat: mats.primary,
        shoulderMat: mats.accent,
      });

      const bow = new THREE.Mesh(
        new THREE.TorusGeometry(0.38, 0.05, 5, 10, Math.PI * 1.18),
        mats.accent,
      );
      bow.position.set(0.26, 0.76, 0.24);
      bow.rotation.set(0, -Math.PI * 0.42, -Math.PI * 0.58);
      bow.castShadow = true;
      parent.add(bow);

      // Tall silver star-glaive on left
      const glaive = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 1.34, 5), mats.white);
      glaive.position.set(-0.30, 0.72, 0.04);
      glaive.castShadow = true;
      parent.add(glaive);

      const blade = new THREE.Mesh(new THREE.ConeGeometry(0.085, 0.30, 4), mats.steel);
      blade.position.set(-0.30, 1.48, 0.04);
      parent.add(blade);
      break;
    }

    case 'rider': {
      buildToyMount(parent, mats, faction, false);
      const riderGroup = new THREE.Group();
      riderGroup.position.set(0, 0.48, -0.04);
      parent.add(riderGroup);
      buildPolytopiaPawn(riderGroup, mats, {
        faction,
        unitType: type,
        scaleX: 0.90,
        scaleY: 0.90,
        mounted: true,
      });
      addBannerLance(parent, mats, banners, 0.30, 0.28, 0.14, 1.34, false);
      break;
    }

    case 'rohirrim_knight': {
      buildToyMount(parent, mats, 'humans', true);
      const riderGroup = new THREE.Group();
      riderGroup.position.set(0, 0.50, -0.04);
      parent.add(riderGroup);
      buildPolytopiaPawn(riderGroup, mats, {
        faction: 'humans',
        unitType: type,
        scaleX: 0.94,
        scaleY: 0.94,
        mounted: true,
        shoulderMat: mats.accent,
        goldCrest: true,
      });
      addBannerLance(parent, mats, banners, 0.32, 0.26, 0.16, 1.46, true);
      break;
    }

    case 'catapult': {
      // Chunky 8-mesh Polytopia siege engine (1.18 tall — zero mini-engineer or spokes!)
      const frameMat = faction === 'orcs' ? mats.darkIron : mats.wood;
      const wheelMat = faction === 'orcs' ? mats.primary : mats.secondary;

      const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.20, 0.86), frameMat);
      chassis.position.set(0, 0.24, 0);
      chassis.castShadow = true;
      chassis.receiveShadow = true;
      parent.add(chassis);

      // 4 chunky solid disc wheels
      const wheelGeo = new THREE.CylinderGeometry(0.20, 0.20, 0.11, 8);
      wheelGeo.rotateZ(Math.PI / 2);
      const wheelCoords: [number, number][] = [
        [-0.36, 0.26],
        [0.36, 0.26],
        [-0.36, -0.26],
        [0.36, -0.26],
      ];
      for (const [wx, wz] of wheelCoords) {
        const w = new THREE.Mesh(wheelGeo, wheelMat);
        w.position.set(wx, 0.20, wz);
        w.castShadow = true;
        parent.add(w);
      }

      // Cross-frame arch
      const arch = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.34, 0.14), mats.primary);
      arch.position.set(0, 0.48, 0.18);
      arch.castShadow = true;
      parent.add(arch);

      // Thick throwing arm
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.78, 0.14), frameMat);
      arm.position.set(0, 0.64, -0.06);
      arm.rotation.x = -0.58;
      arm.castShadow = true;
      parent.add(arm);

      // Big iconic boulder / Orc fire-rock sitting in the cup (top ~1.18!)
      const boulder = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.23, 0),
        faction === 'orcs' ? mats.ember : mats.steel,
      );
      boulder.position.set(0, 0.96, -0.26);
      boulder.castShadow = true;
      parent.add(boulder);
      break;
    }
  }
}
