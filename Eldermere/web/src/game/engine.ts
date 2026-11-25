import {
  ALL_FACTIONS,
  FACTION_DEFINITIONS,
  IMPROVEMENT_DEFINITIONS,
  UNIT_DEFINITIONS,
  getFactionTechs,
} from './data';
import { predictCombat } from './combat';
import { generateMap } from './mapGen';
import { nextInt, normalizeSeed } from './rng';
import {
  CHOP_FOREST_GOLD,
  HARVEST_COST,
  PLANT_WOODS_COST,
  RESOURCE_POP_GAIN,
  ROAD_COST,
  calculatePlayerIncome,
  calculatePlayerScore,
  canPassMountains,
  canResearchTech,
  canUnitCapture,
  canUnitExploreRuins,
  canUseSuperpower,
  chebyshevDist,
  computeCapitalConnections,
  getActivePlayer,
  getAvailableTileActions,
  getCityUnitCap,
  getCityUnitCount,
  getImprovementPopGain,
  getNeighbors8,
  getPlayer,
  getPlayerCities,
  getSuperpowerTargetCoords,
  getTechCost,
  getTrainableUnits,
  getUnitCost,
  getUnitTrainMaxHp,
  getValidAttackTargets,
  getValidMoves,
  hasTech,
  hasUnitRemainingActions,
  isCapturableTileForPlayer,
  isRuinsTile,
  unitHasTrait,
} from './rules';
import {
  getTile,
  tileIndex,
  type ActionResult,
  type City,
  type CityRewardChoice,
  type Coord,
  type FactionId,
  type GameAction,
  type GameConfig,
  type GameEvent,
  type GameState,
  type PlayerId,
  type PlayerState,
  type TechId,
  type Unit,
  type UnitType,
} from './types';

function allocId(state: GameState, prefix: string): string {
  const id = `${prefix}_${state.nextEntityId}`;
  state.nextEntityId += 1;
  return id;
}

function revealRadius(
  state: GameState,
  player: PlayerState,
  cx: number,
  cy: number,
  radius: number,
): Coord[] {
  const revealed: Coord[] = [];
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const x = cx + dx;
      const y = cy + dy;
      if (x < 0 || y < 0 || x >= state.mapSize || y >= state.mapSize) continue;
      const idx = tileIndex(x, y, state.mapSize);
      if (!player.revealedTiles[idx]) {
        player.revealedTiles[idx] = true;
        revealed.push({ x, y });
      }
    }
  }
  return revealed;
}

function getUnitVisionRadius(state: GameState, player: PlayerState, x: number, y: number): number {
  const tile = getTile(state, x, y);
  if (!tile) return 1;
  let radius = 1;
  if (tile.terrain === 'mountain') {
    radius = 2;
  } else if (
    hasTech(player, 'elves_keen_sight') &&
    (tile.terrain === 'forest' || tile.terrain === 'ancient_woods')
  ) {
    radius = 2;
  }
  return radius;
}

function assignCityBorders(state: GameState, city: City): void {
  const r = city.borderRadius;
  for (let dy = -r; dy <= r; dy++) {
    for (let dx = -r; dx <= r; dx++) {
      const t = getTile(state, city.x + dx, city.y + dy);
      if (!t) continue;
      if (t.cityId === null) {
        t.cityId = city.id;
      }
    }
  }
  const center = getTile(state, city.x, city.y);
  if (center) {
    center.cityId = city.id;
    center.isCityCenter = true;
    center.hasVillage = false;
  }
}

function pickCityName(state: GameState, faction: FactionId): string {
  const used = new Set(Object.values(state.cities).map((c) => c.name));
  const pool = FACTION_DEFINITIONS[faction].cityNames;
  for (const name of pool) {
    if (!used.has(name)) return name;
  }
  let suffix = 2;
  while (true) {
    for (const name of pool) {
      const candidate = `${name} ${suffix}`;
      if (!used.has(candidate)) return candidate;
    }
    suffix++;
  }
}

function refreshPlayerStats(state: GameState): void {
  for (const player of state.players) {
    if (player.faction === 'humans') {
      const connected = computeCapitalConnections(state, player.id);
      for (const city of getPlayerCities(state, player.id)) {
        city.connectedToCapital = connected.has(city.id);
      }
    }
    player.goldPerTurn = calculatePlayerIncome(state, player.id);
    player.score = calculatePlayerScore(state, player.id);
  }
}

function addCityPopulation(
  state: GameState,
  city: City,
  popGain: number,
  events: GameEvent[],
): void {
  if (popGain <= 0) return;
  city.population += popGain;
  const owner = getPlayer(state, city.ownerId);
  while (city.population >= city.level + 1) {
    city.population -= city.level + 1;
    city.level += 1;
    city.pendingLevelRewards.push(city.level);

    // Dwarves Stone Walls: Lv 2+ cities gain free City Walls
    if (owner && hasTech(owner, 'dwarves_stone_walls') && city.level >= 2) {
      city.hasWalls = true;
    }

    events.push({
      type: 'CITY_LEVELED',
      cityId: city.id,
      coord: { x: city.x, y: city.y },
      newLevel: city.level,
      ownerId: city.ownerId,
    });
  }
}

