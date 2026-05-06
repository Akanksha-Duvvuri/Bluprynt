import { BuildingDraft } from "./components/BuildingDraft";
import SectionDivider from "./components/SectionDivider";
import Hero from "./components/sections/Hero";
import WorkPreview from "./components/sections/WorkPreview";
import ServicesPreview from "./components/sections/ServicesPreview";
import Testimonials from "./components/sections/Testimonials";
import AboutPreview from "./components/sections/AboutPreview";
import ContactPreview from "./components/sections/ContactPreview";

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

      <SectionDivider from="A-001" to="A-002" />
      <WorkPreview />

      <SectionDivider from="A-002" to="A-003" />
      <ServicesPreview />

      <SectionDivider from="A-003" to="A-004" />
      <Testimonials />

      <SectionDivider from="A-004" to="A-005" />
      <AboutPreview />

      <SectionDivider from="A-005" to="A-006" />
      <ContactPreview />
    </>
  );
}
