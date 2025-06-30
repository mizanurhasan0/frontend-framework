import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Get the pathname of the request
    const path = request.nextUrl.pathname;

    // Define public paths that don't require authentication
    const isPublicPath = path === "/" ||
        path === "/login" ||
        path === "/register" ||
        path.startsWith("/products") ||
        path.startsWith("/categories") ||
        path.startsWith("/cart") ||
        path.startsWith("/demo") ||
        path.startsWith("/api/auth") ||
        path === "/about" ||
        path === "/contact";

    // Define admin/dashboard paths that require authentication
    const isAdminPath = path.startsWith("/dashboard") || path.startsWith("/admin");

    // Get the token from the cookies
    const token = request.cookies.get("auth-token")?.value || "";

    // Protect admin/dashboard routes
    if (isAdminPath && !token) {
        // If user is not authenticated and trying to access admin area, redirect to login
        return NextResponse.redirect(new URL("/login?redirect=" + encodeURIComponent(path), request.url));
    }

    // Optional: Redirect authenticated users away from login page
    if (path === "/login" && token) {
        const redirectTo = request.nextUrl.searchParams.get("redirect") || "/dashboard";
        return NextResponse.redirect(new URL(redirectTo, request.url));
    }

    return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes, except auth)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        "/((?!api/(?!auth)|_next/static|_next/image|favicon.ico|images|.*\\..*$).*)",
    ],
}; 