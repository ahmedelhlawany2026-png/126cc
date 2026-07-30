-- Vision Group — Supabase schema
-- Run this in the Supabase SQL editor of a new project.

create extension if not exists "uuid-ossp";

create table companies (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,           -- 'bio-vision' | 'home-vision' | 'vec'
  name_ar text not null,
  name_en text not null,
  tagline_ar text,
  tagline_en text,
  accent_color text,
  created_at timestamptz default now()
);

create table services (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  title_ar text not null,
  title_en text not null,
  description_ar text,
  description_en text,
  icon text,
  sort_order int default 0
);

create table categories (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  name_ar text not null,
  name_en text not null
);

create table projects (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  category_id uuid references categories(id),
  title_ar text not null,
  title_en text not null,
  description_ar text,
  description_en text,
  location text,
  area_sqm numeric,
  year int,
  cover_image_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table project_images (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete cascade,
  image_url text not null,
  sort_order int default 0
);

create table gallery (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id),
  image_url text not null,
  caption_ar text,
  caption_en text,
  sort_order int default 0
);

create table clients (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  logo_url text,
  sort_order int default 0
);

create table testimonials (
  id uuid primary key default uuid_generate_v4(),
  client_name text not null,
  company_id uuid references companies(id),
  color_tag text default 'ink', -- 'secondary' | 'primary' | 'ink' — matches the brand accent shown next to the quote
  role_ar text,
  role_en text,
  quote_ar text,
  quote_en text,
  rating int default 5,
  sort_order int default 0
);

create table faqs (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id),
  question_ar text not null,
  question_en text not null,
  answer_ar text not null,
  answer_en text not null,
  sort_order int default 0
);

create table timeline (
  id uuid primary key default uuid_generate_v4(),
  year text,
  tag_ar text,
  tag_en text,
  title_ar text not null,
  title_en text not null,
  description_ar text,
  description_en text,
  sort_order int default 0
);

create table statistics (
  id uuid primary key default uuid_generate_v4(),
  label_ar text not null,
  label_en text not null,
  value numeric not null,
  prefix text default '',
  suffix text default '',
  sort_order int default 0
);

create table departments (
  id uuid primary key default uuid_generate_v4(),
  name_ar text not null,
  name_en text not null,
  description_ar text,
  description_en text,
  icon text,
  sort_order int default 0
);

create table employees (
  id uuid primary key default uuid_generate_v4(),
  department_id uuid references departments(id) on delete cascade,
  name_ar text not null,
  name_en text not null,
  role_ar text not null,
  role_en text not null,
  photo_url text,
  sort_order int default 0
);

create table settings (
  key text primary key,
  value jsonb not null
);

create table translations (
  id uuid primary key default uuid_generate_v4(),
  namespace text not null,
  key text not null,
  value_ar text,
  value_en text,
  unique (namespace, key)
);

create table contact_requests (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  phone text,
  email text,
  interest text,
  message text,
  status text default 'new',
  created_at timestamptz default now()
);

create table messages (
  id uuid primary key default uuid_generate_v4(),
  contact_request_id uuid references contact_requests(id) on delete cascade,
  body text not null,
  created_at timestamptz default now()
);

create table seo (
  id uuid primary key default uuid_generate_v4(),
  path text unique not null,
  meta_title_ar text,
  meta_title_en text,
  meta_description_ar text,
  meta_description_en text,
  og_image_url text
);

create table media (
  id uuid primary key default uuid_generate_v4(),
  url text not null,
  alt_ar text,
  alt_en text,
  type text default 'image',
  created_at timestamptz default now()
);

-- Row Level Security: public can read; only logged-in admins (any authenticated
-- Supabase user) can write. Create admin users in Supabase Auth (Authentication
-- tab) — every authenticated user is treated as an admin in this starter setup.
alter table companies enable row level security;
alter table services enable row level security;
alter table categories enable row level security;
alter table projects enable row level security;
alter table project_images enable row level security;
alter table gallery enable row level security;
alter table clients enable row level security;
alter table testimonials enable row level security;
alter table faqs enable row level security;
alter table timeline enable row level security;
alter table statistics enable row level security;
alter table departments enable row level security;
alter table employees enable row level security;
alter table settings enable row level security;
alter table translations enable row level security;
alter table seo enable row level security;
alter table media enable row level security;
alter table contact_requests enable row level security;
alter table messages enable row level security;

do $$
declare
  t text;
  public_tables text[] := array['companies','services','categories','projects','project_images','gallery',
    'clients','testimonials','faqs','timeline','statistics','departments','employees','settings',
    'translations','seo','media'];
begin
  foreach t in array public_tables loop
    execute format('create policy "Public read %1$s" on %1$s for select using (true)', t);
    execute format('create policy "Admin write %1$s" on %1$s for insert to authenticated with check (true)', t);
    execute format('create policy "Admin update %1$s" on %1$s for update to authenticated using (true)', t);
    execute format('create policy "Admin delete %1$s" on %1$s for delete to authenticated using (true)', t);
  end loop;
end $$;

-- Contact requests: anyone can submit, only admins can read/manage
create policy "Public insert contact_requests" on contact_requests for insert with check (true);
create policy "Admin read contact_requests" on contact_requests for select to authenticated using (true);
create policy "Admin update contact_requests" on contact_requests for update to authenticated using (true);
create policy "Admin read messages" on messages for select to authenticated using (true);
create policy "Admin write messages" on messages for insert to authenticated with check (true);

-- Storage: create a public bucket named "media" in the Supabase dashboard
-- (Storage tab) for project/gallery/team photos uploaded from the admin panel.
-- Suggested policies once the bucket exists:
--   Public read:  bucket_id = 'media'  (select, for anon + authenticated)
--   Admin write:  bucket_id = 'media'  (insert/update/delete, for authenticated only)

-- Seed the three companies
insert into companies (slug, name_ar, name_en, tagline_ar, tagline_en, accent_color) values
  ('bio-vision', 'بايو فيجن', 'Bio Vision', 'تجهيز طبي', 'Medical Fit-Out', '#525150'),
  ('home-vision', 'هوم فيجن', 'Home Vision', 'تشطيب سكني', 'Residential Fit-Out', '#AD2F28'),
  ('vec', 'VEC', 'VEC', 'استشارات هندسية', 'Engineering Consultancy', '#2F2F2F');
