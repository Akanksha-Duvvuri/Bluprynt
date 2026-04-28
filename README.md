# Bluprynt Consulting Group — Website Project

> Pre-consulting firm website. Cream + gold on warm charcoal.
> _Engineering Accuracy. Consulting Excellence — from blueprint to brilliance._

---

## Project Status

| Phase    | Status         | Notes                                                              |
|----------|----------------|--------------------------------------------------------------------|
| Design   | ✅ Locked       | CAD-hosted homepage, crosshair-spotlight reveal, alternating sheets |
| Homepage | ✅ Built        | Next.js + TypeScript, all 5 sections live, runs on `npm run dev`   |
| Inner pages | 🟡 Pending  | `/about`, `/projects`, `/projects/[slug]`, `/services`, `/contact` |
| Email    | 🟡 Stubbed     | API route + templates written; needs Resend account + verified domain |
| Phase 2  | 🔲 Not started | Reports, testimonials, CMS pipeline                                |
| Phase 3  | 🔲 Not started | CRM, scroll animations, pricing                                    |

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

> **Font swap on launch:** When licensed font files are in hand, drop them in `app/fonts/` and replace the three `next/font/google` imports in `app/layout.tsx` with `next/font/local`. Every component reads from CSS variables (`--font-primary`, `--font-secondary`, `--font-mono`), so no other file changes.

### Cursor (locked)

- AutoCAD-style gold crosshair, **~30px wide** (slightly larger than default cursor — *not* edge-to-edge)
- Site-wide on desktop; default cursor on touch devices
- Live X / Y / Sheet code readout follows the cursor (mono, 9px)
- Crosshair acts as a **spotlight** — reveals a brighter drafting layer (grid + warm wash) inside its radius
- Default grid is barely visible (2.5% opacity); fully revealed only inside the spotlight

### Layout (locked)

- Sections **alternate cream and dark** down the homepage
- Persistent CAD chrome: ribbon-style top bar + bottom status bar across both
- Each section is a "sheet" with its own ID code (A-001 through A-005)
- Per-section title block (top-right) and sheet metadata (top-left) using drafting conventions

---

## Tech Stack (locked)

| Layer      | Choice                  | Notes                                                    |
|------------|-------------------------|----------------------------------------------------------|
| Frontend   | Next.js 15 (App Router) | TypeScript, React 19, CSS Modules                        |
| Hosting    | Vercel                  | Native Next.js support, free tier covers MVP             |
| CMS        | Markdown + Frontmatter  | `/content/projects` and `/content/reports` (when built)  |
| Email      | Resend                  | Confirmation + alert + keyword-routed FAQ replies        |
| Forms      | Native API route        | `app/api/contact/route.ts` calls Resend                  |
| Analytics  | Vercel Analytics        | Defer to Phase 2 if needed                               |

---

## Pages

### MVP

- [x] `/` — Homepage (CAD-hosted, crosshair spotlight, alternating sections)
- [ ] `/about` — Founders, philosophy, credentials
- [ ] `/projects` — Project gallery (cards, sector filter)
- [ ] `/projects/[slug]` — Individual case study
- [ ] `/services` — Services overview (4 services × deliverables × engagement type)
- [ ] `/contact` — Contact form (full page; preview lives on homepage)

### Phase 2

- [ ] `/reports` — Downloadable reports / whitepapers
- [ ] `/testimonials` — Client testimonials (or homepage-embedded only)

### Phase 3

- [ ] `/services/[slug]` — Detailed service pages with pricing tiers

---

## Features

### MVP

- [x] AutoCAD crosshair cursor — ~30px, gold, with X/Y/Sheet readout (US-01)
- [x] Cream + gold + warm-charcoal theme via CSS variables
- [x] Crosshair-spotlight reveal of CAD/drafting layer (signature interaction)
- [x] Alternating cream / dark sections on homepage
- [x] Section-level sheet codes (A-001 → A-005), live in cursor readout + status bar
- [x] Scroll-tracked active nav (IntersectionObserver in TopBar)
- [x] Responsive layout — touch devices fall back to default cursor + static visible grid (US-23)
- [x] Contact form with client-side validation (US-15)
- [x] API route that scans for keywords and routes to FAQ groups (US-18)
- [ ] Resend integration tested end-to-end — needs API key + verified domain (US-16, US-17)
- [ ] Favicon set (16/32/180/192/512 + manifest — US-22)

