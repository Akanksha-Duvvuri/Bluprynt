/**
 * FAQ keyword routing — US-18.
 *
 * The firm owner can update keywords and FAQ copy in this single file
 * without touching application logic. First match wins.
 */

export type FaqGroupKey =
  | "STRUCTURAL"
  | "FEASIBILITY"
  | "ADVISORY"
  | "DILIGENCE"
  | "GENERAL";

export interface FaqQuestion {
  q: string;
  a: string;
}

export interface FaqGroup {
  key: FaqGroupKey;
  /** Human-readable name shown to the prospect ("about Structural Assessment") */
  serviceName: string;
  /** Lower-case keywords; whole-word, case-insensitive */
  keywords: string[];
  /** 3–5 Q&A pairs */
  questions: FaqQuestion[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    key: "STRUCTURAL",
    serviceName: "Structural Assessment",
    keywords: ["structural", "load", "foundation", "beam", "column", "slab"],
    questions: [
      {
        q: "How long does a typical engagement take?",
        a: "Two to six weeks, depending on scope and the readiness of design documentation.",
      },
      {
        q: "What do you need from us to get started?",
        a: "Drawings, calculations, and design intent statements — paper or digital is fine.",
      },
      {
        q: "What does the deliverable look like?",
        a: "A written review report, a risk register, and a sign-off memo.",
      },
    ],
  },
  {
    key: "FEASIBILITY",
    serviceName: "Feasibility Studies",
    keywords: ["feasibility", "concept", "viability", "scoping", "brief"],
    questions: [
      {
        q: "How long does a typical engagement take?",
        a: "Four to ten weeks, depending on the breadth of the brief.",
      },
      {
        q: "Do you work remotely or on-site?",
        a: "Both — most engagements are hybrid. We visit sites where it matters.",
      },
      {
        q: "What does the deliverable look like?",
        a: "A site brief, a cost range, and a clear go/no-go recommendation with the trade-offs laid out.",
      },
    ],
  },
  {
    key: "ADVISORY",
    serviceName: "Project Advisory",
    keywords: ["advisory", "owner", "retainer", "ongoing", "consulting"],
    questions: [
      {
        q: "Is this a retainer or a project engagement?",
        a: "Advisory is typically a monthly retainer. We adapt the cadence to your project's stage gates.",
      },
      {
        q: "Do you sit in on design meetings?",
        a: "Yes — that's most of the value. We're the engineer in your corner when the room is full of consultants.",
      },
      {
        q: "What do you need from us to get started?",
        a: "A short call to understand the project, the team, and what you most need an outside view on.",
      },
    ],
  },
  {
    key: "DILIGENCE",
    serviceName: "Due Diligence",
    keywords: ["diligence", "acquisition", "lender", "audit", "review"],
    questions: [
      {
        q: "How long does diligence take?",
        a: "Three to five weeks for most engagements; faster on shorter timelines if necessary.",
      },
      {
        q: "What does the deliverable look like?",
        a: "A technical DD report, a findings pack you can put in front of a board, and a Q&A session.",
      },
      {
        q: "Can you work to a tight close date?",
        a: "Often, yes. Tell us the date when you reach out and we'll be honest about whether we can hit it.",
      },
    ],
  },
];

const GENERAL_GROUP: FaqGroup = {
  key: "GENERAL",
  serviceName: "your enquiry",
  keywords: [],
  questions: [
    {
      q: "How long does a typical engagement take?",
      a: "Anywhere from two weeks to several months, depending on the service and scope.",
    },
    {
      q: "Do you work remotely or on-site?",
      a: "Both — we're remote-first with on-site visits where the project demands it.",
    },
    {
      q: "What do you need from us to get started?",
      a: "A short call to understand the project. We'll tell you honestly whether we're the right fit.",
    },
  ],
};

/**
 * Scan a message body for keywords. First match wins.
 * Returns the GENERAL group if nothing matches.
 */
export function matchFaqGroup(message: string): FaqGroup {
  const lower = message.toLowerCase();
  for (const group of FAQ_GROUPS) {
    const hit = group.keywords.some((kw) => {
      // whole-word match — case-insensitive
      const re = new RegExp(`\\b${kw}\\b`, "i");
      return re.test(lower);
    });
    if (hit) return group;
  }
  return GENERAL_GROUP;
}