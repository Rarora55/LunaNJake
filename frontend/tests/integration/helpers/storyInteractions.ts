import { fireEvent } from '@testing-library/react'

export function stepForward(node: HTMLElement) {
  fireEvent.keyDown(node, { key: 'ArrowDown' })
}

export function stepBackward(node: HTMLElement) {
  fireEvent.keyDown(node, { key: 'ArrowUp' })
}

export function wheelForward(node: HTMLElement, deltaY = 100) {
  fireEvent.wheel(node, { deltaY })
}

