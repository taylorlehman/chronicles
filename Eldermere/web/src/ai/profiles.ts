import type { Difficulty, FactionId } from '../game/types';
import { FACTION_DEFINITIONS } from '../game/data/factions';
import type { DifficultyConfig, FactionAIProfile } from './types';

export const FACTION_AI_PROFILES: Record<FactionId, FactionAIProfile> = {
  humans: {
    faction: 'humans',
    attackWeight: 1.14,
    selfPreservation: 1.1,
    expansionWeight: 1.24,
    economyWeight: 1.24,
    techWeight: 1.12,
    uniqueUnitWeight: 1.28,
    techBonuses: {
      humans_farming: 22,
      humans_granaries: 18,
      humans_milling: 20,
      humans_roads: 18,
      humans_shield_wall: 26,
      humans_citadel_masonry: 18,
      humans_stewards_citadel: 20,
      humans_riding: 24,
      humans_plains_charge: 16,
      humans_chivalry: 24,
      humans_ride_of_rohirrim: 22,
      humans_hunting: 18,
      humans_archery: 24,
      humans_mountaineering: 12,
      humans_siegecraft: 22,
    },
    unitPreferences: {
      warrior: 1.0,
      rider: 1.28,
      archer: 1.26,
      defender: 1.28,
      catapult: 1.2,
      rohirrim_knight: 1.32,
    },
    unitMix: {
      rohirrim_knight: 0.24,
      rider: 0.2,
      archer: 0.21,
      defender: 0.19,
      catapult: 0.1,
      warrior: 0.06,
    },
    // Balanced combined arms: strong shield-wall & archers backed by Rohirrim flank charges.
    aggressionTurn: 10,
    attackRatio: 0.94,
    armyPerCity: 1.54,
    rangedShare: 0.22,
  },
  orcs: {
    faction: 'orcs',
    attackWeight: 1.24,
    selfPreservation: 1.04,
    expansionWeight: 1.24,
    economyWeight: 1.26,
    techWeight: 1.12,
    uniqueUnitWeight: 1.35,
    techBonuses: {
      orcs_warg_riders: 24,
      orcs_spoils_mastery: 24,
      orcs_pack_tactics: 20,
      orcs_clear_cutting: 16,
      orcs_dark_forges: 20,
      orcs_siege_works: 24,
      orcs_mount_doom: 24,
      orcs_shield_wall: 22,
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
      rider: 1.38,
      defender: 1.18,
      archer: 1.26,
      catapult: 1.26,
      uruk_berserker: 1.38,
    },
    unitMix: {
      uruk_berserker: 0.28,
      rider: 0.22,
      archer: 0.17,
      catapult: 0.12,
      defender: 0.14,
      warrior: 0.07,
    },
    // Early, relentless pressure fuelled by Spoils of War.
    aggressionTurn: 9,
    attackRatio: 0.93,
    armyPerCity: 1.6,
    rangedShare: 0.18,
  },
  elves: {
    faction: 'elves',
    attackWeight: 1.14,
    selfPreservation: 1.08,
    expansionWeight: 1.18,
    economyWeight: 1.1,
    techWeight: 1.12,
    uniqueUnitWeight: 1.3,
    techBonuses: {
      elves_sanctuaries: 18,
      elves_tree_singing: 16,
      elves_lothlorien_sanctum: 20,
      elves_woodland_aim: 20,
      elves_sentinel_order: 24,
      elves_keen_sight: 14,
      elves_galadhrim_precision: 22,
      elves_elven_steeds: 22,
      elves_wardens: 22,
      elves_graceful_guard: 20,
      elves_wind_riders: 20,
      elves_high_paths: 16,
      elves_elven_lore: 18,
      elves_mallorn_siege: 20,
      elves_rings_preservation: 18,
    },
    unitPreferences: {
      archer: 1.15,
      rider: 1.3,
      warrior: 0.88,
      defender: 1.26,
      catapult: 1.16,
      elven_sentinel: 1.4,
    },
    unitMix: {
      elven_sentinel: 0.28,
      rider: 0.26,
      defender: 0.2,
      archer: 0.12,
      catapult: 0.08,
      warrior: 0.06,
    },
    // Swift combined-arms forest host: Sentinels soften while Riders & Wardens seize cities.
    aggressionTurn: 10.5,
    attackRatio: 0.98,
    armyPerCity: 1.5,
    rangedShare: 0.4,
  },
  dwarves: {
    faction: 'dwarves',
    attackWeight: 1.08,
    selfPreservation: 1.09,
    expansionWeight: 1.14,
    economyWeight: 1.28,
    techWeight: 1.12,
    uniqueUnitWeight: 1.3,
    techBonuses: {
      dwarves_mining: 24,
      dwarves_khazad_forges: 18,
      dwarves_heart_of_mountain: 22,
      dwarves_shieldbearers: 20,
      dwarves_mithril_smithing: 26,
      dwarves_runic_plate: 18,
      dwarves_mithril_phalanx: 24,
      dwarves_foraging: 18,
      dwarves_stone_walls: 18,
      dwarves_crossbows: 20,
      dwarves_deep_vaults: 22,
      dwarves_ram_riders: 22,
      dwarves_siegecraft: 20,
      dwarves_horned_charge: 16,
      dwarves_dragon_slayers: 20,
    },
    unitPreferences: {
      warrior: 1.0,
      defender: 1.2,
      archer: 1.2,
      rider: 1.28,
      catapult: 1.22,
      ironbreaker: 1.35,
    },
    unitMix: {
      ironbreaker: 0.26,
      rider: 0.21,
      archer: 0.18,
      catapult: 0.13,
      defender: 0.15,
      warrior: 0.07,
    },
    // Fortify mountains and walls, then push decisively with Ironbreakers, Ram Riders & Siege.
    aggressionTurn: 11.5,
    attackRatio: 1.03,
    armyPerCity: 1.52,
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
   * "Easy": friendly, lively sparring partner (cities always keep training classic troops —
   * never frozen/stalled!), relaxed economy & tech pace, casual brave tactics, smooth gentle
   * pressure. Calibrated so a novice player wins ~90% of 1v3 games while enjoying real battles.
   */
  easy: {
    difficulty: 'easy',
    noiseRange: 57,
    economySkipChance: 0.91,
    maxEconActionsPerTurn: 1,
    earlyHumanCapitalPressure: 0.12,
    productionThreshold: -Infinity,
    dangerAwareness: 0.04,
    focusFire: 0.04,
    aggressionDelay: 1.65,
    attackRatioMult: 1.5,
    armyTargetMult: 0.52,
    armyCapMult: Infinity,
    trainSkipChance: 0,
    maxTrainsPerTurn: 1,
    dashLookaheadWeight: 0.08,
    simpleCityRewards: true,
    maxTechsPerTurn: 1,
    techResearchChance: 0.1,
    eliteShareScale: 0.0,
    superpowerMinTurn: 999,
    unitNeglectChance: 0.75,
    humanTargetBias: 0.05,
    humanTargetBiasMax: 0.16,
    humanPressureRampTurns: 48,
    humanGraceTurns: 24,
    gangUpOnHuman: false,
  },
  /**
   * "Normal": engaging, fair mid-tier opponent. Upgrades cities, researches techs into Age III,
   * mixes classic troops with faction champions, uses moderate tactics. Calibrated so an average
   * player wins ~75% of 1v3 games.
   */
  normal: {
    difficulty: 'normal',
    noiseRange: 17,
    economySkipChance: 0.39,
    maxEconActionsPerTurn: 2,
    earlyHumanCapitalPressure: 0.45,
    productionThreshold: -Infinity,
    dangerAwareness: 0.41,
    focusFire: 0.39,
    aggressionDelay: 1.22,
    attackRatioMult: 1.18,
    armyTargetMult: 0.76,
    armyCapMult: Infinity,
    trainSkipChance: 0,
    maxTrainsPerTurn: 2,
    dashLookaheadWeight: 0.48,
    simpleCityRewards: false,
    maxTechsPerTurn: 1,
    techResearchChance: 0.57,
    eliteShareScale: 0.55,
    superpowerMinTurn: 22,
    unitNeglectChance: 0.26,
    humanTargetBias: 0.32,
    humanTargetBiasMax: 0.56,
    humanPressureRampTurns: 28,
    humanGraceTurns: 14,
    gangUpOnHuman: false,
  },
  /**
   * "Hard": smart, tactical, combined-arms opponent with full tech tree, champions, siege,
   * and Age III superpowers — genuinely challenging yet fun and fair (ZERO 3v1 dogpiling).
   * Calibrated so an expert player wins ~75% of 1v3 games.
   */
  hard: {
    difficulty: 'hard',
    noiseRange: 13,
    economySkipChance: 0.28,
    maxEconActionsPerTurn: 4,
    earlyHumanCapitalPressure: 0.55,
    productionThreshold: -Infinity,
    dangerAwareness: 0.66,
    focusFire: 0.64,
    aggressionDelay: 1.08,
    attackRatioMult: 1.06,
    armyTargetMult: 0.88,
    armyCapMult: Infinity,
    trainSkipChance: 0,
    maxTrainsPerTurn: 3,
    dashLookaheadWeight: 0.66,
    simpleCityRewards: false,
    maxTechsPerTurn: 2,
    techResearchChance: 0.7,
    eliteShareScale: 0.82,
    superpowerMinTurn: 12,
    unitNeglectChance: 0.2,
    humanTargetBias: 0.35,
    humanTargetBiasMax: 0.57,
    humanPressureRampTurns: 24,
    humanGraceTurns: 12,
    gangUpOnHuman: false,
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
