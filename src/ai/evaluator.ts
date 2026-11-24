import {
  FACTION_DEFINITIONS,
  IMPROVEMENT_DEFINITIONS,
  TECH_DEFINITIONS,
  UNIT_DEFINITIONS,
  canUnitCapture,
  canUnitExploreRuins,
  getFactionTechs,
  getTile,
  getUnitRange,
  predictCombat,
  tileIndex,
  type City,
  type CityRewardChoice,
  type Coord,
  type GameAction,
  type GameState,
  type PlayerState,
  type TechId,
  type Tile,
  type Unit,
  type UnitType,
} from '../game/index';
import type { DifficultyConfig, FactionAIProfile } from './types';

export interface SpatialContext {
  player: PlayerState;
  ownCities: City[];
  ownCapital: City | null;
  enemyCities: City[];
  humanCapital: City | null;
  neutralVillages: Coord[];
  ruins: Coord[];
  ownUnits: Unit[];
  enemyUnits: Unit[];
  /** Number of enemy units within Chebyshev distance 3 of each owned city ID. */
  cityThreats: Record<string, number>;
  /** Total enemy units within distance 4 of any owned city. */
  totalThreat: number;
  /** Fraction of map tiles revealed by this player (0..1). */
  revealedRatio: number;
}

export function chebyshev(a: Coord, b: Coord): number {
  return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
}

/** Fast deterministic hash in [0, 1) for tie-breaking and difficulty noise. */
export function deterministicUnitFloat(seed: number, salt: number): number {
  let h = (seed ^ Math.imul(salt + 1, 0x9e3779b1)) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x85ebca6b) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35) >>> 0;
  h = (h ^ (h >>> 16)) >>> 0;
  return h / 4294967296;
}

export function noiseOffset(seed: number, salt: number, range: number): number {
  if (range <= 0) return 0;
  return (deterministicUnitFloat(seed, salt) * 2 - 1) * range;
}

export function buildSpatialContext(state: GameState, playerId: string): SpatialContext {
  const player = state.players.find((p) => p.id === playerId)!;
  const ownCities: City[] = [];
  const enemyCities: City[] = [];
  let ownCapital: City | null = null;
  let humanCapital: City | null = null;

  const humanPlayer = state.players.find((p) => p.isHuman);
  const humanId = humanPlayer?.id ?? null;

  for (const city of Object.values(state.cities)) {
    if (city.ownerId === playerId) {
      ownCities.push(city);
      if (city.isCapital) ownCapital = city;
    } else {
      const idx = tileIndex(city.x, city.y, state.mapSize);
      if (player.revealedTiles[idx]) {
        enemyCities.push(city);
      }
      if (city.ownerId === humanId && city.isCapital) {
        humanCapital = city;
      }
    }
  }

  const ownUnits: Unit[] = [];
  const enemyUnits: Unit[] = [];
  for (const unit of Object.values(state.units)) {
    if (unit.ownerId === playerId) {
      ownUnits.push(unit);
    } else {
      const idx = tileIndex(unit.x, unit.y, state.mapSize);
      if (player.revealedTiles[idx]) {
        enemyUnits.push(unit);
      }
    }
  }

  const neutralVillages: Coord[] = [];
  const ruins: Coord[] = [];
  let revealedCount = 0;

  for (let i = 0; i < state.tiles.length; i++) {
    const isRev = player.revealedTiles[i];
    if (isRev) {
      revealedCount++;
      const t = state.tiles[i];
      if (t.hasVillage && !t.cityId) {
        neutralVillages.push({ x: t.x, y: t.y });
      }
      if (t.resource === 'ruins') {
        ruins.push({ x: t.x, y: t.y });
      }
    }
  }

  const cityThreats: Record<string, number> = {};
  let totalThreat = 0;
  for (const city of ownCities) {
    let threat = 0;
    for (const enemy of enemyUnits) {
      const d = chebyshev(city, enemy);
      if (d <= 3) threat++;
      if (d <= 4) totalThreat++;
    }
    cityThreats[city.id] = threat;
  }

  return {
    player,
    ownCities,
    ownCapital,
    enemyCities,
    humanCapital,
    neutralVillages,
    ruins,
    ownUnits,
    enemyUnits,
    cityThreats,
    totalThreat,
    revealedRatio: revealedCount / Math.max(1, state.tiles.length),
  };
}

