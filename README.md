# Bluprynt Consulting Group — Website Project

> Pre-construction consulting firm website. Cream + gold on warm charcoal.
> _Engineering Accuracy. Consulting Excellence — from blueprint to brilliance._

---

## Project Status

| Phase                     | Status         | Notes                                                              |
|---------------------------|----------------|--------------------------------------------------------------------|
| Design                    | ✅ Locked       | CAD-hosted homepage, crosshair-spotlight reveal, alternating sheets |
| Homepage                  | ✅ Built        | Next.js + TypeScript, all sections live (A-001 through A-007)      |
| Inner pages               | ✅ Built        | `/about`, `/work`, `/work/[slug]`, `/services`, `/services/[slug]` |
| 404 + loading states      | ✅ Built        | `app/not-found.tsx`, `app/loading.tsx` with brand styling          |
| **Database (Phase 1)**    | ✅ Live         | Drizzle + Neon Postgres, `projects` table backing `lib/projects.ts` |
| Email                     | 🟡 Stubbed     | API route + templates written; needs Resend account + verified domain |
| **Auth (Phase 2)**        | 🔲 Not started | NextAuth Credentials provider, admin login page, route protection  |
| **Admin Panel (Phase 3)** | 🔲 Not started | Hand-built admin UI for projects + testimonials                    |

---

## Brand & Design

### Colors (locked)

| Role        | Hex        | Use                                          |
|-------------|------------|----------------------------------------------|
| Gold        | `#C4A564`  | Primary accent — type, lines, CTAs           |
| Cream       | `#FFEEC6`  | Light bg / readable text on dark             |
| Red         | `#C16565`  | Status — flagged, errors, "review pending"   |
| Mint        | `#CAFFD1`  | Status — live, success, command-line accent  |
| Ink         | `#15130D`  | Warm charcoal — primary dark surface         |
| Ink Soft    | `#1C1A14`  | Elevated dark surfaces (footer, ribbon)      |
| Ink Deep    | `#0D0C08`  | Page base / lowest layer                     |

### Typography (locked)

| Role         | Typeface              | Stand-in (currently shipping) | Used for                                    |
|--------------|-----------------------|-------------------------------|---------------------------------------------|
| Primary      | Scto Grotesk A        | **Inter Tight** (Google Fonts) | Headlines, body, navigation                 |
| Secondary    | Airbnb Cereal W BD    | **Nunito** (Google Fonts)      | Buttons, captions, UI labels                |
| Mono         | Space Mono            | Space Mono (free)              | Coordinates, sheet codes, technical readouts |

### Cursor (locked)

- AutoCAD-style gold crosshair, ~30px wide
- Site-wide on desktop; default cursor on touch devices
- Live X / Y / Sheet code readout follows the cursor (mono, 9px)
- Acts as a **spotlight** — reveals a brighter drafting layer (grid + warm wash) inside its radius
- Default grid is barely visible; fully revealed only inside the spotlight

### Layout (locked)

- **Homepage** — sections alternate cream and dark; each is a "sheet" with its own ID code (A-001 through A-007)
- **Sub-pages** — wrapped in `PageShell` with consistent sheet stamp + title + dashed divider + body
- **Site-wide chrome** — fixed navbar (ribbon), fixed status bar (bottom), site-wide footer in flow
- **3D building animation** — `BuildingDraft` on the homepage, scroll-driven CSS 3D transforms, fades out before footer

### Section sheet codes (homepage)

| Code  | Section          | Notes                                          |
|-------|------------------|------------------------------------------------|
| A-001 | Hero             | "SITE"                                         |
| A-002 | WorkPreview      | "FOUNDATION" — pulls top 3 from `lib/projects` |
| A-003 | ServicesPreview  | "FRAME"                                        |
| A-004 | Testimonials     | "ENVELOPE"                                     |
| A-005 | AboutPreview     | "ANNOTATION" — cost-of-change chart            |
| A-006 | FoundersPreview  | "PERSONNEL" — links to `/about#founders`       |
| A-007 | ContactPreview   | "TITLE BLOCK" — anchor target `id="contact"`   |

---

## Tech Stack (locked)

