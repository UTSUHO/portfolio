import type { HeroPartConfig, HeroLayerId } from '@/app/components/webgl/types';

export const HERO_GROUP_EXPLODE_OFFSETS: Record<HeroLayerId, [number, number, number]> = {
  home: [0, 0.12, 0],
  projects: [0.1, 0.38, 0.2],
  resume: [-0.05, 0.68, -0.08],
  library: [0.35, 0.18, 0.12],
  notes: [-0.25, 0.72, -0.28],
};

export const HERO_PARTS: HeroPartConfig[] = [
  // Shared base plinth
  {
    id: 'basePlinth',
    group: 'shared',
    kind: 'box',
    position: [0, -0.12, 0],
    size: [6.2, 0.48, 3.6],
    colorRole: 'dark',
    edge: true,
  },

  // Detached left wall panel
  {
    id: 'detachedWall',
    group: 'shared',
    kind: 'detachedWall',
    position: [-2.4, 1.35, 0],
    size: [0.22, 3.2, 2.0],
    colorRole: 'light',
    edge: true,
  },

  // Home: light base cap + entry cut
  {
    id: 'homeCap',
    group: 'home',
    kind: 'box',
    position: [0, 0, 0],
    size: [5.0, 0.22, 2.8],
    colorRole: 'light',
    edge: true,
  },
  {
    id: 'homeEntryCut',
    group: 'home',
    kind: 'darkInset',
    position: [-0.9, 0.02, 0.75],
    size: [1.4, 0.12, 0.85],
    colorRole: 'dark',
    edge: true,
  },

  // Projects: main platform, atrium void, corridor slot, cantilever
  {
    id: 'projectsPlatform',
    group: 'projects',
    kind: 'box',
    position: [0, 0, 0],
    size: [3.4, 0.28, 2.0],
    colorRole: 'light',
    edge: true,
  },
  {
    id: 'projectsAtrium',
    group: 'projects',
    kind: 'darkInset',
    position: [-0.55, 0.04, 0.35],
    size: [1.5, 0.14, 1.0],
    colorRole: 'dark',
    edge: true,
  },
  {
    id: 'projectsCorridor',
    group: 'projects',
    kind: 'darkInset',
    position: [0.6, 0.04, -0.45],
    size: [1.6, 0.1, 0.35],
    colorRole: 'dark',
    edge: true,
  },
  {
    id: 'projectsCantilever',
    group: 'projects',
    kind: 'box',
    position: [1.4, -0.02, 0.1],
    size: [1.0, 0.18, 1.4],
    colorRole: 'mid',
    edge: true,
  },

  // Resume: mid platform, mid void, central core cage
  {
    id: 'resumePlatform',
    group: 'resume',
    kind: 'box',
    position: [0, 0, 0],
    size: [2.4, 0.24, 1.6],
    colorRole: 'light',
    edge: true,
  },
  {
    id: 'resumeVoid',
    group: 'resume',
    kind: 'darkInset',
    position: [0, 0.02, 0],
    size: [0.75, 0.1, 0.75],
    colorRole: 'dark',
    edge: true,
  },
  {
    id: 'resumeCoreCage',
    group: 'resume',
    kind: 'coreCage',
    position: [0, -0.45, 0],
    size: [0.7, 1.9, 0.7],
    edge: true,
  },

  // Library: right-side service bar, slot, columns
  {
    id: 'libraryServiceBar',
    group: 'library',
    kind: 'box',
    position: [0, 0, 0],
    size: [0.75, 1.2, 2.2],
    colorRole: 'mid',
    edge: true,
  },
  {
    id: 'libraryServiceSlot',
    group: 'library',
    kind: 'darkInset',
    position: [0, 0.25, 0.4],
    size: [0.45, 0.55, 0.18],
    colorRole: 'dark',
    edge: true,
  },
  {
    id: 'libraryColumns',
    group: 'library',
    kind: 'columnRow',
    position: [-0.18, -0.65, -0.7],
    size: [0.12, 0.55, 0.12],
    colorRole: 'dark',
    count: 4,
    spacing: [0.12, 0, 0.48],
    edge: true,
  },

  // Notes: rear tower, slit, top canopy
  {
    id: 'notesTower',
    group: 'notes',
    kind: 'box',
    position: [0, 0, 0],
    size: [0.85, 2.2, 0.85],
    colorRole: 'light',
    edge: true,
  },
  {
    id: 'notesTowerSlit',
    group: 'notes',
    kind: 'darkInset',
    position: [0.22, 0, 0.12],
    size: [0.12, 1.45, 0.12],
    colorRole: 'dark',
    edge: true,
  },
  {
    id: 'notesTopCanopy',
    group: 'notes',
    kind: 'wireBox',
    position: [0.35, 1.55, 0.45],
    size: [2.0, 0.08, 1.4],
    edge: true,
  },
];
