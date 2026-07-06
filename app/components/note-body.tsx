import { ReactNode } from 'react'

interface NoteBodyComponents {
  [key: string]: React.ComponentType<any>
}

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w一-龥\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

const components: NoteBodyComponents = {
  h1: ({ children }: { children: ReactNode }) => (
    <h1
      id={typeof children === 'string' ? slugify(children) : undefined}
      className="font-display text-4xl sm:text-5xl font-medium text-text mt-16 mb-8 leading-tight"
    >
      {children}
    </h1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2
      id={typeof children === 'string' ? slugify(children) : undefined}
      className="font-display text-2xl sm:text-3xl font-medium text-text mt-14 mb-6 leading-tight"
    >
      {children}
    </h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3
      id={typeof children === 'string' ? slugify(children) : undefined}
      className="font-display text-xl font-medium text-text mt-10 mb-4"
    >
      {children}
    </h3>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="text-base text-text leading-[1.85] mb-6">
      {children}
    </p>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-2 border-accent pl-6 my-8 text-text-secondary italic">
      {children}
    </blockquote>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="list-none pl-0 mb-6 space-y-2 text-text leading-[1.85]">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="list-none pl-0 mb-6 space-y-2 text-text leading-[1.85]">
      {children}
    </ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="flex gap-3 text-base">
      <span className="text-text-secondary select-none">—</span>
      <span>{children}</span>
    </li>
  ),
  code: ({ children }: { children: ReactNode }) => (
    <code className="bg-bg border border-border px-1.5 py-0.5 font-mono text-sm text-text">
      {children}
    </code>
  ),
  pre: ({ children }: { children: ReactNode }) => (
    <pre className="bg-bg border border-border p-4 my-6 overflow-x-auto font-mono text-sm leading-relaxed text-text-secondary">
      {children}
    </pre>
  ),
  hr: () => <hr className="border-0 border-t border-border my-12" />
}

export default components