/** Pick the best city reward when a city levels up. */
export function chooseCityReward(
  state: GameState,
  city: City,
  levelReached: number,
  ctx: SpatialContext,
  profile: FactionAIProfile,
): CityRewardChoice {
  if (levelReached === 2) {
    // Explorer if map is very dark and faction favors tempo/vision; otherwise Workshop (+1★/turn)
    if (ctx.revealedRatio < 0.22 && (profile.faction === 'orcs' || profile.faction === 'elves')) {
      return 'explorer';
    }
    return 'workshop';
  }
  if (levelReached === 3) {
    const threatened = (ctx.cityThreats[city.id] ?? 0) > 0;
    if (
      !city.hasWalls &&
      (threatened || city.isCapital || profile.faction === 'dwarves' || profile.faction === 'humans')
    ) {
      return 'city_wall';
    }
    return 'resources';
  }
  if (levelReached === 4) {
    // Border growth is awesome if there are unclaimed tiles with resources/forests/mountains in 5x5
    let valuableOuterTiles = 0;
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) continue;
        const t = getTile(state, city.x + dx, city.y + dy);
        if (t && !t.cityId && t.terrain !== 'water') {
          if (
            t.resource ||
            (profile.faction === 'elves' && t.terrain === 'ancient_woods') ||
            (profile.faction === 'dwarves' && t.terrain === 'mountain')
          ) {
            valuableOuterTiles++;
          }
        }
      }
    }
    return valuableOuterTiles >= 2 ? 'border_growth' : 'pop_growth';
  }
  // Lv 5+: Champion (free Veteran unique unit) vs Park (+250 Glory & +1★/turn)
  const centerTile = getTile(state, city.x, city.y);
  const canSpawnChampion = centerTile !== null && centerTile.unitId === null;
  if (canSpawnChampion && state.turn < state.config.maxTurns - 3) {
    return 'champion';
  }
  return 'park';
}

