import type { Site, Check, Incident, IncidentUpdate, AlertRule } from "@prisma/client";

export type SiteWithRelations = Site & {
  checks?: Check[];
  incidents?: (Incident & { updates?: IncidentUpdate[] })[];
  alertRules?: AlertRule[];
};

export type DashboardSite = Pick<
  Site,
  "id" | "name" | "url" | "status" | "responseTimeMs" | "uptimePercent" | "lastCheckedAt"
>;
