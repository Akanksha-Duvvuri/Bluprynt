import Link from "next/link";
import { SectionShell } from "../SectionShell";
import { getFeaturedFounders } from "@/lib/Founders";
import styles from "./FoundersPreview.module.css";

export default function FoundersPreview() {
  const founders = getFeaturedFounders(2);

  return (
    <SectionShell
      code="A-006"
      label="Personnel"
      eyebrow="The names on the drawings"
    >
      <header className={styles.head}>
        <h2 className={styles.heading}>
          Who you'll <span className={styles.gold}>actually work with</span>.
        </h2>
        <p className={styles.lede}>
          No bait-and-switch — the people who scope your project are the same
          people stamping the deliverables.
        </p>
      </header>

      <ul className={styles.grid}>
        {founders.map((f, i) => (
          <li key={f.id} className={styles.card} style={{ ['--i' as string]: i }}>
            <Link href={`/founders/${f.slug}`} className={styles.cardLink}>
              <div className={styles.cardCorners} aria-hidden="true">
                <span /><span /><span /><span />
              </div>

              <div className={styles.head2}>
                <Avatar founder={f} />
                <div className={styles.who}>
                  <h3 className={styles.name}>{f.name}</h3>
                  <p className={styles.role}>{f.role}</p>
                  {f.location && (
                    <p className={styles.loc}>{f.location}</p>
                  )}
                </div>
              </div>

              <p className={styles.bio}>{f.bio}</p>

              {f.expertise && f.expertise.length > 0 && (
                <ul className={styles.tags}>
                  {f.expertise.map((tag) => (
                    <li key={tag} className={styles.tag}>{tag}</li>
                  ))}
                </ul>
              )}

              <div className={styles.foot}>
                <span className={styles.read}>Read full bio</span>
                <span className={styles.arrow}>→</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

/* ---------- Avatar: photo if provided, otherwise initials tile ---------- */

function Avatar({ founder }: { founder: { initials?: string; name: string; photoUrl?: string } }) {
  if (founder.photoUrl) {
    return (
      <div className={styles.avatar}>
        {/* Use plain <img> here so this doesn't require Next.js Image config */}
        <img src={founder.photoUrl} alt="" aria-hidden="true" />
      </div>
    );
  }
  const initials = founder.initials ?? founder.name.slice(0, 2).toUpperCase();
  return (
    <div className={`${styles.avatar} ${styles.avatarMono}`}>
      <span className={styles.avatarInitials}>{initials}</span>
      <span className={styles.avatarCorners} aria-hidden="true">
        <span /><span /><span /><span />
      </span>
    </div>
  );
}