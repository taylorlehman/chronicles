import { ALL_FACTIONS, FACTION_DEFINITIONS, UNIT_DEFINITIONS } from '../game/data';
import type { Difficulty, FactionId, GameState, MapSize, PlayerId } from '../game/types';
import { renderFactionCrest, renderIcon, renderUnitIcon, type IconName } from './icons';
import type { SavedCampaignSummary } from './persistence';
import { renderUnitThumbOrIcon } from './thumbs';

export interface StartGameOptions {
  humanFaction: FactionId;
  difficulty: Difficulty;
  mapSize: MapSize;
}

export interface TitleScreenCallbacks {
  onStartGame: (options: StartGameOptions) => void;
  onResumeGame?: () => void;
  onSelectFaction?: (faction: FactionId) => void;
}

export interface ScoreBreakdown {
  cities: number;
  techs: number;
  units: number;
  revealedTiles: number;
  total: number;
}

export interface GameOverData {
  state: GameState;
  humanPlayerId: PlayerId;
  scoreBreakdowns?: Record<PlayerId, ScoreBreakdown>;
}

export interface GameOverCallbacks {
  onPlayAgain: () => void;
}

interface FactionPerk {
  icon: IconName;
  text: string;
}

/** Heraldic crest accents per faction (Tabletop Heraldry palette) */
export const FACTION_HERALDRY: Record<FactionId, string> = {
  humans: '#2356c9',
  orcs: '#c92a2a',
  elves: '#12805c',
  dwarves: '#d47415',
};

/** 3 crisp single-line icon-led perks per faction for the Start Console */
const FACTION_PERKS: Record<FactionId, FactionPerk[]> = {
  humans: [
    { icon: 'road', text: '+1 MOV on Roads' },
    { icon: 'star', text: '+1★ Linked Cities' },
    { icon: 'swords', text: 'Sunmark Knight' },
  ],
  orcs: [
    { icon: 'swords', text: '+2★ Kill · +4★ Capture' },
    { icon: 'star', text: '7★ Start & Pillage' },
    { icon: 'axe', text: 'Ironblood Berserker' },
  ],
  elves: [
    { icon: 'tree', text: 'Free Forest Movement' },
    { icon: 'star', text: '+1★ Ancient Woods' },
    { icon: 'bow', text: 'Elven Sentinel' },
  ],
  dwarves: [
    { icon: 'pickaxe', text: 'Climb Peaks Turn 1' },
    { icon: 'star', text: '+1★ Mountain Mines' },
    { icon: 'shield', text: 'Ironbreaker (20 HP)' },
  ],
};

const CONFETTI_COLORS = [
  '#facc15',
  '#fde047',
  '#f59e0b',
  '#38bdf8',
  '#4ade80',
  '#f87171',
  '#fffbeb',
  '#c084fc',
];

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatStars(text: string): string {
  return esc(text).replace(/★/g, renderIcon('star', 'icon icon-xs icon-star'));
}

