import { BuildingDraft } from "./components/BuildingDraft";
import { Divider } from "./components/SectionDivider";
import Hero from "@/app/components/sections/Hero";
import WorkPreview from "@/app/components/sections/WorkPreview";
import ServicesPreview from "@/app/components/sections/ServicesPreview";
import Testimonials from "@/app/components/sections/Testimonials";
import AboutPreview from "@/app/components/sections/AboutPreview";
import FoundersPreview from "./components/sections/FoundersPreview";
import ContactPreview from "@/app/components/sections/ContactPreview";
import { Footer } from "./components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <BuildingDraft />

      <Hero />
      <Divider />

      <WorkPreview />
      <Divider />

      <ServicesPreview />
      <Divider />

      <Testimonials />
      <Divider />

      <AboutPreview />
      <Divider />

      <FoundersPreview />
      <Divider />

      <ContactPreview />

      <Footer />
    </>
  );
}