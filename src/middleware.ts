import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const TOKEN_KEY = "next-auth.session-token";

export async function middleware(request: NextRequest) {
  const cookie = await cookies();
  const token = cookie.get(TOKEN_KEY)?.value;

  const protectedRoutes = [
    "/dashboard",
    "/users",
    "/schools",
    "/dashboard/:path*",
    "/users/:path*",
    "/schools/:path*",
  ];

  const isProtectedRoute = protectedRoutes.some((route) => {
    const regexPattern = route.replace(/\/:path\*/g, "/.*");

    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(request.nextUrl.pathname);
  });

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
