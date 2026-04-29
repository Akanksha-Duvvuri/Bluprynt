/**
 * Project data — single source of truth for all projects on the site.
 *
 * Owner-editable: add/remove/reorder projects here. Each one needs a
 * unique `slug` (URL-safe lowercase string) — that becomes the URL
 * path at /projects/[slug].
 *
 * For MVP, no CMS — content sits in this file. When you outgrow this,
 * swap to markdown + frontmatter; the page components don't change.
 */

export type ProjectStatus = "live" | "review" | "complete" | "ongoing";

export interface Project {
  slug: string;
  num: string;            // e.g. "P-024 / 2025"
  name: string;
  nameEm: string;         // gold-highlighted portion (e.g. "Viaduct")
  sector: string;         // e.g. "Structural · Feasibility"
  year: number;
  scope: string;          // one-line summary, e.g. "3-span · 240m"
  status?: ProjectStatus;
  client?: string;        // or "Anonymised"
  location?: string;
  tools?: string[];

  // Long-form content for the case study page
  challenge: string;
  approach: string;
  outcome: string;

  // Featured = appears on homepage
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "eastwood-viaduct",
    num: "P-024 / 2025",
    name: "Eastwood ",
    nameEm: "Viaduct",
    sector: "Structural · Feasibility",
    year: 2025,
    scope: "3-span · 240m",
    status: "live",
    client: "State Transport Authority",
    location: "Eastwood, AU",
    tools: ["SAP2000", "MIDAS", "AutoCAD"],
    challenge:
      "A three-span continuous viaduct over a sensitive watercourse, with the original feasibility cost estimate already over budget by 18%. The client needed an independent review before committing to detailed design.",
    approach:
      "We re-ran the deck depth-to-span ratio analysis, challenged the assumption of a steel-composite superstructure, and modelled three alternative configurations including a precast segmental option. We costed each at concept level with our own QS partner, then ran a constructability review with two contractors.",
    outcome:
      "Recommendation to proceed with a precast segmental superstructure rather than steel-composite. Cost reduction of 14% against the original estimate. The recommendation was adopted and the project is currently in detailed design.",
    featured: true,
  },
  {
    slug: "harbor-reclamation",
    num: "P-021 / 2024",
    name: "Harbor ",
    nameEm: "Reclamation",
    sector: "Advisory · Coastal",
    year: 2024,
    scope: "14 ha",
    status: "complete",
    client: "Anonymised (port authority)",
    location: "South-East Asia",
    tools: ["MIKE 21", "Civil 3D", "Revit"],
    challenge:
      "A 14-hectare reclamation project where the original coastal protection design did not adequately account for projected sea-level rise over a 50-year horizon, and the geotechnical report was based on borings spaced too far apart for a project of this scale.",
    approach:
      "We commissioned an independent geotechnical interpretation, ran a coupled wave-and-current model with updated SLR scenarios, and held two technical workshops with the design team. We produced a written technical opinion and a risk register tied to specific design decisions.",
    outcome:
      "Revetment crest level was raised by 0.6m and the breakwater alignment was changed to reduce wave focusing on the eastern face. Additional geotech investigation was scoped and executed. Project handed over without coastal protection issues to date.",
    featured: true,
  },
  {
    slug: "cardinal-tower",
    num: "P-019 / 2024",
    name: "Cardinal ",
    nameEm: "Tower",
    sector: "Structural · Review",
    year: 2024,
    scope: "22 floors",
    status: "review",
    client: "Anonymised (developer)",
    location: "Hyderabad, IN",
    tools: ["ETABS", "SAFE", "Revit"],
    challenge:
      "A 22-storey residential tower where the structural design had been signed off but the developer had concerns about post-tensioning detailing in the transfer slab and wanted an independent peer review before construction began.",
    approach:
      "We reviewed the calculations, the drawings, and the construction sequence, and re-ran the transfer slab analysis with stricter assumptions. Two on-site visits to the precast yard. A formal peer review report with findings categorised by severity.",
    outcome:
      "Three findings rated Major, eight rated Moderate. The transfer slab reinforcement detail was revised. Client elected to delay site start by six weeks to incorporate the changes — significantly cheaper than discovering them during construction.",
    featured: true,
  },
  {
    slug: "pinewood-rail-station",
    num: "P-016 / 2023",
    name: "Pinewood ",
    nameEm: "Rail Station",
    sector: "Feasibility · Civic",
    year: 2023,
    scope: "1,200 daily passengers",
    status: "complete",
    client: "Regional Rail Operator",
    location: "Pinewood, NZ",
    tools: ["Civil 3D", "Revit", "AutoCAD"],
    challenge:
      "A new commuter rail station in a heritage town. The proposed location was politically contentious and the operator wanted feasibility-grade comparison of three sites with full accessibility, parking, and integration analysis.",
    approach:
      "Site brief for each option, schematic plan and section, traffic and pedestrian counts, accessibility audit, and a comparative cost band. We presented findings at two public consultations and revised the brief based on community feedback.",
    outcome:
      "Site C (originally the operator's third choice) was selected after the analysis clearly showed the lowest cost-per-passenger and the best accessibility outcomes. Now under construction.",
    featured: false,
  },
];

/** Helper: get a project by slug (for [slug] page). */
export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** Helper: list of all slugs (for static path generation). */
export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}

/** Helper: only featured projects (for homepage). */
export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}