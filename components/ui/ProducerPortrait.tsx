import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

export function ProducerPortrait({
  portrait,
  className,
}: {
  portrait: string;
  className?: string;
}) {
  return (
    <img
      src={asset(portrait)}
      alt=""
      className={cn("h-full w-full origin-center scale-[1.85] object-cover object-[center_12%]", className)}
    />
  );
}
