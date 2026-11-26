import { FACTION_DEFINITIONS } from '../game/data';
import type { FactionId } from '../game/types';
import { ALDERWICK_FULL_TITLE, SUPERPOWER_SHOWCASE, type AlderwickPose } from './alderwick';
import { mountAlderwickDialogue, renderAlderwickScene, type AlderwickDialoguePage } from './AlderwickSpeech';
import { renderActionIcon, renderIcon, type IconName } from './icons';
import { markTutorialCompleted } from './persistence';
import { render3DThumbImg } from './thumbs';

export type TutorialStepId = 'stars' | 'upgrade' | 'move' | 'combat' | 'capture' | 'codex' | 'end_turn';
export type TutorialStage = 'intro' | TutorialStepId | 'complete';

export interface TutorialBannerContext {
  resourceThumbKey?: string;   // e.g. 'resource_berries', 'resource_game', 'resource_metal' (or 'berries', 'game', 'ore')
  resourceLabel?: string;      // e.g. 'Berries', 'Wild Game', 'Ore Vein'
  targetTechId?: string;
  targetTechName?: string;     // e.g. 'Farming'
  faction?: FactionId;         // Optional faction for biome-matched 3D resource thumbnail & faction callouts
}

export interface TutorialStep {
  id: TutorialStepId;
  icon: IconName;
  title: string;
  body: string;
}

export const TUTORIAL_STEPS: readonly TutorialStep[] = [
  {
    id: 'stars',
    icon: 'star',
    title: 'Stars: Eldermere’s Magic',
    body: 'See those twinkling Stars (★)? That’s pure Starlight from the First Dawn! Spend them to harvest, train troops, and study lore—growing and capturing cities fills your coffers faster each turn.',
  },
  {
    id: 'upgrade',
    icon: 'wheat',
    title: 'Grow Your Capital',
    body: 'Every grand empire begins with a humble harvest! Tap both resource tiles inside your borders to level up your capital, pick a City Reward, and earn more Stars (★) each turn.',
  },
  {
    id: 'move',
    icon: 'compass',
    title: 'March Into the Fog',
    body: 'Time to stretch those boots, Commander! Tap your unit at your capital, then tap the glowing blue ring to the east to advance toward the rival outpost.',
  },
  {
    id: 'combat',
    icon: 'swords',
    title: 'Clash With a Rival',
    body: 'Aha—an uninvited guest at that Village! Tap the red target ring on the rival warrior to send them packing and clear the settlement.',
  },
  {
    id: 'capture',
    icon: 'crown',
    title: 'Claim the Village',
    body: 'Splendidly struck! With the Village clear, tap the glowing Capture button to raise your banner and claim your second city.',
  },
  {
    id: 'codex',
    icon: 'codex',
    title: 'Crack Open Your Codex',
    body: 'A sharp mind wins as many crowns as a sharp blade! Tap the Codex medallion in the bottom-left and research a technology to power up your realm.',
  },
  {
    id: 'end_turn',
    icon: 'endTurnHumans',
    title: 'Turn the Page',
    body: 'Magnificent first turn! Eldermere is turn-based: tapping End Turn lets rival realms move and showers you with fresh Stars (★) from your cities. Tap End Turn now!',
  },
];

const STEP_INDEX_BY_ID: Record<TutorialStepId, number> = {
  stars: 0,
  upgrade: 1,
  move: 2,
  combat: 3,
  capture: 4,
  codex: 5,
  end_turn: 6,
};

/** Which full-body Alderwick pose accompanies each scripted step. */
const STEP_POSE: Record<TutorialStepId, AlderwickPose> = {
  stars: 'greet',
  upgrade: 'point',
  move: 'point',
  combat: 'point',
  capture: 'cheer',
  codex: 'idea',
  end_turn: 'point',
};

/** Cheeky one-liners about what a rival's Superpower could do to the player's capital. */
const RIVAL_SUPERPOWER_THREAT: Record<FactionId, string> = {
  humans: 'I’d hate to see a Human Watchtower sprout up right on your doorstep.',
  orcs: 'I’d hate to see your lovely capital turned into an Orc volcano.',
  elves: 'I’d hate to see the Elves eclipse your sky. They get terribly smug about it.',
  dwarves: 'I’d hate to see a Dwarven Fire Drake take a nap on your rooftops.',
};

