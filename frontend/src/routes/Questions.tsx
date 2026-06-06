import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Lang } from '../config/storySequence'
import { questions } from './questionsItems'
import './Questions.css'

type QuestionsProps = {
  lang: Lang
  backPath: string
  nextPath: string
}

export default function Questions({ lang, backPath, nextPath }: QuestionsProps) {
  const [hasEntered, setHasEntered] = useState(false)
  const backLabel = lang === 'it' ? 'Indietro' : 'Back'
  const continueLabel = lang === 'it' ? 'Continua' : 'Continue'

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })

    const frameId = window.requestAnimationFrame(() => {
      setHasEntered(true)
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [])

  return (
    <section
      className={`questions-section ${hasEntered ? 'is-visible' : ''}`}
      data-testid="questions-section"
    >
      <div className="questions-shell">
        <header className={`questions-header ${hasEntered ? 'is-visible' : ''}`}>
          <h1 className="questions-title">Questions</h1>
        </header>

        <div className="questions-list" data-testid="questions-list">
          {questions.map((item) => (
            <article key={item.id} className="questions-item" data-testid={`questions-item-${item.id}`}>
              <h2 className="questions-question">
                {item.question}
              </h2>
              <div className="questions-answer-group">
                {item.answerLines.map((line, answerIndex) => (
                  <p key={`${item.id}-${answerIndex}`} className="questions-answer">
                    {line}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <nav className={`questions-nav ${hasEntered ? 'is-visible' : ''}`}>
          <Link to={backPath} className="questions-nav-link" aria-label={backLabel}>
            {backLabel}
          </Link>
          <Link to={nextPath} className="questions-nav-link" aria-label={continueLabel}>
            {continueLabel}
          </Link>
        </nav>
      </div>
    </section>
  )
}
