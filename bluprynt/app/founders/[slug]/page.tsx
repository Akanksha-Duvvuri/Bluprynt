import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/cad/PageShell";
import {
  getFounderBySlug,
  allFounderSlugs,
  FOUNDERS,
} from "@/lib/founders";
import styles from "./founder-detail.module.css";

type Params = { slug: string };

export async function generateStaticParams() {
  return allFounderSlugs();
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const f = getFounderBySlug(slug);
  if (!f) return { title: "Founder not found · Bluprynt" };
  return {
    title: `${f.name} · Bluprynt`,
    description: f.bio,
  };
}

export default async function FounderDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const f = getFounderBySlug(slug);
  if (!f) notFound();

  const initials = f.initials ?? f.name.slice(0, 2).toUpperCase();
  const others = FOUNDERS.filter((o) => o.slug !== f.slug);

  return (
    <PageShell
      code="A-300"
      label="PERSONNEL · BIO"
      eyebrow={f.location ?? "Bluprynt Consulting Group"}
      title={f.name}
      lede={f.role}
      maxWidth={1000}
    >
      {/* ===== Identity card =============================================== */}
      <section className={styles.identity} style={{ ['--i' as string]: 0 }}>
        <div className={styles.avatar}>
          {f.photoUrl ? (
            <img src={f.photoUrl} alt="" aria-hidden="true" />
          ) : (
            <>
              <span className={styles.avatarInitials}>{initials}</span>
              <span className={styles.avatarCorners} aria-hidden="true">
                <span /><span /><span /><span />
              </span>
            </>
          )}
        </div>

        <div className={styles.idMeta}>
          <div className={styles.idCell}>
            <span className={styles.idK}>ROLE</span>
            <span className={styles.idV}>{f.role}</span>
          </div>
          {f.location && (
            <div className={styles.idCell}>
              <span className={styles.idK}>BASED IN</span>
              <span className={styles.idV}>{f.location}</span>
            </div>
          )}
          {f.expertise && (
            <div className={styles.idCell}>
              <span className={styles.idK}>FOCUS</span>
              <span className={styles.idV}>
                {f.expertise.slice(0, 2).join(" · ")}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ===== Bio ======================================================== */}
      <section className={styles.bio} style={{ ['--i' as string]: 1 }}>
        <header className={styles.blockHead}>
          <span className={styles.blockNum}>01</span>
          <h2 className={styles.blockTitle}>Background</h2>
        </header>
        <div className={styles.bioBody}>
          <p>{f.longBio ?? f.bio}</p>
        </div>
      </section>

      {/* ===== Expertise =================================================== */}
      {f.expertise && f.expertise.length > 0 && (
        <section className={styles.expertise} style={{ ['--i' as string]: 2 }}>
          <header className={styles.blockHead}>
            <span className={styles.blockNum}>02</span>
            <h2 className={styles.blockTitle}>Expertise</h2>
          </header>
          <ul className={styles.tags}>
            {f.expertise.map((tag) => (
              <li key={tag} className={styles.tag}>{tag}</li>
            ))}
          </ul>
        </section>
      )}

      {/* ===== Contact links =============================================== */}
      {f.links && (f.links.email || f.links.linkedin) && (
        <section className={styles.contact} style={{ ['--i' as string]: 3 }}>
          <header className={styles.blockHead}>
            <span className={styles.blockNum}>03</span>
            <h2 className={styles.blockTitle}>Get in touch</h2>
          </header>
          <div className={styles.links}>
            {f.links.email && (
              <a
                href={`mailto:${f.links.email}`}
                className={styles.contactLink}
              >
                <span className={styles.contactK}>EMAIL</span>
                <span className={styles.contactV}>{f.links.email}</span>
                <span className={styles.contactArrow}>↗</span>
              </a>
            )}
            {f.links.linkedin && (
              <a
                href={f.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <span className={styles.contactK}>LINKEDIN</span>
                <span className={styles.contactV}>Profile</span>
                <span className={styles.contactArrow}>↗</span>
              </a>
            )}
          </div>
        </section>
      )}

      {/* ===== Other founders ============================================= */}
      {others.length > 0 && (
        <section className={styles.others} style={{ ['--i' as string]: 4 }}>
          <header className={styles.blockHead}>
            <span className={styles.blockNum}>04</span>
            <h2 className={styles.blockTitle}>The rest of the team</h2>
          </header>
          <ul className={styles.othersList}>
            {others.map((o) => {
              const oInitials = o.initials ?? o.name.slice(0, 2).toUpperCase();
              return (
                <li key={o.id}>
                  <Link href={`/founders/${o.slug}`} className={styles.otherLink}>
                    <span className={styles.otherAvatar}>{oInitials}</span>
                    <span className={styles.otherText}>
                      <span className={styles.otherName}>{o.name}</span>
                      <span className={styles.otherRole}>{o.role}</span>
                    </span>
                    <span className={styles.otherArrow}>→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* ===== Back ======================================================= */}
      <div className={styles.back} style={{ ['--i' as string]: 5 }}>
        <Link href="/about" className={styles.backLink}>
          ← Back to about
        </Link>
      </div>
    </PageShell>
  );
}