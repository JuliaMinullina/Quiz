export function Hud() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30" aria-hidden>
      <Corner className="left-[2.1vmin] top-[2.1vmin]" />
      <Corner className="right-[2.1vmin] top-[2.1vmin] scale-x-[-1]" />
      <Corner className="bottom-[2.1vmin] left-[2.1vmin] scale-y-[-1]" />
      <Corner className="bottom-[2.1vmin] right-[2.1vmin] scale-[-1]" />
    </div>
  )
}

function Corner({ className }: { className: string }) {
  return (
    <svg className={`absolute h-[5.6vmin] w-[5.6vmin] ${className}`} viewBox="0 0 48 48" fill="none">
      <path
        d="M4 36 L4 4 L36 4"
        stroke="var(--color-line)"
        strokeWidth="0.9"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  )
}
