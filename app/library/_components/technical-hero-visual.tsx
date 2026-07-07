import HeroCarousel, { Slide } from '../../components/hero-carousel'

export default function TechnicalHeroVisual() {
  const axonometricSlide = {
    label: 'AXO_VIEW_01',
    content: (
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
    )
  }

  const slides: Slide[] = [
    axonometricSlide,
    {
      label: 'NETWORK_TOPOLOGY',
      content: (
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <g stroke="var(--color-border)" strokeWidth="1">
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 40} y1={0} x2={i * 40} y2={300} />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={`h-${i}`} x1={0} y1={i * 40} x2={400} y2={i * 40} />
            ))}
          </g>

          <g stroke="var(--color-accent)" strokeWidth="1.5" fill="var(--color-bg-primary)">
            <circle cx="200" cy="150" r="24" />
            <circle cx="100" cy="80" r="16" />
            <circle cx="300" cy="80" r="16" />
            <circle cx="100" cy="220" r="16" />
            <circle cx="300" cy="220" r="16" />
            <line x1="200" y1="150" x2="100" y2="80" />
            <line x1="200" y1="150" x2="300" y2="80" />
            <line x1="200" y1="150" x2="100" y2="220" />
            <line x1="200" y1="150" x2="300" y2="220" />
            <line x1="100" y1="80" x2="300" y2="220" />
            <line x1="300" y1="80" x2="100" y2="220" />
          </g>

          <g fill="var(--color-text-secondary)">
            <text x="20" y="280" fontSize="10" fontFamily="monospace">NETWORK_TOPOLOGY</text>
            <text x="300" y="280" fontSize="10" fontFamily="monospace">5 NODES / 6 EDGES</text>
          </g>
        </svg>
      )
    },
    // {
    //   label: 'NODE_GRAPH',
    //   content: (
    //     <svg
    //       viewBox="0 0 400 300"
    //       className="w-full h-full"
    //       preserveAspectRatio="xMidYMid meet"
    //     >
    //       <g stroke="var(--color-border)" strokeWidth="1">
    //         {Array.from({ length: 11 }).map((_, i) => (
    //           <line key={`v-${i}`} x1={i * 40} y1={0} x2={i * 40} y2={300} />
    //         ))}
    //         {Array.from({ length: 8 }).map((_, i) => (
    //           <line key={`h-${i}`} x1={0} y1={i * 40} x2={400} y2={i * 40} />
    //         ))}
    //       </g>

    //       <g fill="var(--color-accent)">
    //         {[
    //           [80, 70],
    //           [160, 120],
    //           [240, 60],
    //           [320, 110],
    //           [120, 200],
    //           [200, 240],
    //           [280, 210]
    //         ].map(([cx, cy], i) => (
    //           <circle key={i} cx={cx} cy={cy} r="5" />
    //         ))}
    //       </g>

    //       <g stroke="var(--color-text-secondary)" strokeWidth="1">
    //         <polyline
    //           points="80,70 160,120 240,60 320,110 280,210 200,240 120,200 80,70"
    //           fill="none"
    //         />
    //       </g>

    //       <g fill="var(--color-text-secondary)">
    //         <text x="20" y="280" fontSize="10" fontFamily="monospace">NODE_GRAPH</text>
    //         <text x="330" y="280" fontSize="10" fontFamily="monospace">7 VERTICES</text>
    //       </g>
    //     </svg>
    //   )
    // },
    // {
    //   label: 'METRICS',
    //   content: (
    //     <svg
    //       viewBox="0 0 400 300"
    //       className="w-full h-full"
    //       preserveAspectRatio="xMidYMid meet"
    //     >
    //       <g stroke="var(--color-border)" strokeWidth="1">
    //         {Array.from({ length: 11 }).map((_, i) => (
    //           <line key={`v-${i}`} x1={i * 40} y1={0} x2={i * 40} y2={300} />
    //         ))}
    //         {Array.from({ length: 8 }).map((_, i) => (
    //           <line key={`h-${i}`} x1={0} y1={i * 40} x2={400} y2={i * 40} />
    //         ))}
    //       </g>

    //       <g stroke="var(--color-accent)" strokeWidth="1.5" fill="none">
    //         <polyline points="40,240 80,200 120,220 160,160 200,180 240,100 280,120 320,60 360,80" />
    //       </g>

    //       <g fill="var(--color-accent)">
    //         {[
    //           [40, 240],
    //           [80, 200],
    //           [120, 220],
    //           [160, 160],
    //           [200, 180],
    //           [240, 100],
    //           [280, 120],
    //           [320, 60],
    //           [360, 80]
    //         ].map(([cx, cy], i) => (
    //           <circle key={i} cx={cx} cy={cy} r="3" />
    //         ))}
    //       </g>

    //       <g stroke="var(--color-border)" strokeWidth="1">
    //         <line x1="40" y1="240" x2="360" y2="240" />
    //         <line x1="40" y1="240" x2="40" y2="40" />
    //       </g>

    //       <g fill="var(--color-text-secondary)">
    //         <text x="20" y="280" fontSize="10" fontFamily="monospace">METRICS</text>
    //         <text x="310" y="280" fontSize="10" fontFamily="monospace">THROUGHPUT / MS</text>
    //       </g>
    //     </svg>
    //   )
    // },
    // {
    //   label: 'RING_DIAGRAM',
    //   content: (
    //     <svg
    //       viewBox="0 0 400 300"
    //       className="w-full h-full"
    //       preserveAspectRatio="xMidYMid meet"
    //     >
    //       <g stroke="var(--color-border)" strokeWidth="1">
    //         {Array.from({ length: 11 }).map((_, i) => (
    //           <line key={`v-${i}`} x1={i * 40} y1={0} x2={i * 40} y2={300} />
    //         ))}
    //         {Array.from({ length: 8 }).map((_, i) => (
    //           <line key={`h-${i}`} x1={0} y1={i * 40} x2={400} y2={i * 40} />
    //         ))}
    //       </g>

    //       <g fill="none" stroke="var(--color-text-secondary)" strokeWidth="1">
    //         <circle cx="200" cy="150" r="80" />
    //         <circle cx="200" cy="150" r="55" />
    //         <circle cx="200" cy="150" r="30" />
    //       </g>

    //       <g stroke="var(--color-accent)" strokeWidth="2" fill="none">
    //         {Array.from({ length: 8 }).map((_, i) => {
    //           const angle = (i * Math.PI) / 4
    //           const x1 = 200 + Math.cos(angle) * 80
    //           const y1 = 150 + Math.sin(angle) * 80
    //           const x2 = 200 + Math.cos(angle) * 95
    //           const y2 = 150 + Math.sin(angle) * 95
    //           return (
    //             <line
    //               key={i}
    //               x1={x1}
    //               y1={y1}
    //               x2={x2}
    //               y2={y2}
    //             />
    //           )
    //         })}
    //       </g>

    //       <g fill="var(--color-accent)">
    //         <circle cx="200" cy="150" r="6" />
    //       </g>

    //       <g fill="var(--color-text-secondary)">
    //         <text x="20" y="280" fontSize="10" fontFamily="monospace">RING_DIAGRAM</text>
    //         <text x="300" y="280" fontSize="10" fontFamily="monospace">3 TIERS / 8 SHARDS</text>
    //       </g>
    //     </svg>
    //   )
    // }
  ]

  return <HeroCarousel slides={slides} />
}
