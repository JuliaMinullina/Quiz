import { SIGN, SIGN_CX, SIGN_CY, SIGN_ORBITS } from '../lib/brand'

const PAD_X = 48
const PAD_Y = 38
const VIEW_W = SIGN.width + PAD_X * 2
const VIEW_H = SIGN.height + PAD_Y * 2

export function BrandMark({ current, total = 5 }: { current?: number; total?: number }) {
  const progress = current != null ? current / total : 0
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[2.1vmin] z-[45] -translate-x-1/2"
      data-testid="brand-mark"
      data-progress={current != null ? String(current) : undefined}
      aria-hidden
    >
      <svg
        viewBox={`${-PAD_X} ${-PAD_Y} ${VIEW_W} ${VIEW_H}`}
        className="h-[8.6vmin] w-auto overflow-visible drop-shadow-[0_0_12px_rgba(126,231,255,0.28)]"
      >
        {SIGN_ORBITS.map((orbit, i) => (
          <ellipse
            key={`track-${i}`}
            cx={SIGN_CX}
            cy={SIGN_CY}
            rx={orbit.rx}
            ry={orbit.ry}
            transform={`rotate(${orbit.rot} ${SIGN_CX} ${SIGN_CY})`}
            fill="none"
            stroke="rgba(200,219,232,0.22)"
            strokeWidth={i === 0 ? 1.35 : 1.05}
          />
        ))}
        {current != null && (
          <ellipse
            cx={SIGN_CX}
            cy={SIGN_CY}
            rx={SIGN_ORBITS[0]!.rx}
            ry={SIGN_ORBITS[0]!.ry}
            transform={`rotate(${SIGN_ORBITS[0]!.rot} ${SIGN_CX} ${SIGN_CY})`}
            fill="none"
            stroke="rgba(126,231,255,0.88)"
            strokeWidth={1.7}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={`${progress} 1`}
            strokeDashoffset={0.25}
          />
        )}
        <path d={SIGN.path} fill="rgba(232,246,255,0.92)" />
      </svg>
    </div>
  )
}
