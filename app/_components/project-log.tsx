'use client'

import { useState } from 'react'
import { Briefcase, ChevronRight, ExternalLink, Heart, Gamepad2, Monitor, Layers, Bot, Palette, ListCollapse, ListStart } from 'lucide-react'
import { Project, ProjectTag, PROJECT_TAG_MAP } from '@/lib/data'
import styles from './project-log.module.css'

interface ProjectLogProps {
  projects: Project[]
}

const iconMap: Record<string, typeof Briefcase> = {
  briefcase: Briefcase,
  heart: Heart,
  bot: Bot,
  gamepad2: Gamepad2,
  monitor: Monitor,
  layers: Layers,
  palette: Palette,
}

type GroupedProjects = Record<string, Project[]>

function TagBar({
  active,
  onSelect,
  allExpanded,
  onToggleExpand,
}: {
  active: ProjectTag | null
  onSelect: (tag: ProjectTag | null) => void
  allExpanded: boolean
  onToggleExpand: () => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 px-6 py-3 border-b">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider border transition-colors duration-150 ${
          active === null
            ? 'bg-black text-white border-black'
            : 'bg-transparent text-black border-black/30 hover:border-black'
        }`}
      >
        ALL
      </button>
      {PROJECT_TAG_MAP.map((tag) => {
        const Icon = iconMap[tag.icon]
        return (
          <button
            key={tag.index}
            type="button"
            onClick={() => onSelect(active === tag.index ? null : tag.index)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase tracking-wider border transition-colors duration-150 ${
              active === tag.index
                ? tag.index === 0
                  ? 'bg-black text-text-invert border-black'
                  : 'bg-black text-white border-black'
                : tag.index === 0
                  ? 'bg-transparent text-text-invert border-text-invert hover:border-black hover:text-black'
                  : 'bg-transparent text-black border-black/30 hover:border-black'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{tag.label}</span>
          </button>
        )
      })}
      <button
        type="button"
        onClick={onToggleExpand}
        aria-label={allExpanded ? 'Collapse all years' : 'Expand all years'}
        aria-pressed={allExpanded}
        title={allExpanded ? 'Collapse all years' : 'Expand all years'}
        className="ml-auto flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase tracking-wider border transition-colors duration-150 bg-transparent text-black border-black/30 hover:border-black"
      >
        {allExpanded ? <ListCollapse className="w-3.5 h-3.5" /> : <ListStart className="w-3.5 h-3.5" />}
      </button>
    </div>
  )
}

function groupByYear(projects: Project[]): GroupedProjects {
  return projects.reduce((acc, project) => {
    const year = project.year
    if (!acc[year]) acc[year] = []
    acc[year].push(project)
    return acc
  }, {} as GroupedProjects)
}

function Metadata({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-mono uppercase tracking-wider text-black/70">
        {label}
      </span>
      <span className="text-sm text-black">{value}</span>
    </div>
  )
}

function getYearTags(projects: Project[]): ProjectTag[] {
  return Array.from(new Set(projects.flatMap((p) => p.tags))).sort((a, b) => a - b)
}

function YearHeader({
  year,
  count,
  tags,
  open,
  onClick,
  isWork,
}: {
  year: string
  count: number
  tags: ProjectTag[]
  open: boolean
  onClick: () => void
  isWork: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.yearHeader} ${isWork ? styles.work : styles.personal}`}
    >
      <span className="marker" />
      <span className="label">{year}</span>
      <span className="count">[{count.toString().padStart(2, '0')}]</span>
      <div className="hidden md:flex items-center gap-1 ml-4">
        {tags.map((tag) => {
          const config = PROJECT_TAG_MAP.find((t) => t.index === tag)
          if (!config) return null
          const Icon = iconMap[config.icon]
          return (
            <span key={tag} title={config.label} className="tag">
              <Icon className="w-3 h-3" />
            </span>
          )
        })}
      </div>
      <ChevronRight className={`chevron ${open ? 'rotate-90' : ''}`} />
    </button>
  )
}

function ProjectMissionCard({ project, isWork }: { project: Project; isWork: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`${styles.recordCard} ${isWork ? styles.work : styles.personal}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-6 h-auto min-h-14 py-2 text-left hover:pl-5 sm:hover:pl-8 transition-all duration-150"
      >
        <span className="id shrink-0">[{project.id}]</span>
        <div className="flex-1 min-w-0 text-left overflow-hidden">
          <div className="title truncate">{project.title}</div>
          <div className="subtitle truncate">{project.subtitle}</div>
        </div>
        <span className="category hidden sm:inline-block truncate">{project.category}</span>
        <div className="hidden md:flex items-center gap-1.5 shrink-0">
          {project.tags.map((tag) => {
            const config = PROJECT_TAG_MAP.find((t) => t.index === tag)
            if (!config) return null
            const Icon = iconMap[config.icon]
            return (
              <span key={tag} title={config.label} className="tag">
                <Icon className="w-3.5 h-3.5" />
              </span>
            )
          })}
        </div>
        <ChevronRight className={`chevron shrink-0 ${open ? 'rotate-90' : ''}`} />
      </button>

      {open && (
        <div className={styles.expandedPanel}>
          <div className="overview">{project.overview}</div>

          <div className="metaGrid">
            <Metadata label="Role" value={project.meta.role} />
            <Metadata label="Status" value={project.meta.status} />
            <Metadata label="Duration" value={project.meta.duration} />
            <Metadata label="Stack" value={project.meta.tech} />
          </div>

          <div className="footer">
            <span className="year">{project.year}</span>
            <a href={`/projects/${project.id}`} className="link">
              <span>Details</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ProjectLog({ projects }: ProjectLogProps) {
  const [activeTag, setActiveTag] = useState<ProjectTag | null>(null)
  const filtered = activeTag !== null
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects
  const grouped = groupByYear(filtered)
  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a))
  const [openYears, setOpenYears] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    years.forEach((year) => (initial[year] = true))
    return initial
  })

  const toggleYear = (year: string) => {
    setOpenYears((prev) => ({ ...prev, [year]: !prev[year] }))
  }

  const allExpanded = years.length > 0 && years.every((year) => !!openYears[year])

  const toggleAllYears = () => {
    const next: Record<string, boolean> = {}
    years.forEach((year) => {
      next[year] = !allExpanded
    })
    setOpenYears((prev) => ({ ...prev, ...next }))
  }

  return (
    <div className="h-full flex flex-col overflow-auto scrollbar-system">
      <TagBar
        active={activeTag}
        onSelect={setActiveTag}
        allExpanded={allExpanded}
        onToggleExpand={toggleAllYears}
      />
      <div className="flex-1 overflow-auto scrollbar-system">
        {years.map((year) => (
          <div key={year} className="border-b ">
            <YearHeader
              year={year}
              count={grouped[year].length}
              tags={getYearTags(grouped[year])}
              open={!!openYears[year]}
              onClick={() => toggleYear(year)}
              isWork={grouped[year].some((p) => p.tags.includes(0))}
            />
            {openYears[year] && (
              <div>
                {grouped[year].map((project) => (
                  <ProjectMissionCard
                    key={project.id}
                    project={project}
                    isWork={project.tags.includes(0)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
