import type {
  BackendLeadDetail,
  BackendProfile,
  BackendNote,
  BackendDocument,
  BackendCommunication,
  BackendOffer,
  BackendStatusHistory,
  BackendProvider,
  BackendTariff,
  BackendEmailTemplate,
  BackendReferral,
  BlogArticle,
} from "./api-types";
import { z } from "zod";
import { publicLeadPayloadSchema } from "./api/public-lead-schema";
import {
  providerInputSchema,
  tariffInputSchema,
  emailTemplateInputSchema,
} from "./api/catalog-schema";
import { generateLeadNumber } from "./lead-number";
import { MAX_UPLOAD_BYTES, PUBLIC_INVOICE_TYPES, STAFF_DOCUMENT_TYPES } from "./upload-limits";
import articleImage from "../assets/page-wissen.svg?no-inline";
import invoiceImage from "../assets/demo-invoice.svg";
import { clearPendingInvoice } from "./pending-invoice";
import { rebrandSavedContent } from "./branding";

export const DEMO_STORAGE_KEY = "energie-entwurf-demo-v1";
export const DEMO_SESSION_KEY = "energie-entwurf-session-v1";
export const DEMO_DRAFT_KEY = "energie-entwurf-draft-v1";
export const DEMO_DRAFT_STEP_KEY = "energie-entwurf-draft-step-v1";
export const DEMO_LEAD_NUMBER_KEY = "energie-entwurf-lead-number-v1";
export const DEMO_CHANGED = "energie-entwurf-demo-changed";
export const DEMO_PASSWORD = "Demo2026!";
export class DemoError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
interface DemoState {
  version: 1;
  seed_revision?: number;
  profiles: BackendProfile[];
  leads: BackendLeadDetail[];
  notes: BackendNote[];
  documents: BackendDocument[];
  communications: BackendCommunication[];
  offers: BackendOffer[];
  history: BackendStatusHistory[];
  providers: BackendProvider[];
  tariffs: BackendTariff[];
  templates: BackendEmailTemplate[];
  referrals: BackendReferral[];
  articles: BlogArticle[];
}
const now = () => new Date().toISOString();
const id = () => crypto.randomUUID();
const stamp = () => ({ created_at: now(), updated_at: now() });

