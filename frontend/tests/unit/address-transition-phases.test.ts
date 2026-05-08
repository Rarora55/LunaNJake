import { describe, expect, it } from 'vitest'
import { TRANSITION_PHASES } from '../../src/features/addressTimeline/transitionPhases'
import { phaseProgress } from '../../src/features/addressTimeline/progressMath'

describe('address transition phases', () => {
  it('defines ordered progress windows', () => {
    expect(TRANSITION_PHASES).toHaveLength(3)
    expect(TRANSITION_PHASES[0].id).toBe('scatter-exit')
    expect(TRANSITION_PHASES[1].id).toBe('address-reveal')
    expect(TRANSITION_PHASES[2].id).toBe('line-growth')
    for (const phase of TRANSITION_PHASES) {
      expect(phase.startProgress).toBeGreaterThanOrEqual(0)
      expect(phase.endProgress).toBeLessThanOrEqual(1)
      expect(phase.endProgress).toBeGreaterThan(phase.startProgress)
    }
  })

  it('maps progress reversibly per window', () => {
    const phase = TRANSITION_PHASES[2]
    expect(phaseProgress(phase.startProgress, phase)).toBe(0)
    expect(phaseProgress(phase.endProgress, phase)).toBe(1)
    const mid = (phase.startProgress + phase.endProgress) / 2
    expect(phaseProgress(mid, phase)).toBeGreaterThan(0.4)
    expect(phaseProgress(mid, phase)).toBeLessThan(0.6)
  })
})
