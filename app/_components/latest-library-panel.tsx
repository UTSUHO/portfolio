import Link from 'next/link'
import { LibraryEntry } from '@/lib/data'

interface LatestLibraryPanelProps {
  entries: LibraryEntry[]
}

export default function LatestLibraryPanel({ entries }: LatestLibraryPanelProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        {entries.map((entry) => (
          <Link
            key={entry.slug}
            href={`/library/${entry.slug}`}
            className="group block border-b border-white/10 last:border-b-0 transition-colors duration-150 hover:bg-white/5"
          >
            <div className="px-6 py-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono uppercase tracking-wider text-white/60">
                  {entry.number} / {entry.category}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-white/60">
                  {entry.date}
                </span>
              </div>
              <div
                className="text-white mb-1"
                style={{ fontSize: '13px', fontFamily: '"Inter", system-ui, sans-serif' }}
              >
                {entry.title}
              </div>
              <div className="text-xs text-white/70 leading-relaxed line-clamp-2">
                {entry.summary}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="px-6 py-3 border-t border-white/10">
        <div className="text-xs font-mono uppercase tracking-wider text-white/60">
          Library
        </div>
      </div>
    </div>
  )
}
