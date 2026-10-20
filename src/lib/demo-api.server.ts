/** Browser demo state is never stored on or synchronized to the server. */
export function disabledDemoApi(): Response {
  return new Response(
    JSON.stringify({
      error: "HTTP API in dieser lokalen Demo deaktiviert. Änderungen bleiben im Browser.",
      code: "DEMO_API_DISABLED",
    }),
    {
      status: 410,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    },
  );
}
