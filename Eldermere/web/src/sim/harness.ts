/**
 * Headless (no UI) match runner + metrics aggregation for AI / balance testing.
 *
 * Everything here is pure and deterministic by seed: the same (seed, seats) always
 * produces the same game. Used by `scripts/simulate.ts` (CLI) and by tests.
 */
import {
  applyAction,
  calculatePlayerIncome,
  createGame,
  getCityUnitCap,
  getCityUnitCount,
  getLeaderboard,
  getPlayerAge,
  getPlayerCities,
  getPlayerUnits,
  getTile,
  getTrainableUnits,
  getUnitCost,
  type FactionId,
  type GameAction,
  type GameState,
  type MapSize,
} from '../game/index';

export type SeatController = (state: GameState, playerId: string) => GameAction[];

export interface MatchSpec {
  seed: number;
  mapSize: MapSize;
  /** Faction placed in seat 0 (the "human" seat, isHuman=true in engine terms). */
  humanFaction: FactionId;
  /** Engine difficulty stored in config (affects nothing engine-side; AI reads it). */
  difficulty: 'easy' | 'normal';
  /** Controller label per faction (for reporting). */
  labels: Record<FactionId, string>;
  controllers: Record<FactionId, SeatController>;
  /** Engine glory turn limit (0 = real-game rules: domination only). */
  engineMaxTurns: number;
  /** Harness hard stop (game recorded as "capped" with the Glory leader noted). */
  turnCap: number;
}

/** Per player, per 10-turn bucket sums (divide by `samples` for averages). */
export interface BucketStats {
  samples: number;
  unitsSum: number;
  citiesSum: number;
  techsSum: number;
  goldEndSum: number;
  /** Sum of projected income (goldPerTurn) at end of turn. */
  incomeSum: number;
  trained: number;
  /** Turns that ended with >= IDLE_GOLD gold and no unit trained. */
  idleGold: number;
  /** ...of which a unit COULD have been trained (free city center, under cap, affordable). */
  idleGoldCouldTrain: number;
  /** City-turns observed at end of turn. */
  cityTurns: number;
  /** City-turns at the unit cap. */
  cappedCityTurns: number;
  /** City-turns under the cap whose center was blocked by a unit that was NOT just trained there. */
  staleBlockedCityTurns: number;
}

export interface PlayerRecord {
  faction: FactionId;
  label: string;
  seat: number;
  eliminatedTurn: number | null;
  finalCities: number;
  finalUnits: number;
  finalTechs: number;
  finalScore: number;
  rank: number;
  age3Turn: number | null;
  superpowerTurn: number | null;
  trainedTotal: number;
  kills: number;
  losses: number;
  citiesCaptured: number;
  villagesClaimed: number;
  buckets: BucketStats[];
}

export interface GameRecord {
  seed: number;
  mapSize: MapSize;
  turns: number;
  capped: boolean;
  winnerFaction: FactionId | null;
  /** Glory leader at the end (winner if decided, else score leader at cap). */
  leaderFaction: FactionId;
  winReason: 'domination' | 'glory' | 'cap' | null;
  illegalActions: number;
  aiTurns: number;
  aiMs: number;
  maxTurnMs: number;
  /** Where the slowest AI turn happened (for profiling). */
  slowestTurn: { turn: number; faction: FactionId; units: number; enemies: number } | null;
  players: PlayerRecord[];
}

export const IDLE_GOLD = 8;
export const BUCKET_SIZE = 10;

function emptyBucket(): BucketStats {
  return {
    samples: 0,
    unitsSum: 0,
    citiesSum: 0,
    techsSum: 0,
    goldEndSum: 0,
    incomeSum: 0,
    trained: 0,
    idleGold: 0,
    idleGoldCouldTrain: 0,
    cityTurns: 0,
    cappedCityTurns: 0,
    staleBlockedCityTurns: 0,
  };
}

