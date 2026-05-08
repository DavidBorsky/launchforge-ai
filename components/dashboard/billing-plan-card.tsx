"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BillingPlanCardProps {
  name: string;
  plan: string;
  price: string;
  blurb: string;
  features: string[];
  highlighted?: boolean;
  currentPlan: string;
  enabled: boolean;
}

export function BillingPlanCard({
  name,
  plan,
  price,
  blurb,
  features,
  highlighted = false,
  currentPlan,
  enabled
}: BillingPlanCardProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const isCurrent = currentPlan === plan;
  const isFree = plan === "FREE";

  async function handleCheckout() {
    if (isFree || isCurrent || !enabled) {
      return;
    }

    setLoading(true);
    setMessage("");

    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan })
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error ?? "Could not start checkout.");
      setLoading(false);
      return;
    }

    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
      return;
    }

    setMessage("No checkout URL was returned.");
    setLoading(false);
  }

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
      {isFree ? (
        <Button className="mt-8 w-full" variant={highlighted ? "secondary" : "primary"}>
          Included
        </Button>
      ) : (
        <Button
          className="mt-8 w-full"
          variant={highlighted ? "secondary" : "primary"}
          onClick={handleCheckout}
        >
          {loading ? "Redirecting..." : isCurrent ? "Current plan" : `Subscribe to ${name}`}
        </Button>
      )}
      {!enabled && !isFree ? (
        <p className={highlighted ? "mt-3 text-xs text-slate-300" : "mt-3 text-xs text-slate-500"}>
          Add Stripe keys and Stripe Price IDs in `.env` to enable checkout.
        </p>
      ) : null}
      {message ? (
        <p className={highlighted ? "mt-3 text-xs text-rose-200" : "mt-3 text-xs text-rose-600"}>{message}</p>
      ) : null}
    </Card>
  );
}
