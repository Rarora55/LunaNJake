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
  const progressRef = useRef(0)
  const touchStartY = useRef<number | null>(null)
  const touchLastY = useRef<number | null>(null)
  const lastNavMs = useRef(0)
  const isMobile = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(max-width: 768px)').matches
    : false

  const reveal = TRANSITION_PHASES[1]
  const lineGrowth = TRANSITION_PHASES[2]
  const revealP = phaseProgress(progress, reveal)
  const lineP = phaseProgress(progress, lineGrowth)

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
    const prev = progressRef.current
    if (allowNavigate && delta < 0 && prev <= 0.01) {
      tryNavigate('backward')
      return
    }
    if (allowNavigate && delta > 0 && prev >= 0.99) {
      tryNavigate('forward')
      return
    }
    const next = clamp(prev + delta)
    progressRef.current = next
    setProgress(next)
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
      className="address-scene"
      data-testid={testId ?? 'address-intro-page'}
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
