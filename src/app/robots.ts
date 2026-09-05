import { MetadataRoute } from 'next';

// Production domain hardcoded — same reason as sitemap.ts.
// Prevents env var fallback to downlyfree.onrender.com.
const BASE_URL = 'https://downlyfree.onrender.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/static/',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
