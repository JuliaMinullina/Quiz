import { describe, expect, it } from 'vitest'
import { createDeck } from './deck'

function memoryStorage(): Storage {
  const map = new Map<string, string>()
  return {
    get length() {
      return map.size
    },
    clear() {
      map.clear()
    },
    getItem(key: string) {
      return map.get(key) ?? null
    },
    key(index: number) {
      return [...map.keys()][index] ?? null
    },
    removeItem(key: string) {
      map.delete(key)
    },
    setItem(key: string, value: string) {
      map.set(key, value)
    },
  }
}

describe('createDeck', () => {
  const ids = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

  it('does not repeat until the full circle is shown', () => {
    const deck = createDeck(ids, { key: 't', storage: memoryStorage(), random: () => 0 })
    const first = Array.from({ length: 10 }, () => deck.draw())
    expect(new Set(first).size).toBe(10)
    expect(first).toEqual(ids)
  })

  it('reshuffles after a full circle', () => {
    let n = 0
    const deck = createDeck(ids, {
      key: 't',
      storage: memoryStorage(),
      random: () => {
        n += 1
        return n % 2 === 0 ? 0.9 : 0.1
      },
    })
    const first = Array.from({ length: 10 }, () => deck.draw())
    expect(new Set(first).size).toBe(10)
    const eleventh = deck.draw()
    expect(ids).toContain(eleventh)
    const rest = Array.from({ length: 9 }, () => deck.draw())
    const second = [eleventh, ...rest]
    expect(new Set(second).size).toBe(10)
  })

  it('keeps mission and quote decks independent', () => {
    const storage = memoryStorage()
    const missions = createDeck(['m1', 'm2'], { key: 'missions', storage, random: () => 0 })
    const quotes = createDeck(['q1', 'q2'], { key: 'quotes', storage, random: () => 0 })
    expect(missions.draw()).toBe('m1')
    expect(quotes.draw()).toBe('q1')
    expect(missions.shown()).toEqual(['m1'])
    expect(quotes.shown()).toEqual(['q1'])
  })

  it('keeps body, mission and extra quiz decks independent', () => {
    const storage = memoryStorage()
    const bodies = createDeck(['kedra', 'alta'], { key: 'orbita-rossii:bodies', storage, random: () => 0 })
    const russia = createDeck(['poehali', 'chaika'], {
      key: 'orbita-rossii:missions',
      storage,
      random: () => 0,
    })
    const neo = createDeck(['neo-finds', 'neo-craft'], {
      key: 'orbita-rossii:neanderthals',
      storage,
      random: () => 0,
    })
    expect(bodies.draw()).toBe('kedra')
    expect(russia.draw()).toBe('poehali')
    expect(neo.draw()).toBe('neo-finds')
    expect(bodies.shown()).toEqual(['kedra'])
    expect(russia.shown()).toEqual(['poehali'])
    expect(neo.shown()).toEqual(['neo-finds'])
  })
})
