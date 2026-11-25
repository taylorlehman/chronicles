import { describe, expect, it } from 'vitest';
import {
  AGE_ROMAN,
  AGE_THRESHOLDS,
  ALL_FACTIONS,
  FACTION_DEFINITIONS,
  SUPERPOWER_DEFINITIONS,
  TECH_DEFINITIONS,
  applyAction,
  calculatePlayerIncome,
  calculatePlayerScore,
  canResearchTech,
  canUnitCapture,
  canUnitExploreRuins,
  canUseSuperpower,
  cloneState,
  createGame,
  getAvailableTileActions,
  getCityTrainOptions,
  getCityUnitCap,
  getEffectiveAttack,
  getFactionTechs,
  getLeaderboard,
  getNextAgeProgress,
  getPlayer,
  getPlayerAge,
  getPlayerCities,
  getSuperpowerTargetCoords,
  getTechCost,
  getTechResearchBlockReason,
  getTerrainDefenseBonus,
  getTile,
  getTileActionOptions,
  getTrainableUnits,
  getUnitActionOptions,
  getUnitCost,
  getUnitRange,
  getUnitTrainMaxHp,
  getValidAttackTargets,
  getValidMoves,
  hasUnitRemainingActions,
  predictCombat,
  tileIndex,
  type Coord,
  type GameConfig,
  type GameState,
  type Unit,
  type UnitType,
} from '../src/game';

function makeConfig(overrides: Partial<GameConfig> = {}): GameConfig {
  return {
    humanFaction: 'humans',
    difficulty: 'normal',
    mapSize: 16,
    maxTurns: 30,
    seed: 12345,
    ...overrides,
  };
}

function placeTestUnit(
  state: GameState,
  ownerId: string,
  type: UnitType,
  x: number,
  y: number,
  overrides: Partial<Unit> = {},
  revealRadiusForOwner = 3,
): Unit {
  const id = `test_unit_${state.nextEntityId++}`;
  const baseHp = overrides.maxHp ?? 10;
  const unit: Unit = {
    id,
    type,
    ownerId,
    homeCityId: null,
    x,
    y,
    hp: overrides.hp ?? baseHp,
    maxHp: baseHp,
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
    ...overrides,
  };
  state.units[id] = unit;
  const tile = getTile(state, x, y)!;
  tile.unitId = id;
  // Reveal tile for all players and surrounding vision for owner so synthetic move/combat tests aren't blocked by fog
  for (const p of state.players) {
    p.revealedTiles[tileIndex(x, y, state.mapSize)] = true;
    if (p.id === ownerId && revealRadiusForOwner > 0) {
      for (let dy = -revealRadiusForOwner; dy <= revealRadiusForOwner; dy++) {
        for (let dx = -revealRadiusForOwner; dx <= revealRadiusForOwner; dx++) {
          const rx = x + dx;
          const ry = y + dy;
          if (rx >= 0 && ry >= 0 && rx < state.mapSize && ry < state.mapSize) {
            p.revealedTiles[tileIndex(rx, ry, state.mapSize)] = true;
          }
        }
      }
    }
  }
  return unit;
}

function clearBoardUnits(state: GameState): void {
  for (const t of state.tiles) {
    t.unitId = null;
  }
  state.units = {};
}

describe('Map Generation & Game Creation', () => {
  it('is 100% deterministic for the same seed', () => {
    const a = createGame(makeConfig({ seed: 777 }));
    const b = createGame(makeConfig({ seed: 777 }));
    expect(a).toEqual(b);
  });

  it('generates land-connected 16x16 (256) and 18x18 (324) maps with proportional villages and ruins across seeds', () => {
    for (const mapSize of [16, 18] as const) {
      for (const seed of [1, 42, 108, 777, 999, 2026]) {
        const state = createGame(makeConfig({ mapSize, seed }));
        expect(state.tiles).toHaveLength(mapSize * mapSize);

        const capitals = Object.values(state.cities).filter((c) => c.isCapital);
        expect(capitals).toHaveLength(4);
        const minCheb = mapSize === 18 ? 7 : 6;
        for (let i = 0; i < capitals.length; i++) {
          const cap = capitals[i];
          expect(cap.x).toBeGreaterThanOrEqual(2);
          expect(cap.x).toBeLessThanOrEqual(mapSize - 3);
          expect(cap.y).toBeGreaterThanOrEqual(2);
          expect(cap.y).toBeLessThanOrEqual(mapSize - 3);
          for (let j = i + 1; j < capitals.length; j++) {
            const other = capitals[j];
            expect(Math.max(Math.abs(cap.x - other.x), Math.abs(cap.y - other.y))).toBeGreaterThanOrEqual(minCheb);
          }
        }

        // Verify fair nearest-neighbor spacing and at least 2 nearby home villages per capital
        const nnDists = capitals.map((cap, idx) =>
          Math.min(
            ...capitals
              .filter((_, j) => j !== idx)
              .map((o) => Math.hypot(cap.x - o.x, cap.y - o.y)),
          ),
        );
        expect(Math.max(...nnDists) - Math.min(...nnDists)).toBeLessThanOrEqual(3.0);

        const villages = state.tiles.filter((t) => t.hasVillage);
        for (const cap of capitals) {
          const homeVillages = villages.filter((v) => {
            const myDistSq = (v.x - cap.x) ** 2 + (v.y - cap.y) ** 2;
            const dCheb = Math.max(Math.abs(v.x - cap.x), Math.abs(v.y - cap.y));
            if (dCheb < 3 || dCheb > 6) return false;
            return capitals.every(
              (o) => o === cap || (v.x - o.x) ** 2 + (v.y - o.y) ** 2 > myDistSq,
            );
          });
          expect(homeVillages.length).toBeGreaterThanOrEqual(2);
        }
        if (mapSize === 16) {
          expect(villages.length).toBeGreaterThanOrEqual(12);
          expect(villages.length).toBeLessThanOrEqual(16);
        } else {
          expect(villages.length).toBeGreaterThanOrEqual(16);
          expect(villages.length).toBeLessThanOrEqual(20);
        }

        const ruins = state.tiles.filter((t) => t.resource === 'ruins');
        if (mapSize === 16) {
          expect(ruins.length).toBe(6);
        } else {
          expect(ruins.length).toBeGreaterThanOrEqual(8);
          expect(ruins.length).toBeLessThanOrEqual(9);
        }

        const waterTiles = state.tiles.filter((t) => t.terrain === 'water');
        expect(waterTiles.length).toBeGreaterThan(0);

        // BFS from first capital over tiles passable by every faction (not water, not mountain)
        const visited = new Set<number>();
        const start = capitals[0];
        const queue: Coord[] = [{ x: start.x, y: start.y }];
        visited.add(tileIndex(start.x, start.y, mapSize));

        while (queue.length > 0) {
          const curr = queue.shift()!;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (dx === 0 && dy === 0) continue;
              const nt = getTile(state, curr.x + dx, curr.y + dy);
              if (!nt || nt.terrain === 'water' || nt.terrain === 'mountain') continue;
              const idx = tileIndex(nt.x, nt.y, mapSize);
              if (!visited.has(idx)) {
                visited.add(idx);
                queue.push({ x: nt.x, y: nt.y });
              }
            }
          }
        }

        for (const cap of capitals) {
          expect(visited.has(tileIndex(cap.x, cap.y, mapSize))).toBe(true);
        }
        for (const v of villages) {
          expect(visited.has(tileIndex(v.x, v.y, mapSize))).toBe(true);
        }
        for (const r of ruins) {
          expect(visited.has(tileIndex(r.x, r.y, mapSize))).toBe(true);
        }
      }
    }
  });

  it('places capitals in varied non-corner positions with naturally varied geography across seeds', () => {
    const uniquePositions = new Set<string>();
    let nonCornerCapitals = 0;
    for (const seed of [7, 19, 42, 88, 123, 456, 777, 999]) {
      const state = createGame(makeConfig({ mapSize: 16, seed }));
      const capitals = Object.values(state.cities).filter((c) => c.isCapital);
      for (const cap of capitals) {
        uniquePositions.add(`${cap.x},${cap.y}`);
        const isFixedCorner = (cap.x === 2 || cap.x === 13) && (cap.y === 2 || cap.y === 13);
        if (!isFixedCorner) nonCornerCapitals++;
      }
    }
    expect(uniquePositions.size).toBeGreaterThanOrEqual(12);
    expect(nonCornerCapitals).toBeGreaterThanOrEqual(10);
  });

  it('places every civ on terrain suited to its civilization across dynamic seeds', () => {
    for (const seed of [11, 53, 108, 404, 777, 1337]) {
      const state = createGame(makeConfig({ mapSize: 16, seed }));
      const countInRadius2 = (cx: number, cy: number, terrains: string[]): number => {
        let count = 0;
        for (let dy = -2; dy <= 2; dy++) {
          for (let dx = -2; dx <= 2; dx++) {
            if (dx === 0 && dy === 0) continue;
            const t = getTile(state, cx + dx, cy + dy);
            if (t && terrains.includes(t.terrain)) count++;
          }
        }
        return count;
      };

      const capByFaction = (f: string) =>
        Object.values(state.cities).find((c) => c.isCapital && c.ownerId === `player_${f}`)!;

      const hCap = capByFaction('humans');
      const eCap = capByFaction('elves');
      const dCap = capByFaction('dwarves');
      const oCap = capByFaction('orcs');

      // Humans spawn in wide plains
      expect(countInRadius2(hCap.x, hCap.y, ['plains'])).toBeGreaterThanOrEqual(8);
      // Elves spawn in dense forests & ancient woods
      expect(countInRadius2(eCap.x, eCap.y, ['forest', 'ancient_woods'])).toBeGreaterThanOrEqual(8);
      // Dwarves spawn nestled in mountain ranges
      expect(countInRadius2(dCap.x, dCap.y, ['mountain'])).toBeGreaterThanOrEqual(3);
      // Orcs spawn in volcanic wastelands
      expect(countInRadius2(oCap.x, oCap.y, ['wasteland'])).toBeGreaterThanOrEqual(5);
    }
  });

  it('initializes all 4 factions with correct starting gold, tech, and unit', () => {
    const state = createGame(makeConfig({ humanFaction: 'elves' }));
    expect(state.players[0].faction).toBe('elves');
    expect(state.players[0].isHuman).toBe(true);

    for (const faction of ALL_FACTIONS) {
      const def = FACTION_DEFINITIONS[faction];
      const player = state.players.find((p) => p.faction === faction)!;
      expect(player.gold).toBe(def.startingGold);
      expect(player.techs).toEqual([def.startingTech]);
      const units = Object.values(state.units).filter((u) => u.ownerId === player.id);
      expect(units).toHaveLength(1);
      expect(units[0].type).toBe(def.startingUnit);
      expect(units[0].actedThisTurn).toBe(false);
    }
  });

  it('applyAction never mutates the input state', () => {
    const state = createGame(makeConfig());
    const snapshot = cloneState(state);
    const activeUnit = Object.values(state.units).find((u) => u.ownerId === state.players[0].id)!;
    const moves = getValidMoves(state, activeUnit.id);
    expect(moves.length).toBeGreaterThan(0);

    const { state: next, events } = applyAction(state, {
      type: 'MOVE_UNIT',
      unitId: activeUnit.id,
      to: moves[0],
    });

    expect(state).toEqual(snapshot);
    expect(next.units[activeUnit.id].x).toBe(moves[0].x);
    expect(events.some((e) => e.type === 'UNIT_MOVED')).toBe(true);
  });
});

