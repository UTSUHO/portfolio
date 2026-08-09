# SVG Pipeline 动画控制系统

## 位置

- 实现：`app/_components/showcase/use-svg-flow-animation.ts`
- 首次使用：`app/_components/showcase/visuals/agent-platform-visual.tsx`

## 目标

把 WORK_SHOWCASE 中「统一 timeline + 可选波浪 + 节点按 progress 激活」的动画模式抽象为可复用的 React hook，方便后续在 CAD、AI 等视觉组件中复用，避免每个组件重复实现 GSAP timeline、循环边界处理、IntersectionObserver 触发等逻辑。

## 设计原则

- **单一 timeline**：所有效果（波浪位置、节点强度）从一个 `progress: 0 → 1` 派生。
- **循环跨越安全**：节点激活窗口支持跨越 `t=1` / `t=0` 边界，最后一个节点不会被截断。
- **声明式节点**：每个节点只需声明 `progress` 和回调，视觉表现由调用方决定。
- **依赖最小**：只依赖 `gsap` + `animejs`（easing），无 `@gsap/react` 等额外包。
- **可见性触发**：复用 IntersectionObserver，进入视口后播放，离开暂停。

## API

```ts
import useSvgFlowAnimation, { type FlowNode, type FlowWave } from '../use-svg-flow-animation'

const nodes: FlowNode[] = [
  {
    progress: 0,
    onUpdate: intensity => { /* 0-1，驱动该节点的视觉变化 */ },
    onEnter: () => { /* 进入激活态（intensity > 0.5） */ },
    onLeave: () => { /* 离开激活态 */ }
  },
  { progress: 0.25, onUpdate: ... },
  { progress: 0.5, onUpdate: ... },
  { progress: 0.75, onUpdate: ... },
  { progress: 1, onUpdate: ... }
]

useSvgFlowAnimation({
  containerRef,   // React.RefObject<HTMLElement | SVGElement | null>
  nodes,          // FlowNode[]
  wave: {         // 主线波浪，可选
    elementRef: gradientRef, // React.RefObject<SVGGradientElement | null>
    from: 40,     // 路径起点 x 坐标
    to: 360,      // 路径终点 x 坐标
    width: 144,   // 可见波峰在 SVG 坐标中的跨度（应小于 to - from）
    peakRatio: 0.45, // 峰值视觉中心在 gradient 中的比例，默认 0.45
    enabled: true
  },
  branches: [      // 分支路径，可选
    {
      id: 'down',
      from: { x: 120, y: 252 },  // fork 点（主线 AUTH）
      to: { x: 380, y: 280 },    // 分支终点
      pathPoints: [              // 折线路径；提供后形成连续动画
        { x: 120, y: 252 },
        { x: 168.5, y: 280 },    // 30° 斜线终点
        { x: 380, y: 280 }
      ],
      wave: {
        elementRef: branchGradientRef,
        width: 120,
        enabled: true
      },
      forkAt: 0.25,             // 主线 progress 达到 0.25（AUTH）时分支开始波动
      joinAt: 0.75              // 可选：主线 progress 达到 0.75 时分支结束；省略时默认到 1
    }
  ],
  duration: 2.2,        // 正向脉冲时长（秒）
  fadeDuration: 0.4,    // 返回熄灭时长（秒），默认等于 duration
  activeHold: 0.5,      // 单个节点激活保持时长（秒）；未启用 wave 时使用
  repeatDelay: 0.7,     // 循环间隔（秒）
  startDelay: 0.35,     // 首次进入视口后的延迟（秒）
  ease: easings.eases.out(3), // anime.js easing 函数
  loop: true,
  threshold: 0.25       // IntersectionObserver 阈值
})
```

节点可通过 `pathId` 指定所属路径，未指定则归属主线：

```ts
const nodes: FlowNode[] = [
  { progress: 0, onUpdate: ... },               // 主线
  { progress: 0.5, pathId: 'down', onUpdate: ... } // 名为 'down' 的分支
]
```

## 节点强度计算

当启用 `wave` 时，系统把节点激活窗口和波峰左右边缘绑定：

