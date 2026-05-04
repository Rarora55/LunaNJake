import { describe, expect, it } from 'vitest'
import { STORY_VISUAL_TOKENS, TEMPORARY_VISUAL_MODE } from '../../src/features/story/visualTokens'
import { STORY_SEQUENCE } from '../../src/config/storySequence'

describe('visual tokens', () => {
  it('marks temporary visual mode', () => {
    expect(TEMPORARY_VISUAL_MODE).toBe(true)
  })

  it('keeps visual token palette available for active temporary steps', () => {
    expect(Object.keys(STORY_VISUAL_TOKENS)).toHaveLength(10)
    expect(STORY_SEQUENCE).toHaveLength(8)
  })
})
