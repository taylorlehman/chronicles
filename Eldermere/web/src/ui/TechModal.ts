import {
  FACTION_DEFINITIONS,
  TECH_DEFINITIONS,
  getFactionTechs,
} from '../game/data';
import {
  AGE_ROMAN,
  AGE_THRESHOLDS,
  getNextAgeProgress,
  getPlayerAge,
  getTechResearchBlockReason,
} from '../game/rules';
import type { GameState, PlayerAge, PlayerState, TechDefinition, TechId } from '../game/types';
import { FACTION_HERALDRY } from './Screens';
import { renderFactionCrest, renderIcon, renderUnitIcon } from './icons';
import { getTechIconKey, render3DThumbImg } from './thumbs';

export interface TechModalViewModel {
  player: PlayerState;
  cityCount: number;
  isHumanTurn: boolean;
  /** Optional full GameState for exact rules-engine block reasons. */
  state?: GameState;
  /** Optional precomputed dynamic Star cost per tech ID (falls back to standard formula if omitted). */
  techCosts?: Partial<Record<TechId, number>>;
  /** When set during the guided tutorial, highlights this tech and locks all others. */
  tutorialTargetTechId?: TechId | null;
}

export interface TechModalCallbacks {
  onResearch: (techId: TechId) => void;
  onClose: () => void;
}

type PillarIndex = 0 | 1 | 2 | 3;

interface PillarGroup {
  index: PillarIndex;
  name: string;
  shortName: string;
  root: TechDefinition | null;
  branchA: TechDefinition | null;
  branchB: TechDefinition | null;
  capstone: TechDefinition | null;
  techs: TechDefinition[];
  researchedCount: number;
  hasAffordable: boolean;
}

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

function defaultTechCost(tech: TechDefinition, player: PlayerState, cityCount: number): number {
  const base = tech.tier === 1 ? 3 : tech.tier === 2 ? 5 : 8;
  const cityPenalty = Math.max(0, cityCount - 1);
  const elfDiscount = player.techs.includes('elves_elven_lore') ? 1 : 0;
  return Math.max(2, base + cityPenalty - elfDiscount);
}

function shortenPillarName(name: string): string {
  const parts = name.split(/\s*&\s*/);
  return parts[0] || name;
}

function hasAllPrerequisites(tech: TechDefinition, researched: ReadonlySet<TechId>): boolean {
  return tech.prerequisites.every((prereq) => researched.has(prereq));
}

export class TechModal {
  private readonly root: HTMLElement;
  private readonly callbacks: TechModalCallbacks;
  private openState = false;
  private activePillarIndex: PillarIndex = 0;
  private pendingTechId: TechId | null = null;
  private blockedTechId: TechId | null = null;
  private lastVm: TechModalViewModel | null = null;
  private readonly onKeyDown: (e: KeyboardEvent) => void;

