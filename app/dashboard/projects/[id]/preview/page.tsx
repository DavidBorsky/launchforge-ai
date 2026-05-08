import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { WebsitePreview } from "@/components/editor/website-preview";
import { Card } from "@/components/ui/card";
import { requireUser } from "@/lib/session";
import { getProjectForUser } from "@/lib/platform";

export default async function ProjectPreviewPage({
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
        <h1 className="text-3xl font-semibold text-slate-950">Preview mode</h1>
        <p className="mt-2 text-sm text-slate-600">Review the generated landing page before exporting or deploying it.</p>
      </Card>
      <WebsitePreview branding={project.branding as any} content={project.generatedContent as any} seo={project.seo as any} />
    </DashboardShell>
  );
}
