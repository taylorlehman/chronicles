import type { Difficulty, FactionId, GameAction, TechId, UnitType } from '../game/types';

export interface FactionAIProfile {
  faction: FactionId;
  /** Multiplier for combat / aggression scoring (e.g. Orcs 1.35, Elves 1.05). */
  attackWeight: number;
  /** Multiplier for avoiding retaliation, retreating, and healing (e.g. Elves 1.3, Orcs 0.6). */
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
  /** Multiplier on attacks targeting the human player's capital during turns 1..8. */
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
  /** Unthreatened cities stop training once the army reaches desiredArmy × this (Infinity = fill every slot). */
  armyCapMult: number;
  /** Chance (deterministic) to leave a free, unthreatened city slot untrained this turn. */
  trainSkipChance: number;
  /** Max techs researched per turn. */
  maxTechsPerTurn: number;
  /** Chance (deterministic per unit/turn) a non-engaged unit is simply left idle. */
  unitNeglectChance: number;
  /** Target-selection multiplier when the candidate victim is the human player. */
  humanTargetBias: number;
  /** Turns before which the AI will not start an offensive against the human player. */
  humanGraceTurns: number;
}

export interface ScoredAction {
  action: GameAction;
  score: number;
}