function claimRuinsIfPresent(
  state: GameState,
  player: PlayerState,
  x: number,
  y: number,
  events: GameEvent[],
): void {
  const tile = getTile(state, x, y);
  if (!tile || tile.resource !== 'ruins') return;

  tile.resource = null;

  // Humans Ranger Hunting: Exploring Ancient Ruins grants +2★ bonus
  const huntingBonus = hasTech(player, 'humans_hunting') ? 2 : 0;
  if (huntingBonus > 0) {
    player.gold += huntingBonus;
  }

  const unresearchedT1: TechId[] = getFactionTechs(player.faction)
    .filter((t) => t.tier === 1 && !hasTech(player, t.id))
    .map((t) => t.id);

  const ownedCities = getPlayerCities(state, player.id);

  const options: ('gold' | 'tech' | 'population')[] = ['gold'];
  if (unresearchedT1.length > 0) options.push('tech');
  if (ownedCities.length > 0) options.push('population');

  const roll = nextInt(state.rngState, 0, options.length - 1);
  state.rngState = roll.nextState;
  const choice = options[roll.value];

  if (choice === 'gold') {
    const baseGold = 5;
    player.gold += baseGold;
    events.push({
      type: 'RUINS_CLAIMED',
      coord: { x, y },
      playerId: player.id,
      rewardKind: 'gold',
      amount: baseGold + huntingBonus,
    });
  } else if (choice === 'tech') {
    const tRoll = nextInt(state.rngState, 0, unresearchedT1.length - 1);
    state.rngState = tRoll.nextState;
    const techId = unresearchedT1[tRoll.value];
    player.techs.push(techId);
    events.push({
      type: 'RUINS_CLAIMED',
      coord: { x, y },
      playerId: player.id,
      rewardKind: 'tech',
      techId,
      amount: huntingBonus > 0 ? huntingBonus : undefined,
    });
    events.push({
      type: 'TECH_RESEARCHED',
      playerId: player.id,
      techId,
      cost: 0,
    });
  } else {
    // Nearest owned city gets +3 Pop
    let nearest = ownedCities[0];
    let bestDist = chebyshevDist({ x, y }, nearest);
    for (let i = 1; i < ownedCities.length; i++) {
      const d = chebyshevDist({ x, y }, ownedCities[i]);
      if (d < bestDist) {
        bestDist = d;
        nearest = ownedCities[i];
      }
    }
    events.push({
      type: 'RUINS_CLAIMED',
      coord: { x, y },
      playerId: player.id,
      rewardKind: 'population',
      amount: 3,
      cityId: nearest.id,
    });
    addCityPopulation(state, nearest, 3, events);
  }
}

function createUnitEntity(
  state: GameState,
  ownerId: PlayerId,
  unitType: UnitType,
  x: number,
  y: number,
  homeCityId: string | null,
  options?: { ready?: boolean; isVeteran?: boolean; bonusMaxHp?: number },
): Unit {
  const maxHp = getUnitTrainMaxHp(state, ownerId, unitType) + (options?.bonusMaxHp ?? 0);
  const ready = options?.ready ?? false;
  const unit: Unit = {
    id: allocId(state, 'unit'),
    type: unitType,
    ownerId,
    homeCityId,
    x,
    y,
    hp: maxHp,
    maxHp,
    kills: 0,
    isVeteran: options?.isVeteran ?? false,
    canPromote: false,
    hasMoved: !ready,
    hasAttacked: !ready,
    canEscapeMove: false,
    canPersistAttack: false,
    actedThisTurn: !ready,
    canCapture: false,
    canExploreRuins: false,
  };
  state.units[unit.id] = unit;
  const tile = getTile(state, x, y);
  if (tile) tile.unitId = unit.id;
  return unit;
}

export function createGame(config: GameConfig): GameState {
  const seed = normalizeSeed(config.seed);
  const generated = generateMap(config.mapSize, seed);

  // Place human faction first so activePlayerIndex 0 is always the human player
  const factionOrder: FactionId[] = [
    config.humanFaction,
    ...ALL_FACTIONS.filter((f) => f !== config.humanFaction),
  ];

  const players: PlayerState[] = factionOrder.map((faction) => {
    const def = FACTION_DEFINITIONS[faction];
    return {
      id: `player_${faction}`,
      faction,
      name: def.name,
      isHuman: faction === config.humanFaction,
      gold: def.startingGold,
      goldPerTurn: 0,
      score: 0,
      techs: [def.startingTech],
      revealedTiles: new Array<boolean>(config.mapSize * config.mapSize).fill(false),
      alive: true,
      eliminatedOnTurn: null,
      superpowerUsed: false,
    };
  });

  const state: GameState = {
    config: { ...config },
    mapSize: config.mapSize,
    turn: 1,
    activePlayerIndex: 0,
    phase: 'playing',
    winnerId: null,
    winReason: null,
    eclipseTurnsRemaining: 0,
    eclipseOwnerId: null,
    rngState: generated.rngState,
    nextEntityId: 1,
    players,
    tiles: generated.tiles,
    cities: {},
    units: {},
  };

  // Spawn capitals & starting units
  for (const player of state.players) {
    const def = FACTION_DEFINITIONS[player.faction];
    const cap = generated.capitalCoords[player.faction];
    const cityId = allocId(state, 'city');
    const city: City = {
      id: cityId,
      name: def.cityNames[0],
      ownerId: player.id,
      styleFaction: player.faction,
      x: cap.x,
      y: cap.y,
      isCapital: true,
      level: 1,
      population: 0,
      hasWorkshop: false,
      hasWalls: false,
      borderRadius: 1,
      parks: 0,
      pendingLevelRewards: [],
      connectedToCapital: true,
    };
    state.cities[cityId] = city;
    assignCityBorders(state, city);

    // Capital reveals 5x5 at start
    revealRadius(state, player, cap.x, cap.y, 2);

    // Starting unit is ready on Turn 1
    createUnitEntity(state, player.id, def.startingUnit, cap.x, cap.y, cityId, {
      ready: true,
    });
  }

  refreshPlayerStats(state);
  return state;
}

export function cloneState(state: GameState): GameState {
  const cities: Record<string, City> = {};
  for (const [id, c] of Object.entries(state.cities)) {
    cities[id] = {
      ...c,
      pendingLevelRewards: c.pendingLevelRewards.slice(),
    };
  }

  const units: Record<string, Unit> = {};
  for (const [id, u] of Object.entries(state.units)) {
    units[id] = { ...u };
  }

  return {
    config: { ...state.config },
    mapSize: state.mapSize,
    turn: state.turn,
    activePlayerIndex: state.activePlayerIndex,
    phase: state.phase,
    winnerId: state.winnerId,
    winReason: state.winReason,
    eclipseTurnsRemaining: state.eclipseTurnsRemaining ?? 0,
    eclipseOwnerId: state.eclipseOwnerId ?? null,
    rngState: state.rngState,
    nextEntityId: state.nextEntityId,
    players: state.players.map((p) => ({
      ...p,
      superpowerUsed: p.superpowerUsed ?? false,
      techs: p.techs.slice(),
      revealedTiles: p.revealedTiles.slice(),
    })),
    tiles: state.tiles.map((t) => ({ ...t })),
    cities,
    units,
  };
}

function isValidRewardForLevel(level: number, reward: CityRewardChoice): boolean {
  if (level === 2) return reward === 'workshop' || reward === 'explorer';
  if (level === 3) return reward === 'city_wall' || reward === 'resources';
  if (level === 4) return reward === 'border_growth' || reward === 'pop_growth';
  if (level >= 5) return reward === 'champion' || reward === 'park';
  return false;
}

