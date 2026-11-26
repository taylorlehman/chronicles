import * as THREE from 'three';
import {
  tileIndex,
  type Coord,
  type GameEvent,
  type GameState,
  type PlayerId,
} from '../game/types';
import { getUnitWorldPosition, TILE_TOP_Y, tileToWorld } from './assets/terrainMesh';
import type { BuiltUnitSprite } from './assets/unitSprite';
import type { BoardRenderer } from './BoardRenderer';
import type { SceneManager } from './SceneManager';
import type { WorldBadges } from './WorldBadges';

interface TweenTask {
  elapsed: number;
  duration: number;
  onUpdate: (t: number) => void;
  onComplete: () => void;
}

interface SharedParticleMatRef {
  mat: THREE.MeshStandardMaterial;
  count: number;
}

interface Particle {
  mesh: THREE.Mesh;
  vel: THREE.Vector3;
  age: number;
  life: number;
  gravity: number;
  spinX: number;
  spinY: number;
  spinZ: number;
  baseScale: number;
  matRef: SharedParticleMatRef;
}

const MAX_FRAME_DT = 0.033;

const particleBoxGeo = new THREE.BoxGeometry(0.11, 0.11, 0.11);
const particleConfettiGeo = new THREE.BoxGeometry(0.15, 0.035, 0.09);
const particleSparkGeo = new THREE.OctahedronGeometry(0.1, 0);
const projectileCoreGeo = new THREE.OctahedronGeometry(0.11, 0);
const projectileHaloGeo = new THREE.OctahedronGeometry(0.19, 1);
const slashGeo = new THREE.TorusGeometry(0.45, 0.045, 4, 14, Math.PI * 0.85);
const glowRingGeo = new THREE.RingGeometry(0.26, 0.44, 32);
glowRingGeo.rotateX(-Math.PI / 2);
const summonPillarGeo = new THREE.CylinderGeometry(0.42, 0.56, 3.6, 16, 1, true);

const CONFETTI_COLORS = ['#facc15', '#38bdf8', '#34d399', '#fb7185', '#fb923c', '#f8fafc'];

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function easeOutSine(t: number): number {
  return Math.sin((t * Math.PI) * 0.5);
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = THREE.MathUtils.clamp((x - edge0) / Math.max(edge1 - edge0, 1e-5), 0, 1);
  return t * t * (3 - 2 * t);
}

export class AnimationQueue {
  private readonly board: BoardRenderer;
  private readonly badges: WorldBadges;
  private readonly sceneManager?: SceneManager;
  private readonly tweens: TweenTask[] = [];
  private readonly particles: Particle[] = [];
  private playing = false;

  constructor(board: BoardRenderer, badges: WorldBadges, sceneManager?: SceneManager) {
    this.board = board;
    this.badges = badges;
    this.sceneManager = sceneManager;
  }

  public isPlaying(): boolean {
    return this.playing;
  }

  public update(rawDt: number): void {
    // Clamp dt <= 33ms so a single slow frame never teleports an animation
    const dt = Math.min(Math.max(rawDt, 0), MAX_FRAME_DT);

    for (let i = this.tweens.length - 1; i >= 0; i--) {
      const task = this.tweens[i];
      task.elapsed += dt;
      const t = Math.min(1, task.elapsed / Math.max(task.duration, 0.001));
      task.onUpdate(t);
      if (t >= 1) {
        this.tweens.splice(i, 1);
        task.onComplete();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.age += dt;
      if (p.age >= p.life) {
        this.board.fxGroup.remove(p.mesh);
        p.matRef.count -= 1;
        if (p.matRef.count <= 0) {
          p.matRef.mat.dispose();
        }
        this.particles.splice(i, 1);
        continue;
      }
      p.vel.y -= p.gravity * dt;
      p.mesh.position.addScaledVector(p.vel, dt);
      p.mesh.rotation.x += p.spinX * dt;
      p.mesh.rotation.y += p.spinY * dt;
      p.mesh.rotation.z += p.spinZ * dt;

      const u = p.age / p.life;
      const scaleFade = 1 - easeInOutQuad(Math.max(0, (u - 0.45) / 0.55));
      p.mesh.scale.setScalar(Math.max(0.01, p.baseScale * scaleFade));
    }
  }

  private runTween(durationSec: number, onUpdate: (t: number) => void): Promise<void> {
    return new Promise((resolve) => {
      this.tweens.push({
        elapsed: 0,
        duration: durationSec,
        onUpdate,
        onComplete: resolve,
      });
    });
  }

  private spawnBurst(
    worldPos: THREE.Vector3,
    count: number,
    color: string,
    opts?: {
      spark?: boolean;
      confetti?: boolean;
      speed?: number;
      gravity?: number;
      life?: number;
      scale?: number;
    },
  ): void {
    const geo = opts?.confetti
      ? particleConfettiGeo
      : opts?.spark
        ? particleSparkGeo
        : particleBoxGeo;
    const mat = new THREE.MeshStandardMaterial({
      color,
      flatShading: true,
      roughness: 0.42,
      emissive: new THREE.Color(color),
      emissiveIntensity: opts?.spark ? 0.65 : opts?.confetti ? 0.35 : 0.15,
    });
    const matRef: SharedParticleMatRef = { mat, count };
    const speed = opts?.speed ?? 2.6;
    const gravity = opts?.gravity ?? 6.5;
    const life = opts?.life ?? 0.55;
    const baseScale = opts?.scale ?? 1.0;

    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(worldPos);
      const angle = (i / Math.max(count, 1)) * Math.PI * 2 + (Math.random() - 0.5) * 0.65;
      const horiz = (0.35 + Math.random() * 0.65) * speed;
      const vy = (0.8 + Math.random() * 0.72) * speed;
      mesh.scale.setScalar(baseScale);
      this.board.fxGroup.add(mesh);
      this.particles.push({
        mesh,
        vel: new THREE.Vector3(Math.cos(angle) * horiz, vy, Math.sin(angle) * horiz),
        age: 0,
        life: life * (0.78 + Math.random() * 0.42),
        gravity,
        spinX: (Math.random() - 0.5) * 11,
        spinY: (Math.random() - 0.5) * 9,
        spinZ: (Math.random() - 0.5) * 8,
        baseScale,
        matRef,
      });
    }
  }

