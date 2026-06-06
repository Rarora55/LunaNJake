# Implementation Plan: Mobile Scale and Scroll Parity

**Branch**: `002-adress-timeline` | **Date**: 2026-05-15 | **Spec**: [specs/003-mobile-scale-scroll/spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-mobile-scale-scroll/spec.md`

## Summary

Improve mobile visual proportion and touch-scroll behavior across localized story routes and shared story shell/layout components, while preserving existing desktop behavior. The approach combines route-wide responsive scaling adjustments, mobile-specific scroll/friction tuning, reduced-motion specific transition simplification, and regression-safe desktop parity checks.

## Technical Context

**Language/Version**: TypeScript 5.9, React 19  
**Primary Dependencies**: React Router 7, Motion 12, GSAP, Tailwind CSS 4  
**Storage**: N/A (presentation and interaction behavior only)  
**Testing**: Vitest + React Testing Library, manual viewport/device scroll validation  
**Target Platform**: Modern mobile and desktop web browsers  
**Project Type**: Frontend web application  
**Performance Goals**: Mobile scroll and transition updates feel responsive and controllable, with no blocking states during forward/reverse traversal  
**Constraints**: Scope limited to localized story routes and shared story shell/layout components; primary mobile target band 320-430 px; desktop behavior unchanged unless shared fix is required; reduced-motion respected  
**Scale/Scope**: Cross-route styling and scroll behavior refinement for story experience (English/Italian), no new backend/data workflows

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Language architecture: PASS. No new hardcoded copy; multilingual route structure preserved.
- Route map integrity: PASS. Existing localized route map remains intact.
- Story system design: PASS. Changes refine scaling and interaction behavior without breaking step-sequence/story config model.
- Scroll/animation separation: PASS. Mobile tuning keeps GSAP/Motion responsibilities separated per existing architecture.
- RSVP stability: PASS. RSVP routes/flows untouched.
- Supabase security: PASS. No Supabase key or data-flow changes.
- Email pipeline: PASS. No Edge Function email changes.
- Accessibility/mobile: PASS. Mobile usability and reduced-motion handling are explicit requirements.

## Project Structure

### Documentation (this feature)

```text
specs/003-mobile-scale-scroll/
+-- plan.md
+-- research.md
+-- data-model.md
+-- quickstart.md
+-- contracts/
|   +-- mobile-scroll-layout-contract.md
+-- spec.md
+-- checklists/
    +-- requirements.md
```

### Source Code (repository root)

```text
frontend/
+-- src/
|   +-- pages/
|   |   +-- StoryPage.css
|   +-- features/
|   |   +-- travellingFromLondon/
|   |   |   +-- TravellingFromLondonScene.css
|   |   +-- (other story feature scenes with mobile scaling/scroll styles)
|   +-- (shared story shell/layout and scroll behavior modules)
+-- tests/
    +-- (existing unit/integration suites; add or extend coverage where needed)
```

**Structure Decision**: Keep the existing frontend architecture and implement focused updates in story-scene CSS, shared story layout styles, and mobile-specific scroll/transition behavior modules to avoid route-map or backend impact.

## Phase 0: Research

- Confirm effective responsive-scaling strategy for preserving desktop hierarchy on 320-430 px widths.
- Confirm mobile scroll-friction mitigation patterns (snap softening/disabling conditions) that retain progression clarity.
- Confirm reduced-motion adaptation for mobile scroll-triggered transitions.
- Confirm regression-safe validation strategy to ensure desktop parity.

## Phase 1: Design & Contracts

- Define entities for route-scope coverage, viewport profile, animation profile, and scroll behavior profile.
- Define behavior contract for mobile scaling expectations, snap policy, reduced-motion policy, and desktop non-regression rules.
- Define quickstart validation workflow for route-by-route mobile and desktop checks.
- Update AGENTS context pointer to this plan.

## Phase 2: Task Planning Readiness

- Ready for `/speckit-tasks` with isolated workstreams for responsive scaling, mobile scroll tuning, reduced-motion profile tuning, and regression testing.

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