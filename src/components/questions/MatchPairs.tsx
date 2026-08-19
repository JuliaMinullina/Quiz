import { useLayoutEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import type { MatchPair, Text } from '../../content/types'
import { ui } from '../../content/ui'
import { hitByPoint, isTap, pairCurve } from '../../lib/geometry'
import { useLocale } from '../../lib/locale'
import { AnswerFact } from './AnswerFact'

function shuffle<T>(items: readonly T[]) {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const a = next[i]
    const b = next[j]
    if (a !== undefined && b !== undefined) {
      next[i] = b
      next[j] = a
    }
  }
  return next
}

type LineTone = 'live' | 'ok' | 'pick' | 'hint'

export function MatchPairs({
  fact,
  pairs,
  revealed,
  mapping,
  onChange,
}: {
  fact: Text
  pairs: readonly MatchPair[]
  revealed: boolean
  mapping: Record<string, string>
  onChange: (mapping: Record<string, string>) => void
}) {
  const { tx } = useLocale()
  const [pending, setPending] = useState<string | null>(null)
  const [tick, setTick] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const liveRef = useRef<SVGPathElement>(null)
  const drag = useRef<{
    id: string
    pointerId: number
    startX: number
    startY: number
    dragging: boolean
    wasPending: boolean
  } | null>(null)
  const rights = useMemo(() => shuffle(pairs), [pairs])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ro = new ResizeObserver(() => setTick((n) => n + 1))
    ro.observe(root)
    return () => ro.disconnect()
  }, [])

  useLayoutEffect(() => {
    setTick((n) => n + 1)
  }, [mapping, pending])

  function ports() {
    const root = rootRef.current
    if (!root) return new Map<string, { x: number; y: number }>()
    const box = root.getBoundingClientRect()
    const next = new Map<string, { x: number; y: number }>()
    for (const el of root.querySelectorAll<HTMLElement>('[data-port]')) {
      const key = el.dataset.port
      if (!key) continue
      const r = el.getBoundingClientRect()
      next.set(key, { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top })
    }
    return next
  }

  function connect(leftId: string, rightId: string) {
    const next = { ...mapping }
    for (const [left, right] of Object.entries(next)) {
      if (right === rightId || left === leftId) delete next[left]
    }
    next[leftId] = rightId
    onChange(next)
    setPending(null)
  }

  function disconnect(leftId: string) {
    const next = { ...mapping }
    delete next[leftId]
    onChange(next)
  }

  function hitRight(x: number, y: number) {
    const root = rootRef.current
    if (!root) return null
    const rects = [...root.querySelectorAll<HTMLElement>('[data-right]')].map((el) => ({
      id: el.dataset.right ?? '',
      rect: el.getBoundingClientRect(),
    }))
    return hitByPoint(x, y, rects.filter((r) => r.id), 14)
  }

  function writeLive(x: number, y: number, leftId: string) {
    const path = liveRef.current
    const root = rootRef.current
    const from = ports().get(`left-${leftId}`)
    if (!path || !root || !from) return
    const box = root.getBoundingClientRect()
    path.setAttribute('d', pairCurve(from.x, from.y, x - box.left, y - box.top))
    path.style.opacity = '1'
  }

  function clearLive() {
    const path = liveRef.current
    if (!path) return
    path.setAttribute('d', '')
    path.style.opacity = '0'
  }

  function onLeftDown(e: ReactPointerEvent<HTMLButtonElement>, id: string) {
    if (revealed) return
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = {
      id,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      dragging: false,
      wasPending: pending === id,
    }
    setPending(id)
  }

  function onLeftMove(e: ReactPointerEvent<HTMLButtonElement>) {
    const current = drag.current
    if (!current || current.pointerId !== e.pointerId) return
    if (!current.dragging && !isTap(e.clientX - current.startX, e.clientY - current.startY)) {
      current.dragging = true
    }
    if (current.dragging) writeLive(e.clientX, e.clientY, current.id)
  }

  function onLeftUp(e: ReactPointerEvent<HTMLButtonElement>) {
    const current = drag.current
    if (!current || current.pointerId !== e.pointerId) return
    const rightId = hitRight(e.clientX, e.clientY)
    const tapped = !current.dragging
    drag.current = null
    clearLive()

    if (rightId) {
      connect(current.id, rightId)
      return
    }
    if (tapped) {
      if (mapping[current.id]) {
        disconnect(current.id)
        setPending(null)
        return
      }
      setPending(current.wasPending ? null : current.id)
      return
    }
    setPending(null)
  }

  function onRightUp(e: ReactPointerEvent<HTMLButtonElement>, id: string) {
    if (revealed) return
    if (drag.current?.dragging) return
    if (!pending) return
    e.stopPropagation()
    connect(pending, id)
  }

  const pts = ports()
  void tick

  const lines: { key: string; d: string; tone: LineTone }[] = []
  for (const [leftId, rightId] of Object.entries(mapping)) {
    const a = pts.get(`left-${leftId}`)
    const b = pts.get(`right-${rightId}`)
    if (!a || !b) continue
    lines.push({
      key: `${leftId}-${rightId}`,
      d: pairCurve(a.x, a.y, b.x, b.y),
      tone: revealed ? 'pick' : 'ok',
    })
  }

  if (revealed) {
    for (const pair of pairs) {
      if (mapping[pair.id] === pair.id) continue
      const a = pts.get(`left-${pair.id}`)
      const b = pts.get(`right-${pair.id}`)
      if (!a || !b) continue
      lines.push({
        key: `hint-${pair.id}`,
        d: pairCurve(a.x, a.y, b.x, b.y),
        tone: 'hint',
      })
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <p className={`mb-[1.4rem] shrink-0 text-[1.35rem] text-white/58 ${revealed ? 'invisible' : ''}`}>
        {tx(ui.matchHint)}
      </p>
      <div ref={rootRef} className="relative grid min-h-0 flex-1 touch-none grid-cols-2 gap-[6.5rem]">
        <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible" aria-hidden>
          {lines.map((line) => (
            <path
              key={line.key}
              data-testid={line.tone === 'hint' ? undefined : `match-line-${line.key}`}
              d={line.d}
              className={`pair-line ${line.tone === 'pick' ? 'is-pick' : ''} ${line.tone === 'hint' ? 'is-hint' : ''}`}
            />
          ))}
          <path ref={liveRef} className="pair-line is-live" d="" style={{ opacity: 0 }} />
        </svg>
        <div className="z-20 flex min-h-0 flex-col gap-[1rem] overflow-visible">
          {pairs.map((p) => {
            const chosen = mapping[p.id]
            const glow = revealed ? Boolean(chosen) : false
            const active = pending === p.id
            return (
              <button
                key={p.id}
                type="button"
                data-testid={`match-left-${p.id}`}
                disabled={revealed}
                onPointerDown={(e) => onLeftDown(e, p.id)}
                onPointerMove={onLeftMove}
                onPointerUp={onLeftUp}
                onPointerCancel={onLeftUp}
                className={`kiosk-btn match-node answer-card relative flex flex-1 items-center overflow-visible rounded-[1.35rem] px-[2rem] pr-[2.8rem] text-left text-white ${
                  active ? 'answer-card-held' : ''
                } ${glow ? 'answer-card-on' : ''}`}
              >
                <span className="match-label">{tx(p.left)}</span>
                <span
                  data-port={`left-${p.id}`}
                  className={`absolute top-1/2 right-[-9px] z-30 size-[14px] -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_12px_rgba(126,231,255,0.9)] ${
                    active ? 'scale-110' : ''
                  }`}
                />
              </button>
            )
          })}
        </div>
        <div className="z-20 flex min-h-0 flex-col gap-[1rem] overflow-visible">
          {rights.map((p) => {
            const owner = Object.entries(mapping).find(([, v]) => v === p.id)?.[0]
            const glow = revealed ? Boolean(owner) : false
            const waiting = pending != null && !revealed
            return (
              <button
                key={p.id}
                type="button"
                data-testid={`match-right-${p.id}`}
                data-right={p.id}
                disabled={revealed}
                onPointerUp={(e) => onRightUp(e, p.id)}
                onClick={() => {
                  if (revealed || drag.current?.dragging || !pending) return
                  connect(pending, p.id)
                }}
                className={`kiosk-btn match-node answer-card answer-card-alt relative flex flex-1 items-center justify-end overflow-visible rounded-[1.35rem] px-[2rem] pl-[2.8rem] text-right text-white ${
                  waiting ? 'answer-card-held' : ''
                } ${glow ? 'answer-card-on' : ''}`}
              >
                <span
                  data-port={`right-${p.id}`}
                  className="absolute top-1/2 left-[-9px] z-30 size-[14px] -translate-y-1/2 rounded-full border-[2.5px] border-cyan bg-[rgba(8,18,38,0.98)] shadow-[0_0_12px_rgba(126,231,255,0.45)]"
                />
                <span className="match-label match-label--right">{tx(p.right)}</span>
              </button>
            )
          })}
        </div>
      </div>
      <div className="mt-[1.4rem] min-h-[10.5rem] shrink-0 text-left">
        {revealed ? <AnswerFact className="answer-fact--panel" text={tx(fact)} /> : null}
      </div>
    </div>
  )
}
