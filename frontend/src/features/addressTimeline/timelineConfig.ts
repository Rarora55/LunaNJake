import type { Lang } from '../../config/storySequence'
import { resolveAddressTimelineText } from '../../i18n/storyText'
import type { TimelineItemConfig } from './types'

export function getTimelineItems(lang: Lang): TimelineItemConfig[] {
  return [
    {
      id: 'bus',
      revealProgress: 0.25,
      markerAsset: '/images/TimeLine/Gabacho2.gif',
      cardSide: 'right',
      cardIconAsset: '/images/TimeLine/Bus.png',
      text: resolveAddressTimelineText(lang, 'bus'),
    },
    {
      id: 'ceremony',
      revealProgress: 0.52,
      markerAsset: '/images/TimeLine/Gabacho2.gif',
      cardSide: 'left',
      cardIconAsset: '/images/TimeLine/Copas.png',
      text: resolveAddressTimelineText(lang, 'ceremony'),
    },
    {
      id: 'brunch',
      revealProgress: 0.78,
      markerAsset: '/images/TimeLine/Gabacho2.gif',
      cardSide: 'right',
      cardIconAsset: '/images/TimeLine/Breakfast.png',
      text: resolveAddressTimelineText(lang, 'brunch'),
    },
  ]
}
