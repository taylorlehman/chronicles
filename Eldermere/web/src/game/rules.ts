import {
  ALL_UNIT_TYPES,
  BASE_UNIT_TYPES,
  FACTION_DEFINITIONS,
  IMPROVEMENT_DEFINITIONS,
  TECH_DEFINITIONS,
  UNIT_DEFINITIONS,
  getFactionTechs,
} from './data';
import {
  getTile,
  tileIndex,
  type ActionOption,
  type City,
  type Coord,
  type GameAction,
  type GameState,
  type ImprovementType,
  type LeaderboardEntry,
  type PlayerId,
  type PlayerState,
  type ResourceType,
  type TechId,
  type Tile,
  type Unit,
  type UnitTrait,
  type UnitType,
} from './types';

export const HARVEST_COST = 2;
export const ROAD_COST = 2;
export const PLANT_WOODS_COST = 3;
export const CHOP_FOREST_GOLD = 2;

export const RESOURCE_POP_GAIN: Record<ResourceType, number> = {
  berries: 1,
  game: 1,
  ore: 1,
  mithril: 2,
  ruins: 0,
};

export function chebyshevDist(a: Coord, b: Coord): number {
  return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
}

export function getPlayer(state: GameState, playerId: PlayerId): PlayerState | undefined {
  return state.players.find((p) => p.id === playerId);
}

export function getActivePlayer(state: GameState): PlayerState {
  return state.players[state.activePlayerIndex];
}

export function getPlayerCities(state: GameState, playerId: PlayerId): City[] {
  return Object.values(state.cities).filter((c) => c.ownerId === playerId);
}

export function getPlayerUnits(state: GameState, playerId: PlayerId): Unit[] {
  return Object.values(state.units).filter((u) => u.ownerId === playerId);
}

export function getNeighbors8(state: GameState, x: number, y: number): Tile[] {
  const result: Tile[] = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const t = getTile(state, x + dx, y + dy);
      if (t) result.push(t);
    }
  }
  return result;
}

export function hasTech(player: PlayerState, techId: TechId): boolean {
  return player.techs.includes(techId);
}

export function canPassMountains(player: PlayerState): boolean {
  return player.techs.some((t) => TECH_DEFINITIONS[t]?.unlocksMountainPass === true);
}

export function getUnitEffectiveTraits(state: GameState, unit: Unit): UnitTrait[] {
  const base = UNIT_DEFINITIONS[unit.type].traits.slice();
  const owner = getPlayer(state, unit.ownerId);
  if (
    owner &&
    owner.faction === 'dwarves' &&
    unit.type === 'catapult' &&
    hasTech(owner, 'dwarves_siegecraft') &&
    !base.includes('fortify')
  ) {
    base.push('fortify');
  }
  return base;
}

export function unitHasTrait(state: GameState, unit: Unit, trait: UnitTrait): boolean {
  return getUnitEffectiveTraits(state, unit).includes(trait);
}

export function getUnitRange(state: GameState, unit: Unit): number {
  const base = UNIT_DEFINITIONS[unit.type].range;
  const owner = getPlayer(state, unit.ownerId);
  if (owner && unit.type === 'archer' && hasTech(owner, 'orcs_fell_volley')) {
    return Math.min(3, base + 1);
  }
  return base;
}

export function getUnitCost(state: GameState, playerId: PlayerId, unitType: UnitType): number {
  let cost = UNIT_DEFINITIONS[unitType].cost;
  const player = getPlayer(state, playerId);
  if (!player) return cost;
  if (unitType === 'catapult' && hasTech(player, 'orcs_siege_works')) {
    cost = Math.min(cost, 6);
  }
  if (unitType === 'catapult' && hasTech(player, 'dwarves_dragon_slayers')) {
    cost = Math.max(1, cost - 1);
  }
  if (unitType === 'uruk_berserker' && hasTech(player, 'orcs_black_gate')) {
    cost = Math.max(1, cost - 1);
  }
  return cost;
}

export function getUnitTrainMaxHp(
  state: GameState,
  playerId: PlayerId,
  unitType: UnitType,
): number {
  let maxHp = UNIT_DEFINITIONS[unitType].maxHp;
  const player = getPlayer(state, playerId);
  if (!player) return maxHp;
  if (unitType === 'defender' && hasTech(player, 'dwarves_shieldbearers')) {
    maxHp += 2;
  }
  if (unitType === 'catapult' && hasTech(player, 'dwarves_siegecraft')) {
    maxHp += 5;
  }
  if (
    (unitType === 'rider' || unitType === 'rohirrim_knight') &&
    hasTech(player, 'humans_ride_of_rohirrim')
  ) {
    maxHp += 3;
  }
  if (unitType === 'rider' && hasTech(player, 'orcs_pack_tactics')) {
    maxHp += 3;
  }
  if (unitType === 'uruk_berserker' && hasTech(player, 'orcs_black_gate')) {
    maxHp += 3;
  }
  if (unitType === 'elven_sentinel' && hasTech(player, 'elves_galadhrim_precision')) {
    maxHp += 3;
  }
  if (
    (unitType === 'ironbreaker' || unitType === 'defender') &&
    hasTech(player, 'dwarves_mithril_phalanx')
  ) {
    maxHp += 4;
  }
  if (unitType === 'catapult' && hasTech(player, 'dwarves_dragon_slayers')) {
    maxHp += 5;
  }
  return maxHp;
}

