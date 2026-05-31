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
        <div className="border border-border bg-bg-primary">
          <div className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b border-border bg-bg">
            <span className="inline-block w-2 h-2 bg-accent" />
            <span className="text-text">SYSTEM_LOG</span>
            <span className="ml-auto text-text-secondary">{logs.length} ENTRIES</span>
          </div>

          {logs.map((log, i) => (
            <div key={i} className="border-b last:border-b-0 border-border">
              <div className="grid grid-cols-12">
                <div className="col-span-12 sm:col-span-2 px-4 py-3 sm:border-r border-border flex items-center gap-3"
                >
                  <span className="text-xs font-mono text-text-secondary">
                    {log.date}
                  </span>
                </div>
                <div className="col-span-12 sm:col-span-10 px-4 py-3">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-mono uppercase text-accent"
                    >
                      [{log.category}]
                    </span>
                    <span className="text-text font-medium"
                      style={{
                        fontSize: '13px',
                        fontFamily: '"Inter", system-ui, sans-serif'
                      }}
                    >
                      {log.title}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">
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
