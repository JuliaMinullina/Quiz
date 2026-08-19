import { bodies } from '../content/bodies'
import { MISSION_IDS } from '../content/missions'
import { QUOTE_IDS } from '../content/quotes'
import { createDeck, MISSION_DECK_KEY, QUOTE_DECK_KEY } from './deck'

export function storage(): Storage | undefined {
  try {
    return window.localStorage
  } catch {
    return undefined
  }
}

export function drawMissionId() {
  return createDeck(MISSION_IDS, { key: MISSION_DECK_KEY, storage: storage() }).draw()
}

export function drawQuoteId() {
  return createDeck(QUOTE_IDS, { key: QUOTE_DECK_KEY, storage: storage() }).draw()
}

export function bodyIdForMission(missionId: string) {
  return bodies.find((b) => b.missionId === missionId)?.id ?? 'kedra'
}
