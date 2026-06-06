# Tasks: Confirmation Route

**Input**: Design documents from `/specs/006-confirmation-route/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Include automated tests because the plan and quickstart explicitly require route-order, localization, and responsive-rendering validation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Web app paths are rooted under `frontend/src/` and `frontend/tests/`
- Feature documentation lives under `specs/006-confirmation-route/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the feature scaffolding and asset target needed by later story work

- [X] T001 Verify the approved confirmation image file name and target import path from `C:\Users\Ramwi\Desktop\LunaNJake\Images\Confirmation` for use in `frontend/src/routes/Confirmation.tsx`
- [X] T002 Create the confirmation route file scaffold in `frontend/src/routes/Confirmation.tsx` and `frontend/src/routes/Confirmation.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core route and localization infrastructure that MUST be complete before any user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Update localized path helpers for confirmation in `frontend/src/config/storyInputs.ts`
- [X] T004 [P] Add a dictionary-backed `confirmation` content group for English and Italian in `frontend/src/i18n/storyText.ts`
- [X] T005 [P] Add or export any confirmation-specific content resolver helpers from `frontend/src/i18n/storyText.ts`
- [X] T006 Update `frontend/src/routing/storyRoutes.tsx` to declare the new `/:lang/confirmation` route shell and route component wiring

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Continue from Recommendations into Confirmation (Priority: P1) MVP

**Goal**: Insert confirmation immediately after recommendation in both forward and backward localized navigation flow

**Independent Test**: Navigate through the localized route flow and confirm recommendation -> confirmation -> questions order, plus confirmation -> recommendation on backward traversal

### Tests for User Story 1

- [X] T007 [P] [US1] Add route-order coverage for confirmation in `frontend/tests/routing/confirmation-route-order.test.tsx`
- [X] T008 [P] [US1] Extend localized flow coverage for recommendation -> confirmation -> questions navigation in `frontend/tests/integration/storyNavigationFlow.test.tsx`

### Implementation for User Story 1

- [X] T009 [US1] Implement the `ConfirmationRoute` wrapper and localized previous/next path wiring in `frontend/src/routing/storyRoutes.tsx`
- [X] T010 [US1] Update `Recommendation` forward navigation to confirmation in `frontend/src/routing/storyRoutes.tsx`
- [X] T011 [US1] Update `Questions` backward navigation to confirmation in `frontend/src/routing/storyRoutes.tsx`
- [X] T012 [US1] Implement localized navigation props and static section contract in `frontend/src/routes/Confirmation.tsx`

**Checkpoint**: User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Read the Confirmation Message Clearly (Priority: P1)

**Goal**: Render the localized confirmation title and body in a centered, readable two-column desktop layout with left-aligned text content

**Independent Test**: Open `/:lang/confirmation` on a desktop-sized viewport and verify localized title/body copy, centered composition, prominent title styling, and left-aligned text block readability

### Tests for User Story 2

- [X] T013 [P] [US2] Add localized confirmation copy rendering assertions in `frontend/tests/integration/confirmation-layout.test.tsx`
- [X] T014 [P] [US2] Add dictionary resolver coverage for confirmation text in `frontend/tests/unit/storyConfig.test.ts`

### Implementation for User Story 2

- [X] T015 [US2] Implement dictionary-driven confirmation title and body rendering in `frontend/src/routes/Confirmation.tsx`
- [X] T016 [US2] Implement the centered desktop two-column layout, left-column text alignment, and `#4C77E6` accent styling in `frontend/src/routes/Confirmation.css`
- [X] T017 [US2] Apply the required script-style title font stack and readable body typography in `frontend/src/routes/Confirmation.css`

**Checkpoint**: User Stories 1 and 2 should work independently, with confirmation route order and readable localized copy in place

---

## Phase 5: User Story 3 - See the Confirmation Image Beside the Message (Priority: P2)

**Goal**: Display one fixed approved confirmation image beside the message on desktop and stacked below the text on mobile without overflow

**Independent Test**: Open `/:lang/confirmation` on desktop and mobile sizes and confirm the same image is shown, stays within bounds, appears right of the text on desktop, and moves below the text on mobile

### Tests for User Story 3

- [X] T018 [P] [US3] Add fixed-image and responsive ordering assertions in `frontend/tests/integration/confirmation-layout.test.tsx`
- [X] T019 [P] [US3] Add mobile non-overflow expectations for confirmation in `frontend/tests/integration/mobile-layout-proportions.test.tsx`

