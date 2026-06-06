# Implementation Plan: Confirmation Route

**Branch**: `[002-adress-timeline]` | **Date**: 2026-06-05 | **Spec**: [specs/006-confirmation-route/spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-confirmation-route/spec.md`

## Summary

Add a new localized `/:lang/confirmation` story route immediately after `/:lang/recommendation`, using a static centered two-column layout with dictionary-driven confirmation copy, one shared confirmation image asset, responsive mobile stacking, and a soft route-entry fade that stays consistent with the existing wedding site.

## Technical Context

**Language/Version**: TypeScript 5.9, React 19  
**Primary Dependencies**: React Router 7, existing story route helpers, existing localized text dictionary, CSS-based scene styling, Motion 12 available for simple UI transitions if needed  
**Storage**: N/A (presentation and route-flow behavior only)  
**Testing**: Vitest + React Testing Library for route order, localized copy resolution, static layout rendering, and mobile stacking behavior; manual desktop/mobile visual QA  
**Target Platform**: Modern desktop and mobile web browsers  
**Project Type**: Frontend web application  
**Performance Goals**: Route entry transition feels immediate and smooth; confirmation content renders without visible layout shift or overflow on representative desktop and mobile viewports  
**Constraints**: Keep recommendations and questions behavior intact; insert confirmation directly after recommendation; keep all user-facing copy dictionary-driven by language; use a single approved image asset across languages and breakpoints; preserve static section behavior; avoid overlapping Motion and CSS/scroll control responsibilities on the same element  
**Scale/Scope**: One new localized route, one confirmation copy block, one shared media asset, route helper updates, and focused regression tests for flow order and responsive rendering

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Language architecture: PASS. Confirmation title and body will be added to the central translation dictionary for both `en` and `it`.
- Route map integrity: PASS. Confirmation will be inserted into the existing localized flow between recommendation and questions.
- Story system design: PASS. Confirmation uses a declared static route mode and follows the existing config/helper-driven navigation structure.
- Scroll/animation separation: PASS. Confirmation does not introduce GSAP behavior; route entry fade remains a simple UI transition only.
- RSVP stability: PASS. Confirmation is informational only and does not modify RSVP submission logic or behavior.
- Supabase security: PASS. No backend, secrets, or Supabase interaction changes are involved.
- Accessibility/mobile: PASS. Centered composition, readable copy alignment, responsive image scaling, and stacked mobile layout are explicit design requirements.

## Project Structure

### Documentation (this feature)

```text
specs/006-confirmation-route/
+-- plan.md
+-- research.md
+-- data-model.md
+-- quickstart.md
+-- contracts/
|   +-- confirmation-route-contract.md
+-- spec.md
+-- checklists/
|   +-- requirements.md
+-- tasks.md
```

### Source Code (repository root)

```text
frontend/
+-- src/
|   +-- config/
|   |   +-- storyInputs.ts
|   +-- i18n/
|   |   +-- storyText.ts
|   +-- routing/
|   |   +-- storyRoutes.tsx
|   +-- routes/
|   |   +-- Recommendation.tsx
|   |   +-- Questions.tsx
|   |   +-- Confirmation.tsx
|   |   +-- Confirmation.css
|   +-- features/
|       +-- story/
|           +-- transitions.ts
+-- tests/
    +-- routing/
    |   +-- confirmation-route-order.test.tsx
    +-- integration/
    |   +-- confirmation-layout.test.tsx
    |   +-- storyNavigationFlow.test.tsx
    +-- setup.ts
```

**Structure Decision**: Reuse the existing `routes/` layer for the new confirmation section, keep localized copy in `src/i18n/storyText.ts`, extend route path helpers in `src/config/storyInputs.ts`, and update `src/routing/storyRoutes.tsx` to wire the new step between recommendation and questions without moving presentation concerns into navigation logic.

## Phase 0: Research

- Confirm the lowest-risk fade-in approach for a static informational section given the existing route patterns and constitution rules on animation separation.
- Confirm the confirmation copy should live in the central translation dictionary as a dedicated content group rather than inline in the route component.
- Confirm route helper additions needed so `recommendation -> confirmation -> questions` remains explicit and testable in both languages.
- Confirm responsive layout validation scope for one shared confirmation image across desktop and mobile breakpoints.

## Phase 1: Design & Contracts

- Define the confirmation content entity, including localized title/body copy, static layout mode, image asset identity, and route-link relationships.
- Define the confirmation route contract covering localized paths, previous/next navigation targets, and rendering expectations for desktop and mobile.
- Define ownership boundaries among route helpers, translation data, route component structure, and CSS styling.
- Define validation paths for route sequencing, localized copy rendering, fade-in behavior, and non-overflow responsive layout.
- Update the AGENTS plan pointer to `specs/006-confirmation-route/plan.md`.

## Phase 2: Task Planning Readiness

- Ready for `/speckit-tasks` covering route helper updates, confirmation route implementation, dictionary additions, responsive styling, and regression tests.

## Post-Design Constitution Check

- Language architecture: PASS. Confirmation copy is explicitly planned as dictionary-backed English and Italian content.
- Route map integrity: PASS. Route insertion is constrained to recommendation -> confirmation -> questions with localized helpers.
- Story system design: PASS. Confirmation remains a static step in the existing route-driven story flow rather than bespoke controller logic.
- Scroll/animation separation: PASS. The design keeps entry fade scoped to the confirmation content block and avoids mixed animation ownership.
- RSVP stability: PASS. No RSVP form, submission, or backend pipeline changes are introduced.
- Supabase security: PASS. No secret handling or data access changes are required.
- Accessibility/mobile: PASS. The contract and quickstart include mobile stacking, readable text alignment, and non-overflow image checks.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