/** Fresh synthetic fixtures only. Never import the previous customer/mock records. */
export function createDemoState(): DemoState {
  const profiles: BackendProfile[] = (["admin", "manager", "employee"] as const).map((role, i) => ({
    profileId: `demo-profile-${i}`,
    authUserId: `demo-user-${i}`,
    role,
    full_name: ["Alex Beispiel", "Kim Muster", "Robin Demo"][i],
    email: `${role}@example.com`,
    is_active: true,
    phone: null,
    notification_prefs: {},
  }));
  const statuses = [
    "new",
    "in_review",
    "question_open",
    "offer_sent",
    "completed",
    "follow_up",
    "offer_created",
    "interested",
    "contract_prepared",
    "contract_sent",
    "completed",
    "rejected",
    "new",
    "in_review",
    "follow_up",
    "completed",
    "unreachable",
    "question_open",
  ] as const;
  const leads: BackendLeadDetail[] = statuses.map((status, i) => {
    const leadId = `demo-lead-${i}`;
    const dates = {
      created_at: new Date(Date.now() - (i < 6 ? i : 15 + (i - 6) * 13) * 86400000).toISOString(),
      updated_at: now(),
    };
    return {
      id: leadId,
      lead_number: i < 6 ? `DEMAAA${i + 2}` : `DEMB${"ABCDEFGHJKLMNPQRSTUVWXYZ"[i]}AA`,
      first_name: ["Lena", "Noah", "Mila", "Demo", "Finn", "Alex"][i % 6],
      last_name: i % 6 === 3 ? `Büro Musterfeld ${i} (fiktiv)` : `Beispiel ${i + 1} (Demo)`,
      email: `haushalt${i + 1}@example.com`,
      phone: `00000 ${String(100000 + i)}`,
      source: i % 3 === 0 ? "Website-Demo" : i % 3 === 1 ? "Empfehlung" : "Backoffice-Demo",
      status,
      score: 45 + (i % 6) * 9,
      score_label: i % 6 > 3 ? "hot" : "warm",
      product_type: i % 2 ? "gas" : "electricity",
      customer_type: i % 6 === 3 ? "business" : "private",
      assigned_to: profiles[i % 3].authUserId,
      wiedervorlage_at: status === "follow_up" ? dates.created_at : null,
      wiedervorlage_note: status === "follow_up" ? "Fiktiver Rückruf zur Demonstration" : null,
      ...dates,
      addresses: [
        {
          id: `demo-address-${i}`,
          lead_id: leadId,
          address_type: "delivery",
          street: "Beispielweg",
          house_number: String(i + 1),
          address_addition: null,
          postal_code: "10115",
          city: "Musterstadt",
          state: null,
          country: "DE",
          ...dates,
        },
      ],
      energy_demands: [
        {
          id: `demo-demand-${i}`,
          lead_id: leadId,
          energy_type: i % 2 ? "gas" : "electricity",
          annual_consumption_kwh: (i % 2 ? 12000 : 3500) + i * 150,
          consumption_known: true,
          household_size: 3,
          living_area_sqm: null,
          heating_type: null,
          hot_water_with_gas: null,
          current_provider: "Beispiel Energie",
          current_tariff: "Muster 12",
          monthly_payment: 110,
          contract_end_date: null,
          meter_number: null,
          ...dates,
        },
      ],
    };
  });
  const providers: BackendProvider[] = [
    {
      id: "00000000-0000-4000-8000-000000000001",
      name: "Beispiel Energie",
      energy_type: "beide",
      rating: 4.5,
      is_partner: true,
      is_active: true,
      ...stamp(),
    },
  ];
  providers.push(
    ...["Demo Versorger Nord", "Demo Versorger Süd"].map((name, i) => ({
      id: "00000000-0000-4000-8000-00000000000" + (i + 2),
      name,
      energy_type: "beide" as const,
      rating: 4.2 + i * 0.2,
      is_partner: true,
      is_active: true,
      ...stamp(),
    })),
  );
  const tariffs: BackendTariff[] = (["strom", "gas", "strom", "gas", "strom", "gas"] as const).map(
    (energy_type, i) => ({
      id: `demo-tariff-${i}`,
      provider_id: providers[Math.floor(i / 2)].id,
      name: `Demo ${energy_type} ${i < 4 ? "Privat" : "Gewerbe"} 12`,
      energy_type,
      segment: i < 4 ? "privat" : "gewerbe",
      price_per_kwh: energy_type === "gas" ? 9 + Math.floor(i / 2) * 0.3 : 29 + Math.floor(i / 2),
      base_price: 10,
      duration_months: 12,
      price_guarantee_months: 12,
      is_eco: true,
      is_active: true,
      ...stamp(),
    }),
  );
  const slugs = [
    "strompreis-2026",
    "oekostrom-labels",
    "gaspreise-2026",
    "solaranlage-kosten-2026",
    "bundle-doppelbonus",
    "waermestrom-tarif",
    "solaranlage-foerderungen-2026",
    "e-auto-laden",
    "solaranlage-installation",
    "heizkosten-senken",
    "ein-vertrag-statt-zwei",
    "anbieterwechsel-schritt-fuer-schritt",
    "unterlagen-beim-wechsel",
  ];
  const articles: BlogArticle[] = slugs.map((slug, i) => ({
    id: `demo-article-${i}`,
    slug,
    title: slug
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" "),
    teaser: "Ein fiktiver Ratgeber für die lokale Demo. Alle Konditionen sind Beispiele.",
    tag: i % 2 ? "Gas" : "Strom",
    image: articleImage,
    author: "Demo Redaktion",
    body: [
      {
        heading: "Beispiel zur Tarifberatung",
        paragraphs: [
          "Dieser Artikel demonstriert die Redaktion. Preise, Anbieter und Rechenbeispiele sind frei erfunden.",
          "Über die Angebotsstrecke können Sie eine lokale Beispielanfrage erstellen und im Mitarbeiterbereich bearbeiten.",
        ],
      },
    ],
    seo_title: null,
    seo_description: null,
    read_time_min: 2,
    is_published: true,
    published_at: now(),
    ...stamp(),
  }));
  return {
    version: 1,
    seed_revision: 2,
    profiles,
    leads,
    providers,
    tariffs,
    articles,
    notes: [
      ...leads
        .slice(1)
        .map((lead, i) => ({
          id: `demo-seed-note-${i}`,
          lead_id: lead.id,
          created_by: profiles[i % 3].authUserId,
          note: "Fiktives Beratungsszenario: Verbrauch und Wünsche prüfen, bei Bedarf eine Wiedervorlage setzen.",
          is_important: i % 4 === 0,
          ...stamp(),
        })),
      {
        id: "demo-note",
        lead_id: leads[0].id,
        created_by: profiles[0].authUserId,
        note: "Ausschließlich fiktiver Vorgang. Änderungen bleiben in diesem Browser.",
        ...stamp(),
      },
    ],
    documents: [
      {
        id: "demo-document",
        lead_id: leads[0].id,
        uploaded_by: profiles[0].authUserId,
        document_type: "rechnung",
        file_name: "Fiktive-Beispielrechnung.svg",
        storage_path: "sample-invoice",
        storage_bucket: "browser",
        mime_type: "image/svg+xml",
        file_size_bytes: null,
        ocr_status: null,
        ...stamp(),
      },
    ],
    communications: leads.map((lead, i) => ({
      id: `demo-communication-${i}`,
      lead_id: lead.id,
      offer_id: null,
      created_by: "demo-system",
      communication_type: "system",
      direction: "internal",
      subject: "Fiktiver Beratungsvorgang angelegt",
      content_summary: "Ausschließlich lokale Simulation; keine Nachricht versendet.",
      status: "success",
      external_id: null,
      ...stamp(),
    })),
    offers: [
      {
        id: "demo-offer",
        lead_id: leads[3].id,
        energy_demand_id: null,
        created_by: profiles[0].authUserId,
        offer_number: "DEMO-2026-1",
        version: 1,
        provider_name: providers[0].name,
        tariff_name: tariffs[1].name,
        energy_type: "gas",
        monthly_price: 100,
        annual_price: 1200,
        estimated_savings: 120,
        status: "sent",
        valid_until: null,
        notes: "Fiktives Angebot, kein Vertragsabschluss",
        ...stamp(),
      },
    ],
    history: leads.map((lead) => ({
      id: `history-${lead.id}`,
      lead_id: lead.id,
      old_status: null,
      new_status: lead.status,
      changed_by: profiles[0].authUserId,
      reason: "Fiktiver Ausgangszustand",
      created_at: lead.created_at,
    })),
    templates: [
      {
        id: "demo-template",
        name: "Demo Anfragebestätigung",
        subject: "Ihre Beispielanfrage",
        trigger_name: "Lead erstellt",
        body: "Diese Nachricht wird nur simuliert und nicht versendet.",
        is_active: true,
        ...stamp(),
      },
    ],
    referrals: [
      {
        id: "demo-referral",
        referrer_lead_id: leads[4].id,
        referred_lead_id: leads[3].id,
        code_used: "DEMO2026",
        status: "qualified",
        reward_amount_cents: 3000,
        reward_type: "demo",
        payout_after: leads[3].created_at,
        paid_at: null,
        admin_notes: "Keine echte Auszahlung",
        ...stamp(),
      },
    ],
  };
}

