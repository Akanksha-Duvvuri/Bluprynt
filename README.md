# Bluprynt Consulting Group — Website Project

> Pre-consulting firm website. Cream + gold on warm charcoal.
> _Engineering Accuracy. Consulting Excellence — from blueprint to brilliance._

---

## Project Status

| Phase    | Status         | Notes                                                              |
|----------|----------------|--------------------------------------------------------------------|
| Design   | ✅ Locked       | CAD-hosted homepage with crosshair-spotlight reveal                |
| MVP      | 🟡 In progress  | Homepage built as static HTML mock; Next.js port in progress       |
| Phase 2  | 🔲 Not started  | Reports, testimonials, CMS                                         |
| Phase 3  | 🔲 Not started  | CRM, scroll animations, pricing                                    |

---

## Brand & Design

### Colors (locked)

| Role        | Hex        | RGB              | Use                                          |
|-------------|------------|------------------|----------------------------------------------|
| Gold        | `#C4A564`  | 196, 165, 100    | Primary accent — type, lines, CTAs           |
| Cream       | `#FFEEC6`  | 255, 238, 198    | Light bg / readable text on dark             |
| Red         | `#C16565`  | 193, 101, 101    | Status — flagged, errors, "review pending"   |
| Mint        | `#CAFFD1`  | 202, 255, 209    | Status — live, success, snap indicator       |
| Ink         | `#15130D`  | 21, 19, 13       | Warm charcoal — primary dark surface         |
| Ink Soft    | `#1C1A14`  | —                | Elevated dark surfaces (cards, ribbon)       |
| Ink Deep    | `#0D0C08`  | —                | Page base / lowest layer                     |

### Typography (locked)

| Role         | Typeface              | Stand-in (free)        | Used for                                       |
|--------------|-----------------------|------------------------|------------------------------------------------|
| Primary      | Scto Grotesk A        | Inter Tight            | Headlines, body, navigation                    |
| Secondary    | Airbnb Cereal W BD    | Nunito                 | Buttons, captions, UI labels                   |
| Mono         | Space Mono            | Space Mono (free)      | Coordinates, sheet codes, technical readouts   |

> **Font licensing note:** Both Scto Grotesk A and Airbnb Cereal W BD are paid/restricted typefaces. Confirm web licenses before launch. Until then, Inter Tight and Nunito ship as fallbacks. Swap is one CSS change per font (handled via `next/font/local`).

### Cursor (locked)

- AutoCAD-style gold crosshair, **~30px wide** (slightly larger than default cursor — *not* edge-to-edge of the viewport)
- Site-wide on desktop, default cursor on touch
- Coordinates + sheet code readout follow the cursor (mono, 9px)
- Mint snap indicator appears at grid intersections (every 20px)

### Visual concept (locked)

The homepage is a CAD workstation. A faint drafting layer (grid, dimensions, title blocks) sits beneath a dark CAD substrate. The crosshair acts as a **spotlight** — the drafting layer brightens locally only where the cursor hovers. By default, the grid is barely perceptible.

Sections **alternate cream and dark** down the page to break monotony — the CAD chrome (top bar, status bar, crosshair, spotlight) persists across both.

---

## Tech Stack (locked)

| Layer      | Choice                  | Notes                                                    |
|------------|-------------------------|----------------------------------------------------------|
| Frontend   | Next.js (App Router)    | TypeScript, React 18+                                    |
| Hosting    | Vercel                  | Native Next.js support, free tier covers MVP             |
| CMS        | Markdown + Frontmatter  | `/content/projects` and `/content/reports` — no SaaS for MVP |
| Email      | Resend                  | Confirmation + alert + keyword-routed FAQ replies        |
| Forms      | Native Next.js API route| `app/api/contact/route.ts` — calls Resend                |
| Analytics  | Vercel Analytics        | Defer to Phase 2 if needed                               |

---

## Pages

### MVP

- [ ] `/` — Homepage (CAD-hosted, crosshair spotlight, alternating sections)
- [ ] `/about` — Founders, philosophy, credentials
- [ ] `/projects` — Project gallery (cards, sector filter)
- [ ] `/projects/[slug]` — Individual case study
- [ ] `/services` — Services overview (4 services × deliverables × engagement type)
- [ ] `/contact` — Contact form

### Phase 2

- [ ] `/reports` — Downloadable reports / whitepapers
- [ ] `/testimonials` — Client testimonials (or homepage-embedded only)

### Phase 3

- [ ] `/services/[slug]` — Detailed service pages with pricing tiers

---

## Features

### MVP

