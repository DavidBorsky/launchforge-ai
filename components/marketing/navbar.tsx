"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/75 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
          LaunchForge AI
        </a>
        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <a href="/pricing">Pricing</a>
          <a href="/dashboard/templates">Templates</a>
          <a href="/dashboard/ideas">Idea Lab</a>
        </nav>
        <div className="flex items-center gap-3">
          {session ? (
            <>
              <Button href="/dashboard" variant="secondary">
                Dashboard
              </Button>
              <Button variant="ghost" onClick={() => signOut({ callbackUrl: "/" })}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button href="/login" variant="ghost">
                Log in
              </Button>
              <Button href="/signup">Start free</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
