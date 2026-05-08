# Feature Specification: Address Route Timeline Transition

**Feature Branch**: `[002-address-timeline]`  
**Created**: 2026-05-08  
**Status**: Draft  
**Input**: User description: "Implement the localized `/en/address` and `/it/address` routes and the scroll transition from `/she-said-yes` into the localized address route."

## Clarifications

### Session 2026-05-08

- Q: Should transition/timeline reveal behavior be bidirectional with scroll reversal, one-time only, or hybrid? â†’ A: Fully bidirectional and progress-based in both directions.
- Q: Should transition phases use single thresholds or explicit start/end progress windows? â†’ A: Use explicit start/end progress windows for each phase.
- Q: Should timeline item positions be normalized progress values, fixed pixels, or semantic zones only? â†’ A: Use normalized 0-1 progress values.
- Q: If timeline media fails to load, should the item hide, retry-only, or show text with placeholder? â†’ A: Keep item and text visible with a simple placeholder visual.
- Q: How should reduced-motion preference be handled for transition and timeline animations? â†’ A: Use reduced-motion mode with minimal fade/position changes while preserving scroll sequence logic.


## Constitution Alignment *(mandatory)*

- Multilingual coverage will be preserved for English and Italian for all new user-visible text in the transition and timeline cards.
- Route localization strategy remains under localized paths, with the new Address flow mapped consistently for both language prefixes.
- User-visible copy for address and timeline cards will be sourced from translation dictionaries rather than hardcoded display text.
- Scroll behavior is aligned to existing Story scroll expectations, with a controlled scroll-driven transition from one section into the next.
- RSVP, Supabase boundaries, and Edge Function behavior are unchanged by this feature.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Theatrical Exit and Address Reveal (Priority: P1)

As a guest scrolling out of the `/she-said-yes` section, I experience a theatrical stop-motion exit where current visual elements scatter off-screen before the venue image and address appear centered.

**Why this priority**: This is the primary continuity moment between story sections and defines the emotional transition into the timeline.

**Independent Test**: Can be fully tested by entering `/she-said-yes`, scrolling past its exit threshold, and verifying staggered chaotic exits followed by centered image and address reveal.

**Acceptance Scenarios**:

1. **Given** the user is at the end of `/she-said-yes`, **When** scroll progression crosses the configured exit threshold, **Then** all visible components animate out with varied directions and irregular staggered timing.
2. **Given** most prior components have exited, **When** transition progression reaches the reveal point, **Then** the `CasaBoda` image appears centered and the address text fades in beneath it.
3. **Given** transition animation is in progress, **When** it runs on desktop or mobile, **Then** visual behavior remains readable and does not block normal scroll continuation.

---

### User Story 2 - Scroll-Driven Timeline Continuity (Priority: P1)

As a guest continuing to scroll after the address reveal, I see a black vertical line grow downward from the center of the image/address block and continue naturally into the localized address route timeline (`/en/address` and `/it/address`).

**Why this priority**: The line is the structural connector between transition and timeline content and must feel continuous.

**Independent Test**: Can be tested by scrolling from the address reveal into `/en/address` or `/it/address` and confirming the same timeline line keeps extending according to scroll progress.

**Acceptance Scenarios**:

1. **Given** the address block is visible, **When** the user keeps scrolling, **Then** a black vertical line reveals downward from the center anchor of that block.
2. **Given** the user transitions into `/en/address` or `/it/address`, **When** scroll progression advances, **Then** the line continues extending without visual discontinuity or reset.
3. **Given** future timeline entries may be added, **When** additional items are introduced later, **Then** the same line can extend further without redesigning the transition mechanic.

---

### User Story 3 - Alternating Timeline Events (Priority: P2)

As a guest on `/en/address` or `/it/address`, I see three timeline points appear progressively with playful garabato markers crossed by the central line and compact event cards alternating right-left-right.

**Why this priority**: Timeline content communicates logistics and event order and must remain legible and stylistically consistent.

**Independent Test**: Can be tested by scrolling through `/en/address` or `/it/address` and verifying each item appears at expected progression points with correct side placement and card content.

**Acceptance Scenarios**:

1. **Given** the timeline reaches early scroll progression, **When** the first marker is reached, **Then** `garabato2` appears centered on the line and a right-side compact card shows `Bus.png` with `11am Shuttle Bus`.
2. **Given** the timeline reaches mid scroll progression, **When** the second marker is reached, **Then** a matching-style garabato appears centered on the line and a left-side compact card shows `Copas.png` with `Ceremony and Reception`.
3. **Given** the timeline reaches later scroll progression, **When** the third marker is reached, **Then** another matching-style garabato appears centered on the line and a right-side compact card shows `breakfast` with `TBA Post-Wedding Brunch`.
4. **Given** mobile viewport width is limited, **When** cards are displayed, **Then** timeline structure remains clear while cards shift closer to the line or simplified layout without losing readability.

### Edge Cases

