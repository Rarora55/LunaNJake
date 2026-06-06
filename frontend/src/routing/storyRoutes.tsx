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
  firstStoryPath,
  FLOW_FALLBACK_LANG,
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
import IntroScene from '../features/intro/IntroScene'
import LunaNJakeScene from '../features/lunaNJake/LunaNJakeScene'
import Colombia from '../routes/Colombia'
import Confirmation from '../routes/Confirmation'
import Questions from '../routes/Questions'
import Recommendation from '../routes/Recommendation'
import TimeLine from '../routes/TimeLine'
import RsvpPage from '../pages/RsvpPage'

function normalizeLang(value: string | undefined): Lang {
  return value === 'it' ? 'it' : 'en'
}

function LanguageSelect() {
  const navigate = useNavigate()

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <section style={{ display: 'grid' }}>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center' }}>
          <button type="button" aria-label="English" onClick={() => navigate(canonicalIntroPath('en'))}>
            <img src="/images/flags/uk.png" alt="UK flag" style={{ width: 72, height: 48, objectFit: 'cover', display: 'block' }} />
          </button>
          <button type="button" aria-label="Italiano" onClick={() => navigate(canonicalIntroPath('it'))}>
            <img src="/images/flags/italy.png" alt="Italy flag" style={{ width: 72, height: 48, objectFit: 'cover', display: 'block' }} />
          </button>
        </div>
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
      testId="luna-n-jake-page"
      onNavigateBackward={() => navigate(canonicalIntroPath(normalizedLang))}
      onNavigateForward={() => {}}
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
      <Route path="/en/rsvp" element={<RsvpPage />} />
      <Route path="/it/rsvp" element={<RsvpPage />} />

      <Route path="/story" element={<Navigate to={introFallbackPath()} replace />} />
      <Route path="/story/*" element={<Navigate to={introFallbackPath()} replace />} />
      <Route path="/:lang/story" element={<Navigate to={introFallbackPath()} replace />} />
      <Route path="/:lang/story/*" element={<Navigate to={introFallbackPath()} replace />} />
      <Route path="/she-said-yes" element={<Navigate to={introFallbackPath()} replace />} />
      <Route path="/:lang/she-said-yes" element={<Navigate to={introFallbackPath()} replace />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export function StoryRedirect() {
  const { lang } = useParams<{ lang: string }>()
  return <Navigate to={firstStoryPath(normalizeLang(lang ?? FLOW_FALLBACK_LANG))} replace />
}
