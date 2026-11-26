import * as THREE from 'three';
import { FACTION_DEFINITIONS } from '../game/data/factions';
import { hasUnitRemainingActions } from '../game/rules';
import {
  getTile,
  tileIndex,
  type Coord,
  type FactionId,
  type GameState,
  type PlayerId,
} from '../game/types';
import { getUnitWorldPosition, TILE_TOP_Y, tileToWorld } from './assets/terrainMesh';
import { getCityBadgeAnchorY } from './assets/cityMesh';
import { getUnitHeight } from './assets/unitSprite';

export type FloatingPopupKind = 'damage' | 'heal' | 'gold' | 'pop' | 'level' | 'info';

const MAX_FRAME_DT = 0.033;

interface ActivePopup {
  el: HTMLDivElement;
  worldPos: THREE.Vector3;
  age: number;
  duration: number;
}

interface UnitBadgeEntry {
  el: HTMLDivElement;
  coordKey: string;
  worldPos: THREE.Vector3;
  baseHtml: string;
  baseClass: string;
  borderColor: string;
  renderFingerprint: string;
  lastDisplay: string;
  lastTransform: string;
}

interface CityBadgeEntry {
  el: HTMLDivElement;
  coordKey: string;
  selectedWorldPos: THREE.Vector3;
  unselectedWorldPos: THREE.Vector3;
  fullHtml: string;
  pipHtml: string;
  color: string;
  hasReward: boolean;
  isSelected: boolean;
  renderFingerprint: string;
  lastDisplay: string;
  lastTransform: string;
}

interface CaptureAffordanceEntry {
  el: HTMLButtonElement;
  unitId: string;
  worldPos: THREE.Vector3;
  renderFingerprint: string;
  lastDisplay: string;
  lastTransform: string;
}

function coordKey(x: number, y: number): string {
  return `${x},${y}`;
}

function getDisplayFactionColor(faction: FactionId): string {
  return faction === 'orcs' ? '#ef4444' : FACTION_DEFINITIONS[faction].palette.primary;
}

const CROWN_SVG = `<svg class="capture-affordance-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 18h18v2H3v-2zm0-2L5 7l4.5 4L12 5l2.5 6L19 7l2 9H3z"/></svg>`;
const PROMOTE_CHEVRON_SVG = `<svg class="capture-affordance-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.8l2 4.1 4.5.6-3.3 3.1.8 4.5L12 12l-4 2.1.8-4.5-3.3-3.1 4.5-.6L12 1.8z"/><path d="M4 15.2l8 4.3 8-4.3v3l-8 4.3-8-4.3v-3z"/></svg>`;
const RUINS_STAR_SVG = `<svg class="capture-affordance-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.6 6.4L21 11l-6.4 2.6L12 20l-2.6-6.4L3 11l6.4-2.6L12 2z"/></svg>`;