describe('Movement, Terrain, Vision & Traits', () => {
  it('Elves Woodland Grace moves through forests without penalty; Humans stop in forest unless Road', () => {
    const state = createGame(makeConfig({ humanFaction: 'humans' }));
    clearBoardUnits(state);
    // Make a 3-row corridor y=4..6 of plains with a forest wall at x=4
    for (let y = 3; y <= 7; y++) {
      for (let x = 2; x <= 7; x++) {
        const t = getTile(state, x, y)!;
        t.terrain = x === 4 ? 'forest' : 'plains';
        t.hasRoad = false;
      }
    }

    const humanRider = placeTestUnit(state, 'player_humans', 'rider', 3, 5);
    const humanMoves = getValidMoves(state, humanRider.id);
    // Can enter forest at (4,5), but cannot continue to (5,5) because forest stops non-Elves
    expect(humanMoves).toContainEqual({ x: 4, y: 5 });
    expect(humanMoves).not.toContainEqual({ x: 5, y: 5 });

    // Adding a road on the forest lets Humans pass through, and starting on a road gives +1 MOV!
    getTile(state, 4, 5)!.hasRoad = true;
    getTile(state, 3, 5)!.hasRoad = true;
    const roadMoves = getValidMoves(state, humanRider.id);
    expect(roadMoves).toContainEqual({ x: 5, y: 5 });
    expect(roadMoves).toContainEqual({ x: 6, y: 5 }); // +1 MOV from Beacon Network!

    // Elves Rider moves through forest without Road
    getTile(state, 4, 5)!.hasRoad = false;
    getTile(state, 3, 5)!.hasRoad = false;
    clearBoardUnits(state);
    const elfRider = placeTestUnit(state, 'player_elves', 'rider', 3, 5);
    const elfMoves = getValidMoves(state, elfRider.id);
    expect(elfMoves).toContainEqual({ x: 5, y: 5 });
  });

  it('Dwarves traverse Mountains from Turn 1 while Humans cannot', () => {
    const state = createGame(makeConfig({ humanFaction: 'dwarves' }));
    clearBoardUnits(state);
    getTile(state, 5, 5)!.terrain = 'plains';
    getTile(state, 6, 5)!.terrain = 'mountain';

    const dwarf = placeTestUnit(state, 'player_dwarves', 'warrior', 5, 5);
    expect(getValidMoves(state, dwarf.id)).toContainEqual({ x: 6, y: 5 });

    clearBoardUnits(state);
    const human = placeTestUnit(state, 'player_humans', 'warrior', 5, 5);
    expect(getValidMoves(state, human.id)).not.toContainEqual({ x: 6, y: 5 });
  });

  it('Rider Escape and Elven Sentinel Skirmish allow moving after attacking', () => {
    const state = createGame(makeConfig({ humanFaction: 'elves' }));
    clearBoardUnits(state);
    for (let y = 4; y <= 6; y++) {
      for (let x = 3; x <= 7; x++) {
        getTile(state, x, y)!.terrain = 'plains';
      }
    }

    const sentinel = placeTestUnit(state, 'player_elves', 'elven_sentinel', 5, 5, { maxHp: 12 });
    const orc = placeTestUnit(state, 'player_orcs', 'warrior', 7, 5, { maxHp: 10 });

    const res1 = applyAction(state, {
      type: 'ATTACK_UNIT',
      attackerId: sentinel.id,
      defenderId: orc.id,
    });
    const afterAtk = res1.state.units[sentinel.id];
    expect(afterAtk.canEscapeMove).toBe(true);
    expect(afterAtk.actedThisTurn).toBe(false);

    const escapeMoves = getValidMoves(res1.state, sentinel.id);
    expect(escapeMoves).toContainEqual({ x: 3, y: 5 });

    const res2 = applyAction(res1.state, {
      type: 'MOVE_UNIT',
      unitId: sentinel.id,
      to: { x: 3, y: 5 },
    });
    expect(res2.state.units[sentinel.id].actedThisTurn).toBe(true);
    expect(res2.state.units[sentinel.id].canEscapeMove).toBe(false);
  });

  it('Catapult (no dash) cannot attack after moving', () => {
    const state = createGame(makeConfig({ humanFaction: 'humans' }));
    clearBoardUnits(state);
    for (let x = 3; x <= 7; x++) getTile(state, x, 5)!.terrain = 'plains';

    const cat = placeTestUnit(state, 'player_humans', 'catapult', 3, 5, { maxHp: 10 });
    placeTestUnit(state, 'player_orcs', 'warrior', 6, 5, { maxHp: 10 });

    expect(getValidAttackTargets(state, cat.id)).toContainEqual({ x: 6, y: 5 });
    const moved = applyAction(state, { type: 'MOVE_UNIT', unitId: cat.id, to: { x: 4, y: 5 } });
    expect(moved.state.units[cat.id].actedThisTurn).toBe(true);
    expect(getValidAttackTargets(moved.state, cat.id)).toHaveLength(0);
  });
});

describe('Deterministic Combat & Unique Unit / Tech Mechanics', () => {
  it('computes exact Polytopia combat math, City Walls 2.0x, and Siege ignoring walls', () => {
    const state = createGame(makeConfig({ humanFaction: 'humans' }));
    clearBoardUnits(state);
    getTile(state, 5, 5)!.terrain = 'plains';
    getTile(state, 6, 5)!.terrain = 'plains';

    // Warrior (ATK 2, HP 10/10) vs Warrior (DEF 2, HP 10/10) on Plains -> 2/(2+2)*2*4.5 = 4.5 -> round = 5
    const w1 = placeTestUnit(state, 'player_humans', 'warrior', 5, 5, { maxHp: 10 });
    const w2 = placeTestUnit(state, 'player_orcs', 'warrior', 6, 5, { maxHp: 10 });
    const p1 = predictCombat(state, w1.id, w2.id);
    expect(p1.attackerDamage).toBe(5);
    expect(p1.retaliationDamage).toBe(5);
    expect(p1.terrainDefenseBonus).toBe(1.0);

    // Put Orc warrior in walled Orc capital
    const orcCap = getPlayerCities(state, 'player_orcs')[0];
    orcCap.hasWalls = true;
    clearBoardUnits(state);
    const atkPos = { x: orcCap.x + 1, y: orcCap.y };
    getTile(state, atkPos.x, atkPos.y)!.terrain = 'plains';
    const wallDef = placeTestUnit(state, 'player_orcs', 'warrior', orcCap.x, orcCap.y, { maxHp: 10 });
    const humanW = placeTestUnit(state, 'player_humans', 'warrior', atkPos.x, atkPos.y, { maxHp: 10 });
    const wallPreview = predictCombat(state, humanW.id, wallDef.id);
    expect(wallPreview.terrainDefenseBonus).toBe(2.0);

    // Catapult ignores City Walls (Siege)
    clearBoardUnits(state);
    const wallDef2 = placeTestUnit(state, 'player_orcs', 'warrior', orcCap.x, orcCap.y, { maxHp: 10 });
    const cat = placeTestUnit(state, 'player_humans', 'catapult', atkPos.x, atkPos.y, { maxHp: 10 });
    const siegePreview = predictCombat(state, cat.id, wallDef2.id);
    expect(siegePreview.terrainDefenseBonus).toBe(1.5); // Falls back to Fortify 1.5x, not 2.0x Wall
  });

  it('Rohirrim Knight Persist chains kills, but Dwarven Ironbreaker Stalwart blocks Persist and reduces ranged dmg', () => {
    const state = createGame(makeConfig({ humanFaction: 'humans' }));
    clearBoardUnits(state);
    for (let x = 3; x <= 7; x++) getTile(state, x, 5)!.terrain = 'plains';

    const knight = placeTestUnit(state, 'player_humans', 'rohirrim_knight', 4, 5, { maxHp: 15 });
    const weakOrc = placeTestUnit(state, 'player_orcs', 'warrior', 5, 5, { maxHp: 10, hp: 3 });
    const ironbreaker = placeTestUnit(state, 'player_dwarves', 'ironbreaker', 6, 5, {
      maxHp: 20,
      hp: 3,
    });

    // Kill weakOrc -> advances to (5,5) and gets canPersistAttack = true
    const r1 = applyAction(state, {
      type: 'ATTACK_UNIT',
      attackerId: knight.id,
      defenderId: weakOrc.id,
    });
    expect(r1.state.units[weakOrc.id]).toBeUndefined();
    expect(r1.state.units[knight.id].x).toBe(5);
    expect(r1.state.units[knight.id].canPersistAttack).toBe(true);

    // Kill ironbreaker -> Stalwart blocks Persist chain!
    const r2 = applyAction(r1.state, {
      type: 'ATTACK_UNIT',
      attackerId: knight.id,
      defenderId: ironbreaker.id,
    });
    expect(r2.state.units[ironbreaker.id]).toBeUndefined();
    expect(r2.state.units[knight.id].canPersistAttack).toBe(false);
    expect(r2.state.units[knight.id].actedThisTurn).toBe(true);

    // Verify Stalwart -1 ranged damage vs normal unit with same DEF
    const s2 = createGame(makeConfig({ humanFaction: 'elves' }));
    clearBoardUnits(s2);
    getTile(s2, 4, 5)!.terrain = 'plains';
    getTile(s2, 6, 5)!.terrain = 'plains';
    const archer = placeTestUnit(s2, 'player_elves', 'archer', 4, 5, { maxHp: 10 });
    const ib = placeTestUnit(s2, 'player_dwarves', 'ironbreaker', 6, 5, { maxHp: 20 });
    const prev = predictCombat(s2, archer.id, ib.id);
    // Raw: atk=2, def=3.5 => 2/(5.5)*2*4.5 = 3.27 -> round 3, Stalwart -1 = 2
    expect(prev.attackerDamage).toBe(2);
  });

  it('Uruk Berserker Bloodlust ignores HP loss, and Orcs Spoils of War grants +2★ per kill', () => {
    const state = createGame(makeConfig({ humanFaction: 'orcs' }));
    clearBoardUnits(state);
    getTile(state, 5, 5)!.terrain = 'plains';
    getTile(state, 6, 5)!.terrain = 'plains';

    const urukFull = placeTestUnit(state, 'player_orcs', 'uruk_berserker', 5, 5, {
      maxHp: 15,
      hp: 15,
    });
    const target = placeTestUnit(state, 'player_humans', 'warrior', 6, 5, { maxHp: 10, hp: 10 });
    const dmgFull = predictCombat(state, urukFull.id, target.id).attackerDamage;

    urukFull.hp = 1; // 1 HP left!
    const dmgLow = predictCombat(state, urukFull.id, target.id).attackerDamage;
    expect(dmgLow).toBe(dmgFull);

    // Execute kill and verify +2★ Spoils of War
    target.hp = 2;
    const goldBefore = getPlayer(state, 'player_orcs')!.gold;
    const res = applyAction(state, {
      type: 'ATTACK_UNIT',
      attackerId: urukFull.id,
      defenderId: target.id,
    });
    expect(getPlayer(res.state, 'player_orcs')!.gold).toBe(goldBefore + 2);
    expect(res.events.some((e) => e.type === 'SPOILS_GAINED' && e.amount === 2)).toBe(true);
  });

  it('Veteran promotion unlocks at 3 kills and grants +5 maxHP + full heal', () => {
    const state = createGame(makeConfig({ humanFaction: 'humans' }));
    clearBoardUnits(state);
    getTile(state, 5, 5)!.terrain = 'plains';
    getTile(state, 6, 5)!.terrain = 'plains';

    const w = placeTestUnit(state, 'player_humans', 'warrior', 5, 5, {
      maxHp: 10,
      hp: 4,
      kills: 2,
    });
    const e = placeTestUnit(state, 'player_orcs', 'warrior', 6, 5, { maxHp: 10, hp: 1 });

    const r1 = applyAction(state, { type: 'ATTACK_UNIT', attackerId: w.id, defenderId: e.id });
    expect(r1.state.units[w.id].kills).toBe(3);
    expect(r1.state.units[w.id].canPromote).toBe(true);

    const r2 = applyAction(r1.state, { type: 'PROMOTE_UNIT', unitId: w.id });
    expect(r2.state.units[w.id].isVeteran).toBe(true);
    expect(r2.state.units[w.id].maxHp).toBe(15);
    expect(r2.state.units[w.id].hp).toBe(15);
    expect(r2.events.some((ev) => ev.type === 'UNIT_PROMOTED')).toBe(true);
  });

  it('Recover heals +4 in friendly borders and +2 outside', () => {
    const state = createGame(makeConfig({ humanFaction: 'humans' }));
    const cap = getPlayerCities(state, 'player_humans')[0];
    clearBoardUnits(state);

    const inside = placeTestUnit(state, 'player_humans', 'warrior', cap.x, cap.y, {
      maxHp: 10,
      hp: 4,
    });
    const r1 = applyAction(state, { type: 'RECOVER_UNIT', unitId: inside.id });
    expect(r1.state.units[inside.id].hp).toBe(8);

    // Outside borders
    const outsideTile = state.tiles.find(
      (t) => t.cityId === null && t.terrain !== 'water' && t.terrain !== 'mountain',
    )!;
    const outside = placeTestUnit(state, 'player_humans', 'warrior', outsideTile.x, outsideTile.y, {
      maxHp: 10,
      hp: 4,
    });
    const r2 = applyAction(state, { type: 'RECOVER_UNIT', unitId: outside.id });
    expect(r2.state.units[outside.id].hp).toBe(6);
  });
});

