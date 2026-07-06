'use client'

import { ReactNode } from 'react'
import { NoteEntry } from '@/lib/data'
import { Heading, NoteFrontmatter } from '@/lib/mdx'
import ArticleMeta from './article-meta'
import ArticleTitle from './article-title'
import ArticleLead from './article-lead'
import CoverImage from './cover-image'
import TocPanel from './toc-panel'
import SharePanel from './share-panel'
import BottomNoteNav from './bottom-note-nav'

interface NoteReaderProps {
  meta: NoteEntry
  frontmatter: NoteFrontmatter
  headings: Heading[]
  children: ReactNode
  prev: NoteEntry | null
  next: NoteEntry | null
}

export default function NoteReader({
  meta,
  frontmatter,
  headings,
  children,
  prev,
  next
}: NoteReaderProps) {
  const title = frontmatter.titleZh || meta.titleZh || meta.title
  const displayTitle = frontmatter.title || meta.title
  const category = (frontmatter.category || meta.category) as string
  const date = frontmatter.date || meta.date
  const readingTime = frontmatter.readingTime || meta.readingTime
  const coverImage = frontmatter.coverImage || meta.coverImage
  const excerpt = frontmatter.excerpt || meta.excerpt

  const tocItems = headings.map((heading) => ({
    id: heading.id,
    number: String(headings.indexOf(heading) + 1).padStart(2, '0'),
    title: heading.text
  }))

  return (
    <article className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
      <div className="min-w-0">
        <header className="mb-10 space-y-6">
          <ArticleMeta
            date={date}
            category={category}
            readingTime={readingTime}
          />
          <ArticleTitle title={displayTitle} titleZh={title} />
          <ArticleLead>{excerpt}</ArticleLead>
          {coverImage && (
            <CoverImage src={coverImage} alt={title || displayTitle} />
          )}
        </header>

        <div className="max-w-[780px]">{children}</div>

        <div className="lg:hidden mt-12 mb-8">
          <TocPanel items={tocItems} title="TABLE OF CONTENTS" />
        </div>

        <BottomNoteNav prev={prev} next={next} />
      </div>

      <aside className="hidden lg:block space-y-6">
        <TocPanel items={tocItems} title="TABLE OF CONTENTS" />
        <SharePanel />
      </aside>
    </article>
  )
}
