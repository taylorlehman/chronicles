import { FACTION_DEFINITIONS } from '../game/data';
import type { FactionId } from '../game/types';
import { FACTION_HERALDRY } from './Screens';
import { renderFactionCrest, renderIcon } from './icons';

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export class DefeatNoticeModal {
  private readonly root: HTMLElement;
  private openState = false;
  private pendingResolve: (() => void) | null = null;
  private readonly onKeyDown: (e: KeyboardEvent) => void;

  constructor(container: HTMLElement) {
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

  public show(defeatedFaction: FactionId, victorFaction: FactionId): Promise<void> {
    if (this.pendingResolve) {
      this.close();
    }

    this.openState = true;
    this.render(defeatedFaction, victorFaction);
    this.root.classList.remove('hidden');

    const continueBtn = this.root.querySelector<HTMLButtonElement>('[data-action="continue"]');
    window.requestAnimationFrame(() => {
      continueBtn?.focus();
    });

    return new Promise<void>((resolve) => {
      this.pendingResolve = resolve;
    });
  }

  public close(): void {
    if (!this.openState && !this.pendingResolve) return;
    this.openState = false;
    this.root.classList.add('hidden');
    const resolve = this.pendingResolve;
    this.pendingResolve = null;
    resolve?.();
  }

  public destroy(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    this.close();
    this.root.remove();
  }

  private render(defeatedFaction: FactionId, victorFaction: FactionId): void {
    const defeatedDef = FACTION_DEFINITIONS[defeatedFaction];
    const victorDef = FACTION_DEFINITIONS[victorFaction];
    const defeatedColor = FACTION_HERALDRY[defeatedFaction];
    const victorColor = FACTION_HERALDRY[victorFaction];

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
          ${esc(defeatedDef.name)} was defeated by ${esc(victorDef.name)}
        </h2>
        <p class="defeat-notice-subline">Their final stronghold has fallen.</p>

        <button type="button" class="btn btn-cta defeat-notice-btn" data-action="continue">
          <span>Continue</span>
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
