import { renderIcon, type IconName } from './icons';
import { markTutorialCompleted } from './persistence';

export type TutorialStepId = 'upgrade' | 'move' | 'combat' | 'capture' | 'codex';
export type TutorialStage = 'intro' | TutorialStepId | 'complete';

export interface TutorialStep {
  id: TutorialStepId;
  icon: IconName;
  title: string;
  body: string;
}

export const TUTORIAL_STEPS: readonly TutorialStep[] = [
  {
    id: 'upgrade',
    icon: 'wheat',
    title: 'Upgrade Your City',
    body: 'Tap the two resource tiles inside your borders and harvest both to level up your capital, then pick a City Reward!',
  },
  {
    id: 'move',
    icon: 'compass',
    title: 'Move Your Unit',
    body: 'Tap your unit at your capital, then tap the glowing blue ring to the east to march toward the rival outpost.',
  },
  {
    id: 'combat',
    icon: 'swords',
    title: 'Fight the Rival',
    body: 'Tap the red target ring on the rival warrior guarding the Village to defeat them in battle!',
  },
  {
    id: 'capture',
    icon: 'crown',
    title: 'Capture the Village',
    body: 'Now that you hold the settlement, tap the glowing Capture button to claim it as your second city!',
  },
  {
    id: 'codex',
    icon: 'codex',
    title: 'Unlock Technology',
    body: 'Tap the Codex medallion in the bottom-left and research a new technology to strengthen your realm.',
  },
];

const STEP_INDEX_BY_ID: Record<TutorialStepId, number> = {
  upgrade: 0,
  move: 1,
  combat: 2,
  capture: 3,
  codex: 4,
};

export function isTutorialStepStage(stage: TutorialStage | null): stage is TutorialStepId {
  return stage !== null && stage !== 'intro' && stage !== 'complete';
}

export interface TutorialCallbacks {
  onStageChange?: (stage: TutorialStage | null) => void;
  onStartTutorial?: () => void;
  onCompleteDismiss?: () => void;
  onEndTutorial?: () => void;
  onModalOpen?: () => void;
  onModalClose?: () => void;
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export class TutorialController {
  private readonly bannerEl: HTMLElement;
  private readonly modalEl: HTMLElement;
  private readonly callbacks: TutorialCallbacks;
  private stage: TutorialStage | null = null;
  private subProgress: string | null = null;
  private nudgeMessage: string | null = null;
  private nudgeTimer: number | null = null;

  constructor(container: HTMLElement, callbacks: TutorialCallbacks = {}) {
    this.callbacks = callbacks;

    this.bannerEl = document.createElement('aside');
    this.bannerEl.className = 'tutorial-banner hidden';
    this.bannerEl.setAttribute('role', 'region');
    this.bannerEl.setAttribute('aria-label', 'Guided Tutorial');
    container.appendChild(this.bannerEl);

    this.modalEl = document.createElement('div');
    this.modalEl.className = 'modal-backdrop tutorial-modal hidden';
    this.modalEl.setAttribute('role', 'dialog');
    this.modalEl.setAttribute('aria-modal', 'true');
    this.modalEl.setAttribute('aria-label', 'Tutorial');
    container.appendChild(this.modalEl);
  }

  /** True while the tutorial is in progress (intro or any of the 6 scripted steps). */
  public isActive(): boolean {
    return this.stage !== null && this.stage !== 'complete';
  }

  /** True when either the Tutorial Intro or Tutorial Complete modal is open. */
  public isModalOpen(): boolean {
    return this.stage === 'intro' || this.stage === 'complete';
  }

  /** True when End Turn should be blocked so the player completes the current scripted step first. */
  public isBlockingEndTurn(): boolean {
    return isTutorialStepStage(this.stage);
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
    this.stage = nextStage;
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
      this.renderCompleteModal();
      this.modalEl.classList.remove('hidden');
      if (!wasModalOpen) {
        this.callbacks.onModalOpen?.();
      }
      this.callbacks.onStageChange?.('complete');
      return;
    }

    // Active scripted step (1/6 .. 6/6)
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
      this.setStage('upgrade');
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
    this.stage = null;
    this.hideElements();
    if (wasModalOpen) {
      this.callbacks.onModalClose?.();
    }
  }

  public destroy(): void {
    this.clearNudgeTimer();
    this.bannerEl.remove();
    this.modalEl.remove();
  }

