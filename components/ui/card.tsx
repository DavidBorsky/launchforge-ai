import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/50 bg-white/80 p-6 shadow-panel backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/60",
        className
      )}
    >
      {children}
    </div>
  );
}