- [x] AutoCAD crosshair cursor — ~30px, gold, with X/Y readout (US-01)
- [x] Cream + gold + warm-charcoal theme via CSS variables
- [x] Crosshair-spotlight reveal of CAD/drafting layer (signature interaction)
- [x] Alternating cream / dark sections on homepage
- [ ] Responsive layout (mobile = no crosshair, normal cursor — US-23)
- [ ] Contact form with client-side validation (US-15)
- [ ] Resend integration — prospect confirmation (US-16) + owner alert (US-17)
- [ ] Keyword-based FAQ matching for confirmation email (US-18)

### Phase 2

- [ ] PDF report download (open or email-gated — TBD)
- [ ] Testimonials carousel
- [ ] CMS / markdown content pipeline for projects + reports
- [ ] SEO meta tags + Open Graph (US-20, US-22)

### Phase 3

- [ ] CRM or Google Sheets lead tracking
- [ ] Scroll-triggered animations / parallax
- [ ] Service pricing tiers
- [ ] Blog / insights section (optional)

---

## Folder Structure (Next.js App Router)

```
/
├── app/
│   ├── layout.tsx              # global chrome — TopBar, Crosshair, StatusBar, Footer
│   ├── page.tsx                # homepage composition
│   ├── globals.css             # CSS variables + base styles
│   ├── fonts/                  # local font files (Scto, Cereal) — when licensed
│   ├── components/
│   │   ├── Crosshair.tsx       # cursor + readout + snap indicator
│   │   ├── TopBar.tsx          # ribbon-style top navigation
│   │   ├── StatusBar.tsx       # CAD status strip (SNAP / GRID / etc.)
│   │   ├── Footer.tsx          # site-wide footer
│   │   ├── Sheet.tsx           # section wrapper with spotlight + drawing layer
│   │   ├── TitleBlock.tsx      # per-section drafting title block
│   │   ├── DimensionLine.tsx   # reusable horizontal/vertical dimension overlay
│   │   └── sections/
│   │       ├── Hero.tsx                # Sheet A-001 (dark)
│   │       ├── WorkPreview.tsx         # Sheet A-002 (cream)
│   │       ├── ServicesPreview.tsx     # Sheet A-003 (dark)
│   │       ├── AboutPreview.tsx        # Sheet A-004 (cream)
│   │       └── ContactPreview.tsx      # Sheet A-006 (dark)
│   ├── about/page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── services/page.tsx
│   ├── reports/page.tsx
│   ├── contact/page.tsx
│   └── api/
│       └── contact/route.ts    # Resend send + keyword routing
├── content/
│   ├── projects/               # markdown case studies
│   └── reports/                # report metadata + PDFs
├── public/
│   ├── fonts/
│   ├── images/
│   └── reports/                # downloadable PDFs
├── lib/
│   ├── email.ts                # Resend client + template builder
│   └── faq.ts                  # keyword groups → FAQ block (US-18)
├── README.md
├── .env.example
└── next.config.js
```

---

## Environment Variables

```env
# Email (Resend)
RESEND_API_KEY=
OWNER_EMAIL=
FROM_EMAIL=hello@bluprynt.com

# Site
NEXT_PUBLIC_SITE_URL=https://bluprynt.com

# Analytics (Phase 2)
NEXT_PUBLIC_ANALYTICS_ID=
```

---

## Email Templates

### Prospect confirmation (US-16)

- **Subject:** `We've received your enquiry — Bluprynt Consulting Group`
- **From:** `hello@bluprynt.com`
- **Body:** branded HTML — dark bg, gold accents, footer with contact info; plain-text fallback
- **Personalisation:** opens with prospect's first name
- **FAQ block:** chosen by keyword scan of message body — see `lib/faq.ts`

### Owner alert (US-17)

- **Subject:** `New enquiry from [Name] — Bluprynt Consulting Group`
- **To:** `OWNER_EMAIL`
- **Reply-to:** prospect's email (so owner replies directly to prospect)
- **Body:** plain text — name, email (mailto), company, full message, detected service area, timestamp

### Keyword routing (US-18)

Defined in `lib/faq.ts` — single config file, no code changes needed to update copy.

| Group        | Keywords (case-insensitive)                            | FAQ block   |
|--------------|--------------------------------------------------------|-------------|
| Structural   | structural, load, foundation, beam, column, slab       | `STRUCTURAL`|
| Feasibility  | feasibility, concept, viability, scoping, brief        | `FEASIBILITY`|
| Advisory     | advisory, owner, retainer, ongoing, consulting         | `ADVISORY`  |
| (fallback)   | _no match_                                             | `GENERAL`   |

First match wins. Each block contains 3–5 Q&A pairs.

---

## Design Decisions Log

