import {
  LibraryEntry,
  LibraryCategory,
  LibraryStatus,
  LibrarySection
} from './types'
export type {
  LibraryEntry,
  LibraryCategory,
  LibraryStatus,
  LibrarySection
} from './types'

export const libraryCategories: LibraryCategory[] = [
  'Systems',
  'WebGL',
  'Frontend Engineering',
  'Tools',
  'Infrastructure',
  'Research Notes',
  'Case Study',
  'Games',
  'Essays'
]

export const libraryStatuses: LibraryStatus[] = [
  'published',
  'in-progress',
  'archived'
]

const sections: LibrarySection[] = [
  {
    id: 'context',
    number: '01',
    title: 'Context',
    body:
      'Real-time collaboration tools require low-latency synchronization across peers. Traditional client-server models introduce bottlenecks and single points of failure. This project explores a peer-to-peer mesh architecture with a lightweight control plane.'
  },
  {
    id: 'architecture',
    number: '02',
    title: 'Architecture',
    body:
      'The system is split into three layers: a control plane for discovery and membership, a mesh layer for peer connections, and a transport layer using WebRTC data channels.',
    diagram:
      'CONTROL PLANE\n[DISCOVERY] [ROUTING] [MEMBERSHIP]\n\nMESH LAYER\n[NODE] --- [NODE] --- [NODE]\n\nTRANSPORT LAYER\n[WebRTC] [WebSocket Fallback]'
  },
  {
    id: 'decisions',
    number: '03',
    title: 'Key Decisions',
    body: 'Several constraints shaped the final design:',
    bullets: [
      'Used Yjs CRDT for stroke data to avoid server reconciliation.',
      'Adopted WebRTC DataChannels for low-latency peer transport.',
      'Kept a WebSocket fallback for symmetric-NAT scenarios.',
      'Rendered strokes on an HTML5 canvas with offscreen caching.'
    ]
  },
  {
    id: 'implementation',
    number: '04',
    title: 'Implementation',
    body:
      'The implementation separates sync state from presentation state. Each stroke is a lightweight operation that can be replayed in any order.',
    codeBlock:
      'whiteboard/\n├─ src/\n│  ├─ sync/\n│  │  ├─ crdt.ts\n│  │  └─ mesh.ts\n│  ├─ transport/\n│  │  ├─ webrtc.ts\n│  │  └─ websocket.ts\n│  └─ canvas/\n│     └─ renderer.ts\n└─ docker-compose.yml'
  },
  {
    id: 'stack',
    number: '05',
    title: 'Stack',
    body: 'The stack is intentionally small to keep the mesh layer portable.',
    table: [
      { label: 'LANGUAGE', value: 'TypeScript' },
      { label: 'RUNTIME', value: 'Node.js / Browser' },
      { label: 'STATE SYNC', value: 'Yjs CRDT' },
      { label: 'TRANSPORT', value: 'WebRTC + WebSocket' },
      { label: 'UI', value: 'React + Canvas API' }
    ]
  },
  {
    id: 'outcomes',
    number: '06',
    title: 'Outcomes',
    body: 'The prototype validated several assumptions about peer-to-peer drawing.',
    bullets: [
      'Stable 64-peer sessions in simulated LAN environments.',
      'Average sync latency stayed under 40 ms for local peers.',
      'CRDT convergence remained consistent across network partitions.',
      'Canvas offscreen caching reduced render frame drops by 60%.'
    ]
  }
]

