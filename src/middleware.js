import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect all routes except the Login page, API Auth endpoints, and Next.js static files
  const isPublicRoute = pathname.startsWith("/login") || pathname.startsWith("/api/auth");
  const isStaticFile = pathname.startsWith("/_next") || pathname.includes(".");

  if (isPublicRoute || isStaticFile) {
    return NextResponse.next();
  }

  // Check for the secure auth_session cookie created by the OTP Verify API
  const sessionCookie = request.cookies.get("auth_session");

  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const session = JSON.parse(sessionCookie.value);
    // If a non-admin tries to access the admin dashboard, send them back to the customer menu
    if (pathname.startsWith("/admin") && session.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    // Failsafe string parse block
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Access Granted
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
