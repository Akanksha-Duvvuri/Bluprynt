# Bluprynt Consulting Group — Website Project

> Pre-consulting firm website. Cream + gold on warm charcoal.
> _Engineering Accuracy. Consulting Excellence — from blueprint to brilliance._

---

## Project Status

| Phase                     | Status         | Notes                                                              |
|---------------------------|----------------|--------------------------------------------------------------------|
| Design                    | ✅ Locked       | CAD-hosted homepage, crosshair-spotlight reveal, alternating sheets |
| Homepage                  | ✅ Built        | Next.js + TypeScript, all 5 sections live                          |
| Inner pages               | ✅ Built        | `/about`, `/projects`, `/projects/[slug]`, `/services`, `/contact` |
| Email                     | 🟡 Stubbed     | API route + templates written; needs Resend account + verified domain |
| **Database (Phase 1)**    | 🟡 In progress | Drizzle + Neon Postgres; replacing static `lib/*.ts` content stores |
| **Auth (Phase 2)**        | 🔲 Not started | NextAuth Credentials provider, admin login page, route protection  |
| **Admin Panel (Phase 3)** | 🔲 Not started | Hand-built admin UI for projects + testimonials                    |

---

## Brand & Design

### Colors (locked)

| Role        | Hex        | RGB              | Use                                          |
|-------------|------------|------------------|----------------------------------------------|
| Gold        | `#C4A564`  | 196, 165, 100    | Primary accent — type, lines, CTAs           |
| Cream       | `#FFEEC6`  | 255, 238, 198    | Light bg / readable text on dark             |
| Red         | `#C16565`  | 193, 101, 101    | Status — flagged, errors, "review pending"   |
| Mint        | `#CAFFD1`  | 202, 255, 209    | Status — live, success, command-line accent  |
| Ink         | `#15130D`  | 21, 19, 13       | Warm charcoal — primary dark surface         |
| Ink Soft    | `#1C1A14`  | —                | Elevated dark surfaces (footer, ribbon)      |
| Ink Deep    | `#0D0C08`  | —                | Page base / lowest layer                     |

### Typography (locked)

| Role         | Typeface              | Stand-in (currently shipping) | Used for                                    |
|--------------|-----------------------|-------------------------------|---------------------------------------------|
| Primary      | Scto Grotesk A        | **Inter Tight** (Google Fonts) | Headlines, body, navigation                 |
| Secondary    | Airbnb Cereal W BD    | **Nunito** (Google Fonts)      | Buttons, captions, UI labels                |
| Mono         | Space Mono            | Space Mono (free)              | Coordinates, sheet codes, technical readouts |

### Cursor (locked)

- AutoCAD-style gold crosshair, **~30px wide**, slightly larger than default cursor
- Site-wide on desktop; default cursor on touch devices
- Live X / Y / Sheet code readout follows the cursor (mono, 9px)
- Acts as a **spotlight** — reveals a brighter drafting layer (grid + warm wash) inside its radius
- Default grid is barely visible (2.5% opacity); fully revealed only inside the spotlight

### Layout (locked)

- Sections **alternate cream and dark** down the homepage
- Persistent CAD chrome: ribbon-style top bar + bottom status bar across both
- Each section is a "sheet" with its own ID code (A-001 through A-005)
- Per-section title block (top-right) and sheet metadata (top-left) using drafting conventions

---

## Tech Stack (locked)

| Layer         | Choice                  | Notes                                                       |
|---------------|-------------------------|-------------------------------------------------------------|
| Frontend      | Next.js 15 (App Router) | TypeScript, React 19, CSS Modules                           |
| Hosting       | Vercel                  | Native Next.js support, free tier covers MVP                |
| **Database**  | **Neon Postgres 17**    | Serverless Postgres, Singapore region (`ap-southeast-1`)    |
| **ORM**       | **Drizzle**             | TypeScript-first, schema in TS, migrations in SQL           |
| **Auth**      | **NextAuth (Auth.js)**  | Credentials provider — admin email + password               |
| Email         | Resend                  | Confirmation + alert + keyword-routed FAQ replies           |
| Forms         | Native API route        | `app/api/contact/route.ts` calls Resend                     |
| Analytics     | Vercel Analytics        | Defer until launch                                          |

### Why Drizzle over Prisma

- API maps directly to SQL — easier to learn what's actually happening at the database level
- No code-generation step, no separate runtime client
- Schema lives in TypeScript; migrations are readable SQL files in `/drizzle`

