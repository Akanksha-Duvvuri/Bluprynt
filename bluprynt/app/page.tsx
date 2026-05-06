import { BuildingDraft } from "@/app/components/BuildingDraft";
import { SectionDivider } from "./components/SectionDivider.module.css";

import Hero from "./components/sections/Hero";
import WorkPreview from "./components/sections/WorkPreview";
import ServicesPreview from "./components/sections/ServicesPreview";
import Testimonials from "./components/sections/Testimonials";
import AboutPreview from "./components/sections/AboutPreview";
import ContactPreview from "./components/sections/ContactPreview";
import TopBar from "./components/TopBar";

// ── When you wire the DB, convert to `async` and uncomment: ──────────────
// import { getFeaturedProjects } from "@/lib/projects";
// import { getFeaturedTestimonials } from "@/lib/testimonials";
//
// export default async function HomePage() {
//   const [projects, testimonials] = await Promise.all([
//     getFeaturedProjects(3),
//     getFeaturedTestimonials(3),
//   ]);
//   …
//   <WorkPreview projects={projects} />
//   <Testimonials testimonials={testimonials} />
// }

export default function HomePage() {
  return (
    <>
      {/* Fixed right-side panel; renders behind content via z-index. */}
      <BuildingDraft />
    
      {/* <TopBar /> */}
      <Hero />

      <SectionDivider fromCode="A-001" toCode="A-002" />
      <WorkPreview />

      <SectionDivider fromCode="A-002" toCode="A-003" />
      <ServicesPreview />

      <SectionDivider fromCode="A-003" toCode="A-004" />
      <Testimonials />

      <SectionDivider fromCode="A-004" toCode="A-005" />
      <AboutPreview />

      <SectionDivider fromCode="A-005" toCode="A-006" />
      <ContactPreview />
    </>
  );
}
