import type { AnnotationConfig } from '@/app/components/webgl/types';

export const HERO_ANNOTATIONS: AnnotationConfig[] = [
  {
    id: 'a01',
    label: 'A01 ACTIVE NODE',
    sublabel: 'IDENTITY CORE',
    targetLayer: 'home',
    localPosition: [1.9, 0.35, 1.1],
    side: 'right',
    active: true,
  },
  {
    id: 'b02',
    label: 'B02 ANCHOR',
    sublabel: 'PROJECT STACK',
    targetLayer: 'projects',
    localPosition: [-1.7, 0.3, 1.0],
    side: 'left',
  },
  {
    id: 'c03',
    label: 'C03 FRAME EDGE',
    sublabel: 'EXPERIENCE ARCHIVE',
    targetLayer: 'resume',
    localPosition: [1.4, 0.25, -0.8],
    side: 'right',
  },
  {
    id: 'd04',
    label: 'D04 GRID NODE',
    sublabel: 'KNOWLEDGE GRID',
    targetLayer: 'library',
    localPosition: [-1.2, 0.25, -0.6],
    side: 'left',
  },
  {
    id: 'e05',
    label: 'E05 TERMINAL',
    sublabel: 'NOTE LAYER',
    targetLayer: 'notes',
    localPosition: [0.9, 0.2, 0.5],
    side: 'top',
  },
];
