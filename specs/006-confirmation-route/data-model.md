# Data Model: Confirmation Route

## Entity: Confirmation Route Content

- **Purpose**: Defines the localized user-facing content and layout expectations for the confirmation section.
- **Fields**:
  - `lang`: `en | it`
  - `title`: localized section title
  - `body`: localized RSVP and guidance message
  - `textAlignment`: fixed value `left`
  - `sectionMode`: fixed value `static`
  - `accentColor`: fixed value `#4C77E6`
  - `titleFontStack`: fixed script-style font stack
  - `imageAssetId`: reference to the selected confirmation media asset
- **Validation Rules**:
  - `title` and `body` must exist for both supported languages.
  - `body` must preserve the RSVP deadline meaning in both languages.
  - `textAlignment` must remain `left` inside the left column.
  - `sectionMode` must remain `static`.
- **Relationships**:
  - References exactly one `Confirmation Media Asset`.
  - Is rendered by exactly one localized confirmation route per language.

## Entity: Confirmation Media Asset

- **Purpose**: Identifies the single approved image used in the confirmation section.
- **Fields**:
  - `assetId`: stable identifier for the chosen image
  - `sourcePath`: asset path within the approved confirmation image set
  - `altStrategy`: decorative or descriptive handling chosen for accessibility
  - `sharedAcrossLangs`: fixed boolean `true`
  - `sharedAcrossViewports`: fixed boolean `true`
- **Validation Rules**:
  - Exactly one asset is selected for this release.
  - The asset must render within desktop and mobile layouts without overflow.
  - The asset must remain visually paired with the confirmation copy block.
- **Relationships**:
  - Is referenced by `Confirmation Route Content`.

## Entity: Confirmation Route Linkage

- **Purpose**: Defines where confirmation sits in the localized route flow.
- **Fields**:
  - `lang`: `en | it`
  - `routePath`: `/:lang/confirmation`
  - `previousPath`: localized recommendation path
  - `nextPath`: localized questions path
  - `fallbackPath`: English confirmation fallback path if a non-localized alias is added
- **Validation Rules**:
  - `previousPath` must resolve to the localized recommendation route.
  - `nextPath` must resolve to the localized questions route.
  - Forward and backward navigation must remain symmetrical for both languages.
- **Relationships**:
  - Connects confirmation to the existing story/info route sequence.

## State Notes

- Confirmation has no persisted state, submission lifecycle, or multi-step internal state machine.
- The only transient state expected at runtime is the route-entry visibility state used to trigger the soft fade-in.
