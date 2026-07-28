import Link from 'next/link'
import { RelatedRef } from '@/lib/data/related'
import { resolveRelated, getRelatedLabel } from '@/lib/data/related.server'
import Panel from './panel'

interface RelatedLinksProps {
  refs: RelatedRef[]
  title?: string
  className?: string
}

export default function RelatedLinks({
  refs,
  title = 'RELATED',
  className = ''
}: RelatedLinksProps) {
  const items = resolveRelated(refs)

  if (items.length === 0) return null

  return (
    <Panel
      title={title}
      count={`${items.length} ITEMS`}
      className={className}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
        {items.map((item) => {
          const { type, data } = item
          const href =
            type === 'project'
              ? `/projects/${data.id}`
              : type === 'library'
                ? `/library/${data.slug}`
                : `/notes/${data.slug}`

          const label = getRelatedLabel(type)
          const primary =
            type === 'project'
              ? data.title
              : type === 'library'
                ? data.title
                : data.title
          const secondary =
            type === 'project'
              ? `${data.category} / ${data.year}`
              : type === 'library'
                ? `${data.type.replace(/-/g, ' ').toUpperCase()} / ${data.category}`
                : `${data.category} / ${data.date}`

          return (
            <Link
              key={`${type}-${type === 'project' ? data.id : data.slug}`}
              href={href}
              className="group block p-6 border-b sm:border-r border-border last:border-r-0 hover:bg-bg transition-colors"
            >
              <div className="text-xs font-mono text-text-secondary mb-2">
                {label}
              </div>
              <div
                className="text-text group-hover:text-accent transition-colors mb-2"
                style={{ fontSize: '13px' }}
              >
                {primary}
              </div>
              <div className="text-xs text-text-secondary">{secondary}</div>
            </Link>
          )
        })}
      </div>
    </Panel>
  )
}
