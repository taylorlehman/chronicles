import * as THREE from 'three';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { planAITurn } from '../src/ai';
import {
  ALL_FACTIONS,
  applyAction,
  createGame,
  createTutorialGame,
  getActivePlayer,
  getPlayer,
  getPlayerCities,
  getTile,
  type FactionId,
  type GameState,
  type PlayerId,
} from '../src/game';
import { AnimationQueue } from '../src/render/AnimationQueue';
import type { BoardRenderer } from '../src/render/BoardRenderer';
import type { SceneManager } from '../src/render/SceneManager';
import type { WorldBadges } from '../src/render/WorldBadges';
import { AppController } from '../src/ui/AppController';
import { DefeatNoticeModal } from '../src/ui/DefeatNoticeModal';
import { DIFFICULTY_LABELS, formatDifficultyLabel, nextDifficulty } from '../src/ui/Screens';
import { isAndroidApp, shouldAutoStartAndroidTutorial } from '../src/ui/androidBridge';
import {
  clearSavedCampaign,
  loadSavedCampaign,
  markTutorialCompleted,
  saveCampaign,
} from '../src/ui/persistence';

function installMockBrowserEnv(): void {
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

  const listeners = new Map<string, Set<(e: unknown) => void>>();
  const mockWindow = {
    localStorage: mockStorage,
    setTimeout: globalThis.setTimeout.bind(globalThis),
    clearTimeout: globalThis.clearTimeout.bind(globalThis),
    requestAnimationFrame: (cb: FrameRequestCallback) => {
      return globalThis.setTimeout(() => cb(Date.now()), 0) as unknown as number;
    },
    cancelAnimationFrame: (id: number) => globalThis.clearTimeout(id),
    addEventListener: (type: string, fn: (e: unknown) => void) => {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type)!.add(fn);
    },
    removeEventListener: (type: string, fn: (e: unknown) => void) => {
      listeners.get(type)?.delete(fn);
    },
  };
  (globalThis as unknown as { window: typeof mockWindow }).window = mockWindow;
}

class MockElement {
  public className = '';
  public innerHTML = '';
  public children: MockElement[] = [];
  public attributes = new Map<string, string>();
  public listeners = new Map<string, Array<(e: unknown) => void>>();
  public focused = false;

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
  public querySelector(): MockElement | null {
    return null;
  }
  public focus(): void {
    this.focused = true;
  }
}

/**
 * Builds a minimal controller object linked to AppController.prototype so tests execute
 * the real AppController turn-lifecycle, recovery, persistence, and resign methods directly.
 */
