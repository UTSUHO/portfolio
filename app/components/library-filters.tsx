'use client'

import { LibraryCategory, LibraryStatus } from '@/lib/data'
import Panel from './panel'

interface LibraryFiltersProps {
  categories: LibraryCategory[]
  statuses: LibraryStatus[]
  selectedCategory: string
  selectedStatus: string
  onChangeCategory: (category: string) => void
  onChangeStatus: (status: string) => void
  counts: {
    total: number
    category: Record<string, number>
    status: Record<string, number>
  }
  onClear: () => void
}

export default function LibraryFilters({
  categories,
  statuses,
  selectedCategory,
  selectedStatus,
  onChangeCategory,
  onChangeStatus,
  counts,
  onClear
}: LibraryFiltersProps) {
  return (
    <Panel
      title="FILTERS"
      className="h-full border-0 border-b lg:border-b-0 lg:border-r border-border"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-mono uppercase tracking-wider text-text-secondary">
            // FILTERS
          </div>
          <button
            onClick={onClear}
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
                onClick={() => onChangeCategory('all')}
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
                <span>{counts.total}</span>
              </button>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => onChangeCategory(category)}
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
                  <span>{counts.category[category] || 0}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-text mb-3">
            STATUS
          </div>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => onChangeStatus('all')}
                className={`w-full flex items-center justify-between px-3 h-7 text-xs font-mono uppercase transition-colors duration-150 border ${
                  selectedStatus === 'all'
                    ? 'bg-accent text-text border-accent'
                    : 'text-text-secondary border-transparent hover:border-border hover:text-text'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 border ${
                      selectedStatus === 'all'
                        ? 'bg-text border-text'
                        : 'border-text-secondary'
                    }`}
                  />
                  ALL STATUS
                </span>
                <span>{counts.total}</span>
              </button>
            </li>
            {statuses.map((status) => (
              <li key={status}>
                <button
                  onClick={() => onChangeStatus(status)}
                  className={`w-full flex items-center justify-between px-3 h-7 text-xs font-mono uppercase transition-colors duration-150 border ${
                    selectedStatus === status
                      ? 'bg-accent text-text border-accent'
                      : 'text-text-secondary border-transparent hover:border-border hover:text-text'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 border ${
                        selectedStatus === status
                          ? 'bg-text border-text'
                          : 'border-text-secondary'
                      }`}
                    />
                    {status.replace('-', ' ')}
                  </span>
                  <span>{counts.status[status] || 0}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  )
}
