import { useMemo, useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import type { Lang } from '../config/storySequence'
import './RsvpPage.css'

type PlusOneAnswer = 'yes' | 'no' | ''
type RsvpNavState = { fromRsvpCta?: boolean }

function normalizeLang(value: string | undefined): Lang {
  return value === 'it' ? 'it' : 'en'
}

export default function RsvpPage() {
  const { lang: langParam } = useParams<{ lang: string }>()
  const lang = normalizeLang(langParam)
  const location = useLocation()
  const navState = (location.state ?? {}) as RsvpNavState
  const isProtectedAccess = navState.fromRsvpCta === true

  const [fullName, setFullName] = useState('')
  const [plusOne, setPlusOne] = useState<PlusOneAnswer>('')
  const [plusOneName, setPlusOneName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' })

  const needsPlusOneName = plusOne === 'yes'
  const backToConfirmationLabel = lang === 'it' ? 'Torna alla conferma' : 'Back to confirmation'
  const canSubmit = useMemo(() => {
    if (!fullName.trim()) return false
    if (!plusOne) return false
    if (needsPlusOneName && !plusOneName.trim()) return false
    return true
  }, [fullName, needsPlusOneName, plusOne, plusOneName])

  if (!isProtectedAccess) {
    return <Navigate to={`/${lang}/are-you-coming`} replace />
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit || isSubmitting) return
    setIsSubmitting(true)
    setStatus({ type: 'idle', message: '' })

    try {
      const payload = {
        fullName: fullName.trim(),
        comingWithPlusOne: plusOne === 'yes' ? 'Yes' : 'No',
        plusOneFullName: needsPlusOneName ? plusOneName.trim() : '',
      }

      const response = await fetch('https://formsubmit.co/ajax/ramwill1991@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Wedding RSVP - ${payload.fullName}`,
          _template: 'table',
          _captcha: 'false',
          'Guest full name': payload.fullName,
          'Coming with +1': payload.comingWithPlusOne,
          ...(payload.plusOneFullName ? { '+1 full name': payload.plusOneFullName } : {}),
        }),
      })

      if (!response.ok) {
        throw new Error(`RSVP request failed with status ${response.status}`)
      }

      setStatus({ type: 'success', message: 'Thank you. Your RSVP has been sent successfully.' })
      setFullName('')
      setPlusOne('')
      setPlusOneName('')
    } catch {
      setStatus({ type: 'error', message: 'Sorry, we could not send your RSVP right now. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="rsvp-page">
      <section className="rsvp-shell" aria-labelledby="rsvp-title">
        <Link to={`/${lang}/confirmation`} className="rsvp-back-link">
          {backToConfirmationLabel}
        </Link>
        <h1 id="rsvp-title">RSVP</h1>
        <p className="rsvp-intro">Please confirm your attendance.</p>

        <form className="rsvp-form" onSubmit={onSubmit} noValidate>
          <label htmlFor="rsvp-full-name">Full Name</label>
          <input id="rsvp-full-name" name="fullName" type="text" required value={fullName} onChange={(event) => setFullName(event.target.value)} />

          <fieldset className="rsvp-fieldset">
            <legend>Are you coming with a +1?</legend>
            <label className="rsvp-radio-label">
              <input type="radio" name="plusOne" value="yes" required checked={plusOne === 'yes'} onChange={() => setPlusOne('yes')} />
              Yes
            </label>
            <label className="rsvp-radio-label">
              <input type="radio" name="plusOne" value="no" required checked={plusOne === 'no'} onChange={() => setPlusOne('no')} />
              No
            </label>
          </fieldset>

          {needsPlusOneName ? (
            <>
              <label htmlFor="rsvp-plus-one-name">+1 Full Name</label>
              <input
                id="rsvp-plus-one-name"
                name="plusOneFullName"
                type="text"
                required={needsPlusOneName}
                value={plusOneName}
                onChange={(event) => setPlusOneName(event.target.value)}
              />
            </>
          ) : null}

          <button type="submit" disabled={!canSubmit || isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </form>

        {status.type !== 'idle' ? (
          <p className={`rsvp-status ${status.type === 'success' ? 'success' : 'error'}`} role="status" aria-live="polite">
            {status.message}
          </p>
        ) : null}
      </section>
    </main>
  )
}
