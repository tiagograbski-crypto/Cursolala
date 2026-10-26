import type { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { StudentLayout } from "@/components/layouts/StudentLayout";
import { getTenantSlug } from "@/lib/tenant-context";
import { resolveTenantBySlug } from "@/lib/tenant";

export default async function Layout({ children }: { children: ReactNode }) {
  const slug = await getTenantSlug();
  if (!slug) redirect("/");

  const tenantRecord = await resolveTenantBySlug(slug);
  if (!tenantRecord) notFound();

  return <StudentLayout tenantRecord={tenantRecord}>{children}</StudentLayout>;
}
