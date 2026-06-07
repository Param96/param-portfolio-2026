import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)", "/cms(.*)", "/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Protect all admin, cms, and dashboard routes
  if (isAdminRoute(req)) {
    await auth.protect();
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