// No module-global mutable state: SSR requests always receive their own seed.
function readState(): DemoState {
  if (typeof window === "undefined") return createDemoState();
  try {
    const raw = window.localStorage.getItem(DEMO_STORAGE_KEY);
    if (!raw) return createDemoState();
    const state = JSON.parse(raw) as DemoState;
    const keys = [
      "profiles",
      "leads",
      "notes",
      "documents",
      "communications",
      "offers",
      "history",
      "providers",
      "tariffs",
      "templates",
      "referrals",
      "articles",
    ] as const;
    if (state.version !== 1 || keys.some((key) => !Array.isArray(state[key]))) throw new Error();
    if ((state.seed_revision ?? 1) < 2) {
      const seed = createDemoState();
      const additions = seed.leads.filter(
        (lead) =>
          !state.leads.some((existing) => existing.id === lead.id) &&
          Number(lead.id.replace("demo-lead-", "")) >= 6,
      );
      const newIds = new Set(additions.map((lead) => lead.id));
      state.leads.push(...additions);
      state.notes.push(...seed.notes.filter((note) => newIds.has(note.lead_id)));
      state.history.push(...seed.history.filter((item) => newIds.has(item.lead_id)));
      state.communications.push(...seed.communications.filter((item) => newIds.has(item.lead_id)));
      state.providers.push(
        ...seed.providers.filter(
          (item) => !state.providers.some((existing) => existing.id === item.id),
        ),
      );
      state.tariffs.push(
        ...seed.tariffs.filter(
          (item) => !state.tariffs.some((existing) => existing.id === item.id),
        ),
      );
      state.seed_revision = 2;
    }
    return rebrandSavedContent(state, articleImage);
  } catch {
    throw new DemoError(
      503,
      "Demo-Speicher nicht verfügbar oder beschädigt. Bitte Demo zurücksetzen.",
    );
  }
}
function saveState(state: DemoState) {
  if (typeof window === "undefined")
    throw new DemoError(409, "Demoänderungen benötigen einen Browser.");
  try {
    window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(state));
  } catch {
    throw new DemoError(
      507,
      "Lokaler Speicher voll oder gesperrt. Änderung wurde nicht gespeichert.",
    );
  }
  window.dispatchEvent(new Event(DEMO_CHANGED));
}
export function getDemoProfile(): BackendProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const userId = window.localStorage.getItem(DEMO_SESSION_KEY);
    if (!userId) return null;
    return (
      readState().profiles.find((profile) => profile.authUserId === userId && profile.is_active) ??
      null
    );
  } catch {
    // Keep the login/reset screen reachable if browser state becomes unavailable.
    return null;
  }
}
export function demoSignIn(email: string, password: string) {
  const state = readState();
  const profile = state.profiles.find(
    (p) => p.email.toLowerCase() === email.trim().toLowerCase() && p.is_active,
  );
  if (!profile || password !== DEMO_PASSWORD) throw new DemoError(401, "Demo-Zugang ungültig.");
  saveState(state);
  window.localStorage.setItem(DEMO_SESSION_KEY, profile.authUserId);
  window.dispatchEvent(new Event(DEMO_CHANGED));
}
export function demoSignOut() {
  window.localStorage.removeItem(DEMO_SESSION_KEY);
  window.dispatchEvent(new Event(DEMO_CHANGED));
}
export async function resetDemo() {
  await fileTransaction("readwrite", (store) => store.clear());
  window.localStorage.removeItem(DEMO_STORAGE_KEY);
  for (const key of [DEMO_DRAFT_KEY, DEMO_DRAFT_STEP_KEY, DEMO_LEAD_NUMBER_KEY]) {
    window.sessionStorage.removeItem(key);
  }
  clearPendingInvoice();
  demoSignOut();
}

