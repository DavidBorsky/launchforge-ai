import { Navbar } from "@/components/marketing/navbar";
import { PricingCard } from "@/components/dashboard/pricing-card";
import { pricingPlans } from "@/data/plans";

export default function PricingPage() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Pricing</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950">
            Monetize the platform with a clean Stripe-ready subscription architecture.
          </h1>
          <p className="mt-5 text-lg text-slate-600">
            Start free, then grow into launch workflows built for repeatable publishing, richer analytics, and deploy-ready exports.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              blurb={plan.blurb}
              features={[...plan.features]}
              cta="Start now"
              highlighted={index === 2}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
