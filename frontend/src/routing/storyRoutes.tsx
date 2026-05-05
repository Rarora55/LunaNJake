import { useRef } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import StoryPage from '../pages/StoryPage'
import { STORY_COOLDOWN_MS, firstStoryPath } from '../config/storyInputs'
import type { Lang } from '../config/storySequence'
import { canTriggerNavigation, resolveDirectionFromKey, resolveDirectionFromWheel } from '../features/story/navigationController'

type PlaceholderRoute = {
  path: string
  title: string
  backgroundColor: string
}

const placeholderRoutes: PlaceholderRoute[] = [
  { path: '/address', title: 'Address', backgroundColor: '#f4a261' },
  { path: '/coming-from-abroad', title: 'Coming from abroad?', backgroundColor: '#2a9d8f' },
  { path: '/travelling-from-london', title: 'Travelling from London?', backgroundColor: '#e76f51' },
  { path: '/where-to-stay', title: 'Where to stay', backgroundColor: '#264653' },
  { path: '/message-to-the-guest', title: 'Message to the guest', backgroundColor: '#8ecae6' },
  { path: '/are-you-coming', title: 'Are you coming?', backgroundColor: '#ffb703' },
]

const postStorySequence = placeholderRoutes.map((route) => route.path)
type PostStoryNavState = { returnPath?: string }

function LanguageSelect() {
  const navigate = useNavigate()

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <section style={{ display: 'grid' }}>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center' }}>
        <button type="button" aria-label="English" onClick={() => navigate(firstStoryPath('en'))}>
          <img
            src="/images/flags/uk.png"
            alt="UK flag"
            style={{ width: 72, height: 48, objectFit: 'cover', display: 'block' }}
          />
        </button>
        <button type="button" aria-label="Italiano" onClick={() => navigate(firstStoryPath('it'))}>
          <img
            src="/images/flags/italy.png"
            alt="Italy flag"
            style={{ width: 72, height: 48, objectFit: 'cover', display: 'block' }}
          />
        </button>
        </div>
      </section>
    </main>
  )
}

function ScrollableInfoPage({
  title,
  subtitle,
  previousPath,
  nextPath,
  returnPath,
  backgroundColor,
  testId,
}: {
  title: string
  subtitle?: string
  previousPath: string
  nextPath: string | null
  returnPath: string
  backgroundColor?: string
  testId?: string
}) {
  const navigate = useNavigate()
  const lastTriggerMs = useRef(0)
  const touchStartY = useRef<number | null>(null)

  const handleDirection = (direction: 'forward' | 'backward') => {
    const now = Date.now()
    if (!canTriggerNavigation(now, lastTriggerMs.current)) return
    lastTriggerMs.current = now
    if (direction === 'backward') {
      navigate(previousPath)
      return
    }
    if (!nextPath) return
    navigate(nextPath, { state: { returnPath } satisfies PostStoryNavState })
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
      data-testid={testId ?? 'info-page'}
    >
      <div style={{ textAlign: 'center' }}>
        <h1>{title}</h1>
        {subtitle ? <p style={{ marginTop: 8, fontSize: 12 }}>{subtitle}</p> : null}
        <p style={{ marginTop: 4, fontSize: 12 }}>Cooldown {STORY_COOLDOWN_MS}ms</p>
      </div>
    </main>
  )
}

function PlaceholderPage({ title, backgroundColor }: { title: string; backgroundColor: string }) {
  const navigate = useNavigate()
  const location = useLocation()
  const navState = (location.state ?? {}) as PostStoryNavState
  const lastTriggerMs = useRef(0)
  const touchStartY = useRef<number | null>(null)
  const currentIdx = postStorySequence.findIndex((path) => path === location.pathname)
  const previousPath = currentIdx <= 0 ? (navState.returnPath ?? '/en/she-said-yes') : postStorySequence[currentIdx - 1]
  const nextPath = currentIdx >= postStorySequence.length - 1 ? null : postStorySequence[currentIdx + 1]

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
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        backgroundColor,
      }}
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

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LanguageSelect />} />
      <Route path="/:lang/story" element={<StoryRedirect />} />
      <Route path="/:lang/story/:slug" element={<StoryPage />} />
      <Route
        path="/en/she-said-yes"
        element={
          <ScrollableInfoPage
            title="EN She Said Yes"
            subtitle="Scroll down to continue to the next wedding page."
            previousPath="/en/story/she-was-not-wrong"
            nextPath="/address"
            returnPath="/en/she-said-yes"
            testId="terminal-page"
          />
        }
      />
      <Route
        path="/it/she-said-yes"
        element={
          <ScrollableInfoPage
            title="IT She Said Yes"
            subtitle="Scroll down to continue to the next wedding page."
            previousPath="/it/story/she-was-not-wrong"
            nextPath="/address"
            returnPath="/it/she-said-yes"
            testId="terminal-page"
          />
        }
      />
      {placeholderRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<PlaceholderPage title={route.title} backgroundColor={route.backgroundColor} />}
        />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function StoryRedirect() {
  const { lang } = useParams<{ lang: string }>()
  const normalized = lang === 'it' ? 'it' : 'en'
  return <Navigate to={firstStoryPath(normalized)} replace />
}
