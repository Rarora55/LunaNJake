import { type KeyboardEvent, type WheelEvent, useRef } from 'react'
import type { Lang } from '../../config/storySequence'
import { resolveStayContent } from '../../i18n/storyText'
import { canTriggerNavigation, resolveDirectionFromKey, resolveDirectionFromWheel } from '../story/navigationController'
import './WhereToStayScene.css'

type Props = {
  lang: Lang
  onNavigateBackward: () => void
  onNavigateForward: () => void
  testId?: string
}

export default function WhereToStayScene({ lang, onNavigateBackward, onNavigateForward, testId }: Props) {
  const content = resolveStayContent(lang)
  const lastTriggerMs = useRef(0)
  const touchStartY = useRef<number | null>(null)

  const handleDirection = (direction: 'forward' | 'backward') => {
    const now = Date.now()
    if (!canTriggerNavigation(now, lastTriggerMs.current)) return
    lastTriggerMs.current = now
    if (direction === 'backward') {
      onNavigateBackward()
      return
    }
    onNavigateForward()
  }

  const onWheel = (event: WheelEvent<HTMLElement>) => {
    const direction = resolveDirectionFromWheel(event.deltaY)
    if (!direction) return
    event.preventDefault()
    handleDirection(direction)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const direction = resolveDirectionFromKey(event.key)
    if (!direction) return
    event.preventDefault()
    handleDirection(direction)
  }

  return (
    <main
      className="stay-scene"
      data-testid={testId ?? 'where-to-stay-page'}
      onWheel={onWheel}
      onKeyDown={onKeyDown}
      onTouchStart={(event) => {
        touchStartY.current = event.changedTouches[0]?.clientY ?? null
      }}
      onTouchEnd={(event) => {
        const startY = touchStartY.current
        const endY = event.changedTouches[0]?.clientY
        touchStartY.current = null
        if (startY === null || typeof endY !== 'number') return
        const delta = startY - endY
        if (Math.abs(delta) < 20) return
        handleDirection(delta > 0 ? 'forward' : 'backward')
      }}
      tabIndex={0}
    >
      <section className="stay-shell">
        <header className="stay-header">
          <h1>{content.title}</h1>
          <p>{content.intro}</p>
        </header>

        <section className="stay-map-wrap" aria-label={content.mapTitle}>
          <iframe
            className="stay-map"
            title={content.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=hotels%20near%20Lewes%20and%20Brighton%20UK&t=&z=10&ie=UTF8&iwloc=&output=embed"
          />
          <div className="stay-map-options">
            <span>{content.mapOptionsLabel}</span>
            {content.mapOptions.map((option) => (
              <a key={option.label} href={option.href} target="_blank" rel="noopener noreferrer">
                {option.label}
              </a>
            ))}
          </div>
        </section>

        <section className="stay-grid">
          {content.hotels.map((hotel) => (
            <article className="stay-card" key={hotel.name}>
              <img src={hotel.imageSrc} alt={hotel.name} />
              <h2>{hotel.name}</h2>
              <p>{hotel.description}</p>
              <p><strong>{hotel.price}</strong></p>
              <p>{hotel.location}</p>
              <a href={hotel.link} target="_blank" rel="noopener noreferrer">{content.ctaLabel}</a>
            </article>
          ))}
        </section>
      </section>
    </main>
  )
}
