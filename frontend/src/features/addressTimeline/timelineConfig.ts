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
      frontTime: resolveAddressTimelineText(lang, 'busFrontTime'),
      frontLabel: resolveAddressTimelineText(lang, 'busFrontLabel'),
      backTitle: resolveAddressTimelineText(lang, 'busBackTitle'),
      backDescription: resolveAddressTimelineText(lang, 'busBackDescription'),
      locationText: resolveAddressTimelineText(lang, 'busLocation'),
      locationHref:
        'https://www.google.com/maps/search/?api=1&query=Lewes+Station+Car+Park%2C+Lewes%2C+UK',
      detailHintTap: resolveAddressTimelineText(lang, 'detailsTap'),
      detailHintHover: resolveAddressTimelineText(lang, 'detailsHover'),
    },
    {
      id: 'ceremony',
      revealProgress: 0.52,
      markerAsset: '/images/TimeLine/Gabacho2.gif',
      cardSide: 'left',
      cardIconAsset: '/images/TimeLine/Copas.png',
      frontTime: resolveAddressTimelineText(lang, 'ceremonyFrontTime'),
      frontLabel: resolveAddressTimelineText(lang, 'ceremonyFrontLabel'),
      backTitle: resolveAddressTimelineText(lang, 'ceremonyBackTitle'),
      backDescription: resolveAddressTimelineText(lang, 'ceremonyBackDescription'),
      dressCode: resolveAddressTimelineText(lang, 'dressCodeLabel'),
      locationText: resolveAddressTimelineText(lang, 'ceremonyLocation'),
      locationHref:
        'https://www.google.com/maps/search/?api=1&query=Pelham+House%2C+Saint+Andrew%27s+Lane%2C+Lewes%2C+UK',
      detailHintTap: resolveAddressTimelineText(lang, 'detailsTap'),
      detailHintHover: resolveAddressTimelineText(lang, 'detailsHover'),
    },
    {
      id: 'brunch',
      revealProgress: 0.78,
      markerAsset: '/images/TimeLine/Gabacho2.gif',
      cardSide: 'right',
      cardIconAsset: '/images/TimeLine/Breakfast.png',
      frontTime: resolveAddressTimelineText(lang, 'brunchFrontTime'),
      frontLabel: resolveAddressTimelineText(lang, 'brunchFrontLabel'),
      backTitle: resolveAddressTimelineText(lang, 'brunchBackTitle'),
      backDescription: resolveAddressTimelineText(lang, 'brunchBackDescription'),
      locationText: resolveAddressTimelineText(lang, 'brunchLocation'),
      locationHref:
        'https://www.google.com/maps/search/?api=1&query=Pelham+House%2C+Saint+Andrew%27s+Lane%2C+Lewes%2C+UK',
      detailHintTap: resolveAddressTimelineText(lang, 'detailsTap'),
      detailHintHover: resolveAddressTimelineText(lang, 'detailsHover'),
    },
  ]
}
