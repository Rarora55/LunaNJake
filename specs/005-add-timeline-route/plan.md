# Implementation Plan: Add Timeline Route

**Branch**: `[002-adress-timeline]` | **Date**: 2026-06-05 | **Spec**: [specs/005-add-timeline-route/spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-add-timeline-route/spec.md`

## Summary

Extend the localized `/:lang/timeline` story section so it stays immediately after `/:lang/intro`, preserves the existing scroll-drawn SVG line and GIF marker behavior, and adds configurable image-plus-label content blocks for each marker with route-language localization and responsive manual offset control.

## Technical Context

**Language/Version**: TypeScript 5.9, React 19  
**Primary Dependencies**: React Router 7, Motion 12, existing story route/config modules, existing timeline feature modules  
**Storage**: N/A (presentation and route-flow behavior only)  
**Testing**: Vitest + React Testing Library for route order, localized content mapping, reveal thresholds, and responsive rendering; manual desktop/mobile scroll QA  
**Target Platform**: Modern desktop and mobile web browsers  
**Project Type**: Frontend web application  
**Performance Goals**: Scroll-linked reveal remains smooth and reversible; marker content updates do not introduce visible flicker or detached overlays during scroll  
**Constraints**: Keep `/intro` behavior intact; keep `/timeline` directly after `/intro`; preserve black-and-white hand-drawn visual tone; keep GIF marker animation unchanged; bind marker content by marker ID through a single configuration model; keep user-facing copy dictionary-driven by language; avoid Motion/GSAP overlap on the same properties  
**Scale/Scope**: One existing localized timeline route, seven marker instances, seven marker-content blocks, and related tests/documentation updates

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Language architecture: PASS. Marker labels must be localized for both `en` and `it` routes.
- Route map integrity: PASS. Timeline remains the immediate successor to intro.
- Story system design: PASS. Marker content will be config-driven and tied to stable marker IDs.
- Scroll/animation separation: PASS. Existing reveal and GIF animation behavior remains intact.
- RSVP stability: PASS. No RSVP flow changes.
- Supabase security: PASS. No backend or secret handling changes.
- Accessibility/mobile: PASS. Content blocks require responsive sizing and preserved marker association on small viewports.

## Project Structure

### Documentation (this feature)

```text
specs/005-add-timeline-route/
+-- plan.md
+-- research.md
+-- data-model.md
+-- quickstart.md
+-- contracts/
|   +-- timeline-route-sequence-contract.md
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
|   |   +-- storySequence.ts
|   +-- i18n/
|   |   +-- storyText.ts
|   +-- routing/
|   |   +-- storyRoutes.tsx
|   +-- routes/
|   |   +-- TimeLine.tsx
|   |   +-- TimeLine.css
|   +-- components/
|   |   +-- timeline/
|   |       +-- TimelineLine.tsx
|   |       +-- TimelineGifMarkers.tsx
|   |       +-- index.ts
|   +-- features/
|       +-- intro/
|       |   +-- IntroScene.tsx
|       +-- addressTimeline/
|           +-- timelineConfig.ts
|           +-- types.ts
+-- tests/
    +-- routing/
    |   +-- timeline-route-order.test.tsx
    +-- features/
    |   +-- timeline/
    |       +-- timeline-scroll-reveal.test.tsx
    |       +-- timeline-marker-thresholds.test.tsx
    +-- integration/
        +-- mobile-layout-proportions.test.tsx
```

**Structure Decision**: Reuse the existing `TimeLine` route and timeline component area, add one shared marker-content configuration source, and keep localized label sourcing in the existing i18n layer rather than spreading per-marker content across CSS and component branches.

## Phase 0: Research

- Confirm the best config shape for marker content so image, text, offsets, and top/bottom placement move together.
- Confirm how to source localized marker labels from the existing route-language dictionary without hardcoding copy inside timeline components.
- Confirm responsive overlay placement rules that preserve marker association while preventing mobile overlap drift.
- Confirm test coverage strategy for marker-ID mapping, localization, and grouped content repositioning.

## Phase 1: Design & Contracts

- Define the marker content entity and its relationship to the existing marker anchor/progress model.
- Define the route, reveal, and marker-content UI contract, including ID binding, localization, and grouped offset behavior.
- Define data ownership boundaries among route config, translation dictionary, timeline components, and styling.
- Define validation paths for desktop/mobile responsiveness and marker-content regression behavior.
- Confirm the AGENTS plan pointer remains `specs/005-add-timeline-route/plan.md`.

## Phase 2: Task Planning Readiness

- Ready for `/speckit-tasks` covering route verification, localized marker content config, grouped overlay rendering, responsive tuning, and regression tests.

## Post-Design Constitution Check

- Language architecture: PASS. Localized labels are explicitly planned through the i18n layer.
- Route map integrity: PASS. No route-order changes beyond preserving the current intro -> timeline sequence.
- Story system design: PASS. Marker content is centralized in configuration and linked by stable IDs.
- Scroll/animation separation: PASS. Content overlays do not change the existing line-draw or GIF animation control model.
- RSVP stability: PASS. No RSVP modules touched.
- Supabase security: PASS. No data pipeline changes.
- Accessibility/mobile: PASS. Responsive content sizing and grouped positioning are part of the contract and quickstart validation.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
