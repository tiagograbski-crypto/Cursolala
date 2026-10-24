const KEY = "glpro.licenses.alaide-proenca";
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export type IssuedLicense = {
  code: string;
  studentName: string;
  createdAt: string;
};

export function readLicenses(): IssuedLicense[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as IssuedLicense[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        typeof item.code === "string" &&
        typeof item.studentName === "string" &&
        typeof item.createdAt === "string",
    );
  } catch {
    return [];
  }
}

export function writeLicenses(list: IssuedLicense[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

function chunk(length: number) {
  const bytes = new Uint32Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (value) => ALPHABET[value % ALPHABET.length]).join("");
}

export function createLicenseCode() {
  let body = `${chunk(4)}-${chunk(4)}`;
  if (body.startsWith("PROD")) body = `K${body.slice(1)}`;
  return `LALA-${body}`;
}

export function licensesThisMonth(list: IssuedLicense[], now = new Date()) {
  return list.filter((item) => {
    const date = new Date(item.createdAt);
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
  });
}
