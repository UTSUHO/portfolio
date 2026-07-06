import { ReactNode } from 'react'

interface ArticleLeadProps {
  children: ReactNode
}

export default function ArticleLead({ children }: ArticleLeadProps) {
  return (
    <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-3xl">
      {children}
    </p>
  )
}