function trainingCapacity(
  state: GameState,
  playerId: string,
  trainedIds: Set<string>,
): { affordable: boolean; cities: number; capped: number; staleBlocked: number } {
  const player = state.players.find((p) => p.id === playerId)!;
  let affordable = false;
  let capped = 0;
  let staleBlocked = 0;
  const cities = getPlayerCities(state, playerId);
  for (const city of cities) {
    const center = getTile(state, city.x, city.y);
    if (!center) continue;
    if (getCityUnitCount(state, city.id) >= getCityUnitCap(state, city)) {
      capped++;
      continue;
    }
    if (center.unitId !== null) {
      // Own unit parked there (not just trained / just captured). Enemy sieges are not counted.
      const occ = state.units[center.unitId];
      if (occ && occ.ownerId === playerId && !trainedIds.has(center.unitId)) staleBlocked++;
      continue;
    }
    for (const t of getTrainableUnits(state, city.id)) {
      if (getUnitCost(state, playerId, t) <= player.gold) affordable = true;
    }
  }
  return { affordable, cities: cities.length, capped, staleBlocked };
}

export function runMatch(spec: MatchSpec): GameRecord {
  let state = createGame({
    humanFaction: spec.humanFaction,
    difficulty: spec.difficulty,
    mapSize: spec.mapSize,
    maxTurns: spec.engineMaxTurns,
    seed: spec.seed,
  });

  const players: PlayerRecord[] = state.players.map((p, seat) => ({
    faction: p.faction,
    label: spec.labels[p.faction],
    seat,
    eliminatedTurn: null,
    finalCities: 0,
    finalUnits: 0,
    finalTechs: 0,
    finalScore: 0,
    rank: 0,
    age3Turn: null,
    superpowerTurn: null,
    trainedTotal: 0,
    kills: 0,
    losses: 0,
    citiesCaptured: 0,
    villagesClaimed: 0,
    buckets: [],
  }));
  const recByPlayerId = new Map(state.players.map((p, i) => [p.id, players[i]]));

  let illegal = 0;
  let aiTurns = 0;
  let aiMs = 0;
  let maxTurnMs = 0;
  let slowestTurn: GameRecord['slowestTurn'] = null;
  let guard = 0;

  while (state.phase === 'playing' && state.turn <= spec.turnCap && guard++ < spec.turnCap * 8) {
    const active = state.players[state.activePlayerIndex];
    const rec = recByPlayerId.get(active.id)!;
    const ctrl = spec.controllers[active.faction];

    const t0 = performance.now();
    const plan = ctrl(state, active.id);
    const dt = performance.now() - t0;
    aiTurns++;
    aiMs += dt;
    if (dt > maxTurnMs) {
      maxTurnMs = dt;
      let mine = 0;
      let others = 0;
      for (const u of Object.values(state.units)) {
        if (u.ownerId === active.id) mine++;
        else others++;
      }
      slowestTurn = { turn: state.turn, faction: active.faction, units: mine, enemies: others };
    }

    let trainedThisTurn = 0;
    const trainedIds = new Set<string>();
    const turnAtStart = state.turn;
    const applyOne = (action: GameAction) => {
      const prev = state;
      const res = applyAction(state, action);
      if (res.events.length === 0) illegal++;
      state = res.state;
      for (const ev of res.events) {
        if (ev.type === 'UNIT_TRAINED' && ev.ownerId === active.id) {
          trainedThisTurn++;
          trainedIds.add(ev.unitId);
        } else if (ev.type === 'UNIT_ATTACKED') {
          const defRec = recByPlayerId.get(prev.units[ev.defenderId]?.ownerId ?? '');
          if (ev.defenderKilled) {
            rec.kills++;
            if (defRec) defRec.losses++;
          }
          if (ev.attackerKilled) {
            rec.losses++;
            if (defRec) defRec.kills++;
          }
        } else if (ev.type === 'CITY_CAPTURED' && ev.newOwnerId === active.id) {
          // The capturing unit necessarily stands on the new city's center this turn.
          const capTile = getTile(state, ev.coord.x, ev.coord.y);
          if (capTile?.unitId) trainedIds.add(capTile.unitId);
          if (ev.wasVillage) rec.villagesClaimed++;
          else rec.citiesCaptured++;
        } else if (ev.type === 'SUPERPOWER_USED' && ev.playerId === active.id) {
          rec.superpowerTurn = state.turn;
        } else if (ev.type === 'PLAYER_ELIMINATED') {
          const victim = recByPlayerId.get(ev.playerId);
          if (victim && victim.eliminatedTurn === null) victim.eliminatedTurn = state.turn;
        }
      }
    };

    let ended = false;
    for (const action of plan) {
      if (state.phase !== 'playing') break;
      if (action.type === 'END_TURN') {
        ended = true;
        break;
      }
      applyOne(action);
    }

    // Snapshot at end of this player's turn (before END_TURN income).
    if (state.phase === 'playing') {
      const me = state.players.find((p) => p.id === active.id)!;
      if (getPlayerAge(me) >= 3 && rec.age3Turn === null) rec.age3Turn = turnAtStart;
      const bIdx = Math.floor((turnAtStart - 1) / BUCKET_SIZE);
      while (rec.buckets.length <= bIdx) rec.buckets.push(emptyBucket());
      const b = rec.buckets[bIdx];
      b.samples++;
      b.unitsSum += getPlayerUnits(state, me.id).length;
      b.citiesSum += getPlayerCities(state, me.id).length;
      b.techsSum += me.techs.length;
      b.goldEndSum += me.gold;
      b.incomeSum += calculatePlayerIncome(state, me.id);
      b.trained += trainedThisTurn;
      rec.trainedTotal += trainedThisTurn;
      const cap = trainingCapacity(state, me.id, trainedIds);
      b.cityTurns += cap.cities;
      b.cappedCityTurns += cap.capped;
      b.staleBlockedCityTurns += cap.staleBlocked;
      if (trainedThisTurn === 0 && me.gold >= IDLE_GOLD) {
        b.idleGold++;
        if (cap.affordable) b.idleGoldCouldTrain++;
      }
    }

    // Planner may omit END_TURN only when the game ended mid-plan; harness always ends the turn.
    void ended;
    if (state.phase === 'playing') applyOne({ type: 'END_TURN' });
  }

  const capped = state.phase === 'playing';
  const board = getLeaderboard(state);
  for (const entry of board) {
    const rec = recByPlayerId.get(entry.playerId)!;
    rec.finalCities = entry.citiesCount;
    rec.finalUnits = entry.unitsCount;
    rec.finalTechs = entry.techsCount;
    rec.finalScore = entry.score;
    rec.rank = entry.rank;
  }
  const winner = state.winnerId ? state.players.find((p) => p.id === state.winnerId) : null;
  return {
    seed: spec.seed,
    mapSize: spec.mapSize,
    turns: Math.min(state.turn, spec.turnCap),
    capped,
    winnerFaction: capped ? null : (winner?.faction ?? null),
    leaderFaction: (winner ?? state.players.find((p) => p.id === board[0].playerId)!).faction,
    winReason: capped ? 'cap' : state.winReason,
    illegalActions: illegal,
    aiTurns,
    aiMs,
    maxTurnMs,
    slowestTurn,
    players,
  };
}

