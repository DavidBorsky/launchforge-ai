import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { EmptyState } from "@/components/ui/empty-state";
import { ProjectCard } from "@/components/dashboard/project-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { getDashboardSummary } from "@/lib/platform";
import { requireUser } from "@/lib/session";

export default async function DashboardPage() {
  const session = await requireUser();
  const data = await getDashboardSummary(session.user.id);

  return (
    <DashboardShell admin={session.user.role === "ADMIN"}>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Projects created" value={data.stats.projectCount} />
        <StatCard label="AI generations used" value={data.stats.generations} />
        <StatCard label="Published or exported" value={data.stats.exportedProjects} />
        <StatCard label="Current plan" value={data.stats.currentPlan} />
      </section>
      <section className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-950">Your startup projects</h1>
          <p className="mt-2 text-sm text-slate-600">Create, edit, preview, and export business launch kits from one dashboard.</p>
        </div>
        <Button href="/dashboard/new">Create new startup</Button>
      </section>
      {data.projects.length ? (
        <section className="grid gap-5 lg:grid-cols-2">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>
      ) : (
        <EmptyState
          title="No projects yet"
          description="Create your first startup launch kit and LaunchForge AI will generate the copy, branding, pricing, SEO, and export-ready assets."
          action={<Button href="/dashboard/new">Create your first startup</Button>}
        />
      )}
    </DashboardShell>
  );
}
