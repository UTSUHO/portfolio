import Link from 'next/link'
import Panel from '../../components/panel'
import TechnicalHeroVisual from './technical-hero-visual'
import { libraryEntries, LibraryCategory } from '@/lib/data'

export default function LibraryHero() {
  const total = libraryEntries.length
  const projects = libraryEntries.filter((e) => e.type === 'project').length
  const experiments = libraryEntries.filter((e) => e.type === 'experiment').length
  const documentation = libraryEntries.filter(
    (e) => e.type === 'documentation' || e.type === 'research'
  ).length
  const tools = libraryEntries.filter(
    (e) => e.type === 'tool' || e.type === 'games' || e.type === 'essay'
  ).length

  const stats = [
    { label: 'TOTAL ITEMS', value: total.toString() },
    { label: 'PROJECTS', value: projects.toString() },
    { label: 'EXPERIMENTS', value: experiments.toString() },
    { label: 'DOCUMENTATION', value: documentation.toString() },
    { label: 'TOOLS & ASSETS', value: tools.toString() },
    { label: 'LAST UPDATED', value: '2025.05.30' },
    { label: 'CURATED BY', value: 'REI UTSUHO' },
    { label: 'STATUS', value: 'ACTIVE' }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-border bg-bg-primary">
      {/* IntroPanel */}
      <div className="lg:col-span-4 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-border">
        <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-6">
          // LIBRARY INDEX
        </div>
        <h1 className="font-display text-5xl lg:text-6xl font-medium text-text leading-none mb-8">
          ENGINEERING
          <br />
          LIBRARY
          <span className="text-accent">_</span>
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed mb-8 max-w-sm">
          A curated archive of engineering practice, system design, experiments,
          and implementation records.
        </p>
        <Link
          href="#library-body"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text hover:text-accent transition-colors"
        >
          <span>→</span>
          ABOUT THIS LIBRARY
        </Link>
      </div>

      {/* Axonometric Visual */}
      <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-border p-6">
        <TechnicalHeroVisual />
      </div>

      {/* Overview Panel */}
      <div className="lg:col-span-3 p-0">
        <Panel title="LIBRARY OVERVIEW" count={`${total} ITEMS`} className="h-full border-0">
          <div className="divide-y divide-border">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between px-4 h-9 text-xs"
              >
                <span className="font-mono uppercase tracking-wider text-text-secondary">
                  {stat.label}
                </span>
                <span className="font-mono text-text">{stat.value}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}
