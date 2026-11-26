/**
 * "Weak human" stand-in for headless difficulty measurement.
 *
 * Deliberately independent of the real AI planner (src/ai) so that improving the
 * AI never silently changes the yardstick we measure difficulty against.
 *
 * Plays like a casual first-time player: grabs nearby villages and ruins, harvests
 * occasionally, trains basic units when it has spare gold, researches techs in a
 * fairly random order, takes obviously favourable fights and otherwise wanders
 * toward the nearest visible enemy city. It never uses its superpower, does not
 * focus fire, does not retreat wounded units and does not deliberately garrison.
 */
import {
  applyAction,
  canResearchTech,
  canUnitCapture,
  canUnitExploreRuins,
  chebyshevDist,
  cloneState,
  getAvailableTileActions,
  getCityUnitCap,
  getCityUnitCount,
  getFactionTechs,
  getPlayerCities,
  getPlayerUnits,
  getTile,
  getTrainableUnits,
  getUnitCost,
  getValidAttackTargets,
  getValidMoves,
  predictCombat,
  tileIndex,
  type City,
  type Coord,
  type GameAction,
  type GameState,
  type UnitType,
} from '../game/index';

function hashFloat(seed: number, salt: number): number {
  let h = (seed ^ Math.imul(salt + 7, 0x27d4eb2d)) >>> 0;
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35) >>> 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

