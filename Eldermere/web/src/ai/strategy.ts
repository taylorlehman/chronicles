/**
 * Strategic layer for the rules-based AI: goal distance fields, an enemy-reach
 * danger map, per-city threat assessment, war-target selection, posture and the
 * army budget. Everything is recomputed from the GameState (the planner is
 * stateless between turns), so "stickiness" is derived from where our army is.
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

function passableMask(state: GameState, canMountains: boolean): Uint8Array {
  const mask = new Uint8Array(state.tiles.length);
  for (let i = 0; i < state.tiles.length; i++) {
    const t = state.tiles[i];
    mask[i] = t.terrain === 'water' || (t.terrain === 'mountain' && !canMountains) ? 0 : 1;
  }
  return mask;
}

export function bfsField(state: GameState, mask: Uint8Array, sources: number[]): Int16Array {
  const size = state.mapSize;
  const dist = new Int16Array(size * size).fill(FAR);
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
  ctx.enemyUnits.forEach((e, idx) => {
    const r = enemyStrikeRadius(state, e);
    for (let dy = -r; dy <= r; dy++) {
      const y = e.y + dy;
      if (y < 0 || y >= size) continue;
      for (let dx = -r; dx <= r; dx++) {
        const x = e.x + dx;
        if (x < 0 || x >= size) continue;
        if (dx === 0 && dy === 0) continue;
        reach[y * size + x].push(idx);
      }
    }
  });
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

/** Estimated total damage `unit` would take next enemy turn if it ends on `tile`. */
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
  const dmgs: number[] = [];
  for (const idx of attackers) {
    if (excludeEnemyIdx === idx) continue;
    const atk = sctx.enemyAtk[idx];
    const aF = sctx.enemyForce[idx];
    if (aF + effDef <= 0) continue;
    let dmg = Math.round((aF / (aF + effDef)) * atk * 4.5);
    if (stalwart && sctx.enemyRanged[idx]) dmg = Math.max(0, dmg - 1);
    dmgs.push(dmg);
  }
  dmgs.sort((a, b) => b - a);
  // Not every enemy will commit to this one unit: full weight for the two strongest blows.
  let total = 0;
  for (let i = 0; i < dmgs.length; i++) total += i < 2 ? dmgs[i] : dmgs[i] * 0.5;
  return total;
}

