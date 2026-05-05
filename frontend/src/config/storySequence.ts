export type Lang = 'en' | 'it'

export type StoryRouteEntry = {
  id: string
  slug: string
  translationKey: string
  displayMode: 'captioned' | 'highlight'
  nextSlug: string | null
  previousSlug: string | null
}

export const STORY_SEQUENCE: readonly StoryRouteEntry[] = [
  { id: 's1', slug: 'the-first-time', translationKey: 'story.theFirstTime', displayMode: 'captioned', nextSlug: 'it-was-10-am', previousSlug: null },
  { id: 's2', slug: 'it-was-10-am', translationKey: 'story.itWas10Am', displayMode: 'captioned', nextSlug: 'facing-the-morning', previousSlug: 'the-first-time' },
  { id: 's3', slug: 'facing-the-morning', translationKey: 'story.facingTheMorning', displayMode: 'captioned', nextSlug: 'ready-wall-of-shame', previousSlug: 'it-was-10-am' },
  { id: 's4', slug: 'ready-wall-of-shame', translationKey: 'story.readyWallOfShame', displayMode: 'captioned', nextSlug: 'your-new-flatmate', previousSlug: 'facing-the-morning' },
  { id: 's5', slug: 'your-new-flatmate', translationKey: 'story.yourNewFlatmate', displayMode: 'captioned', nextSlug: 'she-was-not-wrong', previousSlug: 'ready-wall-of-shame' },
  { id: 's6', slug: 'she-was-not-wrong', translationKey: 'story.sheWasNotWrong', displayMode: 'highlight', nextSlug: null, previousSlug: 'your-new-flatmate' },
]

export const STORY_SLUGS = STORY_SEQUENCE.map((s) => s.slug)

export const FIRST_STORY_SLUG = STORY_SEQUENCE[0].slug
export const LAST_STORY_SLUG = STORY_SEQUENCE[STORY_SEQUENCE.length - 1].slug

export function getStoryEntry(slug: string): StoryRouteEntry | undefined {
  return STORY_SEQUENCE.find((entry) => entry.slug === slug)
}

export function validateStorySequenceShape(): string[] {
  const errors: string[] = []
  const expectedOrder = [
    'the-first-time',
    'it-was-10-am',
    'facing-the-morning',
    'ready-wall-of-shame',
    'your-new-flatmate',
    'she-was-not-wrong',
  ]

  if (STORY_SEQUENCE.length !== 6) {
    errors.push('Story sequence must contain exactly 6 entries')
  }

  for (let i = 0; i < STORY_SEQUENCE.length; i += 1) {
    const entry = STORY_SEQUENCE[i]
    if (!entry.id || !entry.slug || !entry.translationKey || !entry.displayMode) {
      errors.push(`Missing required field in story entry at index ${i}`)
    }
    if (!entry.translationKey.startsWith('story.')) {
      errors.push(`Entry ${entry.slug} must use story.* translationKey`)
    }
    if (entry.slug !== expectedOrder[i]) {
      errors.push(`Entry at index ${i} must be ${expectedOrder[i]}`)
    }

    if (i === 0 && entry.previousSlug !== null) {
      errors.push('First story entry must have previousSlug null')
    }

    if (i === STORY_SEQUENCE.length - 1 && entry.nextSlug !== null) {
      errors.push('Last story entry must have nextSlug null')
    }

    if (i > 0) {
      const prev = STORY_SEQUENCE[i - 1]
      if (entry.previousSlug !== prev.slug) {
        errors.push(`Entry ${entry.slug} has inconsistent previousSlug`)
      }
      if (prev.nextSlug !== entry.slug) {
        errors.push(`Entry ${prev.slug} has inconsistent nextSlug`)
      }
    }
  }

  const highlight = STORY_SEQUENCE.find((entry) => entry.slug === 'she-was-not-wrong')
  if (highlight?.displayMode !== 'highlight') {
    errors.push('she-was-not-wrong must use highlight display mode')
  }

  return errors
}

