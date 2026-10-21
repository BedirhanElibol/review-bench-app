create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text,
  credits integer not null default 0
);

alter table public.profiles enable row level security;

create policy "Users read their own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users update their own profile" on public.profiles
  for update using (auth.uid() = id);
