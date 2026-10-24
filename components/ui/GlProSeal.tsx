import { cn } from "@/lib/cn";

export function GlProSeal({ tone = "muted", className }: { tone?: "muted" | "light"; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <span className={cn("h-px w-8", tone === "light" ? "bg-pearl/40" : "bg-sage/40")} />
      <p className={cn("text-[11px] tracking-[0.16em]", tone === "light" ? "text-pearl/75" : "text-ink-soft")}>
        Powered by GL PRO
      </p>
    </div>
  );
}
