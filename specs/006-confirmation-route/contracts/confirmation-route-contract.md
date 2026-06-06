# Contract: Confirmation Route

## Purpose

Define the required route, navigation, localization, and rendering contract for the confirmation section.

## Localized Route Contract

- The system exposes `/:lang/confirmation` for `en` and `it`.
- The route accepts only supported project languages already recognized by the router.
- If alias or fallback helpers are used, they must resolve consistently with the project's existing language fallback behavior.

## Navigation Contract

- `/:lang/recommendation` navigates forward to `/:lang/confirmation`.
- `/:lang/confirmation` navigates backward to `/:lang/recommendation`.
- `/:lang/confirmation` navigates forward to `/:lang/questions`.
- `/:lang/questions` navigates backward to `/:lang/confirmation`.
- Navigation targets must remain language-consistent; no forward or backward step may switch languages implicitly.

## Content Contract

- English route renders:
  - Title: `Confirmation`
  - Body copy: `We are so excited to have you! Please RSVP by 1st November 2026. Make sure to check out our pages for all the info you'll need to make sure you have a fab Bank Holiday with us!`
- Italian route renders:
  - One localized title equivalent to `Confirmation`
  - One localized body preserving the RSVP deadline and the same meaning as the English copy
- All user-facing text must come from the central translation dictionary.

## Layout Contract

- The confirmation route uses `static` section behavior.
- The full confirmation content block remains centered vertically and horizontally within the viewport.
- Desktop and larger tablet layouts use two columns:
  - Left column: title and body copy
  - Right column: single shared confirmation image
- Mobile layouts stack vertically:
  - Text block first
  - Image second
- Text within the left column is left-aligned.
- The image must scale responsively and remain inside viewport bounds.

## Animation Contract

- A single soft fade-in is applied to the whole confirmation content block when the route becomes active.
- The entry animation must remain subtle and must not introduce scroll-coupled motion or multi-step staged behavior.
- The fade must not cause visible layout shift after the content settles.

## Validation Contract

- Automated checks verify route order and language-consistent previous/next targets.
- Automated checks verify the confirmation route renders localized copy and maintains the mobile stacked ordering.
- Manual QA verifies typography prominence, centered composition, smooth fade tone, and non-overflow image behavior on representative desktop and mobile viewports.
