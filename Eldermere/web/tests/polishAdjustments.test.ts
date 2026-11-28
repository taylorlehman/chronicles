import * as THREE from 'three';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ALL_FACTIONS,
  applyAction,
  createGame,
  createTutorialGame,
  getPlayerCities,
  type FactionId,
  type GameEvent,
  type GameState,
} from '../src/game';
import { BoardRenderer } from '../src/render/BoardRenderer';
import { TILE_TOP_Y } from '../src/render/assets/terrainMesh';
import { AppController } from '../src/ui/AppController';
import { DefeatNoticeModal } from '../src/ui/DefeatNoticeModal';
import { ALDERWICK_POSES } from '../src/ui/alderwick';

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
  public getContext(): null {
    return null;
  }
  public querySelector(): MockElement | null {
    return null;
  }
  public focus(): void {
    this.focused = true;
  }
}

function installMockWindowAndDocument() {
  const winListeners = new Map<string, Set<(e: unknown) => void>>();
  const mockWindow = {
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
    dispatch: (type: string, event: Record<string, unknown>) => {
      for (const fn of winListeners.get(type) ?? []) {
        fn(event);
      }
    },
  };
  const mockDocument = {
    createElement: () => new MockElement(),
    createElementNS: () => new MockElement(),
  };
  (globalThis as unknown as { window: typeof mockWindow }).window = mockWindow;
  (globalThis as unknown as { document: typeof mockDocument }).document = mockDocument;
  return { mockWindow, mockDocument };
}