### Why NextAuth over Neon Auth / Stack Auth

- Two admin users ever (the founders); a hosted auth platform is overkill
- Owned user table = no vendor lock-in; can swap database hosts without re-doing auth
- More documentation / community than newer Stack Auth

### Why no CMS (Sanity / Contentful / etc.)

- Considered and rejected: building auth + admin panel ourselves teaches more about real backend work
- Sanity remains a viable later option if maintenance becomes painful

---

## Pages

### MVP — built

- [x] `/` — Homepage (CAD-hosted, crosshair spotlight, alternating sections)
- [x] `/about` — Founders, philosophy, credentials
- [x] `/projects` — Project gallery (database-driven after Phase 1)
- [x] `/projects/[slug]` — Individual case study (database-driven after Phase 1)
- [x] `/services` — Services overview (still static; rare changes)
- [x] `/contact` — Contact form (full page; preview lives on homepage)

### Phase 2 — admin auth

- [ ] `/admin/login` — login form
- [ ] `/admin` — dashboard with quick stats

### Phase 3 — admin CRUD

- [ ] `/admin/projects` — list, create, edit, delete projects
- [ ] `/admin/testimonials` — list, create, edit, delete testimonials
- [ ] Homepage testimonials section reading from the new database table

### Future

- [ ] `/reports` — Downloadable reports / whitepapers (likely also DB-backed)

---

## Features

### Done

- [x] AutoCAD crosshair cursor — ~30px, gold, with X/Y/Sheet readout (US-01)
- [x] Cream + gold + warm-charcoal theme via CSS variables
- [x] Crosshair-spotlight reveal of CAD/drafting layer (signature interaction)
- [x] Alternating cream / dark sections on homepage
- [x] Section-level sheet codes (A-001 → A-005), live in cursor readout + status bar
- [x] Scroll-tracked active nav (IntersectionObserver in TopBar)
- [x] Responsive layout — touch devices fall back to default cursor + static visible grid (US-23)
- [x] Contact form with client-side validation (US-15)
- [x] API route that scans for keywords and routes to FAQ groups (US-18)
- [x] All five inner pages live with consistent chrome
- [x] Per-page metadata (titles, descriptions)

### Phase 1 — database (in progress)

- [ ] Drizzle ORM installed, configured, schema in TypeScript
- [ ] Neon Postgres provisioned, connection string in `.env.local`
- [ ] Schema for `projects`, `testimonials`, `users` tables
- [ ] Initial migration generated + applied
- [ ] Seed script populates starter content
- [ ] `lib/projects.ts` rewritten to fetch from database
- [ ] Pages updated to await async data

### Phase 2 — auth

- [ ] NextAuth installed and configured
- [ ] Credentials provider with bcrypt password hashing
- [ ] `users` table connected to NextAuth via Drizzle adapter
- [ ] Admin login page (`/admin/login`)
- [ ] Middleware protecting all `/admin/*` routes
- [ ] Script to create the first admin user from the command line

### Phase 3 — admin panel

- [ ] Admin layout with sidebar navigation
- [ ] Projects: list, create, edit, delete
- [ ] Testimonials: list, create, edit, delete
- [ ] Form validation with Zod
- [ ] Toast notifications for success/error
- [ ] Image upload (UploadThing) — possibly deferred to Phase 4
- [ ] Homepage testimonials section reading from the database

### Email (still pending)

- [ ] Resend integration tested end-to-end — needs API key + verified domain (US-16, US-17)

### Site-wide (still pending)

- [ ] Favicon set (16/32/180/192/512 + manifest — US-22)
- [ ] Privacy policy
- [ ] Open Graph image (1200×630)
- [ ] 404 page styled to match brand

---

## Project Structure

After Phase 1:

```
/
├── app/
│   ├── layout.tsx                  # global chrome + fonts
│   ├── page.tsx                    # homepage
│   ├── globals.css                 # brand variables + base styles
│   ├── favicon.ico
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── projects/
│   │   ├── page.tsx                # gallery (DB-driven after Phase 1)
│   │   └── [slug]/
│   │       ├── page.tsx            # case study (DB-driven after Phase 1)
│   │       └── not-found.tsx
│   ├── contact/page.tsx
│   ├── components/                 # see existing structure
│   └── api/
│       └── contact/route.ts
│
├── db/                             # NEW IN PHASE 1
│   ├── schema.ts                   # table definitions
│   └── index.ts                    # Drizzle client singleton
│
├── drizzle/                        # NEW IN PHASE 1 — auto-generated migrations
│   └── 0000_<name>.sql
│
├── scripts/                        # NEW IN PHASE 1
│   └── seed.ts                     # one-time data ingest
│
├── lib/
│   ├── projects.ts                 # REWRITTEN IN PHASE 1 — DB-backed
│   ├── services.ts                 # still static
│   ├── founders.ts                 # still static
│   ├── faq.ts                      # keyword groups + FAQ copy (US-18)
│   └── email.ts                    # Resend client + email templates
│
├── public/
├── drizzle.config.ts               # NEW IN PHASE 1
├── package.json
├── tsconfig.json
├── next.config.ts
├── .env.example
├── .env.local                      # never committed
├── .gitignore
└── README.md
```

