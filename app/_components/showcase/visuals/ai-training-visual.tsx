"use client";

import { useRef } from 'react'
import styles from '../showcase.module.css'
import usePipelineAnimation, { type PipelineNode } from '../use-pipeline-animation'
import PipelineMarker from '../pipeline-marker'

const jobs = [
  { id: 'JOB_1142', status: 'RUNNING', active: true },
  { id: 'JOB_1147', status: 'PENDING', active: false },
  { id: 'JOB_1148', status: 'PENDING', active: false }
]

const gpus = [
  { name: 'GPU-01', pct: '71%', width: 78, active: false },
  { name: 'GPU-02', pct: '84%', width: 92, active: true },
  { name: 'GPU-03', pct: '37%', width: 41, active: false },
  { name: 'GPU-04', pct: '58%', width: 63, active: false }
]

const sparkPoints =
  '166,228 190,226 214,240 238,236 262,250 286,246 310,258 334,254 368,262'

export default function AiTrainingVisual() {
  const svgRef = useRef<SVGSVGElement>(null)
  const motionPathRef = useRef<SVGPathElement>(null)
  const markerRef = useRef<SVGGElement>(null)
  const nodeRefs = useRef<(SVGGElement | null)[]>([])

  // 0: running job node, 1: scheduler block, 2: GPU-02 bar group
  const nodePositions = [0.15, 0.45, 0.85]

  const nodes: PipelineNode[] = nodePositions.map((progress, i) => ({
    element: nodeRefs.current[i],
    progress
  }))

  usePipelineAnimation({
    containerRef: svgRef,
    pathRef: motionPathRef,
    markerRef,
    nodes,
    duration: 2.8,
    loop: true,
    repeatDelay: 0.8,
    startDelay: 0.4
  })

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid meet"
      className="block w-full h-full"
      aria-hidden="true"
    >
      <text x={24} y={24} fontSize={7} className={styles['text-label']}>
        INFRA // CONTROL PLANE
      </text>

      {/* ---- Job queue panel ---- */}
      <rect x={24} y={34} width={118} height={132} className={`${styles['line-base']} ${styles['fill-panel']}`} />
      <line x1={24} y1={52} x2={142} y2={52} className={styles['line-faint']} />
      <text x={30} y={47} fontSize={7} className={styles['text-strong']}>
        JOB QUEUE
      </text>
      {jobs.map((job, i) => {
        const y = 64 + i * 28
        return (
          <g
            key={job.id}
            ref={job.active ? el => { nodeRefs.current[0] = el } : undefined}
            className={job.active ? styles['node-marker'] : undefined}
          >
            <circle
              cx={34}
              cy={y + 8}
              r={2.5}
              stroke="none"
              className={
                job.active
                  ? `${styles['accent-fill']} ${styles.pulse}`
                  : styles['fill-base']
              }
            />
            <text x={44} y={y + 11} fontSize={6.5} className={styles['text-label']}>
              {job.id}
            </text>
            <text
              x={136}
              y={y + 11}
              fontSize={6.5}
              textAnchor="end"
              className={job.active ? styles['text-accent'] : styles['text-label']}
            >
              {job.status}
            </text>
          </g>
        )
      })}

      {/* queue -> scheduler arrow */}
      <path
        d="M83 166 L83 178"
        pathLength={1}
        fill="none"
        className={`${styles['line-base']} ${styles.draw}`}
        style={{ ['--draw-delay' as string]: '400ms' }}
      />
      <path d="M79 178 L83 184 L87 178" fill="none" className={styles['line-base']} />

      {/* ---- Scheduler panel ---- */}
      <rect x={24} y={184} width={118} height={94} className={`${styles['line-base']} ${styles['fill-panel']}`} />
      <line x1={24} y1={202} x2={142} y2={202} className={styles['line-faint']} />
      <text x={30} y={197} fontSize={7} className={styles['text-strong']}>
        SCHEDULER
      </text>
      <g
        ref={el => { nodeRefs.current[1] = el }}
        className={styles['node-marker']}
      >
        <text x={30} y={218} fontSize={6.5} className={styles['text-label']}>
          FAIR SHARE
        </text>
        {[0, 1, 2].map(i => (
          <rect
            key={`fs-${i}`}
            x={30 + i * 20}
            y={224}
            width={14}
            height={5}
            stroke="none"
            className={styles['fill-base']}
          />
        ))}
        <text x={30} y={246} fontSize={6.5} className={styles['text-label']}>
          PRIORITY
        </text>
        {[0, 1].map(i => (
          <rect
            key={`pr-${i}`}
            x={30 + i * 20}
            y={252}
            width={14}
            height={5}
            stroke="none"
            className={i === 0 ? styles['fill-base'] : styles['line-faint']}
            fill={i === 0 ? undefined : 'none'}
          />
        ))}
      </g>

      {/* scheduler -> gpu pool arrow */}
      <path
        d="M142 231 L150 231 L150 140 L154 140"
        pathLength={1}
        fill="none"
        className={`${styles['line-faint']} ${styles.draw}`}
        style={{ ['--draw-delay' as string]: '600ms' }}
      />
      <path d="M154 136 L160 140 L154 144" fill="none" className={styles['line-faint']} />

      {/* ---- GPU pool panel ---- */}
      <rect x={160} y={34} width={216} height={120} className={`${styles['line-base']} ${styles['fill-panel']}`} />
      <line x1={160} y1={52} x2={376} y2={52} className={styles['line-faint']} />
      <text x={166} y={47} fontSize={7} className={styles['text-strong']}>
        GPU POOL / CLUSTER
      </text>
      {gpus.map((gpu, i) => {
        const y = 66 + i * 26
        return (
          <g
            key={gpu.name}
            ref={gpu.active ? el => { nodeRefs.current[2] = el } : undefined}
            className={gpu.active ? styles['node-marker'] : undefined}
          >
            <circle
              cx={170}
              cy={y}
              r={2}
              stroke="none"
              className={
                gpu.active
                  ? `${styles['accent-fill']} ${styles.pulse}`
                  : styles['fill-base']
              }
            />
            <text x={180} y={y + 3} fontSize={6.5} className={styles['text-label']}>
              {gpu.name}
            </text>
            <rect x={228} y={y - 3.5} width={104} height={7} fill="none" className={styles['line-faint']} />
            <rect
              x={228}
              y={y - 3.5}
              width={gpu.width}
              height={7}
              stroke="none"
              className={gpu.active ? styles['accent-fill'] : styles['fill-base']}
            />
            <text
              x={366}
              y={y + 3}
              fontSize={6.5}
              textAnchor="end"
              className={gpu.active ? styles['text-accent'] : styles['text-label']}
            >
              {gpu.pct}
            </text>
          </g>
        )
      })}

      {/* ---- Performance panel ---- */}
      <rect x={160} y={170} width={216} height={108} className={`${styles['line-base']} ${styles['fill-panel']}`} />
      <line x1={160} y1={188} x2={376} y2={188} className={styles['line-faint']} />
      <text x={166} y={183} fontSize={7} className={styles['text-strong']}>
        PERF // DEV SERVER START
      </text>
      <g className={styles['fade-label']} style={{ ['--draw-delay' as string]: '800ms' }}>
        <text x={166} y={212} fontSize={12} className={styles['text-strong']}>
          180s
        </text>
        <path d="M200 206 L216 206 M212 202 L216 206 L212 210" fill="none" className={styles['line-base']} />
        <text x={224} y={212} fontSize={12} className={styles['text-accent']}>
          20s
        </text>
        <text x={252} y={212} fontSize={6.5} className={styles['text-label']}>
          -89% BUILD TIME
        </text>
      </g>
      <polyline
        points={sparkPoints}
        pathLength={1}
        fill="none"
        className={`${styles['line-base']} ${styles.draw}`}
        style={{ ['--draw-delay' as string]: '900ms' }}
      />
      <line x1={166} y1={266} x2={368} y2={266} strokeDasharray="2 3" className={styles['line-faint']} />

      {/* Invisible motion path connecting queue -> scheduler -> gpu pool */}
      <path
        ref={motionPathRef}
        d="M83 166 L83 231 L150 231 L150 140 L160 140"
        fill="none"
        stroke="none"
      />

      <PipelineMarker ref={markerRef} />
    </svg>
  )
}
