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

export function easeInOutSine(value: number): number {
  const t = clamp(value)
  return -(Math.cos(Math.PI * t) - 1) / 2
}

export function easeLineWithStops(progress: number, stops: number[]): number {
  const eased = easeInOutSine(progress)
  const influenceWindow = 0.08
  const maxPull = 0.28

  return clamp(
    stops.reduce((current, stop) => {
      const distance = Math.abs(current - stop)
      if (distance >= influenceWindow) return current
      const pull = ((influenceWindow - distance) / influenceWindow) ** 2 * maxPull
      return current + (stop - current) * pull
    }, eased),
  )
}

export function applyEndLag(progress: number, start = 0.82, strength = 0.16): number {
  const p = clamp(progress)
  if (p <= start) return p

  const tail = mapRange(p, start, 1)
  const delayedTail = 1 - (1 - tail) ** 1.6
  const lagged = start + delayedTail * (1 - start)

  return clamp(lagged - (1 - tail) * strength * (1 - start))
}
