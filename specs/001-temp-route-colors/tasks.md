# Tasks: Story Slide Stack (Constitution-Aligned)

**Input**: Design documents from `/specs/001-temp-route-colors/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Include unit/integration tests because the specification requires explicit behavior and measurable outcomes.

**Organization**: Tasks are grouped by user story for independent implementation and validation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable task (different files/no blocking dependency)
- **[Story]**: User story mapping (`US1`, `US2`, `US3`)
- Include exact file paths in every task

## Path Conventions

- Web app paths: `frontend/src/` and `frontend/tests/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare Story feature files and test scaffolding for constitution-aligned 10-step implementation.

- [X] T001 Create/refresh Story scaffolds in `frontend/src/config/storySequence.ts`, `frontend/src/features/story/transitions.ts`, `frontend/src/features/story/navigationController.ts`, and `frontend/tests/`
- [X] T002 [P] Add/confirm Story test suites in `frontend/tests/unit/story-sequence-config.test.ts` and `frontend/tests/integration/story-slideshow-flow.test.tsx`
- [X] T003 [P] Add interaction helper utilities in `frontend/tests/integration/helpers/storyInteractions.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish ten-step sequence, localization sourcing rules, and shared navigation/transition constraints.

**CRITICAL**: Complete this phase before any user story implementation.

- [X] T004 Implement canonical 10-step sequence config/order and display modes in `frontend/src/config/storySequence.ts`
- [X] T005 Implement translation-key-based Story text mapping (no hardcoded component copy) in `frontend/src/config/storySequence.ts` and localization dictionaries under `frontend/src/i18n/`
- [X] T006 Update Story route mapping for ten-step ids in `frontend/src/routing/storyRoutes.tsx`
- [X] T007 Implement navigation controller bounds/gating (`activeIndex` range `0..9`, one accepted interaction => max one step) in `frontend/src/features/story/navigationController.ts`
- [X] T008 [P] Implement shared non-spring transition presets for slide and text behaviors in `frontend/src/features/story/transitions.ts`
- [X] T009 [P] Add foundational unit tests for ten-step invariants, ordering, and translation-key requirements in `frontend/tests/unit/story-sequence-config.test.ts`
- [X] T010 [P] Add foundational unit tests for navigation gating and bounds in `frontend/tests/unit/story-navigation-controller.test.ts`

**Checkpoint**: Foundation complete; user stories can proceed.

---

## Phase 3: User Story 1 - Progress Through Story Slides (Priority: P1) MVP

**Goal**: Vertical interactions progress one step at a time across all 10 steps with snappy bottom-to-top transitions.

**Independent Test**: Verify forward/backward one-step movement from step 1 to step 10 with no momentum multi-skip.

### Tests for User Story 1

- [X] T011 [P] [US1] Add integration test for forward/backward one-step navigation across 10-step sequence in `frontend/tests/integration/story-slideshow-flow.test.tsx`
- [X] T012 [P] [US1] Add integration test for momentum no-skip behavior including transitions near steps 8->9 and 9->10 in `frontend/tests/integration/story-slideshow-flow.test.tsx`

### Implementation for User Story 1

- [X] T013 [US1] Implement full-viewport step container flow (`100vh`) with active-index rendering in `frontend/src/pages/StoryPage.tsx`
- [X] T014 [US1] Wire wheel/touch/keyboard vertical interactions to navigation controller in `frontend/src/pages/StoryPage.tsx`
- [X] T015 [US1] Apply bottom-to-top incoming step transitions with shared snappy presets in `frontend/src/pages/StoryPage.tsx`

**Checkpoint**: US1 functional and independently testable.

---

## Phase 4: User Story 2 - Read Story Text Per Slide (Priority: P1)

**Goal**: Captioned steps render centered placeholder + below-caption text with typewriter replay, using dictionary-backed text.

**Independent Test**: Navigate through captioned steps and verify text mapping, replay behavior, and responsive readability.

### Tests for User Story 2

- [X] T016 [P] [US2] Add integration test for per-step text mapping from translation keys in both `en` and `it` in `frontend/tests/integration/story-slideshow-flow.test.tsx`
- [X] T017 [P] [US2] Add integration test for typewriter reset/replay on every active-step change and revisit in `frontend/tests/integration/story-slideshow-flow.test.tsx`
- [X] T018 [P] [US2] Add layout/readability assertions for centered placeholder and caption spacing on desktop/mobile in `frontend/tests/integration/story-slideshow-flow.test.tsx`

### Implementation for User Story 2

- [X] T019 [US2] Render captioned steps with centered black placeholder and responsive sizing in `frontend/src/pages/StoryPage.tsx`
- [X] T020 [US2] Render centered below-placeholder caption layout in `frontend/src/pages/StoryPage.tsx` and `frontend/src/pages/StoryPage.css`
- [X] T021 [US2] Implement keyed typewriter replay for localized step text in `frontend/src/pages/StoryPage.tsx`

**Checkpoint**: US2 functional and independently testable.

---

## Phase 5: User Story 3 - Reach Highlight Slide State (Priority: P2)

**Goal**: Step 8 (`she-was-not-wrong`) behaves as transient highlight and steps 9-10 resume captioned slideshow.

**Independent Test**: At step 8, placeholders fade and centered highlight text appears; proceeding to step 9 restores captioned mode.

### Tests for User Story 3

- [X] T022 [P] [US3] Add integration test for step-8 highlight fade + centered text behavior in `frontend/tests/integration/story-slideshow-flow.test.tsx`
- [X] T023 [P] [US3] Add integration test for step-9/10 captioned resume after highlight step in `frontend/tests/integration/story-slideshow-flow.test.tsx`

### Implementation for User Story 3

- [X] T024 [US3] Implement placeholder layer accumulation and visibility transitions for highlight step in `frontend/src/pages/StoryPage.tsx`
- [X] T025 [US3] Implement step-8 `highlight` display mode behavior in `frontend/src/pages/StoryPage.tsx`
- [X] T026 [US3] Implement captioned resume behavior for steps 9 and 10 in `frontend/src/pages/StoryPage.tsx`

**Checkpoint**: US3 functional and independently testable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency and regression hardening.

- [X] T027 [P] Remove stale 7-step assumptions and excluded-route language from Story tests/docs in `frontend/tests/` and `specs/001-temp-route-colors/`
- [X] T028 [P] Add/update transition preset tests in `frontend/tests/unit/story-transitions.test.ts`
- [X] T029 Run full Story unit/integration suites and record validation notes in `specs/001-temp-route-colors/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 -> Phase 2 -> Phase 3/4/5 -> Phase 6
- User stories depend on foundational completion.

### User Story Dependencies

- **US1**: Starts after foundational phase; no dependency on other user stories.
- **US2**: Starts after foundational phase; may run parallel with US1 with merge coordination in `StoryPage.tsx`.
- **US3**: Starts after foundational phase; depends on shared rendering/control baseline from US1/US2.

### Parallel Opportunities

- Setup: `T002`, `T003`
- Foundational: `T008`, `T009`, `T010`
- US1 tests: `T011`, `T012`
- US2 tests: `T016`, `T017`, `T018`
- US3 tests: `T022`, `T023`
- Polish: `T027`, `T028`

---

## Implementation Strategy

### MVP First

1. Complete Phases 1-2.
2. Deliver US1 (Phase 3).
3. Validate one-step ten-step flow before continuing.

### Incremental Delivery

1. Add US2 localized caption/typewriter behaviors.
2. Add US3 highlight + resume behavior.
3. Finish with polish and full regression pass.

## Notes

- Keep user-facing Story text dictionary-sourced in both locales.
- Keep one-interaction-one-step rule across all 10 steps.
- Preserve transient (non-terminal) behavior for step 8.

