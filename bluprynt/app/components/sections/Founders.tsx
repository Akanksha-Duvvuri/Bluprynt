import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getFounderBySlug,
  allFounderSlugs,
} from "@/lib/Founders";

type Params = { slug: string };

export async function generateStaticParams() {
  return allFounderSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const f = getFounderBySlug(slug);
  if (!f) return { title: "Founder not found · Bluprynt" };
  return {
    title: `${f.name} · Bluprynt`,
    description: f.bio,
  };
}

export default async function FounderPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const f = getFounderBySlug(slug);
  if (!f) notFound();

  const initials = f.initials ?? f.name.slice(0, 2).toUpperCase();

  return (
    <article style={{ minHeight: "100vh", padding: "120px 24px 80px" }}>
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4, 32px)",
        }}
      >
        <Link
          href="/founders"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--accent-gold)",
            textDecoration: "none",
          }}
        >
          ← Back to founders
        </Link>

        {/* Header: avatar + identity */}
        <header
          style={{
            display: "flex",
            gap: "var(--space-4, 32px)",
            alignItems: "flex-start",
            paddingBottom: "var(--space-4, 32px)",
            borderBottom: "1px dashed var(--gold-20)",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "120px",
              flexShrink: 0,
              border: "1px solid var(--accent-gold)",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: f.photoUrl
                ? "var(--bg-deep)"
                : `repeating-linear-gradient(45deg, transparent 0 4px, rgba(196,165,100,0.08) 4px 5px), var(--bg-deep)`,
              overflow: "hidden",
            }}
          >
            {f.photoUrl ? (
              <img
                src={f.photoUrl}
                alt=""
                aria-hidden="true"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "36px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "var(--accent-gold)",
                }}
              >
                {initials}
              </span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-1, 8px)",
              minWidth: 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.2em",
                color: "var(--accent-gold)",
              }}
            >
              SHEET A-006 / PERSONNEL
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--accent-cream)",
                margin: 0,
              }}
            >
              {f.name}
            </h1>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                letterSpacing: "0.18em",
                color: "var(--accent-gold)",
                textTransform: "uppercase",
              }}
            >
              {f.role}
            </p>
            {f.location && (
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  color: "var(--cream-65)",
                }}
              >
                {f.location}
              </p>
            )}
          </div>
        </header>

        {/* Bio */}
        <section>
          <p
            style={{
              margin: 0,
              fontSize: "1.0625rem",
              lineHeight: 1.65,
              color: "var(--cream-80)",
              maxWidth: "60ch",
            }}
          >
            {f.longBio ?? f.bio}
          </p>
        </section>

        {/* Expertise tags */}
        {f.expertise && f.expertise.length > 0 && (
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2, 16px)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.2em",
                color: "var(--cream-65)",
                textTransform: "uppercase",
              }}
            >
              EXPERTISE
            </span>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {f.expertise.map((tag) => (
                <li
                  key={tag}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    padding: "4px 10px",
                    border: "0.5px solid var(--gold-33)",
                    borderRadius: "2px",
                    color: "var(--accent-gold)",
                    background: "rgba(13, 12, 8, 0.4)",
                  }}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Contact links */}
        {f.links && (f.links.linkedin || f.links.email) && (
          <section
            style={{
              display: "flex",
              gap: "var(--space-3, 24px)",
              flexWrap: "wrap",
              paddingTop: "var(--space-3, 24px)",
              borderTop: "1px dashed var(--gold-20)",
            }}
          >
            {f.links.email && (
              <a
                href={`mailto:${f.links.email}`}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--accent-gold)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--gold-33)",
                  paddingBottom: "2px",
                }}
              >
                {f.links.email}
              </a>
            )}
            {f.links.linkedin && (
              <a
                href={f.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--accent-gold)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--gold-33)",
                  paddingBottom: "2px",
                }}
              >
                LinkedIn ↗
              </a>
            )}
          </section>
        )}
      </div>
    </article>
  );
}