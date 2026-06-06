# Implementation Plan: Intro and Married Route Simplification

**Branch**: `[002-adress-timeline]` | **Date**: 2026-05-19 | **Spec**: [specs/004-intro-married-routes/spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-intro-married-routes/spec.md`

## Summary

Replace legacy story-entry routes with localized canonical intro/married routes and implement a bidirectional, scroll-controlled intro step sequence where each text block is a discrete component, only one block is active at a time, and transitions use smooth fade-out/fade-in.

## Technical Context

**Language/Version**: TypeScript 5.9, React 19  
**Primary Dependencies**: React Router 7, Motion 12, GSAP (unchanged responsibility boundaries)  
**Storage**: N/A (routing and presentation behavior only)  
**Testing**: Vitest + React Testing Library, routing redirect tests, intro step-sequence interaction tests, manual viewport QA  
**Target Platform**: Modern mobile and desktop web browsers  
**Project Type**: Frontend web application  
**Performance Goals**: Route resolution feels immediate; scroll-step changes feel smooth and deterministic; only one intro block visible per step  
**Constraints**: Preserve architecture conventions; preserve localized routing patterns; avoid GSAP/Motion overlap; maintain keyboard operability and mobile stability  
**Scale/Scope**: Route-map simplification plus one localized intro step-sequence and married-route continuation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Language architecture: PASS. Dictionary-backed and localized route patterns remain required.
- Route map integrity: PASS. Canonical `/:lang/intro` and `/:lang/married` with deterministic redirects are preserved.
- Story system design: PASS. Intro behavior uses step-sequence interaction rather than continuous scroll.
- Scroll/animation separation: PASS. Existing GSAP/Motion boundaries remain unchanged.
- RSVP stability: PASS. RSVP paths and behavior remain out of scope and untouched.
- Supabase security: PASS. No Supabase key or client boundary changes.
- Email pipeline: PASS. No Edge Function workflow changes.
- Accessibility/mobile: PASS. Keyboard-operable CTA and mobile-stable text presentation remain required.

## Project Structure

### Documentation (this feature)

```text
specs/004-intro-married-routes/
+-- plan.md
+-- research.md
+-- data-model.md
+-- quickstart.md
+-- contracts/
|   +-- route-sequence-contract.md
+-- spec.md
+-- tasks.md
+-- checklists/
    +-- requirements.md
```

### Source Code (repository root)

```text
frontend/
+-- src/
|   +-- routing/
|   |   +-- storyRoutes.tsx
|   +-- pages/
|   |   +-- StoryPage.tsx
|   |   +-- StoryPage.css
|   +-- features/
|   |   +-- intro/
|   |   |   +-- IntroScene.tsx
|   |   |   +-- IntroScene.css
|   |   +-- sheSaidYes/
|   |       +-- SheSaidYesMarriedScene.tsx
|   +-- i18n/
|   |   +-- storyText.ts
|   +-- config/
|       +-- storyInputs.ts
+-- tests/
    +-- routing/
    |   +-- intro-married-routes.test.tsx
    +-- features/
        +-- intro/
            +-- IntroScene.test.tsx
```

**Structure Decision**: Keep the existing frontend-only architecture and implement focused updates in route definitions, intro step-sequence components, localized copy/config wiring, and targeted tests.

## Phase 0: Research

- Confirm route strategy for deprecated legacy paths and non-localized aliases.
- Confirm scroll-step interaction model including upward reversal and deterministic one-step traversal.
- Confirm transition model requiring single-active component visibility and smooth fade handoff.
- Confirm typography constraint application for all intro text blocks.

## Phase 1: Design & Contracts

- Define a route-resolution model for canonical and redirected paths.
- Define intro step-sequence state model (step index, step boundaries, active component policy).
- Define scroll interaction contract (down next step, up previous step, no auto-progress).
- Define transition contract (fade-out previous, fade-in next, no simultaneous text block visibility).
- Define final-step continuation contract for same-language navigation to `/:lang/married`.
- Keep AGENTS context pointer aligned to this plan path.

## Phase 2: Task Planning Readiness

- Ready for `/speckit-tasks` with workstreams for routing, intro step sequence behavior, typography updates, and regression verification.

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
