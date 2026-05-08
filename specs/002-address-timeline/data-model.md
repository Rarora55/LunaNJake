# Data Model: Address Route Timeline Transition

## Entity: TransitionPhaseWindow

- Purpose: Defines deterministic scroll windows for each transition phase.
- Fields:
  - `id` (string, unique): phase identifier (`scatter-exit`, `address-reveal`, `line-growth`).
  - `startProgress` (number, range `0..1`): phase activation start.
  - `endProgress` (number, range `0..1`, >= start): phase completion end.
- Validation Rules:
  - All windows must be ordered and non-overlapping or intentionally contiguous.
  - Every phase window must remain valid in forward and reverse scroll.

## Entity: ExitActor

- Purpose: Represents one visible element leaving `/she-said-yes` during scatter transition.
- Fields:
  - `id` (string, unique): actor key.
  - `directionVector` (enum/vector): random target direction (left/right/top/bottom/diagonal).
  - `jitterProfile` (object): irregular offset/rotation jump parameters.
  - `staggerOffset` (number): delay offset within phase window.
- Validation Rules:
  - Each actor must resolve a direction distinct enough to avoid uniform exits.
  - Reduced-motion mode must map actor motion to low-amplitude alternative profile.

## Entity: TimelineLineState

- Purpose: Tracks shared vertical line continuity from transition anchor into `/address` route.
- Fields:
  - `anchorId` (string): logical center anchor at address block.
  - `progress` (number, range `0..1`): revealed portion of current segment.
  - `isContinuous` (boolean): continuity across route handoff.
- Validation Rules:
  - Progress is monotonic with scroll direction and reversible when scrolling back.
  - Route handoff must not reset visible line unexpectedly.

## Entity: TimelineItemConfig

- Purpose: Config-driven description of one timeline item.
- Fields:
  - `id` (string, unique)
  - `revealProgress` (number, range `0..1`): normalized reveal anchor.
  - `markerAsset` (string): garabato media path.
  - `cardSide` (enum): `left` | `right`.
  - `cardIconAsset` (string): card icon/image path.
  - `textKey` (string): dictionary key for item label.
- Validation Rules:
  - Initial ordering must maintain right-left-right card layout for first three items.
  - `revealProgress` values must increase with timeline order.
  - Text must resolve for both `en` and `it` locales.

## Entity: TimelineItemRenderState

- Purpose: Runtime state for each timeline item visibility and fallback status.
- Fields:
  - `itemId` (string, FK -> TimelineItemConfig.id)
  - `isVisible` (boolean)
  - `mediaStatus` (enum): `ready` | `loading` | `failed`
  - `fallbackVisible` (boolean)
- Validation Rules:
  - If `mediaStatus=failed`, `fallbackVisible` must be true and text must remain visible.
  - Visibility must remain reversible with scroll progress.

## State Transitions

1. `scatter-exit` inactive -> active
- Trigger: scroll enters phase start window.
- Effect: exit actors begin staggered, jittered outbound movement.

2. `scatter-exit` active -> `address-reveal` active
- Trigger: scroll reaches reveal window.
- Effect: centered `CasaBoda` and address text appear.

3. `address-reveal` active -> `line-growth` active
- Trigger: scroll enters line-growth window.
- Effect: vertical line grows downward from shared anchor.

4. Transition route handoff -> `/address` timeline continuation
- Trigger: user crosses route boundary while line-growth in progress.
- Effect: line state persists conceptually; items reveal by normalized progress.

5. Item media failure
- Trigger: marker/icon load failure.
- Effect: show placeholder visual; retain readable timeline text.

6. Reduced-motion mode toggle
- Trigger: reduced-motion preference detected.
- Effect: substitute low-motion animation profile while keeping phase order and reveal logic unchanged.
