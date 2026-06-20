import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { AppRoutes } from '../../src/routing/storyRoutes'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

function mockMatchMediaDesktop() {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  )
}

describe('desktop non-regression story controls', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('keeps desktop profile and stricter swipe threshold', async () => {
    mockMatchMediaDesktop()
    renderAt('/en/story/the-first-time')
    const page = await screen.findByTestId('story-page')

    expect(page).toHaveAttribute('data-mobile-profile', 'desktop')

    fireEvent.touchStart(page, { changedTouches: [{ clientY: 200 }] })
    fireEvent.touchEnd(page, { changedTouches: [{ clientY: 185 }] })
    expect(screen.getByTestId('story-page')).toHaveAttribute('data-slug', 'the-first-time')
  })

  it('retains desktop cooldown behavior', async () => {
    mockMatchMediaDesktop()
    const now = vi.spyOn(Date, 'now')
    now.mockReturnValue(1000)

    renderAt('/en/story/the-first-time')
    const page = await screen.findByTestId('story-page')
    fireEvent.wheel(page, { deltaY: 100 })
    expect(screen.getByTestId('story-page')).toHaveAttribute('data-slug', 'it-was-10-am')

    now.mockReturnValue(1500)
    fireEvent.wheel(screen.getByTestId('story-page'), { deltaY: 100 })
    expect(screen.getByTestId('story-page')).toHaveAttribute('data-slug', 'it-was-10-am')

    now.mockReturnValue(1800)
    fireEvent.wheel(screen.getByTestId('story-page'), { deltaY: 100 })
    expect(screen.getByTestId('story-page')).toHaveAttribute('data-slug', 'facing-the-morning')
  })

  it('keeps the intro left and right composition groups on desktop', async () => {
    mockMatchMediaDesktop()
    renderAt('/en/intro')

    const leftColumn = await screen.findByTestId('intro-left-column')
    const rightColumn = screen.getByTestId('intro-right-column')

    expect(leftColumn).toContainElement(screen.getByRole('link', { name: 'Continue' }))
    expect(leftColumn).toContainElement(screen.getByTestId('intro-date-image'))
    expect(rightColumn.querySelector('.intro-rings-image')).not.toBeNull()
    expect(rightColumn.querySelector('.intro-details-image')).not.toBeNull()
    expect(leftColumn.compareDocumentPosition(rightColumn) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0)
  })
})
