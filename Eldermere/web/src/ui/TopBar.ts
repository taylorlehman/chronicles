import { FACTION_DEFINITIONS } from '../game/data';
import { AGE_ROMAN, getPlayerAge } from '../game/rules';
import type { FactionId, PlayerAge, PlayerState } from '../game/types';
import { FACTION_HERALDRY } from './Screens';
import { renderFactionCrest, renderFactionSuperpowerIcon, renderIcon } from './icons';

export interface TopBarViewModel {
  player: PlayerState;
  activePlayer: PlayerState;
  turn?: number;
  maxTurns?: number;
  age?: PlayerAge;
  techCount?: number;
  canUseSuperpower?: boolean;
  superpowerUsed?: boolean;
  superpowerName?: string;
  superpowerTargeting?: boolean;
  isHumanTurn: boolean;
}

export interface TopBarCallbacks {
  onOpenLeaderboard?: () => void;
  onOpenCodex?: () => void;
  onActivateSuperpower?: () => void;
}

function shortSuperpowerLabel(faction: FactionId, name?: string): string {
  const trimmed = name?.trim();
  if (trimmed) {
    if (/eclipse/i.test(trimmed)) return 'Eclipse';
    if (/volcano|eruption|doom/i.test(trimmed)) return 'Volcano';
    if (/dragon|wyrm|drake/i.test(trimmed)) return 'Dragon';
    if (/tower|beacon|citadel/i.test(trimmed)) return 'Tower';
    if (trimmed.length <= 10) return trimmed;
    return trimmed.split(/\s+/)[0] || trimmed;
  }
  switch (faction) {
    case 'humans':
      return 'Tower';
    case 'orcs':
      return 'Volcano';
    case 'elves':
      return 'Eclipse';
    case 'dwarves':
      return 'Dragon';
  }
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
    const techCount = vm.techCount ?? vm.player.techs.length;
    const clampedTechs = Math.max(0, Math.min(7, techCount));
    const fillPct = Math.round((clampedTechs / 7) * 100);
    const superpowerUsed = Boolean(vm.superpowerUsed);
    const superpowerTargeting = Boolean(vm.superpowerTargeting);
    const canUseSuperpower = Boolean(vm.canUseSuperpower && !superpowerUsed);
    const isSuperpowerMode = (canUseSuperpower || superpowerTargeting) && !superpowerUsed;
    const ageLabel = `Age ${AGE_ROMAN[age]}`;
    const remainingToAge3 = Math.max(0, 7 - clampedTechs);
    const chargeTier =
      clampedTechs >= 5 ? 'charge-high' : clampedTechs >= 3 ? 'charge-mid' : 'charge-low';
    const superpowerShort = superpowerTargeting
      ? 'Cancel'
      : shortSuperpowerLabel(vm.player.faction, vm.superpowerName);
    const superpowerTitle = superpowerTargeting
      ? 'Cancel superpower targeting'
      : vm.superpowerName
        ? `Activate ${vm.superpowerName}`
        : `Activate ${superpowerShort} Superpower`;

    const pipsHtml = Array.from({ length: 7 }, (_, i) => {
      const filled = i < clampedTechs;
      const isMilestone = i === 2;
      return `<span class="relic-pip ${filled ? 'is-filled' : ''} ${isMilestone ? 'is-milestone' : ''}"></span>`;
    }).join('');

    const barKey = [
      vm.player.faction,
      vm.player.score,
      vm.player.gold,
      vm.player.goldPerTurn,
      age,
      clampedTechs,
      canUseSuperpower ? 1 : 0,
      superpowerUsed ? 1 : 0,
      superpowerTargeting ? 1 : 0,
      vm.superpowerName ?? '',
    ].join('|');
    if (barKey === this.lastBarKey) {
      return;
    }
    this.lastBarKey = barKey;

    const rightButtonHtml = isSuperpowerMode
      ? `
        <button
          type="button"
          class="top-pill top-pill-age top-age-meter is-superpower-ready ${superpowerTargeting ? 'is-superpower-targeting' : ''}"
          data-action="superpower"
          title="${esc(superpowerTitle)}"
          aria-label="${esc(superpowerTitle)}"
        >
          <span class="top-age-meter-track" aria-hidden="true">
            <span class="top-age-meter-fill" style="width: 100%;"></span>
            <span class="top-age-meter-sheen"></span>
          </span>
          <span class="top-age-meter-content">
            <span class="relic-medallion is-ignited" aria-hidden="true">
              ${
                superpowerTargeting
                  ? renderIcon('close', 'icon icon-sm icon-age')
                  : renderFactionSuperpowerIcon(vm.player.faction, 'icon icon-sm icon-age')
              }
            </span>
            <span class="top-age-stack">
              <span class="top-age-val">${esc(superpowerShort)}</span>
              <span class="top-age-sub">${superpowerTargeting ? 'Tap target' : 'Ready!'}</span>
            </span>
          </span>
        </button>
      `
      : superpowerUsed || age >= 3
        ? `
          <button
            type="button"
            class="top-pill top-pill-age top-age-meter is-age-complete"
            data-action="codex"
            title="${ageLabel} — Open Tech Codex"
            aria-label="${ageLabel} — Open Tech Codex"
          >
            <span class="top-age-meter-content">
              <span class="relic-medallion is-spent" aria-hidden="true">
                ${renderFactionSuperpowerIcon(vm.player.faction, 'icon icon-sm icon-age')}
              </span>
              <span class="top-age-val">${ageLabel}</span>
            </span>
          </button>
        `
        : `
          <button
            type="button"
            class="top-pill top-pill-age top-age-meter is-filling ${chargeTier}"
            data-action="codex"
            title="${ageLabel} (${clampedTechs}/7 to unlock ${esc(superpowerShort)}) — Open Tech Codex"
            aria-label="${ageLabel}, ${clampedTechs} of 7 technologies to unlock ${esc(superpowerShort)} — Open Tech Codex"
          >
            <span class="top-age-meter-track" aria-hidden="true">
              <span class="top-age-meter-fill" style="width: ${fillPct}%;">
                <span class="top-age-meter-sheen"></span>
              </span>
            </span>
            <span class="top-age-meter-content">
              <span class="relic-medallion ${chargeTier}" aria-hidden="true">
                ${renderFactionSuperpowerIcon(vm.player.faction, 'icon icon-sm icon-age')}
              </span>
              <span class="top-age-stack">
                <span class="top-age-row">
                  <span class="top-age-val">${ageLabel}</span>
                  ${remainingToAge3 <= 2 ? `<span class="top-age-soon">${remainingToAge3} left</span>` : ''}
                </span>
                <span class="relic-pips" aria-hidden="true">${pipsHtml}</span>
              </span>
            </span>
          </button>
        `;

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
        ${rightButtonHtml}
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

    this.root
      .querySelector<HTMLButtonElement>('[data-action="superpower"]')
      ?.addEventListener('click', () => {
        this.callbacks.onActivateSuperpower?.();
      });
  }
}
