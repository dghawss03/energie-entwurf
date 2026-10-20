import { DEMO_PROJECT_NOTICE } from "@/lib/branding";

export function DemoNotice() {
  return (
    <aside
      aria-label="Entwurfshinweis"
      className="relative z-50 border-b border-primary/20 bg-primary/5 px-4 py-3 text-center text-xs font-normal leading-relaxed text-foreground"
    >
      {DEMO_PROJECT_NOTICE}
    </aside>
  );
}
