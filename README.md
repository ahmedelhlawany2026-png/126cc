# Vision Group

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion, bilingual (AR/EN, RTL/LTR).

## What's in this first version

- `app/page.tsx` — home page (hero with 3 company cards, about, timeline, sectors, animated counters, clients marquee, expansion diagram, closing tiles)
- `app/team/page.tsx` — organizational structure + departments + filterable team members
- `app/contact/page.tsx` — contact form (wired to Supabase `contact_requests` table), map embed, WhatsApp/call/email links
- `components/LanguageProvider.tsx` — AR/EN + RTL/LTR context, no reload
- `supabase/schema.sql` — full database schema (companies, projects, gallery, faqs, timeline, statistics, departments, employees, contact_requests, seo, media, etc.), including RLS policies and seed data for the three companies
- `lib/supabase.ts` — Supabase client (reads from env vars)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Connect Supabase

1. Create a project at supabase.com
2. Run `supabase/schema.sql` in the SQL editor
3. Copy `.env.example` to `.env.local` and fill in your project URL + anon key
4. Restart `npm run dev`

## Deploy

Push to GitHub, then import the repo on vercel.com. Add the same environment variables in the Vercel project settings.

## SEO

- Per-page metadata (title, description, canonical, Open Graph, Twitter card) — see each `page.tsx`
- JSON-LD structured data: `Organization` on the homepage, and `MedicalBusiness` / `HomeAndConstructionBusiness` / `ProfessionalService` on each company page
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt` automatically
- **Important:** `metadataBase` in `app/layout.tsx` and the URLs in `sitemap.ts` / `robots.ts` currently use a placeholder domain (`https://www.visiongroup-eg.com`) — update all three once you have the real domain.

## Supabase data wiring

These sections now fetch from Supabase first and silently fall back to the original design content if the database isn't connected yet or a table is empty — nothing breaks either way:

- **Homepage:** Statistics (Numbers), Clients (logo wall), Timeline, Testimonials
- **Bio Vision / Home Vision / VEC pages:** FAQs and Testimonials (both filtered by company via `companies.slug`)

`lib/queries.ts` has one `get*` function per table, each taking a `fallback` argument. To go live, just seed the relevant Supabase table (see `supabase/schema.sql`) — no code changes needed. The admin panel (see below) is the easiest way to seed and edit this data day-to-day.

**Not yet wired:** the Team page's departments/employees are still hard-coded in `TeamPageClient.tsx`, even though you can now manage departments and employees from `/admin/team`. The public Team page's filter buttons use fixed keys (`eng`/`mkt`/`fin`) rather than real department IDs — connecting them is a small follow-up (swap the hard-coded filter list for the department list fetched from Supabase).

## Admin Panel

A password-protected admin panel lives at `/admin`, built on **Supabase Auth**.

**Setup:**
1. In your Supabase project, go to **Authentication → Users** and manually create one or more admin users (email + password). There is no public sign-up screen by design — only people you add in Supabase can log in.
2. In **Storage**, create a public bucket named `media` (used for project/gallery photo uploads). Suggested policies: public `select`, authenticated-only `insert`/`update`/`delete`.
3. Visit `/admin/login` and sign in with the user you created.

**What you can manage:**
- **Statistics** — the homepage's animated counters
- **Clients** — the logo marquee
- **Timeline** — the "Our Journey" section
- **Testimonials** — client quotes shown on the homepage and each company page (pick a company + accent colour per quote)
- **FAQs** — per company
- **Team** — departments and employees
- **Projects** — project details plus a drag-and-drop image manager (upload, reorder, delete) per project, backed by Supabase Storage
- **Contact requests** — messages submitted through the public Contact form

Every admin list follows the same pattern: click a row to edit inline, "+ إضافة عنصر جديد" to add, "حذف" to delete. All of this is protected by `middleware.ts`, which redirects anyone without a valid Supabase session straight to `/admin/login`.

**Note:** the admin panel treats *any* authenticated Supabase user as an admin (see the RLS policies in `supabase/schema.sql`) — there's no separate role system yet. Only create Supabase Auth users you actually trust with full edit access.

## Not yet built (next phases)

- Deploying to Vercel (the project is deploy-ready; see the Deploy section above)
- A distinct admin "role" system, if you ever need to give someone limited access (e.g. content-only, no delete)
- Drag-and-drop reordering for entities other than project images (statistics, timeline, etc. currently reorder via the numeric "الترتيب" field)
