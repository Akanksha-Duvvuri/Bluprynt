import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "../../components/Pageshell";
import {
  getServiceBySlug,
  allServiceSlugs,
  getAllServices,
} from "@/lib/services";
import styles from "./page.module.css";

type Params = { slug: string };

/* ────────────────────────────────────────────────────────────────────
   Static content shared across all service pages.
   Move to lib/ or back into the DB if you want it editable.
   ──────────────────────────────────────────────────────────────────── */

const WHY_BLUPRYNT = [
  {
    n: "01",
    title: "US-trained leadership, India-based delivery",
    body: "Engineering judgment on US codes, design assumptions, and bid-clock realities — backed by deep India-based delivery muscle.",
  },
  {
    n: "02",
    title: "Estimators who speak engineering",
    body: "Our team isn't just counting bars. They've designed and stamped them. That changes the questions they ask and the answers you get.",
  },
  {
    n: "03",
    title: "Your format. Your bid clock.",
    body: "We submit in your templates, on your timeline. No conversion friction, no formatting back-and-forth, no surprises 6 hours before bid.",
  },
  {
    n: "04",
    title: "One sample to decide",
    body: "We don't ask for a contract before we earn it. Send us a real scope. We'll send back a sample. Decide from there.",
  },
];

const STATS = [
  { value: "12.5", unit: "yrs", label: "Avg team experience" },
  { value: "48", unit: "hrs", label: "Sample turnaround" },
  { value: "40–60", unit: "%", label: "Cost vs US in-house" },
  { value: "100", unit: "%", label: "US-aligned hours" },
];

const PROCESS = [
  {
    n: "01",
    title: "Brief",
    body: "Send scope, drawings, and bid clock. Same-day confirmation, usually within hours.",
  },
  {
    n: "02",
    title: "Sample",
    body: "Free sample deliverable in 48 hours. You see format, depth, and accuracy before any commitment.",
  },
  {
    n: "03",
    title: "Engage",
    body: "Scoped plan, fixed rate, named lead. Daily progress against your bid milestones.",
  },
  {
    n: "04",
    title: "Deliver",
    body: "Final deliverable in your format. We stay available for clarifications through the bid window.",
  },
];

/* ────────────────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────────────────── */

