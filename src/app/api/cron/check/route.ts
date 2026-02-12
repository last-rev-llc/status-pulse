import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { SiteStatus } from "@prisma/client";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: Request) {
  // Verify cron secret
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sites = await db.site.findMany();
  const results: { id: string; status: SiteStatus; responseTimeMs: number | null }[] = [];

  for (const site of sites) {
    const start = Date.now();
    let status: SiteStatus = SiteStatus.UP;
    let responseTimeMs: number | null = null;
    let statusCode: number | null = null;
    let errorMessage: string | null = null;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const resp = await fetch(site.url, {
        method: "HEAD",
        signal: controller.signal,
        redirect: "follow",
      });

      clearTimeout(timeout);
      responseTimeMs = Date.now() - start;
      statusCode = resp.status;

      if (resp.status >= 500) {
        status = SiteStatus.DOWN;
      } else if (resp.status >= 400 || responseTimeMs > 5000) {
        status = SiteStatus.DEGRADED;
      }
    } catch (err) {
      status = SiteStatus.DOWN;
      responseTimeMs = Date.now() - start;
      errorMessage = err instanceof Error ? err.message : "Unknown error";
    }

    // Record check
    await db.check.create({
      data: { siteId: site.id, status, responseTimeMs, statusCode, errorMessage },
    });

    // Update site status
    const uptimeChecks = await db.check.count({
      where: { siteId: site.id, checkedAt: { gte: new Date(Date.now() - 30 * 86400000) } },
    });
    const upChecks = await db.check.count({
      where: {
        siteId: site.id,
        status: SiteStatus.UP,
        checkedAt: { gte: new Date(Date.now() - 30 * 86400000) },
      },
    });

    await db.site.update({
      where: { id: site.id },
      data: {
        status,
        responseTimeMs,
        uptimePercent: uptimeChecks > 0 ? Math.round((upChecks / uptimeChecks) * 10000) / 100 : 100,
        lastCheckedAt: new Date(),
      },
    });

    // Auto-create/resolve incidents on status change
    if (status === SiteStatus.DOWN && site.status !== SiteStatus.DOWN) {
      await db.incident.create({
        data: {
          siteId: site.id,
          title: `${site.name} is down`,
          description: errorMessage || `HTTP ${statusCode}`,
        },
      });
    } else if (status === SiteStatus.UP && site.status === SiteStatus.DOWN) {
      const openIncident = await db.incident.findFirst({
        where: { siteId: site.id, resolvedAt: null },
        orderBy: { startedAt: "desc" },
      });
      if (openIncident) {
        await db.incident.update({
          where: { id: openIncident.id },
          data: { status: "RESOLVED", resolvedAt: new Date() },
        });
      }
    }

    results.push({ id: site.id, status, responseTimeMs });
  }

  return NextResponse.json({
    checked: results.length,
    results,
    timestamp: new Date().toISOString(),
  });
}
