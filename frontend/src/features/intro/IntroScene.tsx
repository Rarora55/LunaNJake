import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Lang } from '../../config/storySequence'
import { resolveIntroFlowText } from '../../i18n/storyText'
import './IntroScene.css'

type Props = {
  lang: Lang
  marriedPath: string
}

const COUNTDOWN_TARGET = new Date(2027, 4, 31, 0, 0, 0, 0)

type CountdownPart = {
  label: 'Days' | 'Hours' | 'Minutes' | 'Seconds'
  value: string
}

function getCountdownParts(target: Date): CountdownPart[] {
  const remainingMs = Math.max(target.getTime() - Date.now(), 0)
  const totalSeconds = Math.floor(remainingMs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [
    { label: 'Days', value: String(days).padStart(2, '0') },
    { label: 'Hours', value: String(hours).padStart(2, '0') },
    { label: 'Minutes', value: String(minutes).padStart(2, '0') },
    { label: 'Seconds', value: String(seconds).padStart(2, '0') },
  ]
}

function SequenceThreeText({ continueLabel, marriedPath }: { continueLabel: string; marriedPath: string }) {
  const [isButtonActive, setIsButtonActive] = useState(false)
  const [countdownParts, setCountdownParts] = useState(() => getCountdownParts(COUNTDOWN_TARGET))

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCountdownParts(getCountdownParts(COUNTDOWN_TARGET))
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <div className="intro-final-layout">
      <div className="intro-herb-cluster intro-herb-cluster--bottom-left" aria-hidden="true">
        <img className="intro-herb intro-herb--one" src="/images/Home2/Herb.png" alt="" />
        <img className="intro-herb intro-herb--two" src="/images/Home2/herbs.png" alt="" />
        <img className="intro-herb intro-herb--three" src="/images/Home2/herbs2.png" alt="" />
        <img className="intro-herb intro-herb--four" src="/images/Home2/herbs3.png" alt="" />
      </div>
      <div className="intro-herb-cluster intro-herb-cluster--top-right" aria-hidden="true">
        <img className="intro-herb intro-herb--one" src="/images/Home2/Herb.png" alt="" />
        <img className="intro-herb intro-herb--two" src="/images/Home2/herbs.png" alt="" />
        <img className="intro-herb intro-herb--three" src="/images/Home2/herbs2.png" alt="" />
        <img className="intro-herb intro-herb--four" src="/images/Home2/herbs3.png" alt="" />
      </div>
      <div className="intro-left-column" data-testid="intro-left-column">
        <div className="intro-title-block">
          <h1 className="intro-title">
            <span className="intro-sr-only">
              <span>Luna</span>
              <span>&amp;</span>
              <span>Jake</span>
            </span>
            <img className="intro-title-image" src="/images/Home2/Title.png" alt="Luna and Jake" />
          </h1>
        </div>
        <Link
          className={`intro-continue ${isButtonActive ? 'is-active' : ''}`}
          to={marriedPath}
          aria-label={continueLabel}
          onMouseEnter={() => setIsButtonActive(true)}
          onMouseLeave={() => setIsButtonActive(false)}
          onFocus={() => setIsButtonActive(true)}
          onBlur={() => setIsButtonActive(false)}
          onMouseDown={() => setIsButtonActive(true)}
          onMouseUp={() => setIsButtonActive(true)}
        >
          <span className="intro-sr-only">{continueLabel}</span>
          <img
            className="intro-continue-image intro-continue-image--default"
            src="/images/Home2/Buttom2.png"
            alt=""
            aria-hidden="true"
          />
          <img
            className="intro-continue-image intro-continue-image--hover"
            src="/images/Home2/Buttom2H.png"
            alt=""
            aria-hidden="true"
          />
        </Link>
        <div className="intro-date-block" aria-label="Wedding date countdown" data-testid="intro-date-block">
          <img
            className="intro-date-image"
            src="/images/Home2/Monday.png"
            alt="Monday 31 May 2027"
            data-testid="intro-date-image"
          />
          <div className="intro-countdown" role="timer" aria-live="polite">
            {countdownParts.map((part) => (
              <div key={part.label} className="intro-countdown-item">
                <span className="intro-countdown-value">{part.value}</span>
                <span className="intro-countdown-label">{part.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="intro-rings-column" aria-hidden="true" data-testid="intro-right-column">
        <div className="intro-rings-wrap">
          <img className="intro-rings-image" src="/images/Home2/Rings2.png" alt="" />
        </div>
        <img className="intro-details-image" src="/images/Home2/Titles.png" alt="" />
      </div>
    </div>
  )
}

export default function IntroScene({ lang, marriedPath }: Props) {
  const continueLabel = resolveIntroFlowText(lang, 'continue')

  return (
    <main className="intro-root" data-testid="intro-scene">
      <section className="intro-stage is-visible">
        <SequenceThreeText continueLabel={continueLabel} marriedPath={marriedPath} />
      </section>
    </main>
  )
}
