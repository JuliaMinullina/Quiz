import { describe, expect, it } from 'vitest'
import { bodies } from '../content/bodies'
import { missions } from '../content/missions'
import { modes } from '../content/modes'
import { quotes } from '../content/quotes'
import { cyberSets } from '../content/quizzes/cyber'
import { neanderthalSets } from '../content/quizzes/neanderthals'
import type { Question, QuizSet } from '../content/types'

function assertSet(set: QuizSet, mixedKinds = true) {
  expect(set.questions).toHaveLength(5)
  if (mixedKinds) {
    const kinds = new Set(set.questions.map((question) => question.kind))
    expect(kinds.size).toBeGreaterThan(1)
  }
  for (const question of set.questions) {
    assertQuestion(question)
  }
}

function assertQuestion(question: Question) {
  expect(question.prompt.ru.length).toBeGreaterThan(0)
  expect(question.prompt.en.length).toBeGreaterThan(0)
  expect(question.fact.ru.length).toBeGreaterThan(0)
  expect(question.fact.en.length).toBeGreaterThan(0)
  if (
    question.kind === 'choice4' ||
    question.kind === 'odd' ||
    question.kind === 'who' ||
    question.kind === 'map'
  ) {
    expect(question.options).toHaveLength(4)
    expect(question.options.filter((option) => option.correct)).toHaveLength(1)
  }
  if (question.kind === 'match') {
    expect(question.pairs).toHaveLength(4)
  }
  if (question.kind === 'order') {
    expect(question.items).toHaveLength(4)
  }
}

describe('content', () => {
  it('has ten missions of five questions and ten bodies and quotes', () => {
    expect(missions).toHaveLength(10)
    expect(bodies).toHaveLength(10)
    expect(quotes).toHaveLength(10)
    for (const mission of missions) {
      expect(mission.questions).toHaveLength(5)
    }
  })

  it('has four modes and quiz decks of four sets', () => {
    expect(modes.map((mode) => mode.id)).toEqual(['russia', 'neanderthal', 'teacher', 'cyber'])
    expect(neanderthalSets).toHaveLength(4)
    expect(cyberSets).toHaveLength(4)
    for (const set of cyberSets) {
      assertSet(set)
    }
    for (const set of neanderthalSets) {
      assertSet(set, false)
      let truths = 0
      for (const question of set.questions) {
        expect(question.kind).toBe('trueFalse')
        if (question.kind !== 'trueFalse') continue
        expect(question.pair).toBe('truthMyth')
        if (question.correctIsTrue) truths += 1
      }
      expect(truths).toBeGreaterThan(0)
      expect(truths).toBeLessThan(5)
    }
  })

  it('does not print years on order cards', () => {
    const yearHint = /\(\s*~?\d{3,4}/
    const orderQuestions = [...missions, ...neanderthalSets, ...cyberSets].flatMap((set) =>
      set.questions.filter((question) => question.kind === 'order'),
    )
    expect(orderQuestions.length).toBeGreaterThanOrEqual(2)
    for (const question of orderQuestions) {
      for (const item of question.items) {
        expect(item.label.ru, item.label.ru).not.toMatch(yearHint)
        expect(item.label.en, item.label.en).not.toMatch(yearHint)
      }
    }
  })
})
