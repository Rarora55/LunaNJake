import { describe, expect, it } from 'vitest'
import { getTimelineItems } from '../../src/features/addressTimeline/timelineConfig'

describe('address timeline config', () => {
  it('uses normalized reveal progress and alternating sides', () => {
    const en = getTimelineItems('en')
    expect(en).toHaveLength(3)
    expect(en.map((item) => item.cardSide)).toEqual(['right', 'left', 'right'])
    expect(en[0].revealProgress).toBeGreaterThan(0)
    expect(en[2].revealProgress).toBeLessThan(1)
    expect(en[0].revealProgress).toBeLessThan(en[1].revealProgress)
    expect(en[1].revealProgress).toBeLessThan(en[2].revealProgress)
  })
})
