export const BRAND_NAME = "Entwurf Energie";
export const DEMO_PROJECT_NOTICE =
  "Website-Entwurf von dghWeb – Diese Website befindet sich noch in der Entwicklung und ist nicht final.";

/** Update presentation content saved by an earlier local demo, preserving record IDs and edits. */
export function rebrandSavedContent<T>(value: T, articleImage: string): T {
  if (typeof value === "string") {
    let text = value
      .replace(/Energie Entwurf/g, BRAND_NAME)
      .replace(/[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,}/gi, (email) =>
        email.toLowerCase().endsWith("@example.com") ? email : "demo@example.com",
      );
    const savedLabels: Record<string, string> = {
      "Alex Beispiel": "Alex Keller",
      "Kim Muster": "Kim Wendt",
      "Robin Demo": "Robin Sommer",
      "Website-Demo": "Website",
      "Backoffice-Demo": "Backoffice",
      "Demo Versorger Nord": "Anbieter Nord",
      "Demo Versorger Süd": "Anbieter Süd",
      "Beispiel Energie": "Regionalversorgung",
      "Demo Redaktion": "Entwurf Energie Redaktion",
      "Fiktiver Rückruf zur Demonstration": "Rückruf zur Tarifauswahl",
      "Fiktiver Beratungsvorgang angelegt": "Beratungsvorgang angelegt",
      "Fiktiver Ausgangszustand": "Vorgang angelegt",
      "Fiktives Beratungsszenario: Verbrauch und Wünsche prüfen, bei Bedarf eine Wiedervorlage setzen.":
        "Verbrauch und Wünsche prüfen, bei Bedarf eine Wiedervorlage setzen.",
      "Ausschließlich fiktiver Vorgang. Änderungen bleiben in diesem Browser.":
        "Unterlagen zur Tarifprüfung erfassen und Verbrauch abgleichen.",
      "Ein fiktiver Ratgeber für die lokale Demo. Alle Konditionen sind Beispiele.":
        "Orientierung zu Preisen, Konditionen und den nächsten Schritten beim Anbieterwechsel.",
      "Dieser Artikel demonstriert die Redaktion. Preise, Anbieter und Rechenbeispiele sind frei erfunden.":
        "Vergleichen Sie neben dem Arbeitspreis auch Grundpreis, Laufzeit und Preisgarantie. So lassen sich die jährlichen Kosten nachvollziehbar einordnen.",
      "Über die Angebotsstrecke können Sie eine lokale Beispielanfrage erstellen und im Mitarbeiterbereich bearbeiten.":
        "Erfassen Sie Verbrauch und Wünsche in der Angebotsstrecke. Im Vorgang behalten Sie Unterlagen, Angebote und nächste Schritte im Blick.",
    };
    text = savedLabels[text] ?? text;
    text = text.replace(
      /^Beispiel (\d+) \(Demo\)$/,
      (_match, number: string) =>
        ["Keller", "Wendt", "Sommer", "Mertens", "Falk", "Berg"][(Number(number) - 1) % 6],
    );
    text = text
      .replace(/^(Büro Musterfeld \d+) \(fiktiv\)$/, "$1")
      .replace(/^Demo (strom|gas) /, (_match, energy: string) =>
        energy === "strom" ? "Strom " : "Gas ",
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
