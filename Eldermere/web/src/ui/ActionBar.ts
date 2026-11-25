import { IMPROVEMENT_DEFINITIONS, TECH_DEFINITIONS, UNIT_DEFINITIONS } from '../game/data';
import type {
  ActionOption,
  City,
  CombatPreview,
  FactionId,
  GameAction,
  PlayerState,
  TechId,
  Tile,
  Unit,
} from '../game/types';
import { FACTION_HERALDRY } from './Screens';
import {
  renderActionIcon,
  renderFactionCodexIcon,
  renderFactionEndTurnIcon,
  renderFactionSuperpowerIcon,
  renderIcon,
  renderUnitIcon,
} from './icons';
import { render3DThumbImg, renderUnitThumbOrIcon } from './thumbs';

export type SelectionLayer = 'unit' | 'tile';

export interface SelectedUnitInfo {
  unit: Unit;
  owner: PlayerState;
  isOwnedByHuman: boolean;
  effectiveAttack?: number;
  effectiveDefense?: number;
  effectiveMovement?: number;
  actions: ActionOption[];
}

export interface SelectedCityInfo {
  city: City;
  owner: PlayerState;
  isOwnedByHuman: boolean;
  unitCount: number;
  unitCap: number;
  income: number;
  popNeeded: number;
  occupiedByUnit: boolean;
  trainOptions: ActionOption[];
}

export interface SelectedTileInfo {
  tile: Tile;
  terrainName: string;
  defenseBonus: number;
  isRevealed: boolean;
  actions: ActionOption[];
}

export interface CombatPreviewDisplay {
  preview: CombatPreview;
  attacker: Unit;
  attackerOwner: PlayerState;
  defender: Unit;
  defenderOwner: PlayerState;
  targetIsCityOrVillage?: boolean;
}

export interface ActionBarViewModel {
  isHumanTurn: boolean;
  playerFaction: FactionId;
  playerGold: number;
  hasAffordableTech: boolean;
  affordableTechCount: number;
  remainingUnitsCount: number;
  allUnitsActed: boolean;
  canUseSuperpower?: boolean;
  superpowerTargeting?: boolean;
  superpowerLabel?: string;
  selectionLayer: SelectionLayer;
  /** @deprecated Layer toggle removed from ActionBar; kept optional for backward compatibility. */
  canToggleLayer?: boolean;
  /** @deprecated Layer toggle removed from ActionBar; kept optional for backward compatibility. */
  altLayerLabel?: 'City' | 'Tile';
  selectedUnit: SelectedUnitInfo | null;
  selectedCity: SelectedCityInfo | null;
  selectedTile: SelectedTileInfo | null;
  combatPreview: CombatPreviewDisplay | null;
}

export interface ActionBarCallbacks {
  onAction: (action: GameAction) => void;
  onDeselect?: () => void;
  onSwitchLayer?: (layer: SelectionLayer) => void;
  onUnlockTech?: (techId: TechId) => void;
  onOpenTech?: () => void;
  onActivateSuperpower?: () => void;
  onNextReadyUnit?: () => void;
  onEndTurn?: () => void;
}

const RESOURCE_LABELS: Record<string, string> = {
  berries: 'Berries',
  game: 'Game',
  ore: 'Ore',
  mithril: 'Starsteel',
  ruins: 'Ruins',
};

const ACTION_3D_THUMB_KEYS: Record<string, string> = {
  harvest_berries: 'berries',
  harvest_game: 'game',
  harvest_ore: 'ore',
  harvest_mithril: 'mithril',
  build_farm: 'farm',
  build_windmill: 'windmill',
  build_slag_pit: 'slag_pit',
  build_foundry: 'foundry',
  build_sanctuary: 'sanctuary',
  build_mine: 'mine',
  build_great_forge: 'great_forge',
  build_road: 'road',
  plant_ancient_woods: 'ancient_woods',
};

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function hpTier(hp: number, maxHp: number): string {
  const ratio = maxHp > 0 ? hp / maxHp : 0;
  if (ratio <= 0.35) return 'low';
  if (ratio <= 0.65) return 'mid';
  return '';
}

