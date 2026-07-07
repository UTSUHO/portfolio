import PageShell from '../components/page-shell'
import NotesIndex from './_components/notes-index'

export const metadata = {
  title: 'Notes - Rei Utsuho'
}

export default function Notes() {
  return (
    <PageShell>
      <div className="max-w-screen-2xl mx-auto">
        <NotesIndex />
      </div>
    </PageShell>
  )
}
