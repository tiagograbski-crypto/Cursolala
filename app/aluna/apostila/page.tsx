import { notFound } from "next/navigation";
import { ApostilaReader } from "@/components/student/apostila/ApostilaReader";
import { getTenantSlug } from "@/lib/tenant-context";
import { resolveTenantBySlug } from "@/lib/tenant";

export default async function ApostilaPage() {
  const slug = await getTenantSlug();
  if (!slug) notFound();

  const tenantRecord = await resolveTenantBySlug(slug);
  if (!tenantRecord) notFound();

  return <ApostilaReader portrait={tenantRecord.portrait} />;
}