function renderVictoryLaurelsSvg(): string {
  return `
    <svg class="victory-laurel-svg" viewBox="0 0 260 180" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="laurelGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a" />
          <stop offset="50%" stop-color="#f59e0b" />
          <stop offset="100%" stop-color="#b45309" />
        </linearGradient>
      </defs>
      <!-- Radiant Crown at apex -->
      <g transform="translate(106 4)" stroke="url(#laurelGold)" stroke-width="2.2" stroke-linejoin="round">
        <path d="M4 30h40l-4-18-9 8-7-14-7 14-9-8-4 18z" fill="url(#laurelGold)" fill-opacity="0.32" />
        <path d="M7 35h34" stroke-linecap="round" />
        <circle cx="24" cy="4" r="2.2" fill="#fef08a" stroke="none" />
        <circle cx="9" cy="10" r="1.8" fill="#fef08a" stroke="none" />
        <circle cx="39" cy="10" r="1.8" fill="#fef08a" stroke="none" />
      </g>
      <!-- Left Laurel Branch -->
      <g stroke="url(#laurelGold)" stroke-width="2" fill="url(#laurelGold)" fill-opacity="0.24" stroke-linecap="round">
        <path d="M96 164C54 148 34 114 42 66" fill="none" stroke-width="2.5" />
        <path d="M42 66c-12 2-18 11-16 20 9-2 15-10 16-20z" />
        <path d="M40 84c-13 4-18 13-14 22 9-3 14-12 14-22z" />
        <path d="M44 103c-12 6-16 15-10 23 8-4 12-13 10-23z" />
        <path d="M53 122c-10 8-12 17-5 24 7-5 9-14 5-24z" />
        <path d="M68 140c-8 9-8 18 1 22 6-6 6-14-1-22z" />
        <path d="M45 78c10-6 17-3 20 6-9 2-16-1-20-6z" />
        <path d="M47 98c10-5 17-1 19 8-9 1-16-2-19-8z" />
        <path d="M54 118c10-4 17 1 18 10-9 0-15-4-18-10z" />
        <path d="M66 137c10-2 16 4 15 12-8-1-13-6-15-12z" />
      </g>
      <!-- Right Laurel Branch (mirrored) -->
      <g transform="translate(260 0) scale(-1 1)" stroke="url(#laurelGold)" stroke-width="2" fill="url(#laurelGold)" fill-opacity="0.24" stroke-linecap="round">
        <path d="M96 164C54 148 34 114 42 66" fill="none" stroke-width="2.5" />
        <path d="M42 66c-12 2-18 11-16 20 9-2 15-10 16-20z" />
        <path d="M40 84c-13 4-18 13-14 22 9-3 14-12 14-22z" />
        <path d="M44 103c-12 6-16 15-10 23 8-4 12-13 10-23z" />
        <path d="M53 122c-10 8-12 17-5 24 7-5 9-14 5-24z" />
        <path d="M68 140c-8 9-8 18 1 22 6-6 6-14-1-22z" />
        <path d="M45 78c10-6 17-3 20 6-9 2-16-1-20-6z" />
        <path d="M47 98c10-5 17-1 19 8-9 1-16-2-19-8z" />
        <path d="M54 118c10-4 17 1 18 10-9 0-15-4-18-10z" />
        <path d="M66 137c10-2 16 4 15 12-8-1-13-6-15-12z" />
      </g>
    </svg>
  `;
}

function renderConfettiHtml(heraldryColor: string): string {
  const pieces: string[] = [];
  const count = 36;
  for (let i = 0; i < count; i++) {
    const leftPct = ((i * 29 + 7) % 98) + 1;
    const delaySec = ((i * 0.37) % 4.2).toFixed(2);
    const durSec = (3.4 + ((i * 0.53) % 2.8)).toFixed(2);
    const driftPx = ((i % 2 === 0 ? 1 : -1) * (18 + ((i * 17) % 44))).toFixed(0);
    const rotDeg = (240 + ((i * 73) % 420)).toFixed(0);
    const w = i % 3 === 0 ? 10 : 7;
    const h = i % 3 === 0 ? 14 : i % 2 === 0 ? 10 : 7;
    const color = i % 4 === 0 ? heraldryColor : CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    const radius = i % 5 === 0 ? '50%' : '2px';

    pieces.push(
      `<span class="victory-confetti-piece" style="left:${leftPct}%;width:${w}px;height:${h}px;border-radius:${radius};background:${color};animation-delay:-${delaySec}s;animation-duration:${durSec}s;--confetti-drift:${driftPx}px;--confetti-rot:${rotDeg}deg;"></span>`,
    );
  }
  return `<div class="victory-confetti-layer" aria-hidden="true">${pieces.join('')}</div>`;
}

export class TitleScreen {
  private readonly root: HTMLElement;
  private readonly railEl: HTMLElement;
  private readonly callbacks: TitleScreenCallbacks;
  private selectedFaction: FactionId = 'humans';
  private difficulty: Difficulty = 'normal';
  private mapSize: MapSize = 16;
  private savedCampaign: SavedCampaignSummary | null = null;

