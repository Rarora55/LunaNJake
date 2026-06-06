import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { AppRoutes } from '../../src/routing/storyRoutes'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

describe('story navigation flow', () => {
  it('moves between adjacent steps with keyboard inputs', async () => {
    renderAt('/en/story/the-first-time')
    const page = await screen.findByTestId('story-page')

    fireEvent.keyDown(page, { key: 'ArrowDown' })
    expect(await screen.findByTestId('story-page')).toHaveAttribute('data-slug', 'it-was-10-am')
  })

  it('clamps backward on first step and hands off from she-was-not-wrong', async () => {
    const first = renderAt('/en/story/the-first-time')
    let page = await screen.findByTestId('story-page')
    fireEvent.keyDown(page, { key: 'ArrowUp' })
    expect(await screen.findByTestId('story-page')).toHaveAttribute('data-slug', 'the-first-time')
    first.unmount()

    const second = renderAt('/it/story/she-was-not-wrong')
    page = await screen.findByTestId('story-page')
    fireEvent.keyDown(page, { key: 'ArrowDown' })
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent('IT She Said Yes')

    const terminal = screen.getByTestId('terminal-page')
    fireEvent.keyDown(terminal, { key: 'ArrowDown' })
    expect(await screen.findByTestId('address-intro-page')).toBeInTheDocument()

    const addressPage = screen.getByTestId('address-intro-page')
    fireEvent.keyDown(addressPage, { key: 'ArrowUp' })
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent('IT She Said Yes')

    const terminalAgain = screen.getByTestId('terminal-page')
    fireEvent.keyDown(terminalAgain, { key: 'ArrowUp' })
    expect(await screen.findByTestId('story-page')).toHaveAttribute('data-slug', 'she-was-not-wrong')

    second.unmount()
    renderAt('/en/address-intro')
    const now = vi.spyOn(Date, 'now')
    now.mockReturnValue(1000)
    const standaloneAddress = await screen.findByTestId('address-intro-page')
    for (let i = 0; i < 16; i += 1) {
      fireEvent.keyDown(standaloneAddress, { key: 'PageDown' })
    }
    const timeline = await screen.findByTestId('address-timeline-page')
    for (let i = 0; i < 16; i += 1) {
      fireEvent.keyDown(timeline, { key: 'PageDown' })
    }
    expect(await screen.findByTestId('placeholder-page')).toHaveAttribute('data-page-title', 'Coming from abroad?')

    now.mockReturnValue(1800)
    const abroadPage = screen.getByTestId('placeholder-page')
    fireEvent.keyDown(abroadPage, { key: 'ArrowUp' })
    expect(await screen.findByTestId('address-timeline-page')).toBeInTheDocument()
    now.mockRestore()
  })

  it('applies cooldown to prevent multiple transitions per gesture window', async () => {
    vi.useFakeTimers()
    const now = vi.spyOn(Date, 'now')
    now.mockReturnValue(1000)

    renderAt('/en/story/the-first-time')
    const page = screen.getByTestId('story-page')

    fireEvent.wheel(page, { deltaY: 100 })
    expect(screen.getByTestId('story-page')).toHaveAttribute('data-slug', 'it-was-10-am')

    now.mockReturnValue(1100)
    fireEvent.wheel(screen.getByTestId('story-page'), { deltaY: 100 })
    expect(screen.getByTestId('story-page')).toHaveAttribute('data-slug', 'it-was-10-am')

    now.mockReturnValue(1800)
    fireEvent.wheel(screen.getByTestId('story-page'), { deltaY: 100 })
    expect(screen.getByTestId('story-page')).toHaveAttribute('data-slug', 'facing-the-morning')

    now.mockRestore()
    vi.useRealTimers()
  })

  it('continues from timeline into recommendation, confirmation, colombia, questions, then LunaNJake', async () => {
    renderAt('/en/timeline')

    fireEvent.click(await screen.findByRole('link', { name: 'Continue' }))
    expect(await screen.findByTestId('recommendation-section')).toBeInTheDocument()

    fireEvent.click(await screen.findByRole('link', { name: 'Continue' }))
    expect(await screen.findByTestId('confirmation-section')).toBeInTheDocument()

    fireEvent.click(await screen.findByRole('link', { name: 'Continue' }))
    expect(await screen.findByTestId('colombia-section')).toBeInTheDocument()

    fireEvent.click(await screen.findByRole('link', { name: 'Continue' }))
    expect(await screen.findByTestId('questions-section')).toBeInTheDocument()

    fireEvent.click(await screen.findByRole('link', { name: 'Continue' }))
    expect(await screen.findByTestId('luna-n-jake-page')).toBeInTheDocument()
  })
})

