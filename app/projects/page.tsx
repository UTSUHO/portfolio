import PageShell from '../components/page-shell'
import Panel from '../components/panel'
import DataRow from '../components/data-row'
import { projects } from '@/lib/data'

export const metadata = {
  title: 'Works - Rei Utsuho'
}

export default function Projects() {
  return (
    <PageShell className="p-6">
      <div className="max-w-7xl mx-auto">
        <Panel title="WORKS" count={`${projects.length} ENTRIES`}>
          {projects.map((work) => (
            <DataRow
              key={work.id}
              index={work.id}
              title={work.title}
              category={work.category}
              year={work.year}
              href={`/projects/${work.id}`}
            />
          ))}
        </Panel>
      </div>
    </PageShell>
  )
}
