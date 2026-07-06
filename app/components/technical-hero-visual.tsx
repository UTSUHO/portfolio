export default function TechnicalHeroVisual() {
  const gallery = [
    'AXO_VIEW_01',
    'NETWORK_TOPOLOGY',
    'NODE_GRAPH',
    'METRICS',
    'RING_DIAGRAM'
  ]

  return (
    <div className="border border-border bg-bg-primary p-4">
      <div className="relative aspect-[4/3] border border-border bg-bg mb-4 overflow-hidden">
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <g stroke="var(--color-border)" strokeWidth="1">
            {Array.from({ length: 11 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={i * 40}
                y1={0}
                x2={i * 40}
                y2={300}
              />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1={0}
                y1={i * 40}
                x2={400}
                y2={i * 40}
              />
            ))}
          </g>

          <g fill="var(--color-bg-primary)" stroke="var(--color-text-secondary)" strokeWidth="1">
            <rect x="60" y="60" width="80" height="80" />
            <rect x="260" y="60" width="80" height="80" />
            <rect x="60" y="180" width="80" height="80" />
            <rect x="260" y="180" width="80" height="80" />
          </g>

          <g fill="var(--color-accent)">
            <circle cx="100" cy="100" r="4" />
            <circle cx="300" cy="100" r="4" />
            <circle cx="100" cy="220" r="4" />
            <circle cx="300" cy="220" r="4" />
          </g>

          <g stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="4 2">
            <line x1="100" y1="100" x2="300" y2="100" />
            <line x1="100" y1="220" x2="300" y2="220" />
            <line x1="100" y1="100" x2="100" y2="220" />
            <line x1="300" y1="100" x2="300" y2="220" />
          </g>

          <g fill="var(--color-text-secondary)">
            <text x="20" y="280" fontSize="10" fontFamily="monospace">
              AXO_VIEW_01
            </text>
            <text x="320" y="280" fontSize="10" fontFamily="monospace">
              SCALE 1:200
            </text>
          </g>
        </svg>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {gallery.map((label, index) => (
          <button
            key={label}
            className={`aspect-square border transition-colors duration-150 hover:border-text ${
              index === 0 ? 'border-accent' : 'border-border opacity-60 hover:opacity-100'
            }`}
          >
            <div className="w-full h-full bg-bg flex items-center justify-center">
              <span className="text-[8px] font-mono uppercase tracking-wider text-text-secondary">
                {label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
