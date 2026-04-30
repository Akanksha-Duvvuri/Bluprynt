/**
 * ──────────────────────────────────────────────────────────────
 * SEED SCRIPT
 *
 * Run with: npm run db:seed
 *
 * What it does:
 *   1. Connects to your Postgres database (Neon)
 *   2. Wipes the projects + testimonials tables (idempotent: safe to re-run)
 *   3. Inserts the four starter projects you already had in lib/projects.ts
 *   4. Inserts two starter testimonials so the admin UI has something to show
 *
 * The seed is meant for *initial* population. After Phase 3 (admin panel),
 * the firm owner adds new content through the UI, and you'll rarely run
 * this again — except maybe to reset a dev database.
 * ──────────────────────────────────────────────────────────────
 */

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { db } from "../db";
import { projects, testimonials } from "../db/schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // ── 1. Wipe existing data ────────────────────────────────
  // delete() with no `where()` clears the table.
  // We do this so the seed is safe to re-run during development.
  console.log("   Clearing existing rows...");
  await db.delete(projects);
  await db.delete(testimonials);

  // ── 2. Projects ──────────────────────────────────────────
  console.log("   Inserting projects...");
  await db.insert(projects).values([
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
      tools: JSON.stringify(["SAP2000", "MIDAS", "AutoCAD"]),
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
      tools: JSON.stringify(["MIKE 21", "Civil 3D", "Revit"]),
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
      tools: JSON.stringify(["ETABS", "SAFE", "Revit"]),
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
      tools: JSON.stringify(["Civil 3D", "Revit", "AutoCAD"]),
      challenge:
        "A new commuter rail station in a heritage town. The proposed location was politically contentious and the operator wanted feasibility-grade comparison of three sites with full accessibility, parking, and integration analysis.",
      approach:
        "Site brief for each option, schematic plan and section, traffic and pedestrian counts, accessibility audit, and a comparative cost band. We presented findings at two public consultations and revised the brief based on community feedback.",
      outcome:
        "Site C (originally the operator's third choice) was selected after the analysis clearly showed the lowest cost-per-passenger and the best accessibility outcomes. Now under construction.",
      featured: false,
    },
  ]);

  // ── 3. Testimonials ──────────────────────────────────────
  console.log("   Inserting testimonials...");
  await db.insert(testimonials).values([
    {
      quote:
        "The team at Bluprynt asked the questions our design consultants weren't asking. The cost reduction they identified more than paid for the engagement, and the report gave our board a clear written basis for the approval.",
      authorName: "Placeholder Name",
      authorTitle: "Director of Infrastructure",
      authorCompany: "State Transport Authority",
      relatedProjectSlug: "eastwood-viaduct",
      featured: true,
      published: true,
      sortOrder: 1,
    },
    {
      quote:
        "Independent, technical, and willing to give us answers we wouldn't have got from the design team alone. We will use them again.",
      authorName: "Placeholder Name",
      authorTitle: "Project Director",
      authorCompany: "Anonymised (port authority)",
      relatedProjectSlug: "harbor-reclamation",
      featured: true,
      published: true,
      sortOrder: 2,
    },
  ]);

  console.log("✅ Seed complete.");
}

seed()
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  })
  .then(() => process.exit(0));