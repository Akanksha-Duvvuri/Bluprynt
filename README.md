# Bluprynt Consulting Group — Website Project

> Pre-construction consulting firm website. Cream + gold on warm charcoal.
> _Engineering Accuracy. Consulting Excellence — from blueprint to brilliance._

---

## Project Status

| Phase                     | Status         | Notes                                                              |
|---------------------------|----------------|--------------------------------------------------------------------|
| Design                    | ✅ Locked       | CAD-hosted homepage, crosshair-spotlight reveal, alternating sheets |
| Homepage                  | ✅ Built        | Next.js + TypeScript, all sections live (A-001 through A-007)      |
| Inner pages               | ✅ Built        | `/work`, `/work/[slug]`, `/services`, `/services/[slug]`           |
| 404 + loading states      | ✅ Built        | `app/not-found.tsx`, `app/loading.tsx` with brand styling          |
| **Database (Phase 1)**    | ✅ Live         | Drizzle + Neon, `projects` + `testimonials` + `services` + `users` |
| **Auth (Phase 2)**        | ✅ Live         | NextAuth Credentials provider, admin login, middleware-protected   |
| **Admin Panel (Phase 3)** | 🟡 Built        | Full CRUD on projects + testimonials + services — UI polishing     |
| Email                     | 🟡 Stubbed     | API route + templates written; needs Resend account + verified domain |

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
- **3D building animation** — `BuildingDraft` on the homepage, scroll-driven CSS 3D transforms; APPROVED stamp slams when ContactPreview enters viewport
- **Admin** — sidebar layout with CAD chrome, separate route group `(authed)` for protected pages

### Section sheet codes (homepage)

| Code  | Section          | Notes                                          |
|-------|------------------|------------------------------------------------|
| A-001 | Hero             | "SITE"                                         |
| A-002 | WorkPreview      | "FOUNDATION" — pulls top 3 from `lib/projects` |
| A-003 | ServicesPreview  | "FRAME" — pulls featured services from DB      |
| A-004 | Testimonials     | "ENVELOPE" — pulls featured testimonials from DB |
| A-005 | AboutPreview     | "ANNOTATION" — 4 differentiators (vertical list) + cost advantage panel |
| A-006 | FoundersPreview  | "PERSONNEL" — Leadership row (2 cards) + Delivery Team row (3 cards) |
| A-007 | ContactPreview   | "TITLE BLOCK" — form + direct contact directory, anchor `id="contact"` |

---

## Tech Stack (locked)

| Layer         | Choice                  | Notes                                                       |
|---------------|-------------------------|-------------------------------------------------------------|
| Frontend      | Next.js 15 (App Router) | TypeScript, React 19, CSS Modules                           |
| Hosting       | Vercel                  | Native Next.js support                                      |
| Database      | Neon Postgres 17        | Serverless Postgres, Singapore region (`ap-southeast-1`)    |
| ORM           | Drizzle                 | TypeScript-first, schema in TS, migrations in SQL           |
| Auth          | NextAuth (Auth.js) v5   | Credentials provider — bcrypt password hashing              |
| Email         | Resend                  | Confirmation + alert + keyword-routed FAQ replies           |
| Forms         | Native API route        | `app/api/contact/route.ts` calls Resend                     |
| Analytics     | Vercel Analytics        | Defer until launch                                          |

---

## Pages

### Public — built

- [x] `/` — Homepage (CAD-hosted, crosshair spotlight, 7 sections, scroll-driven 3D building animation). All firm content (differentiators, team, contact, testimonials) lives here.
- [x] `/work` — Project index (database-backed list)
- [x] `/work/[slug]` — Individual project case study (database-backed)
- [x] `/services` — Services index (database-backed, flat list — no category grouping)
- [x] `/services/[slug]` — Individual service detail (deliverables, when-to-engage)
- [x] **404 page** — `app/not-found.tsx`, black bg + mark + "NOT FOUND" + return button
- [x] **Loading state** — `app/loading.tsx`, pulsing logo + "PLOTTING..." mono text

### Consolidated (single-source-of-truth on homepage)

- **About / firm thesis** — homepage section A-005 (`AboutPreview`). No separate `/about` route. The "Why Bluprynt" 4 differentiators live here.
- **Team / founders** — homepage section A-006 (`FoundersPreview`). Two rows: Leadership (Vivek, BG) + Delivery Team (Raju, Shivakumar, Prasanth). No per-person pages.
- **Contact** — homepage section A-007 (`ContactPreview`). No separate `/contact` route. Direct contact directory (WhatsApp, phone, email) lives next to the form. Linked everywhere as `/#contact`.

