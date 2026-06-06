# Feature Specification: Add Timeline Route

**Feature Branch**: `[005-add-timeline-route]`  
**Created**: 2026-05-25  
**Status**: Draft  
**Input**: User description: "Create a new route called /timeline immediately after /intro in the scroll flow, with a scroll-drawn hand-drawn monochrome timeline and seven progressive GIF markers."

## Clarifications

### Session 2026-06-05

- Q: Should marker labels be localized per route language or remain identical across languages? → A: Localize the labels by route language, with English on `/en/timeline` and Italian on `/it/timeline`.

## Constitution Alignment *(mandatory)*

- Confirm multilingual coverage for English and Italian in all user-visible flows.
- Confirm route localization strategy (`/en/*`, `/it/*`) including root language selection behavior.
- Confirm no user-facing copy is hardcoded in components; identify translation dictionary source.
- Confirm scroll mode expectations per page/section (`static`, `vertical`, `horizontal-left`, `horizontal-right`, `step-sequence`).
- Confirm RSVP reliability constraints, Supabase boundary, and Edge Function invocation model.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Continue Story into Timeline (Priority: P1)

As a story visitor, when I finish the intro section, I continue directly into the timeline section as the next part of the same storytelling flow.

**Why this priority**: Story continuity is the primary value; if the new route is not correctly sequenced after intro, the timeline experience is disconnected.

**Independent Test**: Can be tested by traversing the story flow from intro and verifying timeline is the immediate next section without breaking existing story navigation.

**Acceptance Scenarios**:

1. **Given** a visitor is progressing through intro, **When** they complete intro progression, **Then** the next reached section is timeline.
2. **Given** a visitor scrolls back from timeline, **When** they move upward in flow, **Then** intro remains the previous section in sequence.

---

### User Story 2 - Scroll-Drawn Timeline Reveal (Priority: P1)

As a visitor in the timeline section, I see a hand-drawn black-and-white timeline progressively reveal from left to right as I scroll, and reverse naturally when I scroll up.

**Why this priority**: The central interaction of this feature is a scroll-linked draw effect, and it must be user-controlled rather than autoplayed.

**Independent Test**: Can be tested by entering timeline and verifying reveal progression, reversal, directionality, and full path completion all map to scroll movement.

**Acceptance Scenarios**:

1. **Given** a visitor enters timeline, **When** they scroll downward through the section, **Then** the line reveal advances along the full irregular route from first to last vertex.
2. **Given** a visitor partially reveals the timeline, **When** they scroll upward, **Then** reveal progress reverses smoothly without jumps.
3. **Given** a visitor is within timeline, **When** they perform small and large scroll movements, **Then** reveal progress advances proportionally with scroll distance.

---

### User Story 3 - Progressive Animated Markers Along Path (Priority: P2)

As a visitor, I see seven animated markers appear progressively at specific points on the timeline so the section feels alive and handcrafted.

**Why this priority**: Markers provide visual storytelling rhythm and reinforce progression, but route sequencing and reveal mechanics are higher priority.

**Independent Test**: Can be tested by traversing timeline from start to end and confirming each of seven markers appears near its target segment only after reveal reaches that point.

**Acceptance Scenarios**:

1. **Given** the timeline starts unrevealed, **When** the visitor first enters the section, **Then** no distant markers are prematurely visible.
2. **Given** reveal progress reaches each marker threshold, **When** the visitor continues scrolling, **Then** the corresponding marker becomes visible at its aligned position over the line.
3. **Given** the visitor scrolls back up past a marker threshold, **When** reveal regresses, **Then** the marker visibility regresses consistently with reveal state.

---

### User Story 4 - Marker Labels and Images Stay Attached (Priority: P2)

As a visitor, I see a small image and text label near each revealed marker so each point communicates its event clearly without losing its connection to the animated marker.

**Why this priority**: Marker content gives the timeline meaning and must stay visually attached to the corresponding point, but it depends on the marker progression already existing.

**Independent Test**: Can be tested by revealing each marker in sequence and verifying the mapped text/image pair appears near that marker, moves with it as one grouped element, and remains readable on desktop and mobile.

**Acceptance Scenarios**:

1. **Given** a marker becomes visible, **When** its content is shown, **Then** the associated image appears above the associated text in one grouped block near that same marker.
2. **Given** marker content uses manual offsets, **When** a designer adjusts a marker's offset values, **Then** the image and text reposition together without requiring separate per-marker styling changes in multiple places.
3. **Given** a visitor views the timeline on a small mobile viewport, **When** marker content is displayed, **Then** the image and text scale down as needed while remaining visibly associated with the correct marker.

---

### Edge Cases

