import type { LucideIcon } from "lucide-react";
import { BookOpen, ClipboardList, Play, User } from "lucide-react";

export type StudentNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const studentNavItems: StudentNavItem[] = [
  { href: "/aluna/apostila", label: "Apostila", icon: BookOpen },
  { href: "/aluna/aulas", label: "Aulas", icon: Play },
  { href: "/aluna/anamnese", label: "Anamnese", icon: ClipboardList },
  { href: "/aluna/perfil", label: "Perfil", icon: User },
];
