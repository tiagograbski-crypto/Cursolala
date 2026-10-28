import { NextResponse, type NextRequest } from "next/server";

/**
 * Edge leve — single-tenant MASTERGLASS.
 * Autenticação da área aluna/produtora permanece no cliente (`SessionGate` + licença local).
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
