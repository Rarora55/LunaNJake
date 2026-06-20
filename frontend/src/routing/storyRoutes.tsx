import { useEffect, useRef, useState, type KeyboardEvent, type WheelEvent } from 'react'
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import {
  canonicalColombiaPath,
  canonicalConfirmationPath,
  canonicalIntroPath,
  canonicalMarriedPath,
  canonicalQuestionsPath,
  canonicalRecommendationPath,
  canonicalTimelinePath,
  colombiaAliasPath,
  colombiaFallbackPath,
  confirmationAliasPath,
  confirmationFallbackPath,
  introAliasPath,
  introFallbackPath,
  marriedAliasPath,
  marriedFallbackPath,
  questionsAliasPath,
  questionsFallbackPath,
  recommendationAliasPath,
  recommendationFallbackPath,
} from '../config/storyInputs'
import type { Lang } from '../config/storySequence'
import AddressIntroScene from '../features/addressTimeline/AddressIntroScene'
import AddressTimelineScene from '../features/addressTimeline/AddressTimelineScene'
import IntroScene from '../features/intro/IntroScene'
import LunaNJakeScene from '../features/lunaNJake/LunaNJakeScene'
import { canTriggerNavigation, resolveDirectionFromKey, resolveDirectionFromWheel } from '../features/story/navigationController'
import SheSaidYesMarriedScene from '../features/sheSaidYes/SheSaidYesMarriedScene'
import Colombia from '../routes/Colombia'
import Confirmation from '../routes/Confirmation'
import Questions from '../routes/Questions'
import Recommendation from '../routes/Recommendation'
import TimeLine from '../routes/TimeLine'
import RsvpPage from '../pages/RsvpPage'
import StoryPage from '../pages/StoryPage'

function normalizeLang(value: string | undefined): Lang {
  return value === 'it' ? 'it' : 'en'
}

type LanguageFlagButtonProps = {
  alt: string
  ariaLabel: string
  defaultSrc: string
  hoverSrc: string
  onClick: () => void
}

function LanguageFlagButton({ alt, ariaLabel, defaultSrc, hoverSrc, onClick }: LanguageFlagButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const image = new Image()
    image.src = hoverSrc
  }, [hoverSrc])

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: 250, height: 120, padding: 0, border: 'none', background: 'transparent' }}
    >
      <img
        src={isHovered ? hoverSrc : defaultSrc}
        alt={alt}
        style={{ width: 250, height: 120, objectFit: 'contain', display: 'block' }}
      />
    </button>
  )
}

function LanguageSelect() {
  const navigate = useNavigate()

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <section style={{ display: 'grid' }}>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center' }}>
          <LanguageFlagButton
            alt="UK flag"
            ariaLabel="English"
            defaultSrc="/images/flags/Uka.png"
            hoverSrc="/images/flags/Ukb.png"
            onClick={() => navigate(canonicalIntroPath('en'))}
          />
          <LanguageFlagButton
            alt="Italy flag"
            ariaLabel="Italiano"
            defaultSrc="/images/flags/ItalyA.png"
            hoverSrc="/images/flags/ItalyB.png"
            onClick={() => navigate(canonicalIntroPath('it'))}
          />
        </div>
      </section>
    </main>
  )
}

type PlaceholderPageProps = {
  title: string
  onNavigateBackward: () => void
  onNavigateForward: () => void
}