function normalizeResourceThumbKey(key: string): string {
  const normalized = key.trim().toLowerCase().replace(/^resource_/, '');
  if (normalized === 'metal') return 'ore';
  return normalized;
}

/** Lifts & pulses the top-bar Age/Superpower circle while Alderwick points it out. */
function setStarShardSpotlight(on: boolean): void {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('alderwick-spotlight-shard', on);
}

export function isTutorialStepStage(stage: TutorialStage | null): stage is TutorialStepId {
  return stage !== null && stage !== 'intro' && stage !== 'complete';
}

export interface TutorialCallbacks {
  onStageChange?: (stage: TutorialStage | null) => void;
  onStartTutorial?: () => void;
  onAdvanceFromStars?: () => void;
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
  private context: TutorialBannerContext = {};
  private nudgeMessage: string | null = null;
  private nudgeTimer: number | null = null;

  constructor(container: HTMLElement, callbacks: TutorialCallbacks = {}) {
    this.callbacks = callbacks;

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
  }

  /** True while the tutorial is in progress (intro or any of the 7 scripted steps). */
  public isActive(): boolean {
    return this.stage !== null && this.stage !== 'complete';
  }

  /** True when either the Tutorial Intro or Tutorial Complete ("One More Thing...") modal is open. */
  public isModalOpen(): boolean {
    return this.stage === 'intro' || this.stage === 'complete';
  }

  /** True when End Turn should be blocked so the player completes steps 1-6 before ending the turn. */
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
    this.stage = nextStage;
    setStarShardSpotlight(nextStage === 'complete');
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

