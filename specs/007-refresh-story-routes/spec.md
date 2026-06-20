# Feature Specification: Refresh Story Routes

**Feature Branch**: `[007-refresh-story-routes]`  
**Created**: 2026-06-12  
**Status**: Draft  
**Input**: User description: "Apply the following route updates across the Luna & Jake website: remove the first two scroll sections from `/intro` and keep only the final intro slice as the site starting point; update `/timeline` by removing the current 'After Dinner' point, renaming later points so 'Party' replaces 'After Dinner' and 'Leaving' replaces the current 'Party', and removing the final point; restyle `/rsvp` so it matches the rest of the website without changing RSVP behavior; and add a CTA on `/LunaNJake` that returns users to `/intro`, using the existing shared button style."

## Constitution Alignment *(mandatory)*

- English and Italian visitor flows remain supported wherever these routes already exist in the current site structure.
- Existing route localization strategy, route entry behavior, and story sequencing conventions remain unchanged unless a route's own content is being simplified by this feature.
- User-visible route text continues to come from the existing translation/content source rather than newly hardcoded copies.
- Existing scroll-mode behavior remains authoritative for each route, except where removed intro or timeline content shortens the sequence.
- RSVP submission reliability, data persistence, Supabase boundaries, and form submission behavior remain unchanged.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Enter the Site Through a Simplified Intro (Priority: P1)

As a guest opening the wedding website, I begin on a shortened intro that starts immediately with the final intro content so the opening experience is cleaner and still feels intentional.

**Why this priority**: The intro route is the site's starting point, so simplifying it without breaking the entry flow is the highest-risk and highest-visibility change.

**Independent Test**: Can be fully tested by opening the intro route from a fresh session and confirming that only the final intro slice remains, it loads first, and the route still behaves as the start of the site.

**Acceptance Scenarios**:

1. **Given** a guest enters the intro route from the site's entry flow, **When** the route loads, **Then** only the remaining final intro slice is present.
2. **Given** the intro route has been simplified, **When** a guest begins navigating the site, **Then** the retained intro slice still behaves as the first active step of the experience.
3. **Given** the removed intro slices previously had transitions, **When** the simplified intro is viewed, **Then** any remaining intro animation still feels continuous and not broken by the removed content.

---

### User Story 2 - Read a Shorter, Consistent Timeline (Priority: P1)

As a guest moving from intro into timeline, I see an updated event sequence with fewer points and styling that matches the rest of the page so the timeline feels polished and internally consistent.

**Why this priority**: Timeline content and visual consistency are both directly visible to every visitor and affect story clarity immediately after intro.

**Independent Test**: Can be fully tested by opening the timeline route and confirming the visible points now end one step earlier, the labels read in the updated order, and every label uses the same visual treatment as the rest of the timeline page.

**Acceptance Scenarios**:

1. **Given** a guest views the timeline route, **When** they inspect the event labels in order, **Then** the sequence no longer includes "After Dinner" and the later labels read "Party" followed by "Leaving".
2. **Given** the timeline has been shortened, **When** the guest reaches the end of the visible points, **Then** the previous final timeline point is no longer present.
3. **Given** the updated timeline labels are displayed, **When** the guest compares them across the route, **Then** all timeline text uses the same font family, sizing behavior, and visual styling pattern already established on that page.

---

### User Story 3 - Use RSVP in the Shared Site Style (Priority: P2)

As a guest opening the RSVP route, I see the page presented with the same visual language as the rest of the website while keeping the same form behavior I already expect.

**Why this priority**: RSVP functionality is critical, but the requested change is presentational rather than behavioral, so it depends on preserving existing flow and form reliability.

**Independent Test**: Can be fully tested by opening the RSVP route, comparing its colors and typography with adjacent pages, and submitting the form through the existing path to confirm behavior is unchanged.

**Acceptance Scenarios**:

1. **Given** a guest opens the RSVP route, **When** the page renders, **Then** its colors, typography, and layout styling align with the rest of the wedding website.
2. **Given** the RSVP page has been visually refreshed, **When** a guest uses the existing RSVP interactions, **Then** submission behavior and validation behavior remain unchanged.

---

### User Story 4 - Return to Intro from LunaNJake (Priority: P2)

As a guest on `/LunaNJake`, I can use a familiar call-to-action button to return to the beginning of the site so I can restart the experience without confusion.

**Why this priority**: This is a focused navigation enhancement that depends on the shared visual system and the intro route remaining the canonical starting point.

**Independent Test**: Can be fully tested by opening `/LunaNJake`, activating the new CTA by pointer and keyboard, and confirming it returns the guest to the intro starting route with the shared button styling intact.

**Acceptance Scenarios**:

