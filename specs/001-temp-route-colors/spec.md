# Feature Specification: Story Slide Stack (Constitution-Aligned)

**Feature Branch**: `001-temp-route-colors`  
**Created**: 2026-05-04  
**Status**: Draft  
**Input**: User description: "Align Story ordering with constitution while preserving slideshow behavior"

## Constitution Alignment *(mandatory)*

- English and Italian Story routes remain localized under `/en/*` and `/it/*`.
- Story behavior remains deterministic and vertical-only.
- Story sequence is config-driven and aligned to the constitution ten-step narrative.
- Temporary placeholders are used instead of final photographic assets for this phase.

## Clarifications

### Session 2026-05-04

- Q: Should a single high-momentum vertical gesture ever skip multiple slides? -> A: No. One accepted interaction advances exactly one slide; momentum is ignored until the next accepted interaction window.
- Q: How should Story ordering align with constitution? -> A: Use the constitution ten-step sequence order.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Progress Through Story Slides (Priority: P1)

As a visitor, I can scroll vertically through a full-screen Story slideshow so the narrative advances one step at a time through the constitution-aligned sequence.

**Independent Test**: Perform upward/downward interactions and verify one-step transitions across all ten steps.

### User Story 2 - Read Story Text Per Slide (Priority: P1)

As a visitor, I can read slide-specific text that replays with a typewriter effect whenever the active slide changes.

**Independent Test**: Navigate between slides and verify text updates and replay behavior on revisits.

### User Story 3 - Reach Highlight Slide State (Priority: P2)

As a visitor, I can reach `she-was-not-wrong` where accumulated placeholders fade out and text is centered as a highlighted beat.

**Independent Test**: Navigate to `she-was-not-wrong` and verify fade/centered text behavior, then continue sequence navigation.

### Edge Cases

- Rapid consecutive input advances or reverses by at most one step per accepted interaction.
- Very small mobile viewports keep caption readability below placeholder on captioned slides.
- Returning from highlighted step to earlier slides restores captioned placeholder layout.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Story section MUST use a constitution-aligned ten-step sequence.
- **FR-002**: Each step MUST occupy full viewport height (`100vh`).
- **FR-003**: Story progression MUST be vertical interaction-driven, with downward input advancing to next step.
- **FR-004**: Incoming step motion MUST enter from below viewport and cover viewport.
- **FR-005**: Step motion MUST feel snappy (fast start, hard stop) with no spring bounce.
- **FR-006**: New placeholders MUST layer above previous placeholders for stacked-photo effect.
- **FR-007**: Captioned steps MUST render a centered solid black placeholder at approximately three-quarters viewport footprint.
- **FR-008**: Captioned step text MUST appear centered below placeholder with readable spacing.
- **FR-009**: Step text MUST animate with typewriter behavior and replay on each active-step change.
- **FR-010**: `she-was-not-wrong` MUST act as a highlighted step where accumulated placeholders fade out and text is centered.
- **FR-011**: Story sequence order MUST be: `the-first-time`, `it-was-10-am`, `facing-the-morning`, `flatmates`, `ready-wall-of-shame`, `who-are-you`, `your-new-flatmate`, `she-was-not-wrong`, `bike`, `pum`.
- **FR-012**: One accepted vertical interaction MUST trigger at most one step transition; same-gesture momentum/delta MUST be ignored until next acceptance window.
- **FR-013**: User-facing Story text MUST come from translation dictionaries for both `en` and `it` and must not be hardcoded in components.

### Key Entities *(include if feature involves data)*

- **StorySlide**: ordered step with id, localized text key, and display mode.
- **SlideVisualLayer**: stacked placeholder layer with visibility state.
- **StoryTransitionState**: active index and interaction acceptance-window state.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of Story runs use all ten constitution-aligned steps in correct order.
- **SC-002**: 100% of accepted vertical interactions produce at most one step change.
- **SC-003**: 100% of captioned steps render centered placeholder with readable below-caption layout on desktop/mobile checks.
- **SC-004**: 100% of active-step changes replay typewriter animation.
- **SC-005**: On `she-was-not-wrong`, placeholder layers fade out and centered text behavior is observed in 100% of validation runs.

## Assumptions

- Existing localized routing infrastructure remains unchanged.
- Temporary black placeholders remain acceptable until final media assets are provided.
- Remaining post-highlight steps continue using the sequence controller without reintroducing horizontal behavior.
