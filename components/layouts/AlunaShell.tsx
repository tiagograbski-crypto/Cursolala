"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { StudentLayout } from "@/components/layouts/StudentLayout";
import type { TenantRecord } from "@/lib/tenant";

function isAlunaLoginPath(pathname: string) {
  return pathname === "/aluna/login";
}

export function AlunaShell({
  children,
  tenantRecord,
}: {
  children: ReactNode;
  tenantRecord: TenantRecord;
}) {
  const pathname = usePathname();
  if (isAlunaLoginPath(pathname)) return children;
  return <StudentLayout tenantRecord={tenantRecord}>{children}</StudentLayout>;
}
