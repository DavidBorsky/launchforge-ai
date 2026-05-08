"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ProjectAdminActions({
  projectId,
  currentStatus
}: {
  projectId: string;
  currentStatus: string;
}) {
  const router = useRouter();

  async function updateStatus(status: string) {
    await fetch("/api/admin/projects", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: projectId, status })
    });
    router.refresh();
  }

  async function deleteProject() {
    const confirmed = window.confirm("Delete this project from the platform?");
    if (!confirmed) return;

    await fetch("/api/admin/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: projectId })
    });
    router.refresh();
  }

  return (
    <div className="mt-4 flex flex-wrap gap-3">
      <Button variant="secondary" onClick={() => updateStatus(currentStatus === "FLAGGED" ? "GENERATED" : "FLAGGED")}>
        {currentStatus === "FLAGGED" ? "Restore" : "Flag"}
      </Button>
      <Button variant="ghost" onClick={() => updateStatus("ARCHIVED")}>
        Archive
      </Button>
      <Button variant="danger" onClick={deleteProject}>
        Delete
      </Button>
    </div>
  );
}
