import { missionById, MISSION_IDS } from './missions'
import type { QuizModeId, QuizSet } from './types'
import { cyberSetById, CYBER_SET_IDS } from './quizzes/cyber'
import { neanderthalSetById, NEANDERTHAL_SET_IDS } from './quizzes/neanderthals'

export function setIdsFor(modeId: QuizModeId): readonly string[] {
  if (modeId === 'russia') return MISSION_IDS
  if (modeId === 'neanderthal') return NEANDERTHAL_SET_IDS
  return CYBER_SET_IDS
}

export function quizSetById(modeId: QuizModeId, setId: string): QuizSet {
  if (modeId === 'russia') return missionById(setId)
  if (modeId === 'neanderthal') return neanderthalSetById(setId)
  return cyberSetById(setId)
}
