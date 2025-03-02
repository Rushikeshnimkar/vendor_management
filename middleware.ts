import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Check if the user is authenticated
  if (!session) {
    // If not authenticated and trying to access protected routes, redirect to login
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // If authenticated, allow access to protected routes
  return NextResponse.next();
}

// Configure which paths should be protected by this middleware
export const config = {
  matcher: ["/pages/homepage", "/pages/vendors/:path*"],
};
