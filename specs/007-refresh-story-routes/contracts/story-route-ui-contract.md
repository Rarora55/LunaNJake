# UI Contract: Story Route Refresh

## Scope

This contract defines the expected UI behavior for the route updates in `/:lang/intro`, `/:lang/timeline`, `/:lang/rsvp`, and `/:lang/LunaNJake` without changing backend or submission behavior.

## Route Contracts

### `/:lang/intro`

- The route renders only the final intro composition that currently represents the landing/title state.
- The route remains the starting point of the story flow.
- The route continues to expose one active CTA leading to the next story route.
- Removed intro slices are not reachable through wheel progression or visible in the DOM as active scene content.

### `/:lang/timeline`

- The route continues to reveal marker content through the existing scroll-linked timeline system.
- The visible event sequence ends with six marker points.
- Marker labels appear in order with the late-stage sequence reading:
  - `14:30 Dinner`
  - `15:30 Party`
  - `17:00 Leaving`
- No visible marker or label remains for `After Dinner`.
- The final previously separate point after `Leaving` is removed from the rendered sequence.
- All timeline labels share the same typography and visual treatment path.

### `/en/rsvp` and `/it/rsvp`

- The route preserves its guarded-entry behavior and existing submit flow.
- Form fields, validation requirements, request payload shape, loading protection, and success/error feedback remain unchanged.
- Visual presentation aligns with the rest of the site through styling changes only.

### `/:lang/LunaNJake`

- The route keeps its existing end-scene content and wheel/key/touch navigation behavior.
- The route includes a visible return CTA styled with the site's shared button language.
- Activating the CTA returns the visitor to the intro starting route for the same language context.

## Interaction Contracts

- All new or retained CTAs remain keyboard-focusable and expose visible focus treatment.
- Intro and timeline animation behavior must remain as-is unless directly simplified by removed content.
- Timeline content changes must remain configuration-driven rather than hardcoded inside rendering loops.
- RSVP behavior must not gain new backend dependencies, submission branches, or route guards.

## Regression Targets

- Intro renders the retained final state immediately.
- Timeline marker count and labels match the updated sequence.
- RSVP still submits through the current fetch path and protected-entry flow.
- `/LunaNJake` CTA returns to intro and does not block wheel/key navigation.
