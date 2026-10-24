"use client";

import { motion } from "framer-motion";
import { GlProSeal } from "@/components/ui/GlProSeal";
import { LuxurySpinner } from "@/components/ui/LuxurySpinner";

export function PreloadScreen() {
  return (
    <motion.div
      className="flex min-h-dvh flex-col px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <LuxurySpinner />
        <p className="mt-8 max-w-[16rem] font-serif text-[1.85rem] leading-snug text-ink">
          Conectando aos servidores GL PRO...
        </p>
      </div>
      <footer className="pb-10">
        <GlProSeal />
      </footer>
    </motion.div>
  );
}
