import { describe, expect, it } from 'vitest'
import { missions } from '../content/missions'
import { quotes } from '../content/quotes'
import { bodies } from '../content/bodies'

describe('content', () => {
  it('has ten missions of five questions and ten bodies and quotes', () => {
    expect(missions).toHaveLength(10)
    expect(bodies).toHaveLength(10)
    expect(quotes).toHaveLength(10)
    for (const mission of missions) {
      expect(mission.questions).toHaveLength(5)
      expect(bodies.some((b) => b.id === mission.bodyId)).toBe(true)
    }
  })
})
