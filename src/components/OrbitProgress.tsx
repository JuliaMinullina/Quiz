export function OrbitProgress({ current, total }: { current: number; total: number }) {
  const r = 18
  const c = 2 * Math.PI * r
  const p = current / total
  return (
    <div className="pointer-events-none flex items-center gap-[1.1rem]" aria-hidden>
      <svg viewBox="0 0 48 48" className="h-[5.6vmin] w-[5.6vmin]">
        <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.4" />
        <circle
          cx="24"
          cy="24"
          r={r}
          fill="none"
          stroke="rgba(126,231,255,0.8)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray={`${c * p} ${c}`}
          transform="rotate(-90 24 24)"
        />
      </svg>
    </div>
  )
}