export function getCityUnitCap(state: GameState, city: City): number {
  const owner = getPlayer(state, city.ownerId);
  let cap = Math.min(4, city.level + 1);
  if (owner && hasTech(owner, 'humans_granaries') && city.level >= 3) {
    cap += 1;
  }
  if (owner && hasTech(owner, 'humans_stewards_citadel')) {
    cap += 1;
  }
  if (owner && hasTech(owner, 'orcs_war_barracks')) {
    cap += 1;
  }
  if (owner && hasTech(owner, 'dwarves_deep_vaults')) {
    cap += 1;
  }
  return cap;
}

export function getCityUnitCount(state: GameState, cityId: string): number {
  const city = state.cities[cityId];
  if (!city) return 0;
  let count = 0;
  for (const unit of Object.values(state.units)) {
    if (unit.ownerId === city.ownerId && unit.homeCityId === cityId) {
      count++;
    }
  }
  return count;
}

export function getTrainableUnits(state: GameState, cityId: string): UnitType[] {
  const city = state.cities[cityId];
  if (!city) return [];
  const owner = getPlayer(state, city.ownerId);
  if (!owner) return [];

  const unlocked = new Set<UnitType>(['warrior']);
  for (const techId of owner.techs) {
    const def = TECH_DEFINITIONS[techId];
    if (!def) continue;
    for (const u of def.unlocksUnits) {
      unlocked.add(u);
    }
  }

  return ALL_UNIT_TYPES.filter((t) => unlocked.has(t));
}

export function getTechCost(state: GameState, playerId: PlayerId, techId: TechId): number {
  const player = getPlayer(state, playerId);
  const tech = TECH_DEFINITIONS[techId];
  if (!player || !tech) return 999;

  const cityCount = Math.max(1, getPlayerCities(state, playerId).length);
  const base = tech.tier === 1 ? 3 : tech.tier === 2 ? 5 : 8;
  let cost = base + (cityCount - 1);

  if (hasTech(player, 'elves_elven_lore')) {
    cost = Math.max(2, cost - 1);
  }
  return cost;
}

export function canResearchTech(state: GameState, playerId: PlayerId, techId: TechId): boolean {
  const player = getPlayer(state, playerId);
  const tech = TECH_DEFINITIONS[techId];
  if (!player || !player.alive || !tech) return false;
  if (tech.faction !== player.faction) return false;
  if (hasTech(player, techId)) return false;
  if (!tech.prerequisites.every((prereq) => hasTech(player, prereq))) return false;
  return player.gold >= getTechCost(state, playerId, techId);
}

export function isCityBesieged(state: GameState, city: City): boolean {
  const tile = getTile(state, city.x, city.y);
  if (!tile || !tile.unitId) return false;
  const unit = state.units[tile.unitId];
  return unit !== undefined && unit.ownerId !== city.ownerId;
}

/**
 * Returns true if the tile at `(x, y)` is an unclaimed neutral Village
 * or an enemy City center that `playerId` can capture.
 */
export function isCapturableTileForPlayer(
  state: GameState,
  playerId: PlayerId,
  x: number,
  y: number,
): boolean {
  const tile = getTile(state, x, y);
  if (!tile) return false;
  if (tile.hasVillage && !tile.cityId) return true;
  if (tile.isCityCenter && tile.cityId) {
    const city = state.cities[tile.cityId];
    if (city && city.ownerId !== playerId) return true;
  }
  return false;
}

/**
 * Returns true if `unitId` can explicitly execute `CAPTURE_CITY` right now.
 * Requires the unit to have started the owner's turn on the capturable tile
 * (`canCapture === true`) and not yet moved, attacked, or finished its turn.
 */
export function canUnitCapture(state: GameState, unitId: string): boolean {
  const unit = state.units[unitId];
  if (!unit) return false;
  if (unit.canCapture !== true) return false;
  if (unit.actedThisTurn || unit.hasMoved || unit.hasAttacked) return false;
  const owner = getPlayer(state, unit.ownerId);
  if (!owner || !owner.alive) return false;
  return isCapturableTileForPlayer(state, unit.ownerId, unit.x, unit.y);
}

/**
 * Returns true if the tile at `(x, y)` holds unclaimed Ancient Ruins.
 */
export function isRuinsTile(state: GameState, x: number, y: number): boolean {
  const tile = getTile(state, x, y);
  return tile !== null && tile.resource === 'ruins';
}

/**
 * Returns true if `unitId` can explicitly execute `EXPLORE_RUINS` right now.
 * Requires the unit to have started the owner's turn on Ancient Ruins
 * (`canExploreRuins === true`) and not yet moved, attacked, or finished its turn.
 */
export function canUnitExploreRuins(state: GameState, unitId: string): boolean {
  const unit = state.units[unitId];
  if (!unit) return false;
  if (unit.canExploreRuins !== true) return false;
  if (unit.actedThisTurn || unit.hasMoved || unit.hasAttacked) return false;
  const owner = getPlayer(state, unit.ownerId);
  if (!owner || !owner.alive) return false;
  return isRuinsTile(state, unit.x, unit.y);
}

/**
 * Recomputes `connectedToCapital` for every city owned by `playerId`.
 * A city is connected if it is within Chebyshev distance 4 of an owned Capital
 * OR connected via a path of road/friendly-city tiles (8-directional) to an owned Capital.
 */
