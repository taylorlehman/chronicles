import { FACTION_DEFINITIONS } from '../game/data';
import type { FactionId } from '../game/types';
import { renderAlderwickScene } from './AlderwickSpeech';
import { FACTION_HERALDRY } from './Screens';
import {
  STAR_CROWN_TOTAL_SHARDS,
  getShardPalette,
  getShardSlotIndex,
  renderConstellationRingSvg,
  renderCrownShardPiece,
  renderShardPips,
  renderStarCrownForge,
  renderStarCrownStandaloneSvg,
  type CrownShardSlot,
} from './StarCrown';
import {
  ALDERWICK_ASSETS,
  ALDERWICK_FULL_TITLE,
  getEliminationWhisper,
  getRivalDefeatCongrats,
} from './alderwick';
import { triggerAndroidHaptic } from './androidBridge';
import { renderFactionCrest, renderIcon } from './icons';

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export interface HudRectLike {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface RivalDefeatCrownForge {
  beforeShards: readonly FactionId[];
  addedShards: readonly FactionId[];
  afterShards: readonly FactionId[];
  total?: number;
  hudAnchorRect?: HudRectLike | null;
  getHudAnchorRect?: () => HudRectLike | null;
  originPoint?: { x: number; y: number } | null;
  onDetachHudCrown?: (detached: boolean) => void;
  onAfterScrimSettled?: () => void;
  onBeforeReturnToHud?: () => void;
  onLandedInHud?: () => void;
}

export interface DefeatNoticeCallbacks {
  onClose?: (isHumanDefeated: boolean) => void;
}

const BG_STARS: ReadonlyArray<{ left: string; top: string; size: number; delay: string }> = [
  { left: '8%', top: '14%', size: 9, delay: '0s' },
  { left: '16%', top: '34%', size: 7, delay: '0.4s' },
  { left: '12%', top: '68%', size: 8, delay: '0.9s' },
  { left: '24%', top: '82%', size: 10, delay: '1.3s' },
  { left: '38%', top: '12%', size: 7, delay: '0.7s' },
  { left: '54%', top: '18%', size: 8, delay: '1.1s' },
  { left: '66%', top: '9%', size: 10, delay: '0.3s' },
  { left: '84%', top: '16%', size: 9, delay: '0.8s' },
  { left: '91%', top: '42%', size: 7, delay: '1.5s' },
  { left: '88%', top: '76%', size: 9, delay: '0.2s' },
  { left: '72%', top: '86%', size: 8, delay: '1.0s' },
  { left: '44%', top: '88%', size: 7, delay: '0.6s' },
];

const SPARK_VECTORS: ReadonlyArray<{ x: number; y: number; accent: boolean }> = [
  { x: -102, y: -56, accent: false },
  { x: -58, y: -88, accent: true },
  { x: 0, y: -98, accent: false },
  { x: 58, y: -88, accent: true },
  { x: 102, y: -56, accent: false },
  { x: 112, y: 6, accent: true },
  { x: 96, y: 58, accent: false },
  { x: 46, y: 82, accent: true },
  { x: 0, y: 92, accent: false },
  { x: -46, y: 82, accent: true },
  { x: -96, y: 58, accent: false },
  { x: -112, y: 6, accent: true },
];

function waitMs(ms: number, timers: Set<number>): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }
    const id = window.setTimeout(() => {
      timers.delete(id);
      resolve();
    }, ms);
    timers.add(id);
  });
}

export class DefeatNoticeModal {
  private readonly root: HTMLElement;
  private readonly callbacks: DefeatNoticeCallbacks;
  private openState = false;
  private humanDefeatedMode = false;
  private humanVictorMode = false;
  private ceremonyActive = false;
  private ceremonyReturning = false;
  private ceremonyToken = 0;
  private activeCrownForge: RivalDefeatCrownForge | undefined;
  private activeTimers = new Set<number>();
  private activeAnimations: Animation[] = [];
  private activeCometEl: HTMLElement | null = null;
  private ceremonyAfterShards: readonly FactionId[] = [];
  private ceremonyTotal = STAR_CROWN_TOTAL_SHARDS;
  private pendingResolve: (() => void) | null = null;
  private readonly onKeyDown: (e: KeyboardEvent) => void;