describe('Economy, Tech Tree, Faction Mechanics & City Leveling', () => {
  it('Elves Woodland Grace grants +1★/turn per untouched Ancient Woods (capped at +3★/city)', () => {
    const state = createGame(makeConfig({ humanFaction: 'elves' }));
    const elfCap = getPlayerCities(state, 'player_elves')[0];
    const borderTiles = state.tiles.filter((t) => t.cityId === elfCap.id && !t.isCityCenter);

    // Set 5 tiles to untouched ancient_woods -> should cap at +3★
    for (let i = 0; i < 5; i++) {
      borderTiles[i].terrain = 'ancient_woods';
      borderTiles[i].improvement = null;
    }
    // Capital (1) + Lv1 (1) + capped Woodland Grace (3) = 5★
    expect(calculatePlayerIncome(state, 'player_elves')).toBe(5);
  });

  it('Dwarves Mining, Stone Walls, Shieldbearers, and Siegecraft work', () => {
    const state = createGame(makeConfig({ humanFaction: 'dwarves' }));
    const player = getPlayer(state, 'player_dwarves')!;
    const cap = getPlayerCities(state, 'player_dwarves')[0];
    player.gold = 60;

    // Reach Age II (3 techs) via Tier 1 Shieldbearers & Ram Riders before Tier 2 Mining
    const rPre1 = applyAction(state, { type: 'RESEARCH_TECH', techId: 'dwarves_shieldbearers' });
    const rPre2 = applyAction(rPre1.state, { type: 'RESEARCH_TECH', techId: 'dwarves_ram_riders' });

    // Research Mountain Mining (Tier 2) -> unlocks Mine on Mountain
    const r0 = applyAction(rPre2.state, { type: 'RESEARCH_TECH', techId: 'dwarves_mining' });

    // Build Mine on a mountain in borders -> +2 Pop (levels city to Lv 2!) and +1★/turn
    const mtn = r0.state.tiles.find(
      (t) => t.cityId === cap.id && t.terrain === 'mountain' && !t.isCityCenter,
    )!;
    const incomeBefore = calculatePlayerIncome(r0.state, player.id);

    const r1 = applyAction(r0.state, {
      type: 'BUILD_IMPROVEMENT',
      coord: { x: mtn.x, y: mtn.y },
      improvement: 'mine',
    });
    expect(r1.state.cities[cap.id].level).toBe(2);
    expect(r1.state.cities[cap.id].pendingLevelRewards).toEqual([2]);
    // Income increased by +1 (Lv2) +1 (Mine) = +2
    expect(calculatePlayerIncome(r1.state, player.id)).toBe(incomeBefore + 2);

    // Research Mountain Foraging -> Stone Walls -> Lv 2+ cities gain free City Walls
    const r2a = applyAction(r1.state, { type: 'RESEARCH_TECH', techId: 'dwarves_foraging' });
    const r2 = applyAction(r2a.state, { type: 'RESEARCH_TECH', techId: 'dwarves_stone_walls' });
    expect(r2.state.cities[cap.id].hasWalls).toBe(true);

    // Shieldbearers already researched -> Defender has 17 maxHP
    clearBoardUnits(r2.state);
    const r4 = applyAction(r2.state, {
      type: 'TRAIN_UNIT',
      cityId: cap.id,
      unitType: 'defender',
    });
    const defUnit = Object.values(r4.state.units)[0];
    expect(defUnit.maxHp).toBe(17);

    // Research Dwarven Siegecraft -> Catapult has 15 HP
    const r6 = applyAction(r4.state, { type: 'RESEARCH_TECH', techId: 'dwarves_siegecraft' });
    clearBoardUnits(r6.state);
    const r7 = applyAction(r6.state, {
      type: 'TRAIN_UNIT',
      cityId: cap.id,
      unitType: 'catapult',
    });
    const catUnit = Object.values(r7.state.units)[0];
    expect(catUnit.maxHp).toBe(15);
  });

  it('Orcs Clear-Cutting chops forest for +2★, Siege Works discounts Catapult to 6★, War Barracks adds +1 Unit Cap', () => {
    const state = createGame(makeConfig({ humanFaction: 'orcs' }));
    const player = getPlayer(state, 'player_orcs')!;
    const cap = getPlayerCities(state, 'player_orcs')[0];
    player.gold = 50;

    expect(getCityUnitCap(state, cap)).toBe(2); // Lv 1 + 1 = 2

    const r1 = applyAction(state, { type: 'RESEARCH_TECH', techId: 'orcs_clear_cutting' });
    const forestTile = r1.state.tiles.find(
      (t) => t.cityId === cap.id && t.terrain === 'forest' && !t.isCityCenter,
    )!;
    const goldBeforeChop = getPlayer(r1.state, player.id)!.gold;
    const r2 = applyAction(r1.state, {
      type: 'CHOP_FOREST',
      coord: { x: forestTile.x, y: forestTile.y },
    });
    expect(getPlayer(r2.state, player.id)!.gold).toBe(goldBeforeChop + 2);
    expect(getTile(r2.state, forestTile.x, forestTile.y)!.terrain).toBe('plains');

    // Research Tier 1 Shield Wall to reach Age II (3 techs) before Tier 2 Siege Works & War Barracks
    const r3 = applyAction(r2.state, { type: 'RESEARCH_TECH', techId: 'orcs_shield_wall' });
    const r4 = applyAction(r3.state, { type: 'RESEARCH_TECH', techId: 'orcs_siege_works' });
    expect(getUnitCost(r4.state, player.id, 'catapult')).toBe(6);

    const r5 = applyAction(r4.state, { type: 'RESEARCH_TECH', techId: 'orcs_war_barracks' });
    expect(getCityUnitCap(r5.state, r5.state.cities[cap.id])).toBe(3);
  });

  it('Elves Elven Lore reduces tech cost by 1★ (min 2★) and Tree-Singing plants Ancient Woods', () => {
    const state = createGame(makeConfig({ humanFaction: 'elves' }));
    const player = getPlayer(state, 'player_elves')!;
    player.gold = 40;

    expect(getTechCost(state, player.id, 'elves_elven_steeds')).toBe(3);
    expect(canResearchTech(state, player.id, 'elves_high_paths')).toBe(true);

    // Reach Age II (3 techs) via Tier 1 Woodland Aim & High Paths before Tier 2 Elven Lore & Tree-Singing
    const rPre = applyAction(state, { type: 'RESEARCH_TECH', techId: 'elves_woodland_aim' });
    const r0 = applyAction(rPre.state, { type: 'RESEARCH_TECH', techId: 'elves_high_paths' });
    const r1 = applyAction(r0.state, { type: 'RESEARCH_TECH', techId: 'elves_elven_lore' });
    expect(getTechCost(r1.state, player.id, 'elves_elven_steeds')).toBe(2);
    expect(getTechCost(r1.state, player.id, 'elves_mallorn_siege')).toBe(4);
    expect(getTechCost(r1.state, player.id, 'elves_rings_preservation')).toBe(7);

    const r2 = applyAction(r1.state, { type: 'RESEARCH_TECH', techId: 'elves_tree_singing' });
    const cap = getPlayerCities(r2.state, player.id)[0];
    const plain = r2.state.tiles.find(
      (t) =>
        t.cityId === cap.id &&
        !t.isCityCenter &&
        t.terrain === 'plains' &&
        t.resource === null &&
        t.improvement === null,
    )!;
    const actions = getAvailableTileActions(r2.state, player.id, plain.x, plain.y);
    expect(actions.some((a) => a.type === 'PLANT_ANCIENT_WOODS')).toBe(true);

    const r3 = applyAction(r2.state, {
      type: 'PLANT_ANCIENT_WOODS',
      coord: { x: plain.x, y: plain.y },
    });
    expect(getTile(r3.state, plain.x, plain.y)!.terrain).toBe('ancient_woods');
  });

  it('City rewards (Workshop, Explorer, Wall, Resources, Border Growth, Champion, Park) apply accurately', () => {
    const state = createGame(makeConfig({ humanFaction: 'humans' }));
    const cap = getPlayerCities(state, 'player_humans')[0];
    cap.level = 5;
    cap.pendingLevelRewards = [2, 3, 4, 5];
    clearBoardUnits(state);

    // Lv 2: Workshop
    const r1 = applyAction(state, {
      type: 'CHOOSE_CITY_REWARD',
      cityId: cap.id,
      reward: 'workshop',
    });
    expect(r1.state.cities[cap.id].hasWorkshop).toBe(true);

    // Lv 3: Resources (+5★)
    const goldBefore = getPlayer(r1.state, 'player_humans')!.gold;
    const r2 = applyAction(r1.state, {
      type: 'CHOOSE_CITY_REWARD',
      cityId: cap.id,
      reward: 'resources',
    });
    expect(getPlayer(r2.state, 'player_humans')!.gold).toBe(goldBefore + 5);

    // Lv 4: Border Growth (3x3 -> 5x5)
    const borderBefore = r2.state.tiles.filter((t) => t.cityId === cap.id).length;
    const r3 = applyAction(r2.state, {
      type: 'CHOOSE_CITY_REWARD',
      cityId: cap.id,
      reward: 'border_growth',
    });
    expect(r3.state.cities[cap.id].borderRadius).toBe(2);
    expect(r3.state.tiles.filter((t) => t.cityId === cap.id).length).toBeGreaterThan(borderBefore);

    // Lv 5: Champion (free Veteran Rohirrim Knight with 15 + 5 = 20 maxHP)
    const r4 = applyAction(r3.state, {
      type: 'CHOOSE_CITY_REWARD',
      cityId: cap.id,
      reward: 'champion',
    });
    const champ = Object.values(r4.state.units)[0];
    expect(champ.type).toBe('rohirrim_knight');
    expect(champ.isVeteran).toBe(true);
    expect(champ.maxHp).toBe(20);
    expect(champ.homeCityId).toBeNull();
  });

  it('Ancient Ruins require explicit next-turn EXPLORE_RUINS and Humans Ranger Hunting adds +2★ bonus', () => {
    let state = createGame(makeConfig({ humanFaction: 'humans' }));
    const player = getPlayer(state, 'player_humans')!;
    player.techs.push('humans_hunting');
    clearBoardUnits(state);

    getTile(state, 5, 5)!.terrain = 'plains';
    const ruinTile = getTile(state, 6, 5)!;
    ruinTile.terrain = 'plains';
    ruinTile.resource = 'ruins';
    ruinTile.hasVillage = false;

    const u = placeTestUnit(state, 'player_humans', 'warrior', 5, 5);
    const moveRes = applyAction(state, { type: 'MOVE_UNIT', unitId: u.id, to: { x: 6, y: 5 } });
    state = moveRes.state;

    // Arrival turn: ruins are NOT auto-claimed!
    expect(getTile(state, 6, 5)!.resource).toBe('ruins');
    expect(moveRes.events.some((e) => e.type === 'RUINS_CLAIMED')).toBe(false);
    expect(state.units[u.id].canExploreRuins).toBe(false);
    expect(canUnitExploreRuins(state, u.id)).toBe(false);

    const turn1Opts = getUnitActionOptions(state, u.id);
    expect(turn1Opts[0]).toMatchObject({
      id: 'explore-ruins',
      label: 'Explore Ruins',
      description: 'Claim ancient treasure',
      icon: 'ruins',
      enabled: false,
      disabledReason: 'Explore next turn',
    });

    // Attempting EXPLORE_RUINS on arrival turn is a no-op
    const illegalExplore = applyAction(state, { type: 'EXPLORE_RUINS', unitId: u.id });
    expect(illegalExplore.events).toHaveLength(0);
    expect(getTile(illegalExplore.state, 6, 5)!.resource).toBe('ruins');

    // End 4 turns back to Humans Turn 2 -> still NOT auto-claimed, sets canExploreRuins = true
    let autoClaimed = false;
    for (let i = 0; i < 4; i++) {
      const endRes = applyAction(state, { type: 'END_TURN' });
      state = endRes.state;
      if (endRes.events.some((e) => e.type === 'RUINS_CLAIMED')) autoClaimed = true;
    }
    expect(autoClaimed).toBe(false);
    expect(getTile(state, 6, 5)!.resource).toBe('ruins');
    expect(state.units[u.id].canExploreRuins).toBe(true);
    expect(canUnitExploreRuins(state, u.id)).toBe(true);

    const turn2Opts = getUnitActionOptions(state, u.id);
    expect(turn2Opts[0]).toMatchObject({
      id: 'explore-ruins',
      label: 'Explore Ruins',
      description: 'Claim ancient treasure',
      icon: 'ruins',
      enabled: true,
      action: { type: 'EXPLORE_RUINS', unitId: u.id },
    });

    // Execute explicit EXPLORE_RUINS
    const goldBefore = getPlayer(state, 'player_humans')!.gold;
    const exploreRes = applyAction(state, { type: 'EXPLORE_RUINS', unitId: u.id });
    state = exploreRes.state;

    expect(getTile(state, 6, 5)!.resource).toBeNull();
    const ruinEvent = exploreRes.events.find((e) => e.type === 'RUINS_CLAIMED');
    expect(ruinEvent).toBeDefined();
    if (ruinEvent && ruinEvent.type === 'RUINS_CLAIMED' && ruinEvent.rewardKind === 'tech') {
      expect(
        exploreRes.events.some(
          (e) => e.type === 'TECH_RESEARCHED' && e.techId === ruinEvent.techId && e.cost === 0,
        ),
      ).toBe(true);
    }
    // At least +2★ from Humans Riding bonus (+7★ if gold reward rolled)
    expect(getPlayer(state, 'player_humans')!.gold).toBeGreaterThanOrEqual(goldBefore + 2);

    // Consumes unit turn
    const afterUnit = state.units[u.id];
    expect(afterUnit.hasMoved).toBe(true);
    expect(afterUnit.hasAttacked).toBe(true);
    expect(afterUnit.actedThisTurn).toBe(true);
    expect(afterUnit.canExploreRuins).toBe(false);
    expect(canUnitExploreRuins(state, u.id)).toBe(false);
  });

  it('melee kill advance onto Ancient Ruins does NOT auto-claim them on arrival turn', () => {
    let state = createGame(makeConfig({ humanFaction: 'humans' }));
    clearBoardUnits(state);

    getTile(state, 5, 5)!.terrain = 'plains';
    const ruinTile = getTile(state, 6, 5)!;
    ruinTile.terrain = 'plains';
    ruinTile.resource = 'ruins';
    ruinTile.hasVillage = false;

    const attacker = placeTestUnit(state, 'player_humans', 'warrior', 5, 5);
    const defender = placeTestUnit(state, 'player_orcs', 'warrior', 6, 5, { hp: 1 });

    const atkRes = applyAction(state, {
      type: 'ATTACK_UNIT',
      attackerId: attacker.id,
      defenderId: defender.id,
    });
    state = atkRes.state;

    expect(state.units[attacker.id].x).toBe(6);
    expect(state.units[attacker.id].y).toBe(5);
    expect(getTile(state, 6, 5)!.resource).toBe('ruins');
    expect(atkRes.events.some((e) => e.type === 'RUINS_CLAIMED')).toBe(false);
    expect(state.units[attacker.id].canExploreRuins).toBe(false);

    // Advance to next Humans turn -> ready to explore
    for (let i = 0; i < 4; i++) {
      state = applyAction(state, { type: 'END_TURN' }).state;
    }
    expect(state.units[attacker.id].canExploreRuins).toBe(true);
    expect(canUnitExploreRuins(state, attacker.id)).toBe(true);
  });

  it('getTrainableUnits reflects researched techs', () => {
    const state = createGame(makeConfig({ humanFaction: 'humans' }));
    const cap = getPlayerCities(state, 'player_humans')[0];
    expect(getTrainableUnits(state, cap.id)).toEqual(['warrior']);

    getPlayer(state, 'player_humans')!.gold = 30;
    const r1 = applyAction(state, { type: 'RESEARCH_TECH', techId: 'humans_riding' });
    expect(getTrainableUnits(r1.state, cap.id)).toEqual(['warrior', 'rider']);
  });
});

