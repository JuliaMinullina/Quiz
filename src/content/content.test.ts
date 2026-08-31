import { describe, expect, it } from 'vitest'
import { bodies } from '../content/bodies'
import { missions } from '../content/missions'
import { modes } from '../content/modes'
import { quotes } from '../content/quotes'
import { portraits, PORTRAIT_IDS } from '../content/portraits'
import { cyberSets } from '../content/quizzes/cyber'
import { neanderthalSets } from '../content/quizzes/neanderthals'
import { teacherSets } from '../content/quizzes/teacher'
import type { Question, QuizSet, TeacherPortraitId } from '../content/types'

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

  it('has four teacher sets of five situations and balanced portraits', () => {
    expect(modes.find((mode) => mode.id === 'teacher')?.kind).toBe('portrait')
    expect(portraits.map((portrait) => portrait.id)).toEqual([...PORTRAIT_IDS])
    for (const portrait of portraits) {
      expect(portrait.name.ru.length).toBeGreaterThan(0)
      expect(portrait.name.en.length).toBeGreaterThan(0)
      expect(portrait.text.ru.length).toBeGreaterThan(0)
      expect(portrait.text.en.length).toBeGreaterThan(0)
    }
    expect(portraits.find((portrait) => portrait.id === 'personal')?.name.ru).toContain('персонализац')
    expect(teacherSets).toHaveLength(4)
    for (const set of teacherSets) {
      expect(set.questions).toHaveLength(5)
      const counts: Record<TeacherPortraitId, number> = {
        task: 0,
        ethos: 0,
        personal: 0,
        community: 0,
        subject: 0,
      }
      for (const question of set.questions) {
        expect(question.kind).toBe('situation')
        expect(question.prompt.ru.length).toBeGreaterThan(0)
        expect(question.prompt.en.length).toBeGreaterThan(0)
        expect(question.options).toHaveLength(4)
        const ids = new Set(question.options.map((option) => option.id))
        expect(ids.size).toBe(4)
        for (const option of question.options) {
          expect(option.label.ru.length).toBeGreaterThan(0)
          expect(option.label.en.length).toBeGreaterThan(0)
          expect(option.fact.ru.length).toBeGreaterThan(0)
          expect(option.fact.en.length).toBeGreaterThan(0)
          expect(option.id).toBe(option.portraitId)
          counts[option.portraitId] += 1
        }
      }
      for (const id of PORTRAIT_IDS) {
        expect(counts[id], `${set.id} ${id}`).toBe(4)
      }
    }
  })

  it('keeps teacher copy concrete and free of method-speak', () => {
    const banned = [
      /проект уходит далеко от учебника/i,
      /новый шаг/i,
      /способ ещё не держится/i,
      /мера помощи/i,
      /картин[ае] науки/i,
      /собрать как задачу/i,
    ]
    const blobs = teacherSets.flatMap((set) =>
      set.questions.flatMap((question) => [
        question.prompt.ru,
        ...question.options.flatMap((option) => [option.label.ru, option.fact.ru]),
      ]),
    )
    for (const text of blobs) {
      for (const pattern of banned) {
        expect(text, text).not.toMatch(pattern)
      }
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
