import { useRef, useState, type WheelEvent } from 'react'
import { Link } from 'react-router-dom'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import type { Lang } from '../config/storySequence'
import { TimelineGifMarkers, TimelineLine } from '../components/timeline'
import './TimeLine.css'

type TimeLineProps = {
  lang: Lang
  backPath: string
  nextPath: string
}

function clamp01(value: number): number {
  if (value <= 0) return 0
  if (value >= 1) return 1
  return value
}

export default function TimeLine({ lang, backPath, nextPath }: TimeLineProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [progress, setProgress] = useState(0)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setProgress(clamp01(value))
  })

  function onWheel(event: WheelEvent<HTMLElement>) {
    const direction = event.deltaY > 0 ? 0.05 : event.deltaY < 0 ? -0.05 : 0
    if (direction === 0) return
    setProgress((prev) => clamp01(prev + direction)) // JSDOM/testing fallback if scroll container does not move.
  }

  return (
    <section ref={sectionRef} className="timeline-section" data-testid="timeline-section">
      <div className="timeline-sticky" onWheel={onWheel}>
        <div className="timeline-stage" data-testid="timeline-stage">
          <TimelineLine progress={progress} />
          <TimelineGifMarkers lang={lang} progress={progress} />
        </div>
        <nav className="timeline-nav">
          <Link to={backPath} className="timeline-nav-link" aria-label="Back to intro">
            {lang === 'it' ? 'Indietro' : 'Back'}
          </Link>
          <Link to={nextPath} className="timeline-nav-link" aria-label="Continue">
            {lang === 'it' ? 'Continua' : 'Continue'}
          </Link>
        </nav>
      </div>
    </section>
  )
}
