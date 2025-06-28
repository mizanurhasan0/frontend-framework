import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Get the pathname of the request (e.g. /, /dashboard, /protected)
    const path = request.nextUrl.pathname;

    // Define public paths that don't require authentication
    const isPublicPath = path === "/" || path === "/login" || path === "/register";

    // Get the token from the cookies
    const token = request.cookies.get("auth-token")?.value || "";

    // Redirect logic
    if (isPublicPath && token) {
        // If user is authenticated and trying to access public path, redirect to dashboard
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!isPublicPath && !token) {
        // If user is not authenticated and trying to access protected path, redirect to login
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
}; 