describe('Captures, Elimination & Win Conditions', () => {
  it('requires explicit next-turn CAPTURE_CITY to claim a neutral village and grants Orcs +4★ Spoils of War', () => {
    let state = createGame(makeConfig({ humanFaction: 'orcs' }));
    const village = state.tiles.find((t) => t.hasVillage)!;
    clearBoardUnits(state);

    // Find an adjacent tile and make it passable plains so the warrior moves onto the village on Turn 1
    const adjTile = state.tiles.find(
      (t) =>
        Math.max(Math.abs(t.x - village.x), Math.abs(t.y - village.y)) === 1 &&
        !t.isCityCenter,
    )!;
    adjTile.terrain = 'plains';
    village.terrain = 'plains';

    const unit = placeTestUnit(state, 'player_orcs', 'warrior', adjTile.x, adjTile.y);
    const moveRes = applyAction(state, {
      type: 'MOVE_UNIT',
      unitId: unit.id,
      to: { x: village.x, y: village.y },
    });
    state = moveRes.state;

    // On Turn 1 right after moving onto the village: cannot capture yet!
    expect(state.units[unit.id].canCapture).toBe(false);
    expect(canUnitCapture(state, unit.id)).toBe(false);
    const turn1Opts = getUnitActionOptions(state, unit.id);
    expect(turn1Opts[0]).toMatchObject({
      id: 'capture-city',
      label: 'Claim Village',
      icon: 'crown',
      enabled: false,
      disabledReason: 'Capture next turn',
    });

    // Attempting CAPTURE_CITY on Turn 1 is a no-op
    const illegalCap = applyAction(state, { type: 'CAPTURE_CITY', unitId: unit.id });
    expect(illegalCap.events).toHaveLength(0);
    expect(getTile(illegalCap.state, village.x, village.y)!.hasVillage).toBe(true);

    // End all 4 turns to return to Orcs Turn 2 -> NO auto-capture, sets canCapture = true!
    let autoCaptured = false;
    for (let i = 0; i < 4; i++) {
      const res = applyAction(state, { type: 'END_TURN' });
      state = res.state;
      if (res.events.some((e) => e.type === 'CITY_CAPTURED')) {
        autoCaptured = true;
      }
    }

    expect(autoCaptured).toBe(false);
    expect(getPlayerCities(state, 'player_orcs')).toHaveLength(1);
    expect(getTile(state, village.x, village.y)!.hasVillage).toBe(true);
    expect(state.units[unit.id].canCapture).toBe(true);
    expect(canUnitCapture(state, unit.id)).toBe(true);

    const turn2Opts = getUnitActionOptions(state, unit.id);
    expect(turn2Opts[0]).toMatchObject({
      id: 'capture-city',
      label: 'Claim Village',
      icon: 'crown',
      enabled: true,
      action: { type: 'CAPTURE_CITY', unitId: unit.id },
    });

    // Now execute explicit CAPTURE_CITY
    const goldBeforeCapture = getPlayer(state, 'player_orcs')!.gold;
    const capRes = applyAction(state, { type: 'CAPTURE_CITY', unitId: unit.id });
    state = capRes.state;

    expect(
      capRes.events.some(
        (e) => e.type === 'CITY_CAPTURED' && e.wasVillage && e.spoilsGold === 4,
      ),
    ).toBe(true);
    expect(getPlayerCities(state, 'player_orcs')).toHaveLength(2);
    expect(getTile(state, village.x, village.y)!.hasVillage).toBe(false);
    expect(getTile(state, village.x, village.y)!.isCityCenter).toBe(true);
    expect(getPlayer(state, 'player_orcs')!.gold).toBe(goldBeforeCapture + 4);

    // Capturing consumes the unit's turn
    const afterUnit = state.units[unit.id];
    expect(afterUnit.hasMoved).toBe(true);
    expect(afterUnit.hasAttacked).toBe(true);
    expect(afterUnit.actedThisTurn).toBe(true);
    expect(afterUnit.canCapture).toBe(false);
    expect(canUnitCapture(state, unit.id)).toBe(false);
  });

  it('triggers Domination victory on explicit next-turn CAPTURE_CITY of the last enemy capital', () => {
    let state = createGame(makeConfig({ humanFaction: 'humans' }));
    clearBoardUnits(state);

    // Give Humans control of 3 capitals, leave 1 enemy capital with a Human unit standing on it
    const capitals = Object.values(state.cities).filter((c) => c.isCapital);
    const enemyCap = capitals.find((c) => c.ownerId !== 'player_humans')!;
    for (const c of capitals) {
      if (c.id !== enemyCap.id) {
        c.ownerId = 'player_humans';
      }
    }
    for (const p of state.players) {
      if (p.id !== 'player_humans' && p.id !== enemyCap.ownerId) {
        p.alive = false;
      }
    }

    const unit = placeTestUnit(state, 'player_humans', 'warrior', enemyCap.x, enemyCap.y);

    // End Humans turn -> enemy turn -> back to Humans Turn 2 (sets canCapture = true, no auto-capture)
    const r1 = applyAction(state, { type: 'END_TURN' });
    const r2 = applyAction(r1.state, { type: 'END_TURN' });

    expect(r2.state.phase).toBe('playing');
    expect(r2.state.units[unit.id].canCapture).toBe(true);
    expect(canUnitCapture(r2.state, unit.id)).toBe(true);
    expect(getUnitActionOptions(r2.state, unit.id)[0]).toMatchObject({
      id: 'capture-city',
      label: 'Capture City',
      icon: 'crown',
      enabled: true,
      action: { type: 'CAPTURE_CITY', unitId: unit.id },
    });

    // Explicitly capture the final capital -> Domination Victory!
    const r3 = applyAction(r2.state, { type: 'CAPTURE_CITY', unitId: unit.id });
    expect(r3.state.phase).toBe('game_over');
    expect(r3.state.winnerId).toBe('player_humans');
    expect(r3.state.winReason).toBe('domination');
    expect(r3.events.some((e) => e.type === 'CITY_CAPTURED' && !e.wasVillage)).toBe(true);
    expect(
      r3.events.some(
        (e) =>
          e.type === 'PLAYER_ELIMINATED' &&
          e.playerId === enemyCap.ownerId &&
          e.eliminatedByPlayerId === 'player_humans',
      ),
    ).toBe(true);
    expect(r3.events.some((e) => e.type === 'GAME_OVER' && e.reason === 'domination')).toBe(true);
  });

  it('emits PLAYER_ELIMINATED with accurate eliminatedByPlayerId on mid-game elimination', () => {
    let state = createGame(makeConfig({ humanFaction: 'orcs' }));
    clearBoardUnits(state);

    // Orcs stand on Dwarves' only city (capital) while Humans & Elves remain alive
    const dwarfCap = getPlayerCities(state, 'player_dwarves')[0];
    const orcUnit = placeTestUnit(state, 'player_orcs', 'warrior', dwarfCap.x, dwarfCap.y);

    // Cycle turns back to Orcs so canCapture = true
    for (let i = 0; i < 4; i++) {
      state = applyAction(state, { type: 'END_TURN' }).state;
    }
    expect(canUnitCapture(state, orcUnit.id)).toBe(true);

    const res = applyAction(state, { type: 'CAPTURE_CITY', unitId: orcUnit.id });
    expect(res.state.phase).toBe('playing');
    expect(getPlayer(res.state, 'player_dwarves')!.alive).toBe(false);
    const elimEvent = res.events.find((e) => e.type === 'PLAYER_ELIMINATED');
    expect(elimEvent).toEqual({
      type: 'PLAYER_ELIMINATED',
      playerId: 'player_dwarves',
      eliminatedByPlayerId: 'player_orcs',
    });
  });

  it('clears canCapture on melee advance onto city and on moving off a capturable tile, but preserves across turns if staying', () => {
    let state = createGame(makeConfig({ humanFaction: 'humans' }));
    clearBoardUnits(state);

    const enemyCap = Object.values(state.cities).find(
      (c) => c.isCapital && c.ownerId !== 'player_humans',
    )!;
    const adjTile = state.tiles.find(
      (t) => Math.max(Math.abs(t.x - enemyCap.x), Math.abs(t.y - enemyCap.y)) === 1,
    )!;
    adjTile.terrain = 'plains';

    const attacker = placeTestUnit(state, 'player_humans', 'warrior', adjTile.x, adjTile.y, {
      maxHp: 10,
      hp: 10,
    });
    const defender = placeTestUnit(state, enemyCap.ownerId, 'warrior', enemyCap.x, enemyCap.y, {
      maxHp: 10,
      hp: 1,
    });

    // Kill defender and advance onto enemy capital -> canCapture must remain false on Turn 1
    const atkRes = applyAction(state, {
      type: 'ATTACK_UNIT',
      attackerId: attacker.id,
      defenderId: defender.id,
    });
    state = atkRes.state;
    expect(state.units[attacker.id].x).toBe(enemyCap.x);
    expect(state.units[attacker.id].y).toBe(enemyCap.y);
    expect(state.units[attacker.id].canCapture).toBe(false);

    // Advance to Humans Turn 2 -> canCapture becomes true
    for (let i = 0; i < 4; i++) {
      state = applyAction(state, { type: 'END_TURN' }).state;
    }
    expect(state.units[attacker.id].canCapture).toBe(true);

    // Branch A: Moving off resets canCapture to false
    const movedOff = applyAction(state, {
      type: 'MOVE_UNIT',
      unitId: attacker.id,
      to: { x: adjTile.x, y: adjTile.y },
    });
    expect(movedOff.state.units[attacker.id].canCapture).toBe(false);
    expect(canUnitCapture(movedOff.state, attacker.id)).toBe(false);

    // Branch B: Staying without capturing keeps canCapture = true on Turn 3
    let stayed = state;
    for (let i = 0; i < 4; i++) {
      stayed = applyAction(stayed, { type: 'END_TURN' }).state;
    }
    expect(stayed.units[attacker.id].canCapture).toBe(true);
    expect(canUnitCapture(stayed, attacker.id)).toBe(true);
  });

  it('triggers Glory victory after Turn 30 with highest score winning', () => {
    let state = createGame(makeConfig({ humanFaction: 'elves', maxTurns: 30 }));
    state.turn = 30;
    state.activePlayerIndex = 3; // Last player on Turn 30

    // Give Elves a Park (+250 Glory) so Elves clearly lead in score
    const elfCap = getPlayerCities(state, 'player_elves')[0];
    elfCap.parks = 2;
    const expectedElfScore = calculatePlayerScore(state, 'player_elves');

    const res = applyAction(state, { type: 'END_TURN' });
    expect(res.state.phase).toBe('game_over');
    expect(res.state.winReason).toBe('glory');
    expect(res.state.winnerId).toBe('player_elves');

    const overEvent = res.events.find((e) => e.type === 'GAME_OVER');
    expect(overEvent).toBeDefined();
    if (overEvent && overEvent.type === 'GAME_OVER') {
      expect(overEvent.scores['player_elves']).toBe(expectedElfScore);
    }
  });

  it('plays indefinitely with no turn limit when maxTurns is 0', () => {
    const state = createGame(makeConfig({ maxTurns: 0 }));
    state.turn = 30;
    state.activePlayerIndex = state.players.length - 1;

    const res = applyAction(state, { type: 'END_TURN' });
    expect(res.state.turn).toBe(31);
    expect(res.state.phase).toBe('playing');
    expect(res.state.winnerId).toBeNull();
  });
});

