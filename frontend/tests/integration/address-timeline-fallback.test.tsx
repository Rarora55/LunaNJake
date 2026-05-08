import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from '../../src/routing/storyRoutes'

describe('address timeline fallback', () => {
  it('shows placeholder when card media fails', async () => {
    render(
      <MemoryRouter initialEntries={['/en/address-intro']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    const intro = await screen.findByTestId('address-intro-page')
    for (let i = 0; i < 14; i += 1) {
      fireEvent.keyDown(intro, { key: 'PageDown' })
    }

    const page = await screen.findByTestId('address-timeline-page')
    for (let i = 0; i < 12; i += 1) {
      fireEvent.keyDown(page, { key: 'PageDown' })
    }

    const firstIcon = document.querySelector('.timeline-icon')
    expect(firstIcon).not.toBeNull()
    fireEvent.error(firstIcon as Element)
    expect(await screen.findByText('?')).toBeInTheDocument()
  })
})