function buildScoresRecord(state: GameState): Record<PlayerId, number> {
  const scores: Record<PlayerId, number> = {};
  for (const p of state.players) {
    scores[p.id] = calculatePlayerScore(state, p.id);
    p.score = scores[p.id];
  }
  return scores;
}

function checkDominationWinner(state: GameState, candidateId: PlayerId): boolean {
  const capitals = Object.values(state.cities).filter((c) => c.isCapital);
  if (capitals.length > 0 && capitals.every((c) => c.ownerId === candidateId)) {
    return true;
  }
  const alivePlayers = state.players.filter((p) => p.alive);
  return alivePlayers.length === 1 && alivePlayers[0].id === candidateId;
}

function handleStartOfTurn(state: GameState, player: PlayerState, events: GameEvent[]): void {
  // 1. Passive city healing at turn start
  const ownedCities = getPlayerCities(state, player.id);
  const healedUnitIds = new Set<string>();

  // Humans Citadel Masonry: walled cities heal garrison +2 HP/turn
  if (hasTech(player, 'humans_citadel_masonry')) {
    const wallHeal = 2;
    for (const city of ownedCities) {
      if (!city.hasWalls) continue;
      const tile = getTile(state, city.x, city.y);
      if (!tile || !tile.unitId) continue;
      const u = state.units[tile.unitId];
      if (u && u.ownerId === player.id && u.hp < u.maxHp && !healedUnitIds.has(u.id)) {
        const before = u.hp;
        u.hp = Math.min(u.maxHp, u.hp + wallHeal);
        healedUnitIds.add(u.id);
        events.push({
          type: 'UNIT_HEALED',
          unitId: u.id,
          coord: { x: u.x, y: u.y },
          amount: u.hp - before,
          newHp: u.hp,
        });
      }
    }
  }

  // Elves Rings of Preservation (T3): cities heal adjacent friendly units +2 HP/turn
  if (hasTech(player, 'elves_rings_preservation')) {
    for (const city of ownedCities) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const t = getTile(state, city.x + dx, city.y + dy);
          if (!t || !t.unitId) continue;
          const u = state.units[t.unitId];
          if (u && u.ownerId === player.id && u.hp < u.maxHp && !healedUnitIds.has(u.id)) {
            const before = u.hp;
            u.hp = Math.min(u.maxHp, u.hp + 2);
            healedUnitIds.add(u.id);
            events.push({
              type: 'UNIT_HEALED',
              unitId: u.id,
              coord: { x: u.x, y: u.y },
              amount: u.hp - before,
              newHp: u.hp,
            });
          }
        }
      }
    }
  }

  // Elves Wind Riders (T3): friendly units heal +2 HP/turn passively inside friendly borders
  if (hasTech(player, 'elves_wind_riders')) {
    for (const u of Object.values(state.units)) {
      if (u.ownerId !== player.id || u.hp >= u.maxHp || healedUnitIds.has(u.id)) continue;
      const t = getTile(state, u.x, u.y);
      if (t && t.cityId && state.cities[t.cityId]?.ownerId === player.id) {
        const before = u.hp;
        u.hp = Math.min(u.maxHp, u.hp + 2);
        healedUnitIds.add(u.id);
        events.push({
          type: 'UNIT_HEALED',
          unitId: u.id,
          coord: { x: u.x, y: u.y },
          amount: u.hp - before,
          newHp: u.hp,
        });
      }
    }
  }

  // 2. Recompute connections & collect income
  refreshPlayerStats(state);
  const goldGained = calculatePlayerIncome(state, player.id);
  player.gold += goldGained;
  player.goldPerTurn = goldGained;

  // 3. Refresh units for the new turn & flag explicit next-turn captures and ruins exploration
  for (const unit of Object.values(state.units)) {
    if (unit.ownerId !== player.id) continue;
    unit.hasMoved = false;
    unit.hasAttacked = false;
    unit.canEscapeMove = false;
    unit.canPersistAttack = false;
    unit.actedThisTurn = false;
    unit.canCapture = isCapturableTileForPlayer(state, player.id, unit.x, unit.y);
    unit.canExploreRuins = isRuinsTile(state, unit.x, unit.y);
  }

  events.push({
    type: 'TURN_STARTED',
    playerId: player.id,
    turn: state.turn,
    goldGained,
  });
}

