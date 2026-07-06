'use client'

import { useMemo, useState } from 'react'
import {
  libraryEntries,
  libraryCategories,
  libraryStatuses
} from '@/lib/data'
import LibraryHero from './library-hero'
import LibraryFilters from './library-filters'
import LibrarySortBar, { LibrarySortKey } from './library-sort-bar'
import LibraryCard from './library-card'
import PaginationBar from './pagination-bar'

const PAGE_SIZE = 8

export default function LibraryIndex() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [sortKey, setSortKey] = useState<LibrarySortKey>('year')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(1)

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const entry of libraryEntries) {
      counts[entry.category] = (counts[entry.category] || 0) + 1
    }
    return counts
  }, [])

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const entry of libraryEntries) {
      counts[entry.status] = (counts[entry.status] || 0) + 1
    }
    return counts
  }, [])

  const filtered = useMemo(() => {
    return libraryEntries.filter((entry) => {
      const categoryMatch =
        selectedCategory === 'all' || entry.category === selectedCategory
      const statusMatch =
        selectedStatus === 'all' || entry.status === selectedStatus
      return categoryMatch && statusMatch
    })
  }, [selectedCategory, selectedStatus])

  const sorted = useMemo(() => {
    const arr = [...filtered]
    arr.sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case 'year':
          cmp = a.year - b.year
          break
        case 'topic':
          cmp = a.category.localeCompare(b.category)
          break
        case 'type':
          cmp = a.type.localeCompare(b.type)
          break
        case 'status':
          cmp = a.status.localeCompare(b.status)
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
    setSelectedStatus('all')
    setPage(1)
  }

  return (
    <div className="space-y-6" id="library-body">
      <LibraryHero />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0 border border-border bg-bg-primary">
        <LibraryFilters
          categories={libraryCategories}
          statuses={libraryStatuses}
          selectedCategory={selectedCategory}
          selectedStatus={selectedStatus}
          onChangeCategory={(c) => {
            setSelectedCategory(c)
            setPage(1)
          }}
          onChangeStatus={(s) => {
            setSelectedStatus(s)
            setPage(1)
          }}
          counts={{
            total: libraryEntries.length,
            category: categoryCounts,
            status: statusCounts
          }}
          onClear={clearFilters}
        />

        <div className="min-w-0">
          <LibrarySortBar
            sortKey={sortKey}
            sortDir={sortDir}
            view={view}
            resultCount={sorted.length}
            onSort={(key) => {
              setSortKey(key)
              setPage(1)
            }}
            onToggleDir={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
            onView={setView}
          />

          <div
            className={`grid gap-0 border-t-0 border-border ${
              view === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'
                : 'grid-cols-1'
            }`}
          >
            {pageItems.map((entry) => (
              <LibraryCard key={entry.slug} entry={entry} variant={view} />
            ))}
          </div>

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
