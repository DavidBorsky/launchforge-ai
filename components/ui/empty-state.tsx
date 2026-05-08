import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

export function EmptyState({
  title,
  description,
  action
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <Card className="flex min-h-[240px] flex-col items-center justify-center text-center">
      <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 max-w-md text-sm text-slate-600">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </Card>
  );
}
