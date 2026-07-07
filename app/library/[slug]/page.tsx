import { notFound } from 'next/navigation'
import {
  libraryEntries,
  getLibraryEntryBySlug,
  getAdjacentLibraryEntries,
  getLibraryRelated
} from '@/lib/data'
import PageShell from '../../components/page-shell'
import LibraryDetail from '../_components/library-detail'

interface LibraryDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return libraryEntries.map((entry) => ({ slug: entry.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: LibraryDetailPageProps) {
  const { slug } = await params
  const entry = getLibraryEntryBySlug(slug)
  return {
    title: entry ? `${entry.title} - Rei Utsuho` : 'Library - Rei Utsuho'
  }
}

export default async function LibraryDetailPage({
  params
}: LibraryDetailPageProps) {
  const { slug } = await params
  const entry = getLibraryEntryBySlug(slug)

  if (!entry) {
    notFound()
  }

  const { prev, next } = getAdjacentLibraryEntries(slug)
  const related = getLibraryRelated(entry)

  return (
    <PageShell>
      <div className="max-w-screen-2xl mx-auto">
        <LibraryDetail entry={entry} related={related} prev={prev} next={next} />
      </div>
    </PageShell>
  )
}
