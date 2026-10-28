import { ProducerDashboard } from "@/components/producer/ProducerDashboard";
import { getMvpTenant } from "@/lib/tenant";

export default function ProdutoraPage() {
  return <ProducerDashboard tenantRecord={getMvpTenant()} />;
}
