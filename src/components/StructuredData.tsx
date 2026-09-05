import React from 'react';

const SITE_URL = 'https://downlyfree.onrender.com';

interface FaqItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  /** Absolute or relative URL. Relative paths are auto-prefixed with SITE_URL. */
  url: string;
}

interface HowToStep {
  name: string;
  text: string;
}

interface StructuredDataProps {
  type?: 'website' | 'webapplication' | 'faq' | 'article' | 'howto';
  faqItems?: FaqItem[];
  breadcrumbs?: BreadcrumbItem[];
  article?: {
    headline: string;
    description: string;
    datePublished: string;
    url: string;
  };
  howTo?: {
    name: string;
    description: string;
    steps: HowToStep[];
  };
  appName?: string;
  appDescription?: string;
  appUrl?: string;
}

/**
 * Ensures a URL is absolute. Schema.org requires absolute URLs for all
 * id and item fields. Relative paths like "/guides/foo" are invalid and
 * cause Google's structured data validator to reject the schema.
 */
function toAbsolute(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // Strip fragment-only or hash-only references (e.g. /#platforms)
  // which are not valid canonical URLs for structured data
  const cleanPath = url.split('#')[0] || '/';
  return `${SITE_URL}${cleanPath}`;
}

/**
 * Sanitizes JSON-LD output per the Next.js docs recommendation:
 * Replace "<" with its unicode escape to prevent XSS injection.
 */
function safeJsonLd(obj: object): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}

export function StructuredData({
  faqItems,
  breadcrumbs,
  article,
  howTo,
  appName = 'Downly',
  appDescription = 'Free online media processor and video downloader for public Instagram Reels and YouTube videos.',
  appUrl = SITE_URL,
}: StructuredDataProps) {
  const schemas: object[] = [];

  // WebApplication Schema — only on tool/downloader pages, not on guide articles
  if (!article) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: appName,
      url: toAbsolute(appUrl),
      description: appDescription,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    });
  }

  // BreadcrumbList Schema — absolute URLs required by Schema.org spec
  if (breadcrumbs && breadcrumbs.length > 0) {
    // Build full item list: prepend Home if first item isn't already home
    const firstUrl = toAbsolute(breadcrumbs[0].url);
    const fullCrumbs =
      firstUrl === SITE_URL || firstUrl === `${SITE_URL}/`
        ? breadcrumbs
        : [{ name: 'Home', url: SITE_URL }, ...breadcrumbs];

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: fullCrumbs.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        item: toAbsolute(item.url),
      })),
    });
  }

  // FAQPage Schema — only when FAQ items are visibly present on the page
  if (faqItems && faqItems.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  // HowTo Schema — for guide pages with step-by-step instructions
  if (howTo && howTo.steps && howTo.steps.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: howTo.name,
      description: howTo.description,
      step: howTo.steps.map((step, idx) => ({
        '@type': 'HowToStep',
        position: idx + 1,
        name: step.name,
        text: step.text,
      })),
    });
  }

  // Article Schema — for guide articles only
  if (article) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.headline,
      description: article.description,
      datePublished: article.datePublished,
      dateModified: article.datePublished,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': toAbsolute(article.url),
      },
      author: {
        '@type': 'Organization',
        name: 'Downly Media Editorial',
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Downly',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/favicon.svg`,
        },
      },
    });
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
        />
      ))}
    </>
  );
}
