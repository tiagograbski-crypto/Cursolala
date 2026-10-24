import type { ReactNode } from "react";
import { StudentLayout } from "@/components/layouts/StudentLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return <StudentLayout>{children}</StudentLayout>;
}
