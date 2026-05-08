import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { EditorPanel } from "@/components/editor/editor-panel";
import { requireUser } from "@/lib/session";
import { getProjectForUser } from "@/lib/platform";

export default async function ProjectEditorPage({
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
      <EditorPanel
        projectId={project.id}
        initialContent={project.generatedContent as any}
        initialBranding={project.branding as any}
        initialSeo={project.seo as any}
      />
    </DashboardShell>
  );
}
