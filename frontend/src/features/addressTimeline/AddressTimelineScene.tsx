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

type DecorativeDrawing = {
  id: string
  src: string
  alt: string
  revealAt: number
  className: string
}

const DECORATIVE_DRAWINGS: DecorativeDrawing[] = [
  { id: 'seagul1', src: '/images/Married/Seagul1.png', alt: 'Seagul1', revealAt: 0.14, className: 'left-large top' },
  { id: 'seagul4-a', src: '/images/Married/Seagul4.png', alt: 'Seagul4', revealAt: 0.32, className: 'right-mid upper' },
  { id: 'seagul3', src: '/images/Married/Seagul3.png', alt: 'Seagul3', revealAt: 0.52, className: 'right-small middle' },
  { id: 'seagul4-b', src: '/images/Married/Seagul4.png', alt: 'Seagul4', revealAt: 0.72, className: 'left-large lower' },
  { id: 'peach', src: '/images/Married/Peach.png', alt: 'Peach', revealAt: 0.9, className: 'right-peach bottom' },
]

export default function AddressTimelineScene({ lang, onNavigateBackward, onNavigateForward, testId }: Props) {
  const [progress, setProgress] = useState(0)
  const progressRef = useRef(0)
  const [lineProgress, setLineProgress] = useState(0)
  const lineProgressRef = useRef(0)
  const touchStartY = useRef<number | null>(null)
  const touchLastY = useRef<number | null>(null)
  const { markFailed, isFailed } = useMediaFallback()
  const items = useMemo(() => getTimelineItems(lang), [lang])
  const reducedMotion = prefersReducedMotion()
  const isMobile = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(max-width: 768px)').matches
    : false
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
    const stiffnessBase = isMobile ? 0.18 : 0.12
    const dampingBase = isMobile ? 0.71 : 0.79
    const stiffness = stiffnessBase - tailPhase * (isMobile ? 0.02 : 0.03)
    const damping = dampingBase + tailPhase * (isMobile ? 0.07 : 0.08)

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
  }, [laggedTarget, reducedMotion, isMobile])

  const updateProgress = (delta: number, allowNavigate = true) => {
    const prev = progressRef.current
    if (allowNavigate && delta < 0 && prev <= 0.01) {
      onNavigateBackward()
      return
    }
    if (allowNavigate && delta > 0 && prev >= 0.99) {
      onNavigateForward()
      return
    }
    const next = clamp(prev + delta)
    progressRef.current = next
    setProgress(next)
  }

  const onWheel = (event: WheelEvent<HTMLElement>) => {
    event.preventDefault()
    const wheelScale = isMobile ? 0.0026 : 0.0015
    const wheelClamp = isMobile ? 0.14 : 0.1
    updateProgress(clamp(event.deltaY * wheelScale, -wheelClamp, wheelClamp))
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
        const moveScale = isMobile ? 0.0044 : 0.003
        updateProgress(clamp(delta * moveScale, -0.08, 0.08), false)
      }}
      onTouchEnd={(event) => {
        const start = touchStartY.current
        const end = event.changedTouches[0]?.clientY
        touchStartY.current = null
        touchLastY.current = null
        if (start === null || typeof end !== 'number') return
        const delta = start - end
        const minSwipe = isMobile ? 10 : 16
        if (Math.abs(delta) < minSwipe) return
        const endScale = isMobile ? 0.0032 : 0.0024
        updateProgress(clamp(delta * endScale, -0.12, 0.12))
      }}
      tabIndex={0}
    >
      <section className="timeline-shell timeline-only" style={{ opacity: 1 }}>
        <div className="timeline-decorative-layer" aria-hidden="true">
          {DECORATIVE_DRAWINGS.map((drawing) => {
            const isVisible = lineProgress >= drawing.revealAt
            return (
              <img
                key={drawing.id}
                src={drawing.src}
                alt={drawing.alt}
                className={`timeline-drawing ${drawing.className} ${isVisible ? 'is-visible' : ''}`}
              />
            )
          })}
        </div>

        <div className="timeline-line" style={{ transform: `scaleY(${lineProgress})` }} />

        {items.map((item) => {
          const visible = progress >= item.revealProgress || lineProgress >= item.revealProgress
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
