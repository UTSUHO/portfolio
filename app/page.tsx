import Link from 'next/link'
import Panel from './components/panel'
import HeroVisual from './components/hero-visual'

export default function Home() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Dashboard Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border" style={{ borderColor: '#DCDCDC' }}>
          {/* Left: Identity Panel */}
          <div className="lg:col-span-4 border-r" style={{ borderColor: '#DCDCDC', backgroundColor: '#FFFFFF' }}>
            <div
              className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b"
              style={{ borderColor: '#DCDCDC', backgroundColor: '#F5F5F3' }}
            >
              <span className="inline-block w-2 h-2" style={{ backgroundColor: '#FF4D3A' }} />
              <span style={{ color: '#0A0A0A' }}>IDENTITY</span>
            </div>
            <div className="p-6">
              <h1
                className="font-bold leading-none mb-2"
                style={{ fontSize: '48px', fontFamily: '"Space Grotesk", system-ui, sans-serif', color: '#0A0A0A' }}
              >
                Rei<br />Utsuho
              </h1>
              <p className="text-xs font-mono uppercase tracking-wider mb-4" style={{ color: '#6B6B6B' }}>
                Digital IronSmith
              </p>
              <p className="text-xs leading-relaxed" style={{ color: '#6B6B6B' }}>
                Indie game designer & full-stack developer.
                Currently running project{' '}
                <Link href="/projects" className="underline hover:text-[#FF4D3A] transition-colors" style={{ color: '#0A0A0A' }}>
                  Queen
                </Link>.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2" style={{ backgroundColor: '#FF4D3A' }} />
                <span className="text-xs font-mono" style={{ color: '#6B6B6B' }}>ETR 2025</span>
              </div>
            </div>
          </div>

          {/* Right: Visual Panel */}
          <div className="lg:col-span-8" style={{ backgroundColor: '#FFFFFF' }}>
            <div
              className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b"
              style={{ borderColor: '#DCDCDC', backgroundColor: '#F5F5F3' }}
            >
              <span className="inline-block w-2 h-2" style={{ backgroundColor: '#FF4D3A' }} />
              <span style={{ color: '#0A0A0A' }}>VISUAL_SYS</span>
              <span className="ml-auto" style={{ color: '#6B6B6B' }}>portal2.glb</span>
            </div>
            <div className="h-[300px] lg:h-full min-h-[300px]">
              <HeroVisual />
            </div>
          </div>
        </div>

        {/* System Modules Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-t-0" style={{ borderColor: '#DCDCDC' }}>
          <Link href="/projects" className="group border-r border-b md:border-b-0" style={{ borderColor: '#DCDCDC', backgroundColor: '#FFFFFF' }}>
            <div
              className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b transition-colors group-hover:bg-[#0A0A0A]"
              style={{ borderColor: '#DCDCDC', backgroundColor: '#F5F5F3' }}
            >
              <span className="inline-block w-2 h-2" style={{ backgroundColor: '#FF4D3A' }} />
              <span style={{ color: '#0A0A0A' }} className="group-hover:text-white transition-colors">WORKS</span>
              <span className="ml-auto" style={{ color: '#6B6B6B' }}>7 ENTRIES</span>
            </div>
            <div className="p-4">
              <p className="text-xs" style={{ color: '#6B6B6B' }}>
                Game design, dev tools, translations, and design experiments.
              </p>
            </div>
          </Link>

          <Link href="/resume" className="group border-r border-b md:border-b-0" style={{ borderColor: '#DCDCDC', backgroundColor: '#FFFFFF' }}>
            <div
              className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b transition-colors group-hover:bg-[#0A0A0A]"
              style={{ borderColor: '#DCDCDC', backgroundColor: '#F5F5F3' }}
            >
              <span className="inline-block w-2 h-2" style={{ backgroundColor: '#FF4D3A' }} />
              <span style={{ color: '#0A0A0A' }} className="group-hover:text-white transition-colors">RESUME</span>
              <span className="ml-auto" style={{ color: '#6B6B6B' }}>4 LOGS</span>
            </div>
            <div className="p-4">
              <p className="text-xs" style={{ color: '#6B6B6B' }}>
                Experience, education, and skill matrix.
              </p>
            </div>
          </Link>

          <Link href="/library" className="group" style={{ borderColor: '#DCDCDC', backgroundColor: '#FFFFFF' }}>
            <div
              className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b transition-colors group-hover:bg-[#0A0A0A]"
              style={{ borderColor: '#DCDCDC', backgroundColor: '#F5F5F3' }}
            >
              <span className="inline-block w-2 h-2" style={{ backgroundColor: '#FF4D3A' }} />
              <span style={{ color: '#0A0A0A' }} className="group-hover:text-white transition-colors">LIBRARY</span>
              <span className="ml-auto" style={{ color: '#6B6B6B' }}>24 GAMES</span>
            </div>
            <div className="p-4">
              <p className="text-xs" style={{ color: '#6B6B6B' }}>
                Game checklists and essays by category.
              </p>
            </div>
          </Link>
        </div>

        {/* Latest Log Row */}
        <div className="border border-t-0" style={{ borderColor: '#DCDCDC', backgroundColor: '#FFFFFF' }}>
          <div
            className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b"
            style={{ borderColor: '#DCDCDC', backgroundColor: '#F5F5F3' }}
          >
            <span className="inline-block w-2 h-2" style={{ backgroundColor: '#FF4D3A' }} />
            <span style={{ color: '#0A0A0A' }}>LATEST_LOG</span>
            <span className="ml-auto" style={{ color: '#6B6B6B' }}>2026.06.01</span>
          </div>
          <div className="px-4 py-3 flex items-center gap-4">
            <span className="text-xs font-mono" style={{ color: '#6B6B6B' }}>[SYSTEM]</span>
            <span className="text-xs" style={{ color: '#0A0A0A' }}>
              Portfolio interface v2.0 deployed. All systems operational.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
