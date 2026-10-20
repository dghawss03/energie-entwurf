import type { BackendLead } from "./api-types";

/** All displayed numbers are derived from the current local leads. */
export function getDemoMetrics(leads: BackendLead[], at = new Date()) {
  const completed = leads.filter((lead) => lead.status === "completed").length;
  const offerStages = new Set([
    "offer_created",
    "offer_sent",
    "interested",
    "contract_prepared",
    "contract_sent",
    "completed",
  ]);
  const contractStages = new Set(["contract_prepared", "contract_sent", "completed"]);
  const monthly = Array<number>(12).fill(0);
  const sources: Record<string, number> = {};
  for (const lead of leads) {
    const created = new Date(lead.created_at);
    const monthsAgo =
      (at.getFullYear() - created.getFullYear()) * 12 + at.getMonth() - created.getMonth();
    if (monthsAgo >= 0 && monthsAgo < 12) monthly[11 - monthsAgo] += 1;
    const source = lead.source ?? "Lokale Demo";
    sources[source] = (sources[source] ?? 0) + 1;
  }
  return {
    total: leads.length,
    completed,
    monthly,
    sources,
    conversionRate: leads.length ? (completed / leads.length) * 100 : 0,
    funnel: [
      leads.length,
      leads.filter((lead) => offerStages.has(lead.status)).length,
      leads.filter((lead) => contractStages.has(lead.status)).length,
      completed,
    ],
  };
}
