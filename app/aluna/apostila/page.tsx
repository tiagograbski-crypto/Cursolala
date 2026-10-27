import { ApostilaReader } from "@/components/student/apostila/ApostilaReader";
import { getMvpTenant } from "@/lib/tenant";

export default function ApostilaPage() {
  const { portrait } = getMvpTenant();
  return <ApostilaReader portrait={portrait} />;
}
