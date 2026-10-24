import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "graphite" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-sage text-pearl shadow-float hover:bg-sage-deep disabled:bg-sage disabled:text-pearl",
  graphite: "bg-ink text-pearl hover:bg-sage-deep",
  ghost: "bg-pearl text-ink shadow-card",
};

export function buttonClass(variant: Variant = "primary", full = false, className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-[13px] font-medium tracking-[0.03em] transition duration-200 active:scale-[0.98] disabled:pointer-events-none",
    variants[variant],
    full && "w-full",
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  full?: boolean;
};

export function Button({ variant = "primary", full = false, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClass(variant, full, className)} {...props} />;
}
