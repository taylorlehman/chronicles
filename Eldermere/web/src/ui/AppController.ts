import { planAITurn } from '../ai';
import {
  TECH_DEFINITIONS,
  UNIT_DEFINITIONS,
  applyAction,
  canResearchTech,
  canUnitCapture,
  canUnitExploreRuins,
  createGame,
  createTutorialGame,
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
  type ResourceType,
  type TechId,
  type TerrainType,
  type Tile,
  type TutorialScenarioCoords,
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
import {
  GameOverOverlay,
  ResignationOverlay,
  TitleScreen,
  type StartGameOptions,
} from './Screens';
import { TechModal, type TechModalViewModel } from './TechModal';
import { TopBar } from './TopBar';
import {
  TutorialController,
  type TutorialBannerContext,
  type TutorialStage,
} from './TutorialController';
import { notifyAndroidGameReady, triggerAndroidHaptic } from './androidBridge';
import { renderIcon } from './icons';
import {
  clearSavedCampaign,
  getSavedCampaignSummary,
  isTutorialCompleted,
  loadSavedCampaign,
  saveCampaign,
} from './persistence';

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
  private readonly resignationOverlay: ResignationOverlay;
  private readonly topBar: TopBar;
  private readonly actionBar: ActionBar;
  private readonly techModal: TechModal;
  private readonly cityRewardModal: CityRewardModal;
  private readonly defeatNoticeModal: DefeatNoticeModal;
  private readonly factionDossierModal: FactionDossierModal;
  private readonly leaderboardModal: LeaderboardModal;
  private readonly tutorial: TutorialController;
  private readonly rewardToastEl: HTMLDivElement;
  private rewardToastTimer: number | null = null;
  private readonly onPagePersistBound: () => void;
  private readonly onVisibilityPersistBound: () => void;

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
  private tutorialScenario: TutorialScenarioCoords | null = null;
  private pendingEndTurnAfterTutorial = false;

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
    this.onPagePersistBound = () => this.persistActiveCampaign();
    this.onVisibilityPersistBound = () => {
      if (document.visibilityState === 'hidden') {
        this.persistActiveCampaign();
      }
    };

    this.titleScreen = new TitleScreen(this.hudRoot, {
      onStartGame: (options) => this.startGame(options),
      onResumeGame: () => this.resumeSavedCampaign(),
      onSelectFaction: (faction) => {
        triggerAndroidHaptic('tap');
        this.applyFactionTheme(faction);
        this.focusTitleOnFaction(faction, false);
      },
    });

    this.gameOverOverlay = new GameOverOverlay(this.hudRoot, {
      onPlayAgain: () => this.returnToTitle(),
    });

    this.resignationOverlay = new ResignationOverlay(this.hudRoot, {
      onReturnToTitle: () => this.returnToTitle(),
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
        this.resumeSceneAfterOpaqueSheet();
      },
    });

    this.leaderboardModal = new LeaderboardModal(this.hudRoot, {
      onSelectFaction: (faction) => {
        this.leaderboardModal.close();
        this.openFactionDossier(faction);
      },
      onEndTutorial: () => {
        triggerAndroidHaptic('tap');
        this.pendingEndTurnAfterTutorial = false;
        this.tutorialScenario = null;
        this.tutorial.endTutorial(true);
        this.persistActiveCampaign();
        const vm = this.buildLeaderboardViewModel();
        if (vm) this.leaderboardModal.update(vm);
      },
      onResign: () => this.handleResignCampaign(),
      onClose: () => {
        this.resumeSceneAfterOpaqueSheet();
      },
    });

    this.tutorial = new TutorialController(this.hudRoot, {
      onStageChange: () => {
        this.persistActiveCampaign();
      },
      onStartTutorial: () => {
        triggerAndroidHaptic('tap');
        this.syncTutorialContext();
        this.focusTutorialCameraForStage('upgrade');
        this.syncTutorialProgress();
        this.resumeSceneAfterOpaqueSheet();
      },
      onCompleteDismiss: () => {
        triggerAndroidHaptic('tap');
        const shouldFinishTurn = this.pendingEndTurnAfterTutorial;
        this.pendingEndTurnAfterTutorial = false;
        this.tutorialScenario = null;
        this.persistActiveCampaign();
        this.resumeSceneAfterOpaqueSheet();
        this.refreshHUD();
        if (shouldFinishTurn) {
          void this.handleEndTurn();
        }
      },
      onEndTutorial: () => {
        this.pendingEndTurnAfterTutorial = false;
        this.tutorialScenario = null;
        this.persistActiveCampaign();
        this.refreshHUD();
      },
      onModalOpen: () => {
        this.pauseSceneBehindOpaqueSheet();
      },
      onModalClose: () => {
        this.resumeSceneAfterOpaqueSheet();
      },
    });

    this.rewardToastEl = document.createElement('div');
    this.rewardToastEl.className = 'ruins-reward-toast hidden';
    this.rewardToastEl.setAttribute('role', 'status');
    this.rewardToastEl.setAttribute('aria-live', 'polite');
    this.hudRoot.appendChild(this.rewardToastEl);

    this.titleScreen.setSavedCampaign(getSavedCampaignSummary());
    this.applyFactionTheme(this.titleScreen.getSelectedFaction());
    this.mountTitleDiorama();
    this.titleScreen.show();

    window.__eldermereHandleBack = this.onAndroidBackBound;
    window.__eldermereSetPaused = this.onAndroidSetPausedBound;
    window.addEventListener('pagehide', this.onPagePersistBound);
    document.addEventListener('visibilitychange', this.onVisibilityPersistBound);

    // Notify Android WebView after the Three.js scene has rendered its first frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        notifyAndroidGameReady();
      });
    });
  }

  private handleAndroidBack(): boolean {
    if (this.resignationOverlay.isOpen()) {
      this.resignationOverlay.hide();
      this.returnToTitle();
      triggerAndroidHaptic('tap');
      return true;
    }
    if (this.tutorial.isModalOpen()) {
      this.tutorial.dismissModal();
      triggerAndroidHaptic('tap');
      return true;
    }
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
      this.resumeSceneAfterOpaqueSheet();
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
    return (
      this.isTitleDioramaActive ||
      this.tutorial.isModalOpen() ||
      this.resignationOverlay.isOpen() ||
      this.techModal.isOpen() ||
      this.leaderboardModal.isOpen() ||
      this.factionDossierModal.isOpen() ||
      this.cityRewardModal.isOpen() ||
      this.defeatNoticeModal.isOpen()
    );
  }

  private setPaused(paused: boolean): void {
    if (paused) {
      this.persistActiveCampaign();
    }
    if (!this.sceneManager) return;
    if (paused) {
      this.sceneManager.stop();
    } else if (this.shouldKeepScenePausedForAndroid()) {
      this.sceneManager.renderOnce();
    } else {
      this.sceneManager.start();
    }
  }

  private persistActiveCampaign(): void {
    if (!this.state || !this.humanPlayerId) return;
    if (this.state.phase !== 'playing') {
      clearSavedCampaign();
      return;
    }
    const stageToSave = this.tutorial.getStage();
    saveCampaign(
      this.state,
      this.humanPlayerId,
      stageToSave === 'complete' ? null : stageToSave,
      stageToSave === 'complete' || stageToSave === null ? null : this.tutorialScenario,
    );
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
      this.tutorial.isModalOpen() ||
      this.resignationOverlay.isOpen() ||
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
    if (!isTutorialCompleted()) {
      const { state, scenario } = createTutorialGame({
        humanFaction: options.humanFaction,
        difficulty: options.difficulty,
        mapSize: options.mapSize,
        maxTurns: 0,
      });
      const humanPlayer = state.players.find((p) => p.isHuman) ?? state.players[0];
      this.mountActiveGame(state, humanPlayer.id, 'intro', scenario);
      return;
    }

    const seed = (Date.now() ^ Math.floor(Math.random() * 0x7fffffff)) >>> 0;
    const state = createGame({
      humanFaction: options.humanFaction,
      difficulty: options.difficulty,
      mapSize: options.mapSize,
      maxTurns: 0,
      seed,
    });
    const humanPlayer = state.players.find((p) => p.isHuman) ?? state.players[0];
    this.mountActiveGame(state, humanPlayer.id, null, null);
  }

  public resumeSavedCampaign(): void {
    const saved = loadSavedCampaign();
    if (!saved) {
      this.titleScreen.setSavedCampaign(null);
      return;
    }
    triggerAndroidHaptic('select');
    const tutorialStage: TutorialStage | null =
      !isTutorialCompleted() &&
      saved.tutorialStage !== null &&
      saved.tutorialStage !== 'complete'
        ? saved.tutorialStage
        : null;
    const tutorialScenario = tutorialStage !== null ? saved.tutorialScenario : null;
    this.mountActiveGame(saved.state, saved.humanPlayerId, tutorialStage, tutorialScenario);
  }

  private mountActiveGame(
    state: GameState,
    humanPlayerId: PlayerId,
    tutorialStage: TutorialStage | null,
    tutorialScenario: TutorialScenarioCoords | null,
  ): void {
    this.disposeSession();
    this.sessionToken += 1;

    this.state = state;
    const humanPlayer = getPlayer(state, humanPlayerId) ?? state.players[0];
    this.humanPlayerId = humanPlayer.id;
    this.readyUnitCycleIndex = 0;
    this.tutorialScenario = tutorialScenario;

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
        if (this.resignationOverlay.isOpen()) {
          this.resignationOverlay.hide();
          this.returnToTitle();
        } else if (this.tutorial.isModalOpen()) {
          this.tutorial.dismissModal();
        } else if (this.defeatNoticeModal.isOpen()) {
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
    sceneManager.renderOnce();
    sceneManager.start();

    this.titleScreen.hide();
    this.gameOverOverlay.hide();
    this.resignationOverlay.hide();
    this.topBar.show();
    this.actionBar.show();
    if (tutorialStage !== null) {
      this.syncTutorialContext();
      this.tutorial.start(tutorialStage, this.computeTutorialSubProgress(tutorialStage));
      if (tutorialStage !== 'intro') {
        this.focusTutorialCameraForStage(tutorialStage);
      }
    } else {
      this.tutorial.hide();
    }
    this.refreshHUD();
    this.persistActiveCampaign();
  }

  private handleResignCampaign(): void {
    if (!this.state || !this.humanPlayerId) {
      this.returnToTitle();
      return;
    }
    const human = getPlayer(this.state, this.humanPlayerId);
    const faction: FactionId = human?.faction ?? this.titleScreen.getSelectedFaction();
    const turn = this.state.turn;
    const citiesCount = getPlayerCities(this.state, this.humanPlayerId).length;
    const score = human?.score ?? 0;

    clearSavedCampaign();
    this.pendingEndTurnAfterTutorial = false;
    this.tutorialScenario = null;
    this.tutorial.hide();
    this.topBar.hide();
    this.actionBar.hide();
    this.techModal.close();
    this.cityRewardModal.close();
    this.defeatNoticeModal.close();
    this.factionDossierModal.close();
    this.leaderboardModal.close();
    this.hideRewardToast();
    this.clearSelection();
    this.input?.setInputLocked(true);

    this.pauseSceneBehindOpaqueSheet();
    this.resignationOverlay.show({
      faction,
      turn,
      citiesCount,
      score,
    });
  }

  public returnToTitle(): void {
    clearSavedCampaign();
    this.pendingEndTurnAfterTutorial = false;
    this.tutorialScenario = null;
    this.tutorial.hide();
    this.resignationOverlay.hide();
    this.topBar.hide();
    this.actionBar.hide();
    this.techModal.close();
    this.cityRewardModal.close();
    this.defeatNoticeModal.close();
    this.factionDossierModal.close();
    this.leaderboardModal.close();
    this.hideRewardToast();
    this.gameOverOverlay.hide();
    this.titleScreen.setSavedCampaign(getSavedCampaignSummary());
    this.applyFactionTheme(this.titleScreen.getSelectedFaction());
    this.mountTitleDiorama();
    this.titleScreen.show();
  }

  public destroy(): void {
    this.persistActiveCampaign();
    window.removeEventListener('pagehide', this.onPagePersistBound);
    document.removeEventListener('visibilitychange', this.onVisibilityPersistBound);
    if (window.__eldermereHandleBack === this.onAndroidBackBound) {
      delete window.__eldermereHandleBack;
    }
    if (window.__eldermereSetPaused === this.onAndroidSetPausedBound) {
      delete window.__eldermereSetPaused;
    }
    this.disposeSession();
    this.hideRewardToast();
    this.rewardToastEl.remove();
    this.tutorial.destroy();
    this.titleScreen.destroy();
    this.gameOverOverlay.destroy();
    this.resignationOverlay.destroy();
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
    this.pendingEndTurnAfterTutorial = false;
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
      this.tutorial.isModalOpen() ||
      this.resignationOverlay.isOpen() ||
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

      // Strict tutorial gating: only show move/attack rings that advance the current tutorial step
      if (this.tutorial.isActive()) {
        this.validMoves = this.validMoves.filter((m) =>
          this.isActionAllowedByTutorial({ type: 'MOVE_UNIT', unitId: unitOnTile.id, to: m }),
        );
        this.validAttacks = this.validAttacks.filter((a) => {
          const targetUnit = this.getUnitAtCoord(a);
          return Boolean(
            targetUnit &&
              this.isActionAllowedByTutorial({
                type: 'ATTACK_UNIT',
                attackerId: unitOnTile.id,
                defenderId: targetUnit.id,
              }),
          );
        });
      }

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

    if (!this.isActionAllowedByTutorial(action)) {
      triggerAndroidHaptic('tap');
      this.tutorial.nudge(this.getTutorialNudgeForCurrentStage());
      return;
    }

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
      this.advanceTutorialAfterAction(action, nextState);
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
    this.resumeSceneAfterOpaqueSheet();
    await this.handleHumanAction({
      type: 'CHOOSE_CITY_REWARD',
      cityId,
      reward,
    });
  }

  private focusTutorialCameraForStage(stage: TutorialStage): void {
    if (!this.state || !this.sceneManager) return;
    const scenario = this.tutorialScenario;
    if (!scenario) return;

    let target: Coord | null = null;
    if (stage === 'upgrade') {
      target = scenario.capitalCoord;
    } else if (stage === 'move') {
      target = {
        x: (scenario.capitalCoord.x + scenario.moveTargetCoord.x) * 0.5,
        y: (scenario.capitalCoord.y + scenario.moveTargetCoord.y) * 0.5,
      };
    } else if (stage === 'combat' || stage === 'capture') {
      target = scenario.villageCoord;
    }

    if (target) {
      this.sceneManager.focusOnWorld(tileToWorld(target.x, target.y, this.state.mapSize, 0), false);
    }
  }

  private isActionAllowedByTutorial(action: GameAction): boolean {
    if (!this.tutorial.isActive()) return true;
    const stage = this.tutorial.getStage();
    const scenario = this.tutorialScenario;
    if (!stage || stage === 'intro') return false;

    if (stage === 'upgrade') {
      if (action.type === 'CHOOSE_CITY_REWARD') return true;
      if (action.type === 'HARVEST_TILE') {
        if (!scenario) return true;
        return scenario.resourceCoords.some(
          (rc) => rc.x === action.coord.x && rc.y === action.coord.y,
        );
      }
      return false;
    }

    if (stage === 'move') {
      if (action.type !== 'MOVE_UNIT') return false;
      if (!scenario) return true;
      return (
        action.unitId === scenario.starterUnitId &&
        action.to.x === scenario.moveTargetCoord.x &&
        action.to.y === scenario.moveTargetCoord.y
      );
    }

    if (stage === 'combat') {
      if (action.type !== 'ATTACK_UNIT') return false;
      if (!scenario) return true;
      return action.attackerId === scenario.starterUnitId && action.defenderId === scenario.enemyUnitId;
    }

    if (stage === 'capture') {
      if (action.type !== 'CAPTURE_CITY') return false;
      if (!scenario) return true;
      return action.unitId === scenario.starterUnitId;
    }

    if (stage === 'codex') {
      if (action.type !== 'RESEARCH_TECH') return false;
      const targetTechId = this.getTutorialTargetTechId();
      return !targetTechId || action.techId === targetTechId;
    }

    if (stage === 'end_turn') {
      return action.type === 'END_TURN';
    }

    return false;
  }

  private getTutorialNudgeForCurrentStage(): string {
    const stage = this.tutorial.getStage();
    switch (stage) {
      case 'upgrade':
        return 'Harvest both resource tiles in your borders and pick a City Reward first!';
      case 'move':
        return 'Tap your unit at your capital and move onto the glowing ring to the east!';
      case 'combat':
        return 'Tap the red target ring on the rival warrior guarding the Village!';
      case 'capture':
        return 'Tap the glowing Capture button on the Village to claim your second city!';
      case 'codex': {
        const targetTechId = this.getTutorialTargetTechId();
        const targetTechName = targetTechId ? TECH_DEFINITIONS[targetTechId]?.name : null;
        return targetTechName
          ? `Tap the Codex medallion in the bottom-left and research ${targetTechName}!`
          : 'Tap the Codex medallion in the bottom-left and research a technology!';
      }
      case 'end_turn':
        return 'Eldermere is turn-based — tap End Turn in the bottom-right to finish the tutorial!';
      default:
        return 'Complete the current tutorial step to continue!';
    }
  }

  private getTutorialResourceInfo(
    state: GameState,
    human: PlayerState,
  ): { resourceThumbKey: string; resourceLabel: string } {
    let resource: ResourceType | null = null;
    if (this.tutorialScenario) {
      for (const coord of this.tutorialScenario.resourceCoords) {
        const tile = getTile(state, coord.x, coord.y);
        if (tile?.resource) {
          resource = tile.resource;
          break;
        }
      }
    }
    if (!resource) {
      resource = human.faction === 'dwarves' ? 'ore' : 'berries';
    }

    switch (resource) {
      case 'game':
        return { resourceThumbKey: 'game', resourceLabel: 'Wild Game' };
      case 'ore':
        return { resourceThumbKey: 'ore', resourceLabel: 'Ore Vein' };
      case 'mithril':
        return { resourceThumbKey: 'mithril', resourceLabel: 'Mithril Vein' };
      case 'berries':
      default:
        return { resourceThumbKey: 'berries', resourceLabel: 'Berries' };
    }
  }

  private getTutorialTargetTechId(): TechId | null {
    if (!this.state) return null;
    const human = getPlayer(this.state, this.humanPlayerId);
    if (!human) return null;

    const factionTechs = getFactionTechs(human.faction);
    const target = factionTechs.find((t) => canResearchTech(this.state!, human.id, t.id));
    return target?.id ?? null;
  }

  private syncTutorialContext(): void {
    if (!this.state) return;
    const human = getPlayer(this.state, this.humanPlayerId);
    if (!human) return;

    const { resourceThumbKey, resourceLabel } = this.getTutorialResourceInfo(this.state, human);
    const targetTechId = this.getTutorialTargetTechId();
    const targetTechName = targetTechId ? TECH_DEFINITIONS[targetTechId]?.name : undefined;

    const ctx: TutorialBannerContext = {
      faction: human.faction,
      resourceThumbKey,
      resourceLabel,
      targetTechId: targetTechId ?? undefined,
      targetTechName,
    };
    this.tutorial.setContext(ctx);
  }

  private computeTutorialSubProgress(stage: TutorialStage | null): string | null {
    if (!this.state || !stage) return null;

    if (stage === 'upgrade') {
      const capital = getPlayerCities(this.state, this.humanPlayerId).find((c) => c.isCapital);
      if (capital && capital.pendingLevelRewards.length > 0) {
        return 'Choose City Reward!';
      }
      if (this.tutorialScenario) {
        let harvested = 0;
        for (const coord of this.tutorialScenario.resourceCoords) {
          const tile = getTile(this.state, coord.x, coord.y);
          if (tile && !tile.resource) {
            harvested += 1;
          }
        }
        return `${harvested}/2 harvested`;
      }
      return null;
    }

    return null;
  }

  private syncTutorialProgress(): void {
    const stage = this.tutorial.getStage();
    if (!stage) return;
    this.tutorial.setSubProgress(this.computeTutorialSubProgress(stage));
  }

  private advanceTutorialAfterAction(action: GameAction, nextState: GameState): void {
    const stage = this.tutorial.getStage();
    if (!stage || stage === 'intro' || stage === 'complete') return;

    if (stage === 'upgrade') {
      if (action.type === 'HARVEST_TILE') {
        this.syncTutorialContext();
        this.syncTutorialProgress();
      } else if (action.type === 'CHOOSE_CITY_REWARD') {
        const capital = getPlayerCities(nextState, this.humanPlayerId).find((c) => c.isCapital);
        if (capital && capital.level >= 2) {
          this.tutorial.setStage('move', null);
          this.focusTutorialCameraForStage('move');
          if (this.tutorialScenario) {
            this.selectCoord(this.tutorialScenario.capitalCoord, 'unit');
          }
        } else {
          this.syncTutorialProgress();
        }
      }
      return;
    }

    if (stage === 'move') {
      if (action.type === 'MOVE_UNIT') {
        this.tutorial.setStage('combat', null);
        this.focusTutorialCameraForStage('combat');
        if (this.tutorialScenario) {
          this.selectCoord(this.tutorialScenario.moveTargetCoord, 'unit');
        }
      }
      return;
    }

    if (stage === 'combat') {
      if (action.type === 'ATTACK_UNIT') {
        const scenario = this.tutorialScenario;
        if (scenario) {
          const starter = nextState.units[scenario.starterUnitId];
          const vTile = getTile(nextState, scenario.villageCoord.x, scenario.villageCoord.y);
          if (starter && vTile) {
            if (starter.x !== scenario.villageCoord.x || starter.y !== scenario.villageCoord.y) {
              const oldTile = getTile(nextState, starter.x, starter.y);
              if (oldTile && oldTile.unitId === starter.id) {
                oldTile.unitId = null;
              }
              starter.x = scenario.villageCoord.x;
              starter.y = scenario.villageCoord.y;
              vTile.unitId = starter.id;
            }
            starter.canCapture = true;
            starter.actedThisTurn = false;
            starter.hasMoved = false;
            starter.hasAttacked = false;
            this.board?.syncState(nextState, this.humanPlayerId);
            this.badges?.syncState(nextState, this.humanPlayerId, null);
          }
        }
        this.tutorial.setStage('capture', null);
        this.focusTutorialCameraForStage('capture');
        if (scenario) {
          this.selectCoord(scenario.villageCoord, 'unit');
        }
      }
      return;
    }

    if (stage === 'capture') {
      if (action.type === 'CAPTURE_CITY') {
        this.clearSelection();
        this.syncTutorialContext();
        this.tutorial.setStage('codex', null);
      }
      return;
    }

    if (stage === 'codex') {
      if (action.type === 'RESEARCH_TECH') {
        this.techModal.close();
        this.clearSelection();
        this.tutorial.setStage('end_turn', null);
        this.refreshHUD();
      }
    }
  }

  private async handleEndTurn(): Promise<void> {
    if (!this.state || this.isBusy || this.isAITurnRunning) return;
    if (!this.isHumanTurn()) return;
    if (this.tutorial.isModalOpen() || this.resignationOverlay.isOpen()) return;

    if (this.openNextPendingCityReward()) {
      return;
    }

    // Strict tutorial gating: block End Turn during steps 1-5
    if (this.tutorial.isBlockingEndTurn()) {
      triggerAndroidHaptic('tap');
      this.tutorial.nudge(this.getTutorialNudgeForCurrentStage());
      return;
    }

    // Step 6 (End Turn): show Tutorial Complete! immediately, then run End Turn on Continue Playing
    if (this.tutorial.isActive() && this.tutorial.getStage() === 'end_turn') {
      triggerAndroidHaptic('victory');
      this.techModal.close();
      this.factionDossierModal.close();
      this.leaderboardModal.close();
      this.clearSelection();
      this.pendingEndTurnAfterTutorial = true;
      this.tutorial.completeAndCelebrate();
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

      const frozenTutorialEnemyId =
        this.tutorial.isActive() && this.tutorialScenario
          ? this.tutorialScenario.enemyUnitId
          : null;

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
        const filteredActions = frozenTutorialEnemyId
          ? plannedActions.filter((a) => {
              if ('unitId' in a && a.unitId === frozenTutorialEnemyId) return false;
              if ('attackerId' in a && a.attackerId === frozenTutorialEnemyId) return false;
              return true;
            })
          : plannedActions;
        const actions =
          filteredActions.length > 0 && filteredActions[filteredActions.length - 1].type === 'END_TURN'
            ? filteredActions
            : [...filteredActions, { type: 'END_TURN' as const }];

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
      if (this.state.phase === 'playing' && this.isHumanTurn()) {
        const curStage = this.tutorial.getStage();
        if (curStage && curStage !== 'intro' && curStage !== 'complete') {
          this.syncTutorialProgress();
          this.focusTutorialCameraForStage(curStage);
        }
      }
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
      clearSavedCampaign();
      this.tutorial.hide();
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

    this.persistActiveCampaign();

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
    this.pauseSceneBehindOpaqueSheet();
    return true;
  }

  private openTechModal(): void {
    if (!this.state) return;
    if (this.tutorial.isActive() && this.tutorial.getStage() !== 'codex') {
      triggerAndroidHaptic('tap');
      this.tutorial.nudge(this.getTutorialNudgeForCurrentStage());
      return;
    }
    triggerAndroidHaptic('tap');
    this.factionDossierModal.close();
    this.leaderboardModal.close();
    const vm = this.buildTechModalViewModel();
    if (vm) {
      this.pauseSceneBehindOpaqueSheet();
      this.techModal.open(vm);
    }
  }

  /**
   * Android WebView: pause the WebGL RAF loop behind full-screen/sheet modals so Chromium's
   * Skia Vulkan tile-cache and ANGLE WebGL swapchain never race on the same frame.
   * No-op in desktop/mobile browsers.
   */
  private pauseSceneBehindOpaqueSheet(): void {
    if (!window.EldermereAndroid) return;
    this.sceneManager?.stop();
  }

  private resumeSceneAfterOpaqueSheet(): void {
    if (!window.EldermereAndroid) return;
    if (this.shouldKeepScenePausedForAndroid()) return;
    this.sceneManager?.start();
  }

  private openFactionDossier(focusFaction?: FactionId): void {
    if (!this.state) return;
    triggerAndroidHaptic('tap');
    this.techModal.close();
    this.leaderboardModal.close();
    const vm = this.buildFactionDossierViewModel();
    if (vm) {
      this.pauseSceneBehindOpaqueSheet();
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
      this.pauseSceneBehindOpaqueSheet();
      this.leaderboardModal.open(vm);
    }
  }

  private buildLeaderboardViewModel(): LeaderboardModalViewModel | null {
    if (!this.state) return null;
    return {
      entries: getLeaderboard(this.state),
      turn: this.state.turn,
      maxTurns: this.state.config.maxTurns,
      tutorialActive: this.tutorial.isActive(),
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

    const tutorialTargetTechId =
      this.tutorial.isActive() && this.tutorial.getStage() === 'codex'
        ? this.getTutorialTargetTechId()
        : null;

    return {
      player: human,
      cityCount: getPlayerCities(this.state, human.id).length,
      isHumanTurn: this.isHumanTurn(),
      techCosts,
      tutorialTargetTechId,
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
    const isTutorialEndTurnStep =
      this.tutorial.isActive() && this.tutorial.getStage() === 'end_turn';
    const allUnitsActed = remainingUnitsCount === 0 || isTutorialEndTurnStep;
    const combatPreview = this.buildCombatPreview();

    if (!this.selectedCoord) {
      this.actionBar.update({
        isHumanTurn: isHuman,
        playerFaction: human.faction,
        playerGold: human.gold,
        hasAffordableTech: affordableTechCount > 0,
        affordableTechCount,
        remainingUnitsCount,
        allUnitsActed,
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
      allUnitsActed,
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

    const rawUnitActions = isOwnedByHuman ? getUnitActionOptions(this.state, unit.id) : [];
    const filteredUnitActions = this.tutorial.isActive()
      ? rawUnitActions.filter((opt) => Boolean(opt.action && this.isActionAllowedByTutorial(opt.action)))
      : rawUnitActions;

    return {
      unit,
      owner,
      isOwnedByHuman,
      effectiveAttack: getEffectiveAttack(this.state, unit),
      effectiveDefense: getEffectiveDefense(this.state, unit),
      effectiveMovement: baseDef.movement + roadBonus + rohirrimBonus,
      actions: filteredUnitActions,
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

    const rawTrainOptions = isOwnedByHuman ? getCityTrainOptions(this.state, city.id) : [];
    const filteredTrainOptions = this.tutorial.isActive()
      ? rawTrainOptions.filter((opt) => Boolean(opt.action && this.isActionAllowedByTutorial(opt.action)))
      : rawTrainOptions;

    return {
      city,
      owner,
      isOwnedByHuman,
      unitCount,
      unitCap,
      income,
      popNeeded: city.level + 1,
      occupiedByUnit,
      trainOptions: filteredTrainOptions,
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

    const rawActions = getTileActionOptions(state, human.id, tile.x, tile.y);
    const actions = this.tutorial.isActive()
      ? rawActions.filter((opt) => Boolean(opt.action && this.isActionAllowedByTutorial(opt.action)))
      : rawActions;

    return {
      tile,
      terrainName: TERRAIN_NAMES[tile.terrain],
      defenseBonus,
      isRevealed,
      actions,
    };
  }
}