- How does timeline alignment behave when viewport dimensions change during session (orientation change or browser UI height shifts)?
- How does marker visibility behave if users rapidly scroll from beginning to end and back without pausing?
- How does the section behave on small mobile widths so markers do not visually obscure key parts of the line?
- How is progression handled if users enter timeline at a non-zero scroll offset via browser restoration or deep navigation?
- How are marker content blocks adjusted if a label/image pair would collide with a nearby marker or move off-screen at smaller viewport sizes?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST add a new localized timeline route (`/:lang/timeline`) positioned immediately after localized intro in the existing story sequence.
- **FR-002**: System MUST preserve existing intro behavior and content while inserting timeline as the next continuation step.
- **FR-003**: System MUST preserve upward and downward story traversal so visitors can move naturally between intro and timeline without sequence breaks.
- **FR-004**: System MUST present a single hand-drawn style horizontal black-and-white timeline visual whose reveal follows one continuous irregular path from left to right.
- **FR-005**: System MUST tie timeline reveal progress directly to user scroll progress in the timeline section and MUST NOT auto-play independent of scroll.
- **FR-006**: System MUST support bidirectional reveal behavior where downward scroll advances reveal and upward scroll reverses it.
- **FR-007**: System MUST provide sufficient scroll distance in timeline to allow gradual reveal control across the full path.
- **FR-008**: System MUST display seven animated markers using the provided asset (`Images/Timeline/Gabacho2.gif`) at distributed positions spanning early, middle, and late path segments.
- **FR-009**: System MUST layer markers visually above the timeline path and keep marker-to-path alignment consistent across supported screen sizes.
- **FR-010**: System MUST reveal markers progressively based on reveal progression so markers do not all appear at timeline start.
- **FR-011**: System MUST apply subtle per-marker variation in size and angle to maintain a handmade visual rhythm while preserving readability.
- **FR-012**: System MUST keep timeline proportions responsive, with desktop emphasizing broad horizontal occupancy and mobile reducing marker footprint to avoid covering the path.
- **FR-013**: System MUST retain the existing site background aesthetic in timeline and MUST NOT introduce checkerboard or transparency placeholder backgrounds.
- **FR-014**: System MUST provide a reusable marker content dataset for all seven timeline points, where each entry includes a marker identifier, user-visible text label, image reference, horizontal offset, vertical offset, and a top-or-bottom placement flag.
- **FR-015**: System MUST associate each content entry to its timeline marker by marker identifier so the correct text/image pair is always rendered with the correct animated marker.
- **FR-016**: System MUST render each marker's image above its text label within a single grouped content block that stays visually attached to the corresponding marker.
- **FR-017**: System MUST support per-marker manual repositioning through dataset-defined horizontal and vertical offsets so designers can adjust placement without creating separate hardcoded styling rules for each marker unless a shared fallback is unavoidable.
- **FR-018**: System MUST place each content block above or below its marker according to the configured placement flag while preserving clear visual association with the marker point.
- **FR-019**: System MUST ensure marker content remains responsive so text and images can reduce in footprint on smaller viewports without breaking the marker-to-content association.
- **FR-020**: System MUST support the following marker content mapping for this feature release: marker 1 "11:00 Bus" with the bus image, marker 2 "12:00 Ceremony" with the ceremony location image, marker 3 "13:00 Aperitive" with the drinks image, marker 4 "14:30 Dinner" with the after-dinner image, marker 5 "15:30 After Dinner" with the after-dinner image, marker 6 "17:00 Party" with the dance hall image, and marker 7 "23:00 Leaving" with the bus image.
- **FR-021**: System MUST localize marker label text for the active route language so `/en/timeline` shows English event labels and `/it/timeline` shows Italian event labels while preserving the same marker identifiers, images, and timeline order.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In end-to-end story traversal, 100% of audited paths that complete intro reach timeline as the immediate next section.
- **SC-002**: In scroll interaction validation, timeline reveal direction matches user scroll direction with no observed autoplay behavior in 100% of trials.
- **SC-003**: In timeline progression review, all seven markers appear only after their respective reveal thresholds and are distributed from early to late path segments.
- **SC-004**: In responsive QA across representative desktop and mobile viewports, timeline line and markers remain visually aligned with no critical overlap that blocks path legibility.
- **SC-005**: In regression validation of intro and adjacent sections, no unintended narrative flow breaks are observed.
- **SC-006**: In content verification, 100% of marker points show the correct configured text/image pair for their marker identifier.
- **SC-007**: In layout QA across representative desktop and mobile viewports, each marker content block remains visibly attached to its marker and can be repositioned by updating configuration values without splitting image and text placement behavior.

## Assumptions

- The feature applies to the existing localized story routes and reuses the current language-routing structure.
- The provided `Gabacho2.gif` asset is available and approved for repeated usage as seven markers within this section.
- The timeline marker content images referenced by the user are available as approved assets for the timeline feature.
- Existing overall page background styling remains authoritative and is reused by timeline.
- Timeline remains a single storytelling section with one primary path and seven marker points in this iteration.
- Marker content text in this release is fixed to the seven provided event labels in English plus corresponding Italian localized equivalents under the existing route localization rules.
- Validation will include manual scroll testing for forward/reverse progression on both desktop and mobile viewport ranges already used by the project.

