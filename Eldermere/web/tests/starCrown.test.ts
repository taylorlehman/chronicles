import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ALL_FACTIONS,
  applyAction,
  createGame,
  createTutorialGame,
  getPlayer,
  getPlayerCities,
  getTile,
  type FactionId,
  type GameState,
  type PlayerId,
} from '../src/game';
import { ActionBar } from '../src/ui/ActionBar';
import { DefeatNoticeModal } from '../src/ui/DefeatNoticeModal';
import { GameOverOverlay } from '../src/ui/Screens';
import {
  STAR_CROWN_TOTAL_SHARDS,
  renderStarCrownForge,
  renderStarCrownHud,
  renderStarCrownVictory,
} from '../src/ui/StarCrown';
import { TopBar } from '../src/ui/TopBar';
import { TUTORIAL_STEPS, TutorialController } from '../src/ui/TutorialController';
import { getRivalDefeatCongrats } from '../src/ui/alderwick';
import { SAVED_CAMPAIGN_KEY, loadSavedCampaign, saveCampaign } from '../src/ui/persistence';

class MockElement {
  public className = '';
  public innerHTML = '';
  public dataset: Record<string, string> = {};
  public style = {
    setProperty: vi.fn(),
  };
  public children: MockElement[] = [];
  public attributes = new Map<string, string>();
  public listeners = new Map<string, Array<(e: unknown) => void>>();
  public focused = false;
  public offsetWidth = 100;

  public classList = {
    add: (...names: string[]) => {
      const set = new Set(this.className.split(/\s+/).filter(Boolean));
      for (const n of names) set.add(n);
      this.className = Array.from(set).join(' ');
    },
    remove: (...names: string[]) => {
      const set = new Set(this.className.split(/\s+/).filter(Boolean));
      for (const n of names) set.delete(n);
      this.className = Array.from(set).join(' ');
    },
    toggle: (name: string, force?: boolean) => {
      const has = this.className.split(/\s+/).includes(name);
      const next = force ?? !has;
      if (next) this.classList.add(name);
      else this.classList.remove(name);
      return next;
    },
    contains: (name: string) => this.className.split(/\s+/).includes(name),
  };

  public setAttribute(k: string, v: string): void {
    this.attributes.set(k, v);
  }
  public removeAttribute(k: string): void {
    this.attributes.delete(k);
  }
  public appendChild(child: MockElement): MockElement {
    this.children.push(child);
    return child;
  }
  public remove(): void {
    // no-op
  }
  public addEventListener(type: string, fn: (e: unknown) => void): void {
    if (!this.listeners.has(type)) this.listeners.set(type, []);
    this.listeners.get(type)!.push(fn);
  }
  public removeEventListener(type: string, fn: (e: unknown) => void): void {
    const arr = this.listeners.get(type);
    if (!arr) return;
    const idx = arr.indexOf(fn);
    if (idx >= 0) arr.splice(idx, 1);
  }
  public dispatch(type: string, event: Record<string, unknown> = {}): void {
    for (const fn of this.listeners.get(type) ?? []) {
      fn(event);
    }
  }
  public querySelector(selector: string): MockElement | null {
    if (selector === '.sc-hud-badge' && this.innerHTML.includes('sc-hud-badge')) {
      return this;
    }
    if (selector === '[data-alderwick-host]' && this.innerHTML.includes('data-alderwick-host')) {
      const host = new MockElement();
      this.children.push(host);
      return host;
    }
    return null;
  }
  public querySelectorAll(): MockElement[] {
    return [];
  }
  public getBoundingClientRect() {
    return { top: 0, bottom: 80, left: 0, right: 200, width: 200, height: 80 };
  }
  public focus(): void {
    this.focused = true;
  }
}

