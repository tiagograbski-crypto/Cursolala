import type { LucideIcon } from "lucide-react";
import { BadgeDollarSign, KeyRound, LayoutDashboard, TrendingUp } from "lucide-react";

export type ProducerNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const producerNavItems: ProducerNavItem[] = [
  { href: "/produtora", label: "Dashboard", icon: LayoutDashboard },
  { href: "/produtora/liberacao", label: "Liberação", icon: KeyRound },
  { href: "/produtora/acerto", label: "Acerto", icon: BadgeDollarSign },
  { href: "/produtora/vendas", label: "Vendas", icon: TrendingUp },
];