- 波峰**右边缘**从路径起点 `from` 进入
- 波峰**左边缘**从路径终点 `to` 离开
- 波峰**右边缘**抵达节点 `progress` 时，节点开始激活
- 波峰**左边缘**离开节点 `progress` 时，节点结束激活

```
totalTravel = pathWidth + wave.width
halfWindow  = wave.width / (2 * totalTravel)
center      = (progress * pathWidth + wave.width / 2) / totalTravel
intensity   = 1 - (cyclicDistance(t, center) / halfWindow)
```

未启用 `wave` 时，窗口由 `activeHold / duration` 决定。

## 波浪机制

如果传入 `wave`，系统会在每次 `onUpdate` 中根据当前 `t` 设置：

```ts
const totalTravel = (wave.to - wave.from) + wave.width
const waveOffset = lerp(wave.from - wave.width, wave.to, t)
element.setAttribute('gradientTransform', `translate(${waveOffset}, 0)`)
```

SVG 中需要准备一条 `stroke="url(#your-gradient)"` 的 path，且该 gradient 宽度等于 `wave.width`：

```svg
<linearGradient id="flow-wave" x1={0} y1={0} x2={144} y2={0} gradientUnits="userSpaceOnUse">
  <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
  <stop offset="45%" stopColor="rgba(248,69,50,1)" />
  <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
</linearGradient>
```

通过 `gradientTransform` 平移，波峰右边缘会从路径起点进入，左边缘会从路径终点离开；右边缘先抵达节点，左边缘后离开，形成“脉冲”扫过效果。

## 分支路径

当 pipeline 需要在某个节点分叉时，可传入 `branches`。

每个分支由 `FlowBranch` 描述：

- `id`：路径标识，供 `FlowNode.pathId` 引用
- `from` / `to`：分支起点和终点坐标（起点通常与主线某个节点重合）
- `wave`：该分支独立的 gradient wave
- `forkAt`：主线 timeline progress 达到多少时分支开始波动（0-1）
- `joinAt`（可选）：主线 timeline progress 达到多少时分支结束（0-1）。提供时分支 timeline 映射 `[forkAt, joinAt] → [0,1]`，适用于分支需要汇入主线或某个节点的场景；省略时默认映射 `[forkAt, 1]`。

分支 timeline 与主线共享。设主线当前 progress 为 `t`：

```ts
// 未提供 joinAt（默认）
const branchT = t < forkAt ? 0 : (t - forkAt) / (1 - forkAt)

// 提供 joinAt
const branchT = t < forkAt ? 0 : t > joinAt ? 1 : (t - forkAt) / (joinAt - forkAt)
```

分支波峰同样遵循“右边缘进入、左边缘离开”。如果分支提供 `pathPoints`，hook 会把它当作一条连续折线处理：根据 `branchT` 找到当前所在线段，将 gradient 平移到该点并旋转到线段方向，从而形成沿折线连续流动的单一动画；否则使用 `from`/`to` 的直线行为。

```ts
const angle = Math.atan2(to.y - from.y, to.x - from.x)
const localOffset = lerp(-wave.width, pathLength, branchT)
const transform = `translate(${from.x}, ${from.y}) rotate(${angle * 180 / Math.PI}) translate(${localOffset}, 0)`
```

SVG 中需要为每个分支准备一条 `stroke="url(#branch-gradient)"` 的 path 和对应的 `linearGradient`。如果希望呈现类似 git branch log 的视觉效果——即从主线某节点用 30° 斜线连接到与主线平行的分支线——可把整条折线作为动画路径：

```svg
<!-- 折线动画路径 -->
<linearGradient id="branch-flow-wave" x1={0} y1={0} x2={120} y2={0} gradientUnits="userSpaceOnUse">
  <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
  <stop offset="45%" stopColor="rgba(248,69,50,1)" />
  <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
</linearGradient>

<path d="M120 252 L168.5 280 L380 280" stroke="url(#branch-flow-wave)" strokeWidth={1.5} strokeLinecap="round" />
```

分支节点的 `progress` 是沿分支路径的相对位置（0 在 `from`，1 在 `to`）。

## 调用示例：Agent 平台 MESSAGE FLOW（含 30° 连续分支）

