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
  expertise?: readonly string[];
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
    slug: "founder-one",
    name: "Founder One",
    role: "Co-founder · Principal Engineer",
    initials: "F1",
    bio: "Civil engineer with eighteen years across infrastructure design and pre-construction strategy in the US and India.",
    longBio:
      "Civil engineer with eighteen years across infrastructure design and pre-construction strategy in the US and India. Previously led cost certainty programs for a major transit authority before founding Bluprynt to bring rigorous pre-construction practice to mid-market civil projects.",
    expertise: ["Cost estimation", "Constructability", "Transit infrastructure"],
    location: "Hyderabad, IN",
  },
  {
    id: "f2",
    slug: "founder-two",
    name: "Founder Two",
    role: "Co-founder · Director of Practice",
    initials: "F2",
    bio: "Former design coordination lead at a top-five EPC firm. Built the methodology behind Bluprynt's clash-and-clear constructability reviews.",
    longBio:
      "Former design coordination lead at a top-five EPC firm, where he built the methodology behind Bluprynt's clash-and-clear constructability reviews. Specializes in the messy seam between architectural intent and what actually gets built on site.",
    expertise: ["Design coordination", "MEP/structural", "Risk register"],
    location: "United States",
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