export function computeCapitalConnections(state: GameState, playerId: PlayerId): Set<string> {
  const ownedCities = getPlayerCities(state, playerId);
  const capitals = ownedCities.filter((c) => c.isCapital);
  const connected = new Set<string>();
  if (capitals.length === 0) return connected;

  // Direct distance <= 4 check
  for (const city of ownedCities) {
    if (city.isCapital) {
      connected.add(city.id);
      continue;
    }
    for (const cap of capitals) {
      if (chebyshevDist(city, cap) <= 4) {
        connected.add(city.id);
        break;
      }
    }
  }

  // BFS over road tiles and friendly city centers starting from capitals
  const visited = new Uint8Array(state.mapSize * state.mapSize);
  const queue: Coord[] = [];
  for (const cap of capitals) {
    const idx = tileIndex(cap.x, cap.y, state.mapSize);
    if (!visited[idx]) {
      visited[idx] = 1;
      queue.push({ x: cap.x, y: cap.y });
    }
  }

  let head = 0;
  while (head < queue.length) {
    const curr = queue[head++];
    const currTile = getTile(state, curr.x, curr.y);
    if (currTile && currTile.isCityCenter && currTile.cityId) {
      const c = state.cities[currTile.cityId];
      if (c && c.ownerId === playerId) {
        connected.add(c.id);
      }
    }

    for (const neighbor of getNeighbors8(state, curr.x, curr.y)) {
      const nIdx = tileIndex(neighbor.x, neighbor.y, state.mapSize);
      if (visited[nIdx]) continue;
      const isFriendlyCity =
        neighbor.isCityCenter &&
        neighbor.cityId !== null &&
        state.cities[neighbor.cityId]?.ownerId === playerId;
      const isEnemyCity =
        neighbor.isCityCenter &&
        neighbor.cityId !== null &&
        state.cities[neighbor.cityId]?.ownerId !== playerId;
      if (!isEnemyCity && (neighbor.hasRoad || isFriendlyCity)) {
        visited[nIdx] = 1;
        queue.push({ x: neighbor.x, y: neighbor.y });
      }
    }
  }

  return connected;
}

export function calculatePlayerIncome(state: GameState, playerId: PlayerId): number {
  const player = getPlayer(state, playerId);
  if (!player || !player.alive) return 0;

  const ownedCities = getPlayerCities(state, playerId);
  if (ownedCities.length === 0) return 0;

  let income = 0;
  const hasCapital = ownedCities.some((c) => c.isCapital && !isCityBesieged(state, c));
  if (hasCapital) {
    income += 1;
  }

  const connected =
    player.faction === 'humans' ? computeCapitalConnections(state, playerId) : null;

  const unbesiegedCityIds = new Set<string>();

  for (const city of ownedCities) {
    if (isCityBesieged(state, city)) continue;
    unbesiegedCityIds.add(city.id);

    income += city.level;
    if (city.hasWorkshop) income += 1;
    income += city.parks;

    // Humans Beacon Network: non-capital cities connected to Capital gain +1★/turn
    if (player.faction === 'humans' && !city.isCapital && connected?.has(city.id)) {
      income += 1;
    }

    // Humans Royal Granaries: Lv 3+ cities grant +1★/turn
    if (hasTech(player, 'humans_granaries') && city.level >= 3) {
      income += 1;
    }

    // Humans Citadel Masonry: walled cities grant +1★/turn
    if (hasTech(player, 'humans_citadel_masonry') && city.hasWalls) {
      income += 1;
    }

    // Humans Stewards' Citadel (T3): all cities gain +1★/turn
    if (hasTech(player, 'humans_stewards_citadel')) {
      income += 1;
    }

    // Dwarves Deep Vaults (T3): all cities gain +1★/turn
    if (hasTech(player, 'dwarves_deep_vaults')) {
      income += 1;
    }
  }

  // Tile-based city income (single pass over map tiles): Elves Woodland Grace + Mines + T3 capstones
  if (unbesiegedCityIds.size > 0) {
    const isElves = player.faction === 'elves';
    const hasMilling = hasTech(player, 'humans_milling');
    const hasMountDoom = hasTech(player, 'orcs_mount_doom');
    const hasLothlorienSanctum = hasTech(player, 'elves_lothlorien_sanctum');
    const hasHeartOfMountain = hasTech(player, 'dwarves_heart_of_mountain');
    const untouchedWoodsByCity: Record<string, number> = {};

    for (const tile of state.tiles) {
      if (!tile.cityId || !unbesiegedCityIds.has(tile.cityId)) continue;
      if (isElves && tile.terrain === 'ancient_woods' && tile.improvement === null) {
        untouchedWoodsByCity[tile.cityId] = (untouchedWoodsByCity[tile.cityId] ?? 0) + 1;
      }
      if (tile.improvement !== null) {
        income += IMPROVEMENT_DEFINITIONS[tile.improvement].goldPerTurn;

        // Humans Windmills (T3): Windmills grant +1★/turn per adjacent Farm
        if (tile.improvement === 'windmill' && hasMilling) {
          let adjFarms = 0;
          for (const n of getNeighbors8(state, tile.x, tile.y)) {
            if (n.improvement === 'farm') adjFarms++;
          }
          income += adjFarms;
        }

        // Orcs Mount Doom Furnaces (T3): Foundries grant +1★/turn
        if (tile.improvement === 'foundry' && hasMountDoom) {
          income += 1;
        }

        // Elves Lothlórien Sanctum (T3): Sanctuaries grant +1★/turn
        if (tile.improvement === 'sanctuary' && hasLothlorienSanctum) {
          income += 1;
        }

        // Dwarves Heart of the Mountain (T3): Mines +2★/turn (+1 extra), Great Forges +1★/turn
        if (hasHeartOfMountain) {
          if (tile.improvement === 'mine' || tile.improvement === 'great_forge') {
            income += 1;
          }
        }
      }
    }

    if (isElves) {
      const woodsCap = hasLothlorienSanctum ? 5 : 3;
      for (const cityId of unbesiegedCityIds) {
        const count = untouchedWoodsByCity[cityId] ?? 0;
        if (count > 0) {
          income += Math.min(woodsCap, count);
        }
      }
    }
  }

  return income;
}

