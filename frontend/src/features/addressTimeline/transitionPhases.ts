import type { TransitionPhaseWindow } from './types'

export const TRANSITION_PHASES: readonly TransitionPhaseWindow[] = [
  { id: 'scatter-exit', startProgress: 0, endProgress: 0.45 },
  { id: 'address-reveal', startProgress: 0.4, endProgress: 0.7 },
  { id: 'line-growth', startProgress: 0.65, endProgress: 1 },
] as const
