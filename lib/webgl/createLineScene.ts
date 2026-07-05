import * as THREE from "three";
import type { LineSceneRuntime } from "./types";

export function createLineScene(
  canvas: HTMLCanvasElement,
  container: HTMLElement
): LineSceneRuntime {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#05080c");

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / Math.max(1, container.clientHeight),
    0.01,
    100
  );
  camera.position.set(0, 0, 3.2);
  camera.lookAt(0, 0, 0);

  const root = new THREE.Group();
  scene.add(root);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight, false);

  const resize = () => {
    const width = container.clientWidth;
    const height = Math.max(1, container.clientHeight);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };

  const render = () => {
    renderer.render(scene, camera);
  };

  const dispose = () => {
    renderer.dispose();
  };

  return {
    renderer,
    scene,
    camera,
    root,
    render,
    resize,
    dispose,
  };
}
