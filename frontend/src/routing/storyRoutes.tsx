import { useMemo, useRef } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import StoryPage from '../pages/StoryPage'
import { firstStoryPath } from '../config/storyInputs'
import type { Lang } from '../config/storySequence'
import AddressIntroScene from '../features/addressTimeline/AddressIntroScene'
import AddressTimelineScene from '../features/addressTimeline/AddressTimelineScene'
import ComingFromAbroadScene from '../features/comingFromAbroad/ComingFromAbroadScene'
import SheSaidYesMarriedScene from '../features/sheSaidYes/SheSaidYesMarriedScene'
import TravellingFromLondonScene from '../features/travellingFromLondon/TravellingFromLondonScene'
import MessageToGuestScene from '../features/messageToGuest/MessageToGuestScene'
import WhereToStayScene from '../features/whereToStay/WhereToStayScene'
import { canTriggerNavigation, resolveDirectionFromKey, resolveDirectionFromWheel } from '../features/story/navigationController'

type PlaceholderRoute = {
  slug: string
  title: string
  backgroundColor: string
}

const placeholderRoutes: PlaceholderRoute[] = [
  { slug: 'address-intro', title: 'Address Intro', backgroundColor: '#f4a261' },
  { slug: 'address', title: 'Address', backgroundColor: '#f4a261' },
  { slug: 'coming-from-abroad', title: 'Coming from abroad?', backgroundColor: '#2a9d8f' },
  { slug: 'travelling-from-london', title: 'Travelling from London?', backgroundColor: '#e76f51' },
  { slug: 'where-to-stay', title: 'Where to stay', backgroundColor: '#264653' },
  { slug: 'message-to-the-guest', title: 'Message to the guest', backgroundColor: '#8ecae6' },
  { slug: 'are-you-coming', title: 'Are you coming?', backgroundColor: '#ffb703' },
]

type PostStoryNavState = { returnPath?: string }

function normalizeLang(value: string | undefined): Lang {
  return value === 'it' ? 'it' : 'en'
}

function buildPostStoryPath(lang: Lang, slug: string): string {
  return `/${lang}/${slug}`
}

function postStorySequenceFor(lang: Lang): string[] {
  return placeholderRoutes.map((route) => buildPostStoryPath(lang, route.slug))
}

function LanguageSelect() {
  const navigate = useNavigate()

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <section style={{ display: 'grid' }}>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center' }}>
          <button type="button" aria-label="English" onClick={() => navigate(firstStoryPath('en'))}>
            <img src="/images/flags/uk.png" alt="UK flag" style={{ width: 72, height: 48, objectFit: 'cover', display: 'block' }} />
          </button>
          <button type="button" aria-label="Italiano" onClick={() => navigate(firstStoryPath('it'))}>
            <img src="/images/flags/italy.png" alt="Italy flag" style={{ width: 72, height: 48, objectFit: 'cover', display: 'block' }} />
          </button>
        </div>
      </section>
    </main>
  )
}

function PlaceholderPage({ title, backgroundColor }: { title: string; backgroundColor: string }) {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams<{ lang: string }>()
  const lang = normalizeLang(params.lang)
  const sequence = useMemo(() => postStorySequenceFor(lang), [lang])
  const navState = (location.state ?? {}) as PostStoryNavState
  const lastTriggerMs = useRef(0)
  const touchStartY = useRef<number | null>(null)
  const currentIdx = sequence.findIndex((path) => path === location.pathname)
  const previousPath = currentIdx <= 0 ? (navState.returnPath ?? `/${lang}/she-said-yes`) : sequence[currentIdx - 1]
  const nextPath = currentIdx >= sequence.length - 1 ? null : sequence[currentIdx + 1]

  const handleDirection = (direction: 'forward' | 'backward') => {
    const now = Date.now()
    if (!canTriggerNavigation(now, lastTriggerMs.current)) return
    lastTriggerMs.current = now
    if (direction === 'backward') {
      navigate(previousPath, { state: navState })
      return
    }
    if (!nextPath) return
    navigate(nextPath, { state: navState })
  }

  return (
    <main
      style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', backgroundColor }}
      onWheel={(event) => {
        const direction = resolveDirectionFromWheel(event.deltaY)
        if (!direction) return
        event.preventDefault()
        handleDirection(direction)
      }}
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
      onKeyDown={(event) => {
        const direction = resolveDirectionFromKey(event.key)
        if (!direction) return
        event.preventDefault()
        handleDirection(direction)
      }}
      tabIndex={0}
      data-testid="placeholder-page"
      data-page-title={title}
    >
      <h1 style={{ margin: 0 }}>{title}</h1>
    </main>
  )
}