  constructor(container: HTMLElement, callbacks: TechModalCallbacks) {
    this.callbacks = callbacks;
    this.root = document.createElement('div');
    this.root.className = 'modal-backdrop tech-modal hidden';
    this.root.setAttribute('role', 'dialog');
    this.root.setAttribute('aria-modal', 'true');
    this.root.setAttribute('aria-label', 'Tech Codex');
    container.appendChild(this.root);

    this.root.addEventListener('click', (e) => {
      if (e.target === this.root) {
        if (this.pendingTechId || this.blockedTechId) {
          this.dismissSubDialog();
        } else {
          this.close();
        }
      }
    });

    this.onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.openState) {
        if (this.pendingTechId || this.blockedTechId) {
          e.stopPropagation();
          this.dismissSubDialog();
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

  public open(vm: TechModalViewModel): void {
    this.openState = true;
    this.pendingTechId = null;
    this.blockedTechId = null;
    this.lastVm = vm;
    if (vm.tutorialTargetTechId) {
      const targetTech = TECH_DEFINITIONS[vm.tutorialTargetTechId];
      if (targetTech && targetTech.faction === vm.player.faction) {
        this.activePillarIndex = targetTech.pillarIndex as PillarIndex;
      }
    }
    this.render(vm);
    this.root.classList.remove('hidden');
    this.restoreCarouselPosition(false);
  }

  public openToTech(vm: TechModalViewModel, techId: TechId): void {
    this.openState = true;
    this.pendingTechId = null;
    this.blockedTechId = null;
    this.lastVm = vm;

    const targetTech = TECH_DEFINITIONS[techId];
    if (targetTech && targetTech.faction === vm.player.faction) {
      this.activePillarIndex = targetTech.pillarIndex as PillarIndex;
      const researchedSet = new Set<TechId>(vm.player.techs);
      const age = getPlayerAge(vm.player);
      const cost = vm.techCosts?.[targetTech.id] ?? defaultTechCost(targetTech, vm.player, vm.cityCount);
      const tutorialBlocked = Boolean(vm.tutorialTargetTechId && vm.tutorialTargetTechId !== targetTech.id);
      const canResearchNow =
        !tutorialBlocked &&
        vm.isHumanTurn &&
        !researchedSet.has(targetTech.id) &&
        age >= targetTech.tier &&
        hasAllPrerequisites(targetTech, researchedSet) &&
        vm.player.gold >= cost;

      if (canResearchNow) {
        this.pendingTechId = techId;
      } else {
        this.blockedTechId = techId;
      }
    }

    this.render(vm);
    this.root.classList.remove('hidden');
    this.restoreCarouselPosition(false);
  }

  public update(vm: TechModalViewModel): void {
    this.lastVm = vm;
    if (this.openState) {
      this.render(vm);
      this.restoreCarouselPosition(false);
    }
  }

  public close(): void {
    if (!this.openState) return;
    this.openState = false;
    this.pendingTechId = null;
    this.blockedTechId = null;
    this.root.classList.add('hidden');
    this.callbacks.onClose();
  }

  public destroy(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    this.root.remove();
  }

  private dismissSubDialog(): void {
    if (!this.pendingTechId && !this.blockedTechId) return;
    this.pendingTechId = null;
    this.blockedTechId = null;
    if (this.openState && this.lastVm) {
      this.render(this.lastVm);
      this.restoreCarouselPosition(false);
    }
  }

  private computeBlockReason(
    vm: TechModalViewModel,
    tech: TechDefinition,
    cost: number,
    age: PlayerAge,
    researchedSet: ReadonlySet<TechId>,
  ): string {
    const { player, isHumanTurn, state } = vm;
    if (researchedSet.has(tech.id)) {
      return 'Already researched.';
    }
    if (!isHumanTurn) {
      return 'Wait for your turn to research technologies.';
    }
    if (vm.tutorialTargetTechId && vm.tutorialTargetTechId !== tech.id) {
      const targetName = TECH_DEFINITIONS[vm.tutorialTargetTechId]?.name ?? 'the highlighted technology';
      return `Complete the tutorial step by researching ${targetName} first.`;
    }
    if (tech.tier > age) {
      const needed = Math.max(1, AGE_THRESHOLDS[tech.tier] - player.techs.length);
      return `Requires Age ${AGE_ROMAN[tech.tier]} — research ${needed} more ${needed === 1 ? 'technology' : 'technologies'} to advance to Age ${AGE_ROMAN[tech.tier]}.`;
    }
    const missingPrereqs = tech.prerequisites.filter((id) => !researchedSet.has(id));
    if (missingPrereqs.length > 0) {
      const names = missingPrereqs.map((id) => TECH_DEFINITIONS[id]?.name ?? id);
      return `Requires ${names.join(' & ')} first.`;
    }
    if (player.gold < cost) {
      return `Need ${cost}★ (you have ${player.gold}★).`;
    }
    if (state) {
      const ruleReason = getTechResearchBlockReason(state, player.id, tech.id);
      if (ruleReason) return ruleReason;
    }
    return 'Cannot research right now.';
  }

  private render(vm: TechModalViewModel): void {
    const { player, cityCount, isHumanTurn, techCosts } = vm;
    const tutorialTargetTechId = vm.tutorialTargetTechId ?? null;
    const factionDef = FACTION_DEFINITIONS[player.faction];
    const heraldry = FACTION_HERALDRY[player.faction];
    const factionTechs = getFactionTechs(player.faction);
    const totalTechs = factionTechs.length;
    const researchedSet = new Set<TechId>(player.techs);
    const age = getPlayerAge(player);
    const ageProgress = getNextAgeProgress(player);

    const getCost = (tech: TechDefinition): number =>
      techCosts?.[tech.id] ?? defaultTechCost(tech, player, cityCount);

    const pillarIndices: PillarIndex[] = [0, 1, 2, 3];
    const pillars: PillarGroup[] = pillarIndices
      .map((index): PillarGroup | null => {
        const techs = factionTechs.filter((t) => t.pillarIndex === index);
        if (techs.length === 0) return null;

        const root = techs.find((t) => t.slot === 'root') ?? null;
        const branchA = techs.find((t) => t.slot === 'a') ?? null;
        const branchB = techs.find((t) => t.slot === 'b') ?? null;
        const capstone = techs.find((t) => t.slot === 'capstone') ?? null;

        const researchedCount = techs.filter((t) => researchedSet.has(t.id)).length;
        const hasAffordable =
          isHumanTurn &&
          techs.some(
            (t) =>
              (!tutorialTargetTechId || t.id === tutorialTargetTechId) &&
              !researchedSet.has(t.id) &&
              t.tier <= age &&
              hasAllPrerequisites(t, researchedSet) &&
              player.gold >= getCost(t),
          );

        return {
          index,
          name: techs[0].pillar,
          shortName: shortenPillarName(techs[0].pillar),
          root,
          branchA,
          branchB,
          capstone,
          techs,
          researchedCount,
          hasAffordable,
        };
      })
      .filter((p): p is PillarGroup => p !== null);

    if (this.activePillarIndex >= pillars.length) {
      this.activePillarIndex = 0;
    }

    const pillarNavHtml = `
      <div class="tech-pillar-nav" role="tablist" aria-label="Codex Pillars">
        <button
          type="button"
          class="tech-carousel-arrow tech-carousel-prev"
          data-carousel-prev
          aria-label="Previous pillar"
          title="Previous pillar"
          ${this.activePillarIndex === 0 ? 'disabled' : ''}
        >&lsaquo;</button>
        <div class="tech-pillar-pills">
          ${pillars
            .map(
              (p, i) => `
                <button
                  type="button"
                  class="tech-pillar-pill ${i === this.activePillarIndex ? 'active' : ''} ${p.hasAffordable ? 'has-affordable' : ''}"
                  data-pillar-jump="${i}"
                  role="tab"
                  aria-selected="${i === this.activePillarIndex}"
                >
                  <span class="tech-pillar-pill-label">${esc(p.shortName)}</span>
                  ${p.hasAffordable ? '<span class="tech-pillar-dot" aria-hidden="true"></span>' : ''}
                </button>
              `,
            )
            .join('')}
        </div>
        <button
          type="button"
          class="tech-carousel-arrow tech-carousel-next"
          data-carousel-next
          aria-label="Next pillar"
          title="Next pillar"
          ${this.activePillarIndex >= pillars.length - 1 ? 'disabled' : ''}
        >&rsaquo;</button>
        <span class="tech-pillar-counter" data-pillar-counter>${this.activePillarIndex + 1}/${pillars.length}</span>
      </div>
    `;

    const pillarsHtml = pillars
      .map((pillar) =>
        this.renderPillar(
          pillar,
          getCost,
          player,
          age,
          researchedSet,
          isHumanTurn,
          tutorialTargetTechId,
        ),
      )
      .join('');

    // Validate pending confirmation tech is still researchable
    let pendingTech: TechDefinition | null = null;
    if (this.pendingTechId) {
      const candidate = TECH_DEFINITIONS[this.pendingTechId];
      if (
        candidate &&
        candidate.faction === player.faction &&
        (!tutorialTargetTechId || candidate.id === tutorialTargetTechId) &&
        !researchedSet.has(candidate.id) &&
        candidate.tier <= age &&
        hasAllPrerequisites(candidate, researchedSet) &&
        isHumanTurn &&
        player.gold >= getCost(candidate)
      ) {
        pendingTech = candidate;
      } else {
        this.pendingTechId = null;
      }
    }

    let blockedTech: TechDefinition | null = null;
    if (!pendingTech && this.blockedTechId) {
      const candidate = TECH_DEFINITIONS[this.blockedTechId];
      if (candidate && candidate.faction === player.faction) {
        blockedTech = candidate;
      } else {
        this.blockedTechId = null;
      }
    }

    const overlayHtml = pendingTech
      ? this.renderConfirmDialog(pendingTech, getCost(pendingTech), player)
      : blockedTech
        ? this.renderRequirementsDialog(
            blockedTech,
            getCost(blockedTech),
            player,
            this.computeBlockReason(vm, blockedTech, getCost(blockedTech), age, researchedSet),
          )
        : '';

    const ageProgressText =
      ageProgress.nextAge !== null && ageProgress.requiredTechs !== null
        ? `${ageProgress.currentTechs}/${ageProgress.requiredTechs} Lore to Age ${AGE_ROMAN[ageProgress.nextAge]}`
        : `Max Age (${player.techs.length}/${totalTechs} Lore)`;

    const cityScaleNote =
      cityCount > 1
        ? `<span>&middot;</span><span class="tech-city-scale-note" title="Each additional city increases tech cost by +1 Star">+1${renderIcon('star', 'icon icon-xs icon-star')}/city</span>`
        : '';

    this.root.innerHTML = `
      <div class="modal-panel tech-modal-panel">
        <div class="sheet-handle" aria-hidden="true"></div>
        <div class="modal-header">
          <div class="modal-title-wrap">
            <h2 class="modal-title">
              <span class="faction-crest-badge" style="background: ${heraldry}; width: 28px; height: 28px;">
                ${renderFactionCrest(player.faction, 'icon icon-crest-sm')}
              </span>
              <span>${esc(factionDef.name)} Codex</span>
              <span class="tech-age-pill">${renderIcon('codex', 'icon icon-xs')}<span>Age ${AGE_ROMAN[age]}</span></span>
            </h2>
            <span class="modal-subtitle">
              <strong class="gold-text">${player.gold}${renderIcon('star', 'icon icon-sm icon-star')}</strong>
              <span>&middot;</span>
              <span class="tech-age-progress">${esc(ageProgressText)}</span>
              ${cityScaleNote}
              ${player.techs.includes('elves_elven_lore') ? '<span>&middot;</span><span class="tech-discount-note">-1★ Lore</span>' : ''}
            </span>
          </div>
          <button type="button" class="btn btn-icon modal-close-btn" data-action="close" aria-label="Close Codex">
            ${renderIcon('close', 'icon')}
          </button>
        </div>

        ${pillarNavHtml}

        <div class="tech-tree-grid" data-tech-carousel>
          ${pillarsHtml}
        </div>

        ${overlayHtml}
      </div>
    `;

    this.bindEvents();
  }

  private renderTechDialogIcon(tech: TechDefinition, player: PlayerState): string {
    const iconKey = getTechIconKey(tech);
    const thumbImg = render3DThumbImg(iconKey, player.faction, 'thumb-3d thumb-confirm', tech.name);
    if (thumbImg) return thumbImg;
    return tech.unlocksUnits.length > 0
      ? renderUnitIcon(tech.unlocksUnits[0], 'icon icon-lg')
      : tech.unlocksImprovements.length > 0
        ? renderIcon('tower', 'icon icon-lg')
        : tech.unlocksResources.length > 0
          ? renderIcon('leaf', 'icon icon-lg')
          : tech.tier === 3
            ? renderIcon('crown', 'icon icon-lg')
            : renderIcon('codex', 'icon icon-lg');
  }

  private renderConfirmDialog(
    tech: TechDefinition,
    cost: number,
    player: PlayerState,
  ): string {
    const remainingGold = Math.max(0, player.gold - cost);
    const ageLabel =
      tech.tier === 3 ? 'Age III · Capstone' : `Age ${AGE_ROMAN[tech.tier]}`;

    return `
      <div class="tech-confirm-scrim" data-confirm-scrim role="alertdialog" aria-modal="true" aria-label="Confirm Research">
        <div class="tech-confirm-card">
          <div class="tech-confirm-top">
            <div class="tech-confirm-thumb" aria-hidden="true">${this.renderTechDialogIcon(tech, player)}</div>
            <div class="tech-confirm-copy">
              <div class="tech-confirm-kicker">${esc(tech.pillar)} &middot; ${ageLabel}</div>
              <h3 class="tech-confirm-title">Research ${esc(tech.name)}?</h3>
              <p class="tech-confirm-summary">${formatStars(tech.summary)}</p>
            </div>
          </div>
          <div class="tech-confirm-cost-row">
            <span class="tech-confirm-cost-label">Cost</span>
            <span class="tech-confirm-cost-val">
              <strong>${cost}${renderIcon('star', 'icon icon-sm icon-star')}</strong>
              <span class="tech-confirm-balance">(${player.gold} &rarr; ${remainingGold}${renderIcon('star', 'icon icon-xs icon-star')})</span>
            </span>
          </div>
          <div class="tech-confirm-actions">
            <button type="button" class="btn btn-secondary tech-confirm-cancel" data-confirm-cancel>
              Cancel
            </button>
            <button type="button" class="btn btn-primary tech-confirm-ok" data-confirm-research="${tech.id}">
              <span>Research</span>
              <span class="tech-confirm-btn-cost">${cost}${renderIcon('star', 'icon icon-xs icon-star')}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private renderRequirementsDialog(
    tech: TechDefinition,
    cost: number,
    player: PlayerState,
    reason: string,
  ): string {
    const ageLabel =
      tech.tier === 3 ? 'Age III · Capstone' : `Age ${AGE_ROMAN[tech.tier]}`;

    return `
      <div class="tech-confirm-scrim" data-confirm-scrim role="alertdialog" aria-modal="true" aria-label="Technology Requirements">
        <div class="tech-confirm-card tech-requirements-card">
          <div class="tech-confirm-top">
            <div class="tech-confirm-thumb" aria-hidden="true">${this.renderTechDialogIcon(tech, player)}</div>
            <div class="tech-confirm-copy">
              <div class="tech-confirm-kicker">${esc(tech.pillar)} &middot; ${ageLabel}</div>
              <h3 class="tech-confirm-title">${esc(tech.name)}</h3>
              <p class="tech-confirm-summary">${formatStars(tech.summary)}</p>
            </div>
          </div>
          <div class="tech-requirements-reason">
            ${renderIcon('lock', 'icon icon-sm')}
            <span>${formatStars(reason)}</span>
          </div>
          <div class="tech-confirm-cost-row">
            <span class="tech-confirm-cost-label">Cost</span>
            <span class="tech-confirm-cost-val">
              <strong>${cost}${renderIcon('star', 'icon icon-sm icon-star')}</strong>
              <span class="tech-confirm-balance">(You have ${player.gold}${renderIcon('star', 'icon icon-xs icon-star')})</span>
            </span>
          </div>
          <div class="tech-confirm-actions is-single">
            <button type="button" class="btn btn-primary tech-confirm-ok" data-confirm-cancel>
              OK
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private renderPillar(
    pillar: PillarGroup,
    getCost: (tech: TechDefinition) => number,
    player: PlayerState,
    age: PlayerAge,
    researchedSet: ReadonlySet<TechId>,
    isHumanTurn: boolean,
    tutorialTargetTechId: TechId | null,
  ): string {
    const { root, branchA, branchB, capstone } = pillar;
    const isPillarComplete = pillar.researchedCount === pillar.techs.length;

    const rootHtml = root
      ? `<div class="tech-tree-row-center">${this.renderTechCard(root, getCost(root), player, age, researchedSet, isHumanTurn, 'wide', tutorialTargetTechId)}</div>`
      : '';

    const forkConnectorHtml = this.renderForkConnector(root, branchA, branchB, researchedSet);

    const branchRowHtml = `
      <div class="tech-tree-row-split">
        ${branchA ? this.renderTechCard(branchA, getCost(branchA), player, age, researchedSet, isHumanTurn, 'branch', tutorialTargetTechId) : '<div class="tech-slot-empty"></div>'}
        ${branchB ? this.renderTechCard(branchB, getCost(branchB), player, age, researchedSet, isHumanTurn, 'branch', tutorialTargetTechId) : '<div class="tech-slot-empty"></div>'}
      </div>
    `;

    const capstoneConnectorHtml = this.renderCapstoneConnector(branchA, branchB, capstone, researchedSet);

    const capstoneHtml = capstone
      ? `<div class="tech-tree-row-center">${this.renderTechCard(capstone, getCost(capstone), player, age, researchedSet, isHumanTurn, 'wide', tutorialTargetTechId)}</div>`
      : '';

    return `
      <section class="tech-pillar${pillar.index === this.activePillarIndex ? ' pillar-active' : ''}" data-pillar-index="${pillar.index}" aria-label="${esc(pillar.name)} Pillar">
        <header class="tech-pillar-header">
          <span class="tech-branch-header">${esc(pillar.name)}</span>
          <span class="tech-pillar-progress ${isPillarComplete ? 'complete' : ''}">
            ${isPillarComplete ? renderIcon('check', 'icon icon-xs') : ''}
            <span>${pillar.researchedCount}/${pillar.techs.length}</span>
          </span>
        </header>
        <div class="tech-pillar-tree">
          ${rootHtml}
          ${forkConnectorHtml}
          ${branchRowHtml}
          ${capstoneConnectorHtml}
          ${capstoneHtml}
        </div>
      </section>
    `;
  }

  private renderForkConnector(
    root: TechDefinition | null,
    branchA: TechDefinition | null,
    branchB: TechDefinition | null,
    researchedSet: ReadonlySet<TechId>,
  ): string {
    const rootDone = Boolean(root && researchedSet.has(root.id));
    const leftDone = Boolean(rootDone && branchA && researchedSet.has(branchA.id));
    const rightDone = Boolean(rootDone && branchB && researchedSet.has(branchB.id));

    const leftState = leftDone ? 'done' : rootDone ? 'unlocked' : 'locked';
    const rightState = rightDone ? 'done' : rootDone ? 'unlocked' : 'locked';

    // Render higher-priority active arm second so it paints cleanly over the shared stem
    const paths = [
      { d: 'M 100 0 L 100 10 L 49 10 L 49 22', state: leftState, rank: leftDone ? 2 : rootDone ? 1 : 0 },
      { d: 'M 100 0 L 100 10 L 151 10 L 151 22', state: rightState, rank: rightDone ? 2 : rootDone ? 1 : 0 },
    ].sort((a, b) => a.rank - b.rank);

    const hubState = leftDone || rightDone ? 'done' : rootDone ? 'unlocked' : 'locked';

    return `
      <div class="tech-svg-connector tech-fork-connector" aria-hidden="true">
        <svg viewBox="0 0 200 22" preserveAspectRatio="none" focusable="false">
          ${paths.map((p) => `<path class="tech-link ${p.state}" d="${p.d}" vector-effect="non-scaling-stroke" />`).join('')}
          <circle class="tech-link-node ${hubState}" cx="100" cy="10" r="2.2" />
        </svg>
      </div>
    `;
  }

  private renderCapstoneConnector(
    branchA: TechDefinition | null,
    branchB: TechDefinition | null,
    capstone: TechDefinition | null,
    researchedSet: ReadonlySet<TechId>,
  ): string {
    if (!capstone) return '';

    const fromA = Boolean(branchA && capstone.prerequisites.includes(branchA.id));
    const fromB = Boolean(branchB && capstone.prerequisites.includes(branchB.id));
    const capstoneDone = researchedSet.has(capstone.id);

    const segments: { d: string; state: string; rank: number; nodeX: number }[] = [];

    if (fromA && branchA) {
      const prereqDone = researchedSet.has(branchA.id);
      const state = prereqDone && capstoneDone ? 'done' : prereqDone ? 'unlocked' : 'locked';
      segments.push({
        d: 'M 49 0 L 49 11 L 100 11 L 100 22',
        state,
        rank: state === 'done' ? 2 : state === 'unlocked' ? 1 : 0,
        nodeX: 49,
      });
    }

    if (fromB && branchB) {
      const prereqDone = researchedSet.has(branchB.id);
      const state = prereqDone && capstoneDone ? 'done' : prereqDone ? 'unlocked' : 'locked';
      segments.push({
        d: 'M 151 0 L 151 11 L 100 11 L 100 22',
        state,
        rank: state === 'done' ? 2 : state === 'unlocked' ? 1 : 0,
        nodeX: 151,
      });
    }

    if (segments.length === 0) {
      const prereqsMet = hasAllPrerequisites(capstone, researchedSet);
      const state = prereqsMet && capstoneDone ? 'done' : prereqsMet ? 'unlocked' : 'locked';
      segments.push({
        d: 'M 100 0 L 100 22',
        state,
        rank: state === 'done' ? 2 : state === 'unlocked' ? 1 : 0,
        nodeX: 100,
      });
    }

    segments.sort((a, b) => a.rank - b.rank);
    const bestState = segments[segments.length - 1].state;

    return `
      <div class="tech-svg-connector tech-capstone-connector" aria-hidden="true">
        <svg viewBox="0 0 200 22" preserveAspectRatio="none" focusable="false">
          ${segments.map((s) => `<path class="tech-link ${s.state}" d="${s.d}" vector-effect="non-scaling-stroke" />`).join('')}
          <circle class="tech-link-node ${bestState}" cx="100" cy="11" r="2.2" />
        </svg>
      </div>
    `;
  }

  private renderTechCard(
    tech: TechDefinition,
    cost: number,
    player: PlayerState,
    age: PlayerAge,
    researchedSet: ReadonlySet<TechId>,
    isHumanTurn: boolean,
    layout: 'wide' | 'branch',
    tutorialTargetTechId: TechId | null,
  ): string {
    const isResearched = researchedSet.has(tech.id);
    const isTutorialTarget = Boolean(tutorialTargetTechId && tech.id === tutorialTargetTechId);
    const isTutorialLocked = Boolean(tutorialTargetTechId && tech.id !== tutorialTargetTechId);
    const isAgeLocked = !isResearched && tech.tier > age;
    const missingPrereqs = tech.prerequisites.filter((id) => !researchedSet.has(id));
    const hasPrereq = missingPrereqs.length === 0;
    const isAffordable = player.gold >= cost;
    const canResearch =
      !isResearched &&
      !isTutorialLocked &&
      !isAgeLocked &&
      hasPrereq &&
      isAffordable &&
      isHumanTurn;
    const shortfall = Math.max(0, cost - player.gold);
    const missingPrereqNames = missingPrereqs.map((id) => TECH_DEFINITIONS[id]?.name ?? id);

    let stateClass = 'locked';
    let pillClass = 'locked';
    let pillHtml = `${renderIcon('lock', 'icon icon-xs')}<span>${cost}</span>${renderIcon('star', 'icon icon-xs')}`;
    let statusNoteHtml = '';

    if (isResearched) {
      stateClass = 'researched';
      pillClass = 'researched';
      pillHtml = `${renderIcon('check', 'icon icon-xs')}<span>Done</span>`;
    } else if (isAgeLocked) {
      stateClass = 'locked age-locked';
      pillClass = 'locked';
      const ageNeeded = Math.max(1, AGE_THRESHOLDS[tech.tier] - player.techs.length);
      statusNoteHtml = `<div class="tech-status-note is-age-locked">${renderIcon('lock', 'icon icon-xs')}<span>Age ${AGE_ROMAN[tech.tier]} &middot; ${ageNeeded} more</span></div>`;
    } else if (hasPrereq) {
      if (isAffordable && isHumanTurn) {
        stateClass = 'available affordable';
        pillClass = 'affordable';
        pillHtml = `<span>${cost}</span>${renderIcon('star', 'icon icon-xs')}`;
      } else {
        stateClass = 'available unaffordable';
        pillClass = 'unaffordable';
        pillHtml = `<span>${cost}</span>${renderIcon('star', 'icon icon-xs')}`;
        statusNoteHtml = isHumanTurn
          ? `<div class="tech-status-note">Need ${shortfall}${renderIcon('star', 'icon icon-xs icon-star')}</div>`
          : `<div class="tech-status-note">Rival turn</div>`;
      }
    } else if (missingPrereqNames.length > 0) {
      statusNoteHtml = `<div class="tech-status-note">${renderIcon('lock', 'icon icon-xs')}<span>${esc(missingPrereqNames.join(' + '))}</span></div>`;
    }

    const iconKey = getTechIconKey(tech);
    const thumbImg = render3DThumbImg(iconKey, player.faction, 'thumb-3d thumb-tech', tech.name);
    const fallbackIcon =
      tech.unlocksUnits.length > 0
        ? renderUnitIcon(tech.unlocksUnits[0], 'icon icon-lg')
        : tech.unlocksImprovements.length > 0
          ? renderIcon('tower', 'icon icon-lg')
          : tech.unlocksResources.length > 0
            ? renderIcon('leaf', 'icon icon-lg')
            : tech.tier === 3
              ? renderIcon('crown', 'icon icon-lg')
              : renderIcon('codex', 'icon icon-lg');

    const thumbHtml = `<div class="tech-thumb-box" aria-hidden="true">${thumbImg || fallbackIcon}</div>`;
    const ageBadge =
      tech.tier === 3
        ? `${renderIcon('crown', 'icon icon-xs icon-star')}<span>Age III &middot; Capstone</span>`
        : `<span>Age ${AGE_ROMAN[tech.tier]}</span>`;
    const tutorialBadgeHtml = isTutorialTarget
      ? '<span class="tech-tutorial-badge">TUTORIAL</span>'
      : '';
    const tutorialClass = isTutorialTarget
      ? ' is-tutorial-target'
      : isTutorialLocked
        ? ' is-tutorial-locked'
        : '';
    const tierClass = `tier-${tech.tier}${tech.slot === 'capstone' ? ' is-capstone' : ''}`;
    const layoutClass = `tech-card--${layout}`;

    const innerHtml =
      layout === 'wide'
        ? `
          <div class="tech-card-body">
            ${thumbHtml}
            <div class="tech-card-main">
              <div class="tech-card-head">
                <div class="tech-card-titles">
                  <div class="tech-tier-tag">${ageBadge}${tutorialBadgeHtml}</div>
                  <div class="tech-name">${esc(tech.name)}</div>
                </div>
                <span class="tech-status-pill ${pillClass}">${pillHtml}</span>
              </div>
              <p class="tech-summary">${formatStars(tech.summary)}</p>
              ${statusNoteHtml}
            </div>
          </div>
        `
        : `
          <div class="tech-card-branch-top">
            ${thumbHtml}
            <div class="tech-card-branch-meta">
              <div class="tech-tier-tag">${ageBadge}${tutorialBadgeHtml}</div>
              <span class="tech-status-pill ${pillClass}">${pillHtml}</span>
            </div>
          </div>
          <div class="tech-name">${esc(tech.name)}</div>
          <p class="tech-summary">${formatStars(tech.summary)}</p>
          ${statusNoteHtml}
        `;

    if (isResearched) {
      return `<div class="tech-card ${layoutClass} ${tierClass} ${stateClass}${tutorialClass}">${innerHtml}</div>`;
    }

    const isPending = this.pendingTechId === tech.id;
    return `
      <button
        type="button"
        class="tech-card ${layoutClass} ${tierClass} ${stateClass}${tutorialClass} ${isPending ? 'is-pending' : ''}"
        data-research-tech="${tech.id}"
        ${canResearch ? '' : 'disabled'}
      >
        ${innerHtml}
      </button>
    `;
  }

  private bindEvents(): void {
    this.root.querySelector<HTMLButtonElement>('[data-action="close"]')?.addEventListener('click', () => {
      this.close();
    });

    this.root.querySelectorAll<HTMLButtonElement>('[data-research-tech]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const techId = btn.dataset.researchTech as TechId;
        if (techId && !btn.disabled && this.lastVm) {
          this.pendingTechId = techId;
          this.blockedTechId = null;
          this.render(this.lastVm);
          this.restoreCarouselPosition(false);
        }
      });
    });

    this.root.querySelector<HTMLElement>('[data-confirm-scrim]')?.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.dismissSubDialog();
      }
    });

    this.root.querySelector<HTMLButtonElement>('[data-confirm-cancel]')?.addEventListener('click', () => {
      this.dismissSubDialog();
    });

    this.root.querySelector<HTMLButtonElement>('[data-confirm-research]')?.addEventListener('click', (e) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const techId = btn.dataset.confirmResearch as TechId;
      if (techId) {
        this.pendingTechId = null;
        this.blockedTechId = null;
        this.callbacks.onResearch(techId);
      }
    });

    const carousel = this.root.querySelector<HTMLElement>('[data-tech-carousel]');
    const pills = Array.from(this.root.querySelectorAll<HTMLButtonElement>('[data-pillar-jump]'));
    const counterEl = this.root.querySelector<HTMLElement>('[data-pillar-counter]');
    const prevBtn = this.root.querySelector<HTMLButtonElement>('[data-carousel-prev]');
    const nextBtn = this.root.querySelector<HTMLButtonElement>('[data-carousel-next]');

    const updateNavActive = (idx: PillarIndex) => {
      this.activePillarIndex = idx;
      pills.forEach((pill, i) => {
        const active = i === idx;
        pill.classList.toggle('active', active);
        pill.setAttribute('aria-selected', String(active));
      });
      if (counterEl && pills.length > 0) {
        counterEl.textContent = `${idx + 1}/${pills.length}`;
      }
      if (prevBtn) {
        prevBtn.disabled = idx <= 0;
      }
      if (nextBtn) {
        nextBtn.disabled = idx >= Math.max(0, pills.length - 1);
      }
      // Tab-switched single-pillar view (used by html.android-webview mobile CSS instead of a scroll carousel)
      this.root.querySelectorAll<HTMLElement>('.tech-pillar').forEach((el) => {
        el.classList.toggle('pillar-active', Number(el.dataset.pillarIndex) === idx);
      });
    };

    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const idx = Number(pill.dataset.pillarJump) as PillarIndex;
        if (Number.isNaN(idx)) return;
        updateNavActive(idx);
        this.restoreCarouselPosition(true);
      });
    });

    prevBtn?.addEventListener('click', () => {
      const nextIdx = Math.max(0, this.activePillarIndex - 1) as PillarIndex;
      if (nextIdx !== this.activePillarIndex) {
        updateNavActive(nextIdx);
        this.restoreCarouselPosition(true);
      }
    });

    nextBtn?.addEventListener('click', () => {
      const maxIdx = Math.max(0, pills.length - 1);
      const nextIdx = Math.min(maxIdx, this.activePillarIndex + 1) as PillarIndex;
      if (nextIdx !== this.activePillarIndex) {
        updateNavActive(nextIdx);
        this.restoreCarouselPosition(true);
      }
    });

    if (carousel) {
      carousel.addEventListener(
        'wheel',
        (e: WheelEvent) => {
          if (carousel.scrollWidth <= carousel.clientWidth + 2) return;
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && e.deltaY !== 0) {
            e.preventDefault();
            carousel.scrollLeft += e.deltaY;
          }
        },
        { passive: false },
      );

      let scrollRaf: number | null = null;
      carousel.addEventListener(
        'scroll',
        () => {
          if (scrollRaf !== null) return;
          scrollRaf = window.requestAnimationFrame(() => {
            scrollRaf = null;
            const slideEls = Array.from(carousel.querySelectorAll<HTMLElement>('.tech-pillar'));
            if (slideEls.length === 0) return;
            const center = carousel.scrollLeft + carousel.clientWidth * 0.5;
            let bestIdx = 0;
            let bestDist = Infinity;
            slideEls.forEach((el, i) => {
              const elCenter = el.offsetLeft + el.offsetWidth * 0.5;
              const dist = Math.abs(elCenter - center);
              if (dist < bestDist) {
                bestDist = dist;
                bestIdx = i;
              }
            });
            if (bestIdx !== this.activePillarIndex) {
              updateNavActive(bestIdx as PillarIndex);
            }
          });
        },
        { passive: true },
      );
    }
  }

  private restoreCarouselPosition(smooth: boolean): void {
    const carousel = this.root.querySelector<HTMLElement>('[data-tech-carousel]');
    if (!carousel || carousel.scrollWidth <= carousel.clientWidth + 2) return;
    const target = carousel.querySelector<HTMLElement>(
      `.tech-pillar[data-pillar-index="${this.activePillarIndex}"]`,
    );
    if (!target) return;
    carousel.scrollTo({
      left: Math.max(0, target.offsetLeft - carousel.offsetLeft),
      behavior: smooth ? 'smooth' : 'auto',
    });
  }
}
