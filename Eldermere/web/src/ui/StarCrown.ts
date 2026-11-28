import '../styles/star-crown.css';
import type { FactionId } from '../game/types';

export type CrownShardSlot = 0 | 1 | 2 | 3;

export const STAR_CROWN_TOTAL_SHARDS = 4;

/**
 * Canonical left-to-right interlocking quadrant order of the 4 realms in the Star-Crown:
 *   0 — Humans (Valoria): Far-Left Wing & Royal Sapphire
 *   1 — Elves (Sylvanvale): Center-Left Star Spire & Celestial Starlight
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

interface ShardGemPalette {
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
}

const SHARD_PALETTES: Record<CrownShardSlot, ShardGemPalette> = {
  0: {
    faction: 'humans',
    realmLabel: 'Valoria',
    hi: '#BFDBFE',
    mid: '#3B82F6',
    deep: '#1D4ED8',
    rim: '#1E3A8A',
    pip: '#60A5FA',
    fromX: -46,
    fromY: -50,
    fromRot: -15,
  },
  1: {
    faction: 'elves',
    realmLabel: 'Sylvanvale',
    hi: '#A7F3D0',
    mid: '#34D399',
    deep: '#0F766E',
    rim: '#115E59',
    pip: '#5EEAD4',
    fromX: -16,
    fromY: -60,
    fromRot: -6,
  },
  2: {
    faction: 'dwarves',
    realmLabel: 'Deepforge',
    hi: '#FEF08A',
    mid: '#F59E0B',
    deep: '#B45309',
    rim: '#78350F',
    pip: '#FBBF24',
    fromX: 16,
    fromY: -60,
    fromRot: 6,
  },
  3: {
    faction: 'orcs',
    realmLabel: 'Ashfell',
    hi: '#FECACA',
    mid: '#EF4444',
    deep: '#B91C1C',
    rim: '#7F1D1D',
    pip: '#F87171',
    fromX: 46,
    fromY: -50,
    fromRot: 15,
  },
};

let svgUidCounter = 0;

function nextSvgUid(): string {
  svgUidCounter += 1;
  return `sc${svgUidCounter}`;
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

function toSlotSet(shards: readonly FactionId[] | undefined): Set<CrownShardSlot> {
  const slots = new Set<CrownShardSlot>();
  if (!shards) return slots;
  for (const faction of shards) {
    slots.add(getShardSlotIndex(faction));
  }
  return slots;
}

/**
 * Renders the reusable SVG <defs> metallic gold gradients & socket bevels using
 * a unique per-instance ID prefix (safe when multiple crowns coexist in the DOM).
 * Zero feGaussianBlur filters — 100% GPU-safe on Android WebView.
 */
function renderCrownDefs(uid: string): string {
  return `
    <defs>
      <linearGradient id="${uid}-gold-bright" x1="12%" y1="0%" x2="88%" y2="100%">
        <stop offset="0%" stop-color="#FFFBE0" />
        <stop offset="32%" stop-color="#FCE072" />
        <stop offset="72%" stop-color="#E5A826" />
        <stop offset="100%" stop-color="#B97510" />
      </linearGradient>
      <linearGradient id="${uid}-gold-mid" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F9D55A" />
        <stop offset="48%" stop-color="#D9961D" />
        <stop offset="100%" stop-color="#8C540B" />
      </linearGradient>
      <linearGradient id="${uid}-gold-shade" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#C68417" />
        <stop offset="55%" stop-color="#965D0E" />
        <stop offset="100%" stop-color="#653B06" />
      </linearGradient>
      <linearGradient id="${uid}-gold-inner" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#A66A12" />
        <stop offset="100%" stop-color="#5C3606" />
      </linearGradient>
      <linearGradient id="${uid}-gold-lip-l" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#8A540B" />
        <stop offset="55%" stop-color="#C78618" />
        <stop offset="100%" stop-color="#F2BC3B" />
      </linearGradient>
      <linearGradient id="${uid}-gold-lip-r" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFF6C4" />
        <stop offset="48%" stop-color="#F4C23F" />
        <stop offset="100%" stop-color="#A86910" />
      </linearGradient>
      <linearGradient id="${uid}-socket-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#131C30" />
        <stop offset="50%" stop-color="#1E2B46" />
        <stop offset="100%" stop-color="#293A5C" />
      </linearGradient>
      <linearGradient id="${uid}-socket-lip" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0E1525" />
        <stop offset="100%" stop-color="#1E2B46" />
      </linearGradient>
      <radialGradient id="${uid}-keystone-lit" cx="42%" cy="34%" r="68%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="32%" stop-color="#FFF2A8" />
        <stop offset="68%" stop-color="#F97316" />
        <stop offset="100%" stop-color="#DC2626" />
      </radialGradient>
      <linearGradient id="${uid}-keystone-dormant" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1B263D" />
        <stop offset="55%" stop-color="#121A2B" />
        <stop offset="100%" stop-color="#0A0F1A" />
      </linearGradient>
      <radialGradient id="${uid}-halo-glow" cx="50%" cy="54%" r="50%">
        <stop offset="0%" stop-color="#FFF5B8" stop-opacity="0.72" />
        <stop offset="42%" stop-color="#F5C542" stop-opacity="0.32" />
        <stop offset="76%" stop-color="#C8871B" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#C8871B" stop-opacity="0" />
      </radialGradient>
    </defs>
  `;
}

