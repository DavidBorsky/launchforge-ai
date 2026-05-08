import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { BillingPlanCard } from "@/components/dashboard/billing-plan-card";
import { Card } from "@/components/ui/card";
import { pricingPlans } from "@/data/plans";
import { getUserPlan } from "@/lib/platform";
import { requireUser } from "@/lib/session";
import { stripeEnabled } from "@/lib/stripe";

export default async function BillingPage({
  searchParams
}: {
  searchParams: Promise<{ status?: string; plan?: string }>;
}) {
  const session = await requireUser();
  const { plan } = await getUserPlan(session.user.id);
  const stripeActive = stripeEnabled();
  const params = await searchParams;

  return (
    <DashboardShell admin={session.user.role === "ADMIN"}>
      <Card>
        <h1 className="text-3xl font-semibold text-slate-950">Billing and plans</h1>
        <p className="mt-2 text-sm text-slate-600">
          Current plan: <span className="font-semibold text-slate-900">{plan}</span>. Billing now supports real Stripe test-mode Checkout Sessions when your Stripe env vars and Price IDs are configured.
        </p>
        {params.status === "success" ? (
          <p className="mt-4 text-sm text-emerald-700">
            Checkout completed. If the webhook is configured, your subscription should sync automatically within a few seconds.
          </p>
        ) : null}
        {params.status === "cancel" ? (
          <p className="mt-4 text-sm text-amber-700">Checkout was canceled before payment completed.</p>
        ) : null}
        {!stripeActive ? (
          <p className="mt-4 text-sm text-slate-500">
            Stripe is not configured yet on this environment. Add `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and Stripe Price IDs to enable live test-mode billing.
          </p>
        ) : null}
      </Card>
      <div className="grid gap-6 lg:grid-cols-4">
        {pricingPlans.map((pricing, index) => (
          <BillingPlanCard
            key={pricing.name}
            name={pricing.name}
            plan={pricing.plan}
            price={pricing.price}
            blurb={pricing.blurb}
            features={[...pricing.features]}
            highlighted={index === 2}
            currentPlan={plan}
            enabled={stripeActive}
          />
        ))}
      </div>
    </DashboardShell>
  );
}
