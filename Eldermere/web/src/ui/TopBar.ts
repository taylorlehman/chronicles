import { FACTION_DEFINITIONS } from '../game/data';
import type { FactionId, PlayerAge, PlayerState } from '../game/types';
import { FACTION_HERALDRY } from './Screens';
import { STAR_CROWN_TOTAL_SHARDS, renderStarCrownHud } from './StarCrown';
import { renderFactionCrest, renderIcon } from './icons';

export interface TopBarViewModel {
  player: PlayerState;
  activePlayer: PlayerState;
  crownShards?: readonly FactionId[];
  turn?: number;
  maxTurns?: number;
  /** @deprecated Moved to ActionBar bottom-center Age medallion; kept optional for compatibility. */
  age?: PlayerAge;
  /** @deprecated Moved to ActionBar bottom-center Age medallion; kept optional for compatibility. */
  techCount?: number;
  /** @deprecated Moved to ActionBar bottom-center Age medallion; kept optional for compatibility. */
  canUseSuperpower?: boolean;
  /** @deprecated Moved to ActionBar bottom-center Age medallion; kept optional for compatibility. */
  superpowerUsed?: boolean;
  /** @deprecated Moved to ActionBar bottom-center Age medallion; kept optional for compatibility. */
  superpowerName?: string;
  /** @deprecated Moved to ActionBar bottom-center Age medallion; kept optional for compatibility. */
  superpowerTargeting?: boolean;
  isHumanTurn: boolean;
}

export interface TopBarCallbacks {
  onCrownClick?: () => void;
  /** @deprecated Leaderboard button retired; falls back to onCrownClick if provided. */
  onOpenLeaderboard?: () => void;
  /** @deprecated Moved to ActionBar; kept optional for compatibility. */
  onOpenCodex?: () => void;
  /** @deprecated Moved to ActionBar; kept optional for compatibility. */
  onActivateSuperpower?: () => void;
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
  private crownPulseActive = false;
  private crownDetached = false;
  private crownPulseTimer: number | null = null;

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
    this.clearCrownPulseTimer();
    this.crownPulseActive = false;
    this.crownDetached = false;
    this.root.classList.add('hidden');
    this.aiBanner.classList.add('hidden');
    this.lastBannerKey = null;
    this.lastBarKey = null;
  }

  public update(vm: TopBarViewModel): void {
    this.render(vm);
  }

  public getCrownAnchorRect(): DOMRect | null {
    const wrap =
      this.root.querySelector<HTMLElement>('.sc-hud-crown-wrap') ??
      this.root.querySelector<HTMLElement>('.top-pill-crown');
    if (!wrap || typeof wrap.getBoundingClientRect !== 'function') {
      return null;
    }
    const rect = wrap.getBoundingClientRect();
    if (!rect || rect.width <= 0 || rect.height <= 0) {
      return null;
    }
    return rect;
  }

  public setCrownDetached(detached: boolean): void {
    this.crownDetached = detached;
    const crownBtn = this.root.querySelector<HTMLElement>('.top-pill-crown');
    crownBtn?.classList.toggle('is-hero-detached', detached);
  }

  public pulseCrown(): void {
    this.clearCrownPulseTimer();
    this.crownPulseActive = true;

    const badge = this.root.querySelector<HTMLElement>('.sc-hud-badge');
    if (badge) {
      badge.classList.remove('is-pulse');
      // Force reflow so consecutive pulses replay the CSS animation cleanly
      void badge.offsetWidth;
      badge.classList.add('is-pulse');
    }

    if (typeof window !== 'undefined') {
      this.crownPulseTimer = window.setTimeout(() => {
        this.crownPulseTimer = null;
        this.crownPulseActive = false;
        this.root.querySelector<HTMLElement>('.sc-hud-badge')?.classList.remove('is-pulse');
      }, 1250);
    }
  }

  public destroy(): void {
    this.clearCrownPulseTimer();
    this.root.remove();
    this.aiBanner.remove();
  }

  private clearCrownPulseTimer(): void {
    if (this.crownPulseTimer !== null && typeof window !== 'undefined') {
      window.clearTimeout(this.crownPulseTimer);
      this.crownPulseTimer = null;
    }
  }

  private render(vm: TopBarViewModel): void {
    const playerDef = FACTION_DEFINITIONS[vm.player.faction];
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

    const shards: readonly FactionId[] =
      vm.crownShards ??
      (Array.isArray(vm.player.crownShards) && vm.player.crownShards.length > 0
        ? vm.player.crownShards
        : vm.player.alive
          ? [vm.player.faction]
          : []);
    const totalShards = STAR_CROWN_TOTAL_SHARDS;
    const shardCount = Math.min(totalShards, shards.length);
    const crownLabel = `Star-Crown: ${shardCount} of ${totalShards} pieces — View Crown Progress`;
    const turn = Math.max(1, vm.turn ?? 1);
    const maxTurns = vm.maxTurns ?? 0;
    const turnLabel = maxTurns > 0 ? `Turn ${turn}/${maxTurns}` : `Turn ${turn}`;

    const barKey = [
      vm.player.faction,
      turn,
      maxTurns,
      vm.player.gold,
      vm.player.goldPerTurn,
      shards.join(','),
    ].join('|');
    if (barKey === this.lastBarKey) {
      return;
    }
    this.lastBarKey = barKey;

    const detachedCls = this.crownDetached ? ' is-hero-detached' : '';
    const centerCrownHtml = `
      <button
        type="button"
        class="top-pill-crown${detachedCls}"
        data-action="crown"
        title="${esc(crownLabel)}"
        aria-label="${esc(crownLabel)}"
      >
        ${renderStarCrownHud(shards, { total: totalShards, pulse: this.crownPulseActive })}
      </button>
    `;

    this.root.innerHTML = `
      <div class="top-cluster top-cluster-left">
        <div
          class="top-pill top-pill-realm"
          title="${esc(playerDef.name)} · ${esc(turnLabel)}"
        >
          <span class="faction-crest-badge top-crest-badge" style="background: ${playerHeraldry};">
            ${renderFactionCrest(vm.player.faction, 'icon icon-crest-sm')}
          </span>
          <span class="top-turn-val">${esc(turnLabel)}</span>
        </div>
      </div>

      <div class="top-cluster top-cluster-center">
        ${centerCrownHtml}
      </div>

      <div class="top-cluster top-cluster-right">
        <div class="top-pill top-pill-stars" title="Stars &amp; income per turn">
          ${renderIcon('star', 'icon icon-star')}
          <span class="top-stars-val">${vm.player.gold}</span>
          <span class="top-stars-delta">(+${vm.player.goldPerTurn})</span>
        </div>
      </div>
    `;

    this.root
      .querySelector<HTMLButtonElement>('[data-action="crown"]')
      ?.addEventListener('click', () => {
        (this.callbacks.onCrownClick ?? this.callbacks.onOpenLeaderboard)?.();
      });
  }
}
