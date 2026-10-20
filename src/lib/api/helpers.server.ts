import type { createServiceClient } from "../supabase.server";
export function ok(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "private, no-store" },
  });
}
export function err(message: string, status: number) {
  return ok({ error: message }, status);
}
export interface AuthedUser {
  userId: string;
  profileId: string;
  role: "employee" | "manager" | "admin";
  fullName: string;
  email: string;
}
export async function requireAuth(_request: Request) {
  return { ok: false as const, response: err("HTTP Auth in dieser Demo deaktiviert", 410) };
}
export function getPagination(request: Request, defaultSize = 20) {
  const url = new URL(request.url);
  const parsedPage = Number.parseInt(url.searchParams.get("page") ?? "1", 10);
  const parsedSize = Number.parseInt(url.searchParams.get("pageSize") ?? String(defaultSize), 10);
  const page = Number.isFinite(parsedPage) ? Math.max(1, parsedPage) : 1;
  const pageSize = Math.min(
    200,
    Number.isFinite(parsedSize) ? Math.max(1, parsedSize) : defaultSize,
  );
  return { page, pageSize, from: (page - 1) * pageSize, to: (page - 1) * pageSize + pageSize - 1 };
}
export async function verifyTurnstile(_token: string): Promise<boolean> {
  return false;
}
// Pure access check retained for the existing tests; no production client is created here.
export async function requireLeadAccess(
  client: ReturnType<typeof createServiceClient>,
  user: AuthedUser,
  leadId: string,
): Promise<{ ok: true } | { ok: false; response: Response }> {
  const { data: lead, error } = await client
    .from("leads")
    .select("id, assigned_to")
    .eq("id", leadId)
    .single();
  if (error || !lead) return { ok: false, response: err("Lead nicht gefunden", 404) };
  if (user.role === "employee" && lead.assigned_to !== user.userId)
    return { ok: false, response: err("Zugriff verweigert", 403) };
  return { ok: true };
}
export function methodNotAllowed(methods: string[]) {
  return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json", Allow: methods.join(", ") },
  });
}
