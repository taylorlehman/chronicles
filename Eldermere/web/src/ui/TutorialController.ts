import { TECH_DEFINITIONS } from '../game/data';
import type { FactionId, TechId } from '../game/types';
import { ALDERWICK_FULL_TITLE, SUPERPOWER_SHOWCASE, type AlderwickPose } from './alderwick';
import { mountAlderwickDialogue, renderAlderwickScene, type AlderwickDialoguePage } from './AlderwickSpeech';
import { renderIcon, type IconName } from './icons';
import { markTutorialCompleted } from './persistence';
import { getTechIconKey, render3DThumbImg } from './thumbs';

export type TutorialStepId =
  | 'crown'
  | 'stars'
  | 'upgrade'
  | 'move'
  | 'combat'
  | 'capture'
  | 'codex'
  | 'train'
  | 'end_turn';
export type TutorialStage = 'intro' | TutorialStepId | 'complete';

export interface TutorialBannerContext {
  resourceThumbKey?: string;
  resourceLabel?: string;
  targetTechId?: TechId;
  targetTechName?: string;
  faction?: FactionId;
}

export interface TutorialStep {
  id: TutorialStepId;
  icon: IconName;
  title: string;
  body: string;
}

export const TUTORIAL_STEPS: readonly TutorialStep[] = [
  {
    id: 'crown',
    icon: 'crown',
    title: 'The Star-Crown: Path to Victory',
    body: 'See the Star-Crown at the top? It tracks your path to victory! You already hold 1 of 4 pieces—defeat each rival realm to claim theirs, reforge the Crown, and win!',
  },
  {
    id: 'stars',
    icon: 'star',
    title: 'Stars: Eldermere’s Magic',
    body: 'See those glowing Stars (★) up top? Spend them to harvest, train troops, and study lore—growing cities earns more each turn!',
  },
  {
    id: 'upgrade',
    icon: 'wheat',
    title: 'Grow Your Capital',
    body: 'Every grand empire begins with a humble harvest! Tap both berries inside your borders to level up your capital.',
  },
  {
    id: 'move',
    icon: 'compass',
    title: 'March Into the Fog',
    body: 'Time to explore, Commander! Tap the glowing blue ring to the east to march toward the rival outpost.',
  },
  {
    id: 'combat',
    icon: 'swords',
    title: 'Clash With a Rival',
    body: 'An uninvited guest at that Village! Tap the red target ring on the rival warrior to clear the settlement.',
  },
  {
    id: 'capture',
    icon: 'crown',
    title: 'Claim the Village',
    body: 'Splendidly struck! Tap the glowing Claim button below to raise your banner over your second city.',
  },
  {
    id: 'codex',
    icon: 'codex',
    title: 'Crack Open Your Codex',
    body: 'A sharp mind wins as many crowns as a sharp blade! Tap Codex below and research a technology.',
  },
  {
    id: 'train',
    icon: 'helm',
    title: 'Train a Unit',
    body: 'Every realm needs more boots! Tap your capital city, then tap Warrior to train a new recruit.',
  },
  {
    id: 'end_turn',
    icon: 'endTurnHumans',
    title: 'Turn the Page',
    body: 'Magnificent first turn! Tap End Turn below so rival realms can move and your cities grant fresh Stars (★).',
  },
];

const STEP_INDEX_BY_ID: Record<TutorialStepId, number> = {
  crown: 0,
  stars: 1,
  upgrade: 2,
  move: 3,
  combat: 4,
  capture: 5,
  codex: 6,
  train: 7,
  end_turn: 8,
};

/** Which full-body Alderwick pose accompanies each scripted step. */
const STEP_POSE: Record<TutorialStepId, AlderwickPose> = {
  crown: 'greet',
  stars: 'point',
  upgrade: 'point',
  move: 'point',
  combat: 'point',
  capture: 'cheer',
  codex: 'idea',
  train: 'point',
  end_turn: 'point',
};

/** Lifts & pulses the bottom-center Age/Superpower medallion while Alderwick points it out. */
function setStarShardSpotlight(on: boolean): void {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('alderwick-spotlight-shard', on);
}

