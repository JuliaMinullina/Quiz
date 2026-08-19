import { useLayoutEffect, useRef, type RefObject } from 'react'
import type { BodyId } from '../content/types'
import { ellipsePath, ellipsePoint } from '../lib/layout'

export type Surface =
  | 'topo'
  | 'grid'
  | 'craters'
  | 'aurora'
  | 'clouds'
  | 'faint'
  | 'striate'
  | 'maria'
  | 'bands'
  | 'glass'

export const BODY_SURFACE: Record<BodyId, Surface> = {
  kolybel: 'topo',
  efir: 'grid',
  selena: 'craters',
  polar: 'aurora',
  vual: 'clouds',
  kedra: 'faint',
  alta: 'striate',
  oborot: 'maria',
  par: 'bands',
  mira: 'glass',
}

type Spec = {
  seed: number
  hi: string
  mid: string
  deep: string
  reflex: string
  tilt: number
  surface: Surface
  halo: string
  ring?: 'thin' | 'gap' | 'track'
  terminator?: boolean
  binary?: boolean
  docks?: boolean
  wing?: boolean
  crossOrbits?: boolean
  hero?: boolean
}

const specs: Record<BodyId, Spec> = {
  kolybel: {
    seed: 1,
    hi: '#ffffff',
    mid: '#6aa8e4',
    deep: '#0c4aaa',
    reflex: 'rgba(20,130,255,0.9)',
    tilt: -16,
    surface: 'topo',
    halo: 'rgba(90,185,255,0.58)',
    crossOrbits: true,
    hero: true,
  },
  efir: {
    seed: 4,
    hi: '#ffffff',
    mid: '#b4d4f6',
    deep: '#1550b0',
    reflex: 'rgba(50,140,255,0.7)',
    tilt: -22,
    surface: 'grid',
    halo: 'rgba(60,150,255,0.5)',
    ring: 'gap',
  },
  selena: {
    seed: 8,
    hi: '#ffffff',
    mid: '#d5dce4',
    deep: '#4a5562',
    reflex: 'rgba(160,190,220,0.55)',
    tilt: -12,
    surface: 'craters',
    halo: 'rgba(190,210,230,0.4)',
    ring: 'track',
  },
  polar: {
    seed: 7,
    hi: '#ffffff',
    mid: '#c4f0ec',
    deep: '#0d6a72',
    reflex: 'rgba(50,230,220,0.72)',
    tilt: -8,
    surface: 'aurora',
    halo: 'rgba(60,220,210,0.52)',
  },
  kedra: {
    seed: 2,
    hi: '#ffffff',
    mid: '#c2daf6',
    deep: '#1a4c9c',
    reflex: 'rgba(80,170,255,0.65)',
    tilt: -16,
    surface: 'faint',
    halo: 'rgba(90,170,255,0.45)',
    ring: 'thin',
  },
  alta: {
    seed: 5,
    hi: '#ffffff',
    mid: '#e4eaf0',
    deep: '#5c6774',
    reflex: 'rgba(180,205,230,0.5)',
    tilt: -9,
    surface: 'striate',
    halo: 'rgba(210,225,240,0.38)',
    wing: true,
  },
  vual: {
    seed: 11,
    hi: '#ffffff',
    mid: '#d4d0f0',
    deep: '#3a3a88',
    reflex: 'rgba(150,150,255,0.62)',
    tilt: -24,
    surface: 'clouds',
    halo: 'rgba(150,155,255,0.45)',
  },
  oborot: {
    seed: 9,
    hi: '#ffffff',
    mid: '#d0d8e4',
    deep: '#1c2838',
    reflex: 'rgba(100,150,210,0.5)',
    tilt: -17,
    surface: 'maria',
    halo: 'rgba(140,170,210,0.36)',
    terminator: true,
  },
  mira: {
    seed: 6,
    hi: '#ffffff',
    mid: '#c6def8',
    deep: '#1c58a8',
    reflex: 'rgba(80,165,255,0.6)',
    tilt: -14,
    surface: 'glass',
    halo: 'rgba(90,165,255,0.42)',
    docks: true,
  },
  par: {
    seed: 3,
    hi: '#ffffff',
    mid: '#c8eaf4',
    deep: '#0e5a78',
    reflex: 'rgba(60,200,230,0.62)',
    tilt: -11,
    surface: 'bands',
    halo: 'rgba(70,190,220,0.42)',
    binary: true,
  },
}

