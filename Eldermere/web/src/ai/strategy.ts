/**
 * Strategic layer for the rules-based AI: goal distance fields, an enemy-reach
 * danger map, per-city threat assessment, organic war-target selection with
 * campaign commitment, posture, and army budget. Strictly fog-of-war clean:
 * only reads entities already filtered through `player.revealedTiles` in `ctx`.
 */
import {
  UNIT_DEFINITIONS,
  canPassMountains,
  getCityUnitCap,
  getEffectiveAttack,
  getEffectiveDefense,
  getPlayerAge,
  getUnitRange,
  tileIndex,
  unitHasTrait,
  type City,
  type GameState,
  type Tile,
  type Unit,
} from '../game/index';
import type { DifficultyConfig, FactionAIProfile } from './types';
import type { SpatialContext } from './evaluator';

export const FAR = 999;

export type UnitRole = 'expand' | 'explore' | 'defend' | 'attack' | 'hold' | 'retreat' | 'static';

export interface CityThreat {
  cityId: string;
  /** Combat power of visible enemy units within 3 tiles. */
  enemyPower: number;
  enemyCount: number;
  /** Combat power of own units within 2 tiles (incl. garrison). */
  ownPower: number;
  /** An enemy unit stands next to the city center. */
  enemyAdjacent: boolean;
  /** An enemy unit stands ON the city center (it captures next turn unless killed). */
  enemyOnCenter: boolean;
}

export interface StrategicContext {
  size: number;
  /** BFS distance (ground) to the nearest neutral village or unexplored ruins. */
  distVillage: Int16Array;
  /** BFS distance (ground) to the current war-target city. */
  distTarget: Int16Array;
  /** BFS distance (ground) to the nearest unrevealed tile. */
  distFog: Int16Array;
  /** BFS distance (ground) to the nearest own city. */
  distHome: Int16Array;
  /** Per tile: indices into ctx.enemyUnits that can attack that tile on their next turn. */
  enemyReach: number[][];
  /** Per enemy (ctx.enemyUnits index): effective attack, health-scaled attack force, ranged flag. */
  enemyAtk: Float64Array;
  enemyForce: Float64Array;
  enemyRanged: Uint8Array;
  /** Per tile: total power of enemy units able to strike it next turn. */
  enemyReachPower: Float64Array;
  /** Per tile: total power of own units within 2 tiles. */
  friendPower: Float64Array;
  threats: Record<string, CityThreat>;
  warTargetId: string | null;
  targetCity: City | null;
  /** Own city closest to the war target (staging point). */
  frontierCity: City | null;
  attacking: boolean;
  /** Power of own units already within 5 steps of the target city. */
  strikeForce: number;
  /** True when the strike force clearly overmatches the target's defenders: commit. */
  overwhelming: boolean;
  ownPower: number;
  targetPower: number;
  desiredArmy: number;
  totalCap: number;
  usedCap: number;
  /** Gold the tech / economy passes must leave for unit production. */
  reserveGold: number;
  roles: Map<string, UnitRole>;
  defendCity: Map<string, City>;
  /** Own city id -> true when the city is below its unit cap (can still train). */
  cityHasRoom: Record<string, boolean>;
}

/** Rough combat power of a unit (attack + defense scaled by health). */
export function unitPower(unit: Unit): number {
  const spec = UNIT_DEFINITIONS[unit.type];
  if (spec.movement === 0) return (spec.attack + spec.defense) * 0.6 * (unit.hp / 10);
  const rangeMult = spec.range > 1 ? 1.15 : 1;
  return (spec.attack + spec.defense * 0.8) * rangeMult * (unit.hp / 10);
}

function passableMask(
  state: GameState,
  canMountains: boolean,
  revealed: boolean[],
): Uint8Array {
  const mask = new Uint8Array(state.tiles.length);
  for (let i = 0; i < state.tiles.length; i++) {
    // Strictly fog-of-war clean: never read terrain of unrevealed tiles.
    if (!revealed[i]) {
      mask[i] = 1;
      continue;
    }
    const t = state.tiles[i];
    mask[i] = t.terrain === 'water' || (t.terrain === 'mountain' && !canMountains) ? 0 : 1;
  }
  return mask;
}

