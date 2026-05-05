import { CADNavbar } from "@/components/cad/CADNavbar";
import { CADStatusBar } from "@/components/cad/CADStatusBar";
import { CADCrosshair } from "@/components/cad/CADCrosshair";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CADCrosshair />
      <CADNavbar />
      <main>{children}</main>
      <CADStatusBar />
    </>
  );
}
