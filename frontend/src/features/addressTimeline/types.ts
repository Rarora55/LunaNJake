export type TimelineSide = 'left' | 'right'
export type TimelineMarkerPosition = 'top' | 'bottom'

export type TransitionPhaseId = 'scatter-exit' | 'address-reveal' | 'line-growth'

export type TransitionPhaseWindow = {
  id: TransitionPhaseId
  startProgress: number
  endProgress: number
}

export type TimelineItemConfig = {
  id: string
  revealProgress: number
  markerAsset: string
  cardSide: TimelineSide
  cardIconAsset: string
  frontTime: string
  frontLabel: string
  backTitle: string
  backDescription: string
  dressCode?: string
  locationText: string
  locationHref: string
  detailHintTap: string
  detailHintHover: string
}

export type MediaStatus = 'ready' | 'failed'

export type TimelineMarkerConfig = {
  id: number
  x: number
  y: number
  threshold: number
  rotation: number
  scale: number
}

export type TimelineMarkerContentConfig = {
  markerId: number
  labelKey: string
  image: string
  xOffset: number
  yOffset: number
  position: TimelineMarkerPosition
}

export type ResolvedTimelineMarkerContent = Omit<TimelineMarkerContentConfig, 'labelKey'> & {
  text: string
}