export function bfsField(state: GameState, mask: Uint8Array, sources: number[]): Int16Array {
  const size = state.mapSize;
  const dist = new Int16Array(size * size).fill(FAR);
  if (sources.length === 0) return dist;
  const queue = new Int32Array(size * size);
  let head = 0;
  let tail = 0;
  for (const s of sources) {
    if (dist[s] === 0) continue;
    dist[s] = 0;
    queue[tail++] = s;
  }
  while (head < tail) {
    const cur = queue[head++];
    const cx = cur % size;
    const cy = (cur - cx) / size;
    const nd = dist[cur] + 1;
    for (let dy = -1; dy <= 1; dy++) {
      const ny = cy + dy;
      if (ny < 0 || ny >= size) continue;
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = cx + dx;
        if (nx < 0 || nx >= size) continue;
        const ni = ny * size + nx;
        if (!mask[ni] || dist[ni] <= nd) continue;
        dist[ni] = nd;
        queue[tail++] = ni;
      }
    }
  }
  return dist;
}

/** Tiles an enemy unit can strike on its next turn (Chebyshev approximation). */
function enemyStrikeRadius(state: GameState, enemy: Unit): number {
  const spec = UNIT_DEFINITIONS[enemy.type];
  const range = getUnitRange(state, enemy);
  if (spec.movement === 0) return range;
  if (!unitHasTrait(state, enemy, 'dash')) return range;
  let move = spec.movement;
  if ((state.eclipseTurnsRemaining ?? 0) > 0 && state.eclipseOwnerId === enemy.ownerId) move += 1;
  return move + range;
}

export function buildEnemyReach(state: GameState, ctx: SpatialContext): number[][] {
  const size = state.mapSize;
  const reach: number[][] = Array.from({ length: size * size }, () => []);
  const enemies = ctx.enemyUnits;
  for (let idx = 0; idx < enemies.length; idx++) {
    const e = enemies[idx];
    const r = enemyStrikeRadius(state, e);
    const y0 = Math.max(0, e.y - r);
    const y1 = Math.min(size - 1, e.y + r);
    const x0 = Math.max(0, e.x - r);
    const x1 = Math.min(size - 1, e.x + r);
    for (let y = y0; y <= y1; y++) {
      const row = y * size;
      for (let x = x0; x <= x1; x++) {
        if (x === e.x && y === e.y) continue;
        reach[row + x].push(idx);
      }
    }
  }
  return reach;
}

/** Defense multiplier `unit` would enjoy standing on `tile` (mirrors combat.ts). */
export function terrainDefenseAt(state: GameState, unit: Unit, tile: Tile, ownerFaction: string): number {
  let bonus = 1.0;
  if (tile.terrain === 'mountain') bonus = ownerFaction === 'dwarves' ? 1.75 : 1.5;
  else if (tile.terrain === 'forest' || tile.terrain === 'ancient_woods') bonus = 1.5;
  if (tile.isCityCenter && tile.cityId) {
    const city = state.cities[tile.cityId];
    if (city && city.ownerId === unit.ownerId) {
      if (city.hasWalls) bonus = Math.max(bonus, 2.0);
      else if (unitHasTrait(state, unit, 'fortify')) bonus = Math.max(bonus, 1.5);
    }
  }
  return bonus;
}

/**
 * Estimated total damage `unit` would take next enemy turn if it ends on `tile`.
 * Allocation-free single pass keeping full weight for the two strongest blows + 0.5x for the rest.
 */
