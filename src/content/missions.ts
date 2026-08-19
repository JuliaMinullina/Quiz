import type { Mission } from './types'
import {
  missionChaika,
  missionDvenadcat,
  missionKolybel,
  missionLunnaya,
  missionPoehali,
} from './missions/group-a'
import {
  missionEkipazh,
  missionMir,
  missionPolusharie,
  missionSiyanie,
  missionSosedka,
} from './missions/group-b'

export const missions: readonly Mission[] = [
  missionPoehali,
  missionChaika,
  missionKolybel,
  missionLunnaya,
  missionDvenadcat,
  missionMir,
  missionEkipazh,
  missionPolusharie,
  missionSiyanie,
  missionSosedka,
]

export const MISSION_IDS = missions.map((m) => m.id)

export function missionById(id: string) {
  const found = missions.find((m) => m.id === id)
  if (!found) throw new Error(`Unknown mission: ${id}`)
  return found
}
