import { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";

export function DashboardShell({
  children,
  admin = false
}: {
  children: ReactNode;
  admin?: boolean;
}) {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-100px)] max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[280px_1fr]">
      <Sidebar admin={admin} />
      <main className="space-y-6">{children}</main>
    </div>
  );
}
