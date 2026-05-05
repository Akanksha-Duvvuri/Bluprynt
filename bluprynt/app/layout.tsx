import type { Metadata, Viewport } from "next";
import { Inter_Tight, Nunito, Space_Mono } from "next/font/google";
import { SheetProvider } from "@/lib/cad/SheetProvider";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${nunito.variable} ${spaceMono.variable}`}
    >
      <body>
        <SheetProvider>{children}</SheetProvider>
      </body>
    </html>
  );
}
