import { UNIT_DEFINITIONS } from './data';
import { chebyshevDist, getPlayer, getUnitRange, hasTech, unitHasTrait } from './rules';
import { getTile, type CombatPreview, type GameState, type Unit } from './types';

export function getEffectiveAttack(state: GameState, attacker: Unit): number {
  const def = UNIT_DEFINITIONS[attacker.type];
  let atk = def.attack;
  const owner = getPlayer(state, attacker.ownerId);
  const tile = getTile(state, attacker.x, attacker.y);
  if (!owner || !tile) return atk;

  // Humans Plains Charge: Riders & Rohirrim Knights gain +0.5 ATK on Plains
  if (
    hasTech(owner, 'humans_plains_charge') &&
    (attacker.type === 'rider' || attacker.type === 'rohirrim_knight') &&
    tile.terrain === 'plains'
  ) {
    atk += 0.5;
  }

  // Humans Gondor Siegecraft (T3): Catapults gain +0.5 ATK
  if (hasTech(owner, 'humans_siegecraft') && attacker.type === 'catapult') {
    atk += 0.5;
  }

  // Orcs Pack Tactics (T3): Warg Riders gain +0.5 ATK
  if (hasTech(owner, 'orcs_pack_tactics') && attacker.type === 'rider') {
    atk += 0.5;
  }

  // Orcs Mount Doom Furnaces (T3): Catapults gain +1 ATK
  if (hasTech(owner, 'orcs_mount_doom') && attacker.type === 'catapult') {
    atk += 1;
  }

  // Elves Woodland Aim: Ranged units gain +0.5 ATK from Forest/Ancient Woods
  if (
    hasTech(owner, 'elves_woodland_aim') &&
    def.range > 1 &&
    (tile.terrain === 'forest' || tile.terrain === 'ancient_woods')
  ) {
    atk += 0.5;
  }

  // Elves Galadhrim Precision (T3): Elven Sentinels gain +0.5 ATK
  if (hasTech(owner, 'elves_galadhrim_precision') && attacker.type === 'elven_sentinel') {
    atk += 0.5;
  }

  // Dwarves Horned Charge: Ram Riders gain +0.5 ATK
  if (hasTech(owner, 'dwarves_horned_charge') && attacker.type === 'rider') {
    atk += 0.5;
  }

  // Dwarves Dragon-Slayer Engines (T3): Catapults gain +0.5 ATK
  if (hasTech(owner, 'dwarves_dragon_slayers') && attacker.type === 'catapult') {
    atk += 0.5;
  }

  // Elves Starlit Eclipse Superpower: all Elven units gain +1 ATK while active
  if ((state.eclipseTurnsRemaining ?? 0) > 0 && state.eclipseOwnerId === owner.id) {
    atk += 1;
  }

  return atk;
}

export function getEffectiveDefense(state: GameState, defender: Unit): number {
  const def = UNIT_DEFINITIONS[defender.type];
  let defense = def.defense;
  const owner = getPlayer(state, defender.ownerId);
  if (!owner) return defense;

  // Dwarves Runic Plate: all Dwarven melee units gain +0.5 DEF
  if (owner.faction === 'dwarves' && hasTech(owner, 'dwarves_runic_plate') && def.range === 1) {
    defense += 0.5;
  }

  return defense;
}

