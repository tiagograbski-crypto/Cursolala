import { GlProSeal } from "@/components/ui/GlProSeal";
import { LuxurySpinner } from "@/components/ui/LuxurySpinner";

export default function Loading() {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="flex flex-1 items-center justify-center">
        <LuxurySpinner />
      </div>
      <footer className="pb-10">
        <GlProSeal />
      </footer>
    </div>
  );
}