export const libraryEntries: LibraryEntry[] = [
  {
    id: 'lib-01',
    slug: 'realtime-collaborative-whiteboard',
    number: '01',
    title: 'Realtime Collaborative Whiteboard',
    subtitle: 'Architecture and implementation of a real-time whiteboard system.',
    summary:
      'A peer-aware whiteboard with CRDT-based stroke sync, WebRTC transport, and conflict-free cursor sharing.',
    date: '2025.05',
    year: 2025,
    type: 'project',
    category: 'Systems',
    status: 'published',
    role: 'Fullstack Engineer',
    duration: '2025.03 — 2025.05',
    stack: ['WEBRTC', 'WEBSOCKET', 'YJS', 'REACT'],
    tags: ['DISTRIBUTED SYSTEMS', 'WEBRTC', 'REACT', 'CRDT'],
    thumbnail: '/images/contents/airElement.png',
    links: {
      repository: 'github.com/reiutsuho/whiteboard',
      demo: 'whiteboard.reiutsuho.dev'
    },
    keyFacts: [
      { label: 'Max Peers', value: '64' },
      { label: 'Sync Latency', value: '< 40 ms' },
      { label: 'Stroke Buffer', value: '∞' },
      { label: 'Test Coverage', value: '87%' }
    ],
    sections,
    related: [
      { type: "library", key: "distributed-mesh-network-system" },
      { type: "library", key: "internal-tools-catalog" }
    ]
  },
  {
    id: 'lib-02',
    slug: 'distributed-mesh-network-system',
    number: '02',
    title: 'Distributed Mesh Network System',
    subtitle: 'Design and prototyping of a distributed mesh network system.',
    summary:
      'A research prototype exploring peer-to-peer mesh networking for real-time collaborative environments.',
    date: '2025.03',
    year: 2025,
    type: 'research',
    category: 'Systems',
    status: 'archived',
    role: 'Fullstack Engineer',
    duration: '2025.01 — 2025.03',
    stack: ['RUST', 'TOKIO', 'WEBRTC', 'TAILSCALE'],
    tags: ['DISTRIBUTED SYSTEMS', 'WEBRTC', 'RUST', 'TOKIO'],
    thumbnail: '/images/contents/aquaElement.png',
    links: {
      repository: 'github.com/reiutsuho/meshnet',
      demo: 'meshnet.reiutsuho.dev'
    },
    keyFacts: [
      { label: 'Nodes', value: '128+' },
      { label: 'Max Peers', value: '1,024' },
      { label: 'Avg Latency', value: '28 ms' },
      { label: 'Throughput', value: '2.4k msg/s' }
    ],
    sections: [
      {
        id: 'context',
        number: '01',
        title: 'Context',
        body:
          'Mesh networks promise resilience without a central server. This prototype measures whether a Rust/Tokio node can maintain stable membership under churn.'
      },
      {
        id: 'architecture',
        number: '02',
        title: 'Architecture',
        body: 'The node is split into control, mesh, and transport layers.',
        diagram:
          'CONTROL PLANE\n[DISCOVERY] [ROUTING] [MEMBERSHIP]\n\nMESH LAYER\n[NODE] --- [NODE] --- [NODE]\n\nTRANSPORT LAYER\n[WebRTC] [QUIC] [Noise Protocol]'
      },
      {
        id: 'decisions',
        number: '03',
        title: 'Key Decisions',
        body: 'Design choices made during the prototype:',
        bullets: [
          'Used WebRTC DataChannels for NAT traversal and low-latency transport.',
          'Adopted CRDT-based state sync for conflict-free replication.',
          'gRPC over QUIC for control plane communication.',
          'Tailscale for secure mesh connectivity in private networks.'
        ]
      },
      {
        id: 'implementation',
        number: '04',
        title: 'Implementation',
        body: 'The repository separates control plane from node runtime.',
        codeBlock:
          'meshnet/\n├─ control-plane/\n│  ├─ src/\n│  └─ Cargo.toml\n├─ node/\n│  ├─ src/\n│  └─ Cargo.toml\n├─ proto/\n│  └─ meshnet.proto\n└─ docker-compose.yml'
      },
      {
        id: 'stack',
        number: '05',
        title: 'Stack',
        body: 'A systems-heavy stack focused on low-level networking.',
        table: [
          { label: 'LANGUAGE', value: 'Rust, TypeScript' },
          { label: 'RUNTIME', value: 'Tokio' },
          { label: 'TRANSPORT', value: 'WebRTC, QUIC' },
          { label: 'NETWORKING', value: 'Tailscale' },
          { label: 'CONTAINERS', value: 'Docker' }
        ]
      },
      {
        id: 'outcomes',
        number: '06',
        title: 'Outcomes',
        body: 'Measured results from the simulated environment.',
        bullets: [
          'Stable mesh with 128+ nodes in simulated environment.',
          'Average latency reduced by 42% compared to baseline relay.',
          'Successfully handled dynamic joins/leaves without state divergence.',
          'Published benchmarks and open-sourced core libraries.'
        ]
      }
    ],
    related: [
      { type: "library", key: "realtime-collaborative-whiteboard" },
      { type: "library", key: "webgl-scene-optimization-handbook" }
    ]
  },
  {
    id: 'lib-03',
    slug: 'webgl-scene-optimization-handbook',
    number: '03',
    title: 'WebGL Scene Optimization Handbook',
    subtitle: 'A concise reference for optimizing WebGL rendering pipelines.',
    summary:
      'A living document covering draw-call batching, instancing, texture atlasing, and shader cost analysis.',
    date: '2024.11',
    year: 2024,
    type: 'documentation',
    category: 'WebGL',
    status: 'published',
    role: 'Author',
    duration: '2024.08 — 2024.11',
    stack: ['WEBGL', 'THREE.JS', 'GLSL'],
    tags: ['WEBGL', 'PERFORMANCE', 'SHADERS'],
    thumbnail: '/images/contents/fireElement.png',
    links: {
      repository: 'github.com/reiutsuho/webgl-handbook'
    },
    keyFacts: [
      { label: 'Pages', value: '42' },
      { label: 'Examples', value: '18' },
      { label: 'Render Targets', value: '6' },
      { label: 'Perf Wins', value: 'up to 10x' }
    ],
    sections: [
      {
        id: 'context',
        number: '01',
        title: 'Context',
        body:
          'WebGL performance is easy to degrade with naive scene graphs. This handbook records repeatable patterns for keeping frame times predictable.'
      },
      {
        id: 'architecture',
        number: '02',
        title: 'Architecture',
        body: 'The pipeline is organized around visibility, batching, and GPU memory.',
        diagram:
          'SCENE GRAPH\n[CULL] → [SORT] → [BATCH]\n\nGPU MEMORY\n[ATLAS] [UBO] [VBO]\n\nSHADER STAGE\n[VERTEX] [FRAGMENT]'
      },
      {
        id: 'decisions',
        number: '03',
        title: 'Key Decisions',
        body: 'Patterns that repeatedly appeared across projects:',
        bullets: [
          'Prefer instancing over dynamic buffer updates.',
          'Atlasing textures reduces sampler binds and state changes.',
          'Use UBOs instead of per-draw uniform uploads.',
          'Defer shader compilation to first use to avoid startup stalls.'
        ]
      },
      {
        id: 'implementation',
        number: '04',
        title: 'Implementation',
        body: 'Each chapter includes a minimal reproducible example.',
        codeBlock:
          'handbook/\n├─ examples/\n│  ├─ instancing/\n│  ├─ texture-atlas/\n│  └─ deferred-shader/\n├─ src/\n│  └─ profiler.ts\n└─ README.md'
      },
      {
        id: 'stack',
        number: '05',
        title: 'Stack',
        body: 'Reference stack used in the examples.',
        table: [
          { label: 'API', value: 'WebGL 2.0' },
          { label: 'FRAMEWORK', value: 'Three.js' },
          { label: 'SHADING', value: 'GLSL' },
          { label: 'BUILD', value: 'Vite' }
        ]
      },
      {
        id: 'outcomes',
        number: '06',
        title: 'Outcomes',
        body: 'Observed improvements when applying the patterns.',
        bullets: [
          'Reduced draw calls by 90% in dense scene examples.',
          'Lowered GPU memory fragmentation via atlasing.',
          'Improved cold-start frame stability by lazy shader compilation.',
          'Created reusable profiling helpers for future WebGL work.'
        ]
      }
    ],
    related: [
      { type: "library", key: "shader-study-archive" },
      { type: "library", key: "system-architecture-patterns" }
    ]
  },
  {
    id: 'lib-04',
    slug: 'shader-study-archive',
    number: '04',
    title: 'Shader Study Archive',
    subtitle: 'A collection of GLSL experiments and procedural texture studies.',
    summary:
      'Procedural noise, ray marching sketches, and signed-distance-field explorations captured as reusable shader modules.',
    date: '2024.06',
    year: 2024,
    type: 'experiment',
    category: 'WebGL',
    status: 'archived',
    role: 'Solo Researcher',
    duration: '2023 — 2024',
    stack: ['GLSL', 'SHADERTOY', 'THREE.JS'],
    tags: ['GLSL', 'PROCEDURAL', 'SDF'],
    thumbnail: '/images/contents/earthElement.png',
    links: {
      repository: 'github.com/reiutsuho/shader-study'
    },
    keyFacts: [
      { label: 'Sketches', value: '32' },
      { label: 'Modules', value: '12' },
      { label: 'Noise Types', value: '5' },
      { label: 'SLOC', value: '~2,400' }
    ],
    sections: [
      {
        id: 'context',
        number: '01',
        title: 'Context',
        body:
          'This archive started as a way to understand the building blocks of procedural imagery before applying them to larger scenes.'
      },
      {
        id: 'architecture',
        number: '02',
        title: 'Architecture',
        body: 'Each sketch is a standalone GLSL program with shared noise utilities.',
        diagram:
          'UTILS\n[NOISE] [FBM] [DOMAIN_WARP]\n\nSKETCHES\n[RAYMARCH] [VORONOI] [VOLUME]\n\nOUTPUT\n[CANVAS] [VIDEO] [TEXTURE]'
      },
      {
        id: 'decisions',
        number: '03',
        title: 'Key Decisions',
        body: 'Constraints that kept the archive maintainable:',
        bullets: [
          'Every sketch exposes a single `mainImage` entry point.',
          'Utility functions are imported as GLSL chunks.',
          'Canvas size is decoupled from shader resolution.',
          'Output is recorded for regression comparison.'
        ]
      },
      {
        id: 'implementation',
        number: '04',
        title: 'Implementation',
        body: 'Folder layout reflects the separation between tools and experiments.',
        codeBlock:
          'shader-study/\n├─ lib/\n│  ├─ noise.glsl\n│  └─ sdf.glsl\n├─ sketches/\n│  ├─ raymarch-primitive.glsl\n│  └─ domain-warp.glsl\n└─ captures/'
      },
      {
        id: 'stack',
        number: '05',
        title: 'Stack',
        body: 'Minimal dependencies by design.',
        table: [
          { label: 'LANGUAGE', value: 'GLSL' },
          { label: 'PLAYGROUND', value: 'Shadertoy' },
          { label: 'RUNTIME', value: 'Three.js' },
          { label: 'CAPTURE', value: 'FFmpeg' }
        ]
      },
      {
        id: 'outcomes',
        number: '06',
        title: 'Outcomes',
        body: 'The archive became a reference for later WebGL projects.',
        bullets: [
          'Extracted reusable noise and SDF modules.',
          'Documented common pitfalls in ray marching precision.',
          'Created a visual regression folder for shader captures.',
          'Informed the material system in CODE:QUEEN.'
        ]
      }
    ],
    related: [
      { type: "library", key: "webgl-scene-optimization-handbook" },
      { type: "library", key: "system-architecture-patterns" }
    ]
  },
  {
    id: 'lib-05',
    slug: 'design-system-documentation',
    number: '05',
    title: 'Design System Documentation',
    subtitle: 'Tokens, components, and usage rules for the portfolio interface.',
    summary:
      'A formal record of the industrial-system design language used across the site: colors, typography, spacing, and component contracts.',
    date: '2025.02',
    year: 2025,
    type: 'documentation',
    category: 'Frontend Engineering',
    status: 'published',
    role: 'Designer / Engineer',
    duration: '2024.12 — 2025.02',
    stack: ['TAILWIND', 'CSS', 'FIGMA'],
    tags: ['DESIGN SYSTEM', 'TAILWIND', 'UI'],
    thumbnail: '/images/contents/vegvisir.jpg',
    links: {
      repository: 'github.com/reiutsuho/portfolio'
    },
    keyFacts: [
      { label: 'Tokens', value: '16' },
      { label: 'Components', value: '12' },
      { label: 'Breakpoints', value: '3' },
      { label: 'Pages', value: '5' }
    ],
    sections: [
      {
        id: 'context',
        number: '01',
        title: 'Context',
        body:
          'Without a written system, interface decisions drift. This document keeps the portfolio’s visual language consistent across pages.'
      },
      {
        id: 'architecture',
        number: '02',
        title: 'Architecture',
        body: 'The system is organized into primitive tokens, semantic tokens, and components.',
        diagram:
          'PRIMITIVES\n[COLOR] [TYPE] [SPACE]\n\nSEMANTICS\n[BG] [TEXT] [BORDER] [ACCENT]\n\nCOMPONENTS\n[PANEL] [DATA ROW] [BUTTON]'
      },
      {
        id: 'decisions',
        number: '03',
        title: 'Key Decisions',
        body: 'Rules that prevent decorative drift:',
        bullets: [
          'Only semantic tokens may be used in components.',
          'No gradients, shadows, or large-radius corners.',
          'Panel headers are always h-8 with a red square marker.',
          'Motion is kept between 150 ms and 250 ms.'
        ]
      },
      {
        id: 'implementation',
        number: '04',
        title: 'Implementation',
        body: 'Tokens live in globals.css; components live under app/components.',
        codeBlock:
          'app/\n├─ globals.css\n│  └─ @theme tokens\n├─ components/\n│  ├─ panel.tsx\n│  ├─ data-row.tsx\n│  └─ button.tsx\n└─ layout.tsx'
      },
      {
        id: 'stack',
        number: '05',
        title: 'Stack',
        body: 'A frontend-only toolchain.',
        table: [
          { label: 'STYLE', value: 'Tailwind CSS v4' },
          { label: 'TOKENS', value: 'CSS @theme' },
          { label: 'DESIGN', value: 'Figma' },
          { label: 'RUNTIME', value: 'Next.js App Router' }
        ]
      },
      {
        id: 'outcomes',
        number: '06',
        title: 'Outcomes',
        body: 'The documentation directly shaped the Library and Notes refactor.',
        bullets: [
          'Reduced arbitrary hex values in components to zero.',
          'Created reusable Panel, DataRow, and Button primitives.',
          'Documented the 12-column grid and sidebar/status-bar constraints.',
          'Enabled rapid page prototyping without visual drift.'
        ]
      }
    ],
    related: [
      { type: "library", key: "performance-observability-platform" },
      { type: "library", key: "internal-tools-catalog" }
    ]
  },
  {
    id: 'lib-06',
    slug: 'performance-observability-platform',
    number: '06',
    title: 'Performance Observability Platform',
    subtitle: 'Frontend performance metrics and observability dashboard.',
    summary:
      'A platform that collects Core Web Vitals, custom timings, and error signals from production clients.',
    date: '2025.01',
    year: 2025,
    type: 'project',
    category: 'Infrastructure',
    status: 'in-progress',
    role: 'Frontend Lead',
    duration: '2024.10 — NOW',
    stack: ['REACT', 'NODE.JS', 'PROMETHEUS'],
    tags: ['OBSERVABILITY', 'PERFORMANCE', 'INFRASTRUCTURE'],
    thumbnail: '/images/contents/airElement.png',
    links: {
      repository: 'github.com/reiutsuho/perf-platform'
    },
    keyFacts: [
      { label: 'Metrics', value: '12' },
      { label: 'Clients', value: '8' },
      { label: 'P99 LCP', value: '1.2 s' },
      { label: 'Retention', value: '30 d' }
    ],
    sections: [
      {
        id: 'context',
        number: '01',
        title: 'Context',
        body:
          'Production performance issues were discovered too late. This platform pushes metrics from the browser to a time-series store for near-real-time dashboards.'
      },
      {
        id: 'architecture',
        number: '02',
        title: 'Architecture',
        body: 'Instrumentation, ingestion, and visualization are decoupled.',
        diagram:
          'CLIENT\n[BEACON] [PERF OBSERVER]\n\nINGESTION\n[COLLECTOR] [QUEUE]\n\nSTORE\n[PROMETHEUS] [GRAFANA]'
      },
      {
        id: 'decisions',
        number: '03',
        title: 'Key Decisions',
        body: 'Trade-offs in client-side instrumentation:',
        bullets: [
          'Use the PerformanceObserver API for low-overhead collection.',
          'Batch beacons to reduce network overhead.',
          'Store only aggregated percentiles to control cardinality.',
          'Keep dashboards read-only for broad access.'
        ]
      },
      {
        id: 'implementation',
        number: '04',
        title: 'Implementation',
        body: 'The collector accepts JSON beacons and exposes Prometheus metrics.',
        codeBlock:
          'perf-platform/\n├─ packages/\n│  ├─ client/\n│  ├─ collector/\n│  └─ dashboard/\n├─ charts/\n└─ docker-compose.yml'
      },
      {
        id: 'stack',
        number: '05',
        title: 'Stack',
        body: 'A modern observability stack.',
        table: [
          { label: 'CLIENT', value: 'React, TypeScript' },
          { label: 'COLLECTOR', value: 'Node.js' },
          { label: 'METRICS', value: 'Prometheus' },
          { label: 'DASHBOARDS', value: 'Grafana' }
        ]
      },
      {
        id: 'outcomes',
        number: '06',
        title: 'Outcomes',
        body: 'Current results from the in-progress platform.',
        bullets: [
          'Identified LCP regressions within minutes of deployment.',
          'Reduced metric ingestion cost via client batching.',
          'Created a shared dashboard template across projects.',
          'Plan to add custom error attribution next quarter.'
        ]
      }
    ],
    related: [
      { type: "library", key: "internal-tools-catalog" },
      { type: "library", key: "design-system-documentation" }
    ]
  },
  {
    id: 'lib-07',
    slug: 'internal-tools-catalog',
    number: '07',
    title: 'Internal Tools Catalog',
    subtitle: 'A registry of scripts, CLIs, and small services used across teams.',
    summary:
      'Documentation and distribution hub for internal developer tools: code generators, linters, deployment helpers, and data pipelines.',
    date: '2024.09',
    year: 2024,
    type: 'tool',
    category: 'Tools',
    status: 'published',
    role: 'Tooling Engineer',
    duration: '2024.06 — 2024.09',
    stack: ['TYPESCRIPT', 'NODE.JS', 'CLI'],
    tags: ['TOOLS', 'CLI', 'DEVELOPER EXPERIENCE'],
    thumbnail: '/images/contents/fireElement.png',
    links: {
      repository: 'github.com/reiutsuho/tools-catalog'
    },
    keyFacts: [
      { label: 'Tools', value: '24' },
      { label: 'Teams', value: '4' },
      { label: 'Downloads/mo', value: '1,200' },
      { label: 'Saved /wk', value: '~30 h' }
    ],
    sections: [
      {
        id: 'context',
        number: '01',
        title: 'Context',
        body:
          'Small tools kept living in private gists and local scripts. The catalog gives them a discoverable home with install instructions and changelogs.'
      },
      {
        id: 'architecture',
        number: '02',
        title: 'Architecture',
        body: 'Each tool is a package with metadata, CLI entry, and documentation.',
        diagram:
          'REGISTRY\n[INDEX] [SEARCH]\n\nPACKAGE\n[CLI] [API] [DOCS]\n\nINSTALL\n[NPM] [DOCKER]'
      },
      {
        id: 'decisions',
        number: '03',
        title: 'Key Decisions',
        body: 'Governance rules for the catalog:',
        bullets: [
          'Every tool must have a README and a `--help` output.',
          'Versioning follows semver with a single CHANGELOG.',
          'Deprecated tools are moved to an archive folder.',
          'Install paths are standardized to `npx @rei/<tool>`.'
        ]
      },
      {
        id: 'implementation',
        number: '04',
        title: 'Implementation',
        body: 'A monorepo with shared scaffolding.',
        codeBlock:
          'tools-catalog/\n├─ packages/\n│  ├─ codegen/\n│  ├─ lint-config/\n│  └─ deploy-cli/\n├─ templates/\n│  └─ new-tool/\n└─ registry.json'
      },
      {
        id: 'stack',
        number: '05',
        title: 'Stack',
        body: 'Tooling-focused stack.',
        table: [
          { label: 'LANGUAGE', value: 'TypeScript' },
          { label: 'RUNTIME', value: 'Node.js' },
          { label: 'CLI', value: 'Commander.js' },
          { label: 'PACKAGING', value: 'npm workspaces' }
        ]
      },
      {
        id: 'outcomes',
        number: '06',
        title: 'Outcomes',
        body: 'Measurable impact on team velocity.',
        bullets: [
          'Centralized 24 tools across 4 teams.',
          'Reduced onboarding time for new developers.',
          'Standardized CLI conventions across projects.',
          'Created reusable templates for future tools.'
        ]
      }
    ],
    related: [
      { type: "library", key: "design-system-documentation" },
      { type: "library", key: "system-architecture-patterns" }
    ]
  },
  {
    id: 'lib-08',
    slug: 'system-architecture-patterns',
    number: '08',
    title: 'System Architecture Patterns',
    subtitle: 'A research note on patterns for distributed and modular systems.',
    summary:
      'Collected patterns from production systems: circuit breakers, sagas, event sourcing, and CQRS trade-offs.',
    date: '2024.04',
    year: 2024,
    type: 'research',
    category: 'Research Notes',
    status: 'published',
    role: 'Research Engineer',
    duration: '2023 — 2024',
    stack: ['SYSTEM DESIGN', 'PATTERNS'],
    tags: ['SYSTEM DESIGN', 'PATTERNS', 'DISTRIBUTED SYSTEMS'],
    thumbnail: '/images/contents/aquaElement.png',
    links: {
      repository: 'github.com/reiutsuho/architecture-patterns'
    },
    keyFacts: [
      { label: 'Patterns', value: '18' },
      { label: 'Case Studies', value: '6' },
      { label: 'Diagrams', value: '24' },
      { label: 'Reviews', value: '3' }
    ],
    sections: [
      {
        id: 'context',
        number: '01',
        title: 'Context',
        body:
          'Patterns are only useful when their failure modes are understood. This research note pairs each pattern with the conditions under which it breaks.'
      },
      {
        id: 'architecture',
        number: '02',
        title: 'Architecture',
        body: 'Patterns are grouped by coupling and consistency needs.',
        diagram:
          'CONSISTENCY\n[SAGA] [EVENT SOURCING] [CQRS]\n\nRESILIENCE\n[CIRCUIT BREAKER] [BULKHEAD] [RETRY]\n\nSCALE\n[SHARDING] [READ REPLICA] [CACHE]'
      },
      {
        id: 'decisions',
        number: '03',
        title: 'Key Decisions',
        body: 'Heuristics for choosing patterns:',
        bullets: [
          'Prefer sagas over 2PC when latency matters.',
          'Use CQRS only when read/write contention is proven.',
          'Circuit breakers need explicit half-open policies.',
          'Event sourcing adds auditability at the cost of schema evolution.'
        ]
      },
      {
        id: 'implementation',
        number: '04',
        title: 'Implementation',
        body: 'Each pattern includes a minimal sketch.',
        codeBlock:
          'patterns/\n├─ saga/\n├─ cqrs/\n├─ circuit-breaker/\n└─ event-sourcing/'
      },
      {
        id: 'stack',
        number: '05',
        title: 'Stack',
        body: 'Language-agnostic patterns with example implementations.',
        table: [
          { label: 'LANGUAGE', value: 'Pseudo-code / Rust' },
          { label: 'MODELING', value: 'Diagrams' },
          { label: 'REVIEW', value: 'Peer review' }
        ]
      },
      {
        id: 'outcomes',
        number: '06',
        title: 'Outcomes',
        body: 'The patterns informed several project designs.',
        bullets: [
          'Documented failure modes alongside benefits.',
          'Created decision trees for pattern selection.',
          'Reviewed with senior engineers before publishing.',
          'Referenced during the mesh network prototype.'
        ]
      }
    ],
    related: [
      { type: "library", key: "distributed-mesh-network-system" },
      { type: "library", key: "realtime-collaborative-whiteboard" }
    ]
  },
  {
    id: 'lib-09',
    slug: 'games-collection',
    number: '09',
    title: 'Games Collection',
    subtitle: 'Gameplay, narrative, and fighting game references.',
    summary:
      'A personal archive of games that shaped my thinking about mechanics, narrative systems, and competitive design.',
    date: '2024.06',
    year: 2024,
    type: 'games',
    category: 'Games',
    status: 'published',
    role: 'Curator',
    duration: 'Ongoing',
    stack: ['GAMES', 'ANALYSIS', 'NOTES'],
    tags: ['GAMES', 'ANALYSIS', 'PERSONAL'],
    thumbnail: '/images/contents/earthElement.png',
    keyFacts: [
      { label: 'Gameplay', value: '13' },
      { label: 'Narrative', value: '7' },
      { label: 'FTG', value: '4' },
      { label: 'Essays', value: '1' }
    ],
    sections: [
      {
        id: 'context',
        number: '01',
        title: 'Context',
        body:
          'Games are systems you can inhabit. This collection records the ones that taught me something about feedback loops, player agency, or narrative pacing.'
      },
      {
        id: 'gameplay',
        number: '02',
        title: 'Gameplay',
        body:
          'Titles selected for mechanical depth and replayability: Triangle Strategy, Sekiro, Stellaris, Civilization series, Minecraft, Warcraft III, Death Stranding, God of War, Zelda: BOTW, Katana Zero.'
      },
      {
        id: 'narrative',
        number: '03',
        title: 'Narrative',
        body:
          'Games where structure and story are inseparable: 13 Sentinels, Ever17, 999, CHAOS;HEAD, CHAOS;CHILD, Muramasa.'
      },
      {
        id: 'ftg',
        number: '04',
        title: 'FTG',
        body:
          'Fighting games studied for frame-data literacy and mind games: MBTL, UNI, SFV, Touhou non-sora.'
      },
      {
        id: 'outcomes',
        number: '05',
        title: 'Outcomes',
        body: 'What the collection feeds back into:',
        bullets: [
          'Design references for CODE:QUEEN tactical systems.',
          'Comparison points for game localization projects.',
          'Material for long-form essays like the Humankind review.'
        ]
      }
    ],
    related: [
      { type: "library", key: "humankind-essay" },
      { type: "library", key: "system-architecture-patterns" }
    ]
  },
  {
    id: 'lib-10',
    slug: 'humankind-essay',
    number: '10',
    title: 'Humankind 测评与分析',
    subtitle: 'A long-form essay analyzing the 4X strategy game Humankind.',
    summary:
      'A 30-page critical analysis examining how Humankind reframes civilization progression through cultural hybridity.',
    date: '2021.10',
    year: 2021,
    type: 'essay',
    category: 'Essays',
    status: 'published',
    role: 'Writer',
    duration: '2 Months',
    stack: ['ESSAY', 'GAME ANALYSIS', 'PDF'],
    tags: ['GAMES', 'ESSAY', 'PDF'],
    thumbnail: '/images/contents/fireElement.png',
    links: {
      article: '/Humankind.pdf'
    },
    keyFacts: [
      { label: 'Pages', value: '30' },
      { label: 'Words', value: '~12k' },
      { label: 'Format', value: 'PDF' },
      { label: 'Language', value: 'Chinese' }
    ],
    sections: [
      {
        id: 'context',
        number: '01',
        title: 'Context',
        body:
          'Most 4X reviews compare Humankind to Civilization. This essay instead asks how its fame-as-victory vector changes the story a player tells about history.'
      },
      {
        id: 'analysis',
        number: '02',
        title: 'Analysis',
        body: 'The essay is structured around three lenses:',
        bullets: [
          'Mechanics: fame as victory vector.',
          'Narrative: emergent civilization stories.',
          'Representation: hybridity versus linearity.'
        ]
      },
      {
        id: 'conclusion',
        number: '03',
        title: 'Conclusion',
        body:
          'Humankind succeeds when it treats history as a collage rather than a tech tree. The essay argues this is both its strongest design statement and its most controversial simplification.'
      },
      {
        id: 'outcomes',
        number: '04',
        title: 'Outcomes',
        body: 'After publication the essay was used as a reference in Chinese-language game analysis discussions and informed later board-game design thinking.'
      }
    ],
    related: [
      { type: "library", key: "games-collection" },
      { type: "library", key: "design-system-documentation" }
    ]
  }
]

export function getLibraryEntryBySlug(slug: string): LibraryEntry | undefined {
  return libraryEntries.find((e) => e.slug === slug)
}

export function getAdjacentLibraryEntries(
  slug: string
): { prev: LibraryEntry | null; next: LibraryEntry | null } {
  const index = libraryEntries.findIndex((e) => e.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? libraryEntries[index - 1] : null,
    next: index < libraryEntries.length - 1 ? libraryEntries[index + 1] : null
  }
}

export function getLibraryEntriesByCategory(
  category: LibraryCategory
): LibraryEntry[] {
  return libraryEntries.filter((e) => e.category === category)
}

export function getLibraryEntriesByStatus(
  status: LibraryStatus
): LibraryEntry[] {
  return libraryEntries.filter((e) => e.status === status)
}
