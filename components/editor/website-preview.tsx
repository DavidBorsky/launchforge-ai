import { BrandingKit, GeneratedStartupContent, SEOConfig } from "@/types";

export function WebsitePreview({
  branding,
  content,
  seo
}: {
  branding: BrandingKit;
  content: GeneratedStartupContent;
  seo: SEOConfig;
}) {
  return (
    <div
      className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-panel"
      style={{
        backgroundColor: branding.palette.background,
        color: branding.palette.text
      }}
    >
      <div
        className="border-b px-8 py-12"
        style={{
          background: `linear-gradient(135deg, ${branding.palette.primary}, ${branding.palette.secondary})`,
          color: "white"
        }}
      >
        <p className="text-xs uppercase tracking-[0.35em] text-white/70">{branding.logoPlaceholder}</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight">{content.hero.headline}</h1>
        <p className="mt-4 max-w-2xl text-base text-white/80">{content.hero.subheadline}</p>
        <div className="mt-6 flex gap-3">
          <button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">
            {content.hero.ctaPrimary}
          </button>
          <button className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white">
            {content.hero.ctaSecondary}
          </button>
        </div>
      </div>
      <div className="space-y-8 px-8 py-8">
        <section>
          <p className="text-sm text-slate-500">{seo.title}</p>
          <h2 className="mt-2 text-2xl font-semibold">{content.valueProposition}</h2>
          <p className="mt-3 max-w-3xl text-sm opacity-80">{content.positioning}</p>
        </section>
        <section className="grid gap-4 md:grid-cols-3">
          {content.features.map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-slate-200/80 bg-white/70 p-5">
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm opacity-80">{feature.description}</p>
            </div>
          ))}
        </section>
        <section className="grid gap-4 md:grid-cols-2">
          {content.pricing.map((tier) => (
            <div key={tier.name} className="rounded-3xl border border-slate-200 bg-white/80 p-5">
              <p className="text-sm font-medium opacity-70">{tier.name}</p>
              <p className="mt-3 text-3xl font-semibold">{tier.price}</p>
              <p className="mt-2 text-sm opacity-80">{tier.description}</p>
              <ul className="mt-4 space-y-2 text-sm opacity-80">
                {tier.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
        <section className="grid gap-4 md:grid-cols-2">
          {content.faq.map((faq) => (
            <div key={faq.question} className="rounded-3xl border border-slate-200 bg-white/80 p-5">
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="mt-2 text-sm opacity-80">{faq.answer}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