export function calculatePlayerScore(state: GameState, playerId: PlayerId): number {
  const player = getPlayer(state, playerId);
  if (!player) return 0;

  let score = 0;
  const ownedCities = getPlayerCities(state, playerId);
  for (const city of ownedCities) {
    score += 100;
    score += 50 * city.level;
    score += 250 * city.parks;
  }

  for (let i = 0; i < player.revealedTiles.length; i++) {
    if (player.revealedTiles[i]) score += 10;
  }

  for (const techId of player.techs) {
    const def = TECH_DEFINITIONS[techId];
    if (def) {
      score += def.tier === 1 ? 100 : def.tier === 2 ? 200 : 350;
    }
  }

  // Elves Rings of Preservation (T3): +100 Glory per researched tech
  if (hasTech(player, 'elves_rings_preservation')) {
    score += player.techs.length * 100;
  }

  const ownedUnits = getPlayerUnits(state, playerId);
  score += ownedUnits.length * 25;

  return score;
}

/**
 * Computes live Glory leaderboard entries for every player, sorted descending by
 * `score` (tie-break by `citiesCount` descending, then non-eliminated first)
 * with 1-based `rank` assigned.
 */
export function getLeaderboard(state: GameState): LeaderboardEntry[] {
  const entries: LeaderboardEntry[] = state.players.map((player) => ({
    playerId: player.id,
    faction: player.faction,
    name: player.name,
    score: calculatePlayerScore(state, player.id),
    citiesCount: getPlayerCities(state, player.id).length,
    unitsCount: getPlayerUnits(state, player.id).length,
    techsCount: player.techs.length,
    isEliminated: !player.alive,
    isHuman: player.isHuman,
    rank: 0,
  }));

  entries.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.citiesCount !== a.citiesCount) return b.citiesCount - a.citiesCount;
    if (a.isEliminated !== b.isEliminated) return a.isEliminated ? 1 : -1;
    return 0;
  });

  for (let i = 0; i < entries.length; i++) {
    entries[i].rank = i + 1;
  }

  return entries;
}

function isTilePassableForUnit(player: PlayerState, tile: Tile): boolean {
  if (tile.terrain === 'water') return false;
  if (tile.terrain === 'mountain' && !canPassMountains(player)) return false;
  return true;
}

function isAdjacentToEnemy(
  state: GameState,
  ownerId: PlayerId,
  x: number,
  y: number,
): boolean {
  for (const n of getNeighbors8(state, x, y)) {
    if (n.unitId !== null) {
      const u = state.units[n.unitId];
      if (u && u.ownerId !== ownerId) return true;
    }
  }
  return false;
}

export function getValidMoves(state: GameState, unitId: string): Coord[] {
  const unit = state.units[unitId];
  if (!unit) return [];
  if (unit.actedThisTurn) return [];
  if (unit.hasMoved && !unit.canEscapeMove) return [];
  if (unit.hasAttacked && !unit.canEscapeMove) return [];

  const owner = getPlayer(state, unit.ownerId);
  if (!owner || !owner.alive) return [];

  const startTile = getTile(state, unit.x, unit.y);
  if (!startTile) return [];

  let maxMp = UNIT_DEFINITIONS[unit.type].movement;
  // Humans Beacon Network: units starting on a Road get +1 MOV
  if (owner.faction === 'humans' && startTile.hasRoad) {
    maxMp += 1;
  }
  // Humans Ride of the Rohirrim (T3): Riders & Rohirrim Knights gain +1 MOV
  if (
    hasTech(owner, 'humans_ride_of_rohirrim') &&
    (unit.type === 'rider' || unit.type === 'rohirrim_knight')
  ) {
    maxMp += 1;
  }

  const size = state.mapSize;
  const bestRem = new Int8Array(size * size);
  bestRem.fill(-1);

  const startIdx = tileIndex(unit.x, unit.y, size);
  bestRem[startIdx] = maxMp;

  const queue: { x: number; y: number; rem: number }[] = [
    { x: unit.x, y: unit.y, rem: maxMp },
  ];
  const reachable: Coord[] = [];
  const added = new Uint8Array(size * size);

  while (queue.length > 0) {
    // Small graph (maxMp <= 4), linear pop of highest remaining MP keeps Dijkstra exact
    let bestIdx = 0;
    for (let i = 1; i < queue.length; i++) {
      if (queue[i].rem > queue[bestIdx].rem) bestIdx = i;
    }
    const curr = queue.splice(bestIdx, 1)[0];
    const currIdx = tileIndex(curr.x, curr.y, size);
    if (curr.rem < bestRem[currIdx]) continue;
    if (curr.rem <= 0) continue;

    // Zone of control: entering a tile adjacent to an enemy ends further movement
    const isStart = curr.x === unit.x && curr.y === unit.y;
    if (!isStart && isAdjacentToEnemy(state, unit.ownerId, curr.x, curr.y)) {
      continue;
    }

    for (const next of getNeighbors8(state, curr.x, curr.y)) {
      const nIdx = tileIndex(next.x, next.y, size);
      // Never allow moving into or traversing through cloud-covered (unrevealed) tiles
      if (!owner.revealedTiles[nIdx]) continue;

      if (!isTilePassableForUnit(owner, next)) continue;

      // Cannot pass through or land on enemy units
      if (next.unitId !== null) {
        const occ = state.units[next.unitId];
        if (occ && occ.ownerId !== unit.ownerId) continue;
      }

      // Compute movement cost
      let nextRem = curr.rem - 1;
      const isForest = next.terrain === 'forest' || next.terrain === 'ancient_woods';
      if (next.terrain === 'mountain') {
        nextRem = 0; // Mountains stop movement
      } else if (isForest && owner.faction !== 'elves' && !next.hasRoad) {
        nextRem = 0; // Forests stop movement unless Elves or Road
      }

      // Can land on empty tile
      if (next.unitId === null && !added[nIdx]) {
        added[nIdx] = 1;
        reachable.push({ x: next.x, y: next.y });
      }

      // Can continue traversing if remaining MP > bestRem
      if (nextRem > bestRem[nIdx]) {
        bestRem[nIdx] = nextRem;
        queue.push({ x: next.x, y: next.y, rem: nextRem });
      }
    }
  }

  return reachable;
}