### Phase 2

- [ ] PDF report download (open or email-gated — TBD)
- [ ] Testimonials carousel
- [ ] Markdown content pipeline for projects + reports
- [ ] Per-page SEO meta tags + Open Graph (US-20, US-22)

### Phase 3

- [ ] CRM or Google Sheets lead tracking
- [ ] Scroll-triggered animations / parallax
- [ ] Service pricing tiers
- [ ] Blog / insights section (optional)

---

## Project Structure

```
/
├── app/
│   ├── layout.tsx              # global chrome — TopBar, Crosshair, StatusBar, Footer + fonts
│   ├── page.tsx                # homepage — composes the 5 sections
│   ├── globals.css             # brand variables + base styles + sheet/spotlight system
│   ├── favicon.ico             # auto-detected by Next.js (no metadata config needed)
│   ├── fonts/                  # local font files (Scto, Cereal) — when licensed
│   ├── components/
│   │   ├── Crosshair.tsx       # cursor + spotlight + readout (CLIENT)
│   │   ├── Crosshair.module.css
│   │   ├── TopBar.tsx          # ribbon nav, scroll-tracked active state (CLIENT)
│   │   ├── TopBar.module.css
│   │   ├── StatusBar.tsx       # bottom CAD status strip (server)
│   │   ├── StatusBar.module.css
│   │   ├── Footer.tsx          # site-wide footer (server)
│   │   ├── Footer.module.css
│   │   ├── ContactForm.tsx     # form with validation, POSTs to /api/contact (CLIENT)
│   │   ├── ContactForm.module.css
│   │   ├── Sheet.tsx           # reusable section wrapper — drawing + spotlight + corner ticks
│   │   ├── TitleBlock.tsx      # title block + SheetMeta — both named exports
│   │   └── sections/
│   │       ├── Hero.tsx + .module.css            # Sheet A-001 (dark)
│   │       ├── WorkPreview.tsx + .module.css     # Sheet A-002 (cream)
│   │       ├── ServicesPreview.tsx + .module.css # Sheet A-003 (dark)
│   │       ├── AboutPreview.tsx + .module.css    # Sheet A-004 (cream)
│   │       └── ContactPreview.tsx + .module.css  # Sheet A-005 (dark)
│   └── api/
│       └── contact/route.ts    # POST /api/contact — keyword routing + Resend
├── lib/
│   ├── faq.ts                  # keyword groups + FAQ copy (US-18, owner-editable)
│   └── email.ts                # Resend client + email templates
├── public/                     # static assets
├── package.json
├── tsconfig.json
├── next.config.js
├── .env.example
├── .gitignore
├── README.md                   # this file
└── SETUP.md                    # quick-start guide
```

### Component architecture notes

- **Server components by default** — Sheet, TitleBlock, Footer, StatusBar, all five sections render on the server. Faster, smaller client bundle.
- **Client components are explicit** — Crosshair, TopBar, ContactForm carry `"use client"` because they use hooks and event listeners.
- **CSS Modules per component** — each component owns its styles. Shared utilities (`.btn-primary`, `.section-head`, sheet/spotlight classes) live in `globals.css`.
- **Sheet primitive** — every section uses `<Sheet id="..." variant="dark|cream">` to inherit the drawing layer + spotlight + corner ticks without duplicating boilerplate.
- **Performance hot path** — Crosshair updates use refs + `requestAnimationFrame` and write directly to CSS variables / `textContent`, never through React state. Smooth 60fps with no re-renders.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```env
# ── Resend (transactional email) ──
# https://resend.com → API Keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx

# Email the prospect's confirmation is sent FROM
# Must be on a domain you've verified in Resend
[email protected]

# Email the owner-alert is sent TO
[email protected]

# ── Site ──
NEXT_PUBLIC_SITE_URL=https://bluprynt.com
```

