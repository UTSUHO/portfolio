import Link from 'next/link'
import { NoteEntry } from '@/lib/data'

interface BottomNoteNavProps {
  prev: NoteEntry | null
  next: NoteEntry | null
}

export default function BottomNoteNav({ prev, next }: BottomNoteNavProps) {
  return (
    <div className="flex items-center justify-between border-t border-border pt-8 mt-16 text-xs font-mono uppercase tracking-wider">
      <Link
        href="/notes"
        className="text-text-secondary hover:text-text transition-colors"
      >
        ← BACK TO NOTES
      </Link>

      {next ? (
        <Link
          href={`/notes/${next.slug}`}
          className="text-text-secondary hover:text-text transition-colors"
        >
          NEXT NOTE →
        </Link>
      ) : (
        <span className="text-border">—</span>
      )}
    </div>
  )
}
