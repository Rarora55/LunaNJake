# Tasks: Address Route Timeline Transition

**Input**: Design documents from `/specs/002-address-timeline/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/address-timeline-behavior-contract.md, quickstart.md

**Tests**: Include unit and integration tests for transition windows, timeline config, route handoff, fallback behavior, and reduced-motion behavior.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Web app paths: `frontend/src/` and `frontend/tests/`
- Feature docs: `specs/002-address-timeline/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare module scaffolding and route/test placeholders for the address transition feature.

- [X] T001 Create address timeline feature directory scaffold in `frontend/src/features/addressTimeline/`
- [X] T002 [P] Create base stylesheet placeholder for timeline scene in `frontend/src/features/addressTimeline/AddressTimelineScene.css`
- [X] T003 [P] Create base scene component placeholder in `frontend/src/features/addressTimeline/AddressTimelineScene.tsx`
- [X] T004 [P] Create transition phase config module placeholder in `frontend/src/features/addressTimeline/transitionPhases.ts`
- [X] T005 [P] Create timeline item config module placeholder in `frontend/src/features/addressTimeline/timelineConfig.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core architecture required before user story work: route integration, localization keys, shared progress model, and reduced-motion/fallback utilities.

**?? CRITICAL**: No user story work can begin until this phase is complete.

- [X] T006 Add localized dictionary keys for address heading and timeline card text in `frontend/src/i18n/dictionaries.ts`
- [X] T007 Add typed interfaces for `TransitionPhaseWindow`, `TimelineItemConfig`, and render state in `frontend/src/features/addressTimeline/types.ts`
- [X] T008 Implement progress window helpers (clamp/map window progress, reversible mapping) in `frontend/src/features/addressTimeline/progressMath.ts`
- [X] T009 Implement reduced-motion detection helper in `frontend/src/features/addressTimeline/reducedMotion.ts`
- [X] T010 Implement media fallback helper for marker/icon failures in `frontend/src/features/addressTimeline/mediaFallback.ts`
- [X] T011 Replace placeholder address routing with localized `/en/address` and `/it/address` entries using `AddressTimelineScene` in `frontend/src/routing/storyRoutes.tsx`
- [X] T012 Add locale-aware she-said-yes -> `/en/address` or `/it/address` navigation state contract types shared by route handoff in `frontend/src/routing/storyRoutes.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Theatrical Exit and Address Reveal (Priority: P1) ?? MVP

**Goal**: Animate all `/she-said-yes` visible components out with stop-motion-like chaos, then reveal centered `CasaBoda` and address text.

**Independent Test**: From `/en/she-said-yes` or `/it/she-said-yes`, scroll through transition and confirm mixed-direction theatrical exits followed by centered image + fading address text.

### Tests for User Story 1

- [X] T013 [P] [US1] Add integration test for scatter-exit then address-reveal sequence in `frontend/tests/integration/address-transition-flow.test.tsx`
- [X] T014 [P] [US1] Add unit tests for transition phase window ordering and reversibility in `frontend/tests/unit/address-transition-phases.test.ts`

### Implementation for User Story 1

- [X] T015 [US1] Define explicit transition windows (`scatter-exit`, `address-reveal`, `line-growth`) in `frontend/src/features/addressTimeline/transitionPhases.ts`
- [X] T016 [US1] Implement randomized exit actor direction/jitter profile generator in `frontend/src/features/addressTimeline/exitActorProfiles.ts`
- [X] T017 [US1] Add scene actor exit orchestration (stagger, irregular offsets, rotations) to `frontend/src/features/sheSaidYes/SheSaidYesMarriedScene.tsx`
- [X] T018 [US1] Implement address reveal block (`CasaBoda` + address text fade) in `frontend/src/features/addressTimeline/AddressTimelineScene.tsx`
- [X] T019 [US1] Add theatrical handmade transition and reveal styles in `frontend/src/features/addressTimeline/AddressTimelineScene.css`
- [X] T020 [US1] Wire route handoff state from she-said-yes transition into localized address scene initialization (`/en/address` and `/it/address`) in `frontend/src/routing/storyRoutes.tsx`
- [X] T021 [US1] Implement reduced-motion variant for exit and reveal phases in `frontend/src/features/addressTimeline/AddressTimelineScene.tsx`

**Checkpoint**: User Story 1 is functional and independently testable.

---

## Phase 4: User Story 2 - Scroll-Driven Timeline Continuity (Priority: P1)

**Goal**: Grow a shared black vertical line from the address block and continue it naturally into `/en/address` and `/it/address` with bidirectional scroll behavior.

**Independent Test**: Continue scrolling after address reveal and verify the same line extends into `/en/address` or `/it/address`; scroll back up and verify consistent reverse behavior.

### Tests for User Story 2

- [X] T022 [P] [US2] Add integration test for line continuity across she-said-yes -> localized address-route boundary in `frontend/tests/integration/address-line-continuity.test.tsx`
- [X] T023 [P] [US2] Add unit tests for line progress mapping and bidirectional reversibility in `frontend/tests/unit/address-line-progress.test.ts`

### Implementation for User Story 2