  private hideElements(): void {
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

  private renderBanner(stepId: TutorialStepId, pulse = false): void {
    const idx = STEP_INDEX_BY_ID[stepId];
    const step = TUTORIAL_STEPS[idx];
    if (!step) return;

    const total = TUTORIAL_STEPS.length;
    const progressHtml = this.subProgress
      ? `<span class="tutorial-progress-pill">${esc(this.subProgress)}</span>`
      : '';
    const nudgeHtml = this.nudgeMessage
      ? `<div class="tutorial-nudge" role="status">${esc(this.nudgeMessage)}</div>`
      : '';

    this.bannerEl.innerHTML = `
      <div class="tutorial-card ${pulse ? 'is-nudged' : ''}" data-tutorial-step="${step.id}">
        <div class="tutorial-card-head">
          <div class="tutorial-title-group">
            <span class="tutorial-icon-badge" aria-hidden="true">${renderIcon(step.icon, 'icon icon-sm')}</span>
            <strong class="tutorial-title">${esc(step.title)}</strong>
          </div>
          <span class="tutorial-step-pill">${idx + 1} / ${total}</span>
        </div>
        <p class="tutorial-body">${esc(step.body)}</p>
        ${nudgeHtml}
        <div class="tutorial-footer-row">
          ${progressHtml}
          <span class="tutorial-hint-note">End anytime in Scores</span>
        </div>
      </div>
    `;
  }

  private renderIntroModal(): void {
    this.modalEl.setAttribute('aria-label', 'Guided Tutorial Introduction');
    this.modalEl.innerHTML = `
      <div class="modal-panel tutorial-modal-panel tutorial-intro-panel">
        <div class="tutorial-modal-kicker">
          ${renderIcon('compass', 'icon icon-sm')}
          <span>First Campaign Guide</span>
        </div>
        <h2 class="tutorial-modal-headline">Welcome to Eldermere</h2>
        <p class="tutorial-modal-copy">
          This short guided tutorial will walk you step-by-step through the essentials of commanding your realm:
        </p>
        <ul class="tutorial-intro-list">
          <li>
            <span class="tutorial-intro-icon" aria-hidden="true">${renderIcon('wheat', 'icon icon-xs')}</span>
            <span>Harvesting resources &amp; upgrading your city</span>
          </li>
          <li>
            <span class="tutorial-intro-icon" aria-hidden="true">${renderIcon('compass', 'icon icon-xs')}</span>
            <span>Moving your units across the realm</span>
          </li>
          <li>
            <span class="tutorial-intro-icon" aria-hidden="true">${renderIcon('swords', 'icon icon-xs')}</span>
            <span>Fighting rival warriors &amp; capturing villages</span>
          </li>
          <li>
            <span class="tutorial-intro-icon" aria-hidden="true">${renderIcon('codex', 'icon icon-xs')}</span>
            <span>Researching technology in the Codex</span>
          </li>
        </ul>
        <button type="button" class="btn btn-cta tutorial-modal-cta" data-tutorial-modal-action="start">
          <span>Start Tutorial</span>
          ${renderIcon('chevronRight', 'icon icon-sm')}
        </button>
        <p class="tutorial-modal-footnote">You can end the tutorial anytime from the Scores menu.</p>
      </div>
    `;

    this.modalEl
      .querySelector<HTMLButtonElement>('[data-tutorial-modal-action="start"]')
      ?.addEventListener('click', () => {
        this.dismissModal();
      });
  }

  private renderCompleteModal(): void {
    this.modalEl.setAttribute('aria-label', 'Tutorial Complete');
    this.modalEl.innerHTML = `
      <div class="modal-panel tutorial-modal-panel tutorial-complete-panel">
        <div class="tutorial-modal-kicker is-gold">
          ${renderIcon('trophy', 'icon icon-sm')}
          <span>All 5 Steps Mastered</span>
        </div>
        <div class="tutorial-complete-crest" aria-hidden="true">
          ${renderIcon('crown', 'icon icon-xl')}
        </div>
        <h2 class="tutorial-modal-headline">Tutorial Complete!</h2>
        <p class="tutorial-modal-copy">
          You have mastered upgrading cities, moving, combat, capturing settlements, and the Codex.
          The tutorial is now over — keep playing the rest of this campaign to expand your realm and conquer Eldermere!
        </p>
        <button type="button" class="btn btn-cta tutorial-modal-cta" data-tutorial-modal-action="continue">
          <span>Continue Playing</span>
          ${renderIcon('chevronRight', 'icon icon-sm')}
        </button>
      </div>
    `;

    this.modalEl
      .querySelector<HTMLButtonElement>('[data-tutorial-modal-action="continue"]')
      ?.addEventListener('click', () => {
        this.dismissModal();
      });
  }
}
