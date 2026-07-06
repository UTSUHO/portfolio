import PageShell from '../components/page-shell'
import LibraryIndex from '../components/library-index'

export const metadata = {
  title: 'Library - Rei Utsuho'
}

export default function Library() {
  return (
    <PageShell className="p-6">
      <div className="max-w-7xl mx-auto">
        <LibraryIndex />
      </div>
    </PageShell>
  )
}
