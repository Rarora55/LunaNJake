# Tasks: Refresh Story Routes

**Input**: Design documents from `/specs/007-refresh-story-routes/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No new test-first tasks are included because the feature specification did not explicitly request TDD. Final validation still includes automated regression runs and manual route checks.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Web app paths are rooted under `frontend/src/` and `frontend/tests/`
- Feature documentation paths are rooted under `specs/007-refresh-story-routes/`

## Phase 1: Setup (Shared Context)

**Purpose**: Confirm the active implementation surfaces and verification instructions before editing route code

- [X] T001 Review implementation constraints and validation targets in `specs/007-refresh-story-routes/plan.md`
- [X] T002 Review route behavior expectations in `specs/007-refresh-story-routes/contracts/story-route-ui-contract.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Align shared route dependencies and visual reuse points that affect multiple user stories

**⚠️ CRITICAL**: No user story work should begin until this phase is complete

- [X] T003 Audit shared route targets and alias helpers in `frontend/src/config/storyInputs.ts`
- [X] T004 Audit current route wiring and scene prop boundaries in `frontend/src/routing/storyRoutes.tsx`
- [X] T005 [P] Audit shared copy keys and timeline label sources in `frontend/src/i18n/storyText.ts`
- [X] T006 [P] Audit reusable CTA/button styling sources in `frontend/src/features/intro/IntroScene.css` and `frontend/src/features/areYouComing/AreYouComingScene.css`

**Checkpoint**: Shared route targets, copy sources, and CTA reuse points are identified for all stories

---

## Phase 3: User Story 1 - Enter the Site Through a Simplified Intro (Priority: P1) 🎯 MVP

**Goal**: Make `/:lang/intro` open directly on the retained final intro scene while preserving its role as the site starting point

**Independent Test**: Open `/en/intro` or `/it/intro` from a fresh session and confirm the route shows only the final intro composition, with no reachable first or second intro slice and a working continue CTA.

### Implementation for User Story 1

- [X] T007 [US1] Refactor intro state and rendering to keep only the retained final scene in `frontend/src/features/intro/IntroScene.tsx`
- [X] T008 [P] [US1] Remove obsolete intro step styling while preserving the final scene layout and transition behavior in `frontend/src/features/intro/IntroScene.css`
- [X] T009 [US1] Verify intro route entry still points to the next story route correctly in `frontend/src/routing/storyRoutes.tsx`

**Checkpoint**: `/:lang/intro` behaves as a single-scene starting route and can be validated independently

---

## Phase 4: User Story 2 - Read a Shorter, Consistent Timeline (Priority: P1)

**Goal**: Shorten the timeline event sequence, update the late-stage labels, and keep all visible timeline text visually consistent

**Independent Test**: Open `/en/timeline` or `/it/timeline` and confirm the route shows the updated six-point sequence, with no `After Dinner` point, the final order ending in `Party` then `Leaving`, and consistent text styling across all labels.

### Implementation for User Story 2

- [X] T010 [US2] Update the visible marker sequence, thresholds, and content mapping in `frontend/src/features/addressTimeline/timelineConfig.ts`
- [X] T011 [P] [US2] Update localized timeline label keys and values to match the shortened sequence in `frontend/src/i18n/storyText.ts`
- [X] T012 [P] [US2] Normalize shared timeline label typography and visual treatment in `frontend/src/routes/TimeLine.css`
- [X] T013 [US2] Confirm timeline rendering still consumes the updated marker configuration without extra point-specific logic in `frontend/src/components/timeline/TimelineGifMarkers.tsx`

**Checkpoint**: `/timeline` reflects the new event sequence and styling without breaking its scroll-driven reveal behavior

---

## Phase 5: User Story 3 - Use RSVP in the Shared Site Style (Priority: P2)

**Goal**: Restyle the RSVP route so it matches the rest of the website while preserving guarded access and current submission behavior

**Independent Test**: Open `/en/rsvp` or `/it/rsvp` through the existing CTA path, confirm the page visually matches the rest of the site, and submit the current form flow without any behavior change.

### Implementation for User Story 3

