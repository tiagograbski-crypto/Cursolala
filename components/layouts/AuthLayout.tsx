import type { ReactNode } from "react";

export function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="relative min-h-dvh">{children}</div>;
}