function PlaceholderPage({ title, onNavigateBackward, onNavigateForward }: PlaceholderPageProps) {
  const lastTriggerMs = useRef(0)
  const touchStartY = useRef<number | null>(null)

  const handleDirection = (direction: 'forward' | 'backward') => {
    const now = Date.now()
    if (!canTriggerNavigation(now, lastTriggerMs.current)) return
    lastTriggerMs.current = now
    if (direction === 'backward') {
      onNavigateBackward()
      return
    }
    onNavigateForward()
  }

  const onWheel = (event: WheelEvent<HTMLElement>) => {
    const direction = resolveDirectionFromWheel(event.deltaY)
    if (!direction) return
    event.preventDefault()
    handleDirection(direction)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const direction = resolveDirectionFromKey(event.key)
    if (!direction) return
    event.preventDefault()
    handleDirection(direction)
  }

  return (
    <main
      data-testid="placeholder-page"
      data-page-title={title}
      onWheel={onWheel}
      onKeyDown={onKeyDown}
      onTouchStart={(event) => {
        touchStartY.current = event.changedTouches[0]?.clientY ?? null
      }}
      onTouchEnd={(event) => {
        const startY = touchStartY.current
        const endY = event.changedTouches[0]?.clientY
        touchStartY.current = null
        if (startY === null || typeof endY !== 'number') return
        const delta = startY - endY
        if (Math.abs(delta) < 20) return
        handleDirection(delta > 0 ? 'forward' : 'backward')
      }}
      tabIndex={0}
      style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '24px', textAlign: 'center' }}
    >
      <section>
        <h1>{title}</h1>
      </section>
    </main>
  )
}

function IntroRoute() {
  const { lang } = useParams<{ lang: string }>()
  const normalizedLang = normalizeLang(lang)

  return <IntroScene lang={normalizedLang} marriedPath={canonicalTimelinePath(normalizedLang)} />
}

function TimelineRoute() {
  const { lang } = useParams<{ lang: string }>()
  const normalizedLang = normalizeLang(lang)

  return (
    <TimeLine
      lang={normalizedLang}
      backPath={canonicalIntroPath(normalizedLang)}
      nextPath={canonicalRecommendationPath(normalizedLang)}
    />
  )
}

function RecommendationRoute() {
  const { lang } = useParams<{ lang: string }>()
  const normalizedLang = normalizeLang(lang)

  return (
    <Recommendation
      lang={normalizedLang}
      backPath={canonicalTimelinePath(normalizedLang)}
      nextPath={canonicalConfirmationPath(normalizedLang)}
    />
  )
}

function ConfirmationRoute() {
  const { lang } = useParams<{ lang: string }>()
  const normalizedLang = normalizeLang(lang)

  return (
    <Confirmation
      lang={normalizedLang}
      backPath={canonicalRecommendationPath(normalizedLang)}
      nextPath={canonicalColombiaPath(normalizedLang)}
    />
  )
}

function ColombiaRoute() {
  const { lang } = useParams<{ lang: string }>()
  const normalizedLang = normalizeLang(lang)

  return (
    <Colombia
      lang={normalizedLang}
      backPath={canonicalConfirmationPath(normalizedLang)}
      nextPath={canonicalQuestionsPath(normalizedLang)}
    />
  )
}

function QuestionsRoute() {
  const { lang } = useParams<{ lang: string }>()
  const normalizedLang = normalizeLang(lang)

  return (
    <Questions
      lang={normalizedLang}
      backPath={canonicalColombiaPath(normalizedLang)}
      nextPath={canonicalMarriedPath(normalizedLang)}
    />
  )
}

function LunaNJakeRoute() {
  const { lang } = useParams<{ lang: string }>()
  const normalizedLang = normalizeLang(lang)
  const navigate = useNavigate()

  return (
    <LunaNJakeScene
      introLabel={normalizedLang === 'it' ? "Torna all'inizio" : 'Back to intro'}
      introPath={canonicalIntroPath(normalizedLang)}
      testId="luna-n-jake-page"
      onNavigateBackward={() => navigate(canonicalIntroPath(normalizedLang))}
      onNavigateForward={() => { }}
    />
  )
}

function MarriedRoute() {
  const { lang } = useParams<{ lang: string }>()
  const normalizedLang = normalizeLang(lang)
  const navigate = useNavigate()

  return (
    <SheSaidYesMarriedScene
      title={`${normalizedLang.toUpperCase()} She Said Yes`}
      rsvpPath={`/${normalizedLang}/rsvp`}
      onNavigateBackward={() => navigate(`/${normalizedLang}/story/she-was-not-wrong`)}
      onNavigateForward={() => navigate(`/${normalizedLang}/address-intro`)}
    />
  )
}

