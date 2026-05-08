import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/session";
import { getProjectForUser } from "@/lib/platform";

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireUser();
  const { id } = await params;
  const project = await getProjectForUser(id, session.user.id);

  if (!project) {
    notFound();
  }

  return (
    <DashboardShell admin={session.user.role === "ADMIN"}>
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{project.status}</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-950">{project.name}</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              {project.niche} for {project.targetAudience}. Manage generated content, preview the site, export a ZIP, or inspect mock analytics from here.
            </p>
          </div>
          <div className="flex gap-3">
            <Button href={`/dashboard/projects/${project.id}/editor`}>Open editor</Button>
            <Button href={`/dashboard/projects/${project.id}/preview`} variant="secondary">
              Preview site
            </Button>
          </div>
        </div>
      </Card>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="text-2xl font-semibold text-slate-950">Launch kit snapshot</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">Hero headline</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">
                {(project.generatedContent as any).hero.headline}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">Value proposition</p>
              <p className="mt-2 text-sm text-slate-700">{(project.generatedContent as any).valueProposition}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">SEO title</p>
              <p className="mt-2 text-sm text-slate-700">{(project.seo as any).title}</p>
            </div>
          </div>
        </Card>
        <Card>
          <h2 className="text-2xl font-semibold text-slate-950">Quick actions</h2>
          <div className="mt-6 flex flex-col gap-3">
            <Button href={`/dashboard/projects/${project.id}/editor`}>Edit content</Button>
            <Button href={`/dashboard/projects/${project.id}/analytics`} variant="secondary">
              View analytics
            </Button>
            <Button href={`/api/export/${project.id}`} variant="ghost">
              Export ZIP
            </Button>
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}
