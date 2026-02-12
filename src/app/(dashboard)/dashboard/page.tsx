import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  // TODO: Get workspace from user membership
  // const sites = await db.site.findMany({ where: { workspaceId }, orderBy: { name: 'asc' } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">📡 Uptime Status</h1>
        <button className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-black transition-all hover:bg-amber-400">
          + Add Site
        </button>
      </div>

      {/* Status Banner */}
      <div className="mb-6 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-4 text-center font-semibold text-emerald-500">
        ✅ All Systems Operational
      </div>

      {/* Filter Pills */}
      <div className="mb-6 flex gap-2">
        {["All", "Up", "Degraded", "Down"].map((filter) => (
          <button
            key={filter}
            className="rounded-lg border border-white/15 bg-white/[0.08] px-4 py-1.5 text-xs font-medium text-slate-300 transition-all hover:bg-white/[0.12] first:bg-amber-500/20 first:text-amber-500 first:border-amber-500/30"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Sites Grid — placeholder */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-5 backdrop-blur-xl">
          <p className="text-sm text-muted-foreground">
            No sites added yet. Click &quot;+ Add Site&quot; to start monitoring.
          </p>
        </div>
      </div>
    </div>
  );
}
