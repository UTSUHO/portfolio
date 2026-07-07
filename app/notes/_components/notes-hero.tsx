import Link from "next/link";

export default function NotesHero() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border bg-bg-primary">
      <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-border">
        <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-6">
          // NOTES INDEX
        </div>
        <h1 className="font-display text-5xl lg:text-6xl font-medium text-text leading-none mb-8">
          THOUGHTS
          <br />
          AND RECORDS
          <span className="cursor-blink text-accent">_</span>
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed mb-8 max-w-md">
          A space for reflections, technical notes, and ongoing thoughts. Ideas
          in progress, observations, and the small experiments that shape the
          work.
        </p>
        <Link
          href="#notes-body"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text hover:text-accent transition-colors"
        >
          <span>→</span>
          ABOUT THIS SECTION
        </Link>
      </div>

      <div className="relative aspect-[16/10] lg:aspect-auto bg-bg overflow-hidden">
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="400" height="300" fill="var(--color-bg)" />

          <g stroke="var(--color-border)" strokeWidth="1">
            {Array.from({ length: 9 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={i * 50 + 25}
                y1={0}
                x2={i * 50 + 25}
                y2={300}
              />
            ))}
          </g>

          <g
            fill="var(--color-bg-primary)"
            stroke="var(--color-text-secondary)"
            strokeWidth="1"
          >
            <rect x="80" y="80" width="120" height="160" />
            <rect x="220" y="120" width="100" height="100" />
          </g>

          <g fill="var(--color-accent)">
            <rect x="100" y="250" width="16" height="16" />
            <rect x="260" y="100" width="10" height="10" />
          </g>

          <g fill="var(--color-text-secondary)">
            <text x="280" y="260" fontSize="10" fontFamily="monospace">
              ABSTRACT_VIEW_01
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
