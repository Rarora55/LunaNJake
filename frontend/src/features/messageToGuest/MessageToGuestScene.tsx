import { useMemo, useRef, useState, type FormEvent, type KeyboardEvent, type WheelEvent } from 'react'
import type { Lang } from '../../config/storySequence'
import { resolveMessageText } from '../../i18n/storyText'
import { applyEndLag, clamp, easeInOutSine, mapRange } from '../addressTimeline/progressMath'
import './MessageToGuestScene.css'

type Props = {
  lang: Lang
  onNavigateBackward: () => void
  onNavigateForward: () => void
  testId?: string
}

export default function MessageToGuestScene({ lang, onNavigateBackward, onNavigateForward, testId }: Props) {
  const [progress, setProgress] = useState(0)
  const [paperFailed, setPaperFailed] = useState(false)
  const touchStartY = useRef<number | null>(null)

  const revealProgress = useMemo(() => applyEndLag(easeInOutSine(progress), 0.78, 0.18), [progress])
  const paperReveal = easeInOutSine(mapRange(revealProgress, 0.08, 0.78))
  const formReveal = easeInOutSine(mapRange(revealProgress, 0.46, 0.98))
  const overlapY = (1 - paperReveal) * 10

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
      className="message-scene"
      data-testid={testId ?? 'message-to-guest-page'}
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
      <section className="message-shell">
        <header className="message-header" style={{ opacity: clamp(paperReveal * 1.2) }}>
          <h1>{resolveMessageText(lang, 'title')}</h1>
          <p>{resolveMessageText(lang, 'intro')}</p>
        </header>

        <section className="message-paper-wrap" style={{ transform: `translateY(${overlapY}vh)` }}>
          <div
            className="message-paper-reveal"
            style={{
              clipPath: `inset(0 0 ${(1 - paperReveal) * 100}% 0)`,
              opacity: clamp(paperReveal * 1.15),
            }}
          >
            {paperFailed ? (
              <div className="message-paper-fallback">{resolveMessageText(lang, 'paperAlt')}</div>
            ) : (
              <img
                className="message-paper-image"
                src="/images/Message/Papel.png"
                alt={resolveMessageText(lang, 'paperAlt')}
                onError={() => setPaperFailed(true)}
              />
            )}
          </div>
        </section>

        <form
          className="message-form"
          style={{ opacity: formReveal, transform: `translateY(${(1 - formReveal) * 16}px)` }}
          onSubmit={(event: FormEvent) => event.preventDefault()}
        >
          <label>
            <span>{resolveMessageText(lang, 'nameLabel')}</span>
            <input type="text" name="name" />
          </label>
          <label>
            <span>{resolveMessageText(lang, 'messageLabel')}</span>
            <textarea name="message" rows={5} />
          </label>
          <button type="submit">{resolveMessageText(lang, 'sendLabel')}</button>
        </form>
      </section>
    </main>
  )
}