let stylesInjected = false;
function ensureWorldBadgeStyles(): void {
  if (stylesInjected || typeof document === 'undefined') return;
  stylesInjected = true;
  if (document.querySelector('style[data-world-badges-style]')) return;

  const style = document.createElement('style');
  style.setAttribute('data-world-badges-style', 'true');
  style.textContent = `
    .unit-badge,
    .city-badge,
    .city-pip-wrap,
    .floating-popup {
      will-change: transform;
      backface-visibility: hidden;
    }
    @keyframes wb-lethal-pulse {
      0%, 100% {
        box-shadow: 0 0 0 1.5px rgba(250, 204, 21, 0.85), 0 0 10px rgba(239, 68, 68, 0.78);
        transform: scale(1);
      }
      50% {
        box-shadow: 0 0 0 2.5px rgba(250, 204, 21, 1), 0 0 16px rgba(239, 68, 68, 0.95);
        transform: scale(1.06);
      }
    }
    @keyframes wb-capture-pulse {
      0%, 100% {
        box-shadow: 0 0 0 2px rgba(250, 204, 21, 0.88), 0 4px 14px rgba(0, 0, 0, 0.55);
        filter: brightness(1);
      }
      50% {
        box-shadow: 0 0 0 5px rgba(250, 204, 21, 0.35), 0 6px 20px rgba(250, 204, 21, 0.55);
        filter: brightness(1.08);
      }
    }
    .unit-badge.ready-unit {
      border: 2px solid #ffffff !important;
      background: rgba(15, 23, 42, 0.9) !important;
      color: #ffffff !important;
      opacity: 1 !important;
      filter: none !important;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.52);
    }
    .unit-badge.enemy-unit {
      background: rgba(15, 23, 42, 0.88) !important;
      color: #ffffff !important;
      opacity: 1 !important;
      filter: none !important;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    }
    .unit-badge.exhausted {
      border: 1.5px solid rgba(148, 163, 184, 0.35) !important;
      background: rgba(30, 41, 59, 0.8) !important;
      color: #cbd5e1 !important;
      opacity: 0.58 !important;
      filter: saturate(0.45);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.32);
    }
    @keyframes wb-upgrade-pulse {
      0%, 100% {
        box-shadow: 0 0 0 2px rgba(250, 204, 21, 0.85), 0 0 12px rgba(250, 204, 21, 0.55), 0 2px 8px rgba(15, 10, 6, 0.6);
      }
      50% {
        box-shadow: 0 0 0 3.5px rgba(254, 240, 138, 1), 0 0 18px rgba(250, 204, 21, 0.92), 0 3px 10px rgba(15, 10, 6, 0.65);
      }
    }
    .city-pip-wrap,
    .city-pip-badge {
      position: absolute;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      width: auto;
      min-width: 22px;
      height: auto;
      min-height: 22px;
      padding: 2px 6px 2px 2px;
      border-radius: 999px;
      background: rgba(15, 23, 42, 0.88);
      font-size: 11px;
      font-weight: 800;
      color: #fffdf7;
      border: 1.5px solid rgba(255, 250, 235, 0.9);
      box-shadow: 0 2px 8px rgba(10, 14, 24, 0.58);
      pointer-events: none;
      line-height: 1;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .city-pip-lvl {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      color: #ffffff;
      font-size: 11px;
      font-weight: 800;
      line-height: 1;
      flex-shrink: 0;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.65);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }
    .city-pip-progress,
    .city-pip-bar {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      padding: 2px 1px;
    }
    .city-pip-seg {
      display: inline-block;
      width: 7px;
      height: 6px;
      border-radius: 1.5px;
      flex-shrink: 0;
    }
    .city-pip-seg.filled {
      background: linear-gradient(180deg, #7dd3fc 0%, #38bdf8 100%);
      border: 1px solid rgba(224, 242, 254, 0.92);
      box-shadow: 0 0 4px rgba(56, 189, 248, 0.78);
    }
    .city-pip-seg.empty {
      background: rgba(15, 23, 42, 0.74);
      border: 1px solid rgba(203, 213, 225, 0.54);
    }
    .city-pip-badge.reward-ready,
    .city-pip-wrap.ready-upgrade {
      border-color: #facc15;
      animation: wb-upgrade-pulse 1.25s ease-in-out infinite;
    }
    .city-pip-wrap.ready-upgrade .city-pip-seg.filled {
      background: linear-gradient(180deg, #fef08a 0%, #facc15 100%);
      border-color: #fef9c3;
      box-shadow: 0 0 5px rgba(250, 204, 21, 0.9);
    }
    .unit-badge.lethal-target {
      border-color: #ef4444 !important;
      box-shadow: 0 0 0 1.5px rgba(250, 204, 21, 0.85), 0 0 12px rgba(220, 38, 38, 0.75);
    }
    .unit-badge .unit-lethal-tag {
      display: inline-flex;
      align-items: center;
      padding: 1px 5px;
      margin-left: 2px;
      border-radius: 4px;
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      color: #fef08a;
      border: 1px solid #facc15;
      font-size: 9px;
      font-weight: 900;
      letter-spacing: 0.06em;
      line-height: 1.15;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.65);
      animation: wb-lethal-pulse 0.9s ease-in-out infinite;
    }
    .capture-affordance-btn {
      position: absolute;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      min-height: 36px;
      padding: 6px 13px;
      border-radius: 999px;
      border: 2px solid #fef9c3;
      background: linear-gradient(180deg, #fde047 0%, #eab308 100%);
      color: #1c1404;
      font-family: var(--font-ui, system-ui, sans-serif);
      font-size: 12.5px;
      font-weight: 900;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      line-height: 1;
      white-space: nowrap;
      pointer-events: auto;
      cursor: pointer;
      touch-action: manipulation;
      z-index: 15;
      will-change: transform;
      animation: wb-capture-pulse 1.35s ease-in-out infinite;
      transition: transform 90ms ease, filter 90ms ease;
    }
    .capture-affordance-btn:hover {
      filter: brightness(1.08);
    }
    .capture-affordance-btn:active {
      filter: brightness(0.95);
    }
    .capture-affordance-btn.ruins-affordance-btn {
      background: linear-gradient(180deg, #fef08a 0%, #f59e0b 100%);
      border-color: #fffbeb;
      color: #1c1203;
    }
    .capture-affordance-btn.promote-affordance-btn {
      background: linear-gradient(180deg, #fff7c2 0%, #fbbf24 45%, #d97706 100%);
      border-color: #fffbeb;
      color: #3b1d02;
      min-height: 38px;
      padding: 6px 14px 6px 10px;
      box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.35), 0 0 18px rgba(253, 224, 71, 0.75);
      animation: wb-promote-pulse 1.1s ease-in-out infinite;
    }
    .promote-affordance-btn .capture-affordance-icon {
      width: 17px;
      height: 17px;
      filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.9));
    }
    @keyframes wb-promote-pulse {
      0%, 100% { box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.35), 0 0 14px rgba(253, 224, 71, 0.6); filter: brightness(1); }
      50% { box-shadow: 0 0 0 6px rgba(251, 191, 36, 0.18), 0 0 26px rgba(253, 224, 71, 0.95); filter: brightness(1.12); }
    }
    .city-pip-crown {
      display: inline-grid;
      place-items: center;
      width: 18px;
      height: 18px;
      margin-right: 2px;
      border-radius: 50%;
      background: linear-gradient(180deg, #fde68a 0%, #f59e0b 100%);
      border: 1.5px solid #fffbeb;
      color: #422006;
      font-size: 11px;
      line-height: 1;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
    }
    .capture-affordance-icon {
      width: 15px;
      height: 15px;
      flex-shrink: 0;
    }
  `;
  document.head.appendChild(style);
}

