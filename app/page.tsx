import LineSequenceScene from "./components/line-sequence-scene";
import TabNav from "./components/tab-nav";
import Section from "./components/section";
import SubSection from "./components/sub-section";
import WebGLSlot from "./components/webgl-slot";
import ExperienceSection from "./components/experience-section";
import LatestNotesPanel from "./components/latest-notes-panel";
import Link from "next/link";
import { experienceProfiles, notes } from "@/lib/data";

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
                style={{ mixBlendMode: "difference" }}
              >
                //&nbsp;&nbsp;&nbsp;IDENTITY
              </div>
              <h1
                className="font-bold leading-none mb-2 text-text"
                style={{
                  fontSize: "96px",
                  fontFamily: '"Space Grotesk", system-ui, sans-serif',
                }}
              >
                Rei Utsuho
                <span className="cursor-blink text-accent">_</span>
              </h1>
              <p className="text-xs font-mono uppercase tracking-wider mb-4 text-text-secondary">
                Digital IronSmith
              </p>
              <p className="text-xs leading-relaxed text-text-secondary">
                Indie game designer & full-stack developer. Currently running
                project <span className="underline text-text">Queen</span>.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-accent" />
                <span className="text-xs font-mono text-text-secondary">
                  ETR 2025
                </span>
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
        name="PROJECT_SHOWCASE"
      >
        <div className="flex-1 min-h-0 pb-8 pl-8 pr-8">
          <div className="flex-1 min-h-full grid grid-cols-1 lg:grid-cols-3 border border-subtle">
            <WebGLSlot
              index={0}
              className="border-b lg:border-b-0 lg:border-r border-subtle"
            />
            <WebGLSlot
              index={1}
              className="border-b lg:border-b-0 lg:border-r border-subtle"
            />
            <WebGLSlot index={2} />
          </div>
        </div>
      </Section>
      {/* section3 */}
      <Section
        id="terminal"
        backgroundColor="#FFF"
        className="snap-start h-screen flex flex-col"
      >
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 grid-rows-2">
          <ExperienceSection profiles={experienceProfiles} />
          <SubSection
            title="LATEST NOTES"
            count={
              <Link
                href="/notes"
                className="hover:text-text-invert transition-colors duration-150"
              >
                VIEW ALL NOTES
              </Link>
            }
            backgroundColor="bg-accent"
            textColor="text-invert"
            borderColor="border"
          >
            <LatestNotesPanel notes={notes.slice(0, 3)} />
          </SubSection>
          <SubSection
            title="LIBRARY"
            backgroundColor="bg-invert"
            textColor="text-invert"
            borderColor="border-invert"
          >
            <div className="h-full flex items-center justify-center">
              <span className="text-xs font-mono uppercase tracking-wider text-text-secondary">
                contact placeholder
              </span>
            </div>
          </SubSection>
          <SubSection title="LINKS" backgroundColor="bg-primary">
            <div className="h-full flex items-center justify-center">
              <span className="text-xs font-mono uppercase tracking-wider text-text-secondary">
                links placeholder
              </span>
            </div>
          </SubSection>
        </div>
      </Section>
    </div>
  );
}