describe('4-Pillar Atomic Branching Tech Tree & Capstone Mechanics', () => {
  it('defines 64 techs total (16 per faction: 4 pillars x 4 branching slots) with correct pricing & Glory', () => {
    expect(Object.keys(TECH_DEFINITIONS)).toHaveLength(64);
    for (const faction of ALL_FACTIONS) {
      const techs = getFactionTechs(faction);
      expect(techs).toHaveLength(16);
      for (const pillarIdx of [0, 1, 2, 3] as const) {
        const pillarTechs = techs.filter((t) => t.pillarIndex === pillarIdx);
        expect(pillarTechs).toHaveLength(4);
        expect(pillarTechs.map((t) => t.slot)).toEqual(['root', 'a', 'b', 'capstone']);
        expect(pillarTechs.map((t) => t.tier)).toEqual([1, 2, 2, 3]);
        expect(pillarTechs[0].prerequisites).toEqual([]);
        expect(pillarTechs[1].prerequisites).toEqual([pillarTechs[0].id]);
        expect(pillarTechs[2].prerequisites).toEqual([pillarTechs[0].id]);
        expect(pillarTechs[3].prerequisites.length).toBeGreaterThanOrEqual(1);
        for (const prereq of pillarTechs[3].prerequisites) {
          expect([pillarTechs[1].id, pillarTechs[2].id]).toContain(prereq);
        }
        for (const tech of pillarTechs) {
          expect(tech.iconKey.length).toBeGreaterThan(0);
          expect(tech.pillar.length).toBeGreaterThan(0);
        }
      }
    }

    const state = createGame(makeConfig({ humanFaction: 'humans' }));
    const player = getPlayer(state, 'player_humans')!;
    expect(getTechCost(state, player.id, 'humans_riding')).toBe(3);
    expect(getTechCost(state, player.id, 'humans_chivalry')).toBe(5);
    expect(getTechCost(state, player.id, 'humans_ride_of_rohirrim')).toBe(8);

    const baseScore = calculatePlayerScore(state, player.id);
    player.techs.push('humans_riding'); // +100
    expect(calculatePlayerScore(state, player.id)).toBe(baseScore + 100);
    player.techs.push('humans_chivalry'); // +200
    expect(calculatePlayerScore(state, player.id)).toBe(baseScore + 300);
    player.techs.push('humans_ride_of_rohirrim'); // +350
    expect(calculatePlayerScore(state, player.id)).toBe(baseScore + 650);
  });

  it('Humans atomic pillars & capstones: Granaries, Windmills, Stewards Citadel, Plains Charge, Ride of the Rohirrim, Gondor Siegecraft', () => {
    const state = createGame(makeConfig({ humanFaction: 'humans' }));
    const player = getPlayer(state, 'player_humans')!;
    const cap = getPlayerCities(state, 'player_humans')[0];
    player.gold = 100;
    cap.hasWalls = true;
    cap.level = 3;

    const incomeBefore = calculatePlayerIncome(state, player.id);
    const capBefore = getCityUnitCap(state, cap);

    // Royal Granaries (Lv3+): +1★/turn & +1 Unit Cap
    player.techs.push('humans_granaries');
    expect(calculatePlayerIncome(state, player.id)).toBe(incomeBefore + 1);
    expect(getCityUnitCap(state, cap)).toBe(capBefore + 1);

    // Citadel Masonry (+1★/walled city) & Stewards' Citadel (+1★/city & +1 Unit Cap)
    player.techs.push('humans_roads', 'humans_citadel_masonry', 'humans_stewards_citadel');
    expect(calculatePlayerIncome(state, player.id)).toBe(incomeBefore + 3);
    expect(getCityUnitCap(state, cap)).toBe(capBefore + 2);

    // Windmills (T3): +1★/turn per adjacent Farm
    clearBoardUnits(state);
    const borderTiles = state.tiles.filter((t) => t.cityId === cap.id && !t.isCityCenter);
    borderTiles[0].terrain = 'plains';
    borderTiles[0].improvement = 'farm';
    const adjTile = state.tiles.find(
      (t) =>
        t.cityId === cap.id &&
        !t.isCityCenter &&
        t !== borderTiles[0] &&
        Math.max(Math.abs(t.x - borderTiles[0].x), Math.abs(t.y - borderTiles[0].y)) === 1,
    )!;
    adjTile.terrain = 'plains';
    adjTile.improvement = 'windmill';

    const incBeforeMill = calculatePlayerIncome(state, player.id);
    player.techs.push('humans_farming', 'humans_milling');
    expect(calculatePlayerIncome(state, player.id)).toBe(incBeforeMill + 1);

    // Gondor Siegecraft (T3): Catapult +0.5 ATK
    player.techs.push('humans_hunting', 'humans_archery', 'humans_siegecraft');
    const catapult = placeTestUnit(state, player.id, 'catapult', cap.x, cap.y);
    expect(getEffectiveAttack(state, catapult)).toBe(4.5);

    // Plains Charge (+0.5 ATK on Plains) & Ride of the Rohirrim (+1 MOV & +3 maxHP)
    player.techs.push('humans_riding', 'humans_plains_charge', 'humans_chivalry', 'humans_ride_of_rohirrim');
    expect(getUnitTrainMaxHp(state, player.id, 'rohirrim_knight')).toBe(18);
    expect(getUnitTrainMaxHp(state, player.id, 'rider')).toBe(13);

    clearBoardUnits(state);
    for (let x = 2; x <= 8; x++) {
      const t = getTile(state, x, 5)!;
      t.terrain = 'plains';
      t.hasRoad = false;
    }
    const rider = placeTestUnit(state, player.id, 'rider', 3, 5);
    expect(getEffectiveAttack(state, rider)).toBe(2.5);
    // Base 2 MOV + 1 MOV from Ride of the Rohirrim = 3 MOV -> reaches x=6
    expect(getValidMoves(state, rider.id)).toContainEqual({ x: 6, y: 5 });
  });

  it('Orcs atomic pillars & capstones: Spoils Mastery, Pack Tactics, Mount Doom Furnaces, Black Gate Horde, Fell Volley', () => {
    const state = createGame(makeConfig({ humanFaction: 'orcs' }));
    const player = getPlayer(state, 'player_orcs')!;
    const cap = getPlayerCities(state, 'player_orcs')[0];
    clearBoardUnits(state);

    // Mount Doom Furnaces: Foundries +1★/turn; Catapults +1 ATK
    const borderTile = state.tiles.find((t) => t.cityId === cap.id && !t.isCityCenter)!;
    borderTile.terrain = 'wasteland';
    borderTile.improvement = 'foundry';
    const incBefore = calculatePlayerIncome(state, player.id);
    player.techs.push('orcs_clear_cutting', 'orcs_dark_forges', 'orcs_mount_doom');
    expect(calculatePlayerIncome(state, player.id)).toBe(incBefore + 1);
    const cat = placeTestUnit(state, player.id, 'catapult', 4, 5);
    expect(getEffectiveAttack(state, cat)).toBe(5);

    // Pack Tactics: Warg Riders +0.5 ATK & +3 maxHP
    player.techs.push('orcs_warg_riders', 'orcs_pack_tactics');
    expect(getUnitTrainMaxHp(state, player.id, 'rider')).toBe(13);
    const warg = placeTestUnit(state, player.id, 'rider', 5, 5);
    expect(getEffectiveAttack(state, warg)).toBe(2.5);

    // Fell Volley: Archers gain +1 RNG (3); Spoils Mastery: +3★/kill
    player.techs.push('orcs_spoils_mastery', 'orcs_snaga_archers', 'orcs_black_arrows', 'orcs_fell_volley');
    clearBoardUnits(state);
    for (let x = 3; x <= 7; x++) getTile(state, x, 5)!.terrain = 'plains';
    const archer = placeTestUnit(state, player.id, 'archer', 3, 5);
    const victim = placeTestUnit(state, 'player_humans', 'warrior', 6, 5, { hp: 1 });
    expect(getUnitRange(state, archer)).toBe(3);
    expect(getValidAttackTargets(state, archer.id)).toContainEqual({ x: 6, y: 5 });

    const goldBefore = player.gold;
    const atkRes = applyAction(state, {
      type: 'ATTACK_UNIT',
      attackerId: archer.id,
      defenderId: victim.id,
    });
    expect(getPlayer(atkRes.state, player.id)!.gold).toBe(goldBefore + 3);

    // Black Gate Horde: Berserkers cost 4★ & +3 maxHP
    player.techs.push('orcs_shield_wall', 'orcs_uruk_breeding', 'orcs_black_gate');
    expect(getUnitCost(state, player.id, 'uruk_berserker')).toBe(4);
    expect(getUnitTrainMaxHp(state, player.id, 'uruk_berserker')).toBe(18);
  });

  it('Elves atomic pillars & capstones: Lothlorien Sanctum, Woodland Aim, Galadhrim Precision, Graceful Guard, Rings of Preservation', () => {
    const state = createGame(makeConfig({ humanFaction: 'elves' }));
    const player = getPlayer(state, 'player_elves')!;
    const cap = getPlayerCities(state, 'player_elves')[0];
    const borderTiles = state.tiles.filter((t) => t.cityId === cap.id && !t.isCityCenter);

    // 5 untouched ancient woods + 1 sanctuary
    for (let i = 0; i < 5; i++) {
      borderTiles[i].terrain = 'ancient_woods';
      borderTiles[i].improvement = null;
    }
    borderTiles[5].terrain = 'forest';
    borderTiles[5].improvement = 'sanctuary';

    // Without T3: cap(1) + lv1(1) + capped woods(3) = 5★
    expect(calculatePlayerIncome(state, player.id)).toBe(5);
    player.techs.push('elves_sanctuaries', 'elves_lothlorien_sanctum');
    // With T3: cap(1) + lv1(1) + woods(5) + sanctuary(1) = 8★
    expect(calculatePlayerIncome(state, player.id)).toBe(8);

    // Woodland Aim (+0.5 ATK from forest) & Galadhrim Precision (Sentinel +0.5 ATK & +3 maxHP)
    player.techs.push('elves_woodland_aim', 'elves_sentinel_order', 'elves_galadhrim_precision');
    expect(getUnitTrainMaxHp(state, player.id, 'elven_sentinel')).toBe(15);
    clearBoardUnits(state);
    getTile(state, 5, 5)!.terrain = 'plains';
    const sentinel = placeTestUnit(state, player.id, 'elven_sentinel', 5, 5, { maxHp: 15 });
    expect(getEffectiveAttack(state, sentinel)).toBe(3.5);
    getTile(state, 5, 5)!.terrain = 'forest';
    expect(getEffectiveAttack(state, sentinel)).toBe(4.0);

    // Graceful Guard: Defender gets 1.5x DEF even on Plains
    player.techs.push('elves_elven_steeds', 'elves_wardens', 'elves_graceful_guard');
    getTile(state, 6, 5)!.terrain = 'plains';
    const warden = placeTestUnit(state, player.id, 'defender', 6, 5, { maxHp: 15 });
    expect(getTerrainDefenseBonus(state, warden, false)).toBe(1.5);

    // Rings of Preservation: +100 Glory per tech
    const scoreBefore = calculatePlayerScore(state, player.id);
    player.techs.push('elves_high_paths', 'elves_elven_lore', 'elves_rings_preservation');
    expect(calculatePlayerScore(state, player.id)).toBe(
      scoreBefore + 100 + 200 + 350 + player.techs.length * 100,
    );
  });

  it('Dwarves atomic pillars & capstones: Heart of the Mountain, Mithril Phalanx, Deep Vaults, Horned Charge, Dragon-Slayer Engines', () => {
    const state = createGame(makeConfig({ humanFaction: 'dwarves' }));
    const player = getPlayer(state, 'player_dwarves')!;
    const cap = getPlayerCities(state, 'player_dwarves')[0];
    const borderTiles = state.tiles.filter((t) => t.cityId === cap.id && !t.isCityCenter);

    borderTiles[0].terrain = 'mountain';
    borderTiles[0].improvement = 'mine';
    borderTiles[1].terrain = 'plains';
    borderTiles[1].improvement = 'great_forge';
    const incBefore = calculatePlayerIncome(state, player.id);

    // Heart of the Mountain: Mine +2★ (was +1★ -> +1 extra), Great Forge +1★
    player.techs.push('dwarves_mining', 'dwarves_khazad_forges', 'dwarves_heart_of_mountain');
    expect(calculatePlayerIncome(state, player.id)).toBe(incBefore + 2);

    // Deep Vaults: +1★/turn & +1 Unit Cap per city
    const capBefore = getCityUnitCap(state, cap);
    player.techs.push('dwarves_foraging', 'dwarves_stone_walls', 'dwarves_deep_vaults');
    expect(calculatePlayerIncome(state, player.id)).toBe(incBefore + 3);
    expect(getCityUnitCap(state, cap)).toBe(capBefore + 1);

    // Mithril Phalanx: Ironbreakers & Defenders +4 maxHP and 1.75x DEF on Plains
    player.techs.push('dwarves_shieldbearers', 'dwarves_mithril_smithing', 'dwarves_mithril_phalanx');
    expect(getUnitTrainMaxHp(state, player.id, 'ironbreaker')).toBe(24);
    expect(getUnitTrainMaxHp(state, player.id, 'defender')).toBe(21); // 15 + 2 + 4
    clearBoardUnits(state);
    getTile(state, 5, 5)!.terrain = 'plains';
    const ib = placeTestUnit(state, player.id, 'ironbreaker', 5, 5, { maxHp: 24 });
    expect(getTerrainDefenseBonus(state, ib, false)).toBe(1.75);

    // Horned Charge (+0.5 ATK Ram Riders) & Dragon-Slayer Engines (Catapult +0.5 ATK, +5 maxHP, 6★ cost)
    player.techs.push('dwarves_ram_riders', 'dwarves_horned_charge', 'dwarves_siegecraft', 'dwarves_dragon_slayers');
    expect(getUnitCost(state, player.id, 'catapult')).toBe(6);
    expect(getUnitTrainMaxHp(state, player.id, 'catapult')).toBe(20); // 10 + 5 + 5
    const cat = placeTestUnit(state, player.id, 'catapult', 4, 5, { maxHp: 20 });
    const ram = placeTestUnit(state, player.id, 'rider', 6, 5, { maxHp: 10 });
    expect(getEffectiveAttack(state, cat)).toBe(4.5);
    expect(getEffectiveAttack(state, ram)).toBe(2.5);
  });
});

