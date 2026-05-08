import { useRef, useState, type KeyboardEvent, type WheelEvent } from 'react'
import type { Lang } from '../../config/storySequence'
import { getAddressText } from '../../i18n/storyText'
import { clamp, phaseProgress } from './progressMath'
import { TRANSITION_PHASES } from './transitionPhases'
import './AddressTimelineScene.css'

type Props = {
  lang: Lang
  onNavigateBackward: () => void
  onNavigateForward: () => void
  testId?: string
}

export default function AddressIntroScene({ lang, onNavigateBackward, onNavigateForward, testId }: Props) {
  const [progress, setProgress] = useState(0)
  const touchStartY = useRef<number | null>(null)

  const reveal = TRANSITION_PHASES[1]
  const lineGrowth = TRANSITION_PHASES[2]
  const revealP = phaseProgress(progress, reveal)
  const lineP = phaseProgress(progress, lineGrowth)

  const updateProgress = (delta: number) => {
    setProgress((prev) => {
      const next = clamp(prev + delta)
      if (delta < 0 && prev <= 0.01) onNavigateBackward()
      if (delta > 0 && prev >= 0.99) onNavigateForward()
      return next
    })
  }

  const onWheel = (event: WheelEvent<HTMLElement>) => {
    event.preventDefault()
    updateProgress(clamp(event.deltaY * 0.0015, -0.1, 0.1))
  }

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      event.preventDefault()
      updateProgress(0.08)
    }
    if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault()
      updateProgress(-0.08)
    }
  }

  return (
    <main
      className="address-scene"
      data-testid={testId ?? 'address-intro-page'}
      onWheel={onWheel}
      onKeyDown={onKeyDown}
      onTouchStart={(event) => {
        touchStartY.current = event.changedTouches[0]?.clientY ?? null
      }}
      onTouchEnd={(event) => {
        const start = touchStartY.current
        const end = event.changedTouches[0]?.clientY
        touchStartY.current = null
        if (start === null || typeof end !== 'number') return
        const delta = start - end
        if (Math.abs(delta) < 16) return
        updateProgress(clamp(delta * 0.0024, -0.12, 0.12))
      }}
      tabIndex={0}
    >
      <section className="address-reveal" style={{ opacity: revealP }}>
        <img className="casa-image" src="/images/TimeLine/CasaBoda.png" alt="Pelham House" />
        <p>{getAddressText(lang)}</p>
      </section>

      <section className="timeline-shell intro-only" style={{ opacity: revealP }}>
        <div className="timeline-line" style={{ transform: `scaleY(${lineP})` }} />
      </section>
    </main>
  )
}
