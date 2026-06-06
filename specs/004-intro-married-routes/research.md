# Research: Intro and Married Route Simplification

## Decision 1: Canonical localized route map with English aliases

- Decision: Canonical routes are `/:lang/intro` and `/:lang/married`; non-localized aliases `/intro` and `/married` redirect to `/en/intro` and `/en/married`.
- Rationale: Preserves multilingual routing strategy while keeping deterministic entry points.
- Alternatives considered:
  - Non-localized canonical routes: rejected due to constitution conflict.
  - Browser-locale dynamic alias redirects: rejected to avoid non-deterministic QA outcomes.

## Decision 2: Legacy story route removal through deterministic redirect

- Decision: `/story`, `/story/*`, and `/she-said-yes` redirect to `/en/intro`.
- Rationale: Removes deprecated route exposure while preserving compatibility for old links/bookmarks.
- Alternatives considered:
  - Hard 404 removal: rejected for degraded user experience.
  - Redirect to married route: rejected because it skips intended intro entry.

## Decision 3: Intro progression is scroll-step controlled, not timed

- Decision: Intro advances one step per downward scroll intent and reverses one step per upward scroll intent; no automatic timed progression.
- Rationale: Matches required interaction model and supports both forward and backward narrative traversal.
- Alternatives considered:
  - Timed auto sequence: rejected by updated requirements.
  - Free continuous scrolling: rejected because it cannot guarantee one-step deterministic progression.

## Decision 4: Component-per-step single-active rendering

- Decision: Each intro text block is implemented as its own component, and only the active step component is visible at any time.
- Rationale: Enforces strict non-overlap, clear state ownership, and testable visibility behavior.
- Alternatives considered:
  - Render-all with opacity toggles: rejected because non-active blocks remain mounted/visible in DOM flow risk scenarios.
  - Single component with text switching only: rejected due to explicit component-per-block requirement.

## Decision 5: Smooth minimal fade handoff and unified typography

- Decision: Step changes apply fade-out for outgoing component and fade-in for incoming component, with all intro text using `"Brittany Signature", "Caveat", cursive`.
- Rationale: Delivers the specified visual tone while keeping transitions controlled and minimal.
- Alternatives considered:
  - Hard cuts without fades: rejected due to abruptness.
  - Previous title-only typography style: rejected by updated typography requirement.
