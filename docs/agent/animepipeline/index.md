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
  wave: {         // 可选
    elementRef: gradientRef, // React.RefObject<SVGGradientElement | null>
    from: 40,     // 路径起点 x 坐标
    to: 360,      // 路径终点 x 坐标
    width: 144,   // 可见波峰在 SVG 坐标中的跨度（应小于 to - from）
    peakRatio: 0.45, // 峰值视觉中心在 gradient 中的比例，默认 0.45
    enabled: true
  },
  duration: 2.2,        // 单次循环时长（秒）
  activeHold: 0.5,      // 单个节点激活保持时长（秒）；未启用 wave 时使用
  repeatDelay: 0.7,     // 循环间隔（秒）
  startDelay: 0.35,     // 首次进入视口后的延迟（秒）
  ease: easings.eases.out(3), // anime.js easing 函数
  loop: true,
  threshold: 0.25       // IntersectionObserver 阈值
})
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

## 调用示例：Agent 平台 MESSAGE FLOW

```tsx
const svgRef = useRef<SVGSVGElement>(null)
const gradientRef = useRef<SVGLinearGradientElement>(null)
const nodeRefs = useRef<(SVGCircleElement | null)[]>([])
const coreRefs = useRef<(SVGCircleElement | null)[]>([])

const startX = 40
const endX = 360
const pathWidth = endX - startX

const nodes = flowNodes.map((node, i) => ({
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

useSvgFlowAnimation({
  containerRef: svgRef,
  nodes,
  wave: { elementRef: gradientRef, from: startX, to: endX, width: pathWidth * 0.45, enabled: true },
  duration: 2.2,
  activeHold: 0.5,
  ease: easings.eases.out(3)
})
```

## 扩展建议

### 无波浪的纯节点流程

将 `wave` 省略或 `enabled: false`，系统只驱动节点 `onUpdate`。

### 非水平路径

当前波浪只支持水平平移。如需沿任意 SVG path 移动标记，保留旧的 `use-pipeline-animation.ts`（基于 `getPointAtLength` 的 marker 方式），或后续扩展 `useSvgFlowAnimation` 支持 `pathRef` + marker。

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
