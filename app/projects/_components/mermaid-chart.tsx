'use client'

import { useEffect, useId, useRef, useState } from 'react'
import mermaid from 'mermaid'

let mermaidInitialized = false

interface MermaidChartProps {
  chart: string
}

export default function MermaidChart({ chart }: MermaidChartProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
          primaryColor: '#ffffff',
          primaryTextColor: '#0a0a0a',
          primaryBorderColor: '#dcdcdc',
          lineColor: '#6b6b6b',
          secondaryColor: '#f5f5f3',
          tertiaryColor: '#ffffff',
          fontFamily: 'var(--font-mono)'
        },
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
          curve: 'basis'
        }
      })
      mermaidInitialized = true
    }

    let cancelled = false

    async function render() {
      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, chart)
        if (!cancelled) {
          setSvg(svg)
          setError(false)
        }
      } catch {
        if (!cancelled) {
          setSvg('')
          setError(true)
        }
      }
    }

    render()

    return () => {
      cancelled = true
    }
  }, [chart, id])

  if (error) {
    return (
      <pre className="mermaid-chart w-full overflow-x-auto p-4 border border-border bg-bg font-mono text-xs text-text whitespace-pre">
        {chart}
      </pre>
    )
  }

  return (
    <div
      ref={containerRef}
      className="mermaid-chart w-full overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
