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
  text: string
}

export type MediaStatus = 'ready' | 'failed'