### Admin — built

- [x] `/admin/login` — credentials login form
- [x] `/admin` — dashboard with project/testimonial counts + auth status
- [x] `/admin/projects` — list view with delete buttons
- [x] `/admin/projects/new` — create project form (Zod-validated)
- [x] `/admin/projects/[id]/edit` — edit project form
- [x] `/admin/testimonials` — list view with delete buttons
- [x] `/admin/testimonials/new` — create testimonial
- [x] `/admin/testimonials/[id]/edit` — edit testimonial
- [x] `/admin/services` — list view with delete buttons
- [x] `/admin/services/new` — create service
- [x] `/admin/services/[id]/edit` — edit service

### Future

- [ ] `/reports` — Downloadable reports / whitepapers (DB-backed)
- [ ] Subdomain split — `admin.bluprynt.com` for the admin panel via middleware rewrite

---

## Features

### Done

- [x] AutoCAD crosshair cursor — ~30px, gold, with X/Y/Sheet readout
- [x] Cream + gold + warm-charcoal theme via CSS variables (`app/globals.css`)
- [x] Crosshair-spotlight reveal of CAD/drafting layer (signature interaction)
- [x] **Cursor-illuminated grid on sub-pages** — `CursorGrid` component, ~220px radial mask
- [x] **3D BuildingDraft animation** — pure CSS 3D transforms, scroll-driven via `--p` custom property, scroll-rotates 360°, drops floors with overshoot. APPROVED stamp triggered by IntersectionObserver on `#contact` (lands when user reaches contact section)
- [x] Alternating cream / dark sections on homepage
- [x] Section-level sheet codes (A-001 → A-007), live in cursor readout + status bar
- [x] **Active-section underline** in navbar — reads from `SheetProvider` context
- [x] **Smooth scroll** to homepage anchors via `html { scroll-behavior: smooth }` + `[id] { scroll-margin-top }` rule
- [x] **Site-wide footer** — 3-column layout (brand, Quick Links, Reach Out), reserves right padding on homepage where BuildingDraft renders
- [x] **`PageShell` wrapper** — consistent sheet stamp + dashed divider + body for sub-pages
- [x] **`SectionShell` wrapper** — same role for homepage sections
- [x] **`WhyCards` reusable component** — 4 differentiator cards used on AboutPreview (and was used on /about before it was removed)
- [x] **Team showcase** — Leadership row (2 larger cards) + Delivery Team row (3 smaller cards), photo-frame placeholders (F1/F2/T1/T2/T3) until real photos are added
- [x] **Direct contact directory** in ContactPreview — `tel:` for phones, `wa.me/` for WhatsApp, `mailto:` for emails
- [x] **Multi-select services checkboxes** in contact form — CAD-styled, joins selections into a comma-separated string for submission
- [x] Responsive layout — touch devices fall back to default cursor + static visible grid
- [x] API route that scans for keywords and routes to FAQ groups
- [x] Per-page metadata (titles, descriptions)
- [x] Margin-note testimonials with hover lift / un-rotate (DB-backed)
- [x] Hover lift on Work, Services, team cards (-4px + box-shadow)
- [x] **404 page** styled to match brand (black bg, mark center, gold corner ticks)
- [x] **Loading state** with pulsing logo + animated dots
- [x] Mobile hamburger drawer styled as CAD layer panel

### Phase 1 — database (done)

- [x] Drizzle ORM installed, configured, schema in TypeScript
- [x] Neon Postgres provisioned, connection string in `.env.local`
- [x] Schema for `projects`, `testimonials`, `services`, `users`, `formSubmissions`, `emailLog`
- [x] Initial migrations generated + applied
- [x] `lib/projects.ts` rewritten to fetch from database via async helpers
- [x] `lib/services.ts` rewritten to fetch from database (flat list, no category grouping)
- [x] `lib/testimonials.ts` created with `getFeaturedTestimonials()` joined to projects
- [x] Pages updated to be `async` server components, awaiting data

### Phase 2 — auth (done)

- [x] NextAuth v5 installed and configured (`auth.ts`)
- [x] Credentials provider with bcrypt password hashing
- [x] `users` table connected to NextAuth via Drizzle
- [x] Admin login page (`/admin/login`)
- [x] `middleware.ts` protecting all `/admin/*` routes
- [x] `scripts/create-admin.ts` to seed the first admin user from CLI
- [ ] **Pending:** split auth into `auth.config.ts` (edge-compatible) + `auth.ts` (Node) to silence Edge Runtime warnings about bcryptjs + jose

### Phase 3 — admin panel (built, polishing UI)

