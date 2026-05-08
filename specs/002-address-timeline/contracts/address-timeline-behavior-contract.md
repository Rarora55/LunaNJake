# Contract: Address Timeline Transition Behavior

## Scope

Defines observable behavior from localized `/she-said-yes` exit into `/address` and the initial three timeline events.

## Route Handoff Contract

- `/en/she-said-yes` and `/it/she-said-yes` scroll-forward transition into `/address`.
- Scroll-backward from `/address` returns toward originating localized `she-said-yes` state without broken visual state.

## Transition Phase Contract

- Transition uses explicit phase windows:
  - `scatter-exit`
  - `address-reveal`
  - `line-growth`
- Phase effects are tied to scroll progress and reversible when scrolling upward.

## Exit Motion Contract

- All currently visible scene actors exit screen with mixed directions (horizontal, vertical, diagonal).
- Motion style is handmade/stop-motion-like via irregular jumps, slight rotational offsets, and staggered timing.
- Reduced-motion variant replaces chaotic movement with minimal-motion alternatives.

## Address Reveal Contract

- `CasaBoda` appears centered after scatter phase is mostly complete.
- Address text appears beneath image with progressive fade.
- Vertical black line begins from address block center anchor.

## Timeline Line Contract

- Vertical line reveal continues from transition anchor into `/address` without visible reset.
- Line progression remains extensible for future timeline items.

## Timeline Item Contract

Initial three items MUST satisfy:

1. Item 1
- Marker: `garabato2` centered on line
- Card side: right
- Card icon: `Bus.png`
- Text: `11am Shuttle Bus`

2. Item 2
- Marker: matching garabato style centered on line
- Card side: left
- Card icon: `Copas.png`
- Text: `Ceremony and Reception`

3. Item 3
- Marker: matching garabato style centered on line
- Card side: right
- Card icon: `breakfast`
- Text: `TBA Post-Wedding Brunch`

Additional rules:
- Item reveal points are normalized progress values (`0..1`).
- Cards remain compact, content-fitting, and readable on desktop/mobile.

## Fallback Contract

- If marker or icon media fails, item remains visible.
- Card text remains readable.
- Placeholder visual appears in place of failed media.

## Verification Signals

- No skipped or stuck phase in forward/backward scroll.
- Address reveal always reachable after transition exit.
- Line continuity persists into `/address`.
- Three items reveal in right-left-right card sequence.
- Reduced-motion profile preserves reveal order and route continuity.
