# Implementation Plan: Address Route Timeline Transition

**Branch**: `002-adress-timeline` | **Date**: 2026-05-08 | **Spec**: [specs/002-address-timeline/spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-address-timeline/spec.md`

## Summary

Implement a modular transition from localized `/she-said-yes` routes into localized `/en/address` and `/it/address` timeline routes: chaotic stop-motion exit, centered venue reveal, scroll-linked vertical timeline line continuity, and three progressive alternating timeline cards with robust fallback and reduced-motion behavior.

## Technical Context

**Language/Version**: TypeScript 5.9, React 19  
**Primary Dependencies**: React Router 7, Motion 12, Tailwind CSS 4, GSAP (only if existing scroll-pin/timeline infra requires it)  
**Storage**: N/A (UI state + route state only)  
**Testing**: Vitest + React Testing Library (unit + integration)  
**Target Platform**: Web (modern desktop and mobile browsers)  
**Project Type**: Frontend web application  
**Performance Goals**: Smooth scroll-linked updates without severe frame drops; no stuck transition states; stable bidirectional reveal behavior  
**Constraints**: Dictionary-backed visible copy (`en`/`it`), explicit progress windows, normalized timeline reveal positions (`0..1`), compact readable cards on mobile/desktop, reduced-motion variant  
**Scale/Scope**: One route transition (`/en|it/she-said-yes` -> `/en/address` or `/it/address`) and one timeline route with 3 initial items, extensible for future items

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Language architecture: PASS. New user-facing text remains dictionary-backed for both locales.
- Route map integrity: PASS. Existing localized story routes are preserved; transition entry comes from `/en|it/she-said-yes`.
- Story system design: PASS. Behavior remains config-driven and compatible with step-sequence flow.
- Scroll/animation separation: PASS. Transition logic and timeline content modules remain separated; avoid overlapping GSAP/Motion control for same properties.
- RSVP stability: PASS. No RSVP route or data-flow changes.
- Supabase security: PASS. No Supabase/frontend secret changes.
- Email pipeline: PASS. No Edge Function email changes.
- Accessibility/mobile: PASS. Reduced-motion behavior and mobile card readability are required.

## Project Structure

### Documentation (this feature)

```text
specs/002-address-timeline/
+-- plan.md
+-- research.md
+-- data-model.md
+-- quickstart.md
+-- contracts/
|   +-- address-timeline-behavior-contract.md
+-- spec.md
+-- checklists/
    +-- requirements.md
```

### Source Code (repository root)

```text
frontend/
+-- src/
|   +-- features/
|   |   +-- sheSaidYes/
|   |   |   +-- (transition orchestration additions)
|   |   +-- addressTimeline/
|   |   |   +-- timelineConfig.ts
|   |   |   +-- transitionPhases.ts
|   |   |   +-- AddressTimelineScene.tsx
|   |   |   +-- AddressTimelineScene.css
|   +-- routing/
|   |   +-- storyRoutes.tsx
|   +-- i18n/
|       +-- dictionaries.ts
+-- tests/
    +-- integration/
    |   +-- address-transition-flow.test.tsx
    +-- unit/
        +-- address-timeline-config.test.ts
```

**Structure Decision**: Reuse current route shell and sheSaidYes entry points, add a dedicated `addressTimeline` feature module for transition phases + timeline rendering, and keep item content in reusable config.

## Phase 0: Research

- Confirm best-practice motion profile for handmade stop-motion feel while staying deterministic and reversible with scroll progress.
- Confirm explicit start/end progress windows for: scatter exit, address reveal, and line growth.
- Confirm normalized timeline item positioning (`0..1`) strategy for extensibility.
- Confirm degraded media fallback (text + placeholder) and reduced-motion adaptation patterns.

## Phase 1: Design & Contracts

- Define runtime entities for transition stage, line progression, timeline items, and media fallback state.
- Define behavioral contract for route handoff continuity and per-item reveal semantics.
- Define quickstart validation for bidirectional scroll behavior, mobile readability, and reduced-motion parity.
- Update AGENTS context pointer to this plan.

## Phase 2: Task Planning Readiness

- Ready for `/speckit-tasks` with isolated tasks for routing, transition orchestration, timeline module, localization wiring, and tests.

## Post-Design Constitution Check

- Language architecture: PASS.
- Route map integrity: PASS.
- Story system design: PASS.
- Scroll/animation separation: PASS.
- RSVP stability: PASS.
- Supabase security: PASS.
- Email pipeline: PASS.
- Accessibility/mobile: PASS.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

