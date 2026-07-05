import type { HeroArchitecture } from '@/app/components/webgl/types';

interface Params {
  architecture: HeroArchitecture;
  trigger: Element;
}

export function bindScrollTimeline({}: Params) {
  // ScrollTrigger disabled while tuning static architecture.
  // Re-enable after the building silhouette reads correctly.
  return () => {};
}
