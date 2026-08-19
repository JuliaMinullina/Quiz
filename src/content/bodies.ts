import type { CelestialBody } from './types'

export const bodies: readonly CelestialBody[] = [
  {
    id: 'kedra',
    missionId: 'poehali',
    name: { ru: 'Кедра', en: 'Kedra' },
    variant: 'kedra',
  },
  {
    id: 'alta',
    missionId: 'chaika',
    name: { ru: 'Альта', en: 'Alta' },
    variant: 'alta',
  },
  {
    id: 'kolybel',
    missionId: 'kolybel-razuma',
    name: { ru: 'Колыбель', en: 'Kolybel' },
    variant: 'kolybel',
  },
  {
    id: 'selena',
    missionId: 'lunnaya',
    name: { ru: 'Селена', en: 'Selena' },
    variant: 'selena',
  },
  {
    id: 'efir',
    missionId: 'dvenadcat',
    name: { ru: 'Эфир', en: 'Efir' },
    variant: 'efir',
  },
  {
    id: 'mira',
    missionId: 'mir',
    name: { ru: 'Мира', en: 'Mira' },
    variant: 'mira',
  },
  {
    id: 'par',
    missionId: 'ekipazh',
    name: { ru: 'Пар', en: 'Par' },
    variant: 'par',
  },
  {
    id: 'oborot',
    missionId: 'polusharie',
    name: { ru: 'Оборот', en: 'Oborot' },
    variant: 'oborot',
  },
  {
    id: 'polar',
    missionId: 'siyanie',
    name: { ru: 'Поляр', en: 'Polyar' },
    variant: 'polar',
  },
  {
    id: 'vual',
    missionId: 'sosedka',
    name: { ru: 'Вуаль', en: 'Vual' },
    variant: 'vual',
  },
] as const

export const BODY_IDS = bodies.map((b) => b.id)

export function bodyById(id: string) {
  const found = bodies.find((b) => b.id === id)
  if (!found) throw new Error(`Unknown body: ${id}`)
  return found
}

export function bodyByMission(missionId: string) {
  const found = bodies.find((b) => b.missionId === missionId)
  if (!found) throw new Error(`Unknown mission body: ${missionId}`)
  return found
}
