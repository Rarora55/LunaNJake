# Tasks: Mobile Scale and Scroll Parity

**Input**: Design documents from `/specs/003-mobile-scale-scroll/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/mobile-scroll-layout-contract.md, quickstart.md

**Tests**: Include targeted regression and behavior tests aligned with spec success criteria.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish audit baseline and identify all in-scope story routes/components.

- [x] T001 Create mobile audit checklist and route inventory in `specs/003-mobile-scale-scroll/checklists/mobile-audit.md`
- [x] T002 Capture current desktop/mobile baseline notes and friction points in `specs/003-mobile-scale-scroll/checklists/mobile-audit.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Add shared mobile scaling tokens and story-shell-level responsive guardrails used by all stories.

- [x] T003 Add shared responsive variables and base mobile constraints in `frontend/src/pages/StoryPage.css`
- [x] T004 [P] Add viewport overflow safety rules for story shell wrappers in `frontend/src/pages/StoryPage.css`
- [x] T005 [P] Add reduced-motion mobile profile hooks for story transitions in `frontend/src/pages/StoryPage.css`
- [x] T006 Document in-scope route/component mapping and ownership in `specs/003-mobile-scale-scroll/contracts/mobile-scroll-layout-contract.md`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Readable, Proportional Mobile Layout (Priority: P1) ?? MVP

**Goal**: Ensure all in-scope localized story routes and shared shell components are proportionate and readable on mobile.

**Independent Test**: In 320-430 px widths, verify no critical content clipping/overflow and visual hierarchy parity against desktop.

### Tests for User Story 1

- [x] T007 [P] [US1] Add responsive layout regression test coverage in `frontend/tests/integration/mobile-layout-proportions.test.tsx`
- [x] T008 [P] [US1] Add overflow/clipping guard test cases in `frontend/tests/integration/mobile-layout-proportions.test.tsx`

### Implementation for User Story 1

- [x] T009 [US1] Refine mobile typography/spacing/card proportions in `frontend/src/features/travellingFromLondon/TravellingFromLondonScene.css`
- [x] T010 [P] [US1] Refine mobile container and section spacing hierarchy in `frontend/src/pages/StoryPage.css`
- [x] T011 [P] [US1] Apply responsive sizing to media and decorative assets in `frontend/src/features/travellingFromLondon/TravellingFromLondonScene.css`
- [x] T012 [US1] Apply matching mobile proportion updates across other in-scope story scene style files under `frontend/src/features/**/**Scene.css`
- [x] T013 [US1] Add/adjust breakpoint-specific edge padding and width constraints in `frontend/src/pages/StoryPage.css`
- [x] T014 [US1] Validate and fix any horizontal overflow issues in story shell and scene styles under `frontend/src/pages/StoryPage.css` and `frontend/src/features/**/**Scene.css`

**Checkpoint**: User Story 1 fully functional and independently testable.

---

## Phase 4: User Story 2 - Smooth Touch Scrolling and Section Progression (Priority: P1)

**Goal**: Make mobile scroll progression smooth and controllable, reduce friction from snapping, and apply reduced-motion-specific strong simplification.

**Independent Test**: Forward/reverse traversal on mobile has no lock/jump/frozen states, high-friction sections no longer require repeated corrective swipes, reduced-motion profile is correctly applied.

### Tests for User Story 2

- [x] T015 [P] [US2] Add mobile scroll behavior regression tests in `frontend/tests/integration/mobile-scroll-behavior.test.tsx`
- [x] T016 [P] [US2] Add reduced-motion transition profile test cases in `frontend/tests/integration/mobile-scroll-behavior.test.tsx`

### Implementation for User Story 2

