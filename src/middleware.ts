import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { Redis } from '@upstash/redis';

const isAdminRoute = createRouteMatcher(["/admin(.*)", "/cms(.*)", "/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Protect all admin, cms, and dashboard routes
  if (isAdminRoute(req)) {
    await auth.protect();
  }

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

    } catch (e) {
      // Fail silently to not disrupt edge routing
    }
  }
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/__clerk/:path*"
  ],
};