| Layer         | Choice                  | Notes                                                       |
|---------------|-------------------------|-------------------------------------------------------------|
| Frontend      | Next.js 15 (App Router) | TypeScript, React 19, CSS Modules                           |
| Hosting       | Vercel                  | Native Next.js support                                      |
| Database      | Neon Postgres 17        | Serverless Postgres, Singapore region (`ap-southeast-1`)    |
| ORM           | Drizzle                 | TypeScript-first, schema in TS, migrations in SQL           |
| Auth          | NextAuth (Auth.js)      | Credentials provider — admin email + password (Phase 2)     |
| Email         | Resend                  | Confirmation + alert + keyword-routed FAQ replies           |
| Forms         | Native API route        | `app/api/contact/route.ts` calls Resend                     |
| Analytics     | Vercel Analytics        | Defer until launch                                          |

---

## Pages

### Public — built

- [x] `/` — Homepage (CAD-hosted, crosshair spotlight, 7 sections, scroll-driven 3D building animation)
- [x] `/about` — Firm thesis, methodology, founders embedded (`#founders` anchor), offices, CTA
- [x] `/work` — Project index (database-backed list)
- [x] `/work/[slug]` — Individual project case study (database-backed)
- [x] `/services` — Services index (5 services, grouped by category)
- [x] `/services/[slug]` — Individual service detail (deliverables, when-to-engage, others)
- [x] **404 page** — `app/not-found.tsx`, black bg + mark + "NOT FOUND" + return button
- [x] **Loading state** — `app/loading.tsx`, pulsing logo + "PLOTTING..." mono text

### Consolidated (no longer separate routes)

- **Contact** lives on the homepage as section A-007. Linked everywhere as `/#contact`. No `/contact` route exists.
- **Founders** live on `/about` in the founders section. No per-founder detail pages. Linked from the homepage's `FoundersPreview` cards as `/about#founders`.

### Phase 2 — admin auth (not started)

- [ ] `/admin/login` — login form
- [ ] `/admin` — dashboard with quick stats

### Phase 3 — admin CRUD (not started)

- [ ] `/admin/projects` — list, create, edit, delete projects
- [ ] `/admin/testimonials` — list, create, edit, delete testimonials
- [ ] Homepage testimonials section reading from a new `testimonials` table

### Future

- [ ] `/reports` — Downloadable reports / whitepapers (likely also DB-backed)

---

## Features

### Done

- [x] AutoCAD crosshair cursor — ~30px, gold, with X/Y/Sheet readout
- [x] Cream + gold + warm-charcoal theme via CSS variables (`app/globals.css`)
- [x] Crosshair-spotlight reveal of CAD/drafting layer (signature interaction)
- [x] **Cursor-illuminated grid on sub-pages** — `CursorGrid` component, ~220px radial mask, fixed-position viewport overlay
- [x] **3D BuildingDraft animation** on homepage — pure CSS 3D transforms, scroll-driven via `--p` custom property, scroll-rotates 360°, drops floors with overshoot, slams APPROVED stamp at 92% scroll, fades to 0 at 95–100% so the footer is unobscured
- [x] Alternating cream / dark sections on homepage
- [x] Section-level sheet codes (A-001 → A-007), live in cursor readout + status bar
- [x] **Active-section underline** in navbar — reads from `SheetProvider` context, draws underline via scaleX keyframe on the link matching the current sheet
- [x] **Smooth scroll** to homepage anchors (`/#contact`, `/#founders`) via `html { scroll-behavior: smooth }` + `[id] { scroll-margin-top }` rule for the fixed navbar
- [x] **Site-wide footer** — `Footer` component in `app/layout.tsx`, reserves right padding only on homepage (where BuildingDraft lives)
- [x] **`PageShell` wrapper** — consistent sheet stamp + dashed divider + body for all sub-pages, staggered fade-up entrance
- [x] **`SectionShell` wrapper** — same role for homepage sections
- [x] Responsive layout — touch devices fall back to default cursor + static visible grid
- [x] Contact form with client-side validation (lives in homepage `ContactPreview` section)
- [x] API route that scans for keywords and routes to FAQ groups
- [x] Per-page metadata (titles, descriptions)
- [x] Cost-of-change SVG chart on AboutPreview + about page (centerpiece of the firm thesis)
- [x] Margin-note testimonials with hover lift / un-rotate
- [x] Hover lift on Work, Services, Founder cards (-4px + box-shadow)
- [x] **404 page** styled to match brand (black bg, mark center, "NOT FOUND" headline, gold corner ticks, return button)
- [x] **Loading state** with pulsing logo + animated dots
- [x] Mobile hamburger drawer styled as CAD layer panel

