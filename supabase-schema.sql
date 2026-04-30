create table public.feedback_entries (
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

create policy "Visitors can submit feedback"
on public.feedback_entries
for insert
to anon
with check (message is not null and length(trim(message)) > 0);

create policy "Authenticated admins can read feedback"
on public.feedback_entries
for select
to authenticated
using (true);
