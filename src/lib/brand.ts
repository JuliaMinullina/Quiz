/** Silhouette of the Хорошкола sign — `logo.svg`, viewBox 116×210. */

export const SIGN = {
  width: 116,
  height: 210,
  path: 'M78.9643 105L116 0H0C0 0 38.1862 104.542 38.2352 105L0 210H116C116 210 79.0133 105.434 78.9643 105Z',
  waistY: 105,
  waistLeft: 38.2352,
  waistRight: 78.9643,
} as const

/** Guidebook: the corner is 1/8 of the sign height. */
export const SIGN_CORNER = 1 / 8

/** Left-edge slope of the top trapezoid (rise / run). */
export const SIGN_SLOPE = SIGN.waistY / SIGN.waistLeft

export type SignHalf = 'full' | 'top' | 'bottom'

export function signPath(half: SignHalf = 'full') {
  if (half === 'top') {
    return `M0 0H${SIGN.width}L${SIGN.waistRight} ${SIGN.waistY}H${SIGN.waistLeft}Z`
  }
  if (half === 'bottom') {
    return `M${SIGN.waistLeft} ${SIGN.waistY}H${SIGN.waistRight}L${SIGN.width} ${SIGN.height}H0Z`
  }
  return SIGN.path
}

export type SignOrbit = {
  rx: number
  ry: number
  rot: number
}

/** Ellipses around the sign — same graphic idea as guidebook 1.6.1. */
export const SIGN_ORBITS: readonly SignOrbit[] = [
  { rx: 94, ry: 58, rot: -16 },
  { rx: 70, ry: 42, rot: 28 },
]

export const SIGN_CX = SIGN.width / 2
export const SIGN_CY = SIGN.waistY

export type Pt = { x: number; y: number }

/** 16:9 artboard — 1 unit is the same in X and Y on the kiosk. */
export const BRAND_ARTBOARD = { w: 1600, h: 900 } as const

/** Seam width in artboard units (equal on vertical, horizontal, diagonal). */
export const MOSAIC_GAP = 7
export const MOSAIC_FILL = 'rgb(255 255 255 / 0.028)'

/** Vertical split and the peak where the two slants meet — guidebook crop. */
export const MOSAIC_SPLIT_X = 67
export const MOSAIC_PEAK_Y = 23
export const MOSAIC_LEFT_Y = 53
export const MOSAIC_RIGHT_Y = 43
export const MOSAIC_BASE_Y = 77

/** Hero sits at 50% × 50% — inside the large middle-left trap. */
export const MOSAIC_HERO = mosaicPct(50, 50)

export function mosaicPct(x: number, y: number): Pt {
  return { x: (x / 100) * BRAND_ARTBOARD.w, y: (y / 100) * BRAND_ARTBOARD.h }
}

/**
 * Six quads from the guidebook reference, stretched to the full frame.
 * Left 67% / right 33%; slants meet at the peak; a shared base line at 77%.
 */
export function rawMosaicPolygons(): Pt[][] {
  const x = MOSAIC_SPLIT_X
  const peak = MOSAIC_PEAK_Y
  const left = MOSAIC_LEFT_Y
  const right = MOSAIC_RIGHT_Y
  const base = MOSAIC_BASE_Y
  return [
    [mosaicPct(0, 0), mosaicPct(x, 0), mosaicPct(x, peak), mosaicPct(0, left)],
    [mosaicPct(0, left), mosaicPct(x, peak), mosaicPct(x, base), mosaicPct(0, base)],
    [mosaicPct(0, base), mosaicPct(x, base), mosaicPct(x, 100), mosaicPct(0, 100)],
    [mosaicPct(x, 0), mosaicPct(100, 0), mosaicPct(100, right), mosaicPct(x, peak)],
    [mosaicPct(x, peak), mosaicPct(100, right), mosaicPct(100, base), mosaicPct(x, base)],
    [mosaicPct(x, base), mosaicPct(100, base), mosaicPct(100, 100), mosaicPct(x, 100)],
  ]
}

export function pointInPolygon(pts: readonly Pt[], x: number, y: number) {
  let inside = false
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const a = pts[i]!
    const b = pts[j]!
    const hit = a.y > y !== b.y > y && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x
    if (hit) inside = !inside
  }
  return inside
}

export function polygonArea(pts: readonly Pt[]) {
  let a = 0
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i]!
    const q = pts[(i + 1) % pts.length]!
    a += p.x * q.y - q.x * p.y
  }
  return a / 2
}

/** Move vertices inward so neighbouring tiles leave a transparent seam. */
export function insetPolygon(pts: readonly Pt[], dist: number): Pt[] {
  const n = pts.length
  const ccw = polygonArea(pts) > 0
  const out: Pt[] = []
  for (let i = 0; i < n; i++) {
    const prev = pts[(i + n - 1) % n]!
    const cur = pts[i]!
    const next = pts[(i + 1) % n]!
    const e0x = cur.x - prev.x
    const e0y = cur.y - prev.y
    const e1x = next.x - cur.x
    const e1y = next.y - cur.y
    const l0 = Math.hypot(e0x, e0y) || 1
    const l1 = Math.hypot(e1x, e1y) || 1
    const n0x = ccw ? -e0y / l0 : e0y / l0
    const n0y = ccw ? e0x / l0 : -e0x / l0
    const n1x = ccw ? -e1y / l1 : e1y / l1
    const n1y = ccw ? e1x / l1 : -e1x / l1
    const bx = n0x + n1x
    const by = n0y + n1y
    const bl = Math.hypot(bx, by) || 1
    const ux = bx / bl
    const uy = by / bl
    const miter = dist / Math.max(0.28, n0x * ux + n0y * uy)
    out.push({ x: cur.x + ux * miter, y: cur.y + uy * miter })
  }
  return out
}

export function pointsAttr(pts: readonly Pt[]) {
  return pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')
}

/** Internal seams only — same artboard width on every cut. */
export function mosaicSeamPath() {
  const p = (x: number, y: number) => {
    const { x: px, y: py } = mosaicPct(x, y)
    return `${px} ${py}`
  }
  const x = MOSAIC_SPLIT_X
  return [
    `M ${p(x, 0)} L ${p(x, 100)}`,
    `M ${p(0, MOSAIC_BASE_Y)} L ${p(100, MOSAIC_BASE_Y)}`,
    `M ${p(0, MOSAIC_LEFT_Y)} L ${p(x, MOSAIC_PEAK_Y)}`,
    `M ${p(x, MOSAIC_PEAK_Y)} L ${p(100, MOSAIC_RIGHT_Y)}`,
  ].join(' ')
}

export function mosaicTiles(): { points: string }[] {
  return rawMosaicPolygons().map((raw) => ({ points: pointsAttr(raw) }))
}
