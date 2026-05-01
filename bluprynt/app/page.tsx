import Hero from "./components/sections/Hero";
import WorkPreview from "./components/sections/WorkPreview";
import ServicesPreview from "./components/sections/ServicesPreview";
import Testimonials from "./components/sections/Testimonials";
import AboutPreview from "./components/sections/AboutPreview";
import ContactPreview from "./components/sections/ContactPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkPreview />
      <ServicesPreview />
      <Testimonials />
      <AboutPreview />
      <ContactPreview />
    </>
  );
}