- [X] T014 [US3] Make only minimal structural adjustments needed for shared styling while preserving guarded access and submit logic in `frontend/src/pages/RsvpPage.tsx`
- [X] T015 [P] [US3] Refresh the RSVP page background, typography, form, and button presentation in `frontend/src/pages/RsvpPage.css`

**Checkpoint**: RSVP matches the broader site art direction and retains the same interaction and submission flow

---

## Phase 6: User Story 4 - Return to Intro from LunaNJake (Priority: P2)

**Goal**: Add a visible shared-style CTA on `/LunaNJake` that returns users to the intro starting point

**Independent Test**: Open `/en/LunaNJake` or `/it/LunaNJake`, activate the new CTA by pointer and keyboard, and confirm it returns to the intro route while matching the site's existing button language.

### Implementation for User Story 4

- [X] T016 [US4] Pass the intro return target through the localized route wiring in `frontend/src/routing/storyRoutes.tsx`
- [X] T017 [US4] Add the return CTA and navigation target handling in `frontend/src/features/lunaNJake/LunaNJakeScene.tsx`
- [X] T018 [P] [US4] Style the new return CTA with the shared site button treatment in `frontend/src/features/lunaNJake/LunaNJakeScene.css`

**Checkpoint**: `/LunaNJake` includes a visible, keyboard-operable return CTA that restarts the story flow

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Validate the combined route refresh across all touched surfaces

- [X] T019 Run automated regression checks for the touched frontend surfaces with `frontend/package.json`
- [X] T020 Run TypeScript validation for the route refresh scope using `frontend/package.json`
- [ ] T021 Perform manual route QA against the walkthrough in `specs/007-refresh-story-routes/quickstart.md`
- [X] T022 Document any branch-state caveat from generating tasks on `main` in `specs/007-refresh-story-routes/tasks.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion; establishes shared route and styling context for all stories
- **User Stories (Phases 3-6)**: Depend on Foundational completion
- **Polish (Phase 7)**: Depends on completion of the desired user stories

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Phase 2; no dependency on other user stories
- **User Story 2 (P1)**: Starts after Phase 2; no dependency on User Story 1 implementation
- **User Story 3 (P2)**: Starts after Phase 2; no dependency on other user stories
- **User Story 4 (P2)**: Starts after Phase 2; depends only on shared route-target knowledge from Foundational work

### Within Each User Story

- Update core route or scene logic before dependent styling or verification adjustments in the same story
- Keep copy/config changes aligned with the rendering surface that consumes them
- Validate each story independently before moving to cross-cutting polish

### Parallel Opportunities

- `T005` and `T006` can run in parallel during Foundational review
- `T008` can run in parallel with `T007` once the final intro structure is clear
- `T011` and `T012` can run in parallel after the timeline sequence changes in `T010` are defined
- `T015` can run in parallel with `T014` once the preserved RSVP structure is confirmed
- `T018` can run in parallel with `T017` after the CTA placement is defined

---

## Parallel Example: User Story 2

```bash
# After the new marker order is defined in timelineConfig.ts:
Task: "Update localized timeline label keys and values in frontend/src/i18n/storyText.ts"
Task: "Normalize shared timeline label typography in frontend/src/routes/TimeLine.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate `/intro` independently before broadening the scope

### Incremental Delivery

1. Complete Setup + Foundational
2. Deliver User Story 1 and validate the site entry flow
3. Deliver User Story 2 and validate the timeline route independently
4. Deliver User Story 3 and validate RSVP behavior unchanged
5. Deliver User Story 4 and validate restart navigation from `/LunaNJake`
6. Finish with automated and manual cross-cutting validation

### Parallel Team Strategy

1. One contributor completes Setup + Foundational analysis
2. After Phase 2:
   - Contributor A handles `/intro`
   - Contributor B handles `/timeline`
   - Contributor C handles `/rsvp`
   - Contributor D handles `/LunaNJake`
3. Rejoin for shared validation in Phase 7

---

## Notes

- Task generation proceeded from the active feature artifacts even though `.specify/scripts/powershell/check-prerequisites.ps1 -Json` reported the repo was still on `main` instead of a feature-named branch.
- All tasks follow the required checklist format with task ID, optional `[P]`, required story label where applicable, and explicit file paths.
