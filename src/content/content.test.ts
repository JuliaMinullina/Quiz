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

  it('does not print years on order cards', () => {
    const yearHint = /\(\s*~?\d{3,4}/
    const orderQuestions = missions.flatMap((mission) =>
      mission.questions.filter((question) => question.kind === 'order'),
    )
    expect(orderQuestions).toHaveLength(2)
    for (const question of orderQuestions) {
      for (const item of question.items) {
        expect(item.label.ru, item.label.ru).not.toMatch(yearHint)
        expect(item.label.en, item.label.en).not.toMatch(yearHint)
      }
    }
  })
})
