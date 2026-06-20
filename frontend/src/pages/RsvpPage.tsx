import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import type { Lang } from '../config/storySequence'
import {
  hasValidationErrors,
  submitRsvp,
  validateRsvpForm,
  type AttendanceAnswer,
  type PlusOneAnswer,
  type RsvpValidationErrors,
} from '../lib/rsvpSubmission'
import './RsvpPage.css'

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
  const [isAttending, setIsAttending] = useState<AttendanceAnswer>('')
  const [plusOne, setPlusOne] = useState<PlusOneAnswer>('')
  const [plusOneName, setPlusOneName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<RsvpValidationErrors>({})
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' })

  const needsPlusOneName = plusOne === 'yes'
  const backToConfirmationLabel = lang === 'it' ? 'Torna alla conferma' : 'Back to confirmation'

  if (!isProtectedAccess) {
    return <Navigate to={`/${lang}/are-you-coming`} replace />
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    const nextErrors = validateRsvpForm({
      fullName,
      isAttending,
      plusOne,
      plusOneName,
    })

    setErrors(nextErrors)
    if (hasValidationErrors(nextErrors)) {
      setStatus({ type: 'error', message: 'Please complete the required fields before submitting.' })
      return
    }

    setIsSubmitting(true)
    setStatus({ type: 'idle', message: '' })

    try {
      await submitRsvp({
        fullName,
        isAttending,
        plusOne,
        plusOneName,
      })

      setStatus({ type: 'success', message: 'Thank you. Your RSVP has been submitted successfully.' })
      setFullName('')
      setIsAttending('')
      setPlusOne('')
      setPlusOneName('')
      setErrors({})
    } catch {
      setStatus({
        type: 'error',
        message: 'Sorry, we could not submit your RSVP right now. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="rsvp-page">
      <section className="rsvp-shell" aria-labelledby="rsvp-title">
        <header className="rsvp-shell-header">
          <Link to={`/${lang}/confirmation`} className="rsvp-back-link">
            {backToConfirmationLabel}
          </Link>
          <h1 id="rsvp-title" className="rsvp-title">RSVP</h1>
          <p className="rsvp-intro">Please confirm your attendance.</p>
        </header>

        <form className="rsvp-form" onSubmit={onSubmit} noValidate>
          <label htmlFor="rsvp-full-name">Full Name</label>
          <input
            id="rsvp-full-name"
            name="fullName"
            type="text"
            required
            aria-invalid={errors.fullName ? 'true' : 'false'}
            aria-describedby={errors.fullName ? 'rsvp-full-name-error' : undefined}
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
          {errors.fullName ? (
            <p id="rsvp-full-name-error" className="rsvp-field-error" role="alert">
              {errors.fullName}
            </p>
          ) : null}

          <fieldset className="rsvp-fieldset">
            <legend>Will you be attending?</legend>
            <label className="rsvp-radio-label">
              <input
                type="radio"
                name="isAttending"
                value="yes"
                required
                checked={isAttending === 'yes'}
                onChange={() => setIsAttending('yes')}
              />
              Yes
            </label>
            <label className="rsvp-radio-label">
              <input
                type="radio"
                name="isAttending"
                value="no"
                required
                checked={isAttending === 'no'}
                onChange={() => setIsAttending('no')}
              />
              No
            </label>
          </fieldset>
          {errors.isAttending ? (
            <p className="rsvp-field-error" role="alert">
              {errors.isAttending}
            </p>
          ) : null}

          <fieldset className="rsvp-fieldset">
            <legend>Are you coming with a +1?</legend>
            <label className="rsvp-radio-label">
              <input
                type="radio"
                name="plusOne"
                value="yes"
                required
                checked={plusOne === 'yes'}
                onChange={() => setPlusOne('yes')}
              />
              Yes
            </label>
            <label className="rsvp-radio-label">
              <input
                type="radio"
                name="plusOne"
                value="no"
                required
                checked={plusOne === 'no'}
                onChange={() => setPlusOne('no')}
              />
              No
            </label>
          </fieldset>
          {errors.plusOne ? (
            <p className="rsvp-field-error" role="alert">
              {errors.plusOne}
            </p>
          ) : null}

          {needsPlusOneName ? (
            <>
              <label htmlFor="rsvp-plus-one-name">+1 Full Name</label>
              <input
                id="rsvp-plus-one-name"
                name="plusOneFullName"
                type="text"
                required={needsPlusOneName}
                aria-invalid={errors.plusOneName ? 'true' : 'false'}
                aria-describedby={errors.plusOneName ? 'rsvp-plus-one-name-error' : undefined}
                value={plusOneName}
                onChange={(event) => setPlusOneName(event.target.value)}
              />
              {errors.plusOneName ? (
                <p id="rsvp-plus-one-name-error" className="rsvp-field-error" role="alert">
                  {errors.plusOneName}
                </p>
              ) : null}
            </>
          ) : null}

          <button className="rsvp-submit" type="submit" disabled={isSubmitting}>
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
