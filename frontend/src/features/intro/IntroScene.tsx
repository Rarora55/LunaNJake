import { useMemo, useState, type WheelEvent } from 'react'
import { Link } from 'react-router-dom'
import type { Lang } from '../../config/storySequence'
import { resolveIntroFlowText } from '../../i18n/storyText'
import './IntroScene.css'

type Props = {
  lang: Lang
  marriedPath: string
}

const FADE_MS = 450

type IntroStep = 0 | 1 | 2

function SequenceOneText({ text }: { text: string }) {
  return <p className="intro-text intro-text--long">{text}</p>
}

function SequenceTwoText({ text }: { text: string }) {
  return <p className="intro-text intro-text--short">{text}</p>
}

function SequenceThreeText({ continueLabel, marriedPath }: { continueLabel: string; marriedPath: string }) {
  const [isButtonActive, setIsButtonActive] = useState(false)

  return (
    <div className="intro-final-layout">
      <div className="intro-herb-layer" aria-hidden="true">
        <img className="intro-herb intro-herb--one" src="/images/Home2/Herb.png" alt="" />
        <img className="intro-herb intro-herb--two" src="/images/Home2/herbs.png" alt="" />
        <img className="intro-herb intro-herb--three" src="/images/Home2/herbs2.png" alt="" />
        <img className="intro-herb intro-herb--four" src="/images/Home2/herbs3.png" alt="" />
      </div>
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
      <div className="intro-rings-column" aria-hidden="true">
        <div className="intro-rings-wrap">
          <img className="intro-rings-image" src="/images/Home2/Rings2.png" alt="" />
        </div>
        <img className="intro-details-image" src="/images/Home2/Titles.png" alt="" />
      </div>
    </div>
  )
}

export default function IntroScene({ lang, marriedPath }: Props) {
  const [step, setStep] = useState<IntroStep>(0)
  const [visible, setVisible] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const copy = useMemo(
    () => ({
      sequence1: resolveIntroFlowText(lang, 'sequence1'),
      sequence2: resolveIntroFlowText(lang, 'sequence2'),
      continueLabel: resolveIntroFlowText(lang, 'continue'),
    }),
    [lang],
  )

  const steps = useMemo(
    () => [
      <SequenceOneText key="sequence1" text={copy.sequence1} />,
      <SequenceTwoText key="sequence2" text={copy.sequence2} />,
      <SequenceThreeText
        key="sequence3"
        continueLabel={copy.continueLabel}
        marriedPath={marriedPath}
      />,
    ],
    [copy, marriedPath],
  )

  function moveToStep(nextStep: IntroStep) {
    if (isTransitioning || nextStep === step) return
    setIsTransitioning(true)
    setVisible(false)
    window.setTimeout(() => {
      setStep(nextStep)
      setVisible(true)
      window.setTimeout(() => {
        setIsTransitioning(false)
      }, FADE_MS)
    }, FADE_MS)
  }

  function onWheel(event: WheelEvent<HTMLElement>) {
    const direction = event.deltaY > 0 ? 1 : event.deltaY < 0 ? -1 : 0
    if (direction === 0) return
    event.preventDefault()
    if (direction > 0 && step < 2) moveToStep((step + 1) as IntroStep)
    if (direction < 0 && step > 0) moveToStep((step - 1) as IntroStep)
  }

  return (
    <main className="intro-root" data-testid="intro-scene" onWheel={onWheel}>
      <section className={`intro-stage ${visible ? 'is-visible' : 'is-hidden'}`} data-step={step}>
        {steps[step]}
      </section>
    </main>
  )
}
