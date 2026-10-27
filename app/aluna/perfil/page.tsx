import { ProfilePanel } from "@/components/student/ProfilePanel";
import { getMvpTenant } from "@/lib/tenant";

export default function PerfilPage() {
  return <ProfilePanel tenantRecord={getMvpTenant()} />;
}
