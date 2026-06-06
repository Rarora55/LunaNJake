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

const INITIAL_CARDS = [
  { id: 'card-1', color: '#ffe4e1', name: 'Sophie', text: "Can't wait to celebrate with you both!" },
  { id: 'card-2', color: '#e0f4ff', name: 'Marco', text: 'Big love from London. See you soon!' },
  { id: 'card-3', color: '#e9ffe3', name: 'Aisha', text: 'This is going to be such a beautiful day.' },
  { id: 'card-4', color: '#fff6d8', name: 'Tom', text: 'Counting down the days already!' },
]

export default function MessageToGuestScene({ lang, onNavigateBackward, onNavigateForward, testId }: Props) {
  const [progress, setProgress] = useState(0)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [cards, setCards] = useState(INITIAL_CARDS)
  const touchStartY = useRef<number | null>(null)

  const revealProgress = useMemo(() => applyEndLag(easeInOutSine(progress), 0.78, 0.18), [progress])
  const cardsReveal = easeInOutSine(mapRange(revealProgress, 0.08, 0.78))
  const formReveal = easeInOutSine(mapRange(revealProgress, 0.46, 0.98))
  const overlapY = (1 - cardsReveal) * 10

  const messageCards = [...cards]
  if (name.trim() || message.trim()) {
    messageCards.unshift({
      id: 'card-live',
      color: '#f7e8ff',
      name: name.trim() || 'Name',
      text: message.trim() || 'Text',
    })
  }

  const updateProgress = (delta: number) => {
    setProgress((prev) => {
      const next = clamp(prev + delta)
      if (delta < 0 && prev <= 0.01) onNavigateBackward()
      if (delta > 0 && prev >= 0.99) onNavigateForward()
      return next
    })
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const nextName = name.trim()
    const nextMessage = message.trim()
    if (!nextName && !nextMessage) return

    setCards((prev) => [
      {
        id: `card-${Date.now()}`,
        color: '#f7e8ff',
        name: nextName || 'Name',
        text: nextMessage || 'Text',
      },
      ...prev,
    ])
    setName('')
    setMessage('')
  }

  const clearAllCards = () => {
    setCards([])
    setName('')
    setMessage('')
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
        <header className="message-header" style={{ opacity: clamp(cardsReveal * 1.2) }}>
          <h1>{resolveMessageText(lang, 'title')}</h1>
          <p>{resolveMessageText(lang, 'intro')}</p>
        </header>

        <section className="message-paper-wrap" style={{ transform: `translateY(${overlapY}vh)` }}>
          <div
            className="message-paper-reveal"
            style={{
              clipPath: `inset(0 0 ${(1 - cardsReveal) * 100}% 0)`,
              opacity: clamp(cardsReveal * 1.15),
            }}
          >
            <div className="message-cards-grid">
              {messageCards.map((card) => (
                <article key={card.id} className="message-card" style={{ backgroundColor: card.color }}>
                  <p className="message-card-name">Name: {card.name}</p>
                  <p className="message-card-text">Text: {card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <form className="message-form" style={{ opacity: formReveal, transform: `translateY(${(1 - formReveal) * 16}px)` }} onSubmit={onSubmit}>
          <label>
            <span>{resolveMessageText(lang, 'nameLabel')}</span>
            <input type="text" name="name" value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <label>
            <span>{resolveMessageText(lang, 'messageLabel')}</span>
            <textarea name="message" rows={5} value={message} onChange={(event) => setMessage(event.target.value)} />
          </label>
          <div className="message-form-actions">
            <button type="submit">{resolveMessageText(lang, 'sendLabel')}</button>
            <button type="button" className="message-clear-button" onClick={clearAllCards}>
              Clear all cards
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
