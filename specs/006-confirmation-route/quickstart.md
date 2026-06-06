# Quickstart: Confirmation Route

## Goal

Implement and validate a new localized confirmation route positioned between recommendation and questions.

## Implementation Outline

1. Add confirmation path helpers in `src/config/storyInputs.ts`.
2. Add confirmation copy keys to `src/i18n/storyText.ts` for `en` and `it`.
3. Create `src/routes/Confirmation.tsx` and `src/routes/Confirmation.css`.
4. Update `src/routing/storyRoutes.tsx` so:
   - recommendation points forward to confirmation
   - confirmation points backward to recommendation
   - confirmation points forward to questions
   - questions points backward to confirmation
5. Select one approved confirmation image asset and wire it into the route.
6. Add route-order and responsive rendering tests.

## Validation Steps

1. Run the relevant frontend test suite for:
   - route order
   - story navigation flow
   - confirmation layout/rendering
2. Manually verify `/:lang/confirmation` for `en` and `it`.
3. Confirm the route appears immediately after recommendation and before questions in both navigation directions.
4. Confirm desktop layout shows:
   - centered overall block
   - left-aligned text in the left column
   - image in the right column
5. Confirm mobile layout shows:
   - text first
   - image below
   - no overflow
6. Confirm the fade-in is smooth, subtle, and not scroll-driven.

## Expected Outcome

- Confirmation is fully localized.
- Flow order is preserved as recommendation -> confirmation -> questions.
- The section remains visually consistent with the wedding website style on desktop and mobile.
