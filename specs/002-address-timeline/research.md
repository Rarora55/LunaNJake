# Research: Address Route Timeline Transition

## Decision 1: Use deterministic progress windows per transition phase

- Decision: Model transition as explicit scroll progress windows for scatter exit, address reveal, and line growth.
- Rationale: Predictable behavior across devices and clearer acceptance tests than single-trigger thresholds.
- Alternatives considered:
  - Single threshold triggers: rejected due to unstable sequencing under varied scroll deltas.
  - Library-default timing only: rejected due to unclear phase boundaries.

## Decision 2: Keep reveal behavior fully bidirectional

- Decision: Bind transition and timeline visibility to scroll progress in both directions.
- Rationale: Prevents stuck states and keeps interaction consistent with scroll-driven narrative navigation.
- Alternatives considered:
  - One-time reveal: rejected due to inconsistent reverse navigation experience.
  - Hybrid one-way transition + bidirectional timeline: rejected for unnecessary state complexity.

## Decision 3: Store timeline item anchors as normalized positions (`0..1`)

- Decision: Each item uses normalized reveal progress along shared line flow.
- Rationale: Supports future extension without viewport-specific recalibration.
- Alternatives considered:
  - Pixel offsets: rejected as brittle across breakpoints/devices.
  - Semantic-only buckets (`early/mid/late`): rejected as too vague for testing.

## Decision 4: Use text-first media fallback

- Decision: If garabato/card media fails, keep item visible with readable text and simple placeholder visual.
- Rationale: Preserves key logistics information under asset failure.
- Alternatives considered:
  - Hide failed items: rejected due to information loss.
  - Retry-only with blank state: rejected due to uncertain user feedback.

## Decision 5: Respect reduced-motion preferences

- Decision: Replace chaotic stop-motion effects with minimal fade/position changes while preserving reveal order and continuity.
- Rationale: Maintains accessibility without breaking narrative structure.
- Alternatives considered:
  - Disable all animations entirely: rejected because structural continuity cues are still needed.
  - Ignore reduced-motion: rejected due to accessibility non-compliance.
