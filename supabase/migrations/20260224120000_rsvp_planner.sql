-- Event Guest Count Planner (RSVP) — run in Supabase SQL editor or via Supabase CLI.
-- App expects these tables when NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set.

create table if not exists public.rsvp_events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  host_token text not null,
  host_name text not null,
  email text not null,
  phone text not null,
  event_name text not null,
  event_type text not null,
  event_date date not null,
  location text not null,
  estimated_guest_count integer not null,
  indoor_outdoor text not null,
  seating_style text not null,
  rental_needs jsonb not null default '[]'::jsonb,
  optional_addition text,
  host_message text not null default '',
  quote_update_requested boolean not null default false,
  quote_update_resolved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.rsvp_guests (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.rsvp_events (id) on delete cascade,
  guest_name text not null,
  guest_email text not null,
  guest_phone text not null,
  status text not null,
  party_size integer not null,
  adults integer not null,
  kids integer not null,
  needs_seat text not null,
  meal_choice text not null default '',
  notes text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists rsvp_guests_event_id_idx on public.rsvp_guests (event_id);
create index if not exists rsvp_events_event_date_idx on public.rsvp_events (event_date);

-- Optional: enable RLS later with policies; the Next.js app uses the service role on the server only.
