import '../styles/star-crown.css';
import type { FactionId } from '../game/types';

export type CrownShardSlot = 0 | 1 | 2 | 3;

export const STAR_CROWN_TOTAL_SHARDS = 4;

/**
 * Canonical left-to-right interlocking quadrant order of the 4 realms in the Star-Crown:
 *   0 — Humans (Valoria): Far-Left Wing & Royal Sapphire
 *   1 — Elves (Sylvanvale): Center-Left Star Spire & Celestial Emerald
 *   2 — Dwarves (Deepforge): Center-Right Star Spire & Forge Amber
 *   3 — Orcs (Ashfell): Far-Right Wing & Molten Crimson
 */
export const STAR_CROWN_SLOT_ORDER: readonly FactionId[] = [
  'humans',
  'elves',
  'dwarves',
  'orcs',
] as const;

export interface StarCrownHudOptions {
  total?: number;
  pulse?: boolean;
}

export interface StarCrownForgeOptions {
  beforeShards: readonly FactionId[];
  addedShards: readonly FactionId[];
  afterShards: readonly FactionId[];
  total?: number;
  caption?: string;
}

export interface StarCrownVictoryOptions {
  beforeShards?: readonly FactionId[];
  addedShards?: readonly FactionId[];
  afterShards: readonly FactionId[];
  isDomination: boolean;
  total?: number;
}

export interface ShardGemPalette {
  faction: FactionId;
  realmLabel: string;
  hi: string;
  mid: string;
  deep: string;
  rim: string;
  pip: string;
  fromX: number;
  fromY: number;
  fromRot: number;
  tightViewBox: string;
  anchor: { cx: number; cy: number };
}

export const SHARD_PALETTES: Record<CrownShardSlot, ShardGemPalette> = {
  0: {
    faction: 'humans',
    realmLabel: 'Valoria',
    hi: '#DCEBFF',
    mid: '#3B82F6',
    deep: '#1D4ED8',
    rim: '#1E3A8A',
    pip: '#60A5FA',
    fromX: -52,
    fromY: -44,
    fromRot: -14,
    tightViewBox: '30 22 46 124',
    anchor: { cx: 52, cy: 92 },
  },
  1: {
    faction: 'elves',
    realmLabel: 'Sylvanvale',
    hi: '#A7F3D0',
    mid: '#10B981',
    deep: '#059669',
    rim: '#065F46',
    pip: '#34D399',
    fromX: -18,
    fromY: -58,
    fromRot: -6,
    tightViewBox: '54 16 69 131',
    anchor: { cx: 92, cy: 86 },
  },
  2: {
    faction: 'dwarves',
    realmLabel: 'Deepforge',
    hi: '#FFEDD5',
    mid: '#FB923C',
    deep: '#EA580C',
    rim: '#9A3412',
    pip: '#F59E0B',
    fromX: 18,
    fromY: -58,
    fromRot: 6,
    tightViewBox: '117 16 69 131',
    anchor: { cx: 148, cy: 86 },
  },
  3: {
    faction: 'orcs',
    realmLabel: 'Ashfell',
    hi: '#FFD5CE',
    mid: '#EF4444',
    deep: '#DC2626',
    rim: '#991B1B',
    pip: '#F87171',
    fromX: 52,
    fromY: -44,
    fromRot: 14,
    tightViewBox: '164 22 46 124',
    anchor: { cx: 188, cy: 92 },
  },
};

let svgUidCounter = 0;

