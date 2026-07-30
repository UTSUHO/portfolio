import { NormalizedLibrarySection } from './normalize-section'

interface OutcomeSectionProps {
  section: NormalizedLibrarySection
}

function IntegrationFlow({
  integration
}: {
  integration: NonNullable<NormalizedLibrarySection['outcome']>['integration']
}) {
  return (
    <div className="space-y-2 text-center">
      <div className="border border-border px-2 py-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-text">
          {integration.sources.join(' / ')}
        </span>
      </div>
      <div className="text-text-secondary">↓</div>
      <div className="border border-border px-2 py-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-text">
          {integration.entry}
        </span>
      </div>
      <div className="text-text-secondary">↓</div>
      <div className="border border-border px-2 py-2">
        <div className="text-[10px] font-mono uppercase tracking-wider text-text">
          Pix Harness
        </div>
        <div className="text-[10px] font-mono text-text-secondary">
          {integration.harness.join(' · ')}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="text-text-secondary">↙</div>
        <div className="text-text-secondary">↘</div>
        {integration.targets.map((target) => (
          <div
            key={target}
            className="border border-border px-2 py-2 text-[10px] font-mono uppercase tracking-wider text-text"
          >
            {target}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="text-text-secondary">↘</div>
        <div className="text-text-secondary">↙</div>
      </div>
      <div className="border border-dashed border-border px-2 py-2">
        <span className="text-[10px] font-mono text-text-secondary">
          {integration.outputs.join(' · ')}
        </span>
      </div>
      <div className="text-text-secondary">↓</div>
      <div className="border border-border px-2 py-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-text">
          {integration.destination}
        </span>
      </div>
    </div>
  )
}

export function OutcomeSection({ section }: OutcomeSectionProps) {
  const outcome = section.outcome

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[minmax(170px,0.8fr)_minmax(210px,1fr)_minmax(230px,1.15fr)_minmax(320px,1.6fr)] gap-6">
      {/* Slogan */}
      <div className="space-y-4">
        <div className="text-sm md:text-base font-mono uppercase leading-snug text-text">
          {outcome?.slogan.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
        {outcome?.summary && (
          <p className="text-sm text-text-secondary leading-relaxed">
            {outcome.summary}
          </p>
        )}
      </div>

      {/* Design Intent */}
      <div className="space-y-4">
        <div className="text-[10px] font-mono uppercase tracking-wider text-text-secondary">
          Design Intent
        </div>
        <div className="space-y-3">
          {outcome?.intent.map((item, idx) => (
            <div key={idx}>
              <div className="text-xs font-mono text-accent mb-1">
                {item.code}
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Capabilities */}
      <div className="space-y-4">
        <div className="text-[10px] font-mono uppercase tracking-wider text-text-secondary">
          Capabilities
        </div>
        <div className="space-y-3">
          {outcome?.capabilities.map((item, idx) => (
            <div key={idx}>
              <div className="text-xs font-mono text-accent mb-1">
                {item.number} / {item.code}
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Workflow */}
      <div className="space-y-4">
        <div className="text-[10px] font-mono uppercase tracking-wider text-text-secondary">
          Development System Integration
        </div>
        {outcome?.integration && <IntegrationFlow integration={outcome.integration} />}
      </div>
    </div>
  )
}
