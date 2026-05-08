"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function DeleteProjectButton({ projectId }: { projectId: string }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm("Delete this project? This action cannot be undone.");
    if (!confirmed) return;

    const response = await fetch(`/api/projects/${projectId}`, {
      method: "DELETE"
    });

    if (response.ok) {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <Button variant="ghost" onClick={handleDelete}>
      Delete
    </Button>
  );
}
