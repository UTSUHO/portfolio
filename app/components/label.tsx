export default function Label({ children, invert = false }: { children: React.ReactNode; invert?: boolean }) {
  return (
    <span
      className="text-xs uppercase tracking-widest"
      style={{ color: invert ? '#6B6B6B' : '#6B6B6B' }}
    >
      {children}
    </span>
  )
}
