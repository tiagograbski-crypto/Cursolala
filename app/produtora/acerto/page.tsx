import { InfraReport } from "@/components/producer/InfraReport";
import { getMvpTenant } from "@/lib/tenant";

export default function AcertoPage() {
  return <InfraReport tenantRecord={getMvpTenant()} />;
}
