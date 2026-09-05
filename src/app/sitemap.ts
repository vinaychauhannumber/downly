import { MetadataRoute } from 'next';
import { SEO_TOOLS } from '@/lib/seo-data';
import { GUIDES_DATA } from '@/lib/guides-data';

// Production domain is hardcoded to prevent the sitemap from ever
// outputting the Render internal URL (downlyfree.onrender.com) instead of
// the canonical domain. A domain mismatch between sitemap and canonicals
// causes Google to treat the URLs as unrelated and delays indexing.
const BASE_URL = 'https://downlyfree.onrender.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    // Homepage — highest priority
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Guides index page
    {
      url: `${BASE_URL}/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // All SEO landing tool pages (9+ tools)
  Object.keys(SEO_TOOLS).forEach((slug) => {
    routes.push({
      url: `${BASE_URL}/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });

  // All educational guide articles
  Object.keys(GUIDES_DATA).forEach((slug) => {
    routes.push({
      url: `${BASE_URL}/guides/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return routes;
}
