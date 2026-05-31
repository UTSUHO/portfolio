import Panel from '../components/panel'

export const metadata = {
  title: 'Log - Rei Utsuho'
}

const logs = [
  {
    date: '2026.06.01',
    category: 'SYSTEM',
    title: 'Portfolio Interface v2.0 Deployed',
    detail: 'Migrated from Chakra UI + Pages Router to TailwindCSS + App Router. System interface layout applied.'
  },
  {
    date: '2025.01.15',
    category: 'GAME_DEV',
    title: 'Project Queen Enters Plan Phase',
    detail: 'Battle system refinement and narrative background setting in progress. Development scaffolding setup complete.'
  },
  {
    date: '2023.08.20',
    category: 'DESIGN',
    title: 'Mead-of-Poetry Prototype Complete',
    detail: 'Mid-weight mythology boardgame prototype finished. Playtesting phase initiated.'
  }
]

export default function Notes() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="border" style={{ borderColor: '#DCDCDC', backgroundColor: '#FFFFFF' }}>
          <div
            className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b"
            style={{ borderColor: '#DCDCDC', backgroundColor: '#F5F5F3' }}
          >
            <span className="inline-block w-2 h-2" style={{ backgroundColor: '#FF4D3A' }} />
            <span style={{ color: '#0A0A0A' }}>SYSTEM_LOG</span>
            <span className="ml-auto" style={{ color: '#6B6B6B' }}>{logs.length} ENTRIES</span>
          </div>

          {logs.map((log, i) => (
            <div key={i} className="border-b last:border-b-0" style={{ borderColor: '#DCDCDC' }}>
              <div className="grid grid-cols-12">
                <div
                  className="col-span-12 sm:col-span-2 px-4 py-3 sm:border-r flex items-center gap-3"
                  style={{ borderColor: '#DCDCDC' }}
                >
                  <span className="text-xs font-mono" style={{ color: '#6B6B6B' }}>
                    {log.date}
                  </span>
                </div>
                <div className="col-span-12 sm:col-span-10 px-4 py-3">
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="text-xs font-mono uppercase"
                      style={{ color: '#FF4D3A' }}
                    >
                      [{log.category}]
                    </span>
                    <span
                      style={{
                        color: '#0A0A0A',
                        fontSize: '13px',
                        fontFamily: '"Inter", system-ui, sans-serif',
                        fontWeight: 500
                      }}
                    >
                      {log.title}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: '#6B6B6B' }}>
                    {log.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
