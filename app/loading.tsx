import { LoadingState } from "@/components/ui/loading-state";

export default function Loading() {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
      <LoadingState label="Loading LaunchForge AI..." />
    </div>
  );
}
