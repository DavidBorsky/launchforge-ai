import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export default async function AdminSubscriptionsPage() {
  await requireAdmin();
  const subscriptions = await prisma.subscription.findMany({
    include: { user: true },
    orderBy: { updatedAt: "desc" }
  });

  return (
    <DashboardShell admin>
      <Card>
        <h1 className="text-3xl font-semibold text-slate-950">Subscriptions</h1>
        <div className="mt-6 space-y-4">
          {subscriptions.map((subscription) => (
            <div key={subscription.id} className="rounded-3xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-950">{subscription.user.email}</p>
              <p className="mt-1 text-sm text-slate-500">
                {subscription.plan} • {subscription.status}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </DashboardShell>
  );
}
