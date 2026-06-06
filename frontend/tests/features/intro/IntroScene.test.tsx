import { act, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { AppRoutes } from '../../../src/routing/storyRoutes'

function renderIntro(path = '/en/intro') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

describe('IntroScene', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('advances and reverses steps using scroll, showing only one block at a time', async () => {
    renderIntro('/en/intro')

    expect(screen.getByText(/The first time they saw each other/i)).toBeInTheDocument()
    expect(screen.queryByText('She was not wrong...')).not.toBeInTheDocument()

    fireEvent.wheel(screen.getByTestId('intro-scene'), { deltaY: 200 })
    act(() => vi.advanceTimersByTime(900))
    expect(screen.getByText('She was not wrong...')).toBeInTheDocument()
    expect(screen.queryByText(/The first time they saw each other/i)).not.toBeInTheDocument()

    fireEvent.wheel(screen.getByTestId('intro-scene'), { deltaY: -200 })
    act(() => vi.advanceTimersByTime(900))
    expect(screen.getByText(/The first time they saw each other/i)).toBeInTheDocument()
    expect(screen.queryByText('She was not wrong...')).not.toBeInTheDocument()
  })

  it('reaches final step via scroll and exposes continue CTA', async () => {
    renderIntro('/en/intro')

    fireEvent.wheel(screen.getByTestId('intro-scene'), { deltaY: 200 })
    act(() => vi.advanceTimersByTime(900))
    fireEvent.wheel(screen.getByTestId('intro-scene'), { deltaY: 200 })
    act(() => vi.advanceTimersByTime(900))

    expect(screen.getByText('Luna')).toBeInTheDocument()
    expect(screen.getByText('Jake')).toBeInTheDocument()
    expect(screen.getByText('&')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Continue' })).toBeInTheDocument()
  })

  it('navigates to same-language timeline route from continue CTA', async () => {
    renderIntro('/it/intro')

    fireEvent.wheel(screen.getByTestId('intro-scene'), { deltaY: 200 })
    act(() => vi.advanceTimersByTime(900))
    fireEvent.wheel(screen.getByTestId('intro-scene'), { deltaY: 200 })
    act(() => vi.advanceTimersByTime(900))

    act(() => {
      fireEvent.click(screen.getByRole('link', { name: 'Continua' }))
    })

    expect(screen.getByTestId('timeline-section')).toBeInTheDocument()
  })
})
