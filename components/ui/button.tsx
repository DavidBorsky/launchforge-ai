import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "ghost" | "danger";
  onClick?: () => void;
}

const styles = {
  primary:
    "bg-slate-950 text-white shadow-glow hover:bg-slate-800",
  secondary:
    "bg-white/80 text-slate-900 border border-slate-200 hover:bg-white",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100",
  danger:
    "bg-rose-600 text-white hover:bg-rose-500"
};

export function Button({
  children,
  className,
  href,
  type = "button",
  variant = "primary",
  onClick
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200",
    styles[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
