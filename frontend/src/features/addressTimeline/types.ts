export type TimelineSide = 'left' | 'right'

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
