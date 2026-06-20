# Luna & Jake Frontend

## Vercel deployment

This app deploys to Vercel as a static Vite SPA.

Project settings:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Required Vercel environment variables:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_RSVP_EMAIL_NOTIFICATIONS_ENABLED=false
```

Notes:

1. `vercel.json` rewrites client-side routes like `/en/intro` and `/it/rsvp` to `index.html`, so React Router can resolve them.
2. `VITE_RSVP_EMAIL_NOTIFICATIONS_ENABLED` is optional. Leave it `false` unless the Supabase Edge Function is deployed.
3. Vercel should use Node `20.19+` because the project builds with Vite 8.

## RSVP Supabase setup

The RSVP form saves submissions into Supabase. Email notifications are optional and can be enabled later with a Supabase Edge Function.

### Frontend environment

Create a local `.env` file from `.env.example`:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_RSVP_EMAIL_NOTIFICATIONS_ENABLED=false
```

### Database migration

Apply:

`supabase/migrations/20260617_create_rsvp_confirmations.sql`

This creates `public.rsvp_confirmations` with the required fields and an anonymous insert policy for the frontend.

### Optional Edge Function

Deploy:

`supabase/functions/rsvp-confirmation-email/index.ts`

Required Supabase Edge Function secrets:

```bash
RESEND_API_KEY=your-resend-api-key
RSVP_FROM_EMAIL=no-reply@your-domain.com
RSVP_NOTIFICATION_EMAIL=ramwill1991@gmail.com
```

The email subject is:

`New RSVP Confirmation - Luna & Jake Wedding`

The frontend flow is:

1. Insert RSVP into `rsvp_confirmations`
2. If `VITE_RSVP_EMAIL_NOTIFICATIONS_ENABLED=true`, invoke the `rsvp-confirmation-email` Edge Function
3. Show success or error feedback in the form
