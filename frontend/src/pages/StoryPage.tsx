import type { CSSProperties } from 'react'
import { useRef } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { BACKWARD_KEYS, FORWARD_KEYS, firstStoryPath } from '../config/storyInputs'
import { STORY_SEQUENCE, getStoryEntry, type Lang } from '../config/storySequence'
import { resolveStoryText } from '../i18n/storyText'
import {
  canTriggerNavigationWithCooldown,
  resolveDirectionFromWheel,
  resolveInvalidStorySlug,
  resolveStoryNavigation,
} from '../features/story/navigationController'
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

const STORY_IMAGE_BY_SLUG: Record<string, string> = {
  'the-first-time': '/images/story/stintro.png',
  'it-was-10-am': '/images/story/st1.png',
  'facing-the-morning': '/images/story/st2.png',
  'ready-wall-of-shame': '/images/story/st3.png',
  'your-new-flatmate': '/images/story/st4.png',
}

type StackTransform = { x: number; y: number; rotate: number }

function hashSlug(slug: string): number {
  let hash = 0
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0
  }
  return hash
}

function buildStableTransform(slug: string): StackTransform {
  const hash = hashSlug(slug)
  return {
    x: (hash % 23) - 11,
    y: ((Math.floor(hash / 17) % 17) - 8) + 10,
    rotate: ((Math.floor(hash / 47) % 9) - 4) * 1.1,
  }
}

const STACK_TRANSFORMS_BY_SLUG: Record<string, StackTransform> = STORY_SEQUENCE.reduce<Record<string, StackTransform>>(
  (acc, item) => {
    acc[item.slug] = buildStableTransform(item.slug)
    return acc
  },
  {},
)

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
  const hasMatchMedia = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
  const isMobileViewport = hasMatchMedia ? window.matchMedia('(max-width: 430px)').matches : false
  const prefersReducedMotion = hasMatchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  const swipeThresholdPx = isMobileViewport ? 14 : 20
  const transitionCooldownMs = isMobileViewport ? 420 : 700

  const captionedVisible = STORY_SEQUENCE.filter((item, idx) => idx <= activeIndex && item.displayMode === 'captioned')

  const handleDirection = (direction: 'forward' | 'backward') => {
    const now = Date.now()
    if (!canTriggerNavigationWithCooldown(now, lastTriggerMs.current, transitionCooldownMs)) return
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
          '--type-ms': `${prefersReducedMotion ? 1 : Math.max(400, typeChars * TYPEWRITER_CHAR_MS)}ms`,
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
        if (Math.abs(delta) < swipeThresholdPx) return
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
      data-mobile-profile={isMobileViewport ? (prefersReducedMotion ? 'reduced-mobile' : 'mobile') : 'desktop'}
    >
      <section className={`story-stage ${isHighlight ? 'highlight' : 'captioned'}`}>
        <div className={`placeholder-stack ${isHighlight ? 'fade-out' : ''}`} data-testid="placeholder-stack">
          {captionedVisible.map((item, idx) => {
            const isCurrent = idx === captionedVisible.length - 1 && !isHighlight
            const depthFromTop = captionedVisible.length - 1 - idx
            const transformToken = STACK_TRANSFORMS_BY_SLUG[item.slug] ?? { x: 0, y: 8, rotate: 0 }
            const depthFactor = Math.min(1.7, 0.9 + depthFromTop * 0.24)
            const rotateFactor = Math.min(1.85, 1 + depthFromTop * 0.2)
            const x = isCurrent ? 0 : Math.round(transformToken.x * depthFactor)
            const y = isCurrent ? 0 : Math.round(transformToken.y * depthFactor)
            const rotate = isCurrent ? 0 : transformToken.rotate * rotateFactor
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
              >
                <img src={STORY_IMAGE_BY_SLUG[item.slug]} alt="" className="story-photo" loading="eager" />
              </div>
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
