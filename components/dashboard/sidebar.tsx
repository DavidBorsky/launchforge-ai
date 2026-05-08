import Link from "next/link";
import { LayoutDashboard, Lightbulb, FolderKanban, Palette, CreditCard, Rocket, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const primaryNav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/new", label: "New startup", icon: Rocket },
  { href: "/dashboard/ideas", label: "Idea lab", icon: Lightbulb },
  { href: "/dashboard/templates", label: "Templates", icon: Palette },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/deploy", label: "Deploy", icon: FolderKanban }
];

export function Sidebar({ admin = false }: { admin?: boolean }) {
  return (
    <aside className="flex h-full flex-col rounded-[30px] border border-white/40 bg-slate-950 px-4 py-6 text-white shadow-panel">
      <div className="px-3">
        <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">LaunchForge</p>
        <h2 className="mt-3 text-xl font-semibold">Control center</h2>
      </div>
      <nav className="mt-8 flex flex-col gap-2">
        {primaryNav.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
        {admin ? (
          <Link
            href="/admin"
            className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-3 text-sm text-emerald-100 transition hover:bg-emerald-400/20"
          >
            <Shield className="h-4 w-4" />
            Admin console
          </Link>
        ) : null}
      </nav>
    </aside>
  );
}
