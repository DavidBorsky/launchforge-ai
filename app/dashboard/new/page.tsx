import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ProjectQuestionnaire } from "@/components/dashboard/project-questionnaire";
import { requireUser } from "@/lib/session";

export default async function NewProjectPage() {
  const session = await requireUser();

  return (
    <DashboardShell admin={session.user.role === "ADMIN"}>
      <ProjectQuestionnaire />
    </DashboardShell>
  );
}
