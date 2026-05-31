import Panel from '../components/panel'

export const metadata = {
  title: 'Resume - Rei Utsuho'
}

const logs = [
  { timestamp: '2025-NOW', event: 'Project Queen / Indie Game Developer', detail: 'Fantasy SRPG with mythology-inspired worldbuilding' },
  { timestamp: '2022-2025', event: 'Indie Game Project / Game Designer', detail: 'Game design, system architecture, narrative direction' },
  { timestamp: '2017-2021', event: "RIT / Bachelor's Web & Mobile", detail: 'Golisano College of Computing and Information Sciences' },
  { timestamp: '1997', event: 'Origin / Born Nanjing, China', detail: '南京出生的游戏设计师与开发者' }
]

const skills = [
  { name: 'Game Design', level: 75 },
  { name: 'Programming', level: 80 },
  { name: 'Translation', level: 60 },
  { name: 'UI/UX Design', level: 55 }
]

export default function Resume() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 border" style={{ borderColor: '#DCDCDC' }}>
        {/* Left: Resume Log */}
        <div className="lg:col-span-7 border-r" style={{ borderColor: '#DCDCDC', backgroundColor: '#FFFFFF' }}>
          <div
            className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b"
            style={{ borderColor: '#DCDCDC', backgroundColor: '#F5F5F3' }}
          >
            <span className="inline-block w-2 h-2" style={{ backgroundColor: '#FF4D3A' }} />
            <span style={{ color: '#0A0A0A' }}>RESUME_LOG</span>
          </div>
          <div className="grid grid-cols-12 text-xs font-mono border-b" style={{ borderColor: '#DCDCDC', backgroundColor: '#F5F5F3' }}>
            <div className="col-span-3 px-4 py-2 border-r" style={{ borderColor: '#DCDCDC', color: '#6B6B6B' }}>TIMESTAMP</div>
            <div className="col-span-9 px-4 py-2" style={{ color: '#6B6B6B' }}>EVENT</div>
          </div>
          {logs.map((log, i) => (
            <div key={i} className="grid grid-cols-12 text-xs border-b last:border-b-0" style={{ borderColor: '#DCDCDC' }}>
              <div className="col-span-3 px-4 py-3 border-r font-mono" style={{ borderColor: '#DCDCDC', color: '#6B6B6B' }}>
                {log.timestamp}
              </div>
              <div className="col-span-9 px-4 py-3">
                <div style={{ color: '#0A0A0A', fontSize: '13px', fontFamily: '"Inter", system-ui, sans-serif' }}>
                  {log.event}
                </div>
                <div className="mt-1" style={{ color: '#6B6B6B', fontSize: '12px' }}>
                  {log.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Skill Matrix */}
        <div className="lg:col-span-5" style={{ backgroundColor: '#FFFFFF' }}>
          <div
            className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b"
            style={{ borderColor: '#DCDCDC', backgroundColor: '#F5F5F3' }}
          >
            <span className="inline-block w-2 h-2" style={{ backgroundColor: '#FF4D3A' }} />
            <span style={{ color: '#0A0A0A' }}>SKILL_MATRIX</span>
          </div>
          <div className="p-4 space-y-4">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono" style={{ color: '#0A0A0A' }}>{skill.name}</span>
                  <span className="text-xs font-mono" style={{ color: '#6B6B6B' }}>{skill.level}%</span>
                </div>
                <div className="h-1 w-full" style={{ backgroundColor: '#DCDCDC' }}>
                  <div
                    className="h-full transition-all"
                    style={{ width: `${skill.level}%`, backgroundColor: '#FF4D3A' }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-t border-b"
            style={{ borderColor: '#DCDCDC', backgroundColor: '#F5F5F3' }}
          >
            <span className="inline-block w-2 h-2" style={{ backgroundColor: '#FF4D3A' }} />
            <span style={{ color: '#0A0A0A' }}>INTERESTS</span>
          </div>
          <div className="p-4 grid grid-cols-2 gap-2">
            {['Video Game', 'Board Game', 'Music', 'Mythology', 'Bangumi'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs" style={{ color: '#6B6B6B' }}>
                <span className="inline-block w-1.5 h-1.5" style={{ backgroundColor: '#FF4D3A' }} />
                {item}
              </div>
            ))}
          </div>

          <div
            className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-t border-b"
            style={{ borderColor: '#DCDCDC', backgroundColor: '#F5F5F3' }}
          >
            <span className="inline-block w-2 h-2" style={{ backgroundColor: '#FF4D3A' }} />
            <span style={{ color: '#0A0A0A' }}>LINKS</span>
          </div>
          <div className="p-4 space-y-2">
            <a href="https://github.com/UTSUHO" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs group">
              <span className="font-mono" style={{ color: '#6B6B6B' }}>[GH]</span>
              <span className="group-hover:text-[#FF4D3A] transition-colors" style={{ color: '#0A0A0A' }}>github.com/UTSUHO</span>
            </a>
            <a href="https://bangumi.tv/user/nightofknight" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs group">
              <span className="font-mono" style={{ color: '#6B6B6B' }}>[BG]</span>
              <span className="group-hover:text-[#FF4D3A] transition-colors" style={{ color: '#0A0A0A' }}>bangumi.tv/user/nightofknight</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
