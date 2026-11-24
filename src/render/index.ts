export { SceneManager, type FrameCallback } from './SceneManager';
export { BoardRenderer, type AttackTargetOverlay } from './BoardRenderer';
export { AnimationQueue } from './AnimationQueue';
export { InputController, type InputCallbacks } from './InputController';
export { WorldBadges, type FloatingPopupKind } from './WorldBadges';
export { TechThumbnailRenderer, renderTechIcon } from './TechThumbnailRenderer';
export {
  TILE_SIZE,
  TILE_TOP_Y,
  WATER_SURFACE_Y,
  GARRISON_OFFSET_X,
  GARRISON_OFFSET_Z,
  CITY_PLAZA_Y,
  MOUNTAIN_LEDGE_OFFSET_X,
  MOUNTAIN_LEDGE_OFFSET_Z,
  MOUNTAIN_LEDGE_Y,
  FOREST_UNIT_OFFSET_X,
  FOREST_UNIT_OFFSET_Z,
  FOREST_UNIT_Y_OFFSET,
  tileToWorld,
  getUnitWorldPosition,
  getFlatMaterial,
  createTileMesh,
  createDioramaSkirt,
} from './assets/terrainMesh';
export { createCityMesh, CITY_KEEP_OFFSET_X, CITY_KEEP_OFFSET_Z } from './assets/cityMesh';
export {
  createUnitMesh,
  type BuiltUnitMesh,
  type UnitMaterialEntry,
} from './assets/unitMesh';
export {
  createUnitSprite,
  disposeUnitSprite,
  getUnitHeight,
  getUnitSpriteDimensions,
  getUnitSpriteTexture,
  setUnitExhausted,
  setUnitVisualState,
  type BuiltUnitSprite,
  type UnitSpriteDimensions,
  type UnitSpriteOptions,
  type UnitVisualStateOptions,
} from './assets/unitSprite';
export { getUnitSpriteUrl } from './assets/spriteManifest';
export { createCloudCluster, type CloudCluster } from './assets/cloudMesh';
export {
  getSurfaceTextures,
  getTexturedMaterial,
  updateAnimatedTextures,
  type SurfaceTextureKind,
  type TexturedMaterialOptions,
} from './assets/textures';
