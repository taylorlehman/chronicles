import { FACTION_DEFINITIONS } from '../game/data';
import { AGE_ROMAN } from '../game/rules';
import type { FactionId, LeaderboardEntry, PlayerAge, PlayerId } from '../game/types';
import { FACTION_HERALDRY } from './Screens';
import {
  STAR_CROWN_TOTAL_SHARDS,
  getShardPalette,
  getShardSlotIndex,
  renderShardPips,
  renderStarCrownStandaloneSvg,
  type CrownShardSlot,
} from './StarCrown';
import { renderFactionCrest, renderIcon } from './icons';

export interface LeaderboardModalViewModel {
  entries: LeaderboardEntry[];
  humanPlayerId?: PlayerId;
  humanCrownShards?: readonly FactionId[];
  crownShardsByPlayer?: Record<PlayerId, readonly FactionId[]>;
  turn?: number;
  maxTurns?: number;
  age?: PlayerAge;
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
    this.root.setAttribute('aria-label', 'Star-Crown Progress');
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

    const total = STAR_CROWN_TOTAL_SHARDS;
    const shardsForEntry = (entry: LeaderboardEntry): readonly FactionId[] => {
      const explicit = vm.crownShardsByPlayer?.[entry.playerId];
      if (explicit) return explicit;
      if (entry.isHuman && vm.humanCrownShards) return vm.humanCrownShards;
      return entry.isEliminated ? [] : [entry.faction];
    };

    const humanEntry =
      vm.entries.find((e) => e.playerId === vm.humanPlayerId) ??
      vm.entries.find((e) => e.isHuman);
    const humanShards: readonly FactionId[] =
      vm.humanCrownShards ?? (humanEntry ? shardsForEntry(humanEntry) : ['humans']);
    const humanSlots = new Set<CrownShardSlot>(humanShards.map((f) => getShardSlotIndex(f)));
    const humanCount = Math.min(total, humanSlots.size);

    const sortedEntries = [...vm.entries].sort((a, b) => {
      const sa = shardsForEntry(a).length;
      const sb = shardsForEntry(b).length;
      if (sb !== sa) return sb - sa;
      if (a.isEliminated !== b.isEliminated) return a.isEliminated ? 1 : -1;
      if (b.citiesCount !== a.citiesCount) return b.citiesCount - a.citiesCount;
      if (a.isHuman !== b.isHuman) return a.isHuman ? -1 : 1;
      return 0;
    });

    const rowsHtml = sortedEntries
      .map((entry) => {
        const fDef = FACTION_DEFINITIONS[entry.faction];
        const heraldry = FACTION_HERALDRY[entry.faction];
        const heldShards = shardsForEntry(entry);
        const shardCount = Math.min(total, new Set(heldShards).size);
        const pct = Math.max(0, Math.min(100, Math.round((shardCount / total) * 100)));
        const citiesLabel = entry.isEliminated
          ? 'Fallen'
          : entry.citiesCount === 1
            ? '1 City'
            : `${entry.citiesCount} Cities`;

        const tagHtml = entry.isEliminated
          ? `<span class="lb-tag lb-tag-fallen">Fallen</span>`
          : entry.isHuman
            ? `<span class="lb-tag lb-tag-you">You</span>`
            : '';

        const shardPipsHtml =
          shardCount > 0
            ? `<span class="lb-crown-pips" aria-hidden="true">${Array.from(new Set(heldShards))
                .map((f) => {
                  const p = getShardPalette(f);
                  return `<span class="lb-crown-pip" style="background:${p.pip};" title="${esc(p.realmLabel)} Piece"></span>`;
                })
                .join('')}</span>`
            : '';

        const rightStatHtml = entry.isEliminated
          ? `<span class="lb-crown-claimed">Claimed</span>`
          : `
            <div class="lb-crown-col">
              ${shardPipsHtml}
              <span class="lb-crown-count">${shardCount}/${total}</span>
            </div>
          `;

        const ariaPieces = entry.isEliminated ? 'Claimed' : `${shardCount} of ${total} Crown pieces`;

        return `
          <button
            type="button"
            class="leaderboard-row is-clickable ${entry.isHuman ? 'is-human' : ''} ${entry.isEliminated ? 'is-eliminated' : ''}"
            data-lb-faction="${entry.faction}"
            style="--lb-heraldry: ${heraldry};"
            aria-label="Inspect ${esc(fDef.name)} — ${esc(ariaPieces)}, ${esc(citiesLabel)}"
          >
            <div class="leaderboard-row-top">
              <div class="leaderboard-identity">
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
                ${rightStatHtml}
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

    const turn = Math.max(1, vm.turn ?? 1);
    const ageSubtitle = `Turn ${turn} · Age ${AGE_ROMAN[vm.age ?? 1]}`;
    const footerHint = 'Capture all capitals to reforge the Crown';
    const heroCrownSvg = renderStarCrownStandaloneSvg(humanShards, {
      variant: 'standings',
      showHalo: humanCount >= total,
      showFloatingStars: humanCount >= total,
    });

    this.root.innerHTML = `
      <div class="modal-panel leaderboard-modal-panel">
        <div class="sheet-handle" aria-hidden="true"></div>
        <div class="modal-header">
          <div class="modal-title-wrap">
            <h2 class="modal-title">
              <span class="lb-header-crown">${renderIcon('crown', 'icon')}</span>
              <span>Star-Crown Progress</span>
            </h2>
            <span class="modal-subtitle">
              <strong class="lb-turn-pill">${ageSubtitle}</strong>
            </span>
          </div>
          <button type="button" class="btn btn-icon modal-close-btn" data-action="close" aria-label="Close Star-Crown Progress">
            ${renderIcon('close', 'icon')}
          </button>
        </div>

        <div class="standings-crown-hero" data-standings-crown="${humanCount}">
          <div class="standings-crown-wrap">${heroCrownSvg}</div>
          <div class="standings-crown-meta">
            ${renderShardPips(humanSlots)}
            <span class="standings-crown-caption">${humanCount} of ${total} Crown ${humanCount === 1 ? 'Piece' : 'Pieces'} Reforged</span>
          </div>
        </div>

        <div class="leaderboard-list" role="list" aria-label="Realm Crown Progress">
          ${rowsHtml}
        </div>

        <div class="leaderboard-footer">
          <div class="leaderboard-footer-hint">
            ${renderIcon('crown', 'icon icon-sm icon-star')}
            <span>${footerHint}</span>
          </div>
          <div class="lb-footer-actions">
            ${
              vm.tutorialActive
                ? this.callbacks.onEndTutorial
                  ? `
                    <button type="button" class="btn lb-end-tutorial-btn" data-action="end-tutorial">
                      <span>End Tutorial</span>
                    </button>
                  `
                  : ''
                : this.callbacks.onResign
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
