import { describe, expect, it } from 'vitest'
import { HIGHLIGHT_FADE_MS, STEP_TRANSITION_MS, TYPEWRITER_CHAR_MS } from '../../src/features/story/transitions'

describe('story transition presets', () => {
  it('keeps transitions snappy and deterministic', () => {
    expect(STEP_TRANSITION_MS).toBeGreaterThanOrEqual(350)
    expect(STEP_TRANSITION_MS).toBeLessThanOrEqual(550)
    expect(HIGHLIGHT_FADE_MS).toBeGreaterThan(0)
    expect(TYPEWRITER_CHAR_MS).toBeGreaterThan(0)
  })
})

