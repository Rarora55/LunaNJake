import type { CSSProperties, ReactNode } from 'react'

type Props = {
  side: 'left' | 'right'
  iconSrc: string
  text: string
  fallback?: boolean
  onMediaError?: () => void
  style?: CSSProperties
}

export default function TimelineCard({ side, iconSrc, text, fallback = false, onMediaError, style }: Props) {
  return (
    <aside className={`timeline-card ${side}`} style={style}>
      <div className="timeline-card-inner">
        {fallback ? (
          <div className="timeline-icon-fallback" aria-hidden="true">?</div>
        ) : (
          <img className="timeline-icon" src={iconSrc} alt="" aria-hidden="true" onError={onMediaError} />
        )}
        <p>{text}</p>
      </div>
    </aside>
  )
}
