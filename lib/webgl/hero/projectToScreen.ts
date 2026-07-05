import * as THREE from 'three';

export function projectToScreen(
  object: THREE.Object3D,
  camera: THREE.Camera,
  container: HTMLElement,
  side: 'left' | 'right' | 'top' = 'right',
) {
  const worldPosition = new THREE.Vector3();
  object.getWorldPosition(worldPosition);

  const projected = worldPosition.project(camera);

  const x = (projected.x * 0.5 + 0.5) * container.clientWidth;
  const y = (-projected.y * 0.5 + 0.5) * container.clientHeight;

  const offset = 48;
  const screenX =
    side === 'left'
      ? x - offset
      : side === 'right'
        ? x + offset
        : x;
  const screenY =
    side === 'top'
      ? y - offset
      : y;

  return {
    x: screenX,
    y: screenY,
    visible: projected.z > -1 && projected.z < 1,
  };
}
