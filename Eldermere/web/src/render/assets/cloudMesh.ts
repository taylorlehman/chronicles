import * as THREE from 'three';
import { getTexturedMaterial } from './textures';

const puffGeo = new THREE.IcosahedronGeometry(0.55, 1);

function hash2D(x: number, y: number, salt: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7 + salt * 74.7) * 43758.5453123;
  return n - Math.floor(n);
}

export interface CloudCluster {
  group: THREE.Group;
  baseY: number;
  phase: number;
  baseX: number;
  baseZ: number;
}

export function createCloudCluster(
  x: number,
  y: number,
  worldPos: THREE.Vector3,
): CloudCluster {
  const group = new THREE.Group();
  const baseY = 1.28 + (hash2D(x, y, 1) - 0.5) * 0.22;
  const phase = hash2D(x, y, 2) * Math.PI * 2;

  const cloudMatTop = getTexturedMaterial('cloud', {
    color: '#ffffff',
    roughness: 0.96,
    metalness: 0.0,
    bumpScale: 0.012,
    flatShading: false,
  });
  const cloudMatShade = getTexturedMaterial('cloud', {
    color: '#dbe7f5',
    roughness: 0.96,
    metalness: 0.0,
    bumpScale: 0.012,
    flatShading: false,
  });

  const puffCount = 4 + (hash2D(x, y, 3) > 0.5 ? 1 : 0);
  for (let i = 0; i < puffCount; i++) {
    const isCenter = i === 0;
    const angle = (i / Math.max(puffCount - 1, 1)) * Math.PI * 2 + hash2D(x, y, 10 + i) * 0.8;
    const radius = isCenter ? 0 : 0.42 + hash2D(x, y, 20 + i) * 0.28;
    const scale = isCenter
      ? 1.15 + hash2D(x, y, 30) * 0.25
      : 0.68 + hash2D(x, y, 31 + i) * 0.35;

    const mesh = new THREE.Mesh(puffGeo, isCenter || i % 2 === 0 ? cloudMatTop : cloudMatShade);
    mesh.position.set(
      Math.cos(angle) * radius,
      isCenter ? 0.1 : (hash2D(x, y, 40 + i) - 0.5) * 0.16,
      Math.sin(angle) * radius,
    );
    mesh.scale.set(scale * 1.15, scale * 0.68, scale * 1.08);
    mesh.rotation.set(
      hash2D(x, y, 50 + i) * Math.PI,
      hash2D(x, y, 60 + i) * Math.PI,
      0,
    );
    // Keep fog clouds fluffy & bright without casting dark blotches onto border tiles
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    group.add(mesh);
  }

  group.position.set(worldPos.x, baseY, worldPos.z);

  return {
    group,
    baseY,
    phase,
    baseX: worldPos.x,
    baseZ: worldPos.z,
  };
}
