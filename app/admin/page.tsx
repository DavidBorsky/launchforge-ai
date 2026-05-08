import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { requireAdmin } from "@/lib/session";
import { getAdminSnapshot } from "@/lib/platform";

export default async function AdminOverviewPage() {
  await requireAdmin();
  const stats = await getAdminSnapshot();

  return (
    <DashboardShell admin>
      <div>
        <h1 className="text-3xl font-semibold text-slate-950">Admin overview</h1>
        <p className="mt-2 text-sm text-slate-600">Monitor users, projects, subscriptions, moderation, and platform growth.</p>
      </div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total users" value={stats.users} />
        <StatCard label="Total projects" value={stats.projects} />
        <StatCard label="MRR" value={`$${stats.mrr}`} />
        <StatCard label="Active subscriptions" value={stats.subscriptions} />
        <StatCard label="Flagged projects" value={stats.moderation} />
        <StatCard label="Generations this month" value={stats.generations} />
      </section>
    </DashboardShell>
  );
}
