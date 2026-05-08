import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { ProjectAdminActions } from "@/components/admin/project-admin-actions";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export default async function AdminProjectsPage() {
  await requireAdmin();
  const projects = await prisma.project.findMany({
    include: { user: true },
    orderBy: { updatedAt: "desc" }
  });

  return (
    <DashboardShell admin>
      <Card>
        <h1 className="text-3xl font-semibold text-slate-950">Projects</h1>
        <div className="mt-6 space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="rounded-3xl border border-slate-200 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-950">{project.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{project.user.email}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                  {project.status}
                </span>
              </div>
              <ProjectAdminActions projectId={project.id} currentStatus={project.status} />
            </div>
          ))}
        </div>
      </Card>
    </DashboardShell>
  );
}
