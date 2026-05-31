export default function Label({ children, invert = false }: { children: React.ReactNode; invert?: boolean }) {
  return (
    <span
      className="text-xs uppercase tracking-widest"
      className="text-text-secondary"
    >
      {children}
    </span>
  )
}