    // Active scripted step (1/7 .. 7/7) — compact talking-head bar
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
      this.setStage('stars');
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
    this.bannerEl.remove();
    this.modalEl.remove();
  }

  private hideElements(): void {
    setStarShardSpotlight(false);
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

  private renderBanner(stepId: TutorialStepId, pulse = false): void {
    const idx = STEP_INDEX_BY_ID[stepId];
    const step = TUTORIAL_STEPS[idx];
    if (!step) return;

    const total = TUTORIAL_STEPS.length;
    let bodyText = step.body;
    if (stepId === 'codex' && this.context.targetTechName) {
      bodyText = `A sharp mind wins as many crowns as a sharp blade! Tap the Codex medallion in the bottom-left and research “${this.context.targetTechName}” (highlighted in gold).`;
    }

    let resourceCalloutHtml = '';
    if (stepId === 'upgrade' && this.context.resourceThumbKey) {
      const thumbKey = normalizeResourceThumbKey(this.context.resourceThumbKey);
      const label = this.context.resourceLabel?.trim() || 'Resource';
      const faction = this.context.faction ?? 'humans';
      const thumbImg = render3DThumbImg(thumbKey, faction, 'tutorial-resource-thumb', label);
      const thumbVisual = thumbImg || renderActionIcon(thumbKey, 'icon icon-sm');
      resourceCalloutHtml = `
        <div class="tutorial-resource-callout">
          <span class="tutorial-resource-thumb-wrap" aria-hidden="true">${thumbVisual}</span>
          <span class="tutorial-resource-label">Gather: <strong>${esc(label)}</strong> (&times;2)</span>
        </div>
      `;
    }

    const nextBtnHtml =
      stepId === 'stars'
        ? `<button type="button" class="btn btn-cta tutorial-next-btn" data-tutorial-next><span>Got It!</span>${renderIcon('chevronRight', 'icon icon-xs')}</button>`
        : '';
    const progressHtml = this.subProgress
      ? `<span class="tutorial-progress-pill">${esc(this.subProgress)}</span>`
      : '';
    const nudgeHtml = this.nudgeMessage
      ? `<div class="tutorial-nudge" role="status">${esc(this.nudgeMessage)}</div>`
      : '';

    // Only replay the pop-in when the step itself changes (not on sub-progress/nudge refreshes).
    const isNewStep = this.bannerEl.dataset.renderedStep !== stepId;
    this.bannerEl.dataset.renderedStep = stepId;

    this.bannerEl.innerHTML = renderAlderwickScene({
      pose: STEP_POSE[stepId],
      variant: 'compact',
      animate: isNewStep,
      nudged: pulse,
      extraClass: 'tutorial-alderwick-scene',
      headerHtml: `
        <span class="tutorial-icon-badge" aria-hidden="true">${renderIcon(step.icon, 'icon icon-xs')}</span>
        <strong class="tutorial-title">${esc(step.title)}</strong>
        <span class="tutorial-step-pill">${idx + 1} / ${total}</span>
      `,
      bodyHtml: `
        <p class="tutorial-body">${esc(bodyText)}</p>
        ${resourceCalloutHtml}
        ${nudgeHtml}
      `,
      actionsHtml: `
        ${nextBtnHtml}
        ${progressHtml}
        <span class="tutorial-hint-note">End anytime in Scores</span>
      `,
    });

    if (stepId === 'stars') {
      this.bannerEl
        .querySelector<HTMLButtonElement>('[data-tutorial-next]')
        ?.addEventListener('click', () => {
          if (this.stage !== 'stars') return;
          this.setStage('upgrade');
          this.callbacks.onAdvanceFromStars?.();
        });
    }
  }

  private renderIntroModal(): void {
    const factionDef = this.context.faction ? FACTION_DEFINITIONS[this.context.faction] : null;
    const commanderLine = factionDef
      ? `You lead <strong>${esc(factionDef.name)}</strong> of <strong>${esc(factionDef.realm)}</strong>, and your rivals are already stirring.`
      : 'Your realm is ready, and your rivals are already stirring.';

    const pages: AlderwickDialoguePage[] = [
      {
        pose: 'greet',
        bodyHtml: `
          <p class="alderwick-bubble-lead">Well met, Commander!</p>
          <p>I am <strong>${ALDERWICK_FULL_TITLE}</strong>, Grand Chronicler of Eldermere and keeper of this rather splendid tabletop. I’ll be your guide for your very first turn.</p>
        `,
        actionLabel: 'Nice to meet you!',
      },
      {
        pose: 'point',
        bodyHtml: `
          <p>Long ago, the <strong>Star-Crown</strong> kept Eldermere’s four realms at peace. When it shattered, so did the peace. Now every realm fights to reforge it.</p>
          <p>${commanderLine}</p>
        `,
        actionLabel: 'How do I win?',
      },
      {
        pose: 'idea',
        bodyHtml: `
          <p>A Chronicle is won one turn at a time:</p>
          <ul class="alderwick-bubble-list">
            <li><span class="tutorial-intro-icon" aria-hidden="true">${renderIcon('wheat', 'icon icon-xs')}</span><span>Harvest resources &amp; grow your capital</span></li>
            <li><span class="tutorial-intro-icon" aria-hidden="true">${renderIcon('compass', 'icon icon-xs')}</span><span>March into the Fog &amp; claim Villages</span></li>
            <li><span class="tutorial-intro-icon" aria-hidden="true">${renderIcon('swords', 'icon icon-xs')}</span><span>Battle rival banners</span></li>
            <li><span class="tutorial-intro-icon" aria-hidden="true">${renderIcon('codex', 'icon icon-xs')}</span><span>Research your Codex &amp; rise through the Ages</span></li>
          </ul>
          <p>Shall we begin?</p>
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
    const rivals = SUPERPOWER_SHOWCASE.filter((entry) => entry.faction !== playerFaction);
    const rivalNames = rivals.map((entry) => entry.realmLabel);
    const rivalList = `${rivalNames.slice(0, -1).join(', ')} and ${rivalNames[rivalNames.length - 1]}`;
    const threat = rivals.find((entry) => entry.faction === 'orcs') ?? rivals[0];
    const threatLine = threat ? RIVAL_SUPERPOWER_THREAT[threat.faction] : '';

    const pages: AlderwickDialoguePage[] = [
      {
        pose: 'idea',
        bodyHtml: `
          <p class="alderwick-bubble-lead">Oh! By the way, Commander…</p>
          <p>See that circle at the <strong>top of your screen</strong>? That’s your realm’s <strong>Star-Shard</strong>. Research enough <strong>Codex</strong> technologies to reach <strong>Age III</strong> and it unleashes your Superpower: <strong>${esc(yourPower)}</strong>.</p>
          <p>Mind you, the ${esc(rivalList)} have shards too, and they’re dreadfully trigger-happy. ${threatLine} So… get there first?</p>
          <p class="alderwick-bubble-signoff">Good luck! I’ll be watching. With snacks.</p>
        `,
        actionLabel: 'Challenge accepted!',
      },
    ];

    this.modalEl.setAttribute('aria-label', 'Oh, by the way: your Star-Shard and Superpower');
    mountAlderwickDialogue(this.modalEl, pages, () => this.dismissModal(), 'is-star-shard-tip');
  }
}
