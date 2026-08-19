import type { BodyId } from '../content/types'

type Spec = {
  seed: number
  hi: string
  mid: string
  deep: string
  contours: number
  tilt: number
  ring?: 'thin' | 'gap' | 'track'
  limb?: boolean
  terminator?: boolean
  binary?: boolean
  docks?: boolean
  craters?: boolean
  wing?: boolean
  clouds?: boolean
}

const specs: Record<BodyId, Spec> = {
  kedra: {
    seed: 2,
    hi: '#eaf4ff',
    mid: '#4d8ee8',
    deep: '#163a9c',
    contours: 6,
    tilt: -16,
    ring: 'thin',
  },
  alta: {
    seed: 5,
    hi: '#f4f8ff',
    mid: '#6aa0e8',
    deep: '#1c4aaa',
    contours: 5,
    tilt: -9,
    wing: true,
  },
  kolybel: {
    seed: 1,
    hi: '#ffffff',
    mid: '#5b9aee',
    deep: '#1542b0',
    contours: 6,
    tilt: -18,
  },
  selena: {
    seed: 8,
    hi: '#e8f0fc',
    mid: '#4a82d4',
    deep: '#163888',
    contours: 5,
    tilt: -12,
    ring: 'track',
    craters: true,
  },
  efir: {
    seed: 4,
    hi: '#e7f6ff',
    mid: '#3d92e6',
    deep: '#1252a8',
    contours: 6,
    tilt: -22,
    ring: 'gap',
  },
  mira: {
    seed: 6,
    hi: '#edf4ff',
    mid: '#4d8ce6',
    deep: '#1848a4',
    contours: 5,
    tilt: -14,
    docks: true,
  },
  par: {
    seed: 3,
    hi: '#eef5ff',
    mid: '#568ee0',
    deep: '#1a4498',
    contours: 4,
    tilt: -11,
    binary: true,
  },
  oborot: {
    seed: 9,
    hi: '#e6f0ff',
    mid: '#3d7ad8',
    deep: '#102e78',
    contours: 6,
    tilt: -17,
    terminator: true,
  },
  polar: {
    seed: 7,
    hi: '#eef9ff',
    mid: '#3d8ee0',
    deep: '#124a96',
    contours: 5,
    tilt: -8,
    limb: true,
  },
  vual: {
    seed: 11,
    hi: '#eef0ff',
    mid: '#5a78d8',
    deep: '#24348c',
    contours: 7,
    tilt: -24,
    clouds: true,
  },
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

  if (spec.binary) {
    return (
      <div className={`relative isolate overflow-visible ${className}`}>
        <RingBack spec={spec} />
        <div className="absolute left-[8%] top-[28%] h-[46%] w-[46%]">
          <Orb spec={spec} id={`${gid}-a`} />
        </div>
        <div className="absolute right-[10%] top-[36%] h-[32%] w-[32%]">
          <Orb spec={spec} id={`${gid}-b`} />
        </div>
        <RingFront spec={spec} />
      </div>
    )
  }

  return (
    <div className={`relative isolate overflow-visible ${className}`}>
      <div
        className="absolute inset-[-12%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(110,170,255,0.38) 0%, transparent 68%)',
        }}
      />
      {spec.docks && (
        <>
          <div className="absolute right-[6%] top-[20%] z-0 h-[36%] w-[36%]">
            <Orb spec={spec} id={`${gid}-d1`} />
          </div>
          <div className="absolute bottom-[12%] right-[18%] z-0 h-[28%] w-[28%]">
            <Orb spec={spec} id={`${gid}-d2`} />
          </div>
        </>
      )}
      <RingBack spec={spec} />
      {spec.wing && (
        <svg className="absolute inset-0 z-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
          <path
            d="M8 58 C 32 24, 68 22, 94 56"
            fill="none"
            stroke="rgba(210,230,255,0.45)"
            strokeWidth="0.7"
            strokeLinecap="round"
          />
        </svg>
      )}
      <div className="absolute inset-[7%] z-[1]">
        <Orb spec={spec} id={gid} />
      </div>
      <RingFront spec={spec} />
    </div>
  )
}