export class WorldBadges {
  private readonly root: HTMLElement;
  private readonly unitLayer: HTMLDivElement;
  private readonly cityLayer: HTMLDivElement;
  private readonly captureLayer: HTMLDivElement;
  private readonly popupLayer: HTMLDivElement;

  private readonly unitBadges = new Map<string, UnitBadgeEntry>();
  private readonly cityBadges = new Map<string, CityBadgeEntry>();
  private readonly captureAffordances = new Map<string, CaptureAffordanceEntry>();
  private readonly unitWorldPosOverrides = new Map<string, THREE.Vector3>();
  private readonly hiddenUnitIds = new Set<string>();
  private readonly popups: ActivePopup[] = [];
  private readonly tempVec = new THREE.Vector3();
  private mapSize = 11;

  private selectedCoord: Coord | null = null;
  private lethalCoords = new Set<string>();
  private onCaptureClick: ((unitId: string) => void) | null = null;
  private onExploreRuinsClick: ((unitId: string) => void) | null = null;
  private onPromoteClick: ((unitId: string) => void) | null = null;

  constructor(container: HTMLElement) {
    ensureWorldBadgeStyles();
    this.root = container;
    this.root.innerHTML = '';
    this.root.style.pointerEvents = 'none';

    this.cityLayer = document.createElement('div');
    this.cityLayer.className = 'world-badges-layer';
    this.unitLayer = document.createElement('div');
    this.unitLayer.className = 'world-badges-layer';
    this.captureLayer = document.createElement('div');
    this.captureLayer.className = 'world-badges-layer';
    this.popupLayer = document.createElement('div');
    this.popupLayer.className = 'world-badges-layer';

    this.root.append(this.cityLayer, this.unitLayer, this.captureLayer, this.popupLayer);
  }

  public setOnCaptureClick(cb: ((unitId: string) => void) | null): void {
    this.onCaptureClick = cb;
  }

  public setOnExploreRuinsClick(cb: ((unitId: string) => void) | null): void {
    this.onExploreRuinsClick = cb;
  }

  public setOnPromoteClick(cb: ((unitId: string) => void) | null): void {
    this.onPromoteClick = cb;
  }

