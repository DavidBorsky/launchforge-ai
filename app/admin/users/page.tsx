import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export default async function AdminUsersPage() {
  await requireAdmin();
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <DashboardShell admin>
      <Card>
        <h1 className="text-3xl font-semibold text-slate-950">Users</h1>
        <div className="mt-6 space-y-4">
          {users.map((user) => (
            <div key={user.id} className="rounded-3xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-950">{user.name ?? "Unnamed user"}</p>
              <p className="mt-1 text-sm text-slate-500">{user.email}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">{user.role}</p>
            </div>
          ))}
        </div>
      </Card>
    </DashboardShell>
  );
}
