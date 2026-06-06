# Tasks: Intro and Married Route Simplification

**Input**: Design documents from `/specs/004-intro-married-routes/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/route-sequence-contract.md

**Tests**: Include targeted route and intro-sequence tests to verify localized routing, English fallback redirects, deterministic timing, and Continue CTA behavior.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story label (`[US1]`, `[US2]`, `[US3]`)
- Include exact file paths in each task description

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare intro route feature and test scaffolding.

- [x] T001 Create intro scene files in frontend/src/features/intro/IntroScene.tsx and frontend/src/features/intro/IntroScene.css
- [x] T002 Create route behavior test scaffold in frontend/tests/routing/intro-married-routes.test.tsx
- [x] T003 [P] Create intro sequence and CTA test scaffold in frontend/tests/features/intro/IntroScene.test.tsx

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared localized route constants, copy keys, and navigation helpers before story work.

- [x] T004 Add localized canonical/alias/legacy route constants in frontend/src/config/storyInputs.ts
- [x] T005 [P] Add localized intro and Continue CTA copy keys to dictionaries in frontend/src/i18n/storyText.ts
- [x] T006 Update story navigation helper expectations for intro-first localized flow in frontend/src/features/story/navigationController.ts

**Checkpoint**: Foundational routing and localization primitives are ready.

---

## Phase 3: User Story 1 - Enter Through Intro Only (Priority: P1) MVP

**Goal**: Legacy story routes are removed from active flow and redirect to `/en/intro`; canonical localized intro route is reachable.

**Independent Test**: Direct navigation to `/story`, `/story/*`, `/she-said-yes`, and `/intro` resolves to English fallback intro behavior while `/:lang/intro` is reachable.

### Implementation for User Story 1

- [x] T007 [US1] Update route map to canonical `/:lang/intro` and redirect legacy paths to `/en/intro` in frontend/src/routing/storyRoutes.tsx
- [x] T008 [US1] Add alias redirect handling `/intro` -> `/en/intro` in frontend/src/routing/storyRoutes.tsx
- [x] T009 [US1] Remove obsolete direct she-said-yes/story entry flow wiring in frontend/src/routing/storyRoutes.tsx
- [x] T010 [US1] Implement route tests for legacy and alias redirect matrix in frontend/tests/routing/intro-married-routes.test.tsx

**Checkpoint**: US1 is independently functional and testable.

---

## Phase 4: User Story 2 - Experience Sequential Intro Narrative (Priority: P1)

**Goal**: `/:lang/intro` runs a deterministic three-stage sequence with fixed 3-second pauses, persistent final state, and keyboard-operable Continue CTA.

**Independent Test**: Validate sequence order, no overlap, timing tolerance, full-screen centered layout, and Continue CTA interaction from final state.

### Implementation for User Story 2

- [x] T011 [P] [US2] Implement intro sequence state machine and same-language Continue CTA navigation in frontend/src/features/intro/IntroScene.tsx
- [x] T012 [P] [US2] Implement full-screen centered intro styles and required title typography in frontend/src/features/intro/IntroScene.css
- [x] T013 [US2] Wire localized `/:lang/intro` route to IntroScene with language param handling in frontend/src/routing/storyRoutes.tsx
- [x] T014 [US2] Add intro sequence tests for order, non-overlap, pause timing, and persistent final state in frontend/tests/features/intro/IntroScene.test.tsx
- [x] T015 [US2] Add Continue CTA accessibility/interaction tests (keyboard + pointer) in frontend/tests/features/intro/IntroScene.test.tsx

**Checkpoint**: US2 is independently functional and testable.

---

## Phase 5: User Story 3 - Continue to Married Route (Priority: P2)

**Goal**: Localized married route remains available, and `/married` alias redirects to `/en/married`.

**Independent Test**: Direct access to `/:lang/married` is reachable; `/married` redirects to `/en/married`; intro Continue CTA routes to same-language married path.

### Implementation for User Story 3

- [x] T016 [US3] Map canonical `/:lang/married` and alias redirect `/married` -> `/en/married` in frontend/src/routing/storyRoutes.tsx
- [x] T017 [US3] Update married scene entry assumptions for localized intro-to-married handoff in frontend/src/features/sheSaidYes/SheSaidYesMarriedScene.tsx
- [x] T018 [US3] Add married route reachability and alias redirect tests in frontend/tests/routing/intro-married-routes.test.tsx

**Checkpoint**: US3 is independently functional and testable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final quality and regression validation across all stories.

- [x] T019 [P] Update validation checklist steps for localized canonical routes and CTA checks in specs/004-intro-married-routes/quickstart.md
- [x] T020 Add final verification notes for redirect/sequence/CTA contract signals in specs/004-intro-married-routes/contracts/route-sequence-contract.md
- [x] T021 Run targeted frontend tests for routing and intro sequence behavior and summarize outcomes in specs/004-intro-married-routes/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1 and blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2.
- **Phase 4 (US2)**: Depends on Phase 2 and canonical localized route scaffolding from US1.
- **Phase 5 (US3)**: Depends on US1 route simplification and US2 intro flow behavior.
- **Phase 6 (Polish)**: Depends on completion of US1, US2, and US3.

### User Story Dependencies

- **US1 (P1)**: No story dependency; establishes route-entry behavior.
- **US2 (P1)**: Depends on localized intro route availability from US1.
- **US3 (P2)**: Depends on US1+US2 to validate married route continuity and CTA destination.

### Parallel Opportunities

- T002 and T003 can run in parallel.
- T004 and T005 can run in parallel.
- T011 and T012 can run in parallel.
- T019 can run in parallel with final test execution once implementation is complete.

---

## Parallel Example: User Story 2

```bash
Task: "Implement intro sequence state machine and Continue CTA in frontend/src/features/intro/IntroScene.tsx"
Task: "Implement intro scene styling and typography in frontend/src/features/intro/IntroScene.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1).
3. Validate legacy and alias redirects to `/en/intro` plus `/:lang/intro` reachability.
4. Demo/deploy MVP route simplification.

### Incremental Delivery

1. Deliver US1 (localized route simplification and redirects).
2. Deliver US2 (intro sequencing and Continue CTA).
3. Deliver US3 (localized married continuity and alias redirect).
4. Execute Polish phase validations.

### Parallel Team Strategy

1. Developer A: routing and redirect work (US1/US3).
2. Developer B: intro sequence and CTA behavior (US2).
3. Developer C: route and sequence test coverage plus final QA artifact updates.