export function getValidAttackTargets(state: GameState, unitId: string): Coord[] {
  const unit = state.units[unitId];
  if (!unit) return [];
  if (unit.actedThisTurn) return [];
  if (unit.hasAttacked && !unit.canPersistAttack) return [];
  if (unit.canEscapeMove) return [];

  // Units without Dash cannot attack after moving (e.g., Defender, Catapult)
  if (unit.hasMoved && !unitHasTrait(state, unit, 'dash')) {
    return [];
  }

  const owner = getPlayer(state, unit.ownerId);
  if (!owner || !owner.alive) return [];

  const range = getUnitRange(state, unit);
  const targets: Coord[] = [];
  for (const other of Object.values(state.units)) {
    if (other.ownerId === unit.ownerId) continue;
    const dist = chebyshevDist(unit, other);
    if (dist < 1 || dist > range) continue;
    const idx = tileIndex(other.x, other.y, state.mapSize);
    if (!owner.revealedTiles[idx]) continue;
    targets.push({ x: other.x, y: other.y });
  }

  return targets;
}

/**
 * Authoritative check for whether `unitId` has any remaining legal action this turn
 * (capture, explore ruins, move/escape, attack/dash/persist, recover, or veteran promotion).
 */
export function hasUnitRemainingActions(state: GameState, unitId: string): boolean {
  if (state.phase === 'game_over') return false;
  const unit = state.units[unitId];
  if (!unit || unit.actedThisTurn) return false;
  const owner = getPlayer(state, unit.ownerId);
  if (!owner || !owner.alive) return false;

  if (canUnitCapture(state, unit.id) || canUnitExploreRuins(state, unit.id)) {
    return true;
  }
  if ((!unit.hasMoved || unit.canEscapeMove) && getValidMoves(state, unit.id).length > 0) {
    return true;
  }
  if (
    (!unit.hasAttacked || unit.canPersistAttack) &&
    getValidAttackTargets(state, unit.id).length > 0
  ) {
    return true;
  }
  if (!unit.hasMoved && !unit.hasAttacked && unit.hp < unit.maxHp) {
    return true;
  }
  if ((unit.canPromote || unit.kills >= 3) && !unit.isVeteran) {
    return true;
  }
  return false;
}

export function getImprovementPopGain(
  state: GameState,
  x: number,
  y: number,
  improvement: ImprovementType,
): number {
  const def = IMPROVEMENT_DEFINITIONS[improvement];
  let pop = def.basePop;
  if (def.adjacentBonusTo && def.adjacentPopPerMatch) {
    let matches = 0;
    for (const n of getNeighbors8(state, x, y)) {
      if (n.improvement === def.adjacentBonusTo) {
        matches++;
      }
    }
    pop += matches * def.adjacentPopPerMatch;
  }
  return pop;
}

