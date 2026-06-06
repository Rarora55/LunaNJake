# Research: Confirmation Route

## Decision 1: Use a simple mount-triggered UI fade for confirmation entry

- **Decision**: Use a simple route-entry fade on the confirmation content block, implemented as a lightweight UI transition rather than scroll-linked animation.
- **Rationale**: The feature is explicitly a `static` section with centered composition. A mount-triggered fade satisfies the desired tone without introducing extra motion state, scroll coupling, or GSAP/Motion overlap risk.
- **Alternatives considered**:
  - Scroll-driven reveal: rejected because the section was clarified as `static` and does not need internal scroll choreography.
  - Multi-step animation sequence: rejected because it adds complexity without improving the confirmation message's clarity.

## Decision 2: Keep confirmation copy in the central translation dictionary

- **Decision**: Add a dedicated confirmation content group to `src/i18n/storyText.ts` for English and Italian title/body copy.
- **Rationale**: The constitution requires dictionary-driven user-facing text for both languages. A dedicated content group keeps localization explicit, testable, and consistent with the current route architecture.
- **Alternatives considered**:
  - Hardcoded copy in `Confirmation.tsx`: rejected because it violates the multilingual-first rule.
  - External JSON or CMS source: rejected because it is unnecessary for one new static content section and would add new infrastructure.

## Decision 3: Extend explicit route helpers for confirmation placement

- **Decision**: Add canonical and fallback path helpers for confirmation in `src/config/storyInputs.ts` and wire them through `src/routing/storyRoutes.tsx`.
- **Rationale**: The current route flow is already expressed through helper functions and localized route components. Extending that pattern keeps the new route ordering explicit and regression-testable.
- **Alternatives considered**:
  - Inline string literals for confirmation paths in the router: rejected because it would weaken route consistency and make order regressions easier.
  - A separate navigation registry: rejected for this feature because the current project already uses helper-based localized path wiring.

## Decision 4: Use one shared approved confirmation image across languages and breakpoints

- **Decision**: Select one approved confirmation image asset and reuse it for both languages and all supported viewport sizes.
- **Rationale**: This was clarified explicitly and minimizes branching in layout logic, copy-to-image mapping, and visual QA.
- **Alternatives considered**:
  - Different images by viewport: rejected because it complicates responsive validation and asset selection unnecessarily.
  - Different images by language: rejected because the visual content does not need localization and would increase testing surface without user benefit.

## Decision 5: Validate responsive behavior through focused layout and route-order tests

- **Decision**: Add focused automated checks for route order and confirmation rendering, then cover final visual tone with manual desktop/mobile QA.
- **Rationale**: The main risks are flow sequencing, localization wiring, and responsive overflow. These are well-suited to targeted component/integration tests plus manual review of spacing, typography, and fade polish.
- **Alternatives considered**:
  - Manual QA only: rejected because route-order regressions are easy to automate and should stay protected.
  - Pixel-perfect visual snapshot coverage: rejected because the project's current test suite is behavior-oriented and the feature does not justify heavier snapshot maintenance.
