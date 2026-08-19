export function createDeck(
  ids: readonly string[],
  options: { key: string; storage?: Storage; random?: () => number },
) {
  const storage = options.storage
  const random = options.random ?? Math.random
  const key = options.key

  function readShown(): string[] {
    if (!storage) return []
    try {
      const raw = storage.getItem(key)
      if (!raw) return []
      const parsed: unknown = JSON.parse(raw)
      if (!Array.isArray(parsed)) return []
      return parsed.filter((id): id is string => typeof id === 'string' && ids.includes(id))
    } catch {
      return []
    }
  }

  function writeShown(shown: string[]) {
    storage?.setItem(key, JSON.stringify(shown))
  }

  function remaining(shown: string[]) {
    return ids.filter((id) => !shown.includes(id))
  }

  function pick(pool: readonly string[]) {
    return pool[Math.floor(random() * pool.length)] ?? pool[0]
  }

  return {
    shown(): string[] {
      return readShown()
    },
    draw(): string {
      let shown = readShown()
      let pool = remaining(shown)
      if (pool.length === 0) {
        shown = []
        pool = [...ids]
      }
      const id = pick(pool)
      if (!id) throw new Error('Empty deck')
      shown = [...shown, id]
      writeShown(shown)
      return id
    },
    reset() {
      writeShown([])
    },
  }
}

export const MISSION_DECK_KEY = 'orbita-rossii:missions'
export const QUOTE_DECK_KEY = 'orbita-rossii:quotes'
