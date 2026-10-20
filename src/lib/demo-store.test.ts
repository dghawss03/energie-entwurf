import { submitLead } from "./api/lead";
import { leadSchema } from "./lead-schema";
import {
  getLead,
  getLeads,
  getAllLeads,
  getOffers,
  getNotes,
  postNote,
  markNoteImportant,
  runDemoLeadAction,
  patchLeadStatus,
  assignLead,
} from "./api-client";
import { getDemoMetrics } from "./demo-metrics";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import {
  DEMO_PASSWORD,
  DEMO_STORAGE_KEY,
  DEMO_DRAFT_KEY,
  resetDemo,
  createDemoState,
  demoRequest,
  demoSignIn,
  demoSignOut,
  getDemoProfile,
  storeDemoDocument,
} from "./demo-store";
import type {
  BackendLeadDetail,
  BackendListResponse,
  BackendProfile,
  BackendNote,
  BlogArticle,
} from "./api-types";
import { disabledDemoApi } from "./demo-api.server";
import { sendEmail } from "./email.server";
import { createServiceClient } from "./supabase.server";
import { verifyTurnstile } from "./api/helpers.server";

let storage: Map<string, string>;
let network: ReturnType<typeof vi.fn>;
beforeEach(() => {
  storage = new Map();
  const events = new EventTarget();
  const drafts = new Map<string, string>();
  vi.stubGlobal("window", {
    sessionStorage: {
      getItem: (key: string) => drafts.get(key) ?? null,
      setItem: (key: string, value: string) => {
        drafts.set(key, value);
      },
      removeItem: (key: string) => {
        drafts.delete(key);
      },
    },
    localStorage: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => {
        storage.set(key, value);
      },
      removeItem: (key: string) => {
        storage.delete(key);
      },
    },
    dispatchEvent: (event: Event) => events.dispatchEvent(event),
  });
  network = vi.fn(() => {
    throw new Error("Unexpected network request");
  });
  vi.stubGlobal("fetch", network);
});
afterEach(() => {
  expect(network).not.toHaveBeenCalled();
  vi.unstubAllGlobals();
});
const login = (role = "admin") => demoSignIn(`${role}@example.com`, DEMO_PASSWORD);
const payload = {
  first_name: "Test",
  last_name: "Beispiel",
  email: "test@example.com",
  phone: "00000",
  customer_type: "private",
  product_type: "electricity",
  privacy_consent: true,
  contact_consent: true,
  address: { postal_code: "10115", city: "Musterstadt" },
  electricity: { annual_consumption_kwh: 3500, consumption_known: true },
};

