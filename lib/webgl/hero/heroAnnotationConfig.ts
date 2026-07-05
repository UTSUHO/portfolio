import type { AnnotationConfig } from '@/app/components/webgl/types';

export const HERO_ANNOTATIONS: AnnotationConfig[] = [
  {
    id: 'a01',
    label: 'A01 ACTIVE NODE',
    sublabel: 'SYSTEM CORE',
    targetLayer: 'projects',
    localPosition: [0.2, 0.35, 0.55],
    side: 'right',
    active: true,
    initialVisible: true,
  },
  // B02, C03, D04, E05 disabled during static massing tuning
];
