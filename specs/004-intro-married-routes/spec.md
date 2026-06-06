# Feature Specification: Intro and Married Route Simplification

**Feature Branch**: `[004-intro-married-routes]`  
**Created**: 2026-05-19  
**Status**: Draft  
**Input**: User description: "We need to simplify the current route structure and replace the existing story flow by removing `/story` (and its children) and `/she-said-yes`, and replacing them with `/intro` and `/married`, including a sequential animated text experience on `/intro`."

## Clarifications

### Session 2026-05-19

- Q: How should removed legacy routes resolve? -> A: Redirect `/story*` and `/she-said-yes` to `/intro`.
- Q: What should happen after the final intro title appears? -> A: Keep the final title visible until the user navigates away.
- Q: What pause duration should sequence 1 and 2 use? -> A: 3 seconds each.
- Q: What route shape should be canonical for constitution compliance? -> A: Canonical routes are `/:lang/intro` and `/:lang/married`; non-localized `/intro` and `/married` redirect to default language.
- Q: How should user-controlled transition to married route work? -> A: Show a dedicated "Continue" CTA that navigates to `/:lang/married`.
- Q: What is the default language target for non-localized redirects? -> A: English (`/en/intro` and `/en/married`).
- Q: How should intro text progression be triggered? -> A: By user scroll steps only (down advances, up reverses), with no automatic progression.
- Q: How should intro text blocks be rendered during progression? -> A: Each block is its own component; only the active component is visible at a given scroll step.
- Q: What typography should intro text use? -> A: `"Brittany Signature", "Caveat", cursive`.

## Constitution Alignment *(mandatory)*

- English and Italian user-visible flows remain supported in line with current multilingual expectations.
- Existing localization strategy and route conventions remain intact; only route availability changes for this flow.
- Existing architecture, routing system, styling conventions, animation approach, and responsive rules are preserved.
- The updated flow maintains accessibility expectations for timed text transitions and readable pause durations.
- No RSVP, Supabase, or Edge Function behavior is altered by this feature.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Enter Through Intro Only (Priority: P1)

As a visitor, I can access the new narrative through localized intro routes while legacy story routes are no longer reachable, so I experience only the intended simplified flow.

**Why this priority**: Route simplification is the primary scope boundary and controls the entire user journey entry.

**Independent Test**: Can be tested by navigating directly to `/story`, `/story/*`, and `/she-said-yes` and confirming they are not part of the active flow, while `/:lang/intro` is reachable and `/intro` redirects to default language intro.

**Acceptance Scenarios**:

1. **Given** a visitor enters `/story` or any `/story/*` child path, **When** the route is resolved, **Then** the legacy story content is not accessible as part of the live flow.
2. **Given** a visitor enters `/she-said-yes`, **When** the route is resolved, **Then** that route is not accessible as part of the live flow.
3. **Given** a visitor enters `/:lang/intro`, **When** the route is resolved, **Then** the intro experience loads full-screen using the existing site background style.
4. **Given** a visitor enters `/intro`, **When** the route is resolved, **Then** the route redirects to `/en/intro`.

---

### User Story 2 - Control Intro Narrative by Scroll (Priority: P1)

As a visitor on `/:lang/intro`, I use scroll input to move forward and backward through intro text blocks one step at a time, so the narrative pacing is user-controlled and reversible.

**Why this priority**: The sequential text animation is the core behavior of the new intro route.

**Independent Test**: Can be tested by scrolling down and up repeatedly on `/:lang/intro` and verifying one-step progression, reverse progression, single active block visibility, and smooth transitions.

**Acceptance Scenarios**:

1. **Given** the visitor is on `/:lang/intro`, **When** the visitor scrolls down once, **Then** the intro advances to the next text block and displays only that active block.
2. **Given** the visitor is on a later intro step, **When** the visitor scrolls up once, **Then** the intro returns to the previous text block and displays only that active block.
3. **Given** the active intro step changes in either direction, **When** the change occurs, **Then** the previous block fades out and the new active block fades in with a smooth, minimal transition.
4. **Given** any intro step is active, **When** the scene is rendered, **Then** all intro text uses the configured `"Brittany Signature", "Caveat", cursive` font stack.
5. **Given** the final title block is visible, **When** the visitor selects the "Continue" control, **Then** navigation proceeds to `/:lang/married`.

---

### User Story 3 - Continue to Married Route (Priority: P2)

As a visitor, I can proceed in the simplified flow using localized married routes, so the new route map contains only the two intended canonical story routes.

**Why this priority**: `/married` must exist as the second route to complete the new flow, but it depends on route simplification and intro setup.

**Independent Test**: Can be tested by direct navigation to `/:lang/married` and verifying it is reachable while removed routes remain unavailable, and `/married` redirects to default language married path.

