import { notFound } from 'next/navigation'
import { notes, getAdjacentNotes, getNoteBySlug } from '@/lib/data'
import { getNoteContent } from '@/lib/mdx'
import PageShell from '../../components/page-shell'
import NoteReader from '../../components/note-reader'

interface NoteDetailProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: NoteDetailProps) {
  const { slug } = await params
  const note = getNoteBySlug(slug)
  return {
    title: note ? `${note.title} - Rei Utsuho` : 'Note - Rei Utsuho'
  }
}

export default async function NoteDetail({ params }: NoteDetailProps) {
  const { slug } = await params
  const meta = getNoteBySlug(slug)

  if (!meta) {
    notFound()
  }

  const content = await getNoteContent(slug, meta)
  if (!content) {
    notFound()
  }

  const { headings } = content
  const { prev, next } = getAdjacentNotes(slug)

  // Import the MDX module via the manual mapping so @next/mdx processes it.
  const { getNoteModule } = await import('@/lib/mdx')
  const noteModule = await getNoteModule(slug)
  if (!noteModule) {
    notFound()
  }

  const MdxContent = noteModule.default

  return (
    <PageShell className="p-6">
      <div className="max-w-7xl mx-auto">
        <NoteReader meta={meta} headings={headings} prev={prev} next={next}>
          <MdxContent />
        </NoteReader>
      </div>
    </PageShell>
  )
}
