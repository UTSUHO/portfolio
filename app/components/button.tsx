interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
}

export default function Button({ children, href, onClick }: ButtonProps) {
  const className =
    'inline-block px-6 py-3 border border-text bg-transparent text-text text-body font-medium uppercase tracking-wider transition-all duration-150 hover:bg-text hover:text-bg cursor-pointer'

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  )
}