export function getAvailableTileActions(
  state: GameState,
  playerId: PlayerId,
  x: number,
  y: number,
): GameAction[] {
  const player = getPlayer(state, playerId);
  const tile = getTile(state, x, y);
  if (!player || !player.alive || !tile) return [];

  const idx = tileIndex(x, y, state.mapSize);
  if (!player.revealedTiles[idx]) return [];

  const actions: GameAction[] = [];
  const owningCity = tile.cityId ? state.cities[tile.cityId] : null;
  const isFriendlyBorder = owningCity !== null && owningCity.ownerId === playerId;
  const isNeutral = tile.cityId === null;

  // 1. Harvest Resource (inside friendly borders)
  if (
    isFriendlyBorder &&
    tile.resource !== null &&
    tile.resource !== 'ruins' &&
    player.gold >= HARVEST_COST
  ) {
    const unlocked = player.techs.some((t) =>
      TECH_DEFINITIONS[t]?.unlocksResources.includes(tile.resource!),
    );
    if (unlocked) {
      actions.push({ type: 'HARVEST_TILE', coord: { x, y } });
    }
  }

  // 2. Build Improvement (inside friendly borders, non-city-center, no existing improvement)
  if (
    isFriendlyBorder &&
    !tile.isCityCenter &&
    tile.improvement === null &&
    tile.resource !== 'ruins'
  ) {
    const unlockedImps = new Set<ImprovementType>();
    for (const t of player.techs) {
      for (const imp of TECH_DEFINITIONS[t]?.unlocksImprovements ?? []) {
        unlockedImps.add(imp);
      }
    }
    for (const imp of unlockedImps) {
      const def = IMPROVEMENT_DEFINITIONS[imp];
      if (!def.allowedTerrains.includes(tile.terrain)) continue;
      if (player.gold < def.cost) continue;
      actions.push({ type: 'BUILD_IMPROVEMENT', coord: { x, y }, improvement: imp });
    }
  }

  // 3. Build Road (friendly or neutral non-water/non-mountain tile, not city center, no road yet)
  if (
    (isFriendlyBorder || isNeutral) &&
    !tile.hasRoad &&
    !tile.isCityCenter &&
    tile.terrain !== 'water' &&
    tile.terrain !== 'mountain' &&
    player.gold >= ROAD_COST
  ) {
    const roadUnlocked = player.techs.some((t) => TECH_DEFINITIONS[t]?.unlocksRoad === true);
    if (roadUnlocked) {
      actions.push({ type: 'BUILD_ROAD', coord: { x, y } });
    }
  }

  // 4. Chop Forest (Orcs Clear-Cutting: 0★ -> +2★, friendly borders)
  if (
    isFriendlyBorder &&
    !tile.isCityCenter &&
    (tile.terrain === 'forest' || tile.terrain === 'ancient_woods')
  ) {
    const chopUnlocked = player.techs.some((t) => TECH_DEFINITIONS[t]?.unlocksChopForest === true);
    if (chopUnlocked) {
      actions.push({ type: 'CHOP_FOREST', coord: { x, y } });
    }
  }

  // 5. Plant Ancient Woods (Elves Tree-Spire Singing: 3★ -> +1 Pop on Plains, friendly borders)
  if (
    isFriendlyBorder &&
    !tile.isCityCenter &&
    tile.terrain === 'plains' &&
    tile.improvement === null &&
    tile.resource === null &&
    player.gold >= PLANT_WOODS_COST
  ) {
    const plantUnlocked = player.techs.some((t) => TECH_DEFINITIONS[t]?.unlocksPlantWoods === true);
    if (plantUnlocked) {
      actions.push({ type: 'PLANT_ANCIENT_WOODS', coord: { x, y } });
    }
  }

  return actions;
}

const RESOURCE_LABELS: Record<ResourceType, { label: string; icon: string }> = {
  berries: { label: 'Berries', icon: '🫐' },
  game: { label: 'Game', icon: '🦌' },
  ore: { label: 'Ore', icon: '⛏️' },
  mithril: { label: 'Starsteel', icon: '💎' },
  ruins: { label: 'Ruins', icon: '🏛️' },
};

const IMPROVEMENT_ICONS: Record<ImprovementType, string> = {
  farm: '🌾',
  windmill: '🌬️',
  slag_pit: '🕳️',
  foundry: '🔥',
  sanctuary: '🌿',
  mine: '⛏️',
  great_forge: '⚒️',
};

const UNIT_ICONS: Record<UnitType, string> = {
  warrior: '⚔️',
  defender: '🛡️',
  archer: '🏹',
  rider: '🐎',
  catapult: '🪨',
  rohirrim_knight: '🐴',
  uruk_berserker: '🪓',
  elven_sentinel: '🌟',
  ironbreaker: '⚒️',
};

/**
 * Returns ALL contextually relevant tile actions (enabled and disabled) with
 * crisp `disabledReason` strings so the UI never silently hides actions.
 */
