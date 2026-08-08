import LineSequenceScene from './_components/line-sequence-scene'
import TabNav from './components/tab-nav'
import Section from './_components/section'
import SubSection from './_components/sub-section'
import ExperienceSection from './_components/experience-section'
import WorkShowcase from './_components/showcase/work-showcase'
import ProjectLog from './_components/project-log'
import LatestNotesPanel from './_components/latest-notes-panel'
import LatestLibraryPanel from './_components/latest-library-panel'
import Link from 'next/link'
import { experienceProfiles, libraryEntries, notes, projects } from '@/lib/data'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col w-full box-border">
      {/* section1 */}
      <Section
        id="dashboard"
        backgroundColor="#FFFFFF"
        className="snap-start h-screen flex flex-col pt-[var(--height-status)] min-h-0"
      >
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 border border-none min-h-0">
          {/* Left: Identity Panel */}
          <div
            className="lg:col-span-4 border-r bg-bg-primary flex flex-col"
            data-section-id="identity"
            data-section-color="#FFFFFF"
          >
            <div className="p-6 flex-1">
              <div
                className="text-white text-xl mt-8 mb-8 ml-4"
                style={{ mixBlendMode: 'difference' }}
              >
                //&nbsp;&nbsp;&nbsp;IDENTITY
              </div>
              <h1
                className="font-bold leading-none mb-8 text-left text-text"
                style={{
                  fontSize: '96px',
                  fontFamily: '"Space Grotesk", system-ui, sans-serif'
                }}
              >
                Rei Utsuho
                <span className="cursor-blink text-accent">_</span>
              </h1>
              <h2 className="text-xl uppercase tracking-wider mb-8 text-text">
                &lt; Digital IronSmith /&gt;
              </h2>
              <div className="mb-16">
                <p className="text-s leading-relaxed text-text-secondary">
                  <span>
                    Indie game designer & full-stack developer. Currently
                    running Indie Game Studio
                  </span>
                  &nbsp;
                  <span className="underline text-text">Ypsilon Janus</span>.
                  <br />
                  <span>
                    Passionate about building high performance web applications
                    and delightful user experiences.
                  </span>
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-accent" />
                  <span className="text-xs font-mono text-text-secondary">
                    Project ETR 2027
                  </span>
                </div>
              </div>
              <div className="mt-8 mb-8">
                <div
                  className="text-white text-xl mb-8 ml-4"
                  style={{ mixBlendMode: 'difference' }}
                >
                  //&nbsp;&nbsp;&nbsp;RESEARCH FIELD
                </div>
                <div className="relative h-px w-full bg-gradient-to-r from-transparent via-subtle to-transparent">
                  {/* <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-accent rounded-full" />
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-accent rounded-full" /> */}
                </div>
                <br />
                <div className="flex justify-between items-center pl-6 pr-6">
                  <span>GAME DESIGN</span>
                  {/* <span className="mx-2">|</span> */}
                  <span>COMPUTER GRAPHICS</span>
                  {/* <span className="mx-2">|</span> */}
                  <span>AGENT ENGINEERING</span>
                </div>
              </div>
              <div>
                <div
                  className="text-white text-xl mt-8 mb-8 ml-4"
                  style={{ mixBlendMode: 'difference' }}
                >
                  //&nbsp;&nbsp;&nbsp;TECH STACK
                </div>
                <div className="relative h-px w-full bg-gradient-to-r from-transparent via-subtle to-transparent">
                  {/* <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-accent rounded-full" />
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-accent rounded-full" /> */}
                </div>
                <br />
                <div className="flex justify-between items-center pl-6 pr-6">
                  <span>VUE/REACT</span>
                  {/* <span className="mx-2">|</span> */}
                  <span>NODE/JS/TS</span>
                  <span>WEBGL/CG</span>
                  <span>PYTHON</span>
                  <span>GRAPH RAG</span>
                  <span>BENCHMARK OPS</span>
                </div>{' '}
              </div>
            </div>
          </div>

          {/* Right: Visual Panel with TabNav */}
          <div
            className="lg:col-span-8 bg-bg-primary flex flex-col min-h-0"
            data-section-id="visual"
            data-section-color="#FFFFFF"
          >
            <LineSequenceScene
              dataUrl="/data/line_sequence_classified.json"
              autoPlay
              loop
              playbackFps={60}
              specimen
            />
            <TabNav />
          </div>
        </div>
      </Section>
      {/* section2 */}
      <Section
        id="showcase"
        backgroundColor="#13181d"
        className="snap-start h-screen flex flex-col"
        name="WORK_SHOWCASE"
      >
        <div className="flex-1 min-h-0 pb-8 pl-8 pr-8">
          <WorkShowcase />
        </div>
      </Section>
      {/* section3 */}
      <Section
        id="terminal"
        backgroundColor="#FFF"
        className="snap-start h-screen flex flex-col"
      >
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 ">
          <ExperienceSection profiles={experienceProfiles} />
          <SubSection
            title="PROJECT_LOGS"
            count={
              <Link
                href="/notes"
                className="flex hover:text-text-invert transition-colors duration-150"
              >
                <span>VIEW ALL PROJECTS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
            backgroundColor="bg-accent"
            textColor="text"
            borderColor="border"
            headerStyle={{ borderColor: 'rgba(0, 0, 0, 0.3)' }}
          >
            <ProjectLog projects={projects} />
          </SubSection>
        </div>
      </Section>
      {/* section4 */}
      <Section
        id="library"
        backgroundColor="#13181D"
        className="snap-start flex flex-col"
        style={{ height: 'calc(100vh - 32px)' }}
      >
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2">
          <SubSection
            title="LIBRARY"
            count={
              <Link
                href="/library"
                className="flex hover:text-white/80 transition-colors duration-150"
              >
                <span>VIEW ALL LIBRARY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
            backgroundColor="bg-invert"
            textColor="text-invert"
            borderColor="border-invert"
          >
            <LatestLibraryPanel entries={libraryEntries.slice(0, 7)} />
          </SubSection>
          <SubSection
            title="LATEST NOTES"
            count={
              <Link
                href="/notes"
                className="flex hover:text-text transition-colors duration-150"
              >
                <span>VIEW ALL NOTES</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
            backgroundColor="bg-primary"
            textColor="text"
            borderColor="border"
          >
            <LatestNotesPanel notes={notes.slice(0, 7)} />
          </SubSection>
        </div>
      </Section>
    </div>
  )
}
