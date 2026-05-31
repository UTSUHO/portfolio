'use client'

import Link from 'next/link'

interface DataRowProps {
  index: string
  title: string
  category?: string
  year?: string
  href?: string
  children?: React.ReactNode
}

export default function DataRow({ index, title, category, year, href, children }: DataRowProps) {
  const row = (
    <div
      className="group flex items-center gap-4 px-4 h-12 text-xs font-mono border-b transition-all duration-150 hover:pl-6 cursor-pointer"
      style={{ borderColor: '#DCDCDC' }}
    >
      <span className="w-8" style={{ color: '#6B6B6B' }}>{index}</span>
      <span className="flex-1 truncate" style={{ color: '#0A0A0A', fontSize: '13px', fontFamily: '"Inter", system-ui, sans-serif' }}>
        {title}
      </span>
      {category && (
        <span className="hidden sm:block w-32 truncate" style={{ color: '#6B6B6B' }}>{category}</span>
      )}
      {year && (
        <span className="w-12 text-right" style={{ color: '#6B6B6B' }}>{year}</span>
      )}
      <span
        className="w-4 text-right transition-colors group-hover:text-[#FF4D3A]"
        style={{ color: '#DCDCDC' }}
      >
        →
      </span>
    </div>
  )

  if (href) {
    return <Link href={href}>{row}</Link>
  }

  return row
}
