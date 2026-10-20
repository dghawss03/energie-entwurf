import { createFileRoute } from "@tanstack/react-router";
import { disabledDemoApi } from "@/lib/demo-api.server";

export const Route = createFileRoute("/api/admin/blog/articles/$id")({
  server: {
    handlers: {
      GET: disabledDemoApi,
      POST: disabledDemoApi,
      PATCH: disabledDemoApi,
      PUT: disabledDemoApi,
      DELETE: disabledDemoApi,
    },
  },
});
