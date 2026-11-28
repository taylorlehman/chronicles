import { FACTION_DEFINITIONS } from '../game/data';
import type { FactionId } from '../game/types';
import { renderAlderwickScene } from './AlderwickSpeech';
import { FACTION_HERALDRY } from './Screens';
import { STAR_CROWN_TOTAL_SHARDS, renderStarCrownForge } from './StarCrown';
import {
  ALDERWICK_ASSETS,
  ALDERWICK_FULL_TITLE,
  getEliminationWhisper,
  getRivalDefeatCongrats,
} from './alderwick';
import { renderFactionCrest, renderIcon } from './icons';

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export interface RivalDefeatCrownForge {
  beforeShards: readonly FactionId[];
  addedShards: readonly FactionId[];
  afterShards: readonly FactionId[];
  total?: number;
}

export interface DefeatNoticeCallbacks {
  onClose?: (isHumanDefeated: boolean) => void;
}

export class DefeatNoticeModal {
  private readonly root: HTMLElement;
  private readonly callbacks: DefeatNoticeCallbacks;
  private openState = false;
  private humanDefeatedMode = false;
  private humanVictorMode = false;
  private pendingResolve: (() => void) | null = null;
  private readonly onKeyDown: (e: KeyboardEvent) => void;

  constructor(container: HTMLElement, callbacks: DefeatNoticeCallbacks = {}) {
    this.callbacks = callbacks;
    this.root = document.createElement('div');
    this.root.className = 'modal-backdrop defeat-notice-modal hidden';
    this.root.setAttribute('role', 'dialog');
    this.root.setAttribute('aria-modal', 'true');
    this.root.setAttribute('aria-label', 'Faction Defeated');
    container.appendChild(this.root);

    this.root.addEventListener('click', (e) => {
      if (e.target === this.root && this.openState) {
        this.close();
      }
    });

    this.onKeyDown = (e: KeyboardEvent) => {
      if (!this.openState) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        this.close();
      }
    };
    window.addEventListener('keydown', this.onKeyDown);
  }

  public isOpen(): boolean {
    return this.openState;
  }

  public isHumanDefeated(): boolean {
    return this.openState && this.humanDefeatedMode;
  }

  public isHumanVictor(): boolean {
    return this.openState && this.humanVictorMode;
  }

  public show(
    defeatedFaction: FactionId,
    victorFaction: FactionId,
    isHumanDefeated = false,
    isHumanVictor = false,
    crownForge?: RivalDefeatCrownForge,
  ): Promise<void> {
    if (this.pendingResolve || this.openState) {
      this.close(true);
    }

    const humanCongrats = isHumanVictor && !isHumanDefeated;
    this.openState = true;
    this.humanDefeatedMode = isHumanDefeated;
    this.humanVictorMode = humanCongrats;
    this.root.setAttribute('data-human-defeated', String(isHumanDefeated));
    this.root.setAttribute('data-human-victor', String(humanCongrats));
    this.render(defeatedFaction, victorFaction, isHumanDefeated, humanCongrats, crownForge);
    this.root.classList.remove('hidden');

    const continueBtn = this.root.querySelector<HTMLButtonElement>('[data-action="continue"]');
    window.requestAnimationFrame(() => {
      continueBtn?.focus();
    });

    return new Promise<void>((resolve) => {
      this.pendingResolve = resolve;
    });
  }

  public close(silent = false): void {
    if (!this.openState && !this.pendingResolve) return;
    const wasOpen = this.openState;
    const wasHumanDefeated = this.humanDefeatedMode;
    this.openState = false;
    this.humanDefeatedMode = false;
    this.humanVictorMode = false;
    this.root.classList.add('hidden');
    this.root.removeAttribute('data-human-defeated');
    this.root.removeAttribute('data-human-victor');
    const resolve = this.pendingResolve;
    this.pendingResolve = null;
    resolve?.();
    if (wasOpen && !silent) {
      this.callbacks.onClose?.(wasHumanDefeated);
    }
  }

  public destroy(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    this.close(true);
    this.root.remove();
  }

  private render(
    defeatedFaction: FactionId,
    victorFaction: FactionId,
    isHumanDefeated: boolean,
    isHumanVictor: boolean,
    crownForge?: RivalDefeatCrownForge,
  ): void {
    const defeatedDef = FACTION_DEFINITIONS[defeatedFaction];
    const victorDef = FACTION_DEFINITIONS[victorFaction];
    const defeatedColor = FACTION_HERALDRY[defeatedFaction];
    const victorColor = FACTION_HERALDRY[victorFaction];

    if (isHumanVictor && !isHumanDefeated) {
      const total = crownForge?.total ?? STAR_CROWN_TOTAL_SHARDS;
      const beforeShards = crownForge?.beforeShards ?? [victorFaction];
      const addedShards =
        crownForge && crownForge.addedShards.length > 0 ? crownForge.addedShards : [defeatedFaction];
      const afterShards =
        crownForge && crownForge.afterShards.length > 0
          ? crownForge.afterShards
          : Array.from(new Set([...beforeShards, ...addedShards]));
      const afterCount = Math.min(total, new Set(afterShards).size);
      const addedCount = new Set(addedShards).size;

      const congrats = getRivalDefeatCongrats(defeatedFaction, victorFaction, {
        afterCount,
        addedCount,
        total,
      });
      const forgeHtml = renderStarCrownForge({
        beforeShards,
        addedShards,
        afterShards,
        total,
      });

      this.root.className = 'alderwick-stage-backdrop defeat-notice-modal is-human-victory';
      this.root.setAttribute('aria-label', `${defeatedDef.name} Defeated — ${ALDERWICK_FULL_TITLE} congratulates you`);
      this.root.innerHTML = renderAlderwickScene({
        pose: 'cheer',
        variant: 'stage',
        extraClass: 'is-rival-congrats',
        headerHtml: `
          <span class="rival-congrats-crest" style="background: ${defeatedColor};" aria-hidden="true">
            ${renderFactionCrest(defeatedFaction, 'icon')}
          </span>
          <strong class="rival-congrats-title">${esc(congrats.kicker)}</strong>
          <span class="rival-congrats-badge">
            ${renderIcon('crown', 'icon icon-xs')}
            <span>${afterCount} / ${total} Forged</span>
          </span>
        `,
        bodyHtml: `
          ${forgeHtml}
          <p class="alderwick-bubble-lead">${esc(congrats.lead)}</p>
          <p>${esc(congrats.body)}</p>
          <p class="alderwick-bubble-signoff">${esc(congrats.signoff)}</p>
        `,
        actionsHtml: `
          <button type="button" class="btn btn-cta alderwick-bubble-cta" data-action="continue">
            <span>Onward!</span>
            ${renderIcon('chevronRight', 'icon icon-sm')}
          </button>
        `,
      });

      this.root
        .querySelector<HTMLButtonElement>('[data-action="continue"]')
        ?.addEventListener('click', () => {
          this.close();
        });
      return;
    }

    const alderwickWhisper = getEliminationWhisper(defeatedFaction, victorFaction, isHumanDefeated);
    this.root.className = 'modal-backdrop defeat-notice-modal';
    this.root.setAttribute('aria-label', 'Faction Defeated');

    this.root.innerHTML = `
      <div
        class="modal-panel defeat-notice-panel"
        style="--defeated-color: ${defeatedColor}; --victor-color: ${victorColor};"
      >
        <div class="defeat-notice-kicker">
          ${renderIcon('skull', 'icon icon-sm')}
          <span>Realm Fallen</span>
        </div>

        <div class="defeat-notice-crests" aria-hidden="true">
          <div class="defeat-crest-side is-fallen">
            <div class="defeat-crest-ring fallen" style="background: ${defeatedColor};">
              ${renderFactionCrest(defeatedFaction, 'icon defeat-crest-svg')}
              <span class="defeat-crest-badge fallen">${renderIcon('skull', 'icon icon-xs')}</span>
            </div>
            <span class="defeat-crest-label">${esc(defeatedDef.name)}</span>
          </div>

          <div class="defeat-notice-divider">
            ${renderIcon('swords', 'icon icon-lg')}
          </div>

          <div class="defeat-crest-side is-victor">
            <div class="defeat-crest-ring victor" style="background: ${victorColor};">
              ${renderFactionCrest(victorFaction, 'icon defeat-crest-svg')}
              <span class="defeat-crest-badge victor">${renderIcon('crown', 'icon icon-xs')}</span>
            </div>
            <span class="defeat-crest-label">${esc(victorDef.name)}</span>
          </div>
        </div>

        <h2 class="defeat-notice-headline">
          ${esc(defeatedDef.name)} Fell to ${esc(victorDef.name)}
        </h2>
        <p class="defeat-notice-subline">
          ${esc(defeatedDef.realm)}’s final stronghold has fallen.
        </p>

        <div class="chronicle-alderwick-card is-notice">
          <span class="chronicle-alderwick-avatar is-sm">
            <img
              src="${ALDERWICK_ASSETS.portrait}"
              alt="${ALDERWICK_FULL_TITLE}"
              width="44"
              height="44"
              draggable="false"
            />
          </span>
          <div class="chronicle-alderwick-copy">
            <span class="chronicle-alderwick-speaker">
              ${renderIcon('star', 'icon icon-xs icon-star')}
              <span>${ALDERWICK_FULL_TITLE}</span>
            </span>
            <p class="chronicle-alderwick-quote">“${esc(alderwickWhisper)}”</p>
          </div>
        </div>

        <button type="button" class="btn btn-cta defeat-notice-btn" data-action="continue">
          <span>${isHumanDefeated ? 'Return to Main Menu' : 'Continue'}</span>
          ${renderIcon('chevronRight', 'icon icon-sm')}
        </button>
      </div>
    `;

    this.root
      .querySelector<HTMLButtonElement>('[data-action="continue"]')
      ?.addEventListener('click', () => {
        this.close();
      });
  }
}
