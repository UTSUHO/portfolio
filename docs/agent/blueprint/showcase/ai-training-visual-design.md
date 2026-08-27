# AI Training Showcase Visual — Design Language & Rationale

> 文件对应组件：`app/_components/showcase/visuals/ai-training-visual.tsx`  
> 卡片数据：`app/_components/showcase/showcase-data.ts` 中 `AI TRAINING PLATFORM`

---

## 1. 设计目标

这张卡片需要在一个 400×300 的 SVG 视图内，把下面这段项目经历可视化：

> 基于开源框架的 AI 训推平台，Vite 重构构建体系并集成至甲方业务系统，启动时间 180s 降至 20s。

因此视觉核心被抽象为一条控制平面（Control Plane）流程：

```
JOB QUEUE → SCHEDULER → GPU POOL / CLUSTER
```

并辅以性能对比数字（180s → 20s）作为项目成果。

---

## 2. 设计语言来源

所有 Showcase 卡片共享同一套视觉语言，以下文件是必须对照的权威来源：

| 文件 | 作用 |
|------|------|
| [`app/globals.css`](../../app/globals.css) | 全局语义颜色、字体、基础动画工具类 |
| [`app/_components/showcase/showcase.module.css`](../../app/_components/showcase/showcase.module.css) | Showcase 专属描边/填充/文字/动画层级 |
| [`app/_components/showcase/showcase-data.ts`](../../app/_components/showcase/showcase-data.ts) | 项目文案与技术栈，决定视觉叙事 |
| [`app/_components/showcase/work-showcase.tsx`](../../app/_components/showcase/work-showcase.tsx) | 三列卡片布局 |
| [`app/_components/showcase/project-card.tsx`](../../app/_components/showcase/project-card.tsx) | 卡片容器结构与 hover 行为 |
| [`app/_components/showcase/project-metadata.tsx`](../../app/_components/showcase/project-metadata.tsx) | 标题、描述、tech stack 排版 |
| [`app/_components/showcase/use-pipeline-animation.ts`](../../app/_components/showcase/use-pipeline-animation.ts) | GSAP + anime.js 驱动的 pipeline 流动动画 |
| [`app/_components/showcase/pipeline-marker.tsx`](../../app/_components/showcase/pipeline-marker.tsx) | 沿路径流动的光点 marker |

---

## 3. 视觉原则

### 3.1 颜色

颜色全部来自 `globals.css` 与 `showcase.module.css` 的语义层：

| 语义 | 值/说明 | 用途 |
|------|---------|------|
| `bg` | `#0b141e` | 卡片背景 |
| `line-faint` | `rgba(255,255,255,0.12)` | 辅助线、次要边框 |
| `line-base` | `rgba(255,255,255,0.26)` | 主要面板边框 |
| `line-strong` | `rgba(255,255,255,0.48)` | 强调线、hover 提亮 |
| `fill-panel` | `rgba(255,255,255,0.03)` | 面板底色 |
| `fill-base` | `rgba(255,255,255,0.08)` | 填充图形 |
| `accent` / `accent-fill` | `#f84532` | 激活状态、脉冲、关键数据 |
| `text-label` | `rgba(255,255,255,0.42)` | 次要标签 |
| `text-strong` | `rgba(255,255,255,0.82)` | 主要文字 |
| `text-accent` | `#f84532` | 高亮文字 |

### 3.2 字体

- 展示/工程字体：`Space Grotesk`，大写，letter-spacing 0.08em
- 正文字体：`Inter`
- 字号规范：面板标题 7px，列表项 6.5px，性能数字 12px

### 3.3 布局

- SVG viewBox：`0 0 400 300`
- 面板式布局，每个面板用 `fill-panel` 底色 + `line-base` 边框
- 面板标题用 `text-strong`，分割线用 `line-faint`
- 内容区与边框保持 6-10px 内边距

### 3.4 动画

- `draw` 类：SVG 描边入场动画
- `fade-label` 类：文字延迟淡入
- `pulse` 类：持续呼吸脉冲
- `usePipelineAnimation`：
  - `duration: 2.8` 秒完成一次流动
  - `repeatDelay: 0.8` 秒
  - 光点沿隐藏 path 从 Job Queue → Scheduler → GPU Pool 移动
  - 到达节点时 anime.js 产生 scale/opacity 脉冲

---

## 4. 当前视觉拆解

### 4.1 区域划分

```
┌─────────────────────────────────────┐
│ INFRA // CONTROL PLANE              │  顶部标题
├──────────────┬──────────────────────┤
│ JOB QUEUE    │ GPU POOL / CLUSTER   │  左上 + 右上
│ (running     │ (GPU utilization     │
│  job list)   │  bars)               │
├──────────────┤                      │
│ SCHEDULER    │ PERF // DEV SERVER   │  左下 + 右下
│ (fair share, │ START                │
│  priority)   │ 180s → 20s           │
└──────────────┴──────────────────────┘
```

