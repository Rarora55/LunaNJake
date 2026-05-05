# Quickstart: Story Slide Stack (Constitution-Aligned)

## Prerequisites

- Frontend dependencies installed.
- Localized Story routes available for `en` and `it`.

## Run Locally

1. Start frontend dev server.
2. Open `/en/story/the-first-time` and `/it/story/the-first-time`.

## Manual Validation Checklist

1. Sequence integrity
- Confirm exactly 10 steps in order:
  `the-first-time`, `it-was-10-am`, `facing-the-morning`, `flatmates`, `ready-wall-of-shame`, `who-are-you`, `your-new-flatmate`, `she-was-not-wrong`, `bike`, `pum`.

2. Interaction integrity
- Scroll down/up moves by one accepted step only.
- High-momentum gesture does not skip multiple steps.

3. Transition and layout
- Incoming step moves bottom-to-top with snappy hard-stop profile.
- Captioned steps render centered black placeholder and caption below.

4. Highlight behavior
- At step 8 (`she-was-not-wrong`), placeholders fade and centered highlight text appears.
- At step 9 (`bike`), captioned slideshow behavior resumes.

5. Localization
- Story text appears from dictionary-driven content for both `en` and `it`.
- No component-level hardcoded user-facing Story copy.

## Automated Validation Results

- Date: 2026-05-04
- Command: `npm test` (frontend)
- Result: PASS
- Summary: 10 test files passed, 26 tests passed, 0 failed.

## Suggested Automated Tests

- Unit: ten-step config invariant and step ordering.
- Unit: navigation controller gating + `0..9` bounds.
- Integration: momentum no-skip behavior across step 8->9 and 9->10.
- Integration: step-8 highlight fade/center behavior.
- Integration: step-9 captioned resume behavior.
- Integration: localized text sourcing for both languages.