function createAppControllerHarness(state: GameState, humanPlayerId: PlayerId) {
  const calls = {
    defeatNotices: [] as Array<{ defeated: FactionId; victor: FactionId; isHuman: boolean }>,
    gameOverShows: [] as Array<{ winnerId: PlayerId | null; phase: string }>,
    returnToTitleCount: 0,
    resignShows: 0,
    topBarHides: 0,
    actionBarHides: 0,
    inputLocks: [] as boolean[],
    animCancels: 0,
    sceneStarts: 0,
    sceneStops: 0,
    boardSyncs: 0,
  };

  const modalStub = () => ({
    isOpen: () => false,
    close: vi.fn(),
    open: vi.fn(),
    update: vi.fn(),
  });

  let defeatOpen = false;
  let defeatIsHuman = false;
  let defeatResolve: (() => void) | null = null;
  const defeatNoticeModal = {
    isOpen: () => defeatOpen,
    isHumanDefeated: () => defeatOpen && defeatIsHuman,
    show: vi.fn((defeated: FactionId, victor: FactionId, isHuman: boolean) => {
      calls.defeatNotices.push({ defeated, victor, isHuman });
      if (harness.autoDismissDefeatModal && !isHuman) {
        return Promise.resolve();
      }
      defeatOpen = true;
      defeatIsHuman = isHuman;
      return new Promise<void>((resolve) => {
        defeatResolve = resolve;
      });
    }),
    close: vi.fn((silent = false) => {
      const wasOpen = defeatOpen;
      const wasHuman = defeatIsHuman;
      defeatOpen = false;
      defeatIsHuman = false;
      const r = defeatResolve;
      defeatResolve = null;
      r?.();
      if (wasOpen && !silent && wasHuman) {
        (harness as unknown as { returnToTitle: () => void }).returnToTitle();
      }
    }),
  };

  const harness = Object.create(AppController.prototype) as Record<string, unknown> & {
    autoDismissDefeatModal: boolean;
    calls: typeof calls;
    state: GameState | null;
    humanPlayerId: PlayerId;
    isBusy: boolean;
    isAITurnRunning: boolean;
    sessionToken: number;
    pendingEndTurnAfterTutorial: boolean;
    tutorialScenario: null;
    selectedCoord: null;
    selectedUnitId: null;
    selectionLayer: 'unit';
    validMoves: unknown[];
    validAttacks: unknown[];
    hoveredCoord: null;
    readyUnitCycleIndex: number;
    isSuperpowerTargeting: boolean;
    superpowerTargets: unknown[];
    defeatNoticeModal: typeof defeatNoticeModal;
    animQueue: {
      playEvents: ReturnType<typeof vi.fn>;
      cancelAll: ReturnType<typeof vi.fn>;
    };
    board: {
      syncState: ReturnType<typeof vi.fn>;
      clearHighlights: ReturnType<typeof vi.fn>;
      setTutorialResourceTargets: ReturnType<typeof vi.fn>;
      setTutorialTileTargets: ReturnType<typeof vi.fn>;
    };
    badges: {
      syncState: ReturnType<typeof vi.fn>;
      setSelectedCoord: ReturnType<typeof vi.fn>;
      setLethalTargets: ReturnType<typeof vi.fn>;
    };
    sceneManager: {
      setEclipseMode: ReturnType<typeof vi.fn>;
      focusOnWorld: ReturnType<typeof vi.fn>;
      start: ReturnType<typeof vi.fn>;
      stop: ReturnType<typeof vi.fn>;
      isRunning: ReturnType<typeof vi.fn>;
    };
    input: {
      setInputLocked: ReturnType<typeof vi.fn>;
    };
  };

  harness.autoDismissDefeatModal = true;
  harness.calls = calls;
  harness.state = state;
  harness.humanPlayerId = humanPlayerId;
  harness.isBusy = false;
  harness.isAITurnRunning = false;
  harness.sessionToken = 1;
  harness.pendingEndTurnAfterTutorial = false;
  harness.tutorialScenario = null;
  harness.selectedCoord = null;
  harness.selectedUnitId = null;
  harness.selectionLayer = 'unit';
  harness.validMoves = [];
  harness.validAttacks = [];
  harness.hoveredCoord = null;
  harness.readyUnitCycleIndex = 0;
  harness.isSuperpowerTargeting = false;
  harness.superpowerTargets = [];
  harness.isTitleDioramaActive = false;
  harness.rewardToastTimer = null;
  harness.rewardToastEl = new MockElement();
  harness.superpowerBannerEl = new MockElement();

  harness.titleScreen = { getSelectedFaction: () => 'humans' };
  harness.ageUpModal = modalStub();
  harness.techModal = modalStub();
  harness.cityRewardModal = modalStub();
  harness.factionDossierModal = modalStub();
  harness.leaderboardModal = modalStub();
  harness.defeatNoticeModal = defeatNoticeModal;
  harness.tutorial = {
    isActive: () => false,
    isModalOpen: () => false,
    isBlockingEndTurn: () => false,
    getStage: () => null,
    hide: vi.fn(),
  };
  harness.topBar = {
    update: vi.fn(),
    hide: vi.fn(() => {
      calls.topBarHides += 1;
    }),
  };
  harness.actionBar = {
    update: vi.fn(),
    hide: vi.fn(() => {
      calls.actionBarHides += 1;
    }),
  };
  harness.gameOverOverlay = {
    show: vi.fn((data: { state: GameState }) => {
      calls.gameOverShows.push({ winnerId: data.state.winnerId, phase: data.state.phase });
    }),
    hide: vi.fn(),
  };
  harness.resignationOverlay = {
    isOpen: () => calls.resignShows > 0,
    show: vi.fn(() => {
      calls.resignShows += 1;
    }),
    hide: vi.fn(),
  };
  harness.sceneManager = {
    setEclipseMode: vi.fn(),
    focusOnWorld: vi.fn(),
    start: vi.fn(() => {
      calls.sceneStarts += 1;
    }),
    stop: vi.fn(() => {
      calls.sceneStops += 1;
    }),
    isRunning: vi.fn(() => true),
  };
  harness.board = {
    syncState: vi.fn(() => {
      calls.boardSyncs += 1;
    }),
    clearHighlights: vi.fn(),
    setTutorialResourceTargets: vi.fn(),
    setTutorialTileTargets: vi.fn(),
  };
  harness.badges = {
    syncState: vi.fn(),
    setSelectedCoord: vi.fn(),
    setLethalTargets: vi.fn(),
  };
  harness.animQueue = {
    playEvents: vi.fn(async () => {}),
    cancelAll: vi.fn(() => {
      calls.animCancels += 1;
    }),
  };
  harness.input = {
    setInputLocked: vi.fn((locked: boolean) => {
      calls.inputLocks.push(locked);
    }),
  };
  harness.returnToTitle = vi.fn(() => {
    calls.returnToTitleCount += 1;
    clearSavedCampaign();
    defeatNoticeModal.close(true);
    harness.state = null;
    harness.isAITurnRunning = false;
    harness.isBusy = false;
  });

  return harness;
}

