export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  idempotencyKey?: string;
}
export interface EmailResult {
  id: string | null;
  skipped: boolean;
  attempts: number;
}
export function getEmailReadiness() {
  return { ok: false, reason: "demo_disabled" };
}
export async function sendEmail(_payload: EmailPayload): Promise<EmailResult> {
  return { id: null, skipped: true, attempts: 0 };
}
