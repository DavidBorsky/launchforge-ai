"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function IdeaGeneratorForm() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const payload = {
      industry: String(formData.get("industry") || ""),
      skills: String(formData.get("skills") || ""),
      budget: String(formData.get("budget") || ""),
      audience: String(formData.get("audience") || ""),
      monetizationPreference: String(formData.get("monetizationPreference") || ""),
      automationLevel: String(formData.get("automationLevel") || "")
    };

    const response = await fetch("/api/generate/startup?mode=ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    setResult(data.idea);
    setLoading(false);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[400px_1fr]">
      <Card>
        <h1 className="text-3xl font-semibold text-slate-950">AI business idea generator</h1>
        <p className="mt-2 text-sm text-slate-600">
          Feed in your skills, budget, and preferred level of automation to generate launchable ideas.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <Input name="industry" placeholder="Industry" required />
          <Input name="skills" placeholder="Skills or unfair advantages" required />
          <Input name="budget" placeholder="Budget" required />
          <Input name="audience" placeholder="Audience" required />
          <Input name="monetizationPreference" placeholder="Monetization preference" required />
          <Select name="automationLevel" defaultValue="Medium">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </Select>
          <Button type="submit" className="w-full">
            {loading ? "Generating..." : "Generate ideas"}
          </Button>
        </form>
      </Card>
      <Card>
        {result ? (
          <div className="space-y-5">
            <div>
              <p className="text-sm text-slate-500">Business name ideas</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">{result.businessNames.join(", ")}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">Problem</p>
                <p className="mt-2 text-sm text-slate-700">{result.problem}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Target customer</p>
                <p className="mt-2 text-sm text-slate-700">{result.targetCustomer}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Offer</p>
                <p className="mt-2 text-sm text-slate-700">{result.offer}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Pricing idea</p>
                <p className="mt-2 text-sm text-slate-700">{result.pricingIdea}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">MVP</p>
                <p className="mt-2 text-sm text-slate-700">{result.mvpDescription}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Marketing angle</p>
                <p className="mt-2 text-sm text-slate-700">{result.marketingAngle}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-[420px] items-center justify-center text-center">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">Idea drafts appear here</h2>
              <p className="mt-3 text-sm text-slate-600">
                Generate structured offers, pricing ideas, and MVP concepts ready for validation.
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
