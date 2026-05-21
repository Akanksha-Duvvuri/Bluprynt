import { SectionShell } from "../SectionShell";
import styles from "./FoundersPreview.module.css";

type Person = {
  code: string;       // F1, F2, T1, T2, T3 — used as photo placeholder
  name: string;
  role: string;
  experience?: string;
  detail?: string;
  photoUrl?: string;  // when set, shows the photo instead of the code
};

const LEADERSHIP: Person[] = [
  {
    code: "F1",
    name: "Vivek Budankayala",
    role: "Co-founder & CEO",
    detail:
      "Master of Engineering (Construction Management), New York University",
  },
  {
    code: "F2",
    name: 'BG M',
    role: "Co-founder & CFO",
    detail:
      "Post Graduate Programme in Management (MBA), Indian School of Business",
  },
];

const DELIVERY: Person[] = [
  {
    code: "T1",
    name: "Raju PNM",
    role: "Senior Estimation Manager",
    experience: "20+ years",
    detail: "Rebar shop drawings · Estimating · Slab edge",
  },
  {
    code: "T2",
    name: "Shivakumar S",
    role: "Senior Estimator",
    experience: "6 years",
    detail: "Window and Façade Detailing (Logikal Software)",
  },
  {
    code: "T3",
    name: "Prasanth E",
    role: "Estimator",
    experience: "5 years",
  },
];

export default function FoundersPreview() {
  return (
    <SectionShell code="A-006" label="MEET THE TEAM" eyebrow="">
      <header className={styles.head}>
        <h2 className={styles.heading}>
          Who you&apos;ll{" "}
          <span className={styles.gold}>actually work with</span>.
        </h2>
        <p className={styles.lede}>
          12.5+ years average team experience. Civil engineers and estimators
          aligned with US standards.
        </p>
      </header>

      {/* ────────── Leadership row ────────── */}
      <div className={styles.rowLabel}>▸ Leadership</div>
      <ul className={styles.gridLeadership}>
        {LEADERSHIP.map((p, i) => (
          <PersonCard key={p.code} person={p} variant="lg" index={i} />
        ))}
      </ul>

      {/* ────────── Delivery Team row ────────── */}
      <div className={styles.rowLabel}>▸ Delivery Team</div>
      <ul className={styles.gridDelivery}>
        {DELIVERY.map((p, i) => (
          <PersonCard key={p.code} person={p} variant="sm" index={i} />
        ))}
      </ul>
    </SectionShell>
  );
}

/* ──────────────────────────────────────────────────────────────
   PersonCard — same shape, two sizes.
   ────────────────────────────────────────────────────────────── */

function PersonCard({
  person,
  variant,
  index,
}: {
  person: Person;
  variant: "lg" | "sm";
  index: number;
}) {
  const cardClass = `${styles.card} ${
    variant === "lg" ? styles.cardLg : styles.cardSm
  }`;

  return (
    <li className={cardClass} style={{ ["--i" as string]: index }}>
      <div className={styles.photoFrame}>
        {person.photoUrl ? (
          <img
            src={person.photoUrl}
            alt={person.name}
            className={styles.photoImg}
          />
        ) : (
          <span className={styles.photoCode}>{person.code}</span>
        )}
        <span className={styles.tickTL} aria-hidden="true" />
        <span className={styles.tickTR} aria-hidden="true" />
        <span className={styles.tickBL} aria-hidden="true" />
        <span className={styles.tickBR} aria-hidden="true" />
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.name}>{person.name}</h3>
        <p className={styles.role}>{person.role}</p>
        {person.experience && (
          <p className={styles.experience}>
            Experience: {person.experience}
          </p>
        )}
        {person.detail && <p className={styles.detail}>{person.detail}</p>}
      </div>
    </li>
  );
}