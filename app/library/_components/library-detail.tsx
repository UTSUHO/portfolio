import Link from 'next/link'
import { LibraryEntry, libraryEntries } from '@/lib/data'
import Panel from '../../components/panel'
import LibraryMetaTable from './library-meta-table'
import TechnicalHeroVisual from './technical-hero-visual'
import TocPanel from '../../components/toc-panel'
import BottomArchiveNav from './bottom-archive-nav'
import LibraryCard from './library-card'

interface LibraryDetailProps {
  entry: LibraryEntry
  related: LibraryEntry[]
  prev: LibraryEntry | null
  next: LibraryEntry | null
}

export default function LibraryDetail({
  entry,
  related,
  prev,
  next
}: LibraryDetailProps) {
  const tocItems = entry.sections.map((section) => ({
    id: section.id,
    number: section.number,
    title: section.title
  }))

  const metaEntries: { label: string; value: string; href?: string }[] = [
    { label: 'TYPE', value: entry.type.replace(/-/g, ' ').toUpperCase() },
    { label: 'ROLE', value: entry.role || '—' },
    { label: 'DURATION', value: entry.duration || '—' },
    { label: 'YEAR', value: entry.year.toString() },
    {
      label: 'STATUS',
      value: `■ ${entry.status.toUpperCase().replace('-', ' ')}`
    }
  ]

  if (entry.links?.repository) {
    metaEntries.push({
      label: 'REPOSITORY',
      value: entry.links.repository,
      href: `https://${entry.links.repository}`
    })
  }

  if (entry.links?.demo) {
    metaEntries.push({
      label: 'DEMO',
      value: entry.links.demo,
      href: `https://${entry.links.demo}`
    })
  }

  if (entry.links?.article) {
    metaEntries.push({
      label: 'ARTICLE',
      value: entry.links.article,
      href: entry.links.article
    })
  }

  return (
    <div className="space-y-6">
      <Link
        href="/library"
        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-secondary hover:text-text transition-colors"
      >
        ← BACK TO LIBRARY
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-start">
        {/* Main content */}
        <div className="space-y-6">
          {/* Detail Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-0 border border-border bg-bg-primary">
            {/* Intro and Metadata */}
            <div className="p-6 border-b lg:border-b-0 lg:border-r border-border">
              <div className="text-xs font-mono text-accent mb-6">
                {entry.number} / {String(libraryEntries.length).padStart(2, '0')}
              </div>
              <h1 className="font-display text-4xl lg:text-5xl font-medium text-text uppercase leading-tight break-words mb-6">
                {entry.title}
                <span className="cursor-blink text-accent">_</span>
              </h1>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                {entry.summary}
              </p>
              <LibraryMetaTable entries={metaEntries} />
            </div>

            {/* Technical Hero Visual */}
            <div className="p-4">
              <TechnicalHeroVisual />
            </div>
          </div>

          {/* Section Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-0 border border-border bg-bg-primary">
            {entry.sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="p-4 border-b md:border-r border-border"
              >
                <div className="text-xs font-mono text-accent mb-3">
                  {section.number} / {section.title}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {section.body}
                </p>

                {section.diagram && (
                  <pre className="text-[10px] font-mono text-text-secondary bg-bg p-3 border border-border mb-4 whitespace-pre-wrap leading-relaxed">
                    {section.diagram}
                  </pre>
                )}

                {section.bullets && (
                  <ul className="space-y-2 mb-4">
                    {section.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex gap-2 text-sm text-text">
                        <span className="text-accent mt-1">■</span>
                        <span className="text-text-secondary">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.table && (
                  <LibraryMetaTable
                    entries={section.table.map((row) => ({
                      label: row.label,
                      value: row.value
                    }))}
                  />
                )}

                {section.codeBlock && (
                  <pre className="text-[10px] font-mono text-text-secondary bg-bg p-3 border border-border whitespace-pre-wrap leading-relaxed">
                    {section.codeBlock}
                  </pre>
                )}
              </div>
            ))}
          </div>

          {/* Related Archives */}
          {related.length > 0 && (
            <Panel
              title="RELATED ARCHIVES"
              count={`${related.length} ITEMS`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
                {related.map((relatedEntry) => (
                  <LibraryCard key={relatedEntry.slug} entry={relatedEntry} />
                ))}
              </div>
            </Panel>
          )}

          <BottomArchiveNav prev={prev} next={next} />
        </div>

        {/* Sticky sidebar: TAGS + TOC */}
        <aside
          className="order-first lg:order-none lg:sticky lg:top-[calc(var(--height-status)+24px)] lg:max-h-[calc(100vh-var(--height-status)-48px)] lg:overflow-y-auto space-y-4"
        >
          <Panel title="TAGS">
            <div className="flex flex-wrap gap-2 p-4">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono uppercase tracking-wider border border-border px-2 py-1 text-text-secondary"
                >
                  [{tag}]
                </span>
              ))}
            </div>
          </Panel>

          <TocPanel items={tocItems} title="TABLE OF CONTENTS" />
        </aside>
      </div>
    </div>
  )
}
