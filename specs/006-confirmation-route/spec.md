# Feature Specification: Confirmation Route

**Feature Branch**: `[006-confirmation-route]`  
**Created**: 2026-06-05  
**Status**: Draft  
**Input**: User description: "Create a new route called `/confirmation`. This route must appear immediately after `/recommendations` in the navigation/scroll flow. The route should fade in on entry, center its content on screen, use a two-column desktop layout with title/text left and image right, stack vertically on mobile, use the provided confirmation copy, apply the main color `#4C77E6`, use the script-style font family `'Brittany Signature', 'Amsterdam Four', 'Caveat', cursive`, and display an image from the Confirmation images folder with responsive scaling and a soft fade-in animation."

## Clarifications

### Session 2026-06-05

- Q: Which scroll mode should the confirmation route use within the story flow? -> A: static
- Q: Should confirmation use one shared image asset or different images by language or viewport? -> A: one fixed confirmation image everywhere
- Q: How should the confirmation text be aligned within the centered layout? -> A: left-align text inside the left column while keeping the overall content block centered

## Constitution Alignment *(mandatory)*

- Confirm multilingual coverage for English and Italian in all user-visible flows.
- Confirm route localization strategy (`/en/*`, `/it/*`) including root language selection behavior.
- Confirm no user-facing copy is hardcoded in components; identify translation dictionary source.
- Confirm confirmation uses the `static` scroll mode so its centered composition remains fixed while the route is active.
- Confirm RSVP reliability constraints, Supabase boundary, and Edge Function invocation model.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Continue from Recommendations into Confirmation (Priority: P1)

As a guest moving through the wedding website story flow, I reach the confirmation section immediately after recommendations so the experience continues in the intended order.

**Why this priority**: Route sequencing is the core functional requirement; if confirmation is not placed directly after recommendations, the new section breaks the site's narrative flow.

**Independent Test**: Can be fully tested by navigating forward and backward through the flow and confirming that recommendations and confirmation remain adjacent in the correct order.

**Acceptance Scenarios**:

1. **Given** a guest reaches the end of recommendations, **When** they continue to the next section, **Then** confirmation is the immediately following route.
2. **Given** a guest is on confirmation, **When** they navigate backward in the flow, **Then** recommendations is the immediately preceding route.

---

### User Story 2 - Read the Confirmation Message Clearly (Priority: P1)

As a guest viewing confirmation, I can clearly read the RSVP message in a centered, spacious layout that feels consistent with the existing wedding website style.

**Why this priority**: The message content is the primary purpose of the section and must remain legible, visually prominent, and stylistically coherent with the rest of the site.

**Independent Test**: Can be fully tested by opening the confirmation route on a desktop-sized viewport and verifying the title, body text, spacing, alignment, and overall readability.

**Acceptance Scenarios**:

1. **Given** a guest opens confirmation on a desktop viewport, **When** the section becomes visible, **Then** the title and supporting text appear in the left column, the full content block remains centered within the screen composition, and the text content is left-aligned within its column.
2. **Given** a guest views the section content, **When** they read the message, **Then** the title is visually prominent and the body text remains readable without crowding the layout.

---

### User Story 3 - See the Confirmation Image Beside the Message (Priority: P2)

As a guest viewing confirmation, I see a companion image displayed beside the text so the section feels complete and visually balanced.

**Why this priority**: The image supports the intended presentation, but it depends on the route existing and the core message being readable first.

**Independent Test**: Can be fully tested by opening the confirmation route on desktop and mobile sizes and confirming that the selected image stays within bounds, remains visible, and preserves balance with the text block.

**Acceptance Scenarios**:

1. **Given** a guest opens confirmation on a desktop viewport, **When** the section is displayed, **Then** the image appears to the right of the text block in the same centered content area.
2. **Given** a guest opens confirmation on a mobile viewport, **When** the section is displayed, **Then** the text block appears first and the image stacks below it without overflowing the screen.

---

### User Story 4 - Experience a Soft Section Entrance (Priority: P2)

As a guest arriving at confirmation, I see the whole content block fade in smoothly so the transition feels polished and in harmony with the wedding website.

**Why this priority**: The entrance animation contributes to the desired tone and continuity, but it is secondary to route order and content readability.

**Independent Test**: Can be fully tested by entering the confirmation route and confirming that the entire content block appears through one subtle fade-in effect rather than abrupt or distracting motion.

**Acceptance Scenarios**:

