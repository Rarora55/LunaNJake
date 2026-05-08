import type { TransitionPhaseWindow } from './types'

export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value))
}

export function mapRange(value: number, start: number, end: number): number {
  if (end <= start) return value >= end ? 1 : 0
  return clamp((value - start) / (end - start))
}

export function phaseProgress(progress: number, phase: TransitionPhaseWindow): number {
  return mapRange(progress, phase.startProgress, phase.endProgress)
}
