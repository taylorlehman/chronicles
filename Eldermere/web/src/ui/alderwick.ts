import { FACTION_DEFINITIONS } from '../game/data';
import type { FactionId } from '../game/types';

/**
 * Relative asset paths for Alderwick the Star-Keeper.
 * Served from `public/assets/wizard/` on Web and via `WebViewAssetLoader` on Android.
 */
export const ALDERWICK_ASSETS = {
  hero: './assets/wizard/alderwick-hero.webp',
  portrait: './assets/wizard/alderwick-portrait.webp',
  magic: './assets/wizard/alderwick-magic.webp',
} as const;

/**
 * Head-to-toe, transparent-background Alderwick sprites used by the speech-bubble host
 * (tutorial, resignation, victory & defeat). Each faces toward the viewer's right so the
 * speech bubble sits beside him.
 */
export type AlderwickPose = 'greet' | 'point' | 'idea' | 'cheer' | 'console';

export const ALDERWICK_POSES: Record<AlderwickPose, string> = {
  greet: './assets/wizard/alderwick-full-greet.webp',
  point: './assets/wizard/alderwick-full-point.webp',
  idea: './assets/wizard/alderwick-full-idea.webp',
  cheer: './assets/wizard/alderwick-full-cheer.webp',
  console: './assets/wizard/alderwick-full-console.webp',
};

export const ALDERWICK_NAME = 'Alderwick';
export const ALDERWICK_FULL_TITLE = 'Alderwick the Star-Keeper';

export interface SuperpowerShowcaseEntry {
  faction: FactionId;
  realmLabel: string;
  powerName: string;
  summary: string;
}

export const SUPERPOWER_SHOWCASE: readonly SuperpowerShowcaseEntry[] = [
  {
    faction: 'humans',
    realmLabel: 'Humans',
    powerName: 'Raise Watchtower',
    summary: 'Fortifies a 25 HP frontier bastion with Range 2 fire.',
  },
  {
    faction: 'orcs',
    realmLabel: 'Orcs',
    powerName: 'Volcanic Cataclysm',
    summary: 'Unleashes a 3×3 volcanic eruption across revealed land.',
  },
  {
    faction: 'elves',
    realmLabel: 'Elves',
    powerName: 'Starlit Eclipse',
    summary: 'Wields celestial Starlight across the sky (+1 MOV & +1 ATK).',
  },
  {
    faction: 'dwarves',
    realmLabel: 'Dwarves',
    powerName: 'Awaken Fire Drake',
    summary: 'Summons a winged Fire Drake from your mountain peaks.',
  },
];

export interface ChronicleOutcomeCopy {
  epilogue: string;
  alderwickQuote: string;
}

export const VICTORY_CHRONICLE: Record<FactionId, ChronicleOutcomeCopy> = {
  humans: {
    epilogue:
      'The sunlit highways shine from coast to coast once more. Beneath the beacons of Valoria & Sunmark, the shattered shards of the Star-Crown reunite in steadfast order.',
    alderwickQuote:
      'By my star-hat, what a splendid Chronicle! The watch-fires are lit and the roads gleam—now save me a warm scone from Solhaven’s bakery!',
  },
  orcs: {
    epilogue:
      'The war-forges roar in triumph across Eldermere! Ashfell & Ironspire have reforged the Star-Crown in fire and iron, proving that history belongs to the bold.',
    alderwickQuote:
      'Magnificent mayhem, Warlord! You smashed straight to the throne—and only singed half my favorite berry bushes along the way!',
  },
  elves: {
    epilogue:
      'The Keepers of the Starlight have answered the First Dawn’s call. Radiant celestial Starlight pours anew through the Ancient Woods as Sylvanvale & Starhaven reclaim the Star-Crown.',
    alderwickQuote:
      'Luminous beyond measure, Keeper! Watching Eldermere’s Starlight crown the canopy again brings a twinkle even to these ancient eyes.',
  },
  dwarves: {
    epilogue:
      'From gleaming Starsteel veins to snow-capped peaks, Deepforge & Stonehelm have set the reforged Star-Crown upon stone that will never crumble.',
    alderwickQuote:
      'Sturdy as Starsteel, Commander! That foundation could outlast three First Dawns—truly a Chronicle worthy of the mountain halls!',
  },
};

const DEFEAT_QUOTES: Record<FactionId, string> = {
  humans:
    'Chin up, Commander! Even the grandest highways suffer a bump or two. Straighten your banner—the tabletop is warm and a brand-new Chronicle awaits!',
  orcs:
    'Tough scrap, Warlord—they caught you before the war-forges hit full roar! Sharpen those axes and march back to the table; round two is calling.',
  elves:
    'A passing shadow, Keeper, never the end of the Starlight. Rest beneath the boughs and return—Eldermere still needs your keen aim.',
  dwarves:
    'Even mountain granite cracks before it is tempered, Commander! Re-light the forge, steady your shield-wall, and carve an unbreakable Chronicle next game.',
};

export function getDefeatChronicle(
  humanFaction: FactionId,
  winnerFaction: FactionId | null,
): ChronicleOutcomeCopy {
  const humanDef = FACTION_DEFINITIONS[humanFaction];
  const winnerDef = winnerFaction ? FACTION_DEFINITIONS[winnerFaction] : null;
  const epilogue = winnerDef
    ? `The shards of the Star-Crown slip from ${humanDef.name}’s grasp as ${winnerDef.name} of ${winnerDef.realm} claim Eldermere’s throne—yet the Fog of Forgetting never holds the last word.`
    : `The echoes of the Star-Crown drift back into the Fog of Forgetting as this Chronicle of ${humanDef.realm} draws to a close.`;

  return {
    epilogue,
    alderwickQuote: DEFEAT_QUOTES[humanFaction],
  };
}