async function fileTransaction<T>(
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  if (typeof indexedDB === "undefined")
    throw new DemoError(503, "Dokumente benötigen IndexedDB im Browser.");
  return new Promise((resolve, reject) => {
    const open = indexedDB.open("energie-entwurf-documents-v1", 1);
    open.onupgradeneeded = () => open.result.createObjectStore("files");
    open.onerror = () => reject(new DemoError(507, "Lokaler Dokumentenspeicher nicht verfügbar."));
    open.onsuccess = () => {
      const db = open.result;
      const tx = db.transaction("files", mode);
      const request = operation(tx.objectStore("files"));
      tx.oncomplete = () => {
        db.close();
        resolve(request.result);
      };
      tx.onabort = tx.onerror = () => {
        db.close();
        reject(new DemoError(507, "Dokument konnte lokal nicht gespeichert werden."));
      };
    };
  });
}
export async function storeDemoDocument(
  leadId: string,
  file: File,
  publicUpload = false,
): Promise<BackendDocument> {
  const allowed: readonly string[] = publicUpload ? PUBLIC_INVOICE_TYPES : STAFF_DOCUMENT_TYPES;
  if (!allowed.includes(file.type) || !file.size || file.size > MAX_UPLOAD_BYTES) {
    throw new DemoError(400, "Dateityp ungültig oder Datei größer als 10 MB.");
  }
  const profile = publicUpload ? null : requireProfile();
  const state = readState();
  const lead = state.leads.find((l) => l.id === leadId);
  if (!lead) throw new DemoError(404, "Lead nicht gefunden");
  if (profile) checkLead(profile, lead);
  const doc: BackendDocument = {
    id: id(),
    lead_id: leadId,
    uploaded_by: profile?.authUserId ?? "demo-public",
    document_type: "rechnung",
    file_name: file.name,
    storage_path: "",
    storage_bucket: "browser",
    mime_type: file.type,
    file_size_bytes: file.size,
    ocr_status: null,
    ...stamp(),
  };
  doc.storage_path = doc.id;
  await fileTransaction("readwrite", (store) => store.put(file, doc.id));
  try {
    // Read again after async work to preserve changes from other uploads in the same tab.
    const latest = readState();
    latest.documents.push(doc);
    saveState(latest);
  } catch (error) {
    await fileTransaction("readwrite", (store) => store.delete(doc.id));
    throw error;
  }
  return doc;
}

function requireProfile() {
  const profile = getDemoProfile();
  if (!profile) throw new DemoError(401, "Bitte mit einem Demo-Konto anmelden.");
  return profile;
}
function checkLead(profile: BackendProfile, lead: BackendLeadDetail) {
  if (profile.role === "employee" && lead.assigned_to !== profile.authUserId)
    throw new DemoError(403, "Keine Berechtigung");
}
const bodySchema = z.record(z.string(), z.unknown());
const statuses = z.enum([
  "new",
  "in_review",
  "question_open",
  "offer_created",
  "offer_sent",
  "interested",
  "contract_prepared",
  "contract_sent",
  "completed",
  "rejected",
  "unreachable",
  "follow_up",
  "disqualified",
  "lost",
]);
const data = <T>(value: T) => ({ data: value });
function communication(state: DemoState, leadId: string, subject: string, author = "demo-system") {
  state.communications.push({
    id: id(),
    lead_id: leadId,
    offer_id: null,
    created_by: author,
    communication_type: "system",
    direction: "internal",
    subject,
    content_summary: "Nur lokal simuliert. Es wurde keine Nachricht versendet.",
    status: "success",
    external_id: null,
    ...stamp(),
  });
}

