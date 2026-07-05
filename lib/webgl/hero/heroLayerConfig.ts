import type { HeroLayerId, HeroPartConfig } from '@/app/components/webgl/types';

export const HERO_GROUP_EXPLODE_OFFSETS: Record<
  HeroLayerId,
  [number, number, number]
> = {
  home: [0, -0.08, 0],
  projects: [-0.25, 0.32, 0.08],
  resume: [0.28, 0.58, -0.06],
  library: [0.48, 0.72, 0.18],
  notes: [0.08, 0.95, -0.18],
};

export const HERO_PARTS: HeroPartConfig[] = [
  // ------------------------------------------------------------
  // SHARED — DARK PODIUM + DETACHED WALL
  // ------------------------------------------------------------
  {
    id: 'base_plinth_dark_podium',
    group: 'shared',
    kind: 'box',
    position: [0, 0, 0],
    size: [6.05, 0.52, 3.42],
    colorRole: 'dark',
    edge: true,
  },

  {
    id: 'detached_left_wall_panel',
    group: 'shared',
    kind: 'detachedWall',
    position: [-2.78, 1.22, 0.42],
    size: [0.16, 1.65, 0.95],
    colorRole: 'light',
    edge: true,
  },

  // ------------------------------------------------------------
  // HOME — LIGHT CAP / BASE SURFACE
  // ------------------------------------------------------------
  {
    id: 'home_base_cap_light_slab',
    group: 'home',
    kind: 'box',
    position: [0, 0.32, 0],
    size: [5.78, 0.12, 3.18],
    colorRole: 'light',
    edge: true,
  },

  {
    id: 'home_front_entry_cut',
    group: 'home',
    kind: 'darkInset',
    position: [2.05, 0.405, 1.18],
    size: [0.95, 0.045, 0.35],
    colorRole: 'dark',
    edge: true,
  },

  // ------------------------------------------------------------
  // PROJECTS — MAIN PLATFORM AS REAL VOID RING
  // Instead of one large slab + dark patch, use four slabs around a void.
  // ------------------------------------------------------------
  {
    id: 'projects_main_front_slab',
    group: 'projects',
    kind: 'box',
    position: [-0.15, 0.82, 1.02],
    size: [4.82, 0.24, 0.68],
    colorRole: 'light',
    edge: true,
  },

  {
    id: 'projects_main_back_slab',
    group: 'projects',
    kind: 'box',
    position: [-0.15, 0.82, -0.95],
    size: [4.82, 0.24, 0.62],
    colorRole: 'light',
    edge: true,
  },

  {
    id: 'projects_main_left_slab',
    group: 'projects',
    kind: 'box',
    position: [-2.05, 0.82, 0.02],
    size: [1.02, 0.24, 1.35],
    colorRole: 'light',
    edge: true,
  },

  {
    id: 'projects_main_right_slab',
    group: 'projects',
    kind: 'box',
    position: [1.48, 0.82, 0.02],
    size: [1.34, 0.24, 1.35],
    colorRole: 'light',
    edge: true,
  },

  {
    id: 'projects_void_bottom_shadow',
    group: 'projects',
    kind: 'darkInset',
    position: [-0.55, 0.64, 0.02],
    size: [1.55, 0.055, 1.12],
    colorRole: 'dark',
    edge: true,
  },

  {
    id: 'projects_side_cantilever_block',
    group: 'projects',
    kind: 'box',
    position: [1.95, 0.95, 0.85],
    size: [1.05, 0.22, 0.55],
    colorRole: 'mid',
    edge: true,
  },

  // ------------------------------------------------------------
  // RESUME — MID PLATFORM + CENTRAL CORE
  // ------------------------------------------------------------
  {
    id: 'resume_mid_left_platform',
    group: 'resume',
    kind: 'box',
    position: [-0.55, 1.34, -0.2],
    size: [1.9, 0.22, 1.52],
    colorRole: 'light',
    edge: true,
  },

  {
    id: 'resume_mid_right_platform',
    group: 'resume',
    kind: 'box',
    position: [1.15, 1.34, -0.2],
    size: [1.25, 0.22, 1.52],
    colorRole: 'light',
    edge: true,
  },

  {
    id: 'resume_mid_void_shadow',
    group: 'resume',
    kind: 'darkInset',
    position: [0.35, 1.47, -0.2],
    size: [0.62, 0.045, 0.72],
    colorRole: 'dark',
    edge: true,
  },

  {
    id: 'resume_central_core_cage',
    group: 'resume',
    kind: 'coreCage',
    position: [0.32, 1.62, 0.12],
    size: [0.58, 1.75, 0.58],
    colorRole: 'dark',
    edge: true,
    opacity: 0.5,
  },

  // ------------------------------------------------------------
  // LIBRARY — RIGHT SERVICE WING
  // ------------------------------------------------------------
  {
    id: 'library_service_bar',
    group: 'library',
    kind: 'box',
    position: [2.05, 1.05, 0.82],
    size: [1.85, 0.22, 0.6],
    colorRole: 'light',
    edge: true,
  },

  {
    id: 'library_service_dark_slot',
    group: 'library',
    kind: 'darkInset',
    position: [2.2, 1.18, 0.82],
    size: [0.82, 0.045, 0.42],
    colorRole: 'dark',
    edge: true,
  },

  {
    id: 'library_service_columns',
    group: 'library',
    kind: 'columnRow',
    position: [1.42, 0.65, 0.82],
    size: [0.09, 0.58, 0.09],
    colorRole: 'dark',
    count: 4,
    spacing: [0.38, 0, 0],
    edge: true,
  },

  // ------------------------------------------------------------
  // NOTES — REAR TOWER + TOP CANOPY
  // ------------------------------------------------------------
  {
    id: 'notes_rear_tower',
    group: 'notes',
    kind: 'box',
    position: [1.16, 1.95, -0.82],
    size: [0.9, 1.1, 0.78],
    colorRole: 'light',
    edge: true,
  },

  {
    id: 'notes_rear_tower_dark_slit',
    group: 'notes',
    kind: 'darkInset',
    position: [1.62, 1.95, -0.82],
    size: [0.075, 0.86, 0.62],
    colorRole: 'dark',
    edge: false,
  },

  {
    id: 'notes_top_canopy_frame',
    group: 'notes',
    kind: 'wireBox',
    position: [0.28, 2.65, -0.18],
    size: [2.55, 0.62, 1.36],
    colorRole: 'dark',
    edge: true,
    opacity: 0.42,
  },
];