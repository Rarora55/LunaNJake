import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type WheelEvent } from 'react'
import type { Lang } from '../../config/storySequence'
import { resolveLondonText } from '../../i18n/storyText'
import { applyEndLag, clamp, easeInOutSine, mapRange } from '../addressTimeline/progressMath'
import { prefersReducedMotion } from '../addressTimeline/reducedMotion'
import './TravellingFromLondonScene.css'

type Props = {
  lang: Lang
  onNavigateBackward: () => void
  onNavigateForward: () => void
  testId?: string
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="london-detail-icon" aria-hidden="true">
      <path d="M12 22c-4.2-5-7-8.4-7-12a7 7 0 1 1 14 0c0 3.6-2.8 7-7 12Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="10" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

export default function TravellingFromLondonScene({ lang, onNavigateBackward, onNavigateForward, testId }: Props) {
  const [progress, setProgress] = useState(0)
  const [lineProgress, setLineProgress] = useState(0)
  const [gifFailed, setGifFailed] = useState(false)
  const lineProgressRef = useRef(0)
  const touchStartY = useRef<number | null>(null)
  const reducedMotion = prefersReducedMotion()

  useEffect(() => {
    lineProgressRef.current = lineProgress
  }, [lineProgress])

  const easedTarget = useMemo(() => applyEndLag(easeInOutSine(progress), 0.8, 0.22), [progress])

  useEffect(() => {
    if (reducedMotion) {
      setLineProgress(easedTarget)
      lineProgressRef.current = easedTarget
      return
    }

    let frame = 0
    let velocity = 0
    let current = lineProgressRef.current
    const tailPhase = clamp((easedTarget - 0.78) / 0.22)
    const stiffness = 0.115 - tailPhase * 0.03
    const damping = 0.8 + tailPhase * 0.1

    const tick = () => {
      const displacement = easedTarget - current
      velocity = velocity * damping + displacement * stiffness
      current = clamp(current + velocity)
      setLineProgress(current)

      if (Math.abs(displacement) > 0.0008 || Math.abs(velocity) > 0.0008) {
        frame = window.requestAnimationFrame(tick)
      } else {
        setLineProgress(easedTarget)
      }
    }

    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [easedTarget, reducedMotion])

  const connectorProgress = easeInOutSine(mapRange(lineProgress, 0, 0.42))
  const frameProgress = easeInOutSine(mapRange(lineProgress, 0.3, 0.86))
  const gifOpacity = easeInOutSine(mapRange(frameProgress, 0.56, 0.96))
  const cardsOpacity = easeInOutSine(mapRange(frameProgress, 0.46, 0.88))
  const leftCardTitle = resolveLondonText(lang, 'leftTitle')
  const leftCardText = resolveLondonText(lang, 'leftCard')
  const rightCardTitle = resolveLondonText(lang, 'rightTitle')
  const rightCardText = resolveLondonText(lang, 'rightCard')
  const taxi1 = resolveLondonText(lang, 'taxi1')
  const taxi2 = resolveLondonText(lang, 'taxi2')
  const taxi3 = resolveLondonText(lang, 'taxi3')
  const taxi4 = resolveLondonText(lang, 'taxi4')
  const taxiLocationLabel = resolveLondonText(lang, 'taxiLocationLabel')

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
      className="london-scene"
      data-testid={testId ?? 'travelling-from-london-page'}
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
      <section className="london-shell">
        <div className="london-connector-line" style={{ transform: `scaleY(${connectorProgress})` }} />

        <div className="london-gif-frame-wrap">
          <svg className="london-gif-frame-outline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <rect
              x="1.8"
              y="1.8"
              width="96.4"
              height="96.4"
              pathLength={1}
              style={{ strokeDasharray: 1, strokeDashoffset: 1 - frameProgress }}
            />
          </svg>

          <div className="london-gif-inner" style={{ opacity: gifOpacity }}>
            {gifFailed ? (
              <p className="london-gif-fallback">London route preview coming soon</p>
            ) : (
              <img className="london-gif" src="/images/London/London.gif" alt="Travel map from London" onError={() => setGifFailed(true)} />
            )}
          </div>
        </div>

        <aside className="london-side-card london-side-card-left" style={{ opacity: cardsOpacity }}>
          <p className="london-side-card-title">{leftCardTitle}</p>
          <p>{leftCardText}</p>
        </aside>
        <aside className="london-side-card london-side-card-right" style={{ opacity: cardsOpacity }}>
          <p className="london-side-card-title">{rightCardTitle}</p>
          <p className="london-side-card-copy">{rightCardText}</p>
          <p className="london-side-card-copy">{taxi1}</p>
          <p className="london-side-card-copy">{taxi2}</p>
          <p className="london-side-card-copy">{taxi3}</p>
          <p className="london-side-card-copy">{taxi4}</p>
          <p className="london-location-row">
            <LocationIcon />
            <a
              href="https://www.google.com/maps/search/?api=1&query=Lewes%2C+UK"
              target="_blank"
              rel="noopener noreferrer"
            >
              {taxiLocationLabel}
            </a>
          </p>
        </aside>
      </section>
    </main>
  )
}
