import { describe, expect, it } from 'vitest'
import { hitByPoint, isTap, pairCurve } from './geometry'

describe('geometry', () => {
  it('builds a cubic curve from left node to right node', () => {
    expect(pairCurve(0, 10, 200, 40)).toContain('M 0.0 10.0 C')
    expect(pairCurve(0, 10, 200, 40)).toContain('200.0 40.0')
  })

  it('treats small movement as a tap', () => {
    expect(isTap(3, 4)).toBe(true)
    expect(isTap(40, 0)).toBe(false)
  })

  it('hits the smallest containing rect', () => {
    const a = { id: 'a', rect: { left: 0, top: 0, right: 100, bottom: 100, width: 100, height: 100 } }
    const b = { id: 'b', rect: { left: 10, top: 10, right: 30, bottom: 30, width: 20, height: 20 } }
    expect(hitByPoint(15, 15, [a, b])).toBe('b')
    expect(hitByPoint(400, 400, [a, b])).toBeNull()
  })
})
