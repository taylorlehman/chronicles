import { getPlayer, getPlayerCities, type TutorialScenarioCoords } from '../game';
import type { Difficulty, FactionId, GameState, MapSize, PlayerId } from '../game/types';
import type { TutorialStage } from './TutorialController';

export const SAVED_CAMPAIGN_KEY = 'eldermere_saved_campaign_v1';
export const TUTORIAL_DONE_KEY = 'eldermere_tutorial_done_v1';

const VALID_TUTORIAL_STAGES: readonly TutorialStage[] = [
  'intro',
  'stars',
  'upgrade',
  'move',
  'combat',
  'capture',
  'codex',
  'end_turn',
  'complete',
];

export interface SavedCampaignRecord {
  version: 1;
  savedAt: number;
  humanPlayerId: PlayerId;
  state: GameState;
  tutorialStage: TutorialStage | null;
  tutorialScenario: TutorialScenarioCoords | null;
}

export interface SavedCampaignSummary {
  faction: FactionId;
  turn: number;
  score: number;
  citiesCount: number;
  mapSize: MapSize;
  difficulty: Difficulty;
  savedAt: number;
}

function getStorage(): Storage | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
  } catch {
    // Storage disabled or unavailable
  }
  return null;
}

function isValidTutorialStage(value: unknown): value is TutorialStage {
  return typeof value === 'string' && (VALID_TUTORIAL_STAGES as readonly string[]).includes(value);
}

function isValidCoord(value: unknown): value is { x: number; y: number } {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as { x?: unknown }).x === 'number' &&
    typeof (value as { y?: unknown }).y === 'number'
  );
}

function isValidTutorialScenario(value: unknown): value is TutorialScenarioCoords {
  if (typeof value !== 'object' || value === null) return false;
  const s = value as Partial<TutorialScenarioCoords>;
  return (
    isValidCoord(s.capitalCoord) &&
    isValidCoord(s.moveTargetCoord) &&
    isValidCoord(s.villageCoord) &&
    Array.isArray(s.resourceCoords) &&
    s.resourceCoords.length === 2 &&
    isValidCoord(s.resourceCoords[0]) &&
    isValidCoord(s.resourceCoords[1]) &&
    isValidCoord(s.enemyCoord) &&
    typeof s.enemyUnitId === 'string' &&
    typeof s.starterUnitId === 'string'
  );
}

export function saveCampaign(
  state: GameState,
  humanPlayerId: PlayerId,
  tutorialStage: TutorialStage | null = null,
  tutorialScenario: TutorialScenarioCoords | null = null,
): boolean {
  if (state.phase !== 'playing') {
    clearSavedCampaign();
    return false;
  }
  const storage = getStorage();
  if (!storage) return false;

  const record: SavedCampaignRecord = {
    version: 1,
    savedAt: Date.now(),
    humanPlayerId,
    state,
    tutorialStage,
    tutorialScenario,
  };
  try {
    storage.setItem(SAVED_CAMPAIGN_KEY, JSON.stringify(record));
    return true;
  } catch {
    return false;
  }
}

export function loadSavedCampaign(): SavedCampaignRecord | null {
  const storage = getStorage();
  if (!storage) return null;

  try {
    const raw = storage.getItem(SAVED_CAMPAIGN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SavedCampaignRecord>;
    if (
      !parsed ||
      parsed.version !== 1 ||
      typeof parsed.humanPlayerId !== 'string' ||
      !parsed.state ||
      parsed.state.phase !== 'playing' ||
      !Array.isArray(parsed.state.players) ||
      !Array.isArray(parsed.state.tiles) ||
      parsed.state.tiles.length !== parsed.state.mapSize * parsed.state.mapSize
    ) {
      return null;
    }
    const human = parsed.state.players.find((p) => p.id === parsed.humanPlayerId);
    if (!human || !human.alive) return null;

    return {
      version: 1,
      savedAt: typeof parsed.savedAt === 'number' ? parsed.savedAt : Date.now(),
      humanPlayerId: parsed.humanPlayerId,
      state: parsed.state,
      tutorialStage: isValidTutorialStage(parsed.tutorialStage) ? parsed.tutorialStage : null,
      tutorialScenario: isValidTutorialScenario(parsed.tutorialScenario)
        ? parsed.tutorialScenario
        : null,
    };
  } catch {
    return null;
  }
}

export function getSavedCampaignSummary(): SavedCampaignSummary | null {
  const record = loadSavedCampaign();
  if (!record) return null;
  const human = getPlayer(record.state, record.humanPlayerId);
  if (!human) return null;
  const citiesCount = getPlayerCities(record.state, record.humanPlayerId).length;
  return {
    faction: human.faction,
    turn: record.state.turn,
    score: human.score,
    citiesCount,
    mapSize: record.state.mapSize,
    difficulty: record.state.config.difficulty,
    savedAt: record.savedAt,
  };
}

export function clearSavedCampaign(): void {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.removeItem(SAVED_CAMPAIGN_KEY);
  } catch {
    // Ignore
  }
}

export function isTutorialCompleted(): boolean {
  const storage = getStorage();
  if (!storage) return false;
  try {
    return storage.getItem(TUTORIAL_DONE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function markTutorialCompleted(): void {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.setItem(TUTORIAL_DONE_KEY, 'true');
  } catch {
    // Ignore
  }
}
