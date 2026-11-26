import type { Difficulty, FactionId } from '../game/types';
import { FACTION_DEFINITIONS } from '../game/data/factions';
import type { DifficultyConfig, FactionAIProfile } from './types';

export const FACTION_AI_PROFILES: Record<FactionId, FactionAIProfile> = {
  humans: {
    faction: 'humans',
    attackWeight: 0.96,
    selfPreservation: 1.05,
    expansionWeight: 1.22,
    economyWeight: 1.14,
    techWeight: 1.04,
    uniqueUnitWeight: 1.0,
    techBonuses: {
      humans_farming: 18,
      humans_granaries: 14,
      humans_milling: 18,
      humans_roads: 16,
      humans_shield_wall: 24,
      humans_citadel_masonry: 14,
      humans_stewards_citadel: 16,
      humans_riding: 20,
      humans_plains_charge: 14,
      humans_chivalry: 20,
      humans_ride_of_rohirrim: 18,
      humans_hunting: 18,
      humans_archery: 24,
      humans_mountaineering: 12,
      humans_siegecraft: 22,
    },
    unitPreferences: {
      warrior: 1.02,
      rider: 1.26,
      archer: 1.25,
      defender: 1.22,
      catapult: 1.15,
      rohirrim_knight: 1.12,
    },
    unitMix: {
      rohirrim_knight: 0.18,
      rider: 0.22,
      archer: 0.24,
      defender: 0.18,
      catapult: 0.1,
      warrior: 0.08,
    },
    // Fast cavalry expansion, then combined-arms mounted campaigns.
    aggressionTurn: 14,
    attackRatio: 1.14,
    armyPerCity: 1.38,
    rangedShare: 0.24,
  },
  orcs: {
    faction: 'orcs',
    attackWeight: 1.2,
    selfPreservation: 1.0,
    expansionWeight: 1.24,
    economyWeight: 1.22,
    techWeight: 1.08,
    uniqueUnitWeight: 1.35,
    techBonuses: {
      orcs_warg_riders: 24,
      orcs_spoils_mastery: 24,
      orcs_pack_tactics: 20,
      orcs_clear_cutting: 16,
      orcs_dark_forges: 20,
      orcs_siege_works: 24,
      orcs_mount_doom: 24,
      orcs_shield_wall: 20,
      orcs_uruk_breeding: 28,
      orcs_war_barracks: 26,
      orcs_black_gate: 28,
      orcs_snaga_archers: 22,
      orcs_black_arrows: 18,
      orcs_crag_climbing: 12,
      orcs_fell_volley: 20,
    },
    unitPreferences: {
      warrior: 1.0,
      rider: 1.4,
      defender: 1.05,
      archer: 1.25,
      catapult: 1.26,
      uruk_berserker: 1.42,
    },
    unitMix: {
      uruk_berserker: 0.3,
      rider: 0.22,
      archer: 0.17,
      catapult: 0.12,
      defender: 0.1,
      warrior: 0.09,
    },
    // Early, relentless pressure fuelled by Spoils of War.
    aggressionTurn: 9,
    attackRatio: 0.89,
    armyPerCity: 1.56,
    rangedShare: 0.18,
  },
  elves: {
    faction: 'elves',
    attackWeight: 1.28,
    selfPreservation: 1.04,
    expansionWeight: 1.26,
    economyWeight: 1.15,
    techWeight: 1.2,
    uniqueUnitWeight: 1.48,
    techBonuses: {
      elves_sanctuaries: 18,
      elves_tree_singing: 16,
      elves_lothlorien_sanctum: 22,
      elves_woodland_aim: 20,
      elves_sentinel_order: 28,
      elves_keen_sight: 14,
      elves_galadhrim_precision: 26,
      elves_elven_steeds: 26,
      elves_wardens: 24,
      elves_graceful_guard: 20,
      elves_wind_riders: 24,
      elves_high_paths: 16,
      elves_elven_lore: 22,
      elves_mallorn_siege: 22,
      elves_rings_preservation: 22,
    },
    unitPreferences: {
      archer: 1.15,
      rider: 1.38,
      warrior: 0.85,
      defender: 1.32,
      catapult: 1.2,
      elven_sentinel: 1.68,
    },
    unitMix: {
      elven_sentinel: 0.38,
      rider: 0.25,
      defender: 0.17,
      archer: 0.08,
      catapult: 0.07,
      warrior: 0.05,
    },
    // Swift combined-arms forest host: Sentinels soften while Riders & Wardens seize cities.
    aggressionTurn: 9,
    attackRatio: 0.86,
    armyPerCity: 1.62,
    rangedShare: 0.46,
  },
  dwarves: {
    faction: 'dwarves',
    attackWeight: 1.14,
    selfPreservation: 1.12,
    expansionWeight: 1.18,
    economyWeight: 1.36,
    techWeight: 1.2,
    uniqueUnitWeight: 1.48,
    techBonuses: {
      dwarves_mining: 28,
      dwarves_khazad_forges: 22,
      dwarves_heart_of_mountain: 26,
      dwarves_shieldbearers: 22,
      dwarves_mithril_smithing: 30,
      dwarves_runic_plate: 20,
      dwarves_mithril_phalanx: 28,
      dwarves_foraging: 18,
      dwarves_stone_walls: 20,
      dwarves_crossbows: 22,
      dwarves_deep_vaults: 26,
      dwarves_ram_riders: 26,
      dwarves_siegecraft: 24,
      dwarves_horned_charge: 16,
      dwarves_dragon_slayers: 24,
    },
    unitPreferences: {
      warrior: 1.0,
      defender: 1.2,
      archer: 1.2,
      rider: 1.32,
      catapult: 1.28,
      ironbreaker: 1.55,
    },
    unitMix: {
      ironbreaker: 0.36,
      rider: 0.18,
      archer: 0.16,
      catapult: 0.13,
      defender: 0.11,
      warrior: 0.06,
    },
    // Fortify mountains and walls, then push decisively with Ironbreakers, Ram Riders & Siege.
    aggressionTurn: 10,
    attackRatio: 0.94,
    armyPerCity: 1.64,
    rangedShare: 0.18,
  },
};

