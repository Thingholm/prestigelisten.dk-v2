import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
    'https://prestigelisten-dk-v2-4kus.vercel.app',
    'http://localhost:3000'
];

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    
    if (pathname.startsWith('/api')) {
        const origin = request.headers.get('origin');
        const isAllowed = allowedOrigins.includes(origin || '');

        if (request.method === 'OPTIONS') {
            return new NextResponse(null, {
                status: 204,
                headers: {
                    'Access-Control-Allow-Origin': isAllowed ? origin! : allowedOrigins[0],
                    'Access-Control-Allow-Methods': 'POST, GET, HEAD, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Max-Age': '86400',
                },
            });
        }

        const response = NextResponse.next();
        if (isAllowed && origin) {
            response.headers.set('Access-Control-Allow-Origin', origin);
            response.headers.set('Access-Control-Allow-Methods', 'POST, GET, HEAD, OPTIONS');
            response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            response.headers.set('Access-Control-Allow-Credentials', 'true');
        }
        return response;
    }

    // Handle internationalization for all other routes
    return intlMiddleware(request);
}

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};