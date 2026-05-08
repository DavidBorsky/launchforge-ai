"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const tones = ["Confident", "Friendly", "Minimal", "Bold", "Playful"];
const styles = ["Premium", "Minimal", "Editorial", "Modern", "Warm"];

export function ProjectQuestionnaire() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(event.currentTarget);

    const payload = {
      businessName: String(formData.get("businessName") || ""),
      niche: String(formData.get("niche") || ""),
      targetAudience: String(formData.get("targetAudience") || ""),
      problem: String(formData.get("problem") || ""),
      productType: String(formData.get("productType") || ""),
      pricingModel: String(formData.get("pricingModel") || ""),
      tone: String(formData.get("tone") || ""),
      brandingStyle: String(formData.get("brandingStyle") || ""),
      preferredColors: String(formData.get("preferredColors") || ""),
      websiteGoal: String(formData.get("websiteGoal") || ""),
      emailCaptureGoal: String(formData.get("emailCaptureGoal") || ""),
      socialPlatformFocus: String(formData.get("socialPlatformFocus") || ""),
      templateId: templateId || undefined
    };

    const response = await fetch("/api/generate/startup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error ?? "Could not generate project.");
      setLoading(false);
      return;
    }

    const data = await response.json();
    router.push(`/dashboard/projects/${data.project.id}`);
    router.refresh();
  }

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-950">Create a new startup</h1>
          <p className="mt-2 text-sm text-slate-600">
            Answer a few questions and LaunchForge AI will generate a complete launch kit.
          </p>
        </div>
        {templateId ? (
          <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Template applied
          </span>
        ) : null}
      </div>
      <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <Input name="businessName" placeholder="Business name" required />
        <Input name="niche" placeholder="Niche" required />
        <Input name="targetAudience" placeholder="Target audience" required />
        <Input name="productType" placeholder="Product or service type" required />
        <Input name="pricingModel" placeholder="Pricing model" required />
        <Input name="preferredColors" placeholder="Preferred colors" required />
        <Select name="tone" required defaultValue="Confident">
          {tones.map((tone) => (
            <option key={tone}>{tone}</option>
          ))}
        </Select>
        <Select name="brandingStyle" required defaultValue="Premium">
          {styles.map((style) => (
            <option key={style}>{style}</option>
          ))}
        </Select>
        <Input name="websiteGoal" placeholder="Website goal" required />
        <Input name="emailCaptureGoal" placeholder="Email capture goal" required />
        <Input name="socialPlatformFocus" placeholder="Social platform focus" required />
        <div className="md:col-span-2">
          <Textarea name="problem" placeholder="What problem does the business solve?" required />
        </div>
        {error ? <p className="md:col-span-2 text-sm text-rose-600">{error}</p> : null}
        <div className="md:col-span-2 flex gap-3">
          <Button type="submit">{loading ? "Generating..." : "Generate launch kit"}</Button>
          <Button href="/dashboard/templates" variant="secondary">
            Browse templates
          </Button>
        </div>
      </form>
    </Card>
  );
}
