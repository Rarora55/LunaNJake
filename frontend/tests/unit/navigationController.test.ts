import { describe, expect, it } from 'vitest'
import { canTriggerNavigation, resolveDirectionFromKey, resolveDirectionFromWheel, resolveStoryNavigation } from '../../src/features/story/navigationController'

describe('navigation controller', () => {
  it('resolves directions from key and wheel', () => {
    expect(resolveDirectionFromKey('ArrowDown')).toBe('forward')
    expect(resolveDirectionFromKey('PageUp')).toBe('backward')
    expect(resolveDirectionFromKey('Enter')).toBeNull()
    expect(resolveDirectionFromWheel(10)).toBe('forward')
    expect(resolveDirectionFromWheel(-10)).toBe('backward')
  })

  it('enforces 700ms cooldown windows', () => {
    expect(canTriggerNavigation(700, 0)).toBe(true)
    expect(canTriggerNavigation(699, 0)).toBe(false)
  })

  it('clamps first step and hands off from she-was-not-wrong', () => {
    expect(resolveStoryNavigation('en', 'the-first-time', 'backward').nextPath).toBe('/en/story/the-first-time')
    expect(resolveStoryNavigation('it', 'she-was-not-wrong', 'forward').nextPath).toBe('/it/married')
  })
})

