import { describe, expect, it } from 'vitest'
import { FIRST_STORY_SLUG, STORY_SEQUENCE, STORY_SLUGS, validateStorySequenceShape } from '../../src/config/storySequence'
import { FORWARD_KEYS, BACKWARD_KEYS, STORY_COOLDOWN_MS } from '../../src/config/storyInputs'

describe('story config', () => {
  it('has exactly 6 ordered entries', () => {
    expect(STORY_SEQUENCE).toHaveLength(6)
    expect(FIRST_STORY_SLUG).toBe('the-first-time')
    expect(STORY_SLUGS[STORY_SLUGS.length - 1]).toBe('she-was-not-wrong')
  })

  it('contains required fields and consistent links', () => {
    expect(validateStorySequenceShape()).toEqual([])
  })

  it('enforces cooldown and strict key lists', () => {
    expect(STORY_COOLDOWN_MS).toBe(700)
    expect(FORWARD_KEYS).toEqual(['ArrowDown', 'PageDown', ' '])
    expect(BACKWARD_KEYS).toEqual(['ArrowUp', 'PageUp'])
  })
})
