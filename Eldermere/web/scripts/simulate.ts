/**
 * Headless AI-vs-AI / weak-human-vs-AI simulation CLI (no UI, deterministic by seed).
 *
 *   npm run sim -- --games 200 --difficulty normal
 *   npm run sim -- --games 120 --mode human --human novice --difficulty easy
 *   npm run sim -- --games 100 --mode duel --a ai:normal --b legacy:normal
 *
 * Options
 *   --games N          number of games (default 40)
 *   --difficulty D     easy | normal: difficulty of the AI seats (default normal)
 *   --map M            16 | 18 | mixed (default mixed: alternates)
 *   --mode X           ai     : all four seats are the AI at --difficulty (default)
 *                      human  : seat 0 is the --human stand-in, seats 1-3 are AI at --difficulty
 *                      duel   : two factions --a, two factions --b (alternating per game)
 *   --human C          controller for the human seat (default novice)
 *   --a C / --b C      controllers for duel mode
 *   --ai C             override the controller for AI seats (default ai:<difficulty>)
 *   --turn-cap N       harness stop (default 150). Real games have no turn limit.
 *   --max-turns N      engine Glory limit (default 0 = real-game rules, domination only)
 *   --seed N           base seed (default 1)
 *   --workers N        parallel worker processes (default: cpus-2, max 8; 1 = in-process)
 *   --json FILE        also write raw per-game records to FILE
 *   --ctrl-<faction> C pin one faction to a controller (e.g. --ctrl-elves novice)
 *   --by faction       print the time series per faction instead of per seat controller
 *
 * Controllers: novice | casual | ai:easy | ai:normal | legacy:easy | legacy:normal
 *   novice = scripted weak human (src/sim/noviceBot.ts, independent of the AI code)
 *   casual = the AI played sloppily (a reasonable player still learning)
 *   (legacy:* is the pre-overhaul AI snapshot kept in scripts/legacy-ai for before/after comparisons)
 */
import { spawn } from 'node:child_process';
import { availableParallelism } from 'node:os';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { DIFFICULTY_CONFIGS, planAITurn, type DifficultyConfig } from '../src/ai/index';
import { ALL_FACTIONS, type Difficulty, type FactionId, type MapSize } from '../src/game/index';
import { formatReport, runMatch, type GameRecord, type SeatController } from '../src/sim/harness';
import { planNoviceTurn } from '../src/sim/noviceBot';
import { planAITurn as planLegacyTurn } from './legacy-ai/index';

type Args = Record<string, string>;

function parseArgs(argv: string[]): Args {
  const args: Args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const val = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : 'true';
    args[key] = val;
  }
  return args;
}

/**
 * "Casual" human stand-in: the AI's own decision machinery played sloppier than Captain
 * (forgets some units, shakier tactics, a bit less production) but without Squire's
 * deliberate restraint. Roughly a reasonable player still learning the game.
 */
const CASUAL_CONFIG: DifficultyConfig = {
  ...DIFFICULTY_CONFIGS.normal,
  noiseRange: 8,
  dangerAwareness: 0.6,
  focusFire: 0.5,
  armyTargetMult: 0.85,
  trainSkipChance: 0.15,
  unitNeglectChance: 0.15,
  economySkipChance: 0.1,
};

function controllerFor(spec: string): SeatController {
  if (spec === 'novice') return planNoviceTurn;
  if (spec === 'casual') return (s, id) => planAITurn(s, id, 'normal', { config: CASUAL_CONFIG });
  const [kind, diff] = spec.split(':') as [string, Difficulty];
  if (diff !== 'easy' && diff !== 'normal') throw new Error(`Bad controller ${spec}`);
  if (kind === 'ai') return (s, id) => planAITurn(s, id, diff);
  if (kind === 'legacy') return (s, id) => planLegacyTurn(s, id, diff);
  throw new Error(`Unknown controller ${spec}`);
}

function seatLabels(args: Args, gameIndex: number): Record<FactionId, string> {
  const difficulty = (args.difficulty ?? 'normal') as Difficulty;
  const aiSpec = args.ai ?? `ai:${difficulty}`;
  const mode = args.mode ?? 'ai';
  const humanFaction = ALL_FACTIONS[gameIndex % 4];
  const labels = {} as Record<FactionId, string>;
  if (mode === 'duel') {
    const a = args.a ?? 'ai:normal';
    const b = args.b ?? 'legacy:normal';
    // Alternate which pair of factions gets controller A so faction strength cancels out.
    const flip = Math.floor(gameIndex / 4) % 2 === 1;
    ALL_FACTIONS.forEach((f, i) => {
      const isA = (i % 2 === 0) !== flip;
      labels[f] = isA ? a : b;
    });
    return labels;
  }
  for (const f of ALL_FACTIONS) labels[f] = args[`ctrl-${f}`] ?? aiSpec;
  if (mode === 'human') labels[humanFaction] = `human=${args.human ?? 'novice'}`;
  return labels;
}