/** Score researching a specific tech. */
export function scoreTech(
  state: GameState,
  techId: TechId,
  cost: number,
  ctx: SpatialContext,
  profile: FactionAIProfile,
): number {
  const tech = TECH_DEFINITIONS[techId];
  const factionDef = FACTION_DEFINITIONS[ctx.player.faction];
  let score = 16 + (profile.techBonuses[techId] ?? 0);

  // Count immediately usable resources & improvements inside owned cities
  let matchingResources = 0;
  let matchingImprovementTiles = 0;
  for (const t of state.tiles) {
    if (!t.cityId) continue;
    const city = state.cities[t.cityId];
    if (!city || city.ownerId !== ctx.player.id) continue;
    if (t.resource && tech.unlocksResources.includes(t.resource)) {
      matchingResources++;
    }
    if (!t.improvement && !t.isCityCenter) {
      for (const imp of tech.unlocksImprovements) {
        if (IMPROVEMENT_DEFINITIONS[imp].allowedTerrains.includes(t.terrain)) {
          matchingImprovementTiles++;
          break;
        }
      }
    }
  }

  score += matchingResources * 13;
  score += Math.min(matchingImprovementTiles, 4) * 7;

  if (tech.unlocksUnits.includes(factionDef.uniqueUnit)) {
    score += 34 * profile.uniqueUnitWeight;
  } else if (tech.unlocksUnits.length > 0) {
    score += 14 + (ctx.totalThreat > 0 ? 8 : 0);
  }

  if (tech.unlocksMountainPass) {
    score += 8;
  }
  if (tech.unlocksChopForest && ctx.player.gold < 6) {
    score += 12;
  }
  if (tech.unlocksPlantWoods) {
    score += 14;
  }
  if (techId === 'elves_elven_lore') {
    // Early tech discount snowballs nicely
    const remainingTechs = getFactionTechs(ctx.player.faction).length - ctx.player.techs.length;
    score += remainingTechs * 4;
  }

  // Tier 2 focused economic / military synergies
  if (techId === 'humans_granaries') {
    score += ctx.ownCities.filter((c) => c.level >= 3).length * 8;
  } else if (techId === 'humans_citadel_masonry') {
    score += ctx.ownCities.filter((c) => c.hasWalls).length * 7;
  } else if (techId === 'orcs_war_barracks') {
    score += ctx.ownCities.length * 6;
  } else if (techId === 'orcs_spoils_mastery') {
    score += 10 + ctx.enemyUnits.length * 3;
  } else if (techId === 'dwarves_stone_walls') {
    score += ctx.ownCities.filter((c) => c.level >= 2 && !c.hasWalls).length * 8;
  } else if (techId === 'dwarves_runic_plate') {
    score += ctx.ownUnits.length * 4;
  }

  // Tier 3 Capstone strategic bonuses
  if (tech.tier === 3) {
    score += 20;
    if (techId === 'humans_stewards_citadel' || techId === 'dwarves_deep_vaults') {
      score += ctx.ownCities.length * 7;
    } else if (techId === 'humans_milling') {
      score += ctx.ownCities.length * 5;
    } else if (techId === 'humans_ride_of_rohirrim' || techId === 'orcs_pack_tactics') {
      const cavCount = ctx.ownUnits.filter(
        (u) => u.type === 'rider' || u.type === 'rohirrim_knight',
      ).length;
      score += cavCount * 6;
    } else if (techId === 'orcs_black_gate') {
      score += ctx.ownUnits.length * 4 + 8;
    } else if (techId === 'orcs_fell_volley') {
      score += 10 + ctx.enemyUnits.length * 3;
    } else if (
      techId === 'elves_lothlorien_sanctum' ||
      techId === 'dwarves_heart_of_mountain' ||
      techId === 'orcs_mount_doom'
    ) {
      score += ctx.ownCities.length * 6;
    } else if (
      techId === 'elves_galadhrim_precision' ||
      techId === 'dwarves_mithril_phalanx' ||
      techId === 'dwarves_dragon_slayers' ||
      techId === 'humans_siegecraft' ||
      techId === 'elves_wind_riders'
    ) {
      score += ctx.ownUnits.length * 4;
    } else if (techId === 'elves_rings_preservation') {
      score += ctx.player.techs.length * 4;
    }
  }

  // Glory value: T1 = 100pts, T2 = 200pts, T3 = 350pts (more appealing late game)
  if (state.turn >= state.config.maxTurns - 6) {
    score += tech.tier === 3 ? 36 : tech.tier === 2 ? 22 : 12;
    if (techId === 'elves_rings_preservation') {
      score += ctx.player.techs.length * 6;
    }
  }

  score = score * profile.techWeight - cost * 2.8;
  return score;
}

