import { ALL_FACTIONS, FACTION_DEFINITIONS, UNIT_DEFINITIONS } from '../game/data';
import type { Difficulty, FactionId, GameState, MapSize, PlayerId } from '../game/types';
import { renderFactionCrest, renderIcon, renderUnitIcon } from './icons';
import { renderUnitThumbOrIcon } from './thumbs';

export interface StartGameOptions {
  humanFaction: FactionId;
  difficulty: Difficulty;
  mapSize: MapSize;
}

export interface TitleScreenCallbacks {
  onStartGame: (options: StartGameOptions) => void;
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

interface FactionBullet {
  lead: string;
  detail: string;
}

/** Heraldic crest accents per faction */
export const FACTION_HERALDRY: Record<FactionId, string> = {
  humans: '#1d437a',
  orcs: '#c7281e',
  elves: '#17613f',
  dwarves: '#c47a27',
};

/** 4 crisp, scannable strengths & unique advantages per faction for the Launch Screen */
const FACTION_STRENGTH_BULLETS: Record<FactionId, FactionBullet[]> = {
  humans: [
    {
      lead: 'Kingdom Builders',
      detail: 'Excels at rapid road-linked expansion & city growth',
    },
    {
      lead: 'Beacon Network',
      detail: 'Connected cities earn +1★/turn; Roads grant +1 MOV',
    },
    {
      lead: 'Sunmark Knight',
      detail: 'High-speed cavalry (3 MOV) with Persist chain-kills',
    },
    {
      lead: 'Head Start',
      detail: 'Begins with Gathering unlocked for immediate growth',
    },
  ],
  orcs: [
    {
      lead: 'Relentless War Swarm',
      detail: 'Fuels its economy through early aggression & conquest',
    },
    {
      lead: 'Spoils of War',
      detail: 'Earn +2★ per enemy slain & +4★ per city captured',
    },
    {
      lead: 'Ironblood Berserker',
      detail: 'Bloodlust strikes at full 3.5 ATK even when wounded',
    },
    {
      lead: 'Head Start',
      detail: 'Begins with 7★ treasury & Pillage unlocked',
    },
  ],
  elves: [
    {
      lead: 'Agile Forest Guardians',
      detail: 'Dominates woodlands with superior mobility & range',
    },
    {
      lead: 'Woodland Grace',
      detail: 'No forest move penalty; Ancient Woods give +1★/turn',
    },
    {
      lead: 'Elven Sentinel',
      detail: 'Range-2 skirmisher that strikes and fades back (Escape)',
    },
    {
      lead: 'Head Start',
      detail: 'Begins with an Archer & Woodland Lore unlocked',
    },
  ],
  dwarves: [
    {
      lead: 'Unbreakable Fortress Economy',
      detail: 'Snowballs wealth from impenetrable peaks',
    },
    {
      lead: 'Deep Mines',
      detail: 'Cross Mountains Turn 1 (1.75× DEF); Mines earn +1★/turn',
    },
    {
      lead: 'Ironbreaker',
      detail: '20 HP armored juggernaut (Stalwart: resists range & chains)',
    },
    {
      lead: 'Head Start',
      detail: 'Begins with Deep Delving to climb & harvest ore Turn 1',
    },
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
  private readonly callbacks: TitleScreenCallbacks;
  private selectedFaction: FactionId = 'humans';
  private difficulty: Difficulty = 'normal';
  private mapSize: MapSize = 16;

  constructor(container: HTMLElement, callbacks: TitleScreenCallbacks) {
    this.callbacks = callbacks;
    this.root = document.createElement('div');
    this.root.className = 'title-screen';
    this.root.setAttribute('data-faction', this.selectedFaction);
    container.appendChild(this.root);
    this.render();
  }

  public getSelectedFaction(): FactionId {
    return this.selectedFaction;
  }

  public show(): void {
    this.root.classList.remove('hidden');
    this.render();
  }

  public hide(): void {
    this.root.classList.add('hidden');
  }

  public destroy(): void {
    this.root.remove();
  }

  private render(): void {
    this.root.setAttribute('data-faction', this.selectedFaction);
    const activeDef = FACTION_DEFINITIONS[this.selectedFaction];
    const uniqueUnit = UNIT_DEFINITIONS[activeDef.uniqueUnit];
    const heraldry = FACTION_HERALDRY[this.selectedFaction];
    const bullets = FACTION_STRENGTH_BULLETS[this.selectedFaction];

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

    const bulletsHtml = bullets
      .map(
        (item) => `
          <li class="rail-strength-item">
            <span class="rail-strength-pip" style="background: ${heraldry};" aria-hidden="true"></span>
            <span class="rail-strength-copy">
              <strong class="rail-strength-lead">${esc(item.lead)}</strong>
              <span class="rail-strength-dash">&mdash;</span>
              <span class="rail-strength-detail">${formatStars(item.detail)}</span>
            </span>
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

    this.root.innerHTML = `
      <aside class="campaign-rail" aria-label="Campaign Setup">
        <div class="rail-inner">
          <header class="rail-wordmark">
            <h1 class="rail-title">Chronicles of Eldermere</h1>
          </header>

          <div class="faction-emblem-strip" role="group" aria-label="Select Realm">
            ${emblemTabsHtml}
          </div>

          <section class="rail-dossier" aria-live="polite">
            <div class="rail-dossier-compact-head">
              <span class="rail-dossier-realm">${esc(activeDef.name)}</span>
              <span class="rail-dossier-dot" style="background: ${heraldry};"></span>
              <span class="rail-craft-name">${esc(activeDef.realm)}</span>
            </div>

            <ul class="rail-strengths-list" aria-label="${esc(activeDef.name)} strengths and unique advantages">
              ${bulletsHtml}
            </ul>

            <div class="rail-unit-row">
              <div class="rail-unit-thumb">${unitVisualHtml}</div>
              <div class="rail-unit-meta">
                <div class="rail-unit-title">
                  <span>${esc(uniqueUnit.name)}</span>
                  <span class="cost-tag">${uniqueUnit.cost}${renderIcon('star', 'icon icon-sm icon-star')}</span>
                </div>
                <div class="rail-unit-stats">
                  <span>HP ${uniqueUnit.maxHp}</span>
                  <span>ATK ${uniqueUnit.attack}</span>
                  <span>DEF ${uniqueUnit.defense}</span>
                  <span>MOV ${uniqueUnit.movement}</span>
                  ${uniqueUnit.range > 1 ? `<span>RNG ${uniqueUnit.range}</span>` : ''}
                </div>
              </div>
            </div>
          </section>

          <div class="rail-toggles">
            <div class="rail-toggle-row">
              <span class="rail-toggle-label">AI</span>
              <div class="segmented" role="group" aria-label="Difficulty">
                <button type="button" class="segmented-btn ${this.difficulty === 'easy' ? 'active' : ''}" data-difficulty="easy">
                  Squire
                </button>
                <button type="button" class="segmented-btn ${this.difficulty === 'normal' ? 'active' : ''}" data-difficulty="normal">
                  Captain
                </button>
              </div>
            </div>

            <div class="rail-toggle-row">
              <span class="rail-toggle-label">Realm Size</span>
              <div class="segmented" role="group" aria-label="Realm Size">
                <button type="button" class="segmented-btn ${this.mapSize === 16 ? 'active' : ''}" data-mapsize="16">
                  16&times;16 (256)
                </button>
                <button type="button" class="segmented-btn ${this.mapSize === 18 ? 'active' : ''}" data-mapsize="18">
                  18&times;18 (324)
                </button>
              </div>
            </div>
          </div>

          <button type="button" class="btn btn-cta btn-begin" data-action="begin">
            <span>Play</span>
            ${renderIcon('chevronRight', 'icon')}
          </button>
        </div>
      </aside>
    `;

    this.root.querySelectorAll<HTMLButtonElement>('[data-faction-pick]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const faction = btn.dataset.factionPick as FactionId;
        if (faction && faction !== this.selectedFaction) {
          this.selectedFaction = faction;
          this.callbacks.onSelectFaction?.(faction);
          this.render();
        }
      });
    });

    this.root.querySelectorAll<HTMLButtonElement>('[data-difficulty]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const diff = btn.dataset.difficulty as Difficulty;
        if (diff && diff !== this.difficulty) {
          this.difficulty = diff;
          this.render();
        }
      });
    });

    this.root.querySelectorAll<HTMLButtonElement>('[data-mapsize]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const size = Number(btn.dataset.mapsize) as MapSize;
        if ((size === 16 || size === 18) && size !== this.mapSize) {
          this.mapSize = size;
          this.render();
        }
      });
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
