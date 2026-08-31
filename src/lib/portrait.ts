import type { TeacherPortraitId } from '../content/types'

export function resolvePortrait(picks: readonly TeacherPortraitId[]): TeacherPortraitId {
  if (picks.length === 0) {
    throw new Error('Cannot resolve a portrait without picks')
  }

  const counts = new Map<TeacherPortraitId, number>()
  for (const id of picks) {
    counts.set(id, (counts.get(id) ?? 0) + 1)
  }

  const max = Math.max(...counts.values())
  for (let index = picks.length - 1; index >= 0; index -= 1) {
    const id = picks[index]
    if (id && counts.get(id) === max) return id
  }

  return picks[picks.length - 1]!
}
