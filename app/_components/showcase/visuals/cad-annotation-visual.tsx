"use client";

import { useRef, useMemo } from 'react'
import { easings } from 'animejs'
import type { EasingFunction } from 'animejs'
import styles from '../showcase.module.css'
import useSvgFlowAnimation, { type FlowNode } from '../use-svg-flow-animation'

const startX = 90
const endX = 309
const pathWidth = endX - startX
const waveWidth = pathWidth * 0.45

const pipelineNodes = [
  { x: 90, label: 'STEP' },
  { x: 200, label: 'OCCT' },
  { x: 309, label: 'ANNOTATION' }
]

const LOOP_DURATION = 2.2
const ACTIVE_HOLD = 0.5
const FADE_DURATION = 0.4
const nodeEase: EasingFunction = easings.eases.out(3)

function setNodeAccent(node: SVGGElement | null, intensity: number) {
  if (!node) return
  const active = intensity > 0.5

  // 节点边框/主形状
  const shapes = node.querySelectorAll('rect, polygon, circle')
  shapes.forEach(shape => {
    const isTextMarker = shape.tagName === 'circle' && shape.getAttribute('r') === '2'
    if (isTextMarker) {
      shape.setAttribute('class', active ? `${styles['accent-fill']} ${styles.pulse}` : styles['line-strong'])
    } else {
      shape.setAttribute('class', active ? styles.accent : styles['line-base'])
    }
  })

  // 内部装饰线
  const innerLines = node.querySelectorAll('line')
  innerLines.forEach(line => {
    line.setAttribute('class', active ? styles.accent : styles['line-faint'])
  })

  // 文字标签
  const text = node.querySelector('text')
  if (text) {
    text.setAttribute('class', active ? styles['text-accent'] : styles['text-strong'])
  }
}