The site renders without any of these set — only the contact form fails on submit until they're configured.

---

## Email Templates

### Prospect confirmation (US-16)

- **Subject:** `We've received your enquiry — Bluprynt Consulting Group`
- **From:** `FROM_EMAIL` (must be on a Resend-verified domain)
- **Body:** branded HTML — dark bg, gold accents, plain-text fallback included
- **Personalisation:** opens with prospect's first name
- **FAQ block:** chosen by keyword scan of message body — see `lib/faq.ts`

### Owner alert (US-17)

- **Subject:** `New enquiry from [Name] — Bluprynt Consulting Group`
- **To:** `OWNER_EMAIL`
- **Reply-to:** prospect's email (so owner replies directly to prospect)
- **Body:** plain text — name, email, company, full message, detected service area, timestamp

### Keyword routing (US-18)

Defined in `lib/faq.ts`. Single config file, no code changes to update copy.

| Group        | Keywords (case-insensitive, whole-word)                | FAQ block       |
|--------------|--------------------------------------------------------|-----------------|
| Structural   | structural, load, foundation, beam, column, slab       | `STRUCTURAL`    |
| Feasibility  | feasibility, concept, viability, scoping, brief        | `FEASIBILITY`   |
| Advisory     | advisory, owner, retainer, ongoing, consulting         | `ADVISORY`      |
| Diligence    | diligence, acquisition, lender, audit, review          | `DILIGENCE`     |
| (fallback)   | _no match_                                             | `GENERAL`       |

First match wins. Each block contains 3–5 Q&A pairs.

---

## Design Decisions Log

| Date       | Decision                                                                                    | Reason                                                                  |
|------------|---------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| 2026-04-26 | Drop pure black; use warm charcoal `#15130D`                                                | Cream `#FFEEC6` reads warm against it, harsh against pure black         |
| 2026-04-26 | No serif fonts — primary is Scto Grotesk A (grotesk)                                        | Brand book specifies grotesk; serifs would conflict                     |
| 2026-04-26 | Red and mint are functional, not decorative                                                 | Used only for status (live, flagged, success) — earns its place         |
| 2026-04-26 | CAD hosts the homepage; drafting elements (title blocks, dimensions) are overlays           | Confirmed direction — interactive workstation feel over static drawing  |
| 2026-04-26 | Crosshair is small (~30px), not edge-to-edge                                                | Less visually overwhelming, behaves more like a real cursor             |
| 2026-04-26 | CAD grid hidden by default; revealed only inside the crosshair spotlight radius             | Default state should feel calm; the reveal is the moment of delight     |
| 2026-04-26 | Sections alternate cream and dark down the homepage                                         | Breaks the dark monotony, lets gold + ink type alternate as accents     |
| 2026-04-26 | Crosshair persists site-wide on desktop; mobile falls back to default cursor                | US-01 + US-23                                                           |
| 2026-04-26 | Next.js 15 + React 19 + App Router + CSS Modules                                            | Server components by default, explicit `"use client"` for interactivity |
| 2026-04-28 | Coordinate readout uses refs + `requestAnimationFrame`, not React state                     | 60fps DOM writes; React state would re-render the component every frame |
| 2026-04-28 | Favicon placed at `app/favicon.ico` for auto-detection                                      | No metadata config needed; Next.js handles it automatically             |

---

## Known issues / lessons learned during build

- **CSS not loading on first run** — root cause was a partial overwrite: `app/layout.tsx` and `app/globals.css` were still the `create-next-app` defaults, and three `*.module.css` files were missing from `app/components/`. Always overwrite all bundle files; don't merge selectively.
- **`process.env.NEXT_PUBLIC_SITE_URL` markdown link issue** — when copying code from chat, this can become `[process.env.NEXT](http://...)_PUBLIC_SITE_URL` due to chat formatting. Always paste from bundle files, not the chat.
- **Favicon in metadata** — don't reference `/favicon.ico` in the `metadata.icons` config when using App Router. Just place the file at `app/favicon.ico` and Next.js auto-injects the right `<link>` tags. Trying to reference `/site.webmanifest` without creating the file causes 404s on every request.