export const RESIGN_CHRONICLE: Record<FactionId, ChronicleOutcomeCopy> = {
  humans: {
    epilogue:
      'Your banners are lowered along the sunlit roads, and this Chronicle of Valoria & Sunmark closes early while the Star-Crown’s echoes wait in the mist.',
    alderwickQuote:
      'I’ve tucked a golden ribbon right at this page, Commander. Even the stewards of Solhaven pause for a fresh pot of tea—the tabletop will be ready whenever you return!',
  },
  orcs: {
    epilogue:
      'The war-horns fall quiet across Ashfell & Ironspire as this Chronicle closes early, leaving the Star-Crown unclaimed beneath the Fog of Forgetting.',
    alderwickQuote:
      'Calling a tactical breather, Warlord? Not a word to the rivals—I’ll keep the war-drums dry and save your seat until you’re ready to rattle Eldermere again!',
  },
  elves: {
    epilogue:
      'The Keepers of the Starlight step back beneath the emerald canopy, closing this Chronicle early while the Star-Crown’s shards slumber in the mist.',
    alderwickQuote:
      'Even ancient Starlight rests between dawns, Keeper. I’ve pressed a golden leaf into this Chronicle—return to the table whenever the woods call you back!',
  },
  dwarves: {
    epilogue:
      'The hammers rest in the halls of Deepforge & Stonehelm as this Chronicle closes early, leaving the Star-Crown’s echoes waiting beyond the peaks.',
    alderwickQuote:
      'Wise craft knows when to bank the forge and start with fresh stone, Commander. Your page is bookmarked—the mountains will be right here when you return!',
  },
};

export interface RivalDefeatCongratsCopy {
  kicker: string;
  lead: string;
  body: string;
  signoff: string;
}

export const HUMAN_RIVAL_DEFEAT_CONGRATS: Record<FactionId, RivalDefeatCongratsCopy> = {
  humans: {
    kicker: 'Valoria & Sunmark Fall',
    lead: 'Splendid triumph, Commander!',
    body: 'The sunlit highways and beacons of Valoria & Sunmark bow to your banner—take the Humans’ piece of the Star-Crown for your Chronicle!',
    signoff: 'One fewer rival stands between you and the reforged Star-Crown!',
  },
  orcs: {
    kicker: 'Ashfell & Ironspire Fall',
    lead: 'Huzzah, Commander!',
    body: 'You’ve quieted the roaring war-forges of Ashfell & Ironspire—here is the Orcs’ piece of the Star-Crown for your Chronicle, and my beard wasn’t even singed!',
    signoff: 'A roaring new piece is forged into your Star-Crown!',
  },
  elves: {
    kicker: 'Sylvanvale & Starhaven Fall',
    lead: 'Marvelous command, Commander!',
    body: 'Even the Keepers of the Starlight in Sylvanvale & Starhaven yield to your march—claim the Elves’ piece of the Star-Crown as it illuminates your Chronicle!',
    signoff: 'Celestial Starlight joins your rising Star-Crown!',
  },
  dwarves: {
    kicker: 'Deepforge & Stonehelm Fall',
    lead: 'By my star-hat, what a feat!',
    body: 'You’ve claimed the mighty mountain halls of Deepforge & Stonehelm—not even Starsteel walls could halt you! Take the Dwarves’ piece of the Star-Crown for your Chronicle!',
    signoff: 'Onward to complete the Star-Crown, Commander!',
  },
};

export interface RivalDefeatShardsProgress {
  afterCount: number;
  addedCount?: number;
  total?: number;
}

export function getRivalDefeatCongrats(
  defeatedFaction: FactionId,
  _victorFaction?: FactionId,
  shardsProgress?: RivalDefeatShardsProgress,
): RivalDefeatCongratsCopy {
  const base = HUMAN_RIVAL_DEFEAT_CONGRATS[defeatedFaction];
  if (!shardsProgress) {
    return base;
  }
  const total = shardsProgress.total ?? 4;
  const count = Math.max(1, Math.min(total, shardsProgress.afterCount));
  const remaining = Math.max(0, total - count);
  const added = shardsProgress.addedCount ?? 1;

  let signoff: string;
  if (remaining === 0) {
    signoff = `${count} of ${total} pieces reforged—the Star-Crown shines whole at last!`;
  } else if (remaining === 1) {
    signoff =
      added > 1
        ? `${count} of ${total} pieces reforged—you claimed ${added} pieces at once, and only one rival remains!`
        : `${count} of ${total} pieces reforged—only one rival remains!`;
  } else if (added > 1) {
    signoff = `${count} of ${total} pieces reforged—${added} pieces snapped into place!`;
  } else {
    signoff = `${count} of ${total} pieces reforged—${remaining} rival pieces remain to complete the Crown!`;
  }

  return {
    ...base,
    signoff,
  };
}

export function getEliminationWhisper(
  defeatedFaction: FactionId,
  victorFaction: FactionId,
  isHumanDefeated: boolean,
): string {
  const defeatedDef = FACTION_DEFINITIONS[defeatedFaction];
  const victorDef = FACTION_DEFINITIONS[victorFaction];
  if (isHumanDefeated) {
    return `Your final stronghold has fallen to ${victorDef.name}, Commander—come, let us seal this chapter of the Chronicle.`;
  }
  return `${defeatedDef.name}’s echo of the Star-Crown now passes to ${victorDef.name}. One fewer banner on the tabletop—stay sharp, Commander!`;
}
