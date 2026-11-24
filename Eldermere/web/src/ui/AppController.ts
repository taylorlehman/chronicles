import { planAITurn } from '../ai';
import {
  TECH_DEFINITIONS,
  UNIT_DEFINITIONS,
  applyAction,
  canResearchTech,
  canUnitCapture,
  canUnitExploreRuins,
  createGame,
  getActivePlayer,
  getCityTrainOptions,
  getCityUnitCap,
  getCityUnitCount,
  getEffectiveAttack,
  getEffectiveDefense,
  getFactionTechs,
  getLeaderboard,
  getPlayer,
  getPlayerCities,
  getPlayerUnits,
  getTechCost,
  getTile,
  getTileActionOptions,
  getUnitActionOptions,
  getValidAttackTargets,
  getValidMoves,
  hasUnitRemainingActions,
  predictCombat,
  tileIndex,
  type City,
  type CityRewardChoice,
  type Coord,
  type FactionId,
  type GameAction,
  type GameEvent,
  type GameState,
  type PlayerId,
  type PlayerState,
  type TechId,
  type TerrainType,
  type Tile,
  type Unit,
} from '../game';
import {
  AnimationQueue,
  BoardRenderer,
  InputController,
  SceneManager,
  WorldBadges,
  tileToWorld,
  type AttackTargetOverlay,
} from '../render';
import {
  ActionBar,
  type ActionBarViewModel,
  type CombatPreviewDisplay,
  type SelectedCityInfo,
  type SelectedTileInfo,
  type SelectedUnitInfo,
  type SelectionLayer,
} from './ActionBar';
import { CityRewardModal } from './CityRewardModal';
import { DefeatNoticeModal } from './DefeatNoticeModal';
import { FactionDossierModal, type FactionDossierModalViewModel } from './FactionDossierModal';
import { LeaderboardModal, type LeaderboardModalViewModel } from './LeaderboardModal';
import { GameOverOverlay, TitleScreen, type StartGameOptions } from './Screens';
import { TechModal, type TechModalViewModel } from './TechModal';
import { TopBar } from './TopBar';
import { notifyAndroidGameReady, triggerAndroidHaptic } from './androidBridge';
import { renderIcon } from './icons';

