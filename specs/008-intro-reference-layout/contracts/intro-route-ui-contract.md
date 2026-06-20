# UI Contract: Intro Route Reference Layout

## Scope

Defines the expected user-visible structure and behavior for the `/intro` route after the reference-layout refresh.

## Route Contract

- Canonical localized routes remain `/:lang/intro`.
- Existing alias handling for `/intro` remains unchanged.
- The Continue CTA continues navigating to the same-language next route.

## Structural Contract

### Desktop Composition

- The intro scene presents a stable two-column composition inside a centered container.
- The left column renders, in order:
  1. Title artwork
  2. Continue CTA
  3. Date artwork from `/images/Home2/Monday.png`
  4. Countdown display
- The right column renders, in order:
  1. Rings artwork
  2. Venue/details artwork
- Decorative herbs render in:
  - bottom-left
  - top-right

### Mobile Composition

- The scene collapses to a centered vertical stack.
- Primary reading order is:
  1. Title artwork
  2. Continue CTA
  3. Date artwork
  4. Countdown
  5. Rings artwork
  6. Venue/details artwork
- Decorative herbs remain visible only if they do not obstruct the main stack.

## Rendering Contract

- The visible date text is replaced entirely by the supplied date artwork.
- The date artwork preserves its natural proportions.
- The countdown remains directly associated with the date artwork and must not appear detached or float between unrelated content blocks.
- The countdown displays four segments in this exact order:
  1. Days
  2. Hours
  3. Minutes
  4. Seconds

## Interaction Contract

- The Continue CTA remains keyboard-focusable and retains its current hover/focus treatment.
- Countdown updates are passive and do not require user interaction.
- Decorative herbs are non-interactive and must not capture pointer intent.

## Responsive Stability Contract

- Resizing within supported desktop widths must not cause the title, CTA, date artwork, countdown, rings, or venue artwork to drift unpredictably.
- No primary element may overlap another at supported desktop or mobile sizes.
- No horizontal scrolling is introduced by the refreshed composition.

## Regression Boundaries

- No changes to non-intro routes.
- No changes to language routing behavior.
- No changes to RSVP logic, Supabase usage, or story progression behavior beyond preserving the existing Continue navigation.
