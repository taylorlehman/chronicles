import { FACTION_DEFINITIONS } from '../game/data';
import type { FactionId, LeaderboardEntry } from '../game/types';
import { FACTION_HERALDRY } from './Screens';
import { renderFactionCrest, renderIcon } from './icons';

export interface LeaderboardModalViewModel {
  entries: LeaderboardEntry[];
  turn: number;
  maxTurns: number;
  tutorialActive?: boolean;
}

export interface LeaderboardModalCallbacks {
  onSelectFaction?: (faction: FactionId) => void;
  onEndTutorial?: () => void;
  onResign?: () => void;
  onClose: () => void;
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export class LeaderboardModal {
  private readonly root: HTMLElement;
  private readonly callbacks: LeaderboardModalCallbacks;
  private openState = false;
  private confirmingResign = false;
  private lastVm: LeaderboardModalViewModel | null = null;
  private readonly onKeyDown: (e: KeyboardEvent) => void;

  constructor(container: HTMLElement, callbacks: LeaderboardModalCallbacks) {
    this.callbacks = callbacks;
    this.root = document.createElement('div');
    this.root.className = 'modal-backdrop leaderboard-modal hidden';
    this.root.setAttribute('role', 'dialog');
    this.root.setAttribute('aria-modal', 'true');
    this.root.setAttribute('aria-label', 'Live Leaderboard');
    container.appendChild(this.root);

    this.root.addEventListener('click', (e) => {
      if (e.target === this.root) {
        this.close();
      }
    });

    this.onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.openState) {
        this.close();
      }
    };
    window.addEventListener('keydown', this.onKeyDown);
  }

  public isOpen(): boolean {
    return this.openState;
  }

  public open(vm: LeaderboardModalViewModel): void {
    this.lastVm = vm;
    this.confirmingResign = false;
    this.openState = true;
    this.render();
    this.root.classList.remove('hidden');
  }

  public update(vm: LeaderboardModalViewModel): void {
    this.lastVm = vm;
    if (this.openState) {
      this.render();
    }
  }

  public close(): void {
    if (!this.openState) return;
    this.openState = false;
    this.confirmingResign = false;
    this.root.classList.add('hidden');
    this.callbacks.onClose();
  }

  public destroy(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    this.root.remove();
  }

  private render(): void {
    const vm = this.lastVm;
    if (!vm) return;

    const maxScore = Math.max(1, ...vm.entries.map((e) => e.score));

    const rowsHtml = vm.entries
      .map((entry) => {
        const fDef = FACTION_DEFINITIONS[entry.faction];
        const heraldry = FACTION_HERALDRY[entry.faction];
        const pct = Math.max(4, Math.min(100, Math.round((entry.score / maxScore) * 100)));
        const rankClass = `rank-${Math.min(4, Math.max(1, entry.rank))}`;
        const citiesLabel = entry.citiesCount === 1 ? '1 City' : `${entry.citiesCount} Cities`;

        const tagHtml = entry.isEliminated
          ? `<span class="lb-tag lb-tag-fallen">Fallen</span>`
          : entry.isHuman
            ? `<span class="lb-tag lb-tag-you">You</span>`
            : '';

        return `
          <button
            type="button"
            class="leaderboard-row is-clickable ${entry.isHuman ? 'is-human' : ''} ${entry.isEliminated ? 'is-eliminated' : ''}"
            data-lb-faction="${entry.faction}"
            style="--lb-heraldry: ${heraldry};"
            aria-label="Inspect ${esc(fDef.name)} — Rank ${entry.rank}, ${esc(citiesLabel)}, ${entry.score} Glory"
          >
            <div class="leaderboard-row-top">
              <div class="leaderboard-identity">
                <span class="lb-rank-badge ${rankClass}" aria-label="Rank ${entry.rank}">#${entry.rank}</span>
                <span class="faction-crest-badge lb-crest-badge" style="background: ${heraldry};">
                  ${renderFactionCrest(entry.faction, 'icon icon-crest-sm')}
                </span>
                <div class="lb-name-block">
                  <div class="lb-name-line">
                    <span class="lb-faction-name">${esc(fDef.name)}</span>
                    ${tagHtml}
                  </div>
                  <div class="lb-cities-stat">
                    ${renderIcon('tower', 'icon icon-xs')}
                    <span>${esc(citiesLabel)}</span>
                  </div>
                </div>
              </div>

              <div class="leaderboard-right-group">
                <div class="leaderboard-score-col">
                  <span class="lb-score-val">${entry.score.toLocaleString()}</span>
                  <span class="lb-score-label">Glory</span>
                </div>
                <span class="lb-row-chevron" aria-hidden="true">${renderIcon('chevronRight', 'icon icon-sm')}</span>
              </div>
            </div>

            <div class="lb-progress-track" aria-hidden="true">
              <div class="lb-progress-fill" style="width: ${pct}%; background: ${heraldry};"></div>
            </div>
          </button>
        `;
      })
      .join('');

    const turnSubtitle =
      vm.maxTurns > 0 ? `Turn ${vm.turn} / ${vm.maxTurns}` : `Turn ${vm.turn}`;
    const footerHint =
      vm.maxTurns > 0
        ? `Capture all enemy capitals or lead Glory at Turn ${vm.maxTurns}`
        : 'Capture all enemy capitals to win · Tap a realm for details';

    this.root.innerHTML = `
      <div class="modal-panel leaderboard-modal-panel">
        <div class="sheet-handle" aria-hidden="true"></div>
        <div class="modal-header">
          <div class="modal-title-wrap">
            <h2 class="modal-title">
              <span class="lb-header-trophy">${renderIcon('trophy', 'icon')}</span>
              <span>Realm Standings</span>
            </h2>
            <span class="modal-subtitle">
              <strong class="lb-turn-pill">${turnSubtitle}</strong>
            </span>
          </div>
          <button type="button" class="btn btn-icon modal-close-btn" data-action="close" aria-label="Close Leaderboard">
            ${renderIcon('close', 'icon')}
          </button>
        </div>

        <div class="leaderboard-list" role="list" aria-label="Civilization Rankings">
          ${rowsHtml}
        </div>

        <div class="leaderboard-footer">
          <div class="leaderboard-footer-hint">
            ${renderIcon('crown', 'icon icon-sm icon-star')}
            <span>${footerHint}</span>
          </div>
          <div class="lb-footer-actions">
            ${
              vm.tutorialActive && this.callbacks.onEndTutorial
                ? `
                  <button type="button" class="btn lb-end-tutorial-btn" data-action="end-tutorial">
                    <span>End Tutorial</span>
                  </button>
                `
                : ''
            }
            ${
              this.callbacks.onResign
                ? this.confirmingResign
                  ? `
                    <div class="lb-resign-confirm">
                      <span class="lb-resign-prompt">Resign campaign?</span>
                      <button type="button" class="btn btn-secondary lb-resign-cancel" data-action="resign-cancel">Cancel</button>
                      <button type="button" class="btn lb-resign-yes" data-action="resign-confirm">Resign</button>
                    </div>
                  `
                  : `
                    <button type="button" class="btn lb-resign-btn" data-action="resign">
                      <span>Resign</span>
                    </button>
                  `
                : ''
            }
          </div>
        </div>
      </div>
    `;

    this.root
      .querySelector<HTMLButtonElement>('[data-action="close"]')
      ?.addEventListener('click', () => {
        this.close();
      });

    this.root
      .querySelector<HTMLButtonElement>('[data-action="end-tutorial"]')
      ?.addEventListener('click', () => {
        this.callbacks.onEndTutorial?.();
      });

    this.root
      .querySelector<HTMLButtonElement>('[data-action="resign"]')
      ?.addEventListener('click', () => {
        this.confirmingResign = true;
        this.render();
      });

    this.root
      .querySelector<HTMLButtonElement>('[data-action="resign-cancel"]')
      ?.addEventListener('click', () => {
        this.confirmingResign = false;
        this.render();
      });

    this.root
      .querySelector<HTMLButtonElement>('[data-action="resign-confirm"]')
      ?.addEventListener('click', () => {
        this.close();
        this.callbacks.onResign?.();
      });

    this.root.querySelectorAll<HTMLButtonElement>('[data-lb-faction]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const faction = btn.dataset.lbFaction as FactionId;
        if (faction) {
          this.callbacks.onSelectFaction?.(faction);
        }
      });
    });
  }
}
