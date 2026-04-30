import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Sheet from "@/app/components/Sheet";
import { TitleBlock, SheetMeta } from "@/app/components/TitleBlock";
import { SERVICES, getServiceBySlug } from "@/lib/services";
import styles from "./page.module.css";

interface PageParams {
  slug: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

/** Pre-generate one static page per service at build time. */
export function generateStaticParams(): PageParams[] {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

/** Per-service metadata — unique <title> and description per page. */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service not found" };

  return {
    title: `${service.name.trim()} ${service.nameEm}`,
    description: service.shortDesc,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  return (
    <Sheet id="services" variant="dark">
      <SheetMeta
        sheetCode={`A-003 / ${service.num}`}
        lines={[
          `Layer · SERVICES / Detail`,
          `Engagement · ${service.engagement}`,
          `Timeline · ${service.timeline}`,
        ]}
      />
      <TitleBlock
        title={`Bluprynt / ${service.name.trim()} ${service.nameEm}`}
        rows={[
          { k: "Drwg No.", v: "BCG-003" },
          { k: "Item", v: service.num },
          { k: "Type", v: service.engagement.toUpperCase() },
        ]}
      />

      <div className="sheet-body">
        {/* Breadcrumb back to the overview */}
        <div className={styles.breadcrumb}>
          <Link href="/services" className={styles.crumb}>
            ← All services
          </Link>
        </div>

        <div className="section-head">
          <div className="section-head-left">
            <div className="label">▸ {service.num}</div>
            <h1 className="title">
              {service.name}
              <span className="em">{service.nameEm}</span>
            </h1>
          </div>
          <div className="section-head-right">
            <p>{service.shortDesc}</p>
          </div>
        </div>

        {/* Long-form description */}
        <section className={styles.longSection}>
          <div className={styles.longLabel}>▸ What it is</div>
          <p className={styles.longBody}>{service.longDesc}</p>
        </section>

        {/* Spec sheet */}
        <div className={styles.specSheet}>
          <div className={styles.specRow}>
            <span className={styles.specK}>Deliverables</span>
            <span className={styles.specV}>
              {service.deliverables.map((d) => (
                <span key={d} className={styles.deliv}>
                  {d}
                </span>
              ))}
            </span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specK}>Engagement</span>
            <span className={styles.specVProse}>{service.engagement}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specK}>Timeline</span>
            <span className={styles.specVProse}>{service.timeline}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specK}>Who it&apos;s for</span>
            <span className={styles.specVProse}>{service.whoItsFor}</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={styles.cta}>
          <div className={styles.ctaLeft}>
            <div className={styles.ctaLabel}>▸ Start</div>
            <h2 className={styles.ctaTitle}>
              Right service<br />
              for your <span className={styles.em}>project?</span>
            </h2>
            <p className={styles.ctaCopy}>
              Tell us about it and we&apos;ll confirm whether {service.name.trim()}{" "}
              {service.nameEm} is the right engagement, or recommend something
              that fits better.
            </p>
          </div>
          <div className={styles.ctaRight}>
            <Link href="/contact" className="btn-primary">
              Start a project →
            </Link>
          </div>
        </div>

        <div className="section-foot">
          <Link href="/services" className="text-link">
            ← All services
          </Link>
        </div>
      </div>
    </Sheet>
  );
}