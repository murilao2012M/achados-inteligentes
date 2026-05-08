create extension if not exists "pgcrypto";

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  image_url text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text not null default '',
  image_url text not null default '',
  price_label text not null default '',
  current_price text not null default '',
  original_price text not null default '',
  installment_info text not null default '',
  price_badge text not null default '',
  price_note text not null default '',
  benefits jsonb not null default '[]'::jsonb,
  pros jsonb not null default '[]'::jsonb,
  cons jsonb not null default '[]'::jsonb,
  recommended_for text not null default '',
  affiliate_link text not null default '',
  highlight_tag text not null default '',
  editorial_rating numeric(2,1) not null default 0,
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products add column if not exists price_label text not null default '';
alter table public.products add column if not exists current_price text not null default '';
alter table public.products add column if not exists original_price text not null default '';
alter table public.products add column if not exists installment_info text not null default '';
alter table public.products add column if not exists price_badge text not null default '';
alter table public.products add column if not exists price_note text not null default '';

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null default '',
  excerpt text not null default '',
  image_url text not null default '',
  seo_title text not null default '',
  seo_description text not null default '',
  published_at date not null default current_date,
  faq jsonb not null default '[]'::jsonb,
  sections jsonb not null default '[]'::jsonb,
  recommended_product_slugs jsonb not null default '[]'::jsonb,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.comparisons (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null default '',
  product_slugs jsonb not null default '[]'::jsonb,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_categories_updated_at on public.categories;
create trigger set_categories_updated_at
before update on public.categories
for each row execute procedure public.set_updated_at();

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row execute procedure public.set_updated_at();

drop trigger if exists set_posts_updated_at on public.posts;
create trigger set_posts_updated_at
before update on public.posts
for each row execute procedure public.set_updated_at();

drop trigger if exists set_comparisons_updated_at on public.comparisons;
create trigger set_comparisons_updated_at
before update on public.comparisons
for each row execute procedure public.set_updated_at();

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.posts enable row level security;
alter table public.comparisons enable row level security;

drop policy if exists "public can read categories" on public.categories;
create policy "public can read categories"
on public.categories for select
using (true);

drop policy if exists "public can read published products" on public.products;
create policy "public can read published products"
on public.products for select
using (published = true);

drop policy if exists "public can read published posts" on public.posts;
create policy "public can read published posts"
on public.posts for select
using (published = true);

drop policy if exists "public can read published comparisons" on public.comparisons;
create policy "public can read published comparisons"
on public.comparisons for select
using (published = true);

insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;
