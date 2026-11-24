import {
  ALL_FACTIONS,
  FACTION_DEFINITIONS,
  TECH_DEFINITIONS,
  UNIT_DEFINITIONS,
  getFactionTechs,
} from '../game/data';
import type { FactionId, PlayerState } from '../game/types';
import { FACTION_HERALDRY } from './Screens';
import { renderFactionCrest, renderIcon, renderUnitIcon } from './icons';
import { renderUnitThumbOrIcon } from './thumbs';

export interface FactionDossierModalViewModel {
  humanPlayer: PlayerState;
  allPlayers: PlayerState[];
}

export interface FactionDossierModalCallbacks {
  onBack?: () => void;
  onClose: () => void;
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatStars(text: string): string {
  return esc(text).replace(/★/g, renderIcon('star', 'icon icon-sm icon-star'));
}

export class FactionDossierModal {
  private readonly root: HTMLElement;
  private readonly callbacks: FactionDossierModalCallbacks;
  private openState = false;
  private activeFaction: FactionId = 'humans';
  private lastVm: FactionDossierModalViewModel | null = null;
  private readonly onKeyDown: (e: KeyboardEvent) => void;

  constructor(container: HTMLElement, callbacks: FactionDossierModalCallbacks) {
    this.callbacks = callbacks;
    this.root = document.createElement('div');
    this.root.className = 'modal-backdrop dossier-modal hidden';
    this.root.setAttribute('role', 'dialog');
    this.root.setAttribute('aria-modal', 'true');
    this.root.setAttribute('aria-label', 'Faction Abilities Dossier');
    container.appendChild(this.root);

    this.root.addEventListener('click', (e) => {
      if (e.target === this.root) {
        this.close();
      }
    });

    this.onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.openState) {
        if (this.callbacks.onBack) {
          this.callbacks.onBack();
        } else {
          this.close();
        }
      }
    };
    window.addEventListener('keydown', this.onKeyDown);
  }

  public isOpen(): boolean {
    return this.openState;
  }

  public open(vm: FactionDossierModalViewModel, focusFaction?: FactionId): void {
    this.lastVm = vm;
    this.activeFaction = focusFaction ?? vm.humanPlayer.faction;
    this.openState = true;
    this.render();
    this.root.classList.remove('hidden');
  }

  public update(vm: FactionDossierModalViewModel): void {
    this.lastVm = vm;
    if (this.openState) {
      this.render();
    }
  }

  public close(): void {
    if (!this.openState) return;
    this.openState = false;
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

    const viewedFaction = this.activeFaction;
    const isHumanFaction = viewedFaction === vm.humanPlayer.faction;
    const def = FACTION_DEFINITIONS[viewedFaction];
    const uniqueUnit = UNIT_DEFINITIONS[def.uniqueUnit];
    const startTech = TECH_DEFINITIONS[def.startingTech];
    const heraldry = FACTION_HERALDRY[viewedFaction];
    const matchedPlayer = vm.allPlayers.find((p) => p.faction === viewedFaction) ?? null;

    const tabsHtml = ALL_FACTIONS.map((fId) => {
      const fDef = FACTION_DEFINITIONS[fId];
      const fHeraldry = FACTION_HERALDRY[fId];
      const isActive = fId === viewedFaction;
      const p = vm.allPlayers.find((pl) => pl.faction === fId);
      const isEliminated = p ? !p.alive : false;

      return `
        <button
          type="button"
          class="dossier-tab ${isActive ? 'active' : ''} ${isEliminated ? 'eliminated' : ''}"
          data-dossier-faction="${fId}"
          style="--tab-heraldry: ${fHeraldry};"
          aria-selected="${isActive}"
        >
          <span class="dossier-tab-crest" style="background: ${fHeraldry};">
            ${renderFactionCrest(fId, 'icon icon-crest-sm')}
          </span>
          <span class="dossier-tab-name">${esc(fDef.name)}</span>
        </button>
      `;
    }).join('');

    const unitThumbHtml = renderUnitThumbOrIcon(
      uniqueUnit.type,
      viewedFaction,
      renderUnitIcon(uniqueUnit.type, 'icon icon-xl'),
      'thumb-3d thumb-dossier-unit',
    );

    const traitsHtml = uniqueUnit.traits
      .map((t) => `<span class="trait-pill">${esc(t)}</span>`)
      .join('');

    const factionTechs = getFactionTechs(viewedFaction);
    let passivesTitle = 'Active Passives';
    let passivesHtml = '';

    if (isHumanFaction) {
      const unlockedSet = new Set(vm.humanPlayer.techs);
      const unlocked = factionTechs.filter((t) => unlockedSet.has(t.id));
      passivesTitle = `Active Passives (${unlocked.length}/${factionTechs.length})`;
      if (unlocked.length === 0) {
        passivesHtml = `<p class="dossier-empty-note">None yet — research lore in the Codex.</p>`;
      } else {
        passivesHtml = `
          <ul class="dossier-passive-list">
            ${unlocked
              .map(
                (t) => `
                  <li class="dossier-passive-item ${t.tier === 3 ? 'is-capstone' : ''}">
                    <span class="dossier-passive-head">
                      <span class="dossier-passive-name">
                        ${t.tier === 3 ? renderIcon('crown', 'icon icon-sm icon-star') : renderIcon('check', 'icon icon-sm')}
                        <span>${esc(t.name)}</span>
                      </span>
                      <span class="dossier-passive-pillar">${esc(t.pillar)}</span>
                    </span>
                    <span class="dossier-passive-summary">${formatStars(t.summary)}</span>
                  </li>
                `,
              )
              .join('')}
          </ul>
        `;
      }
    } else {
      const capstones = factionTechs.filter((t) => t.tier === 3);
      passivesTitle = `Realm Capstones (${capstones.length})`;
      passivesHtml = `
        <ul class="dossier-passive-list">
          ${capstones
            .map(
              (t) => `
                <li class="dossier-passive-item is-capstone">
                  <span class="dossier-passive-head">
                    <span class="dossier-passive-name">
                      ${renderIcon('crown', 'icon icon-sm icon-star')}
                      <span>${esc(t.name)}</span>
                    </span>
                    <span class="dossier-passive-pillar">${esc(t.pillar)}</span>
                  </span>
                  <span class="dossier-passive-summary">${formatStars(t.summary)}</span>
                </li>
              `,
            )
            .join('')}
        </ul>
      `;
    }

    const statusLine = matchedPlayer
      ? matchedPlayer.alive
        ? `${matchedPlayer.score.toLocaleString()} Glory`
        : `Fallen (T${matchedPlayer.eliminatedOnTurn ?? '?'})`
      : '';

    const backBtnHtml = this.callbacks.onBack
      ? `
        <button type="button" class="btn btn-secondary dossier-back-btn" data-action="back" aria-label="Back to Standings">
          <span>&larr; Scores</span>
        </button>
      `
      : '';

    this.root.innerHTML = `
      <div class="modal-panel dossier-modal-panel">
        <div class="sheet-handle" aria-hidden="true"></div>
        <div class="modal-header">
          <div class="modal-title-wrap">
            ${backBtnHtml}
            <h2 class="modal-title">
              <span class="faction-crest-badge" style="background: ${heraldry}; width: 28px; height: 28px;">
                ${renderFactionCrest(viewedFaction, 'icon icon-crest-sm')}
              </span>
              <span>${esc(def.realm)}</span>
            </h2>
            <span class="modal-subtitle">
              <span>${esc(startTech.name)}</span>
              ${statusLine ? `<span>&middot;</span><span>${esc(statusLine)}</span>` : ''}
            </span>
          </div>
          <button type="button" class="btn btn-icon modal-close-btn" data-action="close" aria-label="Close Faction Dossier">
            ${renderIcon('close', 'icon')}
          </button>
        </div>

        <div class="dossier-tabs" role="tablist" aria-label="Inspect Factions">
          ${tabsHtml}
        </div>

        <div class="dossier-body">
          <div class="dossier-section">
            <div class="dossier-kicker">Trait</div>
            <div class="dossier-mechanic-title">${esc(def.uniqueMechanicName)}</div>
            <p class="dossier-mechanic-desc">${formatStars(def.uniqueMechanicDescription)}</p>
          </div>

          <div class="dossier-section">
            <div class="dossier-kicker">Champion</div>
            <div class="dossier-unit-row">
              <div class="dossier-unit-thumb-frame">${unitThumbHtml}</div>
              <div class="dossier-unit-info">
                <div class="dossier-unit-head">
                  <span class="dossier-unit-name">${esc(uniqueUnit.name)}</span>
                  <span class="cost-tag">${uniqueUnit.cost}${renderIcon('star', 'icon icon-sm icon-star')}</span>
                </div>
                <div class="stat-strip compact">
                  <div class="stat-pair"><span class="stat-k">HP</span><span class="stat-v">${uniqueUnit.maxHp}</span></div>
                  <div class="stat-pair"><span class="stat-k">ATK</span><span class="stat-v">${uniqueUnit.attack}</span></div>
                  <div class="stat-pair"><span class="stat-k">DEF</span><span class="stat-v">${uniqueUnit.defense}</span></div>
                  <div class="stat-pair"><span class="stat-k">MOV</span><span class="stat-v">${uniqueUnit.movement}</span></div>
                  ${uniqueUnit.range > 1 ? `<div class="stat-pair"><span class="stat-k">RNG</span><span class="stat-v">${uniqueUnit.range}</span></div>` : ''}
                </div>
                ${traitsHtml ? `<div class="trait-row">${traitsHtml}</div>` : ''}
              </div>
            </div>
          </div>

          <div class="dossier-section">
            <div class="dossier-kicker">${esc(passivesTitle)}</div>
            ${passivesHtml}
          </div>
        </div>
      </div>
    `;

    this.root.querySelector<HTMLButtonElement>('[data-action="back"]')?.addEventListener('click', () => {
      this.callbacks.onBack?.();
    });

    this.root.querySelector<HTMLButtonElement>('[data-action="close"]')?.addEventListener('click', () => {
      this.close();
    });

    this.root.querySelectorAll<HTMLButtonElement>('[data-dossier-faction]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const f = btn.dataset.dossierFaction as FactionId;
        if (f && f !== this.activeFaction) {
          this.activeFaction = f;
          this.render();
        }
      });
    });
  }
}
