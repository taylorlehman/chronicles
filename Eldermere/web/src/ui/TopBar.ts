import { FACTION_DEFINITIONS } from '../game/data';
import { AGE_ROMAN, getPlayerAge } from '../game/rules';
import type { PlayerAge, PlayerState } from '../game/types';
import { FACTION_HERALDRY } from './Screens';
import { renderFactionCrest, renderIcon } from './icons';

export interface TopBarViewModel {
  player: PlayerState;
  activePlayer: PlayerState;
  turn?: number;
  maxTurns?: number;
  age?: PlayerAge;
  isHumanTurn: boolean;
}

export interface TopBarCallbacks {
  onOpenLeaderboard?: () => void;
  onOpenCodex?: () => void;
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export class TopBar {
  private readonly root: HTMLElement;
  private readonly aiBanner: HTMLElement;
  private readonly callbacks: TopBarCallbacks;
  private lastBannerKey: string | null = null;
  private lastBarKey: string | null = null;

  constructor(container: HTMLElement, callbacks: TopBarCallbacks) {
    this.callbacks = callbacks;

    this.root = document.createElement('header');
    this.root.className = 'top-bar hidden';
    container.appendChild(this.root);

    this.aiBanner = document.createElement('div');
    this.aiBanner.className = 'ai-turn-floating hidden';
    container.appendChild(this.aiBanner);
  }

  public show(): void {
    this.root.classList.remove('hidden');
  }

  public hide(): void {
    this.root.classList.add('hidden');
    this.aiBanner.classList.add('hidden');
    this.lastBannerKey = null;
    this.lastBarKey = null;
  }

  public update(vm: TopBarViewModel): void {
    this.render(vm);
  }

  public destroy(): void {
    this.root.remove();
    this.aiBanner.remove();
  }

  private render(vm: TopBarViewModel): void {
    const activeDef = FACTION_DEFINITIONS[vm.activePlayer.faction];
    const playerHeraldry = FACTION_HERALDRY[vm.player.faction];
    const activeHeraldry = FACTION_HERALDRY[vm.activePlayer.faction];

    const bannerKey = vm.isHumanTurn ? 'human' : `ai:${vm.activePlayer.id}:${vm.activePlayer.faction}`;
    if (bannerKey !== this.lastBannerKey) {
      this.lastBannerKey = bannerKey;
      if (vm.isHumanTurn) {
        this.aiBanner.classList.add('hidden');
        this.aiBanner.innerHTML = '';
      } else {
        this.aiBanner.classList.remove('hidden');
        this.aiBanner.innerHTML = `
          <div class="ai-turn-banner" style="--ai-color: ${activeHeraldry};">
            <span class="faction-dot" style="background: ${activeHeraldry};"></span>
            <span>${esc(activeDef.name)}</span>
            <span class="ai-turn-dots" aria-hidden="true"><span></span><span></span><span></span></span>
          </div>
        `;
      }
    }

    const age: PlayerAge = vm.age ?? getPlayerAge(vm.player);
    const ageLabel = `Age ${AGE_ROMAN[age]}`;

    const barKey = `${vm.player.faction}|${vm.player.score}|${vm.player.gold}|${vm.player.goldPerTurn}|${age}`;
    if (barKey === this.lastBarKey) {
      return;
    }
    this.lastBarKey = barKey;

    this.root.innerHTML = `
      <div class="top-cluster top-cluster-left">
        <button
          type="button"
          class="top-pill top-pill-leaderboard top-pill-merged"
          data-action="leaderboard"
          title="Realm Standings &amp; Civilization Info"
          aria-label="Open Realm Standings — Glory Score ${vm.player.score}"
        >
          <span class="faction-crest-badge top-crest-badge" style="background: ${playerHeraldry};">
            ${renderFactionCrest(vm.player.faction, 'icon icon-crest-sm')}
          </span>
          ${renderIcon('trophy', 'icon icon-sm icon-star')}
          <span class="top-glory-val">${vm.player.score.toLocaleString()}</span>
        </button>
      </div>

      <div class="top-cluster top-cluster-center">
        <div class="top-pill top-pill-stars" title="Stars &amp; income per turn">
          ${renderIcon('star', 'icon icon-star')}
          <span class="top-stars-val">${vm.player.gold}</span>
          <span class="top-stars-delta">(+${vm.player.goldPerTurn})</span>
        </div>
      </div>

      <div class="top-cluster top-cluster-right">
        <button
          type="button"
          class="top-pill top-pill-age"
          data-action="codex"
          title="Current Age — Open Tech Codex"
          aria-label="${ageLabel} — Open Tech Codex"
        >
          ${renderIcon('codex', 'icon icon-sm icon-age')}
          <span class="top-age-val">${ageLabel}</span>
        </button>
      </div>
    `;

    this.root
      .querySelector<HTMLButtonElement>('[data-action="leaderboard"]')
      ?.addEventListener('click', () => {
        this.callbacks.onOpenLeaderboard?.();
      });

    this.root
      .querySelector<HTMLButtonElement>('[data-action="codex"]')
      ?.addEventListener('click', () => {
        this.callbacks.onOpenCodex?.();
      });
  }
}
