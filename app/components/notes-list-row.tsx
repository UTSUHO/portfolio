import Link from 'next/link'
import { NoteEntry } from '@/lib/data'

interface NotesListRowProps {
  note: NoteEntry
}

export default function NotesListRow({ note }: NotesListRowProps) {
  return (
    <Link
      href={`/notes/${note.slug}`}
      className="group block border-b border-border last:border-b-0 transition-colors duration-150 hover:bg-bg"
    >
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 p-4 sm:px-6 sm:py-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="text-xs font-mono text-accent">{note.date}</span>
            <span className="text-xs font-mono text-text-secondary">
              {note.readingTime}
            </span>
          </div>
          <h3 className="font-display text-lg sm:text-xl font-medium text-text uppercase leading-tight mb-2">
            {note.title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 max-w-2xl">
            {note.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4">
          <span className="text-xs font-mono uppercase tracking-wider text-text-secondary">
            {note.category}
          </span>
          <span className="text-border group-hover:text-accent group-hover:translate-x-1 transition-all duration-150">
            →
          </span>
        </div>
      </div>
    </Link>
  )
}
