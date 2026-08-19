import { describe, expect, it } from 'vitest'
import { BODY_RENDER_VMIN, bodyPose, bodyTransform } from './bodyMotion'
import { HOME_LAYOUT } from './layout'

describe('bodyPose', () => {
  const slot = HOME_LAYOUT.oborot

  it('keeps constellation bodies at rest on their slots', () => {
    const p = bodyPose('constellation', slot, false, null)
    expect(p).toEqual({
      x: 0,
      y: 0,
      scale: slot.size / BODY_RENDER_VMIN,
      opacity: 1,
    })
  })

  it('hides the selected body once questions are on screen', () => {
    const p = bodyPose('ask', slot, true, 'oborot')
    expect(p.opacity).toBe(0)
  })

  it('does not park a miniature away from the zoom pose', () => {
    const zoom = bodyPose('zoom', slot, true, 'oborot')
    const ask = bodyPose('ask', slot, true, 'oborot')
    expect(ask.x).toBe(zoom.x)
    expect(ask.y).toBe(zoom.y)
    expect(ask.scale).toBe(zoom.scale)
    expect(ask.opacity).toBe(0)
    expect(ask.x).not.toBe(82 - slot.x)
  })
})

describe('bodyTransform', () => {
  it('keeps travel in stage container units so Motion cannot eat centering', () => {
    expect(bodyTransform({ x: 0, y: 0, scale: 0.25 })).toBe(
      'translate3d(0cqw, 0cqh, 0) scale(0.25)',
    )
  })
})
