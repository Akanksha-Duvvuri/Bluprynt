# Bluprynt Consulting Group — Website Project

> Pre-consulting firm website. Dark charcoal + gold theme. 
> Engineering Accurary. Consulting Excellence, from blueprint to brilliance

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

### Brand & identity
- [ ] Firm name confirmed
- [ ] Tagline written
- [ ] Logo / wordmark ready (SVG preferred)
- [ ] Brand colors confirmed (hex values — charcoal + gold)
- [ ] Fonts chosen (headings + body)
- [ ] Favicon created

### Homepage
- [ ] Hero headline and subheading written
- [ ] Intro paragraph written (what you do, who you serve)
- [ ] Hero background image or visual chosen
- [ ] Key stats decided (years of experience, projects completed, clients served)
- [ ] 2–3 featured projects selected for homepage preview
- [ ] Services teaser copy written (short list)
- [ ] 1–2 testimonial quotes selected for homepage
- [ ] Latest report or publication selected for homepage feature
- [ ] CTA button label decided ("Get in touch" / "View our work" / other)

### About / founders
- [ ] Firm origin story written (how it started, philosophy)
- [ ] Founder 1 — photo ready
- [ ] Founder 1 — name, title, bio written (3–5 sentences)
- [ ] Founder 1 — LinkedIn URL
- [ ] Founder 1 — degrees listed (field, institution, year)
- [ ] Founder 1 — professional licences listed (P.Eng, PMP, etc.)
- [ ] Founder 1 — software certifications (AutoCAD, Revit, etc.)
- [ ] Founder 1 — affiliations / memberships
- [ ] Founder 1 — awards or recognition
- [ ] Founder 2 — photo ready
- [ ] Founder 2 — name, title, bio written
- [ ] Founder 2 — LinkedIn URL
- [ ] Founder 2 — degrees listed
- [ ] Founder 2 — professional licences listed
- [ ] Founder 2 — software certifications
- [ ] Founder 2 — affiliations / memberships
- [ ] Founder 2 — awards or recognition

### Projects
- [ ] Project list finalised (minimum 2 for launch)
- [ ] Each project — name and one-line summary
- [ ] Each project — sector / type / location
- [ ] Each project — thumbnail image
- [ ] Each project — full description written (challenge, approach, outcome)
- [ ] Each project — images, drawings, or diagrams ready
- [ ] Each project — client name confirmed (or anonymised)
- [ ] Each project — year and tools used noted

### Services
- [ ] Full list of services finalised
- [ ] Each service — name and description written
- [ ] Each service — deliverables listed
- [ ] Each service — engagement type noted (advisory / project / retainer / workshop)
- [ ] Each service — typical timeline noted
- [ ] Each service — who it is for written
- [ ] CTA copy for bottom of services page written

### Certifications / credentials
- [ ] All academic degrees listed (both founders)
- [ ] All professional licences listed with issuing body
- [ ] All software certifications listed
- [ ] Industry-specific training or qualifications listed
- [ ] Credential PDFs or verification links gathered (if sharing)

### Reports / publications
- [ ] Report list finalised
- [ ] Each report — title, date, short abstract written
- [ ] Each report — PDF ready for upload
- [ ] Decision made: open download or email-gated?
- [ ] Blog / insights section decided (yes / no / later)

### Testimonials
- [ ] Minimum 3 testimonials collected
- [ ] Each testimonial — client name, title, company confirmed
- [ ] Each testimonial — quote approved by client
- [ ] Each testimonial — linked to relevant project (if applicable)
- [ ] Client photos or company logos gathered (if permitted)

### Contact
- [ ] Contact form fields finalised
- [ ] Firm email address confirmed
- [ ] Phone number decided (include or not)
- [ ] Location / remote availability copy written
- [ ] Response time expectation set
- [ ] Social links confirmed (LinkedIn, etc.)
- [ ] Office address / map embed decided (yes / no)
- [ ] Automated email — prospect confirmation copy written
- [ ] Automated email — owner alert fields confirmed
- [ ] Automated email — FAQ reply content written (3–5 common questions)

### Footer
- [ ] Footer nav links decided
- [ ] Copyright line written
- [ ] Privacy policy page drafted (required for any data collection)

### Site-wide / technical
- [ ] Analytics platform chosen and set up
- [ ] Privacy policy published
- [ ] SEO meta title and description written for each page
- [ ] Open Graph image created (for LinkedIn / WhatsApp link previews)
- [ ] 404 page designed
- [ ] Domain purchased and pointed

---

The idea
When someone fills out your contact form and selects a service (e.g. "Structural Assessment" or "Project Advisory"), the automated reply doesn't just say "thanks, we'll be in touch." It actually answers 3–5 questions that person is likely to have — tailored to whichever service they selected. So it feels like a thoughtful, personalised response even though it's instant and automatic.

What you'd need
A form with a "service of interest" dropdown — this is the trigger that determines which version of the email gets sent. You already have this planned.
An email service to actually send the emails. The main options are Resend, SendGrid, or EmailJS — all have free tiers that are more than enough for a small firm. Resend is the cleanest to set up with modern web frameworks.
Email templates — one per service, or one master template with a dynamic FAQ block that swaps content based on what was selected. You write the questions and answers once, they get pulled in automatically.
A backend function to handle the form submission, match the service to the right FAQ block, and trigger the send. If you're on Next.js this is just a simple API route. On a static site you'd use something like Formspree or Netlify Forms as a middleman.
1
What the email would look like
Something like:

Hi [Name], thanks for reaching out about [selected service]. While we prepare a personal response, here are answers to the questions we hear most often about this...
How long does a typical engagement take? ...
Do you work remotely or on-site? ...
What do you need from us to get started? ...
What does the deliverable look like? ...
We'll be in touch within [X] business days.


What you'd write (your job)
For each service, a set of 3–5 questions and answers. Plain text is fine — the developer formats them into the template. You'd also write the opening paragraph and sign-off once, since those stay the same across all services.

Difficulty level
Low to medium. It's not complex technically — it's mostly configuration and content. The hardest part is writing good answers to the questions. The code to make it work is maybe a few hours of developer time once the stack is chosen.

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
