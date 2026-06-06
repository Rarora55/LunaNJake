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

describe('intro-married routes', () => {
  it('redirects legacy story and she-said-yes routes to /en/intro', async () => {
    renderAt('/story/anything')
    expect(await screen.findByTestId('intro-scene')).toBeInTheDocument()

    renderAt('/it/story')
    expect(await screen.findAllByTestId('intro-scene')).toHaveLength(2)

    renderAt('/en/she-said-yes')
    expect(await screen.findAllByTestId('intro-scene')).toHaveLength(3)
  })

  it('redirects aliases to english canonical routes', async () => {
    renderAt('/intro')
    expect(await screen.findByTestId('intro-scene')).toBeInTheDocument()

    renderAt('/recommendation')
    expect(await screen.findByTestId('recommendation-section')).toBeInTheDocument()

    renderAt('/colombia')
    expect(await screen.findByTestId('colombia-section')).toBeInTheDocument()

    renderAt('/questions')
    expect(await screen.findByTestId('questions-section')).toBeInTheDocument()

    renderAt('/LunaNJake')
    expect(await screen.findByTestId('luna-n-jake-page')).toBeInTheDocument()
  })

  it('uses language selector to enter canonical intro routes', async () => {
    renderAt('/')
    fireEvent.click(screen.getByRole('button', { name: 'Italiano' }))
    expect(await screen.findByTestId('intro-scene')).toBeInTheDocument()
  })
})
