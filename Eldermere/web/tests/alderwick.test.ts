import { describe, expect, it } from 'vitest';
import { ALL_FACTIONS } from '../src/game/data';
import { TUTORIAL_STEPS } from '../src/ui/TutorialController';
import {
  ALDERWICK_ASSETS,
  ALDERWICK_FULL_TITLE,
  ALDERWICK_POSES,
  HUMAN_RIVAL_DEFEAT_CONGRATS,
  RESIGN_CHRONICLE,
  SUPERPOWER_SHOWCASE,
  VICTORY_CHRONICLE,
  getDefeatChronicle,
  getEliminationWhisper,
  getRivalDefeatCongrats,
} from '../src/ui/alderwick';

describe('Alderwick the Star-Keeper — Assets, Tutorial & Endgame Chronicles', () => {
  it('uses relative ./assets/wizard/ paths for all Alderwick artwork', () => {
    expect(ALDERWICK_ASSETS).toEqual({
      hero: './assets/wizard/alderwick-hero.webp',
      portrait: './assets/wizard/alderwick-portrait.webp',
      magic: './assets/wizard/alderwick-magic.webp',
    });
    expect(ALDERWICK_FULL_TITLE).toBe('Alderwick the Star-Keeper');
  });

  it('ships a bundled head-to-toe sprite for every speech-bubble pose', () => {
    expect(Object.keys(ALDERWICK_POSES).sort()).toEqual(['cheer', 'console', 'greet', 'idea', 'point']);
    for (const [pose, path] of Object.entries(ALDERWICK_POSES)) {
      expect(path).toBe(`./assets/wizard/alderwick-full-${pose}.webp`);
    }
  });

  it('covers all 8 scripted tutorial steps and all 4 faction superpowers', () => {
    expect(TUTORIAL_STEPS.map((s) => s.id)).toEqual([
      'stars',
      'upgrade',
      'move',
      'combat',
      'capture',
      'codex',
      'train',
      'end_turn',
    ]);
    // Verify capture step copy matches ActionBar's actual "Claim" button label
    const captureStep = TUTORIAL_STEPS.find((s) => s.id === 'capture');
    expect(captureStep?.body).toMatch(/\bClaim\b/);
    expect(captureStep?.body).not.toMatch(/\bCapture\b/);

    const powerByFaction = Object.fromEntries(
      SUPERPOWER_SHOWCASE.map((entry) => [entry.faction, entry.powerName]),
    );
    expect(powerByFaction).toEqual({
      humans: 'Raise Watchtower',
      orcs: 'Volcanic Cataclysm',
      elves: 'Starlit Eclipse',
      dwarves: 'Awaken Fire Drake',
    });
    const elvesEntry = SUPERPOWER_SHOWCASE.find((e) => e.faction === 'elves');
    expect(elvesEntry?.summary).toMatch(/Starlight/i);
  });

  it('ties Victory, Defeat, Resign, and Elimination Chronicles to the Star-Crown and Elves as Keepers of the Starlight', () => {
    for (const faction of ALL_FACTIONS) {
      const victory = VICTORY_CHRONICLE[faction];
      expect(victory.epilogue).toMatch(/Star-Crown/);
      expect(victory.alderwickQuote.length).toBeGreaterThan(20);

      const rival = ALL_FACTIONS.find((f) => f !== faction)!;
      const defeat = getDefeatChronicle(faction, rival);
      expect(defeat.epilogue).toMatch(/Star-Crown/);
      expect(defeat.alderwickQuote.length).toBeGreaterThan(20);

      const resign = RESIGN_CHRONICLE[faction];
      expect(resign.epilogue).toMatch(/Star-Crown/);
      expect(resign.epilogue).not.toEqual(defeat.epilogue);
      expect(resign.alderwickQuote).not.toEqual(defeat.alderwickQuote);
    }

    expect(VICTORY_CHRONICLE.elves.epilogue).toMatch(/Keepers of the Starlight/);
    expect(RESIGN_CHRONICLE.elves.epilogue).toMatch(/Keepers of the Starlight/);

    const rivalWhisper = getEliminationWhisper('orcs', 'humans', false);
    expect(rivalWhisper).toMatch(/Star-Crown/);
    for (const faction of ALL_FACTIONS) {
      const victor = ALL_FACTIONS.find((f) => f !== faction)!;
      const humanWhisper = getEliminationWhisper(faction, victor, true);
      expect(humanWhisper).toMatch(/Chronicle/);
      expect(humanWhisper).toMatch(/final stronghold/i);
    }
  });

  it('provides lore-grounded Alderwick rival-defeat congrats for all 4 realms', () => {
    const expectedRealms: Record<string, RegExp> = {
      humans: /Valoria & Sunmark/,
      orcs: /Ashfell & Ironspire/,
      elves: /Sylvanvale & Starhaven/,
      dwarves: /Deepforge & Stonehelm/,
    };
    for (const defeated of ALL_FACTIONS) {
      const victor = ALL_FACTIONS.find((f) => f !== defeated)!;
      const copy = getRivalDefeatCongrats(defeated, victor);
      expect(copy).toEqual(HUMAN_RIVAL_DEFEAT_CONGRATS[defeated]);
      expect(copy.kicker).toMatch(expectedRealms[defeated]);
      expect(copy.body).toMatch(expectedRealms[defeated]);
      expect(copy.body).toMatch(/Star-Crown/);
      expect(`${copy.body} ${copy.signoff}`).toMatch(/Chronicle/);
      expect(copy.lead.length).toBeGreaterThan(10);
      expect(copy.signoff.length).toBeGreaterThan(10);
    }
    expect(HUMAN_RIVAL_DEFEAT_CONGRATS.elves.body).toMatch(/Keepers of the Starlight/);
  });
});
