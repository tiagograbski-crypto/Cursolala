import type { ReactNode } from "react";
import { ProducerLayout } from "@/components/layouts/ProducerLayout";
import { getMvpTenant } from "@/lib/tenant";

export default function Layout({ children }: { children: ReactNode }) {
  return <ProducerLayout tenantRecord={getMvpTenant()}>{children}</ProducerLayout>;
}
