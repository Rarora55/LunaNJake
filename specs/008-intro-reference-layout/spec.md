# Feature Specification: Intro Reference Layout

**Feature Branch**: `[008-intro-reference-layout]`  
**Created**: 2026-06-12  
**Status**: Draft  
**Input**: User description: "Update the /intro route to match the visual reference provided in `public/images/Home2/SampleIntro.png`, replace the current date text with `Monday.png`, position the countdown directly below it, duplicate the herbs/floral decoration in the top-right corner, and stabilize the layout across desktop and mobile viewports."

## Constitution Alignment *(mandatory)*

- Confirm multilingual coverage for English and Italian in all user-visible flows: `/intro` remains available through the existing localized route structure and the visual changes must not remove or bypass language-aware navigation.
- Confirm route localization strategy (`/en/*`, `/it/*`) including root language selection behavior: the work applies only to the intro scene presentation and must preserve the current route aliases and localized entry behavior.
- Confirm no user-facing copy is hardcoded in components; identify translation dictionary source: the date label currently rendered as text is replaced by a provided image asset, while existing route labels continue to use the current translation dictionary source.
- Confirm scroll mode expectations per page/section (`static`, `vertical`, `horizontal-left`, `horizontal-right`, `step-sequence`): the intro route remains a static hero-style screen with no new scroll behavior introduced.
- Confirm RSVP reliability constraints, Supabase boundary, and Edge Function invocation model: this feature does not change RSVP flows, backend boundaries, or function invocation behavior.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View the refreshed intro composition (Priority: P1)

As a guest opening the intro route, I want the page composition to match the approved reference closely so the invitation feels intentional, polished, and visually consistent with the wedding art direction.

**Why this priority**: The intro route is the entry point to the story flow, so visual mismatch here directly affects first impressions and design acceptance.

**Independent Test**: Can be fully tested by opening `/intro` on desktop and confirming that the title, CTA, date image, countdown, rings, venue details, and decorative herbs appear in the expected order and relative positions.

**Acceptance Scenarios**:

1. **Given** a guest loads `/intro` on a desktop viewport, **When** the scene becomes visible, **Then** the left side shows the title, Continue CTA, `Monday.png`, and countdown stacked in that order while the right side shows the rings illustration and venue text.
2. **Given** a guest compares `/intro` against the provided reference image, **When** they review the overall composition, **Then** the page closely matches the reference without changing the established background, artwork style, CTA treatment, or right-side content.

---

### User Story 2 - Read the date and countdown clearly on any screen (Priority: P2)

As a guest viewing the intro route on desktop or mobile, I want the wedding date artwork and countdown to remain centered, legible, and non-overlapping so I can understand the event timing immediately.

**Why this priority**: The date and countdown are key informational elements, and poor placement or overlap would reduce readability and undermine the invitation layout.

**Independent Test**: Can be fully tested by resizing from desktop to mobile widths and confirming that the date image and countdown remain centered below the CTA, scale proportionally, and do not collide with other content.

**Acceptance Scenarios**:

1. **Given** a guest views `/intro` on desktop, **When** the date section is displayed, **Then** `Monday.png` appears directly below the Continue button and the countdown appears directly below the image as one centered visual block.
2. **Given** a guest views `/intro` on a narrow mobile viewport, **When** the layout stacks vertically, **Then** the button, date image, countdown, and venue content remain readable, centered, and inside the viewport.

---

### User Story 3 - Experience a stable layout while resizing (Priority: P3)

As a guest resizing the browser or opening the page on different desktop widths, I want the main intro composition to stay aligned rather than drifting unpredictably so the layout feels deliberate and robust.

**Why this priority**: Viewport drift causes visible design defects and makes approval against a visual reference difficult.

**Independent Test**: Can be fully tested by resizing the browser across common desktop widths and verifying that the title, CTA, date image, countdown, rings, venue text, and herbs keep consistent relative alignment.

**Acceptance Scenarios**:

1. **Given** a guest resizes the browser across multiple desktop widths, **When** the intro composition reflows, **Then** the main content alignment remains stable and does not jump based on viewport-dependent offsets.
2. **Given** decorative herbs are present in both corners, **When** the layout is viewed at different sizes, **Then** the decorations remain secondary, visible, and non-obstructive relative to the main content.

---

### Edge Cases

- What happens when the countdown reaches zero? The intro route should continue to show the date artwork and a non-negative countdown state without layout breakage.
- How does the system handle very narrow mobile widths? The date image, countdown items, and venue details should wrap or scale down cleanly without overlapping or leaving the viewport.
- What happens if decorative herbs approach the content area on shorter desktop heights? Decorative elements should remain visually secondary and must not cover the title, CTA, date section, rings, or venue details.
- How does the layout behave on wide desktop displays? The centered composition container should preserve stable relative placement instead of spreading key elements too far apart.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The `/intro` route MUST remove the current rendered date text block and replace it with the provided `Monday.png` date artwork.
- **FR-002**: The date artwork MUST be sourced from the existing public assets path and displayed directly below the Continue CTA without distortion.
- **FR-003**: The intro route MUST display the countdown directly below the date artwork as part of the same centered vertical content block.
- **FR-004**: The title, Continue CTA, date artwork, and countdown MUST remain center-aligned with each other within the left content column on desktop layouts.
- **FR-005**: The rings illustration and venue information MUST remain grouped in the right content column on desktop layouts.
- **FR-006**: The intro layout MUST preserve the current beige paper background, grain texture, blue hand-drawn aesthetic, title art, rings art, venue text, CTA styling, and existing bottom-left decorative herbs.
- **FR-007**: The intro layout MUST add a second decorative herbs/floral treatment in the top-right area that visually matches the reference and remains secondary to the main content.
- **FR-008**: Decorative herb elements MUST be positioned relative to a stable intro composition container or section so they do not drift unpredictably across viewport sizes.
- **FR-009**: The main intro content MUST use a stable responsive layout structure that maintains consistent relative alignment for the title, CTA, date artwork, countdown, rings, and venue text across common desktop widths.
- **FR-010**: On mobile layouts, the intro route MUST stack the content in a clear reading order that preserves readability and keeps all main elements inside the viewport.
- **FR-011**: The date artwork and countdown MUST remain visually integrated, with balanced spacing and no overlap at supported viewport sizes.
- **FR-012**: The feature MUST be isolated to the intro route and MUST NOT alter other routes or unrelated scene compositions.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In desktop review, 100% of required intro elements appear in the specified order and column grouping: title, Continue CTA, date artwork, countdown on the left; rings and venue information on the right.
- **SC-002**: Across agreed desktop viewport widths, the intro composition maintains consistent relative alignment with no visible drifting of primary content during manual resize review.
- **SC-003**: On mobile review, all primary elements remain fully visible, readable, and non-overlapping without horizontal scrolling.
- **SC-004**: Visual QA confirms the intro route matches the provided reference closely while preserving the existing invitation art direction and without introducing regressions on other routes.

## Assumptions

- The provided `SampleIntro.png` is the authoritative visual reference for composition, spacing intent, and top-right herb placement.
- `Monday.png` is a complete replacement for the previously rendered date text and does not require additional text rendering for the visible date display.
- The existing countdown behavior remains functionally valid and only requires repositioning and visual integration with the date artwork.
- The current intro scene already contains the required rings illustration, venue text, CTA button, and bottom-left herbs, and those assets should be reused rather than replaced.
- Stable layout behavior should be achieved through responsive container-based alignment rather than viewport-dependent offsets for primary content.
