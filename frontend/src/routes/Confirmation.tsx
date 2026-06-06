import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Lang } from '../config/storySequence'
import { resolveConfirmationText } from '../i18n/storyText'
import './Confirmation.css'

type ConfirmationProps = {
  lang: Lang
  backPath: string
  nextPath: string
}

export default function Confirmation({ lang, backPath, nextPath }: ConfirmationProps) {
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })

    const frameId = window.requestAnimationFrame(() => {
      setHasEntered(true)
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [])

  const title = resolveConfirmationText(lang, 'title')
  const body = resolveConfirmationText(lang, 'body')
  const backLabel = lang === 'it' ? 'Indietro' : 'Back'
  const continueLabel = lang === 'it' ? 'Continua' : 'Continue'
  const rsvpLabel = 'RSVP'

  return (
    <section
      className={`confirmation-section ${hasEntered ? 'is-visible' : ''}`}
      data-testid="confirmation-section"
    >
      <div
        className={`confirmation-shell ${hasEntered ? 'is-visible' : ''}`}
        data-testid="confirmation-shell"
      >
        <div className="confirmation-copy" data-testid="confirmation-copy">
          <h1 className="confirmation-title">{title}</h1>
          <p className="confirmation-body">{body}</p>

          <Link
            to={`/${lang}/rsvp`}
            state={{ fromRsvpCta: true }}
            className="confirmation-rsvp-cta"
            aria-label={rsvpLabel}
          >
            {rsvpLabel}
          </Link>

          <nav className="confirmation-nav">
            <Link to={backPath} className="confirmation-nav-link" aria-label={backLabel}>
              {backLabel}
            </Link>
            <Link to={nextPath} className="confirmation-nav-link" aria-label={continueLabel}>
              {continueLabel}
            </Link>
          </nav>
        </div>

        <div className="confirmation-media" data-testid="confirmation-media">
          <img
            className="confirmation-image"
            data-testid="confirmation-image"
            src="/images/Confirmation/Together.png"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}
