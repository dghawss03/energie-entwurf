import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Users, FileSignature, Euro } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AdminShell } from "@/components/mitarbeiter/AdminShell";
import { QueryErrorState } from "@/components/mitarbeiter/QueryErrorState";
import { getAllLeads, getTeam } from "@/lib/api-client";
import { getDemoMetrics } from "@/lib/demo-metrics";
import { mapLeadStatus } from "@/lib/api-types";
import type { BackendLead } from "@/lib/api-types";

export const Route = createFileRoute("/mitarbeiter/statistiken")({
  head: () => ({
    meta: [{ title: "Statistiken – Mitarbeiter" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: StatistikenPage,
});

function adaptLead(l: BackendLead) {
  return {
    id: l.id,
    status: mapLeadStatus(l.status),
    backendStatus: l.status,
    createdAt: l.created_at,
    assignedTo: l.assigned_to,
  };
}

function StatistikenPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["leads", "all"],
    queryFn: () => getAllLeads(),
  });
  const {
    data: team = [],
    isLoading: isTeamLoading,
    isError: isTeamError,
    refetch: refetchTeam,
  } = useQuery({
    queryKey: ["team"],
    queryFn: getTeam,
  });

  const leads = useMemo(() => (data?.data ?? []).map(adaptLead), [data]);

  // KPIs aus echten Leads
  const total = data?.count ?? leads.length;
  const completed = leads.filter((l) => l.backendStatus === "completed").length;
  const offerSent = leads.filter((l) => l.backendStatus === "offer_sent").length;
  const conversionRate = total > 0 ? ((completed / total) * 100).toFixed(1) + " %" : "0,0 %";

  const kpi = [
    {
      label: "Leads gesamt",
      value: isLoading ? "…" : String(total),
      icon: Users,
    },
    {
      label: "Abschlüsse",
      value: isLoading ? "…" : String(completed),
      icon: FileSignature,
    },
    {
      label: "Umsatz",
      value: "—",
      icon: Euro,
    },
    {
      label: "Conversion",
      value: isLoading ? "…" : conversionRate,
      icon: TrendingUp,
    },
  ];

  const metrics = useMemo(() => getDemoMetrics(data?.data ?? []), [data]);
  const monthly = metrics.monthly;

  const maxMonthly = Math.max(...monthly, 1);

  const employeeRanking = useMemo(
    () =>
      team
        .filter((member) => member.is_active)
        .map((member) => ({
          id: member.id,
          name: member.full_name || member.email || "Mitarbeiter",
          closed: leads.filter(
            (lead) => lead.backendStatus === "completed" && lead.assignedTo === member.auth_user_id,
          ).length,
        }))
        .sort((a, b) => b.closed - a.closed),
    [leads, team],
  );

  const funnelItems = ["Gesamt", "Angebot erstellt", "Vertrag vorbereitet", "Abschluss"].map(
    (label, index) => ({ label, value: metrics.funnel[index] }),
  );

  if (isError || isTeamError) {
    return (
      <AdminShell title="Statistiken" subtitle="KPIs, Funnel, Quellen und Teamleistung">
        <QueryErrorState
          message="Die Statistiken konnten nicht vollständig geladen werden."
          onRetry={() => {
            void refetch();
            void refetchTeam();
          }}
        />
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Statistiken" subtitle="KPIs, Funnel, Quellen & Teamleistung">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpi.map((k) => (
          <Card key={k.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">{k.label}</div>
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <k.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-2 text-2xl font-semibold">{k.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Monatschart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Leads pro Monat (letzte 12 Monate)</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
                Wird geladen…
              </div>
            ) : (
              <div className="flex h-48 items-end gap-2">
                {monthly.map((v, i) => {
                  const monthLabel = new Date(
                    new Date().getFullYear(),
                    new Date().getMonth() - 11 + i,
                    1,
                  ).toLocaleDateString("de-DE", { month: "short" });
                  return (
                    <div
                      key={i}
                      className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1"
                    >
                      <div
                        className="w-full rounded-t-sm bg-gradient-to-t from-primary to-emerald-400"
                        style={{ height: `${(v / maxMonthly) * 150}px` }}
                      />
                      <div className="text-[10px] text-muted-foreground">{monthLabel}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Mitarbeiter Ranking aus echten Team und Lead Daten */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Mitarbeiter-Ranking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {isTeamLoading ? (
              <div className="text-sm text-muted-foreground">Wird geladen…</div>
            ) : employeeRanking.length === 0 ? (
              <div className="text-sm text-muted-foreground">Keine Teamdaten vorhanden.</div>
            ) : (
              employeeRanking.map((e, i) => (
                <div key={e.id}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                        {i + 1}
                      </span>
                      <span className="font-medium">{e.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{e.closed} Abschlüsse</span>
                  </div>
                  <Progress
                    value={
                      employeeRanking[0]?.closed ? (e.closed / employeeRanking[0].closed) * 100 : 0
                    }
                    className="h-2"
                  />
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Conversion-Funnel aus echten Leads */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Conversion-Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {funnelItems.map((f) => {
                const pct =
                  funnelItems[0].value > 0 ? Math.round((f.value / funnelItems[0].value) * 100) : 0;
                return (
                  <div key={f.label} className="flex items-center gap-4">
                    <div className="w-24 shrink-0 text-xs sm:w-40 sm:text-sm">{f.label}</div>
                    <div className="flex-1">
                      <div className="h-6 overflow-hidden rounded bg-muted">
                        <div
                          className="flex h-full items-center justify-end bg-gradient-to-r from-primary to-emerald-500 px-2 text-xs font-medium text-primary-foreground"
                          style={{ width: `${pct}%` }}
                        >
                          {pct > 5 ? `${pct}%` : ""}
                        </div>
                      </div>
                    </div>
                    <div className="w-8 shrink-0 text-right text-sm tabular-nums">
                      {isLoading ? "…" : f.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Lead-Quellen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {Object.entries(metrics.sources).map(([source, count]) => (
              <div key={source} className="flex justify-between gap-4">
                <span>{source}</span>
                <span className="tabular-nums">{count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        {/* Score-Verteilung */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Lead-Status-Verteilung</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {[
              {
                label: "Neu",
                count: leads.filter((l) => l.backendStatus === "new").length,
                color: "bg-blue-500",
              },
              {
                label: "In Prüfung",
                count: leads.filter((l) => l.backendStatus === "in_review").length,
                color: "bg-sky-500",
              },
              {
                label: "Angebot gesendet",
                count: offerSent,
                color: "bg-violet-500",
              },
              {
                label: "Abgeschlossen",
                count: completed,
                color: "bg-emerald-500",
              },
              {
                label: "Abgelehnt / Verloren",
                count: leads.filter(
                  (l) =>
                    l.backendStatus === "rejected" ||
                    l.backendStatus === "lost" ||
                    l.backendStatus === "disqualified",
                ).length,
                color: "bg-rose-500",
              },
            ].map((s) => {
              const pct = leads.length > 0 ? Math.round((s.count / leads.length) * 100) : 0;
              return (
                <div key={s.label}>
                  <div className="flex justify-between">
                    <span>{s.label}</span>
                    <span className="text-muted-foreground">{isLoading ? "…" : s.count}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded bg-muted">
                    <div className={`h-full ${s.color}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
