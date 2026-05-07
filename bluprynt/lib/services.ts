/**
 * Services data — replace the SERVICES array contents with your real
 * service offerings. The Service type is the contract every page reads.
 *
 * NOTE: If you already have lib/services.ts from earlier, just merge the
 * two new accessors at the bottom (getServiceBySlug, allServiceSlugs) and
 * make sure your SERVICES entries have a `slug` field.
 */

export type Service = {
  id: string | number;
  /** URL-safe slug; used for /services/[slug] */
  slug: string;
  /** Two-digit number for the leader-line stamp, e.g. "01" */
  num: string;
  /** Service title */
  title: string;
  /** Short single-line summary used on cards */
  line: string;
  /** Long description for the detail page */
  description?: string;
  /** Region tag, e.g. "US · IN" or "INDIA" */
  region: string;
  /** Mono tag at bottom, e.g. "DELIVERABLE · FEASIBILITY DECK" */
  tag: string;
  /** Optional grouping for index page section breaks */
  category?: string;
  /** Bulleted deliverables for the detail page */
  deliverables?: readonly string[];
  /** When to engage — short trigger lines for the detail page */
  whenToEngage?: readonly string[];
  /** Whether this service appears on the homepage preview */
  featured?: boolean;
};

export const SERVICES: readonly Service[] = [
  {
    id: "s1",
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
  },
  {
    id: "s2",
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
  },
  {
    id: "s3",
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
  },
  {
    id: "s4",
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
  },
  {
    id: "s5",
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
  },
];

/* ===== Accessors ======================================================== */

export function getFeaturedServices(limit = 3): readonly Service[] {
  return SERVICES.filter((s) => s.featured).slice(0, limit);
}

export function getServiceBySlug(slug: string): Service | null {
  return SERVICES.find((s) => s.slug === slug) ?? null;
}

export function allServiceSlugs(): { slug: string }[] {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function getServicesGroupedByCategory(): Record<string, readonly Service[]> {
  const groups: Record<string, Service[]> = {};
  for (const s of SERVICES) {
    const key = s.category ?? "Uncategorized";
    if (!groups[key]) groups[key] = [];
    groups[key].push(s);
  }
  return groups;
}