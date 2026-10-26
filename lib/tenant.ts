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

const TENANTS: Record<string, TenantRecord> = {
  alaide: {
    id: "alaide-proenca",
    slug: "alaide",
    brand: "Alaíde Proença",
    portrait: "/alaide-proenca.jpg",
    discipline: "Colorimetria",
    courseProgress: 35,
    rentalFeeCents: 1800,
    maskedDocument: "***.***.***-**",
    status: "active",
  },
  lala: {
    id: "lala-academy",
    slug: "lala",
    brand: "Lala Academy",
    portrait: "/alaide-proenca.jpg",
    discipline: "Colorimetria",
    courseProgress: 0,
    rentalFeeCents: 1800,
    maskedDocument: "***.***.***-**",
    status: "active",
  },
};

export async function resolveTenantBySlug(slugInput: string): Promise<TenantRecord | null> {
  return TENANTS[slugInput] ?? null;
}

export function tenantSlugExists(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(TENANTS, slug);
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
