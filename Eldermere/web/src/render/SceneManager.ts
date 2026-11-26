import * as THREE from 'three';

export type FrameCallback = (dt: number, elapsed: number) => void;

const ELEVATION_RAD = THREE.MathUtils.degToRad(38);
const INITIAL_AZIMUTH_RAD = THREE.MathUtils.degToRad(45);
const CAMERA_DISTANCE = 46;
const BASE_FRUSTUM_HALF_HEIGHT = 11.5;
const MIN_ZOOM = 0.38;
const MAX_ZOOM = 3.2;
const MAX_FRAME_DT = 0.033;
/** Opening framing: target on-screen tile width = clamp(min(viewport w, h) / divisor, min, max) px. */
const OPENING_REVEAL_SPAN_TILES = 5; // starting capital reveals radius 2 → a 5×5 patch
/** 1.0 = viewport fully inside the revealed diamond; lower lets a little fog show at the corners. */
const OPENING_FOG_COVER = 0.7;
const OPENING_MAX_ZOOM = 3.2;
/** Approximate on-screen width (world units) of one tile at the 45° isometric azimuth. */
const OPENING_TILE_SCREEN_UNITS = 2.0 * Math.SQRT2;
const PAN_DAMP_LAMBDA = 11.5;
const ZOOM_DAMP_LAMBDA = 12.5;
const ORBIT_DAMP_LAMBDA = 10.5;
const ECLIPSE_DAMP_LAMBDA = 4.8;

const NORMAL_HEMI_SKY = new THREE.Color('#d6ebff');
const NORMAL_HEMI_GROUND = new THREE.Color('#586a85');
const NORMAL_SUN_COLOR = new THREE.Color('#fff6e6');
const NORMAL_RIM_COLOR = new THREE.Color('#bdd6ff');
const NORMAL_SKY_TOP = new THREE.Color('#0c1322');
const NORMAL_SKY_MID = new THREE.Color('#152036');
const NORMAL_SKY_BOT = new THREE.Color('#1e2c46');

// Dramatic Starlit Elven Twilight palette: deep midnight-indigo sky + cool silver-violet moonlight
const ECLIPSE_HEMI_SKY = new THREE.Color('#7c8cf8');
const ECLIPSE_HEMI_GROUND = new THREE.Color('#1e1b4b');
const ECLIPSE_SUN_COLOR = new THREE.Color('#c7d2fe');
const ECLIPSE_RIM_COLOR = new THREE.Color('#a78bfa');
const ECLIPSE_SKY_TOP = new THREE.Color('#040514');
const ECLIPSE_SKY_MID = new THREE.Color('#0d0a2b');
const ECLIPSE_SKY_BOT = new THREE.Color('#1e1548');

const STAR_SPECKS: ReadonlyArray<{ x: number; y: number; r: number; alpha: number }> = [
  { x: 14, y: 18, r: 1.2, alpha: 0.9 },
  { x: 42, y: 34, r: 0.9, alpha: 0.7 },
  { x: 88, y: 22, r: 1.4, alpha: 0.95 },
  { x: 112, y: 48, r: 1.0, alpha: 0.75 },
  { x: 26, y: 68, r: 1.1, alpha: 0.85 },
  { x: 66, y: 54, r: 0.85, alpha: 0.65 },
  { x: 102, y: 84, r: 1.3, alpha: 0.85 },
  { x: 18, y: 112, r: 0.9, alpha: 0.6 },
  { x: 54, y: 98, r: 1.2, alpha: 0.8 },
  { x: 80, y: 124, r: 0.95, alpha: 0.6 },
  { x: 116, y: 138, r: 1.1, alpha: 0.55 },
  { x: 36, y: 146, r: 0.85, alpha: 0.5 },
  { x: 74, y: 168, r: 1.0, alpha: 0.42 },
  { x: 12, y: 182, r: 0.8, alpha: 0.35 },
];

const _tmpColorTop = new THREE.Color();
const _tmpColorMid = new THREE.Color();
const _tmpColorBot = new THREE.Color();

