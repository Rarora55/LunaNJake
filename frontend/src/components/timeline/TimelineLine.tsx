import { useLayoutEffect, useRef, useState } from 'react'

type TimelineLineProps = {
  progress: number
}

const LINE_PATH_D =
  'M 8 28 C 102 20, 214 68, 332 54 S 500 94, 620 72 S 802 96, 934 76 S 1086 92, 1188 88'

export default function TimelineLine({ progress }: TimelineLineProps) {
  const pathRef = useRef<SVGPathElement | null>(null)
  const [pathLength, setPathLength] = useState(1200)

  useLayoutEffect(() => {
    if (!pathRef.current) return
    const maybeLength = pathRef.current.getTotalLength?.()
    if (typeof maybeLength === 'number' && maybeLength > 0) {
      setPathLength(maybeLength)
    }
  }, [])

  const dashOffset = (1 - progress) * pathLength

  return (
    <svg className="timeline-svg" viewBox="0 0 1200 120" preserveAspectRatio="none" data-testid="timeline-svg">
      <path
        ref={pathRef}
        d={LINE_PATH_D}
        fill="none"
        stroke="#4C77E6"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={pathLength}
        strokeDashoffset={dashOffset}
        data-testid="timeline-path"
      />
    </svg>
  )
}
