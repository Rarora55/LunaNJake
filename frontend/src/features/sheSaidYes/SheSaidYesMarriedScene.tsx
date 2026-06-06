import { useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type WheelEvent } from 'react'
import { Link } from 'react-router-dom'
import { buildExitProfile } from '../addressTimeline/exitActorProfiles'
import { SCENE_ITEMS, SCENE_PROGRESS, SCENE_STRINGS } from './sceneConfig'
import './SheSaidYesMarriedScene.css'

type Props = {
  title: string
  entrySource?: 'intro' | 'other'
  rsvpPath: string
  testId?: string
  onNavigateBackward: () => void
  onNavigateForward: () => void
}

const WEDDING_DATE_LABEL = 'Monday, 31st May 2027'

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function easeOutBack(value: number) {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2)
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3)
}

function revealProgress(progress: number, start: number, end: number) {
  return clamp((progress - start) / (end - start))
}

function capInputDelta(delta: number) {
  const sign = Math.sign(delta)
  const size = Math.min(Math.abs(delta), SCENE_PROGRESS.maxInputStep)
  return sign * size
}

function resolveBottomEntry(topValue: string, configuredEntryY: number) {
  const topAsNumber = Number.parseFloat(topValue)
  if (!Number.isFinite(topAsNumber)) return configuredEntryY
  const distanceFromBottom = 110 - topAsNumber
  return Math.max(configuredEntryY, distanceFromBottom)
}

export default function SheSaidYesMarriedScene({ title, entrySource = 'other', rsvpPath, testId, onNavigateBackward, onNavigateForward }: Props) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const touchStartY = useRef<number | null>(null)
  const touchLastY = useRef<number | null>(null)
  const lastNavMs = useRef(0)
  const isMobile = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(max-width: 768px)').matches
    : false

  const visuals = useMemo(
    () =>
      SCENE_ITEMS.map((item, index) => {
        const normalized = revealProgress(progress, item.revealStart, item.revealEnd)
        const eased = easeOutBack(normalized)
        const easedNoOvershoot = easeOutCubic(normalized)
        const bottomEntryY = resolveBottomEntry(item.top, item.entryY)
        const tx = item.entryX * (1 - easedNoOvershoot)
        const ty = bottomEntryY * (1 - easedNoOvershoot)
        const rot = item.rotateIn * (1 - eased) + item.settleRotate * eased
        const opacity = clamp(normalized * 1.25, 0, 1)

        const exit = buildExitProfile(index)
        const itemStyle: CSSProperties = {
          left: item.left,
          top: item.top,
          zIndex: item.zIndex,
          opacity,
          transform: `translate(-50%, -50%) translate(${tx}vw, ${ty}vh) rotate(${rot}deg)`,
          transition: isExiting
            ? `transform 480ms steps(6, end) ${exit.delayMs}ms, opacity 420ms linear ${exit.delayMs}ms`
            : undefined,
          ['--item-width' as string]: item.widthDesktop,
          ['--item-width-mobile' as string]: item.widthMobile,
          ['--float-name' as string]: item.floatName,
          ['--float-duration' as string]: item.floatDuration,
          ['--float-delay' as string]: item.floatDelay,
          ['--exit-x' as string]: `${exit.x}vw`,
          ['--exit-y' as string]: `${exit.y}vh`,
          ['--exit-rotate' as string]: `${exit.rotate}deg`,
        }

        return { item, normalized, itemStyle }
      }),
    [isExiting, progress],
  )
  const strings = useMemo(
    () =>
      SCENE_STRINGS.map((item) => {
        const normalized = revealProgress(progress, item.revealStart, item.revealEnd)
        return { item, opacity: clamp(normalized * 1.25, 0, 1) }
      }),
    [progress],
  )
  const textReveal = useMemo(() => revealProgress(progress, 0.96, 0.995), [progress])

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
      if (allowNavigate && delta < 0 && prev <= 0.02) {
        tryNavigate('backward')
        return prev
      }
      if (allowNavigate && delta > 0 && prev >= SCENE_PROGRESS.minNavigateForward) {
        if (!isExiting && tryNavigate('forward')) {
          setIsExiting(true)
        }
        return prev
      }
      return next
    })
  }

  const onWheel = (event: WheelEvent<HTMLElement>) => {
    event.preventDefault()
    const wheelFactor = isMobile ? SCENE_PROGRESS.wheelFactor * 1.75 : SCENE_PROGRESS.wheelFactor
    const rawDelta = event.deltaY * wheelFactor
    updateProgress(capInputDelta(rawDelta))
  }

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      onNavigateBackward()
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      onNavigateForward()
    }
  }

  return (
    <main
      className="she-said-yes-root"
      data-testid={testId ?? 'terminal-page'}
      data-entry-source={entrySource}
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
        const moveFactor = isMobile ? SCENE_PROGRESS.touchFactor * 1.35 : SCENE_PROGRESS.touchFactor
        const rawDelta = delta * moveFactor
        updateProgress(capInputDelta(rawDelta), false)
      }}
      onTouchEnd={(event) => {
        const start = touchStartY.current
        const end = event.changedTouches[0]?.clientY
        touchStartY.current = null
        touchLastY.current = null
        if (start === null || typeof end !== 'number') return
        const delta = start - end
        if (Math.abs(delta) < (isMobile ? 10 : 16)) return
        const touchFactor = isMobile ? SCENE_PROGRESS.touchFactor * 1.25 : SCENE_PROGRESS.touchFactor
        const rawDelta = delta * touchFactor
        updateProgress(capInputDelta(rawDelta))
      }}
      tabIndex={0}
    >
      <h1 className="scene-heading">{title}</h1>
      <header className="she-said-yes-header" aria-label="Wedding heading" style={{ opacity: textReveal }}>
        <h2 className="she-said-yes-title">
          <span className="she-title-luna">
            <span className="she-title-l-letter">L</span>una
          </span>{' '}
          &amp; Jake
        </h2>
        <p className="she-said-yes-top-date">{WEDDING_DATE_LABEL}</p>
        <Link className="she-said-yes-rsvp" to={rsvpPath} state={{ fromRsvpCta: true }} aria-label="Open RSVP form">
          <img className="she-said-yes-rsvp-image default" src="/images/Married/FNoHover.png" alt="" aria-hidden="true" />
          <img className="she-said-yes-rsvp-image hover" src="/images/Married/FHoover.png" alt="Open RSVP form" />
        </Link>
      </header>
      <section className="she-said-yes-stage">
        {strings.map(({ item, opacity }) => (
          <img
            key={item.id}
            src={item.src}
            alt=""
            aria-hidden="true"
            className="puppet-string-image"
            draggable={false}
            style={{
              left: item.left,
              top: item.top,
              zIndex: item.zIndex,
              opacity,
              ['--string-width' as string]: item.widthDesktop,
              ['--string-width-mobile' as string]: item.widthMobile,
            }}
          />
        ))}
        {visuals.map(({ item, normalized, itemStyle }, index) => (
          <article
            key={`${item.id}-${index}`}
            className={`she-said-yes-item ${isExiting ? 'is-exiting' : ''}`}
            style={itemStyle}
          >
            <div className={`she-said-yes-puppet ${item.id} ${normalized > 0 ? 'floating' : ''}`}>
              <img src={item.src} alt={item.alt} draggable={false} loading="eager" />
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