export async function generateStaticParams() {
  return await allServiceSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const s = await getServiceBySlug(slug);
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
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const all = await getAllServices();
  const others = all.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <PageShell
      code={`A-2${service.num.padStart(2, "0")}`}
      label={`SERVICE · ${service.num}`}
      title={service.title}
      lede={service.line}
      maxWidth={1200}
    >
      {/* ===== HERO BLOCK ============================================== */}
      <section className={styles.hero} style={{ ["--i" as string]: 0 }}>
        <div className={styles.heroImage}>
          {/*
            Replace the placeholder div below with a real image when ready:

              <img
                src={`/services/${service.slug}.jpg`}
                alt={service.title}
                className={styles.heroImg}
              />

            Add hero JPGs to public/services/<slug>.jpg
            For a more permanent solution, add a heroImage column to your
            services schema and reference it as service.heroImage.
          */}
          <div className={styles.heroPlaceholder} aria-hidden="true">
            <span className={styles.heroNum}>
              {service.num.padStart(3, "0")}
            </span>
            <span className={styles.heroDivider} />
            <span className={styles.heroLabel}>{service.title}</span>
            <span className={styles.heroMeta}>
              <span>SCALE 1:1</span>
              <span className={styles.heroMetaSep}>·</span>
              <span>DWG {service.num}</span>
              <span className={styles.heroMetaSep}>·</span>
              <span>REV 01</span>
            </span>
          </div>
          <span className={`${styles.tick} ${styles.tickTL}`} aria-hidden />
          <span className={`${styles.tick} ${styles.tickTR}`} aria-hidden />
          <span className={`${styles.tick} ${styles.tickBL}`} aria-hidden />
          <span className={`${styles.tick} ${styles.tickBR}`} aria-hidden />
        </div>

        <aside className={styles.heroFacts}>
          <div className={styles.factsHead}>SPECIFICATIONS</div>
          {service.tag && (
            <div className={styles.factRow}>
              <span className={styles.factK}>Tag</span>
              <span className={styles.factV}>{service.tag}</span>
            </div>
          )}
          <div className={styles.factRow}>
            <span className={styles.factK}>Sample</span>
            <span className={styles.factV}>48 hr · no charge</span>
          </div>
          <div className={styles.factRow}>
            <span className={styles.factK}>Format</span>
            <span className={styles.factV}>Your template, your bid clock</span>
          </div>
          <div className={styles.factRow}>
            <span className={styles.factK}>Engagement</span>
            <span className={styles.factV}>One-off, recurring, or retainer</span>
          </div>
        </aside>
      </section>

      {/* ===== OVERVIEW ============================================== */}
      {service.description && (
        <section className={styles.overview} style={{ ["--i" as string]: 1 }}>
          <header className={styles.sectionHead}>
            <span className={styles.sectionN}>01</span>
            <h2 className={styles.sectionTitle}>Overview</h2>
          </header>
          <p className={styles.overviewBody}>{service.description}</p>
        </section>
      )}

      {/* ===== DELIVERABLES ========================================== */}
      {service.deliverables && service.deliverables.length > 0 && (
        <section
          className={styles.deliverables}
          style={{ ["--i" as string]: 2 }}
        >
          <header className={styles.sectionHead}>
            <span className={styles.sectionN}>02</span>
            <h2 className={styles.sectionTitle}>What you get</h2>
          </header>
          <ul className={styles.delivGrid}>
            {service.deliverables.map((d, i) => (
              <li key={d} className={styles.delivCard}>
                <span className={styles.delivN}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.delivTitle}>{d}</h3>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ===== WHY BLUPRYNT FOR THIS WORK ============================ */}
      <section className={styles.why} style={{ ["--i" as string]: 3 }}>
        <header className={styles.sectionHead}>
          <span className={styles.sectionN}>03</span>
          <h2 className={styles.sectionTitle}>Why Bluprynt for this work</h2>
        </header>
        <ul className={styles.whyGrid}>
          {WHY_BLUPRYNT.map((w) => (
            <li key={w.n} className={styles.whyCard}>
              <span className={styles.whyN}>{w.n}</span>
              <h3 className={styles.whyTitle}>{w.title}</h3>
              <p className={styles.whyBody}>{w.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ===== STATS / BY THE NUMBERS ================================ */}
      <section className={styles.stats} style={{ ["--i" as string]: 4 }}>
        <header className={styles.sectionHead}>
          <span className={styles.sectionN}>04</span>
          <h2 className={styles.sectionTitle}>By the numbers</h2>
        </header>
        <ul className={styles.statsGrid}>
          {STATS.map((s) => (
            <li key={s.label} className={styles.stat}>
              <div className={styles.statValue}>
                <span className={styles.statNumber}>{s.value}</span>
                <span className={styles.statUnit}>{s.unit}</span>
              </div>
              <span className={styles.statLabel}>{s.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ===== WHEN TO ENGAGE ======================================== */}
      {service.whenToEngage && service.whenToEngage.length > 0 && (
        <section className={styles.engage} style={{ ["--i" as string]: 5 }}>
          <header className={styles.sectionHead}>
            <span className={styles.sectionN}>05</span>
            <h2 className={styles.sectionTitle}>When to engage us</h2>
          </header>
          <ul className={styles.engageList}>
            {service.whenToEngage.map((t) => (
              <li key={t} className={styles.engageItem}>
                <span className={styles.engageMark} aria-hidden="true">
                  →
                </span>
                <span className={styles.engageText}>{t}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ===== PROCESS / HOW WE WORK ================================= */}
      <section className={styles.process} style={{ ["--i" as string]: 6 }}>
        <header className={styles.sectionHead}>
          <span className={styles.sectionN}>06</span>
          <h2 className={styles.sectionTitle}>How we work</h2>
        </header>
        <ol className={styles.processList}>
          {PROCESS.map((p, i) => (
            <li key={p.n} className={styles.processStep}>
              <div className={styles.stepNum}>{p.n}</div>
              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>{p.title}</h3>
                <p className={styles.stepText}>{p.body}</p>
              </div>
              {i < PROCESS.length - 1 && (
                <span className={styles.stepConnector} aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* ===== OTHER SERVICES ======================================== */}
      {others.length > 0 && (
        <section className={styles.others} style={{ ["--i" as string]: 7 }}>
          <header className={styles.sectionHead}>
            <span className={styles.sectionN}>07</span>
            <h2 className={styles.sectionTitle}>Other services</h2>
          </header>
          <ul className={styles.othersGrid}>
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/services/${o.slug}`} className={styles.otherLink}>
                  <span className={styles.otherN}>{o.num}</span>
                  <h3 className={styles.otherTitle}>{o.title}</h3>
                  <p className={styles.otherLine}>{o.line}</p>
                  <span className={styles.otherArrow}>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ===== CTA =================================================== */}
      <section className={styles.cta} style={{ ["--i" as string]: 8 }}>
        <div className={styles.ctaInner}>
          <span className={styles.ctaEyebrow}>READY TO START?</span>
          <h3 className={styles.ctaHead}>
            Tell us about your project. We&apos;ll come back with a scoped
            engagement plan inside two business days — and a free sample
            deliverable inside 48 hours.
          </h3>
          <div className={styles.ctaActions}>
            <Link href="/#contact" className={styles.ctaBtn}>
              <span>Start a conversation</span>
              <span className={styles.ctaArrow}>→</span>
            </Link>
            <Link href="/services" className={styles.ctaBack}>
              ← All services
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}