import { beforeEach, describe, expect, it } from 'vitest';
import { createGame, createTutorialGame } from '../src/game';
import { TUTORIAL_STEPS } from '../src/ui/TutorialController';
import {
  clearSavedCampaign,
  getSavedCampaignSummary,
  isTutorialCompleted,
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

  it('tracks first-time tutorial completion and sequences all 6 scripted tutorial steps', () => {
    expect(isTutorialCompleted()).toBe(false);
    markTutorialCompleted();
    expect(isTutorialCompleted()).toBe(true);

    const ids = TUTORIAL_STEPS.map((s) => s.id);
    expect(ids).toEqual(['upgrade', 'move', 'combat', 'capture', 'codex', 'end_turn']);
  });
});
