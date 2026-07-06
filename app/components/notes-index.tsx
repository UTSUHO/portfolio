'use client'

import { useMemo, useState } from 'react'
import { notes, noteCategories, noteTags } from '@/lib/data'
import NotesHero from './notes-hero'
import NotesListRow from './notes-list-row'
import PaginationBar from './pagination-bar'
import Panel from './panel'

type SortKey = 'date' | 'category' | 'readingTime'

const PAGE_SIZE = 7

export default function NotesIndex() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [view, setView] = useState<'grid' | 'list'>('list')
  const [page, setPage] = useState(1)

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const note of notes) {
      counts[note.category] = (counts[note.category] || 0) + 1
    }
    return counts
  }, [])

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const note of notes) {
      for (const tag of note.tags) {
        counts[tag] = (counts[tag] || 0) + 1
      }
    }
    return counts
  }, [])

  const filtered = useMemo(() => {
    return notes.filter((note) => {
      const categoryMatch =
        selectedCategory === 'all' || note.category === selectedCategory
      const tagMatch =
        selectedTag === null || note.tags.includes(selectedTag)
      return categoryMatch && tagMatch
    })
  }, [selectedCategory, selectedTag])

  const sorted = useMemo(() => {
    const arr = [...filtered]
    arr.sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case 'date':
          cmp = a.date.localeCompare(b.date)
          break
        case 'category':
          cmp = a.category.localeCompare(b.category)
          break
        case 'readingTime':
          cmp =
            parseInt(a.readingTime) - parseInt(b.readingTime)
          break
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
    return arr
  }, [filtered, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const pageItems = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const clearFilters = () => {
    setSelectedCategory('all')
    setSelectedTag(null)
    setPage(1)
  }

  return (
    <div className="space-y-6" id="notes-body">
      <NotesHero />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0 border border-border bg-bg-primary">
        {/* Filter Panel */}
        <aside className="border-b lg:border-b-0 lg:border-r border-border p-4">
          <div className="lg:sticky lg:top-[calc(var(--height-status)+24px)]">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-mono uppercase tracking-wider text-text-secondary">
                // FILTERS
              </div>
              <button
                onClick={clearFilters}
                className="text-xs font-mono uppercase tracking-wider text-text-secondary hover:text-accent transition-colors"
              >
                CLEAR ALL
              </button>
            </div>

            <div className="mb-6">
              <div className="text-xs font-mono uppercase tracking-wider text-text mb-3">
                CATEGORIES
              </div>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory('all')
                      setPage(1)
                    }}
                    className={`w-full flex items-center justify-between px-3 h-7 text-xs font-mono uppercase transition-colors duration-150 border ${
                      selectedCategory === 'all'
                        ? 'bg-accent text-text border-accent'
                        : 'text-text-secondary border-transparent hover:border-border hover:text-text'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 border ${
                          selectedCategory === 'all'
                            ? 'bg-text border-text'
                            : 'border-text-secondary'
                        }`}
                      />
                      ALL
                    </span>
                    <span>{notes.length}</span>
                  </button>
                </li>
                {noteCategories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => {
                        setSelectedCategory(category)
                        setPage(1)
                      }}
                      className={`w-full flex items-center justify-between px-3 h-7 text-xs font-mono uppercase transition-colors duration-150 border ${
                        selectedCategory === category
                          ? 'bg-accent text-text border-accent'
                          : 'text-text-secondary border-transparent hover:border-border hover:text-text'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 border ${
                            selectedCategory === category
                              ? 'bg-text border-text'
                              : 'border-text-secondary'
                          }`}
                        />
                        {category}
                      </span>
                      <span>{categoryCounts[category] || 0}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-text mb-3">
                TAGS (POPULAR)
              </div>
              <div className="flex flex-wrap gap-2">
                {noteTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTag(selectedTag === tag ? null : tag)
                      setPage(1)
                    }}
                    className={`text-[10px] font-mono uppercase tracking-wider border px-2 py-1 transition-colors ${
                      selectedTag === tag
                        ? 'bg-accent text-text border-accent'
                        : 'text-text-secondary border-border hover:border-text hover:text-text'
                    }`}
                  >
                    {tag}
                    <span className="ml-1 text-text-secondary">{tagCounts[tag] || 0}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-4 px-4 h-auto min-h-[48px] py-3 border-b border-border bg-bg text-xs font-mono uppercase tracking-wider">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-text-secondary">SORT BY:</span>
              {(['date', 'category', 'readingTime'] as SortKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    if (sortKey === key) {
                      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
                    } else {
                      setSortKey(key)
                      setSortDir('desc')
                    }
                    setPage(1)
                  }}
                  className={`flex items-center gap-1 transition-colors ${
                    sortKey === key
                      ? 'text-accent'
                      : 'text-text-secondary hover:text-text'
                  }`}
                >
                  {key === 'readingTime' ? 'READING TIME' : key}
                  <span>{sortKey === key && (sortDir === 'asc' ? '↑' : '↓')}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setView('grid')}
                  className={`w-7 h-7 flex items-center justify-center border transition-colors ${
                    view === 'grid'
                      ? 'border-accent text-accent'
                      : 'border-border text-text-secondary hover:text-text'
                  }`}
                >
                  ▦
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`w-7 h-7 flex items-center justify-center border transition-colors ${
                    view === 'list'
                      ? 'border-accent text-accent'
                      : 'border-border text-text-secondary hover:text-text'
                  }`}
                >
                  ☰
                </button>
              </div>
              <span className="text-text-secondary">{sorted.length} RECORDS</span>
            </div>
          </div>

          <Panel
            title={view === 'grid' ? 'NOTES GRID' : 'NOTES LIST'}
            count={`${sorted.length} RECORDS`}
            className="border-0"
          >
            <div
              className={`grid gap-0 ${
                view === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : 'grid-cols-1'
              }`}
            >
              {pageItems.map((note) => (
                <NotesListRow key={note.slug} note={note} />
              ))}
            </div>
          </Panel>

          {totalPages > 1 && (
            <PaginationBar
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </div>
  )
}
