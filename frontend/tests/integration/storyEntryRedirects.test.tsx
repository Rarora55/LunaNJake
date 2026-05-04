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
  it('redirects /en/story and /it/story to first story step', async () => {
    renderAt('/en/story')
    expect(await screen.findByTestId('story-page')).toHaveAttribute('data-slug', 'the-first-time')

    renderAt('/it/story')
    expect(await screen.findAllByTestId('story-page')).toHaveLength(2)
  })

  it('redirects unknown localized slug to first step', async () => {
    renderAt('/en/story/unknown-slug')
    expect(await screen.findByTestId('story-page')).toHaveAttribute('data-slug', 'the-first-time')
  })

  it('routes from root language selection to first story step', async () => {
    renderAt('/')
    fireEvent.click(screen.getByRole('button', { name: 'English' }))
    expect(await screen.findByTestId('story-page')).toHaveAttribute('data-slug', 'the-first-time')
  })
})

