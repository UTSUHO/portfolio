import FadeIn from '../../components/fade-in'
import ProjectCard from './project-card'
import { showcaseProjects } from './showcase-data'
import AgentPlatformVisual from './visuals/agent-platform-visual'
import CadAnnotationVisual from './visuals/cad-annotation-visual'
import AiTrainingVisual from './visuals/ai-training-visual'

const visuals = [
  <AgentPlatformVisual key="agent" />,
  <CadAnnotationVisual key="cad" />,
  <AiTrainingVisual key="ai" />
]

export default function WorkShowcase() {
  return (
    <div className="flex-1 min-h-full grid grid-cols-1 grid-rows-3 lg:grid-cols-3 lg:grid-rows-1 border border-subtle">
      {showcaseProjects.map((project, i) => (
        <FadeIn
          key={project.index}
          delay={i * 120}
          className="min-h-0 h-full border-subtle border-b last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
        >
          <ProjectCard project={project} visual={visuals[i]} />
        </FadeIn>
      ))}
    </div>
  )
}
