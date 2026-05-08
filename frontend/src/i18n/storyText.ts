import type { Lang } from '../config/storySequence'

const STORY_TEXT = {
  en: {
    story: {
      theFirstTime: 'The first time they saw each other',
      itWas10Am: 'It was 10 am and Luna was still wearing her night-before attire and makeup.',
      facingTheMorning: "Facing the morning after staying over at Jake's flat following a party where she had met his flatmates.",
      readyWallOfShame: 'Ready to face the walk of shame, Jake asked her "who are you?"',
      yourNewFlatmate: 'and Luna replied, "your new flatmate".',
      sheWasNotWrong: 'She was not wrong...!',
    },
    address: {
      venue: "Pelham House, Saint Andrew's Lane, Lewes, UK",
      bus: '11am Shuttle Bus',
      ceremony: 'Ceremony and Reception',
      brunch: 'TBA Post-Wedding Brunch',
    },
  },
  it: {
    story: {
      theFirstTime: 'La prima volta che si sono visti',
      itWas10Am: 'Erano le 10 e Luna indossava ancora il look della sera prima.',
      facingTheMorning: "Affrontava il mattino dopo aver dormito da Jake, dopo una festa in cui aveva conosciuto i suoi coinquilini.",
      readyWallOfShame: 'Pronta per la walk of shame, Jake le chiese "chi sei?"',
      yourNewFlatmate: 'e Luna rispose: "la tua nuova coinquilina".',
      sheWasNotWrong: 'Non aveva torto...!',
    },
    address: {
      venue: "Pelham House, Saint Andrew's Lane, Lewes, UK",
      bus: '11 Shuttle Bus',
      ceremony: 'Cerimonia e Ricevimento',
      brunch: 'Brunch post-matrimonio TBA',
    },
  },
} as const

type StoryKey = keyof (typeof STORY_TEXT)['en']['story']

function translationKeyToField(key: string): StoryKey {
  const field = key.replace('story.', '')
  return (field.charAt(0).toLowerCase() + field.slice(1)) as StoryKey
}

export function resolveStoryText(lang: Lang, translationKey: string): string {
  const field = translationKeyToField(translationKey)
  return STORY_TEXT[lang].story[field]
}

type AddressKey = keyof (typeof STORY_TEXT)['en']['address']

export function getAddressText(lang: Lang): string {
  return STORY_TEXT[lang].address.venue
}

export function resolveAddressTimelineText(lang: Lang, key: AddressKey): string {
  return STORY_TEXT[lang].address[key]
}