/**
 * Renders a crisp 4-facet beveled diamond/lozenge jewel seated in a raised gold bezel,
 * echoing the faceted jewels on the Star-Crown in the opening sizzle video.
 */
function renderFacetedGem(
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
  const bezelPadX = 2.4;
  const bezelPadY = 2.8;

  return `
    <g class="sc-gem">
      <polygon
        points="${tx},${ty - bezelPadY} ${rxp + bezelPadX},${cy} ${bx},${by + bezelPadY} ${lx - bezelPadX},${cy}"
        fill="#784808"
        stroke="#FFF0A6"
        stroke-width="0.9"
        stroke-linejoin="round"
      />
      <polygon points="${tx},${ty} ${cx},${cy} ${lx},${cy}" fill="${palette.hi}" />
      <polygon points="${tx},${ty} ${rxp},${cy} ${cx},${cy}" fill="${palette.mid}" />
      <polygon points="${lx},${cy} ${cx},${cy} ${bx},${by}" fill="${palette.deep}" />
      <polygon points="${cx},${cy} ${rxp},${cy} ${bx},${by}" fill="${palette.rim}" />
      <polygon
        points="${tx},${ty} ${rxp},${cy} ${bx},${by} ${lx},${cy}"
        fill="none"
        stroke="#FFF7CC"
        stroke-width="0.7"
        stroke-opacity="0.75"
      />
      <polygon
        points="${cx - rx * 0.28},${cy - ry * 0.36} ${cx - rx * 0.05},${cy - ry * 0.56} ${cx - rx * 0.02},${cy - ry * 0.24}"
        fill="#FFFFFF"
        fill-opacity="0.85"
      />
    </g>
  `;
}

/**
 * Renders the recessed dark carved socket silhouette for a single slot so missing
 * pieces visibly appear as empty carved crown slots awaiting collection.
 */
