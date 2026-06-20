# Research: Refresh Story Routes

## Decision 1: Collapse intro to the existing final scene instead of preserving a hidden multi-step sequence

- **Decision**: Refactor `src/features/intro/IntroScene.tsx` so the route renders the current final intro composition as its default and only visible state, removing the first two step components and any wheel-transition logic that exists only to reach them.
- **Rationale**: The current intro route is implemented as a three-step wheel-driven scene where the retained content already exists as `SequenceThreeText`. Keeping dormant steps would preserve unnecessary state transitions and make the route harder to reason about after the first two slices are removed.
- **Alternatives considered**:
  - Keep the step state and force the component to start on step `2`: rejected because it would preserve dead transitions and hidden content that the feature explicitly removes.
  - Keep all three step components but visually hide the first two: rejected because it increases regression risk and violates the intent to remove those sections.

## Decision 2: Treat timeline shortening as a centralized configuration change with matching dictionary cleanup

- **Decision**: Update `src/features/addressTimeline/timelineConfig.ts` and `src/i18n/storyText.ts` together so the visible marker list, label keys, image assets, and final ordering are controlled from one source of truth.
- **Rationale**: The current timeline marker system is already config-driven. The requested changes map directly to marker IDs 5-7 plus the label dictionary. Making the change in configuration keeps route logic and rendering components stable while allowing focused regression tests on marker thresholds and visible content.
- **Alternatives considered**:
  - Hardcode new text or hide a point conditionally inside `TimelineGifMarkers.tsx`: rejected because it would split content rules across rendering code and config.
  - Remove only the label but keep the final marker threshold data intact: rejected because the feature explicitly removes the last point entirely.

## Decision 3: Normalize timeline text styling through shared timeline CSS hooks

- **Decision**: Ensure marker label typography consistency by using the existing shared `.timeline-marker-content-text` styling path in `src/routes/TimeLine.css` instead of introducing per-marker font overrides.
- **Rationale**: The requirement is visual consistency across the page, not a new style treatment. The timeline already routes all visible label text through one class, so consistency should be enforced there or in the data-driven content structure rather than through isolated marker exceptions.
- **Alternatives considered**:
  - Add custom classes per marker: rejected because it would make future timeline edits harder and undermine the requirement for one shared style logic.
  - Move text styling into inline styles in the marker config: rejected because typography belongs in the style layer, not the data layer.

## Decision 4: Restyle RSVP by changing presentation only, leaving guard and submit logic untouched

- **Decision**: Limit RSVP updates to `src/pages/RsvpPage.css` plus any minimal structural class adjustments needed in `src/pages/RsvpPage.tsx`, while preserving the guarded entry check, field state, `fetch` submission path, and status messaging logic.
- **Rationale**: The page currently mixes standalone styling with live behavior. The user explicitly excluded backend and submission changes, so the safest plan is to reuse the current structure and only align colors, typography, spacing, and button presentation with established site patterns.
- **Alternatives considered**:
  - Rewrite RSVP into a shared site scene component: rejected because it would risk behavior regressions for a purely presentational request.
  - Add localization or backend changes while touching the page: rejected because those are outside the scope of this feature.

## Decision 5: Reuse an existing image-based CTA pattern for `/LunaNJake`

- **Decision**: Add the new return CTA directly inside `src/features/lunaNJake/LunaNJakeScene.tsx` and style it by reusing the site's established interactive button pattern, likely the image-swap CTA treatment already used in `IntroScene` or RSVP-entry cards elsewhere in the site.
- **Rationale**: `/LunaNJake` already manages wheel, keyboard, and touch navigation at the scene root. A local CTA can coexist with that navigation model as long as it is focusable, uses the shared visual language, and routes through the same localized intro path provided by `storyRoutes.tsx`.
- **Alternatives considered**:
  - Depend only on wheel-up navigation to return to intro: rejected because the feature explicitly requires a visible CTA.
  - Introduce a brand-new button style for the page: rejected because the request requires the same button style used across the website.
