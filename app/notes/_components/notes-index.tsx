'use client'

import { useMemo, useState } from 'react'
import { notes, noteCategories, noteTags } from '@/lib/data'
import NotesHero from './notes-hero'
import NotesListRow from './notes-list-row'
import NotesFilters from './notes-filters'
import NotesSortBar, { NotesSortKey } from './notes-sort-bar'
import PaginationBar from '../../components/pagination-bar'
import Panel from '../../components/panel'

const PAGE_SIZE = 7

export default function NotesIndex() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<NotesSortKey>('date')
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
          cmp = parseInt(a.readingTime) - parseInt(b.readingTime)
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

  const handleChangeCategory = (category: string) => {
    setSelectedCategory(category)
    setPage(1)
  }

  const handleChangeTag = (tag: string | null) => {
    setSelectedTag(tag)
    setPage(1)
  }

  const handleSort = (key: NotesSortKey) => {
    setSortKey(key)
    setSortDir('desc')
    setPage(1)
  }

  const handleToggleDir = () => {
    setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
  }

  return (
    <div className="space-y-6" id="notes-body">
      <NotesHero />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0 border border-border bg-bg-primary">
        <NotesFilters
          categories={noteCategories}
          tags={noteTags}
          selectedCategory={selectedCategory}
          selectedTag={selectedTag}
          counts={{
            total: notes.length,
            category: categoryCounts,
            tag: tagCounts
          }}
          onChangeCategory={handleChangeCategory}
          onChangeTag={handleChangeTag}
          onClear={clearFilters}
        />

        <div className="min-w-0">
          <NotesSortBar
            sortKey={sortKey}
            sortDir={sortDir}
            view={view}
            resultCount={sorted.length}
            onSort={handleSort}
            onToggleDir={handleToggleDir}
            onView={setView}
          />

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