function renderSocketSlot(
  slot: CrownShardSlot,
  uid: string,
  isCollected: boolean,
  isHud: boolean,
): string {
  const socketClass = isCollected ? 'sc-socket is-filled' : 'sc-socket is-empty';
  const strokeW = isHud ? '2.1' : '1.5';
  const strokeOp = isHud ? '0.84' : '0.68';
  const strokeCol = isHud ? '#C99E44' : '#A98030';

  switch (slot) {
    case 0:
      return `
        <g class="${socketClass}" data-socket-slot="0">
          <polygon
            points="43,82 56,58 70,76 66,88"
            fill="#0D1424"
            stroke="${strokeCol}"
            stroke-width="1"
            stroke-opacity="0.5"
          />
          <polygon
            points="24,28 66,82 74,95 72,128 46,125 40,88"
            fill="url(#${uid}-socket-bg)"
            stroke="${strokeCol}"
            stroke-width="${strokeW}"
            stroke-opacity="${strokeOp}"
            stroke-linejoin="round"
          />
          <polygon
            points="46,125 72,128 77,140 54,137"
            fill="url(#${uid}-socket-lip)"
            stroke="${strokeCol}"
            stroke-width="1.3"
            stroke-opacity="0.6"
            stroke-linejoin="round"
          />
          <polyline
            points="24,28 46,88 49,125"
            fill="none"
            stroke="#8B6826"
            stroke-width="1"
            stroke-opacity="0.48"
            stroke-dasharray="3 2.5"
          />
          <polygon
            points="54,97 61,108 52,119 46,108"
            fill="#0B1120"
            stroke="${strokeCol}"
            stroke-width="1"
            stroke-opacity="0.62"
          />
        </g>
      `;

    case 1:
      return `
        <g class="${socketClass}" data-socket-slot="1">
          <polygon
            points="80,76 94,58 106,74 102,86 80,86"
            fill="#0D1424"
            stroke="${strokeCol}"
            stroke-width="1"
            stroke-opacity="0.5"
          />
          <polygon
            points="66,82 78,46 96,80 105,56 120,18 120,132 72,128 74,95"
            fill="url(#${uid}-socket-bg)"
            stroke="${strokeCol}"
            stroke-width="${strokeW}"
            stroke-opacity="${strokeOp}"
            stroke-linejoin="round"
          />
          <polygon
            points="72,128 120,132 120,144 77,140"
            fill="url(#${uid}-socket-lip)"
            stroke="${strokeCol}"
            stroke-width="1.3"
            stroke-opacity="0.6"
            stroke-linejoin="round"
          />
          <polyline
            points="78,46 80,84 96,80 105,56"
            fill="none"
            stroke="#8B6826"
            stroke-width="1"
            stroke-opacity="0.48"
            stroke-dasharray="3 2.5"
          />
          <polygon
            points="93,99 100,110 93,121 86,110"
            fill="#0B1120"
            stroke="${strokeCol}"
            stroke-width="1"
            stroke-opacity="0.62"
          />
        </g>
      `;

    case 2:
      return `
        <g class="${socketClass}" data-socket-slot="2">
          <polygon
            points="160,76 146,58 134,74 138,86 160,86"
            fill="#0D1424"
            stroke="${strokeCol}"
            stroke-width="1"
            stroke-opacity="0.5"
          />
          <polygon
            points="174,82 162,46 144,80 135,56 120,18 120,132 168,128 166,95"
            fill="url(#${uid}-socket-bg)"
            stroke="${strokeCol}"
            stroke-width="${strokeW}"
            stroke-opacity="${strokeOp}"
            stroke-linejoin="round"
          />
          <polygon
            points="168,128 120,132 120,144 163,140"
            fill="url(#${uid}-socket-lip)"
            stroke="${strokeCol}"
            stroke-width="1.3"
            stroke-opacity="0.6"
            stroke-linejoin="round"
          />
          <polyline
            points="162,46 160,84 144,80 135,56"
            fill="none"
            stroke="#8B6826"
            stroke-width="1"
            stroke-opacity="0.48"
            stroke-dasharray="3 2.5"
          />
          <polygon
            points="147,99 154,110 147,121 140,110"
            fill="#0B1120"
            stroke="${strokeCol}"
            stroke-width="1"
            stroke-opacity="0.62"
          />
        </g>
      `;

    case 3:
      return `
        <g class="${socketClass}" data-socket-slot="3">
          <polygon
            points="197,82 184,58 170,76 174,88"
            fill="#0D1424"
            stroke="${strokeCol}"
            stroke-width="1"
            stroke-opacity="0.5"
          />
          <polygon
            points="216,28 174,82 166,95 168,128 194,125 200,88"
            fill="url(#${uid}-socket-bg)"
            stroke="${strokeCol}"
            stroke-width="${strokeW}"
            stroke-opacity="${strokeOp}"
            stroke-linejoin="round"
          />
          <polygon
            points="194,125 168,128 163,140 186,137"
            fill="url(#${uid}-socket-lip)"
            stroke="${strokeCol}"
            stroke-width="1.3"
            stroke-opacity="0.6"
            stroke-linejoin="round"
          />
          <polyline
            points="216,28 194,88 191,125"
            fill="none"
            stroke="#8B6826"
            stroke-width="1"
            stroke-opacity="0.48"
            stroke-dasharray="3 2.5"
          />
          <polygon
            points="186,97 194,108 188,119 179,108"
            fill="#0B1120"
            stroke="${strokeCol}"
            stroke-width="1"
            stroke-opacity="0.62"
          />
        </g>
      `;
  }
}