export function getTileActionOptions(
  state: GameState,
  playerId: PlayerId,
  x: number,
  y: number,
): ActionOption[] {
  const player = getPlayer(state, playerId);
  const tile = getTile(state, x, y);
  if (!player || !player.alive || !tile) return [];

  const idx = tileIndex(x, y, state.mapSize);
  if (!player.revealedTiles[idx]) return [];

  const options: ActionOption[] = [];
  const factionTechs = getFactionTechs(player.faction);
  const owningCity = tile.cityId ? state.cities[tile.cityId] : null;
  const isFriendlyBorder = owningCity !== null && owningCity.ownerId === playerId;
  const isNeutral = tile.cityId === null;

  // 1. Harvest Resource
  if (tile.resource !== null && tile.resource !== 'ruins') {
    const res = tile.resource;
    const unlockTech = factionTechs.find((t) => t.unlocksResources.includes(res));
    if (unlockTech) {
      const meta = RESOURCE_LABELS[res];
      const pop = RESOURCE_POP_GAIN[res];
      let disabledReason: string | undefined;
      if (!isFriendlyBorder) {
        disabledReason = 'Outside your borders';
      } else if (!hasTech(player, unlockTech.id)) {
        disabledReason = `Requires ${unlockTech.name}`;
      } else if (player.gold < HARVEST_COST) {
        disabledReason = `Need ${HARVEST_COST}★ (have ${player.gold}★)`;
      }
      options.push({
        id: `harvest_${res}`,
        label: `Harvest ${meta.label}`,
        description: `+${pop} Pop to city`,
        cost: HARVEST_COST,
        icon: meta.icon,
        enabled: !disabledReason,
        disabledReason,
        action: !disabledReason ? { type: 'HARVEST_TILE', coord: { x, y } } : undefined,
      });
    }
  }

  // 2. Build Improvement (contextually relevant for this tile's terrain)
  if (!tile.isCityCenter && tile.improvement === null && tile.resource !== 'ruins') {
    const seenImps = new Set<ImprovementType>();
    for (const tech of factionTechs) {
      for (const imp of tech.unlocksImprovements) {
        if (seenImps.has(imp)) continue;
        const def = IMPROVEMENT_DEFINITIONS[imp];
        if (!def.allowedTerrains.includes(tile.terrain)) continue;
        seenImps.add(imp);

        const popGain = getImprovementPopGain(state, x, y, imp);
        let disabledReason: string | undefined;
        if (!isFriendlyBorder) {
          disabledReason = 'Outside your borders';
        } else if (!hasTech(player, tech.id)) {
          disabledReason = `Requires ${tech.name}`;
        } else if (player.gold < def.cost) {
          disabledReason = `Need ${def.cost}★ (have ${player.gold}★)`;
        }

        const adjFarmsForWindmill =
          imp === 'windmill' && hasTech(player, 'humans_milling')
            ? getNeighbors8(state, x, y).filter((n) => n.improvement === 'farm').length
            : 0;
        const extraGold =
          def.goldPerTurn +
          adjFarmsForWindmill +
          (imp === 'mine' && hasTech(player, 'dwarves_heart_of_mountain') ? 1 : 0) +
          (imp === 'great_forge' && hasTech(player, 'dwarves_heart_of_mountain') ? 1 : 0) +
          (imp === 'foundry' && hasTech(player, 'orcs_mount_doom') ? 1 : 0) +
          (imp === 'sanctuary' && hasTech(player, 'elves_lothlorien_sanctum') ? 1 : 0);
        const descParts: string[] = [];
        if (popGain > 0) descParts.push(`+${popGain} Pop`);
        if (extraGold > 0) descParts.push(`+${extraGold}★/turn`);
        const description = descParts.length > 0 ? descParts.join(', ') : def.description;

        options.push({
          id: `build_${imp}`,
          label: `Build ${def.name}`,
          description,
          cost: def.cost,
          icon: IMPROVEMENT_ICONS[imp],
          enabled: !disabledReason,
          disabledReason,
          action: !disabledReason
            ? { type: 'BUILD_IMPROVEMENT', coord: { x, y }, improvement: imp }
            : undefined,
        });
      }
    }
  }

  // 3. Build Road
  const roadTech = factionTechs.find((t) => t.unlocksRoad === true);
  if (
    roadTech &&
    !tile.hasRoad &&
    !tile.isCityCenter &&
    tile.terrain !== 'water' &&
    tile.terrain !== 'mountain'
  ) {
    let disabledReason: string | undefined;
    if (!(isFriendlyBorder || isNeutral)) {
      disabledReason = 'Enemy territory';
    } else if (!hasTech(player, roadTech.id)) {
      disabledReason = `Requires ${roadTech.name}`;
    } else if (player.gold < ROAD_COST) {
      disabledReason = `Need ${ROAD_COST}★ (have ${player.gold}★)`;
    }
    options.push({
      id: 'build_road',
      label: 'Build Road',
      description: 'Connects cities & boosts movement',
      cost: ROAD_COST,
      icon: '🛤️',
      enabled: !disabledReason,
      disabledReason,
      action: !disabledReason ? { type: 'BUILD_ROAD', coord: { x, y } } : undefined,
    });
  }

  // 4. Chop Forest (Orcs Clear-Cutting)
  const chopTech = factionTechs.find((t) => t.unlocksChopForest === true);
  if (
    chopTech &&
    !tile.isCityCenter &&
    (tile.terrain === 'forest' || tile.terrain === 'ancient_woods')
  ) {
    let disabledReason: string | undefined;
    if (!isFriendlyBorder) {
      disabledReason = 'Outside your borders';
    } else if (!hasTech(player, chopTech.id)) {
      disabledReason = `Requires ${chopTech.name}`;
    }
    options.push({
      id: 'chop_forest',
      label: 'Chop Forest',
      description: `Clear woods for +${CHOP_FOREST_GOLD}★`,
      cost: 0,
      icon: '🪓',
      enabled: !disabledReason,
      disabledReason,
      action: !disabledReason ? { type: 'CHOP_FOREST', coord: { x, y } } : undefined,
    });
  }

  // 5. Plant Ancient Woods (Elves Tree-Spire Singing)
  const plantTech = factionTechs.find((t) => t.unlocksPlantWoods === true);
  if (
    plantTech &&
    !tile.isCityCenter &&
    tile.terrain === 'plains' &&
    tile.improvement === null &&
    tile.resource === null
  ) {
    let disabledReason: string | undefined;
    if (!isFriendlyBorder) {
      disabledReason = 'Outside your borders';
    } else if (!hasTech(player, plantTech.id)) {
      disabledReason = `Requires ${plantTech.name}`;
    } else if (player.gold < PLANT_WOODS_COST) {
      disabledReason = `Need ${PLANT_WOODS_COST}★ (have ${player.gold}★)`;
    }
    options.push({
      id: 'plant_ancient_woods',
      label: 'Plant Ancient Woods',
      description: '+1 Pop & +1★/turn Woodland Grace',
      cost: PLANT_WOODS_COST,
      icon: '🌳',
      enabled: !disabledReason,
      disabledReason,
      action: !disabledReason ? { type: 'PLANT_ANCIENT_WOODS', coord: { x, y } } : undefined,
    });
  }

  return options;
}