- [x] Admin layout with sidebar navigation, route-group protected via `app/admin/(authed)/layout.tsx`
- [x] Projects: list, create, edit, delete (full CRUD)
- [x] Testimonials: list, create, edit, delete (full CRUD)
- [x] Services: list, create, edit, delete (full CRUD)
- [x] Form validation with Zod (`lib/validation.ts`)
- [x] API routes at `/api/admin/{projects,testimonials,services}/[id]?` with GET/POST/PATCH/DELETE
- [x] CAD-styled admin UI (sheet stamp eyebrows, corner ticks, dashed dividers)
- [ ] **Pending:** Toast notifications for success/error
- [ ] **Pending:** Image upload (UploadThing) — deferred to Phase 4
- [ ] **Pending:** UI polish pass

### Email (still pending)

- [ ] Resend integration tested end-to-end — needs API key + verified domain

### Site-wide (still pending)

- [ ] Favicon set (16/32/180/192/512 + manifest) — currently using `app/icon.png`
- [ ] Privacy policy
- [ ] Open Graph image (1200×630)
- [ ] Real domain purchased + pointed
- [ ] Resend domain verified (SPF, DKIM, DMARC)
- [ ] Replace direct-contact directory placeholders (phone numbers, emails) with real values

---

## Project Structure

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
│   ├── components/
│   │   ├── BuildingDraft.tsx + .module.css
│   │   ├── CADCrosshair.tsx + .module.css
│   │   ├── CADNavbar.tsx + .module.css
│   │   ├── CADStatusBar.tsx + .module.css
│   │   ├── CursorGrid.tsx + .module.css
│   │   ├── Divider.tsx + .module.css
│   │   ├── Pageshell.tsx + .module.css
│   │   ├── SectionShell.tsx + .module.css
│   │   ├── WhyCards.tsx + .module.css     # reusable 4-card differentiators block
│   │   │
│   │   └── sections/               # homepage sections
│   │       ├── Hero.tsx + .module.css
│   │       ├── WorkPreview.tsx + .module.css
│   │       ├── ServicesPreview.tsx + .module.css
│   │       ├── Testimonials.tsx + .module.css
│   │       ├── AboutPreview.tsx + .module.css
│   │       ├── FoundersPreview.tsx + .module.css
│   │       ├── ContactPreview.tsx + .module.css
│   │       └── Footer.tsx + .module.css
│   │
│   ├── work/
│   │   ├── page.tsx                # work index
│   │   ├── work.module.css
│   │   └── [slug]/
│   │       ├── page.tsx            # project detail (DB-backed)
│   │       └── page.module.css
│   │
│   ├── services/
│   │   ├── page.tsx                # services index (flat list, DB-backed)
│   │   ├── page.module.css
│   │   └── [slug]/
│   │       ├── page.tsx            # service detail
│   │       └── page.module.css
│   │
│   ├── admin/                      # admin routes
│   │   ├── (authed)/               # protected route group — middleware enforces
│   │   │   ├── layout.tsx          # sidebar + main content
│   │   │   ├── layout.module.css
│   │   │   ├── page.tsx            # dashboard
│   │   │   ├── page.module.css
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx        # list
│   │   │   │   ├── ProjectForm.tsx
│   │   │   │   ├── DeleteButton.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/edit/page.tsx
│   │   │   ├── testimonials/       # same shape as projects/
│   │   │   └── services/           # same shape as projects/
│   │   └── login/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       └── page.module.css
│   │
│   └── api/
│       ├── contact/route.ts        # public form submission handler
│       ├── auth/[...nextauth]/route.ts
│       └── admin/
│           ├── projects/route.ts            # GET (list) + POST (create)
│           ├── projects/[id]/route.ts       # GET + PATCH + DELETE
│           ├── testimonials/route.ts
│           ├── testimonials/[id]/route.ts
│           ├── services/route.ts
│           └── services/[id]/route.ts
│
├── lib/
│   ├── cad/
│   │   ├── SheetProvider.tsx
│   │   ├── useSheetObserver.ts
│   │   ├── useScrollProgress.ts
│   │   ├── useSpotlight.ts
│   │   ├── useTypewriter.ts
│   │   └── useReducedMotion.ts
│   ├── projects.ts                 # DB-backed (Drizzle) project queries
│   ├── services.ts                 # DB-backed (Drizzle) service queries
│   ├── testimonials.ts             # DB-backed (Drizzle) testimonial queries with project join
│   ├── Founders.ts                 # static (used by Footer; team data is hardcoded in FoundersPreview)
│   ├── faq.ts
│   ├── email.ts
│   └── validation.ts               # Zod schemas — projectFormSchema, serviceFormSchema, etc.
│
├── db/
│   ├── schema.ts                   # all tables + types
│   └── index.ts                    # re-exports + Drizzle client
│
├── drizzle/                        # auto-generated migrations
│
├── scripts/
│   ├── create-admin.ts             # CLI to seed first admin user
│   └── seed.ts                     # starter content seed
│
├── public/
│   ├── Logo.png                    # site logo (used in navbar + 404)
│   ├── Favicon-04.png              # used on the 3D building roof glyph
│   └── Logo-A1.png
│
├── auth.ts                         # NextAuth v5 configuration
├── middleware.ts                   # /admin/* route protection
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

