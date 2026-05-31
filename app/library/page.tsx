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
    <div className="border-r last:border-r-0 border-border bg-bg-primary">
      <div className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b border-border bg-bg">
        <span className="inline-block w-2 h-2 bg-accent" />
        <span className="text-text">{title}</span>
        <span className="ml-auto text-text-secondary">{count}</span>
      </div>
      <div>
        {games.map((game, i) => (
          <div
            key={game}
            className="flex items-center gap-3 px-4 h-8 text-xs border-b last:border-b-0 border-border"
          >
            <span className="font-mono w-6 text-text-secondary">
              [{String(i + 1).padStart(2, '0')}]
            </span>
            <span className="text-text">{game}</span>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
          <GameList games={gameplayGames} title="GAMEPLAY" count="13 ENTRIES" />
          <GameList games={narrativeGames} title="NARRATIVE" count="7 ENTRIES" />
          <GameList games={ftgGames} title="FTG" count="4 ENTRIES" />
        </div>

        {/* Essays Section */}
        <div className="mt-6 border border-border bg-bg-primary">
          <div className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b border-border bg-bg">
            <span className="inline-block w-2 h-2 bg-accent" />
            <span className="text-text">ESSAYS</span>
            <span className="ml-auto text-text-secondary">1 ENTRY</span>
          </div>
          <a
            href="/Humankind.pdf"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 px-4 h-12 transition-all duration-150 hover:pl-6"
          >
            <span className="font-mono w-8 text-xs text-text-secondary">[01]</span>
            <span
              className="flex-1 text-xs transition-colors group-hover:text-accent text-text"
              style={{ fontSize: '13px', fontFamily: '"Inter", system-ui, sans-serif' }}
            >
              Humankind 测评与分析报告
            </span>
            <span className="text-xs font-mono text-text-secondary">PDF</span>
            <span className="text-xs text-border">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}
