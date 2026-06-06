import { fireEvent, render, screen, waitFor } from '@testing-library/react'
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

describe('confirmation layout', () => {
  it('renders localized confirmation copy for English and Italian routes', async () => {
    const english = renderAt('/en/confirmation')

    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent('Confirmation')
    expect(screen.getByText(/Please RSVP by 1st November 2026/i)).toBeInTheDocument()

    english.unmount()

    renderAt('/it/confirmation')

    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent('Conferma')
    expect(
      screen.getByText(/Ti chiediamo di confermare la tua presenza entro il 1 novembre 2026/i),
    ).toBeInTheDocument()
  })

  it('renders a centered copy block and the fixed confirmation image', async () => {
    renderAt('/en/confirmation')

    const shell = await screen.findByTestId('confirmation-shell')
    const copy = screen.getByTestId('confirmation-copy')
    const media = screen.getByTestId('confirmation-media')
    const image = screen.getByTestId('confirmation-image')
    const rsvpLink = screen.getByRole('link', { name: 'RSVP' })

    expect(shell).toBeInTheDocument()
    expect(copy).toBeInTheDocument()
    expect(media).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/images/Confirmation/Together.png')
    expect(image).toHaveAttribute('alt', '')
    expect(rsvpLink).toHaveAttribute('href', '/en/rsvp')
  })

  it('fades in the full content block on route entry', async () => {
    renderAt('/en/confirmation')

    const shell = await screen.findByTestId('confirmation-shell')
    await waitFor(() => expect(shell).toHaveClass('is-visible'))
  })

  it('keeps text before image in document order for stacked mobile layouts', async () => {
    renderAt('/en/confirmation')

    const copy = await screen.findByTestId('confirmation-copy')
    const media = screen.getByTestId('confirmation-media')

    expect(copy.compareDocumentPosition(media) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0)
  })

  it('navigates backward and forward through the confirmation route links', async () => {
    renderAt('/en/confirmation')

    fireEvent.click(await screen.findByRole('link', { name: 'Back' }))
    expect(await screen.findByTestId('recommendation-section')).toBeInTheDocument()

    fireEvent.click(await screen.findByRole('link', { name: 'Continue' }))
    expect(await screen.findByTestId('confirmation-section')).toBeInTheDocument()
  })

  it('opens the RSVP form from the confirmation CTA', async () => {
    renderAt('/en/confirmation')

    fireEvent.click(await screen.findByRole('link', { name: 'RSVP' }))

    expect(await screen.findByRole('heading', { level: 1, name: 'RSVP' })).toBeInTheDocument()
    expect(screen.getByText('Please confirm your attendance.')).toBeInTheDocument()
  })
})
