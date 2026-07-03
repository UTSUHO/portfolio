import Timeline, { TimelineItem } from './timeline'
import SkillBar from './skill-bar'

export interface ExperiencePanelProps {
  items: TimelineItem[]
  skills?: { name: string; level: number }[]
}

export default function ExperiencePanel({ items, skills }: ExperiencePanelProps) {
  const showSkills = skills && skills.length > 0

  return (
    <div className={`h-full ${showSkills ? 'grid grid-cols-1 lg:grid-cols-3' : ''}`}>
      <div className={`overflow-auto p-6 ${showSkills ? 'lg:col-span-2 lg:border-r border-border' : ''}`}>
        <Timeline items={items} />
      </div>
      {showSkills && (
        <div className="lg:col-span-1 p-6 overflow-auto">
          <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-4">
            // SKILLS
          </div>
          <div className="space-y-4">
            {skills.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
