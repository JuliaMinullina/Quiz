import { describe, expect, it } from 'vitest'
import { BODY_SURFACE, concentricLimbArc } from './CelestialBody'

describe('celestial body surfaces', () => {
  it('gives each body a distinct surface texture', () => {
    const surfaces = Object.values(BODY_SURFACE)
    expect(surfaces).toHaveLength(10)
    expect(new Set(surfaces).size).toBe(10)
    expect(BODY_SURFACE.kolybel).toBe('topo')
    expect(Object.entries(BODY_SURFACE).filter(([, s]) => s === 'topo')).toHaveLength(1)
  })

  it('draws Polar limb marks as circular arcs of the planet disk', () => {
    const r = 44
    const d = concentricLimbArc(r, 52)
    const m = d.match(
      /^M ([\d.-]+) ([\d.-]+) A ([\d.-]+) ([\d.-]+) 0 0 1 ([\d.-]+) ([\d.-]+)$/,
    )
    expect(m).not.toBeNull()
    const [, x1, y1, rx, ry, x2, y2] = m!
    expect(Number(rx)).toBe(r)
    expect(Number(ry)).toBe(r)
    const dist = (x: number, y: number) => Math.hypot(x - 50, y - 50)
    expect(dist(Number(x1), Number(y1))).toBeCloseTo(r, 2)
    expect(dist(Number(x2), Number(y2))).toBeCloseTo(r, 2)
    expect(Number(y1)).toBeCloseTo(Number(y2), 2)
    expect(Number(y1)).toBeLessThan(50)
  })
})