function Orb({ spec, id }: { spec: Spec; id: string }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-full"
      style={{
        background: `radial-gradient(circle at 72% 24%, ${spec.hi} 0%, ${spec.mid} 34%, ${spec.deep} 78%)`,
        boxShadow: '0 0 28px rgba(80,140,255,0.28)',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
        <defs>
          <clipPath id={`${id}-clip`}>
            <circle cx="50" cy="50" r="50" />
          </clipPath>
          <filter id={`${id}-n`}>
            <feTurbulence type="fractalNoise" baseFrequency="1.7" numOctaves="2" seed={spec.seed} />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.15
                      0 0 0 0 0.32
                      0 0 0 0 0.7
                      0 0 0 0.18 0"
            />
          </filter>
        </defs>
        <g clipPath={`url(#${id}-clip)`}>
          <rect width="100" height="100" filter={`url(#${id}-n)`} />
          <g
            fill="none"
            stroke="rgba(8,36,100,0.4)"
            strokeWidth="0.38"
            strokeLinecap="round"
            transform={`rotate(${spec.tilt} 50 50)`}
          >
            {Array.from({ length: spec.contours }, (_, i) => {
              const t = (i + 1) / (spec.contours + 1)
              const cy = 18 + t * 64
              const rx = Math.max(8, 47 * Math.sin(Math.PI * t))
              const ry = Math.max(2.4, rx * 0.2)
              return <ellipse key={i} cx="50" cy={cy} rx={rx} ry={ry} />
            })}
            <path d="M50 4 C 78 32, 78 68, 50 96" />
            <path d="M50 4 C 22 32, 22 68, 50 96" />
          </g>
          {spec.craters && (
            <g fill="rgba(10,32,90,0.2)" stroke="none">
              <circle cx="38" cy="46" r="6.5" />
              <circle cx="60" cy="60" r="9.5" />
              <circle cx="48" cy="72" r="3.6" />
            </g>
          )}
          {spec.clouds && (
            <g fill="rgba(200,220,255,0.12)">
              <ellipse cx="40" cy="42" rx="18" ry="7" transform="rotate(-18 40 42)" />
              <ellipse cx="62" cy="58" rx="20" ry="8" transform="rotate(12 62 58)" />
            </g>
          )}
        </g>
      </svg>
      {spec.terminator && (
        <div className="absolute inset-0 bg-[linear-gradient(118deg,transparent_48%,rgba(8,24,72,0.45)_66%)]" />
      )}
      {spec.limb && (
        <div className="absolute inset-x-[8%] top-[5%] h-[26%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(210,235,255,0.4),transparent_72%)]" />
      )}
    </div>
  )
}

function ringEllipse(spec: Spec) {
  const dash = spec.ring === 'gap' ? '90 22' : undefined
  const ry = spec.binary ? 14 : spec.ring === 'track' ? 11 : 13.2
  const width = spec.ring === 'gap' ? 1.1 : 0.55
  return { dash, ry, width, rx: spec.binary ? 46 : 48.5 }
}

function ellipseLocal(rx: number, ry: number, deg: number) {
  const t = (deg * Math.PI) / 180
  return { x: 50 + rx * Math.cos(t), y: 50 + ry * Math.sin(t) }
}

function ringArc(rx: number, ry: number, fromDeg: number, toDeg: number, large: 0 | 1, sweep: 0 | 1) {
  const a = ellipseLocal(rx, ry, fromDeg)
  const b = ellipseLocal(rx, ry, toDeg)
  return `M ${a.x.toFixed(3)} ${a.y.toFixed(3)} A ${rx} ${ry} 0 ${large} ${sweep} ${b.x.toFixed(3)} ${b.y.toFixed(3)}`
}

function RingLayer({ spec, layer }: { spec: Spec; layer: 'back' | 'front' }) {
  const r = ringEllipse(spec)
  const front = layer === 'front'
  const d = front ? ringArc(r.rx, r.ry, 195, 345, 1, 0) : ringArc(r.rx, r.ry, 345, 195, 0, 0)
  return (
    <svg
      className={`pointer-events-none absolute inset-[-12%] overflow-visible ${front ? 'z-[2]' : 'z-0'}`}
      viewBox="-12 -12 124 124"
      overflow="visible"
      aria-hidden
    >
      <g transform="rotate(-16 50 50)">
        <path
          d={d}
          fill="none"
          stroke={front ? 'rgba(232,246,255,0.55)' : 'rgba(232,246,255,0.5)'}
          strokeWidth={r.width}
          strokeDasharray={r.dash}
          strokeLinecap="round"
        />
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
