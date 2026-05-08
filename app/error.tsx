"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Something broke</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">LaunchForge AI hit an unexpected error</h1>
        <p className="mt-4 text-sm text-slate-600">{error.message || "Please try again."}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={reset}>Try again</Button>
          <Button href="/" variant="secondary">
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
}