const CROSS_A = { rx: 58, ry: 22, rot: -38 }
const CROSS_B = { rx: 58, ry: 22, rot: 38 }
const SAT_T0 = 0.08
const SAT_PERIOD_MS = 22000
const SURFACE_LINE = 'rgba(10,40,110,0.42)'
const SURFACE_LINE_WEIGHT = 0.85
const GRID_LINE = 'rgba(18,44,110,0.2)'

/** Circular arc concentric with the planet disk (viewBox 100×100, center 50,50). */
export function concentricLimbArc(r: number, spanDeg: number): string {
  const a = (spanDeg * Math.PI) / 180
  const x1 = 50 - r * Math.sin(a)
  const y1 = 50 - r * Math.cos(a)
  const x2 = 50 + r * Math.sin(a)
  const y2 = 50 - r * Math.cos(a)
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`
}

export function CelestialBody({
  variant,
  className = '',
}: {
  variant: BodyId
  className?: string
}) {
  const spec = specs[variant]
  const gid = `orb-${variant}`
  const sat = useCrossSatellite(Boolean(spec.crossOrbits))

  if (spec.binary) {
    const companion: Spec = {
      ...spec,
      seed: spec.seed + 4,
      hi: '#ffffff',
      mid: '#d0eef2',
      deep: '#0e5a68',
      reflex: 'rgba(70,210,220,0.58)',
      surface: 'faint',
      tilt: spec.tilt + 9,
    }
    return (
      <div className={`relative isolate overflow-visible ${className}`}>
        <RingBack spec={spec} />
        <div className="absolute left-[20%] top-[32%] h-[36%] w-[36%]">
          <Orb spec={spec} id={`${gid}-a`} />
        </div>
        <div className="absolute left-[48%] top-[36%] h-[28%] w-[28%]">
          <Orb spec={companion} id={`${gid}-b`} />
        </div>
        <RingFront spec={spec} />
      </div>
    )
  }

  return (
    <div className={`relative isolate overflow-visible ${className}`}>
      <div
        className={`absolute rounded-full opacity-80 ${spec.hero ? 'inset-[-22%]' : 'inset-[-4%]'}`}
        style={{
          background: `radial-gradient(circle, ${spec.halo} 0%, transparent 62%)`,
        }}
      />
      {spec.docks && (
        <>
          <div className="absolute right-[6%] top-[20%] z-0 h-[36%] w-[36%]">
            <Orb spec={spec} id={`${gid}-d1`} />
          </div>
          <div className="absolute bottom-[12%] right-[18%] z-0 h-[28%] w-[28%]">
            <Orb spec={{ ...spec, seed: spec.seed + 2, tilt: spec.tilt + 11 }} id={`${gid}-d2`} />
          </div>
        </>
      )}
      <RingBack spec={spec} />
      {spec.wing && (
        <svg className="absolute inset-0 z-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
          <path
            d="M8 58 C 32 24, 68 22, 94 56"
            fill="none"
            stroke="rgba(230,236,244,0.55)"
            strokeWidth="0.7"
            strokeLinecap="round"
          />
        </svg>
      )}
      {spec.crossOrbits && <KolybelOrbits layer="back" />}
      <div className="absolute inset-0 z-[1] overflow-visible">
        <Orb spec={spec} id={gid} />
      </div>
      {spec.crossOrbits && <KolybelOrbits layer="front" />}
      {spec.crossOrbits && <KolybelSatellite satRef={sat.satRef} />}
      <RingFront spec={spec} />
    </div>
  )
}

function useCrossSatellite(enabled: boolean) {
  const satRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!enabled) return

    const apply = (t: number) => {
      const p = ellipsePoint(50, 50, CROSS_A.rx, CROSS_A.ry, CROSS_A.rot, t)
      const front = Math.sin(t * Math.PI * 2) >= 0
      const sat = satRef.current
      if (!sat) return
      sat.style.left = `${p.x}%`
      sat.style.top = `${p.y}%`
      sat.style.zIndex = front ? '5' : '0'
    }

    apply(SAT_T0)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const started = performance.now()
    const tick = (now: number) => {
      apply((SAT_T0 + (now - started) / SAT_PERIOD_MS) % 1)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [enabled])

  return { satRef }
}

function KolybelOrbits({ layer }: { layer: 'front' | 'back' }) {
  const front = layer === 'front'
  return (
    <svg
      data-testid={front ? 'kolybel-orbit-front' : 'kolybel-orbit-back'}
      className={`pointer-events-none absolute overflow-visible ${front ? 'z-[4]' : 'z-0'}`}
      viewBox="-36 -36 172 172"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      overflow="visible"
      aria-hidden
      style={{ left: '-36%', top: '-36%', width: '172%', height: '172%' }}
    >
      <g fill="none" stroke="rgba(232,246,255,0.55)" strokeWidth="0.55" strokeLinecap="round">
        <path d={orbitArc(CROSS_A, front)} />
        <path d={orbitArc(CROSS_B, front)} />
      </g>
    </svg>
  )
}

/** Near half (t=0..0.5) in front of the planet; far half behind — split on the ring’s own ears. */
function orbitArc(ring: { rx: number; ry: number; rot: number }, front: boolean) {
  return front
    ? ellipsePath(50, 50, ring.rx, ring.ry, ring.rot, -0.01, 0.51)
    : ellipsePath(50, 50, ring.rx, ring.ry, ring.rot, 0.49, 1.01)
}

function KolybelSatellite({ satRef }: { satRef: RefObject<HTMLDivElement | null> }) {
  const p = ellipsePoint(50, 50, CROSS_A.rx, CROSS_A.ry, CROSS_A.rot, SAT_T0)
  return (
    <div
      ref={satRef}
      className="pointer-events-none absolute"
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: '3.4%',
        height: '3.4%',
        transform: 'translate(-50%, -50%)',
        zIndex: 5,
      }}
      aria-hidden
    >
      <div className="absolute inset-[-45%] rounded-full bg-white/30" />
      <div className="absolute inset-0 rounded-full bg-white" />
    </div>
  )
}

function Orb({ spec, id }: { spec: Spec; id: string }) {
  return (
    <div
      className="relative z-[1] h-full w-full overflow-hidden rounded-full"
      style={{
        background: `radial-gradient(circle at 72% 22%, ${spec.hi} 0%, ${spec.mid} 36%, ${spec.deep} 82%)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background: spec.terminator
            ? `linear-gradient(118deg, transparent 46%, rgba(4,12,28,0.78) 68%), radial-gradient(circle at 14% 86%, ${spec.reflex} 0%, transparent 52%)`
            : spec.surface === 'aurora'
              ? `radial-gradient(circle at 50% -10%, rgba(80,255,230,0.55) 0%, transparent 42%), radial-gradient(circle at 14% 86%, ${spec.reflex} 0%, transparent 52%)`
              : `radial-gradient(circle at 14% 86%, ${spec.reflex} 0%, transparent 52%)`,
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
        <defs>
          <clipPath id={`${id}-clip`}>
            <circle cx="50" cy="50" r="50" />
          </clipPath>
          <linearGradient id={`${id}-fade`} x1="78%" y1="12%" x2="12%" y2="92%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="50%" stopColor="#ccc" />
            <stop offset="100%" stopColor="#3a3a3a" />
          </linearGradient>
          <mask id={`${id}-linefade`}>
            <rect width="100" height="100" fill={`url(#${id}-fade)`} />
          </mask>
        </defs>
        <g clipPath={`url(#${id}-clip)`}>
          {spec.surface === 'topo' ? (
            <g mask={`url(#${id}-linefade)`}>
              <SphereContours
                tilt={spec.tilt}
                seed={spec.seed}
                lats={8}
                stroke={SURFACE_LINE}
                weight={SURFACE_LINE_WEIGHT}
              />
            </g>
          ) : (
            <SurfaceMarks spec={spec} id={id} />
          )}
        </g>
      </svg>
    </div>
  )
}