1. **Given** a guest enters confirmation, **When** the route appears, **Then** the complete content block fades in with a smooth and subtle visual transition.
2. **Given** the fade-in plays, **When** the content settles, **Then** the layout remains stable without image overflow or content shifting.

---

### Edge Cases

- How does the layout behave if the confirmation text wraps onto additional lines on narrower tablets or smaller laptop heights?
- How does the image scale if the selected confirmation asset has an unusually tall or wide aspect ratio?
- How does the section behave if guests revisit the route multiple times during the same browsing session?
- How is readability preserved if the script-style title font renders differently across supported devices?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST add a new localized confirmation route (`/:lang/confirmation`) to the existing navigation and scroll flow.
- **FR-002**: System MUST position confirmation immediately after the localized recommendations route in forward and backward traversal order.
- **FR-003**: System MUST preserve existing navigation continuity so adding confirmation does not break adjacent route sequencing.
- **FR-004**: System MUST use a `static` section mode for confirmation rather than an internal scrolling or stepped sequence layout.
- **FR-005**: System MUST present the confirmation section content centered both vertically and horizontally within the viewport.
- **FR-006**: System MUST display the main confirmation content in a two-column layout on larger viewports.
- **FR-007**: System MUST place the title and body text in the left column of the desktop layout.
- **FR-008**: System MUST place the confirmation image in the right column of the desktop layout.
- **FR-009**: System MUST stack the content vertically on mobile viewports with the text block first and the image below it.
- **FR-010**: System MUST present the section title as "Confirmation" for English routes and an Italian-localized equivalent for Italian routes.
- **FR-011**: System MUST present the following English body copy for English routes: "We are so excited to have you! Please RSVP by 1st November 2026. Make sure to check out our pages for all the info you'll need to make sure you have a fab Bank Holiday with us!"
- **FR-012**: System MUST provide Italian-localized title and body copy for Italian routes while preserving the same meaning and RSVP deadline.
- **FR-013**: System MUST style the confirmation section using `#4C77E6` as the primary accent color for the route.
- **FR-014**: System MUST render the section title using the script-style font stack `'Brittany Signature', 'Amsterdam Four', 'Caveat', cursive`.
- **FR-015**: System MUST make the section title visually prominent relative to the body text.
- **FR-016**: System MUST keep the body text readable by left-aligning the text content within the left column while preserving the overall centered composition of the full content block.
- **FR-017**: System MUST maintain a clean, spacious presentation consistent with the existing wedding website style.
- **FR-018**: System MUST display one approved fixed image from the Confirmation image set for this route, and that same asset MUST be used across supported languages and viewport sizes.
- **FR-019**: System MUST scale the image responsively so it remains fully visible within the viewport and does not overflow the screen.
- **FR-020**: System MUST apply one soft fade-in animation to the whole confirmation content block when the route appears.
- **FR-021**: System MUST ensure the fade-in motion feels smooth and subtle, without distracting from the content.

### Key Entities *(include if feature involves data)*

- **Confirmation Route Content**: The localized confirmation section content, including title, body copy, RSVP deadline message, visual styling intent, and associated image selection.
- **Story Route Sequence**: The ordered set of story routes that determines confirmation's placement immediately after recommendations.
- **Confirmation Media Asset**: The single approved image selected from the Confirmation image set for display beside the confirmation message across all supported languages and viewport sizes.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In route-flow validation, 100% of tested forward traversals reach confirmation immediately after recommendations.
- **SC-002**: In reverse-flow validation, 100% of tested backward traversals from confirmation return directly to recommendations.
- **SC-003**: In desktop and mobile layout review across representative viewport sizes, the confirmation content remains fully visible with no screen overflow in 100% of test cases.
- **SC-004**: In visual QA, the title and body text remain readable and clearly separated from the image in 100% of reviewed viewport sizes.
- **SC-005**: In transition review, the full confirmation content appears through one smooth fade-in effect with no abrupt pop-in or disruptive layout shift in 100% of tested entries.

## Assumptions

- The existing language-routing model for English and Italian will also be used for the confirmation route.
- Italian copy will be provided through the project's existing localization approach rather than embedded separately per component.
- The confirmation image folder contains at least one approved asset suitable for this route's right-column presentation, and one of those assets will be chosen as the sole image for this route in this release.
- Confirmation is a presentation-only section and does not introduce a new RSVP submission flow in this iteration.
- The current wedding website visual language remains authoritative for spacing, background treatment, and transition subtlety.
