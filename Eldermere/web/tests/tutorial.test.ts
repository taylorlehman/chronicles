import { describe, expect, it } from 'vitest';
import {
  ALL_FACTIONS,
  applyAction,
  canResearchTech,
  canUnitCapture,
  chebyshevDist,
  createTutorialGame,
  getFactionTechs,
  getPlayerCities,
  getTile,
  getTileActionOptions,
  getValidAttackTargets,
  getValidMoves,
  tileIndex,
  type FactionId,
  type MapSize,
} from '../src/game';

describe('Curated Tutorial Scenario (createTutorialGame)', () => {
  it('is strictly deterministic for identical options', () => {
    const a = createTutorialGame({ humanFaction: 'humans', difficulty: 'easy', mapSize: 16 });
    const b = createTutorialGame({ humanFaction: 'humans', difficulty: 'easy', mapSize: 16 });

    expect(a.scenario).toEqual(b.scenario);
    expect(a.state).toEqual(b.state);
  });

  it.each<MapSize>([16, 18])(
    'places Orc warrior directly on top of the neutral Village and well-separated rivals on %ix%i map',
    (mapSize) => {
      const { state, scenario } = createTutorialGame({
        humanFaction: 'humans',
        difficulty: 'normal',
        mapSize,
      });

      const expectedCenter = mapSize === 18 ? 8 : 7;
      expect(scenario.capitalCoord).toEqual({ x: expectedCenter, y: expectedCenter });
      expect(scenario.moveTargetCoord).toEqual({ x: expectedCenter + 1, y: expectedCenter });
      expect(scenario.villageCoord).toEqual({ x: expectedCenter + 2, y: expectedCenter });
      expect(scenario.enemyCoord).toEqual(scenario.villageCoord);

      // All 4 factions have valid capitals & starting units
      expect(state.players).toHaveLength(4);
      const capitals = Object.values(state.cities).filter((c) => c.isCapital);
      expect(capitals).toHaveLength(4);

      const humanPlayer = state.players[0];
      expect(humanPlayer.isHuman).toBe(true);
      expect(humanPlayer.gold).toBe(10);

      // Rival standing on the neutral village is an Orc when the human is not Orcs
      const enemyUnit = state.units[scenario.enemyUnitId];
      const enemyOwner = state.players.find((p) => p.id === enemyUnit.ownerId);
      expect(enemyOwner?.faction).toBe('orcs');

      // Rival capitals are far enough from center for a fair 4-player post-tutorial match
      for (const cap of capitals) {
        if (cap.ownerId === humanPlayer.id) continue;
        expect(chebyshevDist(cap, scenario.capitalCoord)).toBeGreaterThanOrEqual(5);
      }

      // Plenty of neutral villages exist beyond the tutorial village for full-match expansion
      const neutralVillages = state.tiles.filter((t) => t.hasVillage && t.cityId === null);
      expect(neutralVillages.length).toBeGreaterThanOrEqual(6);
    },
  );

  describe.each<FactionId>(ALL_FACTIONS)('Full 9-step scripted tutorial sequence for %s', (faction) => {
    it.each<MapSize>([16, 18])(
      'initializes 1/4 Star-Crown shard and executes Upgrade -> Move -> Fight Orc on Village -> Capture -> Codex -> Train Warrior -> End Turn legally on %ix%i',
      (mapSize) => {
        const { state: initialState, scenario } = createTutorialGame({
          humanFaction: faction,
          difficulty: 'easy',
          mapSize,
        });

        let state = initialState;
        const human = state.players[0];
        const initialIncome = human.goldPerTurn;
        expect(human.faction).toBe(faction);
        expect(human.isHuman).toBe(true);
        expect(human.gold).toBe(10);
        expect(human.crownShards).toEqual([faction]);

        const capital = getPlayerCities(state, human.id).find((c) => c.isCapital);
        expect(capital).toBeDefined();
        expect({ x: capital!.x, y: capital!.y }).toEqual(scenario.capitalCoord);

        // Verify clean move target tile
        const moveTile = getTile(state, scenario.moveTargetCoord.x, scenario.moveTargetCoord.y)!;
        expect(moveTile.terrain).toBe('plains');
        expect(moveTile.hasVillage).toBe(false);
        expect(moveTile.unitId).toBeNull();
        expect(
          human.revealedTiles[tileIndex(scenario.moveTargetCoord.x, scenario.moveTargetCoord.y, mapSize)],
        ).toBe(true);

        // Verify staged enemy standing directly on top of the neutral village
        expect(scenario.enemyCoord).toEqual(scenario.villageCoord);
        const villageTile = getTile(state, scenario.villageCoord.x, scenario.villageCoord.y)!;
        expect(villageTile.terrain).toBe('plains');
        expect(villageTile.hasVillage).toBe(true);
        expect(villageTile.cityId).toBeNull();
        expect(villageTile.unitId).toBe(scenario.enemyUnitId);
        expect(villageTile.resource).toBeNull();
        expect(
          human.revealedTiles[tileIndex(scenario.villageCoord.x, scenario.villageCoord.y, mapSize)],
        ).toBe(true);

        const enemyUnit = state.units[scenario.enemyUnitId];
        expect(enemyUnit).toBeDefined();
        expect(enemyUnit.ownerId).not.toBe(human.id);
        expect(enemyUnit.hp).toBe(6);

        // Verify both staged resource tiles are legally harvestable on Turn 1 via getTileActionOptions
        for (const resCoord of scenario.resourceCoords) {
          const tile = getTile(state, resCoord.x, resCoord.y)!;
          expect(tile.cityId).toBe(capital!.id);
          const options = getTileActionOptions(state, human.id, resCoord.x, resCoord.y);
          const harvestOpt = options.find((o) => o.action?.type === 'HARVEST_TILE');
          expect(harvestOpt).toBeDefined();
          expect(harvestOpt!.enabled).toBe(true);
        }

        // Step 1a: Harvest first resource tile -> 1/2 population
        const h1 = applyAction(state, {
          type: 'HARVEST_TILE',
          coord: scenario.resourceCoords[0],
        });
        expect(h1.events.some((e) => e.type === 'RESOURCE_HARVESTED')).toBe(true);
        state = h1.state;
        expect(state.cities[capital!.id].level).toBe(1);
        expect(state.cities[capital!.id].population).toBe(1);

        // Step 1b: Harvest second resource tile -> Capital reaches Level 2 with pending reward
        const h2 = applyAction(state, {
          type: 'HARVEST_TILE',
          coord: scenario.resourceCoords[1],
        });
        expect(h2.events.some((e) => e.type === 'RESOURCE_HARVESTED')).toBe(true);
        expect(
          h2.events.some((e) => e.type === 'CITY_LEVELED' && e.cityId === capital!.id && e.newLevel === 2),
        ).toBe(true);
        state = h2.state;
        expect(state.cities[capital!.id].level).toBe(2);
        expect(state.cities[capital!.id].pendingLevelRewards).toEqual([2]);

        // Step 1c: Choose City Reward (Workshop)
        const rewardRes = applyAction(state, {
          type: 'CHOOSE_CITY_REWARD',
          cityId: capital!.id,
          reward: 'workshop',
        });
        expect(rewardRes.events.some((e) => e.type === 'CITY_REWARD_APPLIED')).toBe(true);
        state = rewardRes.state;
        expect(state.cities[capital!.id].hasWorkshop).toBe(true);
        expect(state.cities[capital!.id].pendingLevelRewards).toEqual([]);

        // Step 2: Move starter unit capitalCoord -> moveTargetCoord
        const validMoves = getValidMoves(state, scenario.starterUnitId);
        expect(validMoves).toContainEqual(scenario.moveTargetCoord);

        const moveRes = applyAction(state, {
          type: 'MOVE_UNIT',
          unitId: scenario.starterUnitId,
          to: scenario.moveTargetCoord,
        });
        expect(moveRes.events.some((e) => e.type === 'UNIT_MOVED')).toBe(true);
        state = moveRes.state;
        expect({
          x: state.units[scenario.starterUnitId].x,
          y: state.units[scenario.starterUnitId].y,
        }).toEqual(scenario.moveTargetCoord);

        // Step 3: Fight — ATTACK_UNIT on enemyUnitId standing on villageCoord (1-hit KO)
        const targets = getValidAttackTargets(state, scenario.starterUnitId);
        expect(targets).toContainEqual(scenario.villageCoord);

        const attackRes = applyAction(state, {
          type: 'ATTACK_UNIT',
          attackerId: scenario.starterUnitId,
          defenderId: scenario.enemyUnitId,
        });
        const atkEvent = attackRes.events.find((e) => e.type === 'UNIT_ATTACKED');
        expect(atkEvent).toBeDefined();
        if (atkEvent && atkEvent.type === 'UNIT_ATTACKED') {
          expect(atkEvent.defenderKilled).toBe(true);
          expect(atkEvent.retaliationDamage).toBe(0);
        }
        state = attackRes.state;
        expect(state.units[scenario.enemyUnitId]).toBeUndefined();

        // Tutorial grants immediate capture on the cleared Village (and advances ranged units onto it)
        const starter = state.units[scenario.starterUnitId];
        if (starter.x !== scenario.villageCoord.x || starter.y !== scenario.villageCoord.y) {
          const oldTile = getTile(state, starter.x, starter.y);
          if (oldTile && oldTile.unitId === starter.id) oldTile.unitId = null;
          starter.x = scenario.villageCoord.x;
          starter.y = scenario.villageCoord.y;
          const destTile = getTile(state, scenario.villageCoord.x, scenario.villageCoord.y);
          if (destTile) destTile.unitId = starter.id;
        }
        starter.canCapture = true;
        starter.actedThisTurn = false;
        starter.hasMoved = false;
        starter.hasAttacked = false;
        expect(canUnitCapture(state, scenario.starterUnitId)).toBe(true);

        // Step 4: CAPTURE_CITY on villageCoord
        const captureRes = applyAction(state, {
          type: 'CAPTURE_CITY',
          unitId: scenario.starterUnitId,
        });
        expect(
          captureRes.events.some((e) => e.type === 'CITY_CAPTURED' && e.wasVillage === true),
        ).toBe(true);
        state = captureRes.state;
        expect(getPlayerCities(state, human.id)).toHaveLength(2);

        // Step 5: Deterministic tutorial target tech (affordable Age I root tech) in the Codex
        const targetTech = getFactionTechs(faction).find(
          (t) => t.tier === 1 && canResearchTech(state, human.id, t.id),
        );
        expect(targetTech).toBeDefined();
        expect(targetTech!.tier).toBe(1);

        const techRes = applyAction(state, {
          type: 'RESEARCH_TECH',
          techId: targetTech!.id,
        });
        expect(
          techRes.events.some((e) => e.type === 'TECH_RESEARCHED' && e.techId === targetTech!.id),
        ).toBe(true);
        state = techRes.state;
        expect(state.players[0].techs).toContain(targetTech!.id);

        // Step 7: Train a Warrior at the unoccupied capital (all 4 factions have >= 2★ left!)
        expect(state.players[0].gold).toBeGreaterThanOrEqual(2);
        const capTileAfterCodex = getTile(state, scenario.capitalCoord.x, scenario.capitalCoord.y)!;
        expect(capTileAfterCodex.unitId).toBeNull();

        const trainRes = applyAction(state, {
          type: 'TRAIN_UNIT',
          cityId: capital!.id,
          unitType: 'warrior',
        });
        expect(
          trainRes.events.some(
            (e) => e.type === 'UNIT_TRAINED' && e.cityId === capital!.id && e.unitType === 'warrior',
          ),
        ).toBe(true);
        state = trainRes.state;
        const capTileAfterTrain = getTile(state, scenario.capitalCoord.x, scenario.capitalCoord.y)!;
        expect(capTileAfterTrain.unitId).not.toBeNull();
        expect(state.units[capTileAfterTrain.unitId!].type).toBe('warrior');

        // Step 8: End Turn cycles through rival turns and starts Turn 2 with higher Star income
        const goldBeforeEndTurn = state.players[0].gold;
        const incomeAfterUpgrades = state.players[0].goldPerTurn;
        expect(incomeAfterUpgrades).toBeGreaterThan(initialIncome);

        for (let i = 0; i < state.players.length; i++) {
          const endRes = applyAction(state, { type: 'END_TURN' });
          state = endRes.state;
        }
        expect(state.turn).toBe(2);
        expect(state.players[state.activePlayerIndex].id).toBe(human.id);
        expect(state.players[0].goldPerTurn).toBeGreaterThan(initialIncome);
        expect(state.players[0].gold).toBe(goldBeforeEndTurn + state.players[0].goldPerTurn);
      },
    );
  });
});
