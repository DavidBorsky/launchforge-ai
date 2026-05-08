import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function PricingCard({
  name,
  price,
  blurb,
  features,
  cta,
  highlighted = false
}: {
  name: string;
  price: string;
  blurb: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}) {
  return (
    <Card className={highlighted ? "border-emerald-300 bg-slate-950 text-white" : ""}>
      <p className={highlighted ? "text-emerald-300" : "text-slate-500"}>{name}</p>
      <div className="mt-4 flex items-end gap-2">
        <span className="text-4xl font-semibold">{price}</span>
        <span className={highlighted ? "text-slate-300" : "text-slate-500"}>/month</span>
      </div>
      <p className={highlighted ? "mt-3 text-slate-200" : "mt-3 text-slate-600"}>{blurb}</p>
      <ul className={highlighted ? "mt-6 space-y-3 text-sm text-slate-200" : "mt-6 space-y-3 text-sm text-slate-600"}>
        {features.map((feature) => (
          <li key={feature}>• {feature}</li>
        ))}
      </ul>
      <Button href="/signup" className="mt-8 w-full" variant={highlighted ? "secondary" : "primary"}>
        {cta}
      </Button>
    </Card>
  );
}
