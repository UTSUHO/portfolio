'use client'

import { NoteCategory } from '@/lib/data'
import Panel from '../../components/panel'

interface NotesFiltersProps {
  categories: NoteCategory[]
  tags: string[]
  selectedCategory: string
  selectedTag: string | null
  counts: {
    total: number
    category: Record<string, number>
    tag: Record<string, number>
  }
  onChangeCategory: (category: string) => void
  onChangeTag: (tag: string | null) => void
  onClear: () => void
}

export default function NotesFilters({
  categories,
  tags,
  selectedCategory,
  selectedTag,
  counts,
  onChangeCategory,
  onChangeTag,
  onClear
}: NotesFiltersProps) {
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
            TAGS (POPULAR)
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onChangeTag(selectedTag === tag ? null : tag)}
                className={`text-[10px] font-mono uppercase tracking-wider border px-2 py-1 transition-colors ${
                  selectedTag === tag
                    ? 'bg-accent text-text border-accent'
                    : 'text-text-secondary border-border hover:border-text hover:text-text'
                }`}
              >
                {tag}
                <span className="ml-1 text-text-secondary">{counts.tag[tag] || 0}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  )
}
