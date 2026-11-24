import { renderIcon, type IconName } from './icons';
import { markTutorialCompleted } from './persistence';

export type TutorialStepId = 'move' | 'upgrade' | 'codex' | 'capture' | 'combat' | 'end_turn';

export interface TutorialStep {
  id: TutorialStepId;
  icon: IconName;
  title: string;
  body: string;
  ctaLabel: string;
}

export const TUTORIAL_STEPS: readonly TutorialStep[] = [
  {
    id: 'move',
    icon: 'compass',
    title: 'Move Your Units',
    body: 'Tap your unit, then tap any glowing blue ring to explore the realm and lift the clouds.',
    ctaLabel: 'Next',
  },
  {
    id: 'upgrade',
    icon: 'wheat',
    title: 'Upgrade Your Cities',
    body: 'Tap a resource tile inside your borders (Berries, Game, or Ore) to harvest it. Filling your city bar levels it up for bonus Stars and rewards.',
    ctaLabel: 'Next',
  },
  {
    id: 'codex',
    icon: 'codex',
    title: 'Technology & Codex',
    body: 'Tap Codex in the bottom-left to unlock new buildings, terrain skills, and elite units.',
    ctaLabel: 'Next',
  },
  {
    id: 'capture',
    icon: 'crown',
    title: 'Capture Villages & Cities',
    body: 'Move a unit onto a neutral Village or enemy City. At the start of your next turn, tap the glowing Capture button to claim it.',
    ctaLabel: 'Next',
  },
  {
    id: 'combat',
    icon: 'swords',
    title: 'Battle Rival Realms',
    body: 'Move in range of an enemy unit and tap the red target ring to attack. Preview damage first — Terrain Defense and Archers can turn the tide.',
    ctaLabel: 'Next',
  },
  {
    id: 'end_turn',
    icon: 'trophy',
    title: 'End Turn & Win',
    body: 'Tap End Turn in the bottom-right when your units have acted. Capture all rival capitals to claim the Crown of Eldermere!',
    ctaLabel: 'Finish',
  },
];

export interface TutorialCallbacks {
  onStepChange?: (stepIndex: number | null) => void;
  onComplete?: () => void;
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export class TutorialController {
  private readonly root: HTMLElement;
  private readonly callbacks: TutorialCallbacks;
  private active = false;
  private stepIndex = 0;

  constructor(container: HTMLElement, callbacks: TutorialCallbacks = {}) {
    this.callbacks = callbacks;
    this.root = document.createElement('aside');
    this.root.className = 'tutorial-banner hidden';
    this.root.setAttribute('role', 'region');
    this.root.setAttribute('aria-label', 'Game Tutorial');
    container.appendChild(this.root);
  }

  public isActive(): boolean {
    return this.active;
  }

  public getStepIndex(): number | null {
    return this.active ? this.stepIndex : null;
  }

  public start(initialStep = 0): void {
    const clamped = Math.max(0, Math.min(TUTORIAL_STEPS.length - 1, initialStep));
    this.active = true;
    this.stepIndex = clamped;
    this.render();
    this.root.classList.remove('hidden');
    this.callbacks.onStepChange?.(this.stepIndex);
  }

  public hide(): void {
    this.active = false;
    this.root.classList.add('hidden');
    this.root.innerHTML = '';
  }

  public endTutorial(persistCompletion = true): void {
    if (persistCompletion) {
      markTutorialCompleted();
    }
    const wasActive = this.active;
    this.hide();
    if (wasActive) {
      this.callbacks.onStepChange?.(null);
      this.callbacks.onComplete?.();
    }
  }

  /**
   * Auto-advances the tutorial if the player performs the action taught on the current step.
   */
  public notifyAction(stepId: TutorialStepId): void {
    if (!this.active) return;
    const current = TUTORIAL_STEPS[this.stepIndex];
    if (current && current.id === stepId) {
      this.advance();
    }
  }

  public advance(): void {
    if (!this.active) return;
    if (this.stepIndex + 1 >= TUTORIAL_STEPS.length) {
      this.endTutorial(true);
      return;
    }
    this.stepIndex += 1;
    this.render();
    this.callbacks.onStepChange?.(this.stepIndex);
  }

  public previous(): void {
    if (!this.active || this.stepIndex <= 0) return;
    this.stepIndex -= 1;
    this.render();
    this.callbacks.onStepChange?.(this.stepIndex);
  }

  public destroy(): void {
    this.root.remove();
  }

  private render(): void {
    const step = TUTORIAL_STEPS[this.stepIndex];
    if (!step) return;

    const total = TUTORIAL_STEPS.length;
    const isFirst = this.stepIndex === 0;
    const isLast = this.stepIndex === total - 1;

    this.root.innerHTML = `
      <div class="tutorial-card">
        <div class="tutorial-card-head">
          <div class="tutorial-title-group">
            <span class="tutorial-icon-badge" aria-hidden="true">${renderIcon(step.icon, 'icon icon-sm')}</span>
            <strong class="tutorial-title">${esc(step.title)}</strong>
          </div>
          <span class="tutorial-step-pill">${this.stepIndex + 1} / ${total}</span>
        </div>
        <p class="tutorial-body">${esc(step.body)}</p>
        <div class="tutorial-actions">
          ${
            !isFirst
              ? `<button type="button" class="btn tutorial-btn-back" data-tutorial-action="prev">Back</button>`
              : `<span class="tutorial-hint-note">End anytime in Scores</span>`
          }
          <button type="button" class="btn btn-cta tutorial-btn-next" data-tutorial-action="next">
            <span>${esc(step.ctaLabel)}</span>
            ${!isLast ? renderIcon('chevronRight', 'icon icon-xs') : ''}
          </button>
        </div>
      </div>
    `;

    this.root
      .querySelector<HTMLButtonElement>('[data-tutorial-action="prev"]')
      ?.addEventListener('click', () => this.previous());

    this.root
      .querySelector<HTMLButtonElement>('[data-tutorial-action="next"]')
      ?.addEventListener('click', () => this.advance());
  }
}
