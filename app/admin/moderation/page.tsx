import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export default async function AdminModerationPage() {
  await requireAdmin();
  const items = await prisma.moderationItem.findMany({
    include: { project: true, user: true },
    orderBy: { updatedAt: "desc" }
  });

  return (
    <DashboardShell admin>
      <Card>
        <h1 className="text-3xl font-semibold text-slate-950">Moderation queue</h1>
        <div className="mt-6 space-y-4">
          {items.length ? (
            items.map((item) => (
              <div key={item.id} className="rounded-3xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-950">{item.project.name}</p>
                <p className="mt-2 text-sm text-slate-600">{item.reason}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">{item.status}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No moderation items yet.</p>
          )}
        </div>
      </Card>
    </DashboardShell>
  );
}
