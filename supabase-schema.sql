create table if not exists public.feedback_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  phone text,
  district text,
  message text not null,
  source text not null default 'nfc_or_web',
  status text not null default 'new',
  follow_up_notes text,
  contacted_at timestamptz
);

alter table public.feedback_entries enable row level security;

drop policy if exists "Visitors can submit feedback" on public.feedback_entries;
create policy "Visitors can submit feedback"
on public.feedback_entries
for insert
to anon
with check (message is not null and length(trim(message)) > 0);

drop policy if exists "Authenticated admins can read feedback" on public.feedback_entries;
create policy "Authenticated admins can read feedback"
on public.feedback_entries
for select
to authenticated
using (true);

create table if not exists public.guide_numbers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  languages text[] not null default array[]::text[],
  intentions text[] not null default array[]::text[],
  is_active boolean not null default true
);

alter table public.guide_numbers enable row level security;

drop policy if exists "Visitors can read active guide numbers" on public.guide_numbers;
create policy "Visitors can read active guide numbers"
on public.guide_numbers
for select
to anon
using (is_active = true);

drop policy if exists "Authenticated admins can read guide numbers" on public.guide_numbers;
create policy "Authenticated admins can read guide numbers"
on public.guide_numbers
for select
to authenticated
using (true);

drop policy if exists "Authenticated admins can insert guide numbers" on public.guide_numbers;
create policy "Authenticated admins can insert guide numbers"
on public.guide_numbers
for insert
to authenticated
with check (
  length(trim(name)) > 0
  and length(trim(phone)) > 0
  and array_length(languages, 1) > 0
  and array_length(intentions, 1) > 0
);

drop policy if exists "Authenticated admins can update guide numbers" on public.guide_numbers;
create policy "Authenticated admins can update guide numbers"
on public.guide_numbers
for update
to authenticated
using (true)
with check (
  length(trim(name)) > 0
  and length(trim(phone)) > 0
  and array_length(languages, 1) > 0
  and array_length(intentions, 1) > 0
);

drop policy if exists "Authenticated admins can delete guide numbers" on public.guide_numbers;
create policy "Authenticated admins can delete guide numbers"
on public.guide_numbers
for delete
to authenticated
using (true);
