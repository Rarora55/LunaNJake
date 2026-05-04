import type { Lang } from './storySequence'

export const STORY_COOLDOWN_MS = 700

export const FORWARD_KEYS = ['ArrowDown', 'PageDown', ' '] as const
export const BACKWARD_KEYS = ['ArrowUp', 'PageUp'] as const

export type StoryDirection = 'forward' | 'backward'

export const FORWARD_INPUTS = ['wheel-down', 'swipe-up', 'ArrowDown', 'PageDown', 'Space'] as const
export const BACKWARD_INPUTS = ['wheel-up', 'swipe-down', 'ArrowUp', 'PageUp'] as const

export function firstStoryPath(lang: Lang): string {
  return `/${lang}/story/the-first-time`
}

export function sheSaidYesPath(lang: Lang): string {
  return `/${lang}/she-said-yes`
}

export function isStrictKeyboardKey(key: string): boolean {
  return [...FORWARD_KEYS, ...BACKWARD_KEYS].includes(key as (typeof FORWARD_KEYS)[number])
}