function shortActionLabel(opt: ActionOption): string {
  if (opt.id === 'capture-city') {
    return opt.label.toLowerCase().includes('village') ? 'Claim' : 'Capture';
  }
  if (opt.id === 'explore-ruins') return 'Explore';
  if (opt.id === 'recover') return 'Heal';
  if (opt.id === 'promote') return 'Promote';
  if (opt.id === 'build_road') return 'Road';
  if (opt.id === 'chop_forest') return 'Chop';
  if (opt.id === 'plant_ancient_woods') return 'Woods';
  if (opt.id.startsWith('harvest_')) {
    return opt.label.replace(/^Harvest\s+/i, '');
  }
  if (opt.id.startsWith('build_')) {
    return opt.label.replace(/^Build\s+/i, '');
  }
  if (opt.unitType) {
    switch (opt.unitType) {
      case 'rohirrim_knight':
        return 'Sunmark';
      case 'uruk_berserker':
        return 'Berserker';
      case 'elven_sentinel':
        return 'Sentinel';
      default:
        return opt.label;
    }
  }
  return opt.label;
}

function shortDisabledReason(opt: ActionOption, isHumanTurn: boolean): string | null {
  if (!isHumanTurn) return 'Wait';
  if (opt.enabled) return null;
  const r = opt.disabledReason ?? '';
  if (!r) return 'Locked';
  if (/next turn/i.test(r)) return 'Next Turn';
  if (/full hp/i.test(r)) return 'Full HP';
  if (/already acted/i.test(r)) return 'Acted';
  if (/already veteran/i.test(r)) return 'Veteran';
  if (/kills:/i.test(r)) return r.replace(/Kills:\s*/i, 'Kills ');
  if (/occupied/i.test(r)) return 'Occupied';
  if (/cap reached/i.test(r)) return 'Cap Full';
  if (/outside.*border/i.test(r)) return 'Borders';
  if (/enemy territory/i.test(r)) return 'Enemy';
  const needMatch = r.match(/Need\s+(\d+★)/i);
  if (needMatch) return `Need ${needMatch[1]}`;
  if (/requires/i.test(r)) return 'Locked';
  return r.length > 12 ? `${r.slice(0, 11)}…` : r;
}

export class ActionBar {
  private readonly root: HTMLElement;
  private readonly callbacks: ActionBarCallbacks;

  constructor(container: HTMLElement, callbacks: ActionBarCallbacks) {
    this.callbacks = callbacks;
    this.root = document.createElement('section');
    this.root.className = 'bottom-hud-wrapper hidden';
    this.root.setAttribute('aria-label', 'Game actions');
    container.appendChild(this.root);
  }

  public show(): void {
    this.root.classList.remove('hidden');
  }

  public hide(): void {
    this.root.classList.add('hidden');
  }

  public update(vm: ActionBarViewModel): void {
    this.root.classList.remove('hidden');
    this.render(vm);
  }

  public destroy(): void {
    this.root.remove();
  }

  private render(vm: ActionBarViewModel): void {
    const combatHtml = vm.combatPreview ? this.renderCombatStrip(vm.combatPreview) : '';
    const hasSelection = Boolean(vm.selectedUnit || vm.selectedCity || vm.selectedTile);

    const bodyHtml = hasSelection
      ? this.renderSelectionDrawer(vm)
      : this.renderIdleBar(vm);

    this.root.innerHTML = `${combatHtml}${bodyHtml}`;
    this.bindEvents(vm);
  }

