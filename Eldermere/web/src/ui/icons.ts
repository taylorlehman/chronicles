import type { FactionId, UnitType } from '../game/types';

export type IconName =
  | 'star'
  | 'swords'
  | 'shield'
  | 'crown'
  | 'compass'
  | 'codex'
  | 'leaf'
  | 'anvil'
  | 'tower'
  | 'horse'
  | 'bow'
  | 'catapult'
  | 'wheat'
  | 'pickaxe'
  | 'heart'
  | 'road'
  | 'axe'
  | 'tree'
  | 'skull'
  | 'lock'
  | 'check'
  | 'chevronRight'
  | 'rotateLeft'
  | 'rotateRight'
  | 'help'
  | 'settings'
  | 'refresh'
  | 'close'
  | 'banner'
  | 'eye'
  | 'trophy'
  | 'ruins'
  | 'crestHumans'
  | 'crestOrcs'
  | 'crestElves'
  | 'crestDwarves';

const ICON_PATHS: Record<IconName, string> = {
  // 8-point Star of Gondor
  star: `<path d="M12 1.8l2.1 6.1 6.1-2.1-2.1 6.1 6.1 2.1-6.1 2.1 2.1 6.1-6.1-2.1-2.1 6.1-2.1-6.1-6.1 2.1 2.1-6.1-6.1-2.1 6.1-2.1-2.1-6.1 6.1 2.1z" fill="currentColor" stroke="none"/>`,

  // Crossed Swords
  swords: `<path d="M5 19l4-4m-4 1l3 3M19 5l-9.5 9.5M14.5 5H19v4.5M19 19l-4-4m4 1l-3 3M5 5l9.5 9.5M9.5 5H5v4.5" stroke-linecap="round" stroke-linejoin="round"/>`,

  // Kite Shield
  shield: `<path d="M12 2.5L4.5 5.5v5.8c0 4.9 3.2 8.9 7.5 10.2 4.3-1.3 7.5-5.3 7.5-10.2V5.5L12 2.5z" stroke-linejoin="round"/><path d="M12 6v12M8.5 10h7" stroke-linecap="round" opacity="0.65"/>`,

  // Crown
  crown: `<path d="M3 17.5h18l-1.5-9-4.5 4L12 6l-3 6.5-4.5-4L3 17.5z" stroke-linejoin="round"/><path d="M4.5 20.5h15" stroke-linecap="round"/>`,

  // Compass Rose
  compass: `<circle cx="12" cy="12" r="9"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke-linecap="round"/><path d="M12 6.5l2.2 3.3 3.3 2.2-3.3 2.2L12 17.5l-2.2-3.3L6.5 12l3.3-2.2z" fill="currentColor" fill-opacity="0.25" stroke-linejoin="round"/>`,

  // Illuminated Scroll / Codex
  codex: `<path d="M6 4.5h11.5a2 2 0 012 2v11.5a2 2 0 01-2 2H6.5a2 2 0 01-2-2V6a1.5 1.5 0 011.5-1.5z" stroke-linejoin="round"/><path d="M8.5 4.5v15.5M11.5 9h5M11.5 12.5h5M11.5 16h3.2" stroke-linecap="round"/>`,

  // Mallorn Leaf
  leaf: `<path d="M19.5 4.5C13 4.5 7 8 5.5 16c-.2 1.2.8 2.2 2 2 8-1.5 11.5-7.5 11.5-13.5z" stroke-linejoin="round"/><path d="M4.5 19.5c3-3 7-6.5 11.5-10" stroke-linecap="round"/>`,

  // Anvil & Hammer
  anvil: `<path d="M3.5 11h16.5c-.6 2.3-2.4 3.5-4.5 3.5H9.5l-1.2 3.5h8.2v2H5.5v-2h1.2l.8-3.5C5.2 14.2 3.8 13 3.5 11z" stroke-linejoin="round"/><path d="M9 7.5h6M12 7.5V11" stroke-linecap="round"/>`,

  // Citadel Tower
  tower: `<path d="M6 20.5h12M7.5 20.5V9.5h9v11M6.5 9.5V5h2.5v2h2V5h2v2h2V5h2.5v4.5z" stroke-linejoin="round"/><path d="M10.5 20.5v-4.5a1.5 1.5 0 013 0v4.5" stroke-linecap="round"/>`,

  // Horse Head / Cavalry
  horse: `<path d="M6.5 20h11l-.5-4.5c-.4-3.2 1.5-5.5 2-7.5l-2.5-3-1.5-1.5-.8 1.8c-2 .2-4.2 1.2-5.7 3.2L6 11.5l1.8 1.5 2.4-.8-.7 3.3-3 4.5z" stroke-linejoin="round"/><circle cx="13.8" cy="7.8" r="0.8" fill="currentColor" stroke="none"/>`,

  // Bow & Arrow
  bow: `<path d="M7.5 4c6 2.5 6 13.5 0 16" stroke-linecap="round"/><path d="M7.5 4v16" stroke-linecap="round" opacity="0.55"/><path d="M5 12h14.5M16.5 9l3 3-3 3" stroke-linecap="round" stroke-linejoin="round"/>`,

  // Siege Catapult
  catapult: `<path d="M4 17.5h16M7 17.5l4-7.5 5 7.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 11.5L18.5 5.5" stroke-linecap="round"/><circle cx="19.2" cy="4.8" r="1.6" fill="currentColor" stroke="none"/><circle cx="7.5" cy="18.5" r="2"/><circle cx="16.5" cy="18.5" r="2"/>`,

  // Wheat / Harvest
  wheat: `<path d="M12 21V5M12 16c-3 0-4.5-1.8-4.5-4 2.2 0 4.5 1.5 4.5 4zM12 16c3 0 4.5-1.8 4.5-4-2.2 0-4.5 1.5-4.5 4zM12 11c-2.6 0-4-1.5-4-3.5 2 0 4 1.3 4 3.5zM12 11c2.6 0 4-1.5 4-3.5-2 0-4 1.3-4 3.5z" stroke-linecap="round" stroke-linejoin="round"/>`,

  // Pickaxe / Mining
  pickaxe: `<path d="M5 19l9.5-9.5M10.5 5c3.5.5 6.8 3.2 8.5 6.5l-2.2 1.2c-1.4-2.4-3.6-4.4-6.3-5.2L10.5 5z" stroke-linecap="round" stroke-linejoin="round"/>`,

  // Heart / Recover
  heart: `<path d="M12 20.2C7 16.4 3.8 13.4 3.8 9.4A4.4 4.4 0 0112 7a4.4 4.4 0 018.2 2.4c0 4-3.2 7-8.2 10.8z" stroke-linejoin="round"/><path d="M12 9.5v5M9.5 12h5" stroke-linecap="round"/>`,

  // Road / Waystone Path
  road: `<path d="M8.5 20L10.5 4M15.5 20L13.5 4" stroke-linecap="round"/><path d="M12 7v2M12 12v2.5M12 17.5V20" stroke-linecap="round" opacity="0.7"/>`,

  // Woodcutter Axe
  axe: `<path d="M6 19.5l9.5-9.5M13.5 4.5l5.5 5.5c-1.5 2-3.5 3-5.8 2.8l-2.5-2.5c-.2-2.3.8-4.3 2.8-5.8z" stroke-linecap="round" stroke-linejoin="round"/>`,

  // Tree / Woods / Park
  tree: `<path d="M12 20.5v-5M12 3.5L6.5 11h3L5.5 16h13l-4-5h3L12 3.5z" stroke-linecap="round" stroke-linejoin="round"/>`,

  // Skull / Lethal
  skull: `<path d="M6.5 14.5A5.5 5.5 0 1117.5 14.5v2.5h-2.5v2.5h-6V17H6.5v-2.5z" stroke-linejoin="round"/><circle cx="9.8" cy="11.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="14.2" cy="11.5" r="1.1" fill="currentColor" stroke="none"/>`,

  // Lock
  lock: `<rect x="5.5" y="10.5" width="13" height="9.5" rx="2" stroke-linejoin="round"/><path d="M8.5 10.5V7.5a3.5 3.5 0 017 0v3" stroke-linecap="round"/>`,

  // Checkmark
  check: `<path d="M5 12.5l4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round"/>`,

  // Chevron Right
  chevronRight: `<path d="M9 5.5l6.5 6.5L9 18.5" stroke-linecap="round" stroke-linejoin="round"/>`,

  // Rotate Left
  rotateLeft: `<path d="M7.5 8.5H4V5M4.5 8.5A8 8 0 116 17.5" stroke-linecap="round" stroke-linejoin="round"/>`,

  // Rotate Right
  rotateRight: `<path d="M16.5 8.5H20V5M19.5 8.5A8 8 0 1018 17.5" stroke-linecap="round" stroke-linejoin="round"/>`,

  // Help / Lore
  help: `<circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.5 2.5 0 014.8.8c0 1.6-2.3 2-2.3 3.5" stroke-linecap="round"/><circle cx="12" cy="16.8" r="0.9" fill="currentColor" stroke="none"/>`,

  // Settings / Gear (overflow menu)
  settings: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.6.85 1 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke-linejoin="round"/>`,

  // Refresh / New Game
  refresh: `<path d="M4.5 12a7.5 7.5 0 0113.1-5L20 9.5M19.5 4.5v5h-5M19.5 12a7.5 7.5 0 01-13.1 5L4 14.5M4.5 19.5v-5h5" stroke-linecap="round" stroke-linejoin="round"/>`,

  // Close X
  close: `<path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/>`,

  // Heraldic Banner
  banner: `<path d="M6 3.5h12v14.5l-6-3.5-6 3.5V3.5z" stroke-linejoin="round"/><path d="M4.5 3.5h15" stroke-linecap="round"/>`,

  // Eye / Explorer
  eye: `<path d="M2.5 12s3.8-6 9.5-6 9.5 6 9.5 6-3.8 6-9.5 6-9.5-6-9.5-6z" stroke-linejoin="round"/><circle cx="12" cy="12" r="2.6"/>`,

  // Trophy / Glory Leaderboard
  trophy: `<path d="M7.5 4.5h9v4.2a4.5 4.5 0 01-9 0V4.5z" stroke-linejoin="round"/><path d="M7.5 6.5H4.5a2 2 0 000 4h1.8M16.5 6.5h3a2 2 0 010 4h-1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 13.2v4.3M8.5 20h7M9.5 17.5h5" stroke-linecap="round"/>`,

  // Ancient Ruins / Weathered Archway & Spark
  ruins: `<path d="M4.5 20h15M6.5 20V9.5M17.5 20V11.5M10.5 20v-7.5M5.5 9.5h7.5l2-2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.5 4l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" fill="currentColor" stroke="none"/>`,

  // Faction Crest: Humans — White Tree & Crown of Gondor
  crestHumans: `<path d="M12 19.5V8.5M12 13.5l-3.8-2.5M12 13.5l3.8-2.5M12 10.5L9.5 8.5M12 10.5l2.5-2M8 19.5h8" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 6.5l2 1.2L12 4.5l2.5 3.2 2-1.2-.8 2.5H8.3l-.8-2.5z" fill="currentColor" fill-opacity="0.3" stroke-linejoin="round"/>`,

  // Faction Crest: Orcs — Dark Tower & Flame Eye
  crestOrcs: `<path d="M6.5 20.5L8.5 5l3.5 3.5L15.5 5l2 15.5z" stroke-linejoin="round"/><ellipse cx="12" cy="12" rx="3.2" ry="1.8" fill="currentColor" fill-opacity="0.35"/><path d="M12 10.5v3" stroke-linecap="round"/>`,

  // Faction Crest: Elves — Mallorn Star & Twin Leaves
  crestElves: `<path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6z" fill="currentColor" fill-opacity="0.28" stroke-linejoin="round"/><path d="M6.5 18.5c2.2-.2 4.2-1.2 5.5-2.8 1.3 1.6 3.3 2.6 5.5 2.8" stroke-linecap="round"/>`,

  // Faction Crest: Dwarves — Mountain Crown & Crossed Hammers
  crestDwarves: `<path d="M3.5 19L9 8.5l3 4.5 3-4.5L20.5 19z" stroke-linejoin="round"/><path d="M9.5 6.5h5M12 4.5v4.5" stroke-linecap="round"/>`,
};