/**
 * Renders one sculpted metallic golden interlocking crown shard matching the
 * exact low-poly faceted Star-Crown geometry from the Eldermere sizzle video.
 */
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

  let body = '';
  switch (slot) {
    case 0:
      body = `
        <!-- Inner hollow back-crown spire peeking through valley -->
        <polygon points="43,82 56,58 70,76 66,88" fill="url(#${uid}-gold-inner)" stroke="#6F4308" stroke-width="0.9" />
        <polygon points="56,58 70,76 60,82" fill="#D5951E" fill-opacity="0.65" />
        <!-- Outer swept left wing spire: bright outer facet + warm inner facet -->
        <polygon points="24,28 46,88 40,88" fill="#FFF9D6" />
        <polygon points="24,28 46,88 66,82" fill="url(#${uid}-gold-bright)" />
        <!-- Main left curved crown band facets -->
        <polygon points="40,88 46,88 49,125 46,125" fill="#FCE27A" />
        <polygon points="46,88 66,82 74,95 72,128 49,125" fill="url(#${uid}-gold-mid)" />
        <!-- Specular facet ridge across left band -->
        <polygon points="46,88 66,82 61,96 48,96" fill="#FFF6C4" fill-opacity="0.52" />
        <!-- Beveled lower foot lip -->
        <polygon points="46,125 72,128 77,140 54,137" fill="url(#${uid}-gold-lip-l)" />
        <polyline points="46,125 72,128" fill="none" stroke="#FFF4B8" stroke-width="1.35" stroke-opacity="0.85" />
        <!-- Sculpted silhouette bevel rim -->
        <polygon
          points="24,28 66,82 74,95 72,128 77,140 54,137 46,125 40,88"
          fill="none"
          stroke="#FFF7CC"
          stroke-width="1.2"
          stroke-opacity="0.84"
          stroke-linejoin="round"
        />
        <polyline points="24,28 46,88 49,125" fill="none" stroke="#FFFBE4" stroke-width="1.25" stroke-opacity="0.88" />
        ${renderFacetedGem(54, 108, 6.6, 10.8, palette, 1)}
      `;
      break;

    case 1:
      body = `
        <!-- Inner hollow back-crown bowl -->
        <polygon points="80,78 94,58 106,74 102,86 80,86" fill="url(#${uid}-gold-inner)" stroke="#6F4308" stroke-width="0.9" />
        <polygon points="94,58 106,74 96,82" fill="#DC9B20" fill-opacity="0.6" />
        <!-- Mid-left secondary faceted spire -->
        <polygon points="66,82 78,46 80,84" fill="url(#${uid}-gold-bright)" />
        <polygon points="78,46 96,80 80,84" fill="url(#${uid}-gold-shade)" />
        <!-- Left half of tall central Star-Spire (spear-shoulder bevel like sizzle video) -->
        <polygon points="105,56 120,18 120,66" fill="url(#${uid}-gold-mid)" />
        <polygon points="96,80 105,56 120,66 120,92" fill="url(#${uid}-gold-shade)" />
        <!-- Center-left sculpted band face -->
        <polygon points="66,82 80,84 96,80 120,92 120,132 72,128 74,95" fill="url(#${uid}-gold-mid)" />
        <polygon points="66,82 80,84 79,128 72,128 74,95" fill="url(#${uid}-gold-bright)" fill-opacity="0.55" />
        <polygon points="96,80 120,92 120,132 97,130" fill="url(#${uid}-gold-shade)" fill-opacity="0.45" />
        <!-- Engraved band top highlight & beveled lower foot -->
        <polygon points="72,128 120,132 120,144 77,140" fill="url(#${uid}-gold-lip-l)" />
        <polyline points="72,128 120,132" fill="none" stroke="#FFF4B8" stroke-width="1.35" stroke-opacity="0.85" />
        <!-- Crisp vertical spire ridge catchlights -->
        <polyline points="78,46 80,84 79,128" fill="none" stroke="#FFF9D6" stroke-width="1.1" stroke-opacity="0.82" />
        <polyline points="105,56 120,66" fill="none" stroke="#FFE999" stroke-width="0.95" stroke-opacity="0.72" />
        <polygon
          points="66,82 78,46 96,80 105,56 120,18 120,144 77,140 72,128 74,95"
          fill="none"
          stroke="#FFF7CC"
          stroke-width="1.15"
          stroke-opacity="0.82"
          stroke-linejoin="round"
        />
        ${renderFacetedGem(93, 110, 6.8, 10.2, palette, 0)}
      `;
      break;

    case 2:
      body = `
        <!-- Inner hollow back-crown bowl -->
        <polygon points="160,78 146,58 134,74 138,86 160,86" fill="url(#${uid}-gold-inner)" stroke="#6F4308" stroke-width="0.9" />
        <polygon points="146,58 134,74 144,82" fill="#E8AC2C" fill-opacity="0.65" />
        <!-- Right half of tall central Star-Spire (bright sunlit gold plane like sizzle video) -->
        <polygon points="120,18 135,56 120,66" fill="url(#${uid}-gold-bright)" />
        <polygon points="120,18 135,56 128,60 120,34" fill="#FFFCE6" fill-opacity="0.58" />
        <polygon points="120,66 135,56 144,80 120,92" fill="url(#${uid}-gold-mid)" />
        <!-- Mid-right secondary faceted spire -->
        <polygon points="162,46 144,80 160,84" fill="url(#${uid}-gold-mid)" />
        <polygon points="174,82 162,46 160,84" fill="url(#${uid}-gold-bright)" />
        <!-- Center-right sculpted band face (sunlit right hemisphere) -->
        <polygon points="120,92 144,80 160,84 174,82 166,95 168,128 120,132" fill="url(#${uid}-gold-bright)" />
        <polygon points="120,92 144,80 143,130 120,132" fill="url(#${uid}-gold-mid)" fill-opacity="0.42" />
        <!-- Bright specular catchlight bevel on right lower foot (iconic detail from sizzle video) -->
        <polygon points="120,132 168,128 163,140 120,144" fill="url(#${uid}-gold-lip-r)" />
        <polygon points="120,132 150,130 147,136 120,138" fill="#FFFCE6" fill-opacity="0.7" />
        <polyline points="120,132 168,128" fill="none" stroke="#FFFBE0" stroke-width="1.45" stroke-opacity="0.92" />
        <!-- Crisp spire ridges -->
        <polyline points="162,46 160,84 161,128" fill="none" stroke="#FFFCE6" stroke-width="1.15" stroke-opacity="0.88" />
        <polyline points="135,56 120,66" fill="none" stroke="#FFFBE0" stroke-width="1" stroke-opacity="0.78" />
        <polygon
          points="174,82 162,46 144,80 135,56 120,18 120,144 163,140 168,128 166,95"
          fill="none"
          stroke="#FFF9D6"
          stroke-width="1.15"
          stroke-opacity="0.85"
          stroke-linejoin="round"
        />
        ${renderFacetedGem(147, 110, 6.8, 10.2, palette, 0)}
      `;
      break;

    case 3:
      body = `
        <!-- Inner hollow back-crown spire peeking through valley -->
        <polygon points="197,82 184,58 170,76 174,88" fill="url(#${uid}-gold-inner)" stroke="#6F4308" stroke-width="0.9" />
        <polygon points="184,58 170,76 180,82" fill="#E3A528" fill-opacity="0.7" />
        <!-- Outer swept right wing spire: gleaming specular outer facet + warm inner facet -->
        <polygon points="216,28 194,88 174,82" fill="url(#${uid}-gold-mid)" />
        <polygon points="216,28 200,88 194,88" fill="#FFFCE6" />
        <!-- Main right curved crown band facets -->
        <polygon points="194,88 200,88 194,125 191,125" fill="#FFF9D6" />
        <polygon points="174,82 194,88 191,125 168,128 166,95" fill="url(#${uid}-gold-bright)" />
        <!-- Specular ridge catchlight -->
        <polygon points="174,82 194,88 192,97 179,96" fill="#FFFCE6" fill-opacity="0.65" />
        <!-- Lower beveled right foot lip -->
        <polygon points="168,128 194,125 186,137 163,140" fill="url(#${uid}-gold-lip-r)" />
        <polyline points="168,128 194,125" fill="none" stroke="#FFFBE0" stroke-width="1.4" stroke-opacity="0.92" />
        <!-- Silhouette bevel rim -->
        <polygon
          points="216,28 174,82 166,95 168,128 163,140 186,137 194,125 200,88"
          fill="none"
          stroke="#FFF9D6"
          stroke-width="1.2"
          stroke-opacity="0.88"
          stroke-linejoin="round"
        />
        <polyline points="216,28 194,88 191,125" fill="none" stroke="#FFFFFF" stroke-width="1.25" stroke-opacity="0.88" />
        ${renderFacetedGem(186, 108, 6.6, 10.8, palette, -1)}
      `;
      break;
  }

  return `
    <g class="${cls}" data-shard-slot="${slot}" data-faction="${palette.faction}"${styleAttr}>
      ${body}
    </g>
  `;
}

