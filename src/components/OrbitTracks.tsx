import { useEffect, useRef } from 'react'
import { ellipsePoint, ORBIT_A, ORBIT_B, STAGE, stageToView } from '../lib/layout'

const SAT_T0 = 0.74

export function OrbitTracks({
  dimmed,
  showSatellite,
}: {
  dimmed?: boolean
  showSatellite?: boolean
}) {
  const sat = useRef<HTMLDivElement>(null)
  const opacity = dimmed ? 0.12 : 0.72
  const origin = stageToView(
    ellipsePoint(ORBIT_A.cx, ORBIT_A.cy, ORBIT_A.rx, ORBIT_A.ry, ORBIT_A.rot, SAT_T0),
  )

  useEffect(() => {
    if (!showSatellite) return
    let raf = 0
    const started = performance.now()
    const tick = (now: number) => {
      const t = (SAT_T0 + (now - started) / 28000) % 1
      const p = stageToView(
        ellipsePoint(ORBIT_A.cx, ORBIT_A.cy, ORBIT_A.rx, ORBIT_A.ry, ORBIT_A.rot, t),
      )
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
        viewBox={`0 0 ${STAGE.w} ${STAGE.h}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        overflow="visible"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <g
          fill="none"
          stroke="rgba(232,246,255,0.7)"
          strokeWidth="0.26"
          style={{ opacity }}
        >
          <ellipse
            data-testid="orbit-path-a"
            cx={ORBIT_A.cx}
            cy={ORBIT_A.cy}
            rx={ORBIT_A.rx}
            ry={ORBIT_A.ry}
            transform={`rotate(${ORBIT_A.rot} ${ORBIT_A.cx} ${ORBIT_A.cy})`}
          />
          <ellipse
            data-testid="orbit-path-b"
            cx={ORBIT_B.cx}
            cy={ORBIT_B.cy}
            rx={ORBIT_B.rx}
            ry={ORBIT_B.ry}
            transform={`rotate(${ORBIT_B.rot} ${ORBIT_B.cx} ${ORBIT_B.cy})`}
          />
        </g>
      </svg>
      {showSatellite && (
        <div
          ref={sat}
          className="absolute rounded-full bg-white"
          style={{
            left: `${origin.x}%`,
            top: `${origin.y}%`,
            width: '0.7cqh',
            height: '0.7cqh',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.45)',
          }}
          aria-hidden
        />
      )}
    </div>
  )
}
