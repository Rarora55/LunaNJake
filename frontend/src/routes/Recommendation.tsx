import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import type { Lang } from '../config/storySequence'
import { recommendationItems } from './recommendationItems'
import './Recommendation.css'

type RecommendationProps = {
  lang: Lang
  backPath: string
  nextPath: string
}

type RecommendationStyle = CSSProperties & {
  '--group-top'?: string
  '--group-rotation'?: string
  '--group-x-offset'?: string
  '--item-image-size'?: string
  '--item-text-width'?: string
}

function clamp01(value: number): number {
  if (value <= 0) return 0
  if (value >= 1) return 1
  return value
}

function getRevealThreshold(index: number): number {
  return index * 0.16
}

export default function Recommendation({ lang, backPath, nextPath }: RecommendationProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [progress, setProgress] = useState(0)
  const [hasEntered, setHasEntered] = useState(false)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    setHasEntered(false)

    const frameId = window.requestAnimationFrame(() => {
      setHasEntered(true)
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setProgress(clamp01(value))
  })

  const desktopBoardHeight = recommendationItems.reduce((maxHeight, item, index) => {
    const itemTop = 180 + index * 220 + item.yOffset
    const itemHeight = Math.max(item.imageSize + 60, 210)
    return Math.max(maxHeight, itemTop + itemHeight)
  }, 0)

  return (
    <section ref={sectionRef} className="recommendation-section" data-testid="recommendation-section">
      <div className="recommendation-shell">
        <header className={`recommendation-header ${hasEntered ? 'is-visible' : ''}`}>
          <h1 className="recommendation-title">Recommendations</h1>
        </header>

        <div
          className="recommendation-board"
          style={
            {
              '--board-height': `${desktopBoardHeight}px`,
            } as CSSProperties
          }
        >
          {recommendationItems.map((item, index) => {
            const itemStyle: RecommendationStyle = {
              '--group-top': `${180 + index * 220 + item.yOffset}px`,
              '--group-rotation': `${item.rotation}deg`,
              '--group-x-offset': `${item.xOffset}px`,
              '--item-image-size': `${item.imageSize}px`,
              '--item-text-width': `${item.textWidth}px`,
            }

            return (
              <article
                key={item.id}
                className={`recommendation-group recommendation-group--${item.side} ${
                  (index === 0 ? hasEntered : progress >= getRevealThreshold(index)) ? 'is-visible' : ''
                }`}
                style={itemStyle}
                data-testid={`recommendation-item-${item.id}`}
                data-entered={hasEntered ? 'true' : 'false'}
              >
                <span className="recommendation-number" aria-hidden="true">
                  {item.number}
                </span>
                <div className="recommendation-copy">
                  <p className="recommendation-text">{item.text}</p>
                  <img
                    className="recommendation-image"
                    src={item.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>
            )
          })}
        </div>

        <nav className={`recommendation-nav ${hasEntered ? 'is-visible' : ''}`}>
          <Link to={backPath} className="recommendation-nav-link" aria-label="Back to timeline">
            {lang === 'it' ? 'Indietro' : 'Back'}
          </Link>
          <Link to={nextPath} className="recommendation-nav-link" aria-label="Continue">
            {lang === 'it' ? 'Continua' : 'Continue'}
          </Link>
        </nav>
      </div>
    </section>
  )
}