export function planNoviceTurn(initial: GameState, playerId: string): GameAction[] {
  let state = cloneState(initial);
  const actions: GameAction[] = [];
  const player = () => state.players.find((p) => p.id === playerId)!;
  if (state.players[state.activePlayerIndex]?.id !== playerId || state.phase !== 'playing') {
    return [{ type: 'END_TURN' }];
  }
  let salt = state.turn * 7919 + state.activePlayerIndex * 31;
  const rand = () => hashFloat(initial.config.seed ^ 0x5bd1e995, salt++);

  const commit = (a: GameAction): boolean => {
    const res = applyAction(state, a);
    if (res.events.length === 0) return false;
    state = res.state;
    actions.push(a);
    return true;
  };

  const resolveRewards = () => {
    for (const city of getPlayerCities(state, playerId)) {
      let guard = 0;
      while (city.pendingLevelRewards.length > 0 && guard++ < 6) {
        const lvl = state.cities[city.id].pendingLevelRewards[0];
        if (lvl === undefined) break;
        const reward =
          lvl === 2 ? 'workshop' : lvl === 3 ? 'resources' : lvl === 4 ? 'pop_growth' : 'park';
        if (!commit({ type: 'CHOOSE_CITY_REWARD', cityId: city.id, reward })) break;
      }
    }
  };
  resolveRewards();

  // Research: usually one random affordable tech per turn.
  if (rand() < 0.65) {
    const options = getFactionTechs(player().faction).filter((t) =>
      canResearchTech(state, playerId, t.id),
    );
    if (options.length > 0) {
      const pick = options[Math.floor(rand() * options.length)];
      commit({ type: 'RESEARCH_TECH', techId: pick.id });
    }
  }

  // Economy: one harvest/improvement per turn at most, when it can afford it.
  if (rand() < 0.6) {
    outer: for (const city of getPlayerCities(state, playerId)) {
      for (let dy = -city.borderRadius; dy <= city.borderRadius; dy++) {
        for (let dx = -city.borderRadius; dx <= city.borderRadius; dx++) {
          const acts = getAvailableTileActions(state, playerId, city.x + dx, city.y + dy);
          const a = acts.find((x) => x.type === 'HARVEST_TILE' || x.type === 'BUILD_IMPROVEMENT');
          if (a && commit(a)) {
            resolveRewards();
            break outer;
          }
        }
      }
    }
  }

  // Units: capture/explore first, then favourable attacks, then wander.
  const units = getPlayerUnits(state, playerId);
  const enemyCityTargets = (): Coord[] =>
    Object.values(state.cities)
      .filter(
        (c) => c.ownerId !== playerId && player().revealedTiles[tileIndex(c.x, c.y, state.mapSize)],
      )
      .map((c) => ({ x: c.x, y: c.y }));
  const villageTargets = (): Coord[] =>
    state.tiles
      .filter(
        (t) =>
          ((t.hasVillage && !t.cityId) || t.resource === 'ruins') &&
          player().revealedTiles[tileIndex(t.x, t.y, state.mapSize)],
      )
      .map((t) => ({ x: t.x, y: t.y }));

  for (const u0 of units) {
    if (state.phase !== 'playing') break;
    const unit = state.units[u0.id];
    if (!unit) continue;
    if (canUnitCapture(state, unit.id)) {
      commit({ type: 'CAPTURE_CITY', unitId: unit.id });
      continue;
    }
    if (canUnitExploreRuins(state, unit.id)) {
      commit({ type: 'EXPLORE_RUINS', unitId: unit.id });
      continue;
    }
    const tryAttack = (): boolean => {
      const cur = state.units[unit.id];
      if (!cur) return false;
      for (const c of getValidAttackTargets(state, cur.id)) {
        const t = getTile(state, c.x, c.y);
        if (!t?.unitId) continue;
        const pv = predictCombat(state, cur.id, t.unitId);
        if (pv.attackerKilled) continue;
        if (pv.defenderKilled || pv.attackerDamage > pv.retaliationDamage) {
          return commit({ type: 'ATTACK_UNIT', attackerId: cur.id, defenderId: t.unitId });
        }
      }
      return false;
    };
    if (tryAttack()) continue;

    // 25% of the time a casual player simply forgets about a unit (less often when it
    // is visibly blocking a city center, which even new players notice quickly).
    const onOwnCenter = (() => {
      const t = getTile(state, unit.x, unit.y);
      return !!t?.isCityCenter && t.cityId !== null && state.cities[t.cityId]?.ownerId === playerId;
    })();
    if (rand() < (onOwnCenter ? 0.1 : 0.25)) continue;

    const moves = getValidMoves(state, unit.id);
    if (moves.length === 0) continue;
    const goals = villageTargets();
    const myUnits = getPlayerUnits(state, playerId).length;
    const enemyCities = enemyCityTargets();
    const fogEdge = (): Coord[] => {
      const out: Coord[] = [];
      const me = player();
      for (const t of state.tiles) {
        if (me.revealedTiles[tileIndex(t.x, t.y, state.mapSize)]) continue;
        out.push({ x: t.x, y: t.y });
      }
      return out;
    };
    const targetList =
      goals.length > 0 ? goals : myUnits >= 4 && enemyCities.length > 0 ? enemyCities : fogEdge();
    let best: Coord | null = null;
    let bestD = Infinity;
    if (targetList.length > 0) {
      for (const m of moves) {
        let d = Infinity;
        for (const g of targetList) d = Math.min(d, chebyshevDist(m, g));
        if (d < bestD) {
          bestD = d;
          best = m;
        }
      }
    } else {
      best = moves[Math.floor(rand() * moves.length)];
    }
    if (best && commit({ type: 'MOVE_UNIT', unitId: unit.id, to: best })) {
      tryAttack();
    }
  }

  // Training: up to two basic units per turn when it has spare gold and a modest army.
  const cities: City[] = getPlayerCities(state, playerId);
  let trained = 0;
  for (let attempt = 0; attempt < 2; attempt++) {
    const armySize = getPlayerUnits(state, playerId).length;
    if (armySize >= cities.length * 3 + 1 || rand() > 0.8) break;
    for (const city of cities) {
      const center = getTile(state, city.x, city.y);
      if (!center || center.unitId) continue;
      if (getCityUnitCount(state, city.id) >= getCityUnitCap(state, city)) continue;
      const trainable = getTrainableUnits(state, city.id).filter(
        (t) => getUnitCost(state, playerId, t) <= player().gold,
      );
      if (trainable.length === 0) continue;
      const basic: UnitType[] = trainable.filter((t) => getUnitCost(state, playerId, t) <= 3);
      const pool = basic.length > 0 ? basic : trainable;
      const pick = pool[Math.floor(rand() * pool.length)];
      if (commit({ type: 'TRAIN_UNIT', cityId: city.id, unitType: pick })) {
        trained++;
        break;
      }
    }
    if (trained <= attempt) break;
  }

  if (state.phase === 'playing') actions.push({ type: 'END_TURN' });
  return actions;
}