function SurfaceMarks({ spec, id }: { spec: Spec; id: string }) {
  const ink = 'rgba(18,44,110,0.55)'
  switch (spec.surface) {
    case 'grid':
      return (
        <g fill="none" stroke={GRID_LINE} strokeWidth="0.75">
          <ellipse cx="50" cy="32" rx="40" ry="4.5" />
          <ellipse cx="50" cy="50" rx="47" ry="5.5" />
          <ellipse cx="50" cy="68" rx="40" ry="4.5" />
          <ellipse cx="50" cy="50" rx="18" ry="47" transform="rotate(-38 50 50)" />
          <ellipse cx="50" cy="50" rx="8" ry="47" />
          <ellipse cx="50" cy="50" rx="18" ry="47" transform="rotate(38 50 50)" />
        </g>
      )
    case 'craters':
      return <CraterMarks id={id} />
    case 'aurora':
      return (
        <g
          fill="none"
          stroke={SURFACE_LINE}
          strokeWidth={SURFACE_LINE_WEIGHT}
          strokeLinecap="round"
          transform={`rotate(${spec.tilt} 50 50)`}
        >
          <path d={concentricLimbArc(44, 52)} />
          <path d={concentricLimbArc(36, 52)} />
        </g>
      )
    case 'clouds':
      return (
        <g fill="rgba(255,255,255,0.22)" stroke="none">
          <ellipse cx="38" cy="42" rx="22" ry="11" />
          <ellipse cx="62" cy="50" rx="26" ry="13" />
          <ellipse cx="48" cy="64" rx="18" ry="9" />
          <ellipse cx="70" cy="34" rx="14" ry="7" />
        </g>
      )
    case 'faint':
      return (
        <g fill="rgba(255,255,255,0.16)" stroke="none">
          <ellipse cx="40" cy="46" rx="16" ry="20" />
          <ellipse cx="62" cy="58" rx="12" ry="14" />
        </g>
      )
    case 'striate':
      return (
        <g fill="none" stroke={ink} strokeWidth="0.85" strokeLinecap="round">
          {Array.from({ length: 9 }, (_, i) => {
            const y = 22 + i * 7.2
            return <path key={i} d={`M ${18 + (i % 3) * 2} ${y} L ${82 - (i % 2) * 3} ${y - 2.4}`} />
          })}
        </g>
      )
    case 'maria':
      return (
        <g fill="rgba(12,22,40,0.38)" stroke="none">
          <ellipse cx="38" cy="48" rx="16" ry="14" />
          <ellipse cx="62" cy="60" rx="12" ry="10" />
          <ellipse cx="54" cy="36" rx="8" ry="7" />
        </g>
      )
    case 'bands':
      return (
        <g fill="rgba(8,60,80,0.22)" stroke="none">
          <rect x="8" y="28" width="84" height="7" rx="3" />
          <rect x="6" y="42" width="88" height="10" rx="4" />
          <rect x="10" y="58" width="80" height="6" rx="3" />
          <rect x="14" y="70" width="72" height="5" rx="2" />
        </g>
      )
    case 'glass':
      return (
        <g fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8">
          <circle cx="50" cy="50" r="18" />
          <circle cx="50" cy="50" r="30" />
          <path d="M50 20 V 80 M 22 50 H 78" />
        </g>
      )
    default:
      return null
  }
}