export function renderIcon(name: IconName, className = 'icon'): string {
  const path = ICON_PATHS[name] ?? ICON_PATHS.star;
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" aria-hidden="true">${path}</svg>`;
}

export function renderFactionCrest(faction: FactionId, className = 'icon icon-crest'): string {
  const map: Record<FactionId, IconName> = {
    humans: 'crestHumans',
    orcs: 'crestOrcs',
    elves: 'crestElves',
    dwarves: 'crestDwarves',
  };
  return renderIcon(map[faction], className);
}

export function renderUnitIcon(unitType: UnitType, className = 'icon'): string {
  switch (unitType) {
    case 'warrior':
      return renderIcon('swords', className);
    case 'defender':
    case 'ironbreaker':
      return renderIcon('shield', className);
    case 'archer':
    case 'elven_sentinel':
      return renderIcon('bow', className);
    case 'rider':
    case 'rohirrim_knight':
      return renderIcon('horse', className);
    case 'catapult':
      return renderIcon('catapult', className);
    case 'uruk_berserker':
      return renderIcon('axe', className);
    default:
      return renderIcon('swords', className);
  }
}

/** Maps generic action icon keys or action IDs (including emoji hints from rules.ts) to crisp SVG icons. */
export function renderActionIcon(iconKey: string, className = 'icon', actionId = ''): string {
  const combined = `${iconKey} ${actionId}`.toLowerCase();
  const trimmed = iconKey.toLowerCase();
  if (trimmed in ICON_PATHS) {
    return renderIcon(trimmed as IconName, className);
  }
  if (combined.includes('capture') || combined.includes('crown')) {
    return renderIcon('crown', className);
  }
  if (combined.includes('ruins') || combined.includes('explore') || iconKey.includes('🏛')) {
    return renderIcon('ruins', className);
  }
  if (combined.includes('recover') || combined.includes('heal') || combined.includes('heart') || iconKey.includes('💚')) {
    return renderIcon('heart', className);
  }
  if (combined.includes('promote') || combined.includes('vet') || iconKey.includes('⭐')) {
    return renderIcon('star', className);
  }
  if (combined.includes('harvest') || combined.includes('berry') || combined.includes('berries') || combined.includes('farm') || combined.includes('wheat') || iconKey.includes('🌾') || iconKey.includes('🫐')) {
    return renderIcon('wheat', className);
  }
  if (combined.includes('game') || iconKey.includes('🦌')) {
    return renderIcon('bow', className);
  }
  if (combined.includes('mine') || combined.includes('ore') || combined.includes('mithril') || combined.includes('pick') || iconKey.includes('⛏') || iconKey.includes('💎')) {
    return renderIcon('pickaxe', className);
  }
  if (combined.includes('forge') || combined.includes('anvil') || combined.includes('foundry') || combined.includes('slag') || combined.includes('workshop') || iconKey.includes('⚒') || iconKey.includes('🔥') || iconKey.includes('🕳')) {
    return renderIcon('anvil', className);
  }
  if (combined.includes('road') || iconKey.includes('🛤')) {
    return renderIcon('road', className);
  }
  if (combined.includes('chop') || combined.includes('axe') || iconKey.includes('🪓')) {
    return renderIcon('axe', className);
  }
  if (combined.includes('sanctuary') || iconKey.includes('🌿')) {
    return renderIcon('leaf', className);
  }
  if (combined.includes('plant') || combined.includes('wood') || combined.includes('tree') || iconKey.includes('🌳')) {
    return renderIcon('tree', className);
  }
  if (combined.includes('rider') || combined.includes('knight') || combined.includes('horse')) {
    return renderIcon('horse', className);
  }
  if (combined.includes('arch') || combined.includes('sentinel') || combined.includes('bow')) {
    return renderIcon('bow', className);
  }
  if (combined.includes('catapult') || combined.includes('siege')) {
    return renderIcon('catapult', className);
  }
  if (combined.includes('def') || combined.includes('shield') || combined.includes('ironbreaker')) {
    return renderIcon('shield', className);
  }
  if (combined.includes('windmill') || combined.includes('build') || combined.includes('tower') || iconKey.includes('🌬')) {
    return renderIcon('tower', className);
  }
  return renderIcon('swords', className);
}

/** Roman numeral helper for Turn / Tier flourishes. */
export function toRoman(num: number): string {
  if (num === 1) return 'I';
  if (num === 2) return 'II';
  if (num === 3) return 'III';
  return String(num);
}
