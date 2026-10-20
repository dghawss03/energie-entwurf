export type LeadStatus =
  | "neu"
  | "in_pruefung"
  | "rueckfrage"
  | "angebot_erstellt"
  | "angebot_gesendet"
  | "interessiert"
  | "vertrag_vorbereitet"
  | "vertrag_gesendet"
  | "abgeschlossen"
  | "abgelehnt"
  | "nicht_erreichbar"
  | "wiedervorlage";

export type LeadType = "strom" | "gas" | "strom_gas" | "gewerbe";
export type Role = "admin" | "manager" | "mitarbeiter";

export const statusLabel: Record<LeadStatus, string> = {
  neu: "Neu",
  in_pruefung: "In Prüfung",
  rueckfrage: "Rückfrage offen",
  angebot_erstellt: "Angebot erstellt",
  angebot_gesendet: "Angebot gesendet",
  interessiert: "Kunde interessiert",
  vertrag_vorbereitet: "Vertrag vorbereitet",
  vertrag_gesendet: "Vertrag gesendet",
  abgeschlossen: "Abgeschlossen",
  abgelehnt: "Abgelehnt",
  nicht_erreichbar: "Nicht erreichbar",
  wiedervorlage: "Wiedervorlage",
};

export const statusColor: Record<LeadStatus, string> = {
  neu: "bg-blue-500/15 text-blue-700 dark:text-blue-300",
  in_pruefung: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  rueckfrage: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  angebot_erstellt: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300",
  angebot_gesendet: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  interessiert: "bg-teal-500/15 text-teal-700 dark:text-teal-300",
  vertrag_vorbereitet: "bg-purple-500/15 text-purple-700 dark:text-purple-300",
  vertrag_gesendet: "bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300",
  abgeschlossen: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  abgelehnt: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
  nicht_erreichbar: "bg-orange-500/15 text-orange-700 dark:text-orange-300",
  wiedervorlage: "bg-slate-500/15 text-slate-700 dark:text-slate-300",
};

export const typeLabel: Record<LeadType, string> = {
  strom: "Strom",
  gas: "Gas",
  strom_gas: "Strom + Gas",
  gewerbe: "Gewerbe",
};

export interface LeadNote {
  id: string;
  author: string;
  /** Rolle des Verfassers zum Zeitpunkt der Notiz – optional, da ältere Notizen sie ggf. nicht haben. */
  authorRole?: Role;
  date: string;
  text: string;
  /** Markiert die Notiz als wichtig (roter Rahmen + Label). Kein Löschen vorgesehen – CRM-Verlauf. */
  isImportant?: boolean;
}

/** Ein Eintrag im Aktivitäts-/Verlauf-Tab eines Leads (Status-Änderung, Wiedervorlage, etc.). */
export interface LeadHistoryEntry {
  id: string;
  date: string;
  author: string;
  type: "status_change" | "wiedervorlage" | "note" | "system";
  text: string;
}

/** Wiedervorlage-Termin eines Leads. Wird auf der Wiedervorlage-Übersichtsseite angezeigt. */
export interface LeadWiedervorlage {
  /** ISO-Datum (optional mit Uhrzeit), Fälligkeitszeitpunkt der Wiedervorlage. */
  date: string;
  comment?: string;
  createdBy?: string;
  createdAt?: string;
}

export interface LeadDocument {
  id: string;
  name: string;
  kind: "rechnung" | "angebot" | "vertrag" | "sonstiges";
  size: string;
  uploadedAt: string;
  /** Name des Mitarbeiters, der das Dokument hochgeladen hat (bei Session-Uploads). */
  uploadedBy?: string;
  /** Lokale Object-URL für den Download innerhalb der aktuellen Session (kein echtes Storage). */
  objectUrl?: string;
}

export interface LeadEmail {
  id: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  direction: "in" | "out";
  preview: string;
}

export interface LeadOffer {
  id: string;
  providerName: string;
  tariffName: string;
  monthlyPrice: number;
  yearlyPrice: number;
  savings: number;
  sentAt?: string;
  status: "entwurf" | "gesendet" | "angenommen" | "abgelehnt";
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  plz: string;
  type: LeadType;
  consumption: number;
  currentProvider: string;
  monthlyPayment: number;
  status: LeadStatus;
  score: number;
  assignee: string;
  createdAt: string;
  expectedSavings: number;
  source: string;
  hasInvoice: boolean;
  notes: LeadNote[];
  documents: LeadDocument[];
  emails: LeadEmail[];
  offers: LeadOffer[];
  /** Aktivitäts-Verlauf (Status-Änderungen, Wiedervorlagen, ...) – Basis für den "Verlauf"-Tab. */
  history: LeadHistoryEntry[];
  /** Aktuell offene Wiedervorlage, falls eine gesetzt ist. */
  wiedervorlage?: LeadWiedervorlage;
}

export const leads: Lead[] = [];

export interface Employee {
  id: string;
  name: string;
  role: Role;
  email: string;
  closed: number;
  open: number;
  conversion: number;
  active: boolean;
}

export const employees: Employee[] = [];

export const roleLabel: Record<Role, string> = {
  admin: "Admin",
  manager: "Manager",
  mitarbeiter: "Mitarbeiter",
};

export interface Provider {
  id: string;
  name: string;
  type: "strom" | "gas" | "beide";
  tariffsCount: number;
  rating: number;
  partner: boolean;
}
export const providers: Provider[] = [];

export interface Tariff {
  id: string;
  provider: string;
  name: string;
  type: "strom" | "gas";
  segment: "privat" | "gewerbe";
  pricePerKwh: number;
  basePrice: number;
  duration: number;
  priceGuarantee: number;
  eco: boolean;
}
export const tariffs: Tariff[] = [];

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  trigger: string;
  lastEdited: string;
  active: boolean;
}
export const emailTemplates: EmailTemplate[] = [];

export function getLead(id: string) {
  return leads.find((l) => l.id === id);
}
