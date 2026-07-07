import PageShell from '../components/page-shell'
import LibraryIndex from './_components/library-index'

export const metadata = {
  title: 'Library - Rei Utsuho'
}

export default function Library() {
  return (
    <PageShell>
      <div className="max-w-screen-2xl mx-auto">
        <LibraryIndex />
      </div>
    </PageShell>
  )
}
