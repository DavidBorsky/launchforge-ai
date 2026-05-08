import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/stat-card";
import { requireUser } from "@/lib/session";
import { getProjectForUser } from "@/lib/platform";

export default async function ProjectAnalyticsPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireUser();
  const { id } = await params;
  const project = await getProjectForUser(id, session.user.id);

  if (!project) {
    notFound();
  }

  const analytics = project.analytics as any;

  return (
    <DashboardShell admin={session.user.role === "ADMIN"}>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Page views" value={analytics.pageViews} />
        <StatCard label="Visitors" value={analytics.visitors} />
        <StatCard label="Conversion rate" value={`${analytics.conversionRate}%`} />
        <StatCard label="Revenue estimate" value={`$${analytics.revenueEstimate}`} />
      </section>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-2xl font-semibold text-slate-950">Traffic sources</h2>
          <div className="mt-6 space-y-4">
            {analytics.trafficSources.map((source: any) => (
              <div key={source.label}>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>{source.label}</span>
                  <span>{source.value}%</span>
                </div>
                <div className="mt-2 h-3 rounded-full bg-slate-100">
                  <div className="h-3 rounded-full bg-slate-950" style={{ width: `${source.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-2xl font-semibold text-slate-950">Device breakdown</h2>
          <div className="mt-6 space-y-4">
            {analytics.devices.map((device: any) => (
              <div key={device.label}>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>{device.label}</span>
                  <span>{device.value}%</span>
                </div>
                <div className="mt-2 h-3 rounded-full bg-emerald-100">
                  <div className="h-3 rounded-full bg-emerald-500" style={{ width: `${device.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}
