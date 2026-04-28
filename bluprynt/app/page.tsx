import type { Metadata } from "next";
import Hero from "./components/sections/Hero";
import WorkPreview from "./components/sections/WorkPreview";
import ServicesPreview from "./components/sections/ServicesPreview";
import AboutPreview from "./components/sections/AboutPreview";
import ContactPreview from "./components/sections/ContactPreview";

/* ──────────────────────────────────────────────────────────────
   Per-page metadata — overrides the defaults set in layout.tsx.
   Per US-22, every page gets a unique <title>.
   ────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Bluprynt Consulting Group — Engineering Accuracy. Consulting Excellence.",
  description:
    "The firm you call before you build. Civil and infrastructure pre-consulting — feasibility, structural review, and owner-side advisory.",
  openGraph: {
    title: "Bluprynt Consulting Group",
    description:
      "The firm you call before you build. Civil and infrastructure pre-consulting.",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkPreview />
      <ServicesPreview />
      <AboutPreview />
      <ContactPreview />
    </>
  );
}