import { useRef, useState, type KeyboardEvent, type WheelEvent } from 'react'
import { Link } from 'react-router-dom'
import type { Lang } from '../../config/storySequence'
import { clamp, easeInOutSine, mapRange } from '../addressTimeline/progressMath'
import './AreYouComingScene.css'

type Props = {
  lang: Lang
  onNavigateBackward: () => void
  onNavigateForward: () => void
  testId?: string
}

export default function AreYouComingScene({ lang, onNavigateBackward, onNavigateForward, testId }: Props) {
  const [progress, setProgress] = useState(0)
  const touchStartY = useRef<number | null>(null)
  const touchLastY = useRef<number | null>(null)
  const lastNavMs = useRef(0)
  const isMobile = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(max-width: 768px)').matches
    : false
  const finalReveal = easeInOutSine(mapRange(progress, 0.72, 0.96))
  const tryNavigate = (direction: 'backward' | 'forward') => {
    const now = Date.now()
    const cooldown = isMobile ? 360 : 520
    if (now - lastNavMs.current < cooldown) return false
    lastNavMs.current = now
    if (direction === 'backward') onNavigateBackward()
    else onNavigateForward()
    return true
  }

  const updateProgress = (delta: number, allowNavigate = true) => {
    setProgress((prev) => {
      const next = clamp(prev + delta)
      if (allowNavigate && delta < 0 && prev <= 0.01) {
        tryNavigate('backward')
        return prev
      }
      if (allowNavigate && delta > 0 && prev >= 0.99) {
        tryNavigate('forward')
        return prev
      }
      return next
    })
  }

  const onWheel = (event: WheelEvent<HTMLElement>) => {
    event.preventDefault()
    const scale = isMobile ? 0.0026 : 0.0015
    const cap = isMobile ? 0.14 : 0.1
    updateProgress(clamp(event.deltaY * scale, -cap, cap))
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
      className="are-coming-scene"
      data-testid={testId ?? 'are-you-coming-page'}
      onWheel={onWheel}
      onKeyDown={onKeyDown}
      onTouchStart={(event) => {
        const y = event.changedTouches[0]?.clientY ?? null
        touchStartY.current = y
        touchLastY.current = y
      }}
      onTouchMove={(event) => {
        const current = event.changedTouches[0]?.clientY
        const last = touchLastY.current
        if (typeof current !== 'number' || last === null) return
        const delta = last - current
        touchLastY.current = current
        if (Math.abs(delta) < 1.5) return
        updateProgress(clamp(delta * (isMobile ? 0.0044 : 0.003), -0.08, 0.08), false)
      }}
      onTouchEnd={(event) => {
        const start = touchStartY.current
        const end = event.changedTouches[0]?.clientY
        touchStartY.current = null
        touchLastY.current = null
        if (start === null || typeof end !== 'number') return
        const delta = start - end
        if (Math.abs(delta) < (isMobile ? 10 : 16)) return
        updateProgress(clamp(delta * (isMobile ? 0.0032 : 0.0024), -0.12, 0.12))
      }}
      tabIndex={0}
    >
      <section className="are-coming-content">
        <div
          className="are-coming-rsvp-card-wrap"
          style={{
            opacity: clamp(0.25 + finalReveal * 0.75),
            transform: `translateY(${(1 - finalReveal) * 10}px)`,
          }}
        >
          <img className="are-coming-photo" src="/images/End/foto.jpeg" alt="Luna and Jake" />
          <Link className="are-coming-rsvp-card" to={`/${lang}/rsvp`} state={{ fromRsvpCta: true }} aria-label="Open RSVP form">
            <img className="are-coming-rsvp-peach default" src="/images/End/PeachSleep.png" alt="" aria-hidden="true" />
            <img className="are-coming-rsvp-peach hover" src="/images/End/PeachSleep2.png" alt="" aria-hidden="true" />
            <img className="are-coming-rsvp-card-image default" src="/images/End/FormNoHover.png" alt="" aria-hidden="true" />
            <img className="are-coming-rsvp-card-image hover" src="/images/End/FormHoover.png" alt="Open RSVP form" />
          </Link>
        </div>
      </section>
    </main>
  )
}
