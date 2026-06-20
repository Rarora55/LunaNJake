# Data Model: Refresh Story Routes

## Intro Scene State

- **Purpose**: Represents the visible content state of `/:lang/intro` after simplification.
- **Fields**:
  - `lang`: active route language used to resolve intro copy.
  - `continueLabel`: localized accessible label for the existing intro CTA.
  - `marriedPath`: next route target currently passed from route configuration.
  - `isVisible`: whether the retained final intro scene is rendered as visible.
- **Relationships**:
  - Receives route-derived language and next-path values from `storyRoutes.tsx`.
  - Uses intro copy from the shared i18n dictionary.
- **Validation rules**:
  - The rendered state must not expose removed sequence content.
  - The retained scene must still provide a working CTA to the next story route.

## Timeline Marker Point

- **Purpose**: Defines one visible event point in the `/timeline` route.
- **Fields**:
  - `markerId`: stable numeric identifier used by reveal rendering.
  - `threshold`: reveal progress at which the marker becomes visible.
  - `x`, `y`: timeline placement coordinates.
  - `rotation`, `scale`: presentation modifiers for the GIF marker.
  - `labelKey`: dictionary key for the visible event label.
  - `image`: decorative asset associated with the marker content.
  - `position`: whether the content appears above or below the marker.
  - `xOffset`, `yOffset`: manual placement offsets for the grouped content block.
- **Relationships**:
  - Marker geometry comes from `TIMELINE_MARKERS`.
  - Marker content resolves through `TIMELINE_MARKER_CONTENT` plus localized text from `storyText.ts`.
- **Validation rules**:
  - The visible sequence must end on the new "Leaving" point.
  - No visible marker may retain the removed "After Dinner" label.
  - Shared typography rules must apply uniformly to all marker labels.

## RSVP Presentation Layer

- **Purpose**: Encapsulates the visual styling of the RSVP page without changing its interaction or submission behavior.
- **Fields**:
  - `pageBackground`: route-level background treatment.
  - `shellLayout`: width, spacing, border, and content grouping rules.
  - `textStyles`: title, body, label, and status typography.
  - `fieldStyles`: input, fieldset, and radio layout treatment.
  - `buttonStyles`: submit button appearance and disabled state visuals.
- **Relationships**:
  - Wraps the existing `RsvpPage` form state and fetch submission flow.
  - Must remain compatible with the protected-entry navigation state from other pages.
- **Validation rules**:
  - Styling changes must not alter form field names, submit conditions, or request shape.
  - Status messaging and disabled-button behavior must remain intact.

## LunaNJake Return CTA

- **Purpose**: Provides an explicit restart control on the `/LunaNJake` route.
- **Fields**:
  - `label`: accessible CTA label shown or announced to the user.
  - `targetPath`: intro route path provided by route configuration.
  - `visualVariant`: shared button style pattern reused from the site.
  - `interactionStates`: default, hover, focus-visible, and active presentation states.
- **Relationships**:
  - Lives inside `LunaNJakeScene`.
  - Receives its navigation target from the route layer or scene props.
- **Validation rules**:
  - CTA must be pointer- and keyboard-activatable.
  - CTA must route back to intro without disrupting existing wheel/key scene navigation.
