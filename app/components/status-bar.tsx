'use client'

export function TopStatusBar() {
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit'
  }).replace(/\//g, '.')

  return (
    <div
      className="flex items-center justify-between px-6 h-8 text-xs font-mono uppercase tracking-wider"
      style={{ backgroundColor: '#0A0A0A', color: '#6B6B6B', borderBottom: '1px solid #333333' }}
    >
      <div className="flex items-center gap-4">
        <span style={{ color: '#FFFFFF' }}>REI_UTSUHO_SYS</span>
        <span className="hidden sm:inline">x:0 y:0</span>
      </div>
      <div className="flex items-center gap-4">
        <span>v.2.0.1</span>
        <span>{dateStr}</span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5" style={{ backgroundColor: '#FF4D3A' }} />
          ONLINE
        </span>
      </div>
    </div>
  )
}

export function BottomStatusBar() {
  return (
    <div
      className="flex items-center justify-between px-6 h-8 text-xs font-mono uppercase tracking-wider"
      style={{ backgroundColor: '#0A0A0A', color: '#6B6B6B', borderTop: '1px solid #333333' }}
    >
      <div className="flex items-center gap-4">
        <span>SYS:STABLE</span>
        <span className="hidden sm:inline">CPU:12%</span>
        <span className="hidden sm:inline">MEM:4.2GB</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline">UPTIME: 99.9%</span>
        <span>&copy; {new Date().getFullYear()} REI UTSUHO</span>
      </div>
    </div>
  )
}
