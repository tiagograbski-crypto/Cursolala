export const fieldClass =
  "w-full rounded-2xl bg-pearl-deep px-5 py-4 text-[15px] text-ink shadow-card outline-none transition placeholder:text-ink/45 focus:shadow-float";

export function FieldLabel({ children }: { children: string }) {
  return <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink">{children}</span>;
}