/**
 * Renders the central Keystone Starlight Lozenge Jewel seated across the crown's
 * center spine. Dormant/carved while pieces are missing; blazes incandescent gold-ruby
 * with a crisp 4-point star flare once all 4 pieces unite!
 */
function renderCentralKeystone(
  uid: string,
  collectedCount: number,
  total: number,
  animateIgnite: boolean,
): string {
  const isComplete = collectedCount >= total;
  const cx = 120;
  const cy = 110;
  const rx = 10.5;
  const ry = 16;

  if (!isComplete) {
    const warmEdgeOpacity = collectedCount >= 3 ? '0.88' : collectedCount >= 2 ? '0.66' : '0.45';
    return `
      <g class="sc-keystone is-dormant" data-keystone-state="dormant">
        <polygon
          points="${cx},${cy - ry - 3} ${cx + rx + 3},${cy} ${cx},${cy + ry + 3} ${cx - rx - 3},${cy}"
          fill="#151D2F"
          stroke="#A87E2F"
          stroke-width="1.4"
          stroke-opacity="${warmEdgeOpacity}"
          stroke-linejoin="round"
        />
        <polygon
          points="${cx},${cy - ry} ${cx + rx},${cy} ${cx},${cy + ry} ${cx - rx},${cy}"
          fill="url(#${uid}-keystone-dormant)"
          stroke="#6A5124"
          stroke-width="0.9"
          stroke-opacity="0.7"
        />
        <!-- Subtle etched 4-point star awaiting reunification -->
        <path
          d="M ${cx} ${cy - 7} L ${cx + 1.8} ${cy - 1.8} L ${cx + 6} ${cy} L ${cx + 1.8} ${cy + 1.8} L ${cx} ${cy + 7} L ${cx - 1.8} ${cy + 1.8} L ${cx - 6} ${cy} L ${cx - 1.8} ${cy - 1.8} Z"
          fill="#C89B3C"
          fill-opacity="${collectedCount >= 3 ? '0.52' : collectedCount >= 2 ? '0.35' : '0.22'}"
        />
      </g>
    `;
  }

  return `
    <g class="sc-keystone is-ignited${animateIgnite ? ' is-igniting' : ''}" data-keystone-state="ignited">
      <!-- Raised sculpted golden bezel -->
      <polygon
        points="${cx},${cy - ry - 3.5} ${cx + rx + 3.5},${cy} ${cx},${cy + ry + 3.5} ${cx - rx - 3.5},${cy}"
        fill="#8E5609"
        stroke="#FFF7CC"
        stroke-width="1.35"
        stroke-linejoin="round"
      />
      <!-- Radiant faceted keystone jewel (echoes sizzle video's iconic central lozenge gem) -->
      <polygon points="${cx},${cy - ry} ${cx},${cy} ${cx - rx},${cy}" fill="#FFDFB0" />
      <polygon points="${cx},${cy - ry} ${cx + rx},${cy} ${cx},${cy}" fill="url(#${uid}-keystone-lit)" />
      <polygon points="${cx - rx},${cy} ${cx},${cy} ${cx},${cy + ry}" fill="#DC2626" />
      <polygon points="${cx},${cy} ${cx + rx},${cy} ${cx},${cy + ry}" fill="#991B1B" />
      <polygon
        points="${cx},${cy - ry} ${cx + rx},${cy} ${cx},${cy + ry} ${cx - rx},${cy}"
        fill="none"
        stroke="#FFFBE0"
        stroke-width="1.1"
      />
      <!-- Blazing 4-point Starlight core flare -->
      <path
        class="sc-keystone-star"
        d="M ${cx} ${cy - 13} L ${cx + 2.6} ${cy - 2.6} L ${cx + 12} ${cy} L ${cx + 2.6} ${cy + 2.6} L ${cx} ${cy + 13} L ${cx - 2.6} ${cy + 2.6} L ${cx - 12} ${cy} L ${cx - 2.6} ${cy - 2.6} Z"
        fill="#FFFFFF"
        fill-opacity="0.94"
      />
      <!-- Central golden crest seam gleam -->
      <line
        x1="120"
        y1="20"
        x2="120"
        y2="90"
        stroke="#FFFBE0"
        stroke-width="1.6"
        stroke-opacity="0.85"
      />
    </g>
  `;
}

