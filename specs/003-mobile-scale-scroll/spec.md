# Feature Specification: Mobile Scale and Scroll Parity

**Feature Branch**: `[003-mobile-scale-scroll]`  
**Created**: 2026-05-15  
**Status**: Draft  
**Input**: User description: "Improve the mobile version so it matches the visual scale and layout proportions of the desktop version, including smoother mobile scrolling and softer mobile scroll-triggered transitions."

## Clarifications

### Session 2026-05-15

- Q: What route scope should this mobile scaling and scroll pass cover? -> A: Apply updates to all localized story routes and shared story shell/layout components only.
- Q: What mobile viewport coverage should define acceptance targets? -> A: Target common mobile width band (320–430 px) with graceful behavior outside that band.
- Q: How should strong scroll-animation simplification be triggered on mobile? -> A: Apply strong simplification only when reduced-motion preference is enabled.
- Q: How should section snapping behave on mobile where friction occurs? -> A: Soften or disable hard snap where it causes swipe friction, while preserving clear section progression.

## Constitution Alignment *(mandatory)*

- Confirm multilingual coverage for English and Italian in all user-visible flows.
- Confirm route localization strategy (`/en/*`, `/it/*`) including root language selection behavior.
- Confirm no user-facing copy is hardcoded in components; identify translation dictionary source.
- Confirm scroll mode expectations per page/section (`static`, `vertical`, `horizontal-left`, `horizontal-right`, `step-sequence`).
- Confirm RSVP reliability constraints, Supabase boundary, and Edge Function invocation model.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Readable, Proportional Mobile Layout (Priority: P1)

As a mobile visitor, I can view all story sections with elements that feel naturally sized and balanced, so I can read and navigate comfortably without zooming or dealing with cropped content.

**Why this priority**: If scale and layout are not readable on mobile, the core story experience fails regardless of animation quality.

**Independent Test**: Can be fully tested by opening each localized story route plus shared story shell/layout containers in a mobile viewport and validating visual balance, readability, and no overflow/cropping.

**Acceptance Scenarios**:

1. **Given** a mobile viewport, **When** a visitor opens any primary story route, **Then** typography, cards, imagery, buttons, and spacing appear proportionate and readable without overlap or clipping.
2. **Given** a mobile viewport, **When** a visitor moves through all major sections, **Then** no important content overflows horizontally or is cut off at the viewport edges.

---

### User Story 2 - Smooth Touch Scrolling and Section Progression (Priority: P1)

As a mobile visitor, I can move between sections with light, predictable swipe effort, so navigation feels fluid rather than stiff or resistant.

**Why this priority**: Scroll friction directly harms task completion and perceived quality on mobile devices.

**Independent Test**: Can be tested by scrolling through all mobile sections and transitions to verify smooth motion, reduced resistance, and no jumpy or locked states.

**Acceptance Scenarios**:

1. **Given** a mobile viewport, **When** a visitor scrolls forward and backward through the story, **Then** section progression responds smoothly to touch gestures without abrupt jumps or lockups.
2. **Given** a mobile viewport with scroll-triggered transitions, **When** a visitor performs short and long swipes, **Then** transitions advance naturally without requiring excessive scroll distance.

---

### User Story 3 - Desktop Experience Integrity (Priority: P2)

As a desktop visitor, I continue to receive the current visual and scroll behavior unless a shared correction is required for consistency.

**Why this priority**: Mobile fixes must not introduce regression to the established desktop experience.

**Independent Test**: Can be tested by comparing desktop routes before and after changes and confirming behavior remains visually and interactively consistent.

**Acceptance Scenarios**:

1. **Given** a desktop viewport, **When** a visitor navigates the same story routes, **Then** layout proportions and scroll behavior remain unchanged except for intentional shared bug fixes.

---

### Edge Cases

- How does layout behave on very narrow mobile widths where long words, dates, or labels can force wrapping?
- How does scrolling behave when browser UI chrome expands/collapses and viewport height changes during swipe?
- How does the experience behave on low-performance mobile devices where animation updates can stutter?
- How does the layout respond when decorative assets would otherwise overlap primary text content?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide mobile-specific visual scaling for typography, cards, media, buttons, decorative assets, and spacing so each element remains proportionate within small viewports.
- **FR-002**: System MUST preserve the same relative visual hierarchy on mobile as desktop, ensuring primary content remains dominant and secondary/decorative content remains subordinate.
- **FR-003**: System MUST prevent horizontal overflow and unintended clipping of meaningful content across the primary mobile target band (320–430 px widths), with graceful behavior outside that band.
- **FR-004**: System MUST maintain readable edge padding and section spacing on mobile so content does not feel cramped.
- **FR-005**: System MUST adapt image and decorative asset sizing responsively to viewport size so assets scale naturally and do not dominate or disappear.
- **FR-006**: System MUST make mobile scroll progression feel smooth and controllable, avoiding stiff movement, aggressive snapping, and forced long scroll distances between consecutive sections.
- **FR-007**: System MUST simplify or soften mobile scroll-triggered transition intensity (distance, resistance, and timing) where current behavior causes touch friction.
- **FR-007a**: System MUST apply a standard mobile-softened transition profile by default on mobile.
- **FR-007b**: System MUST apply a strongly simplified transition profile only when the user has reduced-motion preference enabled.
- **FR-008**: System MUST avoid mobile scroll-lock, jumpy progression, and sticky transition states during forward and reverse scrolling.
- **FR-008a**: System MUST soften or disable hard snap behavior on mobile in sections where snap introduces touch friction, while preserving clear section progression cues.
- **FR-009**: System MUST preserve existing desktop layout and scroll behavior unless a shared correction is strictly necessary to resolve cross-device inconsistency.
- **FR-010**: System MUST validate final behavior across all localized story routes and shared story shell/layout components in mobile viewport testing, including section transitions and end-to-end scroll continuity.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In mobile viewport review across 320–430 px widths for all localized story routes and shared story shell/layout components, 100% of critical content remains visible without horizontal scrolling or clipping.
- **SC-002**: In mobile viewport review, at least 90% of evaluated sections are rated visually balanced for size and spacing against desktop hierarchy by reviewer checklist.
- **SC-003**: In mobile touch-scroll validation, users can move from one major section to the next using normal swipe gestures without repeated high-effort swipes in at least 95% of attempts.
- **SC-004**: In mobile transition validation, no blocking scroll states (lock, persistent jump loop, or frozen progression) are observed across complete forward and backward story traversal.
- **SC-006**: In accessibility validation, reduced-motion users receive the strongly simplified mobile transition profile consistently across audited story routes.
- **SC-007**: In mobile scroll validation, audited sections with prior snap friction no longer require repeated corrective swipes to continue progression.
- **SC-005**: Desktop regression comparison reports no unintended visual or scroll behavior changes on audited routes.

## Assumptions

- Scope includes all localized story routes and shared story shell/layout components used by those routes, and excludes non-story routes.
- Primary mobile target band is 320–430 px viewport width in portrait orientation, with graceful behavior expected outside that band.
- Desktop behavior is the baseline reference for visual hierarchy and should remain unchanged unless a shared defect requires correction.
- Existing content structure and route map remain in place; this feature adjusts proportional layout and interaction behavior rather than introducing new story content.
- Evaluation uses real mobile viewport testing and route-by-route visual/scroll validation before completion.
