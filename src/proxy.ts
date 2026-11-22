import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { Redis } from '@upstash/redis';

const isAdminRoute = createRouteMatcher(["/admin(.*)", "/cms(.*)", "/dashboard(.*)"]);
const isClerkRoute = createRouteMatcher([
  "/sign-in(.*)", "/sign-up(.*)", "/api(.*)", "/trpc(.*)", "/__clerk/:path*",
]);

function trackVisit(req: NextRequest) {
  // --- VERCEL KV LIVE ENVIRONMENTAL TRACKING ---
  const path = req.nextUrl.pathname;
  const isPublicPage = req.method === 'GET' && 
    !path.startsWith('/api') && 
    !path.startsWith('/_next') && 
    !path.startsWith('/admin') && 
    !path.startsWith('/__clerk') &&
    !path.includes('.'); // exclude files like .js, .png, favicon.ico

  if (isPublicPage && process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const redis = new Redis({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      });

      const timestamp = Date.now();
      const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
      const userAgent = req.headers.get('user-agent') || 'unknown';
      const memberId = `${ip}-${userAgent.substring(0, 20)}`;

      // Fire-and-forget: Track active users per route
      redis.zadd(`live:route:${path}`, { score: timestamp, member: memberId }).catch(() => {});
      redis.expire(`live:route:${path}`, 3600).catch(() => {});

      // Track global total active users
      redis.zadd(`live:global`, { score: timestamp, member: memberId }).catch(() => {});
      redis.expire(`live:global`, 3600).catch(() => {});

    } catch {
      // Fail silently to not disrupt edge routing
    }
  }
}

const clerkProxy = clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    await auth.protect();
  }
  trackVisit(req);
});

export default function proxy(req: NextRequest, event: NextFetchEvent) {
  if (isAdminRoute(req) || isClerkRoute(req)) {
    return clerkProxy(req, event);
  }

  // Public pages use Clerk on the client and do not need a server session.
  // Serve their HTML directly, including to visitors without Clerk cookies.
  trackVisit(req);
}

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/__clerk/:path*"
  ],
};
