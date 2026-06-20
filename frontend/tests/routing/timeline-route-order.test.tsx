import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from '../../src/routing/storyRoutes'

function renderAt(path = '/en/intro') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

describe('timeline route order', () => {
  it('reaches timeline immediately after intro continue action', async () => {
    renderAt('/en/intro')
    fireEvent.click(screen.getByRole('link', { name: 'Continue' }))
    expect(screen.getByTestId('timeline-section')).toBeInTheDocument()
  })

  it('shows localized marker labels for the active route language', async () => {
    renderAt('/it/timeline')

    fireEvent.wheel(screen.getByTestId('timeline-stage'), { deltaY: 260 })

    expect(screen.getByText('11:00 Bus')).toBeInTheDocument()

    for (let i = 0; i < 20; i += 1) {
      fireEvent.wheel(screen.getByTestId('timeline-stage'), { deltaY: 260 })
    }

    expect(screen.getByText('17:00 Rientro')).toBeInTheDocument()
  })

  it('continues from timeline into recommendation, confirmation, colombia, questions, then LunaNJake', async () => {
    renderAt('/en/timeline')

    fireEvent.click(screen.getByRole('link', { name: 'Continue' }))
    expect(screen.getByTestId('recommendation-section')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('link', { name: 'Continue' }))
    expect(screen.getByTestId('confirmation-section')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('link', { name: 'Continue' }))
    expect(screen.getByTestId('colombia-section')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('link', { name: 'Continue' }))
    expect(screen.getByTestId('questions-section')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('link', { name: 'Continue' }))
    expect(screen.getByTestId('luna-n-jake-page')).toBeInTheDocument()
  })
})
