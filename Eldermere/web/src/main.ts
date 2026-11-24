import { AppController } from './ui';

function boot(): void {
  const canvasContainer = document.getElementById('canvas-container');
  const badgesContainer = document.getElementById('world-badges');
  const hudRoot = document.getElementById('hud-root');

  if (!canvasContainer || !badgesContainer || !hudRoot) {
    throw new Error('Missing required root DOM containers (#canvas-container, #world-badges, #hud-root)');
  }

  new AppController(canvasContainer, badgesContainer, hudRoot);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