  constructor(container: HTMLElement, callbacks: TitleScreenCallbacks) {
    this.callbacks = callbacks;
    this.root = document.createElement('div');
    this.root.className = 'title-screen';
    this.root.setAttribute('data-faction', this.selectedFaction);
    this.railEl = document.createElement('aside');
    this.railEl.className = 'campaign-rail';
    this.railEl.setAttribute('aria-label', 'Campaign Setup');
    this.root.appendChild(this.railEl);
    container.appendChild(this.root);
    this.render();
  }

  public getSelectedFaction(): FactionId {
    return this.selectedFaction;
  }

  public setSavedCampaign(summary: SavedCampaignSummary | null): void {
    this.savedCampaign = summary;
    this.syncResumeBanner();
  }

  public show(): void {
    this.root.classList.remove('hidden');
    this.syncSelectionState();
  }

  public hide(): void {
    this.root.classList.add('hidden');
  }

  public destroy(): void {
    this.root.remove();
  }

  private render(): void {
    this.root.setAttribute('data-faction', this.selectedFaction);

    const emblemTabsHtml = ALL_FACTIONS.map((factionId) => {
      const def = FACTION_DEFINITIONS[factionId];
      const fHeraldry = FACTION_HERALDRY[factionId];
      const isSelected = this.selectedFaction === factionId;

      return `
        <button
          type="button"
          class="emblem-tab ${isSelected ? 'selected' : ''}"
          data-faction-pick="${factionId}"
          style="--tab-accent: ${fHeraldry};"
          aria-pressed="${isSelected}"
        >
          <span class="emblem-tab-crest" style="background: ${fHeraldry};">
            ${renderFactionCrest(factionId)}
          </span>
          <span class="emblem-tab-name">${esc(def.name)}</span>
        </button>
      `;
    }).join('');

    const renderShowcaseInner = (factionId: FactionId): string => {
      const activeDef = FACTION_DEFINITIONS[factionId];
      const uniqueUnit = UNIT_DEFINITIONS[activeDef.uniqueUnit];
      const perks = FACTION_PERKS[factionId];
      const perksHtml = perks
        .map(
          (perk) => `
            <li class="tt-perk-item">
              <span class="tt-perk-icon" aria-hidden="true">${renderIcon(perk.icon, 'icon')}</span>
              <span>${formatStars(perk.text)}</span>
            </li>
          `,
        )
        .join('');
      const unitVisualHtml = renderUnitThumbOrIcon(
        uniqueUnit.type,
        factionId,
        renderUnitIcon(uniqueUnit.type, 'icon icon-lg'),
        'thumb-3d thumb-rail-unit',
      );
      return `
        <div class="tt-champion-frame" title="${esc(uniqueUnit.name)} (HP ${uniqueUnit.maxHp} · ATK ${uniqueUnit.attack} · DEF ${uniqueUnit.defense} · MOV ${uniqueUnit.movement})">
          ${unitVisualHtml}
        </div>
        <div class="tt-showcase-copy">
          <div class="tt-showcase-realm">${esc(activeDef.realm)}</div>
          <ul class="tt-perk-list" aria-label="${esc(activeDef.name)} advantages">
            ${perksHtml}
          </ul>
        </div>
      `;
    };

    const diffLabel = this.difficulty === 'easy' ? 'Squire' : 'Captain';
    const mapLabel = `${this.mapSize}×${this.mapSize}`;

    this.railEl.innerHTML = `
      <header class="tt-title-banner">
        <h1 class="rail-title">Chronicles of Eldermere</h1>
      </header>
      <div class="tt-start-console">
        <div class="faction-emblem-strip" role="group" aria-label="Select Civilization">
          ${emblemTabsHtml}
        </div>

        <section
          class="tt-faction-showcase"
          data-showcase-active="true"
          aria-live="polite"
        >
          ${renderShowcaseInner(this.selectedFaction)}
        </section>

        <div class="tt-resume-slot hidden" data-resume-slot="true"></div>

        <div class="tt-start-actions">
          <button
            type="button"
            class="tt-cycle-btn"
            data-cycle-difficulty="true"
            title="Switch AI Difficulty (Squire / Captain)"
            aria-label="AI Difficulty: ${diffLabel}"
          >
            <span class="tt-cycle-medallion" aria-hidden="true">${renderIcon('helm', 'icon')}</span>
            <span class="tt-cycle-label" data-difficulty-label="true">${diffLabel}</span>
          </button>

          <button
            type="button"
            class="tt-cycle-btn"
            data-cycle-mapsize="true"
            title="Switch Map Size (16×16 / 18×18)"
            aria-label="Map Size: ${mapLabel}"
          >
            <span class="tt-cycle-medallion" aria-hidden="true">${renderIcon('mapGrid', 'icon')}</span>
            <span class="tt-cycle-label" data-mapsize-label="true">${mapLabel}</span>
          </button>

          <button type="button" class="tt-play-btn" data-action="begin">
            ${renderIcon('playSword', 'icon')}
            <span data-begin-label="true">Play</span>
          </button>
        </div>
      </div>
    `;

    this.root.querySelectorAll<HTMLButtonElement>('[data-faction-pick]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const faction = btn.dataset.factionPick as FactionId;
        if (faction && faction !== this.selectedFaction) {
          this.selectedFaction = faction;
          this.callbacks.onSelectFaction?.(faction);
          this.syncSelectionState();
        }
      });
    });

    this.root
      .querySelector<HTMLButtonElement>('[data-cycle-difficulty]')
      ?.addEventListener('click', () => {
        this.difficulty = this.difficulty === 'normal' ? 'easy' : 'normal';
        this.syncSelectionState();
      });

    this.root
      .querySelector<HTMLButtonElement>('[data-cycle-mapsize]')
      ?.addEventListener('click', () => {
        this.mapSize = this.mapSize === 16 ? 18 : 16;
        this.syncSelectionState();
      });

    const beginBtn = this.root.querySelector<HTMLButtonElement>('[data-action="begin"]');
    beginBtn?.addEventListener('click', () => {
      this.callbacks.onStartGame({
        humanFaction: this.selectedFaction,
        difficulty: this.difficulty,
        mapSize: this.mapSize,
      });
    });
  }

  private syncSelectionState(): void {
    this.root.setAttribute('data-faction', this.selectedFaction);
    this.root.querySelectorAll<HTMLButtonElement>('[data-faction-pick]').forEach((btn) => {
      const active = btn.dataset.factionPick === this.selectedFaction;
      btn.classList.toggle('selected', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    const showcaseEl = this.root.querySelector<HTMLElement>('[data-showcase-active]');
    if (showcaseEl) {
      const activeDef = FACTION_DEFINITIONS[this.selectedFaction];
      const uniqueUnit = UNIT_DEFINITIONS[activeDef.uniqueUnit];
      const perks = FACTION_PERKS[this.selectedFaction];
      const perksHtml = perks
        .map(
          (perk) => `
            <li class="tt-perk-item">
              <span class="tt-perk-icon" aria-hidden="true">${renderIcon(perk.icon, 'icon')}</span>
              <span>${formatStars(perk.text)}</span>
            </li>
          `,
        )
        .join('');
      const unitVisualHtml = renderUnitThumbOrIcon(
        uniqueUnit.type,
        this.selectedFaction,
        renderUnitIcon(uniqueUnit.type, 'icon icon-lg'),
        'thumb-3d thumb-rail-unit',
      );
      showcaseEl.innerHTML = `
        <div class="tt-champion-frame" title="${esc(uniqueUnit.name)} (HP ${uniqueUnit.maxHp} · ATK ${uniqueUnit.attack} · DEF ${uniqueUnit.defense} · MOV ${uniqueUnit.movement})">
          ${unitVisualHtml}
        </div>
        <div class="tt-showcase-copy">
          <div class="tt-showcase-realm">${esc(activeDef.realm)}</div>
          <ul class="tt-perk-list" aria-label="${esc(activeDef.name)} advantages">
            ${perksHtml}
          </ul>
        </div>
      `;
    }
    const diffLabel = this.difficulty === 'easy' ? 'Squire' : 'Captain';
    const diffEl = this.root.querySelector<HTMLElement>('[data-difficulty-label]');
    if (diffEl) diffEl.textContent = diffLabel;
    const diffBtn = this.root.querySelector<HTMLButtonElement>('[data-cycle-difficulty]');
    diffBtn?.setAttribute('aria-label', `AI Difficulty: ${diffLabel}`);

    const mapLabel = `${this.mapSize}×${this.mapSize}`;
    const mapEl = this.root.querySelector<HTMLElement>('[data-mapsize-label]');
    if (mapEl) mapEl.textContent = mapLabel;
    const mapBtn = this.root.querySelector<HTMLButtonElement>('[data-cycle-mapsize]');
    mapBtn?.setAttribute('aria-label', `Map Size: ${mapLabel}`);
    this.syncResumeBanner();
  }

  private syncResumeBanner(): void {
    const slot = this.root.querySelector<HTMLElement>('[data-resume-slot]');
    const beginLabel = this.root.querySelector<HTMLElement>('[data-begin-label]');
    if (!slot) return;

    if (!this.savedCampaign || !this.callbacks.onResumeGame) {
      slot.classList.add('hidden');
      slot.innerHTML = '';
      if (beginLabel) beginLabel.textContent = 'Play';
      return;
    }

    const saved = this.savedCampaign;
    const def = FACTION_DEFINITIONS[saved.faction];
    const heraldry = FACTION_HERALDRY[saved.faction];
    const citiesLabel = saved.citiesCount === 1 ? '1 City' : `${saved.citiesCount} Cities`;

    slot.classList.remove('hidden');
    slot.innerHTML = `
      <div class="tt-resume-card">
        <div class="tt-resume-meta">
          <span class="tt-resume-crest" style="background: ${heraldry};" aria-hidden="true">
            ${renderFactionCrest(saved.faction, 'icon icon-crest-sm')}
          </span>
          <div class="tt-resume-text">
            <span class="tt-resume-title">${esc(def.name)} · Turn ${saved.turn}</span>
            <span class="tt-resume-sub">${esc(citiesLabel)} · ${saved.score.toLocaleString()} Glory</span>
          </div>
        </div>
        <button type="button" class="tt-resume-btn" data-action="resume">
          <span>Resume</span>
          ${renderIcon('chevronRight', 'icon icon-xs')}
        </button>
      </div>
    `;
    slot.querySelector<HTMLButtonElement>('[data-action="resume"]')?.addEventListener('click', () => {
      this.callbacks.onResumeGame?.();
    });
    if (beginLabel) beginLabel.textContent = 'New Game';
  }
}

export class GameOverOverlay {
  private readonly root: HTMLElement;
  private readonly callbacks: GameOverCallbacks;
  private stage: 'celebration' | 'scores' = 'celebration';
  private lastData: GameOverData | null = null;

  constructor(container: HTMLElement, callbacks: GameOverCallbacks) {
    this.callbacks = callbacks;
    this.root = document.createElement('div');
    this.root.className = 'screen-overlay gameover-screen hidden';
    container.appendChild(this.root);
  }

  public show(data: GameOverData): void {
    this.lastData = data;
    this.stage = 'celebration';
    this.render();
    this.root.classList.remove('hidden');
  }

  public hide(): void {
    this.root.classList.add('hidden');
    this.root.removeAttribute('data-stage');
    this.root.removeAttribute('data-outcome');
  }

  public destroy(): void {
    this.root.remove();
  }

  private computeBreakdown(state: GameState, playerId: PlayerId): ScoreBreakdown {
    const player = state.players.find((p) => p.id === playerId);
    const cities = Object.values(state.cities).filter((c) => c.ownerId === playerId).length;
    const units = Object.values(state.units).filter((u) => u.ownerId === playerId).length;
    const techs = player ? player.techs.length : 0;
    const revealedTiles = player ? player.revealedTiles.filter(Boolean).length : 0;
    const total = player ? player.score : 0;
    return { cities, techs, units, revealedTiles, total };
  }

  private formatWinSubtitle(state: GameState): string {
    return state.winReason === 'domination'
      ? `Domination — All Rival Capitals Claimed (Turn ${state.turn})`
      : `Glory Triumph — Turn ${state.turn}`;
  }

  private render(): void {
    const data = this.lastData;
    if (!data) return;

    const { state, humanPlayerId } = data;
    const winner = state.players.find((p) => p.id === state.winnerId) ?? null;
    const isVictory = winner !== null && winner.id === humanPlayerId;

    this.root.setAttribute('data-stage', this.stage);
    this.root.setAttribute('data-outcome', isVictory ? 'victory' : 'defeat');

    if (this.stage === 'celebration') {
      this.renderCelebrationStage(data, isVictory);
    } else {
      this.renderScoresStage(data, isVictory);
    }
  }

  private renderCelebrationStage(data: GameOverData, isVictory: boolean): void {
    const { state } = data;
    const winner = state.players.find((p) => p.id === state.winnerId) ?? null;
    const winnerFactionId: FactionId = winner?.faction ?? 'humans';
    const winnerFaction = FACTION_DEFINITIONS[winnerFactionId];
    const winnerHeraldry = FACTION_HERALDRY[winnerFactionId];
    const championUnit = UNIT_DEFINITIONS[winnerFaction.uniqueUnit];
    const subtitle = this.formatWinSubtitle(state);

    const championSpriteHtml = renderUnitThumbOrIcon(
      championUnit.type,
      winnerFactionId,
      renderUnitIcon(championUnit.type, 'icon icon-xl'),
      'thumb-3d victory-champion-sprite',
    );

    if (isVictory) {
      this.root.innerHTML = `
        <div class="victory-curtain" style="--winner-heraldry: ${winnerHeraldry};">
          <div class="victory-sunburst" aria-hidden="true"></div>
          ${renderConfettiHtml(winnerHeraldry)}

          <div class="victory-stage">
            <div class="victory-emblem-showcase">
              ${renderVictoryLaurelsSvg()}
              <div class="victory-hero-cluster">
                <div class="victory-champion-frame">
                  ${championSpriteHtml}
                </div>
                <span class="victory-crest-medallion" style="background: ${winnerHeraldry};">
                  ${renderFactionCrest(winnerFactionId, 'icon victory-crest-icon')}
                </span>
              </div>
            </div>

            <div class="victory-faction-pill">
              <span class="faction-dot" style="background: ${winnerHeraldry};"></span>
              <span>${esc(winnerFaction.name)} &middot; ${esc(winnerFaction.realm)}</span>
            </div>

            <h2 class="victory-headline">VICTORY!</h2>
            <p class="victory-subtitle">${esc(subtitle)}</p>

            <button type="button" class="btn btn-cta victory-cta-btn" data-action="view-scores">
              <span>View Final Scores &rarr;</span>
            </button>
          </div>
        </div>
      `;
    } else {
      this.root.innerHTML = `
        <div class="defeat-curtain" style="--winner-heraldry: ${winnerHeraldry};">
          <div class="defeat-glow" aria-hidden="true"></div>

          <div class="defeat-stage">
            <div class="gameover-badge defeat">
              ${renderIcon('skull', 'icon icon-sm')}
              <span>Defeat</span>
            </div>

            <div class="defeat-victor-emblem">
              <span class="defeat-victor-crest" style="background: ${winnerHeraldry};">
                ${renderFactionCrest(winnerFactionId, 'icon victory-crest-icon')}
              </span>
              <span class="defeat-victor-crown">${renderIcon('crown', 'icon icon-sm')}</span>
            </div>

            <h2 class="defeat-headline">DEFEAT</h2>
            <p class="defeat-victor-line">
              ${winner ? `${esc(winnerFaction.name)} Claimed Eldermere` : 'The Age Concludes'}
            </p>
            <p class="victory-subtitle">${esc(subtitle)}</p>

            <button type="button" class="btn btn-cta victory-cta-btn" data-action="view-scores">
              <span>View Final Scores &rarr;</span>
            </button>
          </div>
        </div>
      `;
    }

    const viewScoresBtn = this.root.querySelector<HTMLButtonElement>('[data-action="view-scores"]');
    viewScoresBtn?.addEventListener('click', () => {
      this.stage = 'scores';
      this.render();
    });
  }

  private renderScoresStage(data: GameOverData, isVictory: boolean): void {
    const { state, humanPlayerId, scoreBreakdowns } = data;
    const winner = state.players.find((p) => p.id === state.winnerId) ?? null;
    const winnerFaction = winner ? FACTION_DEFINITIONS[winner.faction] : null;
    const reasonText = this.formatWinSubtitle(state);

    const rankedPlayers = [...state.players].sort((a, b) => {
      if (a.id === state.winnerId) return -1;
      if (b.id === state.winnerId) return 1;
      return b.score - a.score;
    });

    const rowsHtml = rankedPlayers
      .map((player, idx) => {
        const fDef = FACTION_DEFINITIONS[player.faction];
        const heraldry = FACTION_HERALDRY[player.faction];
        const stats = scoreBreakdowns?.[player.id] ?? this.computeBreakdown(state, player.id);
        const isWinner = player.id === state.winnerId;
        const isHuman = player.id === humanPlayerId;

        return `
          <tr class="${isWinner ? 'winner-row' : ''} ${isHuman ? 'human-row' : ''}">
            <td class="num">#${idx + 1}</td>
            <td>
              <span class="faction-dot" style="background: ${heraldry}; margin-right: 6px;"></span>
              ${esc(fDef.name)}${isHuman ? ' (You)' : ''}
              ${isWinner ? renderIcon('crown', 'icon icon-sm icon-star') : ''}
            </td>
            <td class="col-fate">${player.alive ? 'Standing' : `T${player.eliminatedOnTurn ?? '?'}`}</td>
            <td class="num">${stats.cities}</td>
            <td class="num col-lore">${stats.techs}</td>
            <td class="num score-total">${stats.total.toLocaleString()}</td>
          </tr>
        `;
      })
      .join('');

    this.root.innerHTML = `
      <div class="gameover-panel gameover-scores-panel">
        <div class="gameover-badge ${isVictory ? 'victory' : 'defeat'}">
          ${renderIcon(isVictory ? 'crown' : 'skull', 'icon icon-sm')}
          <span>${isVictory ? 'Victory' : 'Defeat'}</span>
        </div>
        <h2 class="gameover-title">
          ${winnerFaction ? `${esc(winnerFaction.name)} Prevail` : 'The Age Concludes'}
        </h2>
        <p class="gameover-reason">
          ${esc(reasonText)}
        </p>

        <div class="score-table-wrap">
          <table class="score-table">
            <thead>
              <tr>
                <th class="num">#</th>
                <th>Realm</th>
                <th class="col-fate">Fate</th>
                <th class="num">Cities</th>
                <th class="num col-lore">Lore</th>
                <th class="num">Glory</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>

        <button type="button" class="btn btn-cta btn-begin" data-action="play-again">
          <span>New Campaign</span>
          ${renderIcon('chevronRight', 'icon')}
        </button>
      </div>
    `;

    const playAgainBtn = this.root.querySelector<HTMLButtonElement>('[data-action="play-again"]');
    playAgainBtn?.addEventListener('click', () => {
      this.callbacks.onPlayAgain();
    });
  }
}