| Date       | Decision                                                                                    | Reason                                                                  |
|------------|---------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| 2026-04-26 | Drop pure black; use warm charcoal `#15130D`                                                | Cream `#FFEEC6` reads warm against it, harsh against pure black         |
| 2026-04-26 | No serif fonts — primary is Scto Grotesk A (grotesk)                                        | Brand book specifies grotesk; serifs would conflict                     |
| 2026-04-26 | Red and mint are functional, not decorative                                                 | Used only for status (live, flagged, snap, success) — earns its place   |
| 2026-04-26 | CAD hosts the homepage; drafting elements (title blocks, dimensions) are overlays           | Confirmed direction — interactive workstation feel over static drawing  |
| 2026-04-26 | Crosshair is small (~30px), not edge-to-edge                                                | Less visually overwhelming, behaves more like a real cursor             |
| 2026-04-26 | CAD grid hidden by default; revealed only inside the crosshair spotlight radius             | Default state should feel calm; the reveal is the moment of delight     |
| 2026-04-26 | Sections alternate cream and dark down the homepage                                         | Breaks the dark monotony, lets gold + ink type alternate as accents     |
| 2026-04-26 | Crosshair persists site-wide on desktop; mobile falls back to default cursor                | US-01 + US-23                                                           |

---

## Content To-Do

> Marked items are content blockers — copy/assets needed from owner before that section can ship.

### Brand & identity

- [x] Firm name confirmed — Bluprynt Consulting Group
- [x] Tagline confirmed — _Engineering accuracy. Consulting excellence._
- [ ] Logo / wordmark SVG (final)
- [x] Brand colors confirmed
- [x] Fonts chosen (Scto Grotesk A + Airbnb Cereal W BD)
- [ ] Web font licenses confirmed
- [ ] Favicon set generated (16/32/180/192/512 + manifest — US-22)

### Homepage

- [ ] Hero headline + subheading — final
- [ ] Intro paragraph (what you do, who you serve)
- [ ] Key stats (projects, sectors, founded)
- [ ] 2–3 featured projects selected
- [ ] Services teaser copy (4 services × 1-line desc)
- [ ] 1–2 testimonial quotes for homepage
- [ ] Latest report selected for homepage feature

### About / founders

- [ ] Firm origin story
- [ ] Founder 1 — photo, name, role, bio (3–5 sentences), LinkedIn, degrees, licences, software certs, affiliations, awards
- [ ] Founder 2 — same as above

### Projects

- [ ] Project list finalised (minimum 2 for launch)
- [ ] Per project — name, summary, sector, location, thumbnail, full description (challenge/approach/outcome), images/drawings, client (or anonymised), year, tools

### Services

- [ ] Full list finalised (currently 4: Structural Assessment, Feasibility, Advisory, Due Diligence)
- [ ] Per service — name, description, deliverables, engagement type, timeline, who it's for
- [ ] CTA copy for bottom of services page

### Certifications / credentials

- [ ] All academic degrees (both founders)
- [ ] All professional licences with issuing body
- [ ] All software certifications
- [ ] Industry training / qualifications
- [ ] Credential PDFs / verification links

### Reports / publications (Phase 2)

- [ ] Report list finalised
- [ ] Per report — title, date, abstract, PDF
- [ ] Decision: open download or email-gated

### Testimonials (Phase 2)

- [ ] Minimum 3 testimonials collected
- [ ] Per testimonial — name, title, company, quote (client-approved), linked project

### Contact

- [x] Contact form fields finalised (name, email, company, message)
- [ ] Firm email address confirmed
- [ ] Phone number — include or not
- [ ] Location / remote availability copy
- [ ] Response time expectation
- [ ] Social links (LinkedIn confirmed)
- [ ] Office address / map embed — yes / no
- [ ] Prospect confirmation email copy
- [ ] Owner alert fields confirmed
- [ ] FAQ replies — 3–5 Q&A per service area (Structural, Feasibility, Advisory, General)

### Footer

- [x] Footer nav structure decided
- [ ] Copyright line (final)
- [ ] Privacy policy drafted

### Site-wide / technical

- [ ] Analytics platform set up
- [ ] Privacy policy published
- [ ] Per-page SEO meta title + description
- [ ] Open Graph image (1200×630)
- [ ] 404 page
- [ ] Domain purchased + pointed

---

## Contacts & Access

| Role             | Name | Contact |
|------------------|------|---------|
| Owner / client   | TBD  | —       |
| Developer        | TBD  | —       |
| Domain registrar | TBD  | —       |
| Hosting          | Vercel | —     |

---

## Dev Setup

```bash
# install
npm install

# develop
npm run dev

# Open http://localhost:3000
```

Built with [Next.js](https://nextjs.org) (App Router) + TypeScript + `next/font`. Deployed on [Vercel](https://vercel.com).

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
