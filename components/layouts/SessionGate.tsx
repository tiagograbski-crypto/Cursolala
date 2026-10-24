"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { homeFor, readSession, type Role } from "@/lib/session";

export function SessionGate({ role, children }: { role: Role; children: ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = readSession();
    if (!session) {
      router.replace("/");
      return;
    }
    if (session.role !== role) {
      router.replace(homeFor(session.role));
      return;
    }
    setReady(true);
  }, [role, router]);

  if (!ready) return <div className="min-h-dvh bg-pearl" />;
  return children;
}