function SheSaidYesRoute({ title, previousPath, nextPath, returnPath, testId }: { title: string; previousPath: string; nextPath: string; returnPath: string; testId?: string }) {
  const navigate = useNavigate()
  return (
    <SheSaidYesMarriedScene
      title={title}
      testId={testId}
      onNavigateBackward={() => navigate(previousPath)}
      onNavigateForward={() => navigate(nextPath, { state: { returnPath } satisfies PostStoryNavState })}
    />
  )
}

function AddressIntroRoute({ lang }: { lang: Lang }) {
  const navigate = useNavigate()
  const location = useLocation()
  const navState = (location.state ?? {}) as PostStoryNavState

  return (
    <AddressIntroScene
      lang={lang}
      onNavigateBackward={() => navigate(navState.returnPath ?? `/${lang}/she-said-yes`, { state: navState })}
      onNavigateForward={() => navigate(`/${lang}/address`, { state: navState })}
      testId="address-intro-page"
    />
  )
}

function AddressRoute({ lang }: { lang: Lang }) {
  const navigate = useNavigate()
  const location = useLocation()
  const navState = (location.state ?? {}) as PostStoryNavState
  const sequence = postStorySequenceFor(lang)
  const currentIdx = sequence.findIndex((path) => path === location.pathname)
  const previousPath = currentIdx <= 0 ? `/${lang}/address-intro` : sequence[currentIdx - 1]
  const nextPath = currentIdx >= sequence.length - 1 ? null : sequence[currentIdx + 1]

  return (
    <AddressTimelineScene
      lang={lang}
      onNavigateBackward={() => navigate(previousPath, { state: navState })}
      onNavigateForward={() => {
        if (!nextPath) return
        navigate(nextPath, { state: navState })
      }}
      testId="address-timeline-page"
    />
  )
}

function ComingFromAbroadRoute({ lang }: { lang: Lang }) {
  const navigate = useNavigate()
  const location = useLocation()
  const navState = (location.state ?? {}) as PostStoryNavState
  const sequence = postStorySequenceFor(lang)
  const currentIdx = sequence.findIndex((path) => path === location.pathname)
  const previousPath = currentIdx <= 0 ? `/${lang}/address` : sequence[currentIdx - 1]
  const nextPath = currentIdx >= sequence.length - 1 ? null : sequence[currentIdx + 1]

  return (
    <ComingFromAbroadScene
      lang={lang}
      onNavigateBackward={() => navigate(previousPath, { state: navState })}
      onNavigateForward={() => {
        if (!nextPath) return
        navigate(nextPath, { state: navState })
      }}
      testId="coming-from-abroad-page"
    />
  )
}

function TravellingFromLondonRoute({ lang }: { lang: Lang }) {
  const navigate = useNavigate()
  const location = useLocation()
  const navState = (location.state ?? {}) as PostStoryNavState
  const sequence = postStorySequenceFor(lang)
  const currentIdx = sequence.findIndex((path) => path === location.pathname)
  const previousPath = currentIdx <= 0 ? `/${lang}/coming-from-abroad` : sequence[currentIdx - 1]
  const nextPath = currentIdx >= sequence.length - 1 ? null : sequence[currentIdx + 1]

  return (
    <TravellingFromLondonScene
      lang={lang}
      onNavigateBackward={() => navigate(previousPath, { state: navState })}
      onNavigateForward={() => {
        if (!nextPath) return
        navigate(nextPath, { state: navState })
      }}
      testId="travelling-from-london-page"
    />
  )
}