  private spawnConfettiArc(worldPos: THREE.Vector3, countPerColor = 4): void {
    for (const color of CONFETTI_COLORS) {
      this.spawnBurst(worldPos, countPerColor, color, {
        confetti: true,
        speed: 3.1,
        gravity: 5.4,
        life: 0.82,
        scale: 1.05,
      });
    }
  }

  private isCoordVisible(state: GameState, viewerId: PlayerId, coord: Coord): boolean {
    const viewer =
      state.players.find((p) => p.id === viewerId) ??
      state.players.find((p) => p.isHuman);
    if (!viewer) return true;
    const idx = tileIndex(coord.x, coord.y, state.mapSize);
    return Boolean(viewer.revealedTiles[idx]);
  }

  public async playEvents(
    events: GameEvent[],
    stateAfter: GameState,
    viewerPlayerId: PlayerId,
    speedMultiplier = 1,
  ): Promise<void> {
    if (events.length === 0) return;
    this.playing = true;
    const invSpeed = 1 / Math.max(speedMultiplier, 0.25);

    try {
      for (const ev of events) {
        await this.playSingleEvent(ev, stateAfter, viewerPlayerId, invSpeed);
      }
    } finally {
      this.playing = false;
    }
  }

  private async playSingleEvent(
    ev: GameEvent,
    stateAfter: GameState,
    viewerId: PlayerId,
    invSpeed: number,
  ): Promise<void> {
    const mapSize = stateAfter.mapSize;

    switch (ev.type) {
      case 'UNIT_MOVED': {
        const vis =
          this.isCoordVisible(stateAfter, viewerId, ev.from) ||
          this.isCoordVisible(stateAfter, viewerId, ev.to);
        if (!vis) return;
        const unitObj = this.board.getUnitObject(ev.unitId);
        if (!unitObj) return;
        const startPos = unitObj.group.position.clone();
        const endPos = getUnitWorldPosition(stateAfter, ev.to.x, ev.to.y);
        await this.animateHopMove(ev.unitId, unitObj, startPos, endPos, 0.32 * invSpeed);
        return;
      }

      case 'UNIT_ATTACKED': {
        const vis =
          this.isCoordVisible(stateAfter, viewerId, ev.from) ||
          this.isCoordVisible(stateAfter, viewerId, ev.to);
        if (!vis) return;

        const attackerObj = this.board.getUnitObject(ev.attackerId);
        const defenderObj = this.board.getUnitObject(ev.defenderId);
        const fromPos = attackerObj
          ? attackerObj.group.position.clone()
          : getUnitWorldPosition(stateAfter, ev.from.x, ev.from.y);
        const toPos = defenderObj
          ? defenderObj.group.position.clone()
          : getUnitWorldPosition(stateAfter, ev.to.x, ev.to.y);

        const triggerDefenderImpact = (): Promise<void> => {
          this.badges.spawnFloatingText(ev.to, `-${ev.damage}`, 'damage');
          this.spawnBurst(toPos.clone().add(new THREE.Vector3(0, 0.72, 0)), 10, '#f87171', {
            spark: true,
            speed: 2.4,
            life: 0.42,
          });
          if (defenderObj) {
            return this.animateHitRecoil(ev.defenderId, defenderObj, fromPos, toPos, 0.2 * invSpeed);
          }
          return Promise.resolve();
        };

        if (ev.isRanged) {
          await this.animateRangedProjectile(fromPos, toPos, 0.34 * invSpeed);
          await triggerDefenderImpact();
        } else if (attackerObj) {
          await this.animateMeleeLunge(
            ev.attackerId,
            attackerObj,
            fromPos,
            toPos,
            0.34 * invSpeed,
            triggerDefenderImpact,
          );
        } else {
          await triggerDefenderImpact();
        }

        if (ev.defenderKilled && defenderObj) {
          await this.animateDefeat(ev.defenderId, defenderObj, toPos, 0.26 * invSpeed);
        } else if (ev.retaliationDamage > 0 && defenderObj && attackerObj) {
          const triggerAttackerImpact = (): Promise<void> => {
            this.badges.spawnFloatingText(ev.from, `-${ev.retaliationDamage}`, 'damage');
            this.spawnBurst(fromPos.clone().add(new THREE.Vector3(0, 0.72, 0)), 8, '#fb7185', {
              spark: true,
              speed: 2.1,
              life: 0.36,
            });
            return this.animateHitRecoil(ev.attackerId, attackerObj, toPos, fromPos, 0.18 * invSpeed);
          };

          await this.animateMeleeLunge(
            ev.defenderId,
            defenderObj,
            toPos,
            fromPos,
            0.28 * invSpeed,
            triggerAttackerImpact,
          );

          if (ev.attackerKilled) {
            await this.animateDefeat(ev.attackerId, attackerObj, fromPos, 0.26 * invSpeed);
          }
        }

        if (ev.advanced && attackerObj && !ev.attackerKilled) {
          const advanceTarget = getUnitWorldPosition(stateAfter, ev.to.x, ev.to.y);
          await this.animateHopMove(ev.attackerId, attackerObj, fromPos, advanceTarget, 0.28 * invSpeed);
        }
        return;
      }

      case 'TILES_REVEALED': {
        if (ev.playerId !== viewerId || ev.coords.length === 0) return;

        // Swap newly revealed tile geometry underneath BEFORE clouds lift & fade (zero pop-in!)
        this.board.revealTilesUnderClouds(stateAfter, viewerId, ev.coords);

        // Compute reveal centroid so clouds drift smoothly outward like parting mist
        let cx = 0;
        let cz = 0;
        let validCount = 0;
        for (const c of ev.coords) {
          const cloud = this.board.getCloudObject(c.x, c.y);
          if (!cloud) continue;
          cx += cloud.group.position.x;
          cz += cloud.group.position.z;
          validCount += 1;
        }
        if (validCount === 0) return;
        cx /= validCount;
        cz /= validCount;

        const animations: Promise<void>[] = [];
        for (const c of ev.coords) {
          const cloud = this.board.getCloudObject(c.x, c.y);
          if (!cloud) continue;

          this.board.markCloudAnimating(c.x, c.y, true);

          // Clone puff materials per cloud so opacity fades smoothly to 0 without affecting other clouds
          const clonedMats: THREE.MeshStandardMaterial[] = [];
          cloud.group.traverse((obj) => {
            if (obj instanceof THREE.Mesh && obj.material instanceof THREE.MeshStandardMaterial) {
              const clone = obj.material.clone();
              clone.transparent = true;
              clone.opacity = 1;
              clone.depthWrite = false;
              obj.material = clone;
              clonedMats.push(clone);
            }
          });
          cloud.group.userData.clonedMats = clonedMats;

          const startX = cloud.group.position.x;
          const startY = cloud.group.position.y;
          const startZ = cloud.group.position.z;

          let dx = startX - cx;
          let dz = startZ - cz;
          const dist = Math.hypot(dx, dz);
          if (dist > 0.05) {
            dx = (dx / dist) * 0.42;
            dz = (dz / dist) * 0.42;
          } else {
            dx = Math.cos(cloud.phase) * 0.34;
            dz = Math.sin(cloud.phase) * 0.34;
          }

          animations.push(
            this.runTween(0.36 * invSpeed, (t) => {
              const e = easeOutCubic(t);
              cloud.group.position.x = startX + dx * e;
              cloud.group.position.y = startY + e * 0.72;
              cloud.group.position.z = startZ + dz * e;
              cloud.group.scale.setScalar(1 + e * 0.32);

              const alpha = Math.max(0, 1 - e);
              for (const m of clonedMats) {
                m.opacity = alpha;
              }
            }).then(() => {
              this.board.removeCloudImmediate(c.x, c.y);
            }),
          );
        }
        if (animations.length > 0) {
          await Promise.all(animations);
        }
        return;
      }

      case 'RESOURCE_HARVESTED': {
        if (!this.isCoordVisible(stateAfter, viewerId, ev.coord)) return;
        const pos = tileToWorld(ev.coord.x, ev.coord.y, mapSize, TILE_TOP_Y + 0.35);
        this.spawnBurst(pos, 12, '#facc15', { spark: true, speed: 2.6, life: 0.5 });
        this.badges.spawnFloatingText(ev.coord, `+${ev.popGained} Pop`, 'pop');
        return;
      }

      case 'IMPROVEMENT_BUILT':
      case 'WOODS_PLANTED': {
        if (!this.isCoordVisible(stateAfter, viewerId, ev.coord)) return;
        const pos = tileToWorld(ev.coord.x, ev.coord.y, mapSize, TILE_TOP_Y + 0.35);
        this.spawnBurst(pos, 10, '#34d399', { spark: true, speed: 2.4, life: 0.5 });
        if (ev.popGained > 0) {
          this.badges.spawnFloatingText(ev.coord, `+${ev.popGained} Pop`, 'pop');
        }
        return;
      }

      case 'FOREST_CHOPPED': {
        if (!this.isCoordVisible(stateAfter, viewerId, ev.coord)) return;
        const pos = tileToWorld(ev.coord.x, ev.coord.y, mapSize, TILE_TOP_Y + 0.3);
        this.spawnBurst(pos, 10, '#d97706', { speed: 2.2, life: 0.45 });
        this.badges.spawnFloatingText(ev.coord, `+${ev.goldGained}★`, 'gold');
        return;
      }

      case 'RUINS_CLAIMED': {
        if (!this.isCoordVisible(stateAfter, viewerId, ev.coord)) return;
        const pos = tileToWorld(ev.coord.x, ev.coord.y, mapSize, TILE_TOP_Y + 0.4);
        this.spawnBurst(pos, 16, '#38bdf8', { spark: true, speed: 3.0, life: 0.65 });
        const label =
          ev.rewardKind === 'gold'
            ? `+${ev.amount ?? 5}★ Ruins!`
            : ev.rewardKind === 'tech'
              ? 'Ancient Tech!'
              : `+${ev.amount ?? 3} Pop!`;
        this.badges.spawnFloatingText(ev.coord, label, 'level');
        await this.animateRisingPulseRing(pos, '#38bdf8', 0.38 * invSpeed);
        return;
      }

      case 'CITY_LEVELED': {
        if (!this.isCoordVisible(stateAfter, viewerId, ev.coord)) return;
        const pos = tileToWorld(ev.coord.x, ev.coord.y, mapSize, TILE_TOP_Y + 0.18);
        this.badges.spawnFloatingText(ev.coord, `LEVEL ${ev.newLevel}!`, 'level');
        this.spawnConfettiArc(pos.clone().add(new THREE.Vector3(0, 0.52, 0)), 4);
        await this.animateRisingPulseRing(pos, '#facc15', 0.48 * invSpeed);
        return;
      }

      case 'CITY_CAPTURED': {
        if (!this.isCoordVisible(stateAfter, viewerId, ev.coord)) return;
        const pos = tileToWorld(ev.coord.x, ev.coord.y, mapSize, TILE_TOP_Y + 0.22);
        this.badges.spawnFloatingText(
          ev.coord,
          ev.wasVillage ? 'Village Claimed!' : 'City Captured!',
          'level',
        );
        this.spawnConfettiArc(pos.clone().add(new THREE.Vector3(0, 0.48, 0)), 4);
        await this.animateRisingPulseRing(pos, '#fbbf24', 0.48 * invSpeed);
        return;
      }

      case 'UNIT_HEALED': {
        if (!this.isCoordVisible(stateAfter, viewerId, ev.coord)) return;
        const pos = getUnitWorldPosition(stateAfter, ev.coord.x, ev.coord.y).add(
          new THREE.Vector3(0, 0.4, 0),
        );
        this.spawnBurst(pos, 8, '#4ade80', { spark: true, speed: 1.8, life: 0.45 });
        this.badges.spawnFloatingText(ev.coord, `+${ev.amount} HP`, 'heal');
        return;
      }

      case 'UNIT_PROMOTED': {
        if (!this.isCoordVisible(stateAfter, viewerId, ev.coord)) return;
        const pos = getUnitWorldPosition(stateAfter, ev.coord.x, ev.coord.y).add(
          new THREE.Vector3(0, 0.25, 0),
        );
        // Joyful promotion: gold sparks, a confetti arc, a double rising ring and a camera bump.
        this.spawnBurst(pos, 22, '#fde047', { spark: true, speed: 3.2, life: 0.75 });
        this.spawnBurst(pos.clone().add(new THREE.Vector3(0, 0.45, 0)), 12, '#ffffff', {
          spark: true,
          speed: 2.2,
          life: 0.55,
        });
        this.spawnConfettiArc(pos.clone().add(new THREE.Vector3(0, 0.6, 0)), 5);
        this.badges.spawnFloatingText(ev.coord, '★ VETERAN! ★', 'level');
        this.sceneManager?.shakeCamera(0.12, 0.25);
        await this.animateRisingPulseRing(pos, '#fde047', 0.38 * invSpeed);
        await this.animateRisingPulseRing(pos, '#fff7c2', 0.3 * invSpeed);
        return;
      }

      case 'UNIT_TRAINED': {
        if (!this.isCoordVisible(stateAfter, viewerId, ev.coord)) return;
        const pos = getUnitWorldPosition(stateAfter, ev.coord.x, ev.coord.y).add(
          new THREE.Vector3(0, 0.2, 0),
        );
        this.spawnBurst(pos, 8, '#e2e8f0', { speed: 1.8, life: 0.4 });
        return;
      }

      case 'SPOILS_GAINED': {
        if (!this.isCoordVisible(stateAfter, viewerId, ev.coord)) return;
        this.badges.spawnFloatingText(ev.coord, `+${ev.amount}★`, 'gold');
        return;
      }

      case 'SUPERPOWER_USED': {
        await this.playSuperpowerEvent(ev, stateAfter, viewerId, invSpeed);
        return;
      }

      default:
        return;
    }
  }