/**
 * Floating twinkling 4-point stars above the complete Star-Crown (homage to the
 * golden star aura in the opening sizzle video).
 */
function renderFloatingCrownStars(): string {
  return `
    <g class="sc-floating-stars" aria-hidden="true">
      <path class="sc-twinkle sc-twinkle-1" d="M 58 18 L 60.2 22.8 L 65 25 L 60.2 27.2 L 58 32 L 55.8 27.2 L 51 25 L 55.8 22.8 Z" fill="#FFF7C2" />
      <path class="sc-twinkle sc-twinkle-2" d="M 182 16 L 184 20.5 L 188.5 22.5 L 184 24.5 L 182 29 L 180 24.5 L 175.5 22.5 L 180 20.5 Z" fill="#FCE072" />
      <path class="sc-twinkle sc-twinkle-3" d="M 96 8 L 97.5 11.5 L 101 13 L 97.5 14.5 L 96 18 L 94.5 14.5 L 91 13 L 94.5 11.5 Z" fill="#FFFFFF" />
      <path class="sc-twinkle sc-twinkle-4" d="M 148 10 L 149.4 13 L 152.4 14.4 L 149.4 15.8 L 148 18.8 L 146.6 15.8 L 143.6 14.4 L 146.6 13 Z" fill="#FFF5B8" />
      <circle class="sc-twinkle sc-twinkle-2" cx="40" cy="14" r="1.9" fill="#FCE072" />
      <circle class="sc-twinkle sc-twinkle-3" cx="200" cy="13" r="1.9" fill="#FFF7CC" />
    </g>
  `;
}

