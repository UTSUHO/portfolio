# Data Contract: `line_sequence_classified.json`

## Purpose

This document defines the expected data format for the WebGL line animation.

The data comes from Blender Geometry Nodes after baking evaluated geometry into frame-wise line data.

## Important Interpretation

The exported data is a **line sequence**:

```txt
vertices + edges per frame
```

It is not:

```txt
GLB
mesh animation
shape key animation
morph target animation
skeletal animation
surface mesh
```

The original topology can vary by frame. Therefore, vertex-index interpolation between frames is unsafe.

## Top-Level Shape

Expected top-level structure:

```ts
type LineSequence = {
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
```

## Frame Shape

Expected frame structure:

```ts
type LineFrame = {
  frame: number;
  vertex_count?: number;
  edge_count?: number;
  polygon_count?: number;
  raw_vertex_count?: number;
  raw_edge_count?: number;
  vertices: [number, number, number][];
  edges: [number, number][];
  edge_roles?: string[];
  edge_materials?: string[];
  edge_groups?: Record<string, number[]>;
  role_counts?: Record<string, number>;
  component_summaries?: ComponentSummary[];
};
```

## Material Shape

Expected material structure:

```ts
type MaterialConfig = {
  color?: string;
  opacity?: number;
  lineWidth?: number;
  glow?: number;
  blending?: "normal" | "additive";
  depthWrite?: boolean;
  transparent?: boolean;
};
```

## Component Summary Shape

Component summaries are optional. They are useful for debug labels and annotation anchors.

```ts
type ComponentSummary = {
  component_id?: number;
  role?: string;
  vertex_count?: number;
  edge_count?: number;
  center?: [number, number, number];
  origin_distance?: number;
  avg_radius?: number;
  max_degree?: number;
  closed_loop?: boolean;
};
```

## Required Runtime Validation

The loader must validate:

1. `frames` exists and is a non-empty array.
2. Every frame has `vertices` and `edges`.
3. Every edge must reference existing vertex indices.
4. If `edge_roles` exists, its length should equal `edges.length`.
5. If `edge_materials` exists, its length should equal `edges.length`.
6. If `edge_groups` exists, each edge index should be valid.
7. If classified fields are missing, the runtime must fall back gracefully.

## Fallback Rules

### Missing `edge_groups`

Build groups from `edge_roles`:

```ts
for each edge index:
  role = edge_roles[index] ?? "uncategorized"
  groups[role].push(index)
```

### Missing `edge_roles`

Assign all edges:

```txt
uncategorized
```

### Missing `edge_materials`

Use:

```ts
materialKey = sequence.role_to_material?.[role] ?? "debug_unknown"
```

### Missing `materials`

Create a built-in default material set:

```txt
primary
secondary
connection
debug_unknown
```

## Runtime Normalized Shape

The loader should normalize data into this internal shape:

```ts
type NormalizedLineSequence = {
  sourceObject: string;
  frameStart: number;
  frameEnd: number;
  frameStep: number;
  materials: Record<string, MaterialConfig>;
  roleToMaterial: Record<string, string>;
  frames: NormalizedLineFrame[];
};

type NormalizedLineFrame = {
  frame: number;
  vertices: [number, number, number][];
  edges: [number, number][];
  edgeRoles: string[];
  edgeMaterials: string[];
  edgeGroups: Record<string, number[]>;
  roleCounts: Record<string, number>;
  componentSummaries: ComponentSummary[];
};
```

## Do Not

Do not mutate the raw imported JSON.

Always normalize into a separate runtime object.

Do not assume the exported JSON is small enough to rebuild all frames every render. Cache only what is needed.
