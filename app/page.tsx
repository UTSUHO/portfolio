import HeroVisual from "./components/hero-visual";
import TabNav from "./components/tab-nav";
import Section from "./components/section";
import SubSection from "./components/sub-section";
import WebGLSlot from "./components/webgl-slot";

export default function Home() {
  return (
    <div className="flex flex-col w-full box-border">
      <Section
        id="dashboard"
        backgroundColor="#FFFFFF"
        className="snap-start h-screen flex flex-col pt-[var(--height-status)] min-h-0"
      >
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 border border-border min-h-0">
          {/* Left: Identity Panel */}
          <div
            className="lg:col-span-4 border-r border-border bg-bg-primary flex flex-col"
            data-section-id="identity"
            data-section-color="#FFFFFF"
          >
            <div className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b border-border bg-bg">
              <span className="inline-block w-2 h-2 bg-accent" />
              <span className="text-text">IDENTITY</span>
            </div>
            <div className="p-6 flex-1">
              <h1
                className="font-bold leading-none mb-2 text-text"
                style={{
                  fontSize: "48px",
                  fontFamily: '"Space Grotesk", system-ui, sans-serif',
                }}
              >
                Rei
                <br />
                Utsuho
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
            className="lg:col-span-8 bg-bg-primary flex flex-col"
            data-section-id="visual"
            data-section-color="#FFFFFF"
          >
            <div className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b border-border bg-bg">
              <span className="inline-block w-2 h-2 bg-accent" />
              <span className="text-text">VISUAL_SYS</span>
              <span className="ml-auto text-text-secondary">portal2.glb</span>
            </div>
            <HeroVisual />
            {/* TabNav vertically below HeroVisual */}
            <TabNav />
          </div>
        </div>
      </Section>

      <Section
        id="showcase"
        backgroundColor="#13181d"
        className="snap-start h-screen flex flex-col"
        name="PROJECT_SHOWCASE"
      >
        <div className="flex-1 min-h-0 p-8">
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

      <Section
        id="terminal"
        backgroundColor="#FFF"
        className="snap-start h-screen flex flex-col"
      >
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2">
          <SubSection title="LOG_OUTPUT" count="3 ENTRIES">
            <div className="h-full border border-border bg-bg-primary">
              <div className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b border-border bg-bg">
                <span className="text-text-secondary">&gt;_</span>
                <span className="text-text">awaiting input...</span>
              </div>
              <div className="p-6 space-y-2">
                <div className="text-xs font-mono text-text-secondary">
                  <span className="text-accent">$</span> init portfolio_v2.0.1
                </div>
                <div className="text-xs font-mono text-text-secondary">
                  <span className="text-accent">$</span> load modules: identity,
                  visual, showcase
                </div>
                <div className="text-xs font-mono text-text-secondary">
                  <span className="text-accent">$</span> status: online
                </div>
              </div>
            </div>
          </SubSection>
          <SubSection title="METRICS" count="LIVE">
            <div className="h-full border border-border bg-bg-primary flex items-center justify-center">
              <span className="text-xs font-mono text-text-secondary uppercase tracking-wider">
                no data
              </span>
            </div>
          </SubSection>
        </div>
      </Section>
    </div>
  );
}