### 4.2 流动路径

一条隐藏的 SVG path 连接三个关键节点：

```
Job Queue 面板底部 → Scheduler 面板 → GPU Pool 面板左侧
```

`PipelineMarker` 沿该路径移动，象征任务从队列进入调度器，再被分发到 GPU 集群。

### 4.3 激活节点

- `nodeRefs.current[0]`：正在运行的 JOB_1142
- `nodeRefs.current[1]`：SCHEDULER 面板
- `nodeRefs.current[2]`：利用率 84% 的 GPU-02

这三个节点在光点经过时会被 anime.js 放大/提亮。

### 4.4 性能数字

右下角 `PERF // DEV SERVER START` 区域：

- `180s` → `20s` 用 `text-strong` 和 `text-accent` 对比
- 副标题 `-89% BUILD TIME` 用 `text-label`
- 下方折线 `sparkPoints` 用 `draw` 动画强化下降趋势/优化成果

---

## 5. 叙事映射

| 视觉元素 | 项目经历 |
|----------|----------|
| JOB QUEUE | AI 训练任务的提交与排队 |
| SCHEDULER | 在有限资源下做公平共享与优先级调度 |
| GPU POOL / CLUSTER | 底层 GPU 集群的利用率监控 |
| 180s → 20s | Vite 重构构建体系后的启动时间优化 |
| 流动光点 | 控制平面的持续运转与数据/任务流动 |

---

## 6. 未来重设计方向（基于更完整的叙事）

如果你希望把下面这段经历也表达进去：

> 在有限开发资源和时间限制下实现了业务目标，参与了底层集群 Ray → vLLM 的构建，尽管是在不连续且多个迭代中实现的。

可以考虑以下调整，同时保持现有设计语言不变：

### 6.1 突出“有限资源 / 多迭代”

- 在 `SCHEDULER` 面板增加迭代标记，例如版本号 `v0.3 → v0.7 → v1.0` 或 `ITER_1 / ITER_2 / ITER_3`
- 用 `line-faint` 表示旧迭代，`line-base` / `accent` 表示当前稳定迭代
- 在 `JOB QUEUE` 中增加 `RETRY` 或 `QUEUED` 状态，暗示任务多次调度

### 6.2 表达 Ray → vLLM 集群演进

- 把 `GPU POOL / CLUSTER` 标题改为 `SERVE // RAY → VLLM`
- 在 GPU 列表下方增加一条小分支：左侧 `RAY SERVE` 节点，右侧 `VLLM ENGINE` 节点，中间用箭头连接
- 或者把 GPU 利用率条改为两列：一列 `TRAIN`、一列 `INFERENCE`，体现训推一体

### 6.3 强化“在约束下交付”

- 在 `PERF` 区域增加资源对比，例如：
  - `TEAM: 2 FE`
  - `TIME: 6 WEEKS`
  - `BUILD: -89%`
- 保持红色 `accent` 只用于最关键的成果数字，避免喧宾夺主

### 6.4 不破坏现有语言的前提

- 仍然使用 `line-base` 面板边框 + `fill-panel` 底色
- 仍然使用 `Space Grotesk` 大写标签
- 仍然使用 `usePipelineAnimation` 做光点流动，但可延长 `duration` 到 3.2-4.0 秒，让 Ray→vLLM 的演进路径更容易被看清
- 新增元素优先使用 `line-faint` / `fill-base`，只在当前/关键状态上用 `accent`

---

## 7. 快速修改参数指南

如需调整动画节奏，修改 `ai-training-visual.tsx` 中 `usePipelineAnimation` 的调用参数：

```ts
usePipelineAnimation({
  containerRef: svgRef,
  pathRef: motionPathRef,
  markerRef,
  nodes,
  duration: 2.8,      // 单次循环总时长，越大越慢
  loop: true,
  repeatDelay: 0.8,   // 每次循环间隔
  startDelay: 0.4     // 首次进入视口延迟
})
```

如需让节点激活停留更久，需要进入 `use-pipeline-animation.ts` 调整 anime.js 的 `duration: 350`。

---

## 8. 结论

当前 `ai-training-visual.tsx` 的设计严格遵循了项目统一的 Showcase 设计语言：深色工程面板、三级灰白描边、红色强调、Space Grotesk 工程字体、GSAP 流动动画。它的叙事被抽象为 `JOB QUEUE → SCHEDULER → GPU POOL` 的控制平面流程，并用 `180s → 20s` 突出构建优化成果。后续若需加入 Ray→vLLM 演进和有限资源下的迭代叙事，应在保持现有视觉语言的前提下，通过增加面板细节、迭代标记和次要路径来实现。
