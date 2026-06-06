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

describe('colombia layout', () => {
  it('renders the colombia copy and image for both language routes', async () => {
    const english = renderAt('/en/colombia')

    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent('Colombia')
    expect(screen.getByText(/Your presence is the best present we could ask for!/i)).toBeInTheDocument()
    expect(screen.getByText(/Account name: Luna Serratore/i)).toBeInTheDocument()

    english.unmount()

    renderAt('/it/colombia')

    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent('Colombia')
    expect(screen.getByText(/For plastic givers please send gifts to the below account:/i)).toBeInTheDocument()
  })

  it('renders the same centered two-column layout pattern as confirmation', async () => {
    renderAt('/en/colombia')

    const shell = await screen.findByTestId('colombia-shell')
    const copy = screen.getByTestId('colombia-copy')
    const media = screen.getByTestId('colombia-media')
    const image = screen.getByTestId('colombia-image')

    expect(shell).toBeInTheDocument()
    expect(copy).toBeInTheDocument()
    expect(media).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/images/Colombia/Colombia.png')
    expect(image).toHaveAttribute('alt', '')
  })

  it('fades in the colombia content block on route entry', async () => {
    renderAt('/en/colombia')

    const shell = await screen.findByTestId('colombia-shell')
    await waitFor(() => expect(shell).toHaveClass('is-visible'))
  })

  it('keeps text before image in document order for stacked mobile layouts', async () => {
    renderAt('/en/colombia')

    const copy = await screen.findByTestId('colombia-copy')
    const media = screen.getByTestId('colombia-media')

    expect(copy.compareDocumentPosition(media) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0)
  })

  it('navigates backward to confirmation and forward to questions', async () => {
    renderAt('/en/colombia')

    fireEvent.click(await screen.findByRole('link', { name: 'Back' }))
    expect(await screen.findByTestId('confirmation-section')).toBeInTheDocument()

    fireEvent.click(await screen.findByRole('link', { name: 'Continue' }))
    expect(await screen.findByTestId('colombia-section')).toBeInTheDocument()

    fireEvent.click(await screen.findByRole('link', { name: 'Continue' }))
    expect(await screen.findByTestId('questions-section')).toBeInTheDocument()
  })
})
