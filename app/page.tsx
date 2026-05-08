import { ArrowRight, Sparkles, Wand2, Rocket } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { PricingCard } from "@/components/dashboard/pricing-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { pricingPlans } from "@/data/plans";

const featureCards = [
  {
    icon: Sparkles,
    title: "Generate the full startup launch kit",
    copy: "Landing page copy, SEO, FAQ, pricing, blog starters, email funnel messaging, and social captions."
  },
  {
    icon: Wand2,
    title: "Shape a brand system that feels premium",
    copy: "Get palette, logo placeholder, tagline, voice guidance, and styling recommendations without needing a designer on day one."
  },
  {
    icon: Rocket,
    title: "Edit, export, and deploy with less friction",
    copy: "Use the built-in editor, export a static site ZIP, and follow Vercel-ready deployment architecture when you are ready to ship."
  }
];

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pb-16 pt-10">
        <section className="relative overflow-hidden rounded-[36px] border border-white/50 bg-hero-grid bg-hero-grid bg-white/70 px-8 py-16 shadow-panel backdrop-blur-sm">
          <Badge>AI startup launch platform</Badge>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                Launch an online business with strategy, brand, copy, and deploy-ready assets in one flow.
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-slate-600">
                LaunchForge AI turns a founder questionnaire into a polished startup launch kit with editing, analytics, export, and admin tooling built in.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/signup">Start building</Button>
                <Button href="/pricing" variant="secondary">
                  Explore pricing
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-500">
                <span>Guided questionnaire</span>
                <span>Brand + SEO generation</span>
                <span>ZIP export</span>
                <span>Vercel-ready deployment guidance</span>
              </div>
            </div>
            <Card className="bg-slate-950 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Live workflow preview</p>
              <div className="mt-6 space-y-5">
                {[
                  "Founder answers 12 launch questions",
                  "AI drafts offer, hero, pricing, FAQ, brand palette, and SEO",
                  "Editor refines the site and exports a deployable package"
                ].map((item, index) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mt-1 h-8 w-8 rounded-full bg-emerald-400/20 text-center text-sm font-semibold leading-8 text-emerald-200">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{item}</p>
                      <p className="mt-2 text-sm text-slate-300">
                        Structured outputs stay editable, exportable, and safe to run even without live provider keys.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section className="mt-14 grid gap-6 md:grid-cols-3">
          {featureCards.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-6 text-2xl font-semibold text-slate-950">{feature.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{feature.copy}</p>
              </Card>
            );
          })}
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Card>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">How it works</p>
            <div className="mt-6 space-y-5">
              {[
                "Answer a guided questionnaire about your niche, audience, pricing, tone, and goals.",
                "Generate a startup launch kit covering landing page messaging, branding, SEO, pricing, and growth assets.",
                "Refine the output inside the editor, preview the site, export the ZIP, and follow Vercel deployment instructions."
              ].map((step, index) => (
                <div key={step} className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="pt-2 text-sm leading-6 text-slate-600">{step}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="bg-slate-950 text-white">
            <p className="text-sm uppercase tracking-[0.28em] text-emerald-300">Platform outcomes</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { label: "Launch kit sections", value: "12+" },
                { label: "Template tracks", value: "8" },
                { label: "Export package", value: "ZIP" },
                { label: "Subscription tiers", value: "4" }
              ].map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-300">{stat.label}</p>
                  <p className="mt-3 text-3xl font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
            <Button href="/dashboard/new" variant="secondary" className="mt-8">
              Create a startup <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </section>

        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Pricing preview</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">Plans for solo founders to client-launch agencies</h2>
            </div>
            <Button href="/pricing" variant="ghost">
              View full pricing
            </Button>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-4">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={plan.name}
                name={plan.name}
                price={plan.price}
                blurb={plan.blurb}
                features={[...plan.features]}
                cta="Choose plan"
                highlighted={index === 2}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
