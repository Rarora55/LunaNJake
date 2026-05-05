import { describe, expect, it } from 'vitest'
import { STORY_SEQUENCE, STORY_SLUGS, validateStorySequenceShape } from '../../src/config/storySequence'

describe('story sequence config', () => {
  it('has 6 story steps in order', () => {
    expect(STORY_SEQUENCE).toHaveLength(6)
    expect(STORY_SLUGS).toEqual([
      'the-first-time',
      'it-was-10-am',
      'facing-the-morning',
      'ready-wall-of-shame',
      'your-new-flatmate',
      'she-was-not-wrong',
    ])
  })

  it('passes shape validation including translation keys and highlight mode', () => {
    expect(validateStorySequenceShape()).toEqual([])
  })
})
