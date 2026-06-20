import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from '../../../src/routing/storyRoutes'

describe('timeline marker thresholds', () => {
  it('reveals later markers progressively and reverses when scroll regresses', async () => {
    render(
      <MemoryRouter initialEntries={['/en/timeline']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    const marker1 = await screen.findByTestId('timeline-marker-1')
    const marker6 = await screen.findByTestId('timeline-marker-6')
    const markerContent1 = await screen.findByTestId('timeline-marker-content-1')
    const markerContent6 = await screen.findByTestId('timeline-marker-content-6')

    expect(marker1).toHaveAttribute('data-visible', 'false')
    expect(marker6).toHaveAttribute('data-visible', 'false')
    expect(markerContent1).toHaveAttribute('data-visible', 'false')
    expect(markerContent6).toHaveAttribute('data-visible', 'false')
    expect(screen.queryByTestId('timeline-marker-7')).not.toBeInTheDocument()

    fireEvent.wheel(screen.getByTestId('timeline-stage'), { deltaY: 260 })

    expect(marker1).toHaveAttribute('data-visible', 'true')
    expect(marker6).toHaveAttribute('data-visible', 'false')
    expect(markerContent1).toHaveAttribute('data-visible', 'true')
    expect(screen.getByText('11:00 Bus')).toBeInTheDocument()

    for (let i = 0; i < 20; i += 1) {
      fireEvent.wheel(screen.getByTestId('timeline-stage'), { deltaY: 260 })
    }

    expect(marker6).toHaveAttribute('data-visible', 'true')
    expect(markerContent6).toHaveAttribute('data-visible', 'true')
    expect(screen.getByText('17:00 Leaving')).toBeInTheDocument()

    for (let i = 0; i < 20; i += 1) {
      fireEvent.wheel(screen.getByTestId('timeline-stage'), { deltaY: -260 })
    }

    expect(marker6).toHaveAttribute('data-visible', 'false')
    expect(markerContent6).toHaveAttribute('data-visible', 'false')
  })
})