describe('AI Turn Lifecycle & Anti-Hang Regressions', () => {
  beforeEach(() => {
    installMockBrowserEnv();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('Root Cause 1: stops AI turn loop immediately when human is eliminated while 2+ AIs remain alive', async () => {
    const { state } = createTutorialGame({
      humanFaction: 'humans',
      difficulty: 'normal',
      mapSize: 16,
      maxTurns: 0,
    });
    const human = state.players.find((p) => p.isHuman)!;
    const orcs = state.players.find((p) => p.faction === 'orcs')!;
    const humanCap = getPlayerCities(state, human.id)[0];

    // Clear all units on the board and place an Orc warrior directly on the human's only city
    // so Orcs capture it on Turn 1 AI turn while Elves & Dwarves are still alive (3 AIs alive!).
    for (const tile of state.tiles) tile.unitId = null;
    state.units = {};
    const invaderId = 'unit_orc_invader';
    state.units[invaderId] = {
      id: invaderId,
      type: 'warrior',
      ownerId: orcs.id,
      homeCityId: null,
      x: humanCap.x,
      y: humanCap.y,
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
    getTile(state, humanCap.x, humanCap.y)!.unitId = invaderId;

    const harness = createAppControllerHarness(state, human.id);
    // Run the real AppController end-turn + AI loop
    await (harness as unknown as { runAITurnSequence: (b: boolean) => Promise<void> }).runAITurnSequence(true);

    // Must NOT loop 12 zombie turns; must immediately stop AI loop and show Alderwick's defeat notice!
    expect(harness.isAITurnRunning).toBe(false);
    expect(harness.state!.phase).toBe('game_over');
    expect(harness.state!.winnerId).toBe(orcs.id);
    expect(getPlayer(harness.state!, human.id)!.alive).toBe(false);
    // Still on Turn 1 (never cycled through multiple zombie rounds)
    expect(harness.state!.turn).toBe(1);
    // Defeat notice was shown (wizard's defeated message), NO duplicate GameOverOverlay, HUD hidden, save cleared
    expect(harness.calls.defeatNotices).toEqual([
      { defeated: 'humans', victor: 'orcs', isHuman: true },
    ]);
    expect(harness.calls.gameOverShows).toEqual([]);
    expect(harness.calls.topBarHides).toBeGreaterThanOrEqual(1);
    expect(harness.calls.actionBarHides).toBeGreaterThanOrEqual(1);
    expect(harness.defeatNoticeModal.isOpen()).toBe(true);
    expect(loadSavedCampaign()).toBeNull();

    // Closing the wizard's defeated message (or pressing Android Back) takes you straight back to Main Menu!
    expect((harness as unknown as { handleAndroidBack: () => boolean }).handleAndroidBack()).toBe(true);
    expect(harness.defeatNoticeModal.isOpen()).toBe(false);
    expect(harness.calls.returnToTitleCount).toBe(1);
    expect(harness.state).toBeNull();
  });

  it('Root Cause 2: refuses to overwrite saved campaign mid-AI-turn AND auto-resumes already-saved AI turns', async () => {
    const state = createGame({
      humanFaction: 'humans',
      difficulty: 'normal',
      mapSize: 16,
      maxTurns: 0,
      seed: 4242,
    });
    const human = state.players.find((p) => p.isHuman)!;
    const harness = createAppControllerHarness(state, human.id);

    // 1. Clean human-turn persist works
    (harness as unknown as { persistActiveCampaign: () => void }).persistActiveCampaign();
    expect(loadSavedCampaign()?.state.activePlayerIndex).toBe(0);

    // 2. Mid-AI-turn persist (e.g. Android pause / visibilitychange) must NOT clobber the clean save
    const midAiState = applyAction(state, { type: 'END_TURN' }).state;
    expect(getActivePlayer(midAiState).isHuman).toBe(false);
    harness.state = midAiState;
    harness.isAITurnRunning = true;
    (harness as unknown as { persistActiveCampaign: () => void }).persistActiveCampaign();
    expect(loadSavedCampaign()?.state.activePlayerIndex).toBe(0);

    // 3. Even if a pre-existing bricked save has activePlayerIndex !== 0, runAITurnSequence(false)
    //    (invoked by mountActiveGame) finishes the remaining AI turns and returns control to human.
    clearSavedCampaign();
    saveCampaign(midAiState, human.id, null, null);
    expect(loadSavedCampaign()?.state.activePlayerIndex).toBe(1);

    harness.isAITurnRunning = false;
    harness.state = loadSavedCampaign()!.state;
    await (harness as unknown as { runAITurnSequence: (b: boolean) => Promise<void> }).runAITurnSequence(false);

    expect(harness.isAITurnRunning).toBe(false);
    expect(harness.state!.phase).toBe('playing');
    expect(getActivePlayer(harness.state!).id).toBe(human.id);
    expect(harness.state!.turn).toBe(2);
    expect(loadSavedCampaign()?.state.activePlayerIndex).toBe(0);
  });

  it('Root Cause 3 & Item 4: DefeatNoticeModal shows "Return to Main Menu" on human defeat, "Continue" on rival elimination, and passes isHumanDefeated to onClose', async () => {
    const prevDoc = (globalThis as unknown as { document?: unknown }).document;
    (globalThis as unknown as { document: { createElement: () => MockElement } }).document = {
      createElement: () => new MockElement(),
    };
    try {
      const container = new MockElement();
      const onClose = vi.fn();
      const modal = new DefeatNoticeModal(container as unknown as HTMLElement, { onClose });
      const modalRoot = container.children[0];

      // 1. Rival AI-vs-AI elimination -> "Continue", onClose(false)
      const rivalPromise = modal.show('dwarves', 'orcs', false);
      expect(modal.isOpen()).toBe(true);
      expect(modal.isHumanDefeated()).toBe(false);
      expect(modalRoot.innerHTML).toContain('Continue');
      expect(modalRoot.innerHTML).not.toContain('Return to Main Menu');
      modal.close();
      await rivalPromise;

      expect(modal.isOpen()).toBe(false);
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenLastCalledWith(false);

      // 2. Human civilization defeated -> "Return to Main Menu", onClose(true)
      const humanPromise = modal.show('humans', 'orcs', true);
      expect(modal.isOpen()).toBe(true);
      expect(modal.isHumanDefeated()).toBe(true);
      expect(modalRoot.attributes.get('data-human-defeated')).toBe('true');
      expect(modalRoot.innerHTML).toContain('Return to Main Menu');
      modal.close();
      await humanPromise;

      expect(modal.isOpen()).toBe(false);
      expect(onClose).toHaveBeenCalledTimes(2);
      expect(onClose).toHaveBeenLastCalledWith(true);

      // 3. Silent close (programmatic teardown) does NOT trigger onClose
      const silentPromise = modal.show('humans', 'elves', true);
      modal.close(true);
      await silentPromise;
      expect(onClose).toHaveBeenCalledTimes(2);
    } finally {
      (globalThis as unknown as { document?: unknown }).document = prevDoc;
    }
  });

  it('Root Cause 4: AnimationQueue fast-completes TILES_REVEALED when SceneManager RAF is paused (Android Codex Elves Keen Sight)', async () => {
    const state = createGame({
      humanFaction: 'elves',
      difficulty: 'normal',
      mapSize: 16,
      maxTurns: 0,
      seed: 9001,
    });
    const human = state.players.find((p) => p.isHuman)!;
    const revealedCoord = { x: 0, y: 0 };

    const cloudGroup = new THREE.Group();
    const puff = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: '#ffffff' }),
    );
    cloudGroup.add(puff);

    const removedClouds: Array<{ x: number; y: number }> = [];
    const mockBoard = {
      fxGroup: new THREE.Group(),
      revealTilesUnderClouds: vi.fn(),
      getCloudObject: vi.fn(() => ({ group: cloudGroup, phase: 0 })),
      markCloudAnimating: vi.fn(),
      removeCloudImmediate: vi.fn((x: number, y: number) => removedClouds.push({ x, y })),
    } as unknown as BoardRenderer;

    const mockBadges = {
      spawnFloatingText: vi.fn(),
    } as unknown as WorldBadges;

    const pausedSceneManager = {
      isRunning: () => false,
    } as unknown as SceneManager;

    const queue = new AnimationQueue(mockBoard, mockBadges, pausedSceneManager);

    // Must resolve immediately with ZERO RAF frames!
    await queue.playEvents(
      [{ type: 'TILES_REVEALED', playerId: human.id, coords: [revealedCoord] }],
      state,
      human.id,
      1.0,
    );

    expect(queue.isPlaying()).toBe(false);
    expect(removedClouds).toEqual([revealedCoord]);
  });

  it('Root Cause 5a: AnimationQueue safety timeout & cancelAll guarantee playEvents can never deadlock', async () => {
    vi.useFakeTimers();
    const state = createGame({
      humanFaction: 'humans',
      difficulty: 'normal',
      mapSize: 16,
      maxTurns: 0,
      seed: 101,
    });
    const human = state.players.find((p) => p.isHuman)!;
    const unit = Object.values(state.units).find((u) => u.ownerId === human.id)!;

    const mockUnitObj = {
      group: new THREE.Group(),
      sprite: new THREE.Sprite(),
      shadowDisc: new THREE.Mesh(),
      baseScaleX: 1,
      baseScaleY: 1,
    };
    const mockBoard = {
      fxGroup: new THREE.Group(),
      getUnitObject: () => mockUnitObj,
      markUnitAnimating: vi.fn(),
    } as unknown as BoardRenderer;
    const mockBadges = {
      setUnitOverrideWorldPos: vi.fn(),
      clearUnitOverrideWorldPos: vi.fn(),
    } as unknown as WorldBadges;
    const runningSceneManager = {
      isRunning: () => true,
    } as unknown as SceneManager;

    const queue = new AnimationQueue(mockBoard, mockBadges, runningSceneManager);

    // 1. Stalled RAF (update never called): wall-clock safety timeout must resolve it
    let resolved = false;
    const movePromise = queue
      .playEvents(
        [
          {
            type: 'UNIT_MOVED',
            unitId: unit.id,
            from: { x: unit.x, y: unit.y },
            to: { x: unit.x, y: unit.y },
            ownerId: human.id,
          },
        ],
        state,
        human.id,
        1.0,
      )
      .then(() => {
        resolved = true;
      });

    // Advance past safety timeout for hop + landing cushion tweens
    await vi.advanceTimersByTimeAsync(5000);
    await movePromise;
    expect(resolved).toBe(true);
    expect(queue.isPlaying()).toBe(false);

    // 2. cancelAll() resolves an in-flight animation immediately
    let canceledResolved = false;
    const cancelPromise = queue
      .playEvents(
        [
          {
            type: 'UNIT_MOVED',
            unitId: unit.id,
            from: { x: unit.x, y: unit.y },
            to: { x: unit.x, y: unit.y },
            ownerId: human.id,
          },
        ],
        state,
        human.id,
        1.0,
      )
      .then(() => {
        canceledResolved = true;
      });

    queue.cancelAll();
    await cancelPromise;
    expect(canceledResolved).toBe(true);
    expect(queue.isPlaying()).toBe(false);
  });

  it('Root Cause 5b: unexpected error during AI turn recovers cleanly back to the human player', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const state = createGame({
      humanFaction: 'dwarves',
      difficulty: 'normal',
      mapSize: 16,
      maxTurns: 0,
      seed: 777,
    });
    const human = state.players.find((p) => p.isHuman)!;
    const harness = createAppControllerHarness(state, human.id);

    // Inject a hard error on the first board.syncState inside the AI loop
    let threw = false;
    harness.board.syncState.mockImplementation(() => {
      if (!threw) {
        threw = true;
        throw new Error('Simulated WebGL sync failure');
      }
    });

    await (harness as unknown as { runAITurnSequence: (b: boolean) => Promise<void> }).runAITurnSequence(true);

    expect(errorSpy).toHaveBeenCalled();
    expect(harness.isAITurnRunning).toBe(false);
    expect(harness.state!.phase).toBe('playing');
    expect(getActivePlayer(harness.state!).id).toBe(human.id);
    expect(harness.calls.inputLocks[harness.calls.inputLocks.length - 1]).toBe(false);
  });

  it('Root Cause 5c: resigning mid-AI-turn invalidates sessionToken and cancels in-flight animations', async () => {
    const state = createGame({
      humanFaction: 'humans',
      difficulty: 'normal',
      mapSize: 16,
      maxTurns: 0,
      seed: 555,
    });
    const human = state.players.find((p) => p.isHuman)!;
    const harness = createAppControllerHarness(state, human.id);
    const tokenBefore = harness.sessionToken;

    let releaseAnim = () => {};
    harness.animQueue.playEvents.mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          releaseAnim = resolve;
        }),
    );

    const turnPromise = (
      harness as unknown as { runAITurnSequence: (b: boolean) => Promise<void> }
    ).runAITurnSequence(true);

    // Yield once so runAITurnSequence enters awaiting playEvents/sleep
    await Promise.resolve();
    expect(harness.isAITurnRunning).toBe(true);

    // User resigns from Leaderboard mid-AI-turn
    (harness as unknown as { handleResignCampaign: () => void }).handleResignCampaign();

    expect(harness.sessionToken).toBeGreaterThan(tokenBefore);
    expect(harness.isAITurnRunning).toBe(false);
    expect(harness.calls.animCancels).toBeGreaterThanOrEqual(1);
    expect(harness.calls.resignShows).toBe(1);

    // Even after the old animation resolves, the invalidated turn must not clobber resignation state
    releaseAnim();
    await turnPromise;
    expect(loadSavedCampaign()).toBeNull();
  });

  it.each<FactionId>(ALL_FACTIONS)(
    'Tutorial + 5 post-tutorial AI rounds complete cleanly with zero hangs for %s',
    async (faction) => {
      const { state } = createTutorialGame({
        humanFaction: faction,
        difficulty: 'normal',
        mapSize: 16,
        maxTurns: 0,
      });
      const human = state.players.find((p) => p.isHuman)!;
      let cur = state;

      for (let round = 0; round < 5 && cur.phase === 'playing' && getPlayer(cur, human.id)!.alive; round++) {
        // Human ends turn
        cur = applyAction(cur, { type: 'END_TURN' }).state;

        // Every alive AI executes its full planned turn cleanly
        let guard = 0;
        while (
          cur.phase === 'playing' &&
          getPlayer(cur, human.id)!.alive &&
          !getActivePlayer(cur).isHuman &&
          guard++ < 6
        ) {
          const ai = getActivePlayer(cur);
          const actions = planAITurn(cur, ai.id, cur.config.difficulty);
          expect(actions.length).toBeGreaterThan(0);
          expect(actions[actions.length - 1].type).toBe('END_TURN');
          for (const act of actions) {
            if (cur.phase !== 'playing' || !getPlayer(cur, human.id)!.alive) break;
            if (getActivePlayer(cur).id !== ai.id) break;
            const res = applyAction(cur, act);
            expect(res.events.length).toBeGreaterThan(0);
            cur = res.state;
          }
        }

        if (cur.phase === 'playing' && getPlayer(cur, human.id)!.alive) {
          expect(getActivePlayer(cur).id).toBe(human.id);
        }
      }
    },
  );

  it('Item 1 UI: Difficulty labels use Easy / Normal / Hard and cycle Easy -> Normal -> Hard -> Easy', () => {
    expect(DIFFICULTY_LABELS).toEqual({
      easy: 'Easy',
      normal: 'Normal',
      hard: 'Hard',
    });
    expect(formatDifficultyLabel('easy')).toBe('Easy');
    expect(formatDifficultyLabel('normal')).toBe('Normal');
    expect(formatDifficultyLabel('hard')).toBe('Hard');
    expect(nextDifficulty('easy')).toBe('normal');
    expect(nextDifficulty('normal')).toBe('hard');
    expect(nextDifficulty('hard')).toBe('easy');
  });

  it('Item 2: First-time tutorial game ALWAYS forces Easy mode even if Normal or Hard was selected', () => {
    const state = createGame({
      humanFaction: 'humans',
      difficulty: 'normal',
      mapSize: 16,
      maxTurns: 0,
      seed: 123,
    });
    const human = state.players.find((p) => p.isHuman)!;
    const harness = createAppControllerHarness(state, human.id);
    const mounted: Array<{ state: GameState; tutorialStage: string | null }> = [];
    (harness as unknown as { mountActiveGame: ReturnType<typeof vi.fn> }).mountActiveGame = vi.fn(
      (s: GameState, _pid: PlayerId, stage: string | null) => {
        mounted.push({ state: s, tutorialStage: stage });
      },
    );

    // First game (tutorial NOT completed) with Hard selected -> MUST force 'easy'
    (harness as unknown as { startGame: (o: { humanFaction: FactionId; difficulty: 'easy' | 'normal' | 'hard'; mapSize: 16 | 18 }) => void }).startGame({
      humanFaction: 'dwarves',
      difficulty: 'hard',
      mapSize: 16,
    });
    expect(mounted).toHaveLength(1);
    expect(mounted[0].tutorialStage).toBe('intro');
    expect(mounted[0].state.config.difficulty).toBe('easy');

    // Also verify Normal selected -> still forces 'easy' before tutorial is completed
    (harness as unknown as { startGame: (o: { humanFaction: FactionId; difficulty: 'easy' | 'normal' | 'hard'; mapSize: 16 | 18 }) => void }).startGame({
      humanFaction: 'elves',
      difficulty: 'normal',
      mapSize: 18,
    });
    expect(mounted).toHaveLength(2);
    expect(mounted[1].tutorialStage).toBe('intro');
    expect(mounted[1].state.config.difficulty).toBe('easy');

    // Once tutorial IS completed, selected difficulty ('hard' / 'normal' / 'easy') is respected!
    markTutorialCompleted();
    (harness as unknown as { startGame: (o: { humanFaction: FactionId; difficulty: 'easy' | 'normal' | 'hard'; mapSize: 16 | 18 }) => void }).startGame({
      humanFaction: 'orcs',
      difficulty: 'hard',
      mapSize: 16,
    });
    expect(mounted).toHaveLength(3);
    expect(mounted[2].tutorialStage).toBeNull();
    expect(mounted[2].state.config.difficulty).toBe('hard');
  });

  it('Item 3: Android first-run bridge helpers & idempotent __eldermereOnSizzleFinished fallback launch Humans/Easy tutorial', () => {
    const win = globalThis.window as unknown as {
      EldermereAndroid?: { shouldAutoStartTutorial?: () => boolean };
    };

    // Web (no Android bridge) -> false
    delete win.EldermereAndroid;
    expect(isAndroidApp()).toBe(false);
    expect(shouldAutoStartAndroidTutorial()).toBe(false);

    // Android subsequent launch -> shouldAutoStartTutorial() returns false
    win.EldermereAndroid = { shouldAutoStartTutorial: () => false };
    expect(isAndroidApp()).toBe(true);
    expect(shouldAutoStartAndroidTutorial()).toBe(false);

    // Android first-run sizzle launch -> shouldAutoStartTutorial() returns true
    win.EldermereAndroid = { shouldAutoStartTutorial: () => true };
    expect(shouldAutoStartAndroidTutorial()).toBe(true);

    // Verify idempotent handleAndroidSizzleFinished fallback when still on TitleScreen
    const dummyState = createGame({
      humanFaction: 'humans',
      difficulty: 'normal',
      mapSize: 16,
      maxTurns: 0,
      seed: 321,
    });
    const human = dummyState.players.find((p) => p.isHuman)!;
    const harness = createAppControllerHarness(dummyState, human.id);
    harness.state = null;
    (harness as unknown as { isTitleDioramaActive: boolean }).isTitleDioramaActive = true;
    (harness as unknown as { hasAutoStartedFirstRunTutorial: boolean }).hasAutoStartedFirstRunTutorial = false;

    const mounted: Array<{ state: GameState; stage: string | null }> = [];
    (harness as unknown as { mountActiveGame: ReturnType<typeof vi.fn> }).mountActiveGame = vi.fn(
      (s: GameState, _pid: PlayerId, stage: string | null) => {
        harness.state = s;
        (harness as unknown as { isTitleDioramaActive: boolean }).isTitleDioramaActive = false;
        mounted.push({ state: s, stage });
      },
    );

    // Subsequent launch (shouldAutoStartTutorial === false): __eldermereOnSizzleFinished MUST be a no-op
    win.EldermereAndroid = { shouldAutoStartTutorial: () => false };
    (harness as unknown as { handleAndroidSizzleFinished: () => void }).handleAndroidSizzleFinished();
    expect(mounted).toHaveLength(0);
    expect(harness.state).toBeNull();

    // First-run launch (shouldAutoStartTutorial === true): launches straight into Humans / Easy tutorial (16x16, intro stage)
    win.EldermereAndroid = { shouldAutoStartTutorial: () => true };
    (harness as unknown as { handleAndroidSizzleFinished: () => void }).handleAndroidSizzleFinished();
    expect(mounted).toHaveLength(1);
    expect(mounted[0].stage).toBe('intro');
    expect(mounted[0].state.config.difficulty).toBe('easy');
    expect(mounted[0].state.config.mapSize).toBe(16);
    expect(mounted[0].state.players.find((p) => p.isHuman)?.faction).toBe('humans');

    // Second call is strictly idempotent (even if user later returned to title!)
    harness.state = null;
    (harness as unknown as { isTitleDioramaActive: boolean }).isTitleDioramaActive = true;
    (harness as unknown as { handleAndroidSizzleFinished: () => void }).handleAndroidSizzleFinished();
    expect(mounted).toHaveLength(1);
  });
});
