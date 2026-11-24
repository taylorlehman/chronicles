import { describe, expect, it } from 'vitest';
import {
  DIFFICULTY_CONFIGS,
  FACTION_AI_PROFILES,
  planAITurn,
} from '../src/ai/index';
import {
  ALL_FACTIONS,
  applyAction,
  createGame,
  type Difficulty,
  type FactionId,
  type MapSize,
} from '../src/game/index';

describe('Rules-Based AI (src/ai)', () => {
  it('is 100% deterministic for the same GameState and difficulty', () => {
    const state = createGame({
      humanFaction: 'humans',
      difficulty: 'normal',
      mapSize: 16,
      maxTurns: 30,
      seed: 42,
    });
    const activeId = state.players[state.activePlayerIndex].id;
    const planA = planAITurn(state, activeId, 'normal');
    const planB = planAITurn(state, activeId, 'normal');
    expect(planA).toEqual(planB);
    expect(planA[planA.length - 1]?.type).toBe('END_TURN');

    const easyA = planAITurn(state, activeId, 'easy');
    const easyB = planAITurn(state, activeId, 'easy');
    expect(easyA).toEqual(easyB);
  });

  it('encodes distinct faction AI personalities and approachable difficulty presets', () => {
    expect(FACTION_AI_PROFILES.orcs.attackWeight).toBeGreaterThan(
      FACTION_AI_PROFILES.dwarves.attackWeight,
    );
    expect(FACTION_AI_PROFILES.elves.selfPreservation).toBeGreaterThan(
      FACTION_AI_PROFILES.orcs.selfPreservation,
    );
    expect(FACTION_AI_PROFILES.dwarves.economyWeight).toBeGreaterThan(
      FACTION_AI_PROFILES.orcs.economyWeight,
    );
    expect(FACTION_AI_PROFILES.humans.expansionWeight).toBeGreaterThan(
      FACTION_AI_PROFILES.dwarves.expansionWeight,
    );

    expect(DIFFICULTY_CONFIGS.easy.noiseRange).toBeGreaterThan(
      DIFFICULTY_CONFIGS.normal.noiseRange,
    );
    expect(DIFFICULTY_CONFIGS.easy.earlyHumanCapitalPressure).toBeLessThan(
      DIFFICULTY_CONFIGS.normal.earlyHumanCapitalPressure,
    );
  });

  it('AI evaluates and researches Tier 3 capstones when eligible and affordable', () => {
    const state = createGame({
      humanFaction: 'humans',
      difficulty: 'normal',
      mapSize: 16,
      maxTurns: 30,
      seed: 101,
    });
    const player = state.players[0];
    // Give Humans Tier 1 & Tier 2 techs + gold so Tier 3 capstones are the next step
    player.techs.push(
      'humans_farming',
      'humans_roads',
      'humans_citadel_masonry',
      'humans_riding',
      'humans_chivalry',
      'humans_hunting',
      'humans_archery',
    );
    player.gold = 25;

    const plan = planAITurn(state, player.id, 'normal');
    const researchedT3 = plan.some(
      (a) =>
        a.type === 'RESEARCH_TECH' &&
        (a.techId === 'humans_ride_of_rohirrim' ||
          a.techId === 'humans_stewards_citadel' ||
          a.techId === 'humans_milling' ||
          a.techId === 'humans_siegecraft'),
    );
    expect(researchedT3).toBe(true);
  });

  it('AI reliably executes CAPTURE_CITY instead of walking off a capturable village or enemy city', () => {
    const state = createGame({
      humanFaction: 'humans',
      difficulty: 'normal',
      mapSize: 16,
      maxTurns: 30,
      seed: 202,
    });
    const player = state.players[0];
    const village = state.tiles.find((t) => t.hasVillage && !t.cityId)!;
    const unit = Object.values(state.units).find((u) => u.ownerId === player.id)!;

    // Move unit onto village and mark ready to capture (Turn N+1 start state)
    state.tiles[unit.y * state.mapSize + unit.x].unitId = null;
    unit.x = village.x;
    unit.y = village.y;
    village.unitId = unit.id;
    unit.canCapture = true;
    unit.hasMoved = false;
    unit.hasAttacked = false;
    unit.actedThisTurn = false;
    player.revealedTiles[village.y * state.mapSize + village.x] = true;

    for (const diff of ['easy', 'normal'] as const) {
      const plan = planAITurn(state, player.id, diff);
      const captureIdx = plan.findIndex(
        (a) => a.type === 'CAPTURE_CITY' && a.unitId === unit.id,
      );
      const moveIdx = plan.findIndex(
        (a) => a.type === 'MOVE_UNIT' && a.unitId === unit.id,
      );
      expect(captureIdx).toBeGreaterThanOrEqual(0);
      expect(moveIdx).toBe(-1);
    }
  });

  it('AI reliably executes EXPLORE_RUINS instead of walking off Ancient Ruins when ready', () => {
    const state = createGame({
      humanFaction: 'humans',
      difficulty: 'normal',
      mapSize: 16,
      maxTurns: 30,
      seed: 204,
    });
    const player = state.players[0];
    const ruin = state.tiles.find((t) => t.resource === 'ruins')!;
    const unit = Object.values(state.units).find((u) => u.ownerId === player.id)!;

    // Place unit onto Ancient Ruins and mark ready to explore (Turn N+1 start state)
    state.tiles[unit.y * state.mapSize + unit.x].unitId = null;
    unit.x = ruin.x;
    unit.y = ruin.y;
    ruin.unitId = unit.id;
    unit.canExploreRuins = true;
    unit.hasMoved = false;
    unit.hasAttacked = false;
    unit.actedThisTurn = false;
    player.revealedTiles[ruin.y * state.mapSize + ruin.x] = true;

    for (const diff of ['easy', 'normal'] as const) {
      const plan = planAITurn(state, player.id, diff);
      const exploreIdx = plan.findIndex(
        (a) => a.type === 'EXPLORE_RUINS' && a.unitId === unit.id,
      );
      const moveIdx = plan.findIndex(
        (a) => a.type === 'MOVE_UNIT' && a.unitId === unit.id,
      );
      expect(exploreIdx).toBeGreaterThanOrEqual(0);
      expect(moveIdx).toBe(-1);
    }
  });

  it('20-match headless AI-vs-AI soak test: 0 illegal actions, <50ms avg turn, valid endings', () => {
    const MATCH_COUNT = 20;
    let totalTurns = 0;
    let totalComputeMs = 0;
    let maxTurnMs = 0;
    let totalActions = 0;
    let illegalActions = 0;
    let totalCombats = 0;
    let totalTechs = 0;
    let totalCaptures = 0;
    let totalRuinsExplored = 0;
    const winReasons: Record<string, number> = { domination: 0, glory: 0 };
    const winnersByFaction: Record<FactionId, number> = {
      humans: 0,
      orcs: 0,
      elves: 0,
      dwarves: 0,
    };

    for (let m = 0; m < MATCH_COUNT; m++) {
      const humanFaction = ALL_FACTIONS[m % ALL_FACTIONS.length];
      const difficulty: Difficulty = m % 2 === 0 ? 'normal' : 'easy';
      const mapSize: MapSize = m % 2 === 0 ? 16 : 18;

      let state = createGame({
        humanFaction,
        difficulty,
        mapSize,
        maxTurns: 30,
        seed: 1000 + m * 37,
      });

      let safetyGuard = 0;
      while (state.phase === 'playing' && safetyGuard++ < 400) {
        const active = state.players[state.activePlayerIndex];
        const t0 = performance.now();
        const plan = planAITurn(state, active.id, difficulty);
        const dt = performance.now() - t0;

        totalTurns++;
        totalComputeMs += dt;
        if (dt > maxTurnMs) maxTurnMs = dt;

        expect(plan.length).toBeGreaterThan(0);

        for (const action of plan) {
          if (state.phase !== 'playing') break;
          const res = applyAction(state, action);
          state = res.state;
          totalActions++;
          if (res.events.length === 0) illegalActions++;
          for (const ev of res.events) {
            if (ev.type === 'UNIT_ATTACKED') totalCombats++;
            if (ev.type === 'TECH_RESEARCHED') totalTechs++;
            if (ev.type === 'CITY_CAPTURED') totalCaptures++;
            if (ev.type === 'RUINS_CLAIMED') totalRuinsExplored++;
          }
        }
      }

      expect(state.phase).toBe('game_over');
      expect(state.winnerId).not.toBeNull();
      expect(state.winReason === 'domination' || state.winReason === 'glory').toBe(true);

      if (state.winReason) winReasons[state.winReason]++;
      const winner = state.players.find((p) => p.id === state.winnerId);
      if (winner) winnersByFaction[winner.faction]++;
    }

    const avgTurnMs = totalComputeMs / Math.max(1, totalTurns);
    console.info('[AI Soak Summary]', {
      matches: MATCH_COUNT,
      totalTurns,
      totalActions,
      illegalActions,
      avgTurnMs: Number(avgTurnMs.toFixed(2)),
      maxTurnMs: Number(maxTurnMs.toFixed(2)),
      totalCombats,
      totalTechs,
      totalCaptures,
      totalRuinsExplored,
      winReasons,
      winnersByFaction,
    });

    expect(illegalActions).toBe(0);
    expect(avgTurnMs).toBeLessThan(50);
    expect(totalCaptures).toBeGreaterThan(0);
    expect(totalTechs).toBeGreaterThan(0);
    expect(totalCombats).toBeGreaterThan(0);
  }, 60_000);
});
