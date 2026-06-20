# Tasks: Intro Reference Layout

**Input**: Design documents from `/specs/008-intro-reference-layout/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Include focused component/integration tests plus required manual visual QA because this feature’s main risk is layout regression.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `frontend/src/`, `frontend/public/`, `frontend/tests/`
- Documentation for this feature lives in `specs/008-intro-reference-layout/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the feature assets and current intro/test surfaces that the implementation will reuse.

- [X] T001 Verify required intro reference assets exist in `frontend/public/images/Home2/SampleIntro.png` and `frontend/public/images/Home2/Monday.png`
- [X] T002 Verify the current intro implementation and test entry points in `frontend/src/features/intro/IntroScene.tsx`, `frontend/src/features/intro/IntroScene.css`, and `frontend/tests/features/intro/IntroScene.test.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared intro composition structure that all story work will build on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Refactor shared intro scene wrappers and semantic layout regions in `frontend/src/features/intro/IntroScene.tsx`
- [X] T004 Refactor the base intro composition shell and breakpoint structure in `frontend/src/features/intro/IntroScene.css`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View the refreshed intro composition (Priority: P1) 🎯 MVP

**Goal**: Match the approved desktop intro composition more closely with the correct left/right grouping, date artwork, countdown placement, and decorative herbs.

**Independent Test**: Open `/intro` on desktop and confirm the title, Continue CTA, `Monday.png`, countdown, rings, venue details, and both herb clusters appear in the expected order and approximate positions without changing route behavior.

### Tests for User Story 1

- [X] T005 [P] [US1] Update intro rendering assertions for artwork, countdown presence, and CTA continuity in `frontend/tests/features/intro/IntroScene.test.tsx`

### Implementation for User Story 1

- [X] T006 [US1] Replace the rendered date text with the `Monday.png` asset and organize the left/right content groups in `frontend/src/features/intro/IntroScene.tsx`
- [X] T007 [US1] Rebuild the desktop intro composition, content alignment, and date/countdown visual block in `frontend/src/features/intro/IntroScene.css`
- [X] T008 [US1] Add the top-right decorative herb cluster and tune both decorative herb placements in `frontend/src/features/intro/IntroScene.css`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Read the date and countdown clearly on any screen (Priority: P2)

**Goal**: Keep the date artwork and countdown readable, centered, and non-overlapping across desktop and mobile layouts.

**Independent Test**: Resize `/intro` from desktop to mobile widths and confirm the button, `Monday.png`, countdown, rings, and venue content remain readable, centered, and inside the viewport.

### Tests for User Story 2

- [X] T009 [P] [US2] Extend intro scene coverage for date artwork rendering and countdown structure expectations in `frontend/tests/features/intro/IntroScene.test.tsx`

### Implementation for User Story 2

- [X] T010 [US2] Adjust the countdown rendering structure and non-negative timer behavior for the centered date block in `frontend/src/features/intro/IntroScene.tsx`
- [X] T011 [US2] Implement responsive scaling and mobile stack rules for the date artwork and countdown in `frontend/src/features/intro/IntroScene.css`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Experience a stable layout while resizing (Priority: P3)

**Goal**: Remove viewport drift so the intro composition stays visually stable across common desktop widths and narrow screens.

**Independent Test**: Resize the browser across common desktop widths and verify that the title, CTA, date artwork, countdown, rings, venue details, and herbs maintain consistent relative alignment with no overlap or unexpected shifting.

### Tests for User Story 3

- [X] T012 [P] [US3] Add or adjust integration coverage for intro layout stability and route-level rendering expectations in `frontend/tests/integration/mobile-layout-proportions.test.tsx`
- [X] T013 [P] [US3] Add or adjust integration coverage for desktop intro alignment stability in `frontend/tests/integration/desktop-nonregression-scroll-layout.test.tsx`

### Implementation for User Story 3

- [X] T014 [US3] Remove remaining viewport-sensitive offsets from the primary intro content and stabilize desktop alignment in `frontend/src/features/intro/IntroScene.css`
- [X] T015 [US3] Validate that intro route navigation behavior remains unchanged while the refreshed scene structure renders correctly in `frontend/src/features/intro/IntroScene.tsx` and `frontend/tests/integration/storyNavigationFlow.test.tsx`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and cleanup that affects multiple user stories

- [X] T016 [P] Run implementation validation from `frontend/` with `npx tsc --noEmit` and relevant Vitest coverage for `frontend/tests/features/intro/IntroScene.test.tsx` plus touched integration tests
- [ ] T017 Perform manual visual QA against `frontend/public/images/Home2/SampleIntro.png` across desktop and mobile and document any required follow-up in `specs/008-intro-reference-layout/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Depends on the shared composition from Foundational and builds on the date/countdown block introduced in US1
- **User Story 3 (P3)**: Depends on the shared composition from Foundational and validates/stabilizes the layout after US1 and US2 adjustments

### Within Each User Story

- Update tests for the story before finalizing implementation
- JSX/content structure updates before final CSS stabilization for that story
- Complete story-specific verification before moving to the next priority

### Parallel Opportunities

- T001 and T002 can run in parallel
- T005 can run alongside early US1 implementation once Phase 2 is complete
- T012 and T013 can run in parallel
- T016 and T017 can run in parallel after implementation is complete

---

## Parallel Example: User Story 3

```bash
# Launch layout regression coverage tasks together:
Task: "Add or adjust integration coverage for intro layout stability in frontend/tests/integration/mobile-layout-proportions.test.tsx"
Task: "Add or adjust integration coverage for desktop intro alignment stability in frontend/tests/integration/desktop-nonregression-scroll-layout.test.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Compare `/intro` against the reference on desktop and confirm CTA/navigation continuity

### Incremental Delivery

1. Complete Setup + Foundational → foundation ready
2. Add User Story 1 → test independently → visual desktop review
3. Add User Story 2 → test independently → responsive/mobile review
4. Add User Story 3 → test independently → resize stability review
5. Finish Polish phase validation

### Parallel Team Strategy

With multiple developers:

1. One developer completes Phase 2 composition scaffolding
2. After Phase 2:
   - Developer A: US1 markup/art composition
   - Developer B: US2 countdown/mobile readability
   - Developer C: US3 layout stability regression coverage

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] labels map tasks to specific user stories for traceability
- The prerequisite script could not complete because the repository is currently on `main` rather than a feature-named branch, so tasks were generated from the existing feature artifacts in `specs/008-intro-reference-layout/`
- Keep all changes isolated to the intro route and its focused regression coverage
