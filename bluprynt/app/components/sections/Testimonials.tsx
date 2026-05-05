import { SectionShell } from "@/components/cad/SectionShell";
import styles from "./Testimonials.module.css";

export type Testimonial = {
  id: string | number;
  quote: string;
  author: string;
  role?: string | null;
  org?: string | null;
  project?: string | null;
};

type Props = {
  /**
   * Pass testimonials from your DB query. Falls back to placeholders so the
   * section can be previewed before wiring.
   */
  testimonials?: Testimonial[];
};

const PLACEHOLDER: Testimonial[] = [
  {
    id: "t1",
    quote:
      "They flagged a service-line conflict in our second review meeting that would have been a four-week stop on site. The change was made on paper, in an afternoon.",
    author: "Owner's representative",
    role: "Project director",
    project: "Transit corridor, 2024",
  },
  {
    id: "t2",
    quote:
      "Their cost estimate held to within 2% at tender. After three projects with them I stopped budgeting contingency for surprises in their numbers.",
    author: "Public works engineer",
    role: "Senior PM",
    project: "Highway interchange, 2023",
  },
  {
    id: "t3",
    quote:
      "Before construction starts, they treat the drawings like the contractor will. After construction starts, you understand why that matters.",
    author: "Architect of record",
    project: "Mixed-use development, 2024",
  },
];

export default function Testimonials({ testimonials }: Props) {
  const items =
    testimonials && testimonials.length > 0
      ? testimonials.slice(0, 3)
      : PLACEHOLDER;

  return (
    <SectionShell
      code="A-004"
      label="Envelope"
      tone="soft"
      eyebrow="Margin notes from the field"
    >
      <header className={styles.head}>
        <h2 className={styles.heading}>
          What the people who <span className={styles.gold}>signed off</span>{" "}
          actually said.
        </h2>
        <p className={styles.lede}>
          Pinned to the drawings, in the words of the people who've seen our
          work hold up under contract.
        </p>
      </header>

      <ul className={styles.list}>
        {items.map((t, i) => (
          <li
            key={t.id}
            className={styles.note}
            style={{
              ['--i' as string]: i,
              ['--rot' as string]: i % 2 === 0 ? "-0.4deg" : "0.6deg",
            }}
          >
            <span className={styles.pin} aria-hidden="true">
              <span className={styles.pinDot} />
              <span className={styles.pinLine} />
            </span>

            <span className={styles.noteCorner} aria-hidden="true" />

            <span className={styles.noteHead}>
              <span className={styles.noteTag}>NOTE {i + 1} / {items.length}</span>
              <span className={styles.noteRev}>
                {t.project?.match(/\d{4}/)?.[0] ?? "—"}
              </span>
            </span>

            <blockquote className={styles.quote}>
              <span className={styles.quoteMark}>“</span>
              <p>{t.quote}</p>
            </blockquote>

            <footer className={styles.cite}>
              <span className={styles.citeDash}>—</span>
              <span className={styles.citeAuthor}>{t.author}</span>
              {t.role && <span className={styles.citeRole}>· {t.role}</span>}
              {t.project && (
                <span className={styles.citeProject}>· {t.project}</span>
              )}
            </footer>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
