import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { HeroArchitecture } from '@/app/components/webgl/types';

gsap.registerPlugin(ScrollTrigger);

interface Params {
  architecture: HeroArchitecture;
  trigger: Element;
}

export function bindScrollTimeline({ architecture, trigger }: Params) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top top',
      end: '+=2600',
      scrub: 1,
    },
  });

  Object.values(architecture.layers).forEach((layer, i) => {
    const initial = layer.userData.initialPosition;
    const offset = layer.userData.explodeOffset;

    tl.to(
      layer.position,
      {
        x: initial.x + offset.x,
        y: initial.y + offset.y,
        z: initial.z + offset.z,
        ease: 'none',
      },
      i * 0.08,
    );
  });

  tl.to(
    architecture.root.rotation,
    {
      y: 0.68,
      x: -0.22,
      ease: 'none',
    },
    0,
  );

  tl.to(
    architecture.activeNode.position,
    {
      y: architecture.activeNode.position.y + 0.45,
      ease: 'none',
    },
    0.15,
  );

  return () => {
    tl.kill();
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}