/**
 * Difficulty presets. Separation comes strictly from decision quality (noise, danger
 * awareness, focus fire, unit neglect, dash lookahead), economy/tech/recruiting pace,
 * and smooth organic target weighting — NEVER from stalled cities, hard grace-period
 * cliffs, or cheating.
 */
export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  /**
   * "Squire": active, lively cities (recruits every turn — never stalls!), approachable
   * pace (1 unit/turn early, scales to 2 at 6+ cities so matches conclude cleanly),
   * casual tactics, classic troops, smooth organic pressure with zero sudden cliffs.
   */
  easy: {
    difficulty: 'easy',
    noiseRange: 32,
    economySkipChance: 0.68,
    maxEconActionsPerTurn: 1,
    earlyHumanCapitalPressure: 0.35,
    productionThreshold: -Infinity,
    dangerAwareness: 0.06,
    focusFire: 0.05,
    aggressionDelay: 1.35,
    attackRatioMult: 1.25,
    armyTargetMult: 0.65,
    armyCapMult: Infinity,
    trainSkipChance: 0,
    maxTrainsPerTurn: 1,
    dashLookaheadWeight: 0.25,
    simpleCityRewards: true,
    maxTechsPerTurn: 1,
    techResearchChance: 0.34,
    eliteShareScale: 0.22,
    superpowerMinTurn: 999,
    unitNeglectChance: 0.6,
    humanTargetBias: 0.16,
    humanTargetBiasMax: 0.38,
    humanPressureRampTurns: 35,
    humanGraceTurns: 18,
    gangUpOnHuman: false,
  },
  /**
   * "Captain": smart, coordinated, combined-arms opponent without cheating or 3v1 dogpiling.
   */
  normal: {
    difficulty: 'normal',
    noiseRange: 3,
    economySkipChance: 0,
    maxEconActionsPerTurn: 24,
    earlyHumanCapitalPressure: 0.85,
    productionThreshold: -Infinity,
    dangerAwareness: 1.0,
    focusFire: 1.0,
    aggressionDelay: 1.0,
    attackRatioMult: 1.0,
    armyTargetMult: 1.0,
    armyCapMult: Infinity,
    trainSkipChance: 0,
    maxTrainsPerTurn: Infinity,
    dashLookaheadWeight: 1.0,
    simpleCityRewards: false,
    maxTechsPerTurn: 2,
    techResearchChance: 1.0,
    eliteShareScale: 1.0,
    superpowerMinTurn: 1,
    unitNeglectChance: 0,
    humanTargetBias: 0.65,
    humanTargetBiasMax: 0.95,
    humanPressureRampTurns: 16,
    humanGraceTurns: 8,
    gangUpOnHuman: true,
  },
};