function WhereToStayRoute({ lang }: { lang: Lang }) {
  const navigate = useNavigate()
  const location = useLocation()
  const navState = (location.state ?? {}) as PostStoryNavState
  const sequence = postStorySequenceFor(lang)
  const currentIdx = sequence.findIndex((path) => path === location.pathname)
  const previousPath = currentIdx <= 0 ? `/${lang}/travelling-from-london` : sequence[currentIdx - 1]
  const nextPath = currentIdx >= sequence.length - 1 ? null : sequence[currentIdx + 1]

  return (
    <WhereToStayScene
      lang={lang}
      onNavigateBackward={() => navigate(previousPath, { state: navState })}
      onNavigateForward={() => {
        if (!nextPath) return
        navigate(nextPath, { state: navState })
      }}
      testId="where-to-stay-page"
    />
  )
}

function MessageToGuestRoute({ lang }: { lang: Lang }) {
  const navigate = useNavigate()
  const location = useLocation()
  const navState = (location.state ?? {}) as PostStoryNavState
  const sequence = postStorySequenceFor(lang)
  const currentIdx = sequence.findIndex((path) => path === location.pathname)
  const previousPath = currentIdx <= 0 ? `/${lang}/where-to-stay` : sequence[currentIdx - 1]
  const nextPath = currentIdx >= sequence.length - 1 ? null : sequence[currentIdx + 1]

  return (
    <MessageToGuestScene
      lang={lang}
      onNavigateBackward={() => navigate(previousPath, { state: navState })}
      onNavigateForward={() => {
        if (!nextPath) return
        navigate(nextPath, { state: navState })
      }}
      testId="message-to-guest-page"
    />
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LanguageSelect />} />
      <Route path="/:lang/story" element={<StoryRedirect />} />
      <Route path="/:lang/story/:slug" element={<StoryPage />} />
      <Route
        path="/en/she-said-yes"
        element={<SheSaidYesRoute title="EN She Said Yes" previousPath="/en/story/she-was-not-wrong" nextPath="/en/address-intro" returnPath="/en/she-said-yes" testId="terminal-page" />}
      />
      <Route
        path="/it/she-said-yes"
        element={<SheSaidYesRoute title="IT She Said Yes" previousPath="/it/story/she-was-not-wrong" nextPath="/it/address-intro" returnPath="/it/she-said-yes" testId="terminal-page" />}
      />
      <Route path="/en/address-intro" element={<AddressIntroRoute lang="en" />} />
      <Route path="/it/address-intro" element={<AddressIntroRoute lang="it" />} />
      <Route path="/en/address" element={<AddressRoute lang="en" />} />
      <Route path="/it/address" element={<AddressRoute lang="it" />} />
      <Route path="/en/coming-from-abroad" element={<ComingFromAbroadRoute lang="en" />} />
      <Route path="/it/coming-from-abroad" element={<ComingFromAbroadRoute lang="it" />} />
      <Route path="/en/travelling-from-london" element={<TravellingFromLondonRoute lang="en" />} />
      <Route path="/it/travelling-from-london" element={<TravellingFromLondonRoute lang="it" />} />
      <Route path="/en/where-to-stay" element={<WhereToStayRoute lang="en" />} />
      <Route path="/it/where-to-stay" element={<WhereToStayRoute lang="it" />} />
      <Route path="/en/message-to-the-guest" element={<MessageToGuestRoute lang="en" />} />
      <Route path="/it/message-to-the-guest" element={<MessageToGuestRoute lang="it" />} />

      {placeholderRoutes
        .filter((route) => !['address', 'address-intro', 'coming-from-abroad', 'travelling-from-london', 'where-to-stay', 'message-to-the-guest'].includes(route.slug))
        .flatMap((route) => [
          <Route key={`en-${route.slug}`} path={`/en/${route.slug}`} element={<PlaceholderPage title={route.title} backgroundColor={route.backgroundColor} />} />,
          <Route key={`it-${route.slug}`} path={`/it/${route.slug}`} element={<PlaceholderPage title={route.title} backgroundColor={route.backgroundColor} />} />,
        ])}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function StoryRedirect() {
  const { lang } = useParams<{ lang: string }>()
  return <Navigate to={firstStoryPath(normalizeLang(lang))} replace />
}