describe('Disabled-State Action Queries (ActionOption)', () => {
  it('getTileActionOptions returns disabled reasons for missing tech, gold, and borders', () => {
    const state = createGame(makeConfig({ humanFaction: 'humans' }));
    const player = getPlayer(state, 'player_humans')!;
    const cap = getPlayerCities(state, 'player_humans')[0];

    // Tile inside borders with Game (requires Ranger Hunting), Plains (Farm requires Farming, Road requires Roadcraft)
    const tile = state.tiles.find((t) => t.cityId === cap.id && !t.isCityCenter)!;
    tile.terrain = 'plains';
    tile.resource = 'game';
    tile.improvement = null;
    tile.hasRoad = false;
    player.gold = 1; // Not enough for Farm (4★) or Road (2★)

    const opts = getTileActionOptions(state, player.id, tile.x, tile.y);
    const harvestOpt = opts.find((o) => o.id === 'harvest_game');
    expect(harvestOpt).toBeDefined();
    expect(harvestOpt?.enabled).toBe(false);
    expect(harvestOpt?.disabledReason).toBe('Requires Ranger Hunting');

    const farmOpt = opts.find((o) => o.id === 'build_farm');
    expect(farmOpt).toBeDefined();
    expect(farmOpt?.enabled).toBe(false);
    expect(farmOpt?.disabledReason).toBe('Requires Farming');

    const roadOpt = opts.find((o) => o.id === 'build_road');
    expect(roadOpt).toBeDefined();
    expect(roadOpt?.enabled).toBe(false);
    expect(roadOpt?.disabledReason).toBe('Requires Roadcraft');

    // Unlock Farming & Roadcraft, still only 1★ -> shows gold disabled reasons!
    player.techs.push('humans_farming', 'humans_roads');
    const brokeOpts = getTileActionOptions(state, player.id, tile.x, tile.y);
    expect(brokeOpts.find((o) => o.id === 'build_farm')?.disabledReason).toBe('Need 4★ (have 1★)');
    expect(brokeOpts.find((o) => o.id === 'build_road')?.disabledReason).toBe('Need 2★ (have 1★)');

    // Give gold & Ranger Hunting -> options become enabled!
    player.gold = 10;
    player.techs.push('humans_hunting');
    const enabledOpts = getTileActionOptions(state, player.id, tile.x, tile.y);
    expect(enabledOpts.find((o) => o.id === 'harvest_game')?.enabled).toBe(true);
    expect(enabledOpts.find((o) => o.id === 'build_farm')?.enabled).toBe(true);

    // Tile outside borders -> "Outside your borders"
    const neutralTile = state.tiles.find((t) => t.cityId === null && t.terrain === 'plains')!;
    player.revealedTiles[tileIndex(neutralTile.x, neutralTile.y, state.mapSize)] = true;
    neutralTile.resource = 'berries';
    neutralTile.improvement = null;
    const neutralOpts = getTileActionOptions(state, player.id, neutralTile.x, neutralTile.y);
    expect(neutralOpts.find((o) => o.id === 'harvest_berries')?.disabledReason).toBe(
      'Outside your borders',
    );
  });

  it('getCityTrainOptions returns all 6 faction units with exact disabled reasons', () => {
    const state = createGame(makeConfig({ humanFaction: 'humans' }));
    const player = getPlayer(state, 'player_humans')!;
    const cap = getPlayerCities(state, 'player_humans')[0];

    // Starting warrior occupies capital tile
    const occupiedOpts = getCityTrainOptions(state, cap.id);
    expect(occupiedOpts).toHaveLength(6);
    expect(occupiedOpts.find((o) => o.unitType === 'warrior')?.disabledReason).toBe(
      'City tile occupied',
    );
    expect(occupiedOpts.find((o) => o.unitType === 'rohirrim_knight')?.disabledReason).toBe(
      'Requires Chivalry',
    );

    // Clear tile, hit unit cap (2/2)
    clearBoardUnits(state);
    placeTestUnit(state, player.id, 'warrior', cap.x + 1, cap.y, { homeCityId: cap.id });
    placeTestUnit(state, player.id, 'warrior', cap.x, cap.y + 1, { homeCityId: cap.id });
    const capOpts = getCityTrainOptions(state, cap.id);
    expect(capOpts.find((o) => o.unitType === 'warrior')?.disabledReason).toBe(
      'Unit cap reached (2/2)',
    );

    // Clear units, set gold = 1 -> "Need 2★ (have 1★)"
    clearBoardUnits(state);
    player.gold = 1;
    const brokeOpts = getCityTrainOptions(state, cap.id);
    expect(brokeOpts.find((o) => o.unitType === 'warrior')?.disabledReason).toBe(
      'Need 2★ (have 1★)',
    );

    // Give gold -> warrior enabled
    player.gold = 5;
    const readyOpts = getCityTrainOptions(state, cap.id);
    const wOpt = readyOpts.find((o) => o.unitType === 'warrior');
    expect(wOpt?.enabled).toBe(true);
    expect(wOpt?.action).toEqual({ type: 'TRAIN_UNIT', cityId: cap.id, unitType: 'warrior' });
  });

  it('getUnitActionOptions returns Recover & Promote with crisp disabled reasons', () => {
    const state = createGame(makeConfig({ humanFaction: 'humans' }));
    const cap = getPlayerCities(state, 'player_humans')[0];
    clearBoardUnits(state);

    const u = placeTestUnit(state, 'player_humans', 'warrior', cap.x, cap.y, {
      maxHp: 10,
      hp: 10,
      kills: 1,
    });
    const opts1 = getUnitActionOptions(state, u.id);
    expect(opts1.find((o) => o.id === 'recover')?.disabledReason).toBe('Full HP');
    expect(opts1.find((o) => o.id === 'promote')?.disabledReason).toBe('Kills: 1/3');

    // Damaged & ready to promote
    u.hp = 5;
    u.kills = 3;
    u.canPromote = true;
    const opts2 = getUnitActionOptions(state, u.id);
    expect(opts2.find((o) => o.id === 'recover')?.enabled).toBe(true);
    expect(opts2.find((o) => o.id === 'promote')?.enabled).toBe(true);

    // Already acted -> Recover disabled
    u.hasMoved = true;
    const opts3 = getUnitActionOptions(state, u.id);
    expect(opts3.find((o) => o.id === 'recover')?.disabledReason).toBe('Already acted');
  });

  it('getLeaderboard ranks all players by live Glory score with citiesCount and non-eliminated tie-breakers', () => {
    const state = createGame(makeConfig({ humanFaction: 'humans' }));

    // Initial leaderboard has all 4 players ranked 1..4 with accurate counts
    const initial = getLeaderboard(state);
    expect(initial).toHaveLength(4);
    expect(initial.map((e) => e.rank)).toEqual([1, 2, 3, 4]);
    for (const entry of initial) {
      expect(entry.score).toBe(calculatePlayerScore(state, entry.playerId));
      expect(entry.citiesCount).toBe(1);
      expect(entry.unitsCount).toBe(1);
      expect(entry.techsCount).toBe(1);
      expect(entry.isEliminated).toBe(false);
      expect(entry.isHuman).toBe(entry.playerId === 'player_humans');
    }

    // Boost Elves score cleanly above everyone else (2 techs + extra revealed tiles)
    const elves = getPlayer(state, 'player_elves')!;
    elves.techs.push('elves_woodland_aim', 'elves_sentinel_order');

    // Create an exact score tie between Humans (2 cities, alive) and Orcs (1 city, alive)
    // and set Dwarves eliminated with 0 cities.
    clearBoardUnits(state);
    const humans = getPlayer(state, 'player_humans')!;
    const orcs = getPlayer(state, 'player_orcs')!;
    const dwarves = getPlayer(state, 'player_dwarves')!;

    // Normalize revealed tiles for Humans, Orcs, Dwarves to zero so we control exact scores
    humans.revealedTiles.fill(false);
    orcs.revealedTiles.fill(false);
    dwarves.revealedTiles.fill(false);

    // Transfer Dwarves' capital to Humans so Humans have 2 Lv1 cities (300) + 1 T1 tech (100) = 400
    const dwarfCap = getPlayerCities(state, 'player_dwarves')[0];
    dwarfCap.ownerId = 'player_humans';
    dwarves.alive = false;
    dwarves.eliminatedOnTurn = 2;

    // Orcs have 1 Lv1 city (150) + 1 T1 tech (100) + 15 revealed tiles (150) = 400 -> exact score tie with Humans!
    for (let i = 0; i < 15; i++) {
      orcs.revealedTiles[i] = true;
    }

    // Dwarves have 0 cities + 1 T1 tech (100) + 30 revealed tiles (300) = 400 -> exact score tie, eliminated!
    for (let i = 0; i < 30; i++) {
      dwarves.revealedTiles[i] = true;
    }

    const board = getLeaderboard(state);
    expect(board.map((e) => e.rank)).toEqual([1, 2, 3, 4]);
    expect(board[0].playerId).toBe('player_elves');
    // Score tie at 400: Humans (2 cities) > Orcs (1 city, alive) > Dwarves (0 cities, eliminated)
    expect(board[1]).toMatchObject({
      playerId: 'player_humans',
      score: 400,
      citiesCount: 2,
      isEliminated: false,
      isHuman: true,
      rank: 2,
    });
    expect(board[2]).toMatchObject({
      playerId: 'player_orcs',
      score: 400,
      citiesCount: 1,
      isEliminated: false,
      rank: 3,
    });
    expect(board[3]).toMatchObject({
      playerId: 'player_dwarves',
      score: 400,
      citiesCount: 0,
      isEliminated: true,
      rank: 4,
    });

    // Also verify non-eliminated tie-breaker when score AND citiesCount are both equal
    const orcCap = getPlayerCities(state, 'player_orcs')[0];
    orcCap.ownerId = 'player_elves';
    // Now Orcs have 0 cities + 1 T1 tech (100) + 30 revealed tiles (300) = 400 (alive),
    // Dwarves have 0 cities + 1 T1 tech (100) + 30 revealed tiles (300) = 400 (eliminated).
    for (let i = 0; i < 30; i++) {
      orcs.revealedTiles[i] = true;
    }
    const board2 = getLeaderboard(state);
    const orcEntry = board2.find((e) => e.playerId === 'player_orcs')!;
    const dwarfEntry = board2.find((e) => e.playerId === 'player_dwarves')!;
    expect(orcEntry.score).toBe(dwarfEntry.score);
    expect(orcEntry.citiesCount).toBe(dwarfEntry.citiesCount);
    expect(orcEntry.rank).toBeLessThan(dwarfEntry.rank);
  });
});

