# Data Model: Story Slide Stack (Constitution-Aligned)

## Entity: StorySlide

- Purpose: Represents one ordered Story step in constitution-aligned sequence.
- Fields:
  - `id` (string, unique): step id.
  - `order` (integer, unique, 1-10): step position.
  - `translationKey` (string): key to localized Story text in dictionary.
  - `displayMode` (enum): `captioned` or `highlight`.
- Validation Rules:
  - Exactly 10 records must exist.
  - `order` values must be contiguous `1..10`.
  - Order must be: `the-first-time`, `it-was-10-am`, `facing-the-morning`, `flatmates`, `ready-wall-of-shame`, `who-are-you`, `your-new-flatmate`, `she-was-not-wrong`, `bike`, `pum`.
  - Step 8 (`she-was-not-wrong`) uses `highlight` mode.
  - Steps 1-7 and 9-10 use `captioned` mode.

## Entity: SlideVisualLayer

- Purpose: Tracks stacked placeholder layers.
- Fields:
  - `slideId` (string, FK -> StorySlide.id)
  - `stackIndex` (integer)
  - `visibility` (enum): `visible`, `fading`, `hidden`
- Validation Rules:
  - Captioned steps contribute placeholder layers.
  - On step-8 highlight, accumulated layers transition to `fading/hidden`.
  - On step 9, captioned layering resumes per active step.

## Entity: StoryTransitionState

- Purpose: Runtime state for deterministic navigation and animation replay.
- Fields:
  - `activeIndex` (integer, 0-9)
  - `isTransitioning` (boolean)
  - `acceptWindowOpen` (boolean)
  - `lastAcceptedDirection` (enum): `forward` | `backward` | `none`
  - `captionReplayKey` (string/integer)
- Validation Rules:
  - Accepted interaction changes index by at most 1.
  - Momentum from same gesture ignored while acceptance window closed.
  - Replay key updates on every active step change.

## State Transitions

1. Idle -> Transitioning
- Trigger: accepted vertical interaction.
- Effect: `activeIndex` changes by `+1` or `-1` within `0..9`.

2. Transitioning -> Settled
- Trigger: transition duration completes.
- Effect: step rendering and text replay for new active step.

3. Settled -> Accepting Next Interaction
- Trigger: acceptance window reopens.
- Effect: next interaction may be accepted.

4. Any -> Highlight Mode
- Trigger: `activeIndex=7` (`she-was-not-wrong`).
- Effect: stacked layers fade out; centered highlight text shown.

5. Highlight -> Captioned Resume
- Trigger: move to `activeIndex=8` (`bike`) or back to prior captioned step.
- Effect: captioned layout flow resumes.