  constructor(container: HTMLElement, callbacks: DefeatNoticeCallbacks = {}) {
    this.callbacks = callbacks;
    this.root = document.createElement('div');
    this.root.className = 'modal-backdrop defeat-notice-modal hidden';
    this.root.setAttribute('role', 'dialog');
    this.root.setAttribute('aria-modal', 'true');
    this.root.setAttribute('aria-label', 'Faction Defeated');
    container.appendChild(this.root);

    this.root.addEventListener('click', (e) => {
      const target = e.target as HTMLElement | null;
      const isBackdrop =
        target === this.root || Boolean(target?.classList?.contains('crown-ceremony-scrim'));
      if (isBackdrop && this.openState) {
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

  public isHumanDefeated(): boolean {
    return this.openState && this.humanDefeatedMode;
  }

  public isHumanVictor(): boolean {
    return this.openState && this.humanVictorMode;
  }

  public show(
    defeatedFaction: FactionId,
    victorFaction: FactionId,
    isHumanDefeated = false,
    isHumanVictor = false,
    crownForge?: RivalDefeatCrownForge,
  ): Promise<void> {
    if (this.pendingResolve || this.openState) {
      this.close(true);
    }

    const humanCongrats = isHumanVictor && !isHumanDefeated;
    this.openState = true;
    this.humanDefeatedMode = isHumanDefeated;
    this.humanVictorMode = humanCongrats;
    this.ceremonyReturning = false;
    this.ceremonyToken += 1;
    const token = this.ceremonyToken;
    this.activeCrownForge = crownForge;
    this.root.setAttribute('data-human-defeated', String(isHumanDefeated));
    this.root.setAttribute('data-human-victor', String(humanCongrats));

    if (humanCongrats) {
      const canFlip = this.canRunLiveFlip(crownForge);
      this.ceremonyActive = canFlip;
      this.renderHumanCongrats(defeatedFaction, victorFaction, crownForge, canFlip);
      this.root.classList.remove('hidden');

      const continueBtn = this.root.querySelector<HTMLButtonElement>('[data-action="continue"]');
      window.requestAnimationFrame(() => {
        continueBtn?.focus();
      });

      if (canFlip && crownForge) {
        void this.runLiveCeremony(token, defeatedFaction, crownForge);
      }
    } else {
      this.ceremonyActive = false;
      this.renderStandardNotice(defeatedFaction, victorFaction, isHumanDefeated);
      this.root.classList.remove('hidden');

      const continueBtn = this.root.querySelector<HTMLButtonElement>('[data-action="continue"]');
      window.requestAnimationFrame(() => {
        continueBtn?.focus();
      });
    }

    return new Promise<void>((resolve) => {
      this.pendingResolve = resolve;
    });
  }

  public close(silent = false): void {
    if (!this.openState && !this.pendingResolve) return;

    if (!silent && this.ceremonyActive && !this.ceremonyReturning) {
      void this.runReturnToHud(this.ceremonyToken);
      return;
    }

    this.finalizeClose(silent);
  }

  public destroy(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    this.close(true);
    this.root.remove();
  }

  private finalizeClose(silent: boolean): void {
    this.ceremonyToken += 1;
    this.clearAsyncArtifacts();
    this.activeCrownForge?.onDetachHudCrown?.(false);

    const wasOpen = this.openState;
    const wasHumanDefeated = this.humanDefeatedMode;
    const forge = this.activeCrownForge;

    this.openState = false;
    this.humanDefeatedMode = false;
    this.humanVictorMode = false;
    this.ceremonyActive = false;
    this.ceremonyReturning = false;
    this.activeCrownForge = undefined;

    this.root.classList.add('hidden');
    this.root.removeAttribute('data-human-defeated');
    this.root.removeAttribute('data-human-victor');

    const resolve = this.pendingResolve;
    this.pendingResolve = null;
    if (wasOpen && !silent && forge) {
      forge.onLandedInHud?.();
    }
    resolve?.();
    if (wasOpen && !silent) {
      this.callbacks.onClose?.(wasHumanDefeated);
    }
  }

  private clearAsyncArtifacts(): void {
    if (typeof window !== 'undefined') {
      for (const id of this.activeTimers) {
        window.clearTimeout(id);
      }
    }
    this.activeTimers.clear();
    for (const anim of this.activeAnimations) {
      try {
        anim.cancel();
      } catch {
        // Ignore already-finished animations
      }
    }
    this.activeAnimations = [];
    this.activeCometEl?.remove();
    this.activeCometEl = null;
  }

  private canRunLiveFlip(crownForge?: RivalDefeatCrownForge): boolean {
    if (!crownForge) return false;
    const hudRect = crownForge.getHudAnchorRect?.() ?? crownForge.hudAnchorRect;
    if (!hudRect || hudRect.width <= 0 || hudRect.height <= 0) return false;
    if (typeof window === 'undefined' || typeof document === 'undefined') return false;
    if (typeof window.matchMedia === 'function') {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return false;
      }
    }
    return typeof Element !== 'undefined' && typeof this.root.animate === 'function';
  }

  private renderHumanCongrats(
    defeatedFaction: FactionId,
    victorFaction: FactionId,
    crownForge: RivalDefeatCrownForge | undefined,
    animatedFlipMode: boolean,
  ): void {
    const defeatedDef = FACTION_DEFINITIONS[defeatedFaction];
    const defeatedColor = FACTION_HERALDRY[defeatedFaction];
    const total = crownForge?.total ?? STAR_CROWN_TOTAL_SHARDS;
    const beforeShards = crownForge?.beforeShards ?? [victorFaction];
    const addedShards =
      crownForge && crownForge.addedShards.length > 0 ? crownForge.addedShards : [defeatedFaction];
    const afterShards =
      crownForge && crownForge.afterShards.length > 0
        ? crownForge.afterShards
        : Array.from(new Set([...beforeShards, ...addedShards]));
    const beforeCount = Math.min(total, new Set(beforeShards).size);
    const afterCount = Math.min(total, new Set(afterShards).size);
    const addedCount = new Set(addedShards).size;

    this.ceremonyAfterShards = afterShards;
    this.ceremonyTotal = total;

    const congrats = getRivalDefeatCongrats(defeatedFaction, victorFaction, {
      afterCount,
      addedCount,
      total,
    });

    if (!animatedFlipMode) {
      // Reduced-motion / unit-test deterministic render (still displays Alderwick + Star-Crown Forge + metadata)
      const forgeHtml = renderStarCrownForge({
        beforeShards,
        addedShards,
        afterShards,
        total,
      });

      this.root.className = 'alderwick-stage-backdrop defeat-notice-modal is-human-victory';
      this.root.setAttribute(
        'aria-label',
        `${defeatedDef.name} Defeated — ${ALDERWICK_FULL_TITLE} congratulates you`,
      );
      this.root.innerHTML = renderAlderwickScene({
        pose: 'cheer',
        variant: 'stage',
        extraClass: 'is-rival-congrats',
        headerHtml: `
          <span class="rival-congrats-crest" style="background: ${defeatedColor};" aria-hidden="true">
            ${renderFactionCrest(defeatedFaction, 'icon')}
          </span>
          <strong class="rival-congrats-title">${esc(congrats.kicker)}</strong>
          <span class="rival-congrats-badge">
            ${renderIcon('crown', 'icon icon-xs')}
            <span>${afterCount} / ${total} Forged</span>
          </span>
        `,
        bodyHtml: `
          ${forgeHtml}
          <p class="alderwick-bubble-lead">${esc(congrats.lead)}</p>
          <p>${esc(congrats.body)}</p>
          <p class="alderwick-bubble-signoff">${esc(congrats.signoff)}</p>
        `,
        actionsHtml: `
          <button type="button" class="btn btn-cta alderwick-bubble-cta" data-action="continue">
            <span>Onward!</span>
            ${renderIcon('chevronRight', 'icon icon-sm')}
          </button>
        `,
      });

      this.root
        .querySelector<HTMLButtonElement>('[data-action="continue"]')
        ?.addEventListener('click', () => {
          this.close();
        });
      return;
    }

    // Live 5-Phase Shared-Element FLIP Actual-Crown Ceremony
    const defeatedPalette = getShardPalette(defeatedFaction);
    const beforeSlots = new Set<CrownShardSlot>(beforeShards.map((f) => getShardSlotIndex(f)));
    const initialCrownSvg = renderStarCrownStandaloneSvg(beforeShards, {
      variant: 'hero',
      showHalo: false,
      showFloatingStars: false,
      bareContrastEdge: true,
    });

    const bgStarsHtml = BG_STARS.map(
      (s) =>
        `<span class="crown-bg-star" style="left:${s.left};top:${s.top};width:${s.size}px;height:${s.size}px;animation-delay:${s.delay};"></span>`,
    ).join('');

    const sparksHtml = SPARK_VECTORS.map(
      (sp, idx) =>
        `<span class="crown-ceremony-spark ${sp.accent ? 'is-accent' : ''}" data-spark-idx="${idx}" style="--spark-x:${sp.x}px;--spark-y:${sp.y}px;"></span>`,
    ).join('');

    const alderwickHtml = renderAlderwickScene({
      pose: 'cheer',
      variant: 'stage',
      animate: false,
      extraClass: 'is-rival-congrats',
      headerHtml: `
        <span class="rival-congrats-crest" style="background: ${defeatedColor};" aria-hidden="true">
          ${renderFactionCrest(defeatedFaction, 'icon')}
        </span>
        <strong class="rival-congrats-title">${esc(congrats.kicker)}</strong>
        <span class="rival-congrats-badge" data-ceremony-badge>
          ${renderIcon('crown', 'icon icon-xs')}
          <span>${beforeCount} / ${total} Forged</span>
        </span>
      `,
      bodyHtml: `
        <p class="alderwick-bubble-lead">${esc(congrats.lead)}</p>
        <p>${esc(congrats.body)}</p>
        <p class="alderwick-bubble-signoff">${esc(congrats.signoff)}</p>
      `,
      actionsHtml: `
        <button type="button" class="btn btn-cta alderwick-bubble-cta" data-action="continue">
          <span>Onward!</span>
          ${renderIcon('chevronRight', 'icon icon-sm')}
        </button>
      `,
    });

    this.root.className =
      'alderwick-stage-backdrop crown-ceremony-backdrop defeat-notice-modal is-human-victory';
    this.root.setAttribute(
      'aria-label',
      `${defeatedDef.name} Defeated — ${ALDERWICK_FULL_TITLE} congratulates you`,
    );
    this.root.style.setProperty('--defeated-pip-color', defeatedPalette.pip);

    this.root.innerHTML = `
      <div class="crown-ceremony-scrim" aria-hidden="true"></div>
      <div class="crown-ceremony-stars" aria-hidden="true">${bgStarsHtml}</div>

      <div class="crown-ceremony-stage">
        <div
          class="crown-hero-column"
          data-crown-forge="true"
          data-crown-before="${beforeCount}"
          data-crown-after="${afterCount}"
          data-crown-added="${addedCount}"
          data-crown-total="${total}"
        >
          <div class="crown-hero-stage">
            <div class="crown-hero-halo" aria-hidden="true"></div>
            <div class="crown-constellation-wrap" aria-hidden="true">${renderConstellationRingSvg()}</div>
            <div class="crown-shockwave-ring is-gold" aria-hidden="true"></div>
            <div class="crown-shockwave-ring is-faction" aria-hidden="true"></div>
            <div class="crown-sparks-layer" aria-hidden="true">${sparksHtml}</div>
            <div class="crown-flip-carrier">
              <div class="crown-flip-inner">${initialCrownSvg}</div>
            </div>
            <div class="crown-ribbon-ring" aria-hidden="true"></div>
            <div class="crown-shard-actor" aria-hidden="true"></div>
          </div>

          <div class="crown-progress-plaque">
            ${renderShardPips(beforeSlots)}
            <span class="crown-progress-label">${beforeCount} / ${total} Crown ${beforeCount === 1 ? 'Piece' : 'Pieces'}</span>
          </div>
        </div>

        <div class="crown-alderwick-column">
          ${alderwickHtml}
        </div>
      </div>
    `;

    this.root
      .querySelector<HTMLButtonElement>('[data-action="continue"]')
      ?.addEventListener('click', () => {
        this.close();
      });
  }

  private async runLiveCeremony(
    token: number,
    defeatedFaction: FactionId,
    crownForge: RivalDefeatCrownForge,
  ): Promise<void> {
    const isStale = () => token !== this.ceremonyToken || this.ceremonyReturning || !this.openState;

    const hudRect = crownForge.getHudAnchorRect?.() ?? crownForge.hudAnchorRect;
    const carrier = this.root.querySelector<HTMLElement>('.crown-flip-carrier');
    const inner = this.root.querySelector<HTMLElement>('.crown-flip-inner');
    if (!hudRect || !carrier || !inner) return;

    const hudCx = hudRect.left + hudRect.width * 0.5;
    const hudCy = hudRect.top + hudRect.height * 0.5;

    // Phase 0: Starlight comet from defeated capital tile to Top-Center Crown
    if (crownForge.originPoint && typeof document !== 'undefined') {
      const comet = document.createElement('div');
      comet.className = 'crown-starlight-comet';
      comet.innerHTML = `<span class="crown-comet-ring"></span><span class="crown-comet-core"></span>`;
      document.body.appendChild(comet);
      this.activeCometEl = comet;

      const ox = crownForge.originPoint.x;
      const oy = crownForge.originPoint.y;
      const mx = (ox + hudCx) * 0.5 + 32;
      const my = Math.min(oy, hudCy) + 95;
      if (typeof comet.animate === 'function') {
        const anim = comet.animate(
          [
            { opacity: 0, transform: `translate3d(${ox}px, ${oy}px, 0) scale(0.4) rotate(0deg)` },
            {
              opacity: 1,
              transform: `translate3d(${mx}px, ${my}px, 0) scale(1.25) rotate(120deg)`,
              offset: 0.45,
            },
            {
              opacity: 0.95,
              transform: `translate3d(${hudCx}px, ${hudCy}px, 0) scale(0.75) rotate(240deg)`,
            },
          ],
          { duration: 380, easing: 'cubic-bezier(0.22, 0.85, 0.36, 1)', fill: 'forwards' },
        );
        this.activeAnimations.push(anim);
      }
      await waitMs(380, this.activeTimers);
      comet.remove();
      this.activeCometEl = null;
      if (isStale()) return;
    }

    triggerAndroidHaptic('capture');

    // Phase 1: Detach actual Top-Center Crown & FLIP-scale up to Center Hero stage
    const heroRect = carrier.getBoundingClientRect();
    const heroCx = heroRect.left + heroRect.width * 0.5;
    const heroCy = heroRect.top + heroRect.height * 0.5;
    const dx = hudCx - heroCx;
    const dy = hudCy - heroCy;
    const s0 = Math.max(0.18, hudRect.width / Math.max(heroRect.width, 1));

    crownForge.onDetachHudCrown?.(true);
    this.root.classList.add('is-scrim-visible');

    if (typeof carrier.animate === 'function') {
      const flipUp = carrier.animate(
        [
          { transform: `translate3d(${dx}px, ${dy}px, 0) scale(${s0})` },
          {
            transform: `translate3d(${dx * 0.16}px, ${dy * 0.16}px, 0) scale(${(s0 + 1.0) * 0.52})`,
            offset: 0.45,
          },
          { transform: 'translate3d(0px, -4px, 0) scale(1.03)', offset: 0.86 },
          { transform: 'translate3d(0px, 0px, 0) scale(1)' },
        ],
        { duration: 780, easing: 'cubic-bezier(0.22, 1.08, 0.36, 1)', fill: 'forwards' },
      );
      this.activeAnimations.push(flipUp);
    }

    await waitMs(260, this.activeTimers);
    if (isStale()) return;
    this.root.classList.add('is-hero-settled');

    await waitMs(220, this.activeTimers);
    if (isStale()) return;
    crownForge.onAfterScrimSettled?.();

    // Phase 2: Cheering Alderwick & comic speech bubble enter
    await waitMs(140, this.activeTimers);
    if (isStale()) return;
    this.root.classList.add('is-dialogue-visible');

    await waitMs(480, this.activeTimers);
    if (isStale()) return;

    // Phase 3: Sequential Magical Shard Materialization, Magnetic Pause & Snap-In
    const total = crownForge.total ?? STAR_CROWN_TOTAL_SHARDS;
    const runningShards: FactionId[] = [...crownForge.beforeShards];
    const addedShards =
      crownForge.addedShards.length > 0 ? crownForge.addedShards : [defeatedFaction];

    for (let i = 0; i < addedShards.length; i++) {
      if (isStale()) return;
      const shardFaction = addedShards[i];
      const palette = getShardPalette(shardFaction);
      const actor = this.root.querySelector<HTMLElement>('.crown-shard-actor');
      const ribbon = this.root.querySelector<HTMLElement>('.crown-ribbon-ring');
      if (!actor) break;

      actor.innerHTML = renderCrownShardPiece(shardFaction, { cropped: false, showGlow: true });
      const fx = palette.fromX;
      const fy = palette.fromY;
      const frot = palette.fromRot;

      if (ribbon && typeof ribbon.animate === 'function') {
        const ribAnim = ribbon.animate(
          [
            {
              opacity: 0,
              transform: `translate3d(${fx}px, ${fy}px, 0) scale(0.35) rotate(0deg)`,
            },
            {
              opacity: 0.92,
              transform: `translate3d(${fx}px, ${fy}px, 0) scale(1.05) rotate(140deg)`,
              offset: 0.45,
            },
            {
              opacity: 0,
              transform: `translate3d(${fx * 0.25}px, ${fy * 0.25}px, 0) scale(0.5) rotate(280deg)`,
            },
          ],
          { duration: 920, easing: 'ease-out', fill: 'forwards' },
        );
        this.activeAnimations.push(ribAnim);
      }

      if (typeof actor.animate === 'function') {
        const shardAnim = actor.animate(
          [
            {
              opacity: 0,
              transform: `translate3d(${fx}px, ${fy}px, 0) rotate(${frot}deg) scale(0.35)`,
            },
            {
              opacity: 1,
              transform: `translate3d(${fx}px, ${fy}px, 0) rotate(${frot}deg) scale(1.16)`,
              offset: 0.32,
            },
            {
              opacity: 1,
              transform: `translate3d(${fx * 0.16}px, ${fy * 0.16}px, 0) rotate(${frot * 0.2}deg) scale(1.06)`,
              offset: 0.65,
            },
            {
              opacity: 1,
              transform: `translate3d(${fx * 0.14}px, ${fy * 0.18}px, 0) rotate(${frot * 0.15}deg) scale(1.06)`,
              offset: 0.84,
            },
            { opacity: 1, transform: 'translate3d(0px, 0px, 0) rotate(0deg) scale(1)' },
          ],
          { duration: 1220, easing: 'cubic-bezier(0.26, 0.88, 0.34, 1)', fill: 'forwards' },
        );
        this.activeAnimations.push(shardAnim);
      }

      // Highlight target empty socket as magnetic draw intensifies
      const slotIdx = getShardSlotIndex(shardFaction);
      const targetSocket = inner.querySelector<SVGElement>(`[data-socket-slot="${slotIdx}"]`);
      if (targetSocket) {
        targetSocket.style.opacity = '1';
      }

      await waitMs(1220, this.activeTimers);
      if (isStale()) return;

      // Impact Frame: Lock piece into actual Crown, ignite sparks, shockwaves, recoil & sheen!
      if (!runningShards.includes(shardFaction)) {
        runningShards.push(shardFaction);
      }
      const runningSlots = new Set<CrownShardSlot>(runningShards.map((f) => getShardSlotIndex(f)));
      const nowCount = Math.min(total, runningSlots.size);
      const isNowComplete = nowCount >= total;

      actor.innerHTML = '';
      actor.style.opacity = '0';
      inner.innerHTML = renderStarCrownStandaloneSvg(runningShards, {
        variant: 'hero',
        showHalo: false,
        showFloatingStars: isNowComplete,
        animateIgnite: isNowComplete,
        bareContrastEdge: true,
      });

      this.root.style.setProperty('--defeated-pip-color', palette.pip);
      triggerAndroidHaptic(isNowComplete ? 'victory' : 'capture');

      // Retrigger shockwave, sparks, recoil, sheen
      const shockwaves = this.root.querySelectorAll<HTMLElement>('.crown-shockwave-ring');
      shockwaves.forEach((el) => {
        el.classList.remove('is-firing');
        void el.offsetWidth;
        el.classList.add('is-firing');
      });
      const sparks = this.root.querySelectorAll<HTMLElement>('.crown-ceremony-spark');
      sparks.forEach((el) => {
        el.classList.remove('is-firing');
        void el.offsetWidth;
        el.classList.add('is-firing');
      });
      inner.classList.remove('is-recoil');
      void inner.offsetWidth;
      inner.classList.add('is-recoil');

      carrier.classList.remove('is-sheen-active');
      void carrier.offsetWidth;
      carrier.classList.add('is-sheen-active');

      // Update plaque & speech badge
      const plaqueLabel = this.root.querySelector<HTMLElement>('.crown-progress-label');
      if (plaqueLabel) {
        plaqueLabel.textContent =
          nowCount >= total
            ? `${nowCount} / ${total} Crown United!`
            : `${nowCount} / ${total} Crown ${nowCount === 1 ? 'Piece' : 'Pieces'}`;
      }
      const pip = this.root.querySelector<HTMLElement>(
        `.crown-progress-plaque [data-shard-pip-slot="${slotIdx}"]`,
      );
      if (pip) {
        pip.classList.remove('is-missing');
        pip.classList.add('is-collected', 'is-newly-added');
      }
      const badgeSpan = this.root.querySelector<HTMLElement>('[data-ceremony-badge] span');
      if (badgeSpan) {
        badgeSpan.textContent = `${nowCount} / ${total} Forged`;
      }

      if (i < addedShards.length - 1) {
        await waitMs(370, this.activeTimers);
      }
    }

    await waitMs(380, this.activeTimers);
    if (isStale()) return;
    this.root.classList.add('is-ambient');
  }

  private async runReturnToHud(token: number): Promise<void> {
    if (this.ceremonyReturning || token !== this.ceremonyToken) return;
    this.ceremonyReturning = true;
    this.clearAsyncArtifacts();

    const forge = this.activeCrownForge;
    forge?.onBeforeReturnToHud?.();

    const carrier = this.root.querySelector<HTMLElement>('.crown-flip-carrier');
    const inner = this.root.querySelector<HTMLElement>('.crown-flip-inner');
    const actor = this.root.querySelector<HTMLElement>('.crown-shard-actor');
    if (actor) {
      actor.innerHTML = '';
      actor.style.opacity = '0';
    }
    if (inner && this.ceremonyAfterShards.length > 0) {
      const complete = this.ceremonyAfterShards.length >= this.ceremonyTotal;
      inner.classList.remove('is-recoil');
      inner.innerHTML = renderStarCrownStandaloneSvg(this.ceremonyAfterShards, {
        variant: 'hero',
        showHalo: false,
        showFloatingStars: complete,
        animateIgnite: false,
        bareContrastEdge: true,
      });
    }

    this.root.classList.remove('is-ambient');
    this.root.classList.add('is-dismissing');

    const liveHudRect = forge?.getHudAnchorRect?.() ?? forge?.hudAnchorRect;
    if (carrier && liveHudRect && typeof carrier.animate === 'function') {
      const heroRect = carrier.getBoundingClientRect();
      const heroCx = heroRect.left + heroRect.width * 0.5;
      const heroCy = heroRect.top + heroRect.height * 0.5;
      const hudCx = liveHudRect.left + liveHudRect.width * 0.5;
      const hudCy = liveHudRect.top + liveHudRect.height * 0.5;
      const dx = hudCx - heroCx;
      const dy = hudCy - heroCy;
      const sEnd = Math.max(0.18, liveHudRect.width / Math.max(heroRect.width, 1));

      const flyBack = carrier.animate(
        [
          { transform: 'translate3d(0px, 0px, 0) scale(1)' },
          { transform: `translate3d(${dx}px, ${dy}px, 0) scale(${sEnd})` },
        ],
        { duration: 600, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' },
      );
      this.activeAnimations.push(flyBack);
      await waitMs(610, this.activeTimers);
    } else {
      await waitMs(280, this.activeTimers);
    }

    if (token !== this.ceremonyToken) return;
    this.finalizeClose(false);
  }

  private renderStandardNotice(
    defeatedFaction: FactionId,
    victorFaction: FactionId,
    isHumanDefeated: boolean,
  ): void {
    const defeatedDef = FACTION_DEFINITIONS[defeatedFaction];
    const victorDef = FACTION_DEFINITIONS[victorFaction];
    const defeatedColor = FACTION_HERALDRY[defeatedFaction];
    const victorColor = FACTION_HERALDRY[victorFaction];
    const alderwickWhisper = getEliminationWhisper(defeatedFaction, victorFaction, isHumanDefeated);

    this.root.className = 'modal-backdrop defeat-notice-modal';
    this.root.setAttribute('aria-label', 'Faction Defeated');

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
          ${esc(defeatedDef.name)} Fell to ${esc(victorDef.name)}
        </h2>
        <p class="defeat-notice-subline">
          ${esc(defeatedDef.realm)}’s final stronghold has fallen.
        </p>

        <div class="chronicle-alderwick-card is-notice">
          <span class="chronicle-alderwick-avatar is-sm">
            <img
              src="${ALDERWICK_ASSETS.portrait}"
              alt="${ALDERWICK_FULL_TITLE}"
              width="44"
              height="44"
              draggable="false"
            />
          </span>
          <div class="chronicle-alderwick-copy">
            <span class="chronicle-alderwick-speaker">
              ${renderIcon('star', 'icon icon-xs icon-star')}
              <span>${ALDERWICK_FULL_TITLE}</span>
            </span>
            <p class="chronicle-alderwick-quote">“${esc(alderwickWhisper)}”</p>
          </div>
        </div>

        <button type="button" class="btn btn-cta defeat-notice-btn" data-action="continue">
          <span>${isHumanDefeated ? 'Return to Main Menu' : 'Continue'}</span>
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
