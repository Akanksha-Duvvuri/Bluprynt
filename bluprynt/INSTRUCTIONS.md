# Spotlight + crosshair fix — install steps

## 1. Replace `app/globals.css`

Overwrite your current file with `globals.css` from this bundle. This collapses
the three duplicate spotlight rule sets into one clean version, brings the soft
fade back, and adds the warm cream wash inside the spotlight circle.

## 2. Replace `app/components/sections/Hero.tsx`

Overwrite with `Hero.tsx` from this bundle. Only change: removed the
`<div className={styles.gridHighlight} />` div near the top of the JSX. Hero
now uses the global spotlight system instead of a duplicate one.

## 3. Edit `app/components/sections/Hero.module.css`

Open the file. Find this block near the top and **DELETE it entirely**:

```css
.gridHighlight {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;

  background-image:
    linear-gradient(0deg, var(--accent-gold, #C4A564) 0 1px, transparent 1px),
    linear-gradient(90deg, var(--accent-gold, #C4A564) 0 1px, transparent 1px);
  background-size: 40px 40px;

  -webkit-mask-image: radial-gradient(
    circle var(--reveal-radius) at var(--mx, -9999px) var(--my, -9999px),
    black 30%,
    transparent 90%
  );
  mask-image: radial-gradient(
    circle var(--reveal-radius) at var(--mx, -9999px) var(--my, -9999px),
    black 30%,
    transparent 90%
  );

  opacity: 0.55;
}
@media (prefers-reduced-motion: reduce) {
  .gridHighlight { display: none; }
}
```

Also delete this line near the top of the file (in the `.hero` block):

```css
--reveal-radius: 130px;
```

Everything else in `Hero.module.css` stays exactly as it is.

## 4. Restart

```bash
rm -rf .next
npm run dev
```

## What you should see

1. **Crosshair feels native** — locked to your mouse, no lag (already fixed in
   your last patch — direct transform write)
2. **Each section has a faint baseline grid** — barely visible, like blank
   drafting paper
3. **Spotlight follows your cursor** with a soft circular fade (no sharp edge,
   no 3D glow, just a gentle reveal)
4. **Warm cream wash** subtly visible inside the spotlight — the "lit drafting
   paper" feel
5. **Hero, Work, Services, Testimonials, About, Contact all have it equally** —
   no Hero-only super-bright spotlight anymore

If it looks right → tell me ✅.

If something's off → screenshot or describe and I'll narrow.

## Why this works

The old broken state had THREE duplicate copies of similar spotlight CSS in
your globals (the file had been pasted into multiple times). Variables like
`--mx`/`--my` and `--mx-local`/`--my-local` were both being written by
different systems, fighting each other. Plus Hero had a fourth spotlight
in its own module.

This collapses everything to one canonical system:
- The `useSpotlight` hook writes `--mx` / `--my` to each `[data-sheet]`
  section in pixels relative to that section
- Pseudo elements `::before` and `::after` on `[data-sheet]` use those
  variables to render the grid + spotlight
- No per-section CSS, no duplicate systems, no fighting variables
