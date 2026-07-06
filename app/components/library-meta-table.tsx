interface LibraryMetaTableProps {
  entries: { label: string; value: string; href?: string }[]
}

export default function LibraryMetaTable({ entries }: LibraryMetaTableProps) {
  return (
    <div className="border border-border bg-bg-primary">
      {entries.map((entry, index) => (
        <div
          key={index}
          className="flex items-center justify-between px-4 h-8 text-xs border-b last:border-b-0 border-border"
        >
          <span className="font-mono uppercase tracking-wider text-text-secondary">
            {entry.label}
          </span>
          {entry.href ? (
            <a
              href={entry.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-text hover:text-accent transition-colors"
            >
              {entry.value} ↗
            </a>
          ) : (
            <span className="font-mono text-text">{entry.value}</span>
          )}
        </div>
      ))}
    </div>
  )
}
