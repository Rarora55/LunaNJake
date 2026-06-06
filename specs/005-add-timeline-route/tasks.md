# Tasks: Add Timeline Route

**Input**: Design documents from `/specs/005-add-timeline-route/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Include targeted test tasks because the plan and quickstart require route-order, localized content mapping, reveal-regression, and responsive validation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g. US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- Web app paths use `frontend/src/` and `frontend/tests/` from repository root.

## Phase 1: Setup (Shared Context)

**Purpose**: Confirm the existing timeline implementation surface and shared content sources before feature edits.

- [X] T001 Audit current timeline route, CSS, and component composition in frontend/src/routes/TimeLine.tsx, frontend/src/routes/TimeLine.css, frontend/src/components/timeline/TimelineLine.tsx, and frontend/src/components/timeline/TimelineGifMarkers.tsx
- [X] T002 [P] Audit existing story flow and route ordering touchpoints in frontend/src/routing/storyRoutes.tsx and frontend/src/config/storySequence.ts
- [X] T003 [P] Audit current dictionary/content sources for localized timeline text in frontend/src/i18n/storyText.ts and frontend/src/config/storyInputs.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared configuration and type boundaries needed by all story phases.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [X] T004 Create or extend shared timeline marker/content types in frontend/src/features/addressTimeline/types.ts
- [X] T005 Create or extend shared timeline configuration for marker anchors, thresholds, and content metadata in frontend/src/features/addressTimeline/timelineConfig.ts
- [X] T006 [P] Export timeline helper/types needed by the route and timeline components from frontend/src/components/timeline/index.ts and frontend/src/features/addressTimeline/types.ts
- [X] T007 Add localized marker label entries for English and Italian in frontend/src/i18n/storyText.ts

**Checkpoint**: Shared timeline configuration and localized content contracts are defined.

---

## Phase 3: User Story 1 - Continue Story into Timeline (Priority: P1) 🎯 MVP

**Goal**: Keep `/timeline` immediately after `/intro` in the localized story flow without changing intro behavior.

**Independent Test**: Traversing localized story flow from intro reaches timeline next; reverse traversal from timeline returns to intro.

### Tests for User Story 1

- [X] T008 [P] [US1] Update route-order regression coverage for intro-to-timeline adjacency in frontend/tests/routing/timeline-route-order.test.tsx

### Implementation for User Story 1

- [X] T009 [US1] Ensure timeline remains immediately after intro in localized route registration in frontend/src/routing/storyRoutes.tsx
- [X] T010 [US1] Ensure story sequence configuration preserves intro-to-timeline ordering and reverse traversal in frontend/src/config/storySequence.ts
- [X] T011 [US1] Verify timeline route composition does not require intro behavior changes in frontend/src/routes/TimeLine.tsx and frontend/src/features/intro/IntroScene.tsx

**Checkpoint**: User Story 1 is independently functional and testable.

---

## Phase 4: User Story 2 - Scroll-Drawn Timeline Reveal (Priority: P1)

**Goal**: Preserve the hand-drawn monochrome SVG line reveal so it advances and reverses with scroll progress.

**Independent Test**: Entering timeline and scrolling down/up progressively draws and undraws the line through the full irregular path with no autoplay.

### Tests for User Story 2

- [X] T012 [P] [US2] Refresh scroll-reveal behavior coverage for progress-driven dash updates in frontend/tests/features/timeline/timeline-scroll-reveal.test.tsx

### Implementation for User Story 2

- [X] T013 [US2] Preserve or refine sticky timeline section layout and normalized progress plumbing in frontend/src/routes/TimeLine.tsx and frontend/src/routes/TimeLine.css
- [X] T014 [US2] Preserve or refine SVG path measurement and reveal behavior in frontend/src/components/timeline/TimelineLine.tsx
- [X] T015 [US2] Verify timeline route composition continues passing reveal progress cleanly to child timeline layers in frontend/src/routes/TimeLine.tsx and frontend/src/components/timeline/index.ts

**Checkpoint**: User Story 2 is independently functional and testable.

---

## Phase 5: User Story 3 - Progressive Animated Markers Along Path (Priority: P2)

**Goal**: Preserve the seven GIF markers so they appear in sequence along the path as reveal progress advances and disappear when progress reverses.

**Independent Test**: Markers appear in threshold order as progress advances and reverse naturally when scrolling back.

### Tests for User Story 3

- [X] T016 [P] [US3] Refresh marker-threshold visibility coverage for forward and reverse progression in frontend/tests/features/timeline/timeline-marker-thresholds.test.tsx

### Implementation for User Story 3

- [X] T017 [US3] Move marker anchor, threshold, scale, and rotation definitions into the shared config model in frontend/src/features/addressTimeline/timelineConfig.ts
- [X] T018 [US3] Update GIF marker rendering to consume shared marker config while preserving existing animation behavior in frontend/src/components/timeline/TimelineGifMarkers.tsx
- [X] T019 [US3] Keep marker layer integration and z-order alignment intact in frontend/src/routes/TimeLine.tsx and frontend/src/routes/TimeLine.css

**Checkpoint**: User Story 3 is independently functional and testable.

---

## Phase 6: User Story 4 - Marker Labels and Images Stay Attached (Priority: P2)

**Goal**: Add one grouped image-plus-label content block per marker, bound by marker ID, localized by route language, and adjustable through shared offsets.

**Independent Test**: Revealing each marker shows the correct localized image/label pair near that marker, with image above text, and changing offsets repositions the full group together on desktop and mobile.

### Tests for User Story 4

- [X] T020 [P] [US4] Add marker-content mapping and grouped-rendering tests in frontend/tests/features/timeline/timeline-marker-thresholds.test.tsx
- [X] T021 [P] [US4] Add localized marker-label coverage for `/en/timeline` and `/it/timeline` in frontend/tests/routing/timeline-route-order.test.tsx or frontend/tests/integration/storyPageRendering.test.tsx
- [X] T022 [P] [US4] Add responsive marker-content association coverage for mobile-sized rendering in frontend/tests/integration/mobile-layout-proportions.test.tsx

### Implementation for User Story 4

- [X] T023 [US4] Add the seven marker-content records with `markerId`, image asset, top/bottom placement, and offsets to frontend/src/features/addressTimeline/timelineConfig.ts
- [X] T024 [US4] Resolve localized marker labels from the active route language instead of hardcoded component copy in frontend/src/routes/TimeLine.tsx and frontend/src/i18n/storyText.ts
- [X] T025 [US4] Render grouped marker content blocks with image-above-text ordering and marker-ID binding in frontend/src/components/timeline/TimelineGifMarkers.tsx
- [X] T026 [US4] Apply shared top/bottom positioning logic and grouped offset transforms without per-marker CSS hardcoding in frontend/src/components/timeline/TimelineGifMarkers.tsx and frontend/src/routes/TimeLine.css
- [X] T027 [US4] Tune mobile image/text sizing so content remains visually attached to the correct marker in frontend/src/routes/TimeLine.css and frontend/src/components/timeline/TimelineGifMarkers.tsx

**Checkpoint**: User Story 4 is independently functional and testable.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Validate regressions, responsive behavior, and final consistency across stories.

- [X] T028 [P] Run targeted routing and timeline tests covering updated files through the project test runner
- [ ] T029 Perform manual desktop and mobile QA for marker-content alignment, reveal pacing, reverse behavior, and background consistency in frontend/src/routes/TimeLine.tsx and frontend/src/routes/TimeLine.css
- [X] T030 [P] Review final configuration and components for dictionary-driven copy, marker-ID consistency, and absence of unnecessary per-marker CSS in frontend/src/features/addressTimeline/timelineConfig.ts, frontend/src/i18n/storyText.ts, and frontend/src/components/timeline/TimelineGifMarkers.tsx

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; starts immediately.
- **Foundational (Phase 2)**: Depends on Setup completion; blocks all user stories.
- **User Stories (Phases 3-6)**: Depend on Foundational completion.
- **Polish (Phase 7)**: Depends on completion of all target user stories.

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational; no dependency on other stories.
- **User Story 2 (P1)**: Starts after Foundational; can run alongside US1 once shared config/types exist.
- **User Story 3 (P2)**: Depends on US2 progress plumbing and the shared marker config from Foundational.
- **User Story 4 (P2)**: Depends on US3 marker config/visibility behavior and the localization foundation from T007.

### Parallel Opportunities

- T002 and T003 can run in parallel with T001.
- T006 and T007 can run in parallel after T004-T005 establish the core model shape.
- T008 and T012 can be prepared in parallel after Foundational completion.
- T020, T021, and T022 can run in parallel before US4 implementation integration tasks.
- T028 and T030 can run in parallel during polish.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational phases.
2. Complete User Story 1.
3. Validate intro-to-timeline adjacency and reverse traversal.

### Incremental Delivery

1. Deliver US1 route-order continuity.
2. Verify and stabilize US2 scroll-drawn line reveal.
3. Preserve US3 progressive GIF markers through the shared config model.
4. Add US4 localized marker content blocks with grouped offsets and responsive tuning.
5. Finish with cross-cutting regression and manual QA.

---

## Notes

- [P] tasks are scoped to avoid same-file conflicts where possible.
- Each user story includes independent verification criteria aligned to the feature spec and quickstart validation checklist.