/** Score an economic tile action (harvest, build improvement, road, chop, plant). */
export function scoreTileAction(
  state: GameState,
  action: GameAction,
  ctx: SpatialContext,
  profile: FactionAIProfile,
): number {
  if (action.type === 'HARVEST_TILE') {
    const tile = getTile(state, action.coord.x, action.coord.y);
    if (!tile || !tile.cityId) return -1;
    const city = state.cities[tile.cityId];
    if (!city) return -1;
    let score = 26 * profile.economyWeight;
    if (city.population + 1 >= city.level + 1) {
      score += 45;
    }
    return score;
  }

  if (action.type === 'BUILD_IMPROVEMENT') {
    const tile = getTile(state, action.coord.x, action.coord.y);
    if (!tile || !tile.cityId) return -1;
    const city = state.cities[tile.cityId];
    if (!city) return -1;
    const def = IMPROVEMENT_DEFINITIONS[action.improvement];
    let popGain = def.basePop;
    let adjMatches = 0;
    if (def.adjacentBonusTo && def.adjacentPopPerMatch) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nb = getTile(state, tile.x + dx, tile.y + dy);
          if (nb && nb.improvement === def.adjacentBonusTo) adjMatches++;
        }
      }
      popGain += adjMatches * def.adjacentPopPerMatch;
    }
    let impGold = def.goldPerTurn;
    if (action.improvement === 'windmill' && ctx.player.techs.includes('humans_milling')) {
      impGold += adjMatches;
    }
    if (
      (action.improvement === 'mine' || action.improvement === 'great_forge') &&
      ctx.player.techs.includes('dwarves_heart_of_mountain')
    ) {
      impGold += 1;
    }
    if (action.improvement === 'foundry' && ctx.player.techs.includes('orcs_mount_doom')) {
      impGold += 1;
    }
    if (action.improvement === 'sanctuary' && ctx.player.techs.includes('elves_lothlorien_sanctum')) {
      impGold += 1;
    }
    if (popGain === 0 && impGold === 0) return -10;
    let score = (16 + popGain * 14 + impGold * 24 - def.cost * 3) * profile.economyWeight;
    if (city.population + popGain >= city.level + 1) {
      score += 46;
    }
    // Elves should never harm untouched Ancient Woods (Sanctuary preserves it, so bonus!)
    if (profile.faction === 'elves' && action.improvement === 'sanctuary') {
      score += 10;
    }
    return score;
  }

  if (action.type === 'BUILD_ROAD') {
    if (profile.faction === 'humans') {
      // Humans get Beacon Network (+1★/turn) and +1 MOV from roads
      const hasUnconnected = ctx.ownCities.some((c) => !c.isCapital && !c.connectedToCapital);
      return hasUnconnected ? 32 : 12;
    }
    return 6;
  }

  if (action.type === 'CHOP_FOREST') {
    // Orcs: 0★ -> +2★ instant! Very attractive when gold is low or early tempo
    return ctx.player.gold <= 6 ? 30 : 14;
  }

  if (action.type === 'PLANT_ANCIENT_WOODS') {
    // Elves: 3★ -> +1 Pop AND +1★/turn from Woodland Grace
    const tile = getTile(state, action.coord.x, action.coord.y);
    const city = tile?.cityId ? state.cities[tile.cityId] : null;
    let score = 30 * profile.economyWeight;
    if (city && city.population + 1 >= city.level + 1) score += 42;
    return score;
  }

  return -1;
}

/** Check if a unit is currently sitting on an unclaimed village or enemy city waiting to capture next turn. */
function isHoldingCapture(state: GameState, unit: Unit): boolean {
  const tile = getTile(state, unit.x, unit.y);
  if (!tile) return false;
  if (tile.hasVillage && !tile.cityId) return true;
  if (tile.isCityCenter && tile.cityId) {
    const city = state.cities[tile.cityId];
    if (city && city.ownerId !== unit.ownerId) return true;
  }
  return false;
}

/** Check if a unit is currently sitting on unclaimed Ancient Ruins waiting to explore next turn. */
function isHoldingRuins(state: GameState, unit: Unit): boolean {
  const tile = getTile(state, unit.x, unit.y);
  return tile !== null && tile.resource === 'ruins';
}

/** Score explicitly capturing a neutral village or enemy city on Turn N+1. */
export function scoreCapture(
  state: GameState,
  unit: Unit,
  profile: FactionAIProfile,
): number {
  if (!canUnitCapture(state, unit.id)) return -999;
  const tile = getTile(state, unit.x, unit.y);
  if (!tile) return -999;

  let score = 260;
  if (tile.isCityCenter && tile.cityId) {
    const city = state.cities[tile.cityId];
    if (city && city.ownerId !== unit.ownerId) {
      score += city.isCapital ? 50 : 25;
    }
  }
  if (profile.faction === 'orcs') {
    score += 10; // Spoils of War (+4★/+5★)
  }
  return score;
}

/** Score explicitly exploring Ancient Ruins on Turn N+1. */
export function scoreExploreRuins(
  state: GameState,
  unit: Unit,
  ctx: SpatialContext,
): number {
  if (!canUnitExploreRuins(state, unit.id)) return -999;
  let score = 245;
  if (ctx.player.techs.includes('humans_hunting')) {
    score += 10; // Humans Ranger Hunting +2★ ruins bonus
  }
  return score;
}

