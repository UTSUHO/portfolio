import { NormalizedLibrarySection } from './normalize-section'
import LibraryMetaTable from '../library-meta-table'

interface ProseSectionProps {
  section: NormalizedLibrarySection
}

export function ProseSection({ section }: ProseSectionProps) {
  return (
    <div className="space-y-4">
      {section.body && (
        <p className="max-w-[74ch] leading-[1.7] text-sm text-text-secondary">
          {section.body}
        </p>
      )}

      {section.bullets && section.bullets.length > 0 && (
        <ul className="space-y-2">
          {section.bullets.map((bullet, idx) => (
            <li key={idx} className="flex gap-2 text-sm text-text">
              <span className="text-accent mt-1">■</span>
              <span className="text-text-secondary">{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {section.diagram && (
        <pre className="text-[10px] font-mono text-text-secondary bg-bg p-3 border border-border whitespace-pre-wrap leading-relaxed">
          {section.diagram}
        </pre>
      )}

      {section.table && section.table.length > 0 && (
        <LibraryMetaTable entries={section.table} />
      )}

      {section.codeBlock && (
        <pre className="text-[10px] font-mono text-text-secondary bg-bg p-3 border border-border whitespace-pre-wrap leading-relaxed">
          {section.codeBlock}
        </pre>
      )}
    </div>
  )
}