// ---------------------------------------------------------------------------
// Aggregation & reporting
// ---------------------------------------------------------------------------

const FACTIONS: FactionId[] = ['humans', 'orcs', 'elves', 'dwarves'];

function pct(n: number, d: number): string {
  return d === 0 ? '  -  ' : `${((100 * n) / d).toFixed(1)}%`;
}
function num(n: number, d: number, digits = 1): string {
  return d === 0 ? '-' : (n / d).toFixed(digits);
}
function pad(s: string | number, w: number): string {
  const str = String(s);
  return str.length >= w ? str : ' '.repeat(w - str.length) + str;
}
function padR(s: string | number, w: number): string {
  const str = String(s);
  return str.length >= w ? str : str + ' '.repeat(w - str.length);
}

export interface Summary {
  games: number;
  avgTurns: number;
  cappedRate: number;
  dominationRate: number;
  illegal: number;
  avgTurnMs: number;
  maxTurnMs: number;
  winRateByFaction: Record<FactionId, number>;
  /** Wins+leader-at-cap share by faction. */
  leaderRateByFaction: Record<FactionId, number>;
  /** Per label (controller) aggregate across factions. */
  byLabel: Record<
    string,
    {
      seats: number;
      wins: number;
      leads: number;
      eliminated: number;
      avgElimTurn: number;
      avgRank: number;
      trainedPer10: number[];
      unitsAvg: number[];
      idleGoldRate: number[];
      idleCouldTrainRate: number[];
    }
  >;
}

