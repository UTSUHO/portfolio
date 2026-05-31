import Panel from '../components/panel'

export const metadata = {
  title: 'Library - Rei Utsuho'
}

const gameplayGames = [
  'Triangle Strategy', 'Humankind', 'Death Stranding', 'Katana Zero',
  'Sekiro', 'God of War', 'Zelda BOTW', 'Civ 6', 'Stellaris',
  'Minecraft', 'Civ 5 G&K', 'Warcraft III', 'Civ 2'
]

const narrativeGames = [
  '13 Sentinels', 'Triangle Strategy', 'Muramasa',
  'CHAOS;CHILD', 'CHAOS;HEAD', 'Ever17', '999'
]

const ftgGames = ['MBTL', 'UNI', 'SFV', 'Touhou non-sora']

function GameList({ games, title, count }: { games: string[]; title: string; count: string }) {
  return (
    <div className="border-r last:border-r-0" style={{ borderColor: '#DCDCDC', backgroundColor: '#FFFFFF' }}>
      <div
        className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b"
        style={{ borderColor: '#DCDCDC', backgroundColor: '#F5F5F3' }}
      >
        <span className="inline-block w-2 h-2" style={{ backgroundColor: '#FF4D3A' }} />
        <span style={{ color: '#0A0A0A' }}>{title}</span>
        <span className="ml-auto" style={{ color: '#6B6B6B' }}>{count}</span>
      </div>
      <div>
        {games.map((game, i) => (
          <div
            key={game}
            className="flex items-center gap-3 px-4 h-8 text-xs border-b last:border-b-0"
            style={{ borderColor: '#DCDCDC' }}
          >
            <span className="font-mono w-6" style={{ color: '#6B6B6B' }}>
              [{String(i + 1).padStart(2, '0')}]
            </span>
            <span style={{ color: '#0A0A0A' }}>{game}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Library() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Game Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border" style={{ borderColor: '#DCDCDC' }}>
          <GameList games={gameplayGames} title="GAMEPLAY" count="13 ENTRIES" />
          <GameList games={narrativeGames} title="NARRATIVE" count="7 ENTRIES" />
          <GameList games={ftgGames} title="FTG" count="4 ENTRIES" />
        </div>

        {/* Essays Section */}
        <div className="mt-6 border" style={{ borderColor: '#DCDCDC', backgroundColor: '#FFFFFF' }}>
          <div
            className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b"
            style={{ borderColor: '#DCDCDC', backgroundColor: '#F5F5F3' }}
          >
            <span className="inline-block w-2 h-2" style={{ backgroundColor: '#FF4D3A' }} />
            <span style={{ color: '#0A0A0A' }}>ESSAYS</span>
            <span className="ml-auto" style={{ color: '#6B6B6B' }}>1 ENTRY</span>
          </div>
          <a
            href="/Humankind.pdf"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 px-4 h-12 transition-all duration-150 hover:pl-6"
          >
            <span className="font-mono w-8 text-xs" style={{ color: '#6B6B6B' }}>[01]</span>
            <span
              className="flex-1 text-xs transition-colors group-hover:text-[#FF4D3A]"
              style={{ color: '#0A0A0A', fontSize: '13px', fontFamily: '"Inter", system-ui, sans-serif' }}
            >
              Humankind 测评与分析报告
            </span>
            <span className="text-xs font-mono" style={{ color: '#6B6B6B' }}>PDF</span>
            <span className="text-xs" style={{ color: '#DCDCDC' }}>→</span>
          </a>
        </div>
      </div>
    </div>
  )
}
