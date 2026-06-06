# Contract: Mobile Scroll and Layout Behavior

## Scope Contract

- Applies to all localized story routes (`/en/*`, `/it/*`) and shared story shell/layout components used by those routes.
- Excludes non-story routes.

## Viewport Contract

- Primary mobile acceptance viewport width band is 320-430 px.
- Behavior outside the primary band must degrade gracefully without critical-content clipping.

## Layout/Scaling Contract

- Typography, cards, media, controls, decorative assets, and spacing must be adapted with responsive values.
- Visual hierarchy must preserve desktop intent (primary content remains dominant).
- Horizontal overflow of critical content is disallowed within primary viewport band.

## Scroll Contract (Mobile)

- Touch scrolling must feel smooth and controllable for forward and reverse traversal.
- Hard snap must be softened or disabled in sections where it creates touch friction.
- Snap retention, when present, must preserve clear section progression.
- Blocking states are forbidden: scroll lock, persistent jump loops, frozen progression.

## Animation Contract

- Default mobile profile: softened transition distances/resistance/timing.
- Reduced-motion mobile profile: strongly simplified transitions.
- Reduced-motion profile is activated only when user preference indicates reduced motion.
- Desktop transition/scroll behavior remains unchanged unless an explicit shared fix is documented.

## Validation Contract

- Route coverage: all in-scope localized story routes and shared shell/layout components.
- Visibility: 100% of critical content visible without horizontal scroll/clipping in 320-430 px range.
- Balance: at least 90% of evaluated sections are visually balanced against desktop hierarchy.
- Effort: no repeated high-effort corrective swipes needed in audited high-friction sections.
- Regression: no unintended desktop visual/scroll changes.

## Ownership Mapping

- Shared story shell/layout and story interaction profile: rontend/src/pages/StoryPage.css, rontend/src/pages/StoryPage.tsx.
- Story interaction gating utilities: rontend/src/features/story/navigationController.ts.
- Scene-level mobile proportion tuning: rontend/src/features/**/**Scene.css.

