import { tenant } from "@/lib/tenant";
import { cn } from "@/lib/cn";

export function ProducerPortrait({ className }: { className?: string }) {
  return (
    <img
      src={tenant.portrait}
      alt=""
      className={cn("h-full w-full origin-center scale-[1.85] object-cover object-[center_12%]", className)}
    />
  );
}