function SphereContours({
  tilt,
  seed,
  lats,
  stroke,
  weight,
}: {
  tilt: number
  seed: number
  lats: number
  stroke: string
  weight: number
}) {
  const ox = ((seed * 5) % 9) - 4
  return (
    <g
      fill="none"
      stroke={stroke}
      strokeWidth={weight}
      strokeLinecap="round"
      transform={`rotate(${tilt} 50 50)`}
    >
      {Array.from({ length: lats }, (_, i) => {
        const t = (i + 1) / (lats + 1)
        const cy = 15 + t * 70
        const rx = Math.max(8, 47 * Math.sin(Math.PI * t))
        const ry = Math.max(2.1, rx * 0.19)
        return (
          <ellipse
            key={`lat-${i}`}
            cx={50 + ox * 0.35}
            cy={cy}
            rx={rx}
            ry={ry}
            vectorEffect="non-scaling-stroke"
          />
        )
      })}
    </g>
  )
}

function CraterMarks({ id }: { id: string }) {
  const craters = [
    { cx: 36, cy: 44, r: 12 },
    { cx: 64, cy: 58, r: 16 },
    { cx: 50, cy: 74, r: 6.5 },
    { cx: 72, cy: 34, r: 7.4 },
  ]
  return (
    <g>
      <defs>
        {craters.map((_, i) => (
          <radialGradient key={i} id={`${id}-cr${i}`} cx="36%" cy="30%" r="68%">
            <stop offset="0%" stopColor="rgba(12,16,24,0.32)" />
            <stop offset="58%" stopColor="rgba(12,16,24,0.1)" />
            <stop offset="100%" stopColor="rgba(12,16,24,0)" />
          </radialGradient>
        ))}
      </defs>
      {craters.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={`url(#${id}-cr${i})`} />
      ))}
    </g>
  )
}

