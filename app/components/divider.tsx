export default function Divider({ invert = false }: { invert?: boolean }) {
  return (
    <hr
      className={`border-0 border-t ${invert ? 'border-subtle' : 'border-border'}`}
    />
  )
}
