/**
 * Global Site Configuration
 * Dynamically resolves the base URL across Vercel, Render, or custom domains.
 */
export function getSiteUrl(): string {
  // Explicit custom domain set by user
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  // Vercel production deployment domain (e.g. your-project.vercel.app)
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  // Vercel deployment preview/branch domain
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Default to primary Render deployment
  return 'https://downlyfree.onrender.com';
}

export const SITE_URL = getSiteUrl();
