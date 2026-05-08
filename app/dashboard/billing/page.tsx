import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PricingCard } from "@/components/dashboard/pricing-card";
import { Card } from "@/components/ui/card";
import { pricingPlans } from "@/data/plans";
import { getUserPlan } from "@/lib/platform";
import { requireUser } from "@/lib/session";

export default async function BillingPage() {
  const session = await requireUser();
  const { plan } = await getUserPlan(session.user.id);

  return (
    <DashboardShell admin={session.user.role === "ADMIN"}>
      <Card>
        <h1 className="text-3xl font-semibold text-slate-950">Billing and plans</h1>
        <p className="mt-2 text-sm text-slate-600">
          Current plan: <span className="font-semibold text-slate-900">{plan}</span>. Stripe routes are wired with placeholders so the app stays runnable without live keys.
        </p>
      </Card>
      <div className="grid gap-6 lg:grid-cols-4">
        {pricingPlans.map((pricing, index) => (
          <PricingCard
            key={pricing.name}
            name={pricing.name}
            price={pricing.price}
            blurb={pricing.blurb}
            features={[...pricing.features]}
            cta="Subscribe"
            highlighted={index === 2}
          />
        ))}
      </div>
    </DashboardShell>
  );
}
