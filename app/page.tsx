import HeroVisual from "./components/hero-visual";
import TabNav from "./components/tab-nav";
import Section from "./components/section";

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
            <div className="flex-1 min-h-0">
              <HeroVisual />
            </div>
            {/* TabNav vertically below HeroVisual */}
            <TabNav />
          </div>
        </div>
      </Section>

      <Section
        id="showcase"
        backgroundColor="#13181d"
        className="snap-start h-screen flex flex-col"
      >
        <div className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b border-subtle bg-[#0A0A0A]">
          <span className="inline-block w-2 h-2 bg-accent" />
          <span className="text-text-invert">WEBGL_SHOWCASE</span>
          <span className="ml-auto text-text-secondary"></span>
        </div>
        <div className="flex-1 min-h-0 p-8">
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 border-b bg-blue-200">
            <div
              data-webgl-slot="0"
              className="relative min-h-0 border-b lg:border-b-0 lg:border-r border-subtle"
            />
            <div
              data-webgl-slot="1"
              className="relative min-h-0 border-b lg:border-b-0 lg:border-r border-subtle"
            />
            <div data-webgl-slot="2" className="relative min-h-0" />
          </div>
        </div>
      </Section>
    </div>
  );
}