/**
 * Returns ALL 6 faction-available unit types (5 base + faction unique unit)
 * for a city, with `enabled` and exact `disabledReason`.
 */
export function getCityTrainOptions(state: GameState, cityId: string): ActionOption[] {
  const city = state.cities[cityId];
  if (!city) return [];
  const owner = getPlayer(state, city.ownerId);
  if (!owner) return [];

  const factionDef = FACTION_DEFINITIONS[owner.faction];
  const factionTechs = getFactionTechs(owner.faction);
  const unitTypes: UnitType[] = [...BASE_UNIT_TYPES, factionDef.uniqueUnit];

  const tile = getTile(state, city.x, city.y);
  const isOccupied = !tile || tile.unitId !== null;
  const unitCount = getCityUnitCount(state, city.id);
  const unitCap = getCityUnitCap(state, city);
  const atCap = unitCount >= unitCap;
  const trainable = new Set(getTrainableUnits(state, city.id));

  return unitTypes.map((unitType) => {
    const def = UNIT_DEFINITIONS[unitType];
    const cost = getUnitCost(state, owner.id, unitType);
    const maxHp = getUnitTrainMaxHp(state, owner.id, unitType);

    let disabledReason: string | undefined;
    if (!trainable.has(unitType)) {
      const unlockTech = factionTechs.find((t) => t.unlocksUnits.includes(unitType));
      disabledReason = unlockTech ? `Requires ${unlockTech.name}` : 'Locked';
    } else if (isOccupied) {
      disabledReason = 'City tile occupied';
    } else if (atCap) {
      disabledReason = `Unit cap reached (${unitCount}/${unitCap})`;
    } else if (owner.gold < cost) {
      disabledReason = `Need ${cost}★ (have ${owner.gold}★)`;
    }

    return {
      id: `train_${unitType}`,
      label: def.name,
      description: `${maxHp} HP · ${def.attack} ATK · ${def.defense} DEF · ${def.movement} MOV`,
      cost,
      icon: UNIT_ICONS[unitType],
      unitType,
      enabled: !disabledReason,
      disabledReason,
      action: !disabledReason ? { type: 'TRAIN_UNIT', cityId: city.id, unitType } : undefined,
    };
  });
}

/**
 * Returns unit actions (`Claim Village`/`Capture City` when on a capturable tile,
 * plus `Recover` and `Promote to Veteran`) with exact disabled reasons.
 */
export function getUnitActionOptions(state: GameState, unitId: string): ActionOption[] {
  const unit = state.units[unitId];
  if (!unit) return [];
  const owner = getPlayer(state, unit.ownerId);
  if (!owner) return [];

  const tile = getTile(state, unit.x, unit.y);
  const options: ActionOption[] = [];

  if (tile && isCapturableTileForPlayer(state, owner.id, unit.x, unit.y)) {
    const isVillage = tile.hasVillage && !tile.cityId;
    const readyToCapture = canUnitCapture(state, unit.id);
    options.push({
      id: 'capture-city',
      label: isVillage ? 'Claim Village' : 'Capture City',
      description: isVillage
        ? 'Found a new city (ends unit turn)'
        : 'Seize enemy city (ends unit turn)',
      icon: 'crown',
      enabled: readyToCapture,
      disabledReason: readyToCapture ? undefined : 'Capture next turn',
      action: readyToCapture ? { type: 'CAPTURE_CITY', unitId: unit.id } : undefined,
    });
  }

  if (tile && tile.resource === 'ruins') {
    const readyToExplore = canUnitExploreRuins(state, unit.id);
    options.push({
      id: 'explore-ruins',
      label: 'Explore Ruins',
      description: 'Claim ancient treasure',
      icon: 'ruins',
      enabled: readyToExplore,
      disabledReason: readyToExplore ? undefined : 'Explore next turn',
      action: readyToExplore ? { type: 'EXPLORE_RUINS', unitId: unit.id } : undefined,
    });
  }

  const inFriendlyBorders =
    tile !== null &&
    tile.cityId !== null &&
    state.cities[tile.cityId]?.ownerId === owner.id;
  const healAmount = inFriendlyBorders ? 4 : 2;

  let recoverReason: string | undefined;
  if (unit.hp >= unit.maxHp) {
    recoverReason = 'Full HP';
  } else if (unit.hasMoved || unit.hasAttacked || unit.actedThisTurn) {
    recoverReason = 'Already acted';
  }

  let promoteReason: string | undefined;
  if (unit.isVeteran) {
    promoteReason = 'Already Veteran';
  } else if (!unit.canPromote && unit.kills < 3) {
    promoteReason = `Kills: ${unit.kills}/3`;
  }

  options.push(
    {
      id: 'recover',
      label: 'Recover',
      description: `Heal +${healAmount} HP (ends unit turn)`,
      icon: '💚',
      enabled: !recoverReason,
      disabledReason: recoverReason,
      action: !recoverReason ? { type: 'RECOVER_UNIT', unitId: unit.id } : undefined,
    },
    {
      id: 'promote',
      label: 'Promote to Veteran',
      description: '+5 maxHP & full heal',
      icon: '⭐',
      enabled: !promoteReason,
      disabledReason: promoteReason,
      action: !promoteReason ? { type: 'PROMOTE_UNIT', unitId: unit.id } : undefined,
    },
  );

  return options;
}