  private renderIdleBar(vm: ActionBarViewModel): string {
    const techBadgeHtml =
      vm.hasAffordableTech && vm.affordableTechCount > 0
        ? `<span class="tt-dock-badge">${vm.affordableTechCount}</span>`
        : '';

    const shouldGlow = vm.isHumanTurn && vm.allUnitsActed;
    const showSuperpowerDock = Boolean(vm.canUseSuperpower || vm.superpowerTargeting);
    const spLabel = vm.superpowerTargeting
      ? 'Cancel'
      : vm.superpowerLabel || 'Power';
    const superpowerDockHtml = showSuperpowerDock
      ? `
        <button
          type="button"
          class="tt-dock-btn tt-dock-btn-superpower ${vm.superpowerTargeting ? 'is-targeting' : ''}"
          data-idle-action="superpower"
          title="${vm.superpowerTargeting ? 'Cancel superpower targeting' : `Unleash ${esc(spLabel)}`}"
          aria-label="${vm.superpowerTargeting ? 'Cancel superpower targeting' : `Unleash ${esc(spLabel)}`}"
          ${vm.isHumanTurn ? '' : 'disabled'}
        >
          <span class="tt-dock-medallion tt-superpower-medallion" aria-hidden="true">
            <span class="tt-superpower-ring"></span>
            ${
              vm.superpowerTargeting
                ? renderIcon('close', 'icon icon-superpower-dock')
                : renderFactionSuperpowerIcon(vm.playerFaction, 'icon icon-superpower-dock')
            }
          </span>
          <span class="tt-dock-label tt-superpower-label">${esc(spLabel)}</span>
        </button>
      `
      : '';

    return `
      <div class="idle-bottom-bar" role="toolbar" aria-label="Turn controls">
        <button
          type="button"
          class="tt-dock-btn tt-dock-btn-codex idle-codex-btn"
          data-idle-action="tech"
          title="Open Tech Codex"
          aria-label="Open Tech Codex"
        >
          <span class="tt-dock-medallion" aria-hidden="true">
            ${renderFactionCodexIcon(vm.playerFaction, 'icon')}
            ${techBadgeHtml}
          </span>
          <span class="tt-dock-label">Codex</span>
        </button>

        ${superpowerDockHtml}

        <button
          type="button"
          class="tt-dock-btn tt-dock-btn-end idle-end-turn-btn ${shouldGlow ? 'all-done' : ''}"
          data-idle-action="end-turn"
          title="${vm.isHumanTurn ? 'End Turn (Space)' : 'Rival turn in progress'}"
          aria-label="${vm.isHumanTurn ? 'End Turn' : 'Rival Turn'}"
          ${vm.isHumanTurn ? '' : 'disabled'}
        >
          <span class="tt-dock-medallion" aria-hidden="true">
            ${renderFactionEndTurnIcon(vm.playerFaction, 'icon')}
          </span>
          <span class="tt-dock-label">${vm.isHumanTurn ? 'End Turn' : 'Rival Turn'}</span>
        </button>
      </div>
    `;
  }

  private renderCombatStrip(display: CombatPreviewDisplay): string {
    const { preview, attacker, attackerOwner, defender, defenderOwner } = display;
    const atkDef = UNIT_DEFINITIONS[attacker.type];
    const defDef = UNIT_DEFINITIONS[defender.type];
    const defHeraldry = FACTION_HERALDRY[defenderOwner.faction];

    const defAfter = Math.max(0, defender.hp - preview.attackerDamage);
    const atkAfter = Math.max(0, attacker.hp - preview.retaliationDamage);
    const isLethal = preview.defenderKilled;
    const isFatalCounter = !isLethal && preview.attackerKilled;

    let tagHtml = '';
    if (isLethal) {
      tagHtml = `<span class="combat-strip-badge lethal">${renderIcon('skull', 'icon icon-sm')} LETHAL</span>`;
    } else if (isFatalCounter) {
      tagHtml = `<span class="combat-strip-badge fatal">${renderIcon('skull', 'icon icon-sm')} FATAL</span>`;
    } else if (preview.retaliationDamage === 0) {
      tagHtml = `<span class="combat-strip-badge safe">SAFE</span>`;
    }

    let bonusHtml = '';
    if (isLethal && attackerOwner.faction === 'orcs') {
      const hasSpoilsMastery = attackerOwner.techs.includes('orcs_spoils_mastery');
      const killGold = hasSpoilsMastery ? 3 : 2;
      bonusHtml = `<span class="combat-strip-bonus">+${killGold}${renderIcon('star', 'icon icon-sm icon-star')}</span>`;
    } else if (isLethal && atkDef.traits.includes('persist') && !defDef.traits.includes('stalwart')) {
      bonusHtml = `<span class="combat-strip-bonus">Persist</span>`;
    }

    return `
      <div class="combat-strip ${isLethal ? 'is-lethal' : ''} ${isFatalCounter ? 'is-fatal-counter' : ''}" role="status">
        <span class="combat-strip-unit">
          <span class="combat-strip-name">${esc(shortActionLabel({ id: '', label: atkDef.name, description: '', icon: '', enabled: true, unitType: attacker.type }))}</span>
          <span class="combat-strip-hp ${atkAfter < attacker.hp ? 'damaged' : ''}">${attacker.hp}&rarr;${atkAfter}</span>
        </span>
        <span class="combat-strip-vs" aria-hidden="true">${renderIcon('swords', 'icon icon-sm')}</span>
        <span class="combat-strip-unit">
          <span class="faction-dot" style="background: ${defHeraldry};"></span>
          <span class="combat-strip-name">${esc(shortActionLabel({ id: '', label: defDef.name, description: '', icon: '', enabled: true, unitType: defender.type }))}</span>
          <span class="combat-strip-hp ${isLethal ? 'slain' : ''}">${defender.hp}&rarr;${defAfter}</span>
        </span>
        ${tagHtml}
        ${bonusHtml}
      </div>
    `;
  }