/**
 * Resolve the effective faction profile for a given difficulty.
 * On Captain ("normal"), returns the full faction profile unchanged.
 * On Squire ("easy"), softens Captain's unit-cap compensation weights toward a neutral
 * baseline so all 4 realms stay evenly matched at Squire's smaller army scale.
 */
export function resolveFactionProfile(
  faction: FactionId,
  diff: DifficultyConfig,
): FactionAIProfile {
  const base = FACTION_AI_PROFILES[faction];
  if (diff.difficulty !== 'easy') return base;

  const unique = FACTION_DEFINITIONS[faction].uniqueUnit;
  const blend = (v: number, target: number, t = 0.75) => v * (1 - t) + target * t;
  const unitMix =
    faction === 'humans'
      ? { rohirrim_knight: 0.34, defender: 0.24, warrior: 0.16, archer: 0.12, rider: 0.1, catapult: 0.04 }
      : { ...base.unitMix };
  if (faction !== 'humans') {
    unitMix[unique] = blend(unitMix[unique] ?? 0.26, faction === 'elves' ? 0.22 : faction === 'orcs' ? 0.24 : 0.28, 0.85);
  }
  const unitPreferences = { ...base.unitPreferences };
  unitPreferences[unique] = blend(unitPreferences[unique] ?? 1.4, faction === 'humans' ? 1.55 : 1.35, 0.85);
  if (faction === 'humans') {
    unitPreferences.defender = 1.35;
    unitPreferences.warrior = 1.15;
  }

  return {
    ...base,
    attackWeight: blend(
      base.attackWeight,
      faction === 'humans' ? 1.26 : faction === 'elves' ? 1.04 : faction === 'orcs' ? 1.08 : 1.12,
      0.9,
    ),
    selfPreservation: blend(base.selfPreservation, faction === 'humans' ? 1.14 : 1.04, 0.8),
    expansionWeight: blend(base.expansionWeight, faction === 'humans' ? 1.32 : 1.2, 0.8),
    economyWeight: blend(base.economyWeight, 1.2, 0.75),
    techWeight: blend(base.techWeight, faction === 'humans' ? 1.18 : 1.1, 0.75),
    uniqueUnitWeight: blend(base.uniqueUnitWeight, faction === 'humans' ? 1.5 : 1.3, 0.85),
    aggressionTurn: blend(
      base.aggressionTurn,
      faction === 'humans' ? 9.2 : faction === 'elves' ? 11.8 : faction === 'orcs' ? 11.0 : 10.6,
      0.9,
    ),
    attackRatio: blend(
      base.attackRatio,
      faction === 'humans' ? 0.86 : faction === 'elves' ? 1.08 : faction === 'orcs' ? 1.05 : 1.0,
      0.9,
    ),
    armyPerCity: blend(base.armyPerCity, 1.55, 0.85),
    unitMix,
    unitPreferences,
  };
}
