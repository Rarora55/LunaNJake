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

describe('story entry redirects', () => {
  it('redirects /en/story and /it/story to english intro fallback', async () => {
    renderAt('/en/story')
    expect(await screen.findByTestId('intro-scene')).toBeInTheDocument()

    renderAt('/it/story')
    expect(await screen.findAllByTestId('intro-scene')).toHaveLength(2)
  })

  it('redirects unknown localized slug to english intro fallback', async () => {
    renderAt('/en/story/unknown-slug')
    expect(await screen.findByTestId('intro-scene')).toBeInTheDocument()
  })

  it('routes from root language selection to localized intro', async () => {
    renderAt('/')
    fireEvent.click(screen.getByRole('button', { name: 'English' }))
    expect(await screen.findByTestId('intro-scene')).toBeInTheDocument()
  })
})

