import * as THREE from 'three';

export function createHeroMaterials() {
  return {
    concreteLight: new THREE.MeshStandardMaterial({
      color: 0xdedbd2,
      roughness: 0.86,
      metalness: 0.02,
    }),

    concreteMid: new THREE.MeshStandardMaterial({
      color: 0xa9a79f,
      roughness: 0.88,
      metalness: 0.03,
    }),

    concreteDark: new THREE.MeshStandardMaterial({
      color: 0x10161a,
      roughness: 0.78,
      metalness: 0.08,
    }),

    redNode: new THREE.MeshStandardMaterial({
      color: 0xff3b2f,
      emissive: 0xff1208,
      emissiveIntensity: 0.5,
      roughness: 0.45,
    }),

    edge: new THREE.LineBasicMaterial({
      color: 0x11161a,
      transparent: true,
      opacity: 0.58,
    }),

    faintEdge: new THREE.LineBasicMaterial({
      color: 0x11161a,
      transparent: true,
      opacity: 0.24,
    }),

    blueprintLine: new THREE.LineBasicMaterial({
      color: 0x11161a,
      transparent: true,
      opacity: 0.42,
      depthTest: false,
    }),
  };
}