### Phase 1 — database (done)

- [x] Drizzle ORM installed, configured, schema in TypeScript
- [x] Neon Postgres provisioned, connection string in `.env.local`
- [x] Schema for `projects` table
- [x] Initial migration generated + applied
- [x] `lib/projects.ts` rewritten to fetch from database via async helpers
- [x] Pages updated to be `async` server components, awaiting data

### Phase 1 — still pending

- [ ] `testimonials` table + schema (deferred to Phase 3 setup)
- [ ] `users` table for admin auth (Phase 2)
- [ ] Seed script for starter content (current data is hand-entered via Drizzle Studio)

### Phase 2 — auth (not started)

- [ ] NextAuth installed and configured
- [ ] Credentials provider with bcrypt password hashing
- [ ] `users` table connected to NextAuth via Drizzle adapter
- [ ] Admin login page (`/admin/login`)
- [ ] Middleware protecting all `/admin/*` routes
- [ ] Script to create the first admin user from the command line

### Phase 3 — admin panel (not started)

- [ ] Admin layout with sidebar navigation
- [ ] Projects: list, create, edit, delete
- [ ] Testimonials: list, create, edit, delete
- [ ] Form validation with Zod
- [ ] Toast notifications for success/error
- [ ] Image upload (UploadThing) — possibly deferred to Phase 4
- [ ] Homepage testimonials section reading from the database

### Email (still pending)

- [ ] Resend integration tested end-to-end — needs API key + verified domain

### Site-wide (still pending)

- [ ] Favicon set (16/32/180/192/512 + manifest) — currently using `app/icon.png`
- [ ] Privacy policy
- [ ] Open Graph image (1200×630)
- [ ] Real domain purchased + pointed
- [ ] Resend domain verified (SPF, DKIM, DMARC)

---

## Project Structure

Current state:

```
/
├── app/
│   ├── layout.tsx                  # global chrome — navbar, statusbar, crosshair, sheet provider, footer
│   ├── page.tsx                    # homepage (BuildingDraft + 7 sections)
│   ├── globals.css                 # design tokens, scroll-behavior, base styles
│   ├── favicon.ico
│   ├── icon.png                    # Next.js auto-detects for favicons
│   ├── not-found.tsx               # 404 page
│   ├── not-found.module.css
│   ├── loading.tsx                 # loading state for async route segments
│   ├── loading.module.css
│   │
│   ├── components/                 # ALL CAD chrome lives here (no nested cad/ subfolder)
│   │   ├── BuildingDraft.tsx + .module.css
│   │   ├── CADCrosshair.tsx + .module.css
│   │   ├── CADNavbar.tsx + .module.css
│   │   ├── CADStatusBar.tsx + .module.css
│   │   ├── CursorGrid.tsx + .module.css
│   │   ├── Divider.tsx + .module.css
│   │   ├── Footer.tsx + .module.css
│   │   ├── PageShell.tsx + .module.css
│   │   ├── SectionShell.tsx + .module.css
│   │   │
│   │   └── sections/               # homepage sections only
│   │       ├── Hero.tsx + .module.css
│   │       ├── WorkPreview.tsx + .module.css
│   │       ├── ServicesPreview.tsx + .module.css
│   │       ├── Testimonials.tsx + .module.css
│   │       ├── AboutPreview.tsx + .module.css
│   │       ├── FoundersPreview.tsx + .module.css
│   │       └── ContactPreview.tsx + .module.css
│   │
│   ├── about/
│   │   ├── page.tsx                # firm + founders embedded (id="founders")
│   │   └── about.module.css
│   │
│   ├── work/
│   │   ├── page.tsx                # work index
│   │   ├── work.module.css
│   │   └── [slug]/
│   │       ├── page.tsx            # project detail (DB-backed)
│   │       └── page.module.css
│   │
│   ├── services/
│   │   ├── page.tsx                # services index
│   │   ├── page.module.css
│   │   └── [slug]/
│   │       ├── page.tsx            # service detail
│   │       └── page.module.css
│   │
│   ├── api/
│   │   └── contact/route.ts        # form submission handler
│   │
│   └── admin/                      # admin routes (Phase 2/3)
│
├── lib/
│   ├── cad/
│   │   ├── SheetProvider.tsx       # current-sheet context
│   │   ├── useSheetObserver.ts     # observe section visibility, push to context
│   │   ├── useScrollProgress.ts    # drives BuildingDraft
│   │   ├── useSpotlight.ts         # drives section-level cursor grids
│   │   ├── useTypewriter.ts        # Hero animation
│   │   └── useReducedMotion.ts
│   ├── services.ts                 # static SERVICES + accessors
│   ├── projects.ts                 # DB-backed (Drizzle) project queries
│   └── founders.ts                 # static FOUNDERS + accessors
│
├── db/                             # Drizzle setup
│   ├── schema.ts
│   └── index.ts
│
├── drizzle/                        # auto-generated migrations
│
├── public/
│   └── Logo.png                    # site logo (used in navbar + 404)
│
├── tsconfig.json                   # has @/components/cad/* → ./app/components/* alias
├── package.json
├── next.config.ts
├── drizzle.config.ts
├── .env.example
├── .env.local                      # never committed
└── README.md
```

