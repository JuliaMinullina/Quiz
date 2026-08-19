import { useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { createPortal } from 'react-dom'
import type { OrderItem, Text } from '../../content/types'
import { ui } from '../../content/ui'
import { hitByPoint, isTap } from '../../lib/geometry'
import { useLocale } from '../../lib/locale'
import { AnswerFact } from './AnswerFact'

const tileClass =
  'order-tile answer-card flex h-full min-h-0 w-full items-center justify-center rounded-[1.35rem] px-[1.3rem] py-[1.2rem] text-center font-display text-[2rem] font-extralight leading-[1.22] tracking-[-0.015em] text-white'

type Drag = {
  id: string
  from: 'pool' | number
  pointerId: number
  startX: number
  startY: number
  lastX: number
  lastY: number
  grabX: number
  grabY: number
  width: number
  height: number
  dragging: boolean
  wasPending: boolean
}

export function OrderQuestion({
  fact,
  items,
  slots,
  revealed,
  onChange,
}: {
  fact: Text
  items: readonly OrderItem[]
  slots: (string | null)[]
  revealed: boolean
  onChange: (slots: (string | null)[]) => void
}) {
  const { tx } = useLocale()
  const [pending, setPending] = useState<string | null>(null)
  const [hover, setHover] = useState<string | null>(null)
  const [lifted, setLifted] = useState<{ id: string; width: number; height: number } | null>(null)
  const drag = useRef<Drag | null>(null)
  const cloneRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const unused = items.filter((it) => !slots.includes(it.id))

  function placeClone(x: number, y: number, grabX: number, grabY: number) {
    const node = cloneRef.current
    if (!node) return
    node.style.transform = `translate3d(${x - grabX}px, ${y - grabY}px, 0)`
  }

  useLayoutEffect(() => {
    const current = drag.current
    if (!lifted || !current) return
    placeClone(current.lastX, current.lastY, current.grabX, current.grabY)
  }, [lifted])

  useLayoutEffect(() => {
    return () => {
      delete document.body.dataset.orderDrag
    }
  }, [])

  function writeSlots(next: (string | null)[]) {
    onChange(next)
  }

  function placeInSlot(id: string, index: number, from: 'pool' | number) {
    const next = [...slots]
    const displaced = next[index]
    if (from === 'pool') {
      next[index] = id
    } else if (from === index) {
      return
    } else {
      next[index] = id
      next[from] = displaced ?? null
    }
    writeSlots(next)
  }

  function returnToPool(index: number) {
    const next = [...slots]
    next[index] = null
    writeSlots(next)
  }

  function hit(x: number, y: number) {
    const root = rootRef.current
    if (!root) return null
    const rects = [...root.querySelectorAll<HTMLElement>('[data-drop]')].map((el) => ({
      id: el.dataset.drop ?? '',
      rect: el.getBoundingClientRect(),
    }))
    return hitByPoint(x, y, rects.filter((r) => r.id))
  }

  function onPointerDown(e: ReactPointerEvent<HTMLButtonElement>, id: string, from: 'pool' | number) {
    if (revealed) return
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = {
      id,
      from,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastY: e.clientY,
      grabX: e.clientX - rect.left,
      grabY: e.clientY - rect.top,
      width: rect.width,
      height: rect.height,
      dragging: false,
      wasPending: pending === id,
    }
    document.body.dataset.orderDrag = '1'
    setLifted({ id, width: rect.width, height: rect.height })
    if (from === 'pool') setPending(id)
  }

  function onPointerMove(e: ReactPointerEvent<HTMLButtonElement>) {
    const current = drag.current
    if (!current || current.pointerId !== e.pointerId) return
    current.lastX = e.clientX
    current.lastY = e.clientY
    if (!current.dragging && !isTap(e.clientX - current.startX, e.clientY - current.startY)) {
      current.dragging = true
      setPending(current.id)
    }
    placeClone(e.clientX, e.clientY, current.grabX, current.grabY)
    if (!current.dragging) return
    const nextHover = hit(e.clientX, e.clientY)
    setHover((prev) => (prev === nextHover ? prev : nextHover))
  }

  function endPointer(e: ReactPointerEvent<HTMLButtonElement>) {
    const current = drag.current
    if (!current || current.pointerId !== e.pointerId) return
    e.stopPropagation()
    const tapped = !current.dragging
    const target = hit(e.clientX, e.clientY)
    drag.current = null
    delete document.body.dataset.orderDrag
    setHover(null)
    setLifted(null)

    if (tapped) {
      if (current.from === 'pool') {
        setPending(current.wasPending ? null : current.id)
      } else {
        returnToPool(current.from)
        setPending(null)
      }
      return
    }

    if (target?.startsWith('slot-')) {
      placeInSlot(current.id, Number(target.slice(5)), current.from)
      setPending(null)
      return
    }
    if (target === 'pool' && current.from !== 'pool') {
      returnToPool(current.from)
    }
    setPending(null)
  }

  function onSlotTap(index: number) {
    if (revealed || drag.current?.dragging) return
    if (!pending) return
    const from = slots.findIndex((id) => id === pending)
    placeInSlot(pending, index, from === -1 ? 'pool' : from)
    setPending(null)
  }

  const draggingId = lifted?.id ?? null
  const draggingItem = draggingId ? items.find((it) => it.id === draggingId) : null

  return (
    <div ref={rootRef} className="flex h-full min-h-0 flex-1 touch-none flex-col">
      <p className={`mb-[1.2rem] shrink-0 text-[1.35rem] text-white/58 ${revealed ? 'invisible' : ''}`}>
        {tx(ui.orderHint)}
      </p>

      <div className="grid min-h-0 flex-[1.45] grid-cols-4 gap-[0.9rem]">
        {slots.map((id, index) => {
          const item = items.find((it) => it.id === id)
          const correct = items.find((it) => it.order === index + 1)
          const glow = revealed && item?.order === index + 1
          const wrong = revealed && item && item.order !== index + 1
          const dropId = `slot-${index}`
          const hot = hover === dropId
          const lit = hot || (!item && pending != null)
          return (
            <div
              key={index}
              data-drop={dropId}
              data-testid={`order-slot-${index}`}
              onPointerUp={() => onSlotTap(index)}
              onClick={() => onSlotTap(index)}
              className={`answer-well order-glow-top relative flex min-h-0 flex-col rounded-[1.5rem] px-[0.7rem] pt-[1rem] pb-[0.7rem] ${
                glow ? 'answer-card-on' : lit ? 'answer-card-held' : ''
              } ${hot ? 'order-drop-hot' : ''} ${wrong ? 'opacity-100' : ''}`}
            >
              <span
                className={`mb-[0.55rem] block shrink-0 text-center font-display text-[1.2rem] ${
                  glow ? 'text-cyan' : 'text-white/40'
                }`}
              >
                {index + 1}
              </span>
              <div className="flex min-h-0 flex-1 flex-col items-stretch gap-[0.7rem]">
                {item ? (
                  <OrderTile
                    item={item}
                    label={tx(item.label)}
                    from={index}
                    muted={draggingId === item.id}
                    held={pending === item.id && !draggingId}
                    dim={Boolean(wrong)}
                    disabled={revealed}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={endPointer}
                    onPointerCancel={endPointer}
                  />
                ) : (
                  <div className="order-slot-empty min-h-0 flex-1 rounded-[1.15rem]" />
                )}
                {wrong && correct ? (
                  <p className="shrink-0 px-[0.3rem] text-center text-[1.25rem] leading-[1.3] text-cyan">
                    {tx(correct.label)}
                  </p>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>

      {revealed ? (
        <div className="mt-[1.2rem] flex min-h-[13vmin] shrink-0 items-center">
          <AnswerFact className="answer-fact--panel" text={tx(fact)} />
        </div>
      ) : (
        <div
          data-drop="pool"
          data-testid="order-pool"
          className={`answer-well order-glow-bottom mt-[1.1rem] grid min-h-0 flex-1 grid-cols-4 items-stretch gap-[0.8rem] rounded-[1.5rem] p-[0.85rem] ${
            hover === 'pool' ? 'answer-card-held order-drop-hot' : ''
          }`}
        >
          {unused.map((it) => (
            <div key={it.id} className="flex min-h-0 min-w-0">
              <OrderTile
                item={it}
                label={tx(it.label)}
                from="pool"
                muted={draggingId === it.id}
                held={pending === it.id && !draggingId}
                dim={false}
                disabled={revealed}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endPointer}
                onPointerCancel={endPointer}
              />
            </div>
          ))}
          {unused.length === 0 ? (
            <p className="col-span-4 m-auto text-center text-[1.3rem] text-white/42">{tx(ui.orderReturn)}</p>
          ) : null}
        </div>
      )}

      {draggingItem
        ? createPortal(
            <div
              ref={cloneRef}
              data-testid="order-drag-clone"
              className="order-drag-clone pointer-events-none fixed top-0 left-0 z-[80]"
              style={{
                width: lifted?.width,
                height: lifted?.height,
                transform: drag.current
                  ? `translate3d(${drag.current.lastX - drag.current.grabX}px, ${drag.current.lastY - drag.current.grabY}px, 0)`
                  : 'translate3d(-9999px, -9999px, 0)',
              }}
            >
              <div
                className={`${tileClass} order-drag-clone-face ${
                  drag.current?.from === 'pool' ? 'order-glow-bottom' : 'order-glow-top'
                }`}
              >
                <span className="order-tile-grip" aria-hidden>
                  <span />
                  <span />
                  <span />
                </span>
                {tx(draggingItem.label)}
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}

function OrderTile({
  item,
  label,
  from,
  muted,
  held,
  dim,
  disabled,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
}: {
  item: OrderItem
  label: string
  from: 'pool' | number
  muted: boolean
  held: boolean
  dim: boolean
  disabled: boolean
  onPointerDown: (e: ReactPointerEvent<HTMLButtonElement>, id: string, from: 'pool' | number) => void
  onPointerMove: (e: ReactPointerEvent<HTMLButtonElement>) => void
  onPointerUp: (e: ReactPointerEvent<HTMLButtonElement>) => void
  onPointerCancel: (e: ReactPointerEvent<HTMLButtonElement>) => void
}) {
  return (
    <button
      type="button"
      data-testid={`order-item-${item.id}`}
      disabled={disabled}
      onPointerDown={(e) => onPointerDown(e, item.id, from)}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onLostPointerCapture={onPointerCancel}
      className={`${tileClass} relative ${from === 'pool' ? 'order-glow-bottom' : 'order-glow-top'} ${
        muted ? 'order-tile-ghost' : ''
      } ${held ? 'answer-card-held' : ''} ${dim ? 'answer-card-off' : ''}`}
    >
      {disabled ? null : (
        <span className="order-tile-grip" aria-hidden>
          <span />
          <span />
          <span />
        </span>
      )}
      {label}
    </button>
  )
}
