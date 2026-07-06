import Link from 'next/link'
import { NoteEntry } from '@/lib/data'

interface NoteListRowProps {
  note: NoteEntry
  index: number
}

export default function NoteListRow({ note, index }: NoteListRowProps) {
  const paddedIndex = String(index + 1).padStart(2, '0')

  return (
    <Link
      href={`/notes/${note.slug}`}
      className="group block border-b border-border last:border-b-0 transition-colors duration-150 hover:bg-accent"
    >
      <div className="flex items-center gap-4 px-4 h-12">
        <span className="w-8 font-mono text-xs text-text-secondary group-hover:text-text-invert transition-colors">
          {paddedIndex}
        </span>
        <span
          className="flex-1 truncate text-text group-hover:text-text-invert transition-colors"
          style={{ fontSize: '13px', fontFamily: '"Inter", system-ui, sans-serif' }}
        >
          {note.title}
        </span>
        <span className="hidden sm:block w-24 font-mono text-xs text-text-secondary group-hover:text-text-invert transition-colors">
          {note.date}
        </span>
        <span className="hidden sm:block w-20 font-mono text-xs text-accent group-hover:text-text-invert transition-colors">
          {note.category}
        </span>
        <span className="hidden sm:block w-16 font-mono text-xs text-text-secondary group-hover:text-text-invert transition-colors text-right">
          {note.readingTime}
        </span>
        <span className="w-4 text-right text-border group-hover:text-text-invert transition-all duration-150 group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  )
}