After Phase 2 (auth) adds:

```
app/
├── admin/
│   ├── login/page.tsx
│   └── layout.tsx                  # protected wrapper
├── api/
│   └── auth/[...nextauth]/route.ts
├── auth.ts                         # NextAuth configuration
└── middleware.ts                   # route protection
```

After Phase 3 (CRUD) adds:

```
app/
├── admin/
│   ├── page.tsx                    # dashboard
│   ├── projects/
│   │   ├── page.tsx                # list
│   │   ├── new/page.tsx            # create
│   │   └── [id]/edit/page.tsx      # update
│   └── testimonials/
│       ├── page.tsx
│       ├── new/page.tsx
│       └── [id]/edit/page.tsx
└── api/
    └── admin/
        ├── projects/route.ts
        └── testimonials/route.ts
```

---

## Environment Variables

`.env.local` (never committed):

```env
# ── Database (Phase 1) ──
DATABASE_URL=postgresql://user:password@host.aws.neon.tech/neondb?sslmode=require

# ── Auth (Phase 2) ──
# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000     # production: https://bluprynt.com

# ── Resend (transactional email) ──
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
[email protected]
[email protected]

# ── Site ──
NEXT_PUBLIC_SITE_URL=https://bluprynt.com
```

The site renders without `RESEND_API_KEY` — only the contact form fails on submit.
The site **does not** render without `DATABASE_URL` after Phase 1.

---

## Database — Phase 1 Reference

### Tables

**`projects`** — case studies. Replaces the static `PROJECTS` array.

| Column                  | Type           | Notes                                          |
|-------------------------|----------------|------------------------------------------------|
| `id`                    | serial PK      | Auto-increment                                 |
| `slug`                  | varchar(100)   | Unique, used in URLs                           |
| `num`                   | varchar(50)    | "P-024 / 2025"                                 |
| `name`                  | varchar(200)   | Plain portion, e.g. "Eastwood "                |
| `name_em`               | varchar(200)   | Gold-highlighted portion, e.g. "Viaduct"       |
| `sector`                | varchar(100)   | "Structural · Feasibility"                     |
| `year`                  | integer        |                                                |
| `scope`                 | varchar(200)   | "3-span · 240m"                                |
| `status`                | enum           | live, review, complete, ongoing                |
| `client`                | varchar(200)   | Nullable                                       |
| `location`              | varchar(200)   | Nullable                                       |
| `tools`                 | text           | JSON-encoded `string[]`                        |
| `challenge`             | text           | Long-form                                      |
| `approach`              | text           | Long-form                                      |
| `outcome`               | text           | Long-form                                      |
| `featured`              | boolean        | Show on homepage                               |
| `created_at`            | timestamp      | Default now                                    |
| `updated_at`            | timestamp      | Default now                                    |

**`testimonials`** — quotes from clients. New in Phase 1.

| Column                  | Type         | Notes                              |
|-------------------------|--------------|------------------------------------|
| `id`                    | serial PK    |                                    |
| `quote`                 | text         | Required                           |
| `author_name`           | varchar(200) |                                    |
| `author_title`          | varchar(200) | "CTO" / "Project Director"         |
| `author_company`        | varchar(200) |                                    |
| `related_project_slug`  | varchar(100) | Optional link to a project         |
| `featured`              | boolean      | Show on homepage                   |
| `published`             | boolean      | Soft-publish toggle                |
| `sort_order`            | integer      | Lower = shown first                |
| `created_at`            | timestamp    |                                    |
| `updated_at`            | timestamp    |                                    |

**`users`** — admin accounts. Created in Phase 1, used in Phase 2.