const TERRAIN_NAMES: Record<TerrainType, string> = {
  plains: 'Plains',
  forest: 'Forest',
  ancient_woods: 'Ancient Woods',
  mountain: 'Mountain',
  wasteland: 'Wasteland',
  water: 'Water',
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export class AppController {
  private readonly canvasContainer: HTMLElement;
  private readonly badgesContainer: HTMLElement;
  private readonly hudRoot: HTMLElement;

  private readonly titleScreen: TitleScreen;
  private readonly gameOverOverlay: GameOverOverlay;
  private readonly topBar: TopBar;
  private readonly actionBar: ActionBar;
  private readonly techModal: TechModal;
  private readonly cityRewardModal: CityRewardModal;
  private readonly defeatNoticeModal: DefeatNoticeModal;
  private readonly factionDossierModal: FactionDossierModal;
  private readonly leaderboardModal: LeaderboardModal;
  private readonly rewardToastEl: HTMLDivElement;
  private rewardToastTimer: number | null = null;

  private sceneManager: SceneManager | null = null;
  private board: BoardRenderer | null = null;
  private badges: WorldBadges | null = null;
  private animQueue: AnimationQueue | null = null;
  private input: InputController | null = null;

  private state: GameState | null = null;
  private humanPlayerId: PlayerId = '';
  private selectedCoord: Coord | null = null;
  private selectedUnitId: string | null = null;
  private selectionLayer: SelectionLayer = 'unit';
  private validMoves: Coord[] = [];
  private validAttacks: Coord[] = [];
  private hoveredCoord: Coord | null = null;
  private readyUnitCycleIndex = 0;

  // Empty-sky tap deselection tracking
  private activeCanvasPointerId: number | null = null;
  private activeCanvasPointerStart = { x: 0, y: 0 };
  private canvasMultiTouch = false;
  private tileClickHandled = false;
  private readonly onCanvasPointerDownBound: (e: PointerEvent) => void;
  private readonly onWindowPointerUpBound: (e: PointerEvent) => void;
  private readonly onWindowPointerCancelBound: () => void;
  private readonly onAndroidBackBound: () => boolean;
  private readonly onAndroidSetPausedBound: (paused: boolean) => void;

  private isBusy = false;
  private isAITurnRunning = false;
  private sessionToken = 0;
  private titleSettleTimer: number | null = null;
  private isTitleDioramaActive = false;
  private titleShowcaseState: GameState | null = null;

  constructor(
    canvasContainer: HTMLElement,
    badgesContainer: HTMLElement,
    hudRoot: HTMLElement,
  ) {
    this.canvasContainer = canvasContainer;
    this.badgesContainer = badgesContainer;
    this.hudRoot = hudRoot;

    this.onCanvasPointerDownBound = (e) => this.handleCanvasPointerDown(e);
    this.onWindowPointerUpBound = (e) => this.handleWindowPointerUp(e);
    this.onWindowPointerCancelBound = () => {
      this.activeCanvasPointerId = null;
      this.canvasMultiTouch = false;
    };
    this.onAndroidBackBound = () => this.handleAndroidBack();
    this.onAndroidSetPausedBound = (paused: boolean) => this.setPaused(paused);

    this.titleScreen = new TitleScreen(this.hudRoot, {
      onStartGame: (options) => this.startGame(options),
      onSelectFaction: (faction) => {
        triggerAndroidHaptic('tap');
        this.applyFactionTheme(faction);
        this.focusTitleOnFaction(faction, false);
      },
    });

    this.gameOverOverlay = new GameOverOverlay(this.hudRoot, {
      onPlayAgain: () => this.returnToTitle(),
    });

    this.topBar = new TopBar(this.hudRoot, {
      onOpenLeaderboard: () => this.openLeaderboardModal(),
    });

    this.actionBar = new ActionBar(this.hudRoot, {
      onAction: (action) => {
        void this.handleHumanAction(action);
      },
      onDeselect: () => this.clearSelection(),
      onSwitchLayer: (layer) => this.switchSelectionLayer(layer),
      onOpenTech: () => this.openTechModal(),
      onNextReadyUnit: () => this.focusNextReadyUnit(),
      onEndTurn: () => {
        void this.handleEndTurn();
      },
    });

    this.techModal = new TechModal(this.hudRoot, {
      onResearch: (techId) => {
        void this.handleHumanAction({ type: 'RESEARCH_TECH', techId });
      },
      onClose: () => {
        this.resumeSceneAfterOpaqueSheet();
      },
    });

    this.cityRewardModal = new CityRewardModal(this.hudRoot, {
      onChoose: (cityId, reward) => {
        void this.handleCityRewardChoice(cityId, reward);
      },
    });

    this.defeatNoticeModal = new DefeatNoticeModal(this.hudRoot);

    this.factionDossierModal = new FactionDossierModal(this.hudRoot, {
      onBack: () => {
        this.factionDossierModal.close();
        this.openLeaderboardModal();
      },
      onClose: () => {
        // Closed cleanly
      },
    });

    this.leaderboardModal = new LeaderboardModal(this.hudRoot, {
      onSelectFaction: (faction) => {
        this.leaderboardModal.close();
        this.openFactionDossier(faction);
      },
      onResign: () => this.returnToTitle(),
      onClose: () => {
        // Closed cleanly
      },
    });

    this.rewardToastEl = document.createElement('div');
    this.rewardToastEl.className = 'ruins-reward-toast hidden';
    this.rewardToastEl.setAttribute('role', 'status');
    this.rewardToastEl.setAttribute('aria-live', 'polite');
    this.hudRoot.appendChild(this.rewardToastEl);

    this.applyFactionTheme(this.titleScreen.getSelectedFaction());
    this.mountTitleDiorama();
    this.titleScreen.show();

    window.__eldermereHandleBack = this.onAndroidBackBound;
    window.__eldermereSetPaused = this.onAndroidSetPausedBound;

    // Notify Android WebView after the Three.js scene has rendered its first frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        notifyAndroidGameReady();
      });
    });
  }

  private handleAndroidBack(): boolean {
    if (this.defeatNoticeModal.isOpen()) {
      this.defeatNoticeModal.close();
      triggerAndroidHaptic('tap');
      return true;
    }
    if (this.factionDossierModal.isOpen()) {
      this.factionDossierModal.close();
      this.openLeaderboardModal();
      return true;
    }
    if (this.leaderboardModal.isOpen()) {
      this.leaderboardModal.close();
      triggerAndroidHaptic('tap');
      return true;
    }
    if (this.techModal.isOpen()) {
      this.techModal.close();
      triggerAndroidHaptic('tap');
      return true;
    }
    if (this.cityRewardModal.isOpen()) {
      this.cityRewardModal.close();
      triggerAndroidHaptic('tap');
      return true;
    }
    if (this.selectedCoord !== null) {
      this.clearSelection();
      triggerAndroidHaptic('tap');
      return true;
    }
    return false;
  }

  private shouldKeepScenePausedForAndroid(): boolean {
    if (!window.EldermereAndroid) return false;
    return this.isTitleDioramaActive || this.techModal.isOpen();
  }

  private setPaused(paused: boolean): void {
    if (!this.sceneManager) return;
    if (paused) {
      this.sceneManager.stop();
    } else if (this.shouldKeepScenePausedForAndroid()) {
      this.sceneManager.renderOnce();
    } else {
      this.sceneManager.start();
    }
  }

  private applyFactionTheme(faction: FactionId): void {
    this.hudRoot.setAttribute('data-faction', faction);
    this.badgesContainer.setAttribute('data-faction', faction);
  }

  private attachEmptySkyListeners(): void {
    this.canvasContainer.addEventListener('pointerdown', this.onCanvasPointerDownBound);
    window.addEventListener('pointerup', this.onWindowPointerUpBound);
    window.addEventListener('pointercancel', this.onWindowPointerCancelBound);
  }

  private detachEmptySkyListeners(): void {
    this.canvasContainer.removeEventListener('pointerdown', this.onCanvasPointerDownBound);
    window.removeEventListener('pointerup', this.onWindowPointerUpBound);
    window.removeEventListener('pointercancel', this.onWindowPointerCancelBound);
    this.activeCanvasPointerId = null;
    this.canvasMultiTouch = false;
    this.tileClickHandled = false;
  }

  private handleCanvasPointerDown(e: PointerEvent): void {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (this.activeCanvasPointerId !== null && this.activeCanvasPointerId !== e.pointerId) {
      this.canvasMultiTouch = true;
      return;
    }
    this.activeCanvasPointerId = e.pointerId;
    this.activeCanvasPointerStart = { x: e.clientX, y: e.clientY };
    this.canvasMultiTouch = false;
    this.tileClickHandled = false;
  }

  private handleWindowPointerUp(e: PointerEvent): void {
    if (this.activeCanvasPointerId === null || e.pointerId !== this.activeCanvasPointerId) return;
    const start = this.activeCanvasPointerStart;
    const wasMultiTouch = this.canvasMultiTouch;
    const tileWasClicked = this.tileClickHandled;

    this.activeCanvasPointerId = null;
    this.canvasMultiTouch = false;
    this.tileClickHandled = false;

    if (tileWasClicked || wasMultiTouch || this.isBusy || this.isAITurnRunning) return;
    if (!this.state || this.state.phase !== 'playing') return;
    if (
      this.techModal.isOpen() ||
      this.cityRewardModal.isOpen() ||
      this.defeatNoticeModal.isOpen() ||
      this.factionDossierModal.isOpen() ||
      this.leaderboardModal.isOpen()
    ) {
      return;
    }

    const dist = Math.hypot(e.clientX - start.x, e.clientY - start.y);
    const threshold = e.pointerType === 'touch' ? 10 : 6;
    if (dist <= threshold && this.selectedCoord !== null) {
      this.clearSelection();
    }
  }

  /**
   * Mounts a live, gently auto-orbiting 3D Middle-earth diorama behind the Title Screen.
   */
  private mountTitleDiorama(): void {
    this.disposeSession();
    this.isTitleDioramaActive = true;
    const token = this.sessionToken;

    const showcaseSeed = (Date.now() ^ Math.floor(Math.random() * 0x7fffffff)) >>> 0;
    const showcaseState = createGame({
      humanFaction: this.titleScreen.getSelectedFaction(),
      difficulty: 'normal',
      mapSize: 16,
      maxTurns: 0,
      seed: showcaseSeed,
    });

    const viewer = showcaseState.players.find((p) => p.isHuman) ?? showcaseState.players[0];
    viewer.revealedTiles.fill(true);

    const isAndroidWebView = Boolean(window.EldermereAndroid);
    const sceneManager = new SceneManager(this.canvasContainer);
    sceneManager.setBoardBounds(showcaseState.mapSize);
    sceneManager.setIdleOrbit(!isAndroidWebView);

    const board = new BoardRenderer(sceneManager.scene);
    board.syncState(showcaseState, viewer.id);

    this.sceneManager = sceneManager;
    this.board = board;
    this.titleShowcaseState = showcaseState;

    // Frame the actual in-game 3D capital of the currently selected civilization
    // squarely in the visible upper portion above the Start Console.
    this.focusTitleOnFaction(this.titleScreen.getSelectedFaction(), true);

    sceneManager.onUpdate((dt, elapsed) => {
      board.update(dt, elapsed);
    });
    sceneManager.start();

    // On Android WebView, let initial textures & SVG sprites finish uploading behind the
    // launch loading screen, then render a crisp sunlit frame and stop the 60fps RAF loop
    // so Chromium's compositor stays completely idle behind the Title Screen.
    if (isAndroidWebView) {
      this.titleSettleTimer = window.setTimeout(() => {
        this.titleSettleTimer = null;
        if (token !== this.sessionToken || !this.isTitleDioramaActive) return;
        sceneManager.renderOnce();
        sceneManager.stop();
      }, 850);
    }
  }

  /**
   * Focuses the live Start Screen 3D in-game board directly on the selected faction's
   * capital citadel & homeland biome, offset cleanly above the Start Console on mobile.
   */
  private focusTitleOnFaction(faction: FactionId, immediate: boolean): void {
    if (!this.isTitleDioramaActive || !this.sceneManager || !this.titleShowcaseState) return;
    const state = this.titleShowcaseState;
    const player = state.players.find((p) => p.faction === faction) ?? state.players[0];
    const playerCities = getPlayerCities(state, player.id);
    const capital = playerCities[0] ?? Object.values(state.cities)[0];
    if (!capital) return;

    // Shift focus slightly in +x/+z (down-screen in isometric view) on mobile portrait
    // so the citadel sits right in the center of the upper visible half above the console.
    const isDesktop = window.innerWidth >= 768;
    const targetX = capital.x + (isDesktop ? -1.4 : 1.7);
    const targetY = capital.y + (isDesktop ? 0.5 : 1.7);
    const worldPos = tileToWorld(targetX, targetY, state.mapSize, 0);

    const isAndroidWebView = Boolean(window.EldermereAndroid);
    this.sceneManager.focusOnWorld(worldPos, immediate || isAndroidWebView);
    if (isAndroidWebView && !immediate) {
      const token = this.sessionToken;
      window.setTimeout(() => {
        if (token !== this.sessionToken || !this.isTitleDioramaActive || !this.sceneManager) return;
        this.sceneManager.renderOnce();
      }, 320);
    }
  }

  public startGame(options: StartGameOptions): void {
    triggerAndroidHaptic('select');
    this.disposeSession();
    this.sessionToken += 1;

    const seed = (Date.now() ^ Math.floor(Math.random() * 0x7fffffff)) >>> 0;
    const state = createGame({
      humanFaction: options.humanFaction,
      difficulty: options.difficulty,
      mapSize: options.mapSize,
      maxTurns: 0,
      seed,
    });

    this.state = state;
    const humanPlayer = state.players.find((p) => p.isHuman) ?? state.players[0];
    this.humanPlayerId = humanPlayer.id;
    this.readyUnitCycleIndex = 0;

    this.applyFactionTheme(humanPlayer.faction);

    // Initialize 3D diorama & overlays
    const sceneManager = new SceneManager(this.canvasContainer);
    sceneManager.setBoardBounds(state.mapSize);
    sceneManager.setIdleOrbit(false);

    const board = new BoardRenderer(sceneManager.scene);
    const badges = new WorldBadges(this.badgesContainer);
    badges.setOnCaptureClick((unitId) => {
      void this.executeCaptureCity(unitId);
    });
    badges.setOnExploreRuinsClick((unitId) => {
      void this.executeExploreRuins(unitId);
    });

    const animQueue = new AnimationQueue(board, badges);
    const input = new InputController(sceneManager, board, {
      onTileClick: (coord) => {
        this.tileClickHandled = true;
        void this.handleTileClick(coord);
      },
      onTileHover: (coord) => this.handleTileHover(coord),
      onEndTurnHotkey: () => {
        void this.handleEndTurn();
      },
      onDeselectHotkey: () => {
        if (this.defeatNoticeModal.isOpen()) {
          this.defeatNoticeModal.close();
        } else if (this.techModal.isOpen()) {
          this.techModal.close();
        } else if (this.factionDossierModal.isOpen()) {
          this.factionDossierModal.close();
        } else if (this.leaderboardModal.isOpen()) {
          this.leaderboardModal.close();
        } else {
          this.clearSelection();
        }
      },
    });

    // Register empty-sky deselection listener AFTER InputController so InputController's
    // window pointerup fires first and marks `tileClickHandled` when a tile was hit.
    this.attachEmptySkyListeners();

    this.sceneManager = sceneManager;
    this.board = board;
    this.badges = badges;
    this.animQueue = animQueue;
    this.input = input;

    board.syncState(state, this.humanPlayerId);
    badges.syncState(state, this.humanPlayerId, null);

    // Focus camera on human player's capital
    const capital = getPlayerCities(state, this.humanPlayerId).find((c) => c.isCapital);
    if (capital) {
      sceneManager.focusOnWorld(tileToWorld(capital.x, capital.y, state.mapSize, 0), true);
    }

    sceneManager.onUpdate((dt, elapsed) => {
      input.update(dt);
      board.update(dt, elapsed);
      animQueue.update(dt);
      badges.update(sceneManager.camera, dt);
    });
    sceneManager.start();

    this.titleScreen.hide();
    this.gameOverOverlay.hide();
    this.topBar.show();
    this.actionBar.show();
    this.refreshHUD();
  }

  public returnToTitle(): void {
    this.topBar.hide();
    this.actionBar.hide();
    this.techModal.close();
    this.cityRewardModal.close();
    this.defeatNoticeModal.close();
    this.factionDossierModal.close();
    this.leaderboardModal.close();
    this.hideRewardToast();
    this.gameOverOverlay.hide();
    this.applyFactionTheme(this.titleScreen.getSelectedFaction());
    this.mountTitleDiorama();
    this.titleScreen.show();
  }

  public destroy(): void {
    if (window.__eldermereHandleBack === this.onAndroidBackBound) {
      delete window.__eldermereHandleBack;
    }
    if (window.__eldermereSetPaused === this.onAndroidSetPausedBound) {
      delete window.__eldermereSetPaused;
    }
    this.disposeSession();
    this.hideRewardToast();
    this.rewardToastEl.remove();
    this.titleScreen.destroy();
    this.gameOverOverlay.destroy();
    this.topBar.destroy();
    this.actionBar.destroy();
    this.techModal.destroy();
    this.cityRewardModal.destroy();
    this.defeatNoticeModal.destroy();
    this.factionDossierModal.destroy();
    this.leaderboardModal.destroy();
  }

  private disposeSession(): void {
    this.sessionToken += 1;
    this.isTitleDioramaActive = false;
    if (this.titleSettleTimer !== null) {
      window.clearTimeout(this.titleSettleTimer);
      this.titleSettleTimer = null;
    }
    this.defeatNoticeModal.close();
    this.isBusy = false;
    this.isAITurnRunning = false;
    this.selectedCoord = null;
    this.selectedUnitId = null;
    this.selectionLayer = 'unit';
    this.validMoves = [];
    this.validAttacks = [];
    this.hoveredCoord = null;
    this.readyUnitCycleIndex = 0;

    this.detachEmptySkyListeners();

    this.input?.dispose();
    this.input = null;

    this.badges?.dispose();
    this.badges = null;

    this.sceneManager?.dispose();
    this.sceneManager = null;

    this.board = null;
    this.animQueue = null;
    this.state = null;
  }

  private isHumanTurn(): boolean {
    if (!this.state || this.state.phase !== 'playing') return false;
    return getActivePlayer(this.state).id === this.humanPlayerId;
  }

  private getUnitAtCoord(coord: Coord): Unit | null {
    if (!this.state) return null;
    const tile = getTile(this.state, coord.x, coord.y);
    if (tile?.unitId) {
      const byTile = this.state.units[tile.unitId];
      if (byTile) return byTile;
    }
    return (
      Object.values(this.state.units).find((u) => u.x === coord.x && u.y === coord.y) ?? null
    );
  }

  private hasTileUnderlay(tile: Tile, human: PlayerState): boolean {
    if (!this.state) return false;
    if (tile.isCityCenter && tile.cityId !== null) return true;
    const tileActions = getTileActionOptions(this.state, human.id, tile.x, tile.y);
    return tileActions.length > 0;
  }

  private getReadyHumanUnits(): Unit[] {
    if (!this.state) return [];
    const units = getPlayerUnits(this.state, this.humanPlayerId).filter((u) =>
      hasUnitRemainingActions(this.state!, u.id),
    );
    // Prioritize units that can capture a settlement or explore ruins right now
    return units.sort(
      (a, b) =>
        Number(Boolean(b.canCapture || b.canExploreRuins)) -
        Number(Boolean(a.canCapture || a.canExploreRuins)),
    );
  }

  private focusNextReadyUnit(): void {
    if (!this.state || !this.isHumanTurn() || this.isBusy || this.isAITurnRunning) return;
    const ready = this.getReadyHumanUnits();
    if (ready.length === 0) return;

    const unit = ready[this.readyUnitCycleIndex % ready.length];
    this.readyUnitCycleIndex = (this.readyUnitCycleIndex + 1) % ready.length;

    this.sceneManager?.focusOnWorld(tileToWorld(unit.x, unit.y, this.state.mapSize, 0), false);
    this.selectCoord({ x: unit.x, y: unit.y }, 'unit');
  }

  private async executeCaptureCity(unitId: string): Promise<void> {
    if (!this.state || this.isBusy || this.isAITurnRunning || !this.isHumanTurn()) return;
    const unit = this.state.units[unitId];
    if (!unit || unit.ownerId !== this.humanPlayerId) return;
    if (!canUnitCapture(this.state, unitId)) return;

    await this.handleHumanAction({ type: 'CAPTURE_CITY', unitId });
    this.clearSelection();
  }

  private async executeExploreRuins(unitId: string): Promise<void> {
    if (!this.state || this.isBusy || this.isAITurnRunning || !this.isHumanTurn()) return;
    const unit = this.state.units[unitId];
    if (!unit || unit.ownerId !== this.humanPlayerId) return;
    if (!canUnitExploreRuins(this.state, unitId)) return;

    await this.handleHumanAction({ type: 'EXPLORE_RUINS', unitId });
    this.clearSelection();
  }

  private async handleTileClick(coord: Coord): Promise<void> {
    if (!this.state || this.isBusy || this.isAITurnRunning) return;
    if (this.state.phase !== 'playing') return;
    if (
      this.techModal.isOpen() ||
      this.cityRewardModal.isOpen() ||
      this.defeatNoticeModal.isOpen() ||
      this.factionDossierModal.isOpen() ||
      this.leaderboardModal.isOpen()
    ) {
      return;
    }

    const tile = getTile(this.state, coord.x, coord.y);
    if (!tile) return;

    const human = getPlayer(this.state, this.humanPlayerId);
    if (!human || !human.revealedTiles[tileIndex(coord.x, coord.y, this.state.mapSize)]) {
      this.clearSelection();
      return;
    }

    const clickedUnit = this.getUnitAtCoord(coord);

    // Two-tap toggle on the SAME tile: Unit <-> City/Tile underneath
    if (
      this.selectedCoord &&
      this.selectedCoord.x === coord.x &&
      this.selectedCoord.y === coord.y
    ) {
      if (clickedUnit && this.hasTileUnderlay(tile, human)) {
        const nextLayer: SelectionLayer = this.selectionLayer === 'unit' ? 'tile' : 'unit';
        this.selectCoord(coord, nextLayer);
      }
      return;
    }

    // If a friendly unit is actively focused in 'unit' layer, check Move or Attack click first
    if (this.selectionLayer === 'unit' && this.selectedUnitId && this.isHumanTurn()) {
      const selectedUnit = this.state.units[this.selectedUnitId];
      if (selectedUnit && selectedUnit.ownerId === this.humanPlayerId) {
        const isMoveTarget = this.validMoves.some((m) => m.x === coord.x && m.y === coord.y);
        if (isMoveTarget) {
          await this.handleHumanAction({
            type: 'MOVE_UNIT',
            unitId: selectedUnit.id,
            to: coord,
          });
          this.reselectUnitIfActive(selectedUnit.id);
          return;
        }

        const isAttackTarget = this.validAttacks.some((a) => a.x === coord.x && a.y === coord.y);
        if (isAttackTarget && clickedUnit && clickedUnit.ownerId !== this.humanPlayerId) {
          await this.handleHumanAction({
            type: 'ATTACK_UNIT',
            attackerId: selectedUnit.id,
            defenderId: clickedUnit.id,
          });
          this.reselectUnitIfActive(selectedUnit.id);
          return;
        }
      }
    }

    // 1st tap on a new tile: focus unit if present, otherwise tile/city
    this.selectCoord(coord, clickedUnit ? 'unit' : 'tile');
  }

  private switchSelectionLayer(layer: SelectionLayer): void {
    if (!this.state || !this.selectedCoord) return;
    const tile = getTile(this.state, this.selectedCoord.x, this.selectedCoord.y);
    const human = getPlayer(this.state, this.humanPlayerId);
    if (!tile || !human) return;

    const unitOnTile = this.getUnitAtCoord(this.selectedCoord);
    if (layer === 'unit' && !unitOnTile) return;
    if (layer === 'tile' && !this.hasTileUnderlay(tile, human) && unitOnTile) return;

    this.selectCoord(this.selectedCoord, layer);
  }

  private handleTileHover(coord: Coord | null): void {
    this.hoveredCoord = coord;
    this.board?.setHoverTile(coord);
    if (!this.state || this.isBusy || this.isAITurnRunning) return;
    this.refreshActionBar();
  }

  private selectCoord(coord: Coord, preferredLayer?: SelectionLayer): void {
    if (!this.state) return;
    const tile = getTile(this.state, coord.x, coord.y);
    const human = getPlayer(this.state, this.humanPlayerId);
    if (!tile || !human) {
      this.clearSelection();
      return;
    }

    const unitOnTile = this.getUnitAtCoord(coord);
    const hasUnderlay = this.hasTileUnderlay(tile, human);

    let resolvedLayer: SelectionLayer;
    if (preferredLayer === 'unit' && unitOnTile) {
      resolvedLayer = 'unit';
    } else if (preferredLayer === 'tile' && (hasUnderlay || !unitOnTile)) {
      resolvedLayer = 'tile';
    } else {
      resolvedLayer = unitOnTile ? 'unit' : 'tile';
    }

    this.selectedCoord = { x: coord.x, y: coord.y };
    this.selectionLayer = resolvedLayer;
    this.selectedUnitId = resolvedLayer === 'unit' && unitOnTile ? unitOnTile.id : null;
    this.validMoves = [];
    this.validAttacks = [];

    const attackOverlays: AttackTargetOverlay[] = [];
    const lethalCoords: Coord[] = [];

    if (
      resolvedLayer === 'unit' &&
      unitOnTile &&
      this.isHumanTurn() &&
      unitOnTile.ownerId === this.humanPlayerId
    ) {
      this.validMoves = getValidMoves(this.state, unitOnTile.id);
      this.validAttacks = getValidAttackTargets(this.state, unitOnTile.id);

      for (const targetCoord of this.validAttacks) {
        const targetUnit = this.getUnitAtCoord(targetCoord);
        let lethal = false;
        if (targetUnit) {
          const preview = predictCombat(this.state, unitOnTile.id, targetUnit.id);
          lethal = preview.defenderKilled;
        }
        attackOverlays.push({ x: targetCoord.x, y: targetCoord.y, lethal });
        if (lethal) {
          lethalCoords.push({ x: targetCoord.x, y: targetCoord.y });
        }
      }
    }

    this.board?.setSelectedTile(this.selectedCoord);
    this.board?.setMoveTargets(this.validMoves);
    this.board?.setAttackTargets(attackOverlays);

    // Show snug City Nameplate only when focused on the 'tile' (city) layer so unit selection stays clean
    const badgeSelectedCoord = resolvedLayer === 'tile' ? this.selectedCoord : null;
    this.badges?.setSelectedCoord(badgeSelectedCoord);
    this.badges?.setLethalTargets(lethalCoords);

    triggerAndroidHaptic('select');
    this.refreshActionBar();
  }

  private reselectUnitIfActive(unitId: string): void {
    if (!this.state || this.state.phase !== 'playing') {
      this.clearSelection();
      return;
    }
    const unit = this.state.units[unitId];
    if (!unit || unit.ownerId !== this.humanPlayerId) {
      this.clearSelection();
      return;
    }

    if (hasUnitRemainingActions(this.state, unit.id)) {
      this.selectCoord({ x: unit.x, y: unit.y }, 'unit');
    } else {
      this.clearSelection();
    }
  }

  private clearSelection(): void {
    this.selectedCoord = null;
    this.selectedUnitId = null;
    this.selectionLayer = 'unit';
    this.validMoves = [];
    this.validAttacks = [];
    this.board?.clearHighlights();
    this.badges?.setSelectedCoord(null);
    this.badges?.setLethalTargets([]);
    this.refreshActionBar();
  }

  private async handleHumanAction(action: GameAction): Promise<void> {
    if (!this.state || this.isBusy || this.isAITurnRunning) return;
    if (!this.isHumanTurn()) return;

    const token = this.sessionToken;
    this.isBusy = true;
    this.input?.setInputLocked(true);

    try {
      const { state: nextState, events } = applyAction(this.state, action);
      this.state = nextState;

      let hapticStyle: 'tap' | 'combat' | 'capture' | 'victory' = 'tap';
      for (const ev of events) {
        if (ev.type === 'GAME_OVER' && ev.winnerId === this.humanPlayerId) {
          hapticStyle = 'victory';
          break;
        }
        if (ev.type === 'CITY_CAPTURED' || ev.type === 'CITY_LEVELED' || ev.type === 'RUINS_CLAIMED') {
          hapticStyle = 'capture';
        } else if (ev.type === 'UNIT_ATTACKED' && hapticStyle === 'tap') {
          hapticStyle = 'combat';
        }
      }
      triggerAndroidHaptic(hapticStyle);

      for (const ev of events) {
        if (ev.type === 'RUINS_CLAIMED' && ev.playerId === this.humanPlayerId) {
          this.showRuinsRewardToast(ev, nextState);
        }
      }

      if (this.animQueue) {
        await this.animQueue.playEvents(events, nextState, this.humanPlayerId, 1.0);
      }
      if (token !== this.sessionToken) return;

      const badgeCoord =
        this.selectedCoord && this.selectionLayer === 'tile' ? this.selectedCoord : null;
      this.board?.syncState(nextState, this.humanPlayerId);
      this.badges?.syncState(nextState, this.humanPlayerId, badgeCoord);

      if (action.type === 'CAPTURE_CITY' || action.type === 'EXPLORE_RUINS') {
        this.clearSelection();
      } else if (this.selectedCoord) {
        this.selectCoord(this.selectedCoord, this.selectionLayer);
      } else {
        this.board?.clearHighlights();
        this.badges?.setLethalTargets([]);
      }

      this.refreshHUD();
      await this.showEliminationNotices(events, nextState, token);
      if (token !== this.sessionToken) return;
      this.checkPostActionState();
    } finally {
      if (token === this.sessionToken) {
        this.isBusy = false;
        if (!this.isAITurnRunning && this.state?.phase === 'playing') {
          this.input?.setInputLocked(false);
        }
      }
    }
  }

  private async handleCityRewardChoice(cityId: string, reward: CityRewardChoice): Promise<void> {
    await this.handleHumanAction({
      type: 'CHOOSE_CITY_REWARD',
      cityId,
      reward,
    });
  }

  private async handleEndTurn(): Promise<void> {
    if (!this.state || this.isBusy || this.isAITurnRunning) return;
    if (!this.isHumanTurn()) return;

    if (this.openNextPendingCityReward()) {
      return;
    }

    triggerAndroidHaptic('tap');

    const token = this.sessionToken;
    this.techModal.close();
    this.factionDossierModal.close();
    this.leaderboardModal.close();
    this.clearSelection();

    this.isAITurnRunning = true;
    this.input?.setInputLocked(true);

    try {
      const endRes = applyAction(this.state, { type: 'END_TURN' });
      this.state = endRes.state;
      if (this.animQueue && endRes.events.length > 0) {
        await this.animQueue.playEvents(endRes.events, this.state, this.humanPlayerId, 1.2);
      }
      if (token !== this.sessionToken) return;

      this.board?.syncState(this.state, this.humanPlayerId);
      this.badges?.syncState(this.state, this.humanPlayerId, null);
      this.refreshActionBar();
      this.refreshTopBar();
      await this.showEliminationNotices(endRes.events, this.state, token);
      if (token !== this.sessionToken || !this.state) return;

      let safetyTurns = 0;
      let boardNeedsSync = false;
      while (
        this.state &&
        this.state.phase === 'playing' &&
        !getActivePlayer(this.state).isHuman &&
        safetyTurns < 12
      ) {
        safetyTurns += 1;
        const aiPlayer = getActivePlayer(this.state);
        this.refreshTopBar();
        await sleep(110);
        if (token !== this.sessionToken || !this.state) return;

        const plannedActions = planAITurn(this.state, aiPlayer.id, this.state.config.difficulty);
        const actions =
          plannedActions.length > 0 && plannedActions[plannedActions.length - 1].type === 'END_TURN'
            ? plannedActions
            : [...plannedActions, { type: 'END_TURN' as const }];

        for (const aiAction of actions) {
          if (token !== this.sessionToken || !this.state) return;
          if (this.state.phase !== 'playing') break;
          if (getActivePlayer(this.state).id !== aiPlayer.id) break;

          const prevState = this.state;
          const { state: nextState, events } = applyAction(prevState, aiAction);
          this.state = nextState;

          const isVisible = this.hasVisibleEventsForHuman(events, nextState);
          if (isVisible) {
            if (boardNeedsSync) {
              this.board?.syncState(prevState, this.humanPlayerId);
              this.badges?.syncState(prevState, this.humanPlayerId, null);
              boardNeedsSync = false;
            }
            this.focusOnVisibleAction(events, nextState);

            if (this.animQueue && events.length > 0) {
              await this.animQueue.playEvents(events, nextState, this.humanPlayerId, 1.5);
            }
            if (token !== this.sessionToken) return;

            this.board?.syncState(nextState, this.humanPlayerId);
            this.badges?.syncState(nextState, this.humanPlayerId, null);
            this.refreshTopBar();

            await this.showEliminationNotices(events, nextState, token);
            if (token !== this.sessionToken) return;
          } else {
            boardNeedsSync = true;
          }
        }
      }

      if (token !== this.sessionToken || !this.state) return;

      this.readyUnitCycleIndex = 0;
      this.board?.syncState(this.state, this.humanPlayerId);
      this.badges?.syncState(this.state, this.humanPlayerId, null);
      this.refreshHUD();
      this.checkPostActionState();
    } finally {
      if (token === this.sessionToken) {
        this.isAITurnRunning = false;
        if (this.state?.phase === 'playing') {
          this.input?.setInputLocked(false);
        }
        this.refreshHUD();
      }
    }
  }

  private hasVisibleEventsForHuman(events: GameEvent[], state: GameState): boolean {
    const human = getPlayer(state, this.humanPlayerId);
    if (!human) return true;
    const isVisible = (coord: Coord): boolean =>
      Boolean(human.revealedTiles[tileIndex(coord.x, coord.y, state.mapSize)]);

    for (const ev of events) {
      switch (ev.type) {
        case 'PLAYER_ELIMINATED':
        case 'GAME_OVER':
        case 'CITY_CAPTURED':
          return true;
        case 'TILES_REVEALED':
          if (ev.playerId === this.humanPlayerId && ev.coords.length > 0) return true;
          break;
        case 'UNIT_MOVED':
        case 'UNIT_ATTACKED':
          if (isVisible(ev.from) || isVisible(ev.to)) return true;
          break;
        case 'UNIT_HEALED':
        case 'UNIT_PROMOTED':
        case 'UNIT_TRAINED':
        case 'RESOURCE_HARVESTED':
        case 'IMPROVEMENT_BUILT':
        case 'ROAD_BUILT':
        case 'FOREST_CHOPPED':
        case 'WOODS_PLANTED':
        case 'RUINS_CLAIMED':
        case 'CITY_LEVELED':
        case 'CITY_REWARD_APPLIED':
        case 'SPOILS_GAINED':
          if (isVisible(ev.coord)) return true;
          break;
        default:
          break;
      }
    }
    return false;
  }

  private async showEliminationNotices(
    events: GameEvent[],
    state: GameState,
    token: number,
  ): Promise<void> {
    const elimEvents = events.filter(
      (ev): ev is Extract<GameEvent, { type: 'PLAYER_ELIMINATED' }> =>
        ev.type === 'PLAYER_ELIMINATED',
    );
    if (elimEvents.length === 0) return;

    for (const ev of elimEvents) {
      if (token !== this.sessionToken) return;
      const defeated = getPlayer(state, ev.playerId);
      const victor = getPlayer(state, ev.eliminatedByPlayerId);
      if (defeated && victor) {
        await this.defeatNoticeModal.show(defeated.faction, victor.faction);
      }
    }
  }

  private focusOnVisibleAction(events: GameEvent[], state: GameState): void {
    if (!this.sceneManager) return;
    const human = getPlayer(state, this.humanPlayerId);
    if (!human) return;

    for (const ev of events) {
      if (ev.type === 'UNIT_ATTACKED') {
        const visibleTo = human.revealedTiles[tileIndex(ev.to.x, ev.to.y, state.mapSize)];
        const visibleFrom = human.revealedTiles[tileIndex(ev.from.x, ev.from.y, state.mapSize)];
        if (visibleTo || visibleFrom) {
          this.sceneManager.focusOnWorld(tileToWorld(ev.to.x, ev.to.y, state.mapSize, 0), false);
          return;
        }
      } else if (ev.type === 'CITY_CAPTURED') {
        if (human.revealedTiles[tileIndex(ev.coord.x, ev.coord.y, state.mapSize)]) {
          this.sceneManager.focusOnWorld(tileToWorld(ev.coord.x, ev.coord.y, state.mapSize, 0), false);
          return;
        }
      }
    }
  }

  private checkPostActionState(): void {
    if (!this.state) return;
    if (this.state.phase === 'game_over') {
        this.techModal.close();
      this.cityRewardModal.close();
      this.factionDossierModal.close();
      this.leaderboardModal.close();
      this.hideRewardToast();
      this.actionBar.hide();
      this.clearSelection();
      this.input?.setInputLocked(true);
      this.gameOverOverlay.show({
        state: this.state,
        humanPlayerId: this.humanPlayerId,
      });
      return;
    }

    if (this.isHumanTurn()) {
      this.openNextPendingCityReward();
    }
  }

  private openNextPendingCityReward(): boolean {
    if (!this.state || this.cityRewardModal.isOpen()) return false;
    const human = getPlayer(this.state, this.humanPlayerId);
    if (!human) return false;

    const cityWithReward = getPlayerCities(this.state, this.humanPlayerId).find(
      (c) => c.pendingLevelRewards.length > 0,
    );
    if (!cityWithReward) return false;

    this.cityRewardModal.open({
      city: cityWithReward,
      levelReached: cityWithReward.pendingLevelRewards[0],
      faction: human.faction,
    });
    return true;
  }

  private openTechModal(): void {
    if (!this.state) return;
    triggerAndroidHaptic('tap');
    this.factionDossierModal.close();
    this.leaderboardModal.close();
    const vm = this.buildTechModalViewModel();
    if (vm) {
      this.techModal.open(vm);
      this.pauseSceneBehindOpaqueSheet();
    }
  }

  /**
   * Android WebView: the Codex sheet is a full opaque scrollable layer. Stop the WebGL RAF loop
   * behind it so Chromium's compositor is not invalidating tiles under a scrolling layer
   * (also saves battery). No-op in desktop/mobile browsers.
   */
  private pauseSceneBehindOpaqueSheet(): void {
    if (!window.EldermereAndroid) return;
    this.sceneManager?.stop();
  }

  private resumeSceneAfterOpaqueSheet(): void {
    if (!window.EldermereAndroid) return;
    this.sceneManager?.start();
  }

  private openFactionDossier(focusFaction?: FactionId): void {
    if (!this.state) return;
    triggerAndroidHaptic('tap');
    this.techModal.close();
    this.leaderboardModal.close();
    const vm = this.buildFactionDossierViewModel();
    if (vm) {
      this.factionDossierModal.open(vm, focusFaction);
    }
  }

  private openLeaderboardModal(): void {
    if (!this.state) return;
    triggerAndroidHaptic('tap');
    this.techModal.close();
    this.factionDossierModal.close();
    const vm = this.buildLeaderboardViewModel();
    if (vm) {
      this.leaderboardModal.open(vm);
    }
  }

  private buildLeaderboardViewModel(): LeaderboardModalViewModel | null {
    if (!this.state) return null;
    return {
      entries: getLeaderboard(this.state),
      turn: this.state.turn,
      maxTurns: this.state.config.maxTurns,
    };
  }

  private showRuinsRewardToast(
    ev: Extract<GameEvent, { type: 'RUINS_CLAIMED' }>,
    state: GameState,
  ): void {
    let rewardHtml = '';
    if (ev.rewardKind === 'gold') {
      const amount = ev.amount ?? 5;
      rewardHtml = `<strong class="toast-reward-highlight">+${amount}${renderIcon('star', 'icon icon-sm icon-star')}</strong><span>Treasury Found</span>`;
    } else if (ev.rewardKind === 'tech') {
      const techName = ev.techId ? (TECH_DEFINITIONS[ev.techId]?.name ?? ev.techId) : 'Ancient Lore';
      const safeName = techName
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      rewardHtml = `<strong class="toast-reward-highlight">${safeName}</strong><span>Lore Unlocked</span>`;
    } else {
      const amount = ev.amount ?? 3;
      const cityName = ev.cityId ? state.cities[ev.cityId]?.name : undefined;
      const safeCity = cityName
        ? cityName.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        : 'Nearest City';
      rewardHtml = `<strong class="toast-reward-highlight">+${amount} Pop</strong><span>to ${safeCity}</span>`;
    }

    this.rewardToastEl.innerHTML = `
      <span class="toast-ruins-icon">${renderIcon('ruins', 'icon')}</span>
      <span class="toast-ruins-body">
        <span class="toast-ruins-kicker">Ancient Ruins Explored</span>
        <span class="toast-ruins-line">${rewardHtml}</span>
      </span>
    `;

    this.rewardToastEl.classList.remove('hidden', 'toast-show');
    // Force reflow so rapid consecutive explorations replay the pop animation
    void this.rewardToastEl.offsetWidth;
    this.rewardToastEl.classList.add('toast-show');

    if (this.rewardToastTimer !== null) {
      window.clearTimeout(this.rewardToastTimer);
    }
    this.rewardToastTimer = window.setTimeout(() => {
      this.hideRewardToast();
    }, 3000);
  }

  private hideRewardToast(): void {
    if (this.rewardToastTimer !== null) {
      window.clearTimeout(this.rewardToastTimer);
      this.rewardToastTimer = null;
    }
    this.rewardToastEl.classList.remove('toast-show');
    this.rewardToastEl.classList.add('hidden');
  }

  private buildFactionDossierViewModel(): FactionDossierModalViewModel | null {
    if (!this.state) return null;
    const human = getPlayer(this.state, this.humanPlayerId);
    if (!human) return null;
    return {
      humanPlayer: human,
      allPlayers: this.state.players,
    };
  }

  private buildTechModalViewModel(): TechModalViewModel | null {
    if (!this.state) return null;
    const human = getPlayer(this.state, this.humanPlayerId);
    if (!human) return null;

    const factionTechs = getFactionTechs(human.faction);
    const techCosts: Partial<Record<TechId, number>> = {};
    for (const tech of factionTechs) {
      techCosts[tech.id] = getTechCost(this.state, human.id, tech.id);
    }

    return {
      player: human,
      cityCount: getPlayerCities(this.state, human.id).length,
      isHumanTurn: this.isHumanTurn(),
      techCosts,
    };
  }

  private refreshHUD(): void {
    this.refreshTopBar();
    this.refreshActionBar();
    if (this.techModal.isOpen()) {
      const vm = this.buildTechModalViewModel();
      if (vm) this.techModal.update(vm);
    }
    if (this.factionDossierModal.isOpen()) {
      const vm = this.buildFactionDossierViewModel();
      if (vm) this.factionDossierModal.update(vm);
    }
    if (this.leaderboardModal.isOpen()) {
      const vm = this.buildLeaderboardViewModel();
      if (vm) this.leaderboardModal.update(vm);
    }
  }

  private refreshTopBar(): void {
    if (!this.state) return;
    const human = getPlayer(this.state, this.humanPlayerId);
    if (!human) return;

    const activePlayer = getActivePlayer(this.state);
    const isHuman = activePlayer.id === human.id && this.state.phase === 'playing';

    this.topBar.update({
      player: human,
      activePlayer,
      turn: this.state.turn,
      maxTurns: this.state.config.maxTurns,
      isHumanTurn: isHuman,
    });
  }

  private refreshActionBar(): void {
    if (!this.state || this.state.phase !== 'playing') {
      this.actionBar.hide();
      return;
    }

    const human = getPlayer(this.state, this.humanPlayerId);
    if (!human) return;

    const isHuman = this.isHumanTurn();
    const factionTechs = getFactionTechs(human.faction);
    const affordableTechCount = factionTechs.filter((t) =>
      canResearchTech(this.state!, human.id, t.id),
    ).length;
    const remainingUnitsCount = this.getReadyHumanUnits().length;
    const combatPreview = this.buildCombatPreview();

    if (!this.selectedCoord) {
      this.actionBar.update({
        isHumanTurn: isHuman,
        playerFaction: human.faction,
        playerGold: human.gold,
        hasAffordableTech: affordableTechCount > 0,
        affordableTechCount,
        remainingUnitsCount,
        allUnitsActed: remainingUnitsCount === 0,
        selectionLayer: 'unit',
        canToggleLayer: false,
        altLayerLabel: 'Tile',
        selectedUnit: null,
        selectedCity: null,
        selectedTile: null,
        combatPreview,
      });
      return;
    }

    const tile = getTile(this.state, this.selectedCoord.x, this.selectedCoord.y);
    if (!tile) return;

    const unitOnTile = this.getUnitAtCoord(this.selectedCoord);
    const selectedUnit = unitOnTile ? this.buildSelectedUnitInfo(unitOnTile.id) : null;
    const selectedCity =
      tile.isCityCenter && tile.cityId ? this.buildSelectedCityInfo(tile.cityId) : null;
    const selectedTile = this.buildSelectedTileInfo(tile, human);
    const canToggleLayer = Boolean(unitOnTile && this.hasTileUnderlay(tile, human));
    const altLayerLabel: 'City' | 'Tile' = selectedCity ? 'City' : 'Tile';

    const vm: ActionBarViewModel = {
      isHumanTurn: isHuman,
      playerFaction: human.faction,
      playerGold: human.gold,
      hasAffordableTech: affordableTechCount > 0,
      affordableTechCount,
      remainingUnitsCount,
      allUnitsActed: remainingUnitsCount === 0,
      selectionLayer: this.selectionLayer,
      canToggleLayer,
      altLayerLabel,
      selectedUnit,
      selectedCity,
      selectedTile,
      combatPreview,
    };
    this.actionBar.update(vm);
  }

  private buildCombatPreview(): CombatPreviewDisplay | null {
    if (
      !this.state ||
      this.selectionLayer !== 'unit' ||
      !this.selectedUnitId ||
      !this.hoveredCoord ||
      !this.isHumanTurn()
    ) {
      return null;
    }
    const isAttackable = this.validAttacks.some(
      (a) => a.x === this.hoveredCoord!.x && a.y === this.hoveredCoord!.y,
    );
    if (!isAttackable) return null;

    const hoveredTile = getTile(this.state, this.hoveredCoord.x, this.hoveredCoord.y);
    if (!hoveredTile?.unitId) return null;

    const attacker = this.state.units[this.selectedUnitId];
    const defender = this.state.units[hoveredTile.unitId];
    if (!attacker || !defender || defender.ownerId === attacker.ownerId) return null;

    const attackerOwner = getPlayer(this.state, attacker.ownerId);
    const defenderOwner = getPlayer(this.state, defender.ownerId);
    if (!attackerOwner || !defenderOwner) return null;

    const preview = predictCombat(this.state, attacker.id, defender.id);
    const targetIsCityOrVillage = Boolean(hoveredTile.isCityCenter || hoveredTile.hasVillage);
    return { preview, attacker, attackerOwner, defender, defenderOwner, targetIsCityOrVillage };
  }

  private buildSelectedUnitInfo(unitId: string): SelectedUnitInfo | null {
    if (!this.state) return null;
    const unit = this.state.units[unitId];
    if (!unit) return null;
    const owner = getPlayer(this.state, unit.ownerId);
    if (!owner) return null;

    const tile = getTile(this.state, unit.x, unit.y);
    const baseDef = UNIT_DEFINITIONS[unit.type];
    const roadBonus = owner.faction === 'humans' && tile?.hasRoad ? 1 : 0;
    const rohirrimBonus =
      owner.techs.includes('humans_ride_of_rohirrim') &&
      (unit.type === 'rider' || unit.type === 'rohirrim_knight')
        ? 1
        : 0;
    const isOwnedByHuman = unit.ownerId === this.humanPlayerId;

    return {
      unit,
      owner,
      isOwnedByHuman,
      effectiveAttack: getEffectiveAttack(this.state, unit),
      effectiveDefense: getEffectiveDefense(this.state, unit),
      effectiveMovement: baseDef.movement + roadBonus + rohirrimBonus,
      actions: isOwnedByHuman ? getUnitActionOptions(this.state, unit.id) : [],
    };
  }

  private buildSelectedCityInfo(cityId: string): SelectedCityInfo | null {
    if (!this.state) return null;
    const city: City | undefined = this.state.cities[cityId];
    if (!city) return null;
    const owner = getPlayer(this.state, city.ownerId);
    if (!owner) return null;

    const isOwnedByHuman = city.ownerId === this.humanPlayerId;
    const unitCount = getCityUnitCount(this.state, city.id);
    const unitCap = getCityUnitCap(this.state, city);
    const cityTile = getTile(this.state, city.x, city.y);
    const occupiedByUnit = Boolean(cityTile?.unitId);
    const income =
      city.level +
      (city.isCapital ? 1 : 0) +
      (city.hasWorkshop ? 1 : 0) +
      city.parks +
      (city.connectedToCapital && !city.isCapital && owner.faction === 'humans' ? 1 : 0) +
      (city.level >= 3 && owner.techs.includes('humans_granaries') ? 1 : 0) +
      (city.hasWalls && owner.techs.includes('humans_citadel_masonry') ? 1 : 0) +
      (owner.techs.includes('humans_stewards_citadel') ? 1 : 0) +
      (owner.techs.includes('dwarves_deep_vaults') ? 1 : 0);

    return {
      city,
      owner,
      isOwnedByHuman,
      unitCount,
      unitCap,
      income,
      popNeeded: city.level + 1,
      occupiedByUnit,
      trainOptions: isOwnedByHuman ? getCityTrainOptions(this.state, city.id) : [],
    };
  }

  private buildSelectedTileInfo(tile: Tile, human: PlayerState): SelectedTileInfo {
    const state = this.state!;
    const isRevealed = Boolean(human.revealedTiles[tileIndex(tile.x, tile.y, state.mapSize)]);

    let defenseBonus = 1.0;
    if (tile.terrain === 'mountain') {
      defenseBonus = human.faction === 'dwarves' ? 1.75 : 1.5;
    } else if (tile.terrain === 'forest' || tile.terrain === 'ancient_woods') {
      defenseBonus = 1.5;
    }
    if (tile.isCityCenter && tile.cityId) {
      const city = state.cities[tile.cityId];
      if (city?.hasWalls) defenseBonus = 2.0;
    }

    const actions = getTileActionOptions(state, human.id, tile.x, tile.y);

    return {
      tile,
      terrainName: TERRAIN_NAMES[tile.terrain],
      defenseBonus,
      isRevealed,
      actions,
    };
  }
}
