# [Bluprynt-Consulting] — Website Project

> Pre-consulting firm website. Dark charcoal + gold theme. Built to impress, built to convert.

---

## Project Status

| Phase | Status | Notes |
|-------|--------|-------|
| MVP | 🔲 Not started | Core pages + contact + emails |
| Phase 2 | 🔲 Not started | Reports, testimonials, CMS |
| Phase 3 | 🔲 Not started | CRM, animations, pricing |

---

## Brand & Design

| Property | Value |
|----------|-------|
| Primary color | TBD (dark charcoal) |
| Accent color | TBD (gold) |
| Font — headings | TBD |
| Font — body | TBD |
| Cursor | AutoCAD-style crosshair |
| Logo | TBD |
| Tagline | TBD |

---

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Frontend | TBD | Next.js / Astro / plain HTML |
| Hosting | TBD | Vercel / Netlify / other |
| CMS | TBD | Sanity / Contentful / Notion / none |
| Email | TBD | Resend / EmailJS / SendGrid |
| Forms | TBD | Native / Formspree / other |
| Analytics | TBD | — |

---

## Pages

### MVP
- [ ] `/` — Homepage (hero, intro, services teaser, CTA)
- [ ] `/about` — About page (founder bio, philosophy, credentials)
- [ ] `/projects` — Project gallery (cards)
- [ ] `/projects/[slug]` — Individual case study
- [ ] `/services` — Services overview
- [ ] `/contact` — Contact form

### Phase 2
- [ ] `/reports` — Downloadable reports/whitepapers
- [ ] `/testimonials` — Client testimonials (or embed in homepage)

### Phase 3
- [ ] `/services/[slug]` — Detailed service pages with pricing tiers

---

## Features

### MVP
- [ ] AutoCAD crosshair cursor (custom CSS/JS)
- [ ] Dark charcoal + gold theme (global CSS variables)
- [ ] Responsive layout (mobile-first)
- [ ] Contact form — client-side validation
- [ ] Automated confirmation email to prospect on form submit
- [ ] Automated alert email to firm owner on form submit

### Phase 2
- [ ] PDF report download (gated or open)
- [ ] Testimonials section / carousel
- [ ] CMS integration for case studies and reports
- [ ] SEO meta tags + Open Graph

### Phase 3
- [ ] CRM or Google Sheets lead tracking
- [ ] Scroll animations / parallax
- [ ] Service pricing tiers
- [ ] Blog / insights section (optional)

---

## User Stories

### Discovery
- As a visitor, I want a striking homepage so I immediately understand this is a premium firm.
- As a mobile user, I want full responsiveness on any device.
- As a visitor, I want the AutoCAD crosshair cursor so I feel the precision identity of the firm.

### Credibility
- As a prospect, I want an About page with the founder's background and philosophy.
- As a prospect, I want to browse case studies to see relevant experience.
- As a visitor, I want to read client testimonials to validate the firm's reputation.
- As a prospect, I want to download published reports to assess depth of expertise.

### Services
- As a visitor, I want a clear Services page so I know exactly what the firm offers.

### Engagement
- As a prospect, I want to submit a contact form without needing to call.
- As a prospect, I want an automated confirmation email after reaching out.
- As the firm owner, I want an automated alert with lead details on every form submission.

### Admin
- As the firm owner, I want to update case studies and reports without a developer.

---

## Email Templates

### Prospect confirmation
- Subject: `We've received your message — [Firm Name]`
- Content: TBD

### Owner alert
- Subject: `New inquiry from [Name] — [Firm Name] website`
- Fields: name, email, message, timestamp

---

## Folder Structure (proposed)

```
/
├── public/
│   ├── fonts/
│   ├── images/
│   └── reports/          ← downloadable PDFs
├── src/
│   ├── components/
│   │   ├── Cursor.jsx    ← AutoCAD crosshair
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ContactForm.jsx
│   │   └── ProjectCard.jsx
│   ├── pages/
│   │   ├── index.jsx
│   │   ├── about.jsx
│   │   ├── projects/
│   │   ├── services.jsx
│   │   ├── reports.jsx
│   │   └── contact.jsx
│   ├── styles/
│   │   └── globals.css   ← CSS variables, theme
│   └── lib/
│       └── email.js      ← email send logic
├── content/              ← CMS or markdown content
│   ├── projects/
│   └── reports/
├── README.md
└── .env.example
```

---

## Environment Variables

```env
# Email
EMAIL_SERVICE_API_KEY=
OWNER_EMAIL=
FROM_EMAIL=

# CMS (if applicable)
CMS_API_KEY=
CMS_PROJECT_ID=

# Analytics (if applicable)
ANALYTICS_ID=
```

---

## Notes & Decisions Log

| Date | Decision | Reason |
|------|----------|--------|
| — | TBD | — |

---

## Content To-Do

- [ ] Firm name confirmed
- [ ] Tagline written
- [ ] Founder bio written
- [ ] Services list finalized
- [ ] At least 2 case studies ready
- [ ] 3+ testimonials collected
- [ ] Logo / wordmark ready
- [ ] Brand colors confirmed (hex values)
- [ ] Report(s) ready for upload

---

## Contacts & Access

| Role | Name | Contact |
|------|------|---------|
| Owner / client | TBD | — |
| Developer | TBD | — |
| Domain registrar | TBD | — |
| Hosting | TBD | — |

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
