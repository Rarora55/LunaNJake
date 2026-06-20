# Research: Intro Reference Layout

## Decision 1: Use a centered composition shell with explicit left/right content groups

**Decision**: Replace viewport-sensitive placement of primary intro content with a centered composition container that owns a left content stack and a right art/details stack.

**Rationale**: The current intro scene relies on multiple translated grid items and viewport-derived offsets, which makes the composition drift as the viewport changes. A centered shell with stable columns preserves the reference composition while keeping the primary content aligned relative to one another instead of relative to the viewport edges.

**Alternatives considered**:

- Keep the current grid and adjust existing translate offsets.
  Rejected because it would remain fragile and require repeated tuning per breakpoint.
- Absolutely position all content from a fixed hero origin.
  Rejected because it would make mobile stacking and desktop resizing harder to stabilize and maintain.

## Decision 2: Replace the rendered date text with the provided `Monday.png` asset from `public`

**Decision**: Render the date artwork by referencing `/images/Home2/Monday.png` directly instead of keeping hardcoded HTML text for the visible date.

**Rationale**: The spec and reference make the date treatment part of the invitation artwork rather than standard body text. Using the provided asset ensures the lettering, divider treatment, and proportions match the approved composition more closely than re-styled text would.

**Alternatives considered**:

- Keep text and refine typography/CSS until it resembles the artwork.
  Rejected because it would still be an approximation and would not match the supplied reference as closely.
- Import the asset from `src` for bundling.
  Rejected because the existing requirement explicitly calls for using the public asset path and the asset is already managed there.

## Decision 3: Keep the countdown as a simple in-component timer, but treat it as part of the date block

**Decision**: Retain a lightweight client-side countdown state in the intro scene and place it directly below the date artwork as part of a single centered date/countdown block.

**Rationale**: The countdown already belongs to the intro experience and does not require shared application state. The change needed is compositional rather than architectural, so the implementation should keep the timer local and move the emphasis to layout integration, spacing, and responsiveness.

**Alternatives considered**:

- Extract the countdown into a shared utility or separate feature module first.
  Rejected because the current scope is a focused intro-route visual refresh and does not require reuse elsewhere.
- Convert the countdown into a purely static mock display.
  Rejected because the requested behavior explicitly calls for showing remaining time.

## Decision 4: Duplicate the herb treatment with CSS transforms instead of new design assets

**Decision**: Add a top-right decorative herbs cluster by duplicating the existing herb treatment and using CSS positioning plus mirroring or rotation to match the reference composition.

**Rationale**: The supplied reference shows the same visual language rather than a materially different illustration style. Reusing the existing herb assets keeps the page stylistically consistent and limits scope to layout and presentation work.

**Alternatives considered**:

- Create or source a new top-right illustration.
  Rejected because the scope is to duplicate the existing decorative treatment, not redesign the art set.
- Omit the duplicate herbs and rely on the bottom-left cluster only.
  Rejected because the top-right decoration is part of the requested composition and acceptance criteria.

## Decision 5: Validate with component assertions plus manual visual QA against the reference

**Decision**: Use existing intro tests for semantic and navigation continuity, then supplement with manual visual QA at desktop and mobile widths to confirm composition fidelity.

**Rationale**: The key risk is visual composition rather than business logic. Automated tests can reliably guard structure, route continuity, and key rendered elements, while the final acceptance depends on comparing the page to the supplied art reference across responsive states.

**Alternatives considered**:

- Rely only on manual checking.
  Rejected because it would leave route continuity and key DOM regressions unguarded.
- Attempt full screenshot-diff automation for this feature.
  Rejected because no such visual regression system is currently established in the project artifacts used by this feature.