### Key tsconfig path alias

```json
"paths": {
  "@/components/cad/*": ["./app/components/*"],
  "@/*": ["./*"]
}
```

This keeps imports clean — every page can write `import { PageShell } from "@/components/cad/PageShell"` regardless of how deeply nested the file is.

---

## Environment Variables

`.env.local` (never committed):

```env
# ── Database ──
DATABASE_URL=postgresql://user:password@host.aws.neon.tech/neondb?sslmode=require

# ── Auth (Phase 2, when started) ──
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# ── Resend (still pending) ──
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
[email protected]
[email protected]

# ── Site ──
NEXT_PUBLIC_SITE_URL=https://bluprynt.com
```

---

## Database Schema (current)

### `projects`

| Column        | Type           | Notes                                          |
|---------------|----------------|------------------------------------------------|
| `id`          | serial PK      |                                                |
| `slug`        | varchar(100)   | Unique, used in URLs                           |
| `num`         | varchar(50)    | "P-024 / 2025"                                 |
| `name`        | varchar(200)   | Project name                                   |
| `name_em`     | varchar(200)   | Gold-highlighted portion                       |
| `sector`      | varchar(100)   | "Structural · Feasibility"                     |
| `year`        | integer        |                                                |
| `scope`       | varchar(200)   |                                                |
| `status`      | enum           | live, review, complete, ongoing                |
| `client`      | varchar(200)   | Nullable                                       |
| `location`    | varchar(200)   | Nullable                                       |
| `tools`       | text           | JSON-encoded `string[]`                        |
| `challenge`   | text           | Long-form                                      |
| `approach`    | text           | Long-form                                      |
| `outcome`     | text           | Long-form                                      |
| `featured`    | boolean        | Show on homepage                               |
| `created_at`  | timestamp      |                                                |
| `updated_at`  | timestamp      |                                                |

### `testimonials` (planned for Phase 3)

| Column                  | Type         | Notes                              |
|-------------------------|--------------|------------------------------------|
| `id`                    | serial PK    |                                    |
| `quote`                 | text         |                                    |
| `author_name`           | varchar(200) |                                    |
| `author_title`          | varchar(200) |                                    |
| `author_company`        | varchar(200) |                                    |
| `related_project_slug`  | varchar(100) |                                    |
| `featured`              | boolean      |                                    |
| `published`             | boolean      |                                    |
| `sort_order`            | integer      |                                    |
| `created_at`            | timestamp    |                                    |
| `updated_at`            | timestamp    |                                    |