export function expectedIncomingDamage(
  state: GameState,
  ctx: SpatialContext,
  sctx: StrategicContext,
  unit: Unit,
  tileIdx: number,
  excludeEnemyIdx = -1,
): number {
  const attackers = sctx.enemyReach[tileIdx];
  if (!attackers || attackers.length === 0) return 0;
  const tile = state.tiles[tileIdx];
  const terr = terrainDefenseAt(state, unit, tile, ctx.player.faction);
  const effDef = getEffectiveDefense(state, unit) * (unit.hp / unit.maxHp) * terr;
  const stalwart = unitHasTrait(state, unit, 'stalwart');

  let m1 = 0;
  let m2 = 0;
  let restSum = 0;
  for (let i = 0; i < attackers.length; i++) {
    const idx = attackers[i];
    if (excludeEnemyIdx === idx) continue;
    const atk = sctx.enemyAtk[idx];
    const aF = sctx.enemyForce[idx];
    if (aF + effDef <= 0) continue;
    let dmg = Math.round((aF / (aF + effDef)) * atk * 4.5);
    if (stalwart && sctx.enemyRanged[idx]) dmg = Math.max(0, dmg - 1);
    if (dmg >= m1) {
      restSum += m2;
      m2 = m1;
      m1 = dmg;
    } else if (dmg >= m2) {
      restSum += m2;
      m2 = dmg;
    } else {
      restSum += dmg;
    }
  }
  return m1 + m2 + restSum * 0.5;
}

/** Smooth C1 smoothstep in [0, 1]. */
function smoothstep(x: number): number {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
}

/**
 * Smooth, continuous human-pressure curve in (0, 1] with NO abrupt grace-period cliff.
 * Starts gentle in the early expansion turns and eases smoothly up over `humanPressureRampTurns`.
 */
export function humanPressure(turn: number, diff: DifficultyConfig): number {
  const s = smoothstep((turn - 1) / Math.max(1, diff.humanPressureRampTurns));
  const floor = diff.difficulty === 'easy' ? 0.1 : diff.difficulty === 'normal' ? 0.22 : 0.3;
  const ceil = diff.difficulty === 'easy' ? 0.7 : diff.difficulty === 'normal' ? 0.9 : 1.0;
  return floor + (ceil - floor) * s;
}

/** Smooth target-selection multiplier for a human opponent (no step-function cliff). */
export function humanTargetWeight(turn: number, diff: DifficultyConfig): number {
  const s = smoothstep((turn - 1) / Math.max(1, diff.humanPressureRampTurns));
  return diff.humanTargetBias + (diff.humanTargetBiasMax - diff.humanTargetBias) * s;
}

/**
 * Small per-player memory of the active war campaign (target player + target city),
 * used for hysteresis so the AI commits coherently to sieging/capturing a target city
 * instead of oscillating every few turns. Reads only see entries from earlier turns, so
 * re-planning the same state is 100% deterministic.
 */
interface CampaignEntry {
  turn: number;
  target: string | null;
  cityId: string | null;
}
interface TargetMemo {
  history: CampaignEntry[];
}
const targetMemory = new Map<string, TargetMemo>();

function memoKey(state: GameState, playerId: string): string {
  return `${state.config.seed}|${state.mapSize}|${playerId}`;
}

export function clearTargetMemory(): void {
  targetMemory.clear();
}

/** The most recent campaign we were fighting over the last few turns. */
export function previousCampaign(
  state: GameState,
  playerId: string,
): { target: string | null; cityId: string | null } {
  const m = targetMemory.get(memoKey(state, playerId));
  if (!m) return { target: null, cityId: null };
  for (let i = m.history.length - 1; i >= 0; i--) {
    const h = m.history[i];
    if (h.turn < state.turn && h.turn >= state.turn - 6 && h.target) {
      return { target: h.target, cityId: h.cityId };
    }
  }
  return { target: null, cityId: null };
}

export function previousWarTarget(state: GameState, playerId: string): string | null {
  return previousCampaign(state, playerId).target;
}

export function rememberWarTarget(
  state: GameState,
  playerId: string,
  target: string | null,
  cityId: string | null = null,
): void {
  const key = memoKey(state, playerId);
  let m = targetMemory.get(key);
  // A later turn already recorded means this is a new game / reloaded save: start over.
  if (m && m.history.some((h) => h.turn > state.turn)) m = undefined;
  if (!m) {
    if (targetMemory.size > 4000) targetMemory.clear();
    m = { history: [] };
    targetMemory.set(key, m);
  }
  if (m.history.some((h) => h.turn === state.turn)) return; // first plan of the turn wins
  m.history.push({ turn: state.turn, target, cityId });
  if (m.history.length > 8) m.history.shift();
}

