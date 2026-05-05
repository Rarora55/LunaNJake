# Implementation Plan: Story Slide Stack (Constitution-Aligned)

**Branch**: `001-temp-route-colors` | **Date**: 2026-05-04 | **Spec**: [specs/001-temp-route-colors/spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-temp-route-colors/spec.md`

## Summary

Implement the first animated Story section as a deterministic 10-step, full-viewport vertical slideshow aligned with constitution ordering. Include stacked temporary black placeholders, per-step typewriter text replay sourced from localization dictionaries, and a transient highlight at step 8 (`she-was-not-wrong`) that fades/centers before normal slideshow flow resumes for steps 9 and 10.

## Technical Context

**Language/Version**: TypeScript 5.9, React 19  
**Primary Dependencies**: React Router 7, Motion 12, Tailwind CSS 4  
**Storage**: N/A (UI/state only; translation dictionaries reused)  
**Testing**: Vitest + React Testing Library (unit + integration)  
**Target Platform**: Web (desktop + mobile browsers)  
**Project Type**: Frontend web application  
**Performance Goals**: Step transition completion in ~0.35s-0.55s per accepted interaction; no multi-step skip per accepted interaction  
**Constraints**: Vertical-only step progression, no spring bounce, constitution ten-step sequence, dictionary-backed story text for `en`/`it`, mobile-readable caption layout  
**Scale/Scope**: One Story section, 10 ordered steps, temporary placeholder visuals

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Language architecture: PASS. User-facing Story text is required from translation dictionaries for both locales.
- Route map integrity: PASS. Localized Story routes remain under `/en/*` and `/it/*`.
- Story system design: PASS. Story is config-driven and aligned to constitution ten-step narrative.
- Scroll/animation separation: PASS. Motion handles component transitions; no GSAP overlap required.
- RSVP stability: PASS. RSVP flows unchanged.
- Supabase security: PASS. No backend/secret changes.
- Email pipeline: PASS. No changes.
- Accessibility/mobile: PASS. Keyboard and mobile behavior remain explicit and testable.

## Project Structure

### Documentation (this feature)

```text
specs/001-temp-route-colors/
+-- plan.md
+-- research.md
+-- data-model.md
+-- quickstart.md
+-- contracts/
|   +-- story-slide-behavior-contract.md
+-- tasks.md
```

### Source Code (repository root)

```text
frontend/
+-- src/
|   +-- config/
|   |   +-- storySequence.ts
|   +-- features/story/
|   |   +-- navigationController.ts
|   |   +-- transitions.ts
|   +-- pages/
|   |   +-- StoryPage.tsx
|   +-- routing/
|       +-- storyRoutes.tsx
+-- tests/
    +-- integration/
    |   +-- story-slideshow-flow.test.tsx
    +-- unit/
        +-- story-sequence-config.test.ts
```

**Structure Decision**: Keep implementation in existing frontend Story modules with config-driven ten-step sequence and focused behavior tests.

## Phase 0: Research

- Confirm transition profile for fast-start/hard-stop behavior without spring bounce.
- Confirm one-accepted-interaction gating under wheel/touch momentum.
- Confirm transient highlight semantics at step 8 and resumption at steps 9-10.
- Confirm dictionary-driven text sourcing strategy for `en`/`it` without hardcoded component copy.

## Phase 1: Design & Contracts

- Update slide/state entities and invariants for 10-step sequence.
- Update behavior contract for step-8 highlight + step-9/10 continuation.
- Update quickstart validation scenarios for sequence integrity, highlight resume, and localization.
- Keep AGENTS.md plan pointer aligned to this plan file.

## Phase 2: Task Planning Readiness

- Ready for `/speckit-tasks` with ten-step sequence coverage and localization verification.

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
