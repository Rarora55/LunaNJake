# Contract: Story Slide Behavior (Constitution-Aligned)

## Scope

Defines observable behavior for the first animated Story section using the constitution ten-step sequence.

## Route/Sequence Contract

- Story slideshow is composed of exactly 10 ordered steps.
- Ordered step ids:
  - `the-first-time`
  - `it-was-10-am`
  - `facing-the-morning`
  - `flatmates`
  - `ready-wall-of-shame`
  - `who-are-you`
  - `your-new-flatmate`
  - `she-was-not-wrong`
  - `bike`
  - `pum`

## Interaction Contract

- Vertical down interaction moves forward by one step when accepted.
- Vertical up interaction moves backward by one step when accepted.
- One accepted interaction may cause at most one step index change.
- Same-gesture momentum/delta cannot trigger additional changes before next acceptance window.

## Transition Contract

- Incoming step enters from below viewport to cover viewport.
- Motion profile is short, snappy, and hard-stop.
- No spring bounce or elastic easing.

## Visual Contract

- Captioned steps render centered black placeholder approximating photographic frame with caption below.
- Placeholder layers accumulate by z-order through captioned progression.

## Highlight Contract (Step 8)

- `she-was-not-wrong` is a transient `highlight` step.
- On activation, accumulated placeholders fade out and text is centered.
- Progression continues to step 9 and step 10.

## Resume Contract (Steps 9-10)

- On `bike` and `pum`, slideshow returns to captioned rendering mode.
- Vertical one-step interaction contract remains unchanged.

## Localization Contract

- Story text is sourced from translation dictionaries for both `en` and `it`.
- User-facing Story text is not hardcoded in components.

## Verification Signals

- Sequence integrity: 10/10 ordered ids present.
- Interaction integrity: each accepted interaction yields 0 or 1 step change.
- Highlight integrity: step-8 fade/center behavior present.
- Resume integrity: step-9/10 captioned behavior restored.
- Localization integrity: dictionary-backed text in both locales.
