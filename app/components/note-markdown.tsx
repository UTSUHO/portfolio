'use client'

import { marked } from 'marked'
import { useMemo } from 'react'

export default function NoteMarkdown({ children }: { children: string }) {
  const html = useMemo(() => marked(children, { breaks: true }), [children])

  return (
    <div
      className="prose-note"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
