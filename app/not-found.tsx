import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">Page not found</h1>
        <p className="mt-3 text-sm text-slate-600">The startup route you were looking for does not exist.</p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white">
          Return home
        </Link>
      </div>
    </div>
  );
}
