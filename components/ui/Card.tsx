import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("rounded-[28px] bg-pearl p-7 text-ink shadow-card", className)}
      {...props}
    />
  );
}
