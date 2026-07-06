'use client'

interface PaginationBarProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function PaginationBar({
  currentPage,
  totalPages,
  onPageChange
}: PaginationBarProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-between px-4 h-12 border-t border-border bg-bg text-xs font-mono uppercase tracking-wider">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="text-text-secondary hover:text-text disabled:text-border disabled:cursor-not-allowed transition-colors"
      >
        ← PREV
      </button>

      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-7 h-7 flex items-center justify-center transition-colors ${
              currentPage === page
                ? 'bg-accent text-text'
                : 'text-text-secondary hover:text-text'
            }`}
          >
            {String(page).padStart(2, '0')}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="text-text-secondary hover:text-text disabled:text-border disabled:cursor-not-allowed transition-colors"
      >
        NEXT →
      </button>
    </div>
  )
}