describe("local demo data and authorization", () => {
  it("requires a local active account, persists login and signs out", () => {
    expect(getDemoProfile()).toBeNull();
    expect(() => demoSignIn("real@example.com", DEMO_PASSWORD)).toThrow();
    expect(() => demoSignIn("admin@example.com", "wrong")).toThrow();
    login();
    expect(getDemoProfile()?.role).toBe("admin");
    demoSignOut();
    expect(getDemoProfile()).toBeNull();
  });
  it("stores a public request, makes it searchable and retains changes on subsequent reads", async () => {
    const result = await demoRequest<{ data: { lead_id: string; lead_number: string } }>(
      "POST",
      "/api/public/leads",
      payload,
    );
    expect(storage.has(DEMO_STORAGE_KEY)).toBe(true);
    login();
    const found = await demoRequest<BackendListResponse<BackendLeadDetail>>(
      "GET",
      "/api/leads",
      undefined,
      { q: result.data.lead_number },
    );
    expect(found.count).toBe(1);
    expect(found.data[0].email).toBe(payload.email);
    await demoRequest("PATCH", `/api/leads/${result.data.lead_id}/status`, { status: "completed" });
    await demoRequest("POST", `/api/leads/${result.data.lead_id}/notes`, {
      note: "Lokale Testnotiz",
    });
    const lead = await demoRequest<{ data: BackendLeadDetail }>(
      "GET",
      `/api/leads/${result.data.lead_id}`,
    );
    expect(lead.data.status).toBe("completed");
    const notes = await demoRequest<BackendListResponse<BackendNote>>(
      "GET",
      `/api/leads/${result.data.lead_id}/notes`,
    );
    expect(notes.data[0].note).toBe("Lokale Testnotiz");
    const comms = await demoRequest<BackendListResponse<{ external_id: string | null }>>(
      "GET",
      `/api/leads/${result.data.lead_id}/communications`,
    );
    expect(comms.data.every((c) => c.external_id === null)).toBe(true);
  });
  it("rejects invalid public data without saving anything", async () => {
    await expect(
      demoRequest("POST", "/api/public/leads", { ...payload, email: "invalid" }),
    ).rejects.toMatchObject({ status: 400 });
    expect(storage.size).toBe(0);
  });
  it("enforces employee scope and admin-only team mutations", async () => {
    await expect(demoRequest("GET", "/api/leads")).rejects.toMatchObject({ status: 401 });
    login("employee");
    const leads = await demoRequest<BackendListResponse<BackendLeadDetail>>("GET", "/api/leads");
    expect(leads.count).toBeGreaterThan(0);
    expect(leads.data.every((l) => l.assigned_to === getDemoProfile()?.authUserId)).toBe(true);
    await expect(demoRequest("GET", "/api/leads/demo-lead-0")).rejects.toMatchObject({
      status: 403,
    });
    await expect(demoRequest("POST", "/api/providers", {})).rejects.toMatchObject({ status: 403 });
    login("manager");
    await expect(
      demoRequest("POST", "/api/team", { email: "new@example.com" }),
    ).rejects.toMatchObject({ status: 403 });
  });
  it("persists team accounts and profile preferences without creating external credentials", async () => {
    login();
    await demoRequest("POST", "/api/team", {
      email: "new@example.com",
      full_name: "Demo Neu",
      role: "employee",
    });
    demoSignIn("new@example.com", DEMO_PASSWORD);
    await demoRequest("PATCH", "/api/me", { notification_prefs: { weekly_report: true } });
    const result = await demoRequest<{ data: BackendProfile }>("GET", "/api/me");
    expect(result.data.full_name).toBe("Demo Neu");
    expect(result.data.notification_prefs.weekly_report).toBe(true);
  });
  it("clears an old follow-up when the task is completed", async () => {
    login();
    await demoRequest("PATCH", "/api/leads/demo-lead-5/status", { status: "in_review" });
    const result = await demoRequest<{ data: BackendLeadDetail }>("GET", "/api/leads/demo-lead-5");
    expect(result.data.wiedervorlage_at).toBeNull();
  });
  it("persists article publication and rejects duplicate slugs", async () => {
    login();
    const article = createDemoState().articles[0];
    const result = await demoRequest<{ data: BlogArticle }>("POST", "/api/admin/blog/articles", {
      ...article,
      slug: "demo-test",
    });
    const published = await demoRequest<{ data: BlogArticle }>(
      "GET",
      "/api/blog/articles/demo-test",
    );
    expect(published.data.id).toBe(result.data.id);
    await expect(
      demoRequest("POST", "/api/admin/blog/articles", { ...article, slug: "demo-test" }),
    ).rejects.toMatchObject({ status: 409 });
    await demoRequest("DELETE", `/api/admin/blog/articles/${result.data.id}`);
    await expect(demoRequest("GET", "/api/blog/articles/demo-test")).rejects.toMatchObject({
      status: 404,
    });
  });
  it("reports corrupted or unavailable storage rather than silently losing changes", async () => {
    storage.set(DEMO_STORAGE_KEY, "{broken");
    await expect(demoRequest("GET", "/api/blog/articles")).rejects.toMatchObject({ status: 503 });
    storage.clear();
    window.localStorage.setItem = () => {
      throw new Error("quota");
    };
    await expect(demoRequest("POST", "/api/public/leads", payload)).rejects.toMatchObject({
      status: 507,
    });
  });
  it("rejects unsupported documents before accessing storage", async () => {
    login();
    const file = new File(["test"], "test.exe", { type: "application/octet-stream" });
    await expect(storeDemoDocument("demo-lead-0", file)).rejects.toMatchObject({ status: 400 });
  });
  it("persists document metadata, removes blobs on deletion and rolls back failed metadata saves", async () => {
    const files = new Map<string, Blob>();
    // Minimal IndexedDB test double; the browser implementation remains native IndexedDB.
    vi.stubGlobal("indexedDB", {
      open: () => {
        const open: { result: object; onsuccess?: () => void } = {
          result: {
            close: () => {},
            transaction: () => {
              const tx: { oncomplete?: () => void; objectStore?: () => object } = {};
              const complete = (result: unknown) => {
                queueMicrotask(() => tx.oncomplete?.());
                return { result };
              };
              tx.objectStore = () => ({
                clear: () => {
                  files.clear();
                  return complete(undefined);
                },
                put: (blob: Blob, key: string) => {
                  files.set(key, blob);
                  return complete(key);
                },
                delete: (key: string) => {
                  files.delete(key);
                  return complete(undefined);
                },
              });
              return tx;
            },
          },
        };
        queueMicrotask(() => open.onsuccess?.());
        return open;
      },
    });
    login();
    const file = new File(["%PDF-1.4\nDemo"], "demo.pdf", { type: "application/pdf" });
    const doc = await storeDemoDocument("demo-lead-0", file);
    expect(files.get(doc.id)?.size).toBe(file.size);
    const result = await demoRequest<BackendListResponse<{ id: string }>>(
      "GET",
      "/api/leads/demo-lead-0/documents",
    );
    expect(result.data.some((d) => d.id === doc.id)).toBe(true);
    await demoRequest("DELETE", `/api/leads/demo-lead-0/documents/${doc.id}`);
    expect(files.has(doc.id)).toBe(false);
    const originalSetItem = window.localStorage.setItem;
    window.localStorage.setItem = () => {
      throw new Error("quota");
    };
    await expect(storeDemoDocument("demo-lead-0", file)).rejects.toMatchObject({ status: 507 });
    expect(files.size).toBe(0);
    window.localStorage.setItem = originalSetItem;
    window.sessionStorage.setItem(DEMO_DRAFT_KEY, "demo draft");
    await storeDemoDocument("demo-lead-0", file);
    await resetDemo();
    expect(files.size).toBe(0);
    expect(storage.has(DEMO_STORAGE_KEY)).toBe(false);
    expect(window.sessionStorage.getItem(DEMO_DRAFT_KEY)).toBeNull();
    expect(getDemoProfile()).toBeNull();
  });
  it("does not expose browser data during SSR", async () => {
    login();
    await demoRequest("POST", "/api/public/leads", payload);
    vi.stubGlobal("window", undefined);
    expect(getDemoProfile()).toBeNull();
    await expect(demoRequest("GET", "/api/leads")).rejects.toMatchObject({ status: 401 });
    expect(createDemoState().leads).toHaveLength(18);
  });
});