/** Score attacking a specific enemy unit. */
export function scoreAttack(
  state: GameState,
  attacker: Unit,
  defender: Unit,
  ctx: SpatialContext,
  profile: FactionAIProfile,
  diff: DifficultyConfig,
): number {
  if (canUnitCapture(state, attacker.id) || canUnitExploreRuins(state, attacker.id)) return -999;

  const preview = predictCombat(state, attacker.id, defender.id);
  const defSpec = UNIT_DEFINITIONS[defender.type];
  const defTile = getTile(state, defender.x, defender.y);

  let score =
    (preview.attackerDamage * 5.5 - preview.retaliationDamage * 4.2 * profile.selfPreservation) *
    profile.attackWeight;

  if ((isHoldingCapture(state, attacker) || isHoldingRuins(state, attacker)) && preview.willAdvance) {
    // Don't abandon a village/city/ruins we just moved onto unless advancing onto an enemy city!
    const advancingOntoEnemyCity =
      defTile?.isCityCenter &&
      defTile.cityId !== null &&
      state.cities[defTile.cityId]?.ownerId !== attacker.ownerId;
    if (!advancingOntoEnemyCity) {
      score -= isHoldingCapture(state, attacker) ? 160 : 140;
    }
  }

  if (preview.defenderKilled) {
    score += 85 + defSpec.cost * 8;
    // Orcs Spoils of War (+2★ on kill)
    if (profile.faction === 'orcs') score += 18;
    // Rohirrim Knight Persist chain potential
    if (UNIT_DEFINITIONS[attacker.type].traits.includes('persist')) score += 16;
  }

  if (preview.attackerKilled && !preview.defenderKilled) {
    score -= 75 * profile.selfPreservation;
  } else if (preview.attackerKilled && preview.defenderKilled) {
    score -= 20 * profile.selfPreservation;
  }

  // Defending own capital
  if (ctx.ownCapital && chebyshev(defender, ctx.ownCapital) <= 2) {
    score += 55;
  }

  // Attacking enemy garrisoned on a city
  if (defTile?.isCityCenter && defTile.cityId) {
    const city = state.cities[defTile.cityId];
    if (city && city.ownerId !== attacker.ownerId) {
      score += city.isCapital ? 48 : 34;
      // Approachable early pressure on Easy against human capital
      if (
        ctx.humanCapital &&
        city.id === ctx.humanCapital.id &&
        state.turn <= 8 &&
        diff.earlyHumanCapitalPressure < 1
      ) {
        score *= diff.earlyHumanCapitalPressure;
      }
    }
  }

  // Ranged units love free poke (0 retaliation)
  if (preview.retaliationDamage === 0 && preview.attackerDamage > 0) {
    score += 18;
  }

  return score;
}

function countNewlyRevealed(state: GameState, player: PlayerState, to: Coord, radius: number): number {
  let count = 0;
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const nx = to.x + dx;
      const ny = to.y + dy;
      if (nx < 0 || ny < 0 || nx >= state.mapSize || ny >= state.mapSize) continue;
      if (!player.revealedTiles[tileIndex(nx, ny, state.mapSize)]) {
        count++;
      }
    }
  }
  return count;
}

function nearestDistance(from: Coord, targets: Coord[]): number {
  let best = Infinity;
  for (const t of targets) {
    const d = chebyshev(from, t);
    if (d < best) best = d;
  }
  return best;
}

