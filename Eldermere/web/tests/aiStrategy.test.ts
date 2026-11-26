import { describe, expect, it } from 'vitest';
import { DIFFICULTY_CONFIGS, planAITurn } from '../src/ai/index';
import { chooseCityReward, buildSpatialContext } from '../src/ai/evaluator';
import { FACTION_AI_PROFILES } from '../src/ai/profiles';
import { humanPressure, humanTargetWeight } from '../src/ai/strategy';
import {
  ALL_FACTIONS,
  createGame,
  getTile,
  type FactionId,
  type GameState,
  type UnitType,
} from '../src/game/index';
import { runMatch, type SeatController } from '../src/sim/harness';

function aiSeats(difficulty: 'easy' | 'normal'): Record<FactionId, SeatController> {
  const c = {} as Record<FactionId, SeatController>;
  for (const f of ALL_FACTIONS) c[f] = (s, id) => planAITurn(s, id, difficulty);
  return c;
}
function labels(label: string): Record<FactionId, string> {
  const l = {} as Record<FactionId, string>;
  for (const f of ALL_FACTIONS) l[f] = label;
  return l;
}

function clearUnits(state: GameState) {
  for (const u of Object.values(state.units)) {
    const t = getTile(state, u.x, u.y);
    if (t) t.unitId = null;
  }
  state.units = {};
}

function place(
  state: GameState,
  ownerId: string,
  type: UnitType,
  x: number,
  y: number,
  hp?: number,
) {
  const id = `t_${type}_${x}_${y}`;
  const maxHp = type === 'warrior' || type === 'archer' || type === 'rider' ? 10 : 15;
  state.units[id] = {
    id,
    type,
    ownerId,
    homeCityId: null,
    x,
    y,
    hp: hp ?? maxHp,
    maxHp,
    kills: 0,
    isVeteran: false,
    canPromote: false,
    hasMoved: false,
    hasAttacked: false,
    canEscapeMove: false,
    canPersistAttack: false,
    actedThisTurn: false,
    canCapture: false,
    canExploreRuins: false,
  };
  const t = getTile(state, x, y)!;
  t.unitId = id;
  t.terrain = 'plains';
  t.hasVillage = false;
  for (const p of state.players) p.revealedTiles[y * state.mapSize + x] = true;
  return state.units[id];
}

