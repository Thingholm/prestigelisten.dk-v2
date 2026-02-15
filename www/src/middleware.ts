import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
    "https://prestigelisten-dk-v2-4kus.vercel.app",
    "https://prestigelisten.dk",
    "http://localhost:3000"
];

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    
    if (pathname.startsWith('/api')) {
        console.log('API request detected:', pathname);

        const origin = request.headers.get('origin');
        console.log('Origin:', origin);

        const isAllowed = allowedOrigins.includes(origin || '');
        console.log('Is allowed:', isAllowed);

        if (request.method === 'OPTIONS') {
            console.log('OPTIONS request');
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

        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        return response;
    }

    // Handle internationalization for all other routes
    return intlMiddleware(request);
}

export const config = {
    matcher: 
        // Match all pathnames except for
        // - … if they start with `/trpc`, `/_next` or `/_vercel`
        // - … the ones containing a dot (e.g. `favicon.ico`)        
        '/((?!trpc|_next|_vercel|.*\\..*).*)'
};