import * as THREE from 'three';
import type { HeroLayerConfig } from '@/app/components/webgl/types';

export function createLayer(
  config: HeroLayerConfig,
  material: THREE.Material,
  edgeMaterial: THREE.LineBasicMaterial,
) {
  const group = new THREE.Group();
  group.name = `G_${String(config.index).padStart(2, '0')}_${config.id.toUpperCase()}`;

  const geometry = new THREE.BoxGeometry(
    config.size[0],
    config.size[1],
    config.size[2],
  );

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);

  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    edgeMaterial,
  );
  group.add(edges);

  group.position.set(...config.position);

  return group;
}
