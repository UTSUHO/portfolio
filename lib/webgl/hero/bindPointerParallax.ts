import * as THREE from 'three';
import gsap from 'gsap';

interface Params {
  container: HTMLElement;
  root: THREE.Group;
  camera: THREE.Camera;
}

export function bindPointerParallax({ container, root }: Params) {
  const target = {
    rx: root.rotation.x,
    ry: root.rotation.y,
  };

  const onPointerMove = (event: PointerEvent) => {
    const rect = container.getBoundingClientRect();

    const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    gsap.to(target, {
      rx: -0.28 + ny * 0.035,
      ry: 0.58 + nx * 0.045,
      duration: 0.7,
      ease: 'power3.out',
      onUpdate: () => {
        root.rotation.x = target.rx;
        root.rotation.y = target.ry;
      },
    });
  };

  container.addEventListener('pointermove', onPointerMove);

  return () => {
    container.removeEventListener('pointermove', onPointerMove);
  };
}
