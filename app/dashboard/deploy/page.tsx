import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/session";

const steps = [
  "Buy a domain from Namecheap, GoDaddy, Cloudflare, or Vercel.",
  "Create or connect a Vercel project for your exported website package or the full app.",
  "Add your custom domain to the Vercel project settings.",
  "Update nameservers or add the required A and CNAME DNS records.",
  "Wait for DNS propagation and let Vercel provision HTTPS automatically."
];

export default async function DeployPage() {
  const session = await requireUser();

  return (
    <DashboardShell admin={session.user.role === "ADMIN"}>
      <Card>
        <h1 className="text-3xl font-semibold text-slate-950">Deploy to Vercel</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          This MVP includes deployment architecture and placeholder routes for future Vercel token-based automation. For now, the flow explains how to ship the app or exported site safely.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/api/vercel/connect" variant="secondary">
            Connect Vercel
          </Button>
          <Button href="/api/vercel/deploy">Deploy project</Button>
        </div>
      </Card>
      <Card>
        <h2 className="text-2xl font-semibold text-slate-950">Domain connection checklist</h2>
        <div className="mt-6 space-y-4">
          {steps.map((step, index) => (
            <div key={step} className="flex gap-4 rounded-3xl border border-slate-200 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                {index + 1}
              </div>
              <p className="pt-2 text-sm text-slate-600">{step}</p>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h2 className="text-2xl font-semibold text-slate-950">Required environment variables</h2>
        <ul className="mt-5 space-y-3 text-sm text-slate-600">
          <li>• `VERCEL_ACCESS_TOKEN`</li>
          <li>• `VERCEL_TEAM_ID`</li>
          <li>• `NEXT_PUBLIC_APP_URL`</li>
          <li>• `OPENAI_API_KEY` for live AI generation</li>
          <li>• `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` for billing</li>
        </ul>
      </Card>
    </DashboardShell>
  );
}