```tsx
const svgRef = useRef<SVGSVGElement>(null)
const gradientRef = useRef<SVGLinearGradientElement>(null)
const branchGradientRef = useRef<SVGLinearGradientElement>(null)
const nodeRefs = useRef<(SVGCircleElement | null)[]>([])
const coreRefs = useRef<(SVGCircleElement | null)[]>([])
const branchNodeRefs = useRef<(SVGCircleElement | null)[]>([])
const branchCoreRefs = useRef<(SVGCircleElement | null)[]>([])

const startX = 40
const endX = 360
const pathWidth = endX - startX

const forkX = 120       // AUTH 节点
const forkY = 252       // 主线 Y
const branchY = 280     // 分支 Y
const branchStart = {
  x: forkX + (branchY - forkY) / Math.tan((30 * Math.PI) / 180),
  y: branchY
}
const branchEnd = { x: 380, y: branchY }
const branchPathPoints = [
  { x: forkX, y: forkY },
  branchStart,
  branchEnd
]

const diagLength = Math.hypot(branchStart.x - forkX, branchStart.y - forkY)
const branchPathLength = diagLength + (branchEnd.x - branchStart.x)

const mainNodes = flowNodes.map((node, i) => ({
  progress: (node.x - startX) / pathWidth,
  onUpdate: (intensity: number) => {
    const circle = nodeRefs.current[i]
    const core = coreRefs.current[i]
    if (!circle) return

    const active = intensity > 0.5
    circle.setAttribute('class', active ? styles.accent : styles['line-base'])
    circle.setAttribute('r', String(lerp(3.5, 5.2, intensity)))

    if (core) {
      core.setAttribute(
        'class',
        active ? `${styles['accent-fill']} ${styles.pulse}` : styles['fill-base']
      )
    }
  }
}))

// 分支节点与主线 STREAM / TOOL_CALL / CLOSE 在 x 方向上下对齐
const branchFlowNodes = [
  { x: 200, y: branchY, label: 'BRANCH_01' },
  { x: 280, y: branchY, label: 'BRANCH_02' },
  { x: 360, y: branchY, label: 'BRANCH_03' }
]

const branchNodes = branchFlowNodes.map((node, i) => ({
  progress: (diagLength + (node.x - branchStart.x)) / branchPathLength,
  pathId: 'down',
  onUpdate: (intensity: number) => {
    const circle = branchNodeRefs.current[i]
    const core = branchCoreRefs.current[i]
    if (!circle) return

    const active = intensity > 0.5
    circle.setAttribute('class', active ? styles.accent : styles['line-base'])
    circle.setAttribute('r', String(lerp(3, 4.5, intensity)))

    if (core) {
      core.setAttribute(
        'class',
        active ? `${styles['accent-fill']} ${styles.pulse}` : styles['fill-base']
      )
    }
  }
}))

useSvgFlowAnimation({
  containerRef: svgRef,
  nodes: [...mainNodes, ...branchNodes],
  wave: { elementRef: gradientRef, from: startX, to: endX, width: pathWidth * 0.45, enabled: true },
  branches: [
    {
      id: 'down',
      from: { x: forkX, y: forkY },
      to: branchEnd,
      pathPoints: branchPathPoints,
      wave: { elementRef: branchGradientRef, width: branchPathLength * 0.45, enabled: true },
      forkAt: (forkX - startX) / pathWidth
    }
  ],
  duration: 2.2,
  fadeDuration: 0.4,
  activeHold: 0.5,
  ease: easings.eases.out(3)
})
```

## 调用示例：CAD B-REP Annotation Workflow（分叉-汇合）

当分支需要从主线某节点分出、经过若干并行节点、再汇入主线另一节点时，使用 `joinAt`：

