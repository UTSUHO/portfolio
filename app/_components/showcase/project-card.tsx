import Link from 'next/link'
import type { ReactNode } from 'react'
import type { ShowcaseProject } from './showcase-data'
import ProjectMetadata from './project-metadata'
import styles from './showcase.module.css'

interface ProjectCardProps {
  project: ShowcaseProject
  visual: ReactNode
  className?: string
}

export default function ProjectCard({
  project,
  visual,
  className = ''
}: ProjectCardProps) {
  return (
    <Link
      href={project.href}
      className={`${styles.card} group h-full w-full ${className}`}
      aria-label={project.title}
    >
      {/* Visual area — future WebGL mount slot */}
      <div className="relative min-h-0 overflow-hidden">{visual}</div>

      <ProjectMetadata project={project} />

      {/* Footer */}
      <div className="flex items-center justify-between px-3 border-t border-subtle text-[10px] font-mono uppercase tracking-wider text-text-secondary pointer-events-none">
        <span>[{project.index}]</span>
        <span className="transition-colors duration-200 group-hover:text-accent">
          {project.category}
        </span>
      </div>
    </Link>
  )
}