describe('AI strategy & production (regressions for "civs stop producing units")', () => {
  it('keeps training units through the mid and late game and never sits on affordable free slots', () => {
    for (const seed of [11, 29]) {
      const rec = runMatch({
        seed,
        mapSize: 16,
        humanFaction: 'humans',
        difficulty: 'normal',
        labels: labels('ai:normal'),
        controllers: aiSeats('normal'),
        engineMaxTurns: 0,
        turnCap: 50,
      });
      expect(rec.illegalActions).toBe(0);
      for (const p of rec.players) {
        // Every player that survives a 10-turn window keeps recruiting during it.
        for (let b = 1; b < p.buckets.length; b++) {
          const bucket = p.buckets[b];
          if (bucket.samples < 10) continue; // eliminated during the window
          expect(bucket.trained, `${p.faction} trained nothing in turns ${b * 10 + 1}-${b * 10 + 10}`).toBeGreaterThan(0);
        }
        // No early tech-greed starvation: a real standing army by turns 11-20
        // (the pre-overhaul AI averaged < 2 units here for Humans and Dwarves).
        const b2 = p.buckets[1];
        if (b2 && b2.samples >= 10) expect(b2.unitsSum / b2.samples).toBeGreaterThanOrEqual(3);
        // Never ends a turn rich (>= 8★) with an affordable unit and a free city slot unused.
        const idleCouldTrain = p.buckets.reduce((a, x) => a + x.idleGoldCouldTrain, 0);
        const samples = p.buckets.reduce((a, x) => a + x.samples, 0);
        expect(idleCouldTrain / Math.max(1, samples)).toBeLessThan(0.03);
      }
    }
  }, 60_000);

  it('army keeps growing while gold piles up (no hoarding with a flat army)', () => {
    const rec = runMatch({
      seed: 47,
      mapSize: 18,
      humanFaction: 'orcs',
      difficulty: 'normal',
      labels: labels('ai:normal'),
      controllers: aiSeats('normal'),
      engineMaxTurns: 0,
      turnCap: 40,
    });
    let grewCount = 0;
    for (const p of rec.players) {
      const early = p.buckets[0];
      const mid = p.buckets[2];
      if (!early || !mid || mid.samples < 10) continue;
      if (mid.citiesSum / mid.samples < 2) continue; // empire collapsed under siege
      // Turns 21-30 vs 1-10: a non-collapsed AI fields a clearly larger army.
      expect(mid.unitsSum / mid.samples).toBeGreaterThan(early.unitsSum / early.samples);
      grewCount++;
    }
    expect(grewCount).toBeGreaterThanOrEqual(2);
  }, 60_000);

  it('Squire (easy) also keeps training units without stalling cities', () => {
    const rec = runMatch({
      seed: 19,
      mapSize: 16,
      humanFaction: 'elves',
      difficulty: 'easy',
      labels: labels('ai:easy'),
      controllers: aiSeats('easy'),
      engineMaxTurns: 0,
      turnCap: 40,
    });
    expect(rec.illegalActions).toBe(0);
    for (const p of rec.players) {
      for (let b = 1; b < p.buckets.length; b++) {
        const bucket = p.buckets[b];
        if (bucket.samples < 10) continue;
        expect(bucket.trained, `Squire ${p.faction} stalled in turns ${b * 10 + 1}-${b * 10 + 10}`).toBeGreaterThan(0);
      }
      const idleCouldTrain = p.buckets.reduce((a, x) => a + x.idleGoldCouldTrain, 0);
      const samples = p.buckets.reduce((a, x) => a + x.samples, 0);
      expect(idleCouldTrain / Math.max(1, samples)).toBeLessThan(0.05);
    }
  }, 60_000);

  it('uses a smooth, cliff-free difficulty pressure curve against the human player', () => {
    for (const diff of [DIFFICULTY_CONFIGS.easy, DIFFICULTY_CONFIGS.normal]) {
      let prevP = humanPressure(1, diff);
      let prevW = humanTargetWeight(1, diff);
      expect(prevP).toBeGreaterThan(0);
      for (let t = 2; t <= 45; t++) {
        const curP = humanPressure(t, diff);
        const curW = humanTargetWeight(t, diff);
        expect(curP).toBeGreaterThanOrEqual(prevP);
        expect(curW).toBeGreaterThanOrEqual(prevW);
        // No abrupt step-function cliff between consecutive turns.
        expect(curP - prevP).toBeLessThan(0.12);
        expect(curW - prevW).toBeLessThan(0.08);
        prevP = curP;
        prevW = curW;
      }
    }
    expect(humanTargetWeight(10, DIFFICULTY_CONFIGS.easy)).toBeLessThan(
      humanTargetWeight(10, DIFFICULTY_CONFIGS.normal),
    );
  });

  it('difficulty presets are separated by decision quality and tempo, not by cheating or stalled cities', () => {
    const e = DIFFICULTY_CONFIGS.easy;
    const n = DIFFICULTY_CONFIGS.normal;
    expect(e.dangerAwareness).toBeLessThan(n.dangerAwareness);
    expect(e.focusFire).toBeLessThan(n.focusFire);
    expect(e.aggressionDelay).toBeGreaterThan(n.aggressionDelay);
    expect(e.maxTechsPerTurn).toBeLessThan(n.maxTechsPerTurn);
    expect(e.maxEconActionsPerTurn).toBeLessThan(n.maxEconActionsPerTurn);
    expect(e.unitNeglectChance).toBeGreaterThan(n.unitNeglectChance);
    expect(e.trainSkipChance).toBe(0);
    expect(n.trainSkipChance).toBe(0);
    // Faction personalities: Orcs strike earliest, Dwarves turtle longest.
    expect(FACTION_AI_PROFILES.orcs.aggressionTurn).toBeLessThan(FACTION_AI_PROFILES.dwarves.aggressionTurn);
    expect(FACTION_AI_PROFILES.elves.rangedShare).toBeGreaterThan(FACTION_AI_PROFILES.orcs.rangedShare);
  });
});

