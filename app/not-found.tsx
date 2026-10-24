import Link from "next/link";
import { GlProSeal } from "@/components/ui/GlProSeal";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] uppercase tracking-[0.22em] text-sage">GL PRO</p>
      <h1 className="mt-3 font-serif text-4xl text-ink">Página fora do espaço</h1>
      <Link href="/" className="mt-6 text-sm text-sage">
        Voltar à portaria
      </Link>
      <div className="mt-12">
        <GlProSeal />
      </div>
    </div>
  );
}
