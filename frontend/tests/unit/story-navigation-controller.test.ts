import { describe, expect, it } from 'vitest'
import { canTriggerNavigation, resolveStoryNavigation } from '../../src/features/story/navigationController'

describe('story navigation controller bounds and gating', () => {
  it('enforces one-step cooldown acceptance window', () => {
    expect(canTriggerNavigation(700, 0)).toBe(true)
    expect(canTriggerNavigation(699, 0)).toBe(false)
  })

  it('keeps backward clamp at first step and handoff from last step', () => {
    expect(resolveStoryNavigation('en', 'the-first-time', 'backward').nextPath).toBe('/en/intro')
    expect(resolveStoryNavigation('en', 'she-was-not-wrong', 'forward').nextPath).toBe('/en/married')
  })
})
