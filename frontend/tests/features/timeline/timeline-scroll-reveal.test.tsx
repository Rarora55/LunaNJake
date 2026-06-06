import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from '../../../src/routing/storyRoutes'

describe('timeline scroll reveal', () => {
  it('updates path dash offset based on scroll progress', async () => {
    render(
      <MemoryRouter initialEntries={['/en/timeline']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    const path = await screen.findByTestId('timeline-path')
    const startOffset = Number(path.getAttribute('stroke-dashoffset'))
    expect(startOffset).toBeGreaterThan(0)

    fireEvent.wheel(screen.getByTestId('timeline-stage'), { deltaY: 260 })

    const nextOffset = Number(path.getAttribute('stroke-dashoffset'))
    expect(nextOffset).toBeLessThan(startOffset)
  })
})
