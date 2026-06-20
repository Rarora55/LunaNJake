import { BACKWARD_KEYS, FORWARD_KEYS, STORY_COOLDOWN_MS, canonicalIntroPath, firstStoryPath, sheSaidYesPath, type StoryDirection } from '../../config/storyInputs'
import { FIRST_STORY_SLUG, LAST_STORY_SLUG, STORY_SEQUENCE, type Lang } from '../../config/storySequence'

export type StoryNavResult = {
  nextPath: string
  direction: StoryDirection
}

export function resolveDirectionFromKey(key: string): StoryDirection | null {
  if (FORWARD_KEYS.includes(key as (typeof FORWARD_KEYS)[number])) {
    return 'forward'
  }
  if (BACKWARD_KEYS.includes(key as (typeof BACKWARD_KEYS)[number])) {
    return 'backward'
  }
  return null
}

export function resolveDirectionFromWheel(deltaY: number): StoryDirection | null {
  if (deltaY > 0) return 'forward'
  if (deltaY < 0) return 'backward'
  return null
}

export function canTriggerNavigation(nowMs: number, lastTriggerMs: number): boolean {
  return nowMs - lastTriggerMs >= STORY_COOLDOWN_MS
}

export function canTriggerNavigationWithCooldown(nowMs: number, lastTriggerMs: number, cooldownMs: number): boolean {
  return nowMs - lastTriggerMs >= cooldownMs
}

export function resolveStoryNavigation(lang: Lang, currentSlug: string, direction: StoryDirection): StoryNavResult {
  const idx = STORY_SEQUENCE.findIndex((entry) => entry.slug === currentSlug)
  if (idx === -1) {
    return { nextPath: canonicalIntroPath(lang), direction }
  }

  if (direction === 'backward') {
    if (currentSlug === FIRST_STORY_SLUG) {
      return { nextPath: firstStoryPath(lang), direction }
    }
    const prevSlug = STORY_SEQUENCE[idx].previousSlug ?? FIRST_STORY_SLUG
    return { nextPath: `/${lang}/story/${prevSlug}`, direction }
  }

  if (currentSlug === LAST_STORY_SLUG) {
    return { nextPath: sheSaidYesPath(lang), direction }
  }

  const nextSlug = STORY_SEQUENCE[idx].nextSlug ?? LAST_STORY_SLUG
  return { nextPath: `/${lang}/story/${nextSlug}`, direction }
}

export function resolveInvalidStorySlug(lang: Lang): string {
  return canonicalIntroPath(lang)
}


