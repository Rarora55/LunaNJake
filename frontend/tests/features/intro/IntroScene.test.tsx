import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from '../../../src/routing/storyRoutes'

function renderIntro(path = '/en/intro') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

describe('IntroScene', () => {
  it('renders only the final intro scene immediately', async () => {
    renderIntro('/en/intro')

    expect(screen.getByRole('link', { name: 'Continue' })).toBeInTheDocument()
    expect(screen.getByAltText('Monday 31 May 2027')).toBeInTheDocument()
    expect(screen.queryByText(/The first time they saw each other/i)).not.toBeInTheDocument()
    expect(screen.queryByText('She was not wrong...')).not.toBeInTheDocument()
  })

  it('exposes the continue CTA on first render', async () => {
    renderIntro('/en/intro')
    expect(screen.getByText('Luna')).toBeInTheDocument()
    expect(screen.getByText('Jake')).toBeInTheDocument()
    expect(screen.getByText('&')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Continue' })).toBeInTheDocument()
  })

  it('renders the date artwork with a four-part countdown block', async () => {
    renderIntro('/en/intro')

    expect(screen.getByTestId('intro-date-block')).toBeInTheDocument()
    expect(screen.getByTestId('intro-date-image')).toHaveAttribute('src', '/images/Home2/Monday.png')
    expect(screen.getByRole('timer')).toBeInTheDocument()
    expect(screen.getByText('Days')).toBeInTheDocument()
    expect(screen.getByText('Hours')).toBeInTheDocument()
    expect(screen.getByText('Minutes')).toBeInTheDocument()
    expect(screen.getByText('Seconds')).toBeInTheDocument()
    expect(screen.queryByText('31 May 2027')).not.toBeInTheDocument()
  })

  it('navigates to same-language timeline route from continue CTA without prior scroll', async () => {
    renderIntro('/it/intro')

    fireEvent.click(screen.getByRole('link', { name: 'Continua' }))

    expect(screen.getByTestId('timeline-section')).toBeInTheDocument()
  })
})
