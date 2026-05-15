import { CADNavbar } from "@/app/components/CADNavbar";
import  CADCrosshair  from "../components/CADCrosshair";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CADCrosshair />
      <CADNavbar />
      <main>{children}</main>
    </>
  );
}