/**
 * Lightweight reserve-gold estimate used inside the economy pass so we don't rebuild
 * 4 full-map BFS fields on every harvest/improvement step.
 */
export function computeReserveGold(
  state: GameState,
  ctx: SpatialContext,
  profile: FactionAIProfile,
  diff: DifficultyConfig,
  attacking = false,
): number {
  let totalCap = 0;
  let freeSlots = 0;
  const homeCounts: Record<string, number> = {};
  let armySize = 0;
  for (const u of ctx.ownUnits) {
    if (u.homeCityId) homeCounts[u.homeCityId] = (homeCounts[u.homeCityId] ?? 0) + 1;
    if (UNIT_DEFINITIONS[u.type].movement > 0) armySize++;
  }
  for (const city of ctx.ownCities) {
    const cap = getCityUnitCap(state, city);
    const used = homeCounts[city.id] ?? 0;
    totalCap += cap;
    if (used < cap) freeSlots++;
  }
  let threatUnits = 0;
  for (const c of ctx.ownCities) threatUnits += ctx.cityThreats[c.id] ?? 0;
  const ageBoost = getPlayerAge(ctx.player) >= 2 ? 1 : 0.75;
  let desiredArmy = Math.round(
    (1 + ctx.ownCities.length * profile.armyPerCity * ageBoost) * diff.armyTargetMult + threatUnits * 0.8,
  );
  if (attacking) desiredArmy += 2;
  desiredArmy = Math.min(Math.max(1, desiredArmy), Math.max(1, totalCap));
  const deficit = Math.max(0, desiredArmy - armySize);
  return Math.min(deficit, Math.max(1, freeSlots)) * 3;
}

function populateEnemyCombatArrays(
  state: GameState,
  ctx: SpatialContext,
): {
  enemyReach: number[][];
  enemyAtk: Float64Array;
  enemyForce: Float64Array;
  enemyRanged: Uint8Array;
  enemyReachPower: Float64Array;
  threats: Record<string, CityThreat>;
} {
  const size = state.mapSize;
  const enemyReach = buildEnemyReach(state, ctx);
  const nE = ctx.enemyUnits.length;
  const enemyAtk = new Float64Array(nE);
  const enemyForce = new Float64Array(nE);
  const enemyRanged = new Uint8Array(nE);
  const enemyPowers = new Float64Array(nE);
  for (let i = 0; i < nE; i++) {
    const e = ctx.enemyUnits[i];
    enemyPowers[i] = unitPower(e);
    const atk = getEffectiveAttack(state, e);
    enemyAtk[i] = atk;
    enemyForce[i] = atk * (unitHasTrait(state, e, 'bloodlust') ? 1 : e.hp / e.maxHp);
    enemyRanged[i] = UNIT_DEFINITIONS[e.type].range > 1 ? 1 : 0;
  }
  const enemyReachPower = new Float64Array(size * size);
  for (let t = 0; t < enemyReach.length; t++) {
    const arr = enemyReach[t];
    let sum = 0;
    for (let j = 0; j < arr.length; j++) sum += enemyPowers[arr[j]];
    enemyReachPower[t] = sum;
  }

  const threats: Record<string, CityThreat> = {};
  for (const city of ctx.ownCities) {
    let enemyPower = 0;
    let enemyCount = 0;
    let enemyAdjacent = false;
    let enemyOnCenter = false;
    for (let i = 0; i < nE; i++) {
      const e = ctx.enemyUnits[i];
      const d = Math.max(Math.abs(e.x - city.x), Math.abs(e.y - city.y));
      if (d <= 3) {
        enemyPower += enemyPowers[i];
        enemyCount++;
      }
      if (d === 1) enemyAdjacent = true;
      if (d === 0) enemyOnCenter = true;
    }
    let ownPower = 0;
    for (const u of ctx.ownUnits) {
      const d = Math.max(Math.abs(u.x - city.x), Math.abs(u.y - city.y));
      if (d <= 2) ownPower += unitPower(u);
    }
    threats[city.id] = { cityId: city.id, enemyPower, enemyCount, ownPower, enemyAdjacent, enemyOnCenter };
  }

  return { enemyReach, enemyAtk, enemyForce, enemyRanged, enemyReachPower, threats };
}

