import PageShell from '../components/page-shell'
import NoteFilters from '../components/note-filters'
import { notes } from '@/lib/data'

export const metadata = {
  title: 'Log - Rei Utsuho'
}

export default function Notes() {
  return (
    <PageShell className="p-6">
      <div className="max-w-7xl mx-auto">
        <NoteFilters notes={notes} />
      </div>
    </PageShell>
  )
}
