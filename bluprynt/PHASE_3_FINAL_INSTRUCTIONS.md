# Phase 3 (Final) — Forms, CRUD, and the homepage testimonials section

End state: the project is feature-complete. Founders can manage projects and testimonials entirely through the admin UI. The homepage shows featured testimonials automatically.

After this phase:
- `/admin/projects/new` and `/admin/projects/[id]/edit` work — full CRUD on projects
- `/admin/testimonials` list, new, edit — full CRUD on testimonials
- Form validation with Zod, inline error messages
- Slug auto-generation from project name
- Slug locked on edit (prevents broken links)
- A new `Testimonials` section on the homepage that pulls from the database

Estimated time: 30–45 minutes.

---

## Step 1 — Install Zod

```bash
npm install zod
```

That's the only new package this phase. Drizzle, NextAuth, bcryptjs are all already installed.

## Step 2 — Drop in the new files

Lots of files this time. Easiest path: extract the tarball at your project root.

```
your-project/
├── lib/
│   └── validation.ts                                       ← NEW (Zod schemas)
├── app/
│   ├── page.tsx                                            ← REPLACES existing
│   ├── admin/
│   │   └── (authed)/
│   │       ├── projects/
│   │       │   ├── ProjectForm.tsx                         ← NEW
│   │       │   ├── form.module.css                         ← NEW
│   │       │   ├── new/
│   │       │   │   └── page.tsx                            ← NEW
│   │       │   └── [id]/
│   │       │       └── edit/
│   │       │           └── page.tsx                        ← NEW
│   │       └── testimonials/
│   │           ├── page.tsx                                ← NEW (list)
│   │           ├── page.module.css                         ← NEW
│   │           ├── DeleteButton.tsx                        ← NEW
│   │           ├── TestimonialForm.tsx                     ← NEW
│   │           ├── new/
│   │           │   └── page.tsx                            ← NEW
│   │           └── [id]/
│   │               └── edit/
│   │                   └── page.tsx                        ← NEW
│   ├── api/
│   │   └── admin/
│   │       ├── projects/
│   │       │   ├── route.ts                                ← NEW (POST)
│   │       │   └── [id]/
│   │       │       └── route.ts                            ← REPLACES (adds PATCH)
│   │       └── testimonials/
│   │           ├── route.ts                                ← NEW
│   │           └── [id]/
│   │               └── route.ts                            ← NEW
│   └── components/
│       └── sections/
│           ├── Testimonials.tsx                            ← NEW (homepage section)
│           └── Testimonials.module.css                     ← NEW
```

**Important:** the bracketed folders (`[id]`) need quoting in zsh:

```bash
mkdir -p 'app/admin/(authed)/projects/[id]/edit'
mkdir -p 'app/admin/(authed)/testimonials/[id]/edit'
mkdir -p 'app/api/admin/testimonials/[id]'
```

The existing `app/api/admin/projects/[id]/route.ts` from Phase 3A gets REPLACED by this version (adds PATCH alongside DELETE).

## Step 3 — Restart and test

```bash
rm -rf .next
npm run dev
```

Sign in at `/admin/login` if you got logged out.

### Test 1 — Create a new project
- Visit `/admin/projects`
- Click "+ New project"
- Fill in: number "P-099 / 2026", name "Test ", nameEm "Project", sector "Test · Sector", year 2026, scope "Test scope", challenge/approach/outcome each at least 20 chars
- Tab out of the name field — slug should auto-fill as "test-project"
- Click Create
- Expected: redirect to `/admin/projects`, the new project appears at the top of the list

### Test 2 — Validation works
- Click "+ New project"
- Leave most fields blank, click Create
- Expected: red error messages appear inline under each empty required field; nothing submits

### Test 3 — Edit a project
- From the list, click "Edit" on Test Project (or any project)
- Notice: the slug field is disabled with a "Slug is locked" note
- Change the year to 2025
- Toggle "Featured on the homepage"
- Click Save changes
- Expected: redirect to list, year shows 2025, gold dot appears in featured column