  private renderSelectionDrawer(vm: ActionBarViewModel): string {
    const showUnit = vm.selectionLayer === 'unit' && vm.selectedUnit !== null;
    const showCity = !showUnit && vm.selectedCity !== null;
    const showTile = !showUnit && !showCity && vm.selectedTile !== null;

    let headerLeftHtml = '';
    let progressBarHtml = '';
    let actionsHtml = '';

    if (showUnit && vm.selectedUnit) {
      const { unit, owner, isOwnedByHuman } = vm.selectedUnit;
      const def = UNIT_DEFINITIONS[unit.type];
      const heraldry = FACTION_HERALDRY[owner.faction];
      const atk = vm.selectedUnit.effectiveAttack ?? def.attack;
      const defense = vm.selectedUnit.effectiveDefense ?? def.defense;
      const hpPct = Math.max(0, Math.min(100, (unit.hp / unit.maxHp) * 100));

      const statsParts = [
        `HP ${unit.hp}/${unit.maxHp}`,
        `ATK ${atk}`,
        `DEF ${defense}`,
      ];
      if (def.range > 1) {
        statsParts.push(`RNG ${def.range}`);
      }

      headerLeftHtml = `
        <span class="faction-dot" style="background: ${heraldry};"></span>
        <span class="drawer-title">${esc(def.name)}${unit.isVeteran ? ` ${renderIcon('crown', 'icon icon-sm icon-star')}` : ''}</span>
        <span class="drawer-stats">${esc(statsParts.join(' · '))}</span>
      `;
      progressBarHtml = `
        <div class="drawer-hairline-progress">
          <div class="progress-bar-fill hp ${hpTier(unit.hp, unit.maxHp)}" style="width: ${hpPct}%;"></div>
        </div>
      `;

      if (isOwnedByHuman && vm.selectedUnit.actions.length > 0) {
        // Ensure hero actions (capture-city, explore-ruins) are always featured first
        const isHeroAction = (id: string) => id === 'capture-city' || id === 'explore-ruins';
        const sorted = [...vm.selectedUnit.actions].sort((a, b) => {
          if (isHeroAction(a.id) && !isHeroAction(b.id)) return -1;
          if (!isHeroAction(a.id) && isHeroAction(b.id)) return 1;
          return 0;
        });
        actionsHtml = `
          <div class="action-tile-row" role="list">
            ${sorted.map((opt) => this.renderActionTile(opt, 'unit', vm.isHumanTurn, owner.faction)).join('')}
          </div>
        `;
      }
    } else if (showCity && vm.selectedCity) {
      const { city, owner, isOwnedByHuman, popNeeded, income, unitCount, unitCap } = vm.selectedCity;
      const heraldry = FACTION_HERALDRY[owner.faction];
      const popPct = Math.max(0, Math.min(100, (city.population / Math.max(1, popNeeded)) * 100));

      headerLeftHtml = `
        <span class="faction-dot" style="background: ${heraldry};"></span>
        <span class="drawer-title">${esc(city.name)}</span>
        <span class="drawer-stats">Lv ${city.level} &middot; Pop ${city.population}/${popNeeded} &middot; +${income}★ &middot; ${unitCount}/${unitCap}</span>
      `;
      progressBarHtml = `
        <div class="drawer-hairline-progress">
          <div class="progress-bar-fill pop" style="width: ${popPct}%;"></div>
        </div>
      `;

      if (isOwnedByHuman && vm.selectedCity.trainOptions.length > 0) {
        actionsHtml = `
          <div class="action-tile-row" role="list">
            ${vm.selectedCity.trainOptions
              .map((opt) => this.renderActionTile(opt, 'city', vm.isHumanTurn, owner.faction))
              .join('')}
          </div>
        `;
      }
    } else if (showTile && vm.selectedTile) {
      const { tile, terrainName, defenseBonus } = vm.selectedTile;
      const statParts: string[] = [];
      if (defenseBonus > 1) {
        const defLabel = `${defenseBonus.toFixed(2).replace(/\.00$/, '.0').replace(/\.50$/, '.5')}x`;
        statParts.push(`DEF ${defLabel}`);
      }
      if (tile.resource) {
        statParts.push(RESOURCE_LABELS[tile.resource] ?? tile.resource);
      } else if (tile.improvement) {
        statParts.push(IMPROVEMENT_DEFINITIONS[tile.improvement]?.name ?? tile.improvement);
      } else if (tile.hasVillage) {
        statParts.push('Village');
      } else if (tile.hasRoad) {
        statParts.push('Road');
      }

      headerLeftHtml = `
        <span class="drawer-title">${esc(terrainName)}</span>
        ${statParts.length > 0 ? `<span class="drawer-stats">${esc(statParts.join(' · '))}</span>` : ''}
      `;

      if (vm.selectedTile.actions.length > 0) {
        actionsHtml = `
          <div class="action-tile-row" role="list">
            ${vm.selectedTile.actions
              .map((opt) => this.renderActionTile(opt, 'tile', vm.isHumanTurn, vm.playerFaction))
              .join('')}
          </div>
        `;
      }
    }

    const closeBtnHtml = this.callbacks.onDeselect
      ? `<button type="button" class="drawer-close-btn" data-action-close="true" title="Close (Esc)" aria-label="Close selection">${renderIcon('close', 'icon icon-sm')}</button>`
      : '';

    return `
      <div class="selection-drawer ${actionsHtml ? 'has-actions' : 'header-only'}">
        <div class="drawer-header">
          <div class="drawer-header-info">
            ${headerLeftHtml}
          </div>
          <div class="drawer-header-controls">
            ${closeBtnHtml}
          </div>
        </div>
        ${progressBarHtml}
        ${actionsHtml}
      </div>
    `;
  }

