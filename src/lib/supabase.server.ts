/** Structural type retained solely for the existing pure access-check tests. */
export interface DisabledServiceClient {
  from(table: string): {
    select(fields: string): {
      eq(
        field: string,
        value: string,
      ): {
        single(): Promise<{
          data: { id: string; assigned_to: string | null } | null;
          error: unknown;
        }>;
      };
    };
  };
}
export function createServiceClient(): DisabledServiceClient {
  throw new Error("Produktive Datenbankzugriffe sind in dieser Demo deaktiviert.");
}
