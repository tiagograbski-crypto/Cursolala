import { LicenseDesk } from "@/components/producer/LicenseDesk";
import { getMvpTenant } from "@/lib/tenant";

export default function LiberacaoPage() {
  return <LicenseDesk tenantRecord={getMvpTenant()} />;
}