- [X] T024 [US2] Implement shared line progress state and anchor model in `frontend/src/features/addressTimeline/lineState.ts`
- [X] T025 [US2] Implement line growth renderer tied to scroll progress windows in `frontend/src/features/addressTimeline/AddressTimelineScene.tsx`
- [X] T026 [US2] Add line continuity styles for transition block and timeline shaft in `frontend/src/features/addressTimeline/AddressTimelineScene.css`
- [X] T027 [US2] Implement backward scroll reversal handling for line and reveal states in `frontend/src/features/addressTimeline/AddressTimelineScene.tsx`
- [X] T028 [US2] Ensure line model is extensible for future items via normalized progress utilities in `frontend/src/features/addressTimeline/progressMath.ts`

**Checkpoint**: User Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Alternating Timeline Events (Priority: P2)

**Goal**: Reveal three progressive garabato-crossed timeline points with compact alternating cards and content-accurate icons/text.

**Independent Test**: Scroll through `/en/address` and `/it/address` and verify three item reveals occur at configured progress points with right-left-right card sides and correct content.

### Tests for User Story 3

- [X] T029 [P] [US3] Add unit tests validating timeline item config order, sides, and normalized reveal positions in `frontend/tests/unit/address-timeline-config.test.ts`
- [X] T030 [P] [US3] Add integration test for three-item reveal sequence and card content in `frontend/tests/integration/address-timeline-items.test.tsx`
- [X] T031 [P] [US3] Add integration test for media-failure fallback preserving readable text in `frontend/tests/integration/address-timeline-fallback.test.tsx`

### Implementation for User Story 3

- [X] T032 [US3] Define reusable timeline item config (marker, icon, text key, side, revealProgress) in `frontend/src/features/addressTimeline/timelineConfig.ts`
- [X] T033 [P] [US3] Implement garabato marker component crossed by line in `frontend/src/features/addressTimeline/TimelineMarker.tsx`
- [X] T034 [P] [US3] Implement compact adaptive timeline card component in `frontend/src/features/addressTimeline/TimelineCard.tsx`
- [X] T035 [US3] Implement progressive item reveal orchestration from normalized progress in `frontend/src/features/addressTimeline/AddressTimelineScene.tsx`
- [X] T036 [US3] Implement media failure placeholder rendering path for marker/icon assets in `frontend/src/features/addressTimeline/AddressTimelineScene.tsx`
- [X] T037 [US3] Add responsive card positioning rules (desktop alternating, mobile near-line simplification) in `frontend/src/features/addressTimeline/AddressTimelineScene.css`

**Checkpoint**: All user stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final quality, consistency, and validation across all stories.

- [X] T038 [P] Refine animation timing constants to preserve handmade feel while avoiding jank in `frontend/src/features/addressTimeline/transitionPhases.ts`
- [X] T039 [P] Normalize any remaining hardcoded address/timeline copy to dictionary keys in `frontend/src/i18n/dictionaries.ts` and `frontend/src/features/addressTimeline/timelineConfig.ts`
- [X] T040 Validate quickstart manual scenarios and record notes in `specs/002-address-timeline/quickstart.md`
- [X] T041 Run full frontend test suite and fix regressions in `frontend/tests/`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1; blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2.
- **Phase 4 (US2)**: Depends on Phase 2 and US1 route handoff hooks.
- **Phase 5 (US3)**: Depends on Phase 2 and US2 line continuity base.
- **Phase 6 (Polish)**: Depends on completion of desired user stories.

### User Story Dependencies

- **US1 (P1)**: Starts after foundational completion; MVP.
- **US2 (P1)**: Starts after foundational completion; integrates with US1 handoff but remains independently testable.
- **US3 (P2)**: Starts after foundational completion and uses shared line/progress model from US2.

### Within Each User Story

- Tests first (where listed), then config/models, then rendering/orchestration, then responsive/fallback refinements.

### Parallel Opportunities

- Phase 1 tasks T002-T005 can run in parallel.
- Phase 2 tasks T007-T010 can run in parallel after T006.
- In US1, T013 and T014 can run in parallel; T018 and T019 can run in parallel after T015.
- In US2, T022 and T023 can run in parallel; T025 and T026 can run in parallel after T024.
- In US3, T029-T031 can run in parallel; T033 and T034 can run in parallel after T032.

---

## Parallel Example: User Story 3

```bash
# Parallel tests
Task: "T029 [US3] address timeline config unit tests"
Task: "T030 [US3] timeline item reveal integration test"
Task: "T031 [US3] media fallback integration test"

# Parallel UI components after config exists
Task: "T033 [US3] TimelineMarker component"
Task: "T034 [US3] TimelineCard component"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1).
3. Validate independent test for US1.
4. Demo/deploy MVP transition experience.

### Incremental Delivery

1. Setup + Foundational -> shared architecture ready.
2. Deliver US1 -> verify transition + address reveal.
3. Deliver US2 -> verify line continuity and bidirectional behavior.
4. Deliver US3 -> verify full timeline content and fallback/responsive behavior.
5. Polish and full regression run.

### Parallel Team Strategy

1. Team completes Phase 1/2 together.
2. After foundation:
   - Developer A: US1 transition orchestration.
   - Developer B: US2 line continuity + progress engine.
   - Developer C: US3 timeline components/config/tests.
3. Integrate and run Phase 6 polish/regression.

---

## Notes

- [P] tasks target independent files and minimal merge conflicts.
- Story labels map every implementation task to a concrete user story for traceability.
- Keep GSAP/Motion responsibilities separated per constitution rules.
- Maintain dictionary-backed user-visible text for both locales.