function nextSvgUid(prefix = 'sc'): string {
  svgUidCounter += 1;
  return `${prefix}${svgUidCounter}`;
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Maps each of the 4 Eldermere civilizations to its permanent, sculpted quadrant
 * in the interlocking 4-piece Star-Crown.
 */
export function getShardSlotIndex(faction: FactionId): CrownShardSlot {
  switch (faction) {
    case 'humans':
      return 0;
    case 'elves':
      return 1;
    case 'dwarves':
      return 2;
    case 'orcs':
      return 3;
  }
}

export function getShardPalette(factionOrSlot: FactionId | CrownShardSlot): ShardGemPalette {
  const slot = typeof factionOrSlot === 'number' ? factionOrSlot : getShardSlotIndex(factionOrSlot);
  return SHARD_PALETTES[slot];
}

function toSlotSet(shards: readonly FactionId[] | undefined): Set<CrownShardSlot> {
  const slots = new Set<CrownShardSlot>();
  if (!shards) return slots;
  for (const faction of shards) {
    slots.add(getShardSlotIndex(faction));
  }
  return slots;
}

/**
 * Sizzle-exact outer silhouette polygon of the cylindrical Star-Crown used for
 * crisp bare-HUD edge contrast and SVG-clipped metallic sheen sweeps (zero blur).
 */
const CROWN_SILHOUETTE_POINTS =
  '38,29 58,86 76,47 96,86 101,59 120,20 139,59 144,86 164,47 182,86 202,29 203,86 195,125 191,138 169,141 120,144 71,141 49,138 45,125 37,86';

/**
 * Renders the reusable SVG <defs> matching the sizzle video's matte-satin celestial
 * gold facets and carved empty sockets. Zero feGaussianBlur — 100% GPU-safe on Android WebView.
 */
function renderCrownDefs(uid: string, isHud: boolean): string {
  const sockHi = isHud ? '#3E5480' : '#34476D';
  const sockMid = isHud ? '#2E4166' : '#263554';
  const sockDeep = isHud ? '#202E4A' : '#1A253D';
  const sockCol = isHud ? '#32466D' : '#2A3B5E';

  return `
    <defs>
      <linearGradient id="${uid}-gold-ivory" x1="10%" y1="0%" x2="90%" y2="100%">
        <stop offset="0%" stop-color="#FFF9CE" />
        <stop offset="52%" stop-color="#FCE877" />
        <stop offset="100%" stop-color="#F3D266" />
      </linearGradient>
      <linearGradient id="${uid}-gold-sunlit" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FCE877" />
        <stop offset="55%" stop-color="#F3D266" />
        <stop offset="100%" stop-color="#E3B84D" />
      </linearGradient>
      <linearGradient id="${uid}-gold-butter" x1="0%" y1="0%" x2="85%" y2="100%">
        <stop offset="0%" stop-color="#FCE877" />
        <stop offset="55%" stop-color="#F3D266" />
        <stop offset="100%" stop-color="#E3B84D" />
      </linearGradient>
      <linearGradient id="${uid}-gold-honey" x1="0%" y1="0%" x2="85%" y2="100%">
        <stop offset="0%" stop-color="#F3D266" />
        <stop offset="55%" stop-color="#E3B84D" />
        <stop offset="100%" stop-color="#CCA03A" />
      </linearGradient>
      <linearGradient id="${uid}-gold-ochre" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#E3B84D" />
        <stop offset="60%" stop-color="#CCA03A" />
        <stop offset="100%" stop-color="#B1842A" />
      </linearGradient>
      <linearGradient id="${uid}-gold-bowl" x1="15%" y1="0%" x2="85%" y2="100%">
        <stop offset="0%" stop-color="#C89432" />
        <stop offset="60%" stop-color="#DDA63B" />
        <stop offset="100%" stop-color="#FAD664" />
      </linearGradient>
      <linearGradient id="${uid}-collar-0" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#B1842A" />
        <stop offset="100%" stop-color="#CCA03A" />
      </linearGradient>
      <linearGradient id="${uid}-collar-1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#CCA03A" />
        <stop offset="100%" stop-color="#E3B84D" />
      </linearGradient>
      <linearGradient id="${uid}-collar-2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#E3B84D" />
        <stop offset="55%" stop-color="#F3D266" />
        <stop offset="100%" stop-color="#FCE877" />
      </linearGradient>
      <linearGradient id="${uid}-collar-3" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FCE877" />
        <stop offset="100%" stop-color="#FFF9CE" />
      </linearGradient>
      <linearGradient id="${uid}-sock-hi" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${sockHi}" />
        <stop offset="100%" stop-color="${sockMid}" />
      </linearGradient>
      <linearGradient id="${uid}-sock-mid" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${sockMid}" />
        <stop offset="100%" stop-color="${sockDeep}" />
      </linearGradient>
      <linearGradient id="${uid}-sock-collar" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${sockCol}" />
        <stop offset="100%" stop-color="${sockDeep}" />
      </linearGradient>
      <radialGradient id="${uid}-halo-glow" cx="50%" cy="54%" r="52%">
        <stop offset="0%" stop-color="#FFF6BF" stop-opacity="0.62" />
        <stop offset="42%" stop-color="#F9D65C" stop-opacity="0.28" />
        <stop offset="78%" stop-color="#E3B84D" stop-opacity="0.06" />
        <stop offset="100%" stop-color="#E3B84D" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="${uid}-ray-grad" x1="50%" y1="100%" x2="50%" y2="0%">
        <stop offset="0%" stop-color="#FFF6BF" stop-opacity="0.44" />
        <stop offset="55%" stop-color="#F9D65C" stop-opacity="0.16" />
        <stop offset="100%" stop-color="#F9D65C" stop-opacity="0" />
      </linearGradient>
      <linearGradient id="${uid}-ray-down" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stop-color="#FFF6BF" stop-opacity="0.34" />
        <stop offset="70%" stop-color="#F9D65C" stop-opacity="0.09" />
        <stop offset="100%" stop-color="#F9D65C" stop-opacity="0" />
      </linearGradient>
      <linearGradient id="${uid}-sheen-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFFCE6" stop-opacity="0" />
        <stop offset="38%" stop-color="#FFFCE6" stop-opacity="0.12" />
        <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.72" />
        <stop offset="62%" stop-color="#FFFCE6" stop-opacity="0.12" />
        <stop offset="100%" stop-color="#FFFCE6" stop-opacity="0" />
      </linearGradient>
      <clipPath id="${uid}-crown-clip">
        <polygon points="${CROWN_SILHOUETTE_POINTS}" />
      </clipPath>
    </defs>
  `;
}

/**
 * Flush-inset 4-facet beveled realm diamond matching the sizzle crown's crisp
 * low-poly gem settings.
 */
function renderFlushFacetedGem(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  palette: ShardGemPalette,
  skewX = 0,
): string {
  const tx = cx + skewX;
  const bx = cx - skewX;
  const lx = cx - rx;
  const rxp = cx + rx;
  const ty = cy - ry;
  const by = cy + ry;
  const padX = 1.5;
  const padY = 1.9;

  return `
    <g class="sc-gem">
      <polygon
        points="${tx},${ty - padY} ${rxp + padX},${cy} ${bx},${by + padY} ${lx - padX},${cy}"
        fill="#9B6E1D"
        stroke="#FFF3B8"
        stroke-width="0.65"
        stroke-opacity="0.72"
        stroke-linejoin="round"
      />
      <polygon points="${tx},${ty} ${cx},${cy} ${lx},${cy}" fill="${palette.mid}" />
      <polygon points="${tx},${ty} ${rxp},${cy} ${cx},${cy}" fill="${palette.hi}" />
      <polygon points="${lx},${cy} ${cx},${cy} ${bx},${by}" fill="${palette.deep}" />
      <polygon points="${cx},${cy} ${rxp},${cy} ${bx},${by}" fill="${palette.rim}" />
      <polygon
        points="${cx + rx * 0.08},${cy - ry * 0.22} ${cx + rx * 0.48},${cy - ry * 0.06} ${cx + rx * 0.14},${cy - ry * 0.56}"
        fill="#FFFFFF"
        fill-opacity="0.62"
      />
    </g>
  `;
}

function renderSunbeamAura(uid: string, intensity: 'hero' | 'victory'): string {
  const op = intensity === 'victory' ? '1' : '0.84';
  return `
    <g class="sc-sunbeam-aura" opacity="${op}" aria-hidden="true">
      <ellipse cx="120" cy="86" rx="112" ry="72" fill="url(#${uid}-halo-glow)" />
      <polygon points="120,86 78,4 104,2" fill="url(#${uid}-ray-grad)" />
      <polygon points="120,86 136,2 162,4" fill="url(#${uid}-ray-grad)" />
      <polygon points="120,86 24,18 52,6" fill="url(#${uid}-ray-grad)" />
      <polygon points="120,86 188,6 216,18" fill="url(#${uid}-ray-grad)" />
      <polygon points="120,86 2,52 16,30" fill="url(#${uid}-ray-grad)" />
      <polygon points="120,86 224,30 238,52" fill="url(#${uid}-ray-grad)" />
      <polygon points="120,108 66,158 100,160" fill="url(#${uid}-ray-down)" />
      <polygon points="120,108 140,160 174,158" fill="url(#${uid}-ray-down)" />
    </g>
  `;
}

/**
 * Renders the recessed dark carved socket silhouette ONLY for uncollected slots
 * so filled golden shards never expose dark edges behind them.
 */
function renderEmptySocketSlot(
  slot: CrownShardSlot,
  uid: string,
  isHud: boolean,
): string {
  const rimCol = isHud ? '#E3BA5C' : '#D6AB4E';
  const ridgeCol = '#967D48';
  const rimW = isHud ? '2.4' : '1.45';
  const rimOp = isHud ? '0.96' : '0.78';
  const ridgeW = isHud ? '1.35' : '0.95';
  const ridgeOp = isHud ? '0.72' : '0.52';
  const deepCol = isHud ? '#202E4A' : '#1A253D';
  const hiCol = isHud ? '#3E5480' : '#34476D';

  switch (slot) {
    case 0:
      return `
        <g class="sc-socket is-empty" data-socket-slot="0">
          <polygon points="44,58 58,86 67,82 65,64" fill="${deepCol}" stroke="${rimCol}" stroke-width="0.9" stroke-opacity="0.45" />
          <polygon points="38,29 58,86 66,98 67,128 45,125 37,86" fill="url(#${uid}-sock-mid)" stroke="${rimCol}" stroke-width="${rimW}" stroke-opacity="${rimOp}" stroke-linejoin="round" />
          <polygon points="38,29 44,85 37,86" fill="url(#${uid}-sock-hi)" fill-opacity="0.72" />
          <polygon points="45,125 67,128 71,141 49,138" fill="url(#${uid}-sock-collar)" stroke="${rimCol}" stroke-width="${rimW}" stroke-opacity="${rimOp}" stroke-linejoin="round" />
          <polyline points="38,29 44,85 48,125" fill="none" stroke="${ridgeCol}" stroke-width="${ridgeW}" stroke-opacity="${ridgeOp}" />
          <polygon points="50,97 56,107 50,117 44,107" fill="#131C30" stroke="${rimCol}" stroke-width="${ridgeW}" stroke-opacity="0.76" />
        </g>
      `;

    case 1:
      return `
        <g class="sc-socket is-empty" data-socket-slot="1">
          <polygon points="62,76 69,54 82,74 96,86 64,90" fill="${deepCol}" stroke="${rimCol}" stroke-width="0.9" stroke-opacity="0.5" />
          <polygon points="94,85 110,73 120,76 120,92 96,88" fill="${deepCol}" />
          <polygon points="58,86 76,47 96,86 109,72 101,59 120,20 120,132 67,128 66,98" fill="url(#${uid}-sock-mid)" stroke="${rimCol}" stroke-width="${rimW}" stroke-opacity="${rimOp}" stroke-linejoin="round" />
          <polygon points="101,59 120,20 120,63" fill="url(#${uid}-sock-hi)" fill-opacity="0.74" />
          <polygon points="67,128 120,132 120,144 71,141" fill="url(#${uid}-sock-collar)" stroke="${rimCol}" stroke-width="${rimW}" stroke-opacity="${rimOp}" stroke-linejoin="round" />
          <polyline points="76,47 75,86 74,128" fill="none" stroke="${ridgeCol}" stroke-width="${ridgeW}" stroke-opacity="${ridgeOp}" />
          <polyline points="101,59 120,63" fill="none" stroke="${ridgeCol}" stroke-width="${ridgeW}" stroke-opacity="${ridgeOp}" />
          <polygon points="84,99 90,108 84,117 78,108" fill="#131C30" stroke="${rimCol}" stroke-width="${ridgeW}" stroke-opacity="0.76" />
        </g>
      `;

    case 2:
      return `
        <g class="sc-socket is-empty" data-socket-slot="2">
          <polygon points="178,76 171,54 158,74 144,86 176,90" fill="${deepCol}" stroke="${rimCol}" stroke-width="0.9" stroke-opacity="0.5" />
          <polygon points="146,85 130,73 120,76 120,92 144,88" fill="${deepCol}" />
          <polygon points="182,86 164,47 144,86 131,72 139,59 120,20 120,132 173,128 174,98" fill="url(#${uid}-sock-hi)" stroke="${rimCol}" stroke-width="${rimW}" stroke-opacity="${rimOp}" stroke-linejoin="round" />
          <polygon points="120,20 139,59 120,63" fill="${hiCol}" fill-opacity="0.88" />
          <polygon points="173,128 120,132 120,144 169,141" fill="url(#${uid}-sock-collar)" stroke="${rimCol}" stroke-width="${rimW}" stroke-opacity="${rimOp}" stroke-linejoin="round" />
          <polyline points="164,47 165,86 166,128" fill="none" stroke="${ridgeCol}" stroke-width="${ridgeW}" stroke-opacity="${ridgeOp}" />
          <polyline points="139,59 120,63" fill="none" stroke="${ridgeCol}" stroke-width="${ridgeW}" stroke-opacity="${ridgeOp}" />
          <polygon points="156,99 162,108 156,117 150,108" fill="#131C30" stroke="${rimCol}" stroke-width="${ridgeW}" stroke-opacity="0.76" />
        </g>
      `;

    case 3:
      return `
        <g class="sc-socket is-empty" data-socket-slot="3">
          <polygon points="196,58 182,86 173,82 175,64" fill="${deepCol}" stroke="${rimCol}" stroke-width="0.9" stroke-opacity="0.45" />
          <polygon points="202,29 182,86 174,98 173,128 195,125 203,86" fill="url(#${uid}-sock-hi)" stroke="${rimCol}" stroke-width="${rimW}" stroke-opacity="${rimOp}" stroke-linejoin="round" />
          <polygon points="202,29 196,85 203,86" fill="${hiCol}" />
          <polygon points="195,125 173,128 169,141 191,138" fill="url(#${uid}-sock-collar)" stroke="${rimCol}" stroke-width="${rimW}" stroke-opacity="${rimOp}" stroke-linejoin="round" />
          <polyline points="202,29 196,85 192,125" fill="none" stroke="${ridgeCol}" stroke-width="${ridgeW}" stroke-opacity="${ridgeOp}" />
          <polygon points="190,97 196,107 190,117 184,107" fill="#131C30" stroke="${rimCol}" stroke-width="${ridgeW}" stroke-opacity="0.76" />
        </g>
      `;
  }
}

/**
 * Renders one sculpted low-poly golden interlocking crown shard matching the
 * exact sizzle crown cylindrical silhouette, 2-tier collar, warm interior bowl,
 * and flush tribe-colored diamond jewel.
 */
function renderGoldenShardBody(slot: CrownShardSlot, uid: string, isFloating = false): string {
  const palette = SHARD_PALETTES[slot];
  const seamRim = isFloating
    ? `<polyline points="${
        slot === 0
          ? '58,86 66,98 67,128 71,141'
          : slot === 1 || slot === 2
            ? '120,20 120,144'
            : '182,86 174,98 173,128 169,141'
      }" fill="none" stroke="#FFF9CE" stroke-width="1.35" stroke-opacity="0.92" stroke-linejoin="round" />`
    : '';

  switch (slot) {
    case 0:
      return `
        <polygon points="44,58 63,79 58,86 43,78" fill="url(#${uid}-gold-bowl)" />
        <polygon points="44,58 55,69 58,86 44,72" fill="#FAD664" fill-opacity="0.55" />
        <polygon points="38,29 44,85 37,86" fill="#FFF9CE" />
        <polygon points="38,29 58,86 44,85" fill="url(#${uid}-gold-honey)" />
        <polygon points="37,86 44,85 48,125 45,125" fill="#F3D266" />
        <polygon points="44,85 58,86 66,98 67,128 48,125" fill="url(#${uid}-gold-ochre)" />
        <polygon points="44,85 58,86 66,98 46,96" fill="#F3D266" fill-opacity="0.38" />
        <polygon points="45,125 67,128 68,133 46,130" fill="#F3D266" />
        <polygon points="46,130 68,133 71,141 49,138" fill="url(#${uid}-collar-0)" />
        <polyline points="45,125 67,128" fill="none" stroke="#FCE877" stroke-width="0.9" stroke-opacity="0.72" />
        <polyline points="38,29 44,85 48,125" fill="none" stroke="#FFF9CE" stroke-width="0.95" stroke-opacity="0.82" />
        ${seamRim}
        ${renderFlushFacetedGem(50, 107, 5.2, 9.6, palette, 0.8)}
      `;

    case 1:
      return `
        <polygon points="62,76 69,54 81,74 75,86 58,86" fill="#FAD664" />
        <polygon points="69,54 81,74 74,78" fill="#CCA03A" />
        <polygon points="75,86 96,86 112,71 120,73 120,90 75,90" fill="url(#${uid}-gold-bowl)" />
        <polygon points="58,86 76,47 75,86" fill="url(#${uid}-gold-sunlit)" />
        <polygon points="76,47 96,86 75,86" fill="url(#${uid}-gold-ochre)" />
        <polygon points="101,59 120,20 120,63" fill="#F3D266" />
        <polygon points="109,72 101,59 120,63 120,75" fill="#CCA03A" />
        <polygon points="96,86 109,72 120,75 120,90" fill="url(#${uid}-gold-honey)" />
        <polygon points="58,86 75,86 74,128 67,128 66,98" fill="url(#${uid}-gold-ochre)" />
        <polygon points="75,86 96,86 120,90 120,132 74,128" fill="url(#${uid}-gold-honey)" />
        <polygon points="75,86 96,86 96,130 74,128" fill="#CCA03A" fill-opacity="0.32" />
        <polygon points="67,128 120,132 120,137 68,133" fill="#F3D266" />
        <polygon points="68,133 120,137 120,144 71,141" fill="url(#${uid}-collar-1)" />
        <polyline points="67,128 120,132" fill="none" stroke="#FCE877" stroke-width="0.9" stroke-opacity="0.75" />
        <polyline points="76,47 75,86 74,128" fill="none" stroke="#FCE877" stroke-width="0.95" stroke-opacity="0.78" />
        <polyline points="101,59 120,63" fill="none" stroke="#FFF9CE" stroke-width="0.75" stroke-opacity="0.52" />
        ${seamRim}
        ${renderFlushFacetedGem(84, 108, 5.2, 8.6, palette, 0)}
      `;

    case 2:
      return `
        ${
          isFloating
            ? ''
            : `<polygon points="120,24 127,22 140,60 120,62" fill="#F3D266" />
               <polygon points="127,22 141,60 137,62" fill="#CCA03A" />`
        }
        <polygon points="178,76 171,54 159,74 165,86 182,86" fill="#FAD664" />
        <polygon points="171,54 159,74 166,78" fill="#F3D266" />
        <polygon points="165,86 144,86 128,71 120,73 120,90 165,90" fill="url(#${uid}-gold-bowl)" />
        <polygon points="120,20 139,59 120,63" fill="url(#${uid}-gold-ivory)" />
        <polygon points="120,63 139,59 131,72 120,75" fill="url(#${uid}-gold-sunlit)" />
        <polygon points="120,75 131,72 144,86 120,90" fill="url(#${uid}-gold-butter)" />
        <polygon points="164,47 144,86 165,86" fill="url(#${uid}-gold-butter)" />
        <polygon points="182,86 164,47 165,86" fill="url(#${uid}-gold-ivory)" />
        <polygon points="120,90 144,86 165,86 166,128 120,132" fill="url(#${uid}-gold-sunlit)" />
        <polygon points="165,86 182,86 174,98 173,128 166,128" fill="url(#${uid}-gold-ivory)" />
        <polygon points="120,132 173,128 172,133 120,137" fill="url(#${uid}-collar-2)" />
        <polygon points="120,137 172,133 169,141 120,144" fill="url(#${uid}-collar-2)" />
        <polygon points="146,130 173,128 172,133 145,135" fill="#FFF9CE" fill-opacity="0.75" />
        <polyline points="120,132 173,128" fill="none" stroke="#FFF9CE" stroke-width="0.95" stroke-opacity="0.82" />
        <polyline points="164,47 165,86 166,128" fill="none" stroke="#FFF9CE" stroke-width="1.05" stroke-opacity="0.86" />
        <polyline points="139,59 120,63" fill="none" stroke="#FFFFFF" stroke-width="0.7" stroke-opacity="0.52" />
        ${seamRim}
        ${renderFlushFacetedGem(156, 108, 5.2, 8.6, palette, 0)}
      `;

    case 3:
      return `
        <polygon points="196,58 177,79 182,86 197,78" fill="url(#${uid}-gold-bowl)" />
        <polygon points="196,58 185,69 182,86 196,72" fill="#FFF9CE" fill-opacity="0.52" />
        <polygon points="202,29 196,85 182,86" fill="url(#${uid}-gold-sunlit)" />
        <polygon points="202,29 203,86 196,85" fill="#FFF9CE" />
        <polygon points="203,86 196,85 192,125 195,125" fill="#FFFDF0" />
        <polygon points="196,85 182,86 174,98 173,128 192,125" fill="url(#${uid}-gold-ivory)" />
        <polygon points="195,125 173,128 172,133 194,130" fill="#FFF9CE" />
        <polygon points="194,130 172,133 169,141 191,138" fill="url(#${uid}-collar-3)" />
        <polyline points="195,125 173,128" fill="none" stroke="#FFFFFF" stroke-width="1.05" stroke-opacity="0.88" />
        <polyline points="202,29 196,85 192,125" fill="none" stroke="#FFFFFF" stroke-width="1.05" stroke-opacity="0.9" />
        ${seamRim}
        ${renderFlushFacetedGem(190, 107, 5.2, 9.6, palette, -0.8)}
      `;
  }
}

function renderGoldenShard(
  slot: CrownShardSlot,
  uid: string,
  isNewlyAdded: boolean,
  delayMs: number,
): string {
  const palette = SHARD_PALETTES[slot];
  const cls = isNewlyAdded
    ? `sc-shard sc-shard-slot-${slot} is-collected is-newly-added`
    : `sc-shard sc-shard-slot-${slot} is-collected`;
  const styleAttr = isNewlyAdded
    ? ` style="--shard-delay: ${delayMs}ms; --shard-from-x: ${palette.fromX}px; --shard-from-y: ${palette.fromY}px; --shard-from-rot: ${palette.fromRot}deg;"`
    : '';

  return `
    <g class="${cls}" data-shard-slot="${slot}" data-faction="${palette.faction}"${styleAttr}>
      ${renderGoldenShardBody(slot, uid, false)}
    </g>
  `;
}

/**
 * Renders the central Keystone Starlight Diamond seated proudly across the
 * crown's spine (matches the sizzle crown centerpiece).
 */
function renderCentralKeystone(
  collectedCount: number,
  total: number,
  animateIgnite: boolean,
  isHud: boolean,
): string {
  const cx = 120;
  const cy = 108;
  const rx = isHud ? 13 : 12.2;
  const ry = isHud ? 19.5 : 19;
  const isComplete = collectedCount >= total;

  if (!isComplete) {
    const warmOpacity = collectedCount >= 3 ? '0.92' : collectedCount >= 2 ? '0.76' : '0.62';
    const rimW = isHud ? '2.2' : '1.4';
    return `
      <g class="sc-keystone is-dormant" data-keystone-state="dormant">
        <polygon
          points="${cx},${cy - ry - 2.5} ${cx + rx + 2.5},${cy} ${cx},${cy + ry + 2.5} ${cx - rx - 2.5},${cy}"
          fill="#1B273F"
          stroke="#CFA347"
          stroke-width="${rimW}"
          stroke-opacity="${warmOpacity}"
          stroke-linejoin="round"
        />
        <polygon points="${cx},${cy - ry} ${cx + rx},${cy} ${cx},${cy}" fill="#293A5E" />
        <polygon points="${cx},${cy - ry} ${cx},${cy} ${cx - rx},${cy}" fill="#1B273F" />
        <polygon points="${cx - rx},${cy} ${cx},${cy} ${cx},${cy + ry}" fill="#141E32" />
        <polygon points="${cx},${cy} ${cx + rx},${cy} ${cx},${cy + ry}" fill="#101829" />
        <path
          d="M ${cx} ${cy - 9} L ${cx + 2.2} ${cy - 2.2} L ${cx + 7.5} ${cy} L ${cx + 2.2} ${cy + 2.2} L ${cx} ${cy + 9} L ${cx - 2.2} ${cy + 2.2} L ${cx - 7.5} ${cy} L ${cx - 2.2} ${cy - 2.2} Z"
          fill="#E0B556"
          fill-opacity="${collectedCount >= 3 ? '0.65' : collectedCount >= 2 ? '0.48' : '0.36'}"
        />
      </g>
    `;
  }

  return `
    <g class="sc-keystone is-ignited${animateIgnite ? ' is-igniting' : ''}" data-keystone-state="ignited">
      <polygon
        points="${cx},${cy - ry - 2} ${cx + rx + 2},${cy} ${cx},${cy + ry + 2} ${cx - rx - 2},${cy}"
        fill="#A4721C"
        stroke="#FFF7CC"
        stroke-width="${isHud ? '1.3' : '0.9'}"
        stroke-linejoin="round"
      />
      <polygon points="${cx},${cy - ry} ${cx},${cy} ${cx - rx},${cy}" fill="#F27664" />
      <polygon points="${cx},${cy - ry} ${cx + rx},${cy} ${cx},${cy}" fill="#FDD8B8" />
      <polygon points="${cx - rx},${cy} ${cx},${cy} ${cx},${cy + ry}" fill="#DC4F42" />
      <polygon points="${cx},${cy} ${cx + rx},${cy} ${cx},${cy + ry}" fill="#BC3A30" />
      <polyline points="${cx - rx},${cy} ${cx + rx},${cy}" fill="none" stroke="#FFE7D6" stroke-width="0.65" stroke-opacity="0.7" />
      <polyline points="${cx},${cy - ry} ${cx},${cy + ry}" fill="none" stroke="#FFF2E5" stroke-width="0.7" stroke-opacity="0.75" />
      <path
        class="sc-keystone-star"
        d="M ${cx} ${cy - 9} L ${cx + 1.8} ${cy - 1.8} L ${cx + 7.2} ${cy} L ${cx + 1.8} ${cy + 1.8} L ${cx} ${cy + 9} L ${cx - 1.8} ${cy + 1.8} L ${cx - 7.2} ${cy} L ${cx - 1.8} ${cy - 1.8} Z"
        fill="#FFFBF0"
        fill-opacity="0.88"
      />
      <line
        x1="120"
        y1="21"
        x2="120"
        y2="87"
        stroke="#FFFCE4"
        stroke-width="${isHud ? '1.45' : '1.1'}"
        stroke-opacity="0.86"
      />
    </g>
  `;
}

function renderFloatingCrownStars(isCompact = false): string {
  if (isCompact) {
    return `
      <g class="sc-floating-stars" aria-hidden="true">
        <path class="sc-twinkle sc-twinkle-1" d="M 46 10 L 48 14.5 L 52.5 16.5 L 48 18.5 L 46 23 L 44 18.5 L 39.5 16.5 L 44 14.5 Z" fill="#FFF9CE" />
        <path class="sc-twinkle sc-twinkle-2" d="M 194 10 L 196 14.5 L 200.5 16.5 L 196 18.5 L 194 23 L 192 18.5 L 187.5 16.5 L 192 14.5 Z" fill="#FFFFFF" />
        <circle class="sc-twinkle sc-twinkle-3" cx="120" cy="7" r="2.2" fill="#FFF9CE" />
      </g>
    `;
  }
  return `
    <g class="sc-floating-stars" aria-hidden="true">
      <path class="sc-twinkle sc-twinkle-1" d="M 44 14 L 46.4 19.6 L 52 22 L 46.4 24.4 L 44 30 L 41.6 24.4 L 36 22 L 41.6 19.6 Z" fill="#FFF9CE" />
      <path class="sc-twinkle sc-twinkle-2" d="M 196 13 L 198.2 18.2 L 203.4 20.4 L 198.2 22.6 L 196 27.8 L 193.8 22.6 L 188.6 20.4 L 193.8 18.2 Z" fill="#FFFFFF" />
      <path class="sc-twinkle sc-twinkle-3" d="M 88 4 L 89.8 8.2 L 94 10 L 89.8 11.8 L 88 16 L 86.2 11.8 L 82 10 L 86.2 8.2 Z" fill="#FFFFFF" />
      <path class="sc-twinkle sc-twinkle-4" d="M 154 5 L 155.6 8.8 L 159.4 10.4 L 155.6 12 L 154 15.8 L 152.4 12 L 148.6 10.4 L 152.4 8.8 Z" fill="#FCE877" />
      <polygon class="sc-twinkle sc-twinkle-1" points="16,46 19,49 16,52 13,49" fill="#FFF9CE" />
      <polygon class="sc-twinkle sc-twinkle-2" points="224,44 227,47 224,50 221,47" fill="#FFFFFF" />
      <circle class="sc-twinkle sc-twinkle-3" cx="26" cy="24" r="1.8" fill="#FCE877" />
      <circle class="sc-twinkle sc-twinkle-4" cx="212" cy="24" r="1.8" fill="#FFF9CE" />
      <circle class="sc-twinkle sc-twinkle-2" cx="104" cy="14" r="1.4" fill="#FFFFFF" />
      <circle class="sc-twinkle sc-twinkle-1" cx="139" cy="13" r="1.4" fill="#FFF9CE" />
    </g>
  `;
}

export interface BuildCrownSvgParams {
  collectedSlots: Set<CrownShardSlot>;
  addedSlots: Set<CrownShardSlot>;
  total: number;
  variant: 'hud' | 'forge' | 'victory' | 'hero' | 'standings';
  showHalo: boolean;
  showFloatingStars: boolean;
  animateIgnite: boolean;
  bareContrastEdge?: boolean;
}

export function buildStarCrownSvg(params: BuildCrownSvgParams): string {
  const {
    collectedSlots,
    addedSlots,
    total,
    variant,
    showHalo,
    showFloatingStars,
    animateIgnite,
    bareContrastEdge = false,
  } = params;
  const isHud = variant === 'hud';
  const uid = nextSvgUid(isHud ? 'sch' : 'scr');
  const orderedSlots: readonly CrownShardSlot[] = [0, 1, 2, 3];

  const addedDelayBySlot = new Map<CrownShardSlot, number>();
  let addedIdx = 0;
  for (const slot of orderedSlots) {
    if (addedSlots.has(slot)) {
      addedDelayBySlot.set(slot, 220 + addedIdx * 280);
      addedIdx += 1;
    }
  }

  // Render empty carved sockets ONLY for uncollected pieces so collected pieces never show dark bleed.
  const socketsHtml = orderedSlots
    .filter((slot) => !collectedSlots.has(slot))
    .map((slot) => renderEmptySocketSlot(slot, uid, isHud))
    .join('');

  const shardsHtml = orderedSlots
    .filter((slot) => collectedSlots.has(slot))
    .map((slot) => {
      const isNew = addedSlots.has(slot);
      const delayMs = addedDelayBySlot.get(slot) ?? 0;
      return renderGoldenShard(slot, uid, isNew, delayMs);
    })
    .join('');

  // Crisp pure-vector outer silhouette drop lip for the bare floating HUD Crown (legible over snow/fog/grass without a box).
  const contrastEdgeHtml = bareContrastEdge
    ? `
      <g class="sc-bare-backing" aria-hidden="true">
        <polygon
          points="${CROWN_SILHOUETTE_POINTS}"
          transform="translate(0, 2.2)"
          fill="#0B1222"
          fill-opacity="0.58"
          stroke="#0B1222"
          stroke-width="3.6"
          stroke-opacity="0.58"
          stroke-linejoin="round"
        />
        <polygon
          points="${CROWN_SILHOUETTE_POINTS}"
          fill="none"
          stroke="#1B2642"
          stroke-width="2.4"
          stroke-opacity="0.88"
          stroke-linejoin="round"
        />
      </g>
    `
    : '';

  const auraHtml = showHalo
    ? isHud
      ? `<ellipse class="sc-svg-halo" cx="120" cy="86" rx="92" ry="58" fill="url(#${uid}-halo-glow)" />`
      : renderSunbeamAura(uid, variant === 'victory' ? 'victory' : 'hero')
    : '';

  const starsHtml = showFloatingStars ? renderFloatingCrownStars(isHud) : '';

  const sheenOverlayHtml = `
    <g clip-path="url(#${uid}-crown-clip)" class="sc-svg-sheen-layer" aria-hidden="true">
      <rect
        class="sc-svg-sheen-bar"
        x="-110"
        y="0"
        width="96"
        height="170"
        transform="skewX(-22)"
        fill="url(#${uid}-sheen-grad)"
      />
    </g>
  `;

  const viewBox = isHud ? '24 12 192 140' : '0 0 240 160';

  return `
    <svg
      class="sc-crown-svg sc-crown-svg-${esc(variant)}"
      viewBox="${viewBox}"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      ${renderCrownDefs(uid, isHud)}
      ${auraHtml}
      ${starsHtml}
      ${contrastEdgeHtml}
      <g class="sc-sockets-layer">${socketsHtml}</g>
      <g class="sc-shards-layer">${shardsHtml}</g>
      ${renderCentralKeystone(collectedSlots.size, total, animateIgnite, isHud)}
      ${sheenOverlayHtml}
    </svg>
  `.trim();
}

/**
 * Renders an individual floating sculpted golden Star-Crown shard (0..3 or faction ID)
 * for Phase 3 materialization, flight arc, and magnetic socket snap-in.
 */
export function renderCrownShardPiece(
  factionOrSlot: FactionId | CrownShardSlot,
  opts: { cropped?: boolean; showGlow?: boolean; className?: string } = {},
): string {
  const slot =
    typeof factionOrSlot === 'number' ? factionOrSlot : getShardSlotIndex(factionOrSlot);
  const meta = SHARD_PALETTES[slot];
  const { cropped = true, showGlow = true, className = '' } = opts;
  const uid = nextSvgUid(`scf${slot}`);
  const viewBox = cropped ? meta.tightViewBox : '0 0 240 160';
  const { cx, cy } = meta.anchor;

  const glowHtml = showGlow
    ? `<ellipse cx="${cx}" cy="${cy}" rx="34" ry="52" fill="url(#${uid}-halo-glow)" />`
    : '';

  const cls = ['sc-floating-shard-svg', `sc-floating-slot-${slot}`, className]
    .filter(Boolean)
    .map(esc)
    .join(' ');

  return `
    <svg
      class="${cls}"
      viewBox="${viewBox}"
      data-floating-slot="${slot}"
      data-faction="${meta.faction}"
      role="img"
      aria-label="${esc(meta.realmLabel)} Star-Crown Piece"
    >
      ${renderCrownDefs(uid, false)}
      ${glowHtml}
      <g class="sc-floating-shard-body" data-shard-slot="${slot}">
        ${renderGoldenShardBody(slot, uid, true)}
      </g>
    </svg>
  `.trim();
}

/**
 * Geometric golden celestial astrolabe constellation ring (zero blur / WebView-safe)
 * displayed behind the enlarged actual Star-Crown during collection & victory.
 */
export function renderConstellationRingSvg(className = 'sc-constellation-svg'): string {
  const uid = nextSvgUid('scrng');
  return `
    <svg class="${esc(className)}" viewBox="0 0 320 320" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="${uid}-ring-glow" cx="50%" cy="50%" r="50%">
          <stop offset="56%" stop-color="#F5C542" stop-opacity="0" />
          <stop offset="78%" stop-color="#FCE877" stop-opacity="0.14" />
          <stop offset="100%" stop-color="#F5C542" stop-opacity="0" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="160" r="152" fill="url(#${uid}-ring-glow)" />
      <circle cx="160" cy="160" r="138" fill="none" stroke="#F5C542" stroke-opacity="0.48" stroke-width="1.5" />
      <circle cx="160" cy="160" r="126" fill="none" stroke="#FFF6BF" stroke-opacity="0.34" stroke-width="1" stroke-dasharray="3 7" />
      <circle cx="160" cy="160" r="96" fill="none" stroke="#F5C542" stroke-opacity="0.22" stroke-width="1" />
      <polygon points="160,18 164,28 160,34 156,28" fill="#FFF9CE" fill-opacity="0.88" />
      <polygon points="160,302 164,292 160,286 156,292" fill="#FFF9CE" fill-opacity="0.88" />
      <polygon points="18,160 28,156 34,160 28,164" fill="#FFF9CE" fill-opacity="0.88" />
      <polygon points="302,160 292,156 286,160 292,164" fill="#FFF9CE" fill-opacity="0.88" />
      <circle cx="62" cy="62" r="2.6" fill="#FCE877" fill-opacity="0.85" />
      <circle cx="258" cy="62" r="2.6" fill="#FCE877" fill-opacity="0.85" />
      <circle cx="62" cy="258" r="2.6" fill="#FCE877" fill-opacity="0.85" />
      <circle cx="258" cy="258" r="2.6" fill="#FCE877" fill-opacity="0.85" />
      <polyline points="62,62 160,22 258,62" fill="none" stroke="#FCE877" stroke-opacity="0.22" stroke-width="1" />
      <polyline points="62,258 160,298 258,258" fill="none" stroke="#FCE877" stroke-opacity="0.22" stroke-width="1" />
    </svg>
  `.trim();
}

/**
 * Standalone sizzle-matched Star-Crown SVG helper (used by Crown Progress modal
 * and the FLIP hero transition carrier).
 */
export function renderStarCrownStandaloneSvg(
  shards: readonly FactionId[],
  opts: {
    addedShards?: readonly FactionId[];
    total?: number;
    variant?: 'hud' | 'hero' | 'forge' | 'victory' | 'standings';
    showHalo?: boolean;
    showFloatingStars?: boolean;
    animateIgnite?: boolean;
    bareContrastEdge?: boolean;
  } = {},
): string {
  const total = opts.total ?? STAR_CROWN_TOTAL_SHARDS;
  const collectedSlots = toSlotSet(shards);
  const addedSlots = toSlotSet(opts.addedShards);
  for (const s of addedSlots) collectedSlots.add(s);
  const isComplete = collectedSlots.size >= total;

  return buildStarCrownSvg({
    collectedSlots,
    addedSlots,
    total,
    variant: opts.variant ?? 'hero',
    showHalo: opts.showHalo ?? isComplete,
    showFloatingStars: opts.showFloatingStars ?? isComplete,
    animateIgnite: opts.animateIgnite ?? false,
    bareContrastEdge: opts.bareContrastEdge ?? false,
  });
}

export function renderShardPips(
  collectedSlots: Set<CrownShardSlot>,
  addedSlots: Set<CrownShardSlot> = new Set(),
): string {
  const slots: readonly CrownShardSlot[] = [0, 1, 2, 3];
  return `
    <span class="sc-pips" aria-hidden="true">
      ${slots
        .map((slot) => {
          const palette = SHARD_PALETTES[slot];
          const collected = collectedSlots.has(slot);
          const isNew = addedSlots.has(slot);
          const cls = [
            'sc-pip',
            collected ? 'is-collected' : 'is-missing',
            isNew ? 'is-newly-added' : '',
          ]
            .filter(Boolean)
            .join(' ');
          return `<span class="${cls}" data-shard-pip-slot="${slot}" data-faction="${palette.faction}" style="--pip-color: ${palette.pip};"></span>`;
        })
        .join('')}
    </span>
  `;
}

/**
 * Bare floating Top-Center Star-Crown medallion (NO box behind it, NO n/4 beside it).
 * JUST the sizzle-matched Crown floating cleanly at Top-Center of `TopBar`.
 */
export function renderStarCrownHud(
  shards: readonly FactionId[],
  opts: StarCrownHudOptions = {},
): string {
  const total = opts.total ?? STAR_CROWN_TOTAL_SHARDS;
  const collectedSlots = toSlotSet(shards);
  const count = Math.min(total, collectedSlots.size);
  const isComplete = count >= total;
  const pulse = Boolean(opts.pulse);

  const classes = [
    'sc-hud-badge',
    'is-bare',
    isComplete ? 'is-complete' : 'is-in-progress',
    pulse ? 'is-pulse' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const svgHtml = buildStarCrownSvg({
    collectedSlots,
    addedSlots: new Set<CrownShardSlot>(),
    total,
    variant: 'hud',
    showHalo: false,
    showFloatingStars: isComplete,
    animateIgnite: false,
    bareContrastEdge: true,
  });

  return `
    <span class="${classes}" data-crown-count="${count}" data-crown-total="${total}">
      <span class="sc-hud-crown-wrap">
        ${svgHtml}
      </span>
    </span>
  `.trim();
}

/**
 * Dramatic hero Star-Crown Forge showcase (`renderStarCrownForge`) used inside
 * the Alderwick rival-defeat celebration or standalone preview/tests.
 */
export function renderStarCrownForge(opts: StarCrownForgeOptions): string {
  const total = opts.total ?? STAR_CROWN_TOTAL_SHARDS;
  const beforeSlots = toSlotSet(opts.beforeShards);
  const addedSlots = toSlotSet(opts.addedShards);
  const afterSlots = toSlotSet(opts.afterShards);

  for (const s of beforeSlots) afterSlots.add(s);
  for (const s of addedSlots) afterSlots.add(s);

  const count = Math.min(total, afterSlots.size);
  const isComplete = count >= total;
  const hasAdded = addedSlots.size > 0;
  const lastAddedDelay = hasAdded ? 220 + (addedSlots.size - 1) * 280 : 0;

  const caption =
    opts.caption ??
    (isComplete
      ? `${count} / ${total} Star-Crown Pieces United!`
      : `${count} / ${total} Star-Crown ${count === 1 ? 'Piece' : 'Pieces'} Forged`);

  const svgHtml = buildStarCrownSvg({
    collectedSlots: afterSlots,
    addedSlots,
    total,
    variant: 'forge',
    showHalo: true,
    showFloatingStars: isComplete,
    animateIgnite: isComplete && hasAdded,
    bareContrastEdge: false,
  });

  const classes = [
    'sc-forge-showcase',
    hasAdded ? 'has-added-shards' : '',
    isComplete ? 'is-complete' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return `
    <div
      class="${classes}"
      data-crown-forge="true"
      data-crown-before="${beforeSlots.size}"
      data-crown-after="${count}"
      data-crown-added="${addedSlots.size}"
      data-crown-total="${total}"
      style="--forge-snap-delay: ${lastAddedDelay + 520}ms;"
    >
      <div class="sc-forge-stage">
        <div class="sc-forge-impact-ring" aria-hidden="true"></div>
        <div class="sc-forge-sparks" aria-hidden="true">
          <span class="sc-spark sc-spark-1"></span>
          <span class="sc-spark sc-spark-2"></span>
          <span class="sc-spark sc-spark-3"></span>
          <span class="sc-spark sc-spark-4"></span>
          <span class="sc-spark sc-spark-5"></span>
          <span class="sc-spark sc-spark-6"></span>
        </div>
        <div class="sc-forge-crown-frame">
          ${svgHtml}
        </div>
      </div>
      <div class="sc-forge-footer">
        ${renderShardPips(afterSlots, addedSlots)}
        <span class="sc-forge-caption">${esc(caption)}</span>
      </div>
    </div>
  `;
}

/**
 * Grand radiant completed 4/4 Star-Crown showcase for `GameOverOverlay` Victory.
 */
export function renderStarCrownVictory(opts: StarCrownVictoryOptions): string {
  const total = opts.total ?? STAR_CROWN_TOTAL_SHARDS;
  const addedSlots = opts.isDomination ? toSlotSet(opts.addedShards) : new Set<CrownShardSlot>();
  const collectedSlots = new Set<CrownShardSlot>([0, 1, 2, 3]);

  const reportedAfter = toSlotSet(opts.afterShards);
  const beforeCount = opts.beforeShards
    ? toSlotSet(opts.beforeShards).size
    : Math.max(0, total - addedSlots.size);
  const animateFinalSnap = opts.isDomination && addedSlots.size > 0;
  const lastAddedDelay = animateFinalSnap ? 220 + (addedSlots.size - 1) * 280 : 0;

  const svgHtml = buildStarCrownSvg({
    collectedSlots,
    addedSlots,
    total,
    variant: 'victory',
    showHalo: true,
    showFloatingStars: true,
    animateIgnite: animateFinalSnap,
    bareContrastEdge: false,
  });

  const classes = [
    'sc-victory-showcase',
    'is-complete',
    opts.isDomination ? 'is-domination' : 'is-glory',
    animateFinalSnap ? 'has-added-shards' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const plaqueLabel = opts.isDomination
    ? 'Star-Crown Reforged · 4 / 4'
    : 'Star-Crown Reunited · 4 / 4';

  return `
    <div
      class="${classes}"
      data-crown-victory="true"
      data-victory-mode="${opts.isDomination ? 'domination' : 'glory'}"
      data-crown-before="${beforeCount}"
      data-crown-after="${Math.max(total, reportedAfter.size)}"
      data-crown-total="${total}"
      style="--forge-snap-delay: ${lastAddedDelay + 520}ms;"
    >
      <div class="sc-victory-stage">
        <div class="sc-victory-rays" aria-hidden="true"></div>
        <div class="sc-victory-halo" aria-hidden="true"></div>
        ${animateFinalSnap ? '<div class="sc-forge-impact-ring is-victory" aria-hidden="true"></div>' : ''}
        <div class="sc-victory-crown-frame">
          ${svgHtml}
        </div>
      </div>
      <div class="sc-victory-plaque">
        ${renderShardPips(collectedSlots, addedSlots)}
        <span class="sc-victory-label">${esc(plaqueLabel)}</span>
      </div>
    </div>
  `;
}
