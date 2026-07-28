'use client'

import { marked } from 'marked'
import { useMemo } from 'react'

function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w一-龥\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function NoteMarkdown({ children }: { children: string }) {
  const html = useMemo(() => {
    const renderer = new marked.Renderer()
    renderer.heading = (text, depth) => {
      const id = slugifyHeading(text)
      return `<h${depth} id="${id}">${text}</h${depth}>`
    }
    return marked(children, { breaks: true, renderer }) as string
  }, [children])

  return (
    <div
      className="prose-note"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
