import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { AppRoutes } from '../../src/routing/storyRoutes'

function renderRsvp() {
  return render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: '/en/rsvp',
          state: { fromRsvpCta: true },
        },
      ]}
    >
      <AppRoutes />
    </MemoryRouter>,
  )
}

describe('rsvp page', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_SUPABASE_URL', 'https://example.supabase.co')
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'anon-key')
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllEnvs()
  })

  it('validates the required RSVP fields before sending', async () => {
    renderRsvp()

    fireEvent.click(await screen.findByRole('button', { name: 'Send' }))

    expect(await screen.findByText('Please complete the required fields before submitting.')).toBeInTheDocument()
    expect(screen.getByText('Full Name is required.')).toBeInTheDocument()
    expect(screen.getByText('Please tell us if you are attending.')).toBeInTheDocument()
    expect(screen.getByText('Please tell us if you are bringing a plus one.')).toBeInTheDocument()
  })

  it('requires a plus one name when the guest is bringing one', async () => {
    renderRsvp()

    fireEvent.change(await screen.findByLabelText('Full Name'), { target: { value: 'Luna Example' } })
    fireEvent.click(screen.getByLabelText('Yes', { selector: 'input[name="isAttending"]' }))
    fireEvent.click(screen.getByLabelText('Yes', { selector: 'input[name="plusOne"]' }))
    fireEvent.click(screen.getByRole('button', { name: 'Send' }))

    expect(await screen.findByText('Plus one name is required when bringing a plus one.')).toBeInTheDocument()
  })

  it('saves the RSVP and shows a success message without requiring the email step', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(null, { status: 201 }))

    renderRsvp()

    fireEvent.change(await screen.findByLabelText('Full Name'), { target: { value: 'Jake Example' } })
    fireEvent.click(screen.getByLabelText('Yes', { selector: 'input[name="isAttending"]' }))
    fireEvent.click(screen.getByLabelText('No', { selector: 'input[name="plusOne"]' }))
    fireEvent.click(screen.getByRole('button', { name: 'Send' }))

    expect(await screen.findByText('Thank you. Your RSVP has been submitted successfully.')).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0]?.[0]).toBe('https://example.supabase.co/rest/v1/rsvp_confirmations')
  })

  it('calls the email function when notifications are enabled', async () => {
    vi.stubEnv('VITE_RSVP_EMAIL_NOTIFICATIONS_ENABLED', 'true')

    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(null, { status: 201 }))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      )

    renderRsvp()

    fireEvent.change(await screen.findByLabelText('Full Name'), { target: { value: 'Jake Example' } })
    fireEvent.click(screen.getByLabelText('Yes', { selector: 'input[name="isAttending"]' }))
    fireEvent.click(screen.getByLabelText('No', { selector: 'input[name="plusOne"]' }))
    fireEvent.click(screen.getByRole('button', { name: 'Send' }))

    expect(await screen.findByText('Thank you. Your RSVP has been submitted successfully.')).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(fetchMock.mock.calls[0]?.[0]).toBe('https://example.supabase.co/rest/v1/rsvp_confirmations')
    expect(fetchMock.mock.calls[1]?.[0]).toBe('https://example.supabase.co/functions/v1/rsvp-confirmation-email')
  })

  it('shows an error message when the Supabase insert fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ error: 'boom' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    renderRsvp()

    fireEvent.change(await screen.findByLabelText('Full Name'), { target: { value: 'Jake Example' } })
    fireEvent.click(screen.getByLabelText('No', { selector: 'input[name="isAttending"]' }))
    fireEvent.click(screen.getByLabelText('No', { selector: 'input[name="plusOne"]' }))
    fireEvent.click(screen.getByRole('button', { name: 'Send' }))

    await waitFor(() =>
      expect(
        screen.getByText('Sorry, we could not submit your RSVP right now. Please try again.'),
      ).toBeInTheDocument(),
    )
  })
})
