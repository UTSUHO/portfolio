import { ReactNode } from 'react'

interface NoteBodyComponents {
  [key: string]: React.ComponentType<any>
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

const components: NoteBodyComponents = {
  h1: ({ children }: { children: ReactNode }) => (
    <h1
      id={typeof children === 'string' ? slugify(children) : undefined}
      className="font-display text-5xl font-medium text-text mt-16 mb-8 leading-tight"
    >
      {children}
    </h1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2
      id={typeof children === 'string' ? slugify(children) : undefined}
      className="font-display text-3xl font-medium text-text mt-12 mb-6 leading-tight"
    >
      {children}
    </h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3
      id={typeof children === 'string' ? slugify(children) : undefined}
      className="font-display text-xl font-medium text-text mt-8 mb-4"
    >
      {children}
    </h3>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="text-base text-text leading-[1.8] mb-6" style={{ fontSize: '16px' }}>
      {children}
    </p>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-2 border-accent pl-6 my-8 text-text-secondary italic">
      {children}
    </blockquote>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="list-disc pl-6 mb-6 space-y-2 text-text leading-[1.8]">{children}</ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="list-decimal pl-6 mb-6 space-y-2 text-text leading-[1.8]">{children}</ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="text-base" style={{ fontSize: '16px' }}>{children}</li>
  ),
  code: ({ children }: { children: ReactNode }) => (
    <code className="bg-bg-invert text-text-invert px-1.5 py-0.5 font-mono text-sm">
      {children}
    </code>
  ),
  pre: ({ children }: { children: ReactNode }) => (
    <pre className="bg-bg-invert p-4 my-6 overflow-x-auto font-mono text-sm leading-relaxed">
      {children}
    </pre>
  ),
  hr: () => <hr className="border-0 border-t border-border my-12" />
}

export default components
