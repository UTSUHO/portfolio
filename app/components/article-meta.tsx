interface ArticleMetaProps {
  date: string
  category: string
  readingTime: string
}

export default function ArticleMeta({ date, category, readingTime }: ArticleMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-wider text-text-secondary">
      <span>{date}</span>
      <span className="text-accent">{category}</span>
      <span>•</span>
      <span>{readingTime}</span>
    </div>
  )
}
