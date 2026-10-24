export const tenant = {
  id: "alaide-proenca" as const,
  brand: "Alaíde Proença",
  portrait: "/alaide-proenca.jpg",
  discipline: "Colorimetria",
  courseProgress: 35,
  rentalFeeCents: 1800,
  maskedDocument: "***.***.***-**",
};

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
    "Olá! Quero falar com a agência parceira da GL PRO sobre tráfego pago para o espaço Alaíde Proença.",
  );
}

export function licenseWhatsAppUrl(code: string, studentName: string) {
  const greeting = studentName.trim() ? `Olá, ${studentName.trim()}! ` : "Olá! ";
  return whatsAppShareUrl(
    `${greeting}Sua licença de acesso ao espaço Alaíde Proença é ${code}. Ela é pessoal e intransferível. Informe o código na portaria do espaço.`,
  );
}
