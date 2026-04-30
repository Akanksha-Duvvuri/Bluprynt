import type { Metadata, Viewport } from "next";
import { Inter_Tight, Nunito, Space_Mono } from "next/font/google";
import { headers } from "next/headers";
import Crosshair from "./components/Crosshair";
import TopBar from "./components/TopBar";
import StatusBar from "./components/StatusBar";
import Footer from "./components/Footer";
import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "Bluprynt Consulting Group",
    template: "%s — Bluprynt Consulting Group",
  },
  description:
    "Civil and infrastructure consulting for the decisions that matter most. Feasibility, structural review, and owner-side advisory — before the first drawing goes to site.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://bluprynt.com"
  ),
};

export const viewport: Viewport = {
  themeColor: "#15130D",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Detect whether we're on an /admin/* route.
  // x-pathname is set by middleware (or we can read x-invoke-path).
  // Simpler: just always render the chrome, and let admin pages CSS-hide it.
  // But the cleanest approach: read the path from headers.
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? headersList.get("x-invoke-path") ?? "";
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html
      lang="en"
      className={`${primary.variable} ${secondary.variable} ${mono.variable}`}
    >
      <body>
        {/* {!isAdminRoute && <Crosshair />} */}
        <Crosshair />
        {!isAdminRoute && <TopBar />}
        <main>{children}</main>
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <StatusBar />}
      </body>
    </html>
  );
}