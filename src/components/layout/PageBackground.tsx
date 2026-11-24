export function PageBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden bg-blue"
    >
      <div className="absolute inset-x-0 top-1040 -bottom-400 origin-top skew-y-[-9.1deg] bg-red" />
    </div>
  )
}
