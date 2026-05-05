import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { AppRoutes } from '../../src/routing/storyRoutes'
import { stepForward, wheelForward } from './helpers/storyInteractions'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

describe('story slideshow flow', () => {
  it('moves through 6-step order one step at a time', async () => {
    const now = vi.spyOn(Date, 'now')
    let current = 1000
    now.mockImplementation(() => current)
    renderAt('/en/story/the-first-time')
    const ordered = [
      'it-was-10-am',
      'facing-the-morning',
      'ready-wall-of-shame',
      'your-new-flatmate',
      'she-was-not-wrong',
    ]

    for (const slug of ordered) {
      current += 800
      stepForward(screen.getByTestId('story-page'))
      expect(await screen.findByTestId('story-page')).toHaveAttribute('data-slug', slug)
    }
    now.mockRestore()
  })

  it('prevents momentum multi-skip inside cooldown window', async () => {
    const now = vi.spyOn(Date, 'now')
    now.mockReturnValue(1000)
    renderAt('/en/story/the-first-time')

    wheelForward(screen.getByTestId('story-page'))
    expect(await screen.findByTestId('story-page')).toHaveAttribute('data-slug', 'it-was-10-am')

    now.mockReturnValue(1100)
    wheelForward(screen.getByTestId('story-page'))
    expect(screen.getByTestId('story-page')).toHaveAttribute('data-slug', 'it-was-10-am')
    now.mockRestore()
  })

  it('uses highlight mode at she-was-not-wrong and then hands off on next step', async () => {
    renderAt('/en/story/she-was-not-wrong')
    expect(await screen.findByTestId('story-page')).toHaveAttribute('data-display-mode', 'highlight')
    expect(screen.getByTestId('placeholder-stack')).toHaveClass('fade-out')

    stepForward(screen.getByTestId('story-page'))
    expect(await screen.findByRole('heading')).toHaveTextContent('EN She Said Yes')
  })

  it('resolves localized text for both languages', async () => {
    const view = renderAt('/en/story/the-first-time')
    expect(await screen.findByTestId('story-text')).toHaveTextContent('The first time they saw each other')
    view.unmount()

    renderAt('/it/story/the-first-time')
    expect(await screen.findByTestId('story-text')).toHaveTextContent('La prima volta che si sono visti')
  })

  it('keeps stacked photos visible under the current centered photo', async () => {
    const now = vi.spyOn(Date, 'now')
    let current = 1000
    now.mockImplementation(() => current)
    renderAt('/en/story/the-first-time')

    current += 800
    stepForward(screen.getByTestId('story-page'))
    current += 800
    stepForward(screen.getByTestId('story-page'))
    await screen.findByTestId('story-page')

    expect(screen.getAllByTestId('stacked-photo').length).toBeGreaterThan(0)
    expect(screen.getByTestId('current-photo')).toBeInTheDocument()
    now.mockRestore()
  })
})
