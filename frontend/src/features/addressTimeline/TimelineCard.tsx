import { useState, type CSSProperties, type KeyboardEvent } from 'react'

type Props = {
  side: 'left' | 'right'
  iconSrc: string
  frontTime: string
  frontLabel: string
  backTitle: string
  backDescription: string
  dressCode?: string
  locationText: string
  locationHref: string
  detailHintTap: string
  detailHintHover: string
  fallback?: boolean
  onMediaError?: () => void
  style?: CSSProperties
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="timeline-detail-icon" aria-hidden="true">
      <path d="M12 22c-4.2-5-7-8.4-7-12a7 7 0 1 1 14 0c0 3.6-2.8 7-7 12Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="10" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function HangerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="timeline-detail-icon" aria-hidden="true">
      <path d="M12 4a2.2 2.2 0 1 1 2.2 2.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M14.2 6.2 20 10.8c.7.6.3 1.8-.6 1.8H4.6c-1 0-1.4-1.2-.6-1.8l7.6-6" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

export default function TimelineCard({
  side,
  iconSrc,
  frontTime,
  frontLabel,
  backTitle,
  backDescription,
  dressCode,
  locationText,
  locationHref,
  detailHintTap,
  detailHintHover,
  fallback = false,
  onMediaError,
  style,
}: Props) {
  const [isFlipped, setIsFlipped] = useState(false)

  const toggle = () => setIsFlipped((prev) => !prev)
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggle()
    }
  }

  return (
    <aside className={`timeline-card ${side}`} style={style}>
      <div
        className={`timeline-card-interactive ${isFlipped ? 'is-flipped' : ''}`}
        role="button"
        tabIndex={0}
        aria-label={`${frontTime} ${frontLabel}`}
        aria-pressed={isFlipped}
        onClick={toggle}
        onKeyDown={onKeyDown}
      >
        <div className="timeline-card-flipper">
          <div className="timeline-card-face timeline-card-front">
            <div className="timeline-front-main">
              {fallback ? (
                <div className="timeline-icon-fallback" aria-hidden="true">?</div>
              ) : (
                <img className="timeline-icon" src={iconSrc} alt="" aria-hidden="true" onError={onMediaError} />
              )}
              <div className="timeline-front-copy">
                <p>{frontTime}</p>
                <p>{frontLabel}</p>
              </div>
            </div>
            <p className="timeline-hint timeline-hint-hover">{detailHintHover}</p>
            <p className="timeline-hint timeline-hint-tap">{detailHintTap}</p>
          </div>
          <div className="timeline-card-face timeline-card-back">
            <p className="timeline-back-title">{backTitle}</p>
            <p className="timeline-back-description">{backDescription}</p>
            {dressCode ? (
              <p className="timeline-detail-row">
                <HangerIcon />
                <span>{dressCode}</span>
              </p>
            ) : null}
            <p className="timeline-detail-row">
              <LocationIcon />
              <a
                href={locationHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                {locationText}
              </a>
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
