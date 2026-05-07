import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/cad/PageShell";
import {
  getServiceBySlug,
  allServiceSlugs,
  SERVICES,
} from "@/lib/services";
import styles from "./service-detail.module.css";

type Params = { slug: string };

export async function generateStaticParams() {
  return allServiceSlugs();
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) return { title: "Service not found · Bluprynt" };
  return {
    title: `${s.title} · Bluprynt`,
    description: s.line,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  // Other services to suggest at the bottom
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <PageShell
      code={`A-2${service.num.padStart(2, "0")}`}
      label={`SERVICE · ${service.num}`}
      eyebrow={service.region}
      title={service.title}
      lede={service.line}
      maxWidth={1100}
    >
      {/* ===== Description ================================================ */}
      {service.description && (
        <section className={styles.intro} style={{ ['--i' as string]: 0 }}>
          <p className={styles.introBody}>{service.description}</p>
        </section>
      )}

      {/* ===== Two-column: Deliverables + When to engage ================== */}
      <div className={styles.cols}>
        {service.deliverables && service.deliverables.length > 0 && (
          <section className={styles.col} style={{ ['--i' as string]: 1 }}>
            <header className={styles.colHead}>
              <span className={styles.colNum}>01</span>
              <h2 className={styles.colTitle}>Deliverables</h2>
            </header>
            <ol className={styles.list}>
              {service.deliverables.map((d, i) => (
                <li key={d} className={styles.listItem}>
                  <span className={styles.listN}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.listText}>{d}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {service.whenToEngage && service.whenToEngage.length > 0 && (
          <section className={styles.col} style={{ ['--i' as string]: 2 }}>
            <header className={styles.colHead}>
              <span className={styles.colNum}>02</span>
              <h2 className={styles.colTitle}>When to engage us</h2>
            </header>
            <ul className={styles.triggers}>
              {service.whenToEngage.map((trigger) => (
                <li key={trigger} className={styles.trigger}>
                  <span className={styles.triggerMark} aria-hidden="true">→</span>
                  <span>{trigger}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* ===== Other services ============================================ */}
      {others.length > 0 && (
        <section className={styles.others} style={{ ['--i' as string]: 3 }}>
          <header className={styles.othersHead}>
            <span className={styles.colNum}>03</span>
            <h2 className={styles.colTitle}>Other services</h2>
          </header>
          <ul className={styles.othersList}>
            {others.map((o) => (
              <li key={o.id}>
                <Link href={`/services/${o.slug}`} className={styles.otherLink}>
                  <span className={styles.otherN}>{o.num}</span>
                  <span className={styles.otherTitle}>{o.title}</span>
                  <span className={styles.otherLine}>{o.line}</span>
                  <span className={styles.otherArrow}>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ===== CTA ======================================================== */}
      <section className={styles.cta} style={{ ['--i' as string]: 4 }}>
        <span className={styles.ctaEyebrow}>READY TO START?</span>
        <h3 className={styles.ctaHead}>
          Tell us about the project. We'll come back within two business days
          with a scoped engagement plan.
        </h3>
        <Link href="/contact" className={styles.ctaBtn}>
          <span>Start a conversation</span>
          <span className={styles.ctaArrow}>→</span>
        </Link>
      </section>
    </PageShell>
  );
}