import { FACTION_DEFINITIONS } from '../game/data';
import type { FactionId } from '../game/types';
import { FACTION_HERALDRY } from './Screens';
import { renderFactionCrest, renderFactionSuperpowerIcon, renderIcon } from './icons';

export interface AgeUpModalViewModel {
  faction: FactionId;
  newAge: 2 | 3;
  superpowerName?: string;
  superpowerDescription?: string;
}

export interface AgeUpModalCallbacks {
  onClose?: () => void;
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export class AgeUpModal {
  private readonly root: HTMLElement;
  private readonly callbacks: AgeUpModalCallbacks;
  private openState = false;
  private readonly onKeyDown: (e: KeyboardEvent) => void;

  constructor(container: HTMLElement, callbacks: AgeUpModalCallbacks = {}) {
    this.callbacks = callbacks;
    this.root = document.createElement('div');
    this.root.className = 'modal-backdrop age-up-modal hidden';
    this.root.setAttribute('role', 'dialog');
    this.root.setAttribute('aria-modal', 'true');
    this.root.setAttribute('aria-label', 'Age Reached');
    container.appendChild(this.root);

    this.root.addEventListener('click', (e) => {
      if (e.target === this.root) {
        this.close();
      }
    });

    this.onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.openState) {
        e.stopPropagation();
        this.close();
      }
    };
    window.addEventListener('keydown', this.onKeyDown);
  }

  public isOpen(): boolean {
    return this.openState;
  }

  public open(vm: AgeUpModalViewModel): void {
    this.openState = true;
    this.render(vm);
    this.root.classList.remove('hidden');
  }

  public close(): void {
    if (!this.openState) return;
    this.openState = false;
    this.root.classList.add('hidden');
    this.root.innerHTML = '';
    this.callbacks.onClose?.();
  }

  public destroy(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    this.root.remove();
  }

  private render(vm: AgeUpModalViewModel): void {
    const factionDef = FACTION_DEFINITIONS[vm.faction];
    const heraldry = FACTION_HERALDRY[vm.faction];
    const isAgeThree = vm.newAge === 3;
    const headline = isAgeThree ? 'Age III Reached!' : 'Age II Reached!';
    const summaryText = isAgeThree
      ? `The ${factionDef.name} enter their zenith! Age III Capstone technologies are now unlocked in your Codex.`
      : `The ${factionDef.name} advance! Age II technologies and elite units are now unlocked in your Codex.`;

    const superpowerCardHtml =
      isAgeThree && vm.superpowerName
        ? `
          <div class="age-up-superpower-card" style="--age-heraldry: ${heraldry};">
            <div class="age-up-superpower-icon" aria-hidden="true">
              ${renderFactionSuperpowerIcon(vm.faction, 'icon icon-lg')}
            </div>
            <div class="age-up-superpower-copy">
              <div class="age-up-superpower-label">Superpower Unlocked</div>
              <div class="age-up-superpower-name">${esc(vm.superpowerName)}</div>
              ${
                vm.superpowerDescription
                  ? `<p class="age-up-superpower-desc">${esc(vm.superpowerDescription)}</p>`
                  : ''
              }
            </div>
          </div>
        `
        : `
          <div class="age-up-unlock-strip">
            <span class="age-up-unlock-icon" aria-hidden="true">${renderIcon('codex', 'icon icon-sm')}</span>
            <span>Age II Codex branches &amp; upgrades unlocked</span>
          </div>
        `;

    this.root.setAttribute('aria-label', headline);
    this.root.innerHTML = `
      <div class="modal-panel age-up-panel ${isAgeThree ? 'is-age-three' : 'is-age-two'}" style="--age-heraldry: ${heraldry};">
        <div class="age-up-crest-ring" aria-hidden="true">
          <span class="age-up-crest-medallion" style="background: ${heraldry};">
            ${renderFactionCrest(vm.faction, 'icon age-up-crest-svg')}
          </span>
          <span class="age-up-roman-badge">${isAgeThree ? 'III' : 'II'}</span>
        </div>

        <h2 class="age-up-headline">${headline}</h2>
        <p class="age-up-summary">${esc(summaryText)}</p>

        ${superpowerCardHtml}

        <button type="button" class="btn btn-cta age-up-cta" data-age-up-continue>
          <span>Onward</span>
          ${renderIcon('chevronRight', 'icon icon-sm')}
        </button>
      </div>
    `;

    this.root
      .querySelector<HTMLButtonElement>('[data-age-up-continue]')
      ?.addEventListener('click', () => {
        this.close();
      });
  }
}
