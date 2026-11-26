import type { Difficulty, FactionId, GameAction, TechId, UnitType } from '../game/types';

export interface FactionAIProfile {
  faction: FactionId;
  /** Multiplier for combat / aggression scoring (e.g. Orcs 1.2, Elves 1.05). */
  attackWeight: number;
  /** Multiplier for avoiding retaliation, retreating, and healing (e.g. Elves 1.25, Orcs 0.9). */
  selfPreservation: number;
  /** Multiplier for village claiming, ruins, and early fog exploration. */
  expansionWeight: number;
  /** Multiplier for harvesting, improvements, and city upgrades. */
  economyWeight: number;
  /** Multiplier for researching techs. */
  techWeight: number;
  /** Priority boost for unlocking and training the faction's unique unit. */
  uniqueUnitWeight: number;
  /** Preferred tech priorities (extra score per tech). */
  techBonuses: Partial<Record<TechId, number>>;
  /** Target unit mix weights for production scoring. */
  unitPreferences: Partial<Record<UnitType, number>>;
  /** Desired share of each unit type in the field army (lively combined-arms mix). */
  unitMix: Partial<Record<UnitType, number>>;
  /** Turn from which the faction starts offensive campaigns (scaled by difficulty). */
  aggressionTurn: number;
  /** Own / defender strength ratio required before marching on a target city. */
  attackRatio: number;
  /** Army size per owned city the faction wants before spending freely on techs/economy. */
  armyPerCity: number;
  /** Preferred share of ranged units (archers / sentinels) in the field army. */
  rangedShare: number;
}

export interface DifficultyConfig {
  difficulty: Difficulty;
  /** Bounded symmetric noise (±noiseRange) added to action scores for approachable play. */
  noiseRange: number;
  /** Probability (0..1, deterministic hash) of skipping non-critical economy harvests. */
  economySkipChance: number;
  /** Max economy tile actions executed per turn (throttles Squire eco snowball without stalling cities). */
  maxEconActionsPerTurn: number;
  /** Multiplier on attacks targeting the human player's capital early on. */
  earlyHumanCapitalPressure: number;
  /** Minimum score threshold to spend gold on optional production when unthreatened. */
  productionThreshold: number;
  /** 0..1 weight of the enemy-reach danger map when moving (low = walks into kill zones). */
  dangerAwareness: number;
  /** 0..1 weight of focus-fire / finish-the-wounded coordination bonuses. */
  focusFire: number;
  /** Multiplier on each faction's `aggressionTurn` (higher = attacks later). */
  aggressionDelay: number;
  /** Multiplier on each faction's `attackRatio` (higher = needs a bigger edge to attack). */
  attackRatioMult: number;
  /** Multiplier on the desired standing army size. */
  armyTargetMult: number;
  /** Unthreatened cities stop training once the army reaches desiredArmy × this (Infinity = never stall). */
  armyCapMult: number;
  /** Chance (deterministic) to leave a free, unthreatened city slot untrained this turn (0 = never stall). */
  trainSkipChance: number;
  /** Max units trained per turn when unthreatened (Infinity on Captain; paced on Squire without stalling). */
  maxTrainsPerTurn: number;
  /** Weight applied to dash move-then-strike lookahead (1.0 on Captain, reduced on Squire). */
  dashLookaheadWeight: number;
  /** Use beginner-friendly city level-up rewards (workshops/resources/parks) instead of fortifying/champion spam. */
  simpleCityRewards: boolean;
  /** Max techs researched per turn. */
  maxTechsPerTurn: number;
  /** Probability (0..1) of attempting tech research on a given turn (1 = always evaluate). */
  techResearchChance: number;
  /** Share scale applied to elite/champion units in unitMix (lower on Squire = more classic units). */
  eliteShareScale: number;
  /** Earliest turn this difficulty will unleash its Age III superpower. */
  superpowerMinTurn: number;
  /** Chance (deterministic per unit/turn) a non-engaged unit is simply left idle. */
  unitNeglectChance: number;
  /** Base target-selection weight when the candidate victim is the human player (smoothly ramps to humanTargetBiasMax). */
  humanTargetBias: number;
  /** Late-game ceiling for the smooth human target-selection weight. */
  humanTargetBiasMax: number;
  /** Turn around which the smooth human pressure curve reaches its midpoint (no hard cliff). */
  humanPressureRampTurns: number;
  /** Legacy/compatibility field: turn at which human pressure reaches ~half strength. */
  humanGraceTurns: number;
  /** Whether a runaway Glory leader attracts extra attention when that leader is human. */
  gangUpOnHuman: boolean;
}

export interface ScoredAction {
  action: GameAction;
  score: number;
}
