# Mobile Audit Checklist and Route Inventory

## In-Scope Route Inventory

- `/en/story/*`, `/it/story/*` -> `src/pages/StoryPage.css`, `src/pages/StoryPage.tsx`
- `/en/she-said-yes`, `/it/she-said-yes` -> `src/features/sheSaidYes/SheSaidYesMarriedScene.css`
- `/en/address-intro`, `/it/address-intro` and `/en/address-timeline`, `/it/address-timeline` -> `src/features/addressTimeline/AddressTimelineScene.css`
- `/en/coming-from-abroad`, `/it/coming-from-abroad` -> `src/features/comingFromAbroad/ComingFromAbroadScene.css`
- `/en/travelling-from-london`, `/it/travelling-from-london` -> `src/features/travellingFromLondon/TravellingFromLondonScene.css`
- `/en/where-to-stay`, `/it/where-to-stay` -> `src/features/whereToStay/WhereToStayScene.css`
- `/en/are-you-coming`, `/it/are-you-coming` -> `src/features/areYouComing/AreYouComingScene.css`
- `/en/message-to-guest`, `/it/message-to-guest` -> `src/features/messageToGuest/MessageToGuestScene.css`
- `/en/luna-n-jake`, `/it/luna-n-jake` -> `src/features/lunaNJake/LunaNJakeScene.css`

## Baseline Friction Notes (Pre-fix)

- Mobile story progression felt over-gated due to a fixed 700ms cooldown.
- Small swipe gestures were ignored too often on narrow mobile viewports.
- Scene proportions were inconsistent route-to-route on 320-430 px widths.
- Several scenes needed tighter mobile edge padding and constrained card/media widths.

## Validation Results (Post-fix)

- [x] Story mobile profile enabled for <=430px viewport.
- [x] Reduced-motion profile switches to stronger simplification on mobile.
- [x] Mobile swipe threshold lowered to improve control; desktop threshold preserved.
- [x] Mobile cooldown lowered while desktop cooldown behavior remains unchanged.
- [x] Story shell overflow-x clipping and responsive spacing tokens added.
- [x] In-scope scene CSS files updated with 430px-focused proportion tuning.
- [x] Targeted integration tests pass:
  - `tests/integration/mobile-layout-proportions.test.tsx`
  - `tests/integration/mobile-scroll-behavior.test.tsx`
  - `tests/integration/desktop-nonregression-scroll-layout.test.tsx`
