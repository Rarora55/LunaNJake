# Quickstart: Address Route Timeline Transition

## Prerequisites

- Frontend dependencies installed.
- Story routes and she-said-yes scenes available for both locales.
- Timeline/media assets available under `/images/TimeLine/*`.

## Run Locally

1. Start frontend dev server.
2. Open `/en/she-said-yes` and `/it/she-said-yes`.
3. Scroll forward through transition into `/address`.

## Manual Validation Checklist

1. Transition phase sequencing
- Confirm phase windows execute in order: scatter exit -> address reveal -> line growth.
- Confirm behavior reverses consistently when scrolling back up.

2. Exit motion style
- Confirm visible actors exit in mixed directions.
- Confirm movement feels imperfect/handmade (stagger, jumps, slight rotation offsets).

3. Address reveal
- Confirm `CasaBoda` centers in viewport.
- Confirm address text appears below with fade.

4. Timeline line continuity
- Confirm black vertical line starts at address center anchor.
- Confirm line continues into `/address` without visible reset.

5. Timeline item content and sides
- Item 1: right card, `Bus.png`, `11am Shuttle Bus`.
- Item 2: left card, `Copas.png`, `Ceremony and Reception`.
- Item 3: right card, `breakfast`, `TBA Post-Wedding Brunch`.
- Confirm each garabato marker is centered and crossed by the line.

6. Fallback and reduced motion
- Simulate media failure and confirm text + placeholder remain visible.
- Enable reduced-motion preference and confirm minimal-motion variant preserves reveal order.

7. Responsiveness
- Validate desktop and mobile readability.
- Confirm compact card sizing without excessive whitespace.

## Suggested Automated Tests

- Unit: transition phase window validation (ordered, bounded, reversible mapping).
- Unit: timeline item config validation (normalized progress, side alternation for initial items).
- Integration: `/she-said-yes` -> `/address` forward transition with line continuity.
- Integration: backward scroll reversibility across route boundary.
- Integration: media failure fallback renders text + placeholder.
- Integration: reduced-motion variant preserves sequence and accessibility.

## Automated Validation Results

- Date: 2026-05-08
- Command: `npm.cmd test` (frontend)
- Result: PASS
- Summary: 16 test files passed, 34 tests passed, 0 failed.