---

## Environment Variables

`.env.local` (never committed):

```env
# ── Database ──
DATABASE_URL=postgresql://user:password@host.aws.neon.tech/neondb?sslmode=require

# ── Auth ──
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000     # production: https://bluprynt.com

# ── Resend (still pending) ──
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
[email protected]
[email protected]

# ── Site ──
NEXT_PUBLIC_SITE_URL=https://bluprynt.com
```

---

## Database Schema

Six tables currently:

### `projects`
Case studies. Editable from `/admin/projects`.

### `testimonials`
Client quotes, with optional `relatedProjectSlug` linking to a project. Editable from `/admin/testimonials`.

### `services`
What the firm offers. Editable from `/admin/services`. No category grouping (flat list).

### `users`
Admin accounts. Created via `scripts/create-admin.ts`. Used by NextAuth.

### `formSubmissions`
Inbound contact-form submissions (stored alongside the email log).

### `emailLog`
Audit trail of every Resend send — type, recipient, status, timestamps.

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
- [x] Logo file in `public/Logo.png`
- [ ] Web font licenses confirmed (Scto + Cereal are paid)
- [ ] Favicon set generated (currently `app/icon.png` for auto-detect)

### Homepage (using placeholder copy)

- [x] Hero headline + subheading — written
- [x] AboutPreview "Why Bluprynt" copy — written (4 differentiators)
- [x] Cost advantage panel — written ($80k savings figure)
- [x] FoundersPreview team list — Leadership + Delivery Team rendered with placeholder photos (F1/F2/T1/T2/T3)
- [x] ContactPreview direct contact directory — structure built with placeholder phone numbers + emails
- [ ] Real phone numbers in `ContactPreview.tsx` `DIRECT` array
- [ ] Real emails (CEO, CFO, general) in `ContactPreview.tsx`
- [ ] Real team photos in `public/team/` — set `photoUrl` on each `LEADERSHIP` and `DELIVERY` entry in `FoundersPreview.tsx`
- [ ] Real testimonial quotes flagged `featured=true` in DB

### Work / projects

- [ ] Real project list entered into the database via `/admin/projects/new`
- [ ] Per project — name, slug, sector, year, scope, status, client, location, tools, challenge, approach, outcome, featured

### Services

- [ ] Real service descriptions entered into the database via `/admin/services/new`
- [ ] Per service — title, line, description, region, tag, deliverables, whenToEngage, featured

### Contact

- [x] Contact form fields finalised (name, email, organization, multi-select services, location, message)
- [ ] Firm email address confirmed
- [ ] Real phone numbers + WhatsApp links in direct-contact directory
- [ ] Response time expectation copy ("respond within one business day" — already in form footer)
- [ ] FAQ replies — 3–5 Q&A per service area

### Site-wide / technical

- [x] Per-page SEO meta title + description
- [x] Custom 404 page
- [x] Loading state component
- [x] Footer with Quick Links + Reach Out columns
- [ ] Replace placeholder Reach Out social URLs in `Footer.tsx`
- [ ] Analytics platform set up (Vercel Analytics planned)
- [ ] Privacy policy published
- [ ] Open Graph image (1200×630)
- [ ] Domain purchased + pointed
- [ ] Resend domain verified (SPF, DKIM, DMARC)

### Admin

- [x] First admin user created via `scripts/create-admin.ts`
- [x] CRUD interfaces for projects, testimonials, services
- [ ] Admin password documented securely
- [ ] Toast notifications for save/delete success/error
- [ ] UI polish pass (consistency check across list/edit/create views)

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

# admin
npx tsx scripts/create-admin.ts    # create the first admin user

# checks
npm run lint
npm run type-check

# production
npm run build
npm run start
```

Built with [Next.js 15](https://nextjs.org) (App Router) + TypeScript + CSS Modules + [Drizzle](https://orm.drizzle.team) + [Neon Postgres](https://neon.tech) + [NextAuth](https://authjs.dev). Designed for [Vercel](https://vercel.com) deployment.

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