```ts
const PIPELINE_Y = 264
const TOP_BRANCH_Y = 220
const BOTTOM_BRANCH_Y = 270
const startX = 40
const endX = 360
const pathWidth = endX - startX

const topBranchPathPoints = [
  { x: 120, y: PIPELINE_Y },   // OCCT
  { x: 160, y: TOP_BRANCH_Y }, // GLB
  { x: 240, y: TOP_BRANCH_Y }, // FACE MAP
  { x: 200, y: PIPELINE_Y },   // VIEWER
]

const topBranchPathLength = topBranchPathPoints.reduce(
  (sum, p, i) => i === 0 ? 0 : sum + Math.hypot(p.x - topBranchPathPoints[i - 1].x, p.y - topBranchPathPoints[i - 1].y),
  0
)

useSvgFlowAnimation({
  containerRef: svgRef,
  nodes: [
    // 主线节点
    { progress: 0, onUpdate: ... },      // STEP
    { progress: 0.25, onUpdate: ... },   // OCCT
    { progress: 0.5, onUpdate: ... },    // VIEWER
    { progress: 0.6875, onUpdate: ... }, // ANNOT
    { progress: 0.875, onUpdate: ... },  // RECON
    // 上分支节点
    { progress: 59.47 / topBranchPathLength, pathId: 'top', onUpdate: ... },  // GLB
    { progress: 139.47 / topBranchPathLength, pathId: 'top', onUpdate: ... }, // FACE MAP
    // 下分支节点
    { progress: 0.423, pathId: 'bottom', onUpdate: ... }, // ML ADAPTER
    { progress: 1, pathId: 'bottom', onUpdate: ... },     // EXTERNAL
  ],
  wave: {
    elementRef: gradientRef,
    from: startX,
    to: endX,
    width: pathWidth * 0.45,
    enabled: true,
  },
  branches: [
    {
      id: 'top',
      from: { x: 120, y: PIPELINE_Y },
      to: { x: 200, y: PIPELINE_Y },
      pathPoints: topBranchPathPoints,
      wave: { elementRef: topGradientRef, width: topBranchPathLength * 0.45, enabled: true },
      forkAt: 0.25, // OCCT
      joinAt: 0.5,  // VIEWER
    },
    {
      id: 'bottom',
      from: { x: 320, y: PIPELINE_Y },
      to: { x: 370, y: BOTTOM_BRANCH_Y },
      pathPoints: [
        { x: 320, y: PIPELINE_Y },
        { x: 330, y: BOTTOM_BRANCH_Y }, // 30° 斜线终点
        { x: 370, y: BOTTOM_BRANCH_Y },
      ],
      wave: { elementRef: bottomGradientRef, width: 51.95 * 0.45, enabled: true },
      forkAt: 0.875, // RECON
    }
  ],
  duration: 2.2,
  fadeDuration: 0.4,
  activeHold: 0.5,
  ease: easings.eases.out(3),
})
```

上分支从 OCCT 分出，经过 GLB 与 FACE MAP，在 VIEWER 处汇入主线；`joinAt: 0.5` 保证分支波与主线波同时到达 VIEWER。下分支从 RECON 分出，单向延伸到 ML ADAPTER 与 EXTERNAL。

## 扩展建议

### 无波浪的纯节点流程

将 `wave` 省略或 `enabled: false`，系统只驱动节点 `onUpdate`。

### 非水平路径

- **分支路径**：`useSvgFlowAnimation` 的 `branches` 支持任意直线段。hook 内部会计算路径角度并旋转 gradient，因此可用于斜向或垂直分支。
- **任意曲线路径**：如需沿复杂 SVG path（折线、曲线）移动标记，保留旧的 `use-pipeline-animation.ts`（基于 `getPointAtLength` 的 marker 方式），或后续扩展 `useSvgFlowAnimation` 支持 `pathRef` + marker。

### 调试 easing

直接修改传入的 `ease`：

```ts
import { easings } from 'animejs'

easings.eases.outCubic
easings.eases.out(3)
easings.eases.outBack(1.7)
easings.eases.outElastic(1, 0.3)
```

## 边界与注意

- `wave.elementRef` 在 hook 初始化时 current 必须已挂载；通常需要在组件 render 后由 useEffect 首次执行时保证存在。
- 节点 `onUpdate` 每帧调用，避免做昂贵操作（如 setState、DOM 测量）。
- 组件卸载时 timeline 和 observer 会自动清理。

## 相关文件

- `app/_components/showcase/use-svg-flow-animation.ts`
- `app/_components/showcase/visuals/agent-platform-visual.tsx`
- `app/_components/showcase/showcase.module.css`
