import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type WheelEvent } from 'react'
import type { Lang } from '../../config/storySequence'
import { resolveAbroadText } from '../../i18n/storyText'
import { clamp, easeInOutSine, mapRange, applyEndLag } from '../addressTimeline/progressMath'
import { prefersReducedMotion } from '../addressTimeline/reducedMotion'
import './ComingFromAbroadScene.css'

type Props = {
  lang: Lang
  onNavigateBackward: () => void
  onNavigateForward: () => void
  testId?: string
}

export default function ComingFromAbroadScene({ lang, onNavigateBackward, onNavigateForward, testId }: Props) {
  const [progress, setProgress] = useState(0)
  const [lineProgress, setLineProgress] = useState(0)
  const [mapFailed, setMapFailed] = useState(false)
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
  const mapOpacity = easeInOutSine(mapRange(frameProgress, 0.56, 0.96))
  const cardsOpacity = easeInOutSine(mapRange(frameProgress, 0.46, 0.88))
  const leftCardTitle = resolveAbroadText(lang, 'leftTitle')
  const rightCardTitle = resolveAbroadText(lang, 'rightTitle')
  const leftCardText = resolveAbroadText(lang, 'leftCard')
  const rightCardText = resolveAbroadText(lang, 'rightCard')

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
      className="abroad-scene"
      data-testid={testId ?? 'coming-from-abroad-page'}
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
      <section className="abroad-shell">
        <div className="abroad-connector-line" style={{ transform: `scaleY(${connectorProgress})` }} />

        <div className="abroad-map-frame-wrap">
          <svg className="abroad-map-frame-outline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <rect
              x="1.8"
              y="1.8"
              width="96.4"
              height="96.4"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: 1 - frameProgress,
              }}
            />
          </svg>

          <div className="abroad-map-inner" style={{ opacity: mapOpacity }}>
            {mapFailed ? (
              <p className="abroad-map-fallback">Map preview coming soon</p>
            ) : (
              <img
                className="abroad-map-image"
                src="/images/abroad/Map.gif"
                alt="Wedding location map"
                onError={() => setMapFailed(true)}
              />
            )}
          </div>
        </div>

        <aside className="abroad-side-card abroad-side-card-left" style={{ opacity: cardsOpacity }}>
          <p className="abroad-side-card-title">{leftCardTitle}</p>
          <p>{leftCardText}</p>
        </aside>
        <aside className="abroad-side-card abroad-side-card-right" style={{ opacity: cardsOpacity }}>
          <p className="abroad-side-card-title">{rightCardTitle}</p>
          <p>{rightCardText}</p>
        </aside>
      </section>
    </main>
  )
}
