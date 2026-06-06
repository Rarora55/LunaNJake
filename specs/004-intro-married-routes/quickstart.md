# Quickstart: Intro and Married Route Simplification

## Prerequisites

- Dependencies installed.
- Frontend app runnable locally.
- Current feature artifacts available under `specs/004-intro-married-routes/`.

## Implementation Steps

1. Update route map so `/:lang/intro` and `/:lang/married` are canonical for the flow.
2. Redirect `/story`, `/story/*`, and `/she-said-yes` to `/en/intro`.
3. Redirect `/intro` and `/married` aliases to `/en/intro` and `/en/married`.
4. Implement `/:lang/intro` as a full-screen scene using existing background style.
5. Split intro text blocks into separate components, each mapped to one step index.
6. Implement scroll-step control:
   - One scroll down advances one step.
   - One scroll up reverses one step.
   - No automatic timed progression.
7. Ensure only the active intro step component is visible at any time.
8. Apply fade-out/fade-in transitions on every valid step change.
9. Apply intro text font stack to all blocks: `"Brittany Signature", "Caveat", cursive`.
10. Keep final step persistent and expose keyboard-operable Continue CTA to same-language `/:lang/married`.

## Validation Checklist

1. Deprecated routes (`/story`, `/story/*`, `/she-said-yes`) always resolve to `/en/intro`.
2. Alias routes (`/intro`, `/married`) always resolve to English canonical paths.
3. Canonical localized routes resolve correctly for both `en` and `it`.
4. Downward scroll always advances exactly one step.
5. Upward scroll always reverses exactly one step.
6. Only one intro text component is visible per step state.
7. Step changes always use fade-out/fade-in handoff without overlap.
8. All intro text blocks use `"Brittany Signature", "Caveat", cursive`.
9. Final intro step persists until user interaction.
10. Continue CTA is visible, keyboard-operable, and navigates to same-language married route.

## Regression Guardrails

- No RSVP route/flow regressions.
- No Supabase or Edge Function behavior changes.
- No GSAP/Motion responsibility overlap introduced.
- No localization regressions for `en` and `it` route behavior.