export function buildStrategicContext(
  state: GameState,
  ctx: SpatialContext,
  profile: FactionAIProfile,
  diff: DifficultyConfig,
): StrategicContext {
  const size = state.mapSize;
  const me = ctx.player;
  const mask = passableMask(state, canPassMountains(me), me.revealedTiles);

  // --- Goal fields ---------------------------------------------------------
  const villageSources: number[] = [];
  for (const v of ctx.neutralVillages) villageSources.push(tileIndex(v.x, v.y, size));
  for (const r of ctx.ruins) villageSources.push(tileIndex(r.x, r.y, size));
  const distVillage = bfsField(state, mask, villageSources);

  const fogSources: number[] = [];
  if (ctx.revealedRatio < 0.999) {
    for (let i = 0; i < state.tiles.length; i++) if (!me.revealedTiles[i]) fogSources.push(i);
  }
  const distFog = bfsField(state, mask, fogSources);

  const homeSources = ctx.ownCities.map((c) => tileIndex(c.x, c.y, size));
  const distHome = bfsField(state, mask, homeSources);

  const { enemyReach, enemyAtk, enemyForce, enemyRanged, enemyReachPower, threats } =
    populateEnemyCombatArrays(state, ctx);

  const friendPower = new Float64Array(size * size);
  for (const u of ctx.ownUnits) {
    const pw = unitPower(u);
    const y0 = Math.max(0, u.y - 2);
    const y1 = Math.min(size - 1, u.y + 2);
    const x0 = Math.max(0, u.x - 2);
    const x1 = Math.min(size - 1, u.x + 2);
    for (let y = y0; y <= y1; y++) {
      const row = y * size;
      for (let x = x0; x <= x1; x++) friendPower[row + x] += pw;
    }
  }

  // --- Army & capacity -----------------------------------------------------
  let ownPower = 0;
  for (const u of ctx.ownUnits) ownPower += unitPower(u);
  let totalCap = 0;
  let usedCap = 0;
  let freeSlots = 0;
  const cityHasRoom: Record<string, boolean> = {};
  const homeCounts: Record<string, number> = {};
  let armySize = 0;
  for (const u of ctx.ownUnits) {
    if (u.homeCityId) homeCounts[u.homeCityId] = (homeCounts[u.homeCityId] ?? 0) + 1;
    if (UNIT_DEFINITIONS[u.type].movement > 0) armySize++;
  }
  for (const city of ctx.ownCities) {
    const cap = getCityUnitCap(state, city);
    const used = homeCounts[city.id] ?? 0;
    cityHasRoom[city.id] = used < cap;
    totalCap += cap;
    usedCap += Math.min(cap, used);
    if (used < cap) freeSlots++;
  }

  // --- War target (organic proximity + border friction + strong campaign commitment) ---
  const enemyPowerByPlayer: Record<string, number> = {};
  for (const e of ctx.enemyUnits) {
    enemyPowerByPlayer[e.ownerId] = (enemyPowerByPlayer[e.ownerId] ?? 0) + unitPower(e);
  }
  let warTargetId: string | null = null;
  let targetCity: City | null = null;
  let bestAttr = -Infinity;
  const prev = previousCampaign(state, me.id);
  const hTargetW = humanTargetWeight(state.turn, diff);

  for (const p of state.players) {
    if (p.id === me.id || !p.alive) continue;
    const cities = ctx.enemyCities.filter((c) => c.ownerId === p.id);
    if (cities.length === 0) continue;

    // Pick that player's most attractive reachable city for us (sticky to our active siege).
    let bestCity: City | null = null;
    let bestCost = Infinity;
    for (const c of cities) {
      const d = distHome[tileIndex(c.x, c.y, size)];
      if (d >= FAR) continue;
      let garrison = 0;
      for (const e of ctx.enemyUnits) {
        if (e.ownerId !== p.id) continue;
        const de = Math.max(Math.abs(e.x - c.x), Math.abs(e.y - c.y));
        if (de <= 2) garrison += unitPower(e) * (de === 0 ? 1.4 : 1);
      }
      let engaged = 0;
      for (const u of ctx.ownUnits) {
        if (Math.max(Math.abs(u.x - c.x), Math.abs(u.y - c.y)) <= 4) engaged++;
      }
      const stickyCityBonus = c.id === prev.cityId ? 5.5 : 0;
      const cost =
        d +
        garrison * 0.4 +
        (c.hasWalls ? 2 : 0) -
        (c.isCapital ? 1 : 0) -
        engaged * 1.1 -
        stickyCityBonus;
      if (cost < bestCost) {
        bestCost = cost;
        bestCity = c;
      }
    }
    if (!bestCity) continue;

    const theirPower = enemyPowerByPlayer[p.id] ?? 0;
    let aggressors = 0;
    for (const e of ctx.enemyUnits) {
      if (e.ownerId !== p.id) continue;
      for (const c of ctx.ownCities) {
        if (Math.max(Math.abs(e.x - c.x), Math.abs(e.y - c.y)) <= 3) {
          aggressors++;
          break;
        }
      }
    }

    // Steep distance weighting keeps AIs fighting their natural border neighbors rather than
    // marching across the map to dogpile one player. Bounded weakness ratio prevents 3v1 vulturing.
    const distScore = 14 / (4 + Math.max(0, bestCost) * 1.5);
    const powerRatio = Math.min(1.35, Math.max(0.55, Math.sqrt((ownPower + 3) / (theirPower + 4))));
    const frictionBoost = 1 + Math.min(0.45, aggressors * 0.14);
    let attr = distScore * distScore * powerRatio * frictionBoost;

    // Gentle leader-balancing on public Glory scores (capped so it never causes 3v1 dogpiles).
    const others = state.players.filter((o) => o.alive && o.id !== p.id);
    const avgOther = others.reduce((a, o) => a + o.score, 0) / Math.max(1, others.length);
    if (p.score > avgOther * 1.35 && state.turn >= 14 && (!p.isHuman || diff.gangUpOnHuman)) {
      attr *= 1 + Math.min(0.35, (p.score / Math.max(1, avgOther) - 1.35) * 0.7);
    }

    if (p.isHuman) {
      // Smooth, continuous human targeting weight (zero grace-period cliff).
      attr *= hTargetW;
    }

    // Campaign commitment scales smoothly with focusFire (Hard holds disciplined sieges; Easy pivots organically).
    if (p.id === prev.target) {
      attr *= 1.5 + 1.9 * diff.focusFire;
    }

    if (attr > bestAttr) {
      bestAttr = attr;
      warTargetId = p.id;
      targetCity = bestCity;
    }
  }

  const targetSources = targetCity ? [tileIndex(targetCity.x, targetCity.y, size)] : [];
  const distTarget = bfsField(state, mask, targetSources);

  let frontierCity: City | null = null;
  if (targetCity) {
    let bd = Infinity;
    for (const c of ctx.ownCities) {
      const d = distTarget[tileIndex(c.x, c.y, size)];
      if (d < bd) {
        bd = d;
        frontierCity = c;
      }
    }
  }
  frontierCity ??= ctx.ownCapital ?? ctx.ownCities[0] ?? null;

  // --- Posture ---------------------------------------------------------------
  let targetPower = 0;
  if (targetCity) {
    for (const e of ctx.enemyUnits) {
      if (e.ownerId !== targetCity.ownerId) continue;
      const d = Math.max(Math.abs(e.x - targetCity.x), Math.abs(e.y - targetCity.y));
      if (d <= 3) targetPower += unitPower(e);
    }
    if (targetCity.hasWalls) targetPower *= 1.3;
  }
  const aggTurn = profile.aggressionTurn * diff.aggressionDelay;
  const ratio = profile.attackRatio * diff.attackRatioMult;
  let homeThreat = 0;
  for (const t of Object.values(threats)) homeThreat += Math.max(0, t.enemyPower - t.ownPower * 0.5);
  const fieldPower = Math.max(0, ownPower - homeThreat * 0.8);
  const targetOwner = targetCity ? ctx.playerById.get(targetCity.ownerId) : undefined;
  const targetIsHuman = !!targetOwner?.isHuman;
  const pressure = humanPressure(state.turn, diff);

  let attacking = false;
  if (targetCity) {
    const capFull = totalCap > 0 && usedCap >= totalCap * 0.82;
    // Smoothly require slightly more force early against a human player (no binary freeze).
    const r = targetIsHuman ? ratio / Math.max(0.38, hTargetW * (0.65 + 0.35 * pressure)) : ratio;
    const effectiveAggTurn = targetIsHuman
      ? aggTurn + (1 - pressure) * (diff.difficulty === 'easy' ? 7 : 3)
      : aggTurn;
    attacking =
      (state.turn >= effectiveAggTurn && fieldPower >= r * targetPower + 3) ||
      (capFull && state.turn >= effectiveAggTurn * 0.7 && fieldPower >= targetPower * 0.85) ||
      (targetPower === 0 && state.turn >= effectiveAggTurn * 0.65 && fieldPower >= 3);
  }

  let strikeForce = 0;
  if (targetCity) {
    for (const u of ctx.ownUnits) {
      if (distTarget[tileIndex(u.x, u.y, size)] <= 5) strikeForce += unitPower(u);
    }
  }
  const overwhelming = attacking && strikeForce >= Math.max(6, targetPower * 1.35);

  // --- Army budget -----------------------------------------------------------
  let threatUnits = 0;
  for (const t of Object.values(threats)) threatUnits += t.enemyCount;
  const ageBoost = getPlayerAge(me) >= 2 ? 1 : 0.75;
  let desiredArmy = Math.round(
    (1 + ctx.ownCities.length * profile.armyPerCity * ageBoost) * diff.armyTargetMult + threatUnits * 0.8,
  );
  if (attacking) desiredArmy += 2;
  desiredArmy = Math.min(Math.max(1, desiredArmy), Math.max(1, totalCap));
  const deficit = Math.max(0, desiredArmy - armySize);
  const reserveGold = Math.min(deficit, Math.max(1, freeSlots)) * 3;

  return {
    size,
    distVillage,
    distTarget,
    distFog,
    distHome,
    enemyReach,
    enemyAtk,
    enemyForce,
    enemyRanged,
    enemyReachPower,
    friendPower,
    threats,
    warTargetId,
    targetCity,
    frontierCity,
    attacking,
    strikeForce,
    overwhelming,
    ownPower,
    targetPower,
    desiredArmy,
    totalCap,
    usedCap,
    reserveGold,
    roles: new Map(),
    defendCity: new Map(),
    cityHasRoom,
  };
}

