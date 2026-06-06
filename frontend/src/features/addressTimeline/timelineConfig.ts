import type { Lang } from '../../config/storySequence'
import { resolveAddressTimelineText, type AddressKey } from '../../i18n/storyText'
import type {
  ResolvedTimelineMarkerContent,
  TimelineItemConfig,
  TimelineMarkerConfig,
  TimelineMarkerContentConfig,
} from './types'

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

export const TIMELINE_MARKERS: TimelineMarkerConfig[] = [
  { id: 1, x: 8, y: 19, threshold: 0.05, rotation: -8, scale: 0.95 },
  { id: 2, x: 20, y: 54, threshold: 0.16, rotation: 6, scale: 0.9 },
  { id: 3, x: 34, y: 38, threshold: 0.28, rotation: -5, scale: 0.98 },
  { id: 4, x: 50, y: 69, threshold: 0.43, rotation: 9, scale: 0.92 },
  { id: 5, x: 66, y: 56, threshold: 0.58, rotation: -4, scale: 0.88 },
  { id: 6, x: 82, y: 68, threshold: 0.75, rotation: 7, scale: 0.94 },
  { id: 7, x: 94, y: 62, threshold: 0.91, rotation: -6, scale: 0.9 },
]

const TIMELINE_MARKER_CONTENT: TimelineMarkerContentConfig[] = [
  {
    markerId: 1,
    labelKey: 'timelineMarkerBus',
    image: '/images/TimeLine/Bus.png',
    position: 'top',
    xOffset: -8,
    yOffset: -40,
  },
  {
    markerId: 2,
    labelKey: 'timelineMarkerCeremony',
    image: '/images/TimeLine/CasaBoda.png',
    position: 'bottom',
    xOffset: -50,
    yOffset: 12,
  },
  {
    markerId: 3,
    labelKey: 'timelineMarkerAperitive',
    image: '/images/TimeLine/Copas.png',
    position: 'top',
    xOffset: -10,
    yOffset: -35,
  },
  {
    markerId: 4,
    labelKey: 'timelineMarkerDinner',
    image: '/images/TimeLine/AfterDinner.png',
    position: 'bottom',
    xOffset: -40,
    yOffset: 24,
  },
  {
    markerId: 5,
    labelKey: 'timelineMarkerAfterDinner',
    image: '/images/TimeLine/AfterDinner.png',
    position: 'top',
    xOffset: -40,
    yOffset: -30,
  },
  {
    markerId: 6,
    labelKey: 'timelineMarkerParty',
    image: '/images/TimeLine/DanceHall.png',
    position: 'bottom',
    xOffset: -40,
    yOffset: -10,
  },
  {
    markerId: 7,
    labelKey: 'timelineMarkerLeaving',
    image: '/images/TimeLine/Bus.png',
    position: 'top',
    xOffset: -18,
    yOffset: -50,
  },
]

export function getTimelineMarkerContent(lang: Lang): ResolvedTimelineMarkerContent[] {
  return TIMELINE_MARKER_CONTENT.map((item) => ({
    markerId: item.markerId,
    image: item.image,
    xOffset: item.xOffset,
    yOffset: item.yOffset,
    position: item.position,
    text: resolveAddressTimelineText(lang, item.labelKey as AddressKey),
  }))
}
