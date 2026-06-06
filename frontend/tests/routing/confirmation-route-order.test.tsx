import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from '../../src/routing/storyRoutes'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

describe('confirmation route order', () => {
  it('reaches confirmation immediately after recommendation continue action', async () => {
    renderAt('/en/recommendation')

    fireEvent.click(await screen.findByRole('link', { name: 'Continue' }))

    expect(await screen.findByTestId('confirmation-section')).toBeInTheDocument()
  })

  it('returns to recommendation when navigating backward from confirmation', async () => {
    renderAt('/it/confirmation')

    fireEvent.click(await screen.findByRole('link', { name: 'Indietro' }))

    expect(await screen.findByTestId('recommendation-section')).toBeInTheDocument()
  })

  it('continues from confirmation into colombia', async () => {
    renderAt('/en/confirmation')

    fireEvent.click(await screen.findByRole('link', { name: 'Continue' }))

    expect(await screen.findByTestId('colombia-section')).toBeInTheDocument()
  })
})
