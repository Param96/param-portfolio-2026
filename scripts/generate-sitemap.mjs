// Compatibility entry point: the App Router is the sole sitemap owner.
// A public/sitemap.xml would collide with src/app/sitemap.ts and could restore
// obsolete /about, /notes, /resume, and /projects/:slug URLs.
console.error('Use /sitemap.xml from the production build. Validate with npm run seo:check -- --base-url http://localhost:3000');
process.exitCode = 1;
