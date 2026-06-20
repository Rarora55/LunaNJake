create extension if not exists "pgcrypto";

create table if not exists public.rsvp_confirmations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  is_attending boolean not null,
  has_plus_one boolean not null,
  plus_one_name text,
  created_at timestamptz not null default timezone('utc', now()),
  constraint plus_one_name_required_when_has_plus_one
    check (
      (has_plus_one = false and plus_one_name is null)
      or (has_plus_one = true and plus_one_name is not null and btrim(plus_one_name) <> '')
    )
);

alter table public.rsvp_confirmations enable row level security;

create policy "allow_anon_insert_rsvp_confirmations"
on public.rsvp_confirmations
for insert
to anon, authenticated
with check (true);

revoke all on public.rsvp_confirmations from public;
grant insert on public.rsvp_confirmations to anon, authenticated;