---

## Content To-Do

> Marked items are content blockers — copy/assets needed from owner before that section can ship to production.

### Brand & identity

- [x] Firm name confirmed — Bluprynt Consulting Group
- [x] Tagline — _Engineering accuracy. Consulting excellence._
- [x] Brand colors confirmed
- [x] Fonts chosen (Scto Grotesk A + Airbnb Cereal W BD)
- [ ] Logo / wordmark SVG (final)
- [ ] Web font licenses confirmed (Scto + Cereal are paid)
- [ ] Favicon set generated (16/32/180/192/512 + manifest)

### Homepage (currently using placeholder copy)

- [ ] Hero headline + subheading — final
- [ ] Intro paragraph (what you do, who you serve)
- [ ] Key stats (projects, sectors, founded)
- [ ] 2–3 featured projects selected (currently using "Eastwood Viaduct", "Harbor Reclamation", "Cardinal Tower" placeholders)
- [ ] Services teaser copy — final
- [ ] 1–2 testimonial quotes for homepage (Phase 2)
- [ ] Latest report selected for homepage feature (Phase 2)

### About / founders

- [ ] Firm origin story
- [ ] Founder 1 — photo, name, role, bio (3–5 sentences), LinkedIn, degrees, licences, software certs
- [ ] Founder 2 — same as above

### Projects

- [ ] Project list finalised (minimum 2 for launch)
- [ ] Per project — name, summary, sector, location, thumbnail, full description (challenge/approach/outcome), images/drawings, client (or anonymised), year, tools

### Services

- [ ] Full list finalised (currently 4: Structural Assessment, Feasibility, Advisory, Due Diligence)
- [ ] Per service — name, description, deliverables, engagement type, timeline, who it's for
- [ ] CTA copy for bottom of services page

### Reports / publications (Phase 2)

- [ ] Report list finalised
- [ ] Per report — title, date, abstract, PDF
- [ ] Decision: open download or email-gated

### Testimonials (Phase 2)

- [ ] Minimum 3 testimonials collected
- [ ] Per testimonial — name, title, company, quote (client-approved), linked project

### Contact

- [x] Contact form fields finalised (name, email, company, message)
- [ ] Firm email address confirmed (currently `hello@bluprynt.com`)
- [ ] Phone number — include or not
- [ ] Location / remote availability copy
- [ ] Response time expectation
- [ ] Social links (LinkedIn confirmed)
- [ ] FAQ replies — 3–5 Q&A per service area (Structural, Feasibility, Advisory, Diligence, General) — placeholder copy in `lib/faq.ts`

### Footer

- [x] Footer nav structure decided
- [x] Copyright auto-generates from `new Date().getFullYear()`
- [ ] Privacy policy drafted

### Site-wide / technical

- [ ] Analytics platform set up (Vercel Analytics planned)
- [ ] Privacy policy published
- [ ] Per-page SEO meta title + description (homepage done, others pending with their pages)
- [ ] Open Graph image (1200×630)
- [ ] 404 page
- [ ] Domain purchased + pointed

---

## Dev Setup

```bash
# install
npm install

# develop
npm run dev
# → http://localhost:3000

# production
npm run build
npm run start

# checks
npm run lint
npm run type-check
```

Built with [Next.js 15](https://nextjs.org) (App Router) + TypeScript + CSS Modules. Designed for [Vercel](https://vercel.com) deployment.

---

## Contacts & Access

| Role             | Name        | Contact |
|------------------|-------------|---------|
| Owner / client   | TBD         | —       |
| Developer        | TBD         | —       |
| Domain registrar | TBD         | —       |
| Hosting          | Vercel      | —       |
| Email service    | Resend      | —       |