function paintSkyCanvas(canvas: HTMLCanvasElement, eclipseBlend: number): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  const t = THREE.MathUtils.clamp(eclipseBlend, 0, 1);

  _tmpColorTop.copy(NORMAL_SKY_TOP).lerp(ECLIPSE_SKY_TOP, t);
  _tmpColorMid.copy(NORMAL_SKY_MID).lerp(ECLIPSE_SKY_MID, t);
  _tmpColorBot.copy(NORMAL_SKY_BOT).lerp(ECLIPSE_SKY_BOT, t);

  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, `#${_tmpColorTop.getHexString()}`);
  grad.addColorStop(0.5, `#${_tmpColorMid.getHexString()}`);
  grad.addColorStop(1, `#${_tmpColorBot.getHexString()}`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  if (t > 0.06) {
    for (const star of STAR_SPECKS) {
      ctx.fillStyle = `rgba(224, 231, 255, ${(star.alpha * t).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function createSkyGradientResources(): { canvas: HTMLCanvasElement; texture: THREE.CanvasTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 256;
  paintSkyCanvas(canvas, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return { canvas, texture };
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
  // Vertical render offset (CSS px) that keeps the focus point clear of bottom/top UI.
  private desiredViewShiftPx = 0;
  private currentViewShiftPx = 0;
  private desiredZoom = 1.05;
  private boardHalfExtent = 12;
  private lastBoardMapSize: number | null = null;
  private idleOrbitEnabled = false;
  private hemiLight: THREE.HemisphereLight | null = null;
  private sunLight: THREE.DirectionalLight | null = null;
  private rimLight: THREE.DirectionalLight | null = null;

  // Starlit Eclipse lighting transition state
  private skyCanvas: HTMLCanvasElement;
  private skyTexture: THREE.CanvasTexture;
  private eclipseTarget = 0;
  private eclipseBlend = 0;
  private lastRenderedEclipseBlend = 0;

  // Punchy camera shake state (for Volcanic Cataclysm & impact spectacles)
  private shakeTimeRemaining = 0;
  private shakeDuration = 0.001;
  private shakeIntensity = 0;

  private resizeObserver: ResizeObserver | null = null;
  private readonly handleWindowResize: () => void;

  constructor(container: HTMLElement) {
    this.container = container;

    this.scene = new THREE.Scene();
    const sky = createSkyGradientResources();
    this.skyCanvas = sky.canvas;
    this.skyTexture = sky.texture;
    this.scene.background = this.skyTexture;
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

    const isAndroidWebView =
      typeof window !== 'undefined' &&
      Boolean((window as Window & { EldermereAndroid?: unknown }).EldermereAndroid);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: isAndroidWebView,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(width, height);
    // Android WebView (ANGLE/Vulkan) exhibits depth-buffer shadow acne (pitch-black triangles)
    // on low-poly cones under cloud shadows; our 3-light studio rig already produces crisp flat facets.
    this.renderer.shadowMap.enabled = !isAndroidWebView;
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
    this.hemiLight = hemi;
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
    this.rimLight = rim;
    this.scene.add(rim);
  }

  public setEclipseMode(active: boolean): void {
    this.eclipseTarget = active ? 1 : 0;
    if (this.rafId === null) {
      this.eclipseBlend = this.eclipseTarget;
      this.applyEclipseAtmosphere(this.eclipseBlend);
    }
  }

  public shakeCamera(intensity = 0.45, duration = 0.48): void {
    this.shakeIntensity = Math.max(this.shakeIntensity, intensity);
    this.shakeDuration = Math.max(duration, 0.05);
    this.shakeTimeRemaining = Math.max(this.shakeTimeRemaining, this.shakeDuration);
  }

  private applyEclipseAtmosphere(blend: number): void {
    const t = THREE.MathUtils.clamp(blend, 0, 1);
    this.lastRenderedEclipseBlend = t;

    if (this.hemiLight) {
      this.hemiLight.color.copy(NORMAL_HEMI_SKY).lerp(ECLIPSE_HEMI_SKY, t);
      this.hemiLight.groundColor.copy(NORMAL_HEMI_GROUND).lerp(ECLIPSE_HEMI_GROUND, t);
      this.hemiLight.intensity = THREE.MathUtils.lerp(0.78, 0.64, t);
    }
    if (this.sunLight) {
      this.sunLight.color.copy(NORMAL_SUN_COLOR).lerp(ECLIPSE_SUN_COLOR, t);
      this.sunLight.intensity = THREE.MathUtils.lerp(2.3, 1.38, t);
    }
    if (this.rimLight) {
      this.rimLight.color.copy(NORMAL_RIM_COLOR).lerp(ECLIPSE_RIM_COLOR, t);
      this.rimLight.intensity = THREE.MathUtils.lerp(0.36, 0.88, t);
    }
    this.renderer.toneMappingExposure = THREE.MathUtils.lerp(1.06, 0.94, t);

    paintSkyCanvas(this.skyCanvas, t);
    this.skyTexture.needsUpdate = true;
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

  public renderOnce(): void {
    this.stepCamera(0);
    for (const cb of this.callbacks) {
      cb(0, this.elapsed);
    }
    this.renderer.render(this.scene, this.camera);
  }

  public resize(): void {
    const width = Math.max(this.container.clientWidth, 1);
    const height = Math.max(this.container.clientHeight, 1);
    const aspect = width / height;
    this.camera.left = -BASE_FRUSTUM_HALF_HEIGHT * aspect;
    this.camera.right = BASE_FRUSTUM_HALF_HEIGHT * aspect;
    this.camera.top = BASE_FRUSTUM_HALF_HEIGHT;
    this.camera.bottom = -BASE_FRUSTUM_HALF_HEIGHT;
    this.applyViewShift();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    if (this.rafId === null) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  /**
   * Tells the camera how many CSS pixels of the screen are covered by UI at the top and bottom
   * (e.g. the top bar and Alderwick's tutorial bubble). The rendered view slides up/down so the
   * camera's focus point sits in the middle of the unobstructed band instead of under the UI.
   */
  public setScreenOcclusion(topPx: number, bottomPx: number): void {
    const height = Math.max(this.container.clientHeight, 1);
    const shift = (Math.max(0, bottomPx) - Math.max(0, topPx)) / 2;
    this.desiredViewShiftPx = THREE.MathUtils.clamp(shift, -height * 0.3, height * 0.3);
  }

  private applyViewShift(): void {
    const width = Math.max(this.container.clientWidth, 1);
    const height = Math.max(this.container.clientHeight, 1);
    if (Math.abs(this.currentViewShiftPx) < 0.5) {
      this.camera.clearViewOffset();
    } else {
      this.camera.setViewOffset(width, height, 0, this.currentViewShiftPx, width, height);
    }
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

  /**
   * Opening-turn framing: zoom in on the capital until the revealed starting patch (a 5×5
   * square, drawn as an isometric diamond) fills most of the viewport, so the player sees
   * their city and unit up close with as little Fog as possible.
   */
  public frameOpeningZoom(instant = true): void {
    const width = Math.max(this.container.clientWidth, 1);
    const height = Math.max(this.container.clientHeight, 1);
    const aspect = width / height;
    // Revealed diamond size in world units on screen (45° azimuth, ELEVATION_RAD tilt).
    const diamondW = OPENING_REVEAL_SPAN_TILES * OPENING_TILE_SCREEN_UNITS;
    const diamondH = diamondW * Math.sin(ELEVATION_RAD);
    // A viewport (vw × vh) fits inside a diamond (W × H) when vw/W + vh/H <= 1.
    // With vw = 2·h·aspect/zoom and vh = 2·h/zoom, solve for zoom.
    const fullCoverZoom = 2 * BASE_FRUSTUM_HALF_HEIGHT * (aspect / diamondW + 1 / diamondH);
    const zoom = THREE.MathUtils.clamp(fullCoverZoom * OPENING_FOG_COVER, 1.2, OPENING_MAX_ZOOM);
    this.desiredZoom = zoom;
    if (instant) {
      this.currentZoom = zoom;
      this.camera.zoom = zoom;
      this.camera.updateProjectionMatrix();
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

    if (Math.abs(this.desiredViewShiftPx - this.currentViewShiftPx) > 0.25) {
      this.currentViewShiftPx = THREE.MathUtils.lerp(this.currentViewShiftPx, this.desiredViewShiftPx, tPan);
      if (Math.abs(this.desiredViewShiftPx - this.currentViewShiftPx) <= 0.25) {
        this.currentViewShiftPx = this.desiredViewShiftPx;
      }
      this.applyViewShift();
      this.camera.updateProjectionMatrix();
    }

    // Smoothly transition Starlit Eclipse atmosphere
    if (Math.abs(this.eclipseTarget - this.eclipseBlend) > 1e-4) {
      const tEclipse = 1 - Math.exp(-ECLIPSE_DAMP_LAMBDA * dt);
      this.eclipseBlend = THREE.MathUtils.lerp(this.eclipseBlend, this.eclipseTarget, tEclipse);
      if (Math.abs(this.eclipseTarget - this.eclipseBlend) <= 1e-3) {
        this.eclipseBlend = this.eclipseTarget;
      }
      if (
        Math.abs(this.eclipseBlend - this.lastRenderedEclipseBlend) >= 0.006 ||
        this.eclipseBlend === this.eclipseTarget
      ) {
        this.applyEclipseAtmosphere(this.eclipseBlend);
      }
    }

    // Decay punchy camera shake
    if (this.shakeTimeRemaining > 0) {
      this.shakeTimeRemaining = Math.max(0, this.shakeTimeRemaining - dt);
      if (this.shakeTimeRemaining === 0) {
        this.shakeIntensity = 0;
      }
    }

    this.updateCameraTransform();
  }

  private updateCameraTransform(): void {
    const horizDist = Math.cos(ELEVATION_RAD) * CAMERA_DISTANCE;
    const vertDist = Math.sin(ELEVATION_RAD) * CAMERA_DISTANCE;

    let shakeX = 0;
    let shakeY = 0;
    let shakeZ = 0;
    if (this.shakeTimeRemaining > 0 && this.shakeIntensity > 0) {
      const decay = this.shakeTimeRemaining / Math.max(this.shakeDuration, 0.001);
      const amp = this.shakeIntensity * decay * decay;
      shakeX = (Math.random() - 0.5) * 2 * amp;
      shakeY = (Math.random() - 0.5) * 1.4 * amp;
      shakeZ = (Math.random() - 0.5) * 2 * amp;
    }

    this.camera.position.set(
      this.currentTarget.x + Math.sin(this.currentAzimuth) * horizDist + shakeX,
      this.currentTarget.y + vertDist + shakeY,
      this.currentTarget.z + Math.cos(this.currentAzimuth) * horizDist + shakeZ,
    );
    this.camera.lookAt(
      this.currentTarget.x + shakeX * 0.6,
      this.currentTarget.y + shakeY * 0.4,
      this.currentTarget.z + shakeZ * 0.6,
    );

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
    this.skyTexture.dispose();
    this.renderer.dispose();
  }
}
