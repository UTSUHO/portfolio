import { forwardRef } from 'react'
import styles from './showcase.module.css'

/**
 * 沿 SVG path 移动的进度指示器。
 * 通过 ref 暴露给 usePipelineAnimation；初始位置由调用方通过 transform 设置。
 */
const PipelineMarker = forwardRef<SVGGElement, { className?: string }>(
  ({ className = '' }, ref) => {
    return (
      <g ref={ref} className={`${styles['pipeline-marker']} ${className}`} style={{ opacity: 0 }}>
        {/* 外圈光晕 */}
        <circle r={5} fill="none" className={styles['marker-glow']} />
        {/* 核心 */}
        <circle r={2.5} className={styles['marker-core']} />
      </g>
    )
  }
)

PipelineMarker.displayName = 'PipelineMarker'

export default PipelineMarker
