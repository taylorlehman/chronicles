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
}

export interface ScoredAction {
  action: GameAction;
  score: number;
}
