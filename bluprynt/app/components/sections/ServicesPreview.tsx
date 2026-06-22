import { SectionShell } from "@/app/components/SectionShell";
import { getFeaturedServices } from "@/lib/services";
import { ServicesCarousel } from "./ServicesCarousel";
import Link from "next/link";
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

      {/* Desktop */}
      <ul className={styles.grid}>
        {services.map((s, i) => (
          <li key={s.slug} className={styles.tile} style={{ ["--i" as string]: i }}>
            <div className={styles.leader} aria-hidden="true">
              <span className={styles.leaderDot} />
              <span className={styles.leaderLine} />
            </div>
            <div className={styles.tileHead} />
            <h3 className={styles.tileTitle}>{s.title}</h3>
            <p className={styles.tileLine}>{s.line}</p>
            <div className={styles.tileFoot}>
              <span className={styles.tileTag}>SHEET A-002.{s.slug}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Mobile */}
      <ServicesCarousel services={services} />
      <div className={styles.foot}>
        <Link href="/services" className={styles.viewAll}>
          <span>View all Services Provided</span>
          <span className={styles.viewArrow}>→</span>
        </Link>
      </div>
    </SectionShell>
  );
}