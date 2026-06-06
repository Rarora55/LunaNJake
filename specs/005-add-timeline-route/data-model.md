# Data Model: Add Timeline Route

## Overview

This feature does not add persistent storage. It extends the timeline UI model with localized marker-content configuration that stays attached to the existing animated marker system.

## Entities

### 1. TimelineRoutePlacement
- Purpose: Defines timeline adjacency in localized story progression.
- Fields:
  - `language`: `en | it`
  - `previousRoute`: localized intro route
  - `currentRoute`: localized timeline route
  - `nextRoute`: existing downstream story route, if present
- Rules:
  - Timeline must be the immediate successor of intro for both languages.
  - Reverse traversal from timeline must return to intro.

### 2. TimelinePathModel
- Purpose: Represents the hand-drawn SVG line and scroll-driven reveal mapping.
- Fields:
  - `pathD`: SVG path definition for the irregular horizontal line
  - `pathLength`: computed total path length
  - `progress`: normalized reveal progress in `[0..1]`
  - `dashArray`: equal to `pathLength`
  - `dashOffset`: `(1 - progress) * pathLength`
- Rules:
  - `progress` is driven only by timeline section scroll progress.
  - Reveal direction follows path order from left to right.
  - Upward scroll reduces `progress` and reverses reveal naturally.

### 3. TimelineMarker
- Purpose: Represents one animated GIF marker anchored above the line.
- Fields:
  - `id`: stable identifier `1..7`
  - `anchorX`: normalized horizontal anchor in shared timeline coordinate space
  - `anchorY`: normalized vertical anchor in shared timeline coordinate space
  - `revealThreshold`: normalized progress threshold where marker becomes visible
  - `rotationDeg`: slight per-marker visual variation
  - `scale`: per-marker scale variation
- Rules:
  - Exactly seven markers are rendered.
  - Marker visibility is true when `progress >= revealThreshold`.
  - Marker visibility reverses when progress falls below threshold.
  - Marker layer remains above the line layer.

### 4. TimelineMarkerContent
- Purpose: Defines the grouped image-plus-label block associated with a marker.
- Fields:
  - `markerId`: references `TimelineMarker.id`
  - `imageAsset`: image used above the label
  - `labelKey` or equivalent language-aware label reference: resolves localized text for `en` and `it`
  - `position`: `top | bottom`
  - `xOffset`: manual horizontal adjustment relative to marker anchor
  - `yOffset`: manual vertical adjustment relative to marker anchor
- Rules:
  - There is exactly one content entry for each of the seven marker IDs.
  - `markerId` must match an existing `TimelineMarker.id`.
  - Image and text are rendered as one grouped block and move together.
  - Offsets are the primary per-marker tuning mechanism.
  - The content block is placed above or below its marker according to `position`.

### 5. TimelineMarkerContentPresentation
- Purpose: Represents the responsive resolved view state of a marker content block.
- Fields:
  - `markerId`: linked marker/content identifier
  - `isVisible`: content visibility, usually aligned with marker visibility
  - `resolvedLabel`: localized text for the active route language
  - `resolvedX`: anchor plus horizontal offset
  - `resolvedY`: anchor plus vertical offset
  - `imageScaleVariant`: desktop or mobile presentation size
  - `textScaleVariant`: desktop or mobile presentation size
- Rules:
  - Content becomes visible with its associated marker unless explicitly hidden by layout safeguards.
  - Mobile presentation uses reduced image/text footprint while preserving marker association.
  - Resolved position must remain visually near the marker and inside practical viewport bounds.

## Relationships

- `TimelineRoutePlacement` governs where the timeline scene appears in each localized story flow.
- `TimelinePathModel` provides the reveal progress used by `TimelineMarker`.
- `TimelineMarkerContent` references `TimelineMarker` by `markerId`.
- `TimelineMarkerContentPresentation` combines marker anchor data, content configuration, active language, and responsive rules.

## Validation Rules

- Marker IDs are unique and sequential enough to map the seven required events deterministically.
- Each required event has one configured image and one localized label mapping.
- The same marker ID uses the same image asset and order across languages.
- Offsets can be edited without changing marker anchor definitions or writing per-marker CSS selectors.
- Localized labels are resolved from the active route language and not from hardcoded component strings.

## State Transitions

- `SectionEnter` -> attach scroll progress observer and resolve active language context.
- `ScrollDown` -> increase `progress` -> reveal more path -> show eligible markers -> show associated content blocks.
- `ScrollUp` -> decrease `progress` -> hide markers above threshold -> hide associated content blocks.
- `ViewportChange` -> recompute responsive presentation scale and resolved content positions.
- `LanguageChange` -> keep the same marker IDs, anchors, images, and order while resolving different labels.
- `SectionLeave` -> presentation state can be discarded and recomputed from current scroll and language on re-entry.
