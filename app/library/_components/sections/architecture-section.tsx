import { ReactNode } from 'react'
import { NormalizedLibrarySection } from './normalize-section'

interface ArchitectureSectionProps {
  section: NormalizedLibrarySection
}

function FlowNode({ children }: { children: ReactNode }) {
  return (
    <div className="border border-border px-3 py-2 text-center">
      <span className="text-xs font-mono uppercase tracking-wider text-text">
        {children}
      </span>
    </div>
  )
}

function FlowArrow() {
  return (
    <div className="flex justify-center py-2 text-text-secondary">
      ↓
    </div>
  )
}

export function ArchitectureSection({ section }: ArchitectureSectionProps) {
  const modules = section.modules || []
  const flow = section.flow

  return (
    <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-[minmax(220px,0.85fr)_minmax(0,1.55fr)] lg:gap-6">
      {/* Module Registry */}
      <div className="divide-y divide-border">
        <div className="text-[10px] font-mono uppercase tracking-wider text-text-secondary mb-3">
          Module Registry
        </div>
        {modules.map((module, idx) => (
          <div key={module.id || `module-${idx}`} className="py-3">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-xs font-mono text-accent">
                {module.number || String(idx + 1).padStart(2, '0')}
              </span>
              <span className="text-sm font-medium text-text">
                {module.title}
              </span>
            </div>
            {module.body && (
              <p className="text-sm text-text-secondary leading-relaxed">
                {module.body}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Internal Execution Flow */}
      <div className="min-w-0">
        <div className="text-[10px] font-mono uppercase tracking-wider text-text-secondary mb-3">
          Internal Execution Flow
        </div>

        {flow && (
          <div className="border border-border p-4">
            {flow.nodes.map((node, idx) => {
              const isBranchPoint = idx === flow.nodes.indexOf('Policy Resolution')
              const showBranches = isBranchPoint && flow.branches.length > 0

              return (
                <div key={`node-${idx}`}>
                  <FlowNode>{node}</FlowNode>
                  {showBranches ? (
                    <div className="py-2">
                      <div className="grid grid-cols-2 gap-4">
                        {flow.branches.map((branch, bidx) => (
                          <div
                            key={`branch-${bidx}`}
                            className="border border-border px-3 py-2 text-center"
                          >
                            <span className="text-xs font-mono uppercase tracking-wider text-text">
                              {branch}
                            </span>
                          </div>
                        ))}
                      </div>
                      <FlowArrow />
                    </div>
                  ) : idx < flow.nodes.length - 1 ? (
                    <FlowArrow />
                  ) : null}
                </div>
              )
            })}
            <div className="mt-2 border border-dashed border-border px-3 py-2 inline-block w-full text-center">
              <span className="text-xs font-mono uppercase tracking-wider text-text-secondary">
                {flow.sharedRuntime}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
