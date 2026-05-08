import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/session";
import { getAdminSnapshot } from "@/lib/platform";

export default async function AdminRevenuePage() {
  await requireAdmin();
  const stats = await getAdminSnapshot();

  return (
    <DashboardShell admin>
      <Card>
        <h1 className="text-3xl font-semibold text-slate-950">Revenue snapshot</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Monthly recurring revenue</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">${stats.mrr}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Active subscriptions</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">{stats.subscriptions}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Generation usage</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">{stats.generations}</p>
          </div>
        </div>
      </Card>
    </DashboardShell>
  );
}
