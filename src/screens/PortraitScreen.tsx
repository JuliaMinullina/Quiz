import { portraitById } from '../content/portraits'
import { ui } from '../content/ui'
import type { TeacherPortraitId } from '../content/types'
import { useLocale } from '../lib/locale'
import { KioskButton } from '../components/KioskButton'

const STAR = [
  { id: 'task' as const, x: 14, y: 72 },
  { id: 'ethos' as const, x: 34, y: 22 },
  { id: 'personal' as const, x: 50, y: 58 },
  { id: 'community' as const, x: 68, y: 18 },
  { id: 'subject' as const, x: 86, y: 64 },
]

const LINES: readonly (readonly [TeacherPortraitId, TeacherPortraitId])[] = [
  ['task', 'ethos'],
  ['ethos', 'personal'],
  ['personal', 'community'],
  ['ethos', 'subject'],
  ['community', 'subject'],
]

function starAt(id: TeacherPortraitId) {
  return STAR.find((star) => star.id === id)!
}

export function PortraitScreen({
  portraitId,
  onAgain,
  onRestart,
}: {
  portraitId: TeacherPortraitId
  onAgain: () => void
  onRestart: () => void
}) {
  const { tx } = useLocale()
  const portrait = portraitById(portraitId)

  return (
    <div
      data-testid="portrait"
      className="relative z-20 flex h-full flex-col items-center justify-center px-[10vmin] text-center"
    >
      <svg
        className="portrait-sky mb-[2.2vmin] h-[18vmin] w-[min(72rem,78%)]"
        viewBox="0 0 100 100"
        aria-hidden
      >
        {LINES.map(([from, to]) => {
          const a = starAt(from)
          const b = starAt(to)
          const lit = from === portraitId || to === portraitId
          return (
            <line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              className={lit ? 'portrait-link-on' : 'portrait-link'}
            />
          )
        })}
        {STAR.map((star) => {
          const active = star.id === portraitId
          return (
            <g key={star.id} data-testid={`portrait-star-${star.id}`} data-lit={active ? 'true' : 'false'}>
              <circle
                cx={star.x}
                cy={star.y}
                r={active ? 3.4 : 1.6}
                className={active ? 'portrait-star-on' : 'portrait-star'}
              />
            </g>
          )
        })}
      </svg>
      <p className="font-display text-[2.8rem] font-medium leading-[1.2] tracking-[-0.02em] text-white">
        {tx(portrait.name)}
      </p>
      <p className="mt-[1.8vmin] max-w-[46rem] text-[1.55rem] leading-[1.38] text-white/75">
        {tx(portrait.text)}
      </p>
      <div className="mt-[4vmin] flex flex-wrap items-center justify-center gap-[1.4rem]">
        <KioskButton data-testid="home" variant="ghost" onClick={onRestart}>
          {tx(ui.home)}
        </KioskButton>
        <KioskButton data-testid="again" onClick={onAgain}>
          {tx(ui.again)}
        </KioskButton>
      </div>
    </div>
  )
}
