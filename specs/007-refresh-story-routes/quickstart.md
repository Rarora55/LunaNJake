# Quickstart: Refresh Story Routes

## Prerequisites

- From `frontend/`, install dependencies if not already present.
- Use the existing local test setup for Vitest and React Testing Library.

## Implementation Walkthrough

1. Update `src/features/intro/IntroScene.tsx` and `src/features/intro/IntroScene.css` so intro renders only the retained final composition and still points to the next route.
2. Update `src/features/addressTimeline/timelineConfig.ts` and `src/i18n/storyText.ts` so the timeline marker sequence removes `After Dinner`, shifts `Party` and `Leaving`, and deletes the former final point.
3. Normalize any timeline label styling in `src/routes/TimeLine.css` or related shared timeline styles so all labels follow one typography rule.
4. Refresh `src/pages/RsvpPage.css` and only minimal structure in `src/pages/RsvpPage.tsx` as needed to match the site art direction without changing form behavior.
5. Add the return CTA in `src/features/lunaNJake/LunaNJakeScene.tsx` and `src/features/lunaNJake/LunaNJakeScene.css`, routing it back to intro with the shared button style.
6. Update or add focused tests for intro rendering, timeline marker data/order, and `/LunaNJake` CTA navigation behavior.

## Verification

1. Run `npm test`.
2. Run `npx tsc --noEmit`.
3. Manually verify:
   - `/en/intro` and `/it/intro` open directly on the retained final intro scene.
   - `/en/timeline` and `/it/timeline` show the updated six-point sequence with consistent label typography.
   - `/en/rsvp` and `/it/rsvp` keep the same submit behavior while matching the broader site visuals.
   - `/en/LunaNJake` and `/it/LunaNJake` show the new return CTA and send users back to intro.

## Rollback Boundary

- If regressions appear, revert only the intro scene, timeline config/i18n, RSVP styling, and `/LunaNJake` CTA changes.
- Do not modify backend submission logic or unrelated route ordering while addressing this feature.
