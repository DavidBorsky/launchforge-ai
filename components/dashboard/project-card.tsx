import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DeleteProjectButton } from "@/components/dashboard/delete-project-button";
import { formatDate } from "@/lib/utils";

export function ProjectCard({
  project
}: {
  project: {
    id: string;
    name: string;
    niche: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  };
}) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-950">{project.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{project.niche}</p>
        </div>
        <Badge>{project.status}</Badge>
      </div>
      <div className="mt-6 grid gap-2 text-sm text-slate-500 sm:grid-cols-2">
        <p>Created {formatDate(project.createdAt)}</p>
        <p>Updated {formatDate(project.updatedAt)}</p>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href={`/dashboard/projects/${project.id}`} variant="secondary">
          Edit
        </Button>
        <Button href={`/dashboard/projects/${project.id}/preview`} variant="ghost">
          Preview
        </Button>
        <Button href={`/api/export/${project.id}`} variant="ghost">
          Export
        </Button>
        <DeleteProjectButton projectId={project.id} />
      </div>
    </Card>
  );
}
