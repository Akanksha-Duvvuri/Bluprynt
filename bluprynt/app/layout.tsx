import type { Metadata, Viewport } from "next";
import { Inter_Tight, Nunito, Space_Mono } from "next/font/google";
import { headers } from "next/headers";
import { SheetProvider } from "@/lib/cad/SheetProvider";
// import Crosshair from "./components/Crosshair";
import  Crosshair  from "./components/Crosshair";
import { CADNavbar } from "@/app/components/CADNavbar";
import { CADStatusBar } from "@/app/components/CADStatusBar";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Bluprynt · Pre-Construction Consulting",
  description:
    "The firm you call before you build. Pre-construction consulting for civil and infrastructure projects across the US and India.",
};

export const viewport: Viewport = {
  themeColor: "#0D0C08",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read pathname from the x-pathname header set by middleware.ts.
  // Lets us hide public chrome (Crosshair, etc.) on /admin/* routes.
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html
      lang="en"
      className={`${interTight.variable} ${nunito.variable} ${spaceMono.variable}`}
    >
      <body>
        <SheetProvider>
          <Crosshair />
          <CADNavbar />
          {children}
          <CADStatusBar />
        </SheetProvider>
      </body>
    </html>
  );
}