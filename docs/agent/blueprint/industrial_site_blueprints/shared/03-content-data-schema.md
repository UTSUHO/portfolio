# 内容数据结构蓝图

第一版不需要真实 CMS，可先使用本地 TypeScript mock data 或 MDX frontmatter。

## 文件组织建议

```txt
src/
  data/
    library.ts
    notes.ts
  components/
    shell/
    ui/
    library/
    notes/
  content/
    library/
      distributed-mesh-network-system.mdx
    notes/
      consistency-in-distributed-systems.mdx
```

## Library 数据结构

```ts
export type LibraryStatus = "published" | "in-progress" | "archived";
export type LibraryType =
  | "project"
  | "case-study"
  | "experiment"
  | "documentation"
  | "tool"
  | "research";

export type LibraryEntry = {
  id: string;
  slug: string;
  number: string; // "01", "02"
  title: string;
  subtitle: string;
  summary: string;
  date: string; // "2025.05"
  year: number;
  type: LibraryType;
  category: string; // "Systems", "WebGL", ...
  status: LibraryStatus;

  role?: string;
  duration?: string;
  stack: string[];
  tags: string[];

  thumbnail?: string;
  heroVisual?: string;
  gallery?: string[];

  links?: {
    repository?: string;
    demo?: string;
    article?: string;
  };

  keyFacts?: {
    label: string;
    value: string;
    icon?: string;
  }[];

  sections?: LibrarySection[];
  relatedSlugs?: string[];
};

export type LibrarySection = {
  id: string;
  number: string; // "01"
  title: string;  // "Context"
  body: string;
  bullets?: string[];
  diagram?: string;
  table?: {
    columns: string[];
    rows: string[][];
  };
  codeBlock?: string;
};
```

## Library 示例数据

```ts
export const libraryEntries: LibraryEntry[] = [
  {
    id: "lib-003",
    slug: "distributed-mesh-network-system",
    number: "03",
    title: "Distributed Mesh Network System",
    subtitle: "Design and prototyping of a distributed mesh network system.",
    summary: "A research prototype for low-latency peer-to-peer collaboration.",
    date: "2025.03",
    year: 2025,
    type: "case-study",
    category: "Systems",
    status: "archived",
    role: "Fullstack Engineer",
    duration: "2025.03 — 2025.05",
    stack: ["Rust", "Tokio", "Tailscale", "Docker"],
    tags: ["Distributed Systems", "WebRTC", "Rust", "Tokio"],
    links: {
      repository: "https://github.com/yourname/meshnet",
      demo: "https://meshnet.yourname.dev"
    },
    keyFacts: [
      { label: "Nodes", value: "128+" },
      { label: "Max Peers", value: "1,024" },
      { label: "Avg Latency", value: "28ms" },
      { label: "Consistency", value: "Eventual" }
    ],
    sections: [
      {
        id: "context",
        number: "01",
        title: "Context",
        body: "Real-time collaboration tools require low-latency synchronization across peers."
      },
      {
        id: "architecture",
        number: "02",
        title: "Architecture",
        body: "Hybrid architecture combining a decentralized mesh layer and a minimal control plane."
      }
    ],
    relatedSlugs: [
      "realtime-collaborative-whiteboard",
      "webgl-scene-optimization-handbook"
    ]
  }
];
```

## Notes 数据结构

```ts
export type NoteCategory =
  | "Tech"
  | "Life"
  | "Thoughts"
  | "Reading"
  | "WebGL"
  | "Systems"
  | "Journal";

export type NoteEntry = {
  id: string;
  slug: string;
  title: string;
  titleZh?: string;
  excerpt: string;
  date: string; // "2025.05.28"
  category: NoteCategory;
  readingTime: string; // "8 min read"
  tags: string[];
  featured?: boolean;
  coverImage?: string;
  language?: "zh" | "en" | "mixed";
  sections?: NoteSection[];
};

export type NoteSection = {
  id: string;
  number: string;
  title: string;
  body: string[];
  bullets?: string[];
};
```

## Notes 示例数据

```ts
export const notes: NoteEntry[] = [
  {
    id: "note-001",
    slug: "consistency-in-distributed-systems",
    title: "On Consistency in Distributed Systems",
    titleZh: "关于分布式系统中一致性的一些思考",
    excerpt: "Some thoughts on eventual consistency, user mental models, and the cost of coordination.",
    date: "2025.05.28",
    category: "Tech",
    readingTime: "8 min read",
    tags: ["Distributed Systems", "Consistency", "Architecture"],
    language: "zh",
    sections: [
      {
        id: "model",
        number: "01",
        title: "一致性模型",
        body: [
          "在设计分布式系统时，一致性是一个核心命题。",
          "不同一致性模型对应不同的工程假设和用户感知。"
        ],
        bullets: [
          "强一致性：所有节点在同一时刻看到相同的数据。",
          "最终一致性：系统在足够时间后收敛到一致状态。"
        ]
      }
    ]
  }
];
```

## 筛选与排序规则

### Library

默认排序：

1. date desc
2. number asc

可筛选字段：

- category
- status
- type
- tag
- stack

### Notes

默认排序：

1. date desc

可筛选字段：

- category
- tag
- readingTime 可只显示，不必作为首版筛选条件

## URL 规则

Library：

```txt
/library
/library/distributed-mesh-network-system
```

Notes：

```txt
/notes
/notes/consistency-in-distributed-systems
```

## Slug 规则

- 全小写
- 空格转连字符
- 不使用中文 slug，除非项目明确需要中文 URL
- slug 不随标题修改轻易改变

## 内容质量边界

Library 每条记录应具备：

- 明确工程对象
- 背景 / 架构 / 实现 / 结果
- 技术栈
- 可视化或系统图
- 状态和时间

Notes 每条记录应具备：

- 明确问题意识
- 个人观察或技术思考
- 不必有完整工程结果
- 可更自由，但不能变成短微博流