- If users scroll quickly through the transition zone, the exit/reveal sequence still resolves to a coherent final state with image, address text, and line anchor visible.
- If users scroll upward after entering `/en/address` or `/it/address`, all reveal states reverse consistently based on scroll progress without broken states.
- If one timeline media asset loads late, fallback behavior preserves line progression and card text readability.
- If viewport orientation changes mid-scroll, timeline anchor and card alignment recompute to preserve continuity.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST trigger a transition sequence when users scroll out of `/she-said-yes`.
- **FR-002**: The transition sequence MUST animate each visible component out of view using varied directions that include horizontal, vertical, and diagonal exits.
- **FR-003**: The exit animation MUST present a stop-motion-like style using staggered timing, irregular micro-jumps, and imperfect rotational/position offsets.
- **FR-004**: The system MUST avoid polished continuous easing styles that conflict with the handmade theatrical motion language.
- **FR-005**: After components are mostly gone, the system MUST reveal the `CasaBoda` image centered in the viewport.
- **FR-006**: The system MUST reveal `Pelham House, Saint Andrew's Lane, Lewes, UK` beneath the image with progressive opacity.
- **FR-007**: After image and address reveal, the system MUST reveal a black vertical line growing downward from the center anchor of the image/address block as scroll progresses.
- **FR-008**: The same vertical line MUST continue into `/en/address` and `/it/address` without a visible reset and remain extensible for future additional timeline content.
- **FR-009**: The localized `/en/address` and `/it/address` routes MUST present three timeline points that appear progressively with scroll and align to early, middle, and late portions of the viewport journey.
- **FR-010**: Each timeline point MUST include a garabato marker centered on and visually crossed by the vertical line.
- **FR-011**: Timeline cards MUST alternate side placement in the order right (item 1), left (item 2), right (item 3).
- **FR-012**: Timeline cards MUST be compact and content-fitting, with no excessive padding or unused margins.
- **FR-013**: Timeline item 1 card MUST display `Bus.png` and the text `11am Shuttle Bus`.
- **FR-014**: Timeline item 2 card MUST display `Copas.png` and the text `Ceremony and Reception`.
- **FR-015**: Timeline item 3 card MUST display `breakfast` and the text `TBA Post-Wedding Brunch`.
- **FR-016**: Timeline visual appearance and motion MUST remain consistent with the existing handmade/stop-motion style used in `/she-said-yes`.
- **FR-017**: The implementation MUST separate transition behavior from `/address` timeline content modules.
- **FR-018**: Timeline content MUST be defined through reusable item configuration that includes marker media, card media, text, side placement, and reveal position.
- **FR-023**: Each timeline item's reveal position MUST be represented as a normalized progress value from 0 to 1 along the shared timeline scroll flow.
- **FR-024**: If timeline marker or card media fails to load, the system MUST keep the timeline item visible with readable text and a simple placeholder visual instead of hiding the item.
- **FR-019**: The feature MUST preserve normal scroll behavior without trapping users or causing severe frame drops on supported desktop/mobile browsers.
- **FR-020**: All timeline and transition content MUST remain readable and structurally clear across desktop and mobile layouts.
- **FR-021**: Transition and timeline reveal states MUST be fully tied to scroll progress in both directions, so scrolling upward reverses reveal/visibility states consistently.
- **FR-022**: Transition sequencing MUST define explicit scroll progress windows for exit scatter, image/address reveal, and line growth phases using start/end ranges rather than single trigger points.
- **FR-025**: When reduced-motion preference is detected, the system MUST replace chaotic stop-motion effects with minimal-motion fade/position changes while preserving the same scroll-driven reveal order and timeline continuity.

### Key Entities *(include if feature involves data)*

- **Transition Stage**: Represents progress states between `/she-said-yes` exit, address reveal, and timeline handoff.
- **Timeline Line Segment**: Represents a continuously revealable vertical line with a shared anchor and progressive length.
- **Timeline Item**: Represents one event point containing reveal position, marker asset, card side, card icon asset, and localized text.
- **Timeline Card Content**: Represents compact display content for one event card, including media and label.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In validation sessions, 100% of runs from `/she-said-yes` to `/en/address` or `/it/address` show a complete exit-to-address transition without missing reveal states.
- **SC-002**: At least 95% of tested users can visually identify timeline continuity from transition line start through all three localized address-route events.
- **SC-003**: On representative desktop and mobile devices, timeline cards remain legible without overlap or truncation in all three event states.
- **SC-004**: During normal scrolling, no severe interaction break occurs (such as frozen scroll, stuck transition state, or inaccessible timeline items) across supported browsers.
- **SC-005**: Stakeholder review confirms the motion style is perceived as handmade/stop-motion rather than smooth corporate animation in at least 4 out of 5 review ratings.

## Assumptions

- Existing localized route structure already supports adding or mapping the localized `/en/address` and `/it/address` experience under both language prefixes.
- Existing media assets (`CasaBoda`, `garabato2`, `Bus.png`, `Copas.png`, `breakfast`) are available in project asset paths and licensed for display.
- Scroll-triggered behavior can reuse the projectâ€™s existing animation/scroll infrastructure without introducing new navigation paradigms.
- If detailed reverse-scroll semantics are not currently standardized, the feature will follow existing project conventions for scroll-linked reveal persistence.
- Timeline line continuity is expected to use one conceptual anchor between transition and route sections even if internally composed from multiple visual segments.

