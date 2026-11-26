import {
  FACTION_DEFINITIONS,
  IMPROVEMENT_DEFINITIONS,
  TECH_DEFINITIONS,
  UNIT_DEFINITIONS,
  canUnitCapture,
  canUnitExploreRuins,
  getEffectiveAttack,
  getEffectiveDefense,
  getFactionTechs,
  getTile,
  getUnitCost,
  getUnitRange,
  getUnitTrainMaxHp,
  predictCombat,
  unitHasTrait,
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
import {
  FAR,
  expectedIncomingDamage,
  humanPressure,
  terrainDefenseAt,
  unitPower,
  type StrategicContext,
  type UnitRole,
} from './strategy';

export interface SpatialContext {
  player: PlayerState;
  playerById: Map<string, PlayerState>;
  ownCities: City[];
  ownCapital: City | null;
  enemyCities: City[];
  humanCapital: City | null;
  neutralVillages: Coord[];
  ruins: Coord[];
  ownUnits: Unit[];
  enemyUnits: Unit[];
  enemyIndexById: Map<string, number>;
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
  const playerById = new Map<string, PlayerState>();
  let humanId: string | null = null;
  for (const p of state.players) {
    playerById.set(p.id, p);
    if (p.isHuman) humanId = p.id;
  }
  const player = playerById.get(playerId)!;
  const ownCities: City[] = [];
  const enemyCities: City[] = [];
  let ownCapital: City | null = null;
  let humanCapital: City | null = null;

  const size = state.mapSize;
  const rev = player.revealedTiles;

  for (const city of Object.values(state.cities)) {
    if (city.ownerId === playerId) {
      ownCities.push(city);
      if (city.isCapital) ownCapital = city;
    } else {
      const idx = tileIndex(city.x, city.y, size);
      if (rev[idx]) {
        enemyCities.push(city);
        if (city.ownerId === humanId && city.isCapital) {
          humanCapital = city;
        }
      }
    }
  }

  const ownUnits: Unit[] = [];
  const enemyUnits: Unit[] = [];
  const enemyIndexById = new Map<string, number>();
  for (const unit of Object.values(state.units)) {
    if (unit.ownerId === playerId) {
      ownUnits.push(unit);
    } else {
      const idx = tileIndex(unit.x, unit.y, size);
      if (rev[idx]) {
        enemyIndexById.set(unit.id, enemyUnits.length);
        enemyUnits.push(unit);
      }
    }
  }

  const neutralVillages: Coord[] = [];
  const ruins: Coord[] = [];
  let revealedCount = 0;

  for (let i = 0; i < state.tiles.length; i++) {
    if (rev[i]) {
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
    for (let i = 0; i < enemyUnits.length; i++) {
      const enemy = enemyUnits[i];
      const d = Math.max(Math.abs(city.x - enemy.x), Math.abs(city.y - enemy.y));
      if (d <= 3) threat++;
      if (d <= 4) totalThreat++;
    }
    cityThreats[city.id] = threat;
  }

  return {
    player,
    playerById,
    ownCities,
    ownCapital,
    enemyCities,
    humanCapital,
    neutralVillages,
    ruins,
    ownUnits,
    enemyUnits,
    enemyIndexById,
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
  diff?: DifficultyConfig,
): CityRewardChoice {
  if (diff?.simpleCityRewards) {
    if (levelReached === 2) return 'workshop';
    if (levelReached === 3) return city.isCapital && !city.hasWalls ? 'city_wall' : 'resources';
    if (levelReached === 4) return 'pop_growth';
    return 'park';
  }
  if (levelReached === 2) {
    if (ctx.revealedRatio < 0.22 && (profile.faction === 'orcs' || profile.faction === 'elves')) {
      return 'explorer';
    }
    return 'workshop';
  }
  if (levelReached === 3) {
    const threatened = (ctx.cityThreats[city.id] ?? 0) > 0;
    const frontier = ctx.enemyCities.some((c) => chebyshev(c, city) <= 6);
    if (
      !city.hasWalls &&
      (threatened ||
        frontier ||
        city.isCapital ||
        profile.faction === 'dwarves' ||
        profile.faction === 'humans')
    ) {
      return 'city_wall';
    }
    return 'resources';
  }
  if (levelReached === 4) {
    let valuableOuterTiles = 0;
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) continue;
        const t = getTile(state, city.x + dx, city.y + dy);
        if (
          t &&
          ctx.player.revealedTiles[tileIndex(t.x, t.y, state.mapSize)] &&
          !t.cityId &&
          t.terrain !== 'water'
        ) {
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
  const gloryEndgame = state.config.maxTurns > 0 && state.turn >= state.config.maxTurns - 6;
  if (gloryEndgame) return 'park';
  let spawnable = false;
  for (let dy = -2; dy <= 2 && !spawnable; dy++) {
    for (let dx = -2; dx <= 2 && !spawnable; dx++) {
      const t = getTile(state, city.x + dx, city.y + dy);
      if (t && t.unitId === null && t.terrain !== 'water' && t.terrain !== 'mountain') spawnable = true;
    }
  }
  if (!spawnable || (ctx.ownUnits.length >= 30 && city.parks === 0)) return 'park';
  return 'champion';
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
    score += 32 * profile.uniqueUnitWeight;
  } else if (tech.unlocksUnits.length > 0) {
    // Supporting unit unlocks (archers, riders, defenders, catapults) fuel combined-arms armies.
    score += 18 + (ctx.totalThreat > 0 ? 8 : 0);
  }

  if (tech.unlocksMountainPass) score += 8;
  if (tech.unlocksChopForest && ctx.player.gold < 6) score += 12;
  if (tech.unlocksPlantWoods) score += 14;
  if (techId === 'elves_elven_lore') {
    const remainingTechs = getFactionTechs(ctx.player.faction).length - ctx.player.techs.length;
    score += remainingTechs * 4;
  }

  // Tier 2 focused economic / military synergies
  if (techId === 'humans_granaries') {
    score += ctx.ownCities.filter((c) => c.level >= 3).length * 8;
  } else if (techId === 'humans_citadel_masonry') {
    score += ctx.ownCities.filter((c) => c.hasWalls).length * 7;
  } else if (techId === 'orcs_war_barracks') {
    score += ctx.ownCities.length * 7;
  } else if (techId === 'orcs_spoils_mastery') {
    score += 12 + ctx.enemyUnits.length * 3;
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
      score += ctx.ownUnits.length * 4 + 10;
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

  if (tech.unlocksUnits.length > 0 && ctx.ownUnits.length <= ctx.ownCities.length) {
    score += 10;
  }

  if (state.config.maxTurns > 0 && state.turn >= state.config.maxTurns - 6) {
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
    if (city.population + 1 >= city.level + 1) score += 45;
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
    if (city.population + popGain >= city.level + 1) score += 46;
    if (profile.faction === 'elves' && action.improvement === 'sanctuary') score += 10;
    return score;
  }

  if (action.type === 'BUILD_ROAD') {
    if (profile.faction === 'humans') {
      const hasUnconnected = ctx.ownCities.some((c) => !c.isCapital && !c.connectedToCapital);
      return hasUnconnected ? 32 : 12;
    }
    return 6;
  }

  if (action.type === 'CHOP_FOREST') {
    return ctx.player.gold <= 5 ? 24 : 4;
  }

  if (action.type === 'PLANT_ANCIENT_WOODS') {
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

  let score = 265;
  if (tile.isCityCenter && tile.cityId) {
    const city = state.cities[tile.cityId];
    if (city && city.ownerId !== unit.ownerId) {
      score += city.isCapital ? 55 : 30;
    }
  }
  if (profile.faction === 'orcs') score += 10;
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
  if (ctx.player.techs.includes('humans_hunting')) score += 10;
  return score;
}

/** Estimated damage `attacker` (at its current tile) deals to `defender`. */
function estimateDamage(
  state: GameState,
  attacker: Unit,
  defender: Unit,
  defHp: number,
  ctx: SpatialContext,
): number {
  const atk = getEffectiveAttack(state, attacker);
  const aF = atk * (unitHasTrait(state, attacker, 'bloodlust') ? 1 : attacker.hp / attacker.maxHp);
  const tile = getTile(state, defender.x, defender.y);
  const owner = ctx.playerById.get(defender.ownerId);
  const terr = tile && owner ? terrainDefenseAt(state, defender, tile, owner.faction) : 1;
  const dF = getEffectiveDefense(state, defender) * (Math.max(0, defHp) / defender.maxHp) * terr;
  if (aF + dF <= 0) return 0;
  return Math.round((aF / (aF + dF)) * atk * 4.5);
}

/** Can `unit` still strike `target` this turn (from where it stands or after a dash move)? */
function canStillReach(state: GameState, unit: Unit, target: Coord): boolean {
  if (unit.actedThisTurn || unit.canEscapeMove) return false;
  if (unit.hasAttacked && !unit.canPersistAttack) return false;
  const range = getUnitRange(state, unit);
  const d = chebyshev(unit, target);
  if (d <= range) return true;
  if (unit.hasMoved || !unitHasTrait(state, unit, 'dash')) return false;
  return d <= UNIT_DEFINITIONS[unit.type].movement + range;
}

/** Smooth early-capital pressure factor blending from `diff.earlyHumanCapitalPressure` to `1.0`. */
function smoothCapitalPressure(turn: number, diff: DifficultyConfig): number {
  if (diff.earlyHumanCapitalPressure >= 1) return 1;
  const t = Math.max(0, Math.min(1, (turn - 1) / Math.max(1, diff.humanPressureRampTurns * 0.6)));
  const s = t * t * (3 - 2 * t);
  return diff.earlyHumanCapitalPressure + (1 - diff.earlyHumanCapitalPressure) * s;
}

/** Score attacking a specific enemy unit. */
export function scoreAttack(
  state: GameState,
  attacker: Unit,
  defender: Unit,
  ctx: SpatialContext,
  profile: FactionAIProfile,
  diff: DifficultyConfig,
  sctx?: StrategicContext,
  skipFollowUp = false,
): number {
  if (canUnitCapture(state, attacker.id) || canUnitExploreRuins(state, attacker.id)) return -999;

  const preview = predictCombat(state, attacker.id, defender.id);
  const defTile = getTile(state, defender.x, defender.y);

  let score =
    (preview.attackerDamage * 5.5 - preview.retaliationDamage * 4.4 * profile.selfPreservation) *
    profile.attackWeight;

  if ((isHoldingCapture(state, attacker) || isHoldingRuins(state, attacker)) && preview.willAdvance) {
    const advancingOntoEnemyCity =
      defTile?.isCityCenter &&
      defTile.cityId !== null &&
      state.cities[defTile.cityId]?.ownerId !== attacker.ownerId;
    if (!advancingOntoEnemyCity) {
      score -= isHoldingCapture(state, attacker) ? 160 : 140;
    }
  }

  let canFinishThisTurn = preview.defenderKilled;
  if (preview.defenderKilled) {
    score += 72 + unitPower(defender) * 9;
    if (profile.faction === 'orcs') score += 18;
    if (UNIT_DEFINITIONS[attacker.type].traits.includes('persist')) score += 18;
  } else if (diff.focusFire > 0) {
    if (!skipFollowUp) {
      const remaining = defender.hp - preview.attackerDamage;
      let followUp = 0;
      for (let i = 0; i < ctx.ownUnits.length; i++) {
        const u = ctx.ownUnits[i];
        if (u.id === attacker.id || !canStillReach(state, u, defender)) continue;
        followUp += estimateDamage(state, u, defender, remaining, ctx);
        if (followUp >= remaining) {
          canFinishThisTurn = true;
          break;
        }
      }
      if (canFinishThisTurn) score += 36 * diff.focusFire;
    }
    score += (1 - defender.hp / defender.maxHp) * 16 * diff.focusFire;
  }

  if (preview.attackerKilled && !preview.defenderKilled) {
    score -= 80 * profile.selfPreservation + unitPower(attacker) * 6;
  } else if (preview.attackerKilled && preview.defenderKilled) {
    score -= 22 * profile.selfPreservation;
  }

  // Protect our cities: enemies on / next to our city centers are top priority.
  let nearOwnCity = Infinity;
  for (let i = 0; i < ctx.ownCities.length; i++) {
    const c = ctx.ownCities[i];
    const d = Math.max(Math.abs(defender.x - c.x), Math.abs(defender.y - c.y));
    if (d < nearOwnCity) nearOwnCity = d;
  }
  if (nearOwnCity === 0) score += 155;
  else if (nearOwnCity === 1) score += 42;
  else if (nearOwnCity === 2) score += 18;
  if (ctx.ownCapital && chebyshev(defender, ctx.ownCapital) <= 2) score += 20;

  // Attacking enemy garrisoned on a city
  if (defTile?.isCityCenter && defTile.cityId) {
    const city = state.cities[defTile.cityId];
    if (city && city.ownerId !== attacker.ownerId) {
      score += city.isCapital ? 50 : 36;
      if (sctx?.targetCity && sctx.targetCity.id === city.id) score += 18;
      if (ctx.humanCapital && city.id === ctx.humanCapital.id) {
        score *= smoothCapitalPressure(state.turn, diff);
      }
    }
  }

  // Ranged units love free poke (0 retaliation)
  if (preview.retaliationDamage === 0 && preview.attackerDamage > 0) {
    score += 20;
  }

  // Exposure after a melee kill-and-advance.
  if (sctx && preview.willAdvance) {
    const idx = tileIndex(defender.x, defender.y, state.mapSize);
    const excludeIdx = ctx.enemyIndexById.get(defender.id) ?? -1;
    const inc = expectedIncomingDamage(state, ctx, sctx, attacker, idx, excludeIdx) * 0.85;
    if (inc >= attacker.hp) score -= 28 * profile.selfPreservation * diff.dangerAwareness;
  }

  // Losing trades: taking more damage than we deal without a kill (or focus-fire finish) is wasteful
  // unless defending a city.
  if (
    !preview.defenderKilled &&
    preview.retaliationDamage > preview.attackerDamage &&
    nearOwnCity > 1 &&
    !canFinishThisTurn
  ) {
    score -= 32 + (preview.retaliationDamage - preview.attackerDamage) * 7 * profile.selfPreservation;
  }

  // Smooth human pressure curve for non-defensive skirmishes (no cliff).
  const defOwner = ctx.playerById.get(defender.ownerId);
  if (defOwner?.isHuman && nearOwnCity > 2) {
    const hp = humanPressure(state.turn, diff);
    score *= 0.55 + 0.45 * hp;
  }

  return score;
}

function countNewlyRevealed(state: GameState, player: PlayerState, to: Coord, radius: number): number {
  let count = 0;
  const size = state.mapSize;
  const rev = player.revealedTiles;
  const y0 = Math.max(0, to.y - radius);
  const y1 = Math.min(size - 1, to.y + radius);
  const x0 = Math.max(0, to.x - radius);
  const x1 = Math.min(size - 1, to.x + radius);
  for (let ny = y0; ny <= y1; ny++) {
    const row = ny * size;
    for (let nx = x0; nx <= x1; nx++) {
      if (!rev[row + nx]) count++;
    }
  }
  return count;
}

/** Danger penalty for ending the turn on tile `idx` (0 = safe). */
export function dangerPenalty(
  state: GameState,
  unit: Unit,
  idx: number,
  ctx: SpatialContext,
  profile: FactionAIProfile,
  diff: DifficultyConfig,
  sctx: StrategicContext,
  role: UnitRole,
): number {
  const inc = expectedIncomingDamage(state, ctx, sctx, unit, idx);
  if (inc <= 0) return 0;
  const committed = role === 'attack' && sctx.overwhelming;
  const aware =
    diff.dangerAwareness *
    profile.selfPreservation *
    (committed ? 0.28 : role === 'attack' || role === 'defend' ? 0.58 : 1);
  if (inc >= unit.hp) return (40 + unitPower(unit) * 5) * aware;
  return 28 * (inc / unit.hp) * aware;
}

function fieldProgress(field: Int16Array, fromIdx: number, toIdx: number, weight: number): number {
  const a = field[fromIdx];
  const b = field[toIdx];
  if (a >= FAR || b >= FAR) return b < FAR ? weight * 0.5 : 0;
  return (a - b) * weight;
}

/** Score moving a unit to `to`. */
export function scoreMove(
  state: GameState,
  unit: Unit,
  to: Coord,
  ctx: SpatialContext,
  profile: FactionAIProfile,
  diff: DifficultyConfig,
  sctx?: StrategicContext,
  hereDanger = 0,
): number {
  const destTile: Tile | null = getTile(state, to.x, to.y);
  if (!destTile) return -999;

  if (canUnitCapture(state, unit.id) || canUnitExploreRuins(state, unit.id)) return -999;

  const spec = UNIT_DEFINITIONS[unit.type];
  const size = state.mapSize;
  const fromIdx = tileIndex(unit.x, unit.y, size);
  const toIdx = tileIndex(to.x, to.y, size);
  const role: UnitRole = sctx?.roles.get(unit.id) ?? 'hold';
  let score = 0;

  if (isHoldingCapture(state, unit)) {
    score -= 175;
  } else if (isHoldingRuins(state, unit)) {
    score -= 150;
  }

  // Immediate high-value destinations (seizing empty enemy cities closes out sieges cleanly!)
  let seizingEnemyCity = false;
  if (destTile.isCityCenter && destTile.cityId) {
    const city = state.cities[destTile.cityId];
    if (city && city.ownerId !== unit.ownerId) {
      seizingEnemyCity = true;
      let capScore = city.isCapital ? 240 : 210;
      if (sctx?.targetCity && sctx.targetCity.id === city.id) capScore += 30;
      if (profile.faction === 'orcs') capScore += 20;
      const owner = ctx.playerById.get(city.ownerId);
      if (owner?.isHuman) {
        const hp = humanPressure(state.turn, diff);
        const notTarget = diff.difficulty === 'easy' && sctx?.warTargetId !== owner.id;
        capScore *= notTarget ? 0.25 + 0.55 * hp : 0.45 + 0.55 * hp;
        if (ctx.humanCapital && city.id === ctx.humanCapital.id) {
          capScore *= smoothCapitalPressure(state.turn, diff);
        }
      }
      score += capScore;
    }
  } else if (destTile.hasVillage && !destTile.cityId) {
    score += 110 * profile.expansionWeight + (profile.faction === 'orcs' ? 16 : 0);
  }

  if (destTile.resource === 'ruins') {
    score += 80 * profile.expansionWeight + (ctx.player.techs.includes('humans_hunting') ? 14 : 0);
  }

  // Fog-of-war exploration (skip scan once map is fully revealed)
  if (ctx.revealedRatio < 0.999) {
    let visionRadius = destTile.terrain === 'mountain' ? 2 : 1;
    if (
      ctx.player.techs.includes('elves_keen_sight') &&
      (destTile.terrain === 'forest' || destTile.terrain === 'ancient_woods')
    ) {
      visionRadius = Math.max(visionRadius, 2);
    }
    const newFog = countNewlyRevealed(state, ctx.player, to, visionRadius);
    const exploreMult =
      (state.turn <= 10 ? 1.35 : 0.6) * (role === 'explore' || role === 'expand' ? 1.3 : 0.45);
    score += newFog * 6.5 * exploreMult * profile.expansionWeight;
  }

  if (!sctx) return score;

  // Role-driven goal progress
  const flying = spec.traits.includes('flying');
  switch (role) {
    case 'expand':
      score += fieldProgress(sctx.distVillage, fromIdx, toIdx, 30 * profile.expansionWeight);
      break;
    case 'explore':
      score += fieldProgress(sctx.distFog, fromIdx, toIdx, 16);
      break;
    case 'defend': {
      const city = sctx.defendCity.get(unit.id);
      if (city) {
        const d0 = chebyshev(unit, city);
        const d1 = chebyshev(to, city);
        score += (d0 - d1) * 22;
        if (d1 <= 1) score += 8;
        const threat = sctx.threats[city.id];
        const center = getTile(state, city.x, city.y);
        if (d1 === 0 && threat?.enemyAdjacent && center && center.unitId === null) score += 55;
      }
      break;
    }
    case 'attack': {
      const friends = sctx.friendPower[toIdx] + (chebyshev(unit, to) > 2 ? unitPower(unit) : 0);
      const foes = sctx.enemyReachPower[toIdx];
      const supported =
        foes === 0 || sctx.overwhelming || friends >= foes * (0.7 + 0.3 * profile.selfPreservation);
      const w = 22 * profile.attackWeight * (supported ? 1 : 0.28 + 0.4 * (1 - diff.dangerAwareness));
      if (flying && sctx.targetCity) {
        score += (chebyshev(unit, sctx.targetCity) - chebyshev(to, sctx.targetCity)) * w;
      } else {
        score += fieldProgress(sctx.distTarget, fromIdx, toIdx, w);
      }
      break;
    }
    case 'hold': {
      const f = sctx.frontierCity;
      if (f) {
        const pen = (d: number) => (d === 0 ? 3.5 : Math.max(0, d - 2));
        score += (pen(chebyshev(unit, f)) - pen(chebyshev(to, f))) * 10;
      }
      break;
    }
    case 'retreat': {
      // Retreat toward friendly borders (adjacent to city, NOT clogging an unthreatened city center).
      const dFrom = sctx.distHome[fromIdx];
      const dTo = sctx.distHome[toIdx];
      if (dFrom < FAR && dTo < FAR) {
        const effFrom = Math.max(1, dFrom);
        const effTo = Math.max(1, dTo);
        score += (effFrom - effTo) * 18;
      }
      if (destTile.cityId && state.cities[destTile.cityId]?.ownerId === unit.ownerId && !destTile.isCityCenter) {
        score += 10;
      }
      break;
    }
    default:
      break;
  }

  // Danger: prefer tiles the enemy cannot punish next turn (relative to staying put).
  // Willing to brave fire to step onto an unoccupied enemy city and clinch the siege!
  const there =
    dangerPenalty(state, unit, toIdx, ctx, profile, diff, sctx, role) * (seizingEnemyCity ? 0.35 : 1);
  score += hereDanger - there;

  // Terrain & Faction Positioning Synergy
  const contested = sctx.enemyReach[toIdx].length > 0;
  if (destTile.terrain === 'forest' || destTile.terrain === 'ancient_woods') {
    if (profile.faction === 'elves') score += spec.range > 1 ? 10 : 6;
    else if (contested) score += 6;
  }
  if (destTile.terrain === 'mountain') {
    if (profile.faction === 'dwarves') score += contested ? 12 : 4;
    else if (contested) score += 7;
  }
  if (profile.faction === 'humans' && destTile.hasRoad) score += 3;

  // Ranged units prefer to keep a tile between themselves and enemy melee.
  if (spec.range > 1 && contested) {
    for (let i = 0; i < ctx.enemyUnits.length; i++) {
      const e = ctx.enemyUnits[i];
      if (chebyshev(e, to) === 1 && UNIT_DEFINITIONS[e.type].range === 1) {
        score -= 10 * profile.selfPreservation;
        break;
      }
    }
  }

  // Keep own city centers free so cities NEVER stall recruitment (unless actively besieged).
  const fromTile = getTile(state, unit.x, unit.y);
  if (fromTile?.isCityCenter && fromTile.cityId) {
    const city = state.cities[fromTile.cityId];
    if (city && city.ownerId === unit.ownerId) {
      const threat = sctx.threats[city.id];
      const mustHold = threat?.enemyAdjacent && threat.enemyPower > threat.ownPower * 0.5;
      if (!mustHold && sctx.cityHasRoom[city.id]) score += (threat?.enemyPower ?? 0) > 0 ? 20 : 55;
      else if (mustHold) score -= 40;
    }
  }
  if (destTile.isCityCenter && destTile.cityId) {
    const city = state.cities[destTile.cityId];
    if (city && city.ownerId === unit.ownerId) {
      const threat = sctx.threats[city.id];
      if (threat?.enemyAdjacent) score += 35;
      else if (sctx.cityHasRoom[city.id]) score -= (threat?.enemyPower ?? 0) > 0 ? 35 : 120;
    }
  }

  return score;
}

/** Score recovering (healing) a unit in place. */
export function scoreRecover(
  state: GameState,
  unit: Unit,
  profile: FactionAIProfile,
  sctx?: StrategicContext,
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
    score = 48 * missingRatio * profile.selfPreservation + (inFriendlyBorders ? 14 : 0);
  } else if (hpRatio <= 0.7 && (isHoldingCapture(state, unit) || isHoldingRuins(state, unit))) {
    score = 26 * profile.selfPreservation;
  } else if (hpRatio <= 0.65 && inFriendlyBorders) {
    score = 18 * missingRatio * profile.selfPreservation;
  }

  // Don't sit healing ON an unthreatened under-cap city center — step off so it can train!
  if (
    sctx &&
    tile?.isCityCenter &&
    tile.cityId &&
    inFriendlyBorders &&
    sctx.cityHasRoom[tile.cityId] &&
    (sctx.threats[tile.cityId]?.enemyPower ?? 0) === 0 &&
    hpRatio > 0.2
  ) {
    score -= 65;
  }
  return score;
}

/** Score training a specific unit type in a city (combined-arms army diversity!). */
export function scoreTrainUnit(
  state: GameState,
  city: City,
  unitType: UnitType,
  ctx: SpatialContext,
  profile: FactionAIProfile,
  sctx?: StrategicContext,
  diff?: DifficultyConfig,
): number {
  const spec = UNIT_DEFINITIONS[unitType];
  const factionDef = FACTION_DEFINITIONS[ctx.player.faction];
  const pref = profile.unitPreferences[unitType] ?? 1.0;
  const cost = getUnitCost(state, ctx.player.id, unitType);
  const hp = getUnitTrainMaxHp(state, ctx.player.id, unitType);
  const power = (spec.attack + spec.defense * 0.8) * (spec.range > 1 ? 1.15 : 1) * (hp / 10);

  // Compressed power term so high-stat Champions don't drown out combined-arms diversity.
  const rich = ctx.player.gold >= 12 + cost * 2;
  let score = 14 + Math.sqrt(Math.max(1, power)) * 13 * pref - cost * (rich ? 0.65 : 2.3);

  const isUnique = unitType === factionDef.uniqueUnit;
  const eliteScale = diff?.eliteShareScale ?? 1.0;
  if (isUnique) score += 6 * profile.uniqueUnitWeight * eliteScale;

  // Threat urgency near this city
  const localThreat = ctx.cityThreats[city.id] ?? 0;
  if (localThreat > 0) {
    score += 28;
    if (spec.range === 1 && spec.defense >= 2) score += 16;
    if (unitType === 'catapult') score -= 35;
  } else if (unitType === 'defender') {
    const frontier = ctx.enemyCities.some((c) => chebyshev(c, city) <= 6);
    score += frontier ? 8 : profile.faction === 'dwarves' ? 4 : -4;
  }

  // Early village grabbing: cheap and mobile units first.
  const expanding = state.turn <= 14 && ctx.neutralVillages.length + ctx.ruins.length > 0;
  if (expanding) {
    if (unitType === 'rider') score += 18;
    if (unitType === 'warrior') score += 12;
    if (unitType === 'catapult') score -= 28;
  }

  // Army composition: enforce a lively combined-arms mix instead of single-unit spam!
  let armyLen = 0;
  let sameType = 0;
  for (let i = 0; i < ctx.ownUnits.length; i++) {
    const u = ctx.ownUnits[i];
    if (UNIT_DEFINITIONS[u.type].movement > 0) {
      armyLen++;
      if (u.type === unitType) sameType++;
    }
  }
  const share = armyLen > 0 ? sameType / armyLen : 0;
  let targetShare = profile.unitMix[unitType] ?? 0.05;
  if (eliteScale < 1) {
    // Squire favors classic medieval troops (warriors/archers/riders/defenders) with a splash of elites.
    if (isUnique || unitType === 'catapult') targetShare *= eliteScale;
    else targetShare += (1 - eliteScale) * 0.06;
  }

  score += (targetShare - share) * 210;
  if (armyLen >= 3 && share > targetShare + 0.03) {
    score -= 75 + (share - targetShare) * 300;
  }

  // Siege engines shine against walls and mid/late campaigns.
  if (unitType === 'catapult') {
    const walledTarget = sctx?.targetCity?.hasWalls ?? ctx.enemyCities.some((c) => c.hasWalls);
    if (walledTarget && armyLen >= 4) score += 22;
    if (armyLen < 4) score -= 24;
  }

  return score;
}
