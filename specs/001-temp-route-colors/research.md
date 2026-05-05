# Research: Story Slide Stack (Constitution-Aligned)

## Decision 1: Keep non-spring tween transitions

- Decision: Use short-duration tween transitions with `easeOut`-style profile for step movement.
- Rationale: Preserves fast-start/hard-stop feel and avoids spring bounce.
- Alternatives considered:
  - Spring transitions: rejected due to overshoot/bounce risk.
  - Linear transitions: rejected due to weaker perceived snap.

## Decision 2: Enforce one accepted interaction equals one step change

- Decision: Gate interactions so each accepted wheel/touch/keyboard action advances or reverses by at most one step.
- Rationale: Prevents momentum-induced skips and preserves narrative pacing.
- Alternatives considered:
  - Delta accumulation with jumps: rejected due to pacing inconsistency.

## Decision 3: Model step 8 as transient highlight

- Decision: Treat `she-was-not-wrong` (step 8) as a `highlight` display mode that fades stacked placeholders and centers text.
- Rationale: Matches narrative emphasis while still allowing progression to steps 9 and 10.
- Alternatives considered:
  - Terminal text-only ending at step 8: rejected because sequence must continue.
  - No highlight mode: rejected because spec requires distinct beat.

## Decision 4: Resume captioned flow at steps 9 and 10

- Decision: After leaving step 8, normal captioned slideshow rendering resumes for `bike` and `pum`.
- Rationale: Aligns constitution ten-step sequence with continued navigation behavior.
- Alternatives considered:
  - Persist text-only mode after step 8: rejected as incompatible with continuation requirement.

## Decision 5: Require dictionary-backed story text

- Decision: Story step text is sourced from translation dictionaries for both `en` and `it` and referenced by keys in sequence config.
- Rationale: Satisfies constitution requirement against hardcoded user-facing copy.
- Alternatives considered:
  - Inline copy in component/sequence constants: rejected for localization and governance non-compliance.