describe('Authoritative Remaining Actions & Dash/Escape/Persist Auto-Exhaustion', () => {
  it('auto-exhausts Dash units after moving when zero enemies are in attack range, but keeps them ready when an enemy is in range', () => {
    const state = createGame(makeConfig({ humanFaction: 'humans' }));
    clearBoardUnits(state);
    for (let y = 4; y <= 8; y++) {
      for (let x = 4; x <= 9; x++) {
        getTile(state, x, y)!.terrain = 'plains';
      }
    }

    // Case 1: Warrior moves with NO enemies in range -> immediately actedThisTurn = true
    const scout = placeTestUnit(state, 'player_humans', 'warrior', 5, 5);
    expect(hasUnitRemainingActions(state, scout.id)).toBe(true);

    const movedAlone = applyAction(state, {
      type: 'MOVE_UNIT',
      unitId: scout.id,
      to: { x: 6, y: 5 },
    });
    expect(movedAlone.state.units[scout.id].actedThisTurn).toBe(true);
    expect(hasUnitRemainingActions(movedAlone.state, scout.id)).toBe(false);

    // Case 2: Warrior moves adjacent to an enemy (even previously hidden in fog!) -> stays ready to Dash-attack
    const s2 = cloneState(state);
    const enemy = placeTestUnit(s2, 'player_orcs', 'warrior', 7, 5);
    // Hide enemy tile in fog before move; moving to (6,5) reveals (7,5)
    getPlayer(s2, 'player_humans')!.revealedTiles[tileIndex(7, 5, s2.mapSize)] = false;
    const movedIntoCombat = applyAction(s2, {
      type: 'MOVE_UNIT',
      unitId: scout.id,
      to: { x: 6, y: 5 },
    });
    expect(movedIntoCombat.state.units[scout.id].actedThisTurn).toBe(false);
    expect(getValidAttackTargets(movedIntoCombat.state, scout.id)).toContainEqual({
      x: enemy.x,
      y: enemy.y,
    });
    expect(hasUnitRemainingActions(movedIntoCombat.state, scout.id)).toBe(true);
  });

  it('auto-exhausts Escape and Persist units after attacking when zero follow-up moves or targets exist', () => {
    const state = createGame(makeConfig({ humanFaction: 'elves' }));
    clearBoardUnits(state);

    // Surround Elven Sentinel at (6,6) with water so it has 0 valid Escape moves
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        getTile(state, 6 + dx, 6 + dy)!.terrain = dx === 0 && dy === 0 ? 'plains' : 'water';
      }
    }
    getTile(state, 8, 6)!.terrain = 'plains';

    const sentinel = placeTestUnit(state, 'player_elves', 'elven_sentinel', 6, 6, { maxHp: 12 });
    const orcTarget = placeTestUnit(state, 'player_orcs', 'warrior', 8, 6, { maxHp: 10, hp: 10 });

    const escapeBlocked = applyAction(state, {
      type: 'ATTACK_UNIT',
      attackerId: sentinel.id,
      defenderId: orcTarget.id,
    });
    const afterSentinel = escapeBlocked.state.units[sentinel.id];
    expect(afterSentinel.canEscapeMove).toBe(false);
    expect(afterSentinel.actedThisTurn).toBe(true);
    expect(hasUnitRemainingActions(escapeBlocked.state, sentinel.id)).toBe(false);

    // Rohirrim Knight kills sole enemy with NO other enemies nearby -> Persist auto-exhausts
    const s2 = createGame(makeConfig({ humanFaction: 'humans' }));
    clearBoardUnits(s2);
    getTile(s2, 5, 5)!.terrain = 'plains';
    getTile(s2, 6, 5)!.terrain = 'plains';
    const knight = placeTestUnit(s2, 'player_humans', 'rohirrim_knight', 5, 5, { maxHp: 15 });
    const loneOrc = placeTestUnit(s2, 'player_orcs', 'warrior', 6, 5, { maxHp: 10, hp: 2 });

    const persistEmpty = applyAction(s2, {
      type: 'ATTACK_UNIT',
      attackerId: knight.id,
      defenderId: loneOrc.id,
    });
    const afterKnight = persistEmpty.state.units[knight.id];
    expect(afterKnight.canPersistAttack).toBe(false);
    expect(afterKnight.actedThisTurn).toBe(true);
    expect(hasUnitRemainingActions(persistEmpty.state, knight.id)).toBe(false);
  });

  it('hasUnitRemainingActions accurately reflects capture, ruins, recover, promote, boxed-in, and game_over states', () => {
    const state = createGame(makeConfig({ humanFaction: 'humans' }));
    clearBoardUnits(state);

    // Box in tile (7,7) with water
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        getTile(state, 7 + dx, 7 + dy)!.terrain = dx === 0 && dy === 0 ? 'plains' : 'water';
      }
    }

    // Full HP, boxed in, 0 kills, no capture/ruins -> false
    const trapped = placeTestUnit(state, 'player_humans', 'warrior', 7, 7, { maxHp: 10, hp: 10 });
    expect(hasUnitRemainingActions(state, trapped.id)).toBe(false);
    expect(hasUnitRemainingActions(state, 'nonexistent')).toBe(false);

    // Wounded & unmoved -> can Recover -> true
    trapped.hp = 6;
    expect(hasUnitRemainingActions(state, trapped.id)).toBe(true);
    trapped.hp = 10;

    // 3 kills & not veteran -> can Promote -> true; after promoting while boxed in -> auto-exhausted (false)
    trapped.kills = 3;
    trapped.canPromote = true;
    expect(hasUnitRemainingActions(state, trapped.id)).toBe(true);
    const promoted = applyAction(state, { type: 'PROMOTE_UNIT', unitId: trapped.id });
    expect(promoted.state.units[trapped.id].isVeteran).toBe(true);
    expect(promoted.state.units[trapped.id].actedThisTurn).toBe(true);
    expect(hasUnitRemainingActions(promoted.state, trapped.id)).toBe(false);

    // On capturable village with canCapture = true -> true
    trapped.kills = 0;
    trapped.canPromote = false;
    getTile(state, 7, 7)!.hasVillage = true;
    getTile(state, 7, 7)!.cityId = null;
    trapped.canCapture = true;
    expect(hasUnitRemainingActions(state, trapped.id)).toBe(true);

    // Game over -> always false
    state.phase = 'game_over';
    expect(hasUnitRemainingActions(state, trapped.id)).toBe(false);
  });

  it('never includes cloud-covered (unrevealed) tiles or impassable mountains/water in getValidMoves', () => {
    const state = createGame(makeConfig({ humanFaction: 'humans' }));
    clearBoardUnits(state);
    const human = getPlayer(state, 'player_humans')!;

    // Flatten a 5x5 region around (7, 7) to plains and reveal only a 3x3 ring around (7, 7)
    human.revealedTiles.fill(false);
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        const t = getTile(state, 7 + dx, 7 + dy)!;
        t.terrain = 'plains';
        t.hasRoad = false;
        t.unitId = null;
        if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) {
          human.revealedTiles[tileIndex(7 + dx, 7 + dy, state.mapSize)] = true;
        }
      }
    }

    // Place a mountain at (8, 7) and water at (6, 7) inside the revealed ring
    getTile(state, 8, 7)!.terrain = 'mountain';
    getTile(state, 6, 7)!.terrain = 'water';

    // Rider has 2 MOV: its range would reach distance-2 cloud-covered tiles (e.g. (7, 5), (7, 9))
    const rider = placeTestUnit(state, 'player_humans', 'rider', 7, 7, {}, 0);
    const movesBeforeTech = getValidMoves(state, rider.id);

    // Must never include mountain without Mountaineering tech, water, or any unrevealed cloud tile
    expect(movesBeforeTech).not.toContainEqual({ x: 8, y: 7 });
    expect(movesBeforeTech).not.toContainEqual({ x: 6, y: 7 });
    for (const m of movesBeforeTech) {
      expect(human.revealedTiles[tileIndex(m.x, m.y, state.mapSize)]).toBe(true);
    }

    // Researching Mountaineering unlocks moving onto the revealed mountain (and still blocks clouds & water)
    human.techs.push('humans_mountaineering');
    const movesAfterTech = getValidMoves(state, rider.id);
    expect(movesAfterTech).toContainEqual({ x: 8, y: 7 });
    expect(movesAfterTech).not.toContainEqual({ x: 6, y: 7 });
    for (const m of movesAfterTech) {
      expect(human.revealedTiles[tileIndex(m.x, m.y, state.mapSize)]).toBe(true);
    }
  });
});

describe('Ages Progression & Tap-to-Research Metadata', () => {
  it('getPlayerAge transitions 1 -> 2 at 3 techs and 2 -> 3 at 7 techs, and getNextAgeProgress tracks progress', () => {
    const state = createGame(makeConfig({ humanFaction: 'humans' }));
    const player = getPlayer(state, 'player_humans')!;

    expect(AGE_THRESHOLDS).toEqual({ 1: 0, 2: 3, 3: 7 });
    expect(AGE_ROMAN).toEqual({ 1: 'I', 2: 'II', 3: 'III' });

    // Starts with 1 tech -> Age I
    expect(player.techs).toHaveLength(1);
    expect(getPlayerAge(player)).toBe(1);
    expect(getNextAgeProgress(player)).toEqual({
      currentAge: 1,
      nextAge: 2,
      currentTechs: 1,
      requiredTechs: 3,
      remaining: 2,
    });

    // 2 techs -> still Age I
    player.techs.push('humans_roads');
    expect(getPlayerAge(player)).toBe(1);
    expect(getNextAgeProgress(player)).toEqual({
      currentAge: 1,
      nextAge: 2,
      currentTechs: 2,
      requiredTechs: 3,
      remaining: 1,
    });

    // 3 techs -> Age II
    player.techs.push('humans_riding');
    expect(getPlayerAge(player)).toBe(2);
    expect(getNextAgeProgress(player)).toEqual({
      currentAge: 2,
      nextAge: 3,
      currentTechs: 3,
      requiredTechs: 7,
      remaining: 4,
    });

    // 6 techs -> still Age II
    player.techs.push('humans_hunting', 'humans_farming', 'humans_granaries');
    expect(player.techs).toHaveLength(6);
    expect(getPlayerAge(player)).toBe(2);
    expect(getNextAgeProgress(player).remaining).toBe(1);

    // 7 techs -> Age III
    player.techs.push('humans_shield_wall');
    expect(player.techs).toHaveLength(7);
    expect(getPlayerAge(player)).toBe(3);
    expect(getNextAgeProgress(player)).toEqual({
      currentAge: 3,
      nextAge: null,
      currentTechs: 7,
      requiredTechs: null,
      remaining: 0,
    });
  });

  it('canResearchTech enforces Age gates and getTechResearchBlockReason returns exact Age, Prereq, Stars, and Already researched reasons', () => {
    const state = createGame(makeConfig({ humanFaction: 'humans' }));
    const player = getPlayer(state, 'player_humans')!;
    player.gold = 50;

    // Already researched
    expect(canResearchTech(state, player.id, 'humans_gathering')).toBe(false);
    expect(getTechResearchBlockReason(state, player.id, 'humans_gathering')).toBe(
      'Already researched',
    );

    // Age I (1 tech): Tier 2 tech is blocked even when prerequisite (humans_gathering) is owned
    expect(canResearchTech(state, player.id, 'humans_farming')).toBe(false);
    expect(getTechResearchBlockReason(state, player.id, 'humans_farming')).toBe(
      'Requires Age II (research 2 more techs)',
    );

    // Age I (2 techs): singular "1 more tech"
    player.techs.push('humans_roads');
    expect(getTechResearchBlockReason(state, player.id, 'humans_farming')).toBe(
      'Requires Age II (research 1 more tech)',
    );

    // Age II (3 techs): Tier 2 with prereq met is now researchable; Tier 2 without prereq shows Prereq; Tier 3 shows Age III
    player.techs.push('humans_riding');
    expect(canResearchTech(state, player.id, 'humans_farming')).toBe(true);
    expect(getTechResearchBlockReason(state, player.id, 'humans_farming')).toBeNull();

    // Missing prerequisite (humans_hunting not owned)
    expect(canResearchTech(state, player.id, 'humans_archery')).toBe(false);
    expect(getTechResearchBlockReason(state, player.id, 'humans_archery')).toBe(
      'Requires Ranger Hunting',
    );

    // Tier 3 capstone blocked by Age III in Age II (3 techs -> needs 4 more)
    expect(canResearchTech(state, player.id, 'humans_milling')).toBe(false);
    expect(getTechResearchBlockReason(state, player.id, 'humans_milling')).toBe(
      'Requires Age III (research 4 more techs)',
    );

    // Insufficient stars check
    player.gold = 2;
    expect(canResearchTech(state, player.id, 'humans_farming')).toBe(false);
    expect(getTechResearchBlockReason(state, player.id, 'humans_farming')).toBe(
      'Need 5★ (have 2★)',
    );

    // Reach Age III (7 techs) with prereq & gold -> Tier 3 capstone becomes researchable
    player.gold = 50;
    player.techs.push('humans_farming', 'humans_granaries', 'humans_hunting', 'humans_shield_wall');
    expect(getPlayerAge(player)).toBe(3);
    expect(canResearchTech(state, player.id, 'humans_milling')).toBe(true);
    expect(getTechResearchBlockReason(state, player.id, 'humans_milling')).toBeNull();
  });

  it('getTechCost increases by +1★ per additional conquered city', () => {
    const state = createGame(makeConfig({ humanFaction: 'humans' }));
    const player = getPlayer(state, 'player_humans')!;

    // 1 city: T1=3, T2=5, T3=8
    expect(getPlayerCities(state, player.id)).toHaveLength(1);
    expect(getTechCost(state, player.id, 'humans_riding')).toBe(3);
    expect(getTechCost(state, player.id, 'humans_farming')).toBe(5);
    expect(getTechCost(state, player.id, 'humans_milling')).toBe(8);

    // Conquer a 2nd city: T1=4, T2=6, T3=9
    const enemyCity1 = Object.values(state.cities).find((c) => c.ownerId !== player.id)!;
    enemyCity1.ownerId = player.id;
    expect(getPlayerCities(state, player.id)).toHaveLength(2);
    expect(getTechCost(state, player.id, 'humans_riding')).toBe(4);
    expect(getTechCost(state, player.id, 'humans_farming')).toBe(6);
    expect(getTechCost(state, player.id, 'humans_milling')).toBe(9);

    // Conquer a 3rd city: T1=5, T2=7, T3=10
    const enemyCity2 = Object.values(state.cities).find((c) => c.ownerId !== player.id)!;
    enemyCity2.ownerId = player.id;
    expect(getPlayerCities(state, player.id)).toHaveLength(3);
    expect(getTechCost(state, player.id, 'humans_riding')).toBe(5);
    expect(getTechCost(state, player.id, 'humans_farming')).toBe(7);
    expect(getTechCost(state, player.id, 'humans_milling')).toBe(10);
  });

  it('getTileActionOptions and getCityTrainOptions populate requiredTechId on tech-locked actions only', () => {
    const state = createGame(makeConfig({ humanFaction: 'humans' }));
    const player = getPlayer(state, 'player_humans')!;
    const cap = getPlayerCities(state, 'player_humans')[0];

    const tile = state.tiles.find((t) => t.cityId === cap.id && !t.isCityCenter)!;
    tile.terrain = 'plains';
    tile.resource = 'game';
    tile.improvement = null;
    tile.hasRoad = false;
    player.gold = 1;

    // Locked by missing tech inside friendly borders -> requiredTechId is populated
    const opts = getTileActionOptions(state, player.id, tile.x, tile.y);
    expect(opts.find((o) => o.id === 'harvest_game')?.requiredTechId).toBe('humans_hunting');
    expect(opts.find((o) => o.id === 'build_farm')?.requiredTechId).toBe('humans_farming');
    expect(opts.find((o) => o.id === 'build_road')?.requiredTechId).toBe('humans_roads');

    // Once tech is unlocked (even if still lacking gold) -> requiredTechId is undefined
    player.techs.push('humans_farming', 'humans_roads');
    const brokeOpts = getTileActionOptions(state, player.id, tile.x, tile.y);
    expect(brokeOpts.find((o) => o.id === 'build_farm')?.requiredTechId).toBeUndefined();
    expect(brokeOpts.find((o) => o.id === 'build_road')?.requiredTechId).toBeUndefined();

    // Outside borders -> disabled for borders, NOT missing tech -> requiredTechId is undefined
    const neutralTile = state.tiles.find((t) => t.cityId === null && t.terrain === 'plains')!;
    player.revealedTiles[tileIndex(neutralTile.x, neutralTile.y, state.mapSize)] = true;
    neutralTile.resource = 'game';
    neutralTile.improvement = null;
    const neutralOpts = getTileActionOptions(state, player.id, neutralTile.x, neutralTile.y);
    expect(neutralOpts.find((o) => o.id === 'harvest_game')?.disabledReason).toBe(
      'Outside your borders',
    );
    expect(neutralOpts.find((o) => o.id === 'harvest_game')?.requiredTechId).toBeUndefined();

    // City train options set requiredTechId on tech-locked units, not on unlocked units
    const trainOpts = getCityTrainOptions(state, cap.id);
    expect(trainOpts.find((o) => o.unitType === 'warrior')?.requiredTechId).toBeUndefined();
    expect(trainOpts.find((o) => o.unitType === 'rider')?.requiredTechId).toBe('humans_riding');
    expect(trainOpts.find((o) => o.unitType === 'rohirrim_knight')?.requiredTechId).toBe(
      'humans_chivalry',
    );
  });
});

