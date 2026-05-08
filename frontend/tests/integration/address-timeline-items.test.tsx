import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from '../../src/routing/storyRoutes'

describe('address timeline items', () => {
  it('renders intro route then timeline route content', async () => {
    render(
      <MemoryRouter initialEntries={['/en/address-intro']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    const intro = await screen.findByTestId('address-intro-page')
    expect(await screen.findByText("Pelham House, Saint Andrew's Lane, Lewes, UK")).toBeInTheDocument()

    for (let i = 0; i < 14; i += 1) {
      fireEvent.keyDown(intro, { key: 'PageDown' })
    }

    const timeline = await screen.findByTestId('address-timeline-page')
    for (let i = 0; i < 8; i += 1) {
      fireEvent.keyDown(timeline, { key: 'PageDown' })
    }

    expect(await screen.findByText('11am Shuttle Bus')).toBeInTheDocument()
  })
})
