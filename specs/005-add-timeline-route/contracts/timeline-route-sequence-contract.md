# Contract: Timeline Route Sequence, Reveal, and Marker Content

## Route Contract

- Canonical localized timeline route: `/:lang/timeline`
- Supported languages: `en`, `it`
- Ordering requirement:
  - Previous route in story flow: `/:lang/intro`
  - Current route: `/:lang/timeline`
  - Next route: existing downstream story route defined by story configuration

## Interaction Contract

### Scroll-Reveal Mapping

- Input: section scroll progress `p` in `[0, 1]`
- Path reveal state:
  - `strokeDasharray = L`
  - `strokeDashoffset = (1 - p) * L`
  - `L` is the total SVG path length
- Required behavior:
  - Increasing `p` reveals the line from start vertex to end vertex.
  - Decreasing `p` reverses the reveal.
  - No autonomous time-driven line reveal is allowed.

### Marker Visibility Mapping

- Marker count: `7`
- Marker asset: `Images/Timeline/Gabacho2.gif`
- Marker `i` is visible iff `p >= threshold_i`
- Threshold ordering is strictly increasing from marker 1 to marker 7.
- Marker layer renders above the line layer.
- Existing GIF animation remains unchanged by the content-block addition.

### Marker Content Mapping

- Each visible marker resolves one grouped content block by matching `markerId`.
- Required content fields per entry:
  - `markerId`
  - `text` or language-resolved label reference
  - `image`
  - `xOffset`
  - `yOffset`
  - `position` with value `top` or `bottom`
- Required behavior:
  - The image renders above the text inside the same grouped block.
  - Text and image move together as one element.
  - Positioning is derived from marker anchor plus offsets, not from unique CSS rules per marker unless a shared fallback is unavoidable.
  - Top/bottom placement is controlled by the entry's `position` field.

### Localization Mapping

- `/en/timeline` shows the English label set for markers 1 through 7.
- `/it/timeline` shows the Italian label set for the same marker IDs.
- Marker IDs, ordering, images, thresholds, and anchor positions remain the same across languages.
- User-facing marker copy must come from the project's language-aware content source, not hardcoded component strings.

## Layout Contract

- Timeline section uses a sticky full-screen container within a tall parent section.
- Parent height target band: `180vh` to `220vh`.
- Desktop visual target remains a broad horizontal composition.
- Mobile visual target reduces marker and content footprint enough to preserve line legibility.
- Content blocks remain visually near their markers and should not drift into unrelated timeline points.
- Shared top/bottom layout rules may be used, but per-marker manual tuning should happen through offsets in configuration.

## Validation Contract

- Route order remains intro -> timeline for both supported languages.
- Line reveal remains scroll-linked and reversible.
- All seven marker IDs resolve the correct image and localized label pair.
- Updating a content entry's offsets changes the image and text position together.
- Responsive rendering keeps marker content associated with the correct marker on representative desktop and mobile viewports.

## Regression Contract

- `/intro` content and behavior remain functionally unchanged.
- Timeline insertion does not break upward or downward narrative traversal.
- Existing site background style remains unchanged.
- Existing timeline line and GIF marker animation behavior remain intact while content overlays are added.
