'use client'

import { ReactNode } from 'react'
import { NoteMeta } from '@/lib/data'
import { Heading } from '@/lib/mdx'
import NoteToc from './note-toc'
import Button from './button'
import Link from 'next/link'

interface NoteReaderProps {
  meta: NoteMeta
  headings: Heading[]
  children: ReactNode
  prev: NoteMeta | null
  next: NoteMeta | null
}

export default function NoteReader({ meta, headings, children, prev, next }: NoteReaderProps) {
  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Hero + Content */}
        <div className="lg:col-span-8">
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6 text-xs font-mono uppercase tracking-wider text-text-secondary">
              <span>{meta.date}</span>
              <span className="text-accent">[{meta.category}]</span>
              <span>{meta.readTime} READ</span>
            </div>

            <h1 className="font-display text-6xl lg:text-7xl font-medium text-text leading-none mb-8">
              {meta.title}
            </h1>

            {meta.coverImage && (
              <div className="border border-border overflow-hidden">
                <img
                  src={meta.coverImage}
                  alt={meta.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </header>

          <div className="max-w-3xl">
            {children}
          </div>

          <footer className="mt-16 pt-8 border-t border-border">
            <div className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border border-border bg-bg mb-4">
              <span className="inline-block w-2 h-2 bg-accent" />
              <span className="text-text">NAVIGATION</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-2">PREVIOUS</div>
                {prev ? (
                  <Link href={`/notes/${prev.slug}`} className="group">
                    <div className="text-text group-hover:text-accent transition-colors" style={{ fontSize: '13px' }}>
                      {prev.title}
                    </div>
                  </Link>
                ) : (
                  <div className="text-text-secondary">—</div>
                )}
              </div>

              <div className="text-left sm:text-right">
                <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-2">NEXT</div>
                {next ? (
                  <Link href={`/notes/${next.slug}`} className="group">
                    <div className="text-text group-hover:text-accent transition-colors" style={{ fontSize: '13px' }}>
                      {next.title}
                    </div>
                  </Link>
                ) : (
                  <div className="text-text-secondary">—</div>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => navigator.clipboard.writeText(window.location.href)}>
                SHARE
              </Button>
            </div>
          </footer>
        </div>

        {/* TOC */}
        <div className="hidden lg:block lg:col-span-4 pl-8">
          <NoteToc headings={headings} />
        </div>
      </article>
  )
}