function installMockDom() {
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

  const docEl = new MockElement();
  const winListeners = new Map<string, Set<(e: unknown) => void>>();
  const mockWindow = {
    localStorage: mockStorage,
    innerHeight: 800,
    innerWidth: 1280,
    setTimeout: globalThis.setTimeout.bind(globalThis),
    clearTimeout: globalThis.clearTimeout.bind(globalThis),
    requestAnimationFrame: (cb: FrameRequestCallback) =>
      globalThis.setTimeout(() => cb(Date.now()), 0) as unknown as number,
    cancelAnimationFrame: (id: number) => globalThis.clearTimeout(id),
    addEventListener: (type: string, fn: (e: unknown) => void) => {
      if (!winListeners.has(type)) winListeners.set(type, new Set());
      winListeners.get(type)!.add(fn);
    },
    removeEventListener: (type: string, fn: (e: unknown) => void) => {
      winListeners.get(type)?.delete(fn);
    },
    dispatchEvent: vi.fn(),
  };

  const mockDocument = {
    documentElement: docEl,
    createElement: () => new MockElement(),
    querySelector: () => null,
  };

  (globalThis as unknown as { window: typeof mockWindow }).window = mockWindow;
  (globalThis as unknown as { document: typeof mockDocument }).document = mockDocument;
  return { mockWindow, mockDocument, docEl };
}

function clearUnits(state: GameState): void {
  for (const tile of state.tiles) tile.unitId = null;
  state.units = {};
}

function placeCaptureReadyWarrior(
  state: GameState,
  ownerId: PlayerId,
  x: number,
  y: number,
  id: string,
): void {
  state.units[id] = {
    id,
    type: 'warrior',
    ownerId,
    homeCityId: null,
    x,
    y,
    hp: 10,
    maxHp: 10,
    kills: 0,
    isVeteran: false,
    canPromote: false,
    hasMoved: false,
    hasAttacked: false,
    canEscapeMove: false,
    canPersistAttack: false,
    actedThisTurn: false,
    canCapture: true,
    canExploreRuins: false,
  };
  getTile(state, x, y)!.unitId = id;
}