  public setUnitOverrideWorldPos(unitId: string, worldPos: THREE.Vector3): void {
    let vec = this.unitWorldPosOverrides.get(unitId);
    if (!vec) {
      vec = new THREE.Vector3();
      this.unitWorldPosOverrides.set(unitId, vec);
    }
    vec.set(worldPos.x, worldPos.y + 0.08, worldPos.z);
  }

  public clearUnitOverrideWorldPos(unitId: string): void {
    this.unitWorldPosOverrides.delete(unitId);
  }

  public hideUnitBadge(unitId: string): void {
    this.hiddenUnitIds.add(unitId);
    const entry = this.unitBadges.get(unitId);
    if (entry) {
      entry.el.style.display = 'none';
      entry.lastDisplay = 'none';
    }
    this.unitWorldPosOverrides.delete(unitId);
  }

  public setSelectedCoord(coord: Coord | null): void {
    this.selectedCoord = coord ? { x: coord.x, y: coord.y } : null;
    this.refreshCityBadgeModes();
  }

  public setLethalTargets(coords: Coord[]): void {
    this.lethalCoords.clear();
    for (const c of coords) {
      this.lethalCoords.add(coordKey(c.x, c.y));
    }
    this.refreshUnitLethalStates();
  }

  private applyCityBadgeMode(entry: CityBadgeEntry, selected: boolean): void {
    const nextFingerprint = `${selected ? 1 : 0}|${entry.hasReward ? 1 : 0}|${entry.color}|${selected ? entry.fullHtml : entry.pipHtml}`;
    entry.isSelected = selected;
    if (entry.renderFingerprint === nextFingerprint) return;
    entry.renderFingerprint = nextFingerprint;

    const rewardClasses = entry.hasReward ? ' reward-ready ready-upgrade' : '';
    if (selected) {
      entry.el.className = `city-badge${rewardClasses}`;
      entry.el.style.background = '';
      entry.el.style.borderColor = entry.hasReward ? '#facc15' : entry.color;
      entry.el.innerHTML = entry.fullHtml;
    } else {
      entry.el.className = `city-pip-wrap city-pip-badge${rewardClasses}`;
      entry.el.style.background = '';
      entry.el.style.borderColor = entry.hasReward ? '#facc15' : entry.color;
      entry.el.innerHTML = entry.pipHtml;
    }
    // Reset cached display/transform when switching between selected & compact modes
    entry.lastDisplay = '';
    entry.lastTransform = '';
  }

  private refreshCityBadgeModes(): void {
    const selKey = this.selectedCoord ? coordKey(this.selectedCoord.x, this.selectedCoord.y) : null;
    for (const entry of this.cityBadges.values()) {
      const shouldBeSelected = selKey !== null && entry.coordKey === selKey;
      if (entry.isSelected !== shouldBeSelected) {
        this.applyCityBadgeMode(entry, shouldBeSelected);
      }
    }
  }

  private applyUnitLethalState(entry: UnitBadgeEntry, isLethal: boolean): void {
    const nextFingerprint = `${isLethal ? 1 : 0}|${entry.baseClass}|${entry.borderColor}|${entry.baseHtml}`;
    if (entry.renderFingerprint === nextFingerprint) return;
    entry.renderFingerprint = nextFingerprint;

    if (isLethal) {
      entry.el.className = `${entry.baseClass} lethal-target`;
      entry.el.style.borderColor = '#ef4444';
      entry.el.innerHTML = `${entry.baseHtml}<span class="unit-lethal-tag">LETHAL</span>`;
    } else {
      entry.el.className = entry.baseClass;
      entry.el.style.borderColor = entry.borderColor;
      entry.el.innerHTML = entry.baseHtml;
    }
  }

  private refreshUnitLethalStates(): void {
    for (const entry of this.unitBadges.values()) {
      this.applyUnitLethalState(entry, this.lethalCoords.has(entry.coordKey));
    }
  }

