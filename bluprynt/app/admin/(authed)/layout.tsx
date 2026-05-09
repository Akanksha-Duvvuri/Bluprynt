import type { Metadata } from "next";
import { auth } from "@/auth";
import AdminLayoutClient from "./AdminLayoutClient";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) return null;

  return (
    <AdminLayoutClient
      userName={session.user.name ?? null}
      userEmail={session.user.email ?? null}
    >
      {children}
    </AdminLayoutClient>
  );
}