# Project Markdown Conversion

This document describes how archived project Markdown files (e.g. `docs/data/PROJECT_ARCHIVE/*.MD` or any source marked for conversion to a **project**) are converted into a hardcoded `Project` entry in `lib/data/projects.ts`, and how the corresponding Markdown archive mirror (`content/projects/{id}.md`) must be kept aligned.

The detail page (`/projects/[id]`) reads from `lib/data/projects.ts`. The Markdown file in `content/projects/{id}.md` is the canonical archive mirror and must stay in sync with the TypeScript entry.

## Source Layout

| Type    | Archive source                        | Markdown source           | Hardcoded data module |
| ------- | ------------------------------------- | ------------------------- | --------------------- |
| project | `docs/data/PROJECT_ARCHIVE/{NAME}.MD` | `content/projects/{id}.md` | `lib/data/projects.ts` |

## Target Type Shape

The converted entry must satisfy `Project` declared in `lib/data/types/projects.ts`:

```ts
interface Project {
  id: string                    // numeric project id, e.g. "11"
  title: string
  subtitle: string
  category: string
  year: string                  // e.g. "2025"
  meta: {
    type: string
    role: string
    status: string
    date: string
    duration: string
    tech: string
  }
  visualType: 'wireframe' | 'network' | 'voxel' | 'shader'
  tags: ProjectTag[]            // 0..6, see PROJECT_TAG_MAP
  overview: string
  problem: string
  solution: string
  architecture: {
    title?: string
    blocks: { label: string; value: string }[]
    flow?: string               // Mermaid or plain text flow
  }
  techStack: { header: string; content: string }[]
  challenges: string[]
  outcome: string
  related: RelatedRef[]         // { type, key } or "type:key"
}
```

## Section Mapping

Projects use a fixed seven-section structure. Map source headings to these fields:

| Target field                | Acceptable source headings                                   |
| --------------------------- | ------------------------------------------------------------ |
| `overview`                  | PROJECT OVERVIEW, 项目概述, Overview, 概述                   |
| `problem`                   | PROBLEM, 问题, 设计动机, DESIGN MOTIVATION, Background       |
| `solution`                  | SOLUTION, 解决方案, Approach, 方案                           |
| `architecture.title/blocks` | ARCHITECTURE, 架构, System Design, MODULE DESIGN, 模块设计   |
| `architecture.flow`         | Flow, 流程, any Mermaid block inside `architecture` section  |
| `techStack`                 | TECH STACK, 技术栈, Tech Stack, Stack                        |
| `challenges`                | CHALLENGES, 挑战, ENGINEERING HIGHLIGHTS, 工程挑战, Trade-offs |
| `outcome`                   | OUTCOME, 结果, PROJECT VALUE, 项目价值, Results              |

## Frontmatter Rules

Top-level YAML frontmatter maps directly to scalar `Project` fields:

```yaml
---
id: "15"
title: "Agent 聚合网关"
subtitle: "部署在容器内部的 Agent 连接适配层..."
category: "AI / Gateway"
year: "2026"
visualType: network          # wireframe | network | voxel | shader
tags:
  - 0                        # work
  - 2                        # ai
  - 4                        # frontend
  - 6                        # design
meta:
  type: "AI Agent Frontend Platform"
  role: "Frontend Architect / Integration Developer"
  status: "Archived"
  date: "2026-07"
  duration: "Project Archive"
  tech: "Vue 3 / Vite 8 / Pinia 3 / Tailwind CSS 4 / WebSocket / noVNC"
related:
  - "project:14"
---
```

Rules:

- `id` must be a unique numeric string. Keep the existing archive ID when migrating.
- `year` is a string so it can be rendered directly; do not convert to a number.
- `visualType` must be one of `wireframe`, `network`, `voxel`, `shader`. Default to `wireframe` when missing or invalid.
- `tags` are integers `0..6`. Filter out any invalid values silently.
- `meta` keys are all required strings; use `""` if the source does not provide a value.

## Body Extraction Rules

### 1. `overview`, `problem`, `solution`, `outcome`

Each becomes a single paragraph string.

- Take the **first paragraph** under the heading.
- Strip inline bold/italic markers only if they are redundant with the sentence.
- Do **not** include lists, diagrams, or sub-headings in these fields.

### 2. `architecture`

Source sections with labeled blocks produce `architecture.blocks`:

```markdown
## ARCHITECTURE

### POSITION
agent-interface 位于业务用户、K8s 业务层后端...

### ENTRY
通过 HTTP API 访问 K8s...
```

