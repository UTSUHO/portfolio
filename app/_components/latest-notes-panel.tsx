import Link from 'next/link'
import { NoteEntry } from '@/lib/data'

interface LatestNotesPanelProps {
  notes: NoteEntry[]
}

export default function LatestNotesPanel({ notes }: LatestNotesPanelProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        {notes.map((note, index) => (
          <Link
            key={note.slug}
            href={`/notes/${note.slug}`}
            className="group block border-b border-black/20 last:border-b-0 transition-colors duration-150 hover:bg-black/10"
          >
            <div className="px-6 py-4"
            >
              <div className="text-xs font-mono uppercase tracking-wider text-black/60 mb-1">
                {note.date}
              </div>
              <div
                className="text-black mb-1"
                style={{ fontSize: '13px', fontFamily: '"Inter", system-ui, sans-serif' }}
              >
                {note.title}
              </div>
              <div className="text-xs text-black/70 leading-relaxed">
                {note.tags.join(' · ')}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="px-6 py-3 border-t border-black/20">
        <div className="text-xs font-mono uppercase tracking-wider text-black/60">
          PERSONAL Notes
        </div>
      </div>
    </div>
  )
}
