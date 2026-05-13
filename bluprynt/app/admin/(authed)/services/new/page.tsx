import Link from "next/link";
import ServiceForm from "../ServiceForm";

export const metadata = {
  title: "New service · Admin",
};

export default function NewServicePage() {
  return (
    <div>
      <header
        style={{
          marginBottom: 36,
          paddingBottom: 24,
          borderBottom: "1px dashed rgba(196, 165, 100, 0.25)",
        }}
      >
        <Link
          href="/admin/services"
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255, 238, 198, 0.55)",
            textDecoration: "none",
            marginBottom: 18,
            display: "inline-block",
          }}
        >
          ← Back to services
        </Link>
        <h1
          style={{
            fontFamily: "var(--primary)",
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            fontWeight: 300,
            letterSpacing: "-0.025em",
            margin: "8px 0 6px",
            lineHeight: 1,
          }}
        >
          New <span style={{ color: "var(--gold)", fontWeight: 400 }}>service</span>
        </h1>
        <p
          style={{
            fontFamily: "var(--secondary)",
            fontSize: 14,
            color: "rgba(255, 238, 198, 0.65)",
            margin: 0,
          }}
        >
          Fill in the fields below. After saving, the service is live on the
          public site (and on the homepage if Featured).
        </p>
      </header>
      <ServiceForm />
    </div>
  );
}