becomes:

```ts
architecture: {
  title: 'ARCHITECTURE',
  blocks: [
    { label: 'POSITION', value: 'agent-interface 位于业务用户、K8s 业务层后端...' },
    { label: 'ENTRY', value: '通过 HTTP API 访问 K8s...' }
  ]
}
```

A Mermaid or text flowchart under the same heading becomes `architecture.flow`.

### 3. `architecture.flow`

Accept two forms:

- **Mermaid**: copy the entire Mermaid definition (without the ` ```mermaid ` fence) into `flow`.
- **Text flow**: a pipeline using `→` or arrows can be stored as a single-line string or a template literal with real line breaks.

Never concatenate lines with `\n`.

### 4. `techStack`

Accept two source forms:

- **String list** (`- Vue 2`) → `{ header: '', content: 'Vue 2' }`
- **Labeled pair** (`- Frontend: Vue 3`) → `{ header: 'Frontend', content: 'Vue 3' }`

When the source is prose like `TECH STACK: Vue 3 / Pinia / Tailwind`, split on ` / ` into plain entries with empty headers.

### 5. `challenges`

Every bullet under the heading becomes one string in the array.

```markdown
## CHALLENGES

- OAuth2 与 wujie ticket 模式并存...
- 聊天流式消息需要增量合并...
```

becomes:

```ts
challenges: [
  'OAuth2 与 wujie ticket 模式并存...',
  '聊天流式消息需要增量合并...'
]
```

### 6. `related`

Use the `{type}:{key}` string form in Markdown and the object form in TypeScript:

```yaml
related:
  - "project:12"
  - "library:api-disruptor"
  - "note:building-with-webgl"
```

```ts
related: [
  { type: 'project', key: '12' },
  { type: 'library', key: 'api-disruptor' },
  { type: 'note', key: 'building-with-webgl' }
]
```

See `docs/harness/cross-type-references.md` for full reference rules.

## Newline & Escaping Rules

- **Never** write `\n` or `join('\n')` in migration scripts or TypeScript source. In a JS/TS string literal, `\n` becomes the two visible characters `\` and `n`.
- Use real line breaks inside Markdown files.
- For multi-line `architecture.flow` strings in TypeScript, use template literals with actual line breaks.
- Use arrays for `challenges` and `techStack`; do not concatenate items with `\n`.

## Pix Harness

Pix is the primary validation case for these rules.

### Input excerpt

See [`fixtures/pix-archive-excerpt.md`](fixtures/pix-archive-excerpt.md) for the relevant sections of `docs/data/PROJECT_ARCHIVE/PIX.MD`.

### Expected TypeScript output

The Pix entry in `lib/data/projects.ts` should look like this after conversion:

```ts
{
  id: 'pix',
  title: 'Pix',
  subtitle: '面向 Pi Coding Agent 的 WSL2 运行编排与容器沙箱工具',
  category: 'Tools / CLI',
  year: '2026',
  meta: {
    type: 'CLI Tool',
    role: 'Solo Engineer',
    status: 'In Progress',
    date: '2026',
    duration: 'Ongoing',
    tech: 'Node.js / WSL2 / Docker Desktop / Mutagen / rsync'
  },
  visualType: 'network',
  tags: [1, 5], // interest, fullstack
  overview: 'Pix 是一个通过 NPM 分发的 Windows CLI 工具，用于将 Pi Coding Agent 的运行环境从宿主系统中解耦，并统一编排 Windows、WSL2 与 Docker Desktop 之间的执行链路。',
  problem: 'Pi Coding Agent 通常需要读取项目文件、执行命令、安装依赖并修改代码。直接在 Windows 宿主环境运行 Agent，会使 Agent 获得较大的本地文件与进程访问范围；直接将 NTFS 项目目录挂载进 Docker，则会引入明显的小文件读写延迟。',
  solution: 'Pix 将问题拆分为三个相互独立的部分：保留 Windows 下的低成本调用体验；将项目投影到 WSL ext4 文件系统以获得高性能工作区；根据项目策略选择 WSL 直接执行或 Docker 容器执行。',
  architecture: {
    title: 'ARCHITECTURE',
    blocks: [
      { label: 'HOST BRIDGE', value: '负责 Windows 与 WSL2 之间的环境检测、路径转换和进程重启...' },
      { label: 'WORKSPACE CONTROLLER', value: '负责识别 NTFS 工作区、创建稳定的 ext4 投影路径...' },
      { label: 'RUNTIME MANAGER', value: '维护唯一的 Pi Agent Runtime...' },
      { label: 'EXECUTION ROUTER', value: '根据 CLI 参数、用户配置和项目配置选择执行策略。' },
      { label: 'SANDBOX ADAPTER', value: '将工作区、Runtime、网络模式、文件权限和环境变量转换为 Docker 启动参数...' },
      { label: 'DIAGNOSTIC LAYER', value: '在启动前后检查 WSL、Docker、Pi、Mutagen、工作区存储位置以及 Runtime 挂载状态...' }
    ],
    flow: `flowchart LR\n  CLI["Windows / WSL CLI Entry"] --> BOOT["WSL Bootstrap"]\n  ...`
  },
  techStack: [
    { header: '', content: 'Node.js' },
    { header: '', content: 'WSL2' },
    { header: '', content: 'Docker Desktop' },
    { header: '', content: 'Mutagen' },
    { header: '', content: 'rsync' }
  ],
  challenges: [
    '桥接 Windows、WSL2 与 Docker 文件系统语义，同时不向用户暴露路径复杂性。',
    'Pi Runtime 状态需要在容器销毁和执行模式切换时保持连续。',
    'Mutagen 不可用时需优雅降级到 rsync/cp，避免同步组件故障阻断 Agent 启动。',
    '通过项目级 `.pix.json` 安全地注入 API Key、代理和网络策略。'
  ],
  outcome: 'Pix 将原本需要手动完成的 WSL 路径转换、Docker 镜像构建、目录挂载、环境变量注入、Runtime 管理和项目同步封装为单一 CLI 工作流。其目标是在不破坏本地开发体验的前提下，为具备代码执行能力的 Agent 提供更明确、可配置且可诊断的运行边界。',
  related: []
}
```

## Common Mistakes

| Mistake                                      | Why it fails                                                                           |
| -------------------------------------------- | -------------------------------------------------------------------------------------- |
| Using `\n` inside `overview`/`problem`/etc.  | The detail page renders these as plain text, so `\n` appears as visible characters.    |
| Putting list items inside `problem`          | Lists in these fields are not rendered as `<ul>`; use `challenges`.                    |
| Concatenating bullets with `join('\n')`      | Produces visible `\n` pollution. Use an array.                                         |
| Forgetting `architecture.title`              | The detail page shows a generic header when `title` is missing.                        |
| Using a project slug instead of `id`         | `getProjectById` looks up by `id`.                                                     |
| Forgetting to update `content/projects/{id}.md` | The Markdown source is the archive mirror; it must stay aligned with `lib/data/projects.ts`. |

## How It Is Rendered

`app/projects/[id]/page.tsx` renders each field like this:

- `overview`, `problem`, `solution`, `outcome` → plain text inside `<p>`
- `architecture.blocks` → grid of labeled cards via `ArchitectureDiagram`
- `architecture.flow` → `MermaidChart` inside `ArchitectureDiagram`
- `techStack` → list of entries (header optional)
- `challenges` → `<ul>` with accent markers
- `related` → `RelatedLinks` panel at the bottom

Because these fields are not parsed as Markdown, structure must be explicit in the data shape.

## Validation

1. Save the files.
2. Run `npx next build`.
3. Open `/projects/{id}` in a browser.
4. Confirm that lists render as bullets, architecture renders as cards, and no `\n` characters are visible.
5. Search `.next/server/app/projects/{id}.html` for `\n`; there should be no literal backslash-n sequences inside rendered text.
6. Search the source for `body:.*\\n` in `lib/data/projects.ts` and confirm there are no matches.

## Migration Checklist

When converting a new archive into a project entry:

- [ ] Map each heading to the correct canonical field (`overview`, `problem`, `solution`, `architecture`, `techStack`, `challenges`, `outcome`).
- [ ] Keep paragraph fields to one or two sentences.
- [ ] Convert lists under `challenges` into string arrays.
- [ ] Move Mermaid/text flows into `architecture.flow`.
- [ ] Convert `techStack` into `{ header, content }` objects.
- [ ] Preserve `id`, `year`, and `tags` from the original frontmatter.
- [ ] Update both `content/projects/{id}.md` and `lib/data/projects.ts`.
- [ ] Ensure no `\n` literals appear in any paragraph field.
- [ ] Run `npx next build` and visually verify the detail page.
