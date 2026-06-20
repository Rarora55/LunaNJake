# Implementation Plan: Intro Reference Layout

**Branch**: `[main]` | **Date**: 2026-06-12 | **Spec**: [specs/008-intro-reference-layout/spec.md](./spec.md)
**Input**: Feature specification from `/specs/008-intro-reference-layout/spec.md`

## Summary

Rework the `/intro` scene so its composition tracks `SampleIntro.png` more closely by replacing the rendered date text with the provided `Monday.png` artwork, centering the countdown beneath it, adding a mirrored top-right herbs treatment, and stabilizing the scene with a container-driven two-column desktop layout plus a clean mobile stack.

## Technical Context

**Language/Version**: TypeScript 6.0, React 19  
**Primary Dependencies**: React Router DOM 7, Vite 8, existing intro scene assets, existing story route config, current i18n dictionary helpers  
**Storage**: N/A for this feature; countdown state is in-memory only and no backend/storage behavior changes  
**Testing**: Vitest + React Testing Library for intro rendering and route continuity; manual desktop/mobile visual QA against `public/images/Home2/SampleIntro.png`  
**Target Platform**: Modern desktop and mobile web browsers  
**Project Type**: Frontend web application  
**Performance Goals**: Intro scene renders without visible layout jitter, countdown updates once per second without causing composition drift, and responsive reflow remains visually stable across common desktop widths and narrow mobile screens  
**Constraints**: Preserve localized route behavior and existing CTA navigation; keep current paper background, button art, rings illustration, venue art, and blue hand-drawn aesthetic; avoid viewport-heavy offsets for primary content; keep decorative herbs secondary and non-obstructive; do not affect non-intro routes  
**Scale/Scope**: One intro scene component, one intro stylesheet, public intro assets under `public/images/Home2`, and focused intro-related regression coverage

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Language architecture: PASS. The visible date text is replaced by provided artwork, while existing localized CTA labels and route behavior remain dictionary-backed.
- Route map integrity: PASS. No route additions or rewiring are planned; the work is confined to `/intro` presentation.
- Story system design: PASS. The intro route remains a static single-scene entry in the current story flow with no changes to scroll sequencing.
- Scroll/animation separation: PASS. No new animation library usage is introduced; only scene layout and decorative asset placement change.
- RSVP stability: PASS. RSVP pages, validation, and submission behavior remain out of scope.
- Supabase security: PASS. No backend, secret, or environment-variable changes are in scope.
- Accessibility/mobile: PASS. The CTA stays keyboard-operable, countdown remains readable, and the mobile stack is explicitly part of the design scope.

## Project Structure

### Documentation (this feature)

```text
specs/008-intro-reference-layout/
+-- plan.md
+-- research.md
+-- data-model.md
+-- quickstart.md
+-- contracts/
|   +-- intro-route-ui-contract.md
+-- spec.md
+-- checklists/
|   +-- requirements.md
```

### Source Code (repository root)

```text
frontend/
+-- public/
|   +-- images/
|       +-- Home2/
|           +-- SampleIntro.png
|           +-- Monday.png
|           +-- Title.png
|           +-- Rings2.png
|           +-- Titles.png
|           +-- Herb.png
|           +-- herbs.png
|           +-- herbs2.png
|           +-- herbs3.png
+-- src/
|   +-- features/
|   |   +-- intro/
|   |       +-- IntroScene.tsx
|   |       +-- IntroScene.css
|   +-- routing/
|   |   +-- storyRoutes.tsx
|   +-- i18n/
|       +-- storyText.ts
+-- tests/
    +-- features/
    |   +-- intro/
    |       +-- IntroScene.test.tsx
    +-- integration/
        +-- desktop-nonregression-scroll-layout.test.tsx
        +-- mobile-layout-proportions.test.tsx
        +-- storyNavigationFlow.test.tsx
```

**Structure Decision**: Keep all work inside the existing frontend intro presentation layer. `IntroScene.tsx` owns the semantic structure and countdown/date asset rendering, `IntroScene.css` owns the composition and responsive layout system, public `Home2` assets remain the source of truth for the title/date/rings/herb artwork, and existing intro/integration tests absorb focused regression checks.

## Phase 0: Research

- Confirm the lowest-risk layout strategy for matching `SampleIntro.png` without introducing viewport drift: centered composition shell with stable left/right columns for primary content and container-anchored decorative herbs.
- Confirm the date treatment should use the supplied `Monday.png` asset directly from the public path instead of rendered text, while leaving route-localized interactive copy unchanged.
- Confirm the countdown should remain a simple client-side timer but shift from a date-adjacent floating treatment to a centered date block that scales cleanly across breakpoints.
- Confirm the second herbs cluster should be implemented as a duplicated decorative layer derived from the existing bottom-left treatment, with mirroring or rotation handled only in CSS.

## Phase 1: Design & Contracts

- Define the intro composition model: left content stack for title, CTA, date artwork, and countdown; right content stack for rings and venue art; container-anchored decorative herbs in opposing corners.
- Define the responsive behavior contract: stable desktop two-column balance, mobile stacked reading order, bounded asset scaling, and no overlap between date artwork, countdown, and content art.
- Define the countdown presentation contract: four labeled segments, non-negative values, centered alignment, and visual integration with the date artwork rather than a detached widget.
- Define the decorative asset contract: preserve current bottom-left herb cluster, add a visually matched top-right duplicate, and constrain both to remain secondary to interactive/content elements.
- Update the AGENTS plan pointer to `specs/008-intro-reference-layout/plan.md`.

## Phase 2: Task Planning Readiness

- Ready for `/speckit-tasks` covering intro JSX restructuring, CSS composition refactor, decorative herb duplication and anchoring, countdown/date asset integration, and intro-focused regression updates with visual/manual QA guidance.

## Post-Design Constitution Check

- Language architecture: PASS. The only replaced visible copy is the date artwork, and interactive labels continue to use the existing localized source.
- Route map integrity: PASS. The plan stays inside the existing intro route and does not alter language routing behavior.
- Story system design: PASS. No scroll mode or story controller behavior changes are required.
- Scroll/animation separation: PASS. Layout changes remain in scene markup and CSS; no new animation coupling is introduced.
- RSVP stability: PASS. RSVP flows remain untouched.
- Supabase security: PASS. No backend or secret-related work is introduced.
- Accessibility/mobile: PASS. The plan preserves CTA focus behavior, emphasizes readable countdown layout, and includes mobile stacking as a first-class design requirement.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