describe('Polish Adjustments — Tutorial Rings, Owning-City Pulse & Alderwick Rival Congrats', () => {
  let prevWindow: unknown;
  let prevDocument: unknown;

  beforeEach(() => {
    prevWindow = (globalThis as unknown as { window?: unknown }).window;
    prevDocument = (globalThis as unknown as { document?: unknown }).document;
    installMockWindowAndDocument();
  });

  afterEach(() => {
    (globalThis as unknown as { window?: unknown }).window = prevWindow;
    (globalThis as unknown as { document?: unknown }).document = prevDocument;
    vi.restoreAllMocks();
  });

  describe('1. Tutorial Berry/Resource Selection — No Double Yellow Ring', () => {
    it.each<FactionId>(ALL_FACTIONS)(
      'keeps 3D resource bounce cue without adding tutorial ground rings on upgrade step (%s)',
      (faction) => {
        const { state, scenario } = createTutorialGame({
          humanFaction: faction,
          difficulty: 'easy',
          mapSize: 16,
          maxTurns: 0,
        });
        const human = state.players.find((p) => p.isHuman)!;
        const scene = new THREE.Scene();
        const board = new BoardRenderer(scene);
        board.syncState(state, human.id);

        // Step 2/8 (upgrade): highlight harvestable resource tiles ONLY with 3D prop wiggle, NO ground rings
        board.setTutorialResourceTargets(scenario.resourceCoords);
        board.setTutorialTileTargets([]);

        expect(board.getTutorialOverlayCount()).toBe(0);
        expect(board.getTutorialResourceTargetKeys().size).toBe(scenario.resourceCoords.length);

        // Verify tapping a resource tile keeps tutorialOverlayCount === 0 (so ONLY selectedRing renders)
        board.setSelectedTile(scenario.resourceCoords[0]);
        expect(board.getTutorialOverlayCount()).toBe(0);

        // Verify board update animates without throwing and clearing restores cleanly
        board.update(0.03, 0.4);
        board.setTutorialResourceTargets([]);
        expect(board.getTutorialResourceTargetKeys().size).toBe(0);
        expect(board.getTutorialOverlayCount()).toBe(0);

        // Step 7/8 (train): capital focus ring STILL works when capital is unselected, and clears on select
        board.setTutorialTileTargets([scenario.capitalCoord]);
        expect(board.getTutorialOverlayCount()).toBe(2); // fill + ring
        board.setTutorialTileTargets([]);
        expect(board.getTutorialOverlayCount()).toBe(0);
      },
    );
  });

  describe('2. Subtle Owning-City Bounce/Wiggle on Territory Tile Tap', () => {
    it('applies a subtle ~340ms damped hop/squash/tilt and cleanly resets to exact rest transform', () => {
      const { state, scenario } = createTutorialGame({
        humanFaction: 'humans',
        difficulty: 'easy',
        mapSize: 16,
        maxTurns: 0,
      });
      const human = state.players.find((p) => p.isHuman)!;
      const capital = getPlayerCities(state, human.id)[0];

      const scene = new THREE.Scene();
      const board = new BoardRenderer(scene);
      board.syncState(state, human.id);

      const cityMesh = board.getCityObject(capital.id)!;
      expect(cityMesh).toBeDefined();
      expect(cityMesh.position.y).toBe(TILE_TOP_Y);
      expect(cityMesh.scale.toArray()).toEqual([1, 1, 1]);
      expect(cityMesh.rotation.x).toBe(0);
      expect(cityMesh.rotation.z).toBe(0);

      // Unknown city is a safe no-op
      board.pulseCity('nonexistent_city');
      expect(board.isCityPulsing('nonexistent_city')).toBe(false);

      // Trigger pulse
      board.pulseCity(capital.id);
      expect(board.isCityPulsing(capital.id)).toBe(true);

      // Step through pulse (~340ms) and record peaks
      let maxLift = 0;
      let maxStretchDelta = 0;
      let maxTiltRad = 0;
      let elapsed = 0;
      for (let i = 0; i < 10; i++) {
        elapsed += 0.03;
        board.update(0.03, elapsed);
        maxLift = Math.max(maxLift, cityMesh.position.y - TILE_TOP_Y);
        maxStretchDelta = Math.max(maxStretchDelta, Math.abs(cityMesh.scale.y - 1));
        maxTiltRad = Math.max(maxTiltRad, Math.hypot(cityMesh.rotation.x, cityMesh.rotation.z));
      }

      // Subtle & classy bounds: lift ~0.04, scale-Y ~4%, tilt ~2.3° (0.04 rad)
      expect(maxLift).toBeGreaterThan(0.015);
      expect(maxLift).toBeLessThanOrEqual(0.055);
      expect(maxStretchDelta).toBeGreaterThan(0.015);
      expect(maxStretchDelta).toBeLessThanOrEqual(0.055);
      expect(maxTiltRad).toBeGreaterThan(0.015);
      expect(maxTiltRad).toBeLessThanOrEqual(0.055);

      // Step past completion (total > 0.34s): MUST snap back to exact rest transform
      for (let i = 0; i < 4; i++) {
        elapsed += 0.03;
        board.update(0.03, elapsed);
      }
      expect(board.isCityPulsing(capital.id)).toBe(false);
      expect(cityMesh.position.y).toBe(TILE_TOP_Y);
      expect(cityMesh.scale.toArray()).toEqual([1, 1, 1]);
      expect(cityMesh.rotation.x).toBe(0);
      expect(cityMesh.rotation.y).toBe(0);
      expect(cityMesh.rotation.z).toBe(0);

      // Repeated taps mid-pulse + board rebuild (city levels up) survive cleanly without drift
      board.pulseCity(capital.id);
      board.update(0.03, elapsed + 0.03);
      board.pulseCity(capital.id); // restart mid-pulse
      board.update(0.03, elapsed + 0.06);

      // Harvest both tutorial resources so city levels up and syncState rebuilds the city mesh
      const h1 = applyAction(state, { type: 'HARVEST_TILE', coord: scenario.resourceCoords[0] }).state;
      const h2 = applyAction(h1, { type: 'HARVEST_TILE', coord: scenario.resourceCoords[1] }).state;
      board.syncState(h2, human.id);

      const rebuiltMesh = board.getCityObject(capital.id)!;
      expect(rebuiltMesh).not.toBe(cityMesh);
      for (let i = 0; i < 14; i++) {
        elapsed += 0.03;
        board.update(0.03, elapsed);
      }
      expect(board.isCityPulsing(capital.id)).toBe(false);
      expect(rebuiltMesh.position.y).toBe(TILE_TOP_Y);
      expect(rebuiltMesh.scale.toArray()).toEqual([1, 1, 1]);
      expect(rebuiltMesh.rotation.x).toBe(0);
      expect(rebuiltMesh.rotation.z).toBe(0);
    });

    it('AppController.handleTileClick pulses only human-owned territory cities, not neutral/enemy tiles', async () => {
      installMockWindowAndDocument();
      const { state, scenario } = createTutorialGame({
        humanFaction: 'humans',
        difficulty: 'easy',
        mapSize: 16,
        maxTurns: 0,
      });
      const human = state.players.find((p) => p.isHuman)!;
      human.revealedTiles.fill(true);
      const humanCap = getPlayerCities(state, human.id)[0];
      const enemyPlayer = state.players.find((p) => !p.isHuman)!;
      const enemyCap = getPlayerCities(state, enemyPlayer.id)[0];
      const neutralTile = state.tiles.find((t) => t.cityId === null && !t.unitId)!;

      const pulsedCityIds: string[] = [];
      const modalClosed = () => ({ isOpen: () => false });
      const controller = Object.create(AppController.prototype) as Record<string, unknown>;
      controller.state = state;
      controller.humanPlayerId = human.id;
      controller.isBusy = false;
      controller.isAITurnRunning = false;
      controller.isSuperpowerTargeting = false;
      controller.superpowerTargets = [];
      controller.selectedCoord = null;
      controller.selectedUnitId = null;
      controller.selectionLayer = 'unit';
      controller.validMoves = [];
      controller.validAttacks = [];
      controller.tutorial = { isModalOpen: () => false, isActive: () => false };
      controller.resignationOverlay = modalClosed();
      controller.ageUpModal = modalClosed();
      controller.techModal = modalClosed();
      controller.cityRewardModal = modalClosed();
      controller.defeatNoticeModal = modalClosed();
      controller.factionDossierModal = modalClosed();
      controller.leaderboardModal = modalClosed();
      controller.board = {
        pulseCity: vi.fn((cityId: string) => pulsedCityIds.push(cityId)),
        setSelectedTile: vi.fn(),
        setMoveTargets: vi.fn(),
        setAttackTargets: vi.fn(),
        setTutorialResourceTargets: vi.fn(),
        setTutorialTileTargets: vi.fn(),
        clearHighlights: vi.fn(),
      };
      controller.badges = {
        setSelectedCoord: vi.fn(),
        setLethalTargets: vi.fn(),
      };
      controller.refreshActionBar = vi.fn();

      const handleTileClick = (
        controller as unknown as { handleTileClick: (c: { x: number; y: number }) => Promise<void> }
      ).handleTileClick.bind(controller);

      // 1. Tap human territory resource tile -> pulses human capital
      await handleTileClick(scenario.resourceCoords[0]);
      expect(pulsedCityIds).toEqual([humanCap.id]);

      // 2. Re-tap same human territory tile -> pulses human capital again
      await handleTileClick(scenario.resourceCoords[0]);
      expect(pulsedCityIds).toEqual([humanCap.id, humanCap.id]);

      // 3. Tap neutral unowned tile -> does NOT pulse any city
      await handleTileClick({ x: neutralTile.x, y: neutralTile.y });
      expect(pulsedCityIds).toHaveLength(2);

      // 4. Tap enemy city tile -> does NOT pulse enemy city
      await handleTileClick({ x: enemyCap.x, y: enemyCap.y });
      expect(pulsedCityIds).toHaveLength(2);
    });
  });

  describe('3. Full-Body Alderwick Speech-Bubble Congrats on Human-Caused Rival Defeat', () => {
    it.each<FactionId>(ALL_FACTIONS)(
      'renders full-body cheering Alderwick with lore-grounded copy when human defeats %s',
      async (defeatedFaction) => {
        const { mockWindow } = installMockWindowAndDocument();
        const container = new MockElement();
        const onClose = vi.fn();
        const modal = new DefeatNoticeModal(container as unknown as HTMLElement, { onClose });
        const root = container.children[0];
        const victorFaction = ALL_FACTIONS.find((f) => f !== defeatedFaction)!;

        const showPromise = modal.show(defeatedFaction, victorFaction, false, true);

        expect(modal.isOpen()).toBe(true);
        expect(modal.isHumanVictor()).toBe(true);
        expect(modal.isHumanDefeated()).toBe(false);
        expect(root.classList.contains('alderwick-stage-backdrop')).toBe(true);
        expect(root.classList.contains('is-human-victory')).toBe(true);
        expect(root.attributes.get('data-human-victor')).toBe('true');
        expect(root.innerHTML).toContain(ALDERWICK_POSES.cheer);
        expect(root.innerHTML).toContain('alderwick-bubble');
        expect(root.innerHTML).toContain('Onward!');
        expect(root.innerHTML).toContain('Star-Crown');
        expect(root.innerHTML).toContain('Chronicle');

        // Dismiss via Escape key -> resolves cleanly & calls onClose(false)
        const preventDefault = vi.fn();
        mockWindow.dispatch('keydown', { key: 'Escape', preventDefault });
        await showPromise;

        expect(preventDefault).toHaveBeenCalledTimes(1);
        expect(modal.isOpen()).toBe(false);
        expect(modal.isHumanVictor()).toBe(false);
        expect(onClose).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenLastCalledWith(false);

        // Also verify backdrop click dismissal
        const backdropPromise = modal.show(defeatedFaction, victorFaction, false, true);
        root.dispatch('click', { target: root });
        await backdropPromise;
        expect(modal.isOpen()).toBe(false);
        expect(onClose).toHaveBeenCalledTimes(2);
        expect(onClose).toHaveBeenLastCalledWith(false);

        modal.destroy();
      },
    );

    it('preserves standard compact notice for AI-vs-AI eliminations and human defeat', async () => {
      installMockWindowAndDocument();
      const container = new MockElement();
      const onClose = vi.fn();
      const modal = new DefeatNoticeModal(container as unknown as HTMLElement, { onClose });
      const root = container.children[0];

      // AI-vs-AI elimination
      const aiPromise = modal.show('orcs', 'dwarves', false, false);
      expect(modal.isHumanVictor()).toBe(false);
      expect(root.classList.contains('is-human-victory')).toBe(false);
      expect(root.innerHTML).not.toContain(ALDERWICK_POSES.cheer);
      expect(root.innerHTML).toContain('Continue');
      modal.close();
      await aiPromise;
      expect(onClose).toHaveBeenLastCalledWith(false);

      // Human defeated
      const humanDefeatPromise = modal.show('humans', 'orcs', true, false);
      expect(modal.isHumanDefeated()).toBe(true);
      expect(modal.isHumanVictor()).toBe(false);
      expect(root.innerHTML).toContain('Return to Main Menu');
      modal.close();
      await humanDefeatPromise;
      expect(onClose).toHaveBeenLastCalledWith(true);

      modal.destroy();
    });

    it('AppController.showEliminationNotices distinguishes mid-game human defeat, AI-vs-AI, and final Domination Victory', async () => {
      installMockWindowAndDocument();
      const state: GameState = createGame({
        humanFaction: 'humans',
        difficulty: 'normal',
        mapSize: 16,
        maxTurns: 0,
        seed: 77,
      });
      const human = state.players.find((p) => p.isHuman)!;
      const orcs = state.players.find((p) => p.faction === 'orcs')!;
      const dwarves = state.players.find((p) => p.faction === 'dwarves')!;

      const showCalls: Array<{
        defeated: FactionId;
        victor: FactionId;
        isHumanDefeated: boolean;
        isHumanVictor: boolean;
      }> = [];

      const controller = Object.create(AppController.prototype) as Record<string, unknown>;
      controller.state = state;
      controller.humanPlayerId = human.id;
      controller.sessionToken = 1;
      controller.lastVictoryCrown = null;
      controller.sceneManager = { stop: vi.fn(), start: vi.fn() };
      const pulseCrown = vi.fn();
      controller.topBar = { update: vi.fn(), pulseCrown };
      controller.defeatNoticeModal = {
        isOpen: () => false,
        show: vi.fn(
          async (
            defeated: FactionId,
            victor: FactionId,
            isHumanDefeated: boolean,
            isHumanVictor: boolean,
          ) => {
            showCalls.push({ defeated, victor, isHumanDefeated, isHumanVictor });
          },
        ),
      };
      controller.pauseSceneBehindOpaqueSheet = vi.fn();
      controller.resumeSceneAfterOpaqueSheet = vi.fn();
      controller.handleHumanDefeated = vi.fn();

      const showEliminationNotices = (
        controller as unknown as {
          showEliminationNotices: (events: GameEvent[], s: GameState, token: number) => Promise<void>;
        }
      ).showEliminationNotices.bind(controller);

      // 1. Mid-game human defeats Orcs (phase === 'playing') -> isHumanVictor === true & pulses TopBar crown
      await showEliminationNotices(
        [
          {
            type: 'PLAYER_ELIMINATED',
            playerId: orcs.id,
            eliminatedByPlayerId: human.id,
            shardsAwarded: ['orcs'],
            killerShardsBefore: ['humans'],
            killerShardsAfter: ['humans', 'orcs'],
          },
        ],
        state,
        1,
      );
      expect(showCalls).toEqual([
        { defeated: 'orcs', victor: 'humans', isHumanDefeated: false, isHumanVictor: true },
      ]);
      expect(pulseCrown).toHaveBeenCalledTimes(1);

      // 2. Mid-game AI defeats AI (phase === 'playing') -> isHumanVictor === false & does NOT pulse crown
      await showEliminationNotices(
        [{ type: 'PLAYER_ELIMINATED', playerId: dwarves.id, eliminatedByPlayerId: orcs.id }],
        state,
        1,
      );
      expect(showCalls).toHaveLength(2);
      expect(showCalls[1]).toEqual({
        defeated: 'dwarves',
        victor: 'orcs',
        isHumanDefeated: false,
        isHumanVictor: false,
      });
      expect(pulseCrown).toHaveBeenCalledTimes(1);

      // 3. Final Domination Victory (phase === 'game_over') -> skips mid-game modal, stores final victoryCrown
      const victoryState: GameState = { ...state, phase: 'game_over', winnerId: human.id };
      await showEliminationNotices(
        [
          {
            type: 'PLAYER_ELIMINATED',
            playerId: orcs.id,
            eliminatedByPlayerId: human.id,
            shardsAwarded: ['orcs'],
            killerShardsBefore: ['humans', 'elves', 'dwarves'],
            killerShardsAfter: ['humans', 'elves', 'dwarves', 'orcs'],
          },
        ],
        victoryState,
        1,
      );
      expect(showCalls).toHaveLength(2);
      expect(controller.lastVictoryCrown).toEqual({
        beforeShards: ['humans', 'elves', 'dwarves'],
        addedShards: ['orcs'],
        afterShards: ['humans', 'elves', 'dwarves', 'orcs'],
      });
    });
  });
});