/** In-process adapter for the existing UI API contracts. No fetch and no server writes. */
export async function demoRequest<T>(
  method: string,
  path: string,
  input?: unknown,
  params: Record<string, string | number> = {},
): Promise<T> {
  try {
    return (await request(method, path, input, params)) as T;
  } catch (error) {
    if (error instanceof z.ZodError)
      throw new DemoError(400, error.issues[0]?.message ?? "Ungültige Eingabe");
    throw error;
  }
}
async function request(
  method: string,
  path: string,
  input: unknown,
  params: Record<string, string | number>,
): Promise<unknown> {
  const state = readState();
  const body = bodySchema.parse(input ?? {});
  const parts = path.replace(/^\/api\//, "").split("/");
  const list = <T>(items: T[]) => {
    const page = Math.max(1, Number(params.page) || 1);
    const pageSize = Math.min(200, Math.max(1, Number(params.pageSize) || 100));
    return {
      data: items.slice((page - 1) * pageSize, page * pageSize),
      count: items.length,
      page,
      pageSize,
    };
  };
  if (path === "/api/public/leads" && method === "POST") {
    const payload = publicLeadPayloadSchema.parse(body);
    let number = generateLeadNumber();
    while (state.leads.some((l) => l.lead_number === number)) number = generateLeadNumber();
    const leadId = id();
    const lead: BackendLeadDetail = {
      id: leadId,
      lead_number: number,
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      phone: payload.phone,
      product_type: payload.product_type,
      customer_type: payload.customer_type,
      source: payload.referral_code ? "Empfehlung" : "Website-Demo",
      status: "new",
      score: 55,
      score_label: "warm",
      assigned_to: null,
      wiedervorlage_at: null,
      wiedervorlage_note: null,
      ...stamp(),
      addresses: [
        {
          id: id(),
          lead_id: leadId,
          address_type: "delivery",
          street: payload.address.street ?? null,
          house_number: null,
          address_addition: null,
          postal_code: payload.address.postal_code,
          city: payload.address.city,
          state: null,
          country: "DE",
          ...stamp(),
        },
      ],
      energy_demands: (["electricity", "gas"] as const).flatMap((energy_type) => {
        const energy = payload[energy_type];
        if (!energy) return [];
        return [
          {
            id: id(),
            lead_id: leadId,
            energy_type,
            annual_consumption_kwh: energy.annual_consumption_kwh,
            consumption_known: energy.consumption_known,
            household_size: energy_type === "gas" ? (payload.gas?.household_size ?? null) : null,
            living_area_sqm: null,
            heating_type: energy_type === "gas" ? (payload.gas?.heating_type ?? null) : null,
            hot_water_with_gas:
              energy_type === "gas" ? (payload.gas?.hot_water_with_gas ?? null) : null,
            current_provider: energy.current_provider ?? null,
            current_tariff: null,
            monthly_payment: energy.monthly_payment ?? null,
            contract_end_date: energy.contract_end_date ?? null,
            meter_number: null,
            ...stamp(),
          },
        ];
      }),
    };
    state.leads.unshift(lead);
    state.history.push({
      id: id(),
      lead_id: leadId,
      old_status: null,
      new_status: "new",
      changed_by: "demo-public",
      reason: "Lokale Demoanfrage",
      created_at: now(),
    });
    const note = [payload.ziele?.join(", "), payload.erreichbarkeit].filter(Boolean).join("\n");
    if (note)
      state.notes.push({ id: id(), lead_id: leadId, created_by: "demo-public", note, ...stamp() });
    communication(state, leadId, "Anfragebestätigung simuliert");
    if (payload.referral_code?.toUpperCase() === "DEMO2026")
      state.referrals.push({
        id: id(),
        referrer_lead_id: state.leads.find((l) => l.id === "demo-lead-4")!.id,
        referred_lead_id: leadId,
        code_used: "DEMO2026",
        status: "pending",
        reward_amount_cents: 3000,
        reward_type: "demo",
        payout_after: null,
        paid_at: null,
        admin_notes: null,
        ...stamp(),
      });
    saveState(state);
    return data({ lead_id: leadId, lead_number: number, invoice_uploaded: false });
  }
  if (path === "/api/referral-validate")
    return data({ valid: body.code === "DEMO2026", referrer_name: "Demo Haushalt 5" });
  if (path === "/api/referral-request") {
    const email = z.string().email().parse(body.email);
    const lead = state.leads.find((l) => l.email === email);
    if (lead) {
      communication(state, lead.id, "Empfehlungscode DEMO2026 lokal angefordert");
      saveState(state);
    }
    return data({ sent: false, code: "DEMO2026" });
  }
  if (parts[0] === "blog") {
    const articles = state.articles.filter(
      (a) => a.is_published && (!params.tag || a.tag === params.tag),
    );
    const article = articles.find((a) => a.slug === parts[2]);
    if (parts[2] && !article) throw new DemoError(404, "Artikel nicht gefunden");
    return parts[2] ? data(article) : { data: articles, count: articles.length };
  }
  const profile = requireProfile();
  if (parts[0] === "me") {
    if (method === "PATCH") {
      const update = z
        .object({
          full_name: z.string().trim().min(2).max(150).optional(),
          phone: z.string().max(50).nullable().optional(),
          notification_prefs: z.record(z.string(), z.boolean()).optional(),
        })
        .parse(body);
      Object.assign(state.profiles.find((p) => p.profileId === profile.profileId)!, update);
      saveState(state);
      return data(state.profiles.find((p) => p.profileId === profile.profileId));
    }
    return data(profile);
  }
  if (parts[0] === "leads") {
    if (!parts[1]) {
      const query = String(params.q ?? "").toLowerCase();
      return list(
        state.leads.filter(
          (l) =>
            (profile.role !== "employee" || l.assigned_to === profile.authUserId) &&
            (!params.status || l.status === params.status) &&
            [l.first_name, l.last_name, l.email, l.phone, l.lead_number]
              .join(" ")
              .toLowerCase()
              .includes(query),
        ),
      );
    }
    const lead = state.leads.find((l) => l.id === parts[1]);
    if (!lead) throw new DemoError(404, "Lead nicht gefunden");
    checkLead(profile, lead);
    if (!parts[2]) return data(lead);
    if (parts[2] === "demo-action" && method === "POST") {
      const action = z.enum(["create_offer", "send_offer", "email", "reject"]).parse(body.action);
      const oldStatus = lead.status;
      if (action === "create_offer" || action === "send_offer") {
        let offer = state.offers.find(
          (o) => o.lead_id === lead.id && ["draft", "sent"].includes(o.status),
        );
        if (action === "create_offer" || !offer) {
          const demand = lead.energy_demands?.[0];
          if (!demand?.annual_consumption_kwh)
            throw new DemoError(400, "Für das Beispielangebot fehlen Verbrauchsangaben.");
          const energyType = demand.energy_type === "gas" ? "gas" : "strom";
          const segment = lead.customer_type === "private" ? "privat" : "gewerbe";
          const candidates = state.tariffs.filter(
            (t) =>
              t.is_active &&
              t.energy_type === energyType &&
              t.segment === segment &&
              state.providers.some((p) => p.id === t.provider_id && p.is_active),
          );
          const annual = (t: BackendTariff) =>
            Math.round(
              ((demand.annual_consumption_kwh! * t.price_per_kwh) / 100 + t.base_price * 12) * 100,
            ) / 100;
          candidates.sort((a, b) => annual(a) - annual(b));
          const tariff = candidates[0];
          if (!tariff)
            throw new DemoError(
              400,
              "Kein aktiver passender Demo-Tarif vorhanden. Bitte im Tarifkatalog ergänzen.",
            );
          state.offers
            .filter((o) => o.lead_id === lead.id && ["draft", "sent"].includes(o.status))
            .forEach((o) => {
              o.status = "superseded";
            });
          const version = state.offers.filter((o) => o.lead_id === lead.id).length + 1;
          offer = {
            id: id(),
            lead_id: lead.id,
            energy_demand_id: demand.id,
            created_by: profile.authUserId,
            offer_number: `DEMO-${lead.lead_number}-${version}`,
            version,
            provider_name: state.providers.find((p) => p.id === tariff.provider_id)!.name,
            tariff_name: tariff.name,
            energy_type: demand.energy_type,
            annual_price: annual(tariff),
            monthly_price: Math.round((annual(tariff) / 12) * 100) / 100,
            estimated_savings: demand.monthly_payment
              ? Math.round((demand.monthly_payment * 12 - annual(tariff)) * 100) / 100
              : null,
            status: "draft",
            valid_until: new Date(Date.now() + 14 * 86400000).toISOString(),
            notes:
              "Fiktiver Tarifvergleich im Browser; bei Strom & Gas gilt dieses Beispiel für den ersten Energieträger. Kein Vertragsangebot.",
            ...stamp(),
          };
          state.offers.unshift(offer);
        }
        offer.status = action === "send_offer" ? "sent" : "draft";
        offer.updated_at = now();
        lead.status = action === "send_offer" ? "offer_sent" : "offer_created";
      } else if (action === "reject") lead.status = "rejected";
      communication(
        state,
        lead.id,
        {
          create_offer: "Demo-Angebot erstellt",
          send_offer: "Angebotsversand simuliert",
          email: "E-Mail-Versand simuliert",
          reject: "Demo-Anfrage abgelehnt",
        }[action],
        profile.authUserId,
      );
      if (lead.status !== oldStatus) {
        lead.wiedervorlage_at = null;
        lead.wiedervorlage_note = null;
        state.history.unshift({
          id: id(),
          lead_id: lead.id,
          old_status: oldStatus,
          new_status: lead.status,
          changed_by: profile.authUserId,
          reason: "Lokale Demoaktion",
          created_at: now(),
        });
      }
      lead.updated_at = now();
      saveState(state);
      return data(lead);
    }
    if (parts[2] === "notes" && parts[3] && method === "PATCH") {
      const note = state.notes.find((n) => n.id === parts[3] && n.lead_id === lead.id);
      if (!note) throw new DemoError(404, "Notiz nicht gefunden");
      note.is_important = z.boolean().parse(body.is_important);
      note.updated_at = now();
      saveState(state);
      return data(note);
    }
    if (parts[2] === "status" && method === "PATCH") {
      const update = z
        .object({
          status: statuses,
          reason: z.string().max(5000).optional(),
          followUpAt: z.string().datetime().nullable().optional(),
          followUpNote: z.string().max(5000).nullable().optional(),
        })
        .parse(body);
      const old = lead.status;
      lead.status = update.status;
      lead.updated_at = now();
      if (lead.status !== "follow_up") {
        lead.wiedervorlage_at = null;
        lead.wiedervorlage_note = null;
      }
      if (update.followUpAt !== undefined) lead.wiedervorlage_at = update.followUpAt;
      if (update.followUpNote !== undefined) lead.wiedervorlage_note = update.followUpNote;
      if (old !== lead.status)
        state.history.unshift({
          id: id(),
          lead_id: lead.id,
          old_status: old,
          new_status: lead.status,
          changed_by: profile.authUserId,
          reason: update.reason ?? null,
          created_at: now(),
        });
      communication(state, lead.id, `Status lokal geändert: ${lead.status}`, profile.authUserId);
      if (lead.status === "completed")
        state.referrals
          .filter((r) => r.referred_lead_id === lead.id && r.status === "pending")
          .forEach((r) => {
            r.status = "qualified";
            r.payout_after = new Date(Date.now() + 30 * 86400000).toISOString();
          });
      saveState(state);
      return data(lead);
    }
    if (parts[2] === "assign" && method === "PATCH") {
      if (profile.role === "employee") throw new DemoError(403, "Keine Berechtigung");
      const assigned = z.string().nullable().parse(body.assigned_to);
      if (assigned && !state.profiles.some((p) => p.authUserId === assigned && p.is_active))
        throw new DemoError(400, "Mitarbeiter nicht gefunden");
      lead.assigned_to = assigned;
      lead.updated_at = now();
      saveState(state);
      return data(lead);
    }
    if (parts[2] === "notes" && method === "POST") {
      const note: BackendNote = {
        id: id(),
        lead_id: lead.id,
        created_by: profile.authUserId,
        note: z.string().trim().min(1).max(10000).parse(body.note),
        ...stamp(),
      };
      state.notes.unshift(note);
      saveState(state);
      return data(note);
    }
    if (parts[2] === "documents" && parts[3]) {
      const doc = state.documents.find((d) => d.id === parts[3] && d.lead_id === lead.id);
      if (!doc) throw new DemoError(404, "Dokument nicht gefunden");
      if (method === "DELETE") {
        if (doc.storage_path !== "sample-invoice")
          await fileTransaction("readwrite", (store) => store.delete(doc.id));
        const latest = readState();
        latest.documents = latest.documents.filter((d) => d.id !== doc.id);
        saveState(latest);
        return data(null);
      }
      if (doc.storage_path === "sample-invoice")
        return data({ url: invoiceImage, file_name: doc.file_name });
      const blob = await fileTransaction<Blob | undefined>("readonly", (store) =>
        store.get(doc.id),
      );
      if (!blob) throw new DemoError(404, "Lokale Datei nicht mehr vorhanden");
      // data URL remains local and works with the existing preview/download component.
      const url = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new DemoError(500, "Datei nicht lesbar"));
        reader.readAsDataURL(blob);
      });
      return data({ url, file_name: doc.file_name });
    }
    const related = {
      notes: state.notes,
      documents: state.documents,
      communications: state.communications,
      offers: state.offers,
      "status-history": state.history,
    };
    const items = related[parts[2] as keyof typeof related];
    if (items && method === "GET") return list(items.filter((item) => item.lead_id === lead.id));
  }
  if (parts[0] === "team") {
    if (profile.role === "employee" || (method !== "GET" && profile.role !== "admin"))
      throw new DemoError(403, "Keine Berechtigung");
    if (method === "GET")
      return data(
        state.profiles.map((p) => ({ id: p.profileId, auth_user_id: p.authUserId, ...p })),
      );
    if (method === "POST") {
      const input = z
        .object({
          email: z.string().email(),
          full_name: z.string().min(2).optional(),
          role: z.enum(["employee", "manager", "admin"]).default("employee"),
        })
        .parse(body);
      if (state.profiles.some((p) => p.email === input.email))
        throw new DemoError(409, "E-Mail bereits vorhanden");
      const member: BackendProfile = {
        profileId: id(),
        authUserId: id(),
        full_name: input.full_name ?? "Demo Mitglied",
        email: input.email,
        role: input.role,
        is_active: true,
        phone: null,
        notification_prefs: {},
      };
      state.profiles.push(member);
      saveState(state);
      return data({
        id: member.authUserId,
        email: member.email,
        role: member.role,
        temp_password: DEMO_PASSWORD,
      });
    }
    const member = state.profiles.find((p) => p.profileId === parts[1]);
    if (!member) throw new DemoError(404, "Mitglied nicht gefunden");
    const update = z
      .object({
        role: z.enum(["employee", "manager", "admin"]).optional(),
        is_active: z.boolean().optional(),
        full_name: z.string().min(2).optional(),
        phone: z.string().optional(),
      })
      .parse(body);
    if (
      member.profileId === profile.profileId &&
      (update.is_active === false || (update.role && update.role !== "admin"))
    ) {
      throw new DemoError(400, "Eigenen Administratorzugang nicht deaktivieren.");
    }
    Object.assign(member, update);
    saveState(state);
    return data(member);
  }
  if (profile.role === "employee") throw new DemoError(403, "Keine Berechtigung");
  if (parts[0] === "referrals") {
    if (method === "GET")
      return data(
        state.referrals
          .filter((r) => !params.status || r.status === params.status)
          .map((r) => {
            const referrer = state.leads.find((l) => l.id === r.referrer_lead_id);
            const referred = state.leads.find((l) => l.id === r.referred_lead_id);
            return {
              ...r,
              referrer_name: `${referrer?.first_name ?? ""} ${referrer?.last_name ?? ""}`,
              referrer_email: referrer?.email,
              referred_name: `${referred?.first_name ?? ""} ${referred?.last_name ?? ""}`,
              referred_email: referred?.email,
            };
          }),
      );
    if (profile.role !== "admin") throw new DemoError(403, "Nur Administratoren");
    const referral = state.referrals.find((r) => r.id === parts[1]);
    if (!referral) throw new DemoError(404, "Empfehlung nicht gefunden");
    if (
      referral.status !== "qualified" ||
      (referral.payout_after && Date.parse(referral.payout_after) > Date.now())
    )
      throw new DemoError(400, "Prämie noch nicht fällig");
    referral.status = "paid";
    referral.paid_at = now();
    referral.admin_notes = z.string().optional().parse(body.admin_notes) ?? null;
    saveState(state);
    return data(referral);
  }
  if (parts[0] === "admin" && parts[1] === "blog") {
    if (method === "GET") return { data: state.articles, count: state.articles.length };
    if (method === "DELETE") {
      if (profile.role !== "admin") throw new DemoError(403, "Nur Administratoren");
      state.articles = state.articles.filter((a) => a.id !== parts[3]);
      saveState(state);
      return data(null);
    }
    const articleInput = z.object({
      slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      title: z.string().min(2),
      teaser: z.string(),
      tag: z.string(),
      image: z.string(),
      author: z.string(),
      body: z.array(z.object({ heading: z.string(), paragraphs: z.array(z.string()) })),
      seo_title: z.string().nullable().optional(),
      seo_description: z.string().nullable().optional(),
      read_time_min: z.number().positive(),
      is_published: z.boolean(),
      published_at: z.string().nullable().optional(),
    });
    const current = state.articles.find((a) => a.id === parts[3]);
    if (method === "PATCH" && !current) throw new DemoError(404, "Artikel nicht gefunden");
    const input = articleInput.parse({ ...current, ...body });
    if (state.articles.some((a) => a.slug === input.slug && a.id !== current?.id))
      throw new DemoError(409, "Slug bereits vorhanden");
    const article: BlogArticle = {
      id: current?.id ?? id(),
      seo_title: null,
      seo_description: null,
      ...stamp(),
      ...current,
      ...input,
      published_at: input.is_published ? (input.published_at ?? now()) : null,
      updated_at: now(),
    };
    if (current) Object.assign(current, article);
    else state.articles.unshift(article);
    saveState(state);
    return data(article);
  }
  // Catalog operations share validation and persistence, matching the existing API contracts.
  if (parts[0] === "providers") {
    if (method === "GET")
      return data(
        state.providers.map((p) => ({
          ...p,
          tariffs: [{ count: state.tariffs.filter((t) => t.provider_id === p.id).length }],
        })),
      );
    const current = state.providers.find((p) => p.id === parts[1]);
    if (method === "PATCH" && !current) throw new DemoError(404, "Anbieter nicht gefunden");
    const input = providerInputSchema.parse({ ...current, ...body });
    const provider: BackendProvider = {
      id: id(),
      is_active: true,
      ...stamp(),
      ...current,
      ...input,
      updated_at: now(),
    };
    if (current) Object.assign(current, provider);
    else state.providers.push(provider);
    saveState(state);
    return data(provider);
  }
  if (parts[0] === "tariffs") {
    if (method === "GET")
      return data(
        state.tariffs.map((t) => ({
          ...t,
          providers: { name: state.providers.find((p) => p.id === t.provider_id)?.name ?? "" },
        })),
      );
    const current = state.tariffs.find((t) => t.id === parts[1]);
    if (method === "PATCH" && !current) throw new DemoError(404, "Tarif nicht gefunden");
    const input = tariffInputSchema.parse({ ...current, ...body });
    if (!state.providers.some((p) => p.id === input.provider_id))
      throw new DemoError(400, "Anbieter nicht gefunden");
    const tariff: BackendTariff = {
      id: id(),
      is_active: true,
      ...stamp(),
      ...current,
      ...input,
      updated_at: now(),
    };
    if (current) Object.assign(current, tariff);
    else state.tariffs.push(tariff);
    saveState(state);
    return data(tariff);
  }
  if (parts[0] === "email-templates") {
    if (method === "GET") return data(state.templates);
    const current = state.templates.find((t) => t.id === parts[1]);
    if (method === "PATCH" && !current) throw new DemoError(404, "Vorlage nicht gefunden");
    const input = emailTemplateInputSchema.parse({ ...current, ...body });
    const template: BackendEmailTemplate = {
      id: id(),
      body: "",
      ...stamp(),
      ...current,
      ...input,
      updated_at: now(),
    };
    if (current) Object.assign(current, template);
    else state.templates.push(template);
    saveState(state);
    return data(template);
  }
  throw new DemoError(405, "Aktion in der lokalen Demo nicht verfügbar");
}
