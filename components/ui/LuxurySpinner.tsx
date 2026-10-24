"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function LuxurySpinner({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-16 w-16", className)} aria-hidden>
      <span className="absolute inset-0 rounded-full border border-sage/25" />
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          borderWidth: 1.5,
          borderStyle: "solid",
          borderColor: "transparent",
          borderTopColor: "#6B705C",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.05, repeat: Infinity, ease: "linear" }}
      />
      <motion.span
        className="absolute inset-[7px] rounded-full"
        style={{
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "transparent",
          borderBottomColor: "#4A3B32",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 1.7, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