  public syncState(
    state: GameState,
    viewerPlayerId: PlayerId,
    selectedCoord?: Coord | null,
  ): void {
    if (selectedCoord !== undefined) {
      this.selectedCoord = selectedCoord ? { x: selectedCoord.x, y: selectedCoord.y } : null;
    }

    this.mapSize = state.mapSize;
    const viewer =
      state.players.find((p) => p.id === viewerPlayerId) ??
      state.players.find((p) => p.isHuman) ??
      state.players[0];
    const resolvedViewerId = viewer?.id ?? viewerPlayerId;
    const isViewerTurn =
      state.phase === 'playing' && state.players[state.activePlayerIndex]?.id === resolvedViewerId;
    const revealed = viewer?.revealedTiles ?? [];

    const playerFaction = new Map<PlayerId, FactionId>();
    for (const p of state.players) {
      playerFaction.set(p.id, p.faction);
    }

    // 1. Incremental Unit Badges & Floating Capture/Explore Affordance Pills
    this.unitWorldPosOverrides.clear();
    this.hiddenUnitIds.clear();
    const activeUnitIds = new Set<string>();
    const activeAffordanceKeys = new Set<string>();

    for (const unit of Object.values(state.units)) {
      if (!revealed[tileIndex(unit.x, unit.y, state.mapSize)]) continue;
      activeUnitIds.add(unit.id);

      const faction = playerFaction.get(unit.ownerId) ?? 'humans';
      const color = getDisplayFactionColor(faction);
      const cKey = coordKey(unit.x, unit.y);
      const isHumanOwner = unit.ownerId === resolvedViewerId;
      const isReadyHuman =
        isHumanOwner && !unit.actedThisTurn && hasUnitRemainingActions(state, unit.id);
      const isExhaustedHuman = isHumanOwner && !isReadyHuman;

      const stateClass = isReadyHuman
        ? ' ready-unit'
        : isExhaustedHuman
          ? ' exhausted'
          : ' enemy-unit';
      const baseClass = `unit-badge${stateClass}${unit.isVeteran ? ' veteran' : ''}`;
      const baseHtml = `<span class="unit-dot" style="background:${color}"></span><span class="unit-hp">${unit.hp}</span>${unit.isVeteran ? '<span class="unit-vet">★</span>' : ''}`;
      const borderColor = isReadyHuman
        ? '#ffffff'
        : isExhaustedHuman
          ? 'rgba(148, 163, 184, 0.35)'
          : color;

      const unitWorldPos = getUnitWorldPosition(state, unit.x, unit.y);
      const badgeWorldPos = unitWorldPos.clone();
      badgeWorldPos.y += 0.08;

      let entry = this.unitBadges.get(unit.id);
      if (entry) {
        entry.coordKey = cKey;
        entry.worldPos.copy(badgeWorldPos);
        entry.baseHtml = baseHtml;
        entry.baseClass = baseClass;
        entry.borderColor = borderColor;
      } else {
        const el = document.createElement('div');
        this.unitLayer.appendChild(el);
        entry = {
          el,
          coordKey: cKey,
          worldPos: badgeWorldPos,
          baseHtml,
          baseClass,
          borderColor,
          renderFingerprint: '',
          lastDisplay: '',
          lastTransform: '',
        };
        this.unitBadges.set(unit.id, entry);
      }
      this.applyUnitLethalState(entry, this.lethalCoords.has(cKey));

      // Tappable floating golden Capture/Claim pill when a human unit can capture this turn
      if (isViewerTurn && isReadyHuman && Boolean(unit.canCapture)) {
        const capKey = `${unit.id}:capture`;
        activeAffordanceKeys.add(capKey);
        const tile = getTile(state, unit.x, unit.y);
        const isVillage = Boolean(tile?.hasVillage && !tile?.isCityCenter);
        const label = isVillage ? 'Claim' : 'Capture';
        const fp = `capture|${label}`;

        const capWorldPos = unitWorldPos.clone();
        capWorldPos.y += getUnitHeight(unit.type, faction) + 0.28;

        const existingCap = this.captureAffordances.get(capKey);
        if (existingCap) {
          existingCap.worldPos.copy(capWorldPos);
          if (existingCap.renderFingerprint !== fp) {
            existingCap.renderFingerprint = fp;
            existingCap.el.innerHTML = `${CROWN_SVG}<span>${label}</span>`;
          }
        } else {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'capture-affordance-btn';
          btn.dataset.unitId = unit.id;
          btn.innerHTML = `${CROWN_SVG}<span>${label}</span>`;

          const stopOnly = (ev: Event) => {
            ev.stopPropagation();
          };
          btn.addEventListener('pointerdown', stopOnly);
          btn.addEventListener('pointerup', stopOnly);
          btn.addEventListener('click', (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            this.onCaptureClick?.(unit.id);
          });

          this.captureLayer.appendChild(btn);
          this.captureAffordances.set(capKey, {
            el: btn,
            unitId: unit.id,
            worldPos: capWorldPos,
            renderFingerprint: fp,
            lastDisplay: '',
            lastTransform: '',
          });
        }
      }

      // Tappable floating golden Explore Ruins pill when a human unit can explore ruins this turn
      if (isViewerTurn && isReadyHuman && Boolean(unit.canExploreRuins)) {
        const ruinsKey = `${unit.id}:ruins`;
        activeAffordanceKeys.add(ruinsKey);
        const fp = 'ruins|Explore';

        const ruinsWorldPos = unitWorldPos.clone();
        ruinsWorldPos.y += getUnitHeight(unit.type, faction) + 0.28 + (unit.canCapture ? 0.62 : 0);

        const existingRuins = this.captureAffordances.get(ruinsKey);
        if (existingRuins) {
          existingRuins.worldPos.copy(ruinsWorldPos);
        } else {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'capture-affordance-btn ruins-affordance-btn';
          btn.dataset.unitId = unit.id;
          btn.innerHTML = `${RUINS_STAR_SVG}<span>Explore</span>`;

          const stopOnly = (ev: Event) => {
            ev.stopPropagation();
          };
          btn.addEventListener('pointerdown', stopOnly);
          btn.addEventListener('pointerup', stopOnly);
          btn.addEventListener('click', (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            this.onExploreRuinsClick?.(unit.id);
          });

          this.captureLayer.appendChild(btn);
          this.captureAffordances.set(ruinsKey, {
            el: btn,
            unitId: unit.id,
            worldPos: ruinsWorldPos,
            renderFingerprint: fp,
            lastDisplay: '',
            lastTransform: '',
          });
        }
      }

      // Tappable glowing "Promote" pill when a human unit has earned Veteran status (3 kills).
      // Promotion doesn't use up the unit's turn, so it shows even after the unit has acted.
      if (isViewerTurn && isHumanOwner && !unit.isVeteran && (unit.canPromote || unit.kills >= 3)) {
        const promoteKey = `${unit.id}:promote`;
        activeAffordanceKeys.add(promoteKey);
        const stackedPills =
          (isReadyHuman && unit.canCapture ? 1 : 0) + (isReadyHuman && unit.canExploreRuins ? 1 : 0);
        const promoteWorldPos = unitWorldPos.clone();
        promoteWorldPos.y += getUnitHeight(unit.type, faction) + 0.28 + stackedPills * 0.62;

        const existingPromote = this.captureAffordances.get(promoteKey);
        if (existingPromote) {
          existingPromote.worldPos.copy(promoteWorldPos);
        } else {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'capture-affordance-btn promote-affordance-btn';
          btn.dataset.unitId = unit.id;
          btn.setAttribute('aria-label', 'Promote to Veteran');
          btn.innerHTML = `${PROMOTE_CHEVRON_SVG}<span>Promote!</span>`;

          const stopOnly = (ev: Event) => {
            ev.stopPropagation();
          };
          btn.addEventListener('pointerdown', stopOnly);
          btn.addEventListener('pointerup', stopOnly);
          btn.addEventListener('click', (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            this.onPromoteClick?.(unit.id);
          });

          this.captureLayer.appendChild(btn);
          this.captureAffordances.set(promoteKey, {
            el: btn,
            unitId: unit.id,
            worldPos: promoteWorldPos,
            renderFingerprint: 'promote',
            lastDisplay: '',
            lastTransform: '',
          });
        }
      }
    }

    // Remove dead/hidden unit badges & stale affordance pills
    for (const [unitId, entry] of this.unitBadges) {
      if (!activeUnitIds.has(unitId)) {
        entry.el.remove();
        this.unitBadges.delete(unitId);
        this.unitWorldPosOverrides.delete(unitId);
      }
    }
    for (const [key, entry] of this.captureAffordances) {
      if (!activeAffordanceKeys.has(key)) {
        entry.el.remove();
        this.captureAffordances.delete(key);
      }
    }

    // 2. Incremental City Badges (skip innerHTML rebuilds unless city data or selection changed)
    const activeCityIds = new Set<string>();
    const selKey = this.selectedCoord ? coordKey(this.selectedCoord.x, this.selectedCoord.y) : null;

    for (const city of Object.values(state.cities)) {
      if (!revealed[tileIndex(city.x, city.y, state.mapSize)]) continue;
      activeCityIds.add(city.id);

      const faction = playerFaction.get(city.ownerId) ?? city.styleFaction;
      const color = getDisplayFactionColor(faction);
      const popToNextLevel = Math.max(1, city.level + 1);
      const filled = Math.max(0, Math.min(city.population, popToNextLevel));
      const hasReward = city.pendingLevelRewards.length > 0;

      const pipsHtml = Array.from({ length: popToNextLevel }, (_, i) =>
        `<span class="pop-pip${i < filled ? ' filled' : ''}"></span>`,
      ).join('');

      const compactPipsHtml = Array.from({ length: popToNextLevel }, (_, i) =>
        `<span class="city-pip-seg ${i < filled ? 'filled' : 'empty'}"></span>`,
      ).join('');

      const income =
        city.level +
        (city.isCapital ? 1 : 0) +
        (city.hasWorkshop ? 1 : 0) +
        (city.connectedToCapital && !city.isCapital && faction === 'humans' ? 1 : 0);

      const fullHtml = `
        <div class="city-badge-row">
          <span class="city-lvl" style="background:${color}">${city.level}</span>
          <span class="city-name">${city.isCapital ? '♛ ' : ''}${city.name}</span>
          <span class="city-income">+${income}★</span>
        </div>
        <div class="city-pips">${pipsHtml}</div>
      `;
      const pipHtml = `${city.isCapital ? '<span class="city-pip-crown" aria-label="Capital">♛</span>' : ''}<span class="city-pip-lvl" style="background:${color}">${city.level}</span><div class="city-pip-progress city-pip-bar" aria-label="Level ${city.level}: ${filled} of ${popToNextLevel} population">${compactPipsHtml}</div>`;

      const cKey = coordKey(city.x, city.y);
      // Anchor badges just above the illustrated city's silhouette (taller for grander tiers).
      const selectedWorldPos = tileToWorld(
        city.x,
        city.y,
        state.mapSize,
        TILE_TOP_Y + getCityBadgeAnchorY(city, 0.28) + 0.03,
      ).add(new THREE.Vector3(-0.28, 0, -0.28));
      const unselectedWorldPos = tileToWorld(
        city.x,
        city.y,
        state.mapSize,
        TILE_TOP_Y + getCityBadgeAnchorY(city, 0.38),
      ).add(new THREE.Vector3(-0.38, 0, -0.38));

      let entry = this.cityBadges.get(city.id);
      if (entry) {
        entry.coordKey = cKey;
        entry.selectedWorldPos.copy(selectedWorldPos);
        entry.unselectedWorldPos.copy(unselectedWorldPos);
        entry.fullHtml = fullHtml;
        entry.pipHtml = pipHtml;
        entry.color = color;
        entry.hasReward = hasReward;
      } else {
        const el = document.createElement('div');
        this.cityLayer.appendChild(el);
        entry = {
          el,
          coordKey: cKey,
          selectedWorldPos,
          unselectedWorldPos,
          fullHtml,
          pipHtml,
          color,
          hasReward,
          isSelected: false,
          renderFingerprint: '',
          lastDisplay: '',
          lastTransform: '',
        };
        this.cityBadges.set(city.id, entry);
      }

      this.applyCityBadgeMode(entry, selKey !== null && cKey === selKey);
    }

    for (const [cityId, entry] of this.cityBadges) {
      if (!activeCityIds.has(cityId)) {
        entry.el.remove();
        this.cityBadges.delete(cityId);
      }
    }
  }

