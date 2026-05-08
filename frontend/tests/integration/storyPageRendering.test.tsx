import { render, screen } from '@testing-library/react'
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

describe('story page rendering', () => {
  it('renders generic slug-driven story page', async () => {
    renderAt('/en/story/ready-wall-of-shame')
    expect(await screen.findByTestId('story-page')).toHaveAttribute('data-slug', 'ready-wall-of-shame')
  })

  it('renders localized slug routes in both languages', async () => {
    renderAt('/en/story/she-was-not-wrong')
    expect(await screen.findByTestId('story-page')).toHaveAttribute('data-slug', 'she-was-not-wrong')

    renderAt('/it/story/she-was-not-wrong')
    const pages = await screen.findAllByTestId('story-page')
    expect(pages.length).toBeGreaterThan(0)
  })

  it('renders all new placeholder routes', async () => {
    const routes = [
      { path: '/en/coming-from-abroad', title: 'Coming from abroad?' },
      { path: '/en/travelling-from-london', title: 'Travelling from London?' },
      { path: '/en/where-to-stay', title: 'Where to stay' },
      { path: '/en/message-to-the-guest', title: 'Message to the guest' },
      { path: '/en/are-you-coming', title: 'Are you coming?' },
    ]

    const addressIntro = renderAt('/en/address-intro')
    expect(await screen.findByTestId('address-intro-page')).toBeInTheDocument()
    addressIntro.unmount()

    const address = renderAt('/en/address')
    expect(await screen.findByTestId('address-timeline-page')).toBeInTheDocument()
    address.unmount()

    for (const route of routes) {
      const view = renderAt(route.path)
      const page = await screen.findByTestId('placeholder-page')
      expect(page).toHaveAttribute('data-page-title', route.title)
      expect(await screen.findByRole('heading', { name: route.title })).toBeInTheDocument()
      view.unmount()
    }
  })
})
