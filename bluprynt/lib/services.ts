/**
 * Services — owner-editable list of what the firm offers.
 * Used by both the homepage's ServicesPreview and the full /services page.
 */

export type EngagementType = "Project-based" | "Retainer" | "Workshop" | "Hybrid";

export interface Service {
  slug: string;
  num: string;            // e.g. "S-01"
  name: string;
  nameEm: string;         // gold-highlighted portion
  shortDesc: string;      // one-paragraph summary
  longDesc: string;       // longer body for the full /services page

  deliverables: string[];
  engagement: EngagementType;
  timeline: string;       // e.g. "2–6 weeks"
  whoItsFor: string;
}

export const SERVICES: Service[] = [
  {
    slug: "structural",
    num: "S-01",
    name: "Structural ",
    nameEm: "Assessment",
    shortDesc:
      "Independent review of structural calculations, drawings, and design intent — before sign-off, before site, before cost is locked.",
    longDesc:
      "We review structural design output independently of the consulting engineer, looking specifically for what would make a project go wrong: optimistic assumptions, missed load cases, detailing that won't survive site execution, and the gaps where one discipline ends and another begins. We produce written findings, a risk register tied to specific design decisions, and a sign-off memo recording our position.",
    deliverables: ["Review Report", "Risk Register", "Sign-Off Memo", "Two on-site / design-office visits"],
    engagement: "Project-based",
    timeline: "2–6 weeks",
    whoItsFor:
      "Owners, developers, and lenders who need an independent technical view on a structural design before construction commits real money.",
  },
  {
    slug: "feasibility",
    num: "S-02",
    name: "Feasibility ",
    nameEm: "Studies",
    shortDesc:
      "Site, scope, cost and constructability — answered honestly, with the trade-offs laid out, before the first design fee is spent.",
    longDesc:
      "We answer the questions that determine whether a project is worth doing: is the site right, is the scope right, what's the realistic cost band, what's the constructability risk, and what's the right procurement strategy. We do this in writing, with the trade-offs explicit, before a design team is appointed and the brief becomes harder to change.",
    deliverables: ["Site Brief", "Cost Band (concept-level)", "Go / No-Go Recommendation", "Stakeholder workshop"],
    engagement: "Project-based",
    timeline: "4–10 weeks",
    whoItsFor:
      "Owners and developers at the pre-design stage who want a clear-eyed feasibility view before committing to a brief.",
  },
  {
    slug: "advisory",
    num: "S-03",
    name: "Project ",
    nameEm: "Advisory",
    shortDesc:
      "Owner-side counsel through design and procurement — the engineer in your corner when the room is full of consultants.",
    longDesc:
      "Through design and procurement, we sit on your side of the table: reviewing what your consultants produce, flagging where their interests don't align with yours, and translating technical decisions into business consequences. Monthly reviews tied to your project's stage gates, with on-call availability between them.",
    deliverables: ["Monthly Reviews", "Risk Watch", "Stage Sign-Offs", "On-call availability"],
    engagement: "Retainer",
    timeline: "Ongoing",
    whoItsFor:
      "Owners running large projects who want technical counsel that's independent of the design team — but not on the critical path.",
  },
  {
    slug: "diligence",
    num: "S-04",
    name: "Due ",
    nameEm: "Diligence",
    shortDesc:
      "Acquisition, lender, or owner-side technical diligence — the report you can put in front of a board with confidence.",
    longDesc:
      "Technical due diligence on infrastructure or built assets — for acquisitions, lender requirements, board reviews, or internal governance. We work to a tight scope and a fixed deliverable: a report that holds up to scrutiny, a findings pack you can present without further explanation, and a Q&A session to defend it.",
    deliverables: ["Tech DD Report", "Findings Pack", "Q&A Session", "Optional secondary review"],
    engagement: "Project-based",
    timeline: "3–5 weeks",
    whoItsFor:
      "Acquirers, lenders, and boards who need an independent technical view in writing — fast, defensible, and proportionate to the deal.",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}