'use client'

import { useState, useMemo } from 'react'
import { NoteMeta, categories, years, tags } from '@/lib/data'
import NoteListRow from './note-list-row'

interface NoteFiltersProps {
  notes: NoteMeta[]
}

export default function NoteFilters({ notes }: NoteFiltersProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        search === '' ||
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.category.toLowerCase().includes(search.toLowerCase()) ||
        note.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))

      const matchesCategory = selectedCategory === null || note.category === selectedCategory
      const matchesYear = selectedYear === null || note.date.startsWith(selectedYear)
      const matchesTag = selectedTag === null || note.tags.includes(selectedTag)

      return matchesSearch && matchesCategory && matchesYear && matchesTag
    })
  }, [notes, search, selectedCategory, selectedYear, selectedTag])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const note of notes) {
      counts[note.category] = (counts[note.category] || 0) + 1
    }
    return counts
  }, [notes])

  const yearCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const note of notes) {
      const year = note.date.split('.')[0]
      counts[year] = (counts[year] || 0) + 1
    }
    return counts
  }, [notes])

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const note of notes) {
      for (const tag of note.tags) {
        counts[tag] = (counts[tag] || 0) + 1
      }
    }
    return counts
  }, [notes])

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory(null)
    setSelectedYear(null)
    setSelectedTag(null)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-border bg-bg-primary">
      {/* Sidebar */}
      <aside className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-border p-4">
        <div className="lg:sticky lg:top-[calc(var(--height-status)+24px)]">
          <div className="mb-6">
            <div className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border border-border bg-bg mb-3">
              <span className="inline-block w-2 h-2 bg-accent" />
              <span className="text-text">SEARCH</span>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="KEYWORD"
              className="w-full px-3 h-8 bg-transparent border border-border text-xs font-mono text-text placeholder:text-text-secondary focus:outline-none focus:border-accent"
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border border-border bg-bg mb-3">
              <span className="inline-block w-2 h-2 bg-accent" />
              <span className="text-text">CATEGORIES</span>
            </div>
            <ul className="space-y-1">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    className={`w-full flex items-center justify-between px-3 h-7 text-xs font-mono uppercase transition-colors duration-150 border ${
                      selectedCategory === category
                        ? 'bg-accent text-text border-accent'
                        : 'text-text-secondary border-transparent hover:border-border hover:text-text'
                    }`}
                  >
                    <span>{category}</span>
                    <span>{categoryCounts[category] || 0}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border border-border bg-bg mb-3">
              <span className="inline-block w-2 h-2 bg-accent" />
              <span className="text-text">YEARS</span>
            </div>
            <ul className="space-y-1">
              {years.map((year) => (
                <li key={year}>
                  <button
                    onClick={() => setSelectedYear(selectedYear === year ? null : year)}
                    className={`w-full flex items-center justify-between px-3 h-7 text-xs font-mono uppercase transition-colors duration-150 border ${
                      selectedYear === year
                        ? 'bg-accent text-text border-accent'
                        : 'text-text-secondary border-transparent hover:border-border hover:text-text'
                    }`}
                  >
                    <span>{year}</span>
                    <span>{yearCounts[year] || 0}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border border-border bg-bg mb-3">
              <span className="inline-block w-2 h-2 bg-accent" />
              <span className="text-text">TAGS</span>
            </div>
            <ul className="space-y-1">
              {tags.map((tag) => (
                <li key={tag}>
                  <button
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`w-full flex items-center justify-between px-3 h-7 text-xs font-mono lowercase transition-colors duration-150 border ${
                      selectedTag === tag
                        ? 'bg-accent text-text border-accent'
                        : 'text-text-secondary border-transparent hover:border-border hover:text-text'
                    }`}
                  >
                    <span>{tag}</span>
                    <span>{tagCounts[tag] || 0}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-border p-3">
            <div className="text-xs font-mono uppercase tracking-wider text-text mb-2">STATISTICS</div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="text-text-secondary">TOTAL</div>
              <div className="text-right text-text">{notes.length}</div>
              <div className="text-text-secondary">FILTERED</div>
              <div className="text-right text-text">{filteredNotes.length}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* List */}
      <div className="lg:col-span-9">
        <div className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b border-border bg-bg">
          <span className="inline-block w-2 h-2 bg-accent" />
          <span className="text-text">ARCHIVE</span>
          <span className="ml-auto text-text-secondary">{filteredNotes.length} RECORDS</span>
        </div>

        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, index) => (
            <NoteListRow key={note.slug} note={note} index={index} />
          ))
        ) : (
          <div className="p-8 text-center">
            <div className="text-xs font-mono uppercase tracking-wider text-text mb-2">NO RECORD FOUND</div>
            <div className="text-xs text-text-secondary mb-4">Try another keyword.</div>
            <button
              onClick={clearFilters}
              className="px-4 h-8 border border-text text-xs font-mono uppercase tracking-wider text-text hover:bg-text hover:text-bg transition-colors"
            >
              CLEAR FILTERS
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
