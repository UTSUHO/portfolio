export default function Divider({ invert = false }: { invert?: boolean }) {
  return (
    <hr
      className="border-0 border-t"
      style={{ borderColor: invert ? '#333333' : '#DCDCDC' }}
    />
  )
}
