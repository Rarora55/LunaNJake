# Research: Mobile Scale and Scroll Parity

## Decision 1: Use element-specific responsive scaling instead of uniform shrink

- Decision: Apply responsive sizing per element type (typography, containers, media, controls, decorative assets) using viewport-aware ranges and constrained min/max values.
- Rationale: Uniform scaling tends to break hierarchy and readability on mobile; per-element scaling preserves desktop intent while fitting smaller screens.
- Alternatives considered:
  - Uniform global scale reduction: rejected due to unreadable text and disproportional emphasis.
  - Route-by-route ad-hoc values only: rejected because it risks inconsistency and maintenance overhead.

## Decision 2: Target 320-430 px as primary mobile acceptance band

- Decision: Define 320-430 px viewport width as the primary acceptance target and require graceful behavior outside that range.
- Rationale: This covers common modern phone widths while retaining practical flexibility for outliers.
- Alternatives considered:
  - Single-device baseline: rejected because it under-represents real device diversity.
  - All sub-tablet widths treated identically: rejected because stricter uniformity can force compromises in visual quality.

## Decision 3: Soften/disable hard snap on mobile only where friction is observed

- Decision: Tune or disable hard snap behavior in mobile sections where it causes repeated corrective swipes, while preserving clear section progression.
- Rationale: Touch scrolling requires lower resistance than desktop wheel/trackpad interactions.
- Alternatives considered:
  - Keep snap unchanged and tune only animation values: rejected due to unresolved high-friction transitions.
  - Remove snapping globally on mobile: rejected because some sections benefit from bounded progression cues.

## Decision 4: Reduced-motion controls stronger mobile simplification profile

- Decision: Keep a standard softened mobile transition profile by default and apply a stronger simplification profile only when reduced-motion preference is enabled.
- Rationale: Balances visual storytelling with accessibility expectations and avoids over-reducing experience for users who did not request motion reduction.
- Alternatives considered:
  - Strong simplification for all mobile users: rejected because it unnecessarily reduces expressiveness.
  - Disable most transitions entirely: rejected because it can harm narrative continuity.

## Decision 5: Preserve desktop behavior as non-regression guardrail

- Decision: Keep desktop visual and scroll behavior unchanged except for explicitly justified shared fixes.
- Rationale: The feature is mobile-focused; desktop regressions would introduce avoidable risk.
- Alternatives considered:
  - Cross-platform refactor in one pass: rejected due to larger blast radius and validation complexity.