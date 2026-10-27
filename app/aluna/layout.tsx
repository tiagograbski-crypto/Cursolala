import type { ReactNode } from "react";
import { AlunaShell } from "@/components/layouts/AlunaShell";
import { getMvpTenant } from "@/lib/tenant";

export default function Layout({ children }: { children: ReactNode }) {
  return <AlunaShell tenantRecord={getMvpTenant()}>{children}</AlunaShell>;
}
