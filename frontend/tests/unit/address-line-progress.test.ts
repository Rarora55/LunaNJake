import { describe, expect, it } from 'vitest'
import { createLineState, updateLineProgress } from '../../src/features/addressTimeline/lineState'

describe('address line progress', () => {
  it('clamps progress between 0 and 1', () => {
    const base = createLineState()
    expect(updateLineProgress(base, -2).progress).toBe(0)
    expect(updateLineProgress(base, 2).progress).toBe(1)
    expect(updateLineProgress(base, 0.4).progress).toBe(0.4)
  })
})