| Column           | Type         | Notes                          |
|------------------|--------------|--------------------------------|
| `id`             | serial PK    |                                |
| `email`          | varchar(255) | Unique                         |
| `password_hash`  | text         | bcrypt; never plain text       |
| `name`           | varchar(200) |                                |
| `created_at`     | timestamp    |                                |
| `updated_at`     | timestamp    |                                |

### npm scripts (added in Phase 1)

```bash
npm run db:generate   # write a SQL migration based on schema changes
npm run db:migrate    # apply pending migrations to the database
npm run db:push       # bypass migrations and sync schema directly (dev only)
npm run db:studio     # open Drizzle Studio (web UI for the database)
npm run db:seed       # populate starter content (idempotent: safe to re-run)
```

Workflow when changing the schema:

1. Edit `db/schema.ts`
2. `npm run db:generate` — produces a new file in `/drizzle`
3. Inspect the SQL — make sure it does what you expect
4. `npm run db:migrate` — applies it

### Seed data

The seed script populates the database with:

- 4 starter projects (3 featured, 1 archive only)
- 2 starter testimonials (both featured)

After Phase 3, the firm owner will rarely run the seed — they'll add new content through the admin UI.

---

## Auth — Phase 2 Reference

### Stack

- **NextAuth (Auth.js)** v5 with the **Credentials** provider
- **bcryptjs** for password hashing
- **Drizzle adapter** to connect NextAuth to the existing `users` table
- **Session strategy: JWT** (no separate session table needed)
- **Middleware** in `middleware.ts` protecting `/admin/*` routes

### Flow

1. Owner visits `/admin/login`, enters email + password
2. NextAuth verifies the credentials against the `users` table (bcrypt compare)
3. On success, sets a JWT session cookie
4. Middleware checks the cookie on every `/admin/*` request
5. Failed checks redirect to `/admin/login`

### Bootstrapping the first admin

A separate CLI script (`scripts/create-admin.ts`) reads email + password from the terminal, hashes the password, inserts the row. Run once after Phase 2 deployment.

---

## Admin Panel — Phase 3 Reference

### Routes

- `/admin` — dashboard (project count, testimonial count, last login)
- `/admin/projects` — list with edit/delete buttons
- `/admin/projects/new` — create form
- `/admin/projects/[id]/edit` — edit form
- `/admin/testimonials` — same pattern

### Conventions

- Forms validated with **Zod**, error messages inline
- Submit handlers POST to `/api/admin/<resource>` routes
- API routes verify the session before any DB write
- All admin pages use the same `Sheet` and `TitleBlock` primitives as the public site, so the admin UI matches the brand

### Image uploads

- **Phase 3a** — text-only fields. Project images stay as the SVG placeholders we already have.
- **Phase 3b (later)** — UploadThing integration for hero images and project galleries.

---

## Design Decisions Log

| Date       | Decision                                                                                    | Reason                                                                  |
|------------|---------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| 2026-04-26 | Drop pure black; use warm charcoal `#15130D`                                                | Cream `#FFEEC6` reads warm against it, harsh against pure black         |
| 2026-04-26 | No serif fonts — primary is Scto Grotesk A (grotesk)                                        | Brand book specifies grotesk; serifs would conflict                     |
| 2026-04-26 | Red and mint are functional, not decorative                                                 | Status only (live, flagged, success) — earns its place                  |
| 2026-04-26 | CAD hosts the homepage; drafting elements are overlays                                      | Interactive workstation feel over static drawing                        |
| 2026-04-26 | Crosshair is small (~30px), not edge-to-edge                                                | Less visually overwhelming, behaves more like a real cursor             |
| 2026-04-26 | CAD grid hidden by default; revealed only inside the crosshair spotlight                    | Default state should feel calm; the reveal is the moment of delight     |
| 2026-04-26 | Sections alternate cream and dark down the homepage                                         | Breaks the dark monotony                                                |
| 2026-04-26 | Crosshair persists site-wide on desktop; mobile falls back to default cursor                | US-01 + US-23                                                           |
| 2026-04-26 | Next.js 15 + React 19 + App Router + CSS Modules                                            | Server components by default, explicit `"use client"` for interactivity |
| 2026-04-28 | Coordinate readout uses refs + `requestAnimationFrame`, not React state                     | 60fps DOM writes; React state would re-render the component every frame |
| 2026-04-28 | Favicon placed at `app/favicon.ico` for auto-detection                                      | No metadata config needed                                               |
| 2026-04-29 | SitePlanStrip removed                                                                       | Owner preference — to be revisited if added back                        |
| 2026-04-29 | Inner pages built — about, services, projects gallery + dynamic [slug], contact             | Each page is one Sheet, focused, no homepage-style alternation          |
| 2026-04-29 | Project / service / founder data extracted into `lib/*.ts` data stores                      | Single source of truth, type-checked, easy to swap to a database later  |
| 2026-04-29 | TopBar nav uses real page links instead of hash anchors                                     | Pathname-aware nav fixes broken hash links on inner pages               |
| 2026-04-30 | Database = Neon Postgres 17, Singapore region                                               | Lowest latency from India when Mumbai unavailable                       |
| 2026-04-30 | ORM = Drizzle (not Prisma)                                                                  | Closer to SQL, easier to learn what's actually happening                |
| 2026-04-30 | Auth = NextAuth Credentials (not Neon Auth / Stack Auth)                                    | Two admin users; hosted auth is overkill                                |
| 2026-04-30 | Custom-built admin (not a CMS like Sanity)                                                  | Owner explicitly wants to learn real backend                            |
| 2026-04-30 | Only `projects` and `testimonials` move to the DB initially                                 | Services + founders rarely change; static files are fine                |

