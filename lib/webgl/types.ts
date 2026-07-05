import * as THREE from "three";

export type Vec3 = [number, number, number];
export type Edge = [number, number];

export type MaterialConfig = {
  color?: string;
  opacity?: number;
  lineWidth?: number;
  glow?: number;
  blending?: "normal" | "additive";
  depthWrite?: boolean;
  transparent?: boolean;
};

export type ComponentSummary = {
  component_id?: number;
  role?: string;
  vertex_count?: number;
  edge_count?: number;
  center?: Vec3;
  origin_distance?: number;
  avg_radius?: number;
  max_degree?: number;
  closed_loop?: boolean;
};

export type LineFrame = {
  frame: number;
  vertex_count?: number;
  edge_count?: number;
  polygon_count?: number;
  raw_vertex_count?: number;
  raw_edge_count?: number;
  vertices: Vec3[];
  edges: Edge[];
  edge_roles?: string[];
  edge_materials?: string[];
  edge_groups?: Record<string, number[]>;
  role_counts?: Record<string, number>;
  component_summaries?: ComponentSummary[];
};

export type LineSequence = {
  type: "geometry_nodes_classified_line_sequence" | "geometry_nodes_line_sequence";
  source_object: string;
  frame_start: number;
  frame_end: number;
  frame_step: number;
  coordinate_space?: "local" | "world";
  compact_vertices?: boolean;
  materials?: Record<string, MaterialConfig>;
  role_to_material?: Record<string, string>;
  classification_config?: unknown;
  frames: LineFrame[];
};

export type NormalizedLineFrame = {
  frame: number;
  vertices: Vec3[];
  edges: Edge[];
  edgeRoles: string[];
  edgeMaterials: string[];
  edgeGroups: Record<string, number[]>;
  roleCounts: Record<string, number>;
  componentSummaries: ComponentSummary[];
};

export type NormalizedLineSequence = {
  sourceObject: string;
  frameStart: number;
  frameEnd: number;
  frameStep: number;
  materials: Record<string, MaterialConfig>;
  roleToMaterial: Record<string, string>;
  frames: NormalizedLineFrame[];
};

export type RoleControls = {
  visible: boolean;
  opacity: number;
  lineRatio: number;
  color?: string;
};

export type RoleMaterialOverrides = Record<string, Partial<MaterialConfig>>;

export type MaterialSystem = {
  getMaterial(materialKey: string): THREE.Material;
  getMaterialForRole(role: string): THREE.Material;
  getMaterialKeyForRole(role: string): string;
  setRoleOpacity(role: string, opacity: number): void;
  setRoleVisible(role: string, visible: boolean): void;
  setRoleLineRatio(role: string, ratio: number): void;
  setRoleColor(role: string, color: string): void;
  getRoleControls(role: string): RoleControls;
  getRoles(): string[];
  dispose(): void;
};

export type LineSceneRuntime = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  root: THREE.Group;
  render: () => void;
  resize: () => void;
  dispose: () => void;
};

export type InterpolatedRoleLineSegments = THREE.LineSegments & {
  userData: {
    kind: "interpolated-role-line-segments";
    role: string;
    materialKey: string;
    maxEdgeCount: number;
  };
};

export type InterpolatedFrameGroup = THREE.Group & {
  userData: {
    kind: "interpolated-frame-group";
  };
};

export type PlayerState = {
  isPlaying: boolean;
  frameIndex: number;
  frameCount: number;
  blenderFrame: number;
  subFrame: number;
  elapsed: number;
  fps: number;
  speed: number;
  loop: boolean;
};

export type LineSequencePlayerParams = {
  sequence: NormalizedLineSequence;
  root: THREE.Group;
  materialSystem: MaterialSystem;
  fps?: number;
  speed?: number;
  loop?: boolean;
  cacheSize?: number;
};

export type BuildFrameGroupOptions = {
  debugFlattenRoles?: boolean;
};
