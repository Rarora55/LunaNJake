# Data Model: Mobile Scale and Scroll Parity

## Entity: RouteScopeProfile

- Purpose: Declares which routes/components are in scope for this feature.
- Attributes:
  - `scope_type`: story-routes-and-shared-shell
  - `locales`: en, it
  - `includes`: localized story routes, shared story shell/layout components
  - `excludes`: non-story routes
- Validation Rules:
  - Must include both locales.
  - Must not include RSVP or non-story pages.

## Entity: ViewportProfile

- Purpose: Defines viewport coverage and evaluation bands.
- Attributes:
  - `primary_width_min_px`: 320
  - `primary_width_max_px`: 430
  - `orientation`: portrait-primary
  - `outside_band_policy`: graceful
- Validation Rules:
  - Primary range must be contiguous and ordered.
  - Outside-band policy must be explicitly defined.

## Entity: MobileScaleProfile

- Purpose: Captures proportional scaling behavior expectations on mobile.
- Attributes:
  - `typography_scaling`: responsive constrained
  - `spacing_scaling`: responsive constrained
  - `media_scaling`: responsive constrained
  - `decorative_asset_scaling`: responsive constrained
  - `overflow_policy`: no-horizontal-overflow
  - `hierarchy_parity`: required
- Validation Rules:
  - Critical content must remain fully visible in primary viewport band.
  - Primary/secondary visual hierarchy must match desktop intent.

## Entity: ScrollBehaviorProfile

- Purpose: Defines mobile touch-scroll behavior constraints.
- Attributes:
  - `progression_feel`: smooth-controllable
  - `snap_policy`: conditional-soften-or-disable
  - `max_effort_policy`: no-repeated-corrective-swipes
  - `blocking_state_policy`: forbidden
- Validation Rules:
  - No scroll lock, frozen progression, or persistent jump loop.
  - Snap behavior must retain progression clarity where retained.

## Entity: AnimationProfile

- Purpose: Distinguishes default mobile animation behavior from reduced-motion behavior.
- Attributes:
  - `default_mobile_profile`: softened
  - `reduced_motion_profile`: strongly-simplified
  - `desktop_profile_change`: none-by-default
- Validation Rules:
  - Reduced-motion profile must activate only when user preference is enabled.
  - Desktop behavior remains unchanged unless explicit shared fix is documented.

## Entity: ValidationRun

- Purpose: Defines completion signals for acceptance.
- Attributes:
  - `mobile_route_coverage`: all in-scope localized story routes and shared shell components
  - `desktop_regression_check`: required
  - `critical_visibility_pass_rate`: 100%
  - `balanced_section_target`: 90%
  - `high_effort_swipe_threshold`: <=5% attempts
- Validation Rules:
  - Must include forward and reverse traversal checks.
  - Must include reduced-motion verification path.