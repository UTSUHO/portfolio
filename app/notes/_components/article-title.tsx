interface ArticleTitleProps {
  title: string
  titleZh: string
}

export default function ArticleTitle({ title, titleZh }: ArticleTitleProps) {
  return (
    <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-medium text-text leading-none">
      {titleZh || title}
      <span className="text-accent">_</span>
    </h1>
  )
}
