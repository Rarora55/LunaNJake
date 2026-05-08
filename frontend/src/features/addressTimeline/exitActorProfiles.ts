export type ExitProfile = {
  x: number
  y: number
  rotate: number
  delayMs: number
}

const DIRECTIONS: ReadonlyArray<readonly [number, number]> = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
]

export function buildExitProfile(index: number): ExitProfile {
  const dir = DIRECTIONS[index % DIRECTIONS.length]
  const magnitude = 85 + (index % 5) * 9
  return {
    x: dir[0] * magnitude,
    y: dir[1] * magnitude,
    rotate: ((index * 17) % 24) - 12,
    delayMs: (index % 6) * 70,
  }
}
