import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { IdeaGeneratorForm } from "@/components/dashboard/idea-generator-form";
import { requireUser } from "@/lib/session";

export default async function IdeasPage() {
  const session = await requireUser();

  return (
    <DashboardShell admin={session.user.role === "ADMIN"}>
      <IdeaGeneratorForm />
    </DashboardShell>
  );
}
