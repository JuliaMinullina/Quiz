import { useEffect, useRef } from 'react'
import { ellipsePoint, ORBIT_A, ORBIT_B } from '../lib/layout'

const SAT_T0 = 0.46

export function OrbitTracks({
  dimmed,
  showSatellite,
}: {
  dimmed?: boolean
  showSatellite?: boolean
}) {
  const sat = useRef<HTMLDivElement>(null)
  const opacity = dimmed ? 0.12 : 0.78
  const origin = ellipsePoint(ORBIT_A.cx, ORBIT_A.cy, ORBIT_A.rx, ORBIT_A.ry, ORBIT_A.rot, SAT_T0)

  useEffect(() => {
    if (!showSatellite) return
    let raf = 0
    const started = performance.now()
    const tick = (now: number) => {
      const t = (SAT_T0 + (now - started) / 28000) % 1
      const p = ellipsePoint(ORBIT_A.cx, ORBIT_A.cy, ORBIT_A.rx, ORBIT_A.ry, ORBIT_A.rot, t)
      const el = sat.current
      if (el) {
        el.style.left = `${p.x}%`
        el.style.top = `${p.y}%`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [showSatellite])

  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <g
          fill="none"
          stroke="rgba(232,246,255,0.62)"
          strokeWidth="0.12"
          style={{ opacity }}
          transform={`rotate(${ORBIT_A.rot} ${ORBIT_A.cx} ${ORBIT_A.cy})`}
        >
          <ellipse cx={ORBIT_A.cx} cy={ORBIT_A.cy} rx={ORBIT_A.rx} ry={ORBIT_A.ry} />
        </g>
        <g
          fill="none"
          stroke="rgba(126,231,255,0.34)"
          strokeWidth="0.1"
          style={{ opacity }}
          transform={`rotate(${ORBIT_B.rot} ${ORBIT_B.cx} ${ORBIT_B.cy})`}
        >
          <ellipse cx={ORBIT_B.cx} cy={ORBIT_B.cy} rx={ORBIT_B.rx} ry={ORBIT_B.ry} />
        </g>
      </svg>
      {showSatellite && (
        <div
          ref={sat}
          className="absolute rounded-full bg-white"
          style={{
            left: `${origin.x}%`,
            top: `${origin.y}%`,
            width: '1.35vmin',
            height: '1.35vmin',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
          }}
          aria-hidden
        />
      )}
    </div>
  )
}
