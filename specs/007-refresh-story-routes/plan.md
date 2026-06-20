# Implementation Plan: Refresh Story Routes

**Branch**: `[main]` | **Date**: 2026-06-12 | **Spec**: [specs/007-refresh-story-routes/spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-refresh-story-routes/spec.md`

## Summary

Refresh four existing route surfaces in the React Router frontend by collapsing `/:lang/intro` to its final scene only, shortening and relabeling the timeline marker sequence, visually aligning the standalone RSVP page with the established wedding art direction without changing submission behavior, and adding a shared-style return CTA on `/:lang/LunaNJake` that sends visitors back to intro.

## Technical Context

**Language/Version**: TypeScript 6.0, React 19  
**Primary Dependencies**: React Router DOM 7, Framer Motion 12, Vite 8, existing story navigation controller, existing route config and i18n modules  
**Storage**: External form submission only for RSVP; no new storage or backend changes in scope  
**Testing**: Vitest + React Testing Library for route rendering, intro behavior, timeline config, and CTA/navigation regression; manual desktop/mobile visual QA for RSVP and route styling  
**Target Platform**: Modern desktop and mobile web browsers  
**Project Type**: Frontend web application  
**Performance Goals**: Route transitions and wheel/key navigation remain smooth, intro no longer incurs unnecessary step transitions, and timeline label/layout updates do not introduce visual jitter or overflow  
**Constraints**: Preserve dictionary-driven copy where already used; keep route order and language aliases intact; do not alter RSVP submit/fetch logic; preserve existing animations unless a removed intro step or deleted timeline point makes one inapplicable; reuse existing button styling patterns rather than inventing a parallel CTA treatment  
**Scale/Scope**: One route config module, four route/scene presentation modules, one timeline configuration source, one shared i18n dictionary, and focused regression tests across intro, timeline, RSVP, and end-scene navigation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Language architecture: PASS. The plan keeps existing language routes and expects any changed timeline labels or CTA text to remain aligned with the current translation/content approach.
- Route map integrity: PASS. `/intro`, `/timeline`, `/rsvp`, and `/LunaNJake` remain in the existing route graph with no new route families added.
- Story system design: PASS. Intro remains a step-sequence route, but its step count is reduced; timeline changes stay config-driven through existing marker definitions.
- Scroll/animation separation: PASS. No new animation system is introduced; changes remain inside existing scene and CSS boundaries.
- RSVP stability: PASS. The plan explicitly limits RSVP changes to presentation while preserving validation, guarded entry, duplicate-submit prevention, and submission flow.
- Supabase security: PASS. No Supabase or secret-handling changes are in scope.
- Accessibility/mobile: PASS. The new `/LunaNJake` CTA must be keyboard-operable, and RSVP/timeline updates will be verified for mobile layout stability.

## Project Structure

### Documentation (this feature)

```text
specs/007-refresh-story-routes/
+-- plan.md
+-- research.md
+-- data-model.md
+-- quickstart.md
+-- contracts/
|   +-- story-route-ui-contract.md
+-- spec.md
+-- checklists/
|   +-- requirements.md
+-- tasks.md
```

### Source Code (repository root)

```text
frontend/
+-- src/
|   +-- routing/
|   |   +-- storyRoutes.tsx
|   +-- config/
|   |   +-- storyInputs.ts
|   +-- i18n/
|   |   +-- storyText.ts
|   +-- features/
|   |   +-- intro/
|   |   |   +-- IntroScene.tsx
|   |   |   +-- IntroScene.css
|   |   +-- lunaNJake/
|   |   |   +-- LunaNJakeScene.tsx
|   |   |   +-- LunaNJakeScene.css
|   |   +-- addressTimeline/
|   |       +-- timelineConfig.ts
|   |       +-- types.ts
|   +-- components/
|   |   +-- timeline/
|   |       +-- TimelineGifMarkers.tsx
|   +-- pages/
|   |   +-- RsvpPage.tsx
|   |   +-- RsvpPage.css
|   +-- routes/
|       +-- TimeLine.tsx
|       +-- TimeLine.css
+-- tests/
    +-- features/
    |   +-- intro/
    |   |   +-- IntroScene.test.tsx
    |   +-- timeline/
    |       +-- timeline-marker-thresholds.test.tsx
    +-- integration/
    |   +-- storyNavigationFlow.test.tsx
    |   +-- story-slideshow-flow.test.tsx
    +-- routing/
        +-- timeline-route-order.test.tsx
```

**Structure Decision**: Keep all work inside the existing frontend presentation layers. Route wiring remains in `src/routing/storyRoutes.tsx`, intro/timeline/end-scene behavior stays in feature-specific scene modules, timeline content changes stay centralized in `src/features/addressTimeline/timelineConfig.ts`, and RSVP visual alignment stays isolated to `RsvpPage.tsx` plus `RsvpPage.css`.

## Phase 0: Research

- Confirm the lowest-risk way to collapse `IntroScene` from three wheel-driven steps to a single retained final scene without breaking route entry or fade behavior.
- Confirm the timeline update should be treated as a configuration/data-shape change first, with any styling normalization kept in shared timeline text styles rather than ad hoc per-marker overrides.
- Confirm which existing CTA style on the site is the right source for the new `/LunaNJake` return control and how to reuse it without changing current navigation throttling.
- Confirm how far RSVP styling can move toward shared site visuals while leaving guarded access, fetch submission, and status handling untouched.

## Phase 1: Design & Contracts

- Define the reduced intro scene state model, including whether step state can be removed entirely or should remain as a single stable visible state.
- Define the timeline marker contract after shortening the sequence from seven to six visible points, including relabeling, image assignment, thresholds, and typography consistency.
- Define the RSVP presentation boundary so only copy-free styling and optional wrapper/semantic changes are allowed while form logic stays unchanged.
- Define the `/LunaNJake` CTA contract, including placement, accessible label, shared visual treatment, and target path behavior under localized routing.
- Update the AGENTS plan pointer to `specs/007-refresh-story-routes/plan.md`.

## Phase 2: Task Planning Readiness

- Ready for `/speckit-tasks` covering intro simplification, timeline config/style normalization, RSVP visual restyling, `/LunaNJake` CTA wiring, and focused regression coverage.

## Post-Design Constitution Check

- Language architecture: PASS. Timeline and CTA text changes remain bounded to the existing copy/route model and do not add a separate text source.
- Route map integrity: PASS. Existing localized paths and aliases remain unchanged; only route content and one return CTA are adjusted.
- Story system design: PASS. Intro and timeline changes stay config- and scene-driven without moving navigation logic into unrelated components.
- Scroll/animation separation: PASS. Existing wheel/key navigation and CSS/fade responsibilities stay isolated in the current layers.
- RSVP stability: PASS. Design artifacts keep RSVP network and validation logic out of scope.
- Supabase security: PASS. No new secrets, storage, or backend contracts are introduced.
- Accessibility/mobile: PASS. The plan includes keyboard-operable CTA behavior and mobile regression checks for RSVP and timeline layout.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
