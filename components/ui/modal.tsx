import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Modal({
  open,
  title,
  children
}: {
  open: boolean;
  title: string;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className={cn("w-full max-w-xl rounded-[28px] bg-white p-6 shadow-panel")}>
        <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