/**
 * Assigns a role to each own unit: defenders for threatened cities, expanders for
 * nearby villages/ruins, an explorer while the map is dark, and the rest either
 * march on the war target or hold the frontier.
 */
export function assignRoles(
  state: GameState,
  ctx: SpatialContext,
  sctx: StrategicContext,
  diff?: DifficultyConfig,
): void {
  const size = state.mapSize;
  const roles = sctx.roles;
  const defendCity = sctx.defendCity;
  roles.clear();
  defendCity.clear();
  const pool: Unit[] = [];
  const allowRetreat = (diff?.dangerAwareness ?? 1) >= 0.2;
  for (const u of ctx.ownUnits) {
    if (UNIT_DEFINITIONS[u.type].movement === 0) {
      roles.set(u.id, 'static');
      continue;
    }
    if (allowRetreat && u.hp / u.maxHp < 0.4) {
      roles.set(u.id, 'retreat');
      continue;
    }
    pool.push(u);
  }

  // 1. Defense: cover each threatened city with roughly matching power.
  const threatened = ctx.ownCities
    .map((c) => ({ c, t: sctx.threats[c.id] }))
    .filter((x) => x.t && x.t.enemyPower > 0)
    .sort((a, b) => b.t.enemyPower - a.t.enemyPower || (b.c.isCapital ? 1 : 0) - (a.c.isCapital ? 1 : 0));
  for (const { c, t } of threatened) {
    let covered = 0;
    const need = t.enemyPower * (c.isCapital ? 1.2 : 0.9);
    const candidates = pool
      .filter((u) => !roles.has(u.id) && Math.max(Math.abs(u.x - c.x), Math.abs(u.y - c.y)) <= 4)
      .sort(
        (a, b) =>
          Math.max(Math.abs(a.x - c.x), Math.abs(a.y - c.y)) -
          Math.max(Math.abs(b.x - c.x), Math.abs(b.y - c.y)),
      );
    for (const u of candidates) {
      if (covered >= need) break;
      roles.set(u.id, 'defend');
      defendCity.set(u.id, c);
      covered += unitPower(u);
    }
  }

  // 2. Expansion: nearest units claim known villages / ruins.
  const targets = ctx.neutralVillages.length + ctx.ruins.length;
  if (targets > 0) {
    const maxDist = state.turn <= 25 ? 9 : 6;
    const cands = pool
      .filter((u) => !roles.has(u.id) && u.type !== 'catapult')
      .map((u) => ({ u, d: sctx.distVillage[tileIndex(u.x, u.y, size)] }))
      .filter((x) => x.d <= maxDist)
      .sort((a, b) => a.d - b.d);
    let assigned = 0;
    for (const { u } of cands) {
      if (assigned >= targets) break;
      roles.set(u.id, 'expand');
      assigned++;
    }
  }

  // 3. Exploration while we have not yet found anyone to fight (or the map is dark).
  const wantExplorers = ctx.enemyCities.length === 0 ? 2 : ctx.revealedRatio < 0.45 && state.turn <= 20 ? 1 : 0;
  if (wantExplorers > 0) {
    const cands = pool
      .filter((u) => !roles.has(u.id))
      .sort((a, b) => UNIT_DEFINITIONS[b.type].movement - UNIT_DEFINITIONS[a.type].movement);
    for (let i = 0; i < Math.min(wantExplorers, cands.length); i++) roles.set(cands[i].id, 'explore');
  }

  // 4. Everyone else: campaign or frontier guard.
  for (const u of pool) {
    if (roles.has(u.id)) continue;
    roles.set(
      u.id,
      sctx.attacking && sctx.targetCity
        ? 'attack'
        : sctx.targetCity || ctx.enemyUnits.length > 0
          ? 'hold'
          : 'explore',
    );
  }
}

