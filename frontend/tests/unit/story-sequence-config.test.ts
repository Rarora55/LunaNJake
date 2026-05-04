import { describe, expect, it } from 'vitest'
import { STORY_SEQUENCE, STORY_SLUGS, validateStorySequenceShape } from '../../src/config/storySequence'

describe('story sequence config', () => {
  it('has 8 story steps in order', () => {
    expect(STORY_SEQUENCE).toHaveLength(8)
    expect(STORY_SLUGS).toEqual([
      'the-first-time',
      'it-was-10-am',
      'facing-the-morning',
      'flatmates',
      'ready-wall-of-shame',
      'who-are-you',
      'your-new-flatmate',
      'she-was-not-wrong',
    ])
  })

  it('passes shape validation including translation keys and highlight mode', () => {
    expect(validateStorySequenceShape()).toEqual([])
  })
})
