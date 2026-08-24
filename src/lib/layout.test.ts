import { describe, expect, it } from 'vitest'
import {
  ellipsePath,
  ellipsePoint,
  FIELD_SCALE,
  HERO,
  HOME_LAYOUT,
  ORBIT_A,
  ORBIT_B,
  ORBIT_PLACEMENTS,
  STAGE,
  stageToView,
} from './layout'

describe('stage', () => {
  it('is a 16:9 frame in height-units', () => {
    expect(STAGE.w / STAGE.h).toBeCloseTo(16 / 9, 8)
  })
})

describe('orbit tracks', () => {
  it('places the constellation on the vertical centre at 90% scale', () => {
    expect(HERO.viewY).toBe(50)
    expect(HERO.y).toBe(STAGE.h / 2)
    expect(FIELD_SCALE).toBe(0.9)
    expect(ORBIT_A.rx).toBeCloseTo(76 * FIELD_SCALE)
    expect(HOME_LAYOUT.kolybel.size).toBeCloseTo(44 * FIELD_SCALE)
  })

  it('centres both tracks on the hero', () => {
    expect(ORBIT_A.cx).toBe(HERO.x)
    expect(ORBIT_A.cy).toBe(HERO.y)
    expect(ORBIT_B.cx).toBe(HERO.x)
    expect(ORBIT_B.cy).toBe(HERO.y)
  })

  it('places every satellite body on the ellipse used to draw its track', () => {
    for (const [id, place] of Object.entries(ORBIT_PLACEMENTS)) {
      const view = stageToView(
        ellipsePoint(place.orbit.cx, place.orbit.cy, place.orbit.rx, place.orbit.ry, place.orbit.rot, place.t),
      )
      expect(HOME_LAYOUT[id as keyof typeof HOME_LAYOUT].x).toBeCloseTo(view.x, 5)
      expect(HOME_LAYOUT[id as keyof typeof HOME_LAYOUT].y).toBeCloseTo(view.y, 5)
    }
  })

  it('keeps both tracks outside the central body', () => {
    const radius = HOME_LAYOUT.kolybel.size / 2
    for (const orbit of [ORBIT_A, ORBIT_B]) {
      let min = Infinity
      for (let i = 0; i < 360; i++) {
        const p = ellipsePoint(orbit.cx, orbit.cy, orbit.rx, orbit.ry, orbit.rot, i / 360)
        min = Math.min(min, Math.hypot(p.x - HERO.x, p.y - HERO.y))
      }
      expect(min).toBeGreaterThan(radius)
    }
  })

  it('draws the track through the same points as the bodies', () => {
    const d = ellipsePath(ORBIT_A.cx, ORBIT_A.cy, ORBIT_A.rx, ORBIT_A.ry, ORBIT_A.rot)
    const p = ellipsePoint(ORBIT_A.cx, ORBIT_A.cy, ORBIT_A.rx, ORBIT_A.ry, ORBIT_A.rot, 0)
    expect(d.startsWith('M ')).toBe(true)
    expect(d).toContain(`${p.x.toFixed(3)} ${p.y.toFixed(3)}`)
    expect(d).toContain(' A ')
    expect(d.includes(' Z') || d.endsWith('Z')).toBe(false)
    expect(d.includes(' L ')).toBe(false)
  })
})
