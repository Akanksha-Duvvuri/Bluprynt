# Services Step 2 — Admin CRUD

Installs the admin Services pages, API routes, and rewrites `lib/services.ts` to read from the database. After this, the founders can edit services through `/admin/services` instead of editing files.

Estimated time: 10 minutes install + 5 minutes verification.

---

## What's in the bundle

**Library code (2 files):**
- `lib/services.ts` — rewritten to read from DB. Same function signatures (`getFeaturedServices`, `getServiceBySlug`, `allServiceSlugs`, `getServicesGroupedByCategory`). Now async — but the original homepage and services pages already use await, so this is transparent.
- `lib/validation.ts` — you already updated this manually in Step 1, no action needed if you did

**Admin pages (5 files):**
- `app/admin/(authed)/services/page.tsx` — list view
- `app/admin/(authed)/services/page.module.css` — card grid styles
- `app/admin/(authed)/services/ServiceForm.tsx` — shared form (~13 fields)
- `app/admin/(authed)/services/new/page.tsx` — create page
- `app/admin/(authed)/services/[id]/edit/page.tsx` — edit page
- `app/admin/(authed)/services/DeleteButton.tsx` — 2-step confirm delete

**API (2 files):**
- `app/api/admin/services/route.ts` — POST (create)
- `app/api/admin/services/[id]/route.ts` — PATCH + DELETE

**Nav update (1 file):**
- `app/admin/(authed)/AdminLayoutClient.tsx` — adds Services link to sidebar

---

## Install

### Step 2.1 — Extract everything

```bash
tar -xzf ~/Downloads/services_step2.tar.gz --strip-components=1
```

Confirm the new files exist:
```bash
ls 'app/admin/(authed)/services/'
ls 'app/api/admin/services/'
```

You should see all the files listed above.

### Step 2.2 — Verify lib/services.ts replaced

The new `lib/services.ts` is **async** — every function now returns a Promise.

```bash
grep "async function" lib/services.ts | head -5
```

Should show:
```
export async function getFeaturedServices(...)
export async function getServiceBySlug(...)
export async function allServiceSlugs(...)
export async function getAllServices(...)
export async function getServicesGroupedByCategory(...)
```

If you see `export function getFeaturedServices` (without `async`), the old file is still in place — re-extract or paste manually.

### Step 2.3 — Verify your consumers handle async

Three files import from `lib/services.ts`. They need to be **async server components** (they already were, but let's confirm):

```bash
grep -l "from.*services" app/services/page.tsx app/services/\[slug\]/page.tsx app/components/sections/ServicesPreview.tsx 2>/dev/null
```

All three should be listed.

For each, check it uses `await`:

```bash
grep -A1 "export default" app/services/page.tsx | head -2
grep -A1 "export default" app/services/\[slug\]/page.tsx | head -2
grep -A1 "export default" app/components/sections/ServicesPreview.tsx | head -2
```

All three should show `async`. If any one doesn't, you'll need to add `async` to its function signature and `await` to its `lib/services.ts` calls. Most likely already done.

### Step 2.4 — Verify db/index.ts exports services

```bash
grep "services" db/index.ts
```

Should show services in the re-export. If not, add this to `db/index.ts`:

```ts
export { services } from "./schema";
```

### Step 2.5 — Restart cleanly

```bash
rm -rf .next
npm run dev
```

---

## Verify in browser

1. **Visit `/admin/services`** — should show all 5 services as cards
   - Featured ones have a "FEATURED" badge
   - Each card has Edit and Delete buttons
2. **Click Edit on "Project Controls"** (the non-featured one)
   - Form loads with all fields pre-filled
   - Slug field is locked (shown as text, not editable)
   - Deliverables and "When to engage" show comma-separated, not raw JSON
3. **Toggle Featured to ON, save**
   - Redirected back to `/admin/services`
   - The card now has a "FEATURED" badge
4. **Visit `/` (homepage)**
   - Services preview section should now show "Project Controls" since it's featured
5. **Click "+ New service"** on the admin list page
   - Form is empty
   - Create a test service with slug `test-service`, num `99`, title `Test`, line `Test`, description (20+ characters), deliverables `a, b, c`
   - Save → redirects back to list
   - New service appears in the grid
6. **Click Delete on the test service**
   - "Delete \"Test\"?" appears with Yes/No buttons
   - Click Yes → service removed from list

If all 6 work, you're done.

---

## What might go wrong

**"Cannot read properties of undefined (reading 'map')"** in homepage or `/services`
→ A consumer is calling a service accessor without `await`. Fix the function in question to use `await`.

**TypeScript error: "readonly Service[] is not assignable to ..."**
→ The old `SERVICES` array had `readonly`, the new one returns `readonly Service[]` from async. Should be compatible. If you hit this, paste the error.

**"Type 'string | null' is not assignable to type 'string'" in ServiceForm**
→ The form was given a service with null fields. Should be handled by the `?? ""` fallbacks in the edit page. If you hit this, paste the file and error.

**Edit page 404s on a valid ID**
→ The `params` is now a Promise in Next.js 15. Confirmed in the edit page code (uses `await params`). If error persists, paste.

**Slug field shows the input box on edit**
→ Make sure `isEdit` is being detected — `service` prop must be passed in. If the new page accidentally renders an edit (shouldn't), tell me.

---

## When done

Tell me ✅ if all 6 verification steps work.

If anything broke, paste the error + which step it was on.

---

## What's next

This was the last self-contained CRUD piece. Remaining work:

- **Phase 4A** — email pipeline rewrite + admin views + sitemap + robots + 404 + privacy
- **Real content** — your founders' bios, photos, replace placeholder testimonials with real ones
- **Final deploy** — promote `blupryntconsulting.com` to production domain in Vercel

When you tell me ✅ on this step, we move to Phase 4A. I still need:
- FROM_EMAIL, OWNER_EMAIL, PRIVACY_EMAIL
- Upstash account status
- Vercel domain status (green ✅?)
- Resend account status
