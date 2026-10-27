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

/** Concierge — só dígitos (DDI 55 + DDD + número). Edite aqui. */
export const WHATSAPP_CONCIERGE_E164 = "55SEUNUMERO";

export function conciergeWhatsAppUrl() {
  const text = encodeURIComponent(
    "Olá, gostaria de pleitear uma credencial para a imersão Masterglass.",
  );
  return `https://wa.me/${WHATSAPP_CONCIERGE_E164}?text=${text}`;
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
