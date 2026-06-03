import Link from 'next/link'
import HeroVisual from './components/hero-visual'

export default function Home() {
  return (
    <div>
      <div>
        {/* Top Dashboard Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-border">
          {/* Left: Identity Panel */}
          <div
            className="lg:col-span-4 border-r border-border bg-bg-primary"
            data-section-id="identity"
            data-section-color="#FFFFFF"
          >
            <div className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b border-border bg-bg">
              <span className="inline-block w-2 h-2 bg-accent" />
              <span className="text-text">IDENTITY</span>
            </div>
            <div className="p-6">
              <h1
                className="font-bold leading-none mb-2 text-text"
                style={{ fontSize: '48px', fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
              >
                Rei<br />Utsuho
              </h1>
              <p className="text-xs font-mono uppercase tracking-wider mb-4 text-text-secondary">
                Digital IronSmith
              </p>
              <p className="text-xs leading-relaxed text-text-secondary">
                Indie game designer & full-stack developer.
                Currently running project{' '}
                <Link href="/projects" className="underline hover:text-accent transition-colors text-text">
                  Queen
                </Link>.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-accent" />
                <span className="text-xs font-mono text-text-secondary">ETR 2025</span>
              </div>
            </div>
          </div>

          {/* Right: Visual Panel */}
          <div
            className="lg:col-span-8 bg-bg-primary"
            data-section-id="visual"
            data-section-color="#FFFFFF"
          >
            <div className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b border-border bg-bg">
              <span className="inline-block w-2 h-2 bg-accent" />
              <span className="text-text">VISUAL_SYS</span>
              <span className="ml-auto text-text-secondary">portal2.glb</span>
            </div>
            <div className="h-[300px] lg:h-full min-h-[300px]">
              <HeroVisual />
            </div>
          </div>
        </div>

        {/* System Modules Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-t-0 border-border">
          <Link
            href="/projects"
            className="group border-r border-b md:border-b-0 border-border bg-bg-primary"
            data-section-id="works"
            data-section-color="#F8F8F6"
          >
            <div className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b border-border bg-bg transition-colors group-hover:bg-bg-invert">
              <span className="inline-block w-2 h-2 bg-accent" />
              <span className="text-text group-hover:text-text-invert transition-colors">WORKS</span>
              <span className="ml-auto text-text-secondary">7 ENTRIES</span>
            </div>
            <div className="p-4">
              <p className="text-xs text-text-secondary">
                Game design, dev tools, translations, and design experiments.
              </p>
            </div>
          </Link>

          <Link
            href="/resume"
            className="group border-r border-b md:border-b-0 border-border bg-bg-primary"
            data-section-id="resume"
            data-section-color="#F0F0EE"
          >
            <div className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b border-border bg-bg transition-colors group-hover:bg-bg-invert">
              <span className="inline-block w-2 h-2 bg-accent" />
              <span className="text-text group-hover:text-text-invert transition-colors">RESUME</span>
              <span className="ml-auto text-text-secondary">4 LOGS</span>
            </div>
            <div className="p-4">
              <p className="text-xs text-text-secondary">
                Experience, education, and skill matrix.
              </p>
            </div>
          </Link>

          <Link
            href="/library"
            className="group border-border bg-bg-primary"
            data-section-id="library"
            data-section-color="#F8F8F6"
          >
            <div className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b border-border bg-bg transition-colors group-hover:bg-bg-invert">
              <span className="inline-block w-2 h-2 bg-accent" />
              <span className="text-text group-hover:text-text-invert transition-colors">LIBRARY</span>
              <span className="ml-auto text-text-secondary">24 GAMES</span>
            </div>
            <div className="p-4">
              <p className="text-xs text-text-secondary">
                Game checklists and essays by category.
              </p>
            </div>
          </Link>
        </div>

        {/* Latest Log Row */}
        <div
          className="border border-t-0 border-border bg-bg-primary"
          data-section-id="latest-log"
          data-section-color="#FFFFFF"
        >
          <div className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b border-border bg-bg">
            <span className="inline-block w-2 h-2 bg-accent" />
            <span className="text-text">LATEST_LOG</span>
            <span className="ml-auto text-text-secondary">2026.06.01</span>
          </div>
          <div className="px-4 py-3 flex items-center gap-4">
            <span className="text-xs font-mono text-text-secondary">[SYSTEM]</span>
            <span className="text-xs text-text">
              Portfolio interface v2.0 deployed. All systems operational.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
