import type { CSSProperties } from 'react'

type Props = {
  src: string
  size?: number
  style?: CSSProperties
  onError?: () => void
}

export default function TimelineMarker({ src, size = 74, style, onError }: Props) {
  return (
    <div className="timeline-marker" style={{ width: size, height: size, ...style }}>
      <img src={src} alt="" aria-hidden="true" onError={onError} />
    </div>
  )
}
