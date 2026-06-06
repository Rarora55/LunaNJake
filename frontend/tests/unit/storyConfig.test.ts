import { describe, expect, it } from 'vitest'
import { FIRST_STORY_SLUG, STORY_SEQUENCE, STORY_SLUGS, validateStorySequenceShape } from '../../src/config/storySequence'
import {
  BACKWARD_KEYS,
  canonicalColombiaPath,
  FORWARD_KEYS,
  STORY_COOLDOWN_MS,
} from '../../src/config/storyInputs'
import { resolveColombiaText, resolveConfirmationText } from '../../src/i18n/storyText'

describe('story config', () => {
  it('has exactly 6 ordered entries', () => {
    expect(STORY_SEQUENCE).toHaveLength(6)
    expect(FIRST_STORY_SLUG).toBe('the-first-time')
    expect(STORY_SLUGS[STORY_SLUGS.length - 1]).toBe('she-was-not-wrong')
  })

  it('contains required fields and consistent links', () => {
    expect(validateStorySequenceShape()).toEqual([])
  })

  it('enforces cooldown and strict key lists', () => {
    expect(STORY_COOLDOWN_MS).toBe(700)
    expect(FORWARD_KEYS).toEqual(['ArrowDown', 'PageDown', ' '])
    expect(BACKWARD_KEYS).toEqual(['ArrowUp', 'PageUp'])
  })

  it('resolves confirmation copy from the central dictionary for both languages', () => {
    expect(resolveConfirmationText('en', 'title')).toBe('Confirmation')
    expect(resolveConfirmationText('it', 'title')).toBe('Conferma')
    expect(resolveConfirmationText('en', 'body')).toContain('1st November 2026')
    expect(resolveConfirmationText('it', 'body')).toContain('1 novembre 2026')
  })

  it('resolves colombia copy and canonical route helpers', () => {
    expect(resolveColombiaText('en', 'title')).toBe('Colombia')
    expect(resolveColombiaText('it', 'accountName')).toBe('Account name: Luna Serratore')
    expect(canonicalColombiaPath('en')).toBe('/en/colombia')
    expect(canonicalColombiaPath('it')).toBe('/it/colombia')
  })
})
