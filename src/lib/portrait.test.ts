import { describe, expect, it } from 'vitest'
import { resolvePortrait } from './portrait'

describe('resolvePortrait', () => {
  it('returns the portrait chosen most often', () => {
    expect(
      resolvePortrait(['task', 'ethos', 'task', 'personal', 'community']),
    ).toBe('task')
  })

  it('breaks a tie by the later pick among those who share the lead', () => {
    expect(
      resolvePortrait(['task', 'task', 'ethos', 'ethos', 'personal']),
    ).toBe('ethos')
  })

  it('returns a single pick as-is', () => {
    expect(resolvePortrait(['subject'])).toBe('subject')
  })

  it('throws without picks', () => {
    expect(() => resolvePortrait([])).toThrow(/without picks/)
  })
})
