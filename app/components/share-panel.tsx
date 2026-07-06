import Panel from './panel'

export default function SharePanel() {
  const links = [
    { label: 'Twitter', href: 'https://twitter.com' },
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' }
  ]

  return (
    <Panel title="SHARE">
      <ul className="p-0">
        {links.map((link) => (
          <li key={link.label} className="border-b last:border-b-0 border-border">
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between px-4 h-10 text-xs font-mono uppercase tracking-wider text-text-secondary hover:text-text transition-colors"
            >
              {link.label}
              <span className="text-border group-hover:text-accent transition-colors">→</span>
            </a>
          </li>
        ))}
      </ul>
    </Panel>
  )
}
