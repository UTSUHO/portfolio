import PageShell from '../components/page-shell'
import NotesIndex from '../components/notes-index'

export const metadata = {
  title: 'Notes - Rei Utsuho'
}

export default function Notes() {
  return (
    <PageShell className="p-6">
      <div className="max-w-7xl mx-auto">
        <NotesIndex />
      </div>
    </PageShell>
  )
}
