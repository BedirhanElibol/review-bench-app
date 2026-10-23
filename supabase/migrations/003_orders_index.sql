create index orders_created_at_idx on public.orders (created_at);
alter table public.orders add column status text not null default 'pending';