function runShard(args: Args, shard: number, shards: number): GameRecord[] {
  const games = Number(args.games ?? 40);
  const baseSeed = Number(args.seed ?? 1);
  const mapArg = args.map ?? 'mixed';
  const difficulty = (args.difficulty ?? 'normal') as Difficulty;
  const records: GameRecord[] = [];
  for (let g = shard; g < games; g += shards) {
    const labels = seatLabels(args, g);
    const controllers = {} as Record<FactionId, SeatController>;
    for (const f of ALL_FACTIONS) {
      const l = labels[f];
      controllers[f] = controllerFor(l.startsWith('human=') ? l.slice(6) : l);
    }
    const mapSize: MapSize = mapArg === '16' ? 16 : mapArg === '18' ? 18 : g % 2 === 0 ? 16 : 18;
    records.push(
      runMatch({
        seed: baseSeed * 100003 + g * 7919,
        mapSize,
        humanFaction: ALL_FACTIONS[g % 4],
        difficulty,
        labels,
        controllers,
        engineMaxTurns: Number(args['max-turns'] ?? 0),
        turnCap: Number(args['turn-cap'] ?? 150),
      }),
    );
  }
  return records;
}

async function runParallel(args: Args, workers: number): Promise<GameRecord[]> {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const viteNode = path.resolve(here, '../node_modules/vite-node/vite-node.mjs');
  const script = path.resolve(here, 'simulate.ts');
  const passArgs = Object.entries(args)
    .filter(([k]) => k !== 'workers' && k !== 'json')
    .flatMap(([k, v]) => [`--${k}`, v]);
  const jobs = Array.from({ length: workers }, (_, i) =>
    new Promise<GameRecord[]>((resolve, reject) => {
      const child = spawn(
        process.execPath,
        [viteNode, script, '--', ...passArgs, '--shard', String(i), '--shards', String(workers), '--emit-json', 'true'],
        { stdio: ['ignore', 'pipe', 'inherit'] },
      );
      let buf = '';
      child.stdout.on('data', (d) => (buf += d));
      child.on('exit', (code) => {
        if (code !== 0) return reject(new Error(`worker ${i} exited ${code}`));
        const start = buf.indexOf('@@JSON@@');
        resolve(JSON.parse(buf.slice(start + 8)));
      });
    }),
  );
  return (await Promise.all(jobs)).flat();
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args['emit-json']) {
    const recs = runShard(args, Number(args.shard), Number(args.shards));
    process.stdout.write('@@JSON@@' + JSON.stringify(recs));
    return;
  }
  const games = Number(args.games ?? 40);
  const workers = Math.max(
    1,
    Math.min(games, Number(args.workers ?? Math.min(8, Math.max(1, availableParallelism() - 2)))),
  );
  const t0 = Date.now();
  const records = workers === 1 ? runShard(args, 0, 1) : await runParallel(args, workers);
  records.sort((a, b) => a.seed - b.seed);
  const mode = args.mode ?? 'ai';
  const title =
    mode === 'human'
      ? `human seat=${args.human ?? 'novice'} vs AI ${args.ai ?? 'ai:' + (args.difficulty ?? 'normal')}`
      : mode === 'duel'
        ? `duel ${args.a ?? 'ai:normal'} vs ${args.b ?? 'legacy:normal'}`
        : `AI-vs-AI ${args.ai ?? 'ai:' + (args.difficulty ?? 'normal')}`;
  console.log(
    formatReport(
      records,
      `${title}  (map=${args.map ?? 'mixed'}, turnCap=${args['turn-cap'] ?? 150}, seed=${args.seed ?? 1})`,
      args.by === 'faction' ? 'faction' : 'label',
    ),
  );
  const slow = records.reduce((m, r) => (r.maxTurnMs > m.maxTurnMs ? r : m), records[0]);
  if (slow) {
    console.log(
      `slowest AI turn: ${slow.maxTurnMs.toFixed(0)}ms (seed ${slow.seed}, map ${slow.mapSize}, ${JSON.stringify(slow.slowestTurn)})`,
    );
  }
  console.log(`\nwall time ${((Date.now() - t0) / 1000).toFixed(1)}s with ${workers} worker(s)`);
  if (args.json) writeFileSync(args.json, JSON.stringify(records));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
