import Link from 'next/link'
import { LibraryEntry } from '@/lib/data'

interface BottomArchiveNavProps {
  prev: LibraryEntry | null
  next: LibraryEntry | null
}

export default function BottomArchiveNav({ prev, next }: BottomArchiveNavProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-border bg-bg-primary">
      <div className="border-b sm:border-b-0 sm:border-r border-border p-4">
        <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-2">
          ← PREV ARCHIVE
        </div>
        {prev ? (
          <Link href={`/library/${prev.slug}`} className="group">
            <div className="text-xs font-mono text-accent mb-1">
              {prev.number} /
            </div>
            <div className="text-sm text-text group-hover:text-accent transition-colors">
              {prev.title}
            </div>
          </Link>
        ) : (
          <div className="text-sm text-text-secondary">—</div>
        )}
      </div>

      <div className="p-4 text-left sm:text-right">
        <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-2">
          NEXT ARCHIVE →
        </div>
        {next ? (
          <Link href={`/library/${next.slug}`} className="group block">
            <div className="text-xs font-mono text-accent mb-1">
              {next.number} /
            </div>
            <div className="text-sm text-text group-hover:text-accent transition-colors">
              {next.title}
            </div>
          </Link>
        ) : (
          <div className="text-sm text-text-secondary">—</div>
        )}
      </div>
    </div>
  )
}
