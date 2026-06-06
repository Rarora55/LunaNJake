# Quickstart: Mobile Scale and Scroll Parity

## Prerequisites

- Install dependencies in `frontend/`.
- Ensure story routes for `en` and `it` are runnable locally.
- Test with mobile viewport emulation and reduced-motion toggle.

## Validation Steps

1. Launch the frontend app and open localized story routes (`/en/*`, `/it/*`) included in story flow.
2. Test viewport widths in the primary band (320 px, 375 px, 390 px, 430 px):
   - Verify no critical-content clipping or horizontal overflow.
   - Verify typography/media/cards/buttons/decorative assets remain proportionate.
3. Traverse forward and reverse through story sections on mobile viewport:
   - Verify smooth, controllable progression.
   - Verify no scroll lock, jump loops, or frozen transitions.
4. Validate snap-friction sections:
   - Confirm hard snap is softened/disabled where friction existed.
   - Confirm progression remains clear.
5. Enable reduced-motion preference:
   - Confirm strongly simplified transition profile is active on mobile.
6. Run desktop regression pass on audited routes:
   - Confirm no unintended desktop visual or scrolling changes.

## Completion Checklist

- All in-scope localized story routes and shared story shell/layout components validated.
- Success criteria SC-001 through SC-007 satisfied.
- Any shared desktop fix (if required) is explicitly documented.

## Implementation Notes (2026-05-15)

- Added mobile/desktop profile split in story step navigation to reduce touch friction while preserving desktop behavior.
- Added reduced-motion-specific mobile simplification path for story transitions.
- Applied 430px-focused proportion refinements across in-scope scene CSS modules.
- No intentional shared desktop behavior changes were introduced; desktop checks remain non-regression only.

## Validation Run Results (2026-05-15)

- Automated integration checks: PASS (5/5 assertions across 3 new integration files).
- Targeted command: cmd /c npx vitest run tests/integration/mobile-layout-proportions.test.tsx tests/integration/mobile-scroll-behavior.test.tsx tests/integration/desktop-nonregression-scroll-layout.test.tsx.