  /**
   * Silky-smooth 320ms unit hop-arc:
   * - easeInOutCubic XZ glide
   * - sin(t * PI) parabolic hop height (0.42 peak)
   * - Continuous, fluid mid-air stretch (1 + 0.12 * sin(t * PI)) with zero phase snaps
   * - Gentle 60ms damped landing cushion
   */
  private async animateHopMove(
    unitId: string,
    unitObj: BuiltUnitSprite,
    start: THREE.Vector3,
    end: THREE.Vector3,
    duration: number,
  ): Promise<void> {
    const { group, sprite, shadowDisc, baseScaleX, baseScaleY } = unitObj;
    const baseShadowX = shadowDisc.scale.x;
    const baseShadowY = shadowDisc.scale.y;
    const baseShadowZ = shadowDisc.scale.z;
    const cushionDuration = Math.min(0.06, duration * 0.22);

    this.board.markUnitAnimating(unitId, true);
    try {
      await this.runTween(duration, (t) => {
        const e = easeInOutCubic(t);
        const arc = Math.sin(t * Math.PI);

        group.position.x = THREE.MathUtils.lerp(start.x, end.x, e);
        group.position.z = THREE.MathUtils.lerp(start.z, end.z, e);
        group.position.y = THREE.MathUtils.lerp(start.y, end.y, e) + arc * 0.42;

        // Ground contact shadow softens smoothly as the character hops
        const shadowShrink = 1 - arc * 0.24;
        shadowDisc.scale.set(
          baseShadowX * shadowShrink,
          baseShadowY * shadowShrink,
          baseShadowZ * shadowShrink,
        );

        // Smooth continuous stretch mid-air (1.0 -> 1.12 -> 1.0, area-preserving X)
        const sy = 1 + 0.12 * arc;
        const sx = 1 / Math.sqrt(sy);
        sprite.scale.set(baseScaleX * sx, baseScaleY * sy, 1);

        // Keep unit HP badge tracking smoothly with the character
        this.badges.setUnitOverrideWorldPos(unitId, group.position);
      });

      group.position.copy(end);
      shadowDisc.scale.set(baseShadowX, baseShadowY, baseShadowZ);
      this.badges.setUnitOverrideWorldPos(unitId, end);

      // Gentle 60ms damped landing cushion (continuous at k=0 and k=1 -> 0 pops)
      await this.runTween(cushionDuration, (k) => {
        const cushion = Math.sin(k * Math.PI) * (1 - k * 0.28);
        const sy = 1 - 0.08 * cushion;
        const sx = 1 + 0.07 * cushion;
        sprite.scale.set(baseScaleX * sx, baseScaleY * sy, 1);
      });

      sprite.scale.set(baseScaleX, baseScaleY, 1);
    } finally {
      // Leave unitWorldPosOverrides at `end` so the HP pill stays anchored during any
      // subsequent TILES_REVEALED animation; WorldBadges.syncState clears overrides on sync.
      this.board.markUnitAnimating(unitId, false);
    }
  }

