'use client'

export type NotesSortKey = 'date' | 'category' | 'readingTime'

interface NotesSortBarProps {
  sortKey: NotesSortKey
  sortDir: 'asc' | 'desc'
  view: 'grid' | 'list'
  resultCount: number
  onSort: (key: NotesSortKey) => void
  onToggleDir: () => void
  onView: (view: 'grid' | 'list') => void
}

const labels: Record<NotesSortKey, string> = {
  date: 'DATE',
  category: 'CATEGORY',
  readingTime: 'READING TIME'
}

export default function NotesSortBar({
  sortKey,
  sortDir,
  view,
  resultCount,
  onSort,
  onToggleDir,
  onView
}: NotesSortBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-4 h-auto min-h-[48px] py-3 border-b border-border bg-bg text-xs font-mono uppercase tracking-wider">
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-text-secondary">SORT BY:</span>
        {(Object.keys(labels) as NotesSortKey[]).map((key) => (
          <button
            key={key}
            onClick={() => {
              if (sortKey === key) {
                onToggleDir()
              } else {
                onSort(key)
              }
            }}
            className={`flex items-center gap-1 transition-colors ${
              sortKey === key ? 'text-accent' : 'text-text-secondary hover:text-text'
            }`}
          >
            {labels[key]}
            <span>{sortKey === key && (sortDir === 'asc' ? '↑' : '↓')}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onView('grid')}
            className={`w-7 h-7 flex items-center justify-center border transition-colors ${
              view === 'grid'
                ? 'border-accent text-accent'
                : 'border-border text-text-secondary hover:text-text'
            }`}
          >
            ▦
          </button>
          <button
            onClick={() => onView('list')}
            className={`w-7 h-7 flex items-center justify-center border transition-colors ${
              view === 'list'
                ? 'border-accent text-accent'
                : 'border-border text-text-secondary hover:text-text'
            }`}
          >
            ☰
          </button>
        </div>
        <span className="text-text-secondary">{resultCount} RECORDS</span>
      </div>
    </div>
  )
}
