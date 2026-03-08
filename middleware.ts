import { NextRequest, NextResponse } from "next/server";

// This project currently keeps most routes under `app/pages/...`, which makes them
// accessible at `/pages/*` by default (e.g. `app/pages/(auth)/login/page.tsx` -> `/pages/login`).
// Rewrite incoming requests so `/login` maps to `/pages/login`, `/dashboard` -> `/pages/dashboard`, etc.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next internals, API routes, and direct file requests.
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/pages/") ||
    pathname === "/pages" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/pages${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/|api/).*)"],
};