export function getTerrainDefenseBonus(
  state: GameState,
  defender: Unit,
  attackerHasSiege: boolean,
): number {
  const tile = getTile(state, defender.x, defender.y);
  const owner = getPlayer(state, defender.ownerId);
  if (!tile || !owner) return 1.0;

  let bonus = 1.0;

  // Terrain bonus
  if (tile.terrain === 'mountain') {
    bonus = Math.max(bonus, owner.faction === 'dwarves' ? 1.75 : 1.5);
  } else if (tile.terrain === 'forest' || tile.terrain === 'ancient_woods') {
    bonus = Math.max(bonus, 1.5);
  } else if (tile.terrain === 'plains') {
    if (defender.type === 'defender' && hasTech(owner, 'elves_graceful_guard')) {
      // Elves Graceful Guard: Defender gets 1.5x DEF even on Plains
      bonus = Math.max(bonus, 1.5);
    }
    if (
      (defender.type === 'ironbreaker' || defender.type === 'defender') &&
      hasTech(owner, 'dwarves_mithril_phalanx')
    ) {
      // Dwarves Mithril Phalanx (T3): Ironbreakers & Defenders get 1.75x DEF even on Plains
      bonus = Math.max(bonus, 1.75);
    }
  }

  // Friendly City / Wall / Fortify bonus
  if (tile.isCityCenter && tile.cityId) {
    const city = state.cities[tile.cityId];
    if (city && city.ownerId === defender.ownerId) {
      if (city.hasWalls && !attackerHasSiege) {
        bonus = Math.max(bonus, 2.0);
      } else if (unitHasTrait(state, defender, 'fortify')) {
        bonus = Math.max(bonus, 1.5);
      }
    }
  }

  return bonus;
}

export function predictCombat(
  state: GameState,
  attackerId: string,
  defenderId: string,
): CombatPreview {
  const attacker = state.units[attackerId];
  const defender = state.units[defenderId];
  if (!attacker || !defender) {
    return {
      attackerId,
      defenderId,
      attackerDamage: 0,
      retaliationDamage: 0,
      defenderKilled: false,
      attackerKilled: false,
      terrainDefenseBonus: 1.0,
      willAdvance: false,
    };
  }

  const atkRange = getUnitRange(state, attacker);
  const defRange = getUnitRange(state, defender);
  const attackerOwner = getPlayer(state, attacker.ownerId);

  const effAtk = getEffectiveAttack(state, attacker);
  const effDef = getEffectiveDefense(state, defender);
  const attackerHasSiege = unitHasTrait(state, attacker, 'siege');
  const terrainDefenseBonus = getTerrainDefenseBonus(state, defender, attackerHasSiege);

  // Bloodlust: ignores HP loss when calculating attack damage
  const atkHpRatio = unitHasTrait(state, attacker, 'bloodlust')
    ? 1.0
    : Math.max(0, attacker.hp) / attacker.maxHp;
  const defHpRatio = Math.max(0, defender.hp) / defender.maxHp;

  const attackForce = effAtk * atkHpRatio;
  const defenseForce = effDef * defHpRatio * terrainDefenseBonus;
  const totalForce = attackForce + defenseForce;

  const isRanged = atkRange > 1;
  let attackerDamage = 0;

  if (totalForce > 0) {
    attackerDamage = Math.round((attackForce / totalForce) * effAtk * 4.5);

    // Orcs Black Arrows: Archers deal +1 damage to wounded targets
    if (
      attackerOwner &&
      attacker.type === 'archer' &&
      hasTech(attackerOwner, 'orcs_black_arrows') &&
      defender.hp < defender.maxHp
    ) {
      attackerDamage += 1;
    }

    // Dwarves Ironbreaker Stalwart: takes -1 damage from ranged attacks
    if (isRanged && unitHasTrait(state, defender, 'stalwart')) {
      attackerDamage = Math.max(0, attackerDamage - 1);
    }
  }

  const defenderRemainingHp = defender.hp - attackerDamage;
  const defenderKilled = defenderRemainingHp <= 0;

  let retaliationDamage = 0;
  const dist = chebyshevDist(attacker, defender);
  if (!defenderKilled && dist <= defRange && totalForce > 0 && effDef > 0) {
    retaliationDamage = Math.round((defenseForce / totalForce) * effDef * 4.5);
    // Stalwart also reduces ranged retaliation damage
    if (defRange > 1 && unitHasTrait(state, attacker, 'stalwart')) {
      retaliationDamage = Math.max(0, retaliationDamage - 1);
    }
  }

  const attackerKilled = !defenderKilled && attacker.hp - retaliationDamage <= 0;
  const willAdvance = defenderKilled && !isRanged;

  return {
    attackerId,
    defenderId,
    attackerDamage,
    retaliationDamage,
    defenderKilled,
    attackerKilled,
    terrainDefenseBonus,
    willAdvance,
  };
}