**Acceptance Scenarios**:

1. **Given** a visitor enters `/:lang/married`, **When** the route is resolved, **Then** the route is reachable as part of the active story flow.
2. **Given** a visitor enters `/married`, **When** the route is resolved, **Then** the route redirects to `/en/married`.
3. **Given** the simplified route map is deployed, **When** route inventory is reviewed, **Then** only `/:lang/intro` and `/:lang/married` are canonical routes in this flow scope.

---

### Edge Cases

- What happens if a user lands on a removed legacy URL from a saved bookmark?
- How does the intro sequence behave if the user refreshes the page at a non-initial scroll step?
- How does text pacing behave on very small devices where the first paragraph wraps heavily?
- What happens if users navigate away before the final title block appears and then return to `/intro`?
- How are rapid alternating scroll inputs handled to keep transitions smooth and deterministic?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST remove active user-flow access to `/story` and all `/story` child routes.
- **FR-002**: System MUST remove active user-flow access to `/she-said-yes`.
- **FR-002a**: System MUST redirect requests for `/story`, `/story/*`, and `/she-said-yes` to `/en/intro`.
- **FR-003**: System MUST provide `/:lang/intro` and `/:lang/married` as the only canonical routes in the replaced story flow scope.
- **FR-003a**: System MUST redirect `/intro` to `/en/intro` and `/married` to `/en/married`.
- **FR-004**: System MUST render `/:lang/intro` as a full-screen section using the same background color/style pattern used across the current wedding website.
- **FR-005**: System MUST present intro copy as a step-sequence controlled by user scroll input, not by automatic timed progression.
- **FR-006**: System MUST advance exactly one intro text step per downward scroll action.
- **FR-007**: System MUST reverse exactly one intro text step per upward scroll action.
- **FR-008**: System MUST support both forward and backward traversal across the full intro sequence while keeping step order deterministic.
- **FR-009**: System MUST implement each intro text block as its own independently activatable component.
- **FR-010**: System MUST activate only the component mapped to the current intro step and deactivate all non-active intro text components.
- **FR-011**: System MUST ensure only one intro text component is visible at a time.
- **FR-012**: System MUST apply fade-out on the outgoing active text component and fade-in on the incoming active text component when steps change.
- **FR-013**: System MUST keep transitions smooth and minimal under normal and moderately rapid user scrolling.
- **FR-014**: System MUST apply the font stack `"Brittany Signature", "Caveat", cursive` to all intro text blocks.
- **FR-015**: System MUST keep the final title block visible on `/:lang/intro` until the visitor chooses to navigate away, with no forced auto-navigation.
- **FR-016**: System MUST provide a visible, keyboard-operable "Continue" CTA on final intro state that navigates to `/:lang/married`.
- **FR-017**: System MUST preserve existing project architecture, routing conventions, styling conventions, animation library usage patterns, and responsive rules defined by the constitution.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of tested direct entries to `/story`, `/story/*`, and `/she-said-yes` no longer expose legacy flow content in the active experience and resolve to `/en/intro`.
- **SC-002**: 100% of tested direct entries to `/:lang/intro` and `/:lang/married` resolve to active pages in the simplified flow, and `/intro` and `/married` redirect to `/en/intro` and `/en/married`.
- **SC-003**: In manual playback tests of `/:lang/intro`, all three sequence blocks appear in the defined order with no simultaneous multi-block display in 100% of runs.
- **SC-004**: In responsive validation across target mobile and desktop viewports, intro text remains legible and centered during each sequence stage in 100% of audited states.
- **SC-005**: All intro text blocks use the font stack `"Brittany Signature", "Caveat", cursive` in 100% of visual QA checks.
- **SC-006**: In intro flow validation, the final title state persists without automatic route change in 100% of observed runs on both language variants.
- **SC-007**: In interaction testing, each single downward scroll advances exactly one step and each single upward scroll reverses exactly one step in 100% of audited runs.
- **SC-008**: In transition validation, step changes show smooth fade-out/fade-in with no simultaneous visibility of multiple text blocks in 100% of audited runs.
- **SC-009**: In interaction validation, 100% of tested activations of the final-state "Continue" CTA navigate to same-language `/:lang/married`.

## Assumptions

- Legacy routes and non-localized flow entry routes redirect to English canonical paths (`/en/intro`, `/en/married`).
- `/:lang/married` content details are unchanged by this request unless needed solely to ensure canonical route availability.
- Transition from `/:lang/intro` to `/:lang/married` is visitor-controlled through an explicit "Continue" CTA; this feature does not impose automatic timed routing.
- Intro step changes are triggered by user scroll intent and are treated as discrete single-step transitions.
- The existing shared wedding background style reference is already defined and reusable without introducing a new visual theme.
