import type { Metadata } from "next";
import { Inter_Tight, Nunito, Space_Mono } from "next/font/google";
import Crosshair from "./components/Crosshair";
import TopBar from "./components/TopBar";
import StatusBar from "./components/StatusBar";
import Footer from "./components/Footer";
import "./globals.css";

/* ──────────────────────────────────────────────────────────────
   FONTS
   Free stand-ins for the licensed brand fonts:
     Inter Tight  → Scto Grotesk A (primary)
     Nunito       → Airbnb Cereal W BD (secondary)
     Space Mono   → mono / readouts

   When you have the licensed font files, swap to next/font/local:
     import localFont from "next/font/local";
     const sctoGrotesk = localFont({
       src: [
         { path: "./fonts/SctoGroteskA-Regular.woff2", weight: "400" },
         { path: "./fonts/SctoGroteskA-Bold.woff2", weight: "700" },
       ],
       variable: "--font-primary",
     });
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
  themeColor: "#15130D",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

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