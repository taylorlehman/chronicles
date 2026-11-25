import * as THREE from 'three';
import type { Coord } from '../game/types';
import type { BoardRenderer } from './BoardRenderer';
import type { SceneManager } from './SceneManager';

export interface InputCallbacks {
  onTileClick: (coord: Coord) => void;
  onTileHover: (coord: Coord | null) => void;
  onEndTurnHotkey?: () => void;
  onDeselectHotkey?: () => void;
}

interface ActivePointer {
  x: number;
  y: number;
  startX: number;
  startY: number;
  pointerType: string;
  button: number;
}

const MOUSE_DRAG_THRESHOLD_PX = 6;
const TOUCH_DRAG_THRESHOLD_PX = 10;

export class InputController {
  private readonly sceneManager: SceneManager;
  private readonly board: BoardRenderer;
  private readonly callbacks: InputCallbacks;
  private readonly domElement: HTMLCanvasElement;

  private readonly raycaster = new THREE.Raycaster();
  private readonly pointerNdc = new THREE.Vector2();
  private readonly keysDown = new Set<string>();
  private readonly activePointers = new Map<number, ActivePointer>();

  private inputLocked = false;
  private isDragging = false;
  private gestureWasMultiTouch = false;
  private lastPinchDistance: number | null = null;
  private lastPinchMidX = 0;
  private lastPinchMidY = 0;
  private lastHoveredKey: string | null = null;

  private readonly onPointerDownBound: (e: PointerEvent) => void;
  private readonly onPointerMoveBound: (e: PointerEvent) => void;
  private readonly onPointerUpBound: (e: PointerEvent) => void;
  private readonly onPointerCancelBound: (e: PointerEvent) => void;
  private readonly onWheelBound: (e: WheelEvent) => void;
  private readonly onContextMenuBound: (e: MouseEvent) => void;
  private readonly onKeyDownBound: (e: KeyboardEvent) => void;
  private readonly onKeyUpBound: (e: KeyboardEvent) => void;

  constructor(
    sceneManager: SceneManager,
    board: BoardRenderer,
    callbacks: InputCallbacks,
  ) {
    this.sceneManager = sceneManager;
    this.board = board;
    this.callbacks = callbacks;
    this.domElement = sceneManager.getDomElement();
    this.domElement.style.touchAction = 'none';

    this.onPointerDownBound = (e) => this.handlePointerDown(e);
    this.onPointerMoveBound = (e) => this.handlePointerMove(e);
    this.onPointerUpBound = (e) => this.handlePointerUp(e, false);
    this.onPointerCancelBound = (e) => this.handlePointerUp(e, true);
    this.onWheelBound = (e) => this.handleWheel(e);
    this.onContextMenuBound = (e) => e.preventDefault();
    this.onKeyDownBound = (e) => this.handleKeyDown(e);
    this.onKeyUpBound = (e) => this.handleKeyUp(e);

    this.domElement.addEventListener('pointerdown', this.onPointerDownBound);
    window.addEventListener('pointermove', this.onPointerMoveBound);
    window.addEventListener('pointerup', this.onPointerUpBound);
    window.addEventListener('pointercancel', this.onPointerCancelBound);
    this.domElement.addEventListener('wheel', this.onWheelBound, { passive: false });
    this.domElement.addEventListener('contextmenu', this.onContextMenuBound);
    window.addEventListener('keydown', this.onKeyDownBound);
    window.addEventListener('keyup', this.onKeyUpBound);
  }

  public setInputLocked(locked: boolean): void {
    this.inputLocked = locked;
  }

  public update(rawDt: number): void {
    const dt = Math.min(Math.max(rawDt, 0), 0.033);
    let right = 0;
    let forward = 0;
    if (this.keysDown.has('KeyA') || this.keysDown.has('ArrowLeft')) right -= 1;
    if (this.keysDown.has('KeyD') || this.keysDown.has('ArrowRight')) right += 1;
    if (this.keysDown.has('KeyW') || this.keysDown.has('ArrowUp')) forward += 1;
    if (this.keysDown.has('KeyS') || this.keysDown.has('ArrowDown')) forward -= 1;
    if (right !== 0 || forward !== 0) {
      this.sceneManager.panByAxes(right, forward, dt);
    }
  }

