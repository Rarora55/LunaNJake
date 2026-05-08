import { clamp } from './progressMath'

export type LineState = {
  anchorY: number
  progress: number
}

export function createLineState(anchorY = 50): LineState {
  return { anchorY, progress: 0 }
}

export function updateLineProgress(state: LineState, progress: number): LineState {
  return { ...state, progress: clamp(progress) }
}
