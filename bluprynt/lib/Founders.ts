/**
 * Founders shown on the homepage and on individual founder pages.
 * Replace the FOUNDERS array contents with your real data.
 */

export type Founder = {
  /** Stable id (matches DB id if you migrate later) */
  id: string | number;
  /** URL-safe slug; used for /founders/[slug] */
  slug: string;
  name: string;
  /** e.g. "Co-founder · Principal Engineer" */
  role: string;
  /** Short bio for the homepage card (1-2 sentences) */
  bio: string;
  /** Longer bio for the detail page; falls back to `bio` if absent */
  longBio?: string;
  /** Disciplines / focus areas */
  // education?: readonly string[];
  /** "Hyderabad, IN" / "United States" */
  location?: string;
  /** Two-letter monogram for the avatar tile when no photo exists */
  initials?: string;
  /** Path to a photo in /public, or external URL */
  photoUrl?: string;
  links?: {
    linkedin?: string;
    email?: string;
  };
};

export const FOUNDERS: readonly Founder[] = [
  {
    id: "f1",
    slug: "vivek-bundankayala",
    name: "Vivek Budankayala",
    role: "Co-founder & CEO",
    initials: "F1",
    bio: "Master of Engineering (Construction Management), New York University",
    longBio:
      "Leads Bluprynt's US client work and pre-construction practice. He holds a B.Tech in Civil Engineering and a Master's in Construction Management from NYU, and spent over two years on US job sites, including time with a New York concrete subcontractor, before founding Bluprynt. His work bridges the gap between US construction standards and offshore production, so clients get drawings and estimates that meet the format, code, and turnaround expectations of US projects.",
    // expertise: [""],
    location: "Hyderabad, IN",
    links: {
      email: "vivek@blupryntconsulting.com"
    }
  },
  {
    id: "f2",
    slug: "bharghav-m",
    name: "Bharghav M",
    role: "Co-founder & CFO",
    initials: "F2",
    bio: "Post Graduate Programme in Management (MBA) - Indian School of Business",
    longBio:
      "Bharghav leads Bluprynt's finance, operations, and growth strategy. He holds a B.Tech in Computer Science and an MBA from the Indian School of Business (ISB). His background in technology and business strategy drives Bluprynt's systems, pricing discipline, and the operational backbone that lets the company deliver consistent quality at a competitive cost.",
    // expertise: [""],
    location: "Hyderabad, IN",
    links: {
      email: "bharghav@blupryntconsulting.com"
    }
  },
];

/** Convenience accessor for the homepage preview (top N in declaration order). */
export function getFeaturedFounders(limit = 2): readonly Founder[] {
  return FOUNDERS.slice(0, limit);
}

/** Find a founder by slug; returns null when not found. */
export function getFounderBySlug(slug: string): Founder | null {
  return FOUNDERS.find((f) => f.slug === slug) ?? null;
}

/** All slugs — for `generateStaticParams` on the [slug] route. */
export function allFounderSlugs(): { slug: string }[] {
  return FOUNDERS.map((f) => ({ slug: f.slug }));
}