interface BuildCrownSvgParams {
  collectedSlots: Set<CrownShardSlot>;
  addedSlots: Set<CrownShardSlot>;
  total: number;
  variant: 'hud' | 'forge' | 'victory';
  showHalo: boolean;
  showFloatingStars: boolean;
  animateIgnite: boolean;
}

function buildStarCrownSvg(params: BuildCrownSvgParams): string {
  const {
    collectedSlots,
    addedSlots,
    total,
    variant,
    showHalo,
    showFloatingStars,
    animateIgnite,
  } = params;
  const uid = nextSvgUid();
  const orderedSlots: readonly CrownShardSlot[] = [0, 1, 2, 3];

  // Stagger newly added shards cleanly if multiple shards are awarded in a single elimination.
  const addedDelayBySlot = new Map<CrownShardSlot, number>();
  let addedIdx = 0;
  for (const slot of orderedSlots) {
    if (addedSlots.has(slot)) {
      addedDelayBySlot.set(slot, 220 + addedIdx * 280);
      addedIdx += 1;
    }
  }

  const isHud = variant === 'hud';
  const socketsHtml = orderedSlots
    .map((slot) => renderSocketSlot(slot, uid, collectedSlots.has(slot), isHud))
    .join('');

  const shardsHtml = orderedSlots
    .filter((slot) => collectedSlots.has(slot))
    .map((slot) => {
      const isNew = addedSlots.has(slot);
      const delayMs = addedDelayBySlot.get(slot) ?? 0;
      return renderGoldenShard(slot, uid, isNew, delayMs);
    })
    .join('');

  const haloHtml = showHalo
    ? `<ellipse class="sc-svg-halo" cx="120" cy="90" rx="108" ry="70" fill="url(#${uid}-halo-glow)" />`
    : '';

  const starsHtml = showFloatingStars ? renderFloatingCrownStars() : '';

  return `
    <svg
      class="sc-crown-svg sc-crown-svg-${variant}"
      viewBox="0 0 240 160"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      ${renderCrownDefs(uid)}
      ${haloHtml}
      ${starsHtml}
      <g class="sc-sockets-layer">${socketsHtml}</g>
      <g class="sc-shards-layer">${shardsHtml}</g>
      ${renderCentralKeystone(uid, collectedSlots.size, total, animateIgnite)}
    </svg>
  `;
}

