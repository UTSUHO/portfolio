import type { ShowcaseProject } from './showcase-data'

interface ProjectMetadataProps {
  project: ShowcaseProject
}

export default function ProjectMetadata({ project }: ProjectMetadataProps) {
  return (
    <div className="flex flex-col min-h-0 px-4 py-3 border-t border-subtle overflow-hidden">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="inline-block w-1.5 h-1.5 bg-accent" />
        <span className="text-[10px] font-mono text-text-secondary tracking-widest">
          {project.index}
        </span>
      </div>
      <h3
        className="text-text-invert text-sm font-bold uppercase tracking-wide leading-tight mb-1.5"
        style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
      >
        {project.title}
      </h3>
      <p className="text-[11px] leading-relaxed text-text-secondary line-clamp-2 mb-2">
        {project.description}
      </p>
      <div className="mt-auto flex flex-wrap gap-x-2 gap-y-0.5 text-[9px] font-mono uppercase tracking-wider text-text-secondary/80">
        {project.tech.map((t, i) => (
          <span key={t} className="flex items-center gap-2">
            {i > 0 && <span className="text-text-secondary/40">/</span>}
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
