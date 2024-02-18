import { NextResponse, NextRequest } from "next/server";
import verifyOnJWT from "./jwt/verifyOnEdge";

export async function middleware(request) {

    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value || "";
    const isPublicPath = path === "/login" || path === "/register";

    // Authenticate API calls
    if (!isPublicPath && path.startsWith("/api/") && !path.endsWith('login') && !path.endsWith('register')) {
        const verifyData = await verifyOnJWT(token);
        const isAuth = verifyData?.payload

        if (!isAuth) {
            Response.json({ success: false, message: "authentication failed" }, { status: 401 });
            return NextResponse.redirect(new URL("/", request.nextUrl));
        }

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-user-id", isAuth.id);
        const response = NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
        return response
    }
    if (!path.startsWith('/api/')) {        
        if (isPublicPath && token) {
            return NextResponse.redirect(new URL("/", request.nextUrl));
        }
        
        if (!isPublicPath && !token) {
            return NextResponse.redirect(new URL("/login", request.nextUrl));
        }
    }

    // await middleware1(request)
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/", "/login", "/register", "/explore", "/profile", "/api/:path*"],
};