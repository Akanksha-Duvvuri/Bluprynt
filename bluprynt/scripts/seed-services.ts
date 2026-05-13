/**
 * ──────────────────────────────────────────────────────────────
 * SEED SERVICES
 *
 * Run with: npm run db:seed:services
 *
 * Copies the data from lib/services.ts into the new `services`
 * database table. Run ONCE after applying the migration that
 * creates the services table.
 *
 * Idempotent: safe to re-run — uses ON CONFLICT DO UPDATE on slug,
 * so re-running updates existing rows rather than duplicating.
 *
 * After this script runs, you can edit services through /admin/services
 * and lib/services.ts becomes effectively read-only.
 * ──────────────────────────────────────────────────────────────
 */

import { db, services } from "../db";

/**
 * All five services from lib/services.ts, mapped to the database
 * shape. Slugs match — so /services/[slug] routes keep working
 * after the migration.
 */
const SERVICES_TO_SEED = [
  {
    slug: "preconstruction-feasibility",
    num: "01",
    title: "Pre-construction Feasibility",
    line: "Site, scope, and cost certainty before drawings are fixed.",
    description:
      "We run an end-to-end feasibility before your design is locked in: site assessment, regulatory mapping, cost envelope, schedule envelope, and risk register. The deliverable is a decision package you can hand to a board, a lender, or a client.",
    region: "US · IN",
    tag: "DELIVERABLE · FEASIBILITY DECK",
    category: "Strategy",
    deliverables: [
      "Site assessment report",
      "Regulatory & permitting matrix",
      "Order-of-magnitude cost envelope",
      "Risk register with mitigations",
      "Go / no-go recommendation",
    ],
    whenToEngage: [
      "Before site selection is final",
      "When sponsors want a sanity check on scope",
      "Before issuing a design RFP",
    ],
    featured: true,
    sortOrder: 10,
  },
  {
    slug: "cost-estimation-tendering",
    num: "02",
    title: "Cost Estimation & Tendering",
    line: "Quantity-driven estimates and tender packages contractors can actually price.",
    description:
      "Estimates that hold up to scrutiny, and tender packages that don't bury risk in clauses. We start from quantities, not allowances; we name the risks, we don't hide them.",
    region: "US · IN",
    tag: "DELIVERABLE · BoQ + TENDER PACK",
    category: "Cost",
    deliverables: [
      "Quantity take-offs",
      "Bill of Quantities (BoQ)",
      "Tender documents & specifications",
      "Bid evaluation & comparison matrix",
      "Negotiation support",
    ],
    whenToEngage: [
      "Designs are at 60–90% completion",
      "You need an independent estimate to challenge a bidder's price",
      "You're issuing tender for the first time and want it done right",
    ],
    featured: true,
    sortOrder: 20,
  },
  {
    slug: "constructability-review",
    num: "03",
    title: "Constructability Review",
    line: "We find the clashes and the can't-builds before the contractor does.",
    description:
      "Architectural intent meets site reality. We comb through drawings looking for sequencing problems, MEP-structural collisions, access issues, and the seams between trades that always go wrong.",
    region: "US · IN",
    tag: "DELIVERABLE · REVIEW REPORT + RFI LOG",
    category: "Design",
    deliverables: [
      "Multi-discipline drawing review",
      "Clash & collision report",
      "Sequencing & access review",
      "Issued RFIs to design team",
      "Resolved-issue tracking",
    ],
    whenToEngage: [
      "Drawings are issued for construction",
      "You're transitioning from design to procurement",
      "A second set of eyes would save you from a change order",
    ],
    featured: true,
    sortOrder: 30,
  },
  {
    slug: "project-controls",
    num: "04",
    title: "Project Controls",
    line: "Baselines, EVM, change-order discipline. Measured progress, not vibes.",
    description:
      "We set up the baseline schedule, the cost-loaded WBS, and the earned-value framework, then we run the cadence: weekly progress, monthly cost, change-order log, and the boring meeting that prevents the expensive surprise.",
    region: "US · IN",
    tag: "DELIVERABLE · MONTHLY EVM + CHANGE LOG",
    category: "Execution",
    deliverables: [
      "Baseline schedule (CPM)",
      "Cost-loaded WBS",
      "Earned-value reporting cadence",
      "Change-order register",
      "Risk register live updates",
    ],
    whenToEngage: [
      "Project is about to break ground",
      "You suspect the schedule is drifting and want it confirmed",
      "Lenders or clients require formal monthly reporting",
    ],
    featured: false,
    sortOrder: 40,
  },
  {
    slug: "advisory-owners-rep",
    num: "05",
    title: "Advisory & Owner's Representative",
    line: "We sit on your side of the table. Long arms, short patience.",
    description:
      "When you need engineering judgment in the room — meetings with the contractor, the architect, the lender, the city — we represent you. Our job is to translate, push, and protect.",
    region: "US",
    tag: "DELIVERABLE · OWNER'S REP RETAINER",
    category: "Strategy",
    deliverables: [
      "Owner-side meeting representation",
      "Independent technical review",
      "Vendor & contractor evaluation",
      "Stakeholder communication",
      "Strategic project advice",
    ],
    whenToEngage: [
      "You don't have an in-house engineering team",
      "You want an independent voice in design or construction meetings",
      "Stakes are high and judgment matters",
    ],
    featured: false,
    sortOrder: 50,
  },
];

async function main() {
  console.log("");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Bluprynt — Seed Services");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("");

  console.log(`Seeding ${SERVICES_TO_SEED.length} service(s)...`);
  console.log("");

  for (const svc of SERVICES_TO_SEED) {
    const values = {
      slug: svc.slug,
      num: svc.num,
      title: svc.title,
      line: svc.line,
      description: svc.description,
      region: svc.region ?? null,
      tag: svc.tag ?? null,
      category: svc.category ?? null,
      deliverables:
        svc.deliverables && svc.deliverables.length > 0
          ? JSON.stringify(svc.deliverables)
          : null,
      whenToEngage:
        svc.whenToEngage && svc.whenToEngage.length > 0
          ? JSON.stringify(svc.whenToEngage)
          : null,
      featured: svc.featured ?? false,
      sortOrder: svc.sortOrder ?? 0,
      updatedAt: new Date(),
    };

    await db
      .insert(services)
      .values(values)
      .onConflictDoUpdate({
        target: services.slug,
        set: values,
      });

    console.log(`  ✓ ${svc.slug} — ${svc.title}`);
  }

  console.log("");
  console.log("✓ All services seeded.");
  console.log("");
  console.log("  Open Drizzle Studio to verify:");
  console.log("    npm run db:studio");
  console.log("");
}

main()
  .catch((err) => {
    console.error("");
    console.error("✗ Seed failed:", err);
    process.exit(1);
  })
  .then(() => process.exit(0));
