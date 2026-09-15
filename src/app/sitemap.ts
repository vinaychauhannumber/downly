import { MetadataRoute } from 'next';
import { SEO_TOOLS } from '@/lib/seo-data';
import { GUIDES_DATA } from '@/lib/guides-data';

import { SITE_URL } from '@/lib/site-config';

// Dynamic domain resolution supports Vercel, Render, or custom domains.
const BASE_URL = SITE_URL;

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