export function buildStrategicContext(
  state: GameState,
  ctx: SpatialContext,
  profile: FactionAIProfile,
  diff: DifficultyConfig,
): StrategicContext {
  const size = state.mapSize;
  const me = ctx.player;
  const mask = passableMask(state, canPassMountains(me));

  // --- Goal fields ---------------------------------------------------------
  const villageSources: number[] = [];
  for (const v of ctx.neutralVillages) villageSources.push(tileIndex(v.x, v.y, size));
  for (const r of ctx.ruins) villageSources.push(tileIndex(r.x, r.y, size));
  const distVillage = bfsField(state, mask, villageSources);

  const fogSources: number[] = [];
  for (let i = 0; i < state.tiles.length; i++) if (!me.revealedTiles[i]) fogSources.push(i);
  const distFog = bfsField(state, mask, fogSources);

  const homeSources = ctx.ownCities.map((c) => tileIndex(c.x, c.y, size));
  const distHome = bfsField(state, mask, homeSources);

  const enemyReach = buildEnemyReach(state, ctx);
  const nE = ctx.enemyUnits.length;
  const enemyAtk = new Float64Array(nE);
  const enemyForce = new Float64Array(nE);
  const enemyRanged = new Uint8Array(nE);
  const enemyPowers = ctx.enemyUnits.map((e) => unitPower(e));
  const enemyReachPower = new Float64Array(size * size);
  for (let t = 0; t < enemyReach.length; t++) {
    let sum = 0;
    for (const idx of enemyReach[t]) sum += enemyPowers[idx];
    enemyReachPower[t] = sum;
  }
  const friendPower = new Float64Array(size * size);
  for (const u of ctx.ownUnits) {
    const pw = unitPower(u);
    for (let dy = -2; dy <= 2; dy++) {
      const y = u.y + dy;
      if (y < 0 || y >= size) continue;
      for (let dx = -2; dx <= 2; dx++) {
        const x = u.x + dx;
        if (x < 0 || x >= size) continue;
        friendPower[y * size + x] += pw;
      }
    }
  }
  ctx.enemyUnits.forEach((e, i) => {
    const atk = getEffectiveAttack(state, e);
    enemyAtk[i] = atk;
    enemyForce[i] = atk * (unitHasTrait(state, e, 'bloodlust') ? 1 : e.hp / e.maxHp);
    enemyRanged[i] = UNIT_DEFINITIONS[e.type].range > 1 ? 1 : 0;
  });

  // --- Threats -------------------------------------------------------------
  const threats: Record<string, CityThreat> = {};
  for (const city of ctx.ownCities) {
    let enemyPower = 0;
    let enemyCount = 0;
    let enemyAdjacent = false;
    let enemyOnCenter = false;
    for (const e of ctx.enemyUnits) {
      const d = Math.max(Math.abs(e.x - city.x), Math.abs(e.y - city.y));
      if (d <= 3) {
        enemyPower += unitPower(e);
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

  // --- Army & capacity -----------------------------------------------------
  let ownPower = 0;
  for (const u of ctx.ownUnits) ownPower += unitPower(u);
  let totalCap = 0;
  let usedCap = 0;
  let freeSlots = 0;
  const cityHasRoom: Record<string, boolean> = {};
  const homeCounts: Record<string, number> = {};
  for (const u of ctx.ownUnits) {
    if (u.homeCityId) homeCounts[u.homeCityId] = (homeCounts[u.homeCityId] ?? 0) + 1;
  }
  for (const city of ctx.ownCities) {
    const cap = getCityUnitCap(state, city);
    const used = homeCounts[city.id] ?? 0;
    cityHasRoom[city.id] = used < cap;
    totalCap += cap;
    usedCap += Math.min(cap, used);
    if (used < cap) freeSlots++;
  }
  // Unit-cap-free units (champions, drakes, towers) still count toward the army.
  const armySize = ctx.ownUnits.filter((u) => UNIT_DEFINITIONS[u.type].movement > 0).length;

  // --- War target ----------------------------------------------------------
  const enemyPowerByPlayer: Record<string, number> = {};
  for (const e of ctx.enemyUnits) {
    enemyPowerByPlayer[e.ownerId] = (enemyPowerByPlayer[e.ownerId] ?? 0) + unitPower(e);
  }
  let warTargetId: string | null = null;
  let targetCity: City | null = null;
  let bestAttr = -Infinity;
  for (const p of state.players) {
    if (p.id === me.id || !p.alive) continue;
    const cities = ctx.enemyCities.filter((c) => c.ownerId === p.id);
    if (cities.length === 0) continue;
    // Pick that player's most attractive city for us.
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
        if (Math.max(Math.abs(u.x - c.x), Math.abs(u.y - c.y)) <= 3) engaged++;
      }
      const cost = d + garrison * 0.45 + (c.hasWalls ? 2 : 0) - (c.isCapital ? 1 : 0) - engaged * 0.8;
      if (cost < bestCost) {
        bestCost = cost;
        bestCity = c;
      }
    }
    if (!bestCity) continue;
    const theirPower = enemyPowerByPlayer[p.id] ?? 0;
    // Prefer reachable, weaker neighbours, but (like people) mostly fight whoever is on our
    // doorstep rather than everyone piling onto the single weakest player.
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
    let attr =
      Math.sqrt((ownPower + 2) / (theirPower + 4)) *
      (10 / (6 + Math.max(0, bestCost))) *
      (1 + Math.min(0.5, aggressors * 0.15));
    // Like human FFA players, gang up on a runaway Glory leader (scores are public).
    const others = state.players.filter((o) => o.alive && o.id !== p.id);
    const avgOther = others.reduce((a, o) => a + o.score, 0) / Math.max(1, others.length);
    if (p.score > avgOther * 1.25 && state.turn >= 10) {
      attr *= 1 + Math.min(1, (p.score / Math.max(1, avgOther) - 1.25) * 1.5);
    }
    if (p.isHuman) {
      attr *= diff.humanTargetBias;
      if (state.turn < diff.humanGraceTurns) attr *= 0.3;
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
  const targetIsHuman = !!targetCity && state.players.find((p) => p.id === targetCity!.ownerId)?.isHuman;
  let attacking = false;
  if (targetCity) {
    const capFull = totalCap > 0 && usedCap >= totalCap * 0.85;
    // Easy AIs need a much bigger edge before marching on the human player.
    const r = targetIsHuman ? ratio / Math.max(0.2, diff.humanTargetBias) : ratio;
    attacking =
      (state.turn >= aggTurn && fieldPower >= r * targetPower + 3) ||
      (capFull && state.turn >= aggTurn * 0.6 && fieldPower >= targetPower * 0.8) ||
      (targetPower === 0 && state.turn >= aggTurn * 0.5 && fieldPower >= 3);
    if (targetIsHuman && state.turn < diff.humanGraceTurns) attacking = false;
  }

  let strikeForce = 0;
  if (targetCity) {
    for (const u of ctx.ownUnits) {
      if (distTarget[tileIndex(u.x, u.y, size)] <= 5) strikeForce += unitPower(u);
    }
  }
  const overwhelming = attacking && strikeForce >= Math.max(6, targetPower * 1.4);

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
): void {
  const size = state.mapSize;
  const roles = sctx.roles;
  const defendCity = sctx.defendCity;
  roles.clear();
  defendCity.clear();
  const pool: Unit[] = [];
  for (const u of ctx.ownUnits) {
    if (UNIT_DEFINITIONS[u.type].movement === 0) {
      roles.set(u.id, 'static');
      continue;
    }
    if (u.hp / u.maxHp < 0.4) {
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
    roles.set(u.id, sctx.attacking && sctx.targetCity ? 'attack' : sctx.targetCity || ctx.enemyUnits.length > 0 ? 'hold' : 'explore');
  }
}
