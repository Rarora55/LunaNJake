import { type KeyboardEvent, type WheelEvent, useRef } from 'react'
import { canTriggerNavigation, resolveDirectionFromKey, resolveDirectionFromWheel } from '../story/navigationController'
import './LunaNJakeScene.css'

type Props = {
  onNavigateBackward: () => void
  onNavigateForward: () => void
  testId?: string
}

export default function LunaNJakeScene({ onNavigateBackward, onNavigateForward, testId }: Props) {
  const lastTriggerMs = useRef(0)
  const touchStartY = useRef<number | null>(null)

  const handleDirection = (direction: 'forward' | 'backward') => {
    const now = Date.now()
    if (!canTriggerNavigation(now, lastTriggerMs.current)) return
    lastTriggerMs.current = now
    if (direction === 'backward') {
      onNavigateBackward()
      return
    }
    onNavigateForward()
  }

  const onWheel = (event: WheelEvent<HTMLElement>) => {
    const direction = resolveDirectionFromWheel(event.deltaY)
    if (!direction) return
    event.preventDefault()
    handleDirection(direction)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const direction = resolveDirectionFromKey(event.key)
    if (!direction) return
    event.preventDefault()
    handleDirection(direction)
  }

  return (
    <main
      className="lnj-scene"
      data-testid={testId ?? 'luna-n-jake-page'}
      onWheel={onWheel}
      onKeyDown={onKeyDown}
      onTouchStart={(event) => {
        touchStartY.current = event.changedTouches[0]?.clientY ?? null
      }}
      onTouchEnd={(event) => {
        const startY = touchStartY.current
        const endY = event.changedTouches[0]?.clientY
        touchStartY.current = null
        if (startY === null || typeof endY !== 'number') return
        const delta = startY - endY
        if (Math.abs(delta) < 20) return
        handleDirection(delta > 0 ? 'forward' : 'backward')
      }}
      tabIndex={0}
    >
      <section className="lnj-content">
        <h1 className="lnj-title">
          Luna &amp; <span className="lnj-jake-wrap"><span className="lnj-j-letter">J</span>ake</span>
        </h1>
        <p className="lnj-subtitle">Monday, 31st of May 2027</p>
        <p className="lnj-subtitle">Save the date!</p>
        <img className="lnj-image" src="/images/End/LNJ.png" alt="Luna and Jake illustration" />
      </section>
    </main>
  )
}