export function summarize(records: GameRecord[]): Summary {
  const games = records.length;
  const winRate = {} as Record<FactionId, number>;
  const leadRate = {} as Record<FactionId, number>;
  for (const f of FACTIONS) {
    winRate[f] = records.filter((r) => r.winnerFaction === f).length / Math.max(1, games);
    leadRate[f] = records.filter((r) => r.leaderFaction === f).length / Math.max(1, games);
  }
  const byLabel: Summary['byLabel'] = {};
  for (const r of records) {
    for (const p of r.players) {
      const L = (byLabel[p.label] ??= {
        seats: 0,
        wins: 0,
        leads: 0,
        eliminated: 0,
        avgElimTurn: 0,
        avgRank: 0,
        trainedPer10: [],
        unitsAvg: [],
        idleGoldRate: [],
        idleCouldTrainRate: [],
      });
      L.seats++;
      if (r.winnerFaction === p.faction) L.wins++;
      if (r.leaderFaction === p.faction) L.leads++;
      if (p.eliminatedTurn !== null) {
        L.eliminated++;
        L.avgElimTurn += p.eliminatedTurn;
      }
      L.avgRank += p.rank;
    }
  }
  for (const k of Object.keys(byLabel)) {
    const L = byLabel[k];
    L.avgElimTurn = L.eliminated ? L.avgElimTurn / L.eliminated : 0;
    L.avgRank = L.avgRank / Math.max(1, L.seats);
  }
  const totalTurns = records.reduce((s, r) => s + r.aiTurns, 0);
  return {
    games,
    avgTurns: records.reduce((s, r) => s + r.turns, 0) / Math.max(1, games),
    cappedRate: records.filter((r) => r.capped).length / Math.max(1, games),
    dominationRate: records.filter((r) => r.winReason === 'domination').length / Math.max(1, games),
    illegal: records.reduce((s, r) => s + r.illegalActions, 0),
    avgTurnMs: records.reduce((s, r) => s + r.aiMs, 0) / Math.max(1, totalTurns),
    maxTurnMs: records.reduce((m, r) => Math.max(m, r.maxTurnMs), 0),
    winRateByFaction: winRate,
    leaderRateByFaction: leadRate,
    byLabel,
  };
}

