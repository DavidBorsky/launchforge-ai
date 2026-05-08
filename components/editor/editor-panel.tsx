"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WebsitePreview } from "@/components/editor/website-preview";
import { BrandingKit, GeneratedStartupContent, SEOConfig } from "@/types";

interface EditorPanelProps {
  projectId: string;
  initialContent: GeneratedStartupContent;
  initialBranding: BrandingKit;
  initialSeo: SEOConfig;
}

export function EditorPanel({
  projectId,
  initialContent,
  initialBranding,
  initialSeo
}: EditorPanelProps) {
  const [content, setContent] = useState(initialContent);
  const [branding, setBranding] = useState(initialBranding);
  const [seo, setSeo] = useState(initialSeo);
  const [message, setMessage] = useState("");
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");

  const previewClass = useMemo(
    () => (viewport === "desktop" ? "w-full" : "mx-auto max-w-sm"),
    [viewport]
  );

  async function saveChanges() {
    setMessage("Saving changes...");
    const response = await fetch(`/api/projects/${projectId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        generatedContent: content,
        branding,
        seo
      })
    });

    setMessage(response.ok ? "Saved." : "Could not save changes.");
  }

  async function regenerate() {
    setMessage("Regenerating copy...");
    const response = await fetch("/api/generate/copy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        businessName: content.hero.headline.split(" ")[0] || "LaunchForge",
        niche: "Modern SaaS",
        targetAudience: "Founders",
        problem: "slow startup launches",
        productType: "launch platform",
        pricingModel: "subscription",
        tone: "confident",
        brandingStyle: "premium",
        preferredColors: branding.palette.primary,
        websiteGoal: "conversion",
        emailCaptureGoal: "grow an early access list",
        socialPlatformFocus: "LinkedIn"
      })
    });

    if (!response.ok) {
      setMessage("Regeneration failed.");
      return;
    }

    const data = await response.json();
    setContent(data.generatedContent);
    setMessage("Fresh copy generated.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
      <Card className="space-y-4">
        <div>
          <p className="text-sm font-medium text-slate-500">Hero headline</p>
          <Textarea
            value={content.hero.headline}
            onChange={(event) =>
              setContent((current) => ({
                ...current,
                hero: { ...current.hero, headline: event.target.value }
              }))
            }
          />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">Subheadline</p>
          <Textarea
            value={content.hero.subheadline}
            onChange={(event) =>
              setContent((current) => ({
                ...current,
                hero: { ...current.hero, subheadline: event.target.value }
              }))
            }
          />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">Primary color</p>
          <Input
            value={branding.palette.primary}
            onChange={(event) =>
              setBranding((current) => ({
                ...current,
                palette: { ...current.palette, primary: event.target.value }
              }))
            }
          />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">Logo placeholder</p>
          <Input
            value={branding.logoPlaceholder}
            onChange={(event) =>
              setBranding((current) => ({
                ...current,
                logoPlaceholder: event.target.value
              }))
            }
          />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">SEO title</p>
          <Input
            value={seo.title}
            onChange={(event) => setSeo((current) => ({ ...current, title: event.target.value }))}
          />
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button onClick={saveChanges}>Save</Button>
          <Button variant="secondary" onClick={regenerate}>
            Regenerate
          </Button>
          <Button href={`/api/export/${projectId}`} variant="ghost">
            Export
          </Button>
        </div>
        <div className="flex gap-3 text-sm">
          <Button variant={viewport === "desktop" ? "primary" : "ghost"} onClick={() => setViewport("desktop")}>
            Desktop
          </Button>
          <Button variant={viewport === "mobile" ? "primary" : "ghost"} onClick={() => setViewport("mobile")}>
            Mobile
          </Button>
        </div>
        {message ? <p className="text-sm text-slate-500">{message}</p> : null}
      </Card>
      <div className={previewClass}>
        <WebsitePreview branding={branding} content={content} seo={seo} />
      </div>
    </div>
  );
}