/** Dims the board & left/right TopBar clusters while spotlighting the top-center Star-Crown indicator. */
function setCrownSpotlight(on: boolean): void {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('alderwick-spotlight-crown', on);
}

/** Dims the board & left/center TopBar clusters while spotlighting the top-right Stars pill. */
function setStarsSpotlight(on: boolean): void {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('alderwick-spotlight-stars', on);
}

export function isTutorialStepStage(stage: TutorialStage | null): stage is TutorialStepId {
  return stage !== null && stage !== 'intro' && stage !== 'complete';
}

export interface TutorialCallbacks {
  onStageChange?: (stage: TutorialStage | null) => void;
  onStartTutorial?: () => void;
  onAdvanceFromCrown?: () => void;
  onAdvanceFromStars?: () => void;
  onCompleteDismiss?: () => void;
  onEndTutorial?: () => void;
  onModalOpen?: () => void;
  onModalClose?: () => void;
  /** Screen pixels covered by the top bar / Alderwick's bubble during live steps (0, 0 when clear). */
  onOcclusionChange?: (topPx: number, bottomPx: number) => void;
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export class TutorialController {
  private readonly starsScrimEl: HTMLElement;
  private readonly bannerEl: HTMLElement;
  private readonly modalEl: HTMLElement;
  private readonly callbacks: TutorialCallbacks;
  private stage: TutorialStage | null = null;
  private subProgress: string | null = null;
  private context: TutorialBannerContext = {};
  private nudgeMessage: string | null = null;
  private nudgeTimer: number | null = null;
  private suppressed = false;

  constructor(container: HTMLElement, callbacks: TutorialCallbacks = {}) {
    this.callbacks = callbacks;

    this.starsScrimEl = document.createElement('div');
    this.starsScrimEl.className = 'tutorial-stars-scrim hidden';
    this.starsScrimEl.setAttribute('aria-hidden', 'true');
    this.starsScrimEl.addEventListener('click', () => {
      if (this.stage === 'crown') {
        this.nudge('Tap “Got It!” above so we can inspect your Stars next.');
      } else if (this.stage === 'stars') {
        this.nudge('Tap “Got It!” above so we can grow your capital first.');
      }
    });
    container.appendChild(this.starsScrimEl);

    this.bannerEl = document.createElement('aside');
    this.bannerEl.className = 'tutorial-banner tutorial-alderwick-host hidden';
    this.bannerEl.setAttribute('role', 'region');
    this.bannerEl.setAttribute('aria-label', 'Guided Tutorial by Alderwick');
    container.appendChild(this.bannerEl);

    this.modalEl = document.createElement('div');
    this.modalEl.className = 'alderwick-stage-backdrop tutorial-modal hidden';
    this.modalEl.setAttribute('role', 'dialog');
    this.modalEl.setAttribute('aria-modal', 'true');
    this.modalEl.setAttribute('aria-label', 'Alderwick Tutorial');
    container.appendChild(this.modalEl);

    if (typeof ResizeObserver !== 'undefined') {
      this.occlusionObserver = new ResizeObserver(() => this.scheduleOcclusionReport());
      this.occlusionObserver.observe(this.bannerEl);
    }
    window.addEventListener('eldermere:bottom-hud-resize', this.handleLayoutChange);
    window.addEventListener('resize', this.handleLayoutChange);
  }

  private occlusionObserver: ResizeObserver | null = null;
  private occlusionRaf: number | null = null;
  private lastOcclusion = '';
  private readonly handleLayoutChange = (): void => this.scheduleOcclusionReport();

  private scheduleOcclusionReport(): void {
    if (this.occlusionRaf !== null) return;
    this.occlusionRaf = window.requestAnimationFrame(() => {
      this.occlusionRaf = null;
      this.reportOcclusion();
    });
  }

  /** Lets the camera slide the board so the focus point stays visible clear of Alderwick. */
  private reportOcclusion(): void {
    const cb = this.callbacks.onOcclusionChange;
    if (!cb) return;
    let top = 0;
    let bottom = 0;
    if (
      !this.suppressed &&
      isTutorialStepStage(this.stage) &&
      !this.bannerEl.classList.contains('hidden')
    ) {
      const scene = this.bannerEl.querySelector<HTMLElement>('.alderwick-scene') ?? this.bannerEl;
      if (this.stage === 'crown' || this.stage === 'stars') {
        top = Math.max(0, scene.getBoundingClientRect().bottom);
        bottom = 0;
      } else {
        bottom = Math.max(0, window.innerHeight - scene.getBoundingClientRect().top);
        top = document.querySelector('.top-bar')?.getBoundingClientRect().bottom ?? 0;
      }
    }
    const key = `${Math.round(top)}:${Math.round(bottom)}`;
    if (key === this.lastOcclusion) return;
    this.lastOcclusion = key;
    cb(top, bottom);
  }

  /** Temporarily hides the compact banner while another modal (e.g. CityRewardModal) hosts Alderwick. */
  public setSuppressed(suppressed: boolean): void {
    if (this.suppressed === suppressed) return;
    this.suppressed = suppressed;
    this.bannerEl.classList.toggle('is-suppressed', suppressed);
    if (suppressed) {
      this.starsScrimEl.classList.add('hidden');
      setCrownSpotlight(false);
      setStarsSpotlight(false);
    } else if (this.stage === 'crown') {
      this.starsScrimEl.classList.remove('hidden');
      setCrownSpotlight(true);
    } else if (this.stage === 'stars') {
      this.starsScrimEl.classList.remove('hidden');
      setStarsSpotlight(true);
    }
    this.scheduleOcclusionReport();
  }

  /** True while the tutorial is in progress (intro or any of the 9 scripted steps). */
  public isActive(): boolean {
    return this.stage !== null && this.stage !== 'complete';
  }

  /** True when either the Tutorial Intro or Tutorial Complete ("Oh! By the way...") modal is open. */
  public isModalOpen(): boolean {
    return this.stage === 'intro' || this.stage === 'complete';
  }

  /** True when End Turn should be blocked so the player completes steps 1-8 before ending the turn. */
  public isBlockingEndTurn(): boolean {
    return isTutorialStepStage(this.stage) && this.stage !== 'end_turn';
  }

  public getStage(): TutorialStage | null {
    return this.stage;
  }

  public getStepIndex(): number | null {
    if (!isTutorialStepStage(this.stage)) return null;
    return STEP_INDEX_BY_ID[this.stage];
  }

  public start(initialStage: TutorialStage = 'intro', subProgress: string | null = null): void {
    this.setStage(initialStage, subProgress);
  }

  public setStage(nextStage: TutorialStage | null, subProgress: string | null = null): void {
    const wasModalOpen = this.isModalOpen();
    this.clearNudgeTimer();
    this.nudgeMessage = null;
    this.suppressed = false;
    this.bannerEl.classList.remove('is-suppressed');
    this.stage = nextStage;
    const isTopSpotlightStep = nextStage === 'crown' || nextStage === 'stars';
    setStarShardSpotlight(nextStage === 'complete');
    setCrownSpotlight(nextStage === 'crown');
    setStarsSpotlight(nextStage === 'stars');
    this.starsScrimEl.classList.toggle('hidden', !isTopSpotlightStep);
    this.bannerEl.classList.toggle('is-top-aligned', isTopSpotlightStep);
    this.bannerEl.classList.toggle('is-crown-aligned', nextStage === 'crown');
    this.bannerEl.classList.toggle('is-stars-aligned', nextStage === 'stars');
    this.scheduleOcclusionReport();
    this.subProgress = subProgress;

    if (nextStage === null) {
      this.hideElements();
      if (wasModalOpen) {
        this.callbacks.onModalClose?.();
      }
      this.callbacks.onStageChange?.(null);
      return;
    }

    if (nextStage === 'intro') {
      this.bannerEl.classList.add('hidden');
      this.bannerEl.innerHTML = '';
      delete this.bannerEl.dataset.renderedStep;
      this.renderIntroModal();
      this.modalEl.classList.remove('hidden');
      if (!wasModalOpen) {
        this.callbacks.onModalOpen?.();
      }
      this.callbacks.onStageChange?.('intro');
      return;
    }

    if (nextStage === 'complete') {
      this.bannerEl.classList.add('hidden');
      this.bannerEl.innerHTML = '';
      delete this.bannerEl.dataset.renderedStep;
      this.renderCompleteModal();
      this.modalEl.classList.remove('hidden');
      if (!wasModalOpen) {
        this.callbacks.onModalOpen?.();
      }
      this.callbacks.onStageChange?.('complete');
      return;
    }

    // Active scripted step (1/8 .. 8/8) — compact talking-head bar
    this.modalEl.classList.add('hidden');
    this.modalEl.innerHTML = '';
    this.renderBanner(nextStage);
    this.bannerEl.classList.remove('hidden');
    if (wasModalOpen) {
      this.callbacks.onModalClose?.();
    }
    this.callbacks.onStageChange?.(nextStage);
  }

  public setSubProgress(subProgress: string | null): void {
    if (this.subProgress === subProgress) return;
    this.subProgress = subProgress;
    if (isTutorialStepStage(this.stage)) {
      this.renderBanner(this.stage);
    }
  }

  public setContext(ctx: TutorialBannerContext): void {
    this.context = { ...ctx };
    if (isTutorialStepStage(this.stage)) {
      this.renderBanner(this.stage);
    } else if (this.stage === 'intro') {
      this.renderIntroModal();
    } else if (this.stage === 'complete') {
      this.renderCompleteModal();
    }
  }

  public nudge(message: string): void {
    if (!isTutorialStepStage(this.stage)) return;
    this.clearNudgeTimer();
    this.nudgeMessage = message;
    this.renderBanner(this.stage, true);
    this.nudgeTimer = window.setTimeout(() => {
      this.nudgeTimer = null;
      this.nudgeMessage = null;
      if (isTutorialStepStage(this.stage)) {
        this.renderBanner(this.stage, false);
      }
    }, 3200);
  }

  public completeAndCelebrate(): void {
    markTutorialCompleted();
    this.setStage('complete');
  }

  public endTutorial(persistCompletion = true): void {
    if (persistCompletion) {
      markTutorialCompleted();
    }
    const wasActive = this.stage !== null;
    const wasModalOpen = this.isModalOpen();
    this.clearNudgeTimer();
    this.nudgeMessage = null;
    this.subProgress = null;
    this.context = {};
    this.stage = null;
    this.hideElements();
    if (wasModalOpen) {
      this.callbacks.onModalClose?.();
    }
    if (wasActive) {
      this.callbacks.onStageChange?.(null);
      this.callbacks.onEndTutorial?.();
    }
  }

  public dismissModal(): void {
    if (this.stage === 'intro') {
      this.setStage('crown');
      this.callbacks.onStartTutorial?.();
    } else if (this.stage === 'complete') {
      this.setStage(null);
      this.callbacks.onCompleteDismiss?.();
    }
  }

  public hide(): void {
    const wasModalOpen = this.isModalOpen();
    this.clearNudgeTimer();
    this.nudgeMessage = null;
    this.subProgress = null;
    this.context = {};
    this.stage = null;
    this.hideElements();
    if (wasModalOpen) {
      this.callbacks.onModalClose?.();
    }
  }

  public destroy(): void {
    this.clearNudgeTimer();
    setStarShardSpotlight(false);
    setCrownSpotlight(false);
    setStarsSpotlight(false);
    this.occlusionObserver?.disconnect();
    window.removeEventListener('eldermere:bottom-hud-resize', this.handleLayoutChange);
    window.removeEventListener('resize', this.handleLayoutChange);
    if (this.occlusionRaf !== null) window.cancelAnimationFrame(this.occlusionRaf);
    this.starsScrimEl.remove();
    this.bannerEl.remove();
    this.modalEl.remove();
  }

  private hideElements(): void {
    setStarShardSpotlight(false);
    setCrownSpotlight(false);
    setStarsSpotlight(false);
    this.suppressed = false;
    this.starsScrimEl.classList.add('hidden');
    this.bannerEl.classList.remove(
      'is-top-aligned',
      'is-crown-aligned',
      'is-stars-aligned',
      'is-suppressed',
    );
    this.scheduleOcclusionReport();
    delete this.bannerEl.dataset.renderedStep;
    this.bannerEl.classList.add('hidden');
    this.bannerEl.innerHTML = '';
    this.modalEl.classList.add('hidden');
    this.modalEl.innerHTML = '';
  }

  private clearNudgeTimer(): void {
    if (this.nudgeTimer !== null) {
      window.clearTimeout(this.nudgeTimer);
      this.nudgeTimer = null;
    }
  }

  private formatStepBodyHtml(stepId: TutorialStepId, step: TutorialStep): string {
    switch (stepId) {
      case 'crown':
        return 'See the <strong>Star-Crown</strong> at the top? It tracks your path to victory! You already hold <strong>1 of 4 pieces</strong>—defeat each rival realm to claim theirs, reforge the Crown, and win! Tap it anytime to view Crown progress.';
      case 'stars':
        return 'See those glowing <strong>Stars (★)</strong> up top? Spend them to harvest, train troops, and study lore—growing cities earns more each turn!';
      case 'upgrade': {
        const resourceWord =
          this.context.resourceThumbKey === 'ore'
            ? 'ore veins'
            : this.context.resourceThumbKey === 'mithril'
              ? 'mithril veins'
              : this.context.resourceThumbKey === 'game'
                ? 'wild game'
                : 'berries';
        return `Every grand empire begins with a humble harvest! Tap both <strong>${resourceWord}</strong> inside your borders to level up your capital.`;
      }
      case 'capture':
        return 'Splendidly struck! Tap the glowing <strong>Claim</strong> button below to raise your banner over your second city.';
      case 'codex': {
        const techName = this.context.targetTechName;
        if (techName) {
          return `A sharp mind wins as many crowns as a sharp blade! Tap <strong>Codex</strong> below and research <strong>“${esc(techName)}”</strong>.`;
        }
        return 'A sharp mind wins as many crowns as a sharp blade! Tap <strong>Codex</strong> below and research a technology.';
      }
      case 'train':
        return 'Every realm needs more boots! Tap your capital city, then tap <strong>Warrior</strong> to train a new recruit.';
      case 'end_turn':
        return 'Magnificent first turn! Tap <strong>End Turn</strong> below so rival realms can move and your cities grant fresh Stars (★).';
      default:
        return esc(step.body);
    }
  }

  private renderCodexTargetIcon(): string {
    const techId = this.context.targetTechId;
    const tech = techId ? TECH_DEFINITIONS[techId] : undefined;
    const faction: FactionId = this.context.faction ?? 'humans';
    const iconKey = tech ? getTechIconKey(tech) : 'road';
    const label = tech?.name ?? this.context.targetTechName ?? 'Technology';
    const thumbImg = render3DThumbImg(iconKey, faction, 'tutorial-tech-thumb', label);
    const visual = thumbImg || renderIcon('codex', 'icon icon-lg');
    return `<div class="tutorial-tech-icon-box" aria-hidden="true">${visual}</div>`;
  }

  private renderBanner(stepId: TutorialStepId, pulse = false): void {
    const idx = STEP_INDEX_BY_ID[stepId];
    const step = TUTORIAL_STEPS[idx];
    if (!step) return;

    const total = TUTORIAL_STEPS.length;
    const bodyCopyHtml = this.formatStepBodyHtml(stepId, step);
    const mainBodyHtml =
      stepId === 'codex'
        ? `
          <div class="tutorial-tech-row">
            <p class="tutorial-body">${bodyCopyHtml}</p>
            ${this.renderCodexTargetIcon()}
          </div>
        `
        : `<p class="tutorial-body">${bodyCopyHtml}</p>`;

    const hasGotItButton = stepId === 'crown' || stepId === 'stars';
    const nextBtnHtml = hasGotItButton
      ? `<button type="button" class="btn btn-cta tutorial-next-btn" data-tutorial-next><span>Got It!</span>${renderIcon('chevronRight', 'icon icon-xs')}</button>`
      : '';
    const progressHtml =
      stepId !== 'upgrade' && this.subProgress
        ? `<span class="tutorial-progress-pill">${esc(this.subProgress)}</span>`
        : '';
    const nudgeHtml = this.nudgeMessage
      ? `<div class="tutorial-nudge" role="status">${esc(this.nudgeMessage)}</div>`
      : '';

    const hasInteractiveFooter = Boolean(nextBtnHtml || progressHtml);
    const actionsHtml = hasInteractiveFooter
      ? `
        ${nextBtnHtml}
        ${progressHtml}
        <span class="tutorial-hint-note">End anytime via the Crown</span>
      `
      : `<span class="tutorial-hint-note is-only-hint">End anytime via the Crown</span>`;

    // Only replay the pop-in when the step itself changes (not on sub-progress/nudge refreshes).
    const isNewStep = this.bannerEl.dataset.renderedStep !== stepId;
    this.bannerEl.dataset.renderedStep = stepId;

    const stepExtraClass =
      stepId === 'crown'
        ? ' is-crown-step'
        : stepId === 'stars'
          ? ' is-stars-step'
          : '';

    this.bannerEl.innerHTML = renderAlderwickScene({
      pose: STEP_POSE[stepId],
      variant: 'compact',
      animate: isNewStep,
      nudged: pulse,
      extraClass: `tutorial-alderwick-scene${stepExtraClass}${hasInteractiveFooter ? '' : ' is-hint-only-actions'}`,
      headerHtml: `
        <span class="tutorial-icon-badge" aria-hidden="true">${renderIcon(step.icon, 'icon icon-xs')}</span>
        <strong class="tutorial-title">${esc(step.title)}</strong>
        <span class="tutorial-step-pill">${idx + 1} / ${total}</span>
      `,
      bodyHtml: `
        ${mainBodyHtml}
        ${nudgeHtml}
      `,
      actionsHtml,
    });

    if (stepId === 'crown') {
      this.bannerEl
        .querySelector<HTMLButtonElement>('[data-tutorial-next]')
        ?.addEventListener('click', () => {
          if (this.stage !== 'crown') return;
          this.setStage('stars');
          this.callbacks.onAdvanceFromCrown?.();
        });
    } else if (stepId === 'stars') {
      this.bannerEl
        .querySelector<HTMLButtonElement>('[data-tutorial-next]')
        ?.addEventListener('click', () => {
          if (this.stage !== 'stars') return;
          this.setStage('upgrade');
          this.callbacks.onAdvanceFromStars?.();
        });
    }
    this.scheduleOcclusionReport();
  }

  private renderIntroModal(): void {
    const pages: AlderwickDialoguePage[] = [
      {
        pose: 'greet',
        bodyHtml: `
          <p class="alderwick-bubble-lead">Well met, Commander!</p>
          <p>I am <strong>${ALDERWICK_FULL_TITLE}</strong>, Grand Chronicler of Eldermere. I’ll be your guide for your very first turn.</p>
        `,
        actionLabel: 'Nice to meet you!',
      },
      {
        pose: 'point',
        bodyHtml: `
          <p>Long ago, the <strong>Star-Crown</strong> kept Eldermere’s four realms at peace. When it shattered, so did the peace. Now every realm fights to reforge it.</p>
        `,
        actionLabel: 'Begin the Chronicle',
      },
    ];

    this.modalEl.setAttribute('aria-label', `Welcome to Eldermere — ${ALDERWICK_FULL_TITLE} introduces himself`);
    mountAlderwickDialogue(this.modalEl, pages, () => this.dismissModal());
  }

  private renderCompleteModal(): void {
    const playerFaction: FactionId = this.context.faction ?? 'humans';
    const yourPower =
      SUPERPOWER_SHOWCASE.find((entry) => entry.faction === playerFaction)?.powerName ?? 'Superpower';

    const pages: AlderwickDialoguePage[] = [
      {
        pose: 'idea',
        bodyHtml: `
          <p class="alderwick-bubble-lead">Oh! By the way, Commander…</p>
          <p>See the <strong>Age medallion</strong> at the bottom? Reach <strong>Age III</strong> in your Codex to charge it up and unleash <strong>${esc(yourPower)}</strong>!</p>
          <p class="alderwick-bubble-signoff">Good luck! I’ll be watching. With snacks.</p>
        `,
        actionLabel: 'Challenge accepted!',
      },
    ];

    this.modalEl.setAttribute('aria-label', 'Oh, by the way: your Age medallion and Superpower');
    mountAlderwickDialogue(this.modalEl, pages, () => this.dismissModal(), 'is-star-shard-tip');
  }
}
