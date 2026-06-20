# Data Model: Intro Reference Layout

## Overview

This feature is primarily presentational and does not introduce persisted domain data. The only modeled runtime state is the intro scene composition and the countdown values rendered within it.

## Entities

### IntroComposition

- **Purpose**: Represents the stable visual structure of the `/intro` scene.
- **Fields**:
  - `titleArtwork`: existing title image asset displayed in the left content group
  - `continueCta`: existing localized navigation control leading to the next route
  - `dateArtwork`: provided `Monday.png` asset shown beneath the CTA
  - `countdown`: four-part remaining-time display placed beneath the date artwork
  - `ringsArtwork`: existing rings image displayed in the right content group
  - `venueArtwork`: existing venue/details image displayed beneath the rings
  - `bottomLeftHerbs`: existing decorative herb cluster
  - `topRightHerbs`: duplicated decorative herb cluster
- **Relationships**:
  - Owns one `CountdownDisplay`
  - References two `HerbCluster` instances
- **Validation rules**:
  - Left-column content must preserve vertical order: title, CTA, date artwork, countdown
  - Right-column content must preserve grouping: rings artwork above venue artwork
  - Decorative herb clusters must not obstruct interactive or informational content

### CountdownDisplay

- **Purpose**: Represents the time remaining until the target event date.
- **Fields**:
  - `targetDate`: Monday, 31 May 2027
  - `days`: non-negative integer display value
  - `hours`: integer from 0 to 23
  - `minutes`: integer from 0 to 59
  - `seconds`: integer from 0 to 59
  - `labels`: visible unit labels for each segment
- **Relationships**:
  - Belongs to one `IntroComposition`
- **Validation rules**:
  - Values must never render as negative
  - Values must remain readable and non-overlapping across supported breakpoints
  - Display order must remain days, hours, minutes, seconds
- **State transitions**:
  - `active`: target date is in the future and values decrement every second
  - `complete`: target date has passed and values clamp at zero without layout changes

### HerbCluster

- **Purpose**: Represents a decorative floral/herb illustration anchored to the intro composition.
- **Fields**:
  - `anchor`: corner placement relative to the intro composition container
  - `assetSet`: existing herb image pieces used to render the cluster
  - `orientation`: default, mirrored, rotated, or combined transform used to match the visual reference
  - `opacity`: subdued decorative intensity
  - `contentExclusion`: required safe area that prevents overlap with main content
- **Relationships**:
  - Two instances belong to one `IntroComposition`
- **Validation rules**:
  - Must remain visually secondary
  - Must stay partially within the viewport/composition bounds
  - Must not interfere with CTA focus, rings art, title, date artwork, countdown, or venue details
