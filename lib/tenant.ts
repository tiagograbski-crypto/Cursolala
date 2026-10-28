/** Perfil fixo da Casa MASTERGLASS (Alaíde / Lala). Single-tenant — sem resolução por subdomínio. */
export type TenantRecord = {
  id: string;
  slug: string;
  brand: string;
  portrait: string;
  discipline: string;
  courseProgress: number;
  rentalFeeCents: number;
  maskedDocument: string;
  status: "active" | "suspended" | "pending";
};

const MASTERGLASS: TenantRecord = {
  id: "lala-academy",
  slug: "lala",
  brand: "MASTERGLASS · Alaíde Proença",
  portrait: "/alaide-proenca.jpg",
  discipline: "Colorimetria",
  courseProgress: 0,
  rentalFeeCents: 1800,
  maskedDocument: "***.***.***-**",
  status: "active",
};

export function getMvpTenant(): TenantRecord {
  return MASTERGLASS;
}

export function formatBRL(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function whatsAppShareUrl(message: string) {
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
}

/** Alaíde — DDI 55 + 47 9691-2277. */
export const WHATSAPP_ALAIDE_E164 = "554796912277";

export function alaideWhatsAppUrl(intent: "vaga" | "fala" = "vaga") {
  const text =
    intent === "fala"
      ? "Olá Alaíde, quero falar sobre o módulo de Colorimetria."
      : "Olá Alaíde, quero garantir minha vaga no módulo de Colorimetria.";
  return `https://wa.me/${WHATSAPP_ALAIDE_E164}?text=${encodeURIComponent(text)}`;
}

export function agencyWhatsAppUrl() {
  return whatsAppShareUrl(
    "Olá! Quero falar com a agência parceira da GL PRO sobre tráfego pago.",
  );
}

export function licenseWhatsAppUrl(tenantBrand: string, code: string, studentName: string) {
  const greeting = studentName.trim() ? `Olá, ${studentName.trim()}! ` : "Olá! ";
  return whatsAppShareUrl(
    `${greeting}Sua licença de acesso ao espaço ${tenantBrand} é ${code}. Ela é pessoal e intransferível.`,
  );
}
