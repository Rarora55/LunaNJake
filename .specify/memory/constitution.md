<!--
Sync Impact Report
- Version change: template -> 1.0.0
- Modified principles:
  - Template Principle 1 -> I. Multilingual-First And Route Integrity (NON-NEGOTIABLE)
  - Template Principle 2 -> II. Config-Driven Story And Scroll Systems
  - Template Principle 3 -> III. Separation Of Concerns By Layer
  - Template Principle 4 -> IV. Stable, Accessible RSVP Experience
  - Template Principle 5 -> V. Secure Supabase Data And Email Pipeline
- Added sections:
  - Technical Boundaries And Architecture Rules
  - Delivery Workflow And Quality Gates
- Removed sections:
  - None
- Templates requiring updates:
  - ? updated: .specify/templates/plan-template.md
  - ? updated: .specify/templates/spec-template.md
  - ? updated: .specify/templates/tasks-template.md
- Follow-up TODOs:
  - None
-->
# Luna & Jake Wedding Website Constitution

## Core Principles

### I. Multilingual-First And Route Integrity (NON-NEGOTIABLE)
English (`en`) and Italian (`it`) support is mandatory from first implementation.
User-facing text MUST come from a central translation dictionary and MUST NOT be
hardcoded in visual components. The root route (`/`) MUST present centered British
and Italian flag selection. Language selection MUST drive all labels, validation,
messages, and route paths, including language-specific routes such as `/en/story`,
`/it/story`, `/en/rsvp`, and `/it/rsvp`.

### II. Config-Driven Story And Scroll Systems
The story sequence is a ten-step static narrative controlled by scroll gestures,
not by continuous document scroll. Scrolling down advances one story step; scrolling
up reverses one step. Story pages and scroll behavior MUST be config-driven so pages
can be reordered, renamed, replaced, added, or removed without rewriting controller
logic. Supported scroll modes are `static`, `vertical`, `horizontal-left`,
`horizontal-right`, and `step-sequence`.

### III. Separation Of Concerns By Layer
Routing, translations, page content, visual components, scroll behavior, animation
controllers, RSVP state, Supabase data access, and Edge Function email logic MUST be
isolated into distinct modules. Components MUST remain focused on rendering and local
interaction, and MUST NOT accumulate unrelated business or data concerns.

### IV. Stable, Accessible RSVP Experience
RSVP exists only at `/en/rsvp` and `/it/rsvp`, and MUST prioritize stability,
accessibility, and mobile usability over animation complexity. RSVP flow MUST include:
attendance, guest full name, companion question, conditional companion name, review
and submit, and success/error feedback. Required fields MUST be validated before
submission; duplicate submission during loading MUST be prevented; success and error
states MUST be explicit and recoverable.

### V. Secure Supabase Data And Email Pipeline
RSVP submissions MUST be persisted in Supabase table `guest_rsvps` with required
fields: `id`, `language`, `attending`, `guest_full_name`, `has_companion`,
`companion_full_name`, `email_sent`, `email_error`, and `created_at`. Frontend code
MUST use only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`; private/service keys
and email provider secrets are forbidden in frontend code. Email notifications MUST be
handled by Supabase Edge Function `send-rsvp-email`, invoked with `rsvp_id` only; the
function MUST fetch RSVP server-side, compose email server-side, update `email_sent`
on success, update `email_error` on failure, and preserve RSVP records regardless of
email outcome.

## Technical Boundaries And Architecture Rules

- Required stack: TypeScript 5.9, React 19, React Router 7, Vite 8, Tailwind CSS 4,
  Motion 12, GSAP, Supabase JS v2, Supabase Edge Functions, Vercel.
- GSAP usage is limited to complex scroll behavior, pinning, timelines, step
  sequences, and advanced horizontal scroll interactions.
- Motion usage is limited to UI transitions, hover/tap behavior, and simple component
  animations.
- GSAP and Motion MUST NOT control the same property on the same element concurrently.
- Pages/sections MUST declare scroll behavior through configuration, never through
  hardcoded logic inside visual components.
- Visual language MUST remain black-and-white and hand-drawn in tone; placeholders are
  acceptable in early phases if architecture remains intact.
- Interactive elements MUST expose visible hover/focus states and keyboard operability.
- Reduced-motion preferences SHOULD be respected where animation is non-essential.

## Delivery Workflow And Quality Gates

- Implementation order is fixed:
  1. Routing and page skeleton.
  2. Translation dictionary.
  3. Language selection page.
  4. Story config and static story pages.
  5. Step-sequence story controller.
  6. Informational pages.
  7. RSVP form without backend.
  8. Supabase RSVP insert.
  9. Supabase Edge Function email invocation.
  10. Visual refinement and animation polish.
- TypeScript types are required for language keys, dictionaries, route params, story
  config, scroll modes, RSVP payloads, and Supabase responses.
- Code MUST favor explicit, simple, testable modules with minimal dependencies and no
  duplicated business logic.
- Definition of done for every feature requires all of the following:
  - Works in both English and Italian.
  - Uses dictionary-driven user-facing copy.
  - Routes correctly by language.
  - Is mobile-stable and keyboard-usable.
  - Preserves separation of concerns.
  - Keeps private keys and secrets out of frontend.
  - Does not regress RSVP flow reliability.
  - Supports safe iteration without rewriting unrelated systems.

## Governance

This constitution is the highest-priority engineering policy for this project.
All plans, specs, tasks, pull requests, and reviews MUST include a constitution
compliance check against these principles and boundaries.

Amendment policy:
- Amendments MUST include rationale, affected sections, migration impact, and
  updates to dependent templates under `.specify/templates/`.
- Versioning policy follows semantic versioning for governance:
  - MAJOR: breaking redefinition/removal of principles or hard constraints.
  - MINOR: new principle/section or materially expanded mandatory guidance.
  - PATCH: wording clarifications without normative behavior change.
- Compliance failures block merge until resolved or explicitly approved with
  documented exception rationale and rollback plan.

**Version**: 1.0.0 | **Ratified**: 2026-05-02 | **Last Amended**: 2026-05-02