/** Human-readable multi-section report. */
export function formatReport(
  records: GameRecord[],
  title: string,
  groupBy: 'label' | 'faction' = 'label',
): string {
  const out: string[] = [];
  const s = summarize(records);
  out.push(`\n=== ${title} ===`);
  out.push(
    `games=${s.games}  avgLength=${s.avgTurns.toFixed(1)} turns  domination=${pct(
      s.dominationRate * s.games,
      s.games,
    )}  hitTurnCap(no winner)=${pct(s.cappedRate * s.games, s.games)}  illegalActions=${s.illegal}  avgAiTurn=${s.avgTurnMs.toFixed(
      2,
    )}ms  maxAiTurn=${s.maxTurnMs.toFixed(1)}ms`,
  );

  // Faction table
  out.push('');
  out.push(
    `${padR('faction', 9)}${pad('win%', 8)}${pad('lead%', 8)}${pad('elim%', 8)}${pad('rank', 6)}${pad(
      'cities',
      8,
    )}${pad('techs', 7)}${pad('trained', 9)}${pad('kills', 7)}${pad('caps', 6)}${pad('vills', 7)}${pad(
      'age3@',
      7,
    )}${pad('SP use', 8)}${pad('SP@', 6)}`,
  );
  for (const f of FACTIONS) {
    const ps = records.flatMap((r) => r.players.filter((p) => p.faction === f));
    const n = ps.length;
    if (n === 0) continue;
    const wins = records.filter((r) => r.winnerFaction === f).length;
    const leads = records.filter((r) => r.leaderFaction === f).length;
    const elim = ps.filter((p) => p.eliminatedTurn !== null).length;
    const age3 = ps.filter((p) => p.age3Turn !== null);
    const sp = ps.filter((p) => p.superpowerTurn !== null);
    out.push(
      `${padR(f, 9)}${pad(pct(wins, records.length), 8)}${pad(pct(leads, records.length), 8)}${pad(
        pct(elim, n),
        8,
      )}${pad(num(ps.reduce((a, p) => a + p.rank, 0), n, 2), 6)}${pad(
        num(ps.reduce((a, p) => a + p.finalCities, 0), n),
        8,
      )}${pad(num(ps.reduce((a, p) => a + p.finalTechs, 0), n), 7)}${pad(
        num(ps.reduce((a, p) => a + p.trainedTotal, 0), n),
        9,
      )}${pad(num(ps.reduce((a, p) => a + p.kills, 0), n), 7)}${pad(
        num(ps.reduce((a, p) => a + p.citiesCaptured, 0), n),
        6,
      )}${pad(num(ps.reduce((a, p) => a + p.villagesClaimed, 0), n), 7)}${pad(
        num(age3.reduce((a, p) => a + (p.age3Turn ?? 0), 0), age3.length, 0),
        7,
      )}${pad(pct(sp.length, Math.max(1, age3.length)), 8)}${pad(
        num(sp.reduce((a, p) => a + (p.superpowerTurn ?? 0), 0), sp.length, 0),
        6,
      )}`,
    );
  }
  out.push('  (lead% = winner, or Glory leader when the turn cap was hit; SP use = % of Age-III players that used their superpower)');

  // Per-controller label
  const labels = Object.keys(s.byLabel);
  if (labels.length > 1) {
    out.push('');
    out.push(
      `${padR('seat controller', 18)}${pad('seats', 7)}${pad('win%', 8)}${pad('lead%', 8)}${pad(
        'elim%',
        8,
      )}${pad('elim@', 7)}${pad('rank', 6)}`,
    );
    for (const k of labels) {
      const L = s.byLabel[k];
      out.push(
        `${padR(k, 18)}${pad(L.seats, 7)}${pad(pct(L.wins, L.seats), 8)}${pad(pct(L.leads, L.seats), 8)}${pad(
          pct(L.eliminated, L.seats),
          8,
        )}${pad(L.eliminated ? L.avgElimTurn.toFixed(0) : '-', 7)}${pad(L.avgRank.toFixed(2), 6)}`,
      );
    }
  }

  // Time series per controller label (or faction) — alive players only
  const groups = groupBy === 'faction' ? FACTIONS.map((f) => f as string) : labels;
  for (const k of groups) {
    const ps = records.flatMap((r) =>
      r.players.filter((p) => (groupBy === 'faction' ? p.faction === k : p.label === k)),
    );
    const maxB = ps.reduce((m, p) => Math.max(m, p.buckets.length), 0);
    out.push('');
    out.push(`time series [${k}] (per alive player, averaged; idle = ended turn with >=${IDLE_GOLD}★ and trained nothing)`);
    out.push(
      `${padR('turns', 9)}${pad('alive', 7)}${pad('units', 7)}${pad('trained', 9)}${pad('cities', 8)}${pad(
        'techs',
        7,
      )}${pad('income', 8)}${pad('goldEnd', 9)}${pad('idle%', 8)}${pad('idleCT%', 9)}${pad('capped%', 9)}${pad('parked%', 9)}`,
    );
    for (let b = 0; b < maxB; b++) {
      const bs = ps.map((p) => p.buckets[b]).filter((x): x is BucketStats => !!x && x.samples > 0);
      if (bs.length === 0) continue;
      const samples = bs.reduce((a, x) => a + x.samples, 0);
      const sum = (f: (x: BucketStats) => number) => bs.reduce((a, x) => a + f(x), 0);
      const lo = b * BUCKET_SIZE + 1;
      out.push(
        `${padR(`${lo}-${lo + BUCKET_SIZE - 1}`, 9)}${pad(bs.length, 7)}${pad(num(sum((x) => x.unitsSum), samples), 7)}${pad(
          num(sum((x) => x.trained), bs.length),
          9,
        )}${pad(num(sum((x) => x.citiesSum), samples), 8)}${pad(num(sum((x) => x.techsSum), samples), 7)}${pad(
          num(sum((x) => x.incomeSum ?? 0), samples),
          8,
        )}${pad(
          num(sum((x) => x.goldEndSum), samples),
          9,
        )}${pad(pct(sum((x) => x.idleGold), samples), 8)}${pad(pct(sum((x) => x.idleGoldCouldTrain), samples), 9)}${pad(
          pct(sum((x) => x.cappedCityTurns), sum((x) => x.cityTurns)),
          9,
        )}${pad(pct(sum((x) => x.staleBlockedCityTurns), sum((x) => x.cityTurns)), 9)}`,
      );
    }
  }
  out.push('  (trained = units trained per player per 10 turns; idleCT = idle while a unit was affordable & a city slot was free; capped = share of city-turns at the unit cap; parked = share of city-turns under the cap that could not train because one of our own older units sat on the city center)');
  return out.join('\n');
}
