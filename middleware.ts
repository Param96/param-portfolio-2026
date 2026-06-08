import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { kv } from '@vercel/kv';

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

  if (isPublicPage && process.env.KV_REST_API_URL) {
    try {
      const timestamp = Date.now();
      // Generate a fast session hash from IP to deduplicate live users without cookies
      const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
      const userAgent = req.headers.get('user-agent') || 'unknown';
      // Simple string concat for member ID
      const memberId = `${ip}-${userAgent.substring(0, 20)}`;

      // Fire-and-forget: Track active users per route
      // ZADD adds the user with the current timestamp. We can query later for users active in the last 5 mins.
      kv.zadd(`live:route:${path}`, { score: timestamp, member: memberId }).catch(() => {});
      kv.expire(`live:route:${path}`, 3600).catch(() => {}); // Auto-cleanup keys after 1 hour

      // Track global total active users
      kv.zadd(`live:global`, { score: timestamp, member: memberId }).catch(() => {});
      kv.expire(`live:global`, 3600).catch(() => {});

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
