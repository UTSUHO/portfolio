interface PanelProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  title?: string
  count?: string
  redSquare?: boolean
}

export default function Panel({ children, className = '', style = {}, title, count, redSquare = true }: PanelProps) {
  return (
    <div
      className={`border border-border bg-bg-primary ${className}`}
      style={{ ...style }}
    >
      {(title || count) && (
        <div
          className="flex items-center justify-between px-4 h-8 text-xs font-mono uppercase tracking-wider border-b border-border bg-bg"
        >
          <div className="flex items-center gap-2">
            {redSquare && (
              <span className="inline-block w-2 h-2 bg-accent" />
            )}
            <span className="text-text">{title}</span>
          </div>
          {count && <span className="text-text-secondary">{count}</span>}
        </div>
      )}
      {children}
    </div>
  )
}