describe("disabled integrations", () => {
  it("keeps the HTTP API, database, mail and CAPTCHA inert even with production environment variables", async () => {
    vi.stubEnv("RESEND_API_KEY", "must-not-be-used");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "must-not-be-used");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "must-not-be-used");
    try {
      expect(disabledDemoApi().status).toBe(410);
      expect(() => createServiceClient()).toThrow("deaktiviert");
      expect(await verifyTurnstile("test")).toBe(false);
      expect(await sendEmail({ to: "test@example.com", subject: "test", html: "test" })).toEqual({
        id: null,
        skipped: true,
        attempts: 0,
      });
    } finally {
      vi.unstubAllEnvs();
    }
  });
});

describe("complete fictional demo workflow", () => {
  it.each([
    ["strom", "privat"],
    ["gas", "privat"],
    ["beides", "privat"],
    ["gewerbe", "gewerbe"],
    ["beides", "hausverwaltung"],
    ["beides", "mehrere_standorte"],
  ] as const)(
    "stores %s / %s form data and processes the lead without network calls",
    async (energyType, customerType) => {
      const input = leadSchema.parse({
        energyType,
        customerType,
        plz: "10115",
        ort: "Musterstadt",
        vorname: "Demo",
        nachname: "Integration",
        email: "integration@example.com",
        telefon: "00000",
        erreichbarkeit: "egal",
        stromVerbrauchKwh: 3500,
        gasVerbrauchKwh: 12000,
        vertragsende: "",
        monatlicherAbschlag: 100,
        datenschutzAkzeptiert: true,
        kontaktAkzeptiert: true,
      });
      const created = await submitLead(input);
      expect(created.ok).toBe(true);
      login();
      expect((await getLeads({ q: created.leadNumber })).count).toBe(1);
      const lead = await getLead(created.leadId);
      expect(lead.energy_demands).toHaveLength(energyType === "beides" ? 2 : 1);
      await assignLead(created.leadId, "demo-user-2");
      login("employee");
      const note = await postNote(created.leadId, "Fiktiver Rückruf vereinbart");
      await markNoteImportant(created.leadId, note.id, true);
      expect(
        (await getNotes(created.leadId)).data.find((n) => n.id === note.id)?.is_important,
      ).toBe(true);
      await patchLeadStatus(created.leadId, "follow_up", {
        followUpAt: "2026-12-01T10:00:00.000Z",
        followUpNote: "Demo-Wiedervorlage",
      });
      expect((await getLead(created.leadId)).wiedervorlage_at).toBe("2026-12-01T10:00:00.000Z");
      await runDemoLeadAction(created.leadId, "create_offer");
      const offer = (await getOffers(created.leadId)).data[0];
      expect(offer.annual_price).toBeGreaterThan(0);
      expect(offer.status).toBe("draft");
      await runDemoLeadAction(created.leadId, "send_offer");
      expect((await getOffers(created.leadId)).data[0].status).toBe("sent");
      expect((await getLead(created.leadId)).wiedervorlage_at).toBeNull();
      await runDemoLeadAction(created.leadId, "email");
      await patchLeadStatus(created.leadId, "completed");
      expect((await getLead(created.leadId)).status).toBe("completed");
      login();
      const all = (await getAllLeads()).data;
      const metrics = getDemoMetrics(all);
      expect(metrics.total).toBe(19);
      expect(metrics.completed).toBe(4);
      expect(metrics.funnel.every((count, i) => i === 0 || count <= metrics.funnel[i - 1])).toBe(
        true,
      );
      expect(Object.values(metrics.sources).reduce((a, b) => a + b, 0)).toBe(all.length);
    },
  );
  it("filters before pagination, including matches beyond the first page", async () => {
    for (let index = 0; index < 28; index++)
      await demoRequest("POST", "/api/public/leads", payload);
    login();
    const first = await getLeads({ status: "new", page: 1, pageSize: 25 });
    const second = await getLeads({ status: "new", page: 2, pageSize: 25 });
    expect(first.count).toBe(30);
    expect(first.data).toHaveLength(25);
    expect(second.data).toHaveLength(5);
    expect([...first.data, ...second.data].every((lead) => lead.status === "new")).toBe(true);
  });
  it("preserves existing edits when adding the extended seed dataset", async () => {
    const previous = createDemoState();
    previous.seed_revision = 1;
    previous.leads = previous.leads.slice(0, 6);
    previous.leads[0].first_name = "Lokal bearbeitet";
    storage.set(DEMO_STORAGE_KEY, JSON.stringify(previous));
    login();
    expect((await getAllLeads()).data).toHaveLength(18);
    expect((await getLead("demo-lead-0")).first_name).toBe("Lokal bearbeitet");
    await runDemoLeadAction("demo-lead-0", "reject");
    expect((await getLead("demo-lead-0")).status).toBe("rejected");
  });
  it("fails gracefully when no active tariff matches, without saving an offer", async () => {
    const state = createDemoState();
    state.tariffs.forEach((tariff) => {
      tariff.is_active = false;
    });
    storage.set(DEMO_STORAGE_KEY, JSON.stringify(state));
    login();
    await expect(runDemoLeadAction("demo-lead-0", "create_offer")).rejects.toThrow("Kein aktiver");
    expect((await getOffers("demo-lead-0")).data).toHaveLength(0);
    expect((await getLead("demo-lead-0")).status).toBe("new");
  });
});
