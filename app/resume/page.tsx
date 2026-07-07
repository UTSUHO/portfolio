import PageShell from '../components/page-shell'
import SkillBar from '../components/skill-bar'
import StatNumber from '../components/stat-number'
import ExperiencePanel from '../components/experience-panel'
import FadeIn from '../components/fade-in'
import Divider from '../components/divider'
import { experience, skills } from '@/lib/data'

export const metadata = {
  title: 'Resume - Rei Utsuho'
}

const stats = [
  { value: 7, label: 'Projects' },
  { value: 6, label: 'Years' },
  { value: 4, label: 'Translations' },
  { value: 2, label: 'Essays' }
]

export default function Resume() {
  return (
    <PageShell>
      <div className="max-w-screen-2xl mx-auto border border-border bg-bg-primary">
        {/* Hero */}
        <FadeIn>
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-border">
            <div className="lg:col-span-6 p-8 border-b lg:border-b-0 lg:border-r border-border">
              <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-4">HELLO,</div>
              <h1 className="font-display text-5xl lg:text-7xl font-bold text-text leading-none mb-6">
                I'M REI UTSUHO.
              </h1>
              <p className="text-base text-text-secondary leading-relaxed max-w-md">
                Building modern software systems with engineering thinking. Game designer, developer, and translator focused on systems, interfaces, and mythology.
              </p>
            </div>
            <div className="lg:col-span-6 p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-block w-2 h-2 bg-accent" />
                <span className="text-xs font-mono uppercase tracking-wider text-text">SKILL MATRIX</span>
              </div>
              <div className="space-y-5">
                {skills.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* About + Skills Detail */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-border">
          <FadeIn className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-border" delay={100}>
            <div className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-block w-2 h-2 bg-accent" />
                <span className="text-xs font-mono uppercase tracking-wider text-text">ABOUT</span>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="text-text-secondary">POSITION</div>
                  <div className="col-span-2 text-text">Indie Game Developer / Designer</div>
                </div>
                <Divider />
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="text-text-secondary">LOCATION</div>
                  <div className="col-span-2 text-text">Nanjing, China</div>
                </div>
                <Divider />
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="text-text-secondary">EMAIL</div>
                  <div className="col-span-2 text-text">contact@reiutsuho.dev</div>
                </div>
                <Divider />
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="text-text-secondary">AVAILABILITY</div>
                  <div className="col-span-2 text-text">Open to collaboration</div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="lg:col-span-6" delay={200}>
            <div className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-block w-2 h-2 bg-accent" />
                <span className="text-xs font-mono uppercase tracking-wider text-text">SKILLS BY DOMAIN</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Game Design',
                  'Systems Thinking',
                  'TypeScript',
                  'React / Next.js',
                  'Translation',
                  'UI Design',
                  'Prototyping',
                  'Narrative Design'
                ].map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-xs text-text">
                    <span className="inline-block w-1.5 h-1.5 bg-accent" />
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Experience + Engineering Profile */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-border">
          <FadeIn className="lg:col-span-8 border-b lg:border-b-0 lg:border-r border-border" delay={100}>
            <div className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-block w-2 h-2 bg-accent" />
                <span className="text-xs font-mono uppercase tracking-wider text-text">EXPERIENCE</span>
              </div>
              <ExperiencePanel items={experience} />
            </div>
          </FadeIn>

          <FadeIn className="lg:col-span-4" delay={200}>
            <div className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-block w-2 h-2 bg-accent" />
                <span className="text-xs font-mono uppercase tracking-wider text-text">ENGINEERING PROFILE</span>
              </div>
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat) => (
                  <StatNumber key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Open Source + Community */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-border">
          <FadeIn className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-border" delay={100}>
            <div className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-block w-2 h-2 bg-accent" />
                <span className="text-xs font-mono uppercase tracking-wider text-text">OPEN SOURCE</span>
              </div>
              <div className="space-y-4">
                <a href="https://github.com/UTSUHO" target="_blank" rel="noreferrer" className="group flex items-center gap-2 text-xs">
                  <span className="font-mono text-text-secondary">[GH]</span>
                  <span className="text-text group-hover:text-accent transition-colors">github.com/UTSUHO</span>
                </a>
                <div className="text-xs text-text-secondary">
                  Personal tools, translation pipelines, and experimental interfaces.
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="lg:col-span-6" delay={200}>
            <div className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-block w-2 h-2 bg-accent" />
                <span className="text-xs font-mono uppercase tracking-wider text-text">COMMUNITY</span>
              </div>
              <div className="space-y-4">
                <a href="https://bangumi.tv/user/nightofknight" target="_blank" rel="noreferrer" className="group flex items-center gap-2 text-xs">
                  <span className="font-mono text-text-secondary">[BG]</span>
                  <span className="text-text group-hover:text-accent transition-colors">bangumi.tv/user/nightofknight</span>
                </a>
                <div className="text-xs text-text-secondary">
                  Active in game analysis, translation, and indie development circles.
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Philosophy */}
        <FadeIn delay={100}>
          <section className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-block w-2 h-2 bg-accent" />
              <span className="text-xs font-mono uppercase tracking-wider text-text">ENGINEERING PHILOSOPHY</span>
            </div>
            <div className="max-w-3xl">
              <p className="text-base text-text leading-[1.8] mb-4">
                I design systems by first understanding the relationships between entities, then building interfaces that make those relationships visible and operable.
              </p>
              <p className="text-base text-text leading-[1.8] mb-4">
                Code is maintained through restraint: fewer abstractions, clearer boundaries, and consistent patterns. Every component should justify its existence.
              </p>
              <p className="text-base text-text leading-[1.8]">
                Engineering thinking means treating products as systems in motion—accounting for state, feedback, failure modes, and the humans who operate them.
              </p>
            </div>
          </section>
        </FadeIn>
      </div>
    </PageShell>
  )
}
