import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from '../../src/routing/storyRoutes'

describe('address line continuity', () => {
  it('navigates from localized address to next and back', async () => {
    render(
      <MemoryRouter initialEntries={['/en/address-intro']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    const intro = await screen.findByTestId('address-intro-page')
    for (let i = 0; i < 14; i += 1) {
      fireEvent.keyDown(intro, { key: 'PageDown' })
    }

    const address = await screen.findByTestId('address-timeline-page')
    for (let i = 0; i < 16; i += 1) {
      fireEvent.keyDown(address, { key: 'PageDown' })
    }

    expect(await screen.findByTestId('placeholder-page')).toHaveAttribute('data-page-title', 'Coming from abroad?')
  })
})