/**
 * Cheap in-turn refresh after one of our own units moved: recompute only what depends on
 * own unit positions (city threats' own power, friendly power grid).
 */
export function refreshDynamicContext(
  state: GameState,
  ctx: SpatialContext,
  sctx: StrategicContext,
): void {
  const size = state.mapSize;
  for (const city of ctx.ownCities) {
    const t = sctx.threats[city.id];
    if (!t) continue;
    let ownPower = 0;
    for (const u of ctx.ownUnits) {
      if (Math.max(Math.abs(u.x - city.x), Math.abs(u.y - city.y)) <= 2) ownPower += unitPower(u);
    }
    t.ownPower = ownPower;
  }
  sctx.friendPower.fill(0);
  for (const u of ctx.ownUnits) {
    const pw = unitPower(u);
    const y0 = Math.max(0, u.y - 2);
    const y1 = Math.min(size - 1, u.y + 2);
    const x0 = Math.max(0, u.x - 2);
    const x1 = Math.min(size - 1, u.x + 2);
    for (let y = y0; y <= y1; y++) {
      const row = y * size;
      for (let x = x0; x <= x1; x++) sctx.friendPower[row + x] += pw;
    }
  }
}

/**
 * Medium in-turn refresh after combat (unit damaged or killed, without city/village/fog changes):
 * refreshes enemy reach, threats, and friend power while reusing the 4 BFS goal fields!
 */
export function refreshCombatContext(
  state: GameState,
  ctx: SpatialContext,
  sctx: StrategicContext,
  diff?: DifficultyConfig,
): void {
  const { enemyReach, enemyAtk, enemyForce, enemyRanged, enemyReachPower, threats } =
    populateEnemyCombatArrays(state, ctx);
  sctx.enemyReach = enemyReach;
  sctx.enemyAtk = enemyAtk;
  sctx.enemyForce = enemyForce;
  sctx.enemyRanged = enemyRanged;
  sctx.enemyReachPower = enemyReachPower;
  sctx.threats = threats;
  refreshDynamicContext(state, ctx, sctx);
  assignRoles(state, ctx, sctx, diff);
}
