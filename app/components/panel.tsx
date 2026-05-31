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
      className={`border ${className}`}
      style={{ borderColor: '#DCDCDC', backgroundColor: '#FFFFFF', ...style }}
    >
      {(title || count) && (
        <div
          className="flex items-center justify-between px-4 h-8 text-xs font-mono uppercase tracking-wider border-b"
          style={{ borderColor: '#DCDCDC', backgroundColor: '#F5F5F3' }}
        >
          <div className="flex items-center gap-2">
            {redSquare && (
              <span className="inline-block w-2 h-2" style={{ backgroundColor: '#FF4D3A' }} />
            )}
            <span style={{ color: '#0A0A0A' }}>{title}</span>
          </div>
          {count && <span style={{ color: '#6B6B6B' }}>{count}</span>}
        </div>
      )}
      {children}
    </div>
  )
}