describe('AI tactics', () => {
  it('finishes off a wounded enemy instead of ignoring it, and never suicides', () => {
    const state = createGame({ humanFaction: 'humans', difficulty: 'normal', mapSize: 16, maxTurns: 0, seed: 5 });
    clearUnits(state);
    const orcs = state.players.find((p) => p.faction === 'orcs')!;
    const humans = state.players.find((p) => p.faction === 'humans')!;
    state.activePlayerIndex = state.players.indexOf(orcs);
    // Find an empty plains strip away from cities.
    let x0 = 6;
    let y0 = 6;
    outer: for (let y = 2; y < 14; y++) {
      for (let x = 2; x < 12; x++) {
        const ok = [0, 1, 2].every((dx) => {
          const t = getTile(state, x + dx, y)!;
          return !t.cityId && !t.hasVillage && t.terrain !== 'water';
        });
        if (ok) {
          x0 = x;
          y0 = y;
          break outer;
        }
      }
    }
    const warrior = place(state, orcs.id, 'warrior', x0, y0);
    const victim = place(state, humans.id, 'warrior', x0 + 1, y0, 2);
    const plan = planAITurn(state, orcs.id, 'normal');
    const atk = plan.find((a) => a.type === 'ATTACK_UNIT');
    expect(atk).toMatchObject({ attackerId: warrior.id, defenderId: victim.id });

    // A full-health defender behind it on a fortress tile: attacking would only hurt us.
    const s2 = createGame({ humanFaction: 'humans', difficulty: 'normal', mapSize: 16, maxTurns: 0, seed: 5 });
    clearUnits(s2);
    s2.activePlayerIndex = s2.players.findIndex((p) => p.faction === 'orcs');
    const weak = place(s2, orcs.id, 'warrior', x0, y0, 2);
    const wall = place(s2, humans.id, 'defender', x0 + 1, y0);
    getTile(s2, x0 + 1, y0)!.terrain = 'mountain';
    const plan2 = planAITurn(s2, orcs.id, 'normal');
    expect(
      plan2.some((a) => a.type === 'ATTACK_UNIT' && a.attackerId === weak.id && a.defenderId === wall.id),
    ).toBe(false);
  });

  it('picks the Champion over a Park in real (no turn limit) games', () => {
    const state = createGame({ humanFaction: 'humans', difficulty: 'normal', mapSize: 16, maxTurns: 0, seed: 9 });
    const player = state.players[0];
    const city = Object.values(state.cities).find((c) => c.ownerId === player.id)!;
    const ctx = buildSpatialContext(state, player.id);
    expect(chooseCityReward(state, city, 5, ctx, FACTION_AI_PROFILES.humans)).toBe('champion');
    state.config.maxTurns = 30;
    state.turn = 28;
    expect(chooseCityReward(state, city, 5, ctx, FACTION_AI_PROFILES.humans)).toBe('park');
  });

  it('uses its Age III superpower once available (Dwarves summon the Fire Drake)', () => {
    const state = createGame({ humanFaction: 'dwarves', difficulty: 'normal', mapSize: 16, maxTurns: 0, seed: 13 });
    const dw = state.players[0];
    dw.techs.push(
      'dwarves_mining',
      'dwarves_khazad_forges',
      'dwarves_shieldbearers',
      'dwarves_runic_plate',
      'dwarves_foraging',
      'dwarves_ram_riders',
    );
    const plan = planAITurn(state, dw.id, 'normal');
    expect(plan.some((a) => a.type === 'USE_SUPERPOWER')).toBe(true);
  });

  it('simulation harness is deterministic by seed', () => {
    const spec = {
      seed: 77,
      mapSize: 16 as const,
      humanFaction: 'dwarves' as FactionId,
      difficulty: 'easy' as const,
      labels: labels('ai:easy'),
      controllers: aiSeats('easy'),
      engineMaxTurns: 0,
      turnCap: 15,
    };
    const a = runMatch(spec);
    const b = runMatch(spec);
    const strip = (r: typeof a) => ({
      ...r,
      aiMs: 0,
      maxTurnMs: 0,
      aiTurnTimesMs: [],
      slowestTurn: null,
      players: r.players.map((p) => ({ ...p, maxTurnMs: 0, slowTurns60: 0, slowTurns100: 0 })),
    });
    expect(strip(a)).toEqual(strip(b));
  }, 30_000);
});
