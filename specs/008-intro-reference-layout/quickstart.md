# Quickstart: Intro Reference Layout

## Goal

Implement the `/intro` layout refresh so it matches `frontend/public/images/Home2/SampleIntro.png` more closely while preserving current routing, CTA behavior, and invitation art direction.

## Implementation Steps

1. Update `frontend/src/features/intro/IntroScene.tsx`.
   - Replace the rendered date text block with the date artwork reference `/images/Home2/Monday.png`.
   - Keep the Continue CTA behavior unchanged.
   - Keep the countdown local to the intro scene and render it directly beneath the date artwork.
   - Add semantic wrappers/classes that separate the left content stack, right content stack, and decorative herb layers.

2. Refactor `frontend/src/features/intro/IntroScene.css`.
   - Move primary content alignment to a stable centered composition container.
   - Define a two-column desktop layout and a stacked mobile layout.
   - Remove reliance on viewport-sensitive offsets for the title, CTA, date artwork, countdown, rings, and venue details.
   - Add top-right decorative herb positioning derived from the existing bottom-left treatment.
   - Preserve CTA visuals, background treatment, and the current hand-drawn art direction.

3. Reuse public assets.
   - Use `frontend/public/images/Home2/Monday.png` via `/images/Home2/Monday.png`.
   - Reuse the existing title, rings, venue, and herb art assets already used by the intro scene.

4. Update tests as needed.
   - Extend `frontend/tests/features/intro/IntroScene.test.tsx` to assert the presence of the date artwork and countdown structure without relying on removed text content.
   - Add or adjust integration coverage only if the layout refactor changes route-level rendering assumptions.

## Verification

1. Run type and test checks from `frontend/`.
   - `npx tsc --noEmit`
   - `npm test -- IntroScene`

2. Manually review `/intro` in the browser.
   - Desktop widths: verify stable alignment during resize and compare against `SampleIntro.png`.
   - Mobile widths: verify stacked readability, no overlap, and no horizontal overflow.

3. Confirm regression boundaries.
   - Continue CTA still navigates to the same-language next route.
   - Other routes and route aliases remain unchanged.

## Follow-Up

- Live browser visual QA against `frontend/public/images/Home2/SampleIntro.png` is still required to confirm spacing and artwork balance on real desktop and mobile viewports. The current implementation has been validated with TypeScript and intro-focused automated tests in this CLI environment.