/** Score moving a unit to `to`. */
export function scoreMove(
  state: GameState,
  unit: Unit,
  to: Coord,
  ctx: SpatialContext,
  profile: FactionAIProfile,
  diff: DifficultyConfig,
): number {
  const destTile: Tile | null = getTile(state, to.x, to.y);
  if (!destTile) return -999;

  // Never move a unit that can capture its current village/city or explore ruins right now!
  if (canUnitCapture(state, unit.id) || canUnitExploreRuins(state, unit.id)) return -999;

  const spec = UNIT_DEFINITIONS[unit.type];
  let score = 0;

  // Never walk off an active village/city capture or ruins unless stepping onto an even better capture!
  const currentlyCapturing = isHoldingCapture(state, unit);
  if (currentlyCapturing) {
    score -= 170;
  } else if (isHoldingRuins(state, unit)) {
    score -= 150;
  }

  // Immediate high-value destinations
  if (destTile.isCityCenter && destTile.cityId) {
    const city = state.cities[destTile.cityId];
    if (city && city.ownerId !== unit.ownerId) {
      let capScore = city.isCapital ? 150 : 120;
      if (profile.faction === 'orcs') capScore += 20; // +4★ Spoils of War
      if (
        ctx.humanCapital &&
        city.id === ctx.humanCapital.id &&
        state.turn <= 8 &&
        diff.earlyHumanCapitalPressure < 1
      ) {
        capScore *= diff.earlyHumanCapitalPressure;
      }
      score += capScore;
    }
  } else if (destTile.hasVillage && !destTile.cityId) {
    score += 105 * profile.expansionWeight + (profile.faction === 'orcs' ? 16 : 0);
  }

  if (destTile.resource === 'ruins') {
    score += 78 * profile.expansionWeight + (ctx.player.techs.includes('humans_hunting') ? 14 : 0);
  }

  // Fog-of-war exploration
  let visionRadius = destTile.terrain === 'mountain' ? 2 : 1;
  if (
    profile.faction === 'elves' &&
    ctx.player.techs.includes('elves_keen_sight') &&
    (destTile.terrain === 'forest' || destTile.terrain === 'ancient_woods')
  ) {
    visionRadius = Math.max(visionRadius, 2);
  }
  const newFog = countNewlyRevealed(state, ctx.player, to, visionRadius);
  const exploreMult = state.turn <= 10 ? 1.35 : 0.75;
  score += newFog * 6.5 * exploreMult * profile.expansionWeight;

  // Escape / retreat behavior when wounded or using post-attack Escape
  const hpRatio = unit.hp / unit.maxHp;
  const shouldRetreat = unit.canEscapeMove || hpRatio <= 0.35;
  if (shouldRetreat && ctx.enemyUnits.length > 0) {
    const curEnemyDist = nearestDistance(unit, ctx.enemyUnits);
    const newEnemyDist = nearestDistance(to, ctx.enemyUnits);
    score += (newEnemyDist - curEnemyDist) * 16 * profile.selfPreservation;
  }

  // Move toward unclaimed neutral villages
  if (ctx.neutralVillages.length > 0 && !unit.canEscapeMove) {
    const curDist = nearestDistance(unit, ctx.neutralVillages);
    const newDist = nearestDistance(to, ctx.neutralVillages);
    if (newDist < curDist) {
      score += (36 * profile.expansionWeight) / Math.max(1, newDist);
    }
  }

  // Move toward ancient ruins
  if (ctx.ruins.length > 0 && !unit.canEscapeMove) {
    const curDist = nearestDistance(unit, ctx.ruins);
    const newDist = nearestDistance(to, ctx.ruins);
    if (newDist < curDist) {
      score += (24 * profile.expansionWeight) / Math.max(1, newDist);
    }
  }

  // Move toward enemy cities / units (or defend threatened own capital)
  if (!shouldRetreat) {
    if (ctx.ownCapital && (ctx.cityThreats[ctx.ownCapital.id] ?? 0) > 0) {
      const curCapDist = chebyshev(unit, ctx.ownCapital);
      const newCapDist = chebyshev(to, ctx.ownCapital);
      if (newCapDist < curCapDist && curCapDist <= 5) {
        score += 28;
      }
    }

    if (ctx.enemyCities.length > 0) {
      const curDist = nearestDistance(unit, ctx.enemyCities);
      const newDist = nearestDistance(to, ctx.enemyCities);
      if (newDist < curDist) {
        score += (24 * profile.attackWeight) / Math.max(1, newDist);
      }
    } else if (ctx.enemyUnits.length > 0) {
      const curDist = nearestDistance(unit, ctx.enemyUnits);
      const newDist = nearestDistance(to, ctx.enemyUnits);
      if (newDist < curDist) {
        score += (18 * profile.attackWeight) / Math.max(1, newDist);
      }
    } else if (newFog === 0 && ctx.neutralVillages.length === 0) {
      // Push toward center of the map to find opponents
      const center = { x: Math.floor(state.mapSize / 2), y: Math.floor(state.mapSize / 2) };
      const curDist = chebyshev(unit, center);
      const newDist = chebyshev(to, center);
      if (newDist < curDist) score += 10;
    }

    // Dash-attack setup: reward stepping into attack range of an enemy
    const unitRange = getUnitRange(state, unit);
    if (!unit.hasAttacked && spec.traits.includes('dash')) {
      for (const enemy of ctx.enemyUnits) {
        const d = chebyshev(to, enemy);
        if (d <= unitRange && (unitRange === 1 || d >= 1)) {
          score += 22 * profile.attackWeight;
          // Prefer keeping ranged units at max range rather than adjacent
          if (unitRange > 1 && d === 1) score -= 14 * profile.selfPreservation;
          break;
        }
      }
    }
  }

  // Terrain & Faction Positioning Synergy
  const nearEnemy = ctx.enemyUnits.some((e) => chebyshev(to, e) <= 2);
  if (destTile.terrain === 'forest' || destTile.terrain === 'ancient_woods') {
    if (profile.faction === 'elves') {
      score += spec.range > 1 ? 14 : 10;
    } else if (nearEnemy) {
      score += 7;
    }
  }
  if (destTile.terrain === 'mountain') {
    if (profile.faction === 'dwarves') score += 14;
    else if (nearEnemy) score += 8;
  }
  if (profile.faction === 'humans' && destTile.hasRoad) {
    score += 7;
  }

  // Slight penalty for camping on own city center when unthreatened (blocks unit training!)
  if (destTile.isCityCenter && destTile.cityId) {
    const city = state.cities[destTile.cityId];
    if (city && city.ownerId === unit.ownerId && (ctx.cityThreats[city.id] ?? 0) === 0) {
      score -= 10;
    }
  }

  return score;
}

