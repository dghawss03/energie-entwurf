import { useQuery, useQueries } from "@tanstack/react-query";
import { getAllLeads, getOffers } from "@/lib/api-client";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Plus, Download, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QueryErrorState } from "@/components/mitarbeiter/QueryErrorState";
import { AdminShell } from "@/components/mitarbeiter/AdminShell";

export const Route = createFileRoute("/mitarbeiter/kunden")({
  head: () => ({
    meta: [{ title: "Kunden – Mitarbeiter" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: KundenPage,
});

function KundenPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["leads", "customers"],
    queryFn: () => getAllLeads(),
  });
  const completed = (data?.data ?? []).filter((lead) => lead.status === "completed");
  const offerQueries = useQueries({
    queries: completed.map((lead) => ({
      queryKey: ["lead-offers", lead.id],
      queryFn: () => getOffers(lead.id),
    })),
  });
  const customers = completed.map((lead, index) => {
    const offers = (offerQueries[index].data?.data ?? []).filter(
      (offer) =>
        offer.status !== "superseded" && offer.status !== "rejected" && offer.status !== "expired",
    );
    const latest = offers[0];
    return {
      id: lead.id,
      name: `${lead.first_name} ${lead.last_name}`,
      email: lead.email,
      phone: lead.phone ?? "—",
      contracts: offers.length,
      savings: latest?.estimated_savings ?? null,
      since: lead.updated_at,
      status: "Aktiv",
    };
  });
  const [q, setQ] = useState("");

  const filtered = customers.filter(
    (c) =>
      !q ||
      c.name.toLowerCase().includes(q.toLowerCase()) ||
      c.email.toLowerCase().includes(q.toLowerCase()),
  );

  function handleAdd() {
    navigate({ to: "/angebot" });
  }

  function handleExport() {
    const headers = [
      "ID",
      "Name",
      "E-Mail",
      "Telefon",
      "Demo-Angebote",
      "Ersparnis",
      "Seit",
      "Status",
    ];
    const rows = filtered.map((c) => [
      c.id,
      c.name,
      c.email,
      c.phone,
      c.contracts,
      c.savings == null ? "—" : `${c.savings} €`,
      new Date(c.since).toLocaleDateString("de-DE"),
      c.status,
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(";"))
      .join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kunden_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV-Export gestartet");
  }

  return (
    <AdminShell
      title="Kunden"
      subtitle={`${customers.length} aktive Bestandskunden`}
      actions={
        <>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Demo-Anfrage anlegen
          </Button>
        </>
      }
    >
      {isError && (
        <QueryErrorState
          message="Kunden konnten nicht geladen werden."
          onRetry={() => void refetch()}
        />
      )}
      {isLoading && <p className="mb-4 text-sm text-muted-foreground">Kunden werden geladen…</p>}
      <p className="mb-4 text-sm text-muted-foreground">
        Abgeschlossene Demo-Leads erscheinen automatisch als Kunden.
      </p>
      <div className="mb-4 max-w-xs">
        <Input placeholder="Kunde suchen…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-6 py-3 font-medium">Kunde</th>
                  <th className="px-6 py-3 font-medium">Kontakt</th>
                  <th className="px-6 py-3 font-medium">Demo-Angebote</th>
                  <th className="px-6 py-3 font-medium">Ersparnis / Jahr</th>
                  <th className="px-6 py-3 font-medium">Kunde seit</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/40">
                    <td className="px-6 py-4">
                      <Link
                        to="/mitarbeiter/leads/$id"
                        params={{ id: c.id }}
                        className="font-medium hover:underline"
                      >
                        {c.name}
                      </Link>
                      <div className="text-xs text-muted-foreground">{c.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {c.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {c.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{c.contracts}</td>
                    <td className="px-6 py-4 font-medium text-emerald-600">
                      {c.savings == null ? "—" : `${c.savings.toLocaleString("de-DE")} €`}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(c.since).toLocaleDateString("de-DE")}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={c.status === "Aktiv" ? "default" : "secondary"}>
                        {c.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-sm text-muted-foreground">
                      Keine Kunden gefunden.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AdminShell>
  );
}