  /**
   * Silky 340ms melee attack:
   * - 0..0.18: smooth anticipation pullback
   * - 0.18..0.48: fast eased lunge forward
   * - 0.48: crisp impact callback (slash arc, damage popup, spark burst, defender recoil spring)
   * - 0.48..1.0: smooth eased return
   */
  private async animateMeleeLunge(
    unitId: string,
    unitObj: BuiltUnitSprite,
    from: THREE.Vector3,
    to: THREE.Vector3,
    duration: number,
    onImpact?: () => Promise<void>,
  ): Promise<void> {
    const { group, sprite, spriteMat, baseScaleX, baseScaleY } = unitObj;
    const dir = new THREE.Vector3().subVectors(to, from);
    if (dir.lengthSq() > 0.0001) {
      dir.normalize();
    } else {
      dir.set(1, 0, 0);
    }

    const pullbackOffset = -0.16;
    const lungeOffset = 0.56;
    const tiltDir = dir.x >= 0 ? -1 : 1;

    const slashMat = new THREE.MeshBasicMaterial({
      color: '#fef08a',
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const slash = new THREE.Mesh(slashGeo, slashMat);
    slash.position.copy(from).addScaledVector(dir, 0.68);
    slash.position.y = Math.max(from.y, to.y) + 0.76;
    slash.rotation.x = Math.PI / 2;
    slash.rotation.z = Math.atan2(dir.x, dir.z);
    slash.renderOrder = 29;
    slash.visible = false;
    this.board.fxGroup.add(slash);

    let impactFired = false;
    let impactPromise: Promise<void> | null = null;

    this.board.markUnitAnimating(unitId, true);
    try {
      await this.runTween(duration, (t) => {
        let offset = 0;
        let sx = 1;
        let sy = 1;
        let rot = 0;

        if (t < 0.18) {
          // Anticipation pullback
          const p = easeOutSine(t / 0.18);
          offset = pullbackOffset * p;
          sx = 1 + 0.06 * p;
          sy = 1 - 0.06 * p;
          rot = -tiltDir * 0.08 * p;
        } else if (t < 0.48) {
          // Fast eased strike lunge
          const p = easeInOutCubic((t - 0.18) / 0.30);
          offset = THREE.MathUtils.lerp(pullbackOffset, lungeOffset, p);
          sx = THREE.MathUtils.lerp(1.06, 1.12, p);
          sy = THREE.MathUtils.lerp(0.94, 0.92, p);
          rot = THREE.MathUtils.lerp(-tiltDir * 0.08, tiltDir * 0.15, p);
        } else {
          // Impact moment + smooth eased return
          if (!impactFired) {
            impactFired = true;
            slash.visible = true;
            if (onImpact) {
              impactPromise = onImpact();
            }
          }
          const p = easeInOutCubic((t - 0.48) / 0.52);
          offset = THREE.MathUtils.lerp(lungeOffset, 0, p);
          sx = THREE.MathUtils.lerp(1.12, 1.0, p);
          sy = THREE.MathUtils.lerp(0.92, 1.0, p);
          rot = THREE.MathUtils.lerp(tiltDir * 0.15, 0, p);

          const slashT = (t - 0.48) / 0.52;
          slash.scale.setScalar(0.68 + easeOutCubic(slashT) * 0.78);
          slashMat.opacity = Math.max(0, 0.92 * (1 - easeInOutQuad(slashT)));
        }

        group.position.copy(from).addScaledVector(dir, offset);
        sprite.scale.set(baseScaleX * sx, baseScaleY * sy, 1);
        spriteMat.rotation = rot;
        this.badges.setUnitOverrideWorldPos(unitId, group.position);
      });

      if (!impactFired && onImpact) {
        impactPromise = onImpact();
      }
      if (impactPromise) {
        await impactPromise;
      }
    } finally {
      this.board.fxGroup.remove(slash);
      slashMat.dispose();
      group.position.copy(from);
      sprite.scale.set(baseScaleX, baseScaleY, 1);
      spriteMat.rotation = 0;
      this.badges.clearUnitOverrideWorldPos(unitId);
      this.board.markUnitAnimating(unitId, false);
    }
  }

  /**
   * Silky 340ms ranged projectile:
   * - High parabolic arc with glowing core + soft translucent halo
   * - Smooth scale-in and scale-out + crisp impact flash
   */
  private async animateRangedProjectile(
    from: THREE.Vector3,
    to: THREE.Vector3,
    duration: number,
  ): Promise<void> {
    const coreMat = new THREE.MeshBasicMaterial({
      color: '#fef08a',
      transparent: true,
      opacity: 1,
    });
    const haloMat = new THREE.MeshBasicMaterial({
      color: '#f59e0b',
      transparent: true,
      opacity: 0.48,
      depthWrite: false,
    });

    const projGroup = new THREE.Group();
    const core = new THREE.Mesh(projectileCoreGeo, coreMat);
    const halo = new THREE.Mesh(projectileHaloGeo, haloMat);
    core.renderOrder = 29;
    halo.renderOrder = 28;
    projGroup.add(core, halo);
    this.board.fxGroup.add(projGroup);

    const start = from.clone().add(new THREE.Vector3(0, 0.92, 0));
    const end = to.clone().add(new THREE.Vector3(0, 0.76, 0));
    const arcHeight = Math.min(2.35, 0.95 + start.distanceTo(end) * 0.24);

    try {
      await this.runTween(duration, (t) => {
        const horiz = easeInOutQuad(t);
        projGroup.position.lerpVectors(start, end, horiz);
        projGroup.position.y += Math.sin(t * Math.PI) * arcHeight;

        const scaleIn = smoothstep(0, 0.14, t);
        const scaleOut = 1 - smoothstep(0.86, 1.0, t) * 0.45;
        const s = Math.max(0.08, scaleIn * scaleOut);
        projGroup.scale.setScalar(s);

        core.rotation.y = t * Math.PI * 5;
        core.rotation.x = t * Math.PI * 3;
        halo.scale.setScalar(1.0 + Math.sin(t * Math.PI * 4) * 0.16);
      });

      // Crisp golden impact spark burst at target
      this.spawnBurst(end, 6, '#fde047', { spark: true, speed: 2.0, life: 0.32, scale: 0.85 });
    } finally {
      this.board.fxGroup.remove(projGroup);
      coreMat.dispose();
      haloMat.dispose();
    }
  }

  /**
   * Crisp impact hit-flash + damped spring recoil on defender.
   */
  private async animateHitRecoil(
    unitId: string,
    target: BuiltUnitSprite,
    from: THREE.Vector3,
    to: THREE.Vector3,
    duration: number,
  ): Promise<void> {
    const dir = new THREE.Vector3().subVectors(to, from);
    if (dir.lengthSq() > 0.0001) {
      dir.normalize();
    } else {
      dir.set(1, 0, 0);
    }
    const base = target.group.position.clone();
    const recoilPos = base.clone().addScaledVector(dir, 0.24);

    this.board.markUnitAnimating(unitId, true);
    target.setHitFlash(true, '#ffffff');

    try {
      await this.runTween(duration, (t) => {
        // Fast damped spring recoil: peaks briskly around t=0.35 and settles smoothly to 0
        const spring = Math.sin(t * Math.PI) * Math.exp(-t * 1.15) * 1.38;
        const k = Math.min(1, Math.max(0, spring));
        target.group.position.lerpVectors(base, recoilPos, k);

        if (t > 0.4) {
          target.setHitFlash(true, '#ff4d4d');
        }

        const sx = 1 + 0.14 * k;
        const sy = 1 - 0.12 * k;
        target.sprite.scale.set(target.baseScaleX * sx, target.baseScaleY * sy, 1);
        target.flashSprite.scale.copy(target.sprite.scale);
      });
    } finally {
      target.group.position.copy(base);
      target.sprite.scale.set(target.baseScaleX, target.baseScaleY, 1);
      target.flashSprite.scale.set(target.baseScaleX, target.baseScaleY, 1);
      target.setHitFlash(false);
      this.board.markUnitAnimating(unitId, false);
    }
  }

  private async animateDefeat(
    unitId: string,
    unitObj: BuiltUnitSprite,
    worldPos: THREE.Vector3,
    duration: number,
  ): Promise<void> {
    const { group, sprite, spriteMat, baseScaleX, baseScaleY } = unitObj;
    this.board.markUnitAnimating(unitId, true);
    this.badges.hideUnitBadge(unitId);
    this.spawnBurst(worldPos.clone().add(new THREE.Vector3(0, 0.42, 0)), 14, '#e2e8f0', {
      speed: 2.9,
      life: 0.52,
    });
    try {
      await this.runTween(duration, (t) => {
        const e = easeOutCubic(t);
        const s = Math.max(0.01, 1 - e);
        sprite.scale.set(baseScaleX * s, baseScaleY * s, 1);
        spriteMat.rotation = e * 1.15;
        spriteMat.opacity = Math.max(0, 1 - e);
        group.scale.setScalar(s);
      });
      group.visible = false;
      spriteMat.rotation = 0;
    } finally {
      this.board.markUnitAnimating(unitId, false);
    }
  }

  /**
   * Silky 480ms rising double pulse ring for City Capture / Level-Up & promotions.
   */
  private async animateRisingPulseRing(
    worldPos: THREE.Vector3,
    color: string,
    duration: number,
  ): Promise<void> {
    const outerMat = new THREE.MeshBasicMaterial({
      color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
    });
    const innerMat = new THREE.MeshBasicMaterial({
      color: '#ffffff',
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
    });

    const outerRing = new THREE.Mesh(glowRingGeo, outerMat);
    outerRing.position.copy(worldPos);
    outerRing.renderOrder = 30;
    this.board.fxGroup.add(outerRing);

    const innerRing = new THREE.Mesh(glowRingGeo, innerMat);
    innerRing.position.copy(worldPos);
    innerRing.renderOrder = 30;
    this.board.fxGroup.add(innerRing);

    const baseY = worldPos.y;
    try {
      await this.runTween(duration, (t) => {
        const e = easeOutCubic(t);
        outerRing.scale.setScalar(0.75 + e * 3.55);
        outerRing.position.y = baseY + e * 0.56;
        outerMat.opacity = Math.max(0, 0.92 * (1 - easeInOutQuad(t)));

        const t2 = THREE.MathUtils.clamp((t - 0.12) / 0.88, 0, 1);
        const e2 = easeOutCubic(t2);
        innerRing.scale.setScalar(0.55 + e2 * 2.65);
        innerRing.position.y = baseY + e2 * 0.78;
        innerMat.opacity = t < 0.12 ? 0 : Math.max(0, 0.75 * (1 - easeInOutQuad(t2)));
      });
    } finally {
      this.board.fxGroup.remove(outerRing, innerRing);
      outerMat.dispose();
      innerMat.dispose();
    }
  }

  /**
   * Punchy 500-700ms 3D spectacle for Age III Faction Superpowers.
   */
  private async playSuperpowerEvent(
    ev: Extract<GameEvent, { type: 'SUPERPOWER_USED' }>,
    stateAfter: GameState,
    viewerId: PlayerId,
    invSpeed: number,
  ): Promise<void> {
    const mapSize = stateAfter.mapSize;

    // Resolve focal coordinate (explicit target, affected tile, owner's capital, or board center)
    const ownerCities = Object.values(stateAfter.cities).filter((c) => c.ownerId === ev.playerId);
    const ownerCapital = ownerCities.find((c) => c.isCapital) ?? ownerCities[0];
    const viewerCities = Object.values(stateAfter.cities).filter((c) => c.ownerId === viewerId);
    const viewerCapital = viewerCities.find((c) => c.isCapital) ?? viewerCities[0];

    const focalCoord: Coord =
      ev.target ??
      ev.affectedCoords?.[0] ??
      (ownerCapital ? { x: ownerCapital.x, y: ownerCapital.y } : null) ??
      (viewerCapital ? { x: viewerCapital.x, y: viewerCapital.y } : null) ?? {
        x: Math.floor(mapSize / 2),
        y: Math.floor(mapSize / 2),
      };

    switch (ev.faction) {
      case 'elves': {
        // Global realm-wide Starlit Eclipse: shift lighting immediately + expanding starlight shockwave
        this.sceneManager?.setEclipseMode(true);
        const textCoord = this.isCoordVisible(stateAfter, viewerId, focalCoord)
          ? focalCoord
          : viewerCapital
            ? { x: viewerCapital.x, y: viewerCapital.y }
            : focalCoord;
        const pos = tileToWorld(textCoord.x, textCoord.y, mapSize, TILE_TOP_Y + 0.24);
        this.badges.spawnFloatingText(textCoord, 'STARLIT ECLIPSE!', 'level');
        this.spawnBurst(pos.clone().add(new THREE.Vector3(0, 0.5, 0)), 18, '#c7d2fe', {
          spark: true,
          speed: 3.4,
          gravity: 2.6,
          life: 0.72,
          scale: 1.15,
        });
        this.spawnBurst(pos.clone().add(new THREE.Vector3(0, 0.35, 0)), 12, '#818cf8', {
          spark: true,
          speed: 2.8,
          gravity: 2.2,
          life: 0.65,
        });
        await this.animateStarlightShockwave(pos, 0.64 * invSpeed);
        return;
      }

      case 'orcs': {
        const coords = ev.affectedCoords && ev.affectedCoords.length > 0 ? ev.affectedCoords : [focalCoord];
        const visibleCoords = coords.filter((c) => this.isCoordVisible(stateAfter, viewerId, c));
        if (visibleCoords.length === 0 && ev.playerId !== viewerId) return;

        const centerCoord = ev.target ?? visibleCoords[0] ?? focalCoord;
        const centerPos = tileToWorld(centerCoord.x, centerCoord.y, mapSize, TILE_TOP_Y + 0.2);
        this.sceneManager?.focusOnWorld(centerPos);
        this.sceneManager?.shakeCamera(0.55, 0.56 * invSpeed);
        this.badges.spawnFloatingText(centerCoord, 'VOLCANIC CATACLYSM!', 'damage');

        const ringAnims: Promise<void>[] = [];
        for (const c of visibleCoords.length > 0 ? visibleCoords : coords) {
          const p = tileToWorld(c.x, c.y, mapSize, TILE_TOP_Y + 0.22);
          this.spawnBurst(p.clone().add(new THREE.Vector3(0, 0.28, 0)), 10, '#ff5a1f', {
            spark: true,
            speed: 3.4,
            gravity: 5.8,
            life: 0.62,
            scale: 1.15,
          });
          this.spawnBurst(p.clone().add(new THREE.Vector3(0, 0.18, 0)), 6, '#facc15', {
            spark: true,
            speed: 2.6,
            gravity: 4.5,
            life: 0.5,
          });
          ringAnims.push(this.animateRisingPulseRing(p, '#ff5a1f', 0.58 * invSpeed));
        }
        await Promise.all(ringAnims);
        return;
      }

      case 'dwarves': {
        if (!this.isCoordVisible(stateAfter, viewerId, focalCoord) && ev.playerId !== viewerId) {
          return;
        }
        const pos = tileToWorld(focalCoord.x, focalCoord.y, mapSize, TILE_TOP_Y + 0.18);
        this.sceneManager?.focusOnWorld(pos);
        this.badges.spawnFloatingText(focalCoord, 'FIRE DRAKE AWAKENED!', 'level');
        this.spawnBurst(pos.clone().add(new THREE.Vector3(0, 0.65, 0)), 18, '#ff5a1f', {
          spark: true,
          speed: 3.5,
          gravity: 4.2,
          life: 0.68,
          scale: 1.2,
        });
        this.spawnBurst(pos.clone().add(new THREE.Vector3(0, 0.5, 0)), 14, '#facc15', {
          spark: true,
          speed: 2.8,
          gravity: 3.6,
          life: 0.62,
        });
        await this.animateSummonPillar(pos, '#ef4444', '#facc15', 0.62 * invSpeed);
        return;
      }

      case 'humans': {
        if (!this.isCoordVisible(stateAfter, viewerId, focalCoord) && ev.playerId !== viewerId) {
          return;
        }
        const pos = tileToWorld(focalCoord.x, focalCoord.y, mapSize, TILE_TOP_Y + 0.18);
        this.sceneManager?.focusOnWorld(pos);
        this.badges.spawnFloatingText(focalCoord, 'WATCHTOWER RAISED!', 'level');
        this.spawnBurst(pos.clone().add(new THREE.Vector3(0, 0.55, 0)), 16, '#f5c542', {
          spark: true,
          speed: 3.0,
          gravity: 4.4,
          life: 0.62,
          scale: 1.1,
        });
        this.spawnBurst(pos.clone().add(new THREE.Vector3(0, 0.45, 0)), 10, '#93c5fd', {
          spark: true,
          speed: 2.4,
          gravity: 3.8,
          life: 0.55,
        });
        await this.animateSummonPillar(pos, '#f5c542', '#93c5fd', 0.60 * invSpeed);
        return;
      }
    }
  }

  /**
   * Wide expanding silver-indigo starlight shockwave for Elves' Starlit Eclipse.
   */
  private async animateStarlightShockwave(
    worldPos: THREE.Vector3,
    duration: number,
  ): Promise<void> {
    const outerMat = new THREE.MeshBasicMaterial({
      color: '#818cf8',
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
    });
    const innerMat = new THREE.MeshBasicMaterial({
      color: '#e0e7ff',
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    const outerRing = new THREE.Mesh(glowRingGeo, outerMat);
    outerRing.position.copy(worldPos);
    outerRing.renderOrder = 36;
    this.board.fxGroup.add(outerRing);

    const innerRing = new THREE.Mesh(glowRingGeo, innerMat);
    innerRing.position.copy(worldPos);
    innerRing.renderOrder = 36;
    this.board.fxGroup.add(innerRing);

    const baseY = worldPos.y;
    try {
      await this.runTween(duration, (t) => {
        const e = easeOutCubic(t);
        outerRing.scale.setScalar(1.0 + e * 14.0);
        outerRing.position.y = baseY + e * 0.45;
        outerMat.opacity = Math.max(0, 0.92 * (1 - easeInOutQuad(t)));

        const t2 = THREE.MathUtils.clamp((t - 0.1) / 0.9, 0, 1);
        const e2 = easeOutCubic(t2);
        innerRing.scale.setScalar(0.8 + e2 * 10.5);
        innerRing.position.y = baseY + e2 * 0.65;
        innerMat.opacity = t < 0.1 ? 0 : Math.max(0, 0.85 * (1 - easeInOutQuad(t2)));
      });
    } finally {
      this.board.fxGroup.remove(outerRing, innerRing);
      outerMat.dispose();
      innerMat.dispose();
    }
  }

  /**
   * Rising translucent light pillar + expanding base ring for Fire Drake & Watchtower summons.
   */
  private async animateSummonPillar(
    worldPos: THREE.Vector3,
    primaryColor: string,
    accentColor: string,
    duration: number,
  ): Promise<void> {
    const pillarMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const ringMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.94,
      depthWrite: false,
    });

    const pillar = new THREE.Mesh(summonPillarGeo, pillarMat);
    pillar.position.set(worldPos.x, worldPos.y + 1.8, worldPos.z);
    pillar.renderOrder = 35;
    this.board.fxGroup.add(pillar);

    const ring = new THREE.Mesh(glowRingGeo, ringMat);
    ring.position.copy(worldPos);
    ring.renderOrder = 36;
    this.board.fxGroup.add(ring);

    const baseY = worldPos.y;
    try {
      await this.runTween(duration, (t) => {
        const e = easeOutCubic(t);
        const pillarFade = t < 0.25 ? t / 0.25 : 1 - easeInOutQuad((t - 0.25) / 0.75);
        const radiusScale = 0.75 + e * 0.85;
        pillar.scale.set(radiusScale, 0.4 + e * 1.15, radiusScale);
        pillar.position.y = baseY + (0.4 + e * 1.15) * 1.5;
        pillarMat.opacity = Math.max(0, 0.68 * pillarFade);

        ring.scale.setScalar(0.8 + e * 4.4);
        ring.position.y = baseY + e * 0.48;
        ringMat.opacity = Math.max(0, 0.94 * (1 - easeInOutQuad(t)));
      });
    } finally {
      this.board.fxGroup.remove(pillar, ring);
      pillarMat.dispose();
      ringMat.dispose();
    }
  }
}
