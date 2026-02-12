import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar placeholder — wire up shadcn/ui Sidebar here */}
      <aside className="hidden w-64 border-r border-white/15 bg-white/[0.04] backdrop-blur-xl lg:block">
        <div className="flex h-14 items-center gap-2 border-b border-white/15 px-6">
          <span className="text-xl">⚡</span>
          <span className="bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text font-bold text-transparent">
            StatusPulse
          </span>
        </div>
        <nav className="space-y-1 p-4">
          <a
            href="/dashboard"
            className="block rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/[0.08]"
          >
            📡 Dashboard
          </a>
          <a
            href="/dashboard/incidents"
            className="block rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/[0.08]"
          >
            🚨 Incidents
          </a>
          <a
            href="/dashboard/status-pages"
            className="block rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/[0.08]"
          >
            🌐 Status Pages
          </a>
          <a
            href="/dashboard/alerts"
            className="block rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/[0.08]"
          >
            🔔 Alerts
          </a>
          <a
            href="/dashboard/settings"
            className="block rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/[0.08]"
          >
            ⚙️ Settings
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
