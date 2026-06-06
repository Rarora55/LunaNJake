# Data Model: Intro and Married Route Simplification

## Entity: LocalizedRouteFlowMap

- Purpose: Defines canonical localized routes and deterministic redirect behavior for deprecated and alias paths.
- Fields:
  - `canonicalRoutes`: set (`/:lang/intro`, `/:lang/married`)
  - `deprecatedRoutes`: set (`/story`, `/story/*`, `/she-said-yes`)
  - `aliasRoutes`: set (`/intro`, `/married`)
  - `fallbackLanguage`: `en`
  - `redirectTargets`: map from deprecated/alias path patterns to canonical destinations
- Validation Rules:
  - Canonical route set must include both localized routes.
  - Deprecated and alias paths must resolve deterministically to valid canonical targets.
  - Deprecated routes must not render legacy flow content.

## Entity: IntroStepSequence

- Purpose: Represents scroll-controlled intro progression state.
- Fields:
  - `stepOrder`: ordered list of intro step identifiers (first paragraph, second phrase, final title/date)
  - `currentStepIndex`: integer index of active intro step
  - `minStepIndex`: `0`
  - `maxStepIndex`: last index in `stepOrder`
  - `progressionMode`: `scroll_step_sequence`
  - `autoProgressionEnabled`: `false`
- Validation Rules:
  - Downward scroll increments `currentStepIndex` by exactly one until `maxStepIndex`.
  - Upward scroll decrements `currentStepIndex` by exactly one until `minStepIndex`.
  - Step traversal must remain deterministic under repeated input.

## Entity: IntroTextStepComponent

- Purpose: Encapsulates each intro text block as an independently activatable UI unit.
- Fields:
  - `stepId`: unique identifier mapped to one step in `IntroStepSequence`
  - `content`: localized text content for that step
  - `isActive`: boolean derived from `currentStepIndex`
  - `fontStack`: `"Brittany Signature", "Caveat", cursive`
  - `alignment`: centered
- Validation Rules:
  - Exactly one step component is active per render state.
  - Non-active step components are deactivated and not visibly rendered.
  - All step components must use the specified font stack.

## Entity: IntroStepTransition

- Purpose: Defines transition handoff behavior when active step changes.
- Fields:
  - `outgoingTransition`: `fade_out`
  - `incomingTransition`: `fade_in`
  - `style`: `smooth_minimal`
  - `trigger`: step index change from scroll input
- Validation Rules:
  - Outgoing and incoming transitions execute on each valid step change.
  - Transition behavior must avoid simultaneous multi-step visibility.

## Entity: IntroContinueAction

- Purpose: Defines explicit user continuation from final intro step to married route.
- Fields:
  - `label`: localized Continue CTA copy
  - `visibleWhen`: `currentStepIndex == maxStepIndex`
  - `interactionModes`: click/tap and keyboard activation
  - `targetRouteRule`: navigate to same-language `/:lang/married`
- Validation Rules:
  - CTA is keyboard operable.
  - CTA preserves selected language context.
  - No automatic timed navigation occurs.

## Relationships

- `LocalizedRouteFlowMap` governs route entry before intro rendering.
- `IntroStepSequence` determines active `IntroTextStepComponent` state.
- `IntroStepTransition` binds to step changes within `IntroStepSequence`.
- `IntroContinueAction` is available only at final `IntroStepSequence` state and navigates according to `LocalizedRouteFlowMap` language context.
