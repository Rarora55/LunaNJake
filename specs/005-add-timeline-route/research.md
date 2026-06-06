# Research: Add Timeline Route

## Decision 1: Preserve timeline insertion through existing story route configuration
- Decision: Keep `/:lang/timeline` as the immediate localized successor of `/:lang/intro` in the existing story routing and sequence configuration.
- Rationale: This preserves the constitution's config-driven story flow and avoids coupling route order to component logic.
- Alternatives considered:
  - Trigger timeline entry directly from intro component code: rejected because it bypasses the shared story sequence model.
  - Merge intro and timeline into one route: rejected because it changes existing intro behavior and broadens scope.

## Decision 2: Keep scroll-linked SVG line reveal and GIF marker animation unchanged
- Decision: Continue using the current scroll-driven SVG path reveal and progressive GIF marker visibility model, layering marker content on top without changing reveal ownership.
- Rationale: The existing interaction already satisfies the core reveal behavior, and the new work is additive around marker content rather than a redesign of animation control.
- Alternatives considered:
  - Rebuild the section animation with a different library or timing model: rejected because it adds regression risk with no product benefit.
  - Animate text/image content independently of marker visibility: rejected because it weakens the required visual association.

## Decision 3: Model marker content as a single grouped configuration record per marker ID
- Decision: Define one reusable marker-content configuration entry for each marker containing marker ID, localized text key or resolved label, image asset reference, horizontal offset, vertical offset, and top/bottom placement.
- Rationale: A single grouped record lets designers move text and image together, keeps configuration easy to adjust, and prevents duplicated placement logic between JSX and CSS.
- Alternatives considered:
  - Store text, image, and offsets in separate arrays: rejected because it increases mismatch risk and makes per-marker edits fragile.
  - Hardcode each marker block in component markup and CSS: rejected because it violates the requested config-driven control model.

## Decision 4: Bind marker content to stable marker IDs while reusing the existing anchor model
- Decision: Keep marker anchors, thresholds, and visual variations in the existing marker model, and resolve each content block by matching `markerId` to the visible marker entry.
- Rationale: Stable ID binding ensures content follows the correct marker without duplicating anchor coordinates inside the content dataset.
- Alternatives considered:
  - Position content independently from marker definitions: rejected because it makes content drift and separate maintenance more likely.
  - Infer content order only by array index: rejected because stable IDs are more explicit and safer for future reordering.

## Decision 5: Source marker labels from the existing language-aware copy layer
- Decision: Localize marker labels through the active route language using the existing i18n/story text structure rather than hardcoding English strings in timeline components.
- Rationale: This satisfies the constitution's multilingual-first rule and keeps user-visible copy centralized.
- Alternatives considered:
  - Reuse the same English labels on both routes: rejected because the clarified spec now requires language-specific labels.
  - Store raw localized strings only inside the marker config component file: rejected because it creates another user-copy source outside the shared dictionary layer.

## Decision 6: Use shared overlay positioning plus responsive scale tuning instead of per-marker CSS rules
- Decision: Render content blocks in a shared overlay system using anchor position plus configurable offsets, with common mobile size reductions and only minimal shared CSS variants for top/bottom placement.
- Rationale: Shared layout logic keeps the system simple to tune while still allowing per-marker manual adjustments through data.
- Alternatives considered:
  - Dedicated CSS classes for every marker: rejected because it spreads positioning logic across style files and reduces maintainability.
  - Pixel-locked desktop and mobile coordinates as separate layouts: rejected because it increases drift risk and doubles tuning effort.

## Decision 7: Expand tests around mapping, localization, and grouped movement
- Decision: Add or update tests to verify route order, marker threshold behavior, marker-ID to content mapping, localized labels per route language, and grouped repositioning assumptions at representative viewport sizes.
- Rationale: The new feature risk is not route creation but content correctness and attachment behavior across languages and layouts.
- Alternatives considered:
  - Rely on manual QA only: rejected because content mapping regressions are easy to miss and cheap to automate.
  - Test only the English route: rejected because the clarified spec makes localization a required behavior, not an optional follow-up.
