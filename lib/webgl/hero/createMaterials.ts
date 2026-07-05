import * as THREE from 'three';

export function createHeroMaterials() {
  return {
    concreteLight: new THREE.MeshStandardMaterial({
      color: 0xe8e6df,
      roughness: 0.82,
      metalness: 0.05,
    }),

    concreteMid: new THREE.MeshStandardMaterial({
      color: 0xb8b6ad,
      roughness: 0.86,
      metalness: 0.04,
    }),

    concreteDark: new THREE.MeshStandardMaterial({
      color: 0x11161a,
      roughness: 0.7,
      metalness: 0.1,
    }),

    redNode: new THREE.MeshStandardMaterial({
      color: 0xff3b2f,
      emissive: 0xff1208,
      emissiveIntensity: 0.45,
      roughness: 0.45,
    }),

    edge: new THREE.LineBasicMaterial({
      color: 0x1b1f22,
      transparent: true,
      opacity: 0.42,
    }),

    faintEdge: new THREE.LineBasicMaterial({
      color: 0x1b1f22,
      transparent: true,
      opacity: 0.18,
    }),
  };
}
