import { BODY_IDS } from '../content/bodies'
import { setIdsFor } from '../content/quizSets'
import { QUOTE_IDS } from '../content/quotes'
import { TEACHER_SET_IDS } from '../content/quizzes/teacher'
import type { BodyId, QuizModeId } from '../content/types'
import { createDeck, MISSION_DECK_KEY, QUOTE_DECK_KEY } from './deck'

export const BODY_DECK_KEY = 'orbita-rossii:bodies'
export const NEANDERTHAL_DECK_KEY = 'orbita-rossii:neanderthals'
export const CYBER_DECK_KEY = 'orbita-rossii:cyber'
export const TEACHER_DECK_KEY = 'orbita-rossii:teacher'

const SET_DECK_KEY: Record<QuizModeId, string> = {
  russia: MISSION_DECK_KEY,
  neanderthal: NEANDERTHAL_DECK_KEY,
  cyber: CYBER_DECK_KEY,
}

export function storage(): Storage | undefined {
  try {
    return window.localStorage
  } catch {
    return undefined
  }
}

export function drawSetId(modeId: QuizModeId) {
  return createDeck(setIdsFor(modeId), { key: SET_DECK_KEY[modeId], storage: storage() }).draw()
}

export function drawBodyId(): BodyId {
  return createDeck(BODY_IDS, { key: BODY_DECK_KEY, storage: storage() }).draw() as BodyId
}

export function drawQuoteId() {
  return createDeck(QUOTE_IDS, { key: QUOTE_DECK_KEY, storage: storage() }).draw()
}

export function drawTeacherSetId() {
  return createDeck(TEACHER_SET_IDS, { key: TEACHER_DECK_KEY, storage: storage() }).draw()
}
