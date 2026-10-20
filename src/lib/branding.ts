export const BRAND_NAME = "Energie Entwurf";
export const DEMO_PROJECT_NOTICE =
  "Energie Entwurf · Fiktive Demo von dghWeb – kein echter Energieanbieter, keine echten Vertragsanfragen. Bitte nur erfundene Angaben verwenden.";

/** Update presentation content saved by an earlier local demo, preserving record IDs and edits. */
export function rebrandSavedContent<T>(value: T, articleImage: string): T {
  if (typeof value === "string") {
    let text = value.replace(/[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,}/gi, (email) =>
      email.toLowerCase().endsWith("@example.com") ? email : "demo@example.com",
    );
    if (
      /^(?:https?:\/\/images\.unsplash\.com\/|\/(?:src\/)?assets\/page-wissen[^/]*\.(?:jpg|svg))/.test(
        text,
      )
    ) {
      text = articleImage;
    }
    return text as T;
  }
  if (Array.isArray(value))
    return value.map((item) => rebrandSavedContent(item, articleImage)) as T;
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, rebrandSavedContent(item, articleImage)]),
    ) as T;
  }
  return value;
}
