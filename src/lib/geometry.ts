export type HitBox = {
  left: number
  top: number
  right: number
  bottom: number
  width: number
  height: number
}

export function pairCurve(x1: number, y1: number, x2: number, y2: number) {
  const bow = Math.max(24, Math.abs(x2 - x1) * 0.18)
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${(x1 + bow).toFixed(1)} ${y1.toFixed(1)}, ${(x2 - bow).toFixed(1)} ${y2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`
}

export function isTap(dx: number, dy: number, max = 12) {
  return dx * dx + dy * dy <= max * max
}

export function hitByPoint(
  x: number,
  y: number,
  rects: readonly { id: string; rect: HitBox }[],
  pad = 10,
) {
  let best: { id: string; area: number } | null = null
  for (const item of rects) {
    const inside =
      x >= item.rect.left - pad &&
      x <= item.rect.right + pad &&
      y >= item.rect.top - pad &&
      y <= item.rect.bottom + pad
    if (!inside) continue
    const area = item.rect.width * item.rect.height
    if (!best || area < best.area) best = { id: item.id, area }
  }
  return best?.id ?? null
}