---

## Known issues / lessons learned

- **CSS not loading on first run** — likely cause: `app/layout.tsx` and `app/globals.css` are still the `create-next-app` defaults. Both must be replaced before the site renders correctly.
- **Markdown formatting in code blocks** — pasting `process.env.X` from chat sometimes turns it into a markdown link. Always copy from bundle files, not the chat.
- **Favicon in metadata** — don't reference `/favicon.ico` in the `metadata.icons` config. Place it at `app/favicon.ico` and let Next.js auto-detect.
- **`themeColor` warning in Next.js 15** — moved from `metadata` to a separate `viewport` export. Non-fatal warning.
- **`getFeaturedProjects is not a function`** — caused by a partial paste of `lib/projects.ts` missing the helper functions at the bottom. Fixed by appending the three exports.
- **React Compiler config error** — needs `babel-plugin-react-compiler` installed if `experimental.reactCompiler` is enabled. Easier to leave it off.
- **Database region** — Mumbai (`ap-south-1`) was unavailable in the Neon free tier; chose Singapore (`ap-southeast-1`) instead. Latency from India is acceptable.

---

## Content To-Do

> Marked items are content blockers — copy/assets needed from owner before that section can ship.

### Brand & identity

- [x] Firm name confirmed — Bluprynt Consulting Group
- [x] Tagline — _Engineering accuracy. Consulting excellence._
- [x] Brand colors confirmed
- [x] Fonts chosen (Scto Grotesk A + Airbnb Cereal W BD)
- [ ] Logo / wordmark SVG (final)
- [ ] Web font licenses confirmed (Scto + Cereal are paid)
- [ ] Favicon set generated

### Homepage (using placeholder copy)

- [ ] Hero headline + subheading — final
- [ ] Intro paragraph
- [ ] Key stats (projects, sectors, founded)
- [ ] 2–3 featured projects selected (currently placeholders)
- [ ] Services teaser copy — final
- [ ] 1–2 testimonial quotes for homepage (Phase 3)

### About / founders

- [ ] Firm origin story
- [ ] Founder 1 — photo, name, role, bio, LinkedIn, degrees, licences, software certs
- [ ] Founder 2 — same as above

### Projects

- [ ] Project list finalised (minimum 2 for launch)
- [ ] Per project — name, summary, sector, location, thumbnail, full description (challenge/approach/outcome), images/drawings, client (or anonymised), year, tools

### Services

- [ ] Per service — name, description, deliverables, engagement type, timeline, who it's for

### Testimonials (Phase 3)

- [ ] Minimum 3 testimonials collected
- [ ] Per testimonial — name, title, company, quote (client-approved), linked project

### Contact

- [x] Contact form fields finalised (name, email, company, message)
- [ ] Firm email address confirmed
- [ ] Phone number — include or not
- [ ] Response time expectation
- [ ] FAQ replies — 3–5 Q&A per service area

### Site-wide / technical

- [x] Per-page SEO meta title + description
- [ ] Analytics platform set up (Vercel Analytics planned)
- [ ] Privacy policy published
- [ ] Open Graph image (1200×630)
- [ ] Custom 404 page
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

# database (after Phase 1)
npm run db:generate    # generate migration from schema changes
npm run db:migrate     # apply pending migrations
npm run db:studio      # open the database UI
npm run db:seed        # populate starter content

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