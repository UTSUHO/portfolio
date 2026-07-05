'use client'

import { useState } from 'react'
import { Briefcase, ChevronRight, ExternalLink, Heart, Gamepad2, Monitor, Layers, Bot, Palette, ListCollapse, ListStart } from 'lucide-react'
import { Project, ProjectTag, PROJECT_TAG_MAP } from '@/lib/data'

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
      className={`w-full flex items-center gap-3 h-12 px-6 text-left border-black/30 transition-colors duration-150 ${
        isWork ? 'bg-bg-accent text-text-invert' : 'bg-white text-black'
      }`}
    >
      <span className={`inline-block w-2 h-2 ${isWork ? 'bg-white' : 'bg-black'}`} />
      <span className={`text-base font-mono uppercase tracking-wider ${isWork ? 'text-white' : 'text-black'}`}>
        {year}
      </span>
      <span className={`text-sm font-mono uppercase tracking-wider ${isWork ? 'text-white/70' : 'text-black/70'}`}>
        [{count.toString().padStart(2, '0')}]
      </span>
      <div className="hidden md:flex items-center gap-1 ml-4">
        {tags.map((tag) => {
          const config = PROJECT_TAG_MAP.find((t) => t.index === tag)
          if (!config) return null
          const Icon = iconMap[config.icon]
          return (
            <span
              key={tag}
              title={config.label}
              className={`inline-flex items-center justify-center w-5 h-5 border ${
                isWork ? 'border-white/30 text-white/70' : 'border-black/20 text-black/60'
              }`}
            >
              <Icon className="w-3 h-3" />
            </span>
          )
        })}
      </div>
      <ChevronRight
        className={`w-4 h-4 ml-auto transition-transform duration-150 ${
          isWork ? 'text-white' : 'text-black'
        } ${open ? 'rotate-90' : ''}`}
      />
    </button>
  )
}

function ProjectMissionCard({ project, isWork }: { project: Project; isWork: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`border-b last:border-b-0 ${
      isWork ? 'bg-bg-accent text-white border-black/30' : 'bg-white text-black border-black/30'
    }`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group w-full flex items-center gap-4 px-6 h-14 text-left hover:pl-8 transition-all duration-150"
      >
        <span className={`text-sm font-mono w-14 shrink-0 ${isWork ? 'text-white' : 'text-black'}`}>
          [{project.id}]
        </span>
        <div className="flex-1 min-w-0 text-left">
          <div className={`text-base truncate ${isWork ? 'text-white' : 'text-black'}`}>{project.title}</div>
          <div className={`text-sm truncate ${isWork ? 'text-white/70' : 'text-black/70'}`}>
            {project.subtitle}
          </div>
        </div>
        <span className={`hidden sm:inline text-sm font-mono uppercase tracking-wider w-28 text-right shrink-0 ${
          isWork ? 'text-white/70' : 'text-black/70'
        }`}>
          {project.category}
        </span>
        <div className="hidden md:flex items-center gap-1.5 shrink-0">
          {project.tags.map((tag) => {
            const config = PROJECT_TAG_MAP.find((t) => t.index === tag)
            if (!config) return null
            const Icon = iconMap[config.icon]
            return (
              <span
                key={tag}
                title={config.label}
                className={`inline-flex items-center justify-center w-6 h-6 border ${
                  isWork ? 'border-white/30 text-white/70' : 'border-black/30 text-black/70'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </span>
            )
          })}
        </div>
        <ChevronRight
          className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
            isWork ? 'text-white' : 'text-black'
          } ${open ? 'rotate-90' : ''}`}
        />
      </button>

      {open && (
        <div className={`px-6 pb-5 bg-white border border-black/30`}>
          <div className="py-4 text-base text-black leading-relaxed">
            {project.overview}
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-t border-black/20">
            <Metadata label="Role" value={project.meta.role} />
            <Metadata label="Status" value={project.meta.status} />
            <Metadata label="Duration" value={project.meta.duration} />
            <Metadata label="Stack" value={project.meta.tech} />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-black/20">
            <span className="text-sm font-mono uppercase tracking-wider text-black/70">
              {project.year}
            </span>
            <a
              href={`/projects/${project.id}`}
              className="flex items-center gap-1.5 text-sm font-mono uppercase tracking-wider text-black hover:text-text-secondary transition-colors duration-150"
            >
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
