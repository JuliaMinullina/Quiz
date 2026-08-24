import type { CelestialBody } from './types'

export const bodies: readonly CelestialBody[] = [
  {
    id: 'kedra',
    name: { ru: 'Кедра', en: 'Kedra' },
    variant: 'kedra',
  },
  {
    id: 'alta',
    name: { ru: 'Альта', en: 'Alta' },
    variant: 'alta',
  },
  {
    id: 'kolybel',
    name: { ru: 'Колыбель', en: 'Kolybel' },
    variant: 'kolybel',
  },
  {
    id: 'selena',
    name: { ru: 'Селена', en: 'Selena' },
    variant: 'selena',
  },
  {
    id: 'efir',
    name: { ru: 'Эфир', en: 'Efir' },
    variant: 'efir',
  },
  {
    id: 'mira',
    name: { ru: 'Мира', en: 'Mira' },
    variant: 'mira',
  },
  {
    id: 'par',
    name: { ru: 'Пар', en: 'Par' },
    variant: 'par',
  },
  {
    id: 'oborot',
    name: { ru: 'Оборот', en: 'Oborot' },
    variant: 'oborot',
  },
  {
    id: 'polar',
    name: { ru: 'Поляр', en: 'Polyar' },
    variant: 'polar',
  },
  {
    id: 'vual',
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
