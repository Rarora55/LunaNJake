import type { CSSProperties } from 'react'
import { useRef } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { BACKWARD_KEYS, FORWARD_KEYS, firstStoryPath } from '../config/storyInputs'
import { STORY_SEQUENCE, getStoryEntry, type Lang } from '../config/storySequence'
import { resolveStoryText } from '../i18n/storyText'
import { canTriggerNavigation, resolveDirectionFromWheel, resolveInvalidStorySlug, resolveStoryNavigation } from '../features/story/navigationController'
import { HIGHLIGHT_FADE_MS, STEP_TRANSITION_EASE, STEP_TRANSITION_MS, TYPEWRITER_CHAR_MS } from '../features/story/transitions'
import './StoryPage.css'

function isLang(value: string | undefined): value is Lang {
  return value === 'en' || value === 'it'
}

function resolveDirectionFromKey(key: string): 'forward' | 'backward' | null {
  if (FORWARD_KEYS.includes(key as (typeof FORWARD_KEYS)[number])) return 'forward'
  if (BACKWARD_KEYS.includes(key as (typeof BACKWARD_KEYS)[number])) return 'backward'
  return null
}

export default function StoryPage() {
  const { lang, slug } = useParams<{ lang: string; slug: string }>()
  const navigate = useNavigate()
  const lastTriggerMs = useRef(0)
  const touchStartY = useRef<number | null>(null)

  if (!isLang(lang)) return <Navigate to="/" replace />
  if (!slug) return <Navigate to={firstStoryPath(lang)} replace />

  const entry = getStoryEntry(slug)
  if (!entry) return <Navigate to={resolveInvalidStorySlug(lang)} replace />

  const activeIndex = STORY_SEQUENCE.findIndex((item) => item.slug === entry.slug)
  const directionClass = 'step-enter-up'

  const storyText = resolveStoryText(lang, entry.translationKey)
  const typeChars = Math.max(1, Math.ceil(storyText.length))

  const isHighlight = entry.displayMode === 'highlight'

  const stackTransforms = [
    { x: -18, y: 14, rotate: -3 },
    { x: 16, y: 10, rotate: 2 },
    { x: -10, y: 18, rotate: 4 },
    { x: 12, y: 16, rotate: -2 },
  ] as const

  const captionedVisible = STORY_SEQUENCE.filter((item, idx) => idx <= activeIndex && item.displayMode === 'captioned')

  const handleDirection = (direction: 'forward' | 'backward') => {
    const now = Date.now()
    if (!canTriggerNavigation(now, lastTriggerMs.current)) return
    lastTriggerMs.current = now
    const result = resolveStoryNavigation(lang, entry.slug, direction)
    navigate(result.nextPath)
  }

  return (
    <main
      className={`story-root ${directionClass}`}
      style={
        {
          '--step-ms': `${STEP_TRANSITION_MS}ms`,
          '--step-ease': STEP_TRANSITION_EASE,
          '--type-ms': `${Math.max(400, typeChars * TYPEWRITER_CHAR_MS)}ms`,
          '--fade-ms': `${HIGHLIGHT_FADE_MS}ms`,
        } as CSSProperties
      }
      onWheel={(event) => {
        const direction = resolveDirectionFromWheel(event.deltaY)
        if (!direction) return
        event.preventDefault()
        handleDirection(direction)
      }}
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
      onKeyDown={(event) => {
        const direction = resolveDirectionFromKey(event.key)
        if (!direction) return
        event.preventDefault()
        handleDirection(direction)
      }}
      tabIndex={0}
      data-testid="story-page"
      data-slug={entry.slug}
      data-display-mode={entry.displayMode}
      data-active-index={activeIndex}
    >
      <section className={`story-stage ${isHighlight ? 'highlight' : 'captioned'}`}>
        <div className={`placeholder-stack ${isHighlight ? 'fade-out' : ''}`} data-testid="placeholder-stack">
          {captionedVisible.map((item, idx) => {
            const isCurrent = idx === captionedVisible.length - 1 && !isHighlight
            const depthFromTop = captionedVisible.length - 1 - idx
            const transformToken = stackTransforms[depthFromTop % stackTransforms.length]
            const x = isCurrent ? 0 : transformToken.x
            const y = isCurrent ? 0 : transformToken.y
            const rotate = isCurrent ? 0 : transformToken.rotate
            return (
              <div
                key={item.slug}
                className={`photo-placeholder ${isCurrent ? 'current-photo' : 'stacked-photo'}`}
                data-testid={isCurrent ? 'current-photo' : 'stacked-photo'}
                style={
                  {
                    zIndex: isCurrent ? 100 : idx + 1,
                    '--stack-x': `${x}px`,
                    '--stack-y': `${y}px`,
                    '--stack-rotate': `${rotate}deg`,
                  } as CSSProperties
                }
              />
            )
          })}
        </div>
        <p
          className={`story-text typewriter ${isHighlight ? 'centered' : ''}`}
          data-testid="story-text"
          key={`${entry.slug}-${lang}`}
        >
          {storyText}
        </p>
      </section>
    </main>
  )
}