function renderShardPips(
  collectedSlots: Set<CrownShardSlot>,
  addedSlots: Set<CrownShardSlot>,
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
 * Compact, tactile skeuomorphic Star-Crown badge for Top-Center of `TopBar`.
 * Designed to sit cleanly inside `.top-pill-crown` on Pixel 9 portrait, Pixel Tablet, and desktop.
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
    showHalo: isComplete,
    showFloatingStars: isComplete,
    animateIgnite: false,
  });

  return `
    <span class="${classes}" data-crown-count="${count}" data-crown-total="${total}">
      <span class="sc-hud-velvet" aria-hidden="true">
        <span class="sc-hud-crown-wrap">
          ${svgHtml}
        </span>
        <span class="sc-hud-sweep" aria-hidden="true"></span>
      </span>
      <span class="sc-hud-counter" aria-hidden="true">
        <span class="sc-hud-count-val">${count}</span><span class="sc-hud-count-sep">/</span><span class="sc-hud-count-total">${total}</span>
      </span>
    </span>
  `;
}

/**
 * Dramatic hero Star-Crown Forge showcase (~200-232px) for Alderwick's
 * rival-defeat congratulation modal. Existing `beforeShards` sit gleaming in gold
 * while `addedShards` descend & snap into their carved sockets with radial golden flash,
 * star sparks, and a metallic sheen sweep.
 */
export function renderStarCrownForge(opts: StarCrownForgeOptions): string {
  const total = opts.total ?? STAR_CROWN_TOTAL_SHARDS;
  const beforeSlots = toSlotSet(opts.beforeShards);
  const addedSlots = toSlotSet(opts.addedShards);
  const afterSlots = toSlotSet(opts.afterShards);

  // Ensure afterSlots includes beforeSlots and addedSlots even if caller passes minimal arrays.
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
        <div class="sc-forge-plaque" aria-hidden="true"></div>
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
          <span class="sc-crown-sweep" aria-hidden="true"></span>
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
 * - Domination Victory (with `addedShards`): animates the final 4th piece snapping
 *   into place, igniting the central Starlight keystone & golden sunburst halo.
 * - Glory Victory: renders the complete united 4/4 Star-Crown gleaming with a regal shimmer.
 */
export function renderStarCrownVictory(opts: StarCrownVictoryOptions): string {
  const total = opts.total ?? STAR_CROWN_TOTAL_SHARDS;
  const addedSlots = opts.isDomination ? toSlotSet(opts.addedShards) : new Set<CrownShardSlot>();
  const collectedSlots = new Set<CrownShardSlot>([0, 1, 2, 3]);

  // Keep DOM metadata faithful to passed afterShards while always displaying the reunited 4/4 Crown on Victory.
  const reportedAfter = toSlotSet(opts.afterShards);
  const beforeCount = opts.beforeShards ? toSlotSet(opts.beforeShards).size : Math.max(0, total - addedSlots.size);
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
    : 'Star-Crown Reunited · Eternal Glory';

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
          <span class="sc-crown-sweep is-victory" aria-hidden="true"></span>
        </div>
      </div>
      <div class="sc-victory-plaque">
        ${renderShardPips(collectedSlots, addedSlots)}
        <span class="sc-victory-label">${esc(plaqueLabel)}</span>
      </div>
    </div>
  `;
}
