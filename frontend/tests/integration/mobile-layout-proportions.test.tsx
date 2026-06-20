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

function mockMatchMediaMobile() {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('max-width: 768px') || query.includes('max-width: 430px'),
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

describe('mobile layout proportions behavior', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('keeps marker content associated on timeline routes in a mobile environment', async () => {
    mockMatchMediaMobile()
    renderAt('/en/timeline')

    fireEvent.wheel(screen.getByTestId('timeline-stage'), { deltaY: 260 })

    const content = await screen.findByTestId('timeline-marker-content-1')
    expect(content).toHaveAttribute('data-visible', 'true')
    expect(content).toHaveAttribute('data-position', 'top')
    expect(screen.getByText('11:00 Bus')).toBeInTheDocument()
  })

  it('keeps confirmation copy before the fixed image in a mobile environment', async () => {
    mockMatchMediaMobile()
    renderAt('/en/confirmation')

    const copy = await screen.findByTestId('confirmation-copy')
    const image = screen.getByTestId('confirmation-image')

    expect(copy.compareDocumentPosition(image) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0)
    expect(image).toHaveAttribute('src', '/images/Confirmation/Together.png')
  })

  it('keeps the intro date block readable and ordered on mobile', async () => {
    mockMatchMediaMobile()
    renderAt('/en/intro')

    const leftColumn = await screen.findByTestId('intro-left-column')
    const dateImage = screen.getByTestId('intro-date-image')
    const timer = screen.getByRole('timer')
    const rightColumn = screen.getByTestId('intro-right-column')

    expect(leftColumn).toContainElement(dateImage)
    expect(leftColumn).toContainElement(timer)
    expect(dateImage).toHaveAttribute('src', '/images/Home2/Monday.png')
    expect(leftColumn.compareDocumentPosition(rightColumn) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0)
  })
})