- [x] T017 [US2] Tune mobile scroll-triggered transition distances/easing/resistance in story transition styling and config under `frontend/src/pages/StoryPage.css` and `frontend/src/features/**`
- [x] T018 [US2] Soften or disable hard snap in identified high-friction mobile sections under `frontend/src/pages/StoryPage.css` and related story scene styles
- [x] T019 [P] [US2] Add/adjust reduced-motion-only stronger simplification rules for mobile transitions in `frontend/src/pages/StoryPage.css`
- [x] T020 [US2] Verify and fix reverse-scroll progression stability in in-scope story transition logic/styles under `frontend/src/features/**` and `frontend/src/pages/StoryPage.css`

**Checkpoint**: User Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Desktop Experience Integrity (Priority: P2)

**Goal**: Preserve desktop behavior and visual parity while keeping necessary shared fixes explicit and controlled.

**Independent Test**: Desktop routes show no unintended visual/scroll changes compared to baseline.

### Tests for User Story 3

- [x] T021 [P] [US3] Add desktop non-regression checks for audited routes in `frontend/tests/integration/desktop-nonregression-scroll-layout.test.tsx`

### Implementation for User Story 3

- [x] T022 [US3] Audit desktop breakpoints and isolate mobile-only rules to prevent leakage in `frontend/src/pages/StoryPage.css` and `frontend/src/features/**/**Scene.css`
- [x] T023 [US3] Document any intentional shared desktop fixes and rationale in `specs/003-mobile-scale-scroll/quickstart.md`

**Checkpoint**: All user stories independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification, cleanup, and completion reporting.

- [x] T024 [P] Run full quickstart validation and record results in `specs/003-mobile-scale-scroll/quickstart.md`
- [x] T025 [P] Update mobile audit checklist pass/fail results in `specs/003-mobile-scale-scroll/checklists/mobile-audit.md`
- [x] T026 Final CSS cleanup and consistency pass across touched files in `frontend/src/pages/StoryPage.css` and `frontend/src/features/**/**Scene.css`

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 -> no dependencies
- Phase 2 -> depends on Phase 1
- Phase 3/4/5 -> depend on Phase 2
- Phase 6 -> depends on completion of selected story phases

### User Story Dependencies

- US1 (P1): starts after Foundational
- US2 (P1): starts after Foundational; benefits from US1 style normalization but remains independently testable
- US3 (P2): starts after Foundational; validates non-regression after US1/US2 changes

### Within Each User Story

- Tests first, then implementation
- Shared shell/layout changes before route-specific polish
- Complete story-level validation before moving on

### Parallel Opportunities

- T004 and T005 can run in parallel
- T007 and T008 can run in parallel
- T010 and T011 can run in parallel
- T015 and T016 can run in parallel
- T019 can run in parallel with T017/T018 once friction sections are identified
- T024 and T025 can run in parallel

---

## Parallel Example: User Story 1

```bash
Task: "Add responsive layout regression test coverage in frontend/tests/integration/mobile-layout-proportions.test.tsx"
Task: "Add overflow/clipping guard test cases in frontend/tests/integration/mobile-layout-proportions.test.tsx"

Task: "Refine mobile container and section spacing hierarchy in frontend/src/pages/StoryPage.css"
Task: "Apply responsive sizing to media and decorative assets in frontend/src/features/travellingFromLondon/TravellingFromLondonScene.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2
2. Complete Phase 3 (US1)
3. Validate US1 independently in 320-430 px mobile widths
4. Demo/deploy MVP

### Incremental Delivery

1. Deliver US1 for mobile proportional readability
2. Deliver US2 for smooth touch-scroll behavior and reduced-motion adaptation
3. Deliver US3 for desktop non-regression guarantees
4. Finish with Phase 6 cross-cutting validation

### Parallel Team Strategy

1. One engineer handles shared shell/foundation tasks
2. One engineer handles US1 route-level scaling refinements
3. One engineer handles US2 scroll behavior tuning and reduced-motion profile checks
4. Final pass by one engineer for US3 desktop non-regression and polish

---

## Notes

- `[P]` tasks are parallelizable when touching disjoint files or non-blocking checks.
- Story labels map directly to spec user stories for traceability.
- Preserve desktop behavior by default; explicitly document any necessary shared fix.