1. **Given** a guest is on `/LunaNJake`, **When** the page content is shown, **Then** a visible CTA to return to the intro starting point is present.
2. **Given** the CTA is activated, **When** the interaction completes, **Then** the guest is taken to `/intro` or its existing canonical equivalent within the current routing model.
3. **Given** the CTA appears beside existing content, **When** the guest compares it with other site buttons, **Then** it matches the established button style used elsewhere on the website.

---

### Edge Cases

- How does the intro route behave if a user refreshes immediately after entering now that only the final slice remains?
- How does the timeline layout respond on small screens after one late-stage point is removed and the remaining labels shift positions?
- What happens if the RSVP page previously relied on route-specific styling overrides that conflict with shared site styling?
- How is the `/LunaNJake` return CTA presented if that route already contains one or more existing buttons or navigation controls?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST remove the first two intro slices from the intro route experience.
- **FR-002**: System MUST retain only the final intro slice as the visible intro content for this route.
- **FR-003**: System MUST preserve the retained intro slice as the site's starting point within the current route flow.
- **FR-004**: System MUST preserve any existing intro animation or transition behavior that still applies after the removed slices are gone.
- **FR-005**: System MUST remove the timeline point currently labeled "After Dinner," including its icon and text.
- **FR-006**: System MUST relabel the next remaining late-stage timeline point so it reads "Party" in place of the removed "After Dinner" position.
- **FR-007**: System MUST relabel the following timeline point so it reads "Leaving" in place of the current "Party" position.
- **FR-008**: System MUST remove the final timeline point entirely so the route ends on the new "Leaving" point.
- **FR-009**: System MUST preserve the intended chronological order of the remaining timeline points after the removal and relabeling changes.
- **FR-010**: System MUST ensure all timeline labels use the same font family, sizing logic, and visual styling rules already used across the rest of the timeline page.
- **FR-011**: System MUST refresh the RSVP route's colors, typography, and overall visual presentation so it aligns with the rest of the current website art direction.
- **FR-012**: System MUST preserve all existing RSVP interactions, validation, submission flow, and backend-facing behavior unchanged.
- **FR-013**: System MUST add a visible CTA on `/LunaNJake` that returns visitors to the intro starting point.
- **FR-014**: System MUST use the same established button styling pattern for the new `/LunaNJake` CTA that is already used elsewhere on the website.
- **FR-015**: System MUST keep the new `/LunaNJake` CTA keyboard-operable and visually integrated with the route's existing layout.
- **FR-016**: System MUST preserve the website's existing route sequencing, navigation behavior, and shared art direction outside the targeted route updates in this feature.
- **FR-017**: System MUST NOT change backend logic, RSVP form submission behavior, or data handling as part of this feature.

### Key Entities *(include if feature involves data)*

- **Intro Slice Sequence**: The ordered intro content blocks that define the site's opening route, now reduced to a single retained final slice.
- **Timeline Event Point**: A visible timeline stop that combines event ordering, label text, and any associated icon or marker content.
- **RSVP Presentation Layer**: The visual styling applied to the RSVP route, including colors, typography, spacing, and shared design language, without changing behavior.
- **Return CTA**: The navigation control on `/LunaNJake` that sends visitors back to the intro starting point using the site's shared button styling.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In entry-flow QA, 100% of tested intro route visits begin on the retained final intro slice with no trace of the first two removed slices.
- **SC-002**: In intro regression review, 100% of tested visits to the starting route still allow guests to begin the site experience without broken animation or missing entry behavior.
- **SC-003**: In timeline content verification, 100% of reviewed timeline runs show the updated late-stage labels in the final order "Party" then "Leaving," with no remaining "After Dinner" point and no extra final point.
- **SC-004**: In timeline visual QA across representative desktop and mobile viewports, all timeline labels follow one consistent typography and styling treatment in 100% of reviewed states.
- **SC-005**: In RSVP regression testing, 100% of tested RSVP submissions continue to follow the existing behavior while the page presentation matches the site's shared visual style.
- **SC-006**: In `/LunaNJake` navigation testing, 100% of tested activations of the new CTA return the user to the intro starting route and match the shared button style in visual review.

## Assumptions

- The existing routing model already defines the canonical intro starting path, and the new `/LunaNJake` CTA should resolve to that same start behavior even if `/intro` redirects internally.
- English and Italian route variants continue to use the existing translation/content system rather than introducing a new copy-management path for this feature.
- Timeline point imagery and positioning can be updated within the current timeline structure without changing the core timeline interaction model.
- RSVP already has working form behavior and backend integration, and this feature is limited to visual alignment with the rest of the site.
- Shared button, typography, and color treatments already exist elsewhere in the site and should be reused rather than redesigned for this feature.
