import type { Lang } from './storySequence'

export const STORY_COOLDOWN_MS = 700

export const FORWARD_KEYS = ['ArrowDown', 'PageDown', ' '] as const
export const BACKWARD_KEYS = ['ArrowUp', 'PageUp'] as const

export type StoryDirection = 'forward' | 'backward'

export const FORWARD_INPUTS = ['wheel-down', 'swipe-up', 'ArrowDown', 'PageDown', 'Space'] as const
export const BACKWARD_INPUTS = ['wheel-up', 'swipe-down', 'ArrowUp', 'PageUp'] as const
export const FLOW_FALLBACK_LANG: Lang = 'en'

export function firstStoryPath(lang: Lang): string {
  return `/${lang}/intro`
}

export function sheSaidYesPath(lang: Lang): string {
  return `/${lang}/LunaNJake`
}

export function canonicalIntroPath(lang: Lang): string {
  return `/${lang}/intro`
}

export function canonicalMarriedPath(lang: Lang): string {
  return `/${lang}/LunaNJake`
}

export function canonicalTimelinePath(lang: Lang): string {
  return `/${lang}/timeline`
}

export function canonicalRecommendationPath(lang: Lang): string {
  return `/${lang}/recommendation`
}

export function canonicalConfirmationPath(lang: Lang): string {
  return `/${lang}/confirmation`
}

export function canonicalColombiaPath(lang: Lang): string {
  return `/${lang}/colombia`
}

export function canonicalQuestionsPath(lang: Lang): string {
  return `/${lang}/questions`
}

export function introAliasPath(): string {
  return '/intro'
}

export function marriedAliasPath(): string {
  return '/LunaNJake'
}

export function recommendationAliasPath(): string {
  return '/recommendation'
}

export function confirmationAliasPath(): string {
  return '/confirmation'
}

export function colombiaAliasPath(): string {
  return '/colombia'
}

export function questionsAliasPath(): string {
  return '/questions'
}

export function introFallbackPath(): string {
  return canonicalIntroPath(FLOW_FALLBACK_LANG)
}

export function marriedFallbackPath(): string {
  return canonicalMarriedPath(FLOW_FALLBACK_LANG)
}

export function recommendationFallbackPath(): string {
  return canonicalRecommendationPath(FLOW_FALLBACK_LANG)
}

export function confirmationFallbackPath(): string {
  return canonicalConfirmationPath(FLOW_FALLBACK_LANG)
}

export function colombiaFallbackPath(): string {
  return canonicalColombiaPath(FLOW_FALLBACK_LANG)
}

export function questionsFallbackPath(): string {
  return canonicalQuestionsPath(FLOW_FALLBACK_LANG)
}

export function isStrictKeyboardKey(key: string): boolean {
  return [...FORWARD_KEYS, ...BACKWARD_KEYS].includes(key as (typeof FORWARD_KEYS)[number])
}

