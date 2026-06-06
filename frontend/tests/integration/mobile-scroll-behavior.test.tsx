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

function mockMatchMediaMobile(reducedMotion = false) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('max-width: 430px') || (reducedMotion && query.includes('prefers-reduced-motion')),
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

describe('mobile scroll behavior', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('uses shorter mobile cooldown for progression control', async () => {
    mockMatchMediaMobile()
    const now = vi.spyOn(Date, 'now')
    now.mockReturnValue(1000)

    renderAt('/en/story/the-first-time')
    const page = await screen.findByTestId('story-page')

    fireEvent.wheel(page, { deltaY: 120 })
    expect(screen.getByTestId('story-page')).toHaveAttribute('data-slug', 'it-was-10-am')

    now.mockReturnValue(1200)
    fireEvent.wheel(screen.getByTestId('story-page'), { deltaY: 120 })
    expect(screen.getByTestId('story-page')).toHaveAttribute('data-slug', 'it-was-10-am')

    now.mockReturnValue(1500)
    fireEvent.wheel(screen.getByTestId('story-page'), { deltaY: 120 })
    expect(screen.getByTestId('story-page')).toHaveAttribute('data-slug', 'facing-the-morning')
  })

  it('switches to reduced-mobile profile when reduced motion is preferred', async () => {
    mockMatchMediaMobile(true)
    renderAt('/en/story/the-first-time')
    expect(await screen.findByTestId('story-page')).toHaveAttribute('data-mobile-profile', 'reduced-mobile')
  })
})