/** Score recovering (healing) a unit in place. */
export function scoreRecover(
  state: GameState,
  unit: Unit,
  profile: FactionAIProfile,
): number {
  if (canUnitCapture(state, unit.id) || canUnitExploreRuins(state, unit.id)) return -999;
  if (unit.hp >= unit.maxHp || unit.hasMoved || unit.hasAttacked) return -1;
  const hpRatio = unit.hp / unit.maxHp;
  const missingRatio = 1 - hpRatio;
  const tile = getTile(state, unit.x, unit.y);
  const inFriendlyBorders =
    tile?.cityId !== null &&
    tile?.cityId !== undefined &&
    state.cities[tile.cityId]?.ownerId === unit.ownerId;

  let score = 0;
  if (hpRatio <= 0.45) {
    score = 48 * missingRatio * profile.selfPreservation + (inFriendlyBorders ? 12 : 0);
  } else if (hpRatio <= 0.7 && (isHoldingCapture(state, unit) || isHoldingRuins(state, unit))) {
    // Great to top up HP while holding a village/city capture or ruins
    score = 26 * profile.selfPreservation;
  } else if (hpRatio <= 0.65 && inFriendlyBorders) {
    score = 18 * missingRatio * profile.selfPreservation;
  }
  return score;
}

/** Score training a specific unit type in a city. */
export function scoreTrainUnit(
  state: GameState,
  city: City,
  unitType: UnitType,
  ctx: SpatialContext,
  profile: FactionAIProfile,
): number {
  const spec = UNIT_DEFINITIONS[unitType];
  const factionDef = FACTION_DEFINITIONS[ctx.player.faction];
  const pref = profile.unitPreferences[unitType] ?? 1.0;

  let score = 22 * pref;

  // Unique unit priority
  if (unitType === factionDef.uniqueUnit) {
    score += 28 * profile.uniqueUnitWeight;
  }

  // Threat urgency near this city
  const localThreat = ctx.cityThreats[city.id] ?? 0;
  if (localThreat > 0) {
    score += 30;
    if (unitType === 'defender' || unitType === 'ironbreaker' || unitType === 'warrior' || unitType === 'uruk_berserker') {
      score += 24;
    }
    if (unitType === 'catapult') {
      score -= 22; // Don't spawn fragile catapults right under siege
    }
  }

  // Early scouting & village grabbing (turns 1..6)
  if (state.turn <= 6 && ctx.ownUnits.length < ctx.ownCities.length + 2) {
    score += 18;
    if (unitType === 'rider' || unitType === 'warrior' || unitType === 'archer') {
      score += 12;
    }
  }

  // Balance army composition: slight diminishing returns for stacking one unit type
  const sameTypeCount = ctx.ownUnits.filter((u) => u.type === unitType).length;
  score -= sameTypeCount * 4;

  // Capapults are awesome when enemy cities are visible
  if (unitType === 'catapult' && ctx.enemyCities.length > 0 && localThreat === 0) {
    score += 16;
  }

  // Slight cost efficiency factor
  score -= spec.cost * 1.5;

  return score;
}