### Implementation for User Story 3

- [X] T020 [US3] Import and render the single approved confirmation image asset in `frontend/src/routes/Confirmation.tsx`
- [X] T021 [US3] Implement responsive image sizing, right-column desktop placement, and stacked mobile placement in `frontend/src/routes/Confirmation.css`
- [X] T022 [US3] Add any required decorative-image accessibility treatment in `frontend/src/routes/Confirmation.tsx`

**Checkpoint**: User Stories 1, 2, and 3 should now be independently functional, with fixed responsive media behavior added

---

## Phase 6: User Story 4 - Experience a Soft Section Entrance (Priority: P2)

**Goal**: Fade the full confirmation content block in smoothly when the route becomes active without introducing scroll-coupled motion

**Independent Test**: Enter `/:lang/confirmation` and verify the full content block fades in once, smoothly settles, and remains layout-stable

### Tests for User Story 4

- [X] T023 [P] [US4] Add entry-state rendering coverage for the confirmation fade container in `frontend/tests/integration/confirmation-layout.test.tsx`

### Implementation for User Story 4

- [X] T024 [US4] Implement mount-triggered entry visibility state for the confirmation content block in `frontend/src/routes/Confirmation.tsx`
- [X] T025 [US4] Implement the soft fade-in transition and settled-state styling in `frontend/src/routes/Confirmation.css`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final regression validation and documentation alignment across the completed feature

- [ ] T026 [P] Run the confirmation-related automated checks in `frontend/tests/routing/confirmation-route-order.test.tsx`, `frontend/tests/integration/confirmation-layout.test.tsx`, `frontend/tests/integration/storyNavigationFlow.test.tsx`, and `frontend/tests/integration/mobile-layout-proportions.test.tsx`
- [ ] T027 Perform manual validation steps from `specs/006-confirmation-route/quickstart.md` for `/:lang/confirmation` on representative desktop and mobile viewports
- [ ] T028 Update any changed file references or implementation notes in `specs/006-confirmation-route/quickstart.md` if the delivered paths differ from the current plan

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational - no dependency on other user stories
- **User Story 2 (P1)**: Starts after Foundational and depends on the confirmation route shell from US1
- **User Story 3 (P2)**: Starts after Foundational and depends on the base confirmation layout from US2
- **User Story 4 (P2)**: Starts after Foundational and depends on the confirmation content block from US2/US3

### Within Each User Story

- Tests should be written before or alongside implementation and fail before the corresponding behavior is added
- Route scaffolding before route integration
- Content wiring before layout refinement
- Layout before responsive or animation polish

### Parallel Opportunities

- T004 and T005 can run in parallel once path-helper planning is clear
- T007 and T008 can run in parallel within US1
- T013 and T014 can run in parallel within US2
- T018 and T019 can run in parallel within US3
- T024 and T025 can be split across component/state and styling work once US2/US3 are complete

---

## Parallel Example: User Story 1

```bash
# Launch User Story 1 validation tasks together:
Task: "Add route-order coverage for confirmation in frontend/tests/routing/confirmation-route-order.test.tsx"
Task: "Extend localized flow coverage for recommendation -> confirmation -> questions navigation in frontend/tests/integration/storyNavigationFlow.test.tsx"
```

---

## Parallel Example: User Story 2

```bash
# Launch User Story 2 verification tasks together:
Task: "Add localized confirmation copy rendering assertions in frontend/tests/integration/confirmation-layout.test.tsx"
Task: "Add dictionary resolver coverage for confirmation text in frontend/tests/unit/storyConfig.test.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Confirm localized recommendation -> confirmation -> questions route flow

### Incremental Delivery

1. Complete Setup + Foundational
2. Deliver User Story 1 for route placement
3. Deliver User Story 2 for localized readable content
4. Deliver User Story 3 for fixed responsive imagery
5. Deliver User Story 4 for transition polish

### Parallel Team Strategy

1. One developer handles foundational path and dictionary wiring
2. After Foundational completes:
   - Developer A: route flow and navigation tests (US1)
   - Developer B: content and layout styling (US2)
   - Developer C: media responsiveness and animation polish after base layout is ready (US3/US4)

---

## Notes

- [P] tasks touch different files and avoid incomplete-task dependencies
- Each story phase maps directly to a spec user story for traceability
- The selected confirmation image asset should be locked before completing US3 to avoid churn
- Keep all user-facing copy dictionary-driven; do not hardcode confirmation text in the route component