### Test 4 — Delete works (you tested this in 3A; verify still works)
- Click Delete on Test Project, confirm
- Expected: row disappears

### Test 5 — Create a testimonial
- Click "Testimonials" in the sidebar
- Click "+ New testimonial"
- Fill in quote (20+ chars), author name, optional title/company
- Choose a related project from the dropdown (optional)
- Toggle Featured on
- Click Create
- Expected: redirect to testimonials list, new card appears

### Test 6 — Edit a testimonial
- Click Edit on the new one
- Change the quote text
- Click Save changes
- Expected: redirect to list, updated quote shows

### Test 7 — Toggle published off
- Edit a testimonial
- Uncheck "Published"
- Save
- Expected: in list view, an "Unpublished" badge appears on that card

### Test 8 — Homepage shows featured testimonials
- Visit `/` (homepage)
- Scroll past Services
- Expected: a new "Testimonials" section appears (cream variant) with the testimonials marked Featured + Published

### Test 9 — Unfeatured testimonials don't appear on homepage
- In admin, toggle "Featured" OFF on all testimonials
- Refresh homepage
- Expected: the Testimonials section disappears entirely (it returns null when there are zero featured items)

### Test 10 — Toggle one back on
- Re-feature one testimonial
- Refresh homepage
- Expected: section reappears with just that one card

If all 10 pass, you're done. The site is feature-complete for MVP.

---

## What's still pending (deliberately)

- **Image uploads**: project hero images and gallery — deferred. Currently uses generated SVG placeholders. UploadThing integration is straightforward but adds a dependency.
- **Real founder photos**: the about page uses initials in a placeholder. Drop real photos when ready.
- **Resend domain verification**: the contact form's auto-reply isn't tested end-to-end yet.
- **Favicon set**: 16/32/180/192/512 + manifest. Quick to generate when the logo is final.
- **Privacy policy + analytics**: add when going to production.

None of these block launch. The admin panel works; the founders can edit content; the public site renders correctly.

---

## Common issues

### "Cannot find module '@/lib/validation'"
You missed the `lib/validation.ts` file or your tsconfig path alias is off. Confirm:
```bash
ls lib/validation.ts
grep "paths" tsconfig.json
```

### Form submits but nothing happens
Open browser DevTools (F12) → Network tab → submit the form → look at the request to `/api/admin/projects`. Status code tells you what failed:
- **401** — you got logged out, sign in again
- **400** — server-side Zod validation rejected something the client should have caught (rare; client and server use the same schema)
- **409** — slug conflict; you're trying to create a project with a slug that already exists
- **500** — server error; check the terminal where `npm run dev` is running

### "PATCH not a function" or 405 Method Not Allowed
You forgot to replace the old `app/api/admin/projects/[id]/route.ts` with the new version (which adds PATCH). Check:
```bash
grep "export async function PATCH" 'app/api/admin/projects/[id]/route.ts'
```
Should match. If not, the file is the old DELETE-only version from Phase 3A.

### Homepage testimonials section never appears
- Are there testimonials in the DB? `npm run db:studio` — check the `testimonials` table
- Are any marked `featured: true` AND `published: true`? Both must be true
- Did you replace `app/page.tsx` to import and render `<Testimonials />`?

### Edit form fields are blank
The `initialValues` prop isn't being passed correctly. Open DevTools → React Components tab → find ProjectForm → check the props.

---

## Closing the loop

When you're done with the 10 tests:

- Tell me ✅ if everything works
- Or describe what's broken and I'll fix it

The build is essentially complete. After this you have:
- Public marketing site (homepage + about + projects + services + contact)
- Database-backed content
- Real authentication
- Admin panel for managing projects + testimonials
- Email integration (pending Resend setup)
- Per-page SEO

Everything else is content + deployment.
