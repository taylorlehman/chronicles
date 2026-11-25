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
  | 'helm'
  | 'mapGrid'
  | 'playSword'
  | 'crestHumans'
  | 'crestOrcs'
  | 'crestElves'
  | 'crestDwarves'
  | 'codexHumans'
  | 'codexOrcs'
  | 'codexElves'
  | 'codexDwarves'
  | 'endTurnHumans'
  | 'endTurnOrcs'
  | 'endTurnElves'
  | 'endTurnDwarves'
  | 'superpowerHumans'
  | 'superpowerOrcs'
  | 'superpowerElves'
  | 'superpowerDwarves';

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

  // AI Difficulty: Knight Helm & Shield
  helm: `<path d="M5.5 11.5a6.5 6.5 0 0113 0v3.2c0 2.6-2 4.6-4.5 5.3v-5.5h-4V20c-2.5-.7-4.5-2.7-4.5-5.3v-3.2z" fill="currentColor" fill-opacity="0.22" stroke-linejoin="round"/><path d="M12 5v5.5M8.5 11.5h7" stroke-linecap="round"/><path d="M17.2 13.5l3.3 1.2v2.4c0 1.9-1.3 3.4-3.3 4.1-2-.7-3.3-2.2-3.3-4.1v-2.4l3.3-1.2z" fill="currentColor" fill-opacity="0.32" stroke-linejoin="round"/>`,

  // Map Size: Isometric Tile Grid Cube
  mapGrid: `<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" fill="currentColor" fill-opacity="0.16" stroke-linejoin="round"/><path d="M12 12l8-4.5M12 12L4 7.5M12 12v9M8 5.25l8 4.5M16 5.25l-8 4.5" stroke-linecap="round" stroke-linejoin="round"/>`,

  // Play Button: Diagonal Broadsword
  playSword: `<path d="M19.5 4.5l-1.2 4.5-7.8 7.8-3.3-3.3 7.8-7.8 4.5-1.2z" fill="currentColor" fill-opacity="0.28" stroke-linejoin="round"/><path d="M6.2 12.2l5.6 5.6M4.5 19.5l3.3-3.3" stroke-linecap="round" stroke-linejoin="round"/>`,

  // Faction Crest: Humans — Sunlit Citadel Rook Tower
  crestHumans: `<path d="M6 20h12v-2.2l-1.2-1V10l1.2-1V5h-2.8v2h-2V5h-2.4v2h-2V5H6v4l1.2 1v6.8l-1.2 1V20z" fill="currentColor" fill-opacity="0.28" stroke-linejoin="round"/><path d="M10.2 20v-4.2a1.8 1.8 0 013.6 0V20" stroke-linecap="round"/>`,

  // Faction Crest: Orcs — Ironspire Battle-Axe & Horned Crest
  crestOrcs: `<path d="M12 4.5v15.5" stroke-linecap="round" stroke-width="2.2"/><path d="M12 7.5c-2.6 0-5-1.2-6.5-2.8-.8 3.2-.8 6.4 0 9.6 1.5-1.6 3.9-2.8 6.5-2.8 2.6 0 5 1.2 6.5 2.8.8-3.2.8-6.4 0-9.6-1.5 1.6-3.9 2.8-6.5 2.8z" fill="currentColor" fill-opacity="0.32" stroke-linejoin="round"/>`,

  // Faction Crest: Elves — Starlight Leaf Crest
  crestElves: `<path d="M12 3l1.9 5.5 5.6 1.7-5.6 1.8L12 17.5l-1.9-5.5L4.5 10.2l5.6-1.7L12 3z" fill="currentColor" fill-opacity="0.32" stroke-linejoin="round"/><path d="M6.5 19.5c2.2-.3 4.2-1.2 5.5-2.7 1.3 1.5 3.3 2.4 5.5 2.7" stroke-linecap="round"/>`,

  // Faction Crest: Dwarves — Mountain Peaks & Forge Anvil
  crestDwarves: `<path d="M4 12.5L9 5.5l3 4 3-4 5 7" stroke-linejoin="round" stroke-linecap="round"/><path d="M5.5 14.5h13c-.6 1.8-1.9 2.7-3.5 2.7h-1.2l.8 2.3H9.4l.8-2.3H9c-1.6 0-2.9-.9-3.5-2.7z" fill="currentColor" fill-opacity="0.34" stroke-linejoin="round"/>`,

  // Per-Civ Codex Tome Icons
  codexHumans: `<path d="M3.5 6.5C6.2 5.4 9.2 5.5 12 7.2c2.8-1.7 5.8-1.8 8.5-.7v11.5c-2.7-1.1-5.7-1-8.5.7-2.8-1.7-5.8-1.8-8.5-.7V6.5z" fill="currentColor" fill-opacity="0.24" stroke-linejoin="round"/><path d="M12 7.2v11.5M6.5 9.8h3M6.5 13h3M14.5 9.8h3M14.5 13h3" stroke-linecap="round"/>`,
  codexOrcs: `<path d="M5.5 4.5h11.5a1.8 1.8 0 011.8 1.8v12a1.8 1.8 0 01-1.8 1.8H6.5a1.5 1.5 0 01-1.5-1.5V5.5a1 1 0 01.5-1z" fill="currentColor" fill-opacity="0.24" stroke-linejoin="round"/><path d="M8.2 4.5v15.5M12.8 9.2l-1.6 1.6v3l1.6 1.4 1.6-1.4v-3l-1.6-1.6zM10.5 8.5l1.2 1.2M15.1 8.5l-1.2 1.2" stroke-linecap="round" stroke-linejoin="round"/>`,
  codexElves: `<path d="M5.5 4.5h11.5a2 2 0 012 2v11.5a2 2 0 01-2 2H6.5a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 01.5-1.5z" fill="currentColor" fill-opacity="0.22" stroke-linejoin="round"/><path d="M8 4.5v15.5M13.5 8.2c2.2 1.2 2.8 4.2 1.2 6.6-1.6-2.4-2.2-5.4-1.2-6.6zM13.5 14.8v2.2" stroke-linecap="round" stroke-linejoin="round"/>`,
  codexDwarves: `<path d="M5.5 4.5h12l1.5 1.5v12.5L17.5 20h-12V4.5z" fill="currentColor" fill-opacity="0.26" stroke-linejoin="round"/><path d="M8.5 4.5V20M12 8.2v7.6M12 8.2l3.4 2.4-3.4 2.2 3.6 3" stroke-linecap="round" stroke-linejoin="round"/>`,

  // Per-Civ End Turn Medallion Icons
  endTurnHumans: `<path d="M6.5 6.5l5.5 5.5-5.5 5.5V6.5zM13 6.5l5.5 5.5-5.5 5.5V6.5z" fill="currentColor" stroke-linejoin="round"/>`,
  endTurnOrcs: `<path d="M5.5 7.2l6.2 4.8-6.2 4.8V7.2z" fill="currentColor" stroke-linejoin="round"/><path d="M12.5 13.8c2.6-.5 4.6-2 6-4.8l1.5 1.5c-1.5 3.4-4 5.5-7.5 6.2v-2.9z" fill="currentColor" fill-opacity="0.88" stroke-linejoin="round"/>`,
  endTurnElves: `<path d="M8.5 7.5l1.2 3.2 3.2 1.3-3.2 1.3-1.2 3.2-1.3-3.2L4 12l3.2-1.3 1.3-3.2z" fill="currentColor" stroke="none"/><path d="M13 6.5l6.2 5.5-6.2 5.5 2.2-5.5L13 6.5z" fill="currentColor" stroke-linejoin="round"/>`,
  endTurnDwarves: `<path d="M4.5 10.5h7.5v3.2c-1 .9-2.2 1.3-3.8 1.3l-.6 1.8h3.4v1.7H5.5v-1.7h.8l.5-1.8c-1.2-.5-2-1.4-2.3-2.5v-2z" fill="currentColor" stroke-linejoin="round"/><path d="M13.5 6.5l6 5.5-6 5.5v-11z" fill="currentColor" stroke-linejoin="round"/>`,

  // Per-Civ Age III Superpower Icons
  // Humans: Beacon Tower / Radiant Citadel
  // Humans: Radiant Beacon Watchtower
  superpowerHumans: `<path d="M6.5 21h11M8 21V11.5h8V21M7 11.5V8.5h2.4v1.4h5.2V8.5H17v3z" fill="currentColor" fill-opacity="0.3" stroke-linejoin="round" stroke-linecap="round"/><path d="M10.8 21v-3.5a1.2 1.2 0 012.4 0V21" stroke-linecap="round"/><path d="M12 1.8l1.2 2.7 2.8 1-2.8 1L12 9.2l-1.2-2.7-2.8-1 2.8-1z" fill="currentColor" stroke="none"/>`,
  // Orcs: Erupting Volcano with Magma Plume & Embers
  superpowerOrcs: `<path d="M2.8 20.5h18.4l-5.6-10.2H8.4L2.8 20.5z" fill="currentColor" fill-opacity="0.32" stroke-linejoin="round"/><path d="M9.4 10.3c-.7-2.3.5-4.3 2.6-6.2 2 1.8 3.2 3.8 2.6 6.2z" fill="currentColor" stroke="none"/><path d="M12 2.2v1.6M6.8 6.8L5 5.2M17.2 6.8L19 5.2M8.8 14.5l1.8 2.2 1.6-1.4 2.2 2.6" stroke-linecap="round" stroke-linejoin="round"/>`,
  // Elves: Total Starlight Eclipse with Corona Rays
  superpowerElves: `<circle cx="12" cy="12" r="6.2" fill="currentColor" fill-opacity="0.24"/><path d="M14.6 6.4a5.8 5.8 0 100 11.2 4.7 4.7 0 110-11.2z" fill="currentColor" stroke="none"/><path d="M12 1.8v2.2M12 20v2.2M1.8 12H4M20 12h2.2M4.8 4.8l1.5 1.5M17.7 17.7l1.5 1.5M19.2 4.8l-1.5 1.5M6.3 17.7l-1.5 1.5" stroke-linecap="round"/>`,
  // Dwarves: Winged Fire Drake with Flame Breath
  superpowerDwarves: `<path d="M3.2 17.5c2.2-1.5 4.2-3.8 5-6.8L4.5 7.2l4.4-.6L11.2 3l2.2 3.4 4.8.4-2.8 3.2 3.2 2.2-4.8 1.2c-.8 2.4-2.4 4.3-5.2 5.4l-5.4-1.3z" fill="currentColor" fill-opacity="0.32" stroke-linejoin="round"/><path d="M18.2 10.2l3.4-1.4-1.6 2.8 2 1.2-3.4.2" fill="currentColor" stroke="none"/><circle cx="13.4" cy="9.2" r="0.95" fill="currentColor" stroke="none"/>`,
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

export function renderFactionCodexIcon(faction: FactionId, className = 'icon'): string {
  const map: Record<FactionId, IconName> = {
    humans: 'codexHumans',
    orcs: 'codexOrcs',
    elves: 'codexElves',
    dwarves: 'codexDwarves',
  };
  return renderIcon(map[faction], className);
}

export function renderFactionEndTurnIcon(faction: FactionId, className = 'icon'): string {
  const map: Record<FactionId, IconName> = {
    humans: 'endTurnHumans',
    orcs: 'endTurnOrcs',
    elves: 'endTurnElves',
    dwarves: 'endTurnDwarves',
  };
  return renderIcon(map[faction], className);
}

export function renderFactionSuperpowerIcon(faction: FactionId, className = 'icon'): string {
  const map: Record<FactionId, IconName> = {
    humans: 'superpowerHumans',
    orcs: 'superpowerOrcs',
    elves: 'superpowerElves',
    dwarves: 'superpowerDwarves',
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
    case 'dragon':
      return renderIcon('superpowerDwarves', className);
    case 'watchtower':
      return renderIcon('tower', className);
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
