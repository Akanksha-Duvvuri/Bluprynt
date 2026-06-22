import { SectionShell } from "@/app/components/SectionShell";
import { getFeaturedServices } from "@/lib/services";
import { ServicesCarousel } from "./ServicesCarousel";
import styles from "./ServicesPreview.module.css";

export default async function ServicesPreview() {
  const services = await getFeaturedServices();
  return (
    <SectionShell
      code="A-002"
      label="Services"
      tone="base"
      eyebrow="WHAT WE PROVIDE"
    >
      <header className={styles.head}>
        <h2 className={styles.heading}>What we do_</h2>
        <p className={styles.lede}>
          Scale Smart. Pay only for the preconstruction work you need, when you need it.
        </p>
      </header>
      <ServicesCarousel services={services} />
    </SectionShell>
  );
}