# Contract: Localized Route and Intro Scroll-Step Behavior

## Purpose

Define externally observable behavior for localized route simplification and scroll-controlled intro sequencing.

## Route Contract

### Canonical Routes

- `/:lang/intro`
- `/:lang/married`

### English Alias Redirects

- `/intro` -> `/en/intro`
- `/married` -> `/en/married`

### Legacy Redirects

- `/story` -> `/en/intro`
- `/story/*` -> `/en/intro`
- `/she-said-yes` -> `/en/intro`

### Acceptance Conditions

- Deprecated and alias routes never expose removed legacy flow content.
- Redirect targets resolve successfully for both supported languages.
- Redirect behavior is deterministic and immediate from user perspective.

## Intro Scroll-Step Contract

### Step Progression Rules

1. One downward scroll action advances exactly one intro step.
2. One upward scroll action reverses exactly one intro step.
3. Progression is bounded to first and last step with no index overflow.
4. No automatic timed progression is allowed.

### Component Activation Rules

- Each intro text block is represented by its own component.
- Only the component mapped to the active step may be visible.
- Non-active text components are deactivated and not visibly rendered.

### Transition Rules

- Every valid step change applies outgoing fade-out and incoming fade-in.
- Transition style is smooth and minimal.
- Step transitions must avoid visible overlap of multiple text blocks.

### Typography Rules

- All intro text blocks must use:
  - `font-family: "Brittany Signature", "Caveat", cursive`

### Final-State and Continue Rules

- Final title/date step remains visible until user action.
- No forced auto-navigation to married route.
- Continue CTA is visible and keyboard-operable on final step.
- Continue CTA navigates to same-language `/:lang/married`.

## Test Contract Signals

- Route tests verify canonical localized path reachability for `en` and `it`.
- Redirect tests verify alias and deprecated paths resolve to English fallback targets.
- Intro interaction tests verify one-step forward/backward traversal per scroll action.
- Visibility tests verify only one intro text component is visible at any step.
- Transition tests verify fade-out/fade-in handoff behavior without overlap.
- Typography tests verify all intro text uses the required font stack.
- CTA tests verify keyboard and pointer activation to same-language married route.
