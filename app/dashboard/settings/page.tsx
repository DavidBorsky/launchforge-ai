import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { requireUser } from "@/lib/session";

export default async function SettingsPage() {
  const session = await requireUser();

  return (
    <DashboardShell admin={session.user.role === "ADMIN"}>
      <Card>
        <h1 className="text-3xl font-semibold text-slate-950">Settings</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Name</p>
            <p className="mt-2 text-lg font-semibold text-slate-950">{session.user.name ?? "Builder"}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Email</p>
            <p className="mt-2 text-lg font-semibold text-slate-950">{session.user.email}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Role</p>
            <p className="mt-2 text-lg font-semibold text-slate-950">{session.user.role}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Environment</p>
            <p className="mt-2 text-lg font-semibold text-slate-950">Mock-safe local mode</p>
          </div>
        </div>
      </Card>
    </DashboardShell>
  );
}
