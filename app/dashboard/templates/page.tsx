import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { TemplateCard } from "@/components/dashboard/template-card";
import { templateSeeds } from "@/data/templates";
import { requireUser } from "@/lib/session";

export default async function TemplatesPage() {
  const session = await requireUser();

  return (
    <DashboardShell admin={session.user.role === "ADMIN"}>
      <div>
        <h1 className="text-3xl font-semibold text-slate-950">Template marketplace</h1>
        <p className="mt-2 text-sm text-slate-600">
          Start with a template tuned for the business type you want to launch.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {templateSeeds.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </DashboardShell>
  );
}
