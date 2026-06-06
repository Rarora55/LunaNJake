import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Lang } from '../config/storySequence'
import { resolveColombiaText } from '../i18n/storyText'
import './Colombia.css'

type ColombiaProps = {
  lang: Lang
  backPath: string
  nextPath: string
}

export default function Colombia({ lang, backPath, nextPath }: ColombiaProps) {
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })

    const frameId = window.requestAnimationFrame(() => {
      setHasEntered(true)
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [])

  const title = resolveColombiaText(lang, 'title')
  const intro = resolveColombiaText(lang, 'intro')
  const accountIntro = resolveColombiaText(lang, 'accountIntro')
  const accountName = resolveColombiaText(lang, 'accountName')
  const accountNumber = resolveColombiaText(lang, 'accountNumber')
  const sortCode = resolveColombiaText(lang, 'sortCode')
  const iban = resolveColombiaText(lang, 'iban')
  const reference = resolveColombiaText(lang, 'reference')
  const backLabel = lang === 'it' ? 'Indietro' : 'Back'
  const continueLabel = lang === 'it' ? 'Continua' : 'Continue'

  return (
    <section className={`colombia-section ${hasEntered ? 'is-visible' : ''}`} data-testid="colombia-section">
      <div className={`colombia-shell ${hasEntered ? 'is-visible' : ''}`} data-testid="colombia-shell">
        <div className="colombia-copy" data-testid="colombia-copy">
          <h1 className="colombia-title">{title}</h1>
          <p className="colombia-body">{intro}</p>
          <p className="colombia-body">
            {accountIntro}
            <br />
            <br />
            {accountName}
            <br />
            {accountNumber}
            <br />
            {sortCode}
            <br />
            {iban}
            <br />
            {reference}
          </p>

          <nav className="colombia-nav">
            <Link to={backPath} className="colombia-nav-link" aria-label={backLabel}>
              {backLabel}
            </Link>
            <Link to={nextPath} className="colombia-nav-link" aria-label={continueLabel}>
              {continueLabel}
            </Link>
          </nav>
        </div>

        <div className="colombia-media" data-testid="colombia-media">
          <img
            className="colombia-image"
            data-testid="colombia-image"
            src="/images/Colombia/Colombia.png"
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
