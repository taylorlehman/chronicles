import { beforeEach, describe, expect, it } from 'vitest';
import { createGame, createTutorialGame } from '../src/game';
import { TUTORIAL_STEPS } from '../src/ui/TutorialController';
import {
  SAVED_CAMPAIGN_KEY,
  clearSavedCampaign,
  getSavedCampaignSummary,
  isTutorialCompleted,
  isValidDifficulty,
  loadSavedCampaign,
  markTutorialCompleted,
  saveCampaign,
} from '../src/ui/persistence';

function installMemoryLocalStorage(): void {
  const store = new Map<string, string>();
  const mockStorage: Storage = {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null;
    },
    removeItem(key: string) {
      store.delete(key);
    },
    setItem(key: string, value: string) {
      store.set(key, String(value));
    },
  };
  (globalThis as unknown as { window: { localStorage: Storage } }).window = {
    localStorage: mockStorage,
  };
}

describe('Campaign Persistence & Guided Tutorial', () => {
  beforeEach(() => {
    installMemoryLocalStorage();
  });

  it('saves, summarizes, loads, and clears an active tutorial campaign with scenario coords', () => {
    const { state, scenario } = createTutorialGame({
      humanFaction: 'elves',
      difficulty: 'normal',
      mapSize: 16,
      maxTurns: 0,
    });
    const human = state.players.find((p) => p.isHuman)!;

    expect(loadSavedCampaign()).toBeNull();
    expect(saveCampaign(state, human.id, 'upgrade', scenario)).toBe(true);

    const summary = getSavedCampaignSummary();
    expect(summary).not.toBeNull();
    expect(summary?.faction).toBe('elves');
    expect(summary?.turn).toBe(1);
    expect(summary?.citiesCount).toBe(1);

    const loaded = loadSavedCampaign();
    expect(loaded).not.toBeNull();
    expect(loaded?.humanPlayerId).toBe(human.id);
    expect(loaded?.tutorialStage).toBe('upgrade');
    expect(loaded?.tutorialScenario).toEqual(scenario);
    expect(loaded?.state.tiles.length).toBe(256);

    clearSavedCampaign();
    expect(loadSavedCampaign()).toBeNull();
  });

  it('clears saved campaign instead of saving finished games', () => {
    const state = createGame({
      humanFaction: 'humans',
      difficulty: 'normal',
      mapSize: 16,
      maxTurns: 0,
      seed: 1337,
    });
    const human = state.players.find((p) => p.isHuman)!;
    expect(saveCampaign(state, human.id, 'move', null)).toBe(true);

    state.phase = 'game_over';
    expect(saveCampaign(state, human.id, null, null)).toBe(false);
    expect(loadSavedCampaign()).toBeNull();
  });

  it('tracks first-time tutorial completion, sequences all 9 scripted tutorial steps, and persists crown & train stages', () => {
    expect(isTutorialCompleted()).toBe(false);
    markTutorialCompleted();
    expect(isTutorialCompleted()).toBe(true);

    const ids = TUTORIAL_STEPS.map((s) => s.id);
    expect(ids).toEqual([
      'crown',
      'stars',
      'upgrade',
      'move',
      'combat',
      'capture',
      'codex',
      'train',
      'end_turn',
    ]);

    const { state, scenario } = createTutorialGame({
      humanFaction: 'humans',
      difficulty: 'normal',
      mapSize: 16,
      maxTurns: 0,
    });
    const human = state.players.find((p) => p.isHuman)!;
    expect(saveCampaign(state, human.id, 'crown', scenario)).toBe(true);
    expect(loadSavedCampaign()?.tutorialStage).toBe('crown');
    expect(saveCampaign(state, human.id, 'train', scenario)).toBe(true);
    expect(loadSavedCampaign()?.tutorialStage).toBe('train');
  });

  it('validates and preserves easy, normal, and hard difficulties across save/load and normalizes invalid values', () => {
    expect(isValidDifficulty('easy')).toBe(true);
    expect(isValidDifficulty('normal')).toBe(true);
    expect(isValidDifficulty('hard')).toBe(true);
    expect(isValidDifficulty('squire')).toBe(false);
    expect(isValidDifficulty('captain')).toBe(false);

    for (const difficulty of ['easy', 'normal', 'hard'] as const) {
      const state = createGame({
        humanFaction: 'humans',
        difficulty,
        mapSize: 16,
        maxTurns: 0,
        seed: 999,
      });
      const human = state.players.find((p) => p.isHuman)!;
      expect(saveCampaign(state, human.id, null, null)).toBe(true);
      expect(loadSavedCampaign()?.state.config.difficulty).toBe(difficulty);
      expect(getSavedCampaignSummary()?.difficulty).toBe(difficulty);
    }

    // Corrupt/unknown difficulty string in localStorage normalizes safely to 'normal'
    const raw = JSON.parse(window.localStorage.getItem(SAVED_CAMPAIGN_KEY)!);
    raw.state.config.difficulty = 'impossible';
    window.localStorage.setItem(SAVED_CAMPAIGN_KEY, JSON.stringify(raw));

    expect(loadSavedCampaign()?.state.config.difficulty).toBe('normal');
    expect(getSavedCampaignSummary()?.difficulty).toBe('normal');
  });
});
