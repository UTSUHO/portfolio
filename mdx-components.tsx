import type { MDXComponents } from 'mdx/types'
import noteBodyComponents from './app/components/note-body'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...noteBodyComponents,
    ...components
  }
}
