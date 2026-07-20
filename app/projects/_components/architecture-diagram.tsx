import MermaidChart from './mermaid-chart'

interface ArchitectureBlock {
  label: string
  value: string
}

interface ArchitectureDiagramProps {
  title?: string
  blocks: ArchitectureBlock[]
  flow?: string
}

export default function ArchitectureDiagram({ title, blocks, flow }: ArchitectureDiagramProps) {
  const hasFlow = typeof flow === 'string' && flow.trim().length > 0

  return (
    <div className="border border-border bg-bg-primary">
      {(title || blocks.length > 0) && (
        <div className="flex items-center gap-2 p-8 h-8 text-xs font-mono uppercase tracking-wider border-b border-border bg-bg">
          <span className="inline-block w-2 h-2 bg-accent" />
          <span className="text-text">{title || 'ARCHITECTURE'}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
        {blocks.map((block, index) => (
          <div
            key={index}
            className={`p-4 ${index % 2 === 0 ? 'sm:border-r' : ''} ${
              index < blocks.length - 2 ? 'border-b sm:border-b' : ''
            } ${index === blocks.length - 2 && blocks.length % 2 === 0 ? 'sm:border-b-0' : ''} border-border`}
          >
            <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-2">
              {block.label}
            </div>
            <div className="text-sm text-text leading-relaxed" style={{ fontSize: '13px' }}>
              {block.value}
            </div>
          </div>
        ))}
      </div>

      {hasFlow && (
        <div className="border-t border-border p-4 overflow-x-auto">
          <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-3">FLOW</div>
          <MermaidChart chart={flow} />
        </div>
      )}
    </div>
  )
}