function ringEllipse(spec: Spec) {
  const dash = spec.ring === 'gap' ? '26 10' : undefined
  const ry = spec.binary ? 18 : spec.ring === 'track' ? 17 : 18
  return { dash, ry, rx: spec.binary ? 58 : 62 }
}

function RingLayer({ spec, layer }: { spec: Spec; layer: 'back' | 'front' }) {
  const r = ringEllipse(spec)
  const front = layer === 'front'
  const clipId = `ring-near-${spec.seed}`
  return (
    <svg
      className={`pointer-events-none absolute overflow-visible ${front ? 'z-[2]' : 'z-0'}`}
      viewBox="-28 -28 156 156"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      overflow="visible"
      aria-hidden
      style={{ left: '-28%', top: '-28%', width: '156%', height: '156%' }}
    >
      {front && (
        <defs>
          <clipPath id={clipId}>
            <path d="M 0 50 A 50 50 0 0 1 100 50 Z" />
          </clipPath>
        </defs>
      )}
      <g clipPath={front ? `url(#${clipId})` : undefined}>
        <g transform="rotate(-18 50 50)">
          <ellipse
            cx="50"
            cy="50"
            rx={r.rx}
            ry={r.ry}
            fill="none"
            stroke={front ? 'rgba(232,246,255,0.58)' : 'rgba(232,246,255,0.4)'}
            strokeWidth={0.7}
            strokeDasharray={r.dash}
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  )
}

function RingBack({ spec }: { spec: Spec }) {
  if (!spec.ring && !spec.binary) return null
  return <RingLayer spec={spec} layer="back" />
}

function RingFront({ spec }: { spec: Spec }) {
  if (!spec.ring && !spec.binary) return null
  return <RingLayer spec={spec} layer="front" />
}