describe('Star-Crown Progression, HUD Integration, Tutorial & Celebrations', () => {
  let prevWindow: unknown;
  let prevDocument: unknown;

  beforeEach(() => {
    prevWindow = (globalThis as unknown as { window?: unknown }).window;
    prevDocument = (globalThis as unknown as { document?: unknown }).document;
    installMockDom();
  });

  afterEach(() => {
    (globalThis as unknown as { window?: unknown }).window = prevWindow;
    (globalThis as unknown as { document?: unknown }).document = prevDocument;
    vi.restoreAllMocks();
  });

  describe('1. Shard Initialization (1/4) & Persistence Migration', () => {
    it.each<FactionId>(ALL_FACTIONS)(
      'initializes every player with their own 1/4 Star-Crown shard in createGame and createTutorialGame (%s)',
      (humanFaction) => {
        const standard = createGame({
          humanFaction,
          difficulty: 'normal',
          mapSize: 16,
          maxTurns: 0,
          seed: 42,
        });
        for (const player of standard.players) {
          expect(player.crownShards).toEqual([player.faction]);
        }

        const tutorial = createTutorialGame({
          humanFaction,
          difficulty: 'easy',
          mapSize: 16,
          maxTurns: 0,
        }).state;
        for (const player of tutorial.players) {
          expect(player.crownShards).toEqual([player.faction]);
        }
      },
    );

    it('migrates legacy saved campaigns missing crownShards safely on load', () => {
      const state = createGame({
        humanFaction: 'humans',
        difficulty: 'normal',
        mapSize: 16,
        maxTurns: 0,
        seed: 77,
      });
      const human = state.players.find((p) => p.isHuman)!;
      expect(saveCampaign(state, human.id, 'crown', null)).toBe(true);

      // Simulate an older saved campaign JSON without crownShards
      const raw = JSON.parse(window.localStorage.getItem(SAVED_CAMPAIGN_KEY)!);
      for (const p of raw.state.players) {
        delete p.crownShards;
      }
      raw.state.players[1].alive = false;
      window.localStorage.setItem(SAVED_CAMPAIGN_KEY, JSON.stringify(raw));

      const loaded = loadSavedCampaign();
      expect(loaded).not.toBeNull();
      expect(loaded!.tutorialStage).toBe('crown');
      expect(loaded!.state.players[0].crownShards).toEqual(['humans']);
      expect(loaded!.state.players[1].crownShards).toEqual([]);
      expect(loaded!.state.players[2].crownShards).toEqual([loaded!.state.players[2].faction]);
    });
  });

  describe('2. Shard Transfer on Rival Defeat (Single & Multi-Shard -> Always Reaches 4/4)', () => {
    it('transfers single shards and multi-shards when an AI eliminated another AI first, reaching 4/4 on Domination Victory', () => {
      let state = createGame({
        humanFaction: 'humans',
        difficulty: 'normal',
        mapSize: 16,
        maxTurns: 0,
        seed: 101,
      });
      clearUnits(state);

      const human = state.players.find((p) => p.faction === 'humans')!;
      const orcs = state.players.find((p) => p.faction === 'orcs')!;
      const elves = state.players.find((p) => p.faction === 'elves')!;
      const dwarves = state.players.find((p) => p.faction === 'dwarves')!;

      const orcCap = getPlayerCities(state, orcs.id)[0];
      const dwarfCap = getPlayerCities(state, dwarves.id)[0];
      const elfCap = getPlayerCities(state, elves.id)[0];

      // 1) Human eliminates Orcs -> 1 -> 2 shards (['humans', 'orcs'])
      placeCaptureReadyWarrior(state, human.id, orcCap.x, orcCap.y, 'u_human_vs_orc');
      const r1 = applyAction(state, { type: 'CAPTURE_CITY', unitId: 'u_human_vs_orc' });
      state = r1.state;
      const e1 = r1.events.find((e) => e.type === 'PLAYER_ELIMINATED');
      expect(e1).toEqual({
        type: 'PLAYER_ELIMINATED',
        playerId: orcs.id,
        eliminatedByPlayerId: human.id,
        shardsAwarded: ['orcs'],
        killerShardsBefore: ['humans'],
        killerShardsAfter: ['humans', 'orcs'],
      });
      expect(getPlayer(state, human.id)!.crownShards).toEqual(['humans', 'orcs']);
      expect(getPlayer(state, orcs.id)!.crownShards).toEqual([]);
      expect(state.phase).toBe('playing');

      // 2) Advance to Elves' turn and let Elves eliminate Dwarves -> Elves now hold 2 shards (['elves', 'dwarves'])
      while (state.players[state.activePlayerIndex].id !== elves.id) {
        state = applyAction(state, { type: 'END_TURN' }).state;
      }
      placeCaptureReadyWarrior(state, elves.id, dwarfCap.x, dwarfCap.y, 'u_elf_vs_dwarf');
      const r2 = applyAction(state, { type: 'CAPTURE_CITY', unitId: 'u_elf_vs_dwarf' });
      state = r2.state;
      const e2 = r2.events.find((e) => e.type === 'PLAYER_ELIMINATED');
      expect(e2).toEqual({
        type: 'PLAYER_ELIMINATED',
        playerId: dwarves.id,
        eliminatedByPlayerId: elves.id,
        shardsAwarded: ['dwarves'],
        killerShardsBefore: ['elves'],
        killerShardsAfter: ['elves', 'dwarves'],
      });
      expect(getPlayer(state, elves.id)!.crownShards).toEqual(['elves', 'dwarves']);
      expect(getPlayer(state, dwarves.id)!.crownShards).toEqual([]);
      expect(state.phase).toBe('playing');

      // 3) Advance back to Human's turn; Human captures Elves' two cities (dwarfCap & elfCap)
      while (state.players[state.activePlayerIndex].id !== human.id) {
        state = applyAction(state, { type: 'END_TURN' }).state;
      }
      clearUnits(state);
      placeCaptureReadyWarrior(state, human.id, dwarfCap.x, dwarfCap.y, 'u_human_cap_1');
      placeCaptureReadyWarrior(state, human.id, elfCap.x, elfCap.y, 'u_human_cap_2');

      state = applyAction(state, { type: 'CAPTURE_CITY', unitId: 'u_human_cap_1' }).state;
      expect(state.phase).toBe('playing');

      const r3 = applyAction(state, { type: 'CAPTURE_CITY', unitId: 'u_human_cap_2' });
      state = r3.state;
      const e3 = r3.events.find((e) => e.type === 'PLAYER_ELIMINATED');
      expect(e3).toEqual({
        type: 'PLAYER_ELIMINATED',
        playerId: elves.id,
        eliminatedByPlayerId: human.id,
        shardsAwarded: ['elves', 'dwarves'],
        killerShardsBefore: ['humans', 'orcs'],
        killerShardsAfter: ['humans', 'orcs', 'elves', 'dwarves'],
      });
      expect(state.phase).toBe('game_over');
      expect(state.winnerId).toBe(human.id);
      expect(state.winReason).toBe('domination');
      expect(getPlayer(state, human.id)!.crownShards).toHaveLength(STAR_CROWN_TOTAL_SHARDS);
      expect(new Set(getPlayer(state, human.id)!.crownShards)).toEqual(new Set(ALL_FACTIONS));
    });
  });

  describe('3. Tutorial Step 1 (crown) -> Step 9 (end_turn) & Bottom Age Medallion Complete Modal', () => {
    it('advances intro -> crown (1/9) -> stars (2/9) -> ... -> complete (bottom Age medallion spotlight)', () => {
      const { docEl } = installMockDom();
      const container = new MockElement();
      const onStartTutorial = vi.fn();
      const onCompleteDismiss = vi.fn();
      const tutorial = new TutorialController(container as unknown as HTMLElement, {
        onStartTutorial,
        onCompleteDismiss,
      });

      expect(TUTORIAL_STEPS).toHaveLength(9);
      expect(TUTORIAL_STEPS[0].id).toBe('crown');
      expect(TUTORIAL_STEPS[1].id).toBe('stars');
      expect(TUTORIAL_STEPS[8].id).toBe('end_turn');

      const bannerEl = container.children[1];
      const modalEl = container.children[2];

      tutorial.start('intro');
      expect(tutorial.getStage()).toBe('intro');
      expect(tutorial.isModalOpen()).toBe(true);

      // Dismiss Intro -> Step 1 / 9 ('crown') with top-center Star-Crown spotlight
      tutorial.dismissModal();
      expect(onStartTutorial).toHaveBeenCalledTimes(1);
      expect(tutorial.getStage()).toBe('crown');
      expect(tutorial.getStepIndex()).toBe(0);
      expect(docEl.classList.contains('alderwick-spotlight-crown')).toBe(true);
      expect(docEl.classList.contains('alderwick-spotlight-stars')).toBe(false);
      expect(bannerEl.classList.contains('is-top-aligned')).toBe(true);
      expect(bannerEl.classList.contains('is-crown-aligned')).toBe(true);
      expect(bannerEl.innerHTML).toContain('1 / 9');
      expect(bannerEl.innerHTML).toContain('Star-Crown');
      expect(bannerEl.innerHTML).toContain('1 of 4 pieces');
      expect(bannerEl.innerHTML).toContain('Got It!');
      expect(tutorial.isBlockingEndTurn()).toBe(true);

      // Step 2 / 9 ('stars') clears crown spotlight and enables stars spotlight
      tutorial.setStage('stars');
      expect(tutorial.getStepIndex()).toBe(1);
      expect(docEl.classList.contains('alderwick-spotlight-crown')).toBe(false);
      expect(docEl.classList.contains('alderwick-spotlight-stars')).toBe(true);
      expect(bannerEl.classList.contains('is-stars-aligned')).toBe(true);
      expect(bannerEl.innerHTML).toContain('2 / 9');

      // Step 9 / 9 ('end_turn') stops blocking End Turn
      tutorial.setStage('end_turn');
      expect(tutorial.getStepIndex()).toBe(8);
      expect(tutorial.isBlockingEndTurn()).toBe(false);
      expect(bannerEl.innerHTML).toContain('9 / 9');

      // Complete modal spotlights Bottom-Center Age medallion and references "bottom", not "top"
      tutorial.setContext({ faction: 'humans' });
      tutorial.completeAndCelebrate();
      expect(tutorial.getStage()).toBe('complete');
      expect(docEl.classList.contains('alderwick-spotlight-shard')).toBe(true);
      expect(docEl.classList.contains('alderwick-spotlight-crown')).toBe(false);
      expect(modalEl.innerHTML).toContain('Age medallion');
      expect(modalEl.innerHTML).toContain('at the bottom');
      expect(modalEl.innerHTML).not.toContain('up top');
      expect(modalEl.innerHTML).toContain('Raise Watchtower');

      tutorial.dismissModal();
      expect(onCompleteDismiss).toHaveBeenCalledTimes(1);
      expect(docEl.classList.contains('alderwick-spotlight-shard')).toBe(false);
      tutorial.destroy();
    });
  });

  describe('4. HUD Components (TopBar Crown & Bottom-Center Age Medallion)', () => {
    it('renders Star-Crown badge in TopBar and Age/Superpower medallion in ActionBar', () => {
      const state = createGame({
        humanFaction: 'humans',
        difficulty: 'normal',
        mapSize: 16,
        maxTurns: 0,
        seed: 55,
      });
      const human = state.players.find((p) => p.isHuman)!;

      const topContainer = new MockElement();
      const topBar = new TopBar(topContainer as unknown as HTMLElement, {});
      topBar.update({
        player: human,
        activePlayer: human,
        crownShards: ['humans', 'orcs'],
        isHumanTurn: true,
      });
      const topRoot = topContainer.children[0];
      expect(topRoot.innerHTML).toContain('top-pill-crown');
      expect(topRoot.innerHTML).toContain('data-crown-count="2"');
      expect(topRoot.innerHTML).toContain('data-crown-total="4"');
      expect(topRoot.innerHTML).not.toContain('bottom-age-medallion');

      topBar.pulseCrown();
      expect(topRoot.classList.contains('is-pulse')).toBe(true);
      topBar.destroy();

      const actionContainer = new MockElement();
      const actionBar = new ActionBar(actionContainer as unknown as HTMLElement, {
        onAction: vi.fn(),
      });
      actionBar.update({
        isHumanTurn: true,
        playerFaction: 'humans',
        playerGold: 10,
        hasAffordableTech: true,
        affordableTechCount: 2,
        remainingUnitsCount: 1,
        allUnitsActed: false,
        age: 1,
        techCount: 1,
        canUseSuperpower: false,
        superpowerUsed: false,
        superpowerName: 'Raise Watchtower',
        superpowerTargeting: false,
        selectionLayer: 'unit',
        selectedUnit: null,
        selectedCity: null,
        selectedTile: null,
        combatPreview: null,
      });
      const actionRoot = actionContainer.children[0];
      expect(actionRoot.innerHTML).toContain('bottom-age-medallion');
      expect(actionRoot.innerHTML).toContain('data-age-medallion="true"');
      expect(actionRoot.innerHTML).toContain('AGE I');
      actionBar.destroy();
    });
  });

  describe('5. Animated Rival-Defeat Forge Modal & Completed Victory Crown', () => {
    it('renders animated Star-Crown forge in DefeatNoticeModal and updates progress copy for 2/4 and 3/4', async () => {
      const container = new MockElement();
      const modal = new DefeatNoticeModal(container as unknown as HTMLElement, {});
      const root = container.children[0];

      // 1 -> 2 pieces forged
      const p1 = modal.show('orcs', 'humans', false, true, {
        beforeShards: ['humans'],
        addedShards: ['orcs'],
        afterShards: ['humans', 'orcs'],
      });
      expect(root.innerHTML).toContain('data-crown-forge="true"');
      expect(root.innerHTML).toContain('data-crown-before="1"');
      expect(root.innerHTML).toContain('data-crown-after="2"');
      expect(root.innerHTML).toContain('data-crown-added="1"');
      expect(root.innerHTML).toContain('2 / 4 Forged');
      expect(root.innerHTML).toContain('2 of 4 pieces reforged');
      modal.close();
      await p1;

      // Multi-shard jump 1 -> 3 pieces forged
      const multiCopy = getRivalDefeatCongrats('elves', 'humans', {
        afterCount: 3,
        addedCount: 2,
        total: 4,
      });
      expect(multiCopy.signoff).toContain('3 of 4 pieces reforged');
      expect(multiCopy.signoff).toContain('2 pieces');
      expect(multiCopy.signoff).toContain('only one rival remains');

      const p2 = modal.show('elves', 'humans', false, true, {
        beforeShards: ['humans'],
        addedShards: ['elves', 'dwarves'],
        afterShards: ['humans', 'elves', 'dwarves'],
      });
      expect(root.innerHTML).toContain('data-crown-after="3"');
      expect(root.innerHTML).toContain('data-crown-added="2"');
      expect(root.innerHTML).toContain('3 / 4 Forged');
      modal.close();
      await p2;

      modal.destroy();
    });

    it('renders completed 4/4 Star-Crown on GameOverOverlay for Domination and Glory victories', () => {
      const state = createGame({
        humanFaction: 'humans',
        difficulty: 'normal',
        mapSize: 16,
        maxTurns: 0,
        seed: 88,
      });
      const human = state.players.find((p) => p.isHuman)!;
      human.crownShards = [...ALL_FACTIONS];
      state.phase = 'game_over';
      state.winnerId = human.id;
      state.winReason = 'domination';

      const container = new MockElement();
      const overlay = new GameOverOverlay(container as unknown as HTMLElement, {
        onPlayAgain: vi.fn(),
      });
      const root = container.children[0];

      // Domination Victory animates final 4th shard snapping into place
      overlay.show({
        state,
        humanPlayerId: human.id,
        victoryCrown: {
          beforeShards: ['humans', 'elves', 'dwarves'],
          addedShards: ['orcs'],
          afterShards: ['humans', 'elves', 'dwarves', 'orcs'],
        },
      });
      expect(root.innerHTML).toContain('data-crown-victory="true"');
      expect(root.innerHTML).toContain('data-victory-mode="domination"');
      expect(root.innerHTML).toContain('data-crown-after="4"');
      expect(root.innerHTML).toContain('Star-Crown Reforged');
      expect(root.innerHTML).toContain('is-newly-added');
      expect(root.innerHTML).toContain('data-keystone-state="ignited"');

      // Glory Victory renders gleaming whole 4/4 crown
      const gloryState: GameState = { ...state, winReason: 'glory' };
      overlay.show({
        state: gloryState,
        humanPlayerId: human.id,
      });
      expect(root.innerHTML).toContain('data-crown-victory="true"');
      expect(root.innerHTML).toContain('data-victory-mode="glory"');
      expect(root.innerHTML).toContain('Star-Crown Reunited');
      expect(root.innerHTML).toContain('data-keystone-state="ignited"');
      expect(root.innerHTML).not.toContain('is-newly-added');

      overlay.destroy();
    });

    it('renders StarCrown HUD, Forge, and Victory helpers cleanly for all shard counts', () => {
      const hud1 = renderStarCrownHud(['humans']);
      expect(hud1).toContain('data-crown-count="1"');
      expect(hud1).toContain('data-keystone-state="dormant"');

      const hud4 = renderStarCrownHud(ALL_FACTIONS, { pulse: true });
      expect(hud4).toContain('data-crown-count="4"');
      expect(hud4).toContain('is-complete');
      expect(hud4).toContain('is-pulse');
      expect(hud4).toContain('data-keystone-state="ignited"');

      const forge = renderStarCrownForge({
        beforeShards: ['humans'],
        addedShards: ['dwarves'],
        afterShards: ['humans', 'dwarves'],
      });
      expect(forge).toContain('data-crown-forge="true"');
      expect(forge).toContain('2 / 4 Star-Crown Pieces Forged');

      const victory = renderStarCrownVictory({
        afterShards: ALL_FACTIONS,
        isDomination: true,
        beforeShards: ['humans', 'elves', 'dwarves'],
        addedShards: ['orcs'],
      });
      expect(victory).toContain('data-crown-victory="true"');
    });
  });
});