describe('Age III One-Time Superpowers', () => {
  function grantAge3(state: GameState, playerId: string): void {
    const player = getPlayer(state, playerId)!;
    const factionTechs = getFactionTechs(player.faction).map((t) => t.id);
    while (player.techs.length < 7) {
      const nextTech = factionTechs.find((id) => !player.techs.includes(id))!;
      player.techs.push(nextTech);
    }
  }

  it('requires Age III, enforces one-time use, and never lists dragon/watchtower as trainable', () => {
    const state = createGame(makeConfig({ humanFaction: 'dwarves' }));
    const player = getPlayer(state, 'player_dwarves')!;
    const cap = getPlayerCities(state, player.id)[0];

    expect(SUPERPOWER_DEFINITIONS.elves.requiresTarget).toBe(false);
    expect(SUPERPOWER_DEFINITIONS.dwarves.requiresTarget).toBe(false);
    expect(SUPERPOWER_DEFINITIONS.orcs.requiresTarget).toBe(true);
    expect(SUPERPOWER_DEFINITIONS.humans.requiresTarget).toBe(true);

    // Age I: cannot use superpower
    expect(getPlayerAge(player)).toBe(1);
    expect(canUseSuperpower(state, player.id)).toBe(false);
    const noop = applyAction(state, { type: 'USE_SUPERPOWER' });
    expect(noop.events).toHaveLength(0);

    // Age III: trainable units never include dragon or watchtower
    grantAge3(state, player.id);
    expect(canUseSuperpower(state, player.id)).toBe(true);
    expect(getTrainableUnits(state, cap.id)).not.toContain('dragon');
    expect(getTrainableUnits(state, cap.id)).not.toContain('watchtower');
    const trainTypes = getCityTrainOptions(state, cap.id).map((o) => o.unitType);
    expect(trainTypes).not.toContain('dragon');
    expect(trainTypes).not.toContain('watchtower');

    // Use once -> succeeds, second use is rejected
    const res1 = applyAction(state, { type: 'USE_SUPERPOWER' });
    expect(res1.events.some((e) => e.type === 'SUPERPOWER_USED')).toBe(true);
    expect(getPlayer(res1.state, player.id)!.superpowerUsed).toBe(true);
    expect(canUseSuperpower(res1.state, player.id)).toBe(false);

    const res2 = applyAction(res1.state, { type: 'USE_SUPERPOWER' });
    expect(res2.events).toHaveLength(0);
  });

  it('Elves Starlit Eclipse grants +1 MOV & +1 ATK to Elven units and expires after 3 turns', () => {
    let state = createGame(makeConfig({ humanFaction: 'elves' }));
    clearBoardUnits(state);
    for (let y = 4; y <= 8; y++) {
      for (let x = 4; x <= 10; x++) {
        const t = getTile(state, x, y)!;
        t.terrain = 'plains';
        t.hasRoad = false;
      }
    }
    const elfWarrior = placeTestUnit(state, 'player_elves', 'warrior', 5, 6);
    const orcWarrior = placeTestUnit(state, 'player_orcs', 'warrior', 9, 6);
    grantAge3(state, 'player_elves');

    const baseAtk = getEffectiveAttack(state, elfWarrior);
    const orcBaseAtk = getEffectiveAttack(state, orcWarrior);
    expect(getValidMoves(state, elfWarrior.id)).not.toContainEqual({ x: 7, y: 6 });

    // Activate Starlit Eclipse
    const act = applyAction(state, { type: 'USE_SUPERPOWER' });
    state = act.state;
    expect(state.eclipseTurnsRemaining).toBe(3);
    expect(state.eclipseOwnerId).toBe('player_elves');
    expect(act.events.some((e) => e.type === 'SUPERPOWER_USED' && e.faction === 'elves')).toBe(true);

    // Elves gain +1 ATK and +1 MOV (warrior can now reach 2 tiles away); Orcs do NOT
    expect(getEffectiveAttack(state, state.units[elfWarrior.id])).toBe(baseAtk + 1);
    expect(getEffectiveAttack(state, state.units[orcWarrior.id])).toBe(orcBaseAtk);
    expect(getValidMoves(state, elfWarrior.id)).toContainEqual({ x: 7, y: 6 });

    // Advance 1 full round (4 players) -> 2 turns remaining
    for (let i = 0; i < 4; i++) state = applyAction(state, { type: 'END_TURN' }).state;
    expect(state.eclipseTurnsRemaining).toBe(2);
    expect(getEffectiveAttack(state, state.units[elfWarrior.id])).toBe(baseAtk + 1);

    // Advance 2nd full round -> 1 turn remaining
    for (let i = 0; i < 4; i++) state = applyAction(state, { type: 'END_TURN' }).state;
    expect(state.eclipseTurnsRemaining).toBe(1);
    expect(getEffectiveAttack(state, state.units[elfWarrior.id])).toBe(baseAtk + 1);

    // Advance 3rd full round -> expired!
    for (let i = 0; i < 4; i++) state = applyAction(state, { type: 'END_TURN' }).state;
    expect(state.eclipseTurnsRemaining).toBe(0);
    expect(state.eclipseOwnerId).toBeNull();
    expect(getEffectiveAttack(state, state.units[elfWarrior.id])).toBe(baseAtk);
    expect(getValidMoves(state, elfWarrior.id)).not.toContainEqual({ x: 7, y: 6 });
  });

  it('Orcs Volcanic Cataclysm destroys enemies in 3x3, clears improvements/resources, and scorches land to Wasteland', () => {
    const state = createGame(makeConfig({ humanFaction: 'orcs' }));
    clearBoardUnits(state);
    grantAge3(state, 'player_orcs');
    const orcPlayer = getPlayer(state, 'player_orcs')!;

    // Set up a 3x3 centered at (7, 7) with varied terrain, resources, roads, improvements, and units
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const t = getTile(state, 7 + dx, 7 + dy)!;
        t.terrain = dx === 1 && dy === 1 ? 'water' : 'plains';
        t.resource = dx === 0 && dy === 0 ? 'berries' : null;
        t.improvement = dx === -1 && dy === 0 ? 'farm' : null;
        t.hasRoad = dx === 0 && dy === -1;
        orcPlayer.revealedTiles[tileIndex(t.x, t.y, state.mapSize)] = true;
      }
    }

    const enemy1 = placeTestUnit(state, 'player_humans', 'warrior', 7, 7);
    const enemy2 = placeTestUnit(state, 'player_elves', 'archer', 6, 7);
    const friendlyOrc = placeTestUnit(state, 'player_orcs', 'warrior', 7, 6);
    const outsideEnemy = placeTestUnit(state, 'player_dwarves', 'warrior', 9, 7);

    const targets = getSuperpowerTargetCoords(state, 'player_orcs');
    expect(targets).toContainEqual({ x: 7, y: 7 });

    const res = applyAction(state, { type: 'USE_SUPERPOWER', target: { x: 7, y: 7 } });
    const ev = res.events.find((e) => e.type === 'SUPERPOWER_USED');
    expect(ev).toBeDefined();
    if (ev && ev.type === 'SUPERPOWER_USED') {
      expect(ev.affectedCoords).toHaveLength(9);
      expect(ev.destroyedUnitIds).toContain(enemy1.id);
      expect(ev.destroyedUnitIds).toContain(enemy2.id);
      expect(ev.destroyedUnitIds).not.toContain(friendlyOrc.id);
      expect(ev.destroyedUnitIds).not.toContain(outsideEnemy.id);
    }

    // Enemies inside 3x3 are destroyed; friendly orc and outside enemy survive
    expect(res.state.units[enemy1.id]).toBeUndefined();
    expect(res.state.units[enemy2.id]).toBeUndefined();
    expect(res.state.units[friendlyOrc.id]).toBeDefined();
    expect(res.state.units[outsideEnemy.id]).toBeDefined();

    // Non-water tiles converted to wasteland, resources/improvements/roads cleared, water preserved
    expect(getTile(res.state, 7, 7)!.terrain).toBe('wasteland');
    expect(getTile(res.state, 7, 7)!.resource).toBeNull();
    expect(getTile(res.state, 6, 7)!.improvement).toBeNull();
    expect(getTile(res.state, 7, 6)!.hasRoad).toBe(false);
    expect(getTile(res.state, 8, 8)!.terrain).toBe('water');
  });

  it('Dwarves Awaken Fire Drake summons a ready flying Fire Drake at the closest mountain and flies over water/mountains', () => {
    const state = createGame(makeConfig({ humanFaction: 'dwarves' }));
    clearBoardUnits(state);
    grantAge3(state, 'player_dwarves');
    const cap = getPlayerCities(state, 'player_dwarves')[0];

    // Place a known closest mountain right next to capital
    const mtnCoord = { x: cap.x + 1, y: cap.y };
    const mtnTile = getTile(state, mtnCoord.x, mtnCoord.y)!;
    mtnTile.terrain = 'mountain';
    // Clear any other mountains at distance 1 so mtnCoord is uniquely closest
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 1 && dy === 0) continue;
        const t = getTile(state, cap.x + dx, cap.y + dy);
        if (t && t.terrain === 'mountain') t.terrain = 'plains';
      }
    }

    const res = applyAction(state, { type: 'USE_SUPERPOWER' });
    const ev = res.events.find((e) => e.type === 'SUPERPOWER_USED');
    expect(ev).toBeDefined();
    expect(ev?.type === 'SUPERPOWER_USED' && ev.spawnedUnitId).toBeTruthy();

    const drakeId = ev && ev.type === 'SUPERPOWER_USED' ? ev.spawnedUnitId! : '';
    const drake = res.state.units[drakeId];
    expect(drake).toBeDefined();
    expect(drake.type).toBe('dragon');
    expect(drake.x).toBe(mtnCoord.x);
    expect(drake.y).toBe(mtnCoord.y);
    expect(drake.maxHp).toBe(20);
    expect(drake.actedThisTurn).toBe(false);

    // Verify flying: build a 3-tile line of water -> mountain -> plains from a test dragon
    const flyState = cloneState(res.state);
    clearBoardUnits(flyState);
    getTile(flyState, 4, 6)!.terrain = 'plains';
    getTile(flyState, 5, 6)!.terrain = 'water';
    getTile(flyState, 6, 6)!.terrain = 'mountain';
    getTile(flyState, 7, 6)!.terrain = 'plains';
    const testDrake = placeTestUnit(flyState, 'player_dwarves', 'dragon', 4, 6, { maxHp: 20 });

    const moves = getValidMoves(flyState, testDrake.id);
    // Flies onto water, onto mountain, and all the way across both to (7,6) with 3 MOV!
    expect(moves).toContainEqual({ x: 5, y: 6 });
    expect(moves).toContainEqual({ x: 6, y: 6 });
    expect(moves).toContainEqual({ x: 7, y: 6 });
  });

  it('Humans Raise Watchtower builds a static 25 HP Range-2 Watchtower inside borders that fires without moving', () => {
    const state = createGame(makeConfig({ humanFaction: 'humans' }));
    clearBoardUnits(state);
    grantAge3(state, 'player_humans');
    const cap = getPlayerCities(state, 'player_humans')[0];

    const validTargets = getSuperpowerTargetCoords(state, 'player_humans');
    expect(validTargets.length).toBeGreaterThan(0);
    // Must never include city center
    expect(validTargets).not.toContainEqual({ x: cap.x, y: cap.y });

    const buildCoord = validTargets[0];
    // Place an enemy within range 2 of buildCoord
    const enemyCoord = {
      x: Math.min(state.mapSize - 1, buildCoord.x + 2),
      y: buildCoord.y,
    };
    const enemy = placeTestUnit(state, 'player_orcs', 'warrior', enemyCoord.x, enemyCoord.y);

    const res = applyAction(state, { type: 'USE_SUPERPOWER', target: buildCoord });
    const ev = res.events.find((e) => e.type === 'SUPERPOWER_USED');
    expect(ev).toBeDefined();
    const towerId = ev && ev.type === 'SUPERPOWER_USED' ? ev.spawnedUnitId! : '';
    const tower = res.state.units[towerId];

    expect(tower).toBeDefined();
    expect(tower.type).toBe('watchtower');
    expect(tower.hp).toBe(25);
    expect(tower.maxHp).toBe(25);
    expect(tower.actedThisTurn).toBe(false);

    // Static: cannot move even if placed on a road!
    getTile(res.state, tower.x, tower.y)!.hasRoad = true;
    expect(getValidMoves(res.state, tower.id)).toHaveLength(0);

    // Can fire at enemy within range 2 immediately
    const atkTargets = getValidAttackTargets(res.state, tower.id);
    expect(atkTargets).toContainEqual({ x: enemy.x, y: enemy.y });

    const fired = applyAction(res.state, {
      type: 'ATTACK_UNIT',
      attackerId: tower.id,
      defenderId: enemy.id,
    });
    expect(fired.events.some((e) => e.type === 'UNIT_ATTACKED' && e.isRanged)).toBe(true);
    expect(fired.state.units[tower.id].actedThisTurn).toBe(true);
  });
});
