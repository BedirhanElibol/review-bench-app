create table public.team_notes (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null,
  author_id uuid not null references auth.users on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create index on public.team_notes (team_id);
