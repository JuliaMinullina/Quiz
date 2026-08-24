import { describe, expect, it } from 'vitest'
import logoSvg from '../../logo.svg?raw'
import {
  MOSAIC_BASE_Y,
  MOSAIC_GAP,
  MOSAIC_HERO,
  MOSAIC_PEAK_Y,
  MOSAIC_SPLIT_X,
  SIGN,
  SIGN_CORNER,
  SIGN_SLOPE,
  insetPolygon,
  mosaicPct,
  mosaicSeamPath,
  pointInPolygon,
  polygonArea,
  rawMosaicPolygons,
  signPath,
} from './brand'

describe('sign geometry', () => {
  it('matches the logo file in the project root', () => {
    expect(logoSvg).toContain(SIGN.path)
    expect(logoSvg).toContain(`viewBox="0 0 ${SIGN.width} ${SIGN.height}"`)
  })

  it('puts the waist on the vertical centre', () => {
    expect(SIGN.waistY).toBe(SIGN.height / 2)
    expect(SIGN.waistLeft).toBeGreaterThan(0)
    expect(SIGN.waistRight).toBeLessThan(SIGN.width)
    expect(SIGN.waistRight - SIGN.waistLeft).toBeLessThan(SIGN.width / 2)
  })

  it('uses the guidebook corner ratio of 1/8', () => {
    expect(SIGN_CORNER).toBeCloseTo(1 / 8)
    expect(SIGN_SLOPE).toBeCloseTo(SIGN.waistY / SIGN.waistLeft, 5)
  })

  it('builds closed trapezoids from the waist', () => {
    expect(signPath('top')).toContain(`H${SIGN.waistLeft}Z`)
    expect(signPath('bottom')).toContain(`H0Z`)
    expect(signPath()).toBe(SIGN.path)
  })
})

describe('brand mosaic', () => {
  it('insets a square toward the centre', () => {
    const square = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
    ]
    const inner = insetPolygon(square, 10)
    expect(inner[0]!.x).toBeCloseTo(10, 5)
    expect(inner[0]!.y).toBeCloseTo(10, 5)
    expect(Math.abs(polygonArea(inner))).toBeLessThan(Math.abs(polygonArea(square)))
  })

  it('follows the six-block guidebook crop', () => {
    const raw = rawMosaicPolygons()
    expect(raw).toHaveLength(6)
    expect(MOSAIC_SPLIT_X).toBe(67)
    const aspects = raw.map((pts) => {
      expect(pts.length).toBe(4)
      const xs = pts.map((p) => p.x)
      const ys = pts.map((p) => p.y)
      const w = Math.max(...xs) - Math.min(...xs)
      const h = Math.max(...ys) - Math.min(...ys)
      expect(Math.abs(polygonArea(pts))).toBeGreaterThan(40_000)
      return w / h
    })
    expect(Math.max(...aspects) / Math.min(...aspects)).toBeGreaterThan(1.5)
  })

  it('keeps the planet inside the large middle-left tile', () => {
    const hits = rawMosaicPolygons().filter((pts) => pointInPolygon(pts, MOSAIC_HERO.x, MOSAIC_HERO.y))
    expect(hits).toHaveLength(1)
    expect(Math.abs(polygonArea(hits[0]!))).toBeGreaterThan(150_000)
  })

  it('cuts all seams with one pixel width', () => {
    expect(MOSAIC_GAP).toBeGreaterThan(0)
    const d = mosaicSeamPath()
    const v = mosaicPct(MOSAIC_SPLIT_X, 0)
    const base = mosaicPct(0, MOSAIC_BASE_Y)
    expect(d).toContain(`M ${v.x} ${v.y}`)
    expect(d).toContain(`M ${base.x} ${base.y}`)
    expect(d).toContain(`L ${mosaicPct(MOSAIC_SPLIT_X, MOSAIC_PEAK_Y).x} ${mosaicPct(MOSAIC_SPLIT_X, MOSAIC_PEAK_Y).y}`)
  })
})
