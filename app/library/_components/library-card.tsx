import Link from 'next/link'
import { LibraryEntry } from '@/lib/data'

interface LibraryCardProps {
  entry: LibraryEntry
  variant?: 'grid' | 'list'
}

export default function LibraryCard({ entry, variant = 'grid' }: LibraryCardProps) {
  const stackLabel = entry.stack.join(' / ')

  if (variant === 'list') {
    return (
      <Link
        href={`/library/${entry.slug}`}
        className="group flex items-center gap-4 px-4 h-16 border-b border-border bg-bg-primary hover:bg-bg transition-colors"
      >
        <span className="text-xs font-mono text-accent">{entry.number} /</span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-text truncate">{entry.title}</div>
          <div className="text-xs text-text-secondary truncate">{entry.summary}</div>
        </div>
        <span className="hidden sm:block text-xs font-mono text-text-secondary">{entry.date}</span>
        <span className="text-xs font-mono text-text-secondary">{entry.category}</span>
        <span className="text-border group-hover:text-accent transition-colors">→</span>
      </Link>
    )
  }

  return (
    <Link
      href={`/library/${entry.slug}`}
      className="group block border-b border-r border-border bg-bg-primary hover:bg-bg transition-colors"
    >
      <div className="flex items-center justify-between px-4 h-8 border-b border-border">
        <span className="text-xs font-mono text-accent">{entry.number} /</span>
        <span className="text-xs font-mono text-text-secondary">{entry.date}</span>
      </div>

      <div className="aspect-[4/3] border-b border-border bg-bg overflow-hidden">
        {entry.thumbnail ? (
          <img
            src={entry.thumbnail}
            alt={entry.title}
            className="w-full h-full object-contain grayscale contrast-75 group-hover:grayscale-0 transition-all duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[10px] font-mono uppercase tracking-wider text-text-secondary">
              NO IMAGE
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-lg font-medium text-text uppercase leading-tight">
            {entry.title}
          </h3>
          <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">
            ■
          </span>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed mb-4 line-clamp-2">
          {entry.summary}
        </p>
        <div className="text-[10px] font-mono uppercase tracking-wider text-text-secondary">
          {stackLabel}
        </div>
      </div>
    </Link>
  )
}