  private renderActionTile(
    opt: ActionOption,
    scope: 'unit' | 'city' | 'tile',
    isHumanTurn: boolean,
    faction: FactionId,
  ): string {
    const isEnabled = isHumanTurn && opt.enabled && Boolean(opt.action);
    const isTechLocked = Boolean(!opt.enabled && opt.requiredTechId && isHumanTurn);
    const isClickable = isEnabled || isTechLocked;
    const isHeroAction = opt.id === 'capture-city' || opt.id === 'explore-ruins';
    const isExploreRuins = opt.id === 'explore-ruins';
    const isUnique = Boolean(opt.unitType && UNIT_DEFINITIONS[opt.unitType]?.faction !== null);
    const label = shortActionLabel(opt);
    const lockText = isTechLocked ? null : shortDisabledReason(opt, isHumanTurn);

    let visualHtml: string;
    if (opt.unitType) {
      visualHtml = renderUnitThumbOrIcon(
        opt.unitType,
        faction,
        renderUnitIcon(opt.unitType, 'icon icon-lg'),
        'thumb-3d thumb-tile-action',
      );
    } else if (ACTION_3D_THUMB_KEYS[opt.id]) {
      const thumb = render3DThumbImg(
        ACTION_3D_THUMB_KEYS[opt.id],
        faction,
        'thumb-3d thumb-tile-action',
        label,
      );
      visualHtml = thumb || renderActionIcon(opt.icon, 'icon icon-lg', opt.id);
    } else {
      visualHtml = renderActionIcon(opt.icon, 'icon icon-lg', opt.id);
    }

    let badgeHtml = '';
    if (!isTechLocked && opt.cost !== undefined && opt.cost > 0) {
      badgeHtml = `<span class="tile-cost-pill">${opt.cost}${renderIcon('star', 'icon icon-xs icon-star')}</span>`;
    } else if (!isTechLocked && opt.id === 'chop_forest') {
      badgeHtml = `<span class="tile-cost-pill gain">+2${renderIcon('star', 'icon icon-xs icon-star')}</span>`;
    }

    const requiredTechName = opt.requiredTechId
      ? TECH_DEFINITIONS[opt.requiredTechId]?.name ?? opt.requiredTechId
      : null;

    const titleText = isTechLocked && requiredTechName
      ? `${opt.label} — Tap to unlock ${requiredTechName}`
      : lockText
        ? `${opt.label} (${opt.disabledReason ?? lockText})`
        : `${opt.label}: ${opt.description}`;

    const classes = [
      'action-tile',
      isHeroAction ? 'is-capture' : '',
      isExploreRuins ? 'is-ruins' : '',
      isUnique ? 'is-unique' : '',
      isTechLocked ? 'is-tech-locked' : isEnabled ? '' : 'is-disabled',
    ]
      .filter(Boolean)
      .join(' ');

    const unlockSubHtml = isTechLocked
      ? `<span class="action-tile-lock is-unlock">${renderIcon('codex', 'icon icon-xs')}<span>Unlock</span></span>`
      : lockText
        ? `<span class="action-tile-lock">${esc(lockText)}</span>`
        : '';

    return `
      <button
        type="button"
        class="${classes}"
        data-action-scope="${scope}"
        data-action-id="${esc(opt.id)}"
        ${isTechLocked && opt.requiredTechId ? `data-unlock-tech="${esc(opt.requiredTechId)}"` : ''}
        title="${esc(titleText)}"
        ${isClickable ? '' : 'disabled'}
      >
        ${badgeHtml}
        <span class="action-tile-visual" aria-hidden="true">${visualHtml}</span>
        <span class="action-tile-label">${esc(label)}</span>
        ${unlockSubHtml}
      </button>
    `;
  }

