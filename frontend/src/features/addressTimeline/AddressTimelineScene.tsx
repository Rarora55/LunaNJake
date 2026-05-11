import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type WheelEvent } from 'react'
import type { Lang } from '../../config/storySequence'
import { useMediaFallback } from './mediaFallback'
import { applyEndLag, clamp, easeLineWithStops } from './progressMath'
import { prefersReducedMotion } from './reducedMotion'
import { getTimelineItems } from './timelineConfig'
import TimelineCard from './TimelineCard'
import TimelineMarker from './TimelineMarker'
import './AddressTimelineScene.css'

type Props = {
  lang: Lang
  onNavigateBackward: () => void
  onNavigateForward: () => void
  testId?: string
}

export default function AddressTimelineScene({ lang, onNavigateBackward, onNavigateForward, testId }: Props) {
  const [progress, setProgress] = useState(0)
  const [lineProgress, setLineProgress] = useState(0)
  const lineProgressRef = useRef(0)
  const touchStartY = useRef<number | null>(null)
  const { markFailed, isFailed } = useMediaFallback()
  const items = useMemo(() => getTimelineItems(lang), [lang])
  const reducedMotion = prefersReducedMotion()
  const revealStops = useMemo(() => items.map((item) => item.revealProgress), [items])
  const easedTarget = useMemo(() => easeLineWithStops(progress, revealStops), [progress, revealStops])
  const laggedTarget = useMemo(() => applyEndLag(easedTarget), [easedTarget])

  useEffect(() => {
    lineProgressRef.current = lineProgress
  }, [lineProgress])

  useEffect(() => {
    if (reducedMotion) {
      setLineProgress(laggedTarget)
      lineProgressRef.current = laggedTarget
      return
    }

    let frame = 0
    let velocity = 0
    let current = lineProgressRef.current
    const tailPhase = clamp((laggedTarget - 0.8) / 0.2)
    const stiffness = 0.12 - tailPhase * 0.03
    const damping = 0.79 + tailPhase * 0.08

    const tick = () => {
      const displacement = laggedTarget - current
      velocity = velocity * damping + displacement * stiffness
      current = clamp(current + velocity)
      setLineProgress(current)

      if (Math.abs(displacement) > 0.0008 || Math.abs(velocity) > 0.0008) {
        frame = window.requestAnimationFrame(tick)
      } else {
        setLineProgress(laggedTarget)
      }
    }

    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [laggedTarget, reducedMotion])

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
      data-testid={testId ?? 'address-timeline-page'}
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
      <section className="timeline-shell timeline-only" style={{ opacity: 1 }}>
        <div className="timeline-line" style={{ transform: `scaleY(${lineProgress})` }} />

        {items.map((item) => {
          const visible = lineProgress >= item.revealProgress
          if (!visible) return null
          const markerFailed = isFailed(`${item.id}-marker`)
          const iconFailed = isFailed(`${item.id}-icon`)
          return (
            <div key={item.id} className="timeline-item" style={{ top: `${item.revealProgress * 100}%` }}>
              <TimelineMarker
                src={item.markerAsset}
                onError={() => markFailed(`${item.id}-marker`)}
                style={{ opacity: markerFailed ? 0.2 : 1 }}
              />
              <TimelineCard
                side={item.cardSide}
                iconSrc={item.cardIconAsset}
                frontTime={item.frontTime}
                frontLabel={item.frontLabel}
                backTitle={item.backTitle}
                backDescription={item.backDescription}
                dressCode={item.dressCode}
                locationText={item.locationText}
                locationHref={item.locationHref}
                detailHintTap={item.detailHintTap}
                detailHintHover={item.detailHintHover}
                fallback={iconFailed}
                onMediaError={() => markFailed(`${item.id}-icon`)}
              />
            </div>
          )
        })}
      </section>
    </main>
  )
}