  public spawnFloatingText(
    coord: Coord,
    text: string,
    kind: FloatingPopupKind = 'info',
  ): void {
    const el = document.createElement('div');
    el.className = `floating-popup popup-${kind}`;
    el.textContent = text;
    this.popupLayer.appendChild(el);

    const worldPos = tileToWorld(coord.x, coord.y, this.mapSize, TILE_TOP_Y + 1.45);
    this.popups.push({
      el,
      worldPos,
      age: 0,
      duration: 0.95,
    });
  }

  public update(camera: THREE.Camera, rawDt: number): void {
    const dt = Math.min(Math.max(rawDt, 0), MAX_FRAME_DT);
    const width = this.root.clientWidth || window.innerWidth;
    const height = this.root.clientHeight || window.innerHeight;

    const project = (worldPos: THREE.Vector3, offsetY = 0) => {
      this.tempVec.copy(worldPos);
      this.tempVec.y += offsetY;
      this.tempVec.project(camera);
      const x = (this.tempVec.x * 0.5 + 0.5) * width;
      const y = (-this.tempVec.y * 0.5 + 0.5) * height;
      const visible =
        this.tempVec.z <= 1 && x >= -120 && x <= width + 120 && y >= -80 && y <= height + 80;
      return { x, y, visible };
    };

    for (const [unitId, badge] of this.unitBadges) {
      if (this.hiddenUnitIds.has(unitId)) {
        if (badge.lastDisplay !== 'none') {
          badge.el.style.display = 'none';
          badge.lastDisplay = 'none';
        }
        continue;
      }
      const worldPos = this.unitWorldPosOverrides.get(unitId) ?? badge.worldPos;
      const p = project(worldPos);
      const nextDisplay = p.visible ? 'inline-flex' : 'none';
      if (badge.lastDisplay !== nextDisplay) {
        badge.el.style.display = nextDisplay;
        badge.lastDisplay = nextDisplay;
      }
      if (p.visible) {
        const nextTransform = `translate3d(${p.x.toFixed(1)}px, ${(p.y + 16).toFixed(1)}px, 0) translate(-50%, -50%)`;
        if (badge.lastTransform !== nextTransform) {
          badge.el.style.transform = nextTransform;
          badge.lastTransform = nextTransform;
        }
      }
    }

    for (const cap of this.captureAffordances.values()) {
      const p = project(cap.worldPos);
      const nextDisplay = p.visible ? 'inline-flex' : 'none';
      if (cap.lastDisplay !== nextDisplay) {
        cap.el.style.display = nextDisplay;
        cap.lastDisplay = nextDisplay;
      }
      if (p.visible) {
        const nextTransform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) translate(-50%, -100%)`;
        if (cap.lastTransform !== nextTransform) {
          cap.el.style.transform = nextTransform;
          cap.lastTransform = nextTransform;
        }
      }
    }

    for (const badge of this.cityBadges.values()) {
      const pos = badge.isSelected ? badge.selectedWorldPos : badge.unselectedWorldPos;
      const p = project(pos);
      if (badge.isSelected) {
        const nextDisplay = p.visible ? 'flex' : 'none';
        if (badge.lastDisplay !== nextDisplay) {
          badge.el.style.display = nextDisplay;
          badge.lastDisplay = nextDisplay;
        }
        if (p.visible) {
          const nextTransform = `translate3d(${p.x.toFixed(1)}px, ${(p.y - 6).toFixed(1)}px, 0) translate(-50%, -100%)`;
          if (badge.lastTransform !== nextTransform) {
            badge.el.style.transform = nextTransform;
            badge.lastTransform = nextTransform;
          }
        }
      } else {
        const nextDisplay = p.visible ? 'inline-flex' : 'none';
        if (badge.lastDisplay !== nextDisplay) {
          badge.el.style.display = nextDisplay;
          badge.lastDisplay = nextDisplay;
        }
        if (p.visible) {
          const nextTransform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) translate(-50%, -50%)`;
          if (badge.lastTransform !== nextTransform) {
            badge.el.style.transform = nextTransform;
            badge.lastTransform = nextTransform;
          }
        }
      }
    }

    for (let i = this.popups.length - 1; i >= 0; i--) {
      const pop = this.popups[i];
      pop.age += dt;
      if (pop.age >= pop.duration) {
        pop.el.remove();
        this.popups.splice(i, 1);
        continue;
      }
      const t = pop.age / pop.duration;
      const easeFloat = 1 - Math.pow(1 - t, 2);
      const p = project(pop.worldPos, easeFloat * 0.95);
      pop.el.style.opacity = String(t < 0.68 ? 1 : Math.max(0, 1 - (t - 0.68) / 0.32));
      pop.el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${(1 + Math.sin(t * Math.PI) * 0.14).toFixed(2)})`;
    }
  }

  public dispose(): void {
    this.root.innerHTML = '';
    this.unitBadges.clear();
    this.cityBadges.clear();
    this.captureAffordances.clear();
    this.unitWorldPosOverrides.clear();
    this.hiddenUnitIds.clear();
    this.popups.length = 0;
  }
}