### `users` (planned for Phase 2)

| Column           | Type         | Notes                          |
|------------------|--------------|--------------------------------|
| `id`             | serial PK    |                                |
| `email`          | varchar(255) | Unique                         |
| `password_hash`  | text         | bcrypt                         |
| `name`           | varchar(200) |                                |
| `created_at`     | timestamp    |                                |
| `updated_at`     | timestamp    |                                |

### npm scripts

```bash
npm run db:generate   # write a SQL migration based on schema changes
npm run db:migrate    # apply pending migrations
npm run db:push       # bypass migrations and sync directly (dev only)
npm run db:studio     # open Drizzle Studio (web UI)
```

---

## Content To-Do

> Marked items are content blockers — copy/assets needed from owner before that section can ship.

### Brand & identity

- [x] Firm name confirmed — Bluprynt Consulting Group
- [x] Tagline — _Engineering accuracy. Consulting excellence._
- [x] Brand colors confirmed
- [x] Fonts chosen (Scto Grotesk A + Airbnb Cereal W BD; standing in with Inter Tight + Nunito)
- [x] Logo file in `public/Logo.png` (used in navbar + 404)
- [ ] Web font licenses confirmed (Scto + Cereal are paid)
- [ ] Favicon set generated (currently `app/icon.png` for auto-detect)

### Homepage (using placeholder copy)

- [ ] Hero headline + subheading — final copy
- [ ] Intro paragraph
- [ ] Key stats (projects, sectors, founded)
- [ ] 2–3 featured projects flagged in the database
- [ ] Services teaser copy — final
- [ ] 1–2 testimonial quotes for homepage (Phase 3)

### About / founders

- [ ] Firm origin story — final copy
- [ ] Founder 1 — name, role, bio (long), expertise, location, LinkedIn, photo or initials
- [ ] Founder 2 — same
- [ ] Real numbers for the "By the numbers" block (years, offices, engagements, disciplines)
- [ ] Office addresses + hours

### Work / projects

- [ ] Real project list entered into the database (minimum 2 for launch)
- [ ] Per project — name, slug, sector, year, scope, status, client, location, tools, challenge, approach, outcome, featured

### Services

- [ ] Per service — name, region, description, deliverables, when-to-engage triggers
- [ ] Currently 5 services with placeholder content; replace with real

### Testimonials (Phase 3)

- [ ] Minimum 3 testimonials collected
- [ ] Per testimonial — name, title, company, quote (client-approved), linked project

### Contact

- [x] Contact form fields finalised (name, email, organization, project type, message)
- [ ] Firm email address confirmed
- [ ] Phone number — include or not
- [ ] Response time expectation (currently shown as "two business days")
- [ ] FAQ replies — 3–5 Q&A per service area

### Site-wide / technical

- [x] Per-page SEO meta title + description
- [x] Custom 404 page
- [x] Loading state component
- [ ] Analytics platform set up (Vercel Analytics planned)
- [ ] Privacy policy published
- [ ] Open Graph image (1200×630)
- [ ] Domain purchased + pointed
- [ ] Resend domain verified (SPF, DKIM, DMARC)

### Admin (Phase 3)

- [ ] First admin user created via `scripts/create-admin.ts`
- [ ] Admin password documented securely

---

## Dev Setup

```bash
# install
npm install

# develop
npm run dev
# → http://localhost:3000

# database
npm run db:generate    # generate migration from schema changes
npm run db:migrate     # apply pending migrations
npm run db:studio      # open the database UI

# checks
npm run lint
npm run type-check

# production
npm run build
npm run start
```

Built with [Next.js 15](https://nextjs.org) (App Router) + TypeScript + CSS Modules + [Drizzle](https://orm.drizzle.team) + [Neon Postgres](https://neon.tech). Designed for [Vercel](https://vercel.com) deployment.

---

## Contacts & Access

| Role             | Name        | Contact |
|------------------|-------------|---------|
| Owner / client   | TBD         | —       |
| Developer        | TBD         | —       |
| Domain registrar | TBD         | —       |
| Hosting          | Vercel      | —       |
| Database         | Neon        | —       |
| Email service    | Resend      | —       |