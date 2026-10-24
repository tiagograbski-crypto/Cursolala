import type { ReactNode } from "react";
import { TenantLayout } from "@/components/layouts/TenantLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return <TenantLayout>{children}</TenantLayout>;
}
