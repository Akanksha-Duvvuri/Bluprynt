import Link from "next/link";
import { PageShell } from "../components/Pageshell";
import { FOUNDERS } from "@/lib/Founders";
import styles from "./page.module.css";

export const metadata = {
  title: "About · Bluprynt",
  description:
    "Bluprynt is a pre-construction consulting practice working across the US and India. The firm, the founders, and the methodology.",
};

export default function AboutPage() {
  return (
    <PageShell
      code="A-400"
      label="ABOUT THE FIRM"
      // eyebrow="Why Choose Us"
      title={
        <>
        Why US Construction Companies Choose Bluprynt
        </>
      }
      lede="We work the seam between design intent and what gets built."
      maxWidth={1100}
    >
      {/* ===== The cost-of-change centerpiece ============================== */}
      <section className={styles.whySection}>
   <header className={styles.blockHead}>
          <span className={styles.blockNum}>01</span>
          <h2 className={styles.blockTitle}>What Makes Us Different</h2>
        </header>

  <div className={styles.whyGrid}>
    <article className={styles.whyCard}>
      <span className={styles.whyNum}>01</span>
      <h3 className={styles.whyTitle}>US-Trained Leadership</h3>
      <p className={styles.whyBody}>
        Our CEO holds an MEng in Construction Management from NYU. Every
        deliverable is reviewed against US standards before it ships.
      </p>
    </article>

    <article className={styles.whyCard}>
      <span className={styles.whyNum}>02</span>
      <h3 className={styles.whyTitle}>Your Business Hours</h3>
      <p className={styles.whyBody}>
        We work your time zone, not ours. Real-time on WhatsApp, email,
        and calls — no 12-hour email lag.
      </p>
    </article>

    <article className={styles.whyCard}>
      <span className={styles.whyNum}>03</span>
      <h3 className={styles.whyTitle}>40&ndash;60% Cost Advantage</h3>
      <p className={styles.whyBody}>
        Offshore delivery economics, US-grade quality. No hidden fees.
        No fixed headcount.
      </p>
    </article>

    <article className={styles.whyCard}>
      <span className={styles.whyNum}>04</span>
      <h3 className={styles.whyTitle}>One Partner, Five Services</h3>
      <p className={styles.whyBody}>
        Estimating, rebar shop drawings, slab edge, SOE takeoffs, and
        submittal coordination &mdash; one partner, one point of contact,
        one invoice.
      </p>
    </article>
  </div>
</section>

      <section className={styles.thesis} style={{ ['--i' as string]: 0 }}>
        <header className={styles.blockHead}>
          <span className={styles.blockNum}>02</span>
          <h2 className={styles.blockTitle}>Learn More About Us</h2>
        </header>

        <div className={styles.thesisGrid}>
          <div className={styles.thesisProse}>
            <p className={styles.thesisLead}>
              The cheapest place to fix a problem is on the page. The most
              expensive is in the field.
            </p>
            <p>
              Most cost overruns aren't built — they're <em>drawn</em>. They live in
              ambiguous specs, missed clashes, and the seams between disciplines
              that nobody owns. By the time they show up on site, a 5-minute
              correction has become a 5-figure change order.
            </p>
            <p>
              We sit at that seam. Our work is to find what's wrong on the page
              before it becomes wrong in the field — and to set up the controls
              that catch the next thing before it costs you a quarter.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Numbers ===================================================== */}
      
      <section className={styles.numbers} style={{ ['--i' as string]: 1 }}>
        <header className={styles.blockHead}>
          <span className={styles.blockNum}>0</span>
          <h2 className={styles.blockTitle}>By the numbers</h2>
        </header>
        <div className={styles.numberGrid}>
          <Stat k="Years of practice" v="12.5+" />
          <Stat k="Offices" v="2" sub="HYD · US" />
          <Stat k="Active engagements" v="x" />
          <Stat k="Disciplines covered" v="Y" />
        </div>
      </section>

      {/* ===== Methodology ================================================= */}
      <section className={styles.method} style={{ ['--i' as string]: 2 }}>
        <header className={styles.blockHead}>
          <span className={styles.blockNum}>04</span>
          <h2 className={styles.blockTitle}>How we work</h2>
        </header>
        <ol className={styles.methodList}>
          <MethodStep
            num="01"
            title="Listen first"
            body="We don't pitch a methodology before we understand the project. The first conversation is about your stakes, your stakeholders, and what 'done' looks like."
          />
          <MethodStep
            num="02"
            title="Scope to the question"
            body="A one-week feasibility check is a different engagement than a multi-year owner's-rep retainer. We propose the smallest scope that answers the question, then expand if the question grows."
          />
          <MethodStep
            num="03"
            title="One team, two offices"
            body="Time-zone overlap means a question raised in the morning has a draft answer by the next morning. Same team start to finish — no offshore handoff, no junior staffing surprise."
          />
          <MethodStep
            num="04"
            title="Stamp it"
            body="Every deliverable carries a sheet code, a revision number, and the names of the people who reviewed it. We sign our work. So can you."
          />
        </ol>
      </section>

      {/* ===== Founders embedded ==========================================
           Anchor target: links from anywhere with /about#founders land here.
           Cards are non-interactive (no per-founder detail pages). */}
      <section
        id="founders"
        className={styles.foundersSection}
        style={{ ['--i' as string]: 3 }}
      >
        <header className={styles.blockHead}>
          <span className={styles.blockNum}>04</span>
          <h2 className={styles.blockTitle}>The founders</h2>
        </header>
        <p className={styles.foundersIntro}>
          Meet the C - Suite
        </p>

        <ul className={styles.foundersList}>
          {FOUNDERS.map((f, i) => {
            const initials =
              f.initials ?? f.name.slice(0, 2).toUpperCase();
            return (
              <li
                key={f.slug}
                className={styles.fCard}
                style={{ ['--i' as string]: i }}
              >
                {/* Static article — no link wrapper anymore */}
                <article className={styles.fInner}>
                  <div className={styles.fAvatar}>
                    {f.photoUrl ? (
                      <img src={f.photoUrl} alt="" aria-hidden="true" />
                    ) : (
                      <span className={styles.fInitials}>{initials}</span>
                    )}
                  </div>
                  <div className={styles.fBody}>
                    <h3 className={styles.fName}>{f.name}</h3>
                    <p className={styles.fRole}>{f.role}</p>
                    {/* Show the longer bio here since this is the destination */}
                    <p className={styles.fBio}>{f.longBio ?? f.bio}</p>

                    {/* Optional expertise tags
                    {f.expertise && f.expertise.length > 0 && (
                      <ul className={styles.fTags}>
                        {f.expertise.map((t) => (
                          <li key={t} className={styles.fTag}>{t}</li>
                        ))}
                      </ul>
                    )} */}

                    {/* Optional contact links */}
                    {f.links && (f.links.email || f.links.linkedin) && (
                      <div className={styles.fLinks}>
                        {f.links.email && (
                          <a
                            href={`mailto:${f.links.email}`}
                            className={styles.fLink}
                          >
                            {f.links.email}
                          </a>
                        )}
                        {f.links.linkedin && (
                          <a
                            href={f.links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.fLink}
                          >
                            LinkedIn ↗
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ===== Offices ===================================================== */}
      <section className={styles.offices} style={{ ['--i' as string]: 4 }}>
        <header className={styles.blockHead}>
          <span className={styles.blockNum}>05</span>
          <h2 className={styles.blockTitle}>Where we are</h2>
        </header>
        <div className={styles.officeGrid}>
          <Office
            n="01"
            city="Hyderabad"
            country="India"
            note="Engineering, drafting, project controls."
          />
          <Office
            n="02"
            city="United States"
            country="—"
            note="Owner's-rep practice, client liaison, US site visits."
          />
        </div>
      </section>

      {/* ===== CTA — points to homepage contact section ==================== */}
      <section className={styles.cta} style={{ ['--i' as string]: 5 }}>
        <span className={styles.ctaEyebrow}>READY TO TALK?</span>
        <h3 className={styles.ctaHead}>
          We'd rather earn your trust with one 
deliverable than a pitch deck. 
Start with the sample. Decide from there
        </h3>
        <Link href="/#contact" className={styles.ctaBtn}>
          <span>Start a conversation</span>
          <span className={styles.ctaArrow}>→</span>
        </Link>
      </section>
    </PageShell>
  );
}

/* ---------- Subcomponents ---------- */

function Stat({ k, v, sub }: { k: string; v: string; sub?: string }) {
  return (
    <div className={styles.stat}>
      <span className={styles.statK}>{k}</span>
      <span className={styles.statV}>{v}</span>
      {sub && <span className={styles.statSub}>{sub}</span>}
    </div>
  );
}

function MethodStep({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <li className={styles.methodStep}>
      <span className={styles.methodN}>{num}</span>
      <div className={styles.methodMain}>
        <h3 className={styles.methodTitle}>{title}</h3>
        <p className={styles.methodBody}>{body}</p>
      </div>
    </li>
  );
}

function Office({
  n,
  city,
  country,
  note,
}: {
  n: string;
  city: string;
  country: string;
  note: string;
}) {
  return (
    <div className={styles.office}>
      <span className={styles.officeN}>OFFICE {n}</span>
      <h3 className={styles.officeCity}>{city}</h3>
      <p className={styles.officeCountry}>{country}</p>
      <p className={styles.officeNote}>{note}</p>
    </div>
  );
}

function CostChart() {
  return (
    <svg
      viewBox="0 0 320 200"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.chart}
      role="img"
      aria-label="Relative cost of change across project phases"
    >
      <line x1="40" y1="170" x2="300" y2="170" stroke="var(--gold-33)" strokeWidth="0.5" />
      <line x1="40" y1="20" x2="40" y2="170" stroke="var(--gold-33)" strokeWidth="0.5" />

      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="40" y1={y} x2="300" y2={y} stroke="var(--gold-20)" strokeWidth="0.5" strokeDasharray="2 4" />
      ))}

      <path
        d="M 60 165 Q 130 158, 180 130 T 280 30"
        stroke="var(--accent-cream)"
        strokeWidth="1.5"
        fill="none"
      />

      <g>
        <circle cx="80" cy="160" r="4" fill="var(--accent-mint)" />
        <text x="80" y="188" textAnchor="middle" fill="var(--cream-65)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="2">CONCEPT</text>
      </g>
      <g>
        <circle cx="170" cy="130" r="4" fill="var(--accent-gold)" />
        <text x="170" y="188" textAnchor="middle" fill="var(--cream-65)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="2">DESIGN</text>
      </g>
      <g>
        <circle cx="270" cy="40" r="5" fill="var(--accent-red)" />
        <text x="270" y="188" textAnchor="middle" fill="var(--cream-65)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="2">BUILD</text>
      </g>

      <text x="46" y="28" fill="var(--cream-65)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="2">COST</text>
    </svg>
  );
}