export default function CadAnnotationVisual() {
  const svgRef = useRef<SVGSVGElement>(null)
  const gradientRef = useRef<SVGLinearGradientElement>(null)
  const nodeRefs = useRef<(SVGGElement | null)[]>([])

  const nodes = useMemo<FlowNode[]>(() =>
    pipelineNodes.map((node, i) => ({
      progress: (node.x - startX) / pathWidth,
      onUpdate: intensity => {
        setNodeAccent(nodeRefs.current[i], intensity)
      }
    })),
  [])

  useSvgFlowAnimation({
    containerRef: svgRef,
    nodes,
    wave: {
      elementRef: gradientRef,
      from: startX,
      to: endX,
      width: waveWidth,
      enabled: true
    },
    duration: LOOP_DURATION,
    fadeDuration: FADE_DURATION,
    activeHold: ACTIVE_HOLD,
    repeatDelay: 0.7,
    startDelay: 0.35,
    ease: nodeEase,
    loop: true
  })

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid meet"
      className="block w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <pattern id="cad-iso-grid" width={34.64} height={20} patternUnits="userSpaceOnUse">
          <path d="M17.32 0 L34.64 10 L17.32 20 L0 10 Z" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
        </pattern>

        <linearGradient
          id="cad-flow-wave"
          ref={gradientRef}
          x1={0}
          y1={0}
          x2={waveWidth}
          y2={0}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="45%" stopColor="rgba(248,69,50,1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
        </linearGradient>
      </defs>

      <text x={24} y={24} fontSize={7} className={styles['text-label']}>
        GEOM // B-REP VIEWER
      </text>
      <text x={376} y={24} fontSize={7} textAnchor="end" className={styles['text-label']}>
        MODE: FACE_PICK
      </text>

      <rect x={56} y={36} width={288} height={188} fill="url(#cad-iso-grid)" stroke="none" />
      <path d="M68 36 H56 V48" fill="none" className={styles['line-strong']} />
      <path d="M332 36 H344 V48" fill="none" className={styles['line-strong']} />
      <path d="M56 212 V224 H68" fill="none" className={styles['line-strong']} />
      <path d="M344 212 V224 H332" fill="none" className={styles['line-strong']} />

      <path d="M200 140 L279.7 186 M200 140 L148 170 M200 140 L200 96" fill="none" strokeDasharray="3 3" className={styles['line-faint']} />

      <g className={styles['fade-label']} style={{ ['--draw-delay' as string]: '900ms' }}>
        <polygon points="279.7,186 227.7,216 227.7,172 279.7,142" stroke="none" className={styles['accent-soft']} />
        <polygon points="279.7,186 227.7,216 227.7,172 279.7,142" fill="none" className={styles.accent} />
        <circle cx={253.7} cy={179} r={3} fill="none" className={styles.accent} />
        <circle cx={253.7} cy={179} r={1} stroke="none" className={`${styles['accent-fill']} ${styles.pulse}`} />
      </g>

      <path
        d="M200 96 L279.7 142 L279.7 186 L227.7 216 L148 170 L148 126 Z"
        pathLength={1}
        fill="none"
        className={`${styles['line-strong']} ${styles.draw}`}
        style={{ ['--draw-delay' as string]: '200ms' }}
      />
      <path
        d="M279.7 142 L227.7 172 L148 126 M227.7 172 L227.7 216"
        pathLength={1}
        fill="none"
        className={`${styles['line-base']} ${styles.draw}`}
        style={{ ['--draw-delay' as string]: '450ms' }}
      />

      <g className={styles['fade-label']} style={{ ['--draw-delay' as string]: '650ms' }}>
        <ellipse cx={214} cy={134} rx={14} ry={7} fill="none" className={styles['line-faint']} />
        <line x1={200} y1={114} x2={200} y2={134} className={styles['line-base']} />
        <line x1={228} y1={114} x2={228} y2={134} className={styles['line-base']} />
        <ellipse cx={214} cy={114} rx={14} ry={7} fill="none" className={styles['line-strong']} />
        <ellipse cx={214} cy={114} rx={7} ry={3.5} fill="none" className={styles['line-base']} />
      </g>

      <g className={styles['fade-label']} style={{ ['--draw-delay' as string]: '750ms' }}>
        <ellipse cx={204} cy={113} rx={5} ry={2.5} fill="none" className={styles['line-base']} />
        <ellipse cx={226} cy={156} rx={5} ry={2.5} fill="none" className={styles['line-base']} />
      </g>

      <path
        d="M262 176 L316 120 H330"
        pathLength={1}
        fill="none"
        className={`${styles.accent} ${styles.draw}`}
        style={{ ['--draw-delay' as string]: '1000ms' }}
      />
      <g className={styles['fade-label']} style={{ ['--draw-delay' as string]: '1150ms' }}>
        <text x={332} y={112} fontSize={8} className={styles['text-accent']}>
          FACE_024
        </text>
        <text x={332} y={124} fontSize={7} className={styles['text-label']}>
          TYPE: PLANAR
        </text>
      </g>

      <line x1={24} y1={236} x2={376} y2={236} className={styles['line-faint']} />
      <text x={24} y={258} fontSize={7} className={styles['text-label']}>
        PIPELINE
      </text>

      <line x1={startX} y1={258} x2={endX} y2={258} className={styles['line-faint']} />
      <path
        d={`M${startX} 258 L${endX} 258`}
        fill="none"
        stroke="url(#cad-flow-wave)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />

      <g
        ref={el => { nodeRefs.current[0] = el }}
        className={`${styles['node-marker']} ${styles['fade-label']}`}
        style={{ ['--draw-delay' as string]: '1200ms' }}
      >
        <rect x={80} y={245} width={20} height={24} stroke="none" className={styles['fill-panel']} />
        <rect x={82} y={247} width={16} height={20} fill="none" className={styles['line-base']} />
        <line x1={85} y1={252} x2={95} y2={252} className={styles['line-faint']} />
        <line x1={85} y1={257} x2={95} y2={257} className={styles['line-faint']} />
        <line x1={85} y1={262} x2={92} y2={262} className={styles['line-faint']} />
        <text x={90} y={284} fontSize={7} textAnchor="middle" className={styles['text-strong']}>
          STEP
        </text>
      </g>
      {/* <path d="M172 254 L178 258 L172 262" fill="none" className={styles['line-base']} /> */}

      <g
        ref={el => { nodeRefs.current[1] = el }}
        className={`${styles['node-marker']} ${styles['fade-label']}`}
        style={{ ['--draw-delay' as string]: '1300ms' }}
      >
        <polygon points="200,245 211.5,251.5 211.5,264.5 200,271 188.5,264.5 188.5,251.5" stroke="none" className={styles['fill-panel']} />
        <polygon points="200,247 209.5,252.5 209.5,263.5 200,269 190.5,263.5 190.5,252.5" fill="none" className={styles['line-base']} />
        <circle cx={200} cy={258} r={3.5} fill="none" className={styles['line-faint']} />
        <text x={200} y={284} fontSize={7} textAnchor="middle" className={styles['text-strong']}>
          OCCT
        </text>
      </g>
      {/* <path d="M284 254 L290 258 L284 262" fill="none" className={styles['line-base']} /> */}

      <g
        ref={el => { nodeRefs.current[2] = el }}
        className={`${styles['node-marker']} ${styles['fade-label']}`}
        style={{ ['draw-delay' as string]: '1450ms' }}
      >
        <rect x={299} y={247} width={20} height={20} stroke="none" className={styles['fill-panel']} />
        <rect x={301} y={249} width={16} height={16} fill="none" className={styles['line-base']} />
        <circle cx={309} cy={257} r={2} fill="none" className={styles['line-strong']} />
        <text x={310} y={284} fontSize={7} textAnchor="middle" className={styles['text-strong']}>
          ANNOTATION
        </text>
      </g>
    </svg>
  )
}