function AddressIntroRoute() {
  const { lang } = useParams<{ lang: string }>()
  const normalizedLang = normalizeLang(lang)
  const navigate = useNavigate()

  return (
    <AddressIntroScene
      lang={normalizedLang}
      onNavigateBackward={() => navigate(`/${normalizedLang}/married`)}
      onNavigateForward={() => navigate(`/${normalizedLang}/address`)}
    />
  )
}

function AddressRoute() {
  const { lang } = useParams<{ lang: string }>()
  const normalizedLang = normalizeLang(lang)
  const navigate = useNavigate()

  return (
    <AddressTimelineScene
      lang={normalizedLang}
      onNavigateBackward={() => navigate(`/${normalizedLang}/address-intro`)}
      onNavigateForward={() => navigate(`/${normalizedLang}/coming-from-abroad`)}
    />
  )
}

function PlaceholderRoute({
  title,
  backPath,
  nextPath,
}: {
  title: string
  backPath: (lang: Lang) => string
  nextPath: (lang: Lang) => string
}) {
  const { lang } = useParams<{ lang: string }>()
  const normalizedLang = normalizeLang(lang)
  const navigate = useNavigate()
  return (
    <PlaceholderPage
      title={title}
      onNavigateBackward={() => navigate(backPath(normalizedLang))}
      onNavigateForward={() => navigate(nextPath(normalizedLang))}
    />
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LanguageSelect />} />

      <Route path={introAliasPath()} element={<Navigate to={introFallbackPath()} replace />} />
      <Route path={marriedAliasPath()} element={<Navigate to={marriedFallbackPath()} replace />} />
      <Route path={questionsAliasPath()} element={<Navigate to={questionsFallbackPath()} replace />} />
      <Route path={recommendationAliasPath()} element={<Navigate to={recommendationFallbackPath()} replace />} />
      <Route path={confirmationAliasPath()} element={<Navigate to={confirmationFallbackPath()} replace />} />
      <Route path={colombiaAliasPath()} element={<Navigate to={colombiaFallbackPath()} replace />} />

      <Route path="/:lang/intro" element={<IntroRoute />} />
      <Route path="/:lang/timeline" element={<TimelineRoute />} />
      <Route path="/:lang/recommendation" element={<RecommendationRoute />} />
      <Route path="/:lang/confirmation" element={<ConfirmationRoute />} />
      <Route path="/:lang/colombia" element={<ColombiaRoute />} />
      <Route path="/:lang/questions" element={<QuestionsRoute />} />
      <Route path="/:lang/LunaNJake" element={<LunaNJakeRoute />} />
      <Route path="/:lang/married" element={<MarriedRoute />} />
      <Route path="/:lang/address-intro" element={<AddressIntroRoute />} />
      <Route path="/:lang/address" element={<AddressRoute />} />
      <Route
        path="/:lang/travelling-from-london"
        element={<PlaceholderRoute title="Travelling from London?" backPath={canonicalIntroPath} nextPath={canonicalIntroPath} />}
      />
      <Route
        path="/:lang/where-to-stay"
        element={<PlaceholderRoute title="Where to stay" backPath={canonicalIntroPath} nextPath={canonicalIntroPath} />}
      />
      <Route
        path="/:lang/are-you-coming"
        element={<PlaceholderRoute title="Are you coming?" backPath={canonicalIntroPath} nextPath={canonicalIntroPath} />}
      />
      <Route
        path="/:lang/coming-from-abroad"
        element={<PlaceholderRoute title="Coming from abroad?" backPath={(lang) => `/${lang}/address`} nextPath={(lang) => `/${lang}/address`} />}
      />
      <Route path="/en/rsvp" element={<RsvpPage />} />
      <Route path="/it/rsvp" element={<RsvpPage />} />

      <Route path="/:lang/story/:slug" element={<StoryPage />} />
      <Route path="/story" element={<Navigate to={introFallbackPath()} replace />} />
      <Route path="/story/*" element={<Navigate to={introFallbackPath()} replace />} />
      <Route path="/:lang/story" element={<Navigate to={introFallbackPath()} replace />} />
      <Route path="/she-said-yes" element={<Navigate to={introFallbackPath()} replace />} />
      <Route path="/:lang/she-said-yes" element={<Navigate to={introFallbackPath()} replace />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
