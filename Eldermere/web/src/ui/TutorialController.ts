import { FACTION_DEFINITIONS } from '../game/data';
import type { FactionId } from '../game/types';
import {
  ALDERWICK_ASSETS,
  ALDERWICK_FULL_TITLE,
  ALDERWICK_NAME,
  SUPERPOWER_SHOWCASE,
} from './alderwick';
import { renderActionIcon, renderFactionCrest, renderFactionSuperpowerIcon, renderIcon, type IconName } from './icons';
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

const FACTION_ACCENT: Record<FactionId, string> = {
  humans: '#2356c9',
  orcs: '#c92a2a',
  elves: '#12805c',
  dwarves: '#d47415',
};

function normalizeResourceThumbKey(key: string): string {
  const normalized = key.trim().toLowerCase().replace(/^resource_/, '');
  if (normalized === 'metal') return 'ore';
  return normalized;
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
    this.bannerEl.className = 'tutorial-banner hidden';
    this.bannerEl.setAttribute('role', 'region');
    this.bannerEl.setAttribute('aria-label', 'Guided Tutorial by Alderwick');
    container.appendChild(this.bannerEl);

    this.modalEl = document.createElement('div');
    this.modalEl.className = 'modal-backdrop tutorial-modal hidden';
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

    this.bannerEl.innerHTML = `
      <div class="tutorial-card tutorial-alderwick-bar ${pulse ? 'is-nudged' : ''}" data-tutorial-step="${step.id}">
        <div class="tutorial-avatar-col">
          <div class="tutorial-avatar-frame">
            <img
              class="tutorial-avatar-img"
              src="${ALDERWICK_ASSETS.portrait}"
              alt="${ALDERWICK_FULL_TITLE}"
              width="56"
              height="56"
              draggable="false"
            />
          </div>
          <span class="tutorial-speaker-badge">${ALDERWICK_NAME}</span>
        </div>

        <div class="tutorial-speech-col">
          <div class="tutorial-card-head">
            <div class="tutorial-title-group">
              <span class="tutorial-icon-badge" aria-hidden="true">${renderIcon(step.icon, 'icon icon-xs')}</span>
              <strong class="tutorial-title">${esc(step.title)}</strong>
            </div>
            <span class="tutorial-step-pill">${idx + 1} / ${total}</span>
          </div>
          <p class="tutorial-body">“${esc(bodyText)}”</p>
          ${resourceCalloutHtml}
          ${nudgeHtml}
          <div class="tutorial-footer-row">
            ${nextBtnHtml}
            ${progressHtml}
            <span class="tutorial-hint-note">End anytime in Scores</span>
          </div>
        </div>
      </div>
    `;

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
    const realmWelcome = factionDef
      ? `Pull up a chair, Commander of <strong>${esc(factionDef.realm)}</strong>! Long ago, the <strong>Star-Crown</strong> shattered into four echoes, and the Fog of Forgetting rolled across Eldermere. Now four proud realms march to claim the empty throne—and your Chronicle begins right here on my tabletop!`
      : `Pull up a chair, Commander! Long ago, the <strong>Star-Crown</strong> shattered into four echoes, and the Fog of Forgetting rolled across Eldermere. Now four proud realms march to claim the empty throne—and your Chronicle begins right here on my tabletop!`;

    this.modalEl.setAttribute('aria-label', 'Welcome to Eldermere — Hosted by Alderwick');
    this.modalEl.innerHTML = `
      <div class="modal-panel tutorial-modal-panel tutorial-intro-panel alderwick-hero-card">
        <div class="alderwick-hero-stage">
          <div class="alderwick-hero-frame">
            <img
              class="alderwick-hero-img"
              src="${ALDERWICK_ASSETS.hero}"
              alt="${ALDERWICK_FULL_TITLE} waving from a floating Eldermere tabletop tile"
              width="148"
              height="148"
              draggable="false"
            />
          </div>
          <span class="alderwick-nameplate">
            ${renderIcon('star', 'icon icon-xs icon-star')}
            <span>${ALDERWICK_FULL_TITLE}</span>
          </span>
        </div>

        <h2 class="tutorial-modal-headline">Welcome to Eldermere!</h2>

        <p class="tutorial-modal-copy alderwick-speech-bubble">
          “${realmWelcome}”
        </p>

        <ul class="tutorial-intro-list">
          <li>
            <span class="tutorial-intro-icon" aria-hidden="true">${renderIcon('wheat', 'icon icon-xs')}</span>
            <span>Harvest Starlight &amp; grow your capital</span>
          </li>
          <li>
            <span class="tutorial-intro-icon" aria-hidden="true">${renderIcon('compass', 'icon icon-xs')}</span>
            <span>March into the Fog &amp; claim neutral Villages</span>
          </li>
          <li>
            <span class="tutorial-intro-icon" aria-hidden="true">${renderIcon('swords', 'icon icon-xs')}</span>
            <span>Battle rival banners across the board</span>
          </li>
          <li>
            <span class="tutorial-intro-icon" aria-hidden="true">${renderIcon('codex', 'icon icon-xs')}</span>
            <span>Unlock your Codex &amp; ascend the Three Ages</span>
          </li>
        </ul>

        <button type="button" class="btn btn-cta tutorial-modal-cta" data-tutorial-modal-action="start">
          <span>Begin the Chronicle</span>
          ${renderIcon('chevronRight', 'icon icon-sm')}
        </button>
      </div>
    `;

    this.modalEl
      .querySelector<HTMLButtonElement>('[data-tutorial-modal-action="start"]')
      ?.addEventListener('click', () => {
        this.dismissModal();
      });
  }

  private renderCompleteModal(): void {
    const playerFaction = this.context.faction ?? null;

    const superpowerCardsHtml = SUPERPOWER_SHOWCASE.map((entry) => {
      const isPlayerFaction = playerFaction === entry.faction;
      const accent = FACTION_ACCENT[entry.faction];
      return `
        <div
          class="alderwick-power-item ${isPlayerFaction ? 'is-player-faction' : ''}"
          style="--power-accent: ${accent};"
        >
          <span class="alderwick-power-icon" style="background: ${accent};" aria-hidden="true">
            ${renderFactionSuperpowerIcon(entry.faction, 'icon icon-xs')}
          </span>
          <div class="alderwick-power-copy">
            <div class="alderwick-power-head">
              <span class="alderwick-power-name">${esc(entry.powerName)}</span>
              <span class="alderwick-power-faction">
                ${renderFactionCrest(entry.faction, 'icon alderwick-mini-crest')}
                <span>${esc(entry.realmLabel)}</span>
                ${isPlayerFaction ? '<em class="alderwick-your-tag">Yours</em>' : ''}
              </span>
            </div>
            <span class="alderwick-power-desc">${esc(entry.summary)}</span>
          </div>
        </div>
      `;
    }).join('');

    this.modalEl.setAttribute('aria-label', 'Oh—One More Thing, Commander! Ages and Superpowers');
    this.modalEl.innerHTML = `
      <div class="modal-panel tutorial-modal-panel tutorial-complete-panel alderwick-magic-card">
        <div class="tutorial-modal-kicker is-gold">
          ${renderIcon('star', 'icon icon-xs')}
          <span>Tutorial Complete &middot; Secret of the Ages</span>
        </div>

        <div class="alderwick-magic-header">
          <div class="alderwick-magic-frame">
            <img
              class="alderwick-magic-img"
              src="${ALDERWICK_ASSETS.magic}"
              alt="${ALDERWICK_FULL_TITLE} conjuring starlight magic"
              width="124"
              height="124"
              draggable="false"
            />
          </div>
          <div class="alderwick-magic-intro">
            <h2 class="tutorial-modal-headline alderwick-magic-headline">Oh—One More Thing, Commander!</h2>
            <p class="alderwick-magic-lead">
              “Keep researching technologies in your <strong>Codex</strong>! Every realm climbs through <strong>Three Ages</strong> to unleash its ultimate <strong>Superpower</strong>.”
            </p>
          </div>
        </div>

        <div class="alderwick-ages-strip" role="list" aria-label="Age Progression">
          <div class="alderwick-age-chip" role="listitem">
            <span class="alderwick-age-badge">Age II</span>
            <span class="alderwick-age-req">3 Techs</span>
            <span class="alderwick-age-desc">Elite troops &amp; stronger economy</span>
          </div>
          <span class="alderwick-age-arrow" aria-hidden="true">&rarr;</span>
          <div class="alderwick-age-chip is-zenith" role="listitem">
            <span class="alderwick-age-badge">Age III</span>
            <span class="alderwick-age-req">7 Techs</span>
            <span class="alderwick-age-desc">Capstones &amp; Realm Superpower!</span>
          </div>
        </div>

        <div class="alderwick-power-grid" aria-label="Four Realm Superpowers">
          ${superpowerCardsHtml}
        </div>

        <p class="alderwick-magic-signoff">
          “Wield yours wisely—and do try not to singe my favorite beard hairs!”
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
