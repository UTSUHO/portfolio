import PageShell from '../components/page-shell'
import Panel from '../components/panel'
import DataRow from '../components/data-row'
import { projects } from '@/lib/data'

export const metadata = {
  title: 'Works - Rei Utsuho'
}

const WORK_TAG = 0

export default function Projects() {
  const sortedProjects = [...projects].sort((a, b) =>
    b.year.localeCompare(a.year)
  )

  return (
    <PageShell>
      <div className="max-w-screen-2xl mx-auto">
        <Panel title="WORKS" count={`${projects.length} ENTRIES`}>
          {sortedProjects.map(work => (
            <DataRow
              key={work.id}
              index={work.id}
              title={work.title}
              category={work.category}
              year={work.year}
              href={`/projects/${work.id}`}
              marker={
                work.tags.includes(WORK_TAG) ? (
                  <span
                    className="inline-block w-2 h-2 bg-accent"
                    title="Work project"
                  />
                ) : null
              }
            />
          ))}
        </Panel>
      </div>
    </PageShell>
  )
}
