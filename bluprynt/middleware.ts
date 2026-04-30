import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Set x-pathname on every request, so the root layout can know
  // which route is rendering and hide public chrome on /admin/*
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);

  // Allow the login page itself
  if (pathname === "/admin/login") {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Require a session for every other /admin/* route
  if (pathname.startsWith("/admin") && !req.auth) {
    const loginUrl = new URL("/admin/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
});

export const config = {
  matcher: [
    // Match everything EXCEPT static assets and API routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};