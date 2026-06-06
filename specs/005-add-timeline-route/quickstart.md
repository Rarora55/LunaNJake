# Quickstart: Add Timeline Route

## Goal

Keep the localized `/timeline` story section immediately after `/intro`, preserve the existing scroll-driven SVG line and GIF marker behavior, and add localized image-plus-label content blocks for each marker through one reusable configuration source.

## Steps

1. Verify story route sequencing still places `/:lang/timeline` directly after `/:lang/intro` in the shared route and story sequence configuration.
2. Keep `src/routes/TimeLine.tsx` as the route entry point and preserve the current line reveal and GIF marker animation behavior.
3. Introduce or extend a shared timeline configuration model so each marker content entry contains:
   - `markerId`
   - localized text source for English and Italian
   - image asset reference
   - `xOffset`
   - `yOffset`
   - `position` set to `top` or `bottom`
4. Bind marker content blocks to the existing marker definitions by `markerId` rather than duplicating anchor positions in multiple places.
5. Render each content block as one grouped overlay:
   - image above text
   - top/bottom placement from configuration
   - offsets applied to the whole group
6. Keep user-facing marker labels sourced from the existing language-aware copy layer so `/en/timeline` and `/it/timeline` show different labels while keeping the same marker order and images.
7. Add responsive tuning:
   - reduce image and text footprint on mobile
   - keep the block visually attached to its marker
   - avoid forcing per-marker CSS positioning rules where shared layout plus offsets is sufficient
8. Validate behavior:
   - downward scroll reveals the line and markers progressively
   - upward scroll reverses the reveal
   - each marker shows the correct image/label pair
   - image and text move together when offsets change
   - intro behavior and route order remain intact

## Validation Checklist

- Route order `intro -> timeline` is correct for both `en` and `it`.
- Timeline reveal remains scroll-linked and not autoplayed.
- Seven GIF markers still align to the line and use progressive thresholds.
- Each marker ID resolves the correct image and localized label pair.
- Marker content image renders above its text.
- Changing `xOffset` or `yOffset` repositions the full marker content block together.
- Mobile and desktop keep marker content visually associated with the correct marker.
- Existing story flow and surrounding routes are not broken.
