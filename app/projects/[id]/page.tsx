import { notFound } from 'next/navigation'
import { getProjectById, projects } from '@/lib/data'
import PageShell from '../../components/page-shell'
import ProjectPlaceholderWebGL from '../_components/project-placeholder-webgl'
import ArchitectureDiagram from '../_components/architecture-diagram'
import FadeIn from '../../components/fade-in'
import RelatedLinks from '../../components/related-links'

interface ProjectDetailProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return projects.map(project => ({ id: project.id }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: ProjectDetailProps) {
  const { id } = await params
  const project = getProjectById(id)
  return {
    title: project ? `${project.title} - Rei Utsuho` : 'Project - Rei Utsuho'
  }
}

export default async function ProjectDetail({ params }: ProjectDetailProps) {
  const { id } = await params
  const project = getProjectById(id)

  if (!project) {
    notFound()
  }

  return (
    <PageShell>
      <div className="max-w-screen-2xl mx-auto">
        {/* Hero */}
        <FadeIn>
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-border bg-bg-primary mb-6">
            <div className="lg:col-span-5 p-8 border-b lg:border-b-0 lg:border-r border-border">
              <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-4">
                {project.id} / PROJECT
              </div>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-text leading-none mb-4">
                {project.title}
              </h1>
              <p
                className="text-sm text-text-secondary leading-relaxed mb-8"
                style={{ fontSize: '13px' }}
              >
                {project.subtitle}
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-text-secondary mb-1">TYPE</div>
                  <div className="text-text">{project.meta.type}</div>
                </div>
                <div>
                  <div className="text-text-secondary mb-1">ROLE</div>
                  <div className="text-text">{project.meta.role}</div>
                </div>
                <div>
                  <div className="text-text-secondary mb-1">STATUS</div>
                  <div className="text-text">{project.meta.status}</div>
                </div>
                <div>
                  <div className="text-text-secondary mb-1">DATE</div>
                  <div className="text-text">{project.meta.date}</div>
                </div>
                <div>
                  <div className="text-text-secondary mb-1">DURATION</div>
                  <div className="text-text">{project.meta.duration}</div>
                </div>
                <div>
                  <div className="text-text-secondary mb-1">TECH</div>
                  <div className="text-text truncate">{project.meta.tech}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 min-h-[400px] lg:min-h-[500px]">
              <ProjectPlaceholderWebGL />
            </div>
          </section>
        </FadeIn>

        {/* Overview */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <FadeIn delay={100}>
            <div className="border border-border bg-bg-primary p-8 h-full">
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-block w-2 h-2 bg-accent" />
                <span className="text-xs font-mono uppercase tracking-wider text-text">
                  OVERVIEW
                </span>
              </div>
              <p className="text-base text-text leading-[1.8]">
                {project.overview}
              </p>
            </div>
          </FadeIn>

          {/* Problem  */}
          <FadeIn delay={200}>
            <div className="border border-border bg-bg-primary p-8 h-full">
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-block w-2 h-2 bg-accent" />
                <span className="text-xs font-mono uppercase tracking-wider text-text">
                  PROBLEM
                </span>
              </div>
              <p className="text-base text-text leading-[1.8]">
                {project.problem}
              </p>
            </div>
          </FadeIn>
        </section>
        {/* Solution */}
        <FadeIn delay={100}>
          <section className="border border-border bg-bg-primary p-8 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-block w-2 h-2 bg-accent" />
              <span className="text-xs font-mono uppercase tracking-wider text-text">
                SOLUTION
              </span>
            </div>
            <p className="text-base text-text leading-[1.8]">
              {project.solution}
            </p>
          </section>
        </FadeIn>
        {/* Architecture */}
        <FadeIn delay={100}>
          <section className="mb-6">
            <ArchitectureDiagram
              title={project.architecture.title}
              blocks={project.architecture.blocks}
              flow={project.architecture.flow}
            />
          </section>
        </FadeIn>

        {/* Challenges */}
        <FadeIn delay={100}>
          <section className="border border-border bg-bg-primary p-8 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-block w-2 h-2 bg-accent" />
              <span className="text-xs font-mono uppercase tracking-wider text-text">
                CHALLENGES
              </span>
            </div>
            <ul className="space-y-4">
              {project.challenges.map((challenge, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-base text-text leading-[1.8]"
                >
                  <span className="inline-block w-1.5 h-1.5 bg-accent mt-2 shrink-0" />
                  {challenge}
                </li>
              ))}
            </ul>
          </section>
        </FadeIn>

        {/* Outcome */}
        <FadeIn delay={100}>
          <section className="border border-border bg-bg-primary p-8 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-block w-2 h-2 bg-accent" />
              <span className="text-xs font-mono uppercase tracking-wider text-text">
                OUTCOME
              </span>
            </div>
            <p className="text-base text-text leading-[1.8] max-w-8xl">
              {project.outcome}
            </p>
          </section>
        </FadeIn>

        {/* Related */}
        <FadeIn delay={100}>
          <RelatedLinks refs={project.related} title="RELATED" />
        </FadeIn>
      </div>
    </PageShell>
  )
}
