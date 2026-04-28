import type { Metadata, Viewport } from "next";
import { Inter_Tight, Nunito, Space_Mono } from "next/font/google";
import Crosshair from "./components/Crosshair";
import TopBar from "./components/TopBar";
import StatusBar from "./components/StatusBar";
import Footer from "./components/Footer";
import "./globals.css";

/*
   Free stand-ins for the licensed brand fonts:
     Inter Tight  → Scto Grotesk A (primary)
     Nunito       → Airbnb Cereal W BD (secondary)
     Space Mono   → mono / readouts
   ────────────────────────────────────────────────────────────── */
const primary = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const secondary = Nunito({
  subsets: ["latin"],
  variable: "--font-secondary",
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

/* ──────────────────────────────────────────────────────────────
   METADATA — site-wide defaults. Per-page metadata overrides this.
   ────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "Bluprynt Consulting Group",
    template: "%s — Bluprynt Consulting Group",
  },
  description:
    "Civil and infrastructure consulting for the decisions that matter most. Feasibility, structural review, and owner-side advisory — before the first drawing goes to site.",
  keywords: [
    "civil consulting",
    "infrastructure",
    "structural assessment",
    "feasibility study",
    "project advisory",
    "engineering consulting",
  ],
  authors: [{ name: "Bluprynt Consulting Group" }],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://bluprynt.com"
  ),
  openGraph: {
    title: "Bluprynt Consulting Group",
    description: "Engineering accuracy. Consulting excellence.",
    type: "website",
    locale: "en_IN",
  },
  // Favicon is auto-detected from app/favicon.ico — no `icons` config needed.
};

export const viewport : Viewport = {
    themeColor: "#15130D",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${primary.variable} ${secondary.variable} ${mono.variable}`}
    >
      <body>
        <Crosshair />
        <TopBar />
        <main>{children}</main>
        <Footer />
        <StatusBar />
      </body>
    </html>
  );
}