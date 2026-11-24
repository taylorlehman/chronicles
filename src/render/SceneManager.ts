import * as THREE from 'three';

export type FrameCallback = (dt: number, elapsed: number) => void;

const ELEVATION_RAD = THREE.MathUtils.degToRad(38);
const INITIAL_AZIMUTH_RAD = THREE.MathUtils.degToRad(45);
const CAMERA_DISTANCE = 46;
const BASE_FRUSTUM_HALF_HEIGHT = 11.5;
const MIN_ZOOM = 0.38;
const MAX_ZOOM = 2.6;
const MAX_FRAME_DT = 0.033;
const PAN_DAMP_LAMBDA = 11.5;
const ZOOM_DAMP_LAMBDA = 12.5;
const ORBIT_DAMP_LAMBDA = 10.5;

function createSkyGradientTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Deep twilight slate-navy vertical backdrop (floating Polytopia diorama in space)
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#0c1322');
    grad.addColorStop(0.5, '#152036');
    grad.addColorStop(1, '#1e2c46');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 256);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export class SceneManager {
  public readonly container: HTMLElement;
  public readonly scene: THREE.Scene;
  public readonly camera: THREE.OrthographicCamera;
  public readonly renderer: THREE.WebGLRenderer;

  private readonly callbacks = new Set<FrameCallback>();
  private rafId: number | null = null;
  private lastTime = 0;
  private elapsed = 0;

  // Damped camera orbit/pan/zoom state
  private currentTarget = new THREE.Vector3(0, 0, 0);
  private desiredTarget = new THREE.Vector3(0, 0, 0);
  private currentAzimuth = INITIAL_AZIMUTH_RAD;
  private desiredAzimuth = INITIAL_AZIMUTH_RAD;
  private currentZoom = 1.05;
  private desiredZoom = 1.05;
  private boardHalfExtent = 12;
  private lastBoardMapSize: number | null = null;
  private idleOrbitEnabled = false;
  private sunLight: THREE.DirectionalLight | null = null;

  private resizeObserver: ResizeObserver | null = null;
  private readonly handleWindowResize: () => void;

  constructor(container: HTMLElement) {
    this.container = container;

    this.scene = new THREE.Scene();
    this.scene.background = createSkyGradientTexture();
    // Orthographic dioramas need zero distance haze
    this.scene.fog = null;

    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);
    const aspect = width / height;

    this.camera = new THREE.OrthographicCamera(
      -BASE_FRUSTUM_HALF_HEIGHT * aspect,
      BASE_FRUSTUM_HALF_HEIGHT * aspect,
      BASE_FRUSTUM_HALF_HEIGHT,
      -BASE_FRUSTUM_HALF_HEIGHT,
      0.1,
      190,
    );
    this.camera.zoom = this.currentZoom;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.NeutralToneMapping;
    this.renderer.toneMappingExposure = 1.06;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.domElement.style.touchAction = 'none';

    container.innerHTML = '';
    container.appendChild(this.renderer.domElement);

    this.setupLighting();
    this.updateCameraTransform();

    this.handleWindowResize = () => this.resize();
    window.addEventListener('resize', this.handleWindowResize);
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(container);
    }
  }

  private setupLighting(): void {
    // Cool blue-slate bounce fill for crisp shadow facets
    const hemi = new THREE.HemisphereLight('#d6ebff', '#586a85', 0.78);
    hemi.position.set(0, 30, 0);
    this.scene.add(hemi);

    // Off-axis 3-tone key sun for distinct Light / Mid / Shadow face separation
    const sun = new THREE.DirectionalLight('#fff6e6', 2.3);
    sun.position.set(36, 44, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 2;
    sun.shadow.camera.far = 135;
    const d = 24;
    sun.shadow.camera.left = -d;
    sun.shadow.camera.right = d;
    sun.shadow.camera.top = d;
    sun.shadow.camera.bottom = -d;
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.03;
    sun.shadow.radius = 2.5;
    this.sunLight = sun;
    this.scene.add(sun);

    // Cool sky-rim backlight separating unit & mountain back-edges from twilight backdrop
    const rim = new THREE.DirectionalLight('#bdd6ff', 0.36);
    rim.position.set(-22, 16, -20);
    this.scene.add(rim);
  }

  public setBoardBounds(mapSize: number, tileSize = 2.0): void {
    this.boardHalfExtent = mapSize * tileSize * 0.54;

    // Dynamically scale the directional shadow camera frustum to cover up to 18x18 (324 tiles)
    if (this.sunLight) {
      const halfSpan = Math.max(20, mapSize * tileSize * 0.85);
      const shadowCam = this.sunLight.shadow.camera;
      shadowCam.left = -halfSpan;
      shadowCam.right = halfSpan;
      shadowCam.top = halfSpan;
      shadowCam.bottom = -halfSpan;
      shadowCam.far = Math.max(110, halfSpan * 4.2);
      shadowCam.updateProjectionMatrix();
    }

    // Set a comfortable opening framing zoom when initializing or changing map size
    if (this.lastBoardMapSize !== mapSize) {
      this.lastBoardMapSize = mapSize;
      const defaultZoom = mapSize >= 18 ? 0.82 : mapSize >= 16 ? 0.88 : 1.05;
      this.currentZoom = defaultZoom;
      this.desiredZoom = defaultZoom;
      this.camera.zoom = defaultZoom;
      this.camera.updateProjectionMatrix();
    }

    this.clampDesiredTarget();
  }

  public onUpdate(cb: FrameCallback): () => void {
    this.callbacks.add(cb);
    return () => {
      this.callbacks.delete(cb);
    };
  }

  public start(): void {
    if (this.rafId !== null) return;
    this.lastTime = performance.now();
    const loop = (now: number) => {
      this.rafId = requestAnimationFrame(loop);
      const rawDt = (now - this.lastTime) / 1000;
      this.lastTime = now;
      // Clamp dt <= 33ms so slow frames or tab switches never teleport camera/animations
      const dt = Math.min(Math.max(rawDt, 0), MAX_FRAME_DT);
      this.elapsed += dt;

      this.stepCamera(dt);
      for (const cb of this.callbacks) {
        cb(dt, this.elapsed);
      }
      this.renderer.render(this.scene, this.camera);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  public stop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  public resize(): void {
    const width = Math.max(this.container.clientWidth, 1);
    const height = Math.max(this.container.clientHeight, 1);
    const aspect = width / height;
    this.camera.left = -BASE_FRUSTUM_HALF_HEIGHT * aspect;
    this.camera.right = BASE_FRUSTUM_HALF_HEIGHT * aspect;
    this.camera.top = BASE_FRUSTUM_HALF_HEIGHT;
    this.camera.bottom = -BASE_FRUSTUM_HALF_HEIGHT;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  public panByScreenDelta(dxPx: number, dyPx: number): void {
    const height = Math.max(this.container.clientHeight, 1);
    const worldUnitsPerPx = (BASE_FRUSTUM_HALF_HEIGHT * 2) / (height * this.currentZoom);

    // Camera right vector on XZ plane
    const cosA = Math.cos(this.currentAzimuth);
    const sinA = Math.sin(this.currentAzimuth);
    // Forward on XZ plane (from camera toward target)
    const forwardX = -sinA;
    const forwardZ = -cosA;
    const rightX = cosA;
    const rightZ = -sinA;

    const panScaleY = 1 / Math.sin(ELEVATION_RAD);
    const moveRight = -dxPx * worldUnitsPerPx;
    const moveForward = dyPx * worldUnitsPerPx * panScaleY;

    this.desiredTarget.x += rightX * moveRight + forwardX * moveForward;
    this.desiredTarget.z += rightZ * moveRight + forwardZ * moveForward;
    this.clampDesiredTarget();
  }

  public panByAxes(rightAxis: number, forwardAxis: number, dt: number): void {
    if (rightAxis === 0 && forwardAxis === 0) return;
    const speed = (16 / this.currentZoom) * dt;
    const cosA = Math.cos(this.currentAzimuth);
    const sinA = Math.sin(this.currentAzimuth);
    const forwardX = -sinA;
    const forwardZ = -cosA;
    const rightX = cosA;
    const rightZ = -sinA;

    this.desiredTarget.x += (rightX * rightAxis + forwardX * forwardAxis) * speed;
    this.desiredTarget.z += (rightZ * rightAxis + forwardZ * forwardAxis) * speed;
    this.clampDesiredTarget();
  }

  public zoomBy(delta: number): void {
    const clampedDelta = THREE.MathUtils.clamp(delta, -220, 220);
    const factor = Math.exp(-clampedDelta * 0.0014);
    this.zoomByFactor(factor);
  }

  public zoomByFactor(factor: number): void {
    if (!Number.isFinite(factor) || factor <= 0) return;
    this.desiredZoom = THREE.MathUtils.clamp(this.desiredZoom * factor, MIN_ZOOM, MAX_ZOOM);
  }

  public rotateStep(direction: 1 | -1): void {
    this.desiredAzimuth += direction * (Math.PI / 2);
  }

  public setIdleOrbit(enabled: boolean): void {
    this.idleOrbitEnabled = enabled;
    if (!enabled) {
      this.desiredAzimuth = this.currentAzimuth;
    }
  }

  public focusOnWorld(pos: THREE.Vector3, instant = false): void {
    this.desiredTarget.set(pos.x, 0, pos.z);
    this.clampDesiredTarget();
    if (instant) {
      this.currentTarget.copy(this.desiredTarget);
      this.updateCameraTransform();
    }
  }

  public getDomElement(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  private clampDesiredTarget(): void {
    this.desiredTarget.x = THREE.MathUtils.clamp(
      this.desiredTarget.x,
      -this.boardHalfExtent,
      this.boardHalfExtent,
    );
    this.desiredTarget.z = THREE.MathUtils.clamp(
      this.desiredTarget.z,
      -this.boardHalfExtent,
      this.boardHalfExtent,
    );
  }

  private stepCamera(rawDt: number): void {
    const dt = Math.min(Math.max(rawDt, 0), MAX_FRAME_DT);
    if (this.idleOrbitEnabled) {
      this.desiredAzimuth += dt * 0.14;
    }

    // Frame-rate-independent exponential damping (consistent 60Hz & 120Hz feel)
    const tPan = 1 - Math.exp(-PAN_DAMP_LAMBDA * dt);
    const tOrbit = 1 - Math.exp(-ORBIT_DAMP_LAMBDA * dt);
    const tZoom = 1 - Math.exp(-ZOOM_DAMP_LAMBDA * dt);

    if (this.currentTarget.distanceToSquared(this.desiredTarget) > 1e-7) {
      this.currentTarget.lerp(this.desiredTarget, tPan);
    } else {
      this.currentTarget.copy(this.desiredTarget);
    }

    if (Math.abs(this.desiredAzimuth - this.currentAzimuth) > 1e-5) {
      this.currentAzimuth = THREE.MathUtils.lerp(this.currentAzimuth, this.desiredAzimuth, tOrbit);
    } else {
      this.currentAzimuth = this.desiredAzimuth;
    }

    if (Math.abs(this.desiredZoom - this.currentZoom) > 1e-5) {
      this.currentZoom = THREE.MathUtils.lerp(this.currentZoom, this.desiredZoom, tZoom);
    } else {
      this.currentZoom = this.desiredZoom;
    }

    this.updateCameraTransform();
  }

  private updateCameraTransform(): void {
    const horizDist = Math.cos(ELEVATION_RAD) * CAMERA_DISTANCE;
    const vertDist = Math.sin(ELEVATION_RAD) * CAMERA_DISTANCE;

    this.camera.position.set(
      this.currentTarget.x + Math.sin(this.currentAzimuth) * horizDist,
      this.currentTarget.y + vertDist,
      this.currentTarget.z + Math.cos(this.currentAzimuth) * horizDist,
    );
    this.camera.lookAt(this.currentTarget);

    if (Math.abs(this.camera.zoom - this.currentZoom) > 1e-6) {
      this.camera.zoom = this.currentZoom;
      this.camera.updateProjectionMatrix();
    }
  }

  public dispose(): void {
    this.stop();
    window.removeEventListener('resize', this.handleWindowResize);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    this.renderer.dispose();
  }
}