  private bindEvents(vm: ActionBarViewModel): void {
    this.root
      .querySelector<HTMLButtonElement>('[data-idle-action="tech"]')
      ?.addEventListener('click', () => {
        this.callbacks.onOpenTech?.();
      });

    this.root
      .querySelector<HTMLButtonElement>('[data-idle-action="superpower"]')
      ?.addEventListener('click', () => {
        if (vm.isHumanTurn) {
          this.callbacks.onActivateSuperpower?.();
        }
      });

    this.root
      .querySelector<HTMLButtonElement>('[data-idle-action="next-ready"]')
      ?.addEventListener('click', () => {
        this.callbacks.onNextReadyUnit?.();
      });

    this.root
      .querySelector<HTMLButtonElement>('[data-idle-action="end-turn"]')
      ?.addEventListener('click', () => {
        if (vm.isHumanTurn) {
          this.callbacks.onEndTurn?.();
        }
      });

    this.root
      .querySelector<HTMLButtonElement>('[data-action-close]')
      ?.addEventListener('click', () => {
        this.callbacks.onDeselect?.();
      });

    if (!vm.isHumanTurn) return;

    const unitMap = new Map((vm.selectedUnit?.actions ?? []).map((a) => [a.id, a]));
    const cityMap = new Map((vm.selectedCity?.trainOptions ?? []).map((a) => [a.id, a]));
    const tileMap = new Map((vm.selectedTile?.actions ?? []).map((a) => [a.id, a]));

    this.root.querySelectorAll<HTMLButtonElement>('[data-action-scope]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        const unlockTechId = btn.dataset.unlockTech as TechId | undefined;
        if (unlockTechId) {
          this.callbacks.onUnlockTech?.(unlockTechId);
          return;
        }
        const scope = btn.dataset.actionScope;
        const id = btn.dataset.actionId;
        if (!scope || !id) return;

        let opt: ActionOption | undefined;
        if (scope === 'unit') opt = unitMap.get(id);
        else if (scope === 'city') opt = cityMap.get(id);
        else if (scope === 'tile') opt = tileMap.get(id);

        if (opt && opt.enabled && opt.action) {
          this.callbacks.onAction(opt.action);
        }
      });
    });
  }
}