  private raycastTile(clientX: number, clientY: number): Coord | null {
    const rect = this.domElement.getBoundingClientRect();
    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      return null;
    }
    this.pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.pointerNdc, this.sceneManager.camera);

    // Check 3D unit hit volumes first so tall/elevated units (on cities, villages, mountains, forests)
    // resolve cleanly to their own tile on mouse & mobile taps.
    const unitHits = this.raycaster.intersectObjects(this.board.getUnitHitMeshes(), false);
    if (unitHits.length > 0) {
      const data = unitHits[0].object.userData;
      if (typeof data.tileX === 'number' && typeof data.tileY === 'number') {
        return { x: data.tileX, y: data.tileY };
      }
    }

    // Check elevated blue move rings next so tapping a move target on a mountain, city, or resource
    // resolves to that exact move destination rather than the flat tile behind it.
    const moveHits = this.raycaster.intersectObjects(this.board.getMoveTargetHitMeshes(), false);
    if (moveHits.length > 0) {
      const data = moveHits[0].object.userData;
      if (typeof data.tileX === 'number' && typeof data.tileY === 'number') {
        return { x: data.tileX, y: data.tileY };
      }
    }

    const hits = this.raycaster.intersectObjects(this.board.getTileHitMeshes(), false);
    if (hits.length === 0) return null;

    const data = hits[0].object.userData;
    if (typeof data.tileX === 'number' && typeof data.tileY === 'number') {
      return { x: data.tileX, y: data.tileY };
    }
    return null;
  }

  private getPinchMetrics(): { distance: number; midX: number; midY: number } | null {
    if (this.activePointers.size < 2) return null;
    const iter = this.activePointers.values();
    const first = iter.next().value as ActivePointer | undefined;
    const second = iter.next().value as ActivePointer | undefined;
    if (!first || !second) return null;
    return {
      distance: Math.hypot(second.x - first.x, second.y - first.y),
      midX: (first.x + second.x) * 0.5,
      midY: (first.y + second.y) * 0.5,
    };
  }

  private handlePointerDown(e: PointerEvent): void {
    if (e.pointerType === 'mouse' && e.button !== 0 && e.button !== 1 && e.button !== 2) {
      return;
    }

    this.activePointers.set(e.pointerId, {
      x: e.clientX,
      y: e.clientY,
      startX: e.clientX,
      startY: e.clientY,
      pointerType: e.pointerType,
      button: e.button,
    });

    try {
      this.domElement.setPointerCapture(e.pointerId);
    } catch {
      // Ignore synthetic events without an active pointer capture target
    }

    if (this.activePointers.size === 1) {
      this.isDragging = false;
      this.gestureWasMultiTouch = false;
      this.lastPinchDistance = null;
    } else if (this.activePointers.size >= 2) {
      this.gestureWasMultiTouch = true;
      this.isDragging = true;
      const metrics = this.getPinchMetrics();
      if (metrics) {
        this.lastPinchDistance = metrics.distance;
        this.lastPinchMidX = metrics.midX;
        this.lastPinchMidY = metrics.midY;
      }
    }
  }

  private handlePointerMove(e: PointerEvent): void {
    const active = this.activePointers.get(e.pointerId);
    if (active) {
      const prevX = active.x;
      const prevY = active.y;
      active.x = e.clientX;
      active.y = e.clientY;

      // 2-finger pinch-to-zoom + midpoint pan
      if (this.activePointers.size >= 2) {
        const metrics = this.getPinchMetrics();
        if (metrics) {
          if (this.lastPinchDistance !== null && this.lastPinchDistance > 10 && metrics.distance > 10) {
            const zoomFactor = metrics.distance / this.lastPinchDistance;
            this.sceneManager.zoomByFactor(zoomFactor);
            this.sceneManager.panByScreenDelta(
              metrics.midX - this.lastPinchMidX,
              metrics.midY - this.lastPinchMidY,
            );
          }
          this.lastPinchDistance = metrics.distance;
          this.lastPinchMidX = metrics.midX;
          this.lastPinchMidY = metrics.midY;
        }
        return;
      }

      // 1-finger touch pan or mouse drag
      const threshold =
        active.pointerType === 'touch' ? TOUCH_DRAG_THRESHOLD_PX : MOUSE_DRAG_THRESHOLD_PX;
      const totalDx = active.x - active.startX;
      const totalDy = active.y - active.startY;
      if (!this.isDragging && Math.hypot(totalDx, totalDy) > threshold) {
        this.isDragging = true;
      }
      if (this.isDragging) {
        this.sceneManager.panByScreenDelta(active.x - prevX, active.y - prevY);
      }
      return;
    }

    // Hover feedback for desktop mouse/pen only
    if (e.pointerType === 'touch') return;
    const coord = this.raycastTile(e.clientX, e.clientY);
    const key = coord ? `${coord.x},${coord.y}` : null;
    if (key !== this.lastHoveredKey) {
      this.lastHoveredKey = key;
      this.board.setHoverTile(coord);
      this.callbacks.onTileHover(coord);
    }
  }

  private handlePointerUp(e: PointerEvent, cancelled: boolean): void {
    const ended = this.activePointers.get(e.pointerId);
    if (!ended) return;

    this.activePointers.delete(e.pointerId);
    try {
      if (this.domElement.hasPointerCapture(e.pointerId)) {
        this.domElement.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore
    }

    if (this.activePointers.size < 2) {
      this.lastPinchDistance = null;
    }

    // If one finger remains after a pinch, rebase its start so lifting a finger doesn't jump
    if (this.activePointers.size === 1) {
      const remaining = this.activePointers.values().next().value as ActivePointer | undefined;
      if (remaining) {
        remaining.startX = remaining.x;
        remaining.startY = remaining.y;
      }
      return;
    }

    if (this.activePointers.size === 0) {
      const wasDragging = this.isDragging;
      const wasMultiTouch = this.gestureWasMultiTouch;
      this.isDragging = false;
      this.gestureWasMultiTouch = false;

      const isPrimaryClick = ended.pointerType !== 'mouse' || ended.button === 0;
      if (!cancelled && !wasDragging && !wasMultiTouch && isPrimaryClick && !this.inputLocked) {
        const coord = this.raycastTile(e.clientX, e.clientY);
        if (coord) {
          this.callbacks.onTileClick(coord);
        }
      }
    }
  }

  private handleWheel(e: WheelEvent): void {
    e.preventDefault();
    const scale = e.deltaMode === 1 ? 28 : e.deltaMode === 2 ? 120 : 1;
    this.sceneManager.zoomBy(e.deltaY * scale);
  }

  private handleKeyDown(e: KeyboardEvent): void {
    const tag = (e.target as HTMLElement | null)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    this.keysDown.add(e.code);

    if (e.code === 'KeyQ') {
      this.sceneManager.rotateStep(-1);
    } else if (e.code === 'KeyE') {
      this.sceneManager.rotateStep(1);
    } else if (e.code === 'Escape') {
      this.callbacks.onDeselectHotkey?.();
    } else if (e.code === 'Space' && !this.inputLocked) {
      e.preventDefault();
      this.callbacks.onEndTurnHotkey?.();
    }
  }

  private handleKeyUp(e: KeyboardEvent): void {
    this.keysDown.delete(e.code);
  }

  public dispose(): void {
    this.domElement.removeEventListener('pointerdown', this.onPointerDownBound);
    window.removeEventListener('pointermove', this.onPointerMoveBound);
    window.removeEventListener('pointerup', this.onPointerUpBound);
    window.removeEventListener('pointercancel', this.onPointerCancelBound);
    this.domElement.removeEventListener('wheel', this.onWheelBound);
    this.domElement.removeEventListener('contextmenu', this.onContextMenuBound);
    window.removeEventListener('keydown', this.onKeyDownBound);
    window.removeEventListener('keyup', this.onKeyUpBound);
    this.activePointers.clear();
  }
}