export function applyAction(state: GameState, action: GameAction): ActionResult {
  const next = cloneState(state);
  const events: GameEvent[] = [];

  if (next.phase === 'game_over') {
    return { state: next, events };
  }

  const activePlayer = getActivePlayer(next);
  if (!activePlayer || !activePlayer.alive) {
    return { state: next, events };
  }

  switch (action.type) {
    case 'MOVE_UNIT': {
      const unit = next.units[action.unitId];
      if (!unit || unit.ownerId !== activePlayer.id) break;

      const valid = getValidMoves(next, unit.id);
      if (!valid.some((c) => c.x === action.to.x && c.y === action.to.y)) break;

      const from: Coord = { x: unit.x, y: unit.y };
      const fromTile = getTile(next, from.x, from.y);
      const toTile = getTile(next, action.to.x, action.to.y);
      if (!fromTile || !toTile || toTile.unitId !== null) break;

      fromTile.unitId = null;
      unit.x = action.to.x;
      unit.y = action.to.y;
      toTile.unitId = unit.id;
      unit.canCapture = false;
      unit.canExploreRuins = false;

      if (unit.canEscapeMove) {
        unit.canEscapeMove = false;
        unit.hasMoved = true;
        unit.actedThisTurn = true;
      } else {
        unit.hasMoved = true;
        if (!unitHasTrait(next, unit, 'dash')) {
          unit.actedThisTurn = true;
        }
      }

      events.push({
        type: 'UNIT_MOVED',
        unitId: unit.id,
        from,
        to: { ...action.to },
        ownerId: activePlayer.id,
      });

      const vision = getUnitVisionRadius(next, activePlayer, unit.x, unit.y);
      const revealed = revealRadius(next, activePlayer, unit.x, unit.y, vision);
      if (revealed.length > 0) {
        events.push({ type: 'TILES_REVEALED', playerId: activePlayer.id, coords: revealed });
      }

      // Auto-exhaust Dash units immediately if no enemies are in attack range after moving
      if (!unit.actedThisTurn) {
        const canDashAttack =
          !unit.hasAttacked &&
          unitHasTrait(next, unit, 'dash') &&
          getValidAttackTargets(next, unit.id).length > 0;
        if (!canDashAttack) {
          unit.actedThisTurn = true;
        }
      }
      break;
    }

    case 'ATTACK_UNIT': {
      const attacker = next.units[action.attackerId];
      const defender = next.units[action.defenderId];
      if (!attacker || !defender || attacker.ownerId !== activePlayer.id) break;
      if (defender.ownerId === activePlayer.id) break;

      const validTargets = getValidAttackTargets(next, attacker.id);
      if (!validTargets.some((c) => c.x === defender.x && c.y === defender.y)) break;

      attacker.canCapture = false;
      attacker.canExploreRuins = false;

      const preview = predictCombat(next, attacker.id, defender.id);
      const from: Coord = { x: attacker.x, y: attacker.y };
      const to: Coord = { x: defender.x, y: defender.y };
      const isRanged = UNIT_DEFINITIONS[attacker.type].range > 1;
      const defenderHasStalwart = unitHasTrait(next, defender, 'stalwart');
      const defenderOwner = getPlayer(next, defender.ownerId);

      const atkTile = getTile(next, from.x, from.y);
      const defTile = getTile(next, to.x, to.y);

      events.push({
        type: 'UNIT_ATTACKED',
        attackerId: attacker.id,
        defenderId: defender.id,
        from,
        to,
        isRanged,
        damage: preview.attackerDamage,
        retaliationDamage: preview.retaliationDamage,
        defenderKilled: preview.defenderKilled,
        attackerKilled: preview.attackerKilled,
        advanced: preview.willAdvance,
      });

      if (preview.defenderKilled) {
        if (defTile && defTile.unitId === defender.id) defTile.unitId = null;
        delete next.units[defender.id];

        attacker.kills += 1;
        if (attacker.kills >= 3 && !attacker.isVeteran) {
          attacker.canPromote = true;
        }

        // Orcs Spoils of War: +2★ on enemy kill (+3★ with Spoils Mastery)
        if (activePlayer.faction === 'orcs') {
          const killSpoils = hasTech(activePlayer, 'orcs_spoils_mastery') ? 3 : 2;
          activePlayer.gold += killSpoils;
          events.push({
            type: 'SPOILS_GAINED',
            playerId: activePlayer.id,
            coord: to,
            amount: killSpoils,
          });
        }

        if (preview.willAdvance && atkTile && defTile) {
          atkTile.unitId = null;
          attacker.x = to.x;
          attacker.y = to.y;
          defTile.unitId = attacker.id;

          const vision = getUnitVisionRadius(next, activePlayer, attacker.x, attacker.y);
          const revealed = revealRadius(next, activePlayer, attacker.x, attacker.y, vision);
          if (revealed.length > 0) {
            events.push({ type: 'TILES_REVEALED', playerId: activePlayer.id, coords: revealed });
          }
        }

        // Persist vs Escape/Skirmish vs Exhaust
        if (unitHasTrait(next, attacker, 'persist') && !defenderHasStalwart) {
          attacker.canPersistAttack = true;
          attacker.hasAttacked = false;
          attacker.actedThisTurn = false;
        } else if (
          unitHasTrait(next, attacker, 'escape') ||
          unitHasTrait(next, attacker, 'skirmish')
        ) {
          attacker.hasAttacked = true;
          attacker.canPersistAttack = false;
          attacker.canEscapeMove = true;
          attacker.actedThisTurn = false;
        } else {
          attacker.hasAttacked = true;
          attacker.canPersistAttack = false;
          attacker.actedThisTurn = true;
        }
      } else {
        defender.hp -= preview.attackerDamage;
        attacker.hp -= preview.retaliationDamage;

        if (preview.attackerKilled) {
          if (atkTile && atkTile.unitId === attacker.id) atkTile.unitId = null;
          delete next.units[attacker.id];

          defender.kills += 1;
          if (defender.kills >= 3 && !defender.isVeteran) {
            defender.canPromote = true;
          }

          if (defenderOwner && defenderOwner.faction === 'orcs') {
            const killSpoils = hasTech(defenderOwner, 'orcs_spoils_mastery') ? 3 : 2;
            defenderOwner.gold += killSpoils;
            events.push({
              type: 'SPOILS_GAINED',
              playerId: defenderOwner.id,
              coord: from,
              amount: killSpoils,
            });
          }
        } else {
          attacker.hasAttacked = true;
          attacker.canPersistAttack = false;
          if (
            unitHasTrait(next, attacker, 'escape') ||
            unitHasTrait(next, attacker, 'skirmish')
          ) {
            attacker.canEscapeMove = true;
            attacker.actedThisTurn = false;
          } else {
            attacker.actedThisTurn = true;
          }
        }
      }

      // Auto-exhaust surviving Persist/Escape units if no real follow-up target or move exists
      if (next.units[attacker.id] && !attacker.actedThisTurn) {
        if (attacker.canPersistAttack) {
          if (getValidAttackTargets(next, attacker.id).length === 0) {
            attacker.canPersistAttack = false;
            attacker.hasAttacked = true;
            attacker.actedThisTurn = true;
          }
        } else if (attacker.canEscapeMove) {
          if (getValidMoves(next, attacker.id).length === 0) {
            attacker.canEscapeMove = false;
            attacker.actedThisTurn = true;
          }
        }
      }
      break;
    }

    case 'CAPTURE_CITY': {
      const unit = next.units[action.unitId];
      if (!unit || unit.ownerId !== activePlayer.id) break;
      if (!canUnitCapture(next, unit.id)) break;

      const tile = getTile(next, unit.x, unit.y);
      if (!tile) break;

      if (tile.hasVillage && !tile.cityId) {
        unit.hasMoved = true;
        unit.hasAttacked = true;
        unit.canEscapeMove = false;
        unit.canPersistAttack = false;
        unit.actedThisTurn = true;
        unit.canCapture = false;
        unit.canExploreRuins = false;

        const cityId = allocId(next, 'city');
        const city: City = {
          id: cityId,
          name: pickCityName(next, activePlayer.faction),
          ownerId: activePlayer.id,
          styleFaction: activePlayer.faction,
          x: tile.x,
          y: tile.y,
          isCapital: false,
          level: 1,
          population: 0,
          hasWorkshop: false,
          hasWalls: false,
          borderRadius: 1,
          parks: 0,
          pendingLevelRewards: [],
          connectedToCapital: false,
        };
        next.cities[cityId] = city;
        assignCityBorders(next, city);

        const revealed = revealRadius(next, activePlayer, tile.x, tile.y, 1);
        if (revealed.length > 0) {
          events.push({ type: 'TILES_REVEALED', playerId: activePlayer.id, coords: revealed });
        }

        let spoilsGold: number | undefined;
        if (activePlayer.faction === 'orcs') {
          spoilsGold = hasTech(activePlayer, 'orcs_spoils_mastery') ? 5 : 4;
          activePlayer.gold += spoilsGold;
        }

        events.push({
          type: 'CITY_CAPTURED',
          cityId,
          coord: { x: tile.x, y: tile.y },
          oldOwnerId: null,
          newOwnerId: activePlayer.id,
          wasVillage: true,
          spoilsGold,
        });

        if (spoilsGold) {
          events.push({
            type: 'SPOILS_GAINED',
            playerId: activePlayer.id,
            coord: { x: tile.x, y: tile.y },
            amount: spoilsGold,
          });
        }
      } else if (tile.isCityCenter && tile.cityId) {
        const city = next.cities[tile.cityId];
        if (!city || city.ownerId === activePlayer.id) break;

        unit.hasMoved = true;
        unit.hasAttacked = true;
        unit.canEscapeMove = false;
        unit.canPersistAttack = false;
        unit.actedThisTurn = true;
        unit.canCapture = false;
        unit.canExploreRuins = false;

        const oldOwnerId = city.ownerId;
        city.ownerId = activePlayer.id;
        city.styleFaction = activePlayer.faction;

        // Detach old owner's units from this city's unit cap
        for (const u of Object.values(next.units)) {
          if (u.homeCityId === city.id && u.ownerId === oldOwnerId) {
            u.homeCityId = null;
          }
        }

        // Dwarves Stone Walls: Lv 2+ cities gain free City Walls
        if (hasTech(activePlayer, 'dwarves_stone_walls') && city.level >= 2) {
          city.hasWalls = true;
        }

        const revealed = revealRadius(next, activePlayer, tile.x, tile.y, 1);
        if (revealed.length > 0) {
          events.push({ type: 'TILES_REVEALED', playerId: activePlayer.id, coords: revealed });
        }

        let spoilsGold: number | undefined;
        if (activePlayer.faction === 'orcs') {
          spoilsGold = hasTech(activePlayer, 'orcs_spoils_mastery') ? 5 : 4;
          activePlayer.gold += spoilsGold;
        }

        events.push({
          type: 'CITY_CAPTURED',
          cityId: city.id,
          coord: { x: tile.x, y: tile.y },
          oldOwnerId,
          newOwnerId: activePlayer.id,
          wasVillage: false,
          spoilsGold,
        });

        if (spoilsGold) {
          events.push({
            type: 'SPOILS_GAINED',
            playerId: activePlayer.id,
            coord: { x: tile.x, y: tile.y },
            amount: spoilsGold,
          });
        }

        // Check if oldOwner was eliminated (0 cities left)
        const oldOwner = getPlayer(next, oldOwnerId);
        if (oldOwner && oldOwner.alive && getPlayerCities(next, oldOwnerId).length === 0) {
          oldOwner.alive = false;
          oldOwner.eliminatedOnTurn = next.turn;
          // Remove remaining units of eliminated player
          for (const u of Object.values(next.units)) {
            if (u.ownerId === oldOwnerId) {
              const ut = getTile(next, u.x, u.y);
              if (ut && ut.unitId === u.id) ut.unitId = null;
              delete next.units[u.id];
            }
          }
          events.push({
            type: 'PLAYER_ELIMINATED',
            playerId: oldOwnerId,
            eliminatedByPlayerId: activePlayer.id,
          });
        }

        // Check Domination victory
        if (checkDominationWinner(next, activePlayer.id)) {
          refreshPlayerStats(next);
          const scores = buildScoresRecord(next);
          next.phase = 'game_over';
          next.winnerId = activePlayer.id;
          next.winReason = 'domination';
          events.push({
            type: 'GAME_OVER',
            winnerId: activePlayer.id,
            reason: 'domination',
            scores,
          });
          return { state: next, events };
        }
      }
      break;
    }

    case 'EXPLORE_RUINS': {
      const unit = next.units[action.unitId];
      if (!unit || unit.ownerId !== activePlayer.id) break;
      if (!canUnitExploreRuins(next, unit.id)) break;

      const tile = getTile(next, unit.x, unit.y);
      if (!tile || tile.resource !== 'ruins') break;

      unit.hasMoved = true;
      unit.hasAttacked = true;
      unit.canEscapeMove = false;
      unit.canPersistAttack = false;
      unit.actedThisTurn = true;
      unit.canCapture = false;
      unit.canExploreRuins = false;

      claimRuinsIfPresent(next, activePlayer, unit.x, unit.y, events);
      break;
    }

    case 'RECOVER_UNIT': {
      const unit = next.units[action.unitId];
      if (!unit || unit.ownerId !== activePlayer.id) break;
      if (unit.hasMoved || unit.hasAttacked || unit.actedThisTurn) break;
      if (unit.hp >= unit.maxHp) break;

      const tile = getTile(next, unit.x, unit.y);
      const inFriendlyBorders =
        tile !== null &&
        tile.cityId !== null &&
        next.cities[tile.cityId]?.ownerId === activePlayer.id;

      const healAmount = inFriendlyBorders ? 4 : 2;
      const before = unit.hp;
      unit.hp = Math.min(unit.maxHp, unit.hp + healAmount);
      unit.hasMoved = true;
      unit.hasAttacked = true;
      unit.actedThisTurn = true;
      unit.canCapture = false;
      unit.canExploreRuins = false;

      events.push({
        type: 'UNIT_HEALED',
        unitId: unit.id,
        coord: { x: unit.x, y: unit.y },
        amount: unit.hp - before,
        newHp: unit.hp,
      });
      break;
    }

    case 'PROMOTE_UNIT': {
      const unit = next.units[action.unitId];
      if (!unit || unit.ownerId !== activePlayer.id) break;
      if ((!unit.canPromote && unit.kills < 3) || unit.isVeteran) break;

      unit.isVeteran = true;
      unit.canPromote = false;
      unit.maxHp += 5;
      unit.hp = unit.maxHp;

      if (!unit.actedThisTurn && !hasUnitRemainingActions(next, unit.id)) {
        unit.actedThisTurn = true;
      }

      events.push({
        type: 'UNIT_PROMOTED',
        unitId: unit.id,
        coord: { x: unit.x, y: unit.y },
        newMaxHp: unit.maxHp,
      });
      break;
    }

    case 'HARVEST_TILE': {
      const available = getAvailableTileActions(
        next,
        activePlayer.id,
        action.coord.x,
        action.coord.y,
      );
      if (!available.some((a) => a.type === 'HARVEST_TILE')) break;

      const tile = getTile(next, action.coord.x, action.coord.y);
      if (!tile || !tile.cityId || !tile.resource || tile.resource === 'ruins') break;
      const city = next.cities[tile.cityId];
      if (!city || city.ownerId !== activePlayer.id) break;

      const resource = tile.resource;
      const popGained = RESOURCE_POP_GAIN[resource];
      activePlayer.gold -= HARVEST_COST;
      tile.resource = null;

      events.push({
        type: 'RESOURCE_HARVESTED',
        coord: { ...action.coord },
        resource,
        cityId: city.id,
        popGained,
        playerId: activePlayer.id,
      });

      addCityPopulation(next, city, popGained, events);
      break;
    }

    case 'BUILD_IMPROVEMENT': {
      const available = getAvailableTileActions(
        next,
        activePlayer.id,
        action.coord.x,
        action.coord.y,
      );
      if (
        !available.some(
          (a) => a.type === 'BUILD_IMPROVEMENT' && a.improvement === action.improvement,
        )
      ) {
        break;
      }

      const tile = getTile(next, action.coord.x, action.coord.y);
      if (!tile || !tile.cityId) break;
      const city = next.cities[tile.cityId];
      if (!city || city.ownerId !== activePlayer.id) break;

      const def = IMPROVEMENT_DEFINITIONS[action.improvement];
      const popGained = getImprovementPopGain(
        next,
        action.coord.x,
        action.coord.y,
        action.improvement,
      );

      activePlayer.gold -= def.cost;
      tile.improvement = action.improvement;

      events.push({
        type: 'IMPROVEMENT_BUILT',
        coord: { ...action.coord },
        improvement: action.improvement,
        cityId: city.id,
        popGained,
        playerId: activePlayer.id,
      });

      addCityPopulation(next, city, popGained, events);

      // Retroactive adjacency bonus if placing a Farm next to a Windmill, or Mine next to a Great Forge
      if (action.improvement === 'farm' || action.improvement === 'mine') {
        const targetImp = action.improvement === 'farm' ? 'windmill' : 'great_forge';
        const bonusPop = action.improvement === 'farm' ? 1 : 2;
        for (const neighbor of getNeighbors8(next, action.coord.x, action.coord.y)) {
          if (neighbor.improvement === targetImp && neighbor.cityId) {
            const nCity = next.cities[neighbor.cityId];
            if (nCity && nCity.ownerId === activePlayer.id) {
              addCityPopulation(next, nCity, bonusPop, events);
            }
          }
        }
      }
      break;
    }

    case 'BUILD_ROAD': {
      const available = getAvailableTileActions(
        next,
        activePlayer.id,
        action.coord.x,
        action.coord.y,
      );
      if (!available.some((a) => a.type === 'BUILD_ROAD')) break;

      const tile = getTile(next, action.coord.x, action.coord.y);
      if (!tile) break;

      activePlayer.gold -= ROAD_COST;
      tile.hasRoad = true;

      events.push({
        type: 'ROAD_BUILT',
        coord: { ...action.coord },
        playerId: activePlayer.id,
      });
      break;
    }

    case 'CHOP_FOREST': {
      const available = getAvailableTileActions(
        next,
        activePlayer.id,
        action.coord.x,
        action.coord.y,
      );
      if (!available.some((a) => a.type === 'CHOP_FOREST')) break;

      const tile = getTile(next, action.coord.x, action.coord.y);
      if (!tile) break;

      tile.terrain = 'plains';
      if (tile.improvement === 'sanctuary') {
        tile.improvement = null;
      }
      activePlayer.gold += CHOP_FOREST_GOLD;

      events.push({
        type: 'FOREST_CHOPPED',
        coord: { ...action.coord },
        goldGained: CHOP_FOREST_GOLD,
        playerId: activePlayer.id,
      });
      break;
    }

    case 'PLANT_ANCIENT_WOODS': {
      const available = getAvailableTileActions(
        next,
        activePlayer.id,
        action.coord.x,
        action.coord.y,
      );
      if (!available.some((a) => a.type === 'PLANT_ANCIENT_WOODS')) break;

      const tile = getTile(next, action.coord.x, action.coord.y);
      if (!tile || !tile.cityId) break;
      const city = next.cities[tile.cityId];
      if (!city || city.ownerId !== activePlayer.id) break;

      activePlayer.gold -= PLANT_WOODS_COST;
      tile.terrain = 'ancient_woods';

      events.push({
        type: 'WOODS_PLANTED',
        coord: { ...action.coord },
        cityId: city.id,
        popGained: 1,
        playerId: activePlayer.id,
      });

      addCityPopulation(next, city, 1, events);
      break;
    }

    case 'TRAIN_UNIT': {
      const city = next.cities[action.cityId];
      if (!city || city.ownerId !== activePlayer.id) break;

      const tile = getTile(next, city.x, city.y);
      if (!tile || tile.unitId !== null) break;

      const trainable = getTrainableUnits(next, city.id);
      if (!trainable.includes(action.unitType)) break;

      if (getCityUnitCount(next, city.id) >= getCityUnitCap(next, city)) break;

      const cost = getUnitCost(next, activePlayer.id, action.unitType);
      if (activePlayer.gold < cost) break;

      activePlayer.gold -= cost;
      const unit = createUnitEntity(
        next,
        activePlayer.id,
        action.unitType,
        city.x,
        city.y,
        city.id,
        { ready: false },
      );

      events.push({
        type: 'UNIT_TRAINED',
        unitId: unit.id,
        unitType: unit.type,
        cityId: city.id,
        coord: { x: city.x, y: city.y },
        ownerId: activePlayer.id,
      });
      break;
    }

    case 'RESEARCH_TECH': {
      if (!canResearchTech(next, activePlayer.id, action.techId)) break;

      const cost = getTechCost(next, activePlayer.id, action.techId);
      activePlayer.gold -= cost;
      activePlayer.techs.push(action.techId);

      events.push({
        type: 'TECH_RESEARCHED',
        playerId: activePlayer.id,
        techId: action.techId,
        cost,
      });

      // Immediate tech effects
      if (action.techId === 'dwarves_stone_walls') {
        for (const city of getPlayerCities(next, activePlayer.id)) {
          if (city.level >= 2) {
            city.hasWalls = true;
          }
        }
      } else if (action.techId === 'elves_keen_sight') {
        const newlyRevealed: Coord[] = [];
        for (const u of Object.values(next.units)) {
          if (u.ownerId !== activePlayer.id) continue;
          const t = getTile(next, u.x, u.y);
          if (t && (t.terrain === 'forest' || t.terrain === 'ancient_woods')) {
            const vision = getUnitVisionRadius(next, activePlayer, u.x, u.y);
            newlyRevealed.push(...revealRadius(next, activePlayer, u.x, u.y, vision));
          }
        }
        if (newlyRevealed.length > 0) {
          events.push({
            type: 'TILES_REVEALED',
            playerId: activePlayer.id,
            coords: newlyRevealed,
          });
        }
      } else if (action.techId === 'humans_ride_of_rohirrim') {
        for (const u of Object.values(next.units)) {
          if (u.ownerId === activePlayer.id && (u.type === 'rider' || u.type === 'rohirrim_knight')) {
            u.maxHp += 3;
            u.hp += 3;
          }
        }
      } else if (action.techId === 'orcs_pack_tactics') {
        for (const u of Object.values(next.units)) {
          if (u.ownerId === activePlayer.id && u.type === 'rider') {
            u.maxHp += 3;
            u.hp += 3;
          }
        }
      } else if (action.techId === 'orcs_black_gate') {
        for (const u of Object.values(next.units)) {
          if (u.ownerId === activePlayer.id && u.type === 'uruk_berserker') {
            u.maxHp += 3;
            u.hp += 3;
          }
        }
      } else if (action.techId === 'elves_galadhrim_precision') {
        for (const u of Object.values(next.units)) {
          if (u.ownerId === activePlayer.id && u.type === 'elven_sentinel') {
            u.maxHp += 3;
            u.hp += 3;
          }
        }
      } else if (action.techId === 'dwarves_mithril_phalanx') {
        for (const u of Object.values(next.units)) {
          if (u.ownerId === activePlayer.id && (u.type === 'ironbreaker' || u.type === 'defender')) {
            u.maxHp += 4;
            u.hp += 4;
          }
        }
      } else if (action.techId === 'dwarves_dragon_slayers') {
        for (const u of Object.values(next.units)) {
          if (u.ownerId === activePlayer.id && u.type === 'catapult') {
            u.maxHp += 5;
            u.hp += 5;
          }
        }
      }
      break;
    }

    case 'CHOOSE_CITY_REWARD': {
      const city = next.cities[action.cityId];
      if (!city || city.ownerId !== activePlayer.id) break;
      if (city.pendingLevelRewards.length === 0) break;

      const rewardLevel = city.pendingLevelRewards[0];
      if (!isValidRewardForLevel(rewardLevel, action.reward)) break;

      city.pendingLevelRewards.shift();

      if (action.reward === 'workshop') {
        city.hasWorkshop = true;
      } else if (action.reward === 'explorer') {
        // Reveal up to 10 closest unrevealed fog tiles around the city
        const unrevealed: { coord: Coord; dist: number }[] = [];
        for (let y = 0; y < next.mapSize; y++) {
          for (let x = 0; x < next.mapSize; x++) {
            const idx = tileIndex(x, y, next.mapSize);
            if (!activePlayer.revealedTiles[idx]) {
              const d = (x - city.x) ** 2 + (y - city.y) ** 2;
              unrevealed.push({ coord: { x, y }, dist: d });
            }
          }
        }
        unrevealed.sort((a, b) => a.dist - b.dist);
        const toReveal = unrevealed.slice(0, 10).map((item) => item.coord);
        for (const c of toReveal) {
          activePlayer.revealedTiles[tileIndex(c.x, c.y, next.mapSize)] = true;
        }
        if (toReveal.length > 0) {
          events.push({
            type: 'TILES_REVEALED',
            playerId: activePlayer.id,
            coords: toReveal,
          });
        }
      } else if (action.reward === 'city_wall') {
        city.hasWalls = true;
      } else if (action.reward === 'resources') {
        activePlayer.gold += 5;
      } else if (action.reward === 'border_growth') {
        city.borderRadius = 2;
        assignCityBorders(next, city);
      } else if (action.reward === 'pop_growth') {
        addCityPopulation(next, city, 3, events);
      } else if (action.reward === 'champion') {
        const uniqueType = FACTION_DEFINITIONS[activePlayer.faction].uniqueUnit;
        // Find empty spawn tile (city center first, else nearest passable empty tile within radius 2)
        let spawnCoord: Coord | null = null;
        const centerTile = getTile(next, city.x, city.y);
        if (centerTile && centerTile.unitId === null) {
          spawnCoord = { x: city.x, y: city.y };
        } else {
          const candidates: { coord: Coord; dist: number }[] = [];
          for (let dy = -2; dy <= 2; dy++) {
            for (let dx = -2; dx <= 2; dx++) {
              const t = getTile(next, city.x + dx, city.y + dy);
              if (!t || t.unitId !== null) continue;
              if (t.terrain === 'water') continue;
              if (t.terrain === 'mountain' && !canPassMountains(activePlayer)) continue;
              candidates.push({ coord: { x: t.x, y: t.y }, dist: dx * dx + dy * dy });
            }
          }
          candidates.sort((a, b) => a.dist - b.dist);
          if (candidates.length > 0) spawnCoord = candidates[0].coord;
        }
        if (spawnCoord) {
          const champ = createUnitEntity(
            next,
            activePlayer.id,
            uniqueType,
            spawnCoord.x,
            spawnCoord.y,
            null,
            { ready: false, isVeteran: true, bonusMaxHp: 5 },
          );
          events.push({
            type: 'UNIT_TRAINED',
            unitId: champ.id,
            unitType: champ.type,
            cityId: city.id,
            coord: spawnCoord,
            ownerId: activePlayer.id,
          });
        }
      } else if (action.reward === 'park') {
        city.parks += 1;
      }

      events.push({
        type: 'CITY_REWARD_APPLIED',
        cityId: city.id,
        coord: { x: city.x, y: city.y },
        reward: action.reward,
        ownerId: activePlayer.id,
      });
      break;
    }

    case 'USE_SUPERPOWER': {
      if (!canUseSuperpower(next, activePlayer.id)) break;

      if (activePlayer.faction === 'elves') {
        next.eclipseTurnsRemaining = 3;
        next.eclipseOwnerId = activePlayer.id;
        activePlayer.superpowerUsed = true;
        events.push({
          type: 'SUPERPOWER_USED',
          playerId: activePlayer.id,
          faction: activePlayer.faction,
        });
      } else if (activePlayer.faction === 'orcs') {
        const target = action.target;
        if (!target) break;
        const centerTile = getTile(next, target.x, target.y);
        if (!centerTile) break;
        if (!activePlayer.revealedTiles[tileIndex(target.x, target.y, next.mapSize)]) break;

        const affectedCoords: Coord[] = [];
        const destroyedUnitIds: string[] = [];

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const tile = getTile(next, target.x + dx, target.y + dy);
            if (!tile) continue;
            affectedCoords.push({ x: tile.x, y: tile.y });

            if (tile.unitId !== null) {
              const victim = next.units[tile.unitId];
              if (victim && victim.ownerId !== activePlayer.id) {
                destroyedUnitIds.push(victim.id);
                delete next.units[victim.id];
                tile.unitId = null;
              }
            }

            tile.resource = null;
            tile.improvement = null;
            tile.hasRoad = false;
            if (tile.terrain !== 'water') {
              tile.terrain = 'wasteland';
            }
          }
        }

        activePlayer.superpowerUsed = true;
        events.push({
          type: 'SUPERPOWER_USED',
          playerId: activePlayer.id,
          faction: activePlayer.faction,
          target: { x: target.x, y: target.y },
          affectedCoords,
          destroyedUnitIds,
        });
      } else if (activePlayer.faction === 'dwarves') {
        const ownedCities = getPlayerCities(next, activePlayer.id);
        const capital = ownedCities.find((c) => c.isCapital) ?? ownedCities[0];
        if (!capital) break;

        const compareByDist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
          const da = (a.x - capital.x) ** 2 + (a.y - capital.y) ** 2;
          const db = (b.x - capital.x) ** 2 + (b.y - capital.y) ** 2;
          if (da !== db) return da - db;
          const ca = chebyshevDist(a, capital);
          const cb = chebyshevDist(b, capital);
          if (ca !== cb) return ca - cb;
          if (a.y !== b.y) return a.y - b.y;
          return a.x - b.x;
        };

        const openMountains = next.tiles
          .filter((t) => t.terrain === 'mountain' && t.unitId === null)
          .sort(compareByDist);
        let spawnTile = openMountains[0] ?? null;

        if (!spawnTile) {
          const openLand = next.tiles
            .filter((t) => t.terrain !== 'water' && t.unitId === null)
            .sort(compareByDist);
          spawnTile = openLand[0] ?? null;
        }
        if (!spawnTile) break;

        const drake = createUnitEntity(
          next,
          activePlayer.id,
          'dragon',
          spawnTile.x,
          spawnTile.y,
          null,
          { ready: true },
        );
        const revealed = revealRadius(next, activePlayer, spawnTile.x, spawnTile.y, 2);
        if (revealed.length > 0) {
          events.push({
            type: 'TILES_REVEALED',
            playerId: activePlayer.id,
            coords: revealed,
          });
        }
        activePlayer.superpowerUsed = true;
        events.push({
          type: 'SUPERPOWER_USED',
          playerId: activePlayer.id,
          faction: activePlayer.faction,
          target: { x: spawnTile.x, y: spawnTile.y },
          spawnedUnitId: drake.id,
        });
      } else if (activePlayer.faction === 'humans') {
        const target = action.target;
        if (!target) break;
        const validTargets = getSuperpowerTargetCoords(next, activePlayer.id);
        if (!validTargets.some((c) => c.x === target.x && c.y === target.y)) break;

        const tower = createUnitEntity(
          next,
          activePlayer.id,
          'watchtower',
          target.x,
          target.y,
          null,
          { ready: true },
        );
        const revealed = revealRadius(next, activePlayer, target.x, target.y, 2);
        if (revealed.length > 0) {
          events.push({
            type: 'TILES_REVEALED',
            playerId: activePlayer.id,
            coords: revealed,
          });
        }
        activePlayer.superpowerUsed = true;
        events.push({
          type: 'SUPERPOWER_USED',
          playerId: activePlayer.id,
          faction: activePlayer.faction,
          target: { x: target.x, y: target.y },
          spawnedUnitId: tower.id,
        });
      }
      break;
    }

    case 'END_TURN': {
      const totalPlayers = next.players.length;
      let nextIndex = next.activePlayerIndex;
      let wrapped = false;

      for (let step = 1; step <= totalPlayers; step++) {
        const candidate = (next.activePlayerIndex + step) % totalPlayers;
        if (candidate <= next.activePlayerIndex) {
          wrapped = true;
        }
        if (next.players[candidate].alive) {
          nextIndex = candidate;
          break;
        }
      }

      if (wrapped) {
        next.turn += 1;
      }
      next.activePlayerIndex = nextIndex;

      // Optional turn-limit Glory Win Condition (disabled when maxTurns <= 0)
      if (next.config.maxTurns > 0 && next.turn > next.config.maxTurns) {
        const scores = buildScoresRecord(next);
        const sorted = next.players.slice().sort((a, b) => {
          const diff = scores[b.id] - scores[a.id];
          if (diff !== 0) return diff;
          if (a.alive !== b.alive) return a.alive ? -1 : 1;
          return b.gold - a.gold;
        });
        const winner = sorted[0];
        next.phase = 'game_over';
        next.winnerId = winner.id;
        next.winReason = 'glory';
        events.push({
          type: 'GAME_OVER',
          winnerId: winner.id,
          reason: 'glory',
          scores,
        });
        return { state: next, events };
      }

      const nextPlayer = next.players[next.activePlayerIndex];
      if ((next.eclipseTurnsRemaining ?? 0) > 0 && next.eclipseOwnerId === nextPlayer.id) {
        next.eclipseTurnsRemaining -= 1;
        if (next.eclipseTurnsRemaining <= 0) {
          next.eclipseTurnsRemaining = 0;
          next.eclipseOwnerId = null;
        }
      }
      handleStartOfTurn(next, nextPlayer, events);
      break;
    }
  }

  refreshPlayerStats(next);
  return { state: